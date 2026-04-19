'use client';

import AdUnit from './AdUnit';

/**
 * Sidebar Vertical Ad (300x250 or 300x600)
 * Yan tarafta dikey reklam
 */
export function AdSidebar() {
  return (
    <div className="sticky top-24 bg-white border border-gray-200 rounded p-4">
      <div className="min-h-[300px] flex items-center justify-center bg-gray-50 rounded border border-gray-200">
        <AdUnit 
          adSlot={process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT}
          format="vertical"
          className="w-full"
        />
      </div>
      <p className="text-xs text-gray-400 mt-2 text-center">Sponsorlu İçerik</p>
    </div>
  );
}

export default AdSidebar;
