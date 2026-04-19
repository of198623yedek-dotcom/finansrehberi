'use client';

/**
 * Affiliate Card Component
 * Minimalist tasarımlı reklam kartı
 */

export function AffiliateCard({ partner }) {
  if (!partner || !partner.link) {
    return null;
  }

  return (
    <a 
      href={partner.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{partner.icon}</span>
          <div>
            <h4 className="font-bold text-black text-sm">{partner.name}</h4>
            <span className="text-xs text-gray-500">{partner.category}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="text-xs font-semibold text-gray-700">{partner.rating}</span>
          </div>
        </div>
      </div>
      
      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
        {partner.description}
      </p>
      
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-blue-600">Ziyaret Et</span>
        <span className="text-gray-400">→</span>
      </div>
    </a>
  );
}

/**
 * Affiliate Grid Component
 * Birden fazla partner kartı
 */
export function AffiliateGrid({ partners, title }) {
  if (!partners || partners.length === 0 || !partners.some(p => p && p.link)) {
    return null;
  }

  const validPartners = partners.filter(p => p && p.link);

  if (validPartners.length === 0) {
    return null;
  }

  return (
    <div className="my-8 bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-bold text-black mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {validPartners.map((partner) => (
          <AffiliateCard key={partner.id} partner={partner} />
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-xs text-blue-900">
        ℹ️ <strong>Affiliate Bildirimi:</strong> Bu linkler affiliate ortaklıkları içerir. 
        Hiçbir ek maliyet olmadan destek sağlarsınız.
      </div>
    </div>
  );
}

export default AffiliateCard;
