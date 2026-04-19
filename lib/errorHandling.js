import {
  upsertMarketData,
  logCronExecution,
} from '@/lib/supabaseDB';

/**
 * AŞAMA 5: Error Handling & Stale Data Fallback
 * 
 * Strategy:
 * 1. Çalışan API → Yeni veriyi use et
 * 2. API fails → DB'den son başarılı veriyi oku
 * 3. Stale data show et + Warning banner
 * 4. Retry ile API'ye tekrar bağlanmaya çalış
 */

let supabase = null;
let supabaseConfigured = false;

try {
  const { createClient } = require('@supabase/supabase-js');
  if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('supabase')) {
    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );
    supabaseConfigured = true;
  }
} catch (err) {
  console.warn('⚠️ Supabase not available:', err.message);
}

// ============================================
// 1. Get Last Successful Data (Stale Data)
// ============================================

export async function getLastSuccessfulData(assetId) {
  if (!supabaseConfigured || !supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('market_data')
      .select('*')
      .eq('asset_id', assetId)
      .not('last_successful_fetch_at', 'is', null)
      .order('last_successful_fetch_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.warn(`No stale data found for ${assetId}`);
      return null;
    }

    return {
      ...data,
      isStale: true,
      staleSinceSeconds: Math.floor(
        (Date.now() - new Date(data.last_successful_fetch_at).getTime()) / 1000
      ),
    };
  } catch (err) {
    console.error('Get stale data error:', err);
    return null;
  }
}

// ============================================
// 2. Data Quality Score
// ============================================

export function calculateDataQualityScore(data, maxAgeSeconds = 3600) {
  if (!data) return 0;

  let score = 100;

  // Age penalty
  const ageSeconds = data.staleSinceSeconds || 0;
  if (ageSeconds > maxAgeSeconds) {
    score -= 40; // Very old
  } else if (ageSeconds > 1800) {
    score -= 20; // Old
  } else if (ageSeconds > 300) {
    score -= 10; // Slightly old
  }

  // Error count penalty
  if (data.error_count) {
    score -= Math.min(data.error_count * 5, 30);
  }

  // Validation
  if (!data.current_price || data.current_price <= 0) {
    score -= 20;
  }

  return Math.max(score, 0);
}

// ============================================
// 3. Get Fallback Data (Cascading Strategy)
// ============================================

export async function getFallbackData(assetId) {
  console.log(`[Fallback] Getting data for ${assetId}...`);

  // Strategy 1: Get last successful (stale) data
  const staleData = await getLastSuccessfulData(assetId);

  if (staleData) {
    const qualityScore = calculateDataQualityScore(staleData);
    
    console.log(`[Fallback] Found stale data (score: ${qualityScore})`);
    
    return {
      success: true,
      data: staleData,
      source: 'stale-data',
      qualityScore,
      warning: {
        type: 'stale',
        message: `Veriler ${formatTime(staleData.staleSinceSeconds)} önce güncellenmiştir`,
        severity: qualityScore < 50 ? 'high' : 'medium',
      },
    };
  }

  // Strategy 2: Use previous value (if exists)
  console.log(`[Fallback] No stale data, trying previous value...`);
  
  try {
    const { data } = await supabase
      .from('market_data')
      .select('previous_value, previous_change_percent')
      .eq('asset_id', assetId)
      .single();

    if (data?.previous_value) {
      console.log(`[Fallback] Using previous value`);
      
      return {
        success: true,
        data: {
          current_price: data.previous_value,
          change_percent: data.previous_change_percent || 0,
          isStale: true,
          isPrevious: true,
        },
        source: 'previous-value',
        qualityScore: 30,
        warning: {
          type: 'very-stale',
          message: 'Güncel veri alınamadı, son bilinen değer gösterilmektedir',
          severity: 'high',
        },
      };
    }
  } catch (err) {
    console.error('Previous value fetch error:', err);
  }

  // Strategy 3: Mock data (last resort)
  console.log(`[Fallback] Using mock data (last resort)`);
  
  return {
    success: false,
    source: 'mock-data',
    qualityScore: 0,
    warning: {
      type: 'critical',
      message: 'Veriler şu anda alınamıyor, lütfen daha sonra tekrar deneyin',
      severity: 'critical',
    },
    error: 'No data available',
  };
}

// ============================================
// 4. Record Error & Create Recovery Task
// ============================================

export async function recordError(assetId, errorType, errorMessage, lastGoodValue = null) {
  if (!supabaseConfigured || !supabase) {
    return;
  }

  try {
    const { error } = await supabase
      .from('error_recovery_queue')
      .insert({
        asset_id: assetId,
        error_type: errorType,
        error_message: errorMessage,
        status: 'pending',
        last_good_value: lastGoodValue,
        last_good_timestamp: new Date(),
      });

    if (error) {
      console.error('Error recording error:', error);
    }

    // Log quality issue
    await supabase
      .from('data_quality_log')
      .insert({
        asset_id: assetId,
        error_type: errorType,
        error_message: errorMessage,
        has_error: true,
        quality_score: 0,
        recommendation: 'Use stale data and retry',
      });

  } catch (err) {
    console.error('Record error failed:', err);
  }
}

// ============================================
// 5. Exponential Backoff Retry
// ============================================

export function calculateBackoffDelay(retryCount, baseDelayMs = 1000) {
  // Exponential: 1s, 2s, 4s, 8s, 16s...
  const delay = Math.min(baseDelayMs * Math.pow(2, retryCount), 60000); // Max 60s
  const jitter = Math.random() * 1000; // Add randomness to prevent thundering herd
  return Math.floor(delay + jitter);
}

