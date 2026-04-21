'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DailyBrief from './DailyBrief';
import AdSenseBanner from './AdSenseBanner';
import FinancialChart from './FinancialChart';

const fetcher = (url) => fetch(url).then((r) => r.json());

const HABERLER_FALLBACK = [
  { kategori: 'BORSA', baslik: 'BIST 100 Endeksi Güne Pozitif Başladı', sure: '5 dk' },
  { kategori: 'EKONOMİ', baslik: 'Merkez Bankası Rezervlerinde Artış Sürüyor', sure: '12 dk' },
  { kategori: 'DÖVİZ', baslik: 'Dolar/TL 44.55 Seviyesinde Yatay Seyrediyor', sure: '25 dk' },
];

const ENDEKS_FALLBACK = [
  { sembol: 'XU100', ad: 'BIST 100', deger: '13.674', degisim: '+1.01', up: true },
  { sembol: 'XU030', ad: 'BIST 30', deger: '14.820', degisim: '+0.85', up: true },
  { sembol: 'XBANK', ad: 'BANKA', deger: '17.288', degisim: '+2.15', up: true },
];

const DOVIZ_FALLBACK = [
  { sembol: 'USD/TRY', deger: '44.5507', degisim: '-0.21', up: false },
  { sembol: 'EUR/TRY', deger: '52.0308', degisim: '+0.45', up: true },
];

const KRIPTO_FALLBACK = [
  { sembol: 'BTC/USD', ad: 'Bitcoin', deger: '103.450', degisim: '-%1.45', up: false },
  { sembol: 'ETH/USD', ad: 'Ethereum', deger: '3.840', degisim: '+%0.25', up: true },
];

function newsRelativeTime(dateStr) {
  if (!dateStr) return 'Az önce';
  const d = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
  if (d < 60) return `${d} dk`;
  return `${Math.floor(d / 60)} sa`;
}

function PiyasaRow({ sembol, ad, deger, degisim, yuzde, up, link, onClick }) {
  const router = useRouter();
  const handleClick = (e) => {
    if (onClick) {
      onClick();
    } else if (link) {
      router.push(link);
    }
  };
  return (
    <tr
      onClick={handleClick}
      className="group border-b border-white/5 hover:bg-white/5 transition-all duration-300 cursor-pointer"
    >
      <td className="px-6 py-4">
        <div className="font-mono font-black text-white text-sm tracking-tight group-hover:text-blue-400 transition-colors">{sembol}</div>
        {ad && <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{ad}</div>}
      </td>
      <td className="px-6 py-4 text-right">
        <span className="font-mono font-black text-white text-sm">{deger}</span>
      </td>
      <td className="px-6 py-4 text-right">
        <span className={`px-2 py-1 rounded-md text-[11px] font-mono font-black ${
          up ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
        }`}>
          {degisim && (up ? '▲ ' : '▼ ')}
          {degisim?.toString().replace('-', '').replace('+', '')}
          {yuzde ? ` (${yuzde})` : ''}
        </span>
      </td>
    </tr>
  );
}

