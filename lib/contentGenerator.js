/**
 * Content Generator: Fiyat verilerinden dinamik, SEO-optimized metinler oluştur
 * 
 * Kullanım:
 * const content = generateAssetContent(asset, priceData);
 * 
 * Output:
 * {
 *   headline: "...",
 *   shortDescription: "...",
 *   trendBadge: "📈 Güçlü Yükseliş",
 *   socialText: "...",
 *   keywords: ["anahtar", "kelimeler"]
 * }
 */

export const CONTENT_TEMPLATES = {
  strong_up: {
    emoji: '📈',
    trend_name: 'Güçlü Yükseliş',
    headlines: [
      'Bugün {asset} değer kazandı! %{change} yükselişle rekorlar kırıyor',
      '{asset} yatırımcıların favorisi oldu! %{change} artış gerçekleşti',
      '{asset} piyasada hype yapıyor! %{change} kazanç sağladı',
      'Bugün {asset}\'e yatırım yapanlar %{change} kar ettiler',
    ],
    descriptions: [
      '{asset} bugün {price} seviyesinde işlem gördü. %{change} yükseliş trendi devam ediyor. Piyasa analisti raporları gösteriyor ki, bu varlık güçlü bir talep görmektedir.',
      '{asset} fiyatı {price}\'e çıktı. %{change}\'lik yükselişle {category} kategorisinde en çok kazanan oldu. Gücü trend analizi devam ediyor.',
      'Son 24 saatte {asset} %{change} değer kazandı. Mevcut fiyat {price}. Trend analisti yorumuna göre yükseliş devam edebilir.',
    ],
    social_messages: [
      '🚀 {asset} bugün %{change} yükseldi! Şu anda {price} seviyesinde. Trendi takip edin! #FinansRehberi #{symbol}',
      '📈 {asset} investor\'ların gözdesi! %{change} kazanç bugünkü rapor. {price} mevcut fiyat. #Piyasa',
      '{asset} momentum kazanıyor! %{change} artış. Analiz için platformu ziyaret edin 👉 finans-rehberi.app #{asset}',
    ],
  },

  medium_up: {
    emoji: '↗️',
    trend_name: 'Orta Yükseliş',
    headlines: [
      '{asset} hafif yükselişte! %{change} artış kaydedildi',
      '{asset}\'de pozitif hareketler başladı (%{change})',
      '{asset} yatırımcıları bugün kazandı! %{change} oranında',
      'Bugün {asset} kırmızı hattı geçti (%{change})',
    ],
    descriptions: [
      '{asset} bugün hafif yükseliş gösteriyor. %{change} ile {price} seviyesine ulaştı. Piyasa dinamikleri pozitif yönde ilerliyor.',
      'Son 24 saatte {asset} %{change} artış gösterdi. Mevcut fiyat {price}. Orta vadeli trend analizi yapılarak stratejiler oluşturabilirsiniz.',
      '{asset} fiyatı {price}\'de dengeli bir hareket yapıyor. %{change}\'lik kazanç bugünkü özeti temsil ediyor.',
    ],
    social_messages: [
      '↗️ {asset} bugün %{change} yükseldi. Mevcut fiyat: {price} #FinansRehberi',
      '{asset}\'de pozitif momentum! %{change} kazanç. Detaylar için siteyi ziyaret et!',
    ],
  },

  neutral: {
    emoji: '➡️',
    trend_name: 'Dengeli',
    headlines: [
      '{asset} bugün dengeli bir seyir izliyor (%{change})',
      '{asset} sabit kalmaya devam ediyor (%{change})',
      '{asset}\'de pozisyon açmayı düşünenler için fırsat penceresi',
    ],
    descriptions: [
      '{asset} bugün sabit bir hareket gösteriyor. %{change} değişimle {price}\'de işlem gördü. Piyasa beklenti içerisinde görünüyor.',
      'Son 24 saatte {asset} minimum değişim yaşadı. Mevcut fiyat {price}, değişim %{change}. Bu stabilite yatırımcılar için bir fırsat sunabilir.',
    ],
    social_messages: [
      '➡️ {asset} bugün dengeli seyrediyor. Fiyat: {price} (+%{change})',
    ],
  },

  medium_down: {
    emoji: '↘️',
    trend_name: 'Hafif Düşüş',
    headlines: [
      '{asset} hafif düşüş gösteriyor (%{change})',
      '{asset}\'de teknik düzeltme yaşanıyor (%{change})',
      'Bugün {asset}\'e yatırım yapanlar için fırsat: %{change} indirim',
      '{asset} fiyatı düşüyor, alım fırsatı mı?',
    ],
    descriptions: [
      '{asset} bugün hafif bir düşüş gösteriyor. %{change}\'lik düşüşle {price} seviyesine geriledi. Piyasa analisti raporlarına göre bu teknik bir düzeltme olabilir.',
      'Son 24 saatte {asset} %{change} değişim yaşadı. Mevcut fiyat {price}. Uzun vadeli trendlere bakıldığında yatırımcılar bu fırsatı değerlendirebilir.',
    ],
    social_messages: [
      '↘️ {asset} hafif düşüyor. Mevcut fiyat: {price} (%{change})',
      '{asset}\'de alım fırsatı oluşuyor! %{change} indirimle {price}. #FinansRehberi',
    ],
  },

  strong_down: {
    emoji: '📉',
    trend_name: 'Güçlü Düşüş',
    headlines: [
      'Bugün {asset} keskin düşüş yaşadı! %{change} kaybedildi',
      '{asset} kırmızıda! %{change}\'lik düşüş kaydedildi',
      '{asset}\'e yatırım yapanlar dikkat! %{change} düşüş var',
      'Pazar {asset}\'den uzaklaşıyor: %{change} kaybı',
    ],
    descriptions: [
      '{asset} bugün keskin bir düşüş yaşıyor. %{change}\'lik kaybla {price}\'ye geriledi. Piyasa olumsuz haberlere ve satış baskısına maruz kalıyor.',
      'Son 24 saatte {asset} %{change} kaybetti. Mevcut fiyat {price}. Teknik analiz gösteriyor ki destek seviyeleri test ediliyor. Yatırımcılar riski yönetmeleri önerilir.',
      '{asset} fiyatı {price}\'ye düştü. %{change}\'lik düşüş trendin devamını işaret ediyor. Risk yönetimi açısından dikkatli olunması tavsiye edilir.',
    ],
    social_messages: [
      '📉 {asset} bugün %{change} düştü. Mevcut fiyat: {price}. Risk yönetimi kritik!',
      '{asset}\'de satış baskısı! %{change} düşüş. Teknik destek seviyeleri test ediliyor. #{symbol}',
    ],
  },
};

