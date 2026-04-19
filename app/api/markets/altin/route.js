export async function GET() {
  try {
    const altinVerileri = {
      ons_altin: {
        symbol: 'ALTIN/ONS',
        name: 'Ons Altın',
        price: 4756.37,
        change: 0.79,
        changePercent: 0.02,
        bid: 4756.40,
        ask: 4757.28,
        high: 4780.00,
        low: 4650.00,
        previousClose: 4750.58,
        currency: '$'
      },
      gram_altin: {
        symbol: 'GRAM ALTIN',
        name: 'Gram Altın',
        price: 6756.47,
        change: 0.00,
        changePercent: 0.00,
        bid: 6755.67,
        ask: 6756.47,
        high: 6774.02,
        low: 6722.14,
        previousClose: 6756.57,
        currency: '₺'
      },
      ceyrek_altin: {
        symbol: 'ÇEYREK ALTIN',
        name: 'Çeyrek Altın',
        price: 11046.83,
        change: 0.00,
        changePercent: 0.00,
        bid: 10809.07,
        ask: 11046.83,
        high: 11075.52,
        low: 10990.70,
        previousClose: 11046.99,
        currency: '₺'
      },
      cumhuriyet_altini: {
        symbol: 'CUMHURİYET ALTINI',
        name: 'Cumhuriyet Altını',
        price: 44052.18,
        change: 0.00,
        changePercent: 0.00,
        bid: 43236.28,
        ask: 44052.18,
        high: 44166.61,
        low: 43828.34,
        previousClose: 44052.84,
        currency: '₺'
      },
      yarim_altin: {
        symbol: 'YARIM ALTIN',
        name: 'Yarım Altın',
        price: 22026.09,
        change: 0.00,
        changePercent: 0.00,
        bid: 21618.14,
        ask: 22026.09,
        high: 22083.31,
        low: 21914.17,
        previousClose: 22026.49,
        currency: '₺'
      },
      gumus_bilezik: {
        symbol: '14 AYAR BİLEZİK',
        name: '14 Ayar Bilezik',
        price: 2351.42,
        change: 0.15,
        changePercent: 0.01,
        bid: 2350.00,
        ask: 2352.00,
        high: 2360.00,
        low: 2340.00,
        previousClose: 2351.27,
        currency: '₺'
      },
      bilezik_22_ayar: {
        symbol: '22 AYAR BİLEZİK',
        name: '22 Ayar Bilezik',
        price: 3689.15,
        change: -0.50,
        changePercent: -0.01,
        bid: 3687.50,
        ask: 3690.00,
        high: 3700.00,
        low: 3680.00,
        previousClose: 3689.65,
        currency: '₺'
      },
      gumus: {
        symbol: 'GÜMÜŞ/ONS',
        name: 'Gümüş (ONS)',
        price: 28.45,
        change: 0.35,
        changePercent: 1.24,
        bid: 28.40,
        ask: 28.50,
        high: 29.00,
        low: 27.80,
        previousClose: 28.10,
        currency: '$'
      }
    };

    return Response.json(
      {
        altin: altinVerileri,
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=15, stale-while-revalidate=30',
        },
      }
    );
  } catch (error) {
    console.error('Altın veri çekme hatası:', error);
    return Response.json(
      { error: 'Veri çekme hatası' },
      { status: 500 }
    );
  }
}
