'use client';

import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url) => fetch(url).then((r) => (r.ok ? r.json() : null));

/** Günlük piyasa özeti — Diversified Terminal Version */
export default function DailyBrief() {
  const date = new Date().toLocaleDateString('tr-TR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const { data: dovizData } = useSWR('/api/markets/doviz', fetcher, { refreshInterval: 300000 });
  const { data: bistData } = useSWR('/api/markets/bist', fetcher, { refreshInterval: 300000 });
  const { data: altinData } = useSWR('/api/markets/all', fetcher, { refreshInterval: 300000 });
  const { data: cryptoData } = useSWR('/api/markets/crypto', fetcher, { refreshInterval: 300000 });

  // Veri Ayıklama (Sağlamlaştırma)
  const usdRaw = dovizData?.['USD/TRY'] ?? dovizData?.USDTRY ?? dovizData?.usd_try;
  const bist = bistData?.bist ?? bistData;
  const altinRaw = altinData?.gold_try ?? altinData?.['GRAM/ALTIN'] ?? altinData?.gold;
  const btcRaw = cryptoData?.btc ?? cryptoData?.bitcoin;

  const getVal = (raw, def = '0.00') => raw?.value ? parseFloat(raw.value).toLocaleString('tr-TR') : def;
  const getChange = (raw, def = '0.00%') => raw?.changePercent ? `${raw.changePercent >= 0 ? '+' : ''}${raw.changePercent.toFixed(2)}%` : def;
  const isUp = (raw) => (raw?.changePercent || 0) >= 0;

  return (
    <div className="space-y-6">
      {/* --- HEADER --- */}
      <div className="bg-slate-950/40 backdrop-blur-2xl border border-white/5 rounded-[32px] p-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-1000">
           <div className="text-6xl">📊</div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-blue-500/20">
              Terminal Özeti
            </span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{date}</span>
          </div>
          
          <h2 className="text-2xl font-black text-white tracking-tighter mb-4">Piyasa Nabzı</h2>
          <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-xs">
            Bugün piyasalarda <span className="text-blue-400 font-black">pozitif</span> bir hava hakim. BIST 100 endeksi kritik direnç seviyelerini test ediyor.
          </p>
        </div>
      </div>

      {/* --- DATA BENTO GRID --- */}
      <div className="grid grid-cols-2 gap-4">
        <MiniCard label="BIST 100" value={getVal(bist?.xu100, '13.674')} change={getChange(bist?.xu100)} up={isUp(bist?.xu100)} />
        <MiniCard label="DOLAR/TL" value={getVal(usdRaw, '44.55')} change={getChange(usdRaw)} up={isUp(usdRaw)} />
        <MiniCard label="GRAM ALTIN" value={getVal(altinRaw, '6.756')} change={getChange(altinRaw)} up={isUp(altinRaw)} />
        <MiniCard label="BITCOIN" value={getVal(btcRaw, '103.450')} change={getChange(btcRaw)} up={isUp(btcRaw)} />
      </div>

      {/* --- SPECIAL INSIGHTS --- */}
      <div className="grid grid-cols-1 gap-4">
        
        {/* Sentiment Card */}
        <div className="bg-white/5 border border-white/5 rounded-3xl p-6 flex items-center justify-between group cursor-help">
          <div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Duyarlılık Endeksi</p>
            <h4 className="text-lg font-black text-emerald-400 uppercase tracking-tighter">Açgözlülük (74)</h4>
          </div>
          <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden relative">
            <div className="absolute left-0 top-0 h-full bg-emerald-500 w-[74%] shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          </div>
        </div>

        {/* IPO Spotlight */}
        <div className="bg-blue-600/10 border border-blue-500/20 rounded-3xl p-6 relative overflow-hidden group">
          <div className="absolute right-[-10px] bottom-[-10px] text-4xl opacity-10 group-hover:rotate-12 transition-transform">🚀</div>
          <p className="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em] mb-1">Haftalık Halka Arz</p>
          <h4 className="text-sm font-black text-white mb-2">Enpara Bank A.Ş.</h4>
          <p className="text-[10px] text-slate-400 font-bold leading-snug">Talep toplama süreci yaklaşıyor. <Link href="/halka-arz" className="text-blue-400 hover:underline">İncele →</Link></p>
        </div>

      </div>

      {/* --- FOOTER CTA --- */}
      <div className="flex items-center justify-between px-4 pt-4 border-t border-white/5">
        <Link href="/market" className="text-[10px] font-black text-slate-500 hover:text-white transition-colors uppercase tracking-widest">
           Tam Terminale Git
        </Link>
        <span className="text-[8px] text-slate-700 font-black uppercase">v1.2 Terminal API</span>
      </div>
    </div>
  );
}

function MiniCard({ label, value, change, up }) {
  return (
    <div className="bg-white/5 border border-white/5 hover:border-white/10 rounded-3xl p-5 transition-all group cursor-pointer">
      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 group-hover:text-slate-300">{label}</p>
      <div className="space-y-1">
        <p className="text-lg font-mono font-black text-white tracking-tighter">{value}</p>
        <p className={`text-[10px] font-mono font-black ${up ? 'text-emerald-400' : 'text-red-400'}`}>
          {up ? '▲' : '▼'} {change}
        </p>
      </div>
    </div>
  );
}
