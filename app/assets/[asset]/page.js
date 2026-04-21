'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getAssetBySlug } from '@/lib/assets-data';
import { createChart, ColorType } from 'lightweight-charts';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function AssetDetail({ params }) {
  const assetSlug = params.asset;
  const assetMeta = getAssetBySlug(assetSlug);
  const [chartContainer, setChartContainer] = useState(null);

  // Veri Çekme (Genel piyasa verisi üzerinden ilgili asset'i ayıklayacağız)
  const { data: marketData, error, isLoading } = useSWR(
    assetMeta?.apiEndpoint || '/api/markets/all', 
    fetcher,
    { refreshInterval: 30000 }
  );

  // Asset verisini ayıkla
  const assetData = marketData ? (marketData[assetMeta?.dataKey] || marketData[assetSlug]) : null;

  // Grafik Oluşturma
  useEffect(() => {
    if (!chartContainer || !assetData) return;

    const chart = createChart(chartContainer, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#94a3b8',
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.05)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.05)' },
      },
      width: chartContainer.clientWidth,
      height: 400,
    });

    const lineSeries = chart.addAreaSeries({
      lineColor: '#3b82f6',
      topColor: 'rgba(59, 130, 246, 0.2)',
      bottomColor: 'rgba(59, 130, 246, 0.0)',
      lineWidth: 2,
    });

    // Mock geçmiş veri (Gerçek API'nizde varsa onu kullanın)
    const mockHistory = Array.from({ length: 50 }, (_, i) => ({
      time: Math.floor(Date.now() / 1000) - (50 - i) * 3600,
      value: (assetData?.value || 100) * (0.95 + Math.random() * 0.1),
    }));

    lineSeries.setData(mockHistory);
    chart.timeScale().fitContent();

    const handleResize = () => chart.applyOptions({ width: chartContainer.clientWidth });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [chartContainer, assetData]);

  if (!assetMeta) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col">
        <Header />
        <div className="flex-1 flex flex-center justify-center items-center p-10">
          <div className="text-center">
            <h1 className="text-4xl font-black text-white mb-4">VARLIK BULUNAMADI</h1>
            <p className="text-slate-400 mb-8 font-bold">Aradığınız {assetSlug} tanımlı varlık terminal kayıtlarında mevcut değil.</p>
            <Link href="/market" className="bg-blue-600 px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest text-white shadow-xl shadow-blue-600/20">TERMİNAL'E DÖN</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-['Inter',sans-serif]">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12 pt-28">
        
        {/* --- ASSET HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                {assetMeta.category} Terminali
              </span>
              <span className="flex items-center gap-1.5 text-[9px] font-black text-emerald-400 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                CANLI VERİ
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2">{assetMeta.name}</h1>
            <p className="text-slate-500 font-mono text-xl font-bold">{assetMeta.symbol}</p>
          </div>

          <div className="flex flex-col items-end">
            <div className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2">
              {isLoading ? '---' : assetData?.value?.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
            </div>
            <div className={`text-xl font-black flex items-center gap-2 ${assetData?.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {assetData?.changePercent >= 0 ? '▲' : '▼'} 
              %{Math.abs(assetData?.changePercent || 0).toFixed(2)}
              <span className="text-xs text-slate-500 uppercase tracking-widest ml-2">BUGÜN</span>
            </div>
          </div>
        </div>

        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Chart Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-950/40 backdrop-blur-2xl border border-white/5 rounded-[32px] p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Fiyat Analiz Grafiği</h3>
                <div className="flex gap-2">
                  {['1S', '1G', '1H', '1A'].map(t => (
                    <button key={t} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black text-slate-400 hover:text-white hover:bg-blue-600 transition-all">{t}</button>
                  ))}
                </div>
              </div>
              <div ref={setChartContainer} className="w-full h-[400px]" />
            </div>

            {/* Description Bento */}
            <div className="bg-white/5 border border-white/5 rounded-[32px] p-10">
              <h3 className="text-xl font-black text-white mb-6 uppercase tracking-widest border-l-4 border-blue-600 pl-6">Varlık Hakkında</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-medium mb-8">
                {assetMeta.description}
              </p>
              <div className="prose prose-invert prose-sm max-w-none text-slate-500 italic">
                {assetMeta.longDescription}
              </div>
            </div>
          </div>

          {/* Sidebar Section */}
          <div className="space-y-8">
            {/* Stats Table */}
            <div className="bg-slate-950/40 backdrop-blur-2xl border border-white/5 rounded-[32px] p-8 shadow-2xl">
              <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-8">Teknik Detaylar</h3>
              <div className="space-y-6">
                <StatRow label="Günlük En Düşük" value={assetData?.low || '---'} />
                <StatRow label="Günlük En Yüksek" value={assetData?.high || '---'} />
                <StatRow label="Hacim (24S)" value={assetData?.volume || '---'} />
                <StatRow label="Pazar Değeri" value={assetData?.market_cap ? `${(assetData.market_cap / 1e9).toFixed(1)}B USD` : '---'} />
                <StatRow label="F/K Oranı" value={assetData?.pe_ratio || 'N/A'} />
              </div>
            </div>

            {/* Related News */}
            <div className="bg-white/5 rounded-[32px] p-8 border border-white/5">
              <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-6">İlgili Haberler</h3>
              <div className="space-y-6">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="group cursor-pointer">
                      <div className="text-[10px] text-blue-500 font-black mb-1">ANALİZ • 2S ÖNCE</div>
                      <p className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors leading-relaxed">
                        {assetMeta.name} için kritik seviyeler: Analistler ne bekliyor?
                      </p>
                   </div>
                 ))}
              </div>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}

function StatRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-4 border-b border-white/5 last:border-0">
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
      <span className="text-sm font-black text-white tracking-tighter">{value}</span>
    </div>
  );
}
