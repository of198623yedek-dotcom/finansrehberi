'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import AdSenseBanner from '@/app/components/AdSenseBanner';
import DailyBrief from '@/app/components/DailyBrief';

const fetcher = (url) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error('API Error');
    return r.json();
  });

// ─── Fallback Veri ──────────────────────────────────────────────────────────
const ENDEKS_FALLBACK = [
  { sembol: 'XU100', ad: 'BIST 100', deger: '13.674', degisim: '+137.26', yuzde: '+1.01%', up: true },
  { sembol: 'XU050', ad: 'BIST 50', deger: '12.307', degisim: '+138.34', yuzde: '+1.14%', up: true },
  { sembol: 'XU030', ad: 'BIST 30', deger: '13.200', degisim: '+680.15', yuzde: '+5.42%', up: true },
  { sembol: 'XBANK', ad: 'BANKA', deger: '17.288', degisim: '+1.393', yuzde: '+8.76%', up: true },
];

const DOVIZ_FALLBACK = [
  { sembol: 'USD/TRY', deger: '44.50', degisim: '-0.23', up: false },
  { sembol: 'EUR/TRY', deger: '52.03', degisim: '+0.60', up: true },
  { sembol: 'GBP/TRY', deger: '56.85', degisim: '+0.45', up: true },
  { sembol: 'CHF/TRY', deger: '48.23', degisim: '-0.15', up: false },
  { sembol: 'EUR/USD', deger: '1.1693', degisim: '+0.01', up: true },
];

const KRIPTO_FALLBACK = [
  { sembol: 'BTC', ad: 'Bitcoin', deger: '$84.200', degisim: '+2.34%', up: true },
  { sembol: 'ETH', ad: 'Ethereum', deger: '$3.542', degisim: '+1.12%', up: true },
  { sembol: 'XRP', ad: 'XRP', deger: '$2.45', degisim: '+1.85%', up: true },
  { sembol: 'SOL', ad: 'Solana', deger: '$182.5', degisim: '+4.42%', up: true },
  { sembol: 'BNB', ad: 'BNB', deger: '$612', degisim: '+3.61%', up: true },
];

const HABERLER_FALLBACK = [
  { kategori: 'BORSA', baslik: "BIST 100'de Güçlü Yükseliş: Endeks 13.674 Puanı Gördü", sure: '15 dk önce' },
  { kategori: 'KRİPTO', baslik: 'Bitcoin Kurumsal Alımlarla Yeni Zirveye Yaklaştı', sure: '1 saat önce' },
  { kategori: 'ALTIN', baslik: "Gram Altın 6.756 TL'den İşlem Gördü, ONS 2.756$", sure: '2 saat önce' },
  { kategori: 'EKONOMİ', baslik: 'Merkez Bankası Faiz Kararını Bu Hafta Açıklayacak', sure: '3 saat önce' },
  { kategori: 'DÖVİZ', baslik: 'Dolar/TL 44.50 Seviyesinde — Günlük Hareket Sınırlı Kaldı', sure: '4 saat önce' },
  { kategori: 'BORSA', baslik: 'Banka Endeksi %8.76 ile Haftanın En Güçlü Endeksi Oldu', sure: '5 saat önce' },
];

const KAT_RENK = {
  BORSA: 'bg-blue-500/20 text-blue-300',
  KRİPTO: 'bg-orange-500/20 text-orange-300',
  ALTIN: 'bg-yellow-500/20 text-yellow-300',
  EKONOMİ: 'bg-green-500/20 text-green-300',
  DÖVİZ: 'bg-purple-500/20 text-purple-300',
};

function newsRelativeTime(iso) {
  if (!iso) return '';
  const m = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (m < 1) return 'Az önce';
  if (m < 60) return `${m} dk önce`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} saat önce`;
  const d = Math.floor(h / 24);
  return `${d} gün önce`;
}

function PiyasaRow({ sembol, ad, deger, degisim, yuzde, up, link }) {
  const router = useRouter();
  return (
    <tr
      role={link ? 'link' : undefined}
      tabIndex={link ? 0 : undefined}
      onClick={link ? () => router.push(link) : undefined}
      onKeyDown={
        link
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                router.push(link);
              }
            }
          : undefined
      }
      className={`border-b border-slate-800 hover:bg-slate-800/50 transition ${link ? 'cursor-pointer' : ''}`}
    >
      <td className="px-4 py-3">
        <div className="font-mono font-bold text-white text-sm">{sembol}</div>
        {ad && <div className="text-xs text-slate-500">{ad}</div>}
      </td>
      <td className="px-4 py-3 text-right font-mono font-semibold text-white text-sm">{deger}</td>
      {degisim && (
        <td className={`px-4 py-3 text-right font-mono font-semibold text-sm ${up ? 'text-emerald-400' : 'text-red-400'}`}>
          {degisim}
        </td>
      )}
      {yuzde && (
        <td className={`px-4 py-3 text-right font-mono font-bold text-sm ${up ? 'text-emerald-400' : 'text-red-400'}`}>
          <span className={`px-2 py-0.5 rounded ${up ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>{yuzde}</span>
        </td>
      )}
    </tr>
  );
}

