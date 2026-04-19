'use client';

import Link from 'next/link';
import { getAssetBySlug } from '@/lib/assets-data';
import useCachedAssetData from '@/lib/hooks/useCachedAssetData';
import { SkeletonAssetPage, LoadingSpinner } from '@/app/components/SkeletonLoaders';
import generateAssetContent, { generateSEODescription } from '@/lib/contentGenerator';
import { generateCompleteTrendReport, detectOverboughtOversold } from '@/lib/trendAnalyzer';
import { FinancialProductSchema, BreadcrumbSchema } from '@/app/components/StructuredData';
import { DataStalenessWarning, CriticalDataAlert, DataSourceBadge } from '@/app/components/DataStalenessWarning';
import { AffiliateGrid } from '@/app/components/AffiliateCard';
import { getAffiliatePartnersByType } from '@/lib/affiliatePartners';
import { AdvancedAnalytics } from '@/app/components/AdvancedAnalytics';
import { getMockAnalyticsData } from '@/lib/mockAnalyticsData';

// Helper function
function formatTime(seconds) {
  if (!seconds) return 'henüz';
  if (seconds < 60) return `${seconds} saniye`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} dakika`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} saat`;
  return `${Math.floor(seconds / 86400)} gün`;
}

export default function AssetPage({ params }) {
  const asset = getAssetBySlug(params.asset);
  
  const { data: allData, error, isLoading, mutate } = useCachedAssetData(
    asset?.apiEndpoint || null
  );

  const assetData = allData && asset ? allData[asset.dataKey] : null;

  if (!asset) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Varlık Bulunamadı</h1>
          <p className="text-gray-400 mb-8">Aradığınız finansal varlık bulunamıştır.</p>
          <Link href="/market" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block">
            Pazar'a Dön
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading && !assetData) {
    return <SkeletonAssetPage />;
  }

  if (error && !assetData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 🆕 AŞAMA 5: Critical Alert */}
          <CriticalDataAlert
            title={`${asset.name} Veri Alınamadı`}
            message={`${asset.name} için piyasa verileri şu anda alınamıyor. Lütfen daha sonra tekrar deneyin.`}
            onRetry={() => mutate()}
          />
          
          <div className="mt-6 text-center">
            <button
              onClick={() => mutate()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition inline-block"
            >
              🔄 Yeniden Dene
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Content Generator ile dinamik içerik oluştur
  const generatedContent = generateAssetContent(asset, assetData);
  const trendReport = generateCompleteTrendReport(asset.name, assetData);
  const overbought = detectOverboughtOversold(assetData?.changePercent || 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      {/* JSON-LD Structured Data (SEO) */}
      {assetData && (
        <>
          <FinancialProductSchema asset={asset} priceData={assetData} />
          <BreadcrumbSchema asset={asset} />
        </>
      )}

      {/* 🆕 AŞAMA 5: Staleness Warning Banner */}
      {assetData && (
        <DataStalenessWarning
          staleSinceSeconds={assetData.staleSinceSeconds || 0}
          qualityScore={generatedContent.raw?.qualityScore || 100}
          message={
            assetData.isStale
              ? `⚠️ Veriler ${formatTime(assetData.staleSinceSeconds)} önce güncellenmiştir`
              : null
          }
        />
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-white">{asset.name}</h1>
                <span className="bg-blue-600/30 text-blue-200 px-3 py-1 rounded-full text-sm font-semibold">
                  {asset.category}
                </span>
              </div>
              <p className="text-xl text-gray-400">{asset.symbol}</p>
            </div>
            <Link
              href="/market"
              className="text-gray-400 hover:text-white transition text-sm"
            >
              ← Geri
            </Link>
          </div>

          <p className="text-gray-200 text-base leading-relaxed">
            {asset.description}
          </p>
        </div>

        {/* 🆕 TREND BADGE - SEO Keywords İçeriyor */}
        {generatedContent.trendBadge && (
          <div className="mb-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-400/30 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl">{generatedContent.trendBadge.emoji}</div>
              <div>
                <p className="text-blue-300 text-sm font-semibold uppercase">Bugünün Trendi</p>
                <p className="text-2xl font-bold text-white">{generatedContent.trendBadge.text}</p>
              </div>
            </div>
            
            {/* 🆕 AI-Generated Headline (SEO optimized) */}
            <p className="text-white/90 text-lg font-semibold mb-2">{generatedContent.headline}</p>
            <p className="text-gray-300 text-sm">{generatedContent.shortDescription}</p>
          </div>
        )}

        {/* Real-time Data */}
        {assetData ? (
          <>
            {/* Price Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Current Price */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 transition-all hover:border-blue-400/50">
                <p className="text-gray-400 text-sm mb-2">Canlı Fiyat</p>
                <p className="text-3xl font-bold text-white">
                  {typeof assetData.value === 'number'
                    ? assetData.value.toLocaleString('tr-TR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 4,
                      })
                    : assetData.value}
                </p>
                {assetData.price_usd && (
                  <p className="text-gray-500 text-sm mt-2">
                    ${assetData.price_usd.toLocaleString('tr-TR')}
                  </p>
                )}
              </div>

              {/* Change */}
              {assetData.change !== undefined && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 transition-all hover:border-green-400/50">
                  <p className="text-gray-400 text-sm mb-2">24 Saat Değişim</p>
                  <p
                    className={`text-3xl font-bold ${
                      assetData.changePercent >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {assetData.changePercent >= 0 ? '+' : ''}
                    {assetData.changePercent?.toFixed(2) || assetData.change?.toFixed(2)}%
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    {assetData.change >= 0 ? '↑' : '↓'} {Math.abs(assetData.change).toFixed(2)}
                  </p>
                </div>
              )}

              {/* Market Cap */}
              {assetData.market_cap && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 transition-all hover:border-purple-400/50">
                  <p className="text-gray-400 text-sm mb-2">Pazar Değeri</p>
                  <p className="text-3xl font-bold text-white">
                    $
                    {(assetData.market_cap / 1e9).toLocaleString('tr-TR', {
                      maximumFractionDigits: 1,
                    })}
                    B
                  </p>
                  <p className="text-gray-500 text-sm mt-2">Milyar USD</p>
                </div>
              )}
            </div>

            {/* 🆕 Overbought/Oversold Alert */}
            {overbought && (
              <div className={`mb-8 p-4 rounded-lg border-l-4 ${
                overbought.level > 60 
                  ? 'bg-yellow-500/10 border-yellow-500 text-yellow-200'
                  : 'bg-green-500/10 border-green-500 text-green-200'
              }`}>
                <p className="font-semibold">
                  {overbought.emoji} {overbought.condition}
                </p>
                <p className="text-sm mt-1">{overbought.advice}</p>
              </div>
            )}

            {/* Detailed Info Table */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 mb-8">
              <table className="w-full">
                <tbody>
                  {Object.entries(assetData).map(([key, value]) => {
                    if (
                      key === 'timestamp' ||
                      key === 'symbol' ||
                      key === 'name' ||
                      key === 'value' ||
                      key === 'change' ||
                      key === 'changePercent' ||
                      key === 'market_cap'
                    )
                      return null;

                    const label = key
                      .replace(/_/g, ' ')
                      .split(' ')
                      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(' ');

                    return (
                      <tr key={key} className="border-t border-white/10 hover:bg-white/5 transition">
                        <td className="px-6 py-4 text-gray-400 text-sm font-medium">{label}</td>
                        <td className="px-6 py-4 text-white font-semibold">
                          {typeof value === 'number'
                            ? value.toLocaleString('tr-TR', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 4,
                              })
                            : String(value)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
            <LoadingSpinner />
            <p className="text-gray-400 mt-4">Veriler yükleniyor...</p>
          </div>
        )}

        {/* 🆕 Long Description Section - SEO BOOST */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">📖 Detaylı Analiz & Bilgi</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-200 leading-relaxed whitespace-pre-line mb-6">
              {asset.longDescription}
            </p>
          </div>

          {/* 🆕 SEO Keywords Section */}
          <div className="mt-8 p-4 bg-blue-500/10 rounded-lg border border-blue-400/30">
            <p className="text-xs text-blue-300 uppercase font-semibold mb-3">📌 İlgili Arama Terimleri</p>
            <div className="flex flex-wrap gap-2">
              {generatedContent.keywords.slice(0, 8).map((keyword, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-blue-600/30 text-blue-200 rounded-full text-xs font-medium hover:bg-blue-600/50 transition cursor-pointer"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 🆕 Trend Analysis Summary */}
        {assetData && trendReport.summary && (
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8 border border-purple-400/30 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">📊 Teknik Analiz Özeti</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-purple-300 text-sm uppercase font-semibold mb-2">Trend Durumu</p>
                <p className="text-2xl font-bold text-white">{trendReport.summary.headline}</p>
              </div>
              
              <div>
                <p className="text-purple-300 text-sm uppercase font-semibold mb-2">Analiz</p>
                <p className="text-white">{trendReport.summary.analysis}</p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white/10 rounded-lg">
              <p className="text-gray-300 text-sm">
                <span className="font-semibold">💡 Tavsiye:</span> {trendReport.summary.recommendation}
              </p>
            </div>
          </div>
        )}

        {/* Related Assets */}
        {asset.relatedAssets && asset.relatedAssets.length > 0 && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
            <h3 className="text-xl font-bold text-white mb-6">🔗 İlgili Varlıklar</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {asset.relatedAssets.map((relatedSlug) => {
                const relatedAsset = getAssetBySlug(relatedSlug);
                return relatedAsset ? (
                  <Link
                    key={relatedSlug}
                    href={`/assets/${relatedSlug}`}
                    className="bg-blue-600/20 hover:bg-blue-600/40 border border-blue-400/30 rounded-lg p-4 transition group"
                  >
                    <p className="text-blue-300 group-hover:text-blue-200 font-semibold mb-1">
                      {relatedAsset.name}
                    </p>
                    <p className="text-gray-400 text-sm">{relatedAsset.symbol}</p>
                  </Link>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* Refresh Info */}
        {assetData && (
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              {/* 🆕 Data Source Badge */}
              <DataSourceBadge 
                source={assetData.isStale ? 'stale-data' : 'api'} 
                isStale={assetData.isStale}
              />
            </div>
            <p className="text-gray-500 text-xs">
              ✓ Veriler SWR ile cache'leniyor (5 dakikada güncellenir) |
              <button
                onClick={() => mutate()}
                className="text-blue-400 hover:text-blue-300 ml-2 transition"
              >
                Şimdi Güncelle
              </button>
            </p>
          </div>
        )}

        {/* 🆕 AŞAMA 8: Affiliate Partners */}
        {assetData && asset && (
          <>
            {asset.slug === 'bitcoin' || asset.slug === 'ethereum' ? (
              <AffiliateGrid 
                partners={getAffiliatePartnersByType('crypto')}
                title="🪙 Kripto Para Satın Al"
              />
            ) : asset.slug === 'altin' ? (
              <AffiliateGrid 
                partners={getAffiliatePartnersByType('gold')}
                title="💰 Altın Yatırım Platformları"
              />
            ) : null}
            
            <AffiliateGrid 
              partners={getAffiliatePartnersByType('general')}
              title="📈 Genel Yatırım Platformları"
            />
          </>
        )}

        {/* 🆕 STRATEGY #2: Advanced Analytics */}
        {asset && (
          <div className="mt-12 bg-slate-900/50 rounded-xl p-8 border border-slate-700/50">
            <AdvancedAnalytics 
              asset={asset.name}
              data={getMockAnalyticsData(asset.slug)}
            />
          </div>
        )}

        {/* Legal Notice */}
        <div className="mt-12 text-center text-gray-500 text-sm border-t border-white/10 pt-6">
          <p>
            ⚠️ <Link href="/disclaimer" className="text-red-400 hover:text-red-300">
              Disclaimer
            </Link>{' '}
            - Bu veriler eğitim amaçlıdır. Yatırım kararlarında bunu temel almayın.
          </p>
        </div>
      </div>
    </div>
  );
}
