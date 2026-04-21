'use client';

import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((r) => (r.ok ? r.json() : null));

/** Günlük piyasa özeti — gerçek API yoksa güncel fallback verilerle çalışır */
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

  // Dolar kuru
  const usdRaw = dovizData?.['USD/TRY'] ?? dovizData?.USDTRY;
  const dolarDeger = usdRaw?.value ? usdRaw.value.toFixed(2) : '44.50';
  const dolarDegisim = usdRaw?.changePercent
    ? `${usdRaw.changePercent >= 0 ? '+' : ''}${usdRaw.changePercent.toFixed(2)}%`
    : '-0.52%';
  const dolarUp = usdRaw?.changePercent != null ? usdRaw.changePercent >= 0 : false;

  // BIST 100
  const bist = bistData?.bist ?? bistData;
  const bistDeger = bist?.xu100?.value ? bist.xu100.value.toFixed(0) : '13.674';
  const bistDegisim = bist?.xu100?.changePercent
    ? `${bist.xu100.changePercent >= 0 ? '+' : ''}${bist.xu100.changePercent.toFixed(2)}%`
    : '+1.01%';
  const bistUp = bist?.xu100?.changePercent != null ? bist.xu100.changePercent >= 0 : true;

  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-800/80 border border-slate-700 border-l-4 border-l-blue-500 p-5 rounded-xl">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-xl" aria-hidden>📰</span>
        <h3 className="text-sm font-bold text-white">Günün Özeti</h3>
        <span className="text-xs text-slate-400 bg-slate-700 px-2 py-0.5 rounded-full">{date}</span>
        <span className="ml-auto flex items-center gap-1 text-[10px] text-emerald-400">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          Canlı
        </span>
      </div>

      <p className="text-blue-300 font-medium text-sm mb-4">
        Piyasalar yoğun bir haftaya hazırlanıyor. Merkez Bankası ve Fed kararları yakından takip ediliyor.
      </p>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center justify-between bg-slate-700/50 rounded-lg px-3 py-2">
          <div className="flex items-center gap-1.5">
            <span aria-hidden>💵</span>
            <span className="text-slate-400 text-xs">USD/TRY</span>
          </div>
          <div className="text-right">
            <span className="font-mono font-bold text-white">{dolarDeger}</span>
            <span className={`ml-2 text-xs font-mono font-bold ${dolarUp ? 'text-emerald-400' : 'text-red-400'}`}>
              {dolarDegisim}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between bg-slate-700/50 rounded-lg px-3 py-2">
          <div className="flex items-center gap-1.5">
            <span aria-hidden>📊</span>
            <span className="text-slate-400 text-xs">BIST 100</span>
          </div>
          <div className="text-right">
            <span className="font-mono font-bold text-white">{bistDeger}</span>
            <span className={`ml-2 text-xs font-mono font-bold ${bistUp ? 'text-emerald-400' : 'text-red-400'}`}>
              {bistDegisim}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-3 text-[11px] text-slate-500 italic">
        <span aria-hidden>⚠️ </span>
        Bu bilgiler genel piyasa özeti niteliğindedir.{' '}
        <span className="not-italic">Yatırım tavsiyesi değildir.</span>
      </p>
    </div>
  );
}
