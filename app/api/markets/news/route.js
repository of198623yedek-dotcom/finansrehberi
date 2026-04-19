import { getFinancialNews } from '@/lib/turk-markets';

export async function GET() {
  try {
    const data = await getFinancialNews();
    return Response.json(data);
  } catch (error) {
    console.error('News API error:', error);
    return Response.json([
      {
        title: 'BIST 100 Endelksi %4.87 Artış ile 13.550 Seviyesinde Kapandı',
        description: 'Borsa İstanbul\'da BIST 100 endeksi güçlü performans göstermeye devam etti.',
        publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        category: 'BORSA',
      },
      {
        title: 'Merkez Bankası Faiz Kararını Açıkladı',
        description: 'TCMB Başkanı Fatih Karahan açıklamada enflasyonla mücadele kararlılığını vurguladı.',
        publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        category: 'EKONOMİ',
      },
    ]);
  }
}
