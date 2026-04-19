'use client';

/**
 * JSON-LD Structured Data Component
 * Google, Bing ve diğer search engines'in sayfayı daha iyi anlaması için
 * 
 * Avantajlar:
 * ✓ Rich snippets Google SERPs'te
 * ✓ Knowledge Panel edilme şansı
 * ✓ FAQ schema, rating, vb görünme
 */

export function FinancialProductSchema({ asset, priceData }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: asset.name,
    alternateName: asset.symbol,
    description: asset.description,
    category: asset.category,
    url: `https://finans-rehberi.vercel.app/assets/${asset.slug}`,
    
    // Fiyat Bilgisi
    offers: {
      '@type': 'Offer',
      price: priceData?.value || '0',
      priceCurrency: priceData?.currency || 'TRY',
      availability: 'https://schema.org/InStock',
      priceValidUntil: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 min
    },

    // Yayıncı (Kurulus)
    publisher: {
      '@type': 'Organization',
      name: 'FinansRehberi',
      url: 'https://finans-rehberi.vercel.app',
      logo: 'https://finans-rehberi.vercel.app/logo.png',
    },

    // Yazı Metadat
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ asset }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Ana Sayfa',
        item: 'https://finans-rehberi.vercel.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Varlıklar',
        item: 'https://finans-rehberi.vercel.app/assets',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: asset.name,
        item: `https://finans-rehberi.vercel.app/assets/${asset.slug}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Bu veriler ne kadar güncel?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Veriler 5 dakikada bir otomatik olarak güncellenir. SWR caching teknolojisi kullanılmaktadır.',
        },
      },
      {
        '@type': 'Question',
        name: 'Fiyat verilerinin kaynağı nedir?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Veriler Finnhub API ve Supabase caching sistemi üzerinden sağlanmaktadır.',
        },
      },
      {
        '@type': 'Question',
        name: 'Bu tavsiye finansal tavsiye midir?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Hayır, bu platform yatırım tavsiyesi vermemektedir. Disclaimer sayfasını okumanız önerilir.',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FinansRehberi',
    url: 'https://finans-rehberi.vercel.app',
    description: 'Türkiye\'nin en kapsamlı finansal varlık ve pazar analiz platformu',
    logo: 'https://finans-rehberi.vercel.app/logo.png',
    sameAs: [
      'https://twitter.com/finansrehberi',
      'https://instagram.com/finansrehberi',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'info@finans-rehberi.com',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default {
  FinancialProductSchema,
  BreadcrumbSchema,
  FAQSchema,
  OrganizationSchema,
};
