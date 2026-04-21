import { getLatestNews } from '@/lib/newsService';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getLatestNews();
    return Response.json(data);
  } catch (error) {
    console.error('News API error:', error);
    return Response.json([]);
  }
}
