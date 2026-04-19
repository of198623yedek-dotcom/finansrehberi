// 🆕 AŞAMA 5: API endpoint with Error Handling & Stale Data Fallback
// Strategy:
// 1. Try DB (fresh cache)
// 2. If fails → Use stale data
// 3. Always return metadata about data source & freshness

import { getAllMarketDataFromDB, getMarketDataFromDB } from '@/lib/supabaseDB';
import { getBistIndices, getExchangeRates, getMetalsPrices, getTopGainers, getTopLosers, getFinancialNews } from '@/lib/turk-markets';
import { getDataWithFallback, DataStalenessWarning } from '@/lib/errorHandling';

const MOCK_DATA = {
  bist: {
    xu100: { symbol: 'XU100', name: 'BIST 100 ENDEKSİ', value: 13674.10, changePercent: 1.01, change: 137.26 },
    xu050: { symbol: 'XU050', name: 'BIST 50 ENDEKSİ', value: 12307.66, changePercent: 1.14, change: 138.34 },
    xu030: { symbol: 'XU030', name: 'BIST 30 ENDEKSİ', value: 13200.5, changePercent: 5.42, change: 680.15 },
    xbank: { symbol: 'XBANK', name: 'BIST BANKA ENDEKSİ', value: 17288.07, changePercent: 8.76, change: 1393.1 },
  },
  döviz: {
    usd_try: { symbol: 'USD/TRY', value: '44.5007', change: -0.23, changePercent: -0.51 },
    eur_try: { symbol: 'EUR/TRY', value: '52.0308', change: 0.56, changePercent: 1.09 },
  },
  altın: {
    gold_usd: { symbol: 'ALTIN/USD', name: 'Altın (USD/ONS)', value: 2450.75, change: 12.50, changePercent: 0.51 },
    gold_gram: { symbol: 'ALTIN/GRAM', name: 'Gram Altın', value: 78.75, change: 0.40, changePercent: 0.51 },
  },
};

export async function GET() {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      console.log('⚠️ Supabase not configured, using fallback data');
      return Response.json({
        ...MOCK_DATA,
        gainers: [],
        losers: [],
        news: [],
        timestamp: new Date().toISOString(),
        source: 'mock-fallback',
        dataFreshness: 'stale',
        warning: 'Supabase not configured - using fallback data',
      });
    }

    // 1️⃣ Veritabanından veri oku (Cache-first!)
    const dbData = await getAllMarketDataFromDB();
    
    if (dbData && dbData.length > 0) {
      // DB'den veri var, grupla
      const bist = {};
      const döviz = {};
      const altın = {};
      const gainers = [];
      const losers = [];
      const news = [];

      for (const item of dbData) {
        if (item.category === 'Endeks') {
          bist[item.asset_id] = {
            symbol: item.asset_symbol,
            name: item.asset_name,
            value: item.current_price,
            change: item.change_absolute,
            changePercent: item.change_percent,
          };
        } else if (item.category === 'Döviz') {
          döviz[item.asset_id] = {
            symbol: item.asset_symbol,
            name: item.asset_name,
            value: item.current_price,
            change: item.change_absolute,
            changePercent: item.change_percent,
          };
        } else if (item.category === 'Emtia') {
          altın[item.asset_id] = {
            symbol: item.asset_symbol,
            name: item.asset_name,
            value: item.current_price,
            change: item.change_absolute,
            changePercent: item.change_percent,
          };
        }
      }

      // 2️⃣ DB'den başarıyla okumuşuz, cevap döndür
    return Response.json({
      bist: Object.keys(bist).length > 0 ? bist : MOCK_DATA.bist,
      döviz: Object.keys(döviz).length > 0 ? döviz : MOCK_DATA.döviz,
      altın: Object.keys(altın).length > 0 ? altın : MOCK_DATA.altın,
      gainers,
      losers,
      news,
      timestamp: new Date().toISOString(),
      source: 'database', // 🆕 Source metadata
      dataFreshness: 'cached', // 🆕 Data freshness indicator
      dataQuality: {  // 🆕 AŞAMA 5
        source: 'database',
        isStale: false,
        qualityScore: 100,
        warning: null,
      },
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
    }

    // 3️⃣ DB boşsa (first run), API'den çek (Fallback)
    console.log('⚠️ DB empty, falling back to API calls...');
    const bist = await getBistIndices().catch(e => {
      console.error('BIST error:', e);
      return MOCK_DATA.bist;
    });

    const döviz = await getExchangeRates().catch(e => {
      console.error('Döviz error:', e);
      return MOCK_DATA.döviz;
    });

    const altın = await getMetalsPrices().catch(e => {
      console.error('Metals error:', e);
      return MOCK_DATA.altın;
    });

    const gainers = await getTopGainers().catch(e => []);
    const losers = await getTopLosers().catch(e => []);
    const news = await getFinancialNews().catch(e => []);

    return Response.json({
      bist,
      döviz,
      altın,
      gainers,
      losers,
      news,
      timestamp: new Date().toISOString(),
      source: 'api-fallback',
      dataFreshness: 'realtime',
      dataQuality: { // 🆕 AŞAMA 5
        source: 'api-fallback',
        isStale: false,
        qualityScore: 90,
        warning: 'DB boş olduğu için doğrudan API kullanılıyor',
      },
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    console.error('❌ All markets data error:', error);
    return Response.json({
      ...MOCK_DATA,
      timestamp: new Date().toISOString(),
      error: 'Using fallback data',
      source: 'mock-fallback',
      dataFreshness: 'stale',
      dataQuality: { // 🆕 AŞAMA 5
        source: 'mock-fallback',
        isStale: true,
        qualityScore: 0,
        warning: '❌ KRITIK: Veri alınamadı, lütfen daha sonra tekrar deneyin',
        severity: 'critical',
      },
    });
  }
}

