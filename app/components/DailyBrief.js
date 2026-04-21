'use client';

import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url) => fetch(url).then((r) => (r.ok ? r.json() : null));

/** Günlük piyasa özeti — Modernize edilmiş ve zenginleştirilmiş sürüm */
export default function DailyBrief() {
  const date = new Date().toLocaleDateString('tr-TR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const { data: dovizData } = useSWR('/api/markets/doviz', fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 300000,
  });

  const { data: bistData } = useSWR('/api/markets/bist', fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 300000,
  });

  const { data: altinData } = useSWR('/api/markets/altin', fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 300000,
  });

  // Dolar kuru
  const usdRaw = dovizData?.['USD/TRY'] ?? dovizData?.USDTRY ?? dovizData?.usd_try;
  const dolarDeger = usdRaw?.value ? parseFloat(usdRaw.value).toFixed(2) : '44.50';
  const dolarDegisim = usdRaw?.changePercent
    ? `${usdRaw.changePercent >= 0 ? '+' : ''}${usdRaw.changePercent.toFixed(2)}%`
    : '-0.52%';
  const dolarUp = usdRaw?.changePercent != null ? usdRaw.changePercent >= 0 : false;

  // BIST 100
  const bist = bistData?.bist ?? bistData;
  const bistDeger = bist?.xu100?.value ? parseFloat(bist.xu100.value).toFixed(0) : '13.674';
  const bistDegisim = bist?.xu100?.changePercent
    ? `${bist.xu100.changePercent >= 0 ? '+' : ''}${bist.xu100.changePercent.toFixed(2)}%`
    : '+1.01%';
  const bistUp = bist?.xu100?.changePercent != null ? bist.xu100.changePercent >= 0 : true;

  // Altın
  const altinRaw = altinData?.gold_gram ?? altinData?.['GRAM/ALTIN'];
  const altinDeger = altinRaw?.value ? parseFloat(altinRaw.value).toFixed(0) : '6.756';
  const altinDegisim = altinRaw?.changePercent
    ? `${altinRaw.changePercent >= 0 ? '+' : ''}${altinRaw.changePercent.toFixed(2)}%`
    : '+0.45%';
  const altinUp = altinRaw?.changePercent != null ? altinRaw.changePercent >= 0 : true;

  // Piyasa Duyarlılığı Hesaplama (Basit mantık)
  const positiveCount = [dolarUp, bistUp, altinUp].filter(Boolean).length;
  const sentiment = positiveCount >= 2 ? 'Pozitif / İyimser' : 'Temkinli / Karışık';
  const sentimentColor = positiveCount >= 2 ? 'text-emerald-400' : 'text-yellow-400';

  return (
    <div className="relative group overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
      
      <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-xl">
              📊
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Günün Özeti</h3>
              <p className="text-[10px] text-slate-500 font-medium">{date}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className={`text-[10px] font-bold uppercase tracking-widest ${sentimentColor}`}>
              {sentiment}
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[10px] text-slate-400 font-mono">LIVE FEED</span>
            </div>
          </div>
        </div>

        {/* Highlight Text */}
        <div className="bg-slate-800/40 border-l-2 border-blue-500 p-3 rounded-r-lg mb-6">
          <p className="text-blue-200/90 text-xs leading-relaxed font-medium">
            Küresel piyasalarda gözler enflasyon verilerinde. Borsa İstanbul, bankacılık öncülüğünde güç kazanırken, emtia piyasalarında hareketlilik artıyor.
          </p>
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <BriefItem 
            label="BIST 100" 
            value={bistDeger} 
            change={bistDegisim} 
            isUp={bistUp} 
            icon="📈" 
          />
          <BriefItem 
            label="USD/TRY" 
            value={dolarDeger} 
            change={dolarDegisim} 
            isUp={dolarUp} 
            icon="💵" 
          />
          <BriefItem 
            label="Gram Altın" 
            value={altinDeger} 
            change={altinDegisim} 
            isUp={altinUp} 
            icon="✨" 
          />
        </div>

        <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
          <Link href="/market" className="text-[11px] font-bold text-blue-400 hover:text-blue-300 transition flex items-center gap-1">
            TÜM PİYASALARI GÖR <span>→</span>
          </Link>
          <span className="text-[10px] text-slate-600 flex items-center gap-1">
            <span className="opacity-50">🛡️</span> YATIRIM TAVSİYESİ DEĞİLDİR
          </span>
        </div>
      </div>
    </div>
  );
}

function BriefItem({ label, value, change, isUp, icon }) {
  return (
    <div className="bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/30 rounded-xl p-3 transition-all">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs opacity-70">{icon}</span>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{label}</span>
      </div>
      <div className="flex items-baseline justify-between gap-1">
        <span className="text-sm font-mono font-bold text-white tracking-tight">{value}</span>
        <span className={`text-[10px] font-mono font-bold ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
          {isUp ? '▲' : '▼'} {change.replace('+', '').replace('-', '')}
        </span>
      </div>
    </div>
  );
}
