// Dinamik route'lar için sitemap.xml oluşturucu
// Next.js App Router sitemap

import { ASSET_SLUGS } from '@/lib/assets-data';

export default function sitemap() {
  const baseUrl = 'https://finans-rehberi.vercel.app';
  
  // Sabit sayfalar
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/market`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Dinamik asset sayfaları
  const assetPages = ASSET_SLUGS.map(slug => ({
    url: `${baseUrl}/assets/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'hourly', // Fiyatlar sık değiştiği için
    priority: 0.8,
  }));

  return [...staticPages, ...assetPages];
}
