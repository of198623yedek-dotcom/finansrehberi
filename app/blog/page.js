'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdSenseBanner from '../components/AdSenseBanner';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function BloombergBorsaCloneV3() {
  const [activeNewsTab, setActiveNewsTab] = useState('Borsa');
  const [mounted, setMounted] = useState(false);
  const { data: newsData } = useSWR('/api/markets/news', fetcher);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const news = newsData || [];
  const featuredNews = news.slice(0, 4);
  const filteredNews = news.filter(n => activeNewsTab === 'Tümü' || n.category === activeNewsTab.toUpperCase() || activeNewsTab === 'Borsa');

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-['Inter',sans-serif] selection:bg-blue-600/30 selection:text-white">
      <Header />

      {/* --- PREMIUM TICKER (Glassmorphism & Glow) --- */}
      <div className="bg-slate-950/40 backdrop-blur-xl border-b border-white/5 py-3 overflow-hidden whitespace-nowrap sticky top-[80px] z-40">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-purple-600/5 pointer-events-none"></div>
        <div className="inline-flex animate-ticker whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-12 px-6 items-center">
              <TickerItem label="BIST 100" value="13.674" change="+1.02%" up={true} />
              <TickerItem label="BIST BANKA" value="17.288" change="+2.15%" up={true} />
              <TickerItem label="USD/TRY" value="44.55" change="-0.21%" up={false} />
              <TickerItem label="ALTIN/ONS" value="2.465" change="+0.12%" up={true} />
              <TickerItem label="EUR/USD" value="1.085" change="-0.15%" up={false} />
              <TickerItem label="BITCOIN" value="103.450" change="-1.45%" up={false} />
              <TickerItem label="BRENT" value="82.40" change="-0.65%" up={false} />
            </div>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-10">
        
        {/* --- PREMIUM SECTOR GRID (Bento Style) --- */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-14">
          <SectorCard label="BANKA" value="17.288" change="+2.15%" up={true} glow="blue" />
          <SectorCard label="TEKNOLOJI" value="12.120" change="+1.80%" up={true} glow="purple" />
          <SectorCard label="ENERJI" value="5.670" change="+3.25%" up={true} glow="emerald" />
          <SectorCard label="ULAŞTIRMA" value="34.560" change="+0.12%" up={true} glow="blue" />
          <SectorCard label="SANAYI" value="19.450" change="-0.45%" up={false} glow="red" />
          <SectorCard label="GIDA" value="8.900" change="-1.10%" up={false} glow="red" />
        </section>

        {/* --- HERO SECTION (Bloomberg Elite Layout) --- */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Main Massive Headline */}
          <div className="lg:col-span-8 group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-[32px] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative h-[500px] md:h-[600px] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
              <img 
                src="https://images.unsplash.com/photo-1611974717483-9b939c851acb?q=80&w=1200&auto=format&fit=crop" 
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
                alt="Main News"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                <div className="flex items-center gap-4 mb-6">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.3em] bg-red-600 px-3 py-1 rounded-full shadow-lg shadow-red-600/30">
                    FLAŞ HABER
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-6 group-hover:text-blue-400 transition-colors duration-500">
                  {featuredNews[0]?.title || 'Piyasalarda Yeni Dönem: Faiz Kararları Dengeleri Değiştiriyor'}
                </h1>
                <p className="text-slate-300 text-base md:text-xl max-w-3xl line-clamp-2 opacity-80 font-medium leading-relaxed">
                  Küresel piyasalar enflasyon verilerinin ardından yeni bir rotaya giriyor. Borsa İstanbul'da likidite artışı ile birlikte teknoloji hisselerine olan ilgi yoğunlaşıyor.
                </p>
              </div>
            </div>
          </div>

          {/* Side Premium Headlines */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            {featuredNews.slice(1).map((n, i) => (
              <Link key={i} href={`/news/${n.id}`} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-2xl blur-md transition duration-500"></div>
                <div className="relative p-6 bg-slate-900/40 hover:bg-slate-800/40 border border-white/5 hover:border-white/10 rounded-2xl transition-all duration-500 backdrop-blur-sm overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <span className="text-7xl font-black italic">0{i+2}</span>
                  </div>
                  <span className="text-[10px] text-blue-500 font-black uppercase tracking-widest mb-3 block">{n.category || 'ANALİZ'}</span>
                  <h3 className="text-base font-extrabold leading-snug text-white group-hover:text-blue-400 transition-colors">
                    {n.title}
                  </h3>
                  <div className="mt-5 flex items-center gap-3 text-[10px] text-slate-500 font-mono">
                     <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                     <span>SON GÜNCELLEME: {i+5} DK ÖNCE</span>
                  </div>
                </div>
              </Link>
            ))}
            <div className="mt-auto p-8 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl shadow-2xl shadow-blue-900/40 relative overflow-hidden group/card">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover/card:scale-150 transition duration-1000"></div>
              <h4 className="text-lg font-black text-white mb-3 uppercase tracking-tighter relative z-10">PRO TERMINAL</h4>
              <p className="text-xs text-blue-100 mb-6 opacity-90 leading-relaxed relative z-10">Anlık derinlik, aracı kurum dağılımı ve yapay zeka destekli teknik analiz sinyalleri.</p>
              <button className="w-full py-3.5 bg-white text-blue-700 text-xs font-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl relative z-10">
                ÜCRETSİZ DENEMEYE BAŞLA
              </button>
            </div>
          </div>
        </section>

        {/* --- MAIN CONTENT GRID (Terminal Style) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            
            {/* Premium Category Navigation */}
            <div className="flex border-b border-white/5 mb-10 overflow-x-auto no-scrollbar scroll-smooth">
              {['Borsa', 'Ekonomi', 'Şirket', 'Döviz', 'Kripto', 'Tümü'].map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setActiveNewsTab(tab)}
                  className={`px-8 py-4 text-xs font-black uppercase tracking-[0.2em] transition-all relative shrink-0 ${
                    activeNewsTab === tab ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {tab}
                  {activeNewsTab === tab && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-500 rounded-t-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
                  )}
                </button>
              ))}
            </div>

            <div className="space-y-12">
              {filteredNews.map((n, i) => (
                <Link key={i} href={`/news/${n.id}`} className="flex flex-col md:flex-row gap-8 group">
                   <div className="md:w-64 h-44 shrink-0 rounded-[24px] overflow-hidden border border-white/5 shadow-2xl relative">
                     <img 
                      src="https://images.unsplash.com/photo-1611974717483-9b939c851acb?q=80&w=400&auto=format&fit=crop" 
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out" 
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60"></div>
                     <span className="absolute top-4 left-4 bg-white/10 backdrop-blur-md border border-white/10 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                       {n.category}
                     </span>
                   </div>
                   <div className="flex-1 flex flex-col justify-center">
                     <h3 className="text-2xl font-black text-white mb-4 group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                       {n.title}
                     </h3>
                     <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 mb-6 font-medium">
                       {n.content}
                     </p>
                     <div className="flex items-center gap-6 text-[10px] text-slate-500 font-mono">
                       <span className="flex items-center gap-2 text-blue-400/80">
                         <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                         {n.source}
                       </span>
                       <span className="flex items-center gap-2">
                         <span className="opacity-50">BY</span> FINANSREHBERI
                       </span>
                       <span className="ml-auto flex items-center gap-2 text-white font-black group-hover:text-blue-400 transition-colors">
                         OKU <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                       </span>
                     </div>
                   </div>
                </Link>
              ))}
              <button className="w-full py-5 bg-slate-900/30 border border-white/5 rounded-2xl text-[11px] font-black text-slate-500 hover:text-white hover:bg-slate-800/40 transition-all duration-300 tracking-[0.3em] uppercase">
                DAHA FAZLA ANALİZ YÜKLE
              </button>
            </div>
          </div>

          {/* SIDEBAR (Professional Hub) */}
          <aside className="lg:col-span-4 space-y-10">
             {/* Dynamic Market Hub */}
             <div className="bg-[#0f172a]/40 backdrop-blur-md border border-white/5 rounded-[32px] overflow-hidden shadow-2xl">
                <div className="p-6 bg-white/5 flex items-center justify-between border-b border-white/5">
                   <h3 className="text-xs font-black text-white uppercase tracking-widest">Piyasa Terminali</h3>
                   <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                      <span className="text-[10px] text-emerald-400 font-bold font-mono uppercase tracking-tighter">CONNECTED</span>
                   </div>
                </div>
                <div className="p-2 divide-y divide-white/5">
                  <SideTableItem label="BIST 100" value="13.674" change="+1.02%" up={true} />
                  <SideTableItem label="BIST BANKA" value="17.288" change="+2.15%" up={true} />
                  <SideTableItem label="BIST TEKNOLOJI" value="12.120" change="+1.80%" up={true} />
                  <SideTableItem label="USD/TRY" value="44.550" change="-0.21%" up={false} />
                  <SideTableItem label="GRAM ALTIN" value="6.756" change="+0.12%" up={true} />
                  <SideTableItem label="S&P 500" value="6.120" change="+0.45%" up={true} />
                </div>
                <Link href="/market" className="block text-center py-4 text-[10px] font-black text-blue-400 hover:text-white transition-colors bg-white/5 uppercase tracking-widest">
                  TÜM VERİLERİ AÇ →
                </Link>
             </div>

             {/* Expert Grid */}
             <div className="space-y-6">
                <h3 className="text-xs font-black text-white uppercase tracking-widest border-l-4 border-blue-600 pl-4">Uzman Analizleri</h3>
                {[
                  { name: "Selva Baziki", title: "Enflasyon ve Kur Beklentileri", role: "Bloomberg Ekonomisti", img: "1" },
                  { name: "Gökhan Şen", title: "Global Piyasalarda Yön Neresi?", role: "Başekonomist", img: "2" },
                  { name: "Aysun Karayel", title: "Hisse Senedi Piyasasında Fırsatlar", role: "Yatırım Danışmanı", img: "3" }
                ].map((u, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-11 h-11 rounded-2xl bg-slate-800 border border-white/10 overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-500">
                        <img src={`https://i.pravatar.cc/100?u=${u.img}`} className="w-full h-full grayscale group-hover:grayscale-0 transition duration-500" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-white uppercase tracking-tight">{u.name}</h4>
                        <p className="text-[9px] text-blue-500/70 font-mono uppercase font-bold">{u.role}</p>
                      </div>
                    </div>
                    <p className="text-sm font-extrabold text-slate-300 group-hover:text-blue-400 transition-colors leading-snug pl-15">
                      "{u.title}"
                    </p>
                  </div>
                ))}
             </div>

             {/* Economic Calendar (Minimalist) */}
             <div className="p-8 bg-slate-900/60 border border-white/5 rounded-[32px] shadow-2xl">
                <h3 className="text-xs font-black text-white uppercase tracking-widest mb-8 flex items-center justify-between">
                  <span>Ekonomik Takvim</span>
                  <span className="text-[10px] text-slate-500">BUGÜN</span>
                </h3>
                <div className="space-y-6">
                   <CalendarItem time="10:00" event="TCMB Faiz Kararı Özeti" impact="Yüksek" />
                   <CalendarItem time="14:30" event="ABD İşsizlik Başvuruları" impact="Orta" />
                   <CalendarItem time="15:30" event="ABD Cari İşlemler Dengesi" impact="Yüksek" />
                   <CalendarItem time="16:00" event="Avrupa TÜFE Verisi" impact="Yüksek" />
                </div>
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
    <div className="flex items-center gap-3 text-[11px] font-mono">
      <span className="text-slate-500 font-black tracking-tighter uppercase">{label}</span>
      <span className="text-white font-black tracking-tight">{value}</span>
      <span className={`font-black flex items-center gap-1 ${up === null ? 'text-slate-500' : up ? 'text-emerald-400' : 'text-red-400'}`}>
        {up === true ? '▲' : up === false ? '▼' : ''} {change}
      </span>
    </div>
  );
}

