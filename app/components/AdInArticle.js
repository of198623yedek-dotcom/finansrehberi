'use client';

import AdUnit from './AdUnit';

/**
 * In-Article Ad (responsive)
 * Varlık sayfasının içinde / altında
 */
export function AdInArticle() {
  return (
    <div className="my-8 bg-white border border-gray-200 rounded p-6">
      <div className="min-h-[250px] flex items-center justify-center bg-gray-50 rounded border border-gray-200">
        <AdUnit 
          adSlot={process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_SLOT}
          format="responsive"
          className="w-full"
        />
      </div>
      <p className="text-xs text-gray-400 mt-2 text-center">Sponsorlu İçerik</p>
    </div>
  );
}

export default AdInArticle;
