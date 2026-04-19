'use client';

/**
 * Reusable AdSense Ad Unit Component
 * AdSense uyumlu reklam alanları
 */

export function AdUnit({ adSlot, format = 'responsive', className = '' }) {
  return (
    <div className={`ad-container ${className}`}>
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive="true"
      ></ins>
      <script>
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </script>
    </div>
  );
}

export default AdUnit;
