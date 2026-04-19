// Supabase Configuration & Cache Management
import { createClient } from '@supabase/supabase-js';

// Environment variables - .env.local dosyasında tanımla
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Initialize Supabase client
let supabaseClient = null;

export function getSupabaseClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('Supabase credentials not configured. Using fallback data only.');
    return null;
  }

  if (!supabaseClient) {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  return supabaseClient;
}

/**
 * Cache'den veri al veya API'dan çek ve cache'e kaydet
 * @param {string} cacheKey - Unique cache key
 * @param {Function} fetchFunction - Veri çeken fonksiyon
 * @param {number} ttl - Time to live in seconds (default: 300 = 5 minutes)
 * @returns {Object} Cached or fresh data
 */
export async function getCachedData(cacheKey, fetchFunction, ttl = 300) {
  const supabase = getSupabaseClient();

  // Supabase olmadığında fallback data'yı direkt döndür
  if (!supabase) {
    console.log(`[Cache] Supabase unavailable. Using fresh fetch for: ${cacheKey}`);
    try {
      return await fetchFunction();
    } catch (error) {
      console.error(`[Cache] Fresh fetch failed for ${cacheKey}:`, error);
      return null;
    }
  }

  try {
    // 1. Cache'den veri çek
    const { data: cachedData, error: selectError } = await supabase
      .from('markets_cache')
      .select('data, created_at')
      .eq('cache_key', cacheKey)
      .single();

    if (selectError && selectError.code !== 'PGRST116') {
      // PGRST116 = no rows found (normal)
      console.error(`[Cache] Select error for ${cacheKey}:`, selectError);
    }

    // 2. Cache'de veri varsa ve TTL'si geçmediyse döndür
    if (cachedData) {
      const createdTime = new Date(cachedData.created_at).getTime();
      const now = Date.now();
      const ageSeconds = (now - createdTime) / 1000;

      if (ageSeconds < ttl) {
        console.log(`[Cache] HIT for ${cacheKey} (age: ${Math.round(ageSeconds)}s)`);
        return cachedData.data;
      }

      console.log(`[Cache] EXPIRED for ${cacheKey} (age: ${Math.round(ageSeconds)}s > ${ttl}s)`);
    }

    // 3. Cache miss veya expired - yeni veri çek
    console.log(`[Cache] MISS for ${cacheKey}. Fetching fresh data...`);
    const freshData = await fetchFunction();

    if (!freshData) {
      // Fetch başarısız oldu - eski veriyi döndür (stale data)
      if (cachedData) {
        console.log(`[Cache] Fetch failed. Returning STALE data for ${cacheKey}`);
        return cachedData.data;
      }
      return null;
    }

    // 4. Yeni veriyi cache'e kaydet (upsert)
    try {
      const { error: upsertError } = await supabase
        .from('markets_cache')
        .upsert(
          {
            cache_key: cacheKey,
            data: freshData,
            created_at: new Date().toISOString(),
          },
          { onConflict: 'cache_key' }
        );

      if (upsertError) {
        console.error(`[Cache] Upsert error for ${cacheKey}:`, upsertError);
      } else {
        console.log(`[Cache] Saved fresh data for ${cacheKey}`);
      }
    } catch (upsertErr) {
      console.error(`[Cache] Upsert exception for ${cacheKey}:`, upsertErr);
    }

    return freshData;
  } catch (error) {
    console.error(`[Cache] Unexpected error for ${cacheKey}:`, error);

    // Hata durumunda fallback olarak fresh fetch'i deneme
    try {
      return await fetchFunction();
    } catch (fallbackError) {
      console.error(`[Cache] Fallback fetch also failed for ${cacheKey}:`, fallbackError);
      return null;
    }
  }
}

/**
 * Cache'i manuel olarak sil
 */
export async function clearCache(cacheKey) {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  try {
    const { error } = await supabase
      .from('markets_cache')
      .delete()
      .eq('cache_key', cacheKey);

    if (error) {
      console.error(`[Cache] Clear error for ${cacheKey}:`, error);
      return false;
    }

    console.log(`[Cache] Cleared: ${cacheKey}`);
    return true;
  } catch (error) {
    console.error(`[Cache] Clear exception for ${cacheKey}:`, error);
    return false;
  }
}

/**
 * Tüm cache'i sil
 */
export async function clearAllCache() {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  try {
    const { error } = await supabase
      .from('markets_cache')
      .delete()
      .neq('cache_key', '');

    if (error) {
      console.error('[Cache] Clear all error:', error);
      return false;
    }

    console.log('[Cache] Cleared all cache');
    return true;
  } catch (error) {
    console.error('[Cache] Clear all exception:', error);
    return false;
  }
}

export default {
  getSupabaseClient,
  getCachedData,
  clearCache,
  clearAllCache,
};
