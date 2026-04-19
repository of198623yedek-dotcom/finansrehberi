'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import FAQ from '../components/FAQ';
import Link from 'next/link';
import { useState } from 'react';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const articles = [
    {
      id: 0,
      title: 'Tavan Serisi Rehberi: %10 Artışlarla Kazanç Hesaplama',
      excerpt: 'Borsa hisselerinde tavan limitlerini ve kazanç potansiyelini nasıl hesaplarız?',
      category: 'Borsa',
      date: '2026-04-07',
      readTime: 19,
      icon: '🎯',
      accentColor: 'from-orange-500 to-red-500',
      metaDescription: 'Tavan serisi nedir? Borsa tavan limitleri ve kazanç hesaplaması.',
      keywords: 'tavan serisi, borsa, kazanç hesaplama, %10 limit, hisse senedi',
      image: '🎯',
    },
    {
      id: 1,
      title: 'Top 10 Kripto Uygulamaları 2026 - En İyileri',
      excerpt: 'Bitcoin almak ve yönetmek için en güvenli ve kullanışlı uygulamalar.',
      category: 'Kripto',
      date: '2026-04-06',
      readTime: 18,
      icon: '₿',
      accentColor: 'from-blue-500 to-cyan-500',
      metaDescription: 'En iyi kripto uygulamalarını keşfet. Bitcoin, Ethereum almak için güvenli platformlar ve öneriler.',
      keywords: 'kripto uygulaması, bitcoin uygulaması, ethereum cüzdanı, kripto borsası',
      image: '🪙',
    },
    {
      id: 2,
      title: 'Gün İçinde 500$ Kazanmanın 7 Yolu',
      excerpt: 'Hızlı, pratik ve güvenilir yollarla ekstra gelir elde etme stratejileri.',
      category: 'Finans',
      date: '2026-04-06',
      readTime: 22,
      icon: '💰',
      accentColor: 'from-green-500 to-emerald-500',
      metaDescription: '500 dolar kazanma yolları. Hızlı ve güvenilir gelir kaynakları.',
      keywords: 'ekstra gelir, para kazanma, online iş, yan gelir',
      image: '💵',
    },
    {
      id: 3,
      title: 'Yatırımcıların Yaptığı 10 Kritik Hata',
      excerpt: 'Profesyonel yatırımcıların kaçtığı tuzaklar ve çözümleri.',
      category: 'Yatırım',
      date: '2026-04-05',
      readTime: 25,
      icon: '📊',
      accentColor: 'from-purple-500 to-pink-500',
      metaDescription: 'Yatırımda yapılan hatalar ve bunlardan kaçınma yolları.',
      keywords: 'yatırım hatası, hisse senedi, risk yönetimi, portföy',
      image: '⚠️',
    },
    {
      id: 4,
      title: 'Borsa Başlamak İçin Rehberi',
      excerpt: 'Sıfırdan hisse senedi yatırımına başlamak için adım adım rehber.',
      category: 'Rehber',
      date: '2026-04-05',
      readTime: 20,
      icon: '📚',
      accentColor: 'from-orange-500 to-yellow-500',
      metaDescription: 'Borsa başlayanlar için tam rehber. İlk hisse senedi alımı.',
      keywords: 'borsa, hisse senedi, başlangıç, yatırım yapma',
      image: '📖',
    },
    {
      id: 5,
      title: 'Pasif Gelir: Uyurken Para Kazanma',
      excerpt: 'Dividend, faiz: Para çalışırken siz uyuyun.',
      category: 'Finans',
      date: '2026-04-04',
      readTime: 20,
      icon: '💵',
      accentColor: 'from-green-400 to-teal-500',
      metaDescription: 'Pasif gelir kaynakları. Dividend, faiz ve yatırım getirisi.',
      keywords: 'pasif gelir, dividend, faiz, yatırım getirisi',
      image: '🌙',
    },
    {
      id: 6,
      title: 'Teknik Analiz 101: Grafikler Nedir?',
      excerpt: 'Mum grafikleri, trend çizgileri ve profesyonel analiz.',
      category: 'Analiz',
      date: '2026-04-03',
      readTime: 18,
      icon: '📈',
      accentColor: 'from-cyan-500 to-blue-500',
      metaDescription: 'Teknik analiz öğren. Mum grafikleri ve trend çizgileri.',
      keywords: 'teknik analiz, grafik, trend, mum grafikleri',
      image: '📊',
    },
    {
      id: 7,
      title: 'ETF vs Bireysel Hisse',
      excerpt: 'Hangisi daha iyi? Riskiniz daha düşük, kârarınız daha güvenli.',
      category: 'Yatırım',
      date: '2026-04-02',
      readTime: 15,
      icon: '⚖️',
      accentColor: 'from-purple-400 to-indigo-500',
      metaDescription: 'ETF ve hisse senedi karşılaştırması. Hangisi daha iyi?',
      keywords: 'ETF, hisse senedi, yatırım, risk',
      image: '⚖️',
    },
    {
      id: 8,
      title: 'Vergi Planlaması: Vergisiz Kazanma',
      excerpt: 'Yasal yollarla vergi ödememek ve tasarruf etmek.',
      category: 'Vergi',
      date: '2026-04-01',
      readTime: 16,
      icon: '📋',
      accentColor: 'from-red-500 to-rose-500',
      metaDescription: 'Vergi planlaması ve tasarruf stratejileri.',
      keywords: 'vergi, tasarruf, vergi planlaması, yasal',
      image: '📑',
    },
    {
      id: 9,
      title: 'Cryptocurrency Derinlemesine',
      excerpt: 'Bitcoin, Ethereum, DeFi. Blockchain teknolojisini anlamak.',
      category: 'Kripto',
      date: '2026-03-31',
      readTime: 22,
      icon: '🔗',
      accentColor: 'from-blue-600 to-purple-600',
      metaDescription: 'Kripto para, blockchain ve DeFi derinlemesine.',
      keywords: 'blockchain, bitcoin, ethereum, DeFi, kripto',
      image: '⛓️',
    },
    {
      id: 10,
      title: 'FIRE Rehberi: Erken Emeklilik',
      excerpt: 'Financial Independence, Retire Early. 30 yaşında emekli olmak.',
      category: 'Rehber',
      date: '2026-03-30',
      readTime: 19,
      icon: '🔥',
      accentColor: 'from-orange-500 to-red-500',
      metaDescription: 'FIRE hareketi ve erken emeklilik stratejisi.',
      keywords: 'FIRE, erken emeklilik, finansal bağımsızlık',
      image: '🔥',
    },
    {
      id: 11,
      title: 'Borsa Endeksleri: S&P 500, Nasdaq',
      excerpt: 'Borsa endeksleri nedir? En önemli endekslere yatırım.',
      category: 'Rehber',
      date: '2026-03-29',
      readTime: 17,
      icon: '📊',
      accentColor: 'from-indigo-500 to-blue-500',
      metaDescription: 'Borsa endeksleri: S&P 500, Nasdaq, Dow Jones.',
      keywords: 'borsa endeksi, S&P 500, Nasdaq, yatırım',
      image: '📈',
    },
    {
      id: 12,
      title: 'Emeklilik Planlaması: 401k, IRA',
      excerpt: 'Emeklilik için planla. Vergi avantajları olan araçlar.',
      category: 'Planlama',
      date: '2026-03-28',
      readTime: 18,
      icon: '🏦',
      accentColor: 'from-teal-500 to-green-500',
      metaDescription: 'Emeklilik planlaması ve tasarruf araçları.',
      keywords: 'emeklilik, 401k, IRA, tasarruf',
      image: '🏦',
    },
    {
      id: 13,
      title: 'İlk Yatırım Yapanlar Portföyü',
      excerpt: 'Başlangıç portföyü nasıl oluşturulur? Risk dağılımı.',
      category: 'Rehber',
      date: '2026-03-27',
      readTime: 16,
      icon: '🎯',
      accentColor: 'from-yellow-500 to-orange-500',
      metaDescription: 'Başlangıç portföyü ve risk dağılımı stratejisi.',
      keywords: 'portföy, risk dağılımı, yatırım stratejisi',
      image: '🎯',
    },
    {
      id: 14,
      title: 'Stok Seçimi: Hangi Hisse Alınır?',
      excerpt: 'Temel analiz, P/E oranı. Stok seçme kriterleri.',
      category: 'Analiz',
      date: '2026-03-26',
      readTime: 17,
      icon: '🔍',
      accentColor: 'from-blue-500 to-indigo-500',
      metaDescription: 'Hisse senedi seçimi ve temel analiz.',
      keywords: 'hisse senedi, temel analiz, P/E oranı',
      image: '🔍',
    },
    {
      id: 15,
      title: 'Borsa Paniği: Nasıl Sakin Kalınır?',
      excerpt: 'Market crash\'leri tarihi olaylar. Panic selling ve strateji.',
      category: 'Psikoloji',
      date: '2026-03-25',
      readTime: 15,
      icon: '🧠',
      accentColor: 'from-pink-500 to-rose-500',
      metaDescription: 'Borsa panikinde yapılması gerekenler.',
      keywords: 'borsa paniği, market crash, yatırım psikolojisi',
      image: '🧠',
    },
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(articles.map(a => a.category))];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 border-b border-slate-700/50">
        <div className="container mx-auto">
          <div className="max-w-2xl mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Finans & Yatırım
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Rehberleri
              </span>
            </h1>
            <p className="text-xl text-slate-400">
              {articles.length} detaylı makale ile finansal bilginizi derinleştirin ve hedefinize ulaşın.
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-xl mb-8">
            <svg className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Makalelerde ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-slate-800 transition"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedCategory === '' 
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50' 
                  : 'bg-slate-800/30 text-slate-400 hover:text-slate-300 border border-slate-700/30'
              }`}
            >
              Tümü
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === cat 
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50' 
                    : 'bg-slate-800/30 text-slate-400 hover:text-slate-300 border border-slate-700/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-20">
        <div className="container mx-auto">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-slate-400">Aramanızla eşleşen makale bulunamadı.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Link key={article.id} href={`/article/${article.id}`}>
                  <article className="group h-full flex flex-col bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/30 rounded-2xl p-7 hover:border-slate-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden">
                    {/* Icon Background */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${article.accentColor} opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500`}></div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Icon */}
                      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {article.icon}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition line-clamp-2 flex-grow">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-slate-400 mb-6 line-clamp-2">
                        {article.excerpt}
                      </p>

                      {/* Footer */}
                      <div className="flex justify-between items-center text-xs text-slate-500 pt-4 border-t border-slate-700/50">
                        <span className="font-medium text-slate-300">{article.category}</span>
                        <span>{article.readTime} min</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-slate-700/50 py-20 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
        <div className="container mx-auto">
          <Newsletter />
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-slate-700/50 py-20">
        <div className="container mx-auto">
          <FAQ />
        </div>
      </section>

      <Footer />
    </div>
  );
}
