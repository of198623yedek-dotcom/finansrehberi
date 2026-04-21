'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdSenseBanner from '../components/AdSenseBanner';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function BloombergBorsaCloneV2() {
  const [activeNewsTab, setActiveNewsTab] = useState('Borsa');
  const { data: newsData } = useSWR('/api/markets/news', fetcher);
  const { data: bistData } = useSWR('/api/markets/bist', fetcher);
  
  const news = newsData || [];
  const featuredNews = news.slice(0, 4);
  const filteredNews = news.filter(n => activeNewsTab === 'Tümü' || n.category === activeNewsTab.toUpperCase() || activeNewsTab === 'Borsa');

  return (
    <div className="min-h-screen bg-[#060b18] text-slate-100 font-sans selection:bg-blue-600/30">
      <Header />

      {/* --- BLOOMBERG STYLE TICKER (Ultra Fast & Smooth) --- */}
      <div className="bg-[#0c1221] border-b border-slate-800/60 py-2 overflow-hidden whitespace-nowrap sticky top-[80px] z-40 backdrop-blur-md">
        <div className="inline-flex animate-ticker whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-10 px-4 items-center">
              <TickerItem label="BIST 100" value="13.674" change="+1.02%" up={true} />
              <TickerItem label="BIST 30" value="14.820" change="+0.85%" up={true} />
              <TickerItem label="BANKA" value="17.288" change="+2.15%" up={true} />
              <TickerItem label="USD/TRY" value="44.55" change="-0.21%" up={false} />
              <TickerItem label="EUR/TRY" value="52.03" change="+0.45%" up={true} />
              <TickerItem label="ONS ALTIN" value="2.465" change="+0.12%" up={true} />
              <TickerItem label="BRENT" value="82.40" change="-0.65%" up={false} />
              <TickerItem label="BITCOIN" value="103.450" change="-1.45%" up={false} />
            </div>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* --- SECTORIAL MINI CARDS (Bloomberg HT Style) --- */}
        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-10">
          <SectorCard label="BANKA" value="17.288" change="+2.15%" up={true} />
          <SectorCard label="SANAYI" value="19.450" change="-0.45%" up={false} />
          <SectorCard label="TEKNOLOJI" value="12.120" change="+1.80%" up={true} />
          <SectorCard label="ULAŞTIRMA" value="34.560" change="+0.12%" up={true} />
          <SectorCard label="GIDA" value="8.900" change="-1.10%" up={false} />
          <SectorCard label="ENERJI" value="5.670" change="+3.25%" up={true} />
        </section>

        {/* --- MAIN HEADLINE GRID --- */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          {/* Main Headline */}
          <div className="lg:col-span-8 group cursor-pointer">
            <div className="relative h-[450px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl border border-slate-800/50">
              <img 
                src="https://images.unsplash.com/photo-1611974717483-9b939c851acb?q=80&w=1200&auto=format&fit=crop" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                alt="Main News"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060b18] via-[#060b18]/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest shadow-lg">
                    SON DAKİKA
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">12 DK ÖNCE</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 group-hover:text-blue-400 transition-colors drop-shadow-2xl">
                  {featuredNews[0]?.title || 'Küresel Piyasalarda Enflasyon Fırtınası: Gözler Verilerde'}
                </h1>
                <p className="text-slate-300 text-sm md:text-lg max-w-2xl line-clamp-2 opacity-90 font-medium">
                  Merkez bankalarının faiz kararları öncesi piyasalarda yön arayışı sürüyor. Borsa İstanbul'da rekor seviyeler test edilirken analistler teknik seviyelere dikkat çekti.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Headlines */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {featuredNews.slice(1).map((n, i) => (
              <div key={i} className="flex flex-col p-5 bg-slate-900/40 hover:bg-slate-800/40 rounded-2xl border border-slate-800/50 transition-all group cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="text-6xl grayscale">📊</span>
                </div>
                <span className="text-[9px] text-blue-500 font-black uppercase tracking-widest mb-2">{n.category || 'ANALİZ'}</span>
                <h3 className="text-sm font-bold leading-relaxed text-white group-hover:text-blue-400 transition">
                  {n.title}
                </h3>
                <div className="mt-4 flex items-center justify-between text-[9px] text-slate-500 font-mono">
                   <span>🕒 {i+2} SAAT ÖNCE</span>
                   <span className="group-hover:translate-x-1 transition-transform">DETAY →</span>
                </div>
              </div>
            ))}
            <div className="mt-auto p-6 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl shadow-xl shadow-blue-900/20 text-center">
              <h4 className="text-sm font-black text-white mb-2 uppercase tracking-wider">Borsa Terminali</h4>
              <p className="text-[10px] text-blue-100 mb-4 opacity-80 leading-relaxed">Derinlikli veriler ve anlık aracı kurum dağılımı için abone olun.</p>
              <button className="w-full py-2.5 bg-white text-blue-600 text-[11px] font-black rounded-xl hover:bg-blue-50 transition shadow-lg">PLUS'A GEÇ</button>
            </div>
          </div>
        </section>

        {/* --- MARKET DATA & NEWS FEED --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            
            {/* News Tabs (Bloomberg HT Style) */}
            <div className="flex border-b border-slate-800 mb-8 overflow-x-auto no-scrollbar">
              {['Borsa', 'Ekonomi', 'Şirket', 'Döviz', 'Kripto', 'Tümü'].map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setActiveNewsTab(tab)}
                  className={`px-6 py-3 text-[11px] font-black uppercase tracking-widest transition relative ${
                    activeNewsTab === tab ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {tab}
                  {activeNewsTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>}
                </button>
              ))}
            </div>

            <div className="space-y-10">
              {filteredNews.map((n, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-6 group cursor-pointer group">
                   <div className="md:w-56 h-36 shrink-0 rounded-2xl overflow-hidden border border-slate-800/50 shadow-lg relative">
                     <img src="https://images.unsplash.com/photo-1611974717483-9b939c851acb?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                     <span className="absolute bottom-3 left-3 bg-blue-600/80 backdrop-blur-md text-white text-[8px] font-black px-1.5 py-0.5 rounded">
                       {n.category}
                     </span>
                   </div>
                   <div className="flex-1">
                     <h3 className="text-xl font-black text-white mb-3 group-hover:text-blue-400 transition leading-tight">{n.title}</h3>
                     <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-4 font-medium">
                       {n.content}
                     </p>
                     <div className="flex items-center gap-5 text-[10px] text-slate-500 font-mono">
                       <span className="flex items-center gap-1.5">
                         <div className="w-4 h-4 rounded-full bg-slate-700 flex items-center justify-center text-[8px]">📈</div>
                         {n.source}
                       </span>
                       <span>🕒 {i + 5} SAAT ÖNCE</span>
                       <span className="ml-auto flex items-center gap-1 text-blue-500 font-black group-hover:underline">
                         İNCELE <span className="group-hover:translate-x-1 transition-transform">→</span>
                       </span>
                     </div>
                   </div>
                </div>
              ))}
              <button className="w-full py-4 bg-slate-900/50 border border-slate-800 rounded-2xl text-[11px] font-black text-slate-400 hover:text-white hover:bg-slate-800 transition">DAHA FAZLA GÖSTER</button>
            </div>
          </div>

          {/* Sidebar (Deep Bloomberg Clone) */}
          <aside className="lg:col-span-4 space-y-8">
             {/* Live Indices Table */}
             <div className="bg-slate-900/60 border border-slate-800/50 rounded-2xl overflow-hidden shadow-xl">
                <div className="p-4 bg-slate-800/30 flex items-center justify-between">
                   <h3 className="text-[10px] font-black text-white uppercase tracking-widest">Önemli Endeksler</h3>
                   <span className="text-[9px] text-emerald-400 animate-pulse">CANLI</span>
                </div>
                <div className="divide-y divide-slate-800/50">
                  <SideTableItem label="BIST 100" value="13.674" change="+1.02%" up={true} />
                  <SideTableItem label="BIST BANKA" value="17.288" change="+2.15%" up={true} />
                  <SideTableItem label="BIST TEKNO" value="12.120" change="+1.80%" up={true} />
                  <SideTableItem label="X30YVADE" value="15.105" change="+0.45%" up={true} />
                  <SideTableItem label="ABD 10 YILLIK" value="4.250" change="-0.12%" up={false} />
                </div>
             </div>

             {/* Expert Analysis Section */}
             <div className="space-y-4">
                <h3 className="text-xs font-black text-white uppercase tracking-widest border-l-4 border-blue-600 pl-3">Uzman Analizleri</h3>
                {[
                  { name: "Selva Baziki", title: "Merkez'in kararı ve TL üzerindeki etkileri", role: "Bloomberg Ekonomisti" },
                  { name: "Ali Caner", title: "Borsada 14.000 seviyesi test edilir mi?", role: "Başanalist" }
                ].map((u, i) => (
                  <div key={i} className="p-4 bg-slate-900/40 hover:bg-slate-800/40 border border-slate-800/50 rounded-2xl transition group cursor-pointer">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${i+10}`} className="w-full h-full grayscale group-hover:grayscale-0 transition" />
                      </div>
                      <div>
                        <h4 className="text-[11px] font-black text-white">{u.name}</h4>
                        <p className="text-[9px] text-slate-500 font-mono uppercase">{u.role}</p>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-slate-300 group-hover:text-blue-400 transition leading-snug">{u.title}</p>
                  </div>
                ))}
             </div>

             <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl">
                <h3 className="text-[10px] font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Ekonomik Takvim
                </h3>
                <div className="space-y-5">
                   <CalendarItem time="10:00" event="TCMB PPK Toplantı Özeti" impact="Yüksek" />
                   <CalendarItem time="14:00" event="İngiltere Faiz Kararı" impact="Orta" />
                   <CalendarItem time="15:30" event="ABD Perakende Satışlar" impact="Yüksek" />
                </div>
                <button className="w-full mt-6 text-[10px] font-bold text-blue-400 hover:underline">TAKVMİN TAMAMINI GÖR</button>
             </div>
          </aside>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 35s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

