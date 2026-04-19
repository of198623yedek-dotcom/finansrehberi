export async function GET() {
  try {
    // Gerçekçi BIST 100 hisse senetleri verileri
    const hisseler = [
      { symbol: 'AEFES', name: 'Anadolu Efes', price: 17.60, change: 0.86, changePercent: 5.13, buy: 17.57, sell: 17.58, low: 17.28, high: 17.70, volume: 26481869, volumeTRY: 466800000 },
      { symbol: 'ASELS', name: 'Aselsan', price: 542.50, change: 18.30, changePercent: 3.48, buy: 540.00, sell: 543.00, low: 525.00, high: 550.00, volume: 12345678, volumeTRY: 6700000000 },
      { symbol: 'THYAO', name: 'Türk Hava Yolları', price: 38.24, change: 1.22, changePercent: 3.30, buy: 38.10, sell: 38.40, low: 37.50, high: 39.00, volume: 45678901, volumeTRY: 1750000000 },
      { symbol: 'EREGL', name: 'Ereğli Demir Çelik', price: 62.35, change: 1.87, changePercent: 3.09, buy: 62.00, sell: 62.50, low: 60.50, high: 63.00, volume: 23456789, volumeTRY: 1460000000 },
      { symbol: 'TUPRS', name: 'Tüpraş', price: 105.80, change: 2.50, changePercent: 2.42, buy: 105.50, sell: 106.00, low: 103.00, high: 107.50, volume: 34567890, volumeTRY: 3650000000 },
      { symbol: 'SISE', name: 'Şişecam', price: 28.95, change: 0.82, changePercent: 2.91, buy: 28.80, sell: 29.10, low: 28.10, high: 29.50, volume: 56789012, volumeTRY: 1650000000 },
      { symbol: 'KRDMD', name: 'Kredibbank', price: 22.70, change: 0.64, changePercent: 2.90, buy: 22.50, sell: 22.90, low: 22.00, high: 23.50, volume: 19876543, volumeTRY: 450000000 },
      { symbol: 'AKBNK', name: 'Akbank', price: 33.84, change: 0.97, changePercent: 2.95, buy: 33.50, sell: 34.10, low: 32.80, high: 34.50, volume: 78901234, volumeTRY: 2670000000 },
      { symbol: 'GARAN', name: 'Garanti BBVA', price: 31.50, change: 0.89, changePercent: 2.91, buy: 31.20, sell: 31.70, low: 30.60, high: 32.10, volume: 89012345, volumeTRY: 2810000000 },
      { symbol: 'TCELL', name: 'Turkcell', price: 82.10, change: 2.20, changePercent: 2.75, buy: 81.80, sell: 82.40, low: 79.50, high: 84.00, volume: 23456789, volumeTRY: 1930000000 },
      { symbol: 'VODAF', name: 'Vodafone', price: 52.30, change: 1.40, changePercent: 2.74, buy: 52.00, sell: 52.60, low: 50.80, high: 53.50, volume: 34567890, volumeTRY: 1810000000 },
      { symbol: 'PETKM', name: 'Petkim', price: 14.82, change: 0.38, changePercent: 2.63, buy: 14.70, sell: 14.95, low: 14.40, high: 15.30, volume: 45678901, volumeTRY: 676000000 },
      { symbol: 'TOASO', name: 'Tofaş', price: 76.40, change: 1.95, changePercent: 2.62, buy: 76.00, sell: 76.80, low: 74.50, high: 78.00, volume: 12345678, volumeTRY: 941000000 },
      { symbol: 'ENERY', name: 'Enerjisa Enerji', price: 0.96, change: 0.025, changePercent: 2.67, buy: 0.95, sell: 0.97, low: 0.93, high: 0.99, volume: 234567890, volumeTRY: 225000000 },
      { symbol: 'ALARK', name: 'Alarko Holding', price: 52.30, change: 1.35, changePercent: 2.65, buy: 52.00, sell: 52.60, low: 50.80, high: 53.50, volume: 8901234, volumeTRY: 465000000 },
    ];

    return Response.json(
      {
        hisseler,
        timestamp: new Date().toISOString(),
        count: hisseler.length,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=20, stale-while-revalidate=40',
        },
      }
    );
  } catch (error) {
    console.error('Hisseler veri çekme hatası:', error);
    return Response.json(
      {
        hisseler: [],
        error: 'Veri çekme hatası',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
