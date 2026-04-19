'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getStockQuote, getCompanyProfile } from '@/lib/finnhub';
import AffiliateCard from '@/app/components/AffiliateCard';
import Link from 'next/link';

export default function StockDetail() {
  const params = useParams();
  const symbol = params.symbol?.toUpperCase();
  const [stock, setStock] = useState(null);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const quote = await getStockQuote(symbol);
      const profile = await getCompanyProfile(symbol);
      setStock(quote);
      setCompany(profile);
      setLoading(false);
    }
    if (symbol) loadData();
  }, [symbol]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!stock) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 pt-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Hisse Bulunamadı</h1>
          <p className="text-slate-400 mb-6">Aradığınız hisse senedi ({symbol}) bulunamadı</p>
          <Link href="/stocks" className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
            Geri Dön
          </Link>
        </div>
      </div>
    );
  }

  const isPositive = stock.change >= 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/stocks" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
            ← Geri
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">{symbol}</h1>
          <p className="text-slate-400">{company?.name || 'Company Name'}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Price Section */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-8 border border-slate-700 mb-8">
          <p className="text-5xl font-bold text-white mb-4">
            ${stock.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <div className={`flex items-center gap-4 text-xl font-semibold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
            <span className="text-3xl">{isPositive ? '▲' : '▼'}</span>
            <span>
              {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Açılış', value: stock.open },
            { label: 'Yüksek', value: stock.high },
            { label: 'Düşük', value: stock.low },
            { label: 'Önceki Kapanış', value: stock.previousClose },
          ].map((stat, i) => (
            <div key={i} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
              <p className="text-xl font-bold text-white">
                ${stat.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          ))}
        </div>

        {/* Company Info */}
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Şirket Bilgileri</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-slate-400 mb-1">Sektör</p>
              <p className="text-white font-semibold">{company?.sector || 'N/A'}</p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">Endüstri</p>
              <p className="text-white font-semibold">{company?.industry || 'N/A'}</p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">Pazar Değeri</p>
              <p className="text-white font-semibold">
                {company?.marketCap
                  ? `$${(company.marketCap / 1e9).toFixed(1)}B`
                  : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">Çalışan Sayısı</p>
              <p className="text-white font-semibold">
                {company?.employees?.toLocaleString() || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Affiliate CTA Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Hemen Ticaret Yap</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AffiliateCard
              broker="Binance"
              url="https://accounts.binance.com/register?ref=your_ref_id"
              description="Kripto para ticareti için en büyük platform"
            />
            <AffiliateCard
              broker="eToro"
              url="https://etoro.com"
              description="Hisse senedi ve kripto ticareti"
            />
            <AffiliateCard
              broker="Crypto.com"
              url="https://crypto.com"
              description="Kripto para borsası"
            />
          </div>
        </div>

        {/* Related Articles */}
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">İlgili Makaleler</h2>
          <div className="space-y-3">
            <Link href="/blog" className="block p-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition text-slate-300 hover:text-white">
              📚 {symbol === 'BTC' || symbol === 'ETH' ? 'Kripto Para Yatırımı' : symbol === 'AAPL' || symbol === 'MSFT' ? 'Teknoloji Hisseleri' : 'Hisse Senedi Analizi'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