function Tab({ children, aktif, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all relative shrink-0 ${
        aktif ? 'text-white' : 'text-slate-500 hover:text-slate-300'
      }`}
    >
      {children}
      {aktif && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-500 rounded-t-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
      )}
    </button>
  );
}

export default function MarketHub() {
  const [aktifSekme, setAktifSekme] = useState('endeks');
  const [saat, setSaat] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);

  const { data: newsData } = useSWR('/api/markets/news', fetcher);
  const { data: dovizData } = useSWR('/api/markets/doviz', fetcher);
  const { data: bistData } = useSWR('/api/markets/bist', fetcher);
  const { data: gainers } = useSWR('/api/markets/gainers', fetcher);
  const { data: losers } = useSWR('/api/markets/losers', fetcher);

  useEffect(() => {
    const tick = () => setSaat(new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  const newsList = Array.isArray(newsData) ? newsData : [];
  const haberler = newsList.length > 0 ? newsList.slice(0, 10).map((h) => ({
    id: h.id,
    kategori: h.category || 'BORSA',
    baslik: h.title,
    sure: newsRelativeTime(h.publishedAt),
  })) : HABERLER_FALLBACK;

  const [lastActiveIndex, setLastActiveIndex] = useState(0);
  useEffect(() => {
    if (haberler.length > 0) {
      const interval = setInterval(() => {
        setLastActiveIndex((prev) => (prev + 1) % haberler.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [haberler.length]);

  const handleAssetClick = (asset) => {
    setSelectedAsset(asset);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const bist = bistData?.bist ?? bistData;
  const endeksler = bist?.xu100 ? [
    { sembol: 'XU100', ad: 'BIST 100', deger: bist.xu100.value?.toFixed(0), degisim: bist.xu100.change?.toFixed(2), yuzde: `${bist.xu100.changePercent?.toFixed(2)}%`, up: bist.xu100.changePercent >= 0 },
    { sembol: 'XU030', ad: 'BIST 30', deger: bist.xu030.value?.toFixed(0), degisim: bist.xu030.change?.toFixed(2), yuzde: `${bist.xu030.changePercent?.toFixed(2)}%`, up: bist.xu030.changePercent >= 0 },
    { sembol: 'XBANK', ad: 'BANKA', deger: bist.xbank.value?.toFixed(0), degisim: bist.xbank.change?.toFixed(2), yuzde: `${bist.xbank.changePercent?.toFixed(2)}%`, up: bist.xbank.changePercent >= 0 },
  ] : ENDEKS_FALLBACK;

  const dovizler = dovizData ? Object.values(dovizData).map(d => ({
    sembol: d.symbol,
    deger: typeof d.value === 'number' ? d.value.toFixed(4) : d.value,
    degisim: d.changePercent?.toFixed(2) + '%',
    up: (d.changePercent || 0) >= 0
  })) : DOVIZ_FALLBACK;

  const yukselenler = (Array.isArray(gainers) ? gainers : []).slice(0, 5);
  const dusenler = (Array.isArray(losers) ? losers : []).slice(0, 5);

  return (
    <div className="bg-[#020617] text-white selection:bg-blue-600/30">
      {/* --- LIVE STATUS BAR --- */}
      <div className="bg-slate-950/40 border-b border-white/5 px-4 py-3 backdrop-blur-xl sticky top-[80px] z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Live Terminal</span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-[10px] font-mono text-slate-500">
              {dovizler.slice(0, 3).map(d => (
                <span key={d.sembol} className="flex gap-1">
                  {d.sembol} <span className="text-white">{d.deger}</span>
                  <span className={d.up ? 'text-emerald-400' : 'text-red-400'}>{d.up ? '▲' : '▼'}{d.degisim}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-xs font-mono font-black text-blue-500">{saat}</span>
             <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
             <span className="text-[10px] text-slate-500 font-bold hidden sm:block uppercase">BIST 100: <span className="text-white">13.674</span></span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
        <div className="grid lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-8">
            
            {/* --- PREMIUM ANALYSIS PANEL --- */}
            {selectedAsset && (
              <div className="bg-[#0f172a]/40 backdrop-blur-3xl border border-blue-500/30 rounded-[32px] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-6 duration-700">
                <div className="p-8 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-blue-600/10 to-transparent">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center text-3xl shadow-xl">
                      {aktifSekme === 'endeks' ? '🏛️' : aktifSekme === 'doviz' ? '💱' : '₿'}
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-white tracking-tighter">{selectedAsset.sembol || selectedAsset.symbol}</h2>
                      <p className="text-[11px] text-blue-400 font-black uppercase tracking-[0.2em]">{selectedAsset.ad || 'Piyasa Enstrümanı'}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedAsset(null)}
                    className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all duration-300 border border-white/10 text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="p-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                    <MetricItem label="Son Fiyat" value={selectedAsset.deger} />
                    <MetricItem label="Değişim" value={selectedAsset.degisim || selectedAsset.yuzde} up={selectedAsset.up} isChange />
                    <MetricItem label="Günlük Fark" value={selectedAsset.degisim || '+12.50'} up={selectedAsset.up} />
                    <MetricItem label="Hacim" value="2.4B TL" />
                  </div>

                  <div className="rounded-3xl overflow-hidden border border-white/5 bg-slate-950/50 p-2 shadow-inner">
                    <FinancialChart symbol={selectedAsset.sembol} />
                  </div>

                  <div className="mt-10 flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[250px] bg-white/5 p-6 rounded-2xl border border-white/5 backdrop-blur-md">
                      <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-3">Yapay Zeka Analiz Özeti</h4>
                      <p className="text-sm text-slate-300 leading-relaxed font-medium">
                        Varlık şu an güçlü bir destek bölgesinde bulunuyor. RSI {selectedAsset.up ? '64 (Güçlü)' : '38 (Zayıf)'} seviyesinde. 
                        Kısa vadeli hedef: <span className="text-white font-black">{(selectedAsset.deger * 1.08).toFixed(2)}</span> seviyeleri takip edilmeli.
                      </p>
                    </div>
                    <div className="w-full md:w-72 flex flex-col gap-3">
                      <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-2xl font-black text-xs transition-all shadow-xl shadow-blue-600/20 uppercase tracking-widest">
                        DERİNLİK ANALİZİ
                      </button>
                      <Link 
                        href={`/assets/${(selectedAsset.sembol || selectedAsset.symbol).toLowerCase().replace('/', '-')}`}
                        className="w-full py-4 bg-white/5 hover:bg-white/10 text-white text-center rounded-2xl font-black text-xs transition-all border border-white/10 uppercase tracking-widest"
                      >
                        DETAYLI ANALİZ TERMİNALİ
                      </Link>
                      <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-slate-500 hover:text-white text-center rounded-2xl font-black text-[9px] transition-all border border-white/5 uppercase tracking-widest">
                        ALARM KUR
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- MAIN MARKET TABS (Bento Style) --- */}
            <div className="bg-[#0f172a]/40 backdrop-blur-2xl border border-white/5 rounded-[32px] overflow-hidden shadow-2xl">
              <div className="flex border-b border-white/5 px-2 overflow-x-auto no-scrollbar scroll-smooth">
                <Tab aktif={aktifSekme === 'endeks'} onClick={() => setAktifSekme('endeks')}>Endeksler</Tab>
                <Tab aktif={aktifSekme === 'doviz'} onClick={() => setAktifSekme('doviz')}>Döviz</Tab>
                <Tab aktif={aktifSekme === 'kripto'} onClick={() => setAktifSekme('kripto')}>Kripto</Tab>
                <Tab aktif={aktifSekme === 'hareketler'} onClick={() => setAktifSekme('hareketler')}>En Hareketliler</Tab>
              </div>

              <div className="p-2 overflow-hidden">
                {aktifSekme === 'endeks' && (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">
                          <th className="px-6 py-4 text-left">Enstrüman</th>
                          <th className="px-6 py-4 text-right">Son Fiyat</th>
                          <th className="px-6 py-4 text-right">Performans</th>
                        </tr>
                      </thead>
                      <tbody>
                        {endeksler.map((e, i) => (
                          <PiyasaRow key={i} {...e} onClick={() => handleAssetClick(e)} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {aktifSekme === 'doviz' && (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">
                          <th className="px-6 py-4 text-left">Parite</th>
                          <th className="px-6 py-4 text-right">Kur</th>
                          <th className="px-6 py-4 text-right">Değişim</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dovizler.map((d, i) => (
                          <PiyasaRow key={i} {...d} onClick={() => handleAssetClick(d)} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {aktifSekme === 'kripto' && (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">
                          <th className="px-6 py-4 text-left">Varlık</th>
                          <th className="px-6 py-4 text-right">Fiyat (USD)</th>
                          <th className="px-6 py-4 text-right">24s %</th>
                        </tr>
                      </thead>
                      <tbody>
                        {KRIPTO_FALLBACK.map((k, i) => (
                          <PiyasaRow key={i} {...k} onClick={() => handleAssetClick(k)} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {aktifSekme === 'hareketler' && (
                  <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5">
                    <div>
                      <div className="px-6 py-4 bg-emerald-500/5 flex items-center gap-2 border-b border-white/5">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        <span className="text-[11px] font-black text-emerald-400 uppercase tracking-widest">En Çok Yükselenler</span>
                      </div>
                      <table className="w-full">
                        <tbody>
                          {yukselenler.map((s, i) => (
                            <PiyasaRow 
                              key={i} 
                              sembol={s.symbol || s.sembol} 
                              ad={s.name || s.ad}
                              deger={s.last_price || s.deger || s.value}
                              degisim={s.change_percent || s.degisim || s.yuzde}
                              up={true} 
                              onClick={() => handleAssetClick({
                                sembol: s.symbol || s.sembol,
                                ad: s.name || s.ad,
                                deger: s.last_price || s.deger || s.value,
                                degisim: s.change_percent || s.degisim || s.yuzde,
                                up: true
                              })} 
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <div className="px-6 py-4 bg-red-500/5 flex items-center gap-2 border-b border-white/5">
                        <span className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                        <span className="text-[11px] font-black text-red-400 uppercase tracking-widest">En Çok Düşenler</span>
                      </div>
                      <table className="w-full">
                        <tbody>
                          {dusenler.map((s, i) => (
                            <PiyasaRow 
                              key={i} 
                              sembol={s.symbol || s.sembol} 
                              ad={s.name || s.ad}
                              deger={s.last_price || s.deger || s.value}
                              degisim={s.change_percent || s.degisim || s.yuzde}
                              up={false} 
                              onClick={() => handleAssetClick({
                                sembol: s.symbol || s.sembol,
                                ad: s.name || s.ad,
                                deger: s.last_price || s.deger || s.value,
                                degisim: s.change_percent || s.degisim || s.yuzde,
                                up: false
                              })} 
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <AdSenseBanner slot="in-content-1" label="Reklam" />
          </div>

          {/* SIDEBAR (Right Column) */}
          <aside className="lg:col-span-4 space-y-8">
            <DailyBrief />
            
            {/* --- PREMIUM NEWS WIDGET --- */}
            <div className="bg-[#0f172a]/40 backdrop-blur-2xl border border-white/5 rounded-[32px] overflow-hidden shadow-2xl p-6">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs font-black text-white uppercase tracking-widest border-l-4 border-blue-600 pl-4">Haber Terminali</h3>
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">LIVE STREAM</span>
              </div>
              <div className="space-y-6">
                {haberler.slice(0, 5).map((h, i) => (
                  <Link key={i} href={`/news/${h.id || i}`} className="group block">
                    <div className="flex items-start gap-4">
                      <span className="text-[10px] font-mono text-blue-500 font-black pt-1">{h.sure}</span>
                      <div>
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter block mb-1 group-hover:text-blue-400 transition-colors">{h.kategori}</span>
                        <h4 className="text-sm font-bold text-slate-100 leading-snug group-hover:text-blue-300 transition-colors line-clamp-2">
                          {h.baslik}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/blog" className="block text-center mt-10 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black text-blue-400 uppercase tracking-widest transition-all">
                TÜM ANALİZLERİ GÖR →
              </Link>
            </div>

            <AdSenseBanner slot="sidebar-bottom" format="rectangle" label="Reklam" />
          </aside>
        </div>
      </div>
    </div>
  );
}

function MetricItem({ label, value, up, isChange }) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">{label}</p>
      <p className={`text-2xl font-mono font-black tracking-tighter ${
        isChange ? (up ? 'text-emerald-400' : 'text-red-400') : 'text-white'
      }`}>
        {isChange && (up ? '+' : '-')}
        {value}
      </p>
    </div>
  );
}
