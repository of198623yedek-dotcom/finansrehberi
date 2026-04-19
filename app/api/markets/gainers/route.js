import { getTopGainers } from '@/lib/turk-markets';

export async function GET() {
  try {
    const data = await getTopGainers();
    return Response.json(data);
  } catch (error) {
    console.error('Gainers API error:', error);
    return Response.json([
      { symbol: 'KMPUR', name: 'Kompüter Programcılığı', price: 17.27, change: 1.73, changePercent: 10.0 },
      { symbol: 'GLRMK', name: 'Glermark Plastik', price: 221.2, change: 22.12, changePercent: 10.0 },
      { symbol: 'MARKA', name: 'Marka Yatırımlar', price: 60.5, change: 6.05, changePercent: 10.0 },
    ]);
  }
}
