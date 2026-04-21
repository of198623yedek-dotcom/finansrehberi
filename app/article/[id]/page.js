'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AdSenseBanner from '../../components/AdSenseBanner';
import Link from 'next/link';
import { BLOG_ARTICLES } from '@/lib/blog-data';

export default function Article({ params }) {
  const { id } = params;

  const article = BLOG_ARTICLES.find(a => a.id.toString() === id);

  // Schema.org Article JSON-LD
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article?.title,
    "description": article?.metaDescription,
    "image": "https://finans-rehberi.vercel.app/og-image.png",
    "datePublished": article?.date,
    "author": {
      "@type": "Organization",
      "name": article?.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "FinansRehberi",
      "logo": {
        "@type": "ImageObject",
        "url": "https://finans-rehberi.vercel.app/logo.png"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="min-h-screen flex flex-col">
        <Header />

        <article className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-accent text-primary px-4 py-1 rounded-full font-bold text-sm">
                {article?.category || 'Yatırım'}
              </span>
              <span className="text-slate-400 text-sm">{article?.readTime || 0} dk okuma</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
              {article?.title || 'Makale Bulunamadı'}
            </h1>

            <p className="text-lg text-slate-300 mb-6">
              {article?.intro || 'Aradığınız makale sistem&apos;te mevcut değil.'}
            </p>

            <div className="flex items-center gap-4 text-slate-400 mb-8">
              <span>{article?.author || 'FinansRehberi'}</span>
              <span>•</span>
              <span>{article?.date || '2026-04-06'}</span>
            </div>
          </div>

          <AdSenseBanner slot="article-top" />

          <div className="prose prose-invert max-w-none mb-12">
            {article?.sections ? (
              article.sections.map((section, idx) => (
                <div key={idx} className="mb-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mt-8 mb-4">
                    {section.title}
                  </h2>
                  <div className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">
                    {section.content}
                  </div>
                  {section.relatedLink && (
                    <div className="mt-4 p-4 bg-slate-700 rounded-lg">
                      <Link href={`/article/${section.relatedLink.id}`} className="text-accent hover:underline">
                        {section.relatedLink.text}
                      </Link>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-slate-300 text-lg">Makale içeriği yüklenemedi.</p>
            )}
          </div>

          {/* İç Linkler - Related Articles */}
          {article?.relatedArticles && article.relatedArticles.length > 0 && (
            <div className="mb-12 p-6 bg-slate-800 rounded-lg border border-slate-700">
              <h3 className="text-xl font-bold text-slate-100 mb-4">İlgili Makaleler</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {article.relatedArticles.map((relatedId) => {
                  const relatedArticle = BLOG_ARTICLES.find(a => a.id === relatedId);
                  if (!relatedArticle) return null;
                  return (
                    <Link key={relatedId} href={`/article/${relatedId}`}>
                      <div className="p-4 bg-slate-700 rounded hover:bg-slate-600 transition cursor-pointer h-full">
                        <p className="font-bold text-accent text-sm">{relatedArticle.category}</p>
                        <p className="text-slate-100 font-semibold text-sm mt-1">{relatedArticle.title}</p>
                        <p className="text-slate-400 text-xs mt-2">{relatedArticle.readTime} dk okuma</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <AdSenseBanner slot="below-content" />
        </article>

        <section className="bg-slate-800 my-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
            <h3 className="text-2xl font-bold text-slate-200 mb-4">Daha Fazla İçerik</h3>
            <Link
              href="/blog"
              className="inline-block bg-accent text-primary px-8 py-3 rounded-lg font-bold hover:bg-blue-400 transition"
            >
              Tüm Makalelere Dön
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}