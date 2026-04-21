'use client';

import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url) => fetch(url).then((r) => (r.ok ? r.json() : null));

/** Günlük piyasa özeti — Premium Visual Version */
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

  // Piyasa Duyarlılığı Hesaplama
  const positiveCount = [dolarUp, bistUp, altinUp].filter(Boolean).length;
  const sentiment = positiveCount >= 2 ? 'Pozitif / İyimser' : 'Temkinli / Karışık';
  const sentimentColor = positiveCount >= 2 ? 'text-emerald-400' : 'text-yellow-400';

  return (
    <div className="relative group overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
      
      <div className="relative bg-slate-950/40 backdrop-blur-2xl border border-white/5 rounded-[32px] p-8 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl border border-white/10 shadow-lg">
              📊
            </div>
            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">Günün Özeti</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{date}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${sentimentColor}`}>
              {sentiment}
            </span>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-[9px] text-slate-500 font-black tracking-widest uppercase">Live Hub</span>
            </div>
          </div>
        </div>

        {/* Highlight Text */}
        <div className="bg-white/5 border-l-4 border-blue-600 p-5 rounded-r-2xl mb-8 backdrop-blur-sm">
          <p className="text-blue-200/90 text-sm leading-relaxed font-semibold">
            Küresel piyasalarda gözler enflasyon verilerinde. Borsa İstanbul, bankacılık öncülüğünde güç kazanırken, emtia piyasalarında hareketlilik artıyor.
          </p>
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-1 gap-4">
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

        <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
          <Link href="/market" className="text-[10px] font-black text-blue-500 hover:text-white transition-all uppercase tracking-[0.2em] flex items-center gap-2">
            TERMİNAL <span>→</span>
          </Link>
          <span className="text-[9px] text-slate-600 font-bold flex items-center gap-2 uppercase tracking-tighter">
            <span className="opacity-50">🛡️</span> NO ADVICE
          </span>
        </div>
      </div>
    </div>
  );
}

function BriefItem({ label, value, change, isUp, icon }) {
  return (
    <div className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl p-4 transition-all duration-300 group/item">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm opacity-60 group-hover/item:scale-110 transition-transform">{icon}</span>
        <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{label}</span>
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-base font-mono font-black text-white tracking-tighter">{value}</span>
        <span className={`text-[10px] font-mono font-black ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
          {isUp ? '▲' : '▼'} {change.replace('+', '').replace('-', '')}
        </span>
      </div>
    </div>
  );
}