/**
 * Fiyat değişim yüzdesine göre trend kategorisini belirle
 */
export function getTrendCategory(changePercent) {
  const change = parseFloat(changePercent);

  if (change >= 5) return 'strong_up';
  if (change >= 1.5 && change < 5) return 'medium_up';
  if (change > -1.5 && change < 1.5) return 'neutral';
  if (change >= -5 && change < -1.5) return 'medium_down';
  if (change < -5) return 'strong_down';

  return 'neutral';
}

/**
 * Ana Content Generator Fonksiyonu
 */
export function generateAssetContent(asset, priceData) {
  if (!asset || !priceData) {
    return {
      headline: `${asset?.name || 'Varlık'} Detaylı Analiz`,
      shortDescription: `Güncel piyasa analizi ve fiyat hareketleri için ${asset?.name || 'bu varlığın'} teknik ve fundamental analizini inceleyebilirsiniz.`,
      trendBadge: null,
      socialText: null,
      keywords: asset?.keywords || [],
    };
  }

  const changePercent = parseFloat(priceData.changePercent || priceData.change || 0);
  const trendCategory = getTrendCategory(changePercent);
  const template = CONTENT_TEMPLATES[trendCategory];

  // Random seç (A/B testing için)
  const headline = template.headlines[
    Math.floor(Math.random() * template.headlines.length)
  ];
  const description = template.descriptions[
    Math.floor(Math.random() * template.descriptions.length)
  ];
  const socialText = template.social_messages[
    Math.floor(Math.random() * template.social_messages.length)
  ];

  // Template variables'ı replace et
  const replacements = {
    '{asset}': asset.name,
    '{symbol}': asset.symbol,
    '{category}': asset.category,
    '{price}': formatPrice(priceData.value),
    '{change}': Math.abs(changePercent).toFixed(2),
  };

  const finalHeadline = replaceTemplateVars(headline, replacements);
  const finalDescription = replaceTemplateVars(description, replacements);
  const finalSocialText = replaceTemplateVars(socialText, replacements);

  // Keywords'i trend ve asset bilgisine göre genişlet
  const dynamicKeywords = generateDynamicKeywords(asset, trendCategory, changePercent);

  return {
    headline: finalHeadline,
    shortDescription: finalDescription,
    trendBadge: {
      emoji: template.emoji,
      text: template.trend_name,
      category: trendCategory,
      isPositive: changePercent >= 0,
    },
    socialText: finalSocialText,
    keywords: [...(asset.keywords || []), ...dynamicKeywords],
    raw: {
      changePercent,
      trendCategory,
      templateUsed: trendCategory,
    },
  };
}