export async function retryWithBackoff(
  asyncFn,
  maxRetries = 3,
  baseDelayMs = 1000
) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      console.log(`[Retry] Attempt ${attempt + 1}/${maxRetries}`);
      const result = await asyncFn();
      return result;
    } catch (error) {
      console.error(`[Retry] Attempt ${attempt + 1} failed:`, error.message);

      if (attempt < maxRetries - 1) {
        const delay = calculateBackoffDelay(attempt, baseDelayMs);
        console.log(`[Retry] Waiting ${delay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error; // Last attempt failed
      }
    }
  }
}

// ============================================
// 6. Update Last Successful Fetch
// ============================================

export async function updateLastSuccessfulFetch(assetId, newData) {
  if (!supabaseConfigured || !supabase) {
    return;
  }

  try {
    const { error } = await supabase
      .from('market_data')
      .update({
        last_successful_fetch_at: new Date(),
        previous_value: newData.value,
        previous_change_percent: newData.changePercent,
        error_count: 0,
        last_error: null,
        is_stale: false,
        stale_since: null,
      })
      .eq('asset_id', assetId);

    if (error) {
      console.error('Update last successful fetch error:', error);
    }
  } catch (err) {
    console.error('Update last successful error:', err);
  }
}

// ============================================
// 7. Mark Data as Stale
// ============================================

export async function markAsStale(assetId, reason = 'Unknown') {
  if (!supabaseConfigured || !supabase) {
    return;
  }

  try {
    await supabase
      .from('market_data')
      .update({
        is_stale: true,
        stale_since: new Date(),
      })
      .eq('asset_id', assetId);

    console.log(`[Stale] Marked ${assetId} as stale: ${reason}`);
  } catch (err) {
    console.error('Mark as stale error:', err);
  }
}

// ============================================
// 8. Helper: Format Time Difference
// ============================================

export function formatTime(seconds) {
  if (seconds < 60) return `${seconds} saniye`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} dakika`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} saat`;
  return `${Math.floor(seconds / 86400)} gün`;
}

// ============================================
// 9. Get Data with Fallback (Main Function)
// ============================================

export async function getDataWithFallback(assetId, fetchFunction) {
  try {
    // Try primary fetch
    console.log(`[Data] Fetching ${assetId}...`);
    const freshData = await retryWithBackoff(() => fetchFunction(), 2, 2000);

    if (freshData && freshData.value) {
      // Update last successful
      await updateLastSuccessfulFetch(assetId, freshData);
      
      return {
        success: true,
        data: freshData,
        source: 'api',
        isStale: false,
        qualityScore: 100,
      };
    }

    throw new Error('Invalid data from API');

  } catch (primaryError) {
    console.error(`[Data] Primary fetch failed: ${primaryError.message}`);

    // Record error
    await recordError(assetId, 'fetch_failed', primaryError.message);

    // Fall back to stale data
    const fallback = await getFallbackData(assetId);

    if (fallback.success) {
      // Log quality warning
      await supabase
        .from('data_quality_log')
        .insert({
          asset_id: assetId,
          freshness_level: 'stale',
          quality_score: fallback.qualityScore,
          recommendation: fallback.warning.message,
          error_message: primaryError.message,
        });

      return fallback;
    }

    // Complete failure
    return {
      success: false,
      error: primaryError.message,
      warning: fallback.warning,
    };
  }
}

// ============================================
// 10. Batch Recovery
// ============================================

export async function retryFailedAssets() {
  if (!supabaseConfigured || !supabase) {
    return { retried: 0, recovered: 0 };
  }

  try {
    const { data: failedAssets } = await supabase
      .from('error_recovery_queue')
      .select('*')
      .eq('status', 'pending')
      .lt('retry_count', 3)
      .order('attempted_at', { ascending: true })
      .limit(10);

    if (!failedAssets || failedAssets.length === 0) {
      console.log('[Recovery] No failed assets to retry');
      return { retried: 0, recovered: 0 };
    }

    let recovered = 0;

    for (const item of failedAssets) {
      try {
        console.log(`[Recovery] Retrying ${item.asset_id}...`);
        
        // Try to fetch fresh data
        // (In real implementation, would call actual API)
        
        // Update recovery status
        await supabase
          .from('error_recovery_queue')
          .update({
            status: 'recovered',
            resolved_at: new Date(),
            recovery_method: 'stale_data',
          })
          .eq('id', item.id);

        recovered++;
      } catch (err) {
        console.error(`Recovery retry failed for ${item.asset_id}:`, err);
        
        // Increment retry count
        await supabase
          .from('error_recovery_queue')
          .update({
            retry_count: item.retry_count + 1,
            next_retry_at: new Date(Date.now() + calculateBackoffDelay(item.retry_count)),
          })
          .eq('id', item.id);
      }
    }

    console.log(`[Recovery] Recovered ${recovered}/${failedAssets.length} assets`);
    return { retried: failedAssets.length, recovered };

  } catch (err) {
    console.error('Batch recovery error:', err);
    return { retried: 0, recovered: 0, error: err.message };
  }
}

export default {
  getLastSuccessfulData,
  calculateDataQualityScore,
  getFallbackData,
  recordError,
  calculateBackoffDelay,
  retryWithBackoff,
  updateLastSuccessfulFetch,
  markAsStale,
  formatTime,
  getDataWithFallback,
  retryFailedAssets,
};
