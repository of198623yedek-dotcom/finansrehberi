'use client';

/**
 * AŞAMA 5: Data Staleness Warning Banner
 * 
 * Gösterir:
 * - 🟢 Fresh data (< 5 min)
 * - 🟡 Stale (5-60 min)
 * - 🔴 Very Stale (> 60 min)
 */

import { useState, useEffect } from 'react';

export function DataStalenessWarning({
  staleSinceSeconds = null,
  qualityScore = 100,
  warningType = 'info',
  message = null,
  onDismiss = null,
}) {
  const [dismissed, setDismissed] = useState(false);

  // Determine freshness level
  const getFreshnessLevel = () => {
    if (!staleSinceSeconds) return { level: 'fresh', color: 'green', icon: '✓' };
    if (staleSinceSeconds < 300) return { level: 'fresh', color: 'green', icon: '✓' };
    if (staleSinceSeconds < 1800) return { level: 'stale', color: 'yellow', icon: '⚠️' };
    if (staleSinceSeconds < 3600) return { level: 'stale', color: 'orange', icon: '⚠️' };
    return { level: 'very-stale', color: 'red', icon: '🔴' };
  };

  const freshness = getFreshnessLevel();
  const timeAgo = formatTimeAgo(staleSinceSeconds);

  // Don't show if fresh
  if (freshness.level === 'fresh' && !message) {
    return null;
  }

  if (dismissed) {
    return null;
  }

  // Color mapping
  const colorMap = {
    green: 'bg-green-500/10 border-green-500/30 text-green-200',
    yellow: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-200',
    orange: 'bg-orange-500/10 border-orange-500/30 text-orange-200',
    red: 'bg-red-500/10 border-red-500/30 text-red-200',
  };

  const bgColor = colorMap[freshness.color];

  return (
    <div className={`rounded-lg border-l-4 p-4 mb-6 ${bgColor} transition-all`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <span className="text-xl mt-1">{freshness.icon}</span>
          
          <div>
            {/* Main Message */}
            <p className="font-semibold text-sm">
              {message || getDefaultMessage(freshness.level, timeAgo)}
            </p>

            {/* Sub-message */}
            <p className="text-xs mt-1 opacity-80">
              {getSubMessage(freshness.level, qualityScore)}
            </p>

            {/* Quality Score */}
            {qualityScore < 100 && (
              <div className="flex items-center gap-2 mt-2">
                <div className="text-xs">Veri Kalitesi:</div>
                <div className="flex gap-1">
                  {Array(5).fill(0).map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 w-4 rounded ${
                        i < Math.ceil(qualityScore / 20)
                          ? 'bg-green-500'
                          : 'bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-xs ml-2">{qualityScore}%</div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 mt-3">
              {freshness.level !== 'fresh' && (
                <button className="text-xs px-3 py-1 rounded bg-white/20 hover:bg-white/30 transition">
                  ↻ Yenile
                </button>
              )}
              <button
                onClick={() => {
                  setDismissed(true);
                  onDismiss?.();
                }}
                className="text-xs px-3 py-1 rounded bg-white/10 hover:bg-white/20 transition"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            setDismissed(true);
            onDismiss?.();
          }}
          className="text-xl opacity-50 hover:opacity-100 transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

// ============================================
// Helper Functions
// ============================================

function formatTimeAgo(seconds) {
  if (!seconds) return 'henüz';
  if (seconds < 60) return `${seconds} saniye`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} dakika`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} saat`;
  return `${Math.floor(seconds / 86400)} gün`;
}

function getDefaultMessage(level, timeAgo) {
  switch (level) {
    case 'fresh':
      return '✓ Veriler günceldir';
    case 'stale':
      return `⚠️ Veriler ${timeAgo} önce güncellenmiştir`;
    case 'very-stale':
      return `🔴 Veriler çok eski (${timeAgo} önce)`;
    default:
      return 'Veriler güncellenemedi';
  }
}

function getSubMessage(level, score) {
  switch (level) {
    case 'fresh':
      return 'Canlı piyasa verilerine göre güncellenmiştir';
    case 'stale':
      return 'Veri tarafindan sunulan bilgiler geçici olarak güncellenemiyor, son başarılı veri gösterilmektedir';
    case 'very-stale':
      return `Ciddi veri güncellenme sorunu yaşanıyor. ${score < 50 ? 'Lütfen daha sonra tekrar deneyin.' : 'Veri tarafindan sağlanan son bilinen değer gösterilmektedir.'}`;
    default:
      return 'Veri güncellenemedi, lütfen daha sonra tekrar deneyin';
  }
}

// ============================================
// Inline Warning (Minimal)
// ============================================

export function InlineDataWarning({ staleSinceSeconds, compact = false }) {
  if (!staleSinceSeconds || staleSinceSeconds < 300) {
    return null;
  }

  const timeAgo = formatTimeAgo(staleSinceSeconds);
  const isVeryStale = staleSinceSeconds > 3600;

  if (compact) {
    return (
      <div className={`text-xs px-2 py-1 rounded ${
        isVeryStale ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'
      }`}>
        {`📊 ${timeAgo} önce`}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
      <span className={isVeryStale ? '🔴' : '⏱️'} />
      <span>Veriler {timeAgo} önce güncellenmiştir</span>
    </div>
  );
}

// ============================================
// Critical Error Alert
// ============================================

export function CriticalDataAlert({
  title = 'Veri Alınamadı',
  message = 'Piyasa verilerine şu anda erişilemiyor. Lütfen daha sonra tekrar deneyin.',
  onRetry = null,
}) {
  return (
    <div className="bg-red-500/20 border-l-4 border-red-500 rounded-lg p-6 text-center">
      <div className="text-3xl mb-3">🚨</div>
      
      <h2 className="text-2xl font-bold text-red-300 mb-2">{title}</h2>
      
      <p className="text-red-200 mb-6 max-w-md mx-auto leading-relaxed">
        {message}
      </p>

      <div className="flex gap-4 justify-center">
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-semibold"
        >
          🔄 Yeniden Dene
        </button>
        
        <a
          href="https://finans-rehberi.vercel.app/status"
          className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
        >
          📊 Durum Kontrol
        </a>
      </div>

      <p className="text-red-300/60 text-xs mt-6">
        Sorun devam ederse lütfen daha sonra tekrar deneyin veya destek ekibimizle iletişime geçin.
      </p>
    </div>
  );
}

// ============================================
// Data Source Badge
// ============================================

export function DataSourceBadge({ source = 'api', isStale = false }) {
  const sourceMap = {
    'api': { label: '🔴 Canlı', color: 'bg-green-500/20 text-green-200' },
    'stale-data': { label: '🟡 Cache', color: 'bg-yellow-500/20 text-yellow-200' },
    'previous-value': { label: '🔶 Önceki', color: 'bg-orange-500/20 text-orange-200' },
    'mock-data': { label: '⚪ Demo', color: 'bg-gray-500/20 text-gray-200' },
  };

  const info = sourceMap[source] || sourceMap['api'];

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${info.color}`}>
      {info.label}
    </span>
  );
}

export default {
  DataStalenessWarning,
  InlineDataWarning,
  CriticalDataAlert,
  DataSourceBadge,
};
