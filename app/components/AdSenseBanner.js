'use client';

import { useEffect, useRef } from 'react';

/**
 * AdSenseBanner — Üretim kalitesinde AdSense bileşeni
 *
 * Kullanım:
 *   <AdSenseBanner slot="hero-bottom" label="Reklam" />
 *   <AdSenseBanner slot="sidebar-top" format="rectangle" label="Reklam" />
 *
 * format seçenekleri:
 *   "auto"       → tam genişlik responsive (varsayılan)
 *   "rectangle"  → 300×250 orta dikdörtgen (sidebar için ideal)
 *   "leaderboard"→ 728×90 (masaüstü üst/alt)
 *
 * Gerçek AdSense ID'sini .env.local'e ekle:
 *   NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
 *   NEXT_PUBLIC_ADSENSE_SLOT_HERO_BOTTOM=1234567890
 *   (her slot için ayrı env)
 */

const CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-XXXXXXXXXXXXXXXX';

// Slot → env eşlemesi — projeye göre genişlet
const SLOT_MAP = {
  'hero-bottom': process.env.NEXT_PUBLIC_ADSENSE_SLOT_HERO_BOTTOM,
  'in-content-1': process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT_1,
  'in-content-2': process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT_2,
  'below-content': process.env.NEXT_PUBLIC_ADSENSE_SLOT_BELOW_CONTENT,
  'sidebar-top': process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR_TOP,
  'sidebar-mid': process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR_MID,
  'sidebar-bottom': process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR_BOTTOM,
  'footer-leaderboard': process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER,
  'article-top': process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_TOP,
  'article-mid': process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_MID,
};

const FORMAT_STYLES = {
  auto: { display: 'block', width: '100%', minHeight: 90 },
  rectangle: { display: 'inline-block', width: 300, height: 250 },
  leaderboard: { display: 'block', width: '100%', minHeight: 90, maxWidth: 728 },
};

export default function AdSenseBanner({
  slot = 'in-content-1',
  format = 'auto',
  label = 'Reklam',
  className = '',
}) {
  const adRef = useRef(null);
  const pushed = useRef(false);
  const slotId = SLOT_MAP[slot];
  const isConfigured = CLIENT_ID !== 'ca-pub-XXXXXXXXXXXXXXXX' && slotId;
  const containerStyle = FORMAT_STYLES[format] || FORMAT_STYLES.auto;

  useEffect(() => {
    if (!isConfigured || pushed.current) return;
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushed.current = true;
      }
    } catch (e) {
      // AdSense henüz yüklenmemiş
    }
  }, [isConfigured]);

  // ── AdSense Yapılandırılmış: gerçek reklam ──────────────────────────────
  if (isConfigured) {
    return (
      <div className={`adsense-wrapper text-center ${className}`}>
        <p className="text-[10px] text-slate-600 mb-1">{label}</p>
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={containerStyle}
          data-ad-client={CLIENT_ID}
          data-ad-slot={slotId}
          data-ad-format={format === 'auto' ? 'auto' : undefined}
          data-full-width-responsive={format === 'auto' ? 'true' : undefined}
        />
      </div>
    );
  }

  // ── Geliştirme/Demo Modu: yer tutucu ────────────────────────────────────
  const placeholderH =
    format === 'rectangle' ? 250 : format === 'leaderboard' ? 90 : 100;

  return (
    <div
      className={`adsense-placeholder rounded-lg border border-dashed border-slate-700 bg-slate-800/30 flex flex-col items-center justify-center text-center ${className}`}
      style={{
        minHeight: placeholderH,
        width: format === 'rectangle' ? 300 : '100%',
        margin: '0 auto',
      }}
    >
      <p className="text-xs text-slate-600 font-semibold uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-xs text-slate-700">
        {format === 'auto' && 'Responsive Reklam Alanı'}
        {format === 'rectangle' && '300 × 250 Reklam'}
        {format === 'leaderboard' && '728 × 90 Leaderboard'}
      </p>
      <p className="text-[10px] text-slate-800 mt-1">AdSense ID eklenince aktif olur</p>
    </div>
  );
}
