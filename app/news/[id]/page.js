import React from 'react';
import Link from 'next/link';
import { getNewsById } from '@/lib/newsService';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export const dynamic = 'force-dynamic';

export default async function NewsDetailPage({ params }) {
  const news = await getNewsById(params.id);

  if (!news) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold text-white mb-4">Haber Bulunamadı</h1>
        <p className="text-slate-400 mb-8">Aradığınız haber yayından kaldırılmış veya taşınmış olabilir.</p>
        <Link href="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition">
          Ana Sayfaya Dön
        </Link>
      </div>
    );
  }

  const KAT_RENK = {
    'BORSA': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'EKONOMİ': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'KRİPTO': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    'DÖVİZ': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'ALTIN': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'ŞİRKET': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        {/* Navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors text-sm"
        >
          <span>←</span> Piyasa Özetine Dön
        </Link>

        {/* Content Header */}
        <article className="bg-slate-900/60 backdrop-blur-2xl rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
          {/* Header Image / Gradient Area */}
          <div className="h-48 md:h-64 w-full bg-gradient-to-br from-blue-900/40 via-slate-800/20 to-purple-900/40 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl opacity-20 grayscale select-none">📊</span>
            </div>
            <div className="absolute bottom-6 left-6 md:left-10">
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${KAT_RENK[news.category] || 'bg-slate-700 border-slate-600'}`}>
                {news.category}
              </span>
            </div>
          </div>

          <div className="p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mb-6">
              <span className="flex items-center gap-1">
                <span className="opacity-70">🗓️</span> {new Date(news.publishedAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1">
                <span className="opacity-70">🕒</span> {new Date(news.publishedAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span className="flex items-center gap-1">
                <span className="opacity-70">✍️</span> Kaynak: <span className="text-blue-400 font-semibold">{news.source}</span>
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-8 leading-tight tracking-tight">
              {news.title}
            </h1>

            <div className="prose prose-invert max-w-none">
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-medium mb-6">
                {news.content.split('. ')[0]}.
              </p>
              
              <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent my-8" />
              
              <p className="text-slate-400 leading-loose text-base md:text-lg">
                {news.content.split('. ').slice(1).join('. ')}
              </p>
              
              <div className="bg-blue-900/10 border-l-4 border-blue-500 p-6 my-10 rounded-r-xl">
                <p className="text-sm italic text-blue-200/80 m-0">
                  "Bu haber, otomatik veri analiz sistemleri tarafından piyasa hareketlerini özetlemek amacıyla oluşturulmuştur. Yatırım kararlarınızı vermeden önce mutlaka SPK lisanslı bir danışmana başvurunuz."
                </p>
              </div>
            </div>

            {/* Social Share Mock */}
            <div className="flex items-center gap-4 mt-12 pt-8 border-t border-slate-800/50">
              <span className="text-sm text-slate-500">Paylaş:</span>
              <div className="flex gap-2">
                {[1, 2, 3].map(i => (
                  <button key={i} className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition border border-slate-700">
                    <span className="text-xs">🔗</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Related Assets Suggestion */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-2xl border border-slate-800/50">
            <h4 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest">İlgili Varlıklar</h4>
            <div className="flex flex-wrap gap-2">
              {['BIST100', 'USD/TRY', 'ALTIN'].map(asset => (
                <Link key={asset} href="/" className="px-4 py-2 bg-slate-800/50 hover:bg-blue-600/20 rounded-lg text-sm border border-slate-700 transition">
                  {asset}
                </Link>
              ))}
            </div>
          </div>
          <div className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-2xl border border-slate-800/50 flex flex-col justify-center">
            <p className="text-sm text-slate-400">Daha fazla analiz için AI Danışman'a soru sorabilirsiniz.</p>
            <button className="mt-3 text-blue-400 text-sm font-bold hover:underline flex items-center gap-1">
              AI Danışmanı Başlat <span>→</span>
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
