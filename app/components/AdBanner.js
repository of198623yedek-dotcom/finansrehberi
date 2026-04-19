'use client';

import AdUnit from './AdUnit';

/**
 * Header Banner Ad (728x90 or responsive)
 * Dashboard'un üst kısmında
 */
export function AdBanner() {
  return (
    <div className="bg-white border-b border-gray-200 py-4">
      <div className="max-w-6xl mx-auto px-6">
        <div className="min-h-[90px] flex items-center justify-center bg-gray-50 rounded border border-gray-200">
          <AdUnit 
            adSlot={process.env.NEXT_PUBLIC_ADSENSE_BANNER_SLOT}
            format="responsive"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default AdBanner;
