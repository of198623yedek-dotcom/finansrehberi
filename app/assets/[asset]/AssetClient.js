'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function AssetClient({ assetMeta, assetSlug }) {
  const chartContainerRef = useRef(null);
  const chartInstance = useRef(null);

  // Veri Çekme
  const { data: marketData, error, isLoading } = useSWR(
    assetMeta?.apiEndpoint || '/api/markets/all', 
    fetcher,
    { refreshInterval: 30000 }
  );

  const assetData = marketData ? (
    marketData[assetMeta?.dataKey] || 
    marketData[assetSlug] || 
    marketData[assetSlug.toUpperCase()] || 
    marketData[assetSlug.replace('-', '/').toUpperCase()] ||
    Object.values(marketData).find(v => v?.symbol === assetMeta?.symbol)
  ) : null;

  // Grafik Oluşturma (Sadece tarayıcıda çalışır)
  useEffect(() => {
    if (typeof window === 'undefined' || !chartContainerRef.current || !assetData) return;

    let chart;
    import('lightweight-charts').then(({ createChart, ColorType }) => {
      if (!chartContainerRef.current) return;

      chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: 'transparent' },
          textColor: '#94a3b8',
          fontFamily: 'Inter, sans-serif',
        },
        grid: {
          vertLines: { color: 'rgba(255, 255, 255, 0.05)' },
          horzLines: { color: 'rgba(255, 255, 255, 0.05)' },
        },
        width: chartContainerRef.current.clientWidth,
        height: 400,
      });

      const lineSeries = chart.addAreaSeries({
        lineColor: '#3b82f6',
        topColor: 'rgba(59, 130, 246, 0.2)',
        bottomColor: 'rgba(59, 130, 246, 0.0)',
        lineWidth: 2,
      });

      const mockHistory = Array.from({ length: 50 }, (_, i) => ({
        time: Math.floor(Date.now() / 1000) - (50 - i) * 3600,
        value: (typeof assetData.value === 'number' ? assetData.value : 100) * (0.98 + Math.random() * 0.04),
      }));

      lineSeries.setData(mockHistory);
      chart.timeScale().fitContent();
      chartInstance.current = chart;
    });

    const handleResize = () => {
      if (chartInstance.current && chartContainerRef.current) {
        chartInstance.current.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (chart) chart.remove();
    };
  }, [assetData]);

  if (!assetMeta) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-['Inter',sans-serif]">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12 pt-32">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="bg-blue-600/10 text-blue-400 border border-blue-500/20 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em]">
                {assetMeta.category}
              </span>
              <span className="flex items-center gap-2 text-[9px] font-black text-emerald-400 uppercase tracking-[0.2em]">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                CANLI TERMİNAL
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">{assetMeta.name}</h1>
            <p className="text-slate-600 font-mono text-2xl font-bold tracking-widest">{assetMeta.symbol}</p>
          </div>

          <div className="flex flex-col items-end">
            <div className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-4">
              {isLoading ? '---' : assetData?.value?.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
            </div>
            <div className={`text-2xl font-black flex items-center gap-3 ${assetData?.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest mr-2">GÜNLÜK:</span>
              {assetData?.changePercent >= 0 ? '▲' : '▼'} 
              %{Math.abs(assetData?.changePercent || 0).toFixed(2)}
            </div>
          </div>
        </div>

        {/* --- CONTENT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-slate-950/40 backdrop-blur-3xl border border-white/5 rounded-[40px] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
              <div className="flex items-center justify-between mb-10 relative z-10">
                <h3 className="text-[11px] font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
                  <span className="w-8 h-px bg-blue-600"></span> Fiyat Analizi
                </h3>
              </div>
              <div ref={chartContainerRef} className="w-full h-[400px] relative z-10" />
            </div>

            <div className="bg-white/5 border border-white/5 rounded-[40px] p-10 md:p-12">
              <h3 className="text-2xl font-black text-white mb-8 tracking-tighter uppercase">Varlık Analiz Özeti</h3>
              <p className="text-slate-400 text-base leading-relaxed font-medium mb-10">
                {assetMeta.description}
              </p>
              <div className="text-slate-600 text-sm leading-relaxed italic border-t border-white/5 pt-10">
                {assetMeta.longDescription || 'Varlık hakkında detaylı teknik analiz raporu hazırlanıyor...'}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-950/40 backdrop-blur-3xl border border-white/5 rounded-[40px] p-10 shadow-2xl">
              <h3 className="text-[11px] font-black text-white uppercase tracking-[0.3em] mb-10">Piyasa Verileri</h3>
              <div className="space-y-4">
                <StatRow label="GÜN DÜŞÜK" value={assetData?.low || '---'} />
                <StatRow label="GÜN YÜKSEK" value={assetData?.high || '---'} />
                <StatRow label="HACİM" value={assetData?.volume ? `${(assetData.volume / 1e6).toFixed(1)}M` : '---'} />
                <StatRow label="P. DEĞERİ" value={assetData?.market_cap ? `${(assetData.market_cap / 1e9).toFixed(1)}B` : '---'} />
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
    <div className="flex justify-between items-end py-4 border-b border-white/5 last:border-0">
      <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest pb-1">{label}</span>
      <span className="text-base font-black text-white tracking-tighter">{value}</span>
    </div>
  );
}
