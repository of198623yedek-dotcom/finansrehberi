'use client';

import useSWR from 'swr';
import Link from 'next/link';
import { generateAssetContent } from '@/lib/contentGenerator';
import { ASSETS } from '@/lib/assets-data';

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('API error');
  return res.json();
};

export function TrendingBanner() {
  // Tüm varlıkları topla
  const assetSlugs = Object.keys(ASSETS);
  
  // Her asset için API verisi çek (SWR ile parallel)
  const swrResults = {};
  assetSlugs.forEach((slug) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const result = useSWR(`/api/markets/${ASSETS[slug].apiEndpoint.split('/').pop()}`, fetcher, {
      revalidateOnFocus: false,
      refreshInterval: 300000,
    });
    swrResults[slug] = result;
  });

  // Trending assets'i bulmak için hesapla
  const trendingAssets = assetSlugs
    .map((slug) => {
      const asset = ASSETS[slug];
      const apiData = swrResults[slug].data;
      const assetData = apiData ? apiData[asset.dataKey] : null;
      
      if (!assetData) return null;

      const changePercent = parseFloat(assetData.changePercent || 0);
      const content = generateAssetContent(asset, assetData);

      return {
        slug,
        asset,
        assetData,
        changePercent,
        content,
      };
    })
    .filter(Boolean)
    .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
    .slice(0, 3); // Top 3

  if (trendingAssets.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-white mb-6">🔥 Bugünün Trendleri</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trendingAssets.map((item) => (
          <Link
            key={item.slug}
            href={`/assets/${item.slug}`}
            className="group"
          >
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all duration-300 hover:shadow-2xl h-full">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition">
                    {item.asset.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{item.asset.symbol}</p>
                </div>
                <div className="text-4xl">{item.content.trendBadge.emoji}</div>
              </div>

              {/* Price & Change */}
              <div className="mb-4 pb-4 border-b border-white/10">
                <p className="text-2xl font-bold text-white">
                  {typeof item.assetData.value === 'number'
                    ? item.assetData.value.toLocaleString('tr-TR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : item.assetData.value}
                </p>
                <p
                  className={`text-lg font-semibold mt-1 ${
                    item.changePercent >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                </p>
              </div>

              {/* Generated Content (SEO Boost) */}
              <div className="mb-4">
                <p className="text-blue-300 text-xs uppercase font-semibold mb-2">
                  {item.content.trendBadge.text}
                </p>
                <p className="text-gray-300 text-sm line-clamp-3 group-hover:text-gray-200 transition">
                  {item.content.shortDescription}
                </p>
              </div>

              {/* Keywords */}
              <div className="flex flex-wrap gap-2">
                {item.content.keywords.slice(0, 3).map((keyword, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded text-xs font-medium"
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              {/* Arrow */}
              <div className="mt-4 text-blue-400 group-hover:translate-x-2 transition">
                → Detaylı Analiz
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TrendingBanner;
