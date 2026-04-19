/**
 * Stock Price Service
 * AlphaVantage API'sini kullanarak hisse senedi fiyatlarını çek
 */

import axios from 'axios';

const ALPHA_VANTAGE_API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY || '';

export async function fetchStockPrice(symbol) {
  if (!ALPHA_VANTAGE_API_KEY) {
    console.warn('⚠️ AlphaVantage API key not configured');
    return null;
  }

  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );

    // API error kontrolü
    if (response.data['Error Message']) {
      console.error('API Error:', response.data['Error Message']);
      return null;
    }

    if (response.data['Note']) {
      console.warn('API Rate limited:', response.data['Note']);
      return null;
    }

    const timeSeries = response.data['Time Series (Daily)'];
    if (!timeSeries) {
      console.error('No time series data found');
      return null;
    }

    const latestDate = Object.keys(timeSeries)[0];
    const closePrice = parseFloat(timeSeries[latestDate]['4. close']);
    
    return {
      symbol,
      price: closePrice,
      date: latestDate,
      open: parseFloat(timeSeries[latestDate]['1. open']),
      high: parseFloat(timeSeries[latestDate]['2. high']),
      low: parseFloat(timeSeries[latestDate]['3. low']),
      volume: parseInt(timeSeries[latestDate]['5. volume']),
    };
  } catch (error) {
    console.error('❌ Stock price fetch error:', error.message);
    return null;
  }
}

export async function fetchMultipleStocks(symbols) {
  try {
    const promises = symbols.map(symbol => fetchStockPrice(symbol));
    const results = await Promise.all(promises);
    return results.filter(r => r !== null);
  } catch (error) {
    console.error('❌ Multiple stocks fetch error:', error);
    return [];
  }
}

// Gerçek Türkiye halka arz şirket sembolleri (BIST: Borsa Istanbul)
export const POPULAR_IPO_SYMBOLS = [
  'ASELS', // Aselsan
  'THYAO', // Turkish Airlines
  'EREGL', // Ereğli Demir
  'TUPRS', // Tüpraş
  'KCHOL', // Koç Holding
];

export default {
  fetchStockPrice,
  fetchMultipleStocks,
  POPULAR_IPO_SYMBOLS,
};
