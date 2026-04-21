'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdSenseBanner from '../components/AdSenseBanner';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function BloombergBorsaClone() {
  const { data: newsData } = useSWR('/api/markets/news', fetcher);
  const { data: bistData } = useSWR('/api/markets/bist', fetcher);
  
  const news = newsData || [];
  const featuredNews = news.slice(0, 4);
  const regularNews = news.slice(4);

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-100 font-sans">
      <Header />

      {/* --- BLOOMBERG STYLE TICKER --- */}
      <div className="bg-[#111827] border-b border-slate-800 py-1.5 overflow-hidden whitespace-nowrap sticky top-[80px] z-40">
        <div className="inline-flex animate-ticker whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-8 px-4 items-center">
              <TickerItem label="BIST 100" value="13.674" change="+1.02%" up={true} />
              <TickerItem label="DOLAR" value="44.55" change="-0.21%" up={false} />
              <TickerItem label="EURO" value="52.03" change="+0.45%" up={true} />
              <TickerItem label="ALTIN" value="6.756" change="+0.12%" up={true} />
              <TickerItem label="BITCOIN" value="103.450" change="-1.45%" up={false} />
              <TickerItem label="FAİZ" value="45.00" change="0.00%" up={null} />
            </div>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* --- MAIN HEADLINE GRID (BLOOMBERG STYLE) --- */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          {/* Main Large Article */}
          <div className="lg:col-span-8 group cursor-pointer">
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1611974717483-9b939c851acb?q=80&w=1200&auto=format&fit=crop" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Main News"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest mb-4 inline-block">
                  MANŞET ANALİZ
                </span>
                <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 group-hover:text-blue-400 transition-colors">
                  {featuredNews[0]?.title || 'Piyasalarda Kritik Haftaya Giriliyor: Gözler Kararlarda'}
                </h1>
                <p className="text-slate-300 text-sm md:text-lg max-w-2xl line-clamp-2">
                  Küresel piyasalar enflasyon verilerine odaklanırken, Borsa İstanbul'da bankacılık endeksi öncülüğünde yeni rekorlar test ediliyor. Analistler kritik seviyeleri değerlendirdi.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column Headlines */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {featuredNews.slice(1).map((n, i) => (
              <div key={i} className="flex gap-4 p-3 bg-slate-800/30 hover:bg-slate-800/50 rounded-xl border border-slate-800 transition group cursor-pointer">
                <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden border border-slate-700">
                  <img src={`https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=200&auto=format&fit=crop`} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                </div>
                <div>
                  <span className="text-[9px] text-blue-400 font-bold uppercase tracking-widest">{n.category || 'BORSA'}</span>
                  <h3 className="text-sm font-bold leading-snug text-white mt-1 group-hover:text-blue-400 transition">
                    {n.title}
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-2 font-mono">15 DK ÖNCE</p>
                </div>
              </div>
            ))}
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-6 rounded-2xl border border-blue-500/30 flex flex-col items-center justify-center text-center">
              <h4 className="text-sm font-bold text-white mb-2">Piyasa Uzmanı Olun</h4>
              <p className="text-[10px] text-slate-400 mb-4 text-center">Tüm analizler ve derinlikli veriler için FinansRehberi+ her zaman yanınızda.</p>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-lg transition">ABONE OL</button>
            </div>
          </div>
        </section>

        {/* --- MARKET DATA CENTER --- */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-2">
              <h2 className="text-xl font-black text-white uppercase tracking-tighter">Borsa İstanbul Veri Hub</h2>
              <Link href="/market" className="text-xs text-blue-400 hover:underline">TÜMÜNÜ GÖR</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BorsaTable title="XU100 Endeksi" up={true} />
              <BorsaTable title="En Aktif Hisseler" up={null} />
            </div>

            <div className="mt-8">
               <AdSenseBanner slot="in-content-2" label="Reklam" />
            </div>

            {/* Regular News List */}
            <div className="mt-12 space-y-8">
              <h2 className="text-xl font-black text-white uppercase tracking-tighter border-b border-slate-800 pb-2 mb-6">Analiz & Haberler</h2>
              {regularNews.map((n, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-6 group cursor-pointer pb-8 border-b border-slate-800/50">
                   <div className="md:w-64 h-40 shrink-0 rounded-xl overflow-hidden border border-slate-800">
                     <img src="https://images.unsplash.com/photo-1611974717483-9b939c851acb?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                   </div>
                   <div className="flex-1">
                     <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2 block">{n.category}</span>
                     <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition">{n.title}</h3>
                     <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 mb-4">
                       {n.content}
                     </p>
                     <div className="flex items-center gap-4 text-[10px] text-slate-500 font-mono">
                       <span>✍️ {n.source}</span>
                       <span>🕒 2 SAAT ÖNCE</span>
                       <span className="ml-auto text-blue-400 font-bold hover:underline">DEVAMINI OKU →</span>
                     </div>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* SIDEBAR ANALYSIS */}
          <aside className="lg:col-span-4 space-y-8">
             <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
                <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 border-l-4 border-blue-600 pl-3">Uzman Görüşleri</h3>
                <div className="space-y-6">
                  {[
                    { name: "Ahmet Yılmaz", title: "Merkez'in hamlesi ne anlama geliyor?", img: "https://i.pravatar.cc/100?u=1" },
                    { name: "Selin Demir", title: "Teknoloji hisselerinde ralli devam eder mi?", img: "https://i.pravatar.cc/100?u=2" },
                    { name: "Mehmet Can", title: "Altın için kritik eşik 2.500 dolar", img: "https://i.pravatar.cc/100?u=3" }
                  ].map((u, i) => (
                    <div key={i} className="flex gap-4 group cursor-pointer">
                      <img src={u.img} className="w-12 h-12 rounded-full border border-slate-700 grayscale group-hover:grayscale-0 transition duration-300" />
                      <div>
                        <h4 className="text-xs font-bold text-blue-400 uppercase">{u.name}</h4>
                        <p className="text-sm font-bold text-slate-100 group-hover:text-blue-400 transition leading-snug">{u.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
             </div>

             <div className="bg-gradient-to-br from-slate-900 to-[#0a0f1c] border border-slate-800 rounded-2xl p-6 sticky top-[150px]">
                <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4">Ekonomik Takvim</h3>
                <div className="space-y-4">
                  <CalendarItem time="10:00" event="TÜİK Enflasyon Verisi" impact="Yüksek" />
                  <CalendarItem time="14:30" event="ABD İşsizlik Başvuruları" impact="Orta" />
                  <CalendarItem time="16:00" event="FED Başkanı Konuşması" impact="Yüksek" />
                </div>
             </div>
          </aside>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 30s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

function TickerItem({ label, value, change, up }) {
  return (
    <div className="flex items-center gap-2 text-[11px] font-mono">
      <span className="text-slate-400 font-bold">{label}</span>
      <span className="text-white font-black">{value}</span>
      <span className={up === null ? 'text-slate-500' : up ? 'text-emerald-400' : 'text-red-400'}>
        {up === true ? '▲' : up === false ? '▼' : ''} {change}
      </span>
    </div>
  );
}

function BorsaTable({ title, up }) {
  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden">
      <div className="px-4 py-2.5 bg-slate-800/50 flex items-center justify-between">
        <span className="text-[10px] font-black text-white uppercase tracking-widest">{title}</span>
        {up !== null && <span className={`text-[10px] ${up ? 'text-emerald-400' : 'text-red-400'}`}>{up ? 'BOLLISH' : 'BEARISH'}</span>}
      </div>
      <table className="w-full text-left">
        <tbody>
          {[1, 2, 3, 4, 5].map(i => (
            <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition cursor-pointer">
              <td className="px-4 py-2.5 text-xs font-bold text-slate-300">HISSE {i}</td>
              <td className="px-4 py-2.5 text-xs text-right font-mono text-white">{(120 + i * 15).toFixed(2)}</td>
              <td className="px-4 py-2.5 text-xs text-right font-mono text-emerald-400">+{i}.20%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CalendarItem({ time, event, impact }) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-800/50 pb-3">
      <div className="text-[10px] font-mono text-slate-500">{time}</div>
      <div className="flex-1 text-[11px] font-bold text-slate-200">{event}</div>
      <div className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${impact === 'Yüksek' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
        {impact}
      </div>
    </div>
  );
}
