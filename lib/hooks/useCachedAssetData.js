import useSWR from 'swr';

/**
 * SWR fetcher fonksiyonu
 * URL'den veri çeker ve JSON dönüştürür
 */
const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }
  return res.json();
};

/**
 * Custom hook: Finansal varlık verilerini SWR ile cache'le
 * 
 * Özellikler:
 * ✅ 5 dakika cache (revalidateOnFocus: false)
 * ✅ Arka planda güncelleme (revalidateOnFocus: false)
 * ✅ Error handling
 * ✅ Loading state
 * ✅ Deduplication (aynı API'ye multiple requests gitmez)
 */
export function useCachedAssetData(apiEndpoint) {
  // SWR configuration
  const { data, error, isLoading, mutate } = useSWR(
    apiEndpoint, // null olabilir, SWR bunu handle eder (fetch etmez)
    fetcher,
    {
      // Cache ve revalidation ayarları
      revalidateOnFocus: false,           // Focus'ta yeniden çekme
      revalidateOnReconnect: true,        // İnternet reconnect'de yeniden çek
      dedupingInterval: 60000,            // 1 dakika: aynı request'i dedupe et
      focusThrottleInterval: 300000,      // 5 dakika: focus throttle
      compare: (a, b) => JSON.stringify(a) === JSON.stringify(b),
      
      // Arka planda güncelleme
      refreshInterval: 300000,            // 5 dakikada bir arka planda güncelle
      refreshWhenOffline: false,          // Offline'da refresh yapma
      refreshWhenHidden: false,           // Tab gizli iken refresh yapma
      
      // Error handling
      shouldRetryOnError: true,
      errorRetryCount: 3,
      errorRetryInterval: 5000,           // 5 saniye ara ile retry
      
      // Performance
      keepPreviousData: true,             // Eski data'yı tut (smooth transition)
    }
  );

  return {
    data,
    error,
    isLoading: isLoading && !data,
    mutate,
    isValidating: !data && !error && isLoading,
    isEmpty: data && Object.keys(data).length === 0,
  };
}

/**
 * Hook: Multiple endpoint'lerden paralel veri çekme
 * ⚠️ BU HOOK ŞUANDA KULLANILMIYOR - React Hook Rules'a uygun değil
 * Bunun yerine component'te ayrı hook çağrıları yap
 */
export function useCachedMultipleData(endpoints) {
  // React Hook Rules ihlali (hooks loops'ta çağrılamaz)
  // Component'te manuel olarak her endpoint için useCachedAssetData çağır
  console.warn('useCachedMultipleData deprecated - use individual hooks in component');
  return {};
}

/**
 * Hook: Polling ile real-time güncelleme
 * (Örn: seçme başında her 10 saniyede bir güncelle)
 */
export function useCachedAssetDataWithPolling(apiEndpoint, pollInterval = 10000) {
  const { data, error, isLoading, mutate } = useSWR(
    apiEndpoint,
    fetcher,
    {
      revalidateOnFocus: false,
      refreshInterval: pollInterval,      // Custom poll interval
      keepPreviousData: true,
      dedupingInterval: 60000,
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
    isValidating: !data && !error,
  };
}

/**
 * Hook: Error retry stratejisi
 * Exponential backoff ile retry
 */
export function useCachedAssetDataWithRetry(apiEndpoint) {
  const { data, error, isLoading, mutate } = useSWR(
    apiEndpoint,
    fetcher,
    {
      revalidateOnFocus: false,
      refreshInterval: 300000,
      keepPreviousData: true,
      
      // Exponential backoff retry
      errorRetryCount: 5,
      errorRetryInterval: (retryCount) => {
        return Math.min(1000 * 2 ** retryCount, 30000);
      },
      
      // Fallback data (stale data)
      fallbackData: {},
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
    retryCount: error ? 5 : 0,
  };
}

export default useCachedAssetData;
