/**
 * Mock Analytics Data
 * Test amaçlı örnek analitik verileri
 */

export const MOCK_ASSET_DATA = {
  altin: [
    { date: '1 Haz', price: 2340, change: 0.5, volume: 45000 },
    { date: '2 Haz', price: 2345, change: 0.2, volume: 52000 },
    { date: '3 Haz', price: 2355, change: 0.4, volume: 58000 },
    { date: '4 Haz', price: 2350, change: -0.2, volume: 49000 },
    { date: '5 Haz', price: 2365, change: 0.6, volume: 61000 },
    { date: '6 Haz', price: 2370, change: 0.2, volume: 55000 },
    { date: '7 Haz', price: 2380, change: 0.4, volume: 67000 },
    { date: '8 Haz', price: 2390, change: 0.4, volume: 72000 },
  ],
  bitcoin: [
    { date: '1 Haz', price: 63000, change: -1.2, volume: 125000 },
    { date: '2 Haz', price: 63500, change: 0.8, volume: 145000 },
    { date: '3 Haz', price: 64000, change: 0.8, volume: 155000 },
    { date: '4 Haz', price: 63800, change: -0.3, volume: 135000 },
    { date: '5 Haz', price: 64500, change: 1.1, volume: 165000 },
    { date: '6 Haz', price: 64800, change: 0.5, volume: 142000 },
    { date: '7 Haz', price: 65200, change: 0.6, volume: 175000 },
    { date: '8 Haz', price: 65800, change: 0.9, volume: 185000 },
  ],
  'usd-try': [
    { date: '1 Haz', price: 32.40, change: 0.1, volume: 95000 },
    { date: '2 Haz', price: 32.45, change: 0.15, volume: 105000 },
    { date: '3 Haz', price: 32.50, change: 0.15, volume: 115000 },
    { date: '4 Haz', price: 32.48, change: -0.06, volume: 98000 },
    { date: '5 Haz', price: 32.55, change: 0.22, volume: 125000 },
    { date: '6 Haz', price: 32.58, change: 0.09, volume: 108000 },
    { date: '7 Haz', price: 32.62, change: 0.12, volume: 132000 },
    { date: '8 Haz', price: 32.68, change: 0.18, volume: 142000 },
  ],
};

export const getMockAnalyticsData = (assetId) => {
  return MOCK_ASSET_DATA[assetId] || MOCK_ASSET_DATA.altin;
};

export default MOCK_ASSET_DATA;