/**
 * Fiyatı formatla (TRY, USD, vb)
 */
function formatPrice(value) {
  if (typeof value !== 'number') {
    return String(value);
  }

  if (value > 1000) {
    return (value / 1000).toFixed(1) + 'K';
  }

  return value.toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Template variables'ı replace et
 */
function replaceTemplateVars(template, replacements) {
  let result = template;
  Object.entries(replacements).forEach(([key, value]) => {
    result = result.replace(new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
  });
  return result;
}

/**
 * Dinamik keywords oluştur (SEO için)
 */
function generateDynamicKeywords(asset, trendCategory, changePercent) {
  const keywords = [];

  // Trend-based keywords
  if (trendCategory.includes('up')) {
    keywords.push(
      `${asset.name} yükselişte`,
      `${asset.symbol} artış`,
      `${asset.name} kazanç`,
      `${asset.name} yatırım fırsatı`
    );
  } else if (trendCategory.includes('down')) {
    keywords.push(
      `${asset.name} düşüşte`,
      `${asset.symbol} düşüş`,
      `${asset.name} teknik analiz`,
      `${asset.name} alım fırsatı`
    );
  } else {
    keywords.push(
      `${asset.name} piyasa analizi`,
      `${asset.symbol} teknik destek`,
      `${asset.name} trend analizi`
    );
  }

  // Category-based keywords
  if (asset.category === 'Emtia') {
    keywords.push(`${asset.name} fiyatı`, `${asset.symbol} spot fiyat`);
  } else if (asset.category === 'Kripto') {
    keywords.push(`${asset.name} fiyat`, `${asset.symbol} kaç lira`);
  } else if (asset.category === 'Endeks') {
    keywords.push(`${asset.name} endeksi`, `${asset.symbol} analiz`);
  }

  // Time-based keywords
  keywords.push(
    `${asset.name} bugün`,
    `${asset.name} son 24 saat`,
    `${asset.name} günlük analiz`
  );

  return keywords;
}

/**
 * SEO-optimized açıklamayı oluştur (meta description için)
 */
export function generateSEODescription(asset, priceData, maxLength = 160) {
  const content = generateAssetContent(asset, priceData);
  let description = content.shortDescription;

  if (description.length > maxLength) {
    description = description.substring(0, maxLength - 3) + '...';
  }

  return description;
}

/**
 * Sosyal media meta tags oluştur (Open Graph, Twitter)
 */
export function generateSocialMeta(asset, priceData) {
  const content = generateAssetContent(asset, priceData);

  return {
    og: {
      title: content.headline,
      description: content.shortDescription,
      image: `https://finans-rehberi.vercel.app/og-${asset.slug}.png`,
      type: 'website',
      url: `https://finans-rehberi.vercel.app/assets/${asset.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: content.headline,
      description: content.shortDescription,
      creator: '@finansrehberi',
      image: `https://finans-rehberi.vercel.app/og-${asset.slug}.png`,
    },
    keywords: content.keywords.join(', '),
  };
}

/**
 * Trending assets'i bulmak için sıralanmış içerik
 */
export function generateTrendingContent(assetList, priceDataMap) {
  return assetList
    .map((asset) => ({
      asset,
      content: generateAssetContent(asset, priceDataMap[asset.id]),
      changePercent: parseFloat(priceDataMap[asset.id]?.changePercent || 0),
    }))
    .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
    .slice(0, 5); // Top 5 trending
}

export default generateAssetContent;
