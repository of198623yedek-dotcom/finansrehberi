import { createClient } from '@supabase/supabase-js';

// Gracefully handle missing env vars
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

let supabase = null;
let supabaseConfigured = false;

try {
  if (supabaseUrl && supabaseKey && supabaseUrl.includes('supabase')) {
    supabase = createClient(supabaseUrl, supabaseKey);
    supabaseConfigured = true;
  }
} catch (err) {
  console.warn('⚠️ Supabase initialization skipped:', err.message);
}

/**
 * Market data'yı veritabanından oku
 */
export async function getMarketDataFromDB(assetId) {
  if (!supabaseConfigured || !supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('market_data')
      .select('*')
      .eq('asset_id', assetId)
      .single();

    if (error) {
      console.error(`DB read error for ${assetId}:`, error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Database read error:', err);
    return null;
  }
}

/**
 * Tüm market data'yı veritabanından oku
 */
export async function getAllMarketDataFromDB() {
  if (!supabaseConfigured || !supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('market_data')
      .select('*')
      .order('last_updated_at', { ascending: false });

    if (error) {
      console.error('DB read all error:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Database read all error:', err);
    return [];
  }
}

/**
 * Market data'yı veritabanına yaz/güncelle (upsert)
 */
export async function upsertMarketData(assetId, marketData) {
  if (!supabaseConfigured || !supabase) {
    return false;
  }

  try {
    const { error } = await supabase
      .from('market_data')
      .upsert({
        asset_id: assetId,
        asset_name: marketData.name,
        asset_symbol: marketData.symbol,
        category: marketData.category,
        current_price: marketData.value,
        price_usd: marketData.price_usd,
        change_absolute: marketData.change,
        change_percent: marketData.changePercent,
        market_cap: marketData.market_cap,
        volume_24h: marketData.volume_24h,
        high_24h: marketData.high,
        low_24h: marketData.low,
        last_updated_at: new Date(),
        data_freshness_seconds: 0,
        api_source: marketData.source || 'finnhub',
        error_count: 0,
        last_error: null,
      }, {
        onConflict: 'asset_id'
      });

    if (error) {
      console.error(`DB write error for ${assetId}:`, error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Database write error:', err);
    return false;
  }
}

/**
 * Cron execution'ı log'la
 */
export async function logCronExecution(jobName, status, details) {
  if (!supabaseConfigured || !supabase) {
    return;
  }

  try {
    const { error } = await supabase
      .from('cron_execution_log')
      .insert({
        job_name: jobName,
        executed_at: new Date(),
        status,
        items_updated: details.updated || 0,
        items_failed: details.failed || 0,
        error_message: details.error || null,
        details: details,
        triggered_by: 'vercel-cron',
      });

    if (error) {
      console.error('Cron log error:', error);
    }
  } catch (err) {
    console.error('Cron logging error:', err);
  }
}

/**
 * API call statistics'i güncelle
 */
export async function updateAPICallStats(provider, endpoint, remainingCalls, resetTime) {
  if (!supabaseConfigured || !supabase) {
    return;
  }

  try {
    const { error } = await supabase
      .from('api_call_stats')
      .upsert({
        api_provider: provider,
        endpoint,
        calls_last_hour: remainingCalls ? 600 - remainingCalls : 0,
        rate_limit_remaining: remainingCalls,
        rate_limit_reset_at: resetTime,
        last_called_at: new Date(),
        is_rate_limited: (remainingCalls || 0) < 10,
      }, {
        onConflict: 'api_provider, endpoint'
      });

    if (error) {
      console.error('API stats update error:', error);
    }
  } catch (err) {
    console.error('API stats error:', err);
  }
}

/**
 * Failed asset'i queue'ya ekle (retry için)
 */
export async function addFailedAssetToQueue(assetId, assetName, reason) {
  if (!supabaseConfigured || !supabase) {
    return;
  }

  try {
    const { error } = await supabase
      .from('failed_assets_queue')
      .insert({
        asset_id: assetId,
        asset_name: assetName,
        reason,
        retry_count: 0,
        next_retry_at: new Date(Date.now() + 5 * 60 * 1000),
      });

    if (error) {
      console.error('Failed asset queue error:', error);
    }
  } catch (err) {
    console.error('Failed asset queue insert error:', err);
  }
}

/**
 * Assets needing update'i oku
 */
export async function getAssetsNeedingUpdate(maxAgeSeconds = 300) {
  if (!supabaseConfigured || !supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .rpc('get_assets_needing_update', {
        max_age_seconds: maxAgeSeconds
      });

    if (error) {
      console.error('Get assets needing update error:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Assets needing update error:', err);
    return [];
  }
}

/**
 * Cron job health status'ü oku
 */
export async function getCronJobHealth(jobName = null) {
  if (!supabaseConfigured || !supabase) {
    return [];
  }

  try {
    let query = supabase
      .from('cron_job_health')
      .select('*');

    if (jobName) {
      query = query.eq('job_name', jobName);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Cron health error:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Cron health status error:', err);
    return [];
  }
}

/**
 * Veritabanı bağlantısını test et
 */
export async function testDatabaseConnection() {
  if (!supabaseConfigured || !supabase) {
    return { connected: false, error: 'Supabase not configured' };
  }

  try {
    const { data, error } = await supabase
      .from('market_data')
      .select('COUNT(*)', { count: 'exact', head: true });

    if (error) {
      console.error('Database connection test failed:', error);
      return { connected: false, error: error.message };
    }

    return { connected: true, timestamp: new Date() };
  } catch (err) {
    console.error('Database test error:', err);
    return { connected: false, error: err.message };
  }
}

/**
 * Veritabanını sıfırla (development sadece)
 */
export async function resetDatabase() {
  if (!supabaseConfigured || !supabase) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    await supabase.from('market_data').delete().neq('id', 0);
    await supabase.from('cron_execution_log').delete().neq('id', 0);
    await supabase.from('api_call_stats').delete().neq('id', 0);
    await supabase.from('failed_assets_queue').delete().neq('id', 0);

    return { success: true };
  } catch (err) {
    console.error('Database reset error:', err);
    return { success: false, error: err.message };
  }
}

export default {
  getMarketDataFromDB,
  getAllMarketDataFromDB,
  upsertMarketData,
  logCronExecution,
  updateAPICallStats,
  addFailedAssetToQueue,
  getAssetsNeedingUpdate,
  getCronJobHealth,
  testDatabaseConnection,
  resetDatabase,
};
