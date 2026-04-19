// Metadata generator untuk dynamic asset pages
import { getAssetBySlug } from '@/lib/assets-data';
import { generateSEODescription, generateSocialMeta } from '@/lib/contentGenerator';

export const revalidate = 300; // ISR: Every 5 minutes

export async function generateMetadata({ params }) {
  const asset = getAssetBySlug(params.asset);

  if (!asset) {
    return {
      title: 'Varlık Bulunamadı',
      description: 'Aradığınız finansal varlık bulunamıştır.',
    };
  }

  // Dinamik keyword'ler oluştur (content generator'dan)
  const dynamicKeywords = [
    `${asset.name} fiyatı`,
    `${asset.symbol} canlı`,
    `${asset.name} analiz`,
    `${asset.name} yatırım`,
    `${asset.symbol} değişim`,
    ...asset.keywords,
  ];

  return {
    title: `${asset.name} (${asset.symbol}) Canlı Fiyat & Analiz | FinansRehberi`,
    description: generateSEODescription(asset, null, 160),
    keywords: dynamicKeywords.join(', '),
    
    // Canonical URL (duplicate content önle)
    canonical: `https://finans-rehberi.vercel.app/assets/${asset.slug}`,
    
    // OpenGraph (Social media sharing)
    openGraph: {
      title: `${asset.name} (${asset.symbol}) | FinansRehberi`,
      description: asset.description,
      type: 'website',
      url: `https://finans-rehberi.vercel.app/assets/${asset.slug}`,
      siteName: 'FinansRehberi',
      images: [
        {
          url: `https://finans-rehberi.vercel.app/og-${asset.slug}.png`,
          width: 1200,
          height: 630,
          alt: `${asset.name} Fiyat Analizi`,
        },
      ],
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: `${asset.name} (${asset.symbol}) Fiyatı`,
      description: asset.description,
      creator: '@finansrehberi',
      image: `https://finans-rehberi.vercel.app/og-${asset.slug}.png`,
    },
    
    // Schema.org Structured Data (Google Rich Snippets)
    other: {
      'schema:type': 'FinancialProduct',
      'schema:name': asset.name,
      'schema:symbol': asset.symbol,
      'schema:category': asset.category,
      'article:published_time': new Date().toISOString(),
      'article:modified_time': new Date().toISOString(),
      'article:author': 'FinansRehberi',
    },
    
    robots: {
      index: true,
      follow: true,
      maxImagePreview: 'large',
      maxSnippet: -1,
      maxVideoPreview: -1,
    },
  };
}

export async function generateStaticParams() {
  return [
    { asset: 'altin' },
    { asset: 'gumush' },
    { asset: 'usd-try' },
    { asset: 'eur-try' },
    { asset: 'bitcoin' },
    { asset: 'ethereum' },
    { asset: 'xrp' },
    { asset: 'solana' },
    { asset: 'bist-100' },
  ];
}

export default function Layout({ children }) {
  return children;
}
