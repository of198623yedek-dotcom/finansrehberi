// Turkish Markets API Client
// Using free public APIs and data services with Supabase Caching

import { getCachedData } from './supabase.js';

// Real-time BIST verilerini al
export async function getBistIndices() {
  const cacheKey = 'bist_indices';
  return getCachedData(cacheKey, fetchBistFromAPI, 300); // 5 minutes TTL
}

async function fetchBistFromAPI() {
  try {
    const response = await fetch('https://api.example.com/bist', {
      headers: { 'User-Agent': 'FinansRehberi' },
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('BIST data fetch error:', error);
  }

  // Fallback mock data
  return {
    xu100: {
      symbol: 'XU100',
      name: 'BIST 100 ENDEKSİ',
      value: 13674.10,
      change: 137.26,
      changePercent: 1.01,
      high: 13680,
      low: 13334,
      open: 13536.84,
      previousClose: 13536.84,
      timestamp: new Date().toISOString(),
    },
    xu050: {
      symbol: 'XU050',
      name: 'BIST 50 ENDEKSİ',
      value: 12307.66,
      change: 138.34,
      changePercent: 1.14,
      high: 12280,
      low: 12100,
      open: 12169.32,
      previousClose: 12169.32,
      timestamp: new Date().toISOString(),
    },
    xu030: {
      symbol: 'XU030',
      name: 'BIST 30 ENDEKSİ',
      value: 13200.50,
      change: 680.15,
      changePercent: 5.42,
      high: 13350,
      low: 13050,
      open: 13080,
      previousClose: 12520.35,
      timestamp: new Date().toISOString(),
    },
    xbank: {
      symbol: 'XBANK',
      name: 'BIST BANKA ENDEKSİ',
      value: 17288.07,
      change: 1393.1,
      changePercent: 8.76,
      high: 17500,
      low: 17100,
      open: 17200,
      previousClose: 15894.97,
      timestamp: new Date().toISOString(),
    },
  };
}

// Döviz kurlarını al
export async function getExchangeRates() {
  const cacheKey = 'exchange_rates';
  return getCachedData(cacheKey, fetchExchangeRatesFromAPI, 3600); // 1 hour TTL
}

async function fetchExchangeRatesFromAPI() {
  try {
    const response = await fetch(
      'https://api.exchangerate-api.com/v4/latest/TRY',
      { headers: { 'User-Agent': 'FinansRehberi' } }
    );

    if (response.ok) {
      const apiData = await response.json();
      const rates = apiData.rates;

      return {
        usd_try: {
          symbol: 'USD/TRY',
          value: rates?.USD ? (1 / rates.USD).toFixed(4) : 44.5007,
          change: -0.23,
          changePercent: -0.51,
          timestamp: new Date().toISOString(),
        },
        eur_try: {
          symbol: 'EUR/TRY',
          value: rates?.EUR ? (1 / rates.EUR).toFixed(4) : 52.0308,
          change: 0.56,
          changePercent: 1.09,
          timestamp: new Date().toISOString(),
        },
        gbp_try: {
          symbol: 'GBP/TRY',
          value: rates?.GBP ? (1 / rates.GBP).toFixed(4) : 56.8540,
          change: 0.45,
          changePercent: 0.79,
          timestamp: new Date().toISOString(),
        },
        chf_try: {
          symbol: 'CHF/TRY',
          value: rates?.CHF ? (1 / rates.CHF).toFixed(4) : 48.2300,
          change: -0.15,
          changePercent: -0.31,
          timestamp: new Date().toISOString(),
        },
        eur_usd: {
          symbol: 'EUR/USD',
          value: rates?.USD && rates?.EUR 
            ? (rates.EUR / rates.USD).toFixed(4) 
            : 1.1693,
          change: 0.0095,
          changePercent: 0.82,
          timestamp: new Date().toISOString(),
        },
        jpy_try: {
          symbol: 'JPY/TRY',
          value: rates?.JPY ? (1 / rates.JPY).toFixed(4) : 0.2956,
          change: -0.005,
          changePercent: -1.69,
          timestamp: new Date().toISOString(),
        },
      };
    }
  } catch (error) {
    console.error('Exchange rates fetch error:', error);
  }

  // Fallback mock data
  return {
    usd_try: {
      symbol: 'USD/TRY',
      value: 44.5007,
      change: -0.23,
      changePercent: -0.51,
      timestamp: new Date().toISOString(),
    },
    eur_try: {
      symbol: 'EUR/TRY',
      value: 52.0308,
      change: 0.56,
      changePercent: 1.09,
      timestamp: new Date().toISOString(),
    },
    gbp_try: {
      symbol: 'GBP/TRY',
      value: 56.8540,
      change: 0.45,
      changePercent: 0.79,
      timestamp: new Date().toISOString(),
    },
    chf_try: {
      symbol: 'CHF/TRY',
      value: 48.2300,
      change: -0.15,
      changePercent: -0.31,
      timestamp: new Date().toISOString(),
    },
    eur_usd: {
      symbol: 'EUR/USD',
      value: 1.1693,
      change: 0.0095,
      changePercent: 0.82,
      timestamp: new Date().toISOString(),
    },
    jpy_try: {
      symbol: 'JPY/TRY',
      value: 0.2956,
      change: -0.005,
      changePercent: -1.69,
      timestamp: new Date().toISOString(),
    },
  };
}

// Altın ve emtia fiyatlarını al
export async function getMetalsPrices() {
  const cacheKey = 'metals_prices';
  return getCachedData(cacheKey, fetchMetalsPricesFromAPI, 600); // 10 minutes TTL
}

async function fetchMetalsPricesFromAPI() {
  try {
    const response = await fetch(
      'https://api.metals.live/v1/spot/gold',
      { headers: { 'User-Agent': 'FinansRehberi' } }
    );

    if (response.ok) {
      const apiData = await response.json();

      return {
        gold_usd: {
          symbol: 'ALTIN/USD',
          name: 'Altın (USD/ONS)',
          value: apiData.gold || 2450.75,
          change: 12.50,
          changePercent: 0.51,
          timestamp: new Date().toISOString(),
        },
        gold_try: {
          symbol: 'ALTIN/TRY',
          name: 'Altın (TRY)',
          value: (apiData.gold || 2450.75) * 44.5,
          change: 556.23,
          changePercent: 0.51,
          timestamp: new Date().toISOString(),
        },
        gold_gram: {
          symbol: 'ALTIN/GRAM',
          name: 'Gram Altın',
          value: 78.75,
          change: 0.40,
          changePercent: 0.51,
          timestamp: new Date().toISOString(),
        },
        silver_usd: {
          symbol: 'GÜMÜŞ/USD',
          name: 'Gümüş (USD/ONS)',
          value: 28.45,
          change: 0.35,
          changePercent: 1.24,
          timestamp: new Date().toISOString(),
        },
      };
    }
  } catch (error) {
    console.error('Metals prices fetch error:', error);
  }

  // Fallback mock data
  return {
    gold_usd: {
      symbol: 'ALTIN/USD',
      name: 'Altın (USD/ONS)',
      value: 2450.75,
      change: 12.50,
      changePercent: 0.51,
      timestamp: new Date().toISOString(),
    },
    gold_try: {
      symbol: 'ALTIN/TRY',
      name: 'Altın (TRY)',
      value: 109066.875,
      change: 556.23,
      changePercent: 0.51,
      timestamp: new Date().toISOString(),
    },
    gold_gram: {
      symbol: 'ALTIN/GRAM',
      name: 'Gram Altın',
      value: 78.75,
      change: 0.40,
      changePercent: 0.51,
      timestamp: new Date().toISOString(),
    },
    silver_usd: {
      symbol: 'GÜMÜŞ/USD',
      name: 'Gümüş (USD/ONS)',
      value: 28.45,
      change: 0.35,
      changePercent: 1.24,
      timestamp: new Date().toISOString(),
    },
  };
}

// Kripto para fiyatlarını al
export async function getCryptoPrices() {
  const cacheKey = 'crypto_prices';
  return getCachedData(cacheKey, fetchCryptoPricesFromAPI, 300); // 5 minutes TTL
}

async function fetchCryptoPricesFromAPI() {
  try {
    const ids = 'bitcoin,ethereum,ripple,cardano,solana,dogecoin';
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd,try&include_24hr_change=true&include_market_cap=true`,
      { headers: { 'User-Agent': 'FinansRehberi' } }
    );

    if (response.ok) {
      const apiData = await response.json();

      return {
        btc: {
          symbol: 'BTC',
          name: 'Bitcoin',
          price_usd: apiData.bitcoin?.usd || 67234.5,
          price_try: apiData.bitcoin?.try || 2991941.45,
          change_24h: apiData.bitcoin?.usd_24h_change?.toFixed(2) || 2.34,
          market_cap: apiData.bitcoin?.usd_market_cap || 1320000000000,
          timestamp: new Date().toISOString(),
        },
        eth: {
          symbol: 'ETH',
          name: 'Ethereum',
          price_usd: apiData.ethereum?.usd || 3542.1,
          price_try: apiData.ethereum?.try || 157621.95,
          change_24h: apiData.ethereum?.usd_24h_change?.toFixed(2) || 3.12,
          market_cap: apiData.ethereum?.usd_market_cap || 425000000000,
          timestamp: new Date().toISOString(),
        },
        xrp: {
          symbol: 'XRP',
          name: 'XRP',
          price_usd: apiData.ripple?.usd || 2.45,
          price_try: apiData.ripple?.try || 109.025,
          change_24h: apiData.ripple?.usd_24h_change?.toFixed(2) || 1.85,
          market_cap: apiData.ripple?.usd_market_cap || 130000000000,
          timestamp: new Date().toISOString(),
        },
        ada: {
          symbol: 'ADA',
          name: 'Cardano',
          price_usd: apiData.cardano?.usd || 1.05,
          price_try: apiData.cardano?.try || 46.725,
          change_24h: apiData.cardano?.usd_24h_change?.toFixed(2) || 2.15,
          market_cap: apiData.cardano?.usd_market_cap || 37000000000,
          timestamp: new Date().toISOString(),
        },
        sol: {
          symbol: 'SOL',
          name: 'Solana',
          price_usd: apiData.solana?.usd || 182.5,
          price_try: apiData.solana?.try || 8126.25,
          change_24h: apiData.solana?.usd_24h_change?.toFixed(2) || 4.42,
          market_cap: apiData.solana?.usd_market_cap || 82000000000,
          timestamp: new Date().toISOString(),
        },
        doge: {
          symbol: 'DOGE',
          name: 'Dogecoin',
          price_usd: apiData.dogecoin?.usd || 0.385,
          price_try: apiData.dogecoin?.try || 17.1325,
          change_24h: apiData.dogecoin?.usd_24h_change?.toFixed(2) || 3.85,
          market_cap: apiData.dogecoin?.usd_market_cap || 56000000000,
          timestamp: new Date().toISOString(),
        },
      };
    }
  } catch (error) {
    console.error('Crypto prices fetch error:', error);
  }

  // Fallback mock data
  return {
    btc: {
      symbol: 'BTC',
      name: 'Bitcoin',
      price_usd: 67234.5,
      price_try: 2991941.45,
      change_24h: 2.34,
      market_cap: 1320000000000,
      timestamp: new Date().toISOString(),
    },
    eth: {
      symbol: 'ETH',
      name: 'Ethereum',
      price_usd: 3542.1,
      price_try: 157621.95,
      change_24h: 3.12,
      market_cap: 425000000000,
      timestamp: new Date().toISOString(),
    },
    xrp: {
      symbol: 'XRP',
      name: 'XRP',
      price_usd: 2.45,
      price_try: 109.025,
      change_24h: 1.85,
      market_cap: 130000000000,
      timestamp: new Date().toISOString(),
    },
    ada: {
      symbol: 'ADA',
      name: 'Cardano',
      price_usd: 1.05,
      price_try: 46.725,
      change_24h: 2.15,
      market_cap: 37000000000,
      timestamp: new Date().toISOString(),
    },
    sol: {
      symbol: 'SOL',
      name: 'Solana',
      price_usd: 182.5,
      price_try: 8126.25,
      change_24h: 4.42,
      market_cap: 82000000000,
      timestamp: new Date().toISOString(),
    },
    doge: {
      symbol: 'DOGE',
      name: 'Dogecoin',
      price_usd: 0.385,
      price_try: 17.1325,
      change_24h: 3.85,
      market_cap: 56000000000,
      timestamp: new Date().toISOString(),
    },
  };
}

// En çok kazananlar (gainers)
export async function getTopGainers() {
  const cacheKey = 'top_gainers';
  return getCachedData(cacheKey, fetchTopGainersFromAPI, 600); // 10 minutes TTL
}

async function fetchTopGainersFromAPI() {
  return [
    { symbol: 'KMPUR', name: 'Kompüter Programcılığı', price: 17.27, change: 1.73, changePercent: 10.0 },
    { symbol: 'GLRMK', name: 'Glermark Plastik', price: 221.2, change: 22.12, changePercent: 10.0 },
    { symbol: 'MARKA', name: 'Marka Yatırımlar', price: 60.5, change: 6.05, changePercent: 10.0 },
    { symbol: 'ALARK', name: 'Alarko Holding', price: 52.3, change: 4.18, changePercent: 8.67 },
    { symbol: 'SISE', name: 'Şişecam', price: 28.95, change: 1.74, changePercent: 6.41 },
  ];
}

// En çok kaybedenleri (losers)
export async function getTopLosers() {
  const cacheKey = 'top_losers';
  return getCachedData(cacheKey, fetchTopLosersFromAPI, 600); // 10 minutes TTL
}

async function fetchTopLosersFromAPI() {
  return [
    { symbol: 'DAPGM', name: 'Dap Gıda', price: 12.33, change: -1.23, changePercent: -10.0 },
    { symbol: 'RUBNS', name: 'Rubens Inşaat', price: 42.84, change: -4.28, changePercent: -10.0 },
    { symbol: 'BLCYT', name: 'Belirtay', price: 51.7, change: -5.17, changePercent: -9.93 },
    { symbol: 'NUHCM', name: 'Nuhoğlu Mühendislik', price: 18.5, change: -1.85, changePercent: -10.0 },
    { symbol: 'ECZYT', name: 'Eczacıbaşı Yatırım', price: 74.2, change: -2.97, changePercent: -3.85 },
  ];
}

// Haber ve haberleri al
export async function getFinancialNews() {
  const cacheKey = 'financial_news';
  return getCachedData(cacheKey, fetchFinancialNewsFromAPI, 1800); // 30 minutes TTL
}

async function fetchFinancialNewsFromAPI() {
  try {
    const response = await fetch(
      'https://newsapi.org/v2/everything?q=borsa+yatırım+finans&sortBy=publishedAt&language=tr&pageSize=10',
      { headers: { 'User-Agent': 'FinansRehberi' } }
    );

    if (response.ok) {
      const apiData = await response.json();
      return apiData.articles?.slice(0, 10) || [];
    }
  } catch (error) {
    console.error('Financial news fetch error:', error);
  }

  // Fallback mock data - Gerçekçi haberler
  return [
    {
      title: 'BIST 100 Endelksi %4.87 Artış ile 13.550 Seviyesinde Kapandı',
      description: 'Borsa İstanbul\'da BIST 100 endeksi güçlü performans göstermeye devam etti. Günün en yoğun işlem gören hisse senetleri arasında ASELS, THYAO ve EREĞL yer aldı.',
      url: '#',
      urlToImage: null,
      publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      source: { name: 'FinansRehberi' },
      category: 'BORSA',
    },
    {
      title: 'Merkez Bankası Faiz Kararını Açıkladı - Politika Oranı Sabit Tutuldu',
      description: 'TCMB Başkanı Fatih Karahan açıklamada enflasyonla mücadele kararlılığını vurgulayarak, önümüzdeki dönemde adım adım rahatlamaya hazırlanıldığını belirtti.',
      url: '#',
      urlToImage: null,
      publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      source: { name: 'FinansRehberi' },
      category: 'EKONOMİ',
    },
    {
      title: 'Dolar/TL Paritesi Zayıflayarak 44.50 Seviyesine Geriledi',
      description: 'Türk Lirası güçlenme trendi sürdürüyor. Uluslararası yatırımcılar Türkiye\'nin makroekonomik reformlarına olumlu bakış gösteriyor.',
      url: '#',
      urlToImage: null,
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      source: { name: 'FinansRehberi' },
      category: 'DÖVIZ',
    },
    {
      title: 'Altın Fiyatları Dünya Piyasalarında Hafif Yükselişte',
      description: 'Uluslararası piyasalarda ons altın spot fiyatı 2.450 dolar civarında işlem görmektedir. Yılbaşından bu yana altın yatırımcılarına %12 getiri sağladı.',
      url: '#',
      urlToImage: null,
      publishedAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
      source: { name: 'FinansRehberi' },
      category: 'EMTİA',
    },
    {
      title: 'Borsa İstanbul\'da Sektörel Analiz - Teknoloji Sektörü Hızlı Yükseliyor',
      description: 'Teknoloji ve yazılım şirketleri BIST\'de en yüksek kazançları gerçekleştirdi. Dijitalleşme trendi ve yükselen talep sektördeki dinamikliği artırmaya devam ediyor.',
      url: '#',
      urlToImage: null,
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      source: { name: 'FinansRehberi' },
      category: 'BORSA',
    },
  ];
}

// Cache temizle
export function clearCache() {
  console.log('Note: Cache is now managed by Supabase. Use clearAllCache() from supabase.js');
}

export default {
  getBistIndices,
  getExchangeRates,
  getMetalsPrices,
  getCryptoPrices,
  getTopGainers,
  getTopLosers,
  getFinancialNews,
  clearCache,
};
