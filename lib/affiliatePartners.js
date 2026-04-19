/**
 * Affiliate Partners Data
 * Kripto para, altın ve yatırım platformları için affiliate linkler
 */

export const AFFILIATE_PARTNERS = {
  crypto: [
    {
      id: 'binance',
      name: 'Binance',
      description: 'Dünya\'s en büyük kripto borsası',
      category: 'Exchange',
      link: process.env.NEXT_PUBLIC_AFFILIATE_BINANCE || 'https://www.binance.com',
      icon: '📊',
      rating: 4.8,
    },
    {
      id: 'coinbase',
      name: 'Coinbase',
      description: 'Güvenilir ve kolay kullanımlı platform',
      category: 'Exchange',
      link: process.env.NEXT_PUBLIC_AFFILIATE_COINBASE || 'https://www.coinbase.com',
      icon: '💱',
      rating: 4.5,
    },
    {
      id: 'kraken',
      name: 'Kraken',
      description: 'Profesyonel trading araçları',
      category: 'Exchange',
      link: process.env.NEXT_PUBLIC_AFFILIATE_KRAKEN || 'https://www.kraken.com',
      icon: '🐙',
      rating: 4.6,
    },
    {
      id: 'kucoin',
      name: 'KuCoin',
      description: 'Geniş coin seçimi ve düşük ücretler',
      category: 'Exchange',
      link: process.env.NEXT_PUBLIC_AFFILIATE_KUCOIN || 'https://www.kucoin.com',
      icon: '⭐',
      rating: 4.4,
    },
  ],
  gold: [
    {
      id: 'goldmoney',
      name: 'GoldMoney',
      description: 'Fiziki altın yatırımı',
      category: 'Investment',
      link: process.env.NEXT_PUBLIC_AFFILIATE_GOLDMONEY || 'https://www.goldmoney.com',
      icon: '🪙',
      rating: 4.7,
    },
    {
      id: 'bullionvault',
      name: 'BullionVault',
      description: 'Düşük maliyetli altın ticareti',
      category: 'Investment',
      link: process.env.NEXT_PUBLIC_AFFILIATE_BULLIONVAULT || 'https://www.bullionvault.com',
      icon: '💰',
      rating: 4.6,
    },
    {
      id: 'ziyar-altin',
      name: 'Ziyar Altın',
      description: 'Türkiye\'nin güvenilir altın platformu',
      category: 'Investment',
      link: process.env.NEXT_PUBLIC_AFFILIATE_ZIYAR || 'https://www.ziyaraltın.com.tr',
      icon: '🇹🇷',
      rating: 4.5,
    },
  ],
  general: [
    {
      id: 'etoro',
      name: 'eToro',
      description: 'Sosyal trading ve yatırım platformu',
      category: 'Platform',
      link: process.env.NEXT_PUBLIC_AFFILIATE_ETORO || 'https://www.etoro.com',
      icon: '📈',
      rating: 4.3,
    },
    {
      id: 'interactive-brokers',
      name: 'Interactive Brokers',
      description: 'Profesyonel yatırım araçları',
      category: 'Broker',
      link: process.env.NEXT_PUBLIC_AFFILIATE_IBKR || 'https://www.interactivebrokers.com',
      icon: '🎯',
      rating: 4.7,
    },
  ],
};

export function getAffiliatePartnersByType(type) {
  return AFFILIATE_PARTNERS[type] || [];
}

export function getAllAffiliatePartners() {
  return [
    ...AFFILIATE_PARTNERS.crypto,
    ...AFFILIATE_PARTNERS.gold,
    ...AFFILIATE_PARTNERS.general,
  ];
}

export default AFFILIATE_PARTNERS;