function Tab({ aktif, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
        aktif
          ? 'border-blue-500 text-blue-400'
          : 'border-transparent text-slate-400 hover:text-slate-200'
      }`}
    >
      {children}
    </button>
  );
}

export default function MarketHub() {
  const [aktifSekme, setAktifSekme] = useState('endeks');
  const [saat, setSaat] = useState('');

  useEffect(() => {
    const tick = () =>
      setSaat(new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const { data: bistData } = useSWR('/api/markets/bist', fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 300000,
    keepPreviousData: true,
  });
  const { data: dovizData } = useSWR('/api/markets/doviz', fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 300000,
    keepPreviousData: true,
  });
  const { data: gainers } = useSWR('/api/markets/gainers', fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 300000,
    keepPreviousData: true,
  });
  const { data: losers } = useSWR('/api/markets/losers', fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 300000,
    keepPreviousData: true,
  });
  const { data: newsData } = useSWR('/api/markets/news', fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 600000,
    keepPreviousData: true,
  });

  const bist = bistData?.bist ?? bistData;

  const endeksler = bist?.xu100
    ? [
        bist.xu100 && {
          sembol: 'XU100',
          ad: 'BIST 100',
          deger: bist.xu100.value?.toFixed(0),
          degisim: bist.xu100.change?.toFixed(2),
          yuzde: `${bist.xu100.changePercent >= 0 ? '+' : ''}${bist.xu100.changePercent?.toFixed(2)}%`,
          up: bist.xu100.changePercent >= 0,
          link: '/assets/bist-100',
        },
        bist.xu050 && {
          sembol: 'XU050',
          ad: 'BIST 50',
          deger: bist.xu050.value?.toFixed(0),
          degisim: bist.xu050.change?.toFixed(2),
          yuzde: `${bist.xu050.changePercent >= 0 ? '+' : ''}${bist.xu050.changePercent?.toFixed(2)}%`,
          up: bist.xu050.changePercent >= 0,
        },
        bist.xu030 && {
          sembol: 'XU030',
          ad: 'BIST 30',
          deger: bist.xu030.value?.toFixed(0),
          degisim: bist.xu030.change?.toFixed(2),
          yuzde: `${bist.xu030.changePercent >= 0 ? '+' : ''}${bist.xu030.changePercent?.toFixed(2)}%`,
          up: bist.xu030.changePercent >= 0,
        },
        bist.xbank && {
          sembol: 'XBANK',
          ad: 'BANKA',
          deger: bist.xbank.value?.toFixed(0),
          degisim: bist.xbank.change?.toFixed(2),
          yuzde: `${bist.xbank.changePercent >= 0 ? '+' : ''}${bist.xbank.changePercent?.toFixed(2)}%`,
          up: bist.xbank.changePercent >= 0,
        },
      ].filter(Boolean)
    : ENDEKS_FALLBACK;

  const dovizler = dovizData
    ? Object.values(dovizData).map((d) => ({
        sembol: d.symbol,
        deger: typeof d.value === 'number' ? d.value.toFixed(4) : d.value,
        degisim: d.change?.toFixed(2),
        up: (d.change || 0) >= 0,
      }))
    : DOVIZ_FALLBACK;

  const newsList = Array.isArray(newsData) ? newsData : [];
  const haberler =
    newsList.length > 0
      ? newsList.slice(0, 6).map((h) => ({
          kategori: h.category || 'BORSA',
          baslik: h.title,
          sure: newsRelativeTime(h.publishedAt),
        }))
      : HABERLER_FALLBACK;

  const yukselenler = (Array.isArray(gainers) ? gainers : []).slice(0, 5);
  const dusenler = (Array.isArray(losers) ? losers : []).slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="bg-slate-950 border-b border-slate-800 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-emerald-400">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Canlı
            </span>
            {saat && <span className="text-xs text-slate-500 font-mono">{saat}</span>}
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs font-mono">
            {DOVIZ_FALLBACK.slice(0, 4).map((d) => (
              <span key={d.sembol} className="text-slate-400">
                {d.sembol} <span className="text-white font-bold">{d.deger}</span>{' '}
                <span className={d.up ? 'text-emerald-400' : 'text-red-400'}>{d.degisim}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border-b border-slate-800 px-4 py-5">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-black text-white mb-1">📊 Piyasa Merkezi</h1>
          <p className="text-slate-400 text-sm">Borsa endeksleri, döviz, altın ve kripto canlı takip</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-2">
        <DailyBrief />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdSenseBanner slot="hero-bottom" format="leaderboard" label="Reklam" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-12">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
              <div className="flex border-b border-slate-700 px-2 overflow-x-auto">
                <Tab aktif={aktifSekme === 'endeks'} onClick={() => setAktifSekme('endeks')}>
                  🏛️ Endeksler
                </Tab>
                <Tab aktif={aktifSekme === 'doviz'} onClick={() => setAktifSekme('doviz')}>
                  💱 Döviz
                </Tab>
                <Tab aktif={aktifSekme === 'kripto'} onClick={() => setAktifSekme('kripto')}>
                  ₿ Kripto
                </Tab>
                <Tab aktif={aktifSekme === 'hareketler'} onClick={() => setAktifSekme('hareketler')}>
                  📈 Hareketler
                </Tab>
              </div>

              {aktifSekme === 'endeks' && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Endeks</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Son</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Fark</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {endeksler.map((e, i) => (
                        <PiyasaRow key={i} {...e} />
                      ))}
                    </tbody>
                  </table>
                  <div className="px-4 py-2 text-xs text-slate-600">Veriler SWR cache ile 5 dakikada bir güncellenir</div>
                </div>
              )}

              {aktifSekme === 'doviz' && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Parite</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Kur</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Değişim</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dovizler.map((d, i) => (
                        <tr key={i} className="border-b border-slate-800 hover:bg-slate-800/50 transition">
                          <td className="px-4 py-3 font-mono font-bold text-white text-sm">{d.sembol}</td>
                          <td className="px-4 py-3 text-right font-mono text-white text-sm">{d.deger}</td>
                          <td
                            className={`px-4 py-3 text-right font-mono font-bold text-sm ${d.up ? 'text-emerald-400' : 'text-red-400'}`}
                          >
                            {d.up ? '+' : ''}
                            {d.degisim}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {aktifSekme === 'kripto' && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Kripto</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Fiyat</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">24s %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {KRIPTO_FALLBACK.map((k, i) => (
                        <tr key={i} className="border-b border-slate-800 hover:bg-slate-800/50 transition">
                          <td className="px-4 py-3">
                            <div className="font-mono font-bold text-white text-sm">{k.sembol}</div>
                            <div className="text-xs text-slate-500">{k.ad}</div>
                          </td>
                          <td className="px-4 py-3 text-right font-mono text-white text-sm">{k.deger}</td>
                          <td
                            className={`px-4 py-3 text-right font-mono font-bold text-sm ${k.up ? 'text-emerald-400' : 'text-red-400'}`}
                          >
                            <span className={`px-2 py-0.5 rounded ${k.up ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                              {k.degisim}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {aktifSekme === 'hareketler' && (
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-700">
                  <div>
                    <div className="px-4 py-3 border-b border-slate-700 flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                      <span className="text-sm font-bold text-emerald-400">En Çok Yükselenler</span>
                    </div>
                    <table className="w-full">
                      <tbody>
                        {(yukselenler.length > 0
                          ? yukselenler
                          : [
                              { symbol: 'KMPUR', changePercent: 10.0 },
                              { symbol: 'GLRMK', changePercent: 10.0 },
                              { symbol: 'MARKA', changePercent: 10.0 },
                              { symbol: 'ALARK', changePercent: 8.67 },
                              { symbol: 'SISE', changePercent: 6.41 },
                            ]
                        ).map((s, i) => (
                          <tr key={i} className="border-b border-slate-800 hover:bg-slate-800/50 transition">
                            <td className="px-4 py-3 font-mono font-bold text-white text-sm">{s.symbol || s.name}</td>
                            <td className="px-4 py-3 text-right font-mono font-bold text-emerald-400 text-sm">
                              +{parseFloat(s.changePercent || s.change || 0).toFixed(2)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <div className="px-4 py-3 border-b border-slate-700 flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full" />
                      <span className="text-sm font-bold text-red-400">En Çok Düşenler</span>
                    </div>
                    <table className="w-full">
                      <tbody>
                        {(dusenler.length > 0
                          ? dusenler
                          : [
                              { symbol: 'DAPGM', changePercent: -10.0 },
                              { symbol: 'RUBNS', changePercent: -10.0 },
                              { symbol: 'BLCYT', changePercent: -9.93 },
                              { symbol: 'NUHCM', changePercent: -10.0 },
                              { symbol: 'ECZYT', changePercent: -3.85 },
                            ]
                        ).map((s, i) => (
                          <tr key={i} className="border-b border-slate-800 hover:bg-slate-800/50 transition">
                            <td className="px-4 py-3 font-mono font-bold text-white text-sm">{s.symbol || s.name}</td>
                            <td className="px-4 py-3 text-right font-mono font-bold text-red-400 text-sm">
                              {parseFloat(s.changePercent || s.change || 0).toFixed(2)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            <AdSenseBanner slot="in-content-1" label="Reklam" />

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
              <h2 className="font-bold text-white mb-4 text-sm flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-[10px] font-black text-white shadow-sm"
                >
                  FR
                </span>
                <span aria-hidden="true">⚡</span>
                <span>Hızlı Araçlar</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { icon: '🎯', ad: 'Tavan Serisi', link: '/tools/ceiling' },
                  { icon: '💰', ad: 'Kar Hesapla', link: '/tools/profit' },
                  { icon: '📊', ad: 'Lot Hesapla', link: '/tools/lot' },
                  { icon: '🚀', ad: 'Halka Arz', link: '/halka-arz' },
                ].map((a, i) => (
                  <Link
                    key={i}
                    href={a.link}
                    className="flex flex-col items-center p-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition text-center"
                  >
                    <span className="text-xl mb-1">{a.icon}</span>
                    <span className="text-xs font-semibold text-slate-300">{a.ad}</span>
                  </Link>
                ))}
              </div>
            </div>

            <AdSenseBanner slot="below-content" label="Reklam" />
          </div>

          <aside className="space-y-5">
            <AdSenseBanner slot="sidebar-top" format="rectangle" label="Reklam" />

            <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-700 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                <h3 className="font-bold text-white text-sm">Son Haberler</h3>
              </div>
              <div className="divide-y divide-slate-800">
                {haberler.map((h, i) => (
                  <Link key={i} href="/blog" className="block px-4 py-3 hover:bg-slate-700/40 transition">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${KAT_RENK[h.kategori] || 'bg-slate-600 text-slate-300'}`}
                    >
                      {h.kategori}
                    </span>
                    <p className="text-xs text-slate-300 mt-1.5 leading-snug line-clamp-2">{h.baslik}</p>
                    <p className="text-[10px] text-slate-600 mt-1">{h.sure}</p>
                  </Link>
                ))}
              </div>
            </div>

            <AdSenseBanner slot="sidebar-mid" format="rectangle" label="Reklam" />

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
              <h3 className="font-bold text-yellow-400 text-sm mb-3">💰 Altın Fiyatları</h3>
              <div className="space-y-2">
                {[
                  { ad: 'Gram Altın', fiyat: '6.756 ₺', up: true },
                  { ad: 'Çeyrek Altın', fiyat: '11.046 ₺', up: true },
                  { ad: 'Yarım Altın', fiyat: '22.026 ₺', up: true },
                  { ad: 'Tam Altın', fiyat: '44.052 ₺', up: true },
                  { ad: 'ONS Altın', fiyat: '$2.756', up: true },
                ].map((a, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-slate-400">{a.ad}</span>
                    <span className={`font-mono font-bold ${a.up ? 'text-emerald-400' : 'text-red-400'}`}>{a.fiyat}</span>
                  </div>
                ))}
              </div>
              <Link href="/assets/altin" className="mt-3 block text-center text-xs text-blue-400 hover:text-blue-300 transition">
                Detaylı Altın Analizi →
              </Link>
            </div>

            <AdSenseBanner slot="sidebar-bottom" format="rectangle" label="Reklam" />
          </aside>
        </div>
      </div>
    </div>
  );
}
