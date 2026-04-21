import { getAllMarketDataFromDB } from '@/lib/supabaseDB';
import { getBistIndices, getExchangeRates, getMetalsPrices, getTopGainers, getTopLosers, getFinancialNews } from '@/lib/turk-markets';

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
};

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    // 1️⃣ Veritabanından veriyi çek
    const dbData = await getAllMarketDataFromDB();
    
    // Veri tazelik kontrolü (en yeni verinin tarihine bak)
    let isStale = true;
    if (dbData && dbData.length > 0) {
      const latestUpdate = new Date(dbData[0].last_updated_at).getTime();
      const now = Date.now();
      // 5 dakikadan (300.000 ms) yeni veri varsa tazedir
      if (now - latestUpdate < 300000) {
        isStale = false;
      }
    }

    // 2️⃣ Eğer veri çok eskiyse veya hiç yoksa, ARKA PLANDA güncelleme tetikle
    // Not: Bu işlem isteği bekletmez, Vercel Hobby için idealdir.
    if (isStale) {
      console.log('🕒 Data is stale, triggering background update...');
      // Kendi API endpoint'imizi gizli bir şekilde (header ile) tetikliyoruz
      // fetch'i await etmiyoruz ki kullanıcıyı bekletmesin
      const protocol = req.headers.get('x-forwarded-proto') || 'http';
      const host = req.headers.get('host');
      const updateUrl = `${protocol}://${host}/api/cron/update-markets`;
      
      fetch(updateUrl, {
        headers: { 'Authorization': `Bearer ${process.env.CRON_SECRET}` }
      }).catch(err => console.error('Background update trigger failed:', err));
    }

    if (dbData && dbData.length > 0) {
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

      return Response.json({
        bist: Object.keys(bist).length > 0 ? bist : MOCK_DATA.bist,
        döviz: Object.keys(döviz).length > 0 ? döviz : MOCK_DATA.döviz,
        altın: Object.keys(altın).length > 0 ? altın : {},
        gainers,
        losers,
        news,
        timestamp: new Date().toISOString(),
        source: 'database',
        dataFreshness: isStale ? 'stale-revalidating' : 'fresh'
      });
    }

    // 3️⃣ DB boşsa ilk seferlik API'den çek ve döndür (User beklemek zorunda kalır ama sadece 1 kez)
    const bist = await getBistIndices();
    const döviz = await getExchangeRates();
    const altın = await getMetalsPrices();

    return Response.json({
      bist,
      döviz,
      altın,
      timestamp: new Date().toISOString(),
      source: 'direct-api-fallback'
    });

  } catch (error) {
    console.error('❌ API Error:', error);
    return Response.json({
      ...MOCK_DATA,
      timestamp: new Date().toISOString(),
      source: 'mock-fallback',
      error: error.message
    });
  }
}