function TickerItem({ label, value, change, up }) {
  return (
    <div className="flex items-center gap-2 text-[11px] font-mono">
      <span className="text-slate-500 font-bold">{label}</span>
      <span className="text-white font-black">{value}</span>
      <span className={up === null ? 'text-slate-500' : up ? 'text-emerald-400' : 'text-red-400'}>
        {up === true ? '▲' : up === false ? '▼' : ''} {change}
      </span>
    </div>
  );
}

function SectorCard({ label, value, change, up }) {
  return (
    <div className="bg-[#0c1221] border border-slate-800/40 p-3 rounded-xl hover:border-blue-500/30 transition-all cursor-pointer group">
      <p className="text-[9px] text-slate-500 font-black uppercase tracking-tighter mb-1">{label}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-bold text-slate-200">{value}</span>
        <span className={`text-[10px] font-mono font-black ${up ? 'text-emerald-400' : 'text-red-400'}`}>
          {change}
        </span>
      </div>
      {/* Mini Sparkline Visualization (CSS only) */}
      <div className="h-1 w-full bg-slate-800 mt-2 rounded-full overflow-hidden">
        <div 
          className={`h-full ${up ? 'bg-emerald-500' : 'bg-red-500'} transition-all duration-1000`} 
          style={{ width: `${Math.random() * 40 + 60}%` }}
        ></div>
      </div>
    </div>
  );
}

function SideTableItem({ label, value, change, up }) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-slate-800/20 transition cursor-pointer">
      <span className="text-[11px] font-bold text-slate-300">{label}</span>
      <div className="text-right">
        <p className="text-xs font-mono font-bold text-white">{value}</p>
        <p className={`text-[9px] font-mono font-black ${up ? 'text-emerald-400' : 'text-red-400'}`}>{change}</p>
      </div>
    </div>
  );
}

function CalendarItem({ time, event, impact }) {
  return (
    <div className="flex items-start gap-4">
      <div className="text-[10px] font-mono text-slate-600 mt-1">{time}</div>
      <div className="flex-1">
        <p className="text-[11px] font-black text-slate-200 leading-tight mb-1">{event}</p>
        <div className="flex items-center gap-2">
           <span className={`text-[8px] font-black uppercase tracking-widest ${
             impact === 'Yüksek' ? 'text-red-400' : 'text-yellow-400'
           }`}>{impact} ÖNEM</span>
        </div>
      </div>
    </div>
  );
}
