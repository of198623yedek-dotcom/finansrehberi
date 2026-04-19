import { getExchangeRates } from '@/lib/turk-markets';

export async function GET() {
  try {
    const data = await getExchangeRates();
    return Response.json(data);
  } catch (error) {
    console.error('Döviz API error:', error);
    return Response.json({
      usd_try: { symbol: 'USD/TRY', value: '44.5007', change: -0.23, changePercent: -0.51 },
      eur_try: { symbol: 'EUR/TRY', value: '52.0308', change: 0.56, changePercent: 1.09 },
      gbp_try: { symbol: 'GBP/TRY', value: '56.8540', change: 0.45, changePercent: 0.79 },
      chf_try: { symbol: 'CHF/TRY', value: '48.2300', change: -0.15, changePercent: -0.31 },
    });
  }
}
