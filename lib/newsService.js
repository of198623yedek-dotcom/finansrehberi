/**
 * News Service: Fetches and rotates financial news with stable IDs.
 */

import { getCachedData } from './supabase.js';

const NEWS_SOURCES = [
  { name: 'BloombergHT', category: 'BORSA' },
  { name: 'Bigpara', category: 'EKONOMİ' },
  { name: 'Investing TR', category: 'KRİPTO' },
  { name: 'Dünya Gazetesi', category: 'DÖVİZ' },
  { name: 'Reuters TR', category: 'GLOBAL' },
  { name: 'Ekotürk', category: 'ŞİRKET' },
  { name: 'Foreks Haber', category: 'ANALİZ' },
  { name: 'ParaAnaliz', category: 'MAKRO' },
];

/**
 * Simple hash function to create stable IDs from strings
 */
function createStableId(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

/**
 * Get latest news with stable cache
 */
export async function getLatestNews() {
  const cacheKey = 'global_financial_news_stable_v1';
  return getCachedData(cacheKey, fetchAllNews, 1800); // 30 minutes cache for stability
}

async function fetchAllNews() {
  try {
    const news = await fetchSimulatedFreshNews();
    return news;
  } catch (error) {
    console.error('News fetch error:', error);
    return [];
  }
}

/**
 * Generates fresh, realistic news items with stable IDs based on titles
 */
async function fetchSimulatedFreshNews() {
  const now = new Date();
  
  const newsTemplates = [
    { 
      title: "BIST 100 Endeksi Güne Pozitif Başladı", 
      cat: "BORSA",
      content: "Borsa İstanbul'da BIST 100 endeksi, güne %1.25 oranında yükselişle bir başlangıç yaptı. Analistler, küresel piyasalardaki pozitif seyrin iç piyasaya yansıdığını belirtiyor. Teknik olarak 13.500 seviyesi önemli bir direnç olarak takip ediliyor. Türk Hava Yolları hisselerindeki hareketlilik dikkat çekiyor."
    },
    { 
      title: "Merkez Bankası Rezervlerinde Artış Sürüyor", 
      cat: "EKONOMİ",
      content: "Türkiye Cumhuriyet Merkez Bankası (TCMB) haftalık verilerine göre, toplam rezervlerde artış ivmesi korunuyor. Swap hariç net rezervlerdeki iyileşme, piyasa oyuncuları tarafından yakından izleniyor. Bu durumun TL varlıklar üzerindeki güveni artırması bekleniyor."
    },
    { 
      title: "Dolar/TL 44.55 Seviyesinde Yatay Seyrediyor", 
      cat: "DÖVİZ",
      content: "Dolar/TL paritesi, yeni güne 44.55 seviyelerinden başladı. Küresel dolar endeksindeki (DXY) stabil seyir ve iç piyasadaki likidite adımları paritenin dar bantta hareket etmesine neden oluyor. Destek seviyesi 44.40, direnç seviyesi ise 44.70 olarak öngörülüyor."
    },
    { 
      title: "Altın Fiyatları ONS Bazında 2465$ Sınırında", 
      cat: "ALTIN",
      content: "Ons altın, güvenli liman talebinin artmasıyla birlikte 2465 dolar seviyesine yükseldi. Gram altın ise dolar/TL'deki yatay seyir ve onstaki artışla rekor seviyelerde işlem görüyor. Yatırımcılar, ABD enflasyon verileri öncesi beklemeye geçmiş durumda."
    },
    { 
      title: "Kripto Piyasalarda Bitcoin Hareketliliği", 
      cat: "KRİPTO",
      content: "Bitcoin piyasasında son 24 saatte yaşanan hareketlilik, kurumsal yatırımcıların ilgisini çekiyor. Piyasa hacmi %3.5 artarken, teknik analizler yeni bir yükseliş trendinin sinyallerini veriyor. Regülasyon haberleri ise piyasadaki risk iştahını dengeliyor."
    },
    { 
      title: "Tüpraş Yeni Enerji Yatırımını Duyurdu", 
      cat: "ŞİRKET",
      content: "Tüpraş, yeni yeşil hidrojen yatırımları için düğmeye bastığını KAP'a bildirdi. Bu yatırımın şirketin 2030 yılı sürdürülebilirlik hedeflerine büyük katkı sağlaması öngörülüyor. Hisse fiyatı haber sonrası piyasada olumlu tepki verdi."
    },
    {
      title: "Halka Arz Gündemi: Yeni Şirketler Yolda",
      cat: "HALKA ARZ",
      content: "Sermaye Piyasası Kurulu (SPK) bu hafta iki yeni şirketin halka arz başvurusunu onayladı. Yatırımcıların halka arzlara olan yoğun ilgisi devam ederken, piyasa likiditesinin bu yeni arzlarla desteklenmesi bekleniyor."
    },
    {
      title: "Global Piyasalarda Gözler FED Faiz Kararında",
      cat: "GLOBAL",
      content: "ABD Merkez Bankası (FED) toplantısı öncesi küresel piyasalarda temkinli bir bekleyiş hakim. Faiz indirimlerinin zamanlamasına ilişkin ipuçları aranırken, dolar endeksi ve ABD 10 yıllık tahvil faizleri kritik seviyelerde bulunuyor."
    }
  ];

  const result = newsTemplates.map((t, i) => {
    return {
      id: createStableId(t.title), // Stable ID based on title
      title: t.title,
      content: t.content,
      category: t.cat,
      publishedAt: new Date(now.getTime() - i * 60 * 60000).toISOString(),
      source: NEWS_SOURCES[i % NEWS_SOURCES.length].name,
      imageUrl: `https://images.unsplash.com/photo-1611974717483-9b939c851acb?q=80&w=600&auto=format&fit=crop`,
    };
  });

  return result;
}

/**
 * Get a single news item by ID
 */
export async function getNewsById(id) {
  const newsList = await getLatestNews();
  return newsList.find(n => n.id === id) || null;
}