function SectorCard({ label, value, change, up, glow }) {
  const glowColors = {
    blue: 'group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]',
    purple: 'group-hover:border-purple-500/50 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]',
    emerald: 'group-hover:border-emerald-500/50 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]',
    red: 'group-hover:border-red-500/50 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]'
  };

  return (
    <div className={`bg-[#0f172a]/40 backdrop-blur-md border border-white/5 p-4 rounded-2xl transition-all duration-500 cursor-pointer group ${glowColors[glow]}`}>
      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">{label}</p>
      <div className="flex items-end justify-between">
        <span className="text-sm font-mono font-black text-white">{value}</span>
        <span className={`text-[10px] font-mono font-black ${up ? 'text-emerald-400' : 'text-red-400'}`}>
          {change}
        </span>
      </div>
      <div className="h-1 w-full bg-white/5 mt-3 rounded-full overflow-hidden">
        <div 
          className={`h-full ${up ? 'bg-emerald-500' : 'bg-red-500'} transition-all duration-[1500ms] ease-out group-hover:brightness-125`} 
          style={{ width: `${Math.random() * 40 + 60}%` }}
        ></div>
      </div>
    </div>
  );
}

function SideTableItem({ label, value, change, up }) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors duration-300 cursor-pointer group">
      <span className="text-[11px] font-black text-slate-300 uppercase tracking-tighter group-hover:text-white transition-colors">{label}</span>
      <div className="text-right">
        <p className="text-sm font-mono font-black text-white tracking-tight">{value}</p>
        <p className={`text-[10px] font-mono font-black ${up ? 'text-emerald-400' : 'text-red-400'}`}>{change}</p>
      </div>
    </div>
  );
}

function CalendarItem({ time, event, impact }) {
  const impactColors = {
    'Yüksek': 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]',
    'Orta': 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.4)]',
    'Düşük': 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.4)]'
  };

  return (
    <div className="flex items-start gap-5 group cursor-default">
      <div className="text-[11px] font-mono font-bold text-slate-500 mt-1">{time}</div>
      <div className="flex-1">
        <p className="text-xs font-black text-slate-200 leading-snug mb-2 group-hover:text-blue-400 transition-colors">{event}</p>
        <div className="flex items-center gap-2">
           <span className={`w-1.5 h-1.5 rounded-full ${impactColors[impact]}`}></span>
           <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{impact} ÖNEM</span>
        </div>
      </div>
    </div>
  );
}
