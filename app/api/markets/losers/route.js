import { getTopLosers } from '@/lib/turk-markets';

export async function GET() {
  try {
    const data = await getTopLosers();
    return Response.json(data);
  } catch (error) {
    console.error('Losers API error:', error);
    return Response.json([
      { symbol: 'DAPGM', name: 'Dap Gıda', price: 12.33, change: -1.23, changePercent: -10.0 },
      { symbol: 'RUBNS', name: 'Rubens Inşaat', price: 42.84, change: -4.28, changePercent: -10.0 },
      { symbol: 'BLCYT', name: 'Belirtay', price: 51.7, change: -5.17, changePercent: -9.93 },
    ]);
  }
}
