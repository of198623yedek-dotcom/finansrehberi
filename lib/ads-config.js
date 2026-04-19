// Reklam ve monetization stratejisi
// Google AdSense optimal placement ve en-yüksek kazanç ayarları

export const adConfig = {
  // Responsive display ads
  displayAds: [
    {
      name: 'Header Ad',
      location: 'Above content',
      width: '100%',
      type: 'horizontal-banner',
      slotId: 'header-display-ad',
    },
    {
      name: 'Sidebar Ad 1',
      location: 'Right sidebar top',
      width: '300px',
      type: 'medium-rectangle',
      slotId: 'sidebar-ad-1',
    },
    {
      name: 'Sidebar Ad 2', 
      location: 'Right sidebar middle',
      width: '300px',
      type: 'medium-rectangle',
      slotId: 'sidebar-ad-2',
    },
    {
      name: 'Content Ad',
      location: 'Between content sections',
      width: '100%',
      type: 'horizontal-banner',
      slotId: 'content-ad',
    },
    {
      name: 'Below Title Ad',
      location: 'Right after article title',
      width: '100%',
      type: 'leaderboard',
      slotId: 'title-ad',
    },
    {
      name: 'Footer Ad',
      location: 'Above footer',
      width: '100%',
      type: 'horizontal-banner',
      slotId: 'footer-ad',
    },
  ],

  // Native ads (high CTR)
  nativeAds: [
    {
      location: 'Article list',
      count: 1,
      style: 'article-native-ad',
    },
    {
      location: 'Sidebar news',
      count: 1,
      style: 'sidebar-native-ad',
    },
  ],

  // Placement rules for maximum revenue
  placements: {
    mobileLeaderboard: {
      width: 320,
      height: 50,
      slotId: 'mobile-leaderboard',
    },
    mobileMediumRectangle: {
      width: 300,
      height: 250,
      slotId: 'mobile-medium-rect',
    },
    desktopLeaderboard: {
      width: 728,
      height: 90,
      slotId: 'desktop-leaderboard',
    },
    desktopMediumRectangle: {
      width: 300,
      height: 250,
      slotId: 'desktop-medium-rect',
    },
    desktopWideSkyscraper: {
      width: 300,
      height: 600,
      slotId: 'desktop-wide-sky',
    },
  },

  // SEO optimization settings
  seo: {
    keywords: [
      'Borsa İstanbul',
      'BIST 100',
      'Hisse Senedi',
      'Yatırım',
      'Kripto Para',
      'Döviz',
      'Altın Fiyatları',
      'Finans Haberleri',
      'Borsa Analizi',
      'Teknik Analiz',
      'Yatırım Rehberi',
      'Para Kazanma',
      'Pasif Gelir',
      'Portföy Yönetimi',
      'Risk Yönetimi',
      'Finansal Okuryazarlık',
    ],
    
    articleKeywords: {
      'borsa': ['BIST 100', 'hisse senedi', 'endeks', 'piyasa analizi'],
      'döviz': ['USD', 'EUR', 'TL', 'kur', 'forex'],
      'kripto': ['Bitcoin', 'Ethereum', 'blockchain', 'kripto para'],
      'altın': ['gram altın', 'ons altın', 'çeyrek altın', 'altın yatırımı'],
      'haberler': ['son dakika', 'pazar analizi', 'ekonomi haberleri'],
    },

    metaTags: {
      description: 'Borsa, yatırım, kripto para, finans haberleri ve analizleri. Güncel piyasa verileri ve profesyonel araçlar.',
      robots: 'index, follow',
      charset: 'utf-8',
    },
  },

  // Traffic optimization
  trafficSources: {
    organic: {
      target: '40%',
      strategy: 'SEO optimization',
    },
    social: {
      target: '30%',
      strategy: 'Social media sharing',
      platforms: ['Twitter', 'Facebook', 'LinkedIn', 'Instagram', 'YouTube'],
    },
    direct: {
      target: '20%',
      strategy: 'Brand building',
    },
    referral: {
      target: '10%',
      strategy: 'Backlinks',
    },
  },

  // Revenue optimization tips
  tips: [
    'Her sayfaya en az 3 reklam yerleştir',
    'Header, content arasında ve footer\'da reklam koy',
    'Sidebar medium rectangle (300x250) en yüksek kazançlı',
    'Native ads CTR\'ı artırır',
    'Responsive ads mobile trafiği artırır',
    'Sayfa yükleme hızını optimize et',
    'High-quality, original content yaz',
    'Consistent publishing schedule tut',
    'Google Search Console optimize et',
    'Backlink strategy oluştur',
    'Social media presence güçlendir',
    'User engagement artır (longer page time)',
    'Mobile-first design kul (most traffic mobile)',
    'Regular updates yap (freshness signals)',
    'Internal linking optimize et',
  ],

  // Monthly growth targets
  growthTargets: {
    month1: { visits: 10000, revenue: 50 },
    month2: { visits: 25000, revenue: 150 },
    month3: { visits: 50000, revenue: 300 },
    month6: { visits: 150000, revenue: 1000 },
    month12: { visits: 500000, revenue: 3500 },
  },

  // Keywords to target for high RPM
  highRpmKeywords: [
    'Borsa öğrenme',
    'Hisse senedi nedir',
    'Yatırım nasıl yapılır',
    'Kripto para güvenli mi',
    'Altın yatırımı',
    'Portföy oluşturma',
    'Risk yönetimi stratejileri',
    'Finansal hedefler',
    'Vergi planlaması',
    'Emeklilik planı',
  ],
};

// AdSense script injector
export function injectAdSenseScripts() {
  if (typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX';
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);

  window.adsbygoogle = window.adsbygoogle || [];
  window.adsbygoogle.push({
    google_ad_client: 'ca-pub-XXXXXXXXXXXXXXXX',
    enable_page_level_ads: true,
  });
}

// Generate revenue-optimized ad placement HTML
export function generateAdPlacement(type) {
  const placements = {
    horizontal_banner: `
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot="XXXXXXXXXX"
           data-ad-format="horizontal"></ins>
    `,
    medium_rectangle: `
      <ins class="adsbygoogle"
           style="display:inline-block;width:300px;height:250px"
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot="XXXXXXXXXX"></ins>
    `,
    responsive: `
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot="XXXXXXXXXX"
           data-ad-format="autorelaxed"></ins>
    `,
  };

  return placements[type] || '';
}
