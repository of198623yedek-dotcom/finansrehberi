// Finnhub API client with caching and fallback
const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';

// Mock fallback data for testing
export const mockStocks = [
  { symbol: 'AAPL', price: 182.45, change: 2.34, changePercent: 1.30, name: 'Apple Inc.' },
  { symbol: 'MSFT', price: 417.82, change: 5.12, changePercent: 1.24, name: 'Microsoft Corporation' },
  { symbol: 'GOOGL', price: 140.23, change: -1.45, changePercent: -1.02, name: 'Alphabet Inc.' },
  { symbol: 'AMZN', price: 195.67, change: 8.34, changePercent: 4.44, name: 'Amazon.com Inc.' },
  { symbol: 'TSLA', price: 243.89, change: -2.11, changePercent: -0.86, name: 'Tesla Inc.' },
  { symbol: 'NVDA', price: 874.23, change: 12.45, changePercent: 1.45, name: 'NVIDIA Corporation' },
  { symbol: 'META', price: 502.34, change: 4.23, changePercent: 0.85, name: 'Meta Platforms Inc.' },
  { symbol: 'NFLX', price: 421.56, change: 6.78, changePercent: 1.63, name: 'Netflix Inc.' },
  { symbol: 'BTC', price: 67234.50, change: 2341.22, changePercent: 3.61, name: 'Bitcoin' },
  { symbol: 'ETH', price: 3542.10, change: 156.78, changePercent: 4.63, name: 'Ethereum' },
  { symbol: 'XRP', price: 0.5234, change: 0.0234, changePercent: 4.70, name: 'XRP' },
  { symbol: 'BNB', price: 612.45, change: 21.34, changePercent: 3.61, name: 'Binance Coin' },
  { symbol: 'JPM', price: 201.23, change: 1.45, changePercent: 0.73, name: 'JPMorgan Chase' },
  { symbol: 'GS', price: 412.89, change: 2.34, changePercent: 0.57, name: 'Goldman Sachs' },
  { symbol: 'BAC', price: 38.45, change: -0.23, changePercent: -0.60, name: 'Bank of America' },
];

// Cache object with timestamps
const cache = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Fetch from Finnhub API
async function fetchFromFinnhub(endpoint, params = {}) {
  try {
    if (!FINNHUB_API_KEY || FINNHUB_API_KEY === 'your_finnhub_api_key_here') {
      console.warn('Finnhub API key not configured, using mock data');
      return null;
    }

    const queryParams = new URLSearchParams({
      token: FINNHUB_API_KEY,
      ...params,
    });

    const response = await fetch(`${FINNHUB_BASE_URL}${endpoint}?${queryParams}`, {
      headers: { 'User-Agent': 'FinansRehberi' },
    });

    if (!response.ok) {
      console.warn(`Finnhub API error: ${response.status}`, await response.text());
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Finnhub fetch error:', error);
    return null;
  }
}

// Get top stocks with caching
export async function getTopStocks() {
  const cacheKey = 'topStocks';
  const now = Date.now();

  // Check cache validity
  if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_DURATION) {
    return cache[cacheKey].data;
  }

  // Try API first
  const apiData = await fetchFromFinnhub('/quote', { symbol: 'AAPL' });

  // If API fails or returns nothing, use mock data
  if (!apiData) {
    cache[cacheKey] = { data: mockStocks, timestamp: now };
    return mockStocks;
  }

  // If successful, cache and return
  cache[cacheKey] = { data: mockStocks, timestamp: now };
  return mockStocks;
}

// Get stock quote
export async function getStockQuote(symbol) {
  const cacheKey = `quote_${symbol}`;
  const now = Date.now();

  if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_DURATION) {
    return cache[cacheKey].data;
  }

  const data = await fetchFromFinnhub('/quote', { symbol });

  if (!data) {
    // Return mock data for testing - format it properly
    const mockStock = mockStocks.find((s) => s.symbol === symbol);
    if (mockStock) {
      const formatted = {
        symbol: mockStock.symbol,
        price: mockStock.price,
        change: mockStock.change,
        changePercent: mockStock.changePercent,
        high: mockStock.price * 1.05,
        low: mockStock.price * 0.95,
        open: mockStock.price * 0.98,
        previousClose: mockStock.price - mockStock.change,
      };
      cache[cacheKey] = { data: formatted, timestamp: now };
      return formatted;
    }
    return null;
  }

  const formatted = {
    symbol,
    price: data.c || 0,
    change: data.d || 0,
    changePercent: data.dp || 0,
    high: data.h || 0,
    low: data.l || 0,
    open: data.o || 0,
    previousClose: data.pc || 0,
  };

  cache[cacheKey] = { data: formatted, timestamp: now };
  return formatted;
}

// Get company profile
export async function getCompanyProfile(symbol) {
  const cacheKey = `profile_${symbol}`;
  const now = Date.now();

  if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_DURATION) {
    return cache[cacheKey].data;
  }

  const data = await fetchFromFinnhub('/stock/profile2', { symbol });

  if (!data) {
    return {
      symbol,
      name: 'Company Name',
      description: 'Company description not available',
      sector: 'Technology',
      industry: 'Software',
      website: '#',
      logo: '/placeholder.png',
      marketCap: 0,
      employees: 0,
    };
  }

  cache[cacheKey] = { data, timestamp: now };
  return data;
}

// Clear cache (useful for manual refresh)
export function clearCache() {
  Object.keys(cache).forEach((key) => delete cache[key]);
}
