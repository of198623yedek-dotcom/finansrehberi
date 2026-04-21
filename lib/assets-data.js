// Asset metadata ve veri yapısı - Tüm dinamik sayfalar için
// Bunu kullanarak /altin, /bitcoin, /usd-try vb. otomatik oluşturuyoruz

export const ASSETS = {
  // Altın
  altin: {
    id: 'altin',
    name: 'Altın (Gold)',
    symbol: 'XAU/USD',
    slug: 'altin',
    category: 'Emtia',
    description: 'Altın, dünyanın en değerli kıymetli madenlerinden biridir. Türkiye ve dünyada yatırımcılar tarafından sıklıkla tercih edilen altın, enflasyondan korunma aracı olarak kullanılır. Gram altın, çeyrek altın ve ons altın olmak üzere çeşitli şekillerde işlem görmektedir.',
    longDescription: `Altın, insanlık tarihi boyunca değer saklama aracı olarak kullanılmıştır. Gelişen ekonomilerle birlikte altın yatırımının önemi de artmıştır. Türkiye'de altın yatırımı oldukça popülerdir ve birçok kişi portföyünün bir kısmını altına ayırır.

Altının değeri USD cinsinden belirlenmektedir. Uluslararası piyasalarda ons (troy ounce) başına fiyatlandırılan altın, Türkiye'de gram bazında işlem görmektedir. Günümüzde altın, sadece fiziki yatırım olarak değil, borsa ve gümrük atölyesinde de işlem görmektedir.

Altın fiyatları, dolar kurunun hareketlerinden, merkez bankalarının politikalarından ve küresel ekonomik belirsizliklerden etkilenmektedir. Yüksek enflasyon dönemlerinde altın talep görmekte ve fiyatı artmaktadır. Yatırımcılar, risk yönetiminin bir parçası olarak portföylerine altın eklerler.

Altın yatırımının avantajları arasında likidite, kolay depolama ve vergi avantajları bulunmaktadır. Ancak altın satın alırken dikkat edilmesi gereken hususlar vardır. Saflık, ağırlık ve sertifika kontrol edilmelidir. Türkiye'de altın piyasası oldukça disiplinli ve denetim altındadır.`,
    apiEndpoint: '/api/markets/altın',
    dataKey: 'gold_try',
    relatedAssets: ['gumush', 'usd-try', 'bitcoin'],
    keywords: ['altın', 'altın fiyatı', 'gram altın', 'altın yatırım', 'çeyrek altın'],
  },

  // Gümüş
  gumush: {
    id: 'gumush',
    name: 'Gümüş (Silver)',
    symbol: 'XAG/USD',
    slug: 'gumush',
    category: 'Emtia',
    description: 'Gümüş, altından sonra en değerli kıymetli maden olarak bilinir. Endüstriyel kullanımı yanında yatırım aracı olarak da tercih edilen gümüş, elektronik, fotografi ve takı sektöründe yaygın şekilde kullanılır.',
    longDescription: `Gümüş, hem endüstriyel amaçlar hem de yatırım aracı olarak önemli bir rol oynamaktadır. Altına kıyasla daha volatil olan gümüş fiyatları, piyasa koşullarından hızla etkilenmektedir.

Gümüş, elektronik endüstrisinde yaygın şekilde kullanıldığından, ekonominin iyiye gittiği dönemlerde talep artmakta ve fiyatı yükselmektedir. Tersine, ekonomik durgunluk dönemlerinde fiyatı düşmektedir. Bu nedenle gümüş, ekonomik durum göstergesi olarak da kullanılmaktadır.

Türkiye'de gümüş yatırımı da altın kadar popüler değildir, ancak son yıllarda ilgi artmaktadır. Gümüş barları, gümüş madeni paralar ve gümüş takılar olarak yatırım yapılabilmektedir.

Gümüş yatırımının riskleri arasında depolama ve sigorta maliyetleri sayılabilir. Ancak likidite, altın kadar yüksektir. Uluslararası piyasalarda ons başına işlem gören gümüş, Türkiye'de genellikle gram bazında değerlendirilmektedir.`,
    apiEndpoint: '/api/markets/altın',
    dataKey: 'silver_usd',
    relatedAssets: ['altin', 'bitcoin', 'usd-try'],
    keywords: ['gümüş', 'gümüş fiyatı', 'gümüş yatırım', 'gümüş madeni para'],
  },

  // USD/TRY
  'usd-try': {
    id: 'usd-try',
    name: 'ABD Doları (USD/TRY)',
    symbol: 'USD/TRY',
    slug: 'usd-try',
    category: 'Döviz',
    description: 'Türk Lirası cinsinden dolar kuru, dünyanın en önemli döviz çiftidir. Ticaret, turizm ve yatırım kararlarında USD/TRY paritesi belirleyici bir rol oynamaktadır.',
    longDescription: `ABD Doları, dünya ekonomisinde en önemli para birimi olup, uluslararası ticarette ve finansal işlemlerde referans para olarak kullanılmaktadır. Türkiye ekonomisinde de dolar kurları oldukça önem taşımaktadır.

USD/TRY paritesi, Türkiye'nin makroekonomik durumu, faiz oranları, enflasyon oranı ve siyasi belirsizlikler tarafından etkilenmektedir. Merkez Bankası'nın aldığı tedbirler, dolar kurunu önemli ölçüde etkilemektedir.

Dolar kurundaki dalgalanmalar, ithalatçı firmalar, turistik işletmeler ve yatırımcıların kararlarını doğrudan etkilemektedir. Yükselen dolar kuru, ithal malların fiyatını arttırırken, dışa satışları ucuzlatmaktadır.

Türkiye'de tüketici ve işletmeler, kur belirsizliğinden korunmak için türev ürünler ve hedge stratejileri kullanmaktadırlar. Dolar kuru takibi, ekonomik haberleri ve merkez bankası açıklamalarını yakından izlemek önemlidir.`,
    apiEndpoint: '/api/markets/döviz',
    dataKey: 'usd_try',
    relatedAssets: ['eur-try', 'gbp-try', 'altin'],
    keywords: ['dolar', 'USD/TRY', 'dolar kuru', 'döviz', 'türk lirası'],
  },

  // EUR/TRY
  'eur-try': {
    id: 'eur-try',
    name: 'Euro (EUR/TRY)',
    symbol: 'EUR/TRY',
    slug: 'eur-try',
    category: 'Döviz',
    description: 'Euro, Avrupa Birliği üye ülkelerin para birimi olup, USD\'den sonra en önemli reserve para birimidir. EUR/TRY paritesi, Avrupa ekonomisinin Türkiye\'ye olan etkisini göstermektedir.',
    longDescription: `Euro, Avrupa Birliği ülkeleri tarafından kullanılan ortak para birimidir. Avrupa bölgesi, dünya ekonomisinde önemli bir yer tutması nedeniyle euro, uluslararası finansal piyasalarda önemli bir rol oynamaktadır.

Türkiye'nin Avrupa ile olan ticari ilişkileri, EUR/TRY paritesini doğrudan etkilemektedir. Avrupa'dan gelen turist sayısı, dış ticaret hacmi ve yatırımlar dolar kuru gibi önemlidir.

EUR/TRY kurundaki değişimler, özellikle turizmle ilgili sektörleri, perakendeci işletmeleri ve ihracatçıları etkilemektedir. Avrupa Merkez Bankası'nın para politikası, euro değerinin ana belirleyicisidir.

Euro yatırımı, diversifikasyon amacıyla portföyeye eklenebilecek bir araçtır. Ancak euro volatilitesi, dolar volatilitesine kıyasla daha düşük olabilir.`,
    apiEndpoint: '/api/markets/döviz',
    dataKey: 'eur_try',
    relatedAssets: ['usd-try', 'gbp-try', 'bitcoin'],
    keywords: ['euro', 'EUR/TRY', 'avrupa para', 'döviz', 'euro kuru'],
  },

  // Bitcoin
  bitcoin: {
    id: 'bitcoin',
    name: 'Bitcoin (BTC)',
    symbol: 'BTC/USD',
    slug: 'bitcoin',
    category: 'Kripto Para',
    description: 'Bitcoin, ilk ve en değerli kripto para olup, blokzincir teknolojisine dayalı merkezi olmayan bir para sistemidir. Bitcoin, dijital altın olarak nitelendirilmektedir ve yatırımcılar tarafından yoğun ilgi görmektedir.',
    longDescription: `Bitcoin, 2009 yılında Satoshi Nakamoto tarafından icat edilen ilk kripto para birimidir. Blokzincir teknolojisini kullanan Bitcoin, merkezi bir otorite gerektirmeyen özgür bir para sistemi sunmaktadır.

Bitcoin'in arzı sınırlıdır ve toplam 21 milyon bitcoin olacağı önceden belirlenmiştir. Bu sınırlı arz, Bitcoin'i dijital altına benzemektedir ve uzun vadeli değer saklama aracı olarak görmektedir.

Bitcoin fiyatı, büyük volatilite göstermektedir. Dünya çapında benimsenmesi, büyük şirketlerin Bitcoin yatırımları, hükümet politikaları ve makroekonomik koşullar Bitcoin fiyatını etkilemektedir.

Bitcoin yatırımı risklidir ancak potansiyel getirisi yüksektir. Kripto para borsalarında kolayca alım-satım yapılabilir. Ancak siber güvenlik ve cüzdan yönetimi konusunda dikkat edilmelidir.

Türkiye'de Bitcoin yatırımı popüler olmasına rağmen, regülasyonu halen belirsizdir. Yatırımcılar, vergi ödevlerini yerine getirmeli ve risklerinin farkında olmalıdırlar.`,
    apiEndpoint: '/api/markets/crypto',
    dataKey: 'btc',
    relatedAssets: ['ethereum', 'xrp', 'usd-try'],
    keywords: ['bitcoin', 'BTC', 'kripto para', 'blockchain', 'dijital para'],
  },

  // Ethereum
  ethereum: {
    id: 'ethereum',
    name: 'Ethereum (ETH)',
    symbol: 'ETH/USD',
    slug: 'ethereum',
    category: 'Kripto Para',
    description: 'Ethereum, akıllı sözleşmeler ve merkezi olmayan uygulamalar (dApp) için platformdur. Ethereum ağında çalışan binlerce proje bulunmaktadır ve ETH, bu ekosistem\'in ana para birimidir.',
    longDescription: `Ethereum, 2015 yılında Vitalik Buterin tarafından başlatılan akıllı sözleşme platformudur. Bitcoin'den farklı olarak, Ethereum sadece para transferi değil, kompleks programları çalıştırabilmektedir.

Ethereum ağında binlerce merkezi olmayan uygulama (dApp) çalışmaktadır. Fintech, oyun, sanat ve pek çok alanda Ethereum teknolojisi kullanılmaktadır.

ETH, Ethereum ağında işlem ücretleri (gas) ödemek için kullanılan para birimidir. Ağın popülaritesi arttıkça ETH talebi de artmaktadır.

Ethereum fiyatı, Bitcoin'e benzer şekilde volatilitesi yüksek olan bir kripto paradır. Teknolojik gelişmeler, regülatorik haberler ve genel pazar koşulları ETH fiyatını etkilemektedir.

2022 yılında Ethereum The Merge güncellemesine geçerek proof-of-stake algoritmasına döndü, bu da enerji tüketimini önemli ölçüde azalttı.`,
    apiEndpoint: '/api/markets/crypto',
    dataKey: 'eth',
    relatedAssets: ['bitcoin', 'xrp', 'solana'],
    keywords: ['ethereum', 'ETH', 'kripto para', 'akıllı sözleşme', 'dApp'],
  },

  // XRP (Ripple)
  xrp: {
    id: 'xrp',
    name: 'XRP (Ripple)',
    symbol: 'XRP/USD',
    slug: 'xrp',
    category: 'Kripto Para',
    description: 'XRP, Ripple şirketi tarafından geliştirilen uluslararası para transferi için tasarlanmış bir kripto paradır. Bankalar arası transferlerde hız ve düşük maliyetle dikkat çekmektedir.',
    longDescription: `XRP, Ripple teknolojisinin ana kripto parasıdır. Ripple, bankalar arası hızlı ve ucuz para transferi sağlamak için tasarlanmıştır.

Geleneksel SWIFT sistemi saatlerce veya günler süren transferleri, Ripple sistemi dakikalar içinde tamamlayabilmektedir. Bu nedenle birçok banka Ripple teknolojisini test etmiş veya kullanmaktadır.

XRP fiyatı, Ripple şirketi tarafından kontrol edilen bir miktar token nedeniyle, diğer kripto paralardan farklı özelliklere sahiptir. Ripple'ın kurumsal ortaklıkları, XRP fiyatını etkilemektedir.

2020 yılında SEC, Ripple şirketine dava açtı ve bunun sonuçları halen tartışılmaktadır. Hukuki belirsizlik, XRP fiyatını etkilemiştir.

Bankacılık sektöründe kullanım potansiyeli, XRP'yi diğer kripto paralardan ayırt etmektedir.`,
    apiEndpoint: '/api/markets/crypto',
    dataKey: 'xrp',
    relatedAssets: ['bitcoin', 'ethereum', 'ada'],
    keywords: ['XRP', 'Ripple', 'kripto para', 'para transferi', 'blockchain'],
  },

  // Solana
  solana: {
    id: 'solana',
    name: 'Solana (SOL)',
    symbol: 'SOL/USD',
    slug: 'solana',
    category: 'Kripto Para',
    description: 'Solana, yüksek hızlı akıllı sözleşme platformudur. Ethereum\'a alternatif olarak geliştirilmiş, daha hızlı ve düşük maliyetli işlemler sunmaktadır.',
    longDescription: `Solana, 2020 yılında Anatoly Yakovenko tarafından kurulan yüksek performanslı blokzincir platformudur. Proof-of-History (PoH) mekanizmasını kullanarak yüksek işlem hızı sağlamaktadır.

Solana ağında saniyede on binlerce işlem gerçekleştirebilmektedir. Bu hız, merkezi olmayan uygulamalar (dApp), NFT pazarları ve DeFi protokolleri için ideal ortam yaratmaktadır.

Solana ekosistemi, hızlı büyüyen bir kripto ekosistemidir. Magic Eden gibi NFT pazarları, Marinade gibi staking protokolleri Solana'da çalışmaktadır.

SOL fiyatı, Solana ağının benimsenmesi ve genel kripto pazar durumundan etkilenmektedir. Ağın stabil çalışması, SOL talebini artırmaktadır.

2022 yılında FTX çöküşü, Solana ekosistemini etkilese de, network teknik olarak güçlü ve geliştirmeye devam etmektedir.`,
    apiEndpoint: '/api/markets/crypto',
    dataKey: 'sol',
    relatedAssets: ['bitcoin', 'ethereum', 'ada'],
    keywords: ['Solana', 'SOL', 'kripto para', 'blockchain', 'yüksek hız'],
  },

  // BIST 100
  'bist-100': {
    id: 'bist-100',
    name: 'BIST 100 Endeksi',
    symbol: 'XU100',
    slug: 'bist-100',
    category: 'Borsa',
    description: 'Borsa İstanbul\'un ana endeksi. En değerli 100 şirketi kapsar.',
    apiEndpoint: '/api/markets/bist',
    dataKey: 'xu100',
    relatedAssets: ['thyao', 'eregl', 'usd-try'],
  },

  // THYAO
  thyao: {
    id: 'thyao',
    name: 'Türk Hava Yolları',
    symbol: 'THYAO',
    slug: 'thyao',
    category: 'Hisse',
    description: 'Türkiye\'nin bayrak taşıyıcı havayolu şirketi.',
    apiEndpoint: '/api/markets/bist',
    dataKey: 'thyao',
    relatedAssets: ['pgsus', 'bist-100'],
  },

  // EREGL
  eregl: {
    id: 'eregl',
    name: 'Ereğli Demir Çelik',
    symbol: 'EREGL',
    slug: 'eregl',
    category: 'Hisse',
    description: 'Türkiye\'nin en büyük demir-çelik üreticisi.',
    apiEndpoint: '/api/markets/bist',
    dataKey: 'eregl',
    relatedAssets: ['krdmd', 'bist-100'],
  },

  // ASELS
  asels: {
    id: 'asels',
    name: 'Aselsan',
    symbol: 'ASELS',
    slug: 'asels',
    category: 'Hisse',
    description: 'Türkiye\'nin savunma sanayi lideri.',
    apiEndpoint: '/api/markets/bist',
    dataKey: 'asels',
    relatedAssets: ['bist-100'],
  },

  // SISE
  sise: {
    id: 'sise',
    name: 'Şişecam',
    symbol: 'SISE',
    slug: 'sise',
    category: 'Hisse',
    description: 'Dünya çapında cam üreticisi.',
    apiEndpoint: '/api/markets/bist',
    dataKey: 'sise',
    relatedAssets: ['bist-100', 'usd-try'],
  },

  // AKBNK
  akbnk: {
    id: 'akbnk',
    name: 'Akbank',
    symbol: 'AKBNK',
    slug: 'akbnk',
    category: 'Hisse',
    description: 'Türkiye\'nin öncü özel bankası.',
    apiEndpoint: '/api/markets/bist',
    dataKey: 'akbnk',
    relatedAssets: ['isctr', 'bist-100'],
  },

  // GBP/TRY
  'gbp-try': {
    id: 'gbp-try',
    name: 'İngiliz Sterlini (GBP/TRY)',
    symbol: 'GBP/TRY',
    slug: 'gbp-try',
    category: 'Döviz',
    description: 'Birleşik Krallık para birimi.',
    apiEndpoint: '/api/markets/döviz',
    dataKey: 'gbp_try',
    relatedAssets: ['usd-try', 'eur-try'],
  },
};

// Tüm asset'ler için slug listesi (generateStaticParams için)
export const ASSET_SLUGS = Object.keys(ASSETS);

// Helper function: slug'dan asset almak
export const getAssetBySlug = (slug) => {
  return ASSETS[slug];
};

// Helper function: category'ye göre asset'leri filtrele
export const getAssetsByCategory = (category) => {
  return Object.values(ASSETS).filter(asset => asset.category === category);
};

// Benzersiz kategoriler
export const CATEGORIES = [...new Set(Object.values(ASSETS).map(a => a.category))];
