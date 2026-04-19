'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import AdSenseBanner from '../components/AdSenseBanner';
import Link from 'next/link';

export default function Guides() {
  const guides = [
    {
      id: 1,
      title: 'Kripto Para Başlangıç Rehberi',
      category: 'Kripto',
      excerpt: 'Bitcoin, Ethereum ve diğer kripto paralarla tanışın...',
      readTime: 15,
    },
    {
      id: 2,
      title: 'Borsa Yatırımı Nasıl Başlanır?',
      category: 'Borsa',
      excerpt: 'Adım adım hisse senedi yatırımı yapmanın temel rehberi...',
      readTime: 12,
    },
    {
      id: 3,
      title: 'Yatırım Portföyü Oluşturma',
      category: 'Yatırım',
      excerpt: 'Çeşitlendirilmiş portföy ile riski azaltın...',
      readTime: 18,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="py-12 px-4 bg-slate-800 bg-opacity-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-100">
            Finans Rehberleri
          </h1>
          <p className="text-slate-400 text-lg">
            Adım adım öğren, profesyonel yatırımcı ol
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <div key={guide.id} className="bg-slate-800 rounded-lg overflow-hidden card-hover cursor-pointer">
              <div className="bg-gradient-to-br from-slate-700 to-slate-800 h-40 flex items-center justify-center text-5xl">
                📚
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm bg-accent text-primary px-3 py-1 rounded font-bold">
                    {guide.category}
                  </span>
                  <span className="text-xs text-slate-500">{guide.readTime} dk</span>
                </div>
                <h3 className="text-lg font-bold text-slate-100 mb-2">
                  {guide.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  {guide.excerpt}
                </p>
                <button className="bg-accent text-primary px-4 py-2 rounded font-bold hover:bg-blue-400 transition">
                  Rehberi Oku
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <AdSenseBanner />

      <Footer />
    </div>
  );
}
