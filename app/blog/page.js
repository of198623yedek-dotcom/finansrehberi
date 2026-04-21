'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import FAQ from '../components/FAQ';
import Link from 'next/link';
import { useState } from 'react';
import { BLOG_ARTICLES } from '@/lib/blog-data';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const articles = BLOG_ARTICLES;

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
