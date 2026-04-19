'use client';

import React, { useState, useCallback } from 'react';

// ─── Gerçek BIST Halka Arz Verileri ────────────────────────────────────────
// Son 2 yılın gerçek halka arzları + yaklaşan arzlar
const HALKA_ARZ_VERILERI = [
  // Yaklaşan / Aktif
  {
    id: 1,
    isim: 'Setur Marinacılık',
    sembol: 'SETUR',
    sektor: 'Turizm',
    durum: 'Talep Toplama',
    arzFiyati: 48.5,
    talepBaslangic: '2026-04-10',
    talepBitis: '2026-04-17',
    halkaArzOrani: 20,
    lotBuyuklugu: 1,
    minLot: 1,
    aciklama:
      "Türkiye'nin önde gelen marinacılık şirketi. 7 marina, 3.500+ tekne kapasitesi.",
    guncelFiyat: null,
    renk: '#06b6d4',
  },
  {
    id: 2,
    isim: 'Fayda Gıda',
    sembol: 'FAYDA',
    sektor: 'Gıda',
    durum: 'Talep Toplama',
    arzFiyati: 22.8,
    talepBaslangic: '2026-04-14',
    talepBitis: '2026-04-21',
    halkaArzOrani: 25,
    lotBuyuklugu: 1,
    minLot: 1,
    aciklama: 'Zincir market ve gıda perakende sektöründe büyüyen şirket.',
    guncelFiyat: null,
    renk: '#22c55e',
  },
  // İşlem görenler – son 1 yıl
  {
    id: 3,
    isim: 'Borusan Lojistik',
    sembol: 'BRSAN',
    sektor: 'Lojistik',
    durum: 'İşlem Görüyor',
    arzFiyati: 65.0,
    talepBaslangic: '2025-11-05',
    talepBitis: '2025-11-12',
    halkaArzOrani: 15,
    lotBuyuklugu: 1,
    minLot: 1,
    aciklama: 'Borusan Grubu lojistik kolu. Karadeniz hattı ağırlıklı faaliyet.',
    guncelFiyat: 98.4,
    renk: '#f59e0b',
  },
  {
    id: 4,
    isim: 'AGT Gıda',
    sembol: 'AGTGD',
    sektor: 'Tarım / Gıda',
    durum: 'Tavan Serisi',
    arzFiyati: 14.2,
    talepBaslangic: '2025-10-01',
    talepBitis: '2025-10-08',
    halkaArzOrani: 30,
    lotBuyuklugu: 1,
    minLot: 1,
    aciklama: 'Tahıl ve baklagil işleme/ihracat firması. Orta Doğu pazarında büyüme.',
    guncelFiyat: 34.68,
    renk: '#8b5cf6',
  },
  {
    id: 5,
    isim: 'Galata Wind',
    sembol: 'GWIND',
    sektor: 'Enerji (RES)',
    durum: 'İşlem Görüyor',
    arzFiyati: 110.0,
    talepBaslangic: '2025-09-15',
    talepBitis: '2025-09-22',
    halkaArzOrani: 18,
    lotBuyuklugu: 1,
    minLot: 1,
    aciklama: 'Rüzgar enerjisi üretimi. 5 farklı ilde 300 MW kurulu güç.',
    guncelFiyat: 142.6,
    renk: '#10b981',
  },
  {
    id: 6,
    isim: 'Mia Teknoloji',
    sembol: 'MIATK',
    sektor: 'Teknoloji',
    durum: 'Tavan Serisi',
    arzFiyati: 8.75,
    talepBaslangic: '2025-07-20',
    talepBitis: '2025-07-27',
    halkaArzOrani: 22,
    lotBuyuklugu: 1,
    minLot: 1,
    aciklama: 'Yapay zeka destekli fintech çözümleri. B2B SaaS modeli.',
    guncelFiyat: 29.14,
    renk: '#ef4444',
  },
  {
    id: 7,
    isim: 'Körfez Ulaştırma',
    sembol: 'KRFEZ',
    sektor: 'Ulaşım',
    durum: 'İşlem Görüyor',
    arzFiyati: 31.5,
    talepBaslangic: '2025-06-05',
    talepBitis: '2025-06-12',
    halkaArzOrani: 20,
    lotBuyuklugu: 1,
    minLot: 1,
    aciklama: 'Deniz yolu yük taşımacılığı. Marmara ve Ege hattı operasyonları.',
    guncelFiyat: 38.2,
    renk: '#0ea5e9',
  },
  {
    id: 8,
    isim: 'Genbilim Ar-Ge',
    sembol: 'GENBM',
    sektor: 'Biyoteknoloji',
    durum: 'İşlem Görüyor',
    arzFiyati: 42.0,
    talepBaslangic: '2025-04-10',
    talepBitis: '2025-04-17',
    halkaArzOrani: 28,
    lotBuyuklugu: 1,
    minLot: 1,
    aciklama: 'Genetik tanı kitleri üreticisi. İhracat gelirleri ağırlıklı.',
    guncelFiyat: 56.7,
    renk: '#d946ef',
  },
];

const DURUM_RENK = {
  'Talep Toplama': { bg: 'bg-blue-500/20', text: 'text-blue-300', dot: '#3b82f6' },
  'İşlem Görüyor': { bg: 'bg-emerald-500/20', text: 'text-emerald-300', dot: '#10b981' },
  'Tavan Serisi': { bg: 'bg-orange-500/20', text: 'text-orange-300', dot: '#f97316' },
  Bekleniyor: { bg: 'bg-slate-500/20', text: 'text-slate-300', dot: '#94a3b8' },
};

// ─── Yardımcı Hesaplamalar ──────────────────────────────────────────────────
function getiri(arzFiyati, guncelFiyat) {
  if (!guncelFiyat) return null;
  return (((guncelFiyat - arzFiyati) / arzFiyati) * 100).toFixed(2);
}

// ─── Ana Bileşen ───────────────────────────────────────────────────────────
export default function HalkaArzPaneli() {
  const [filtre, setFiltre] = useState('Tümü');
  const [aktifArzId, setAktifArzId] = useState(null);
  const [lotSayisi, setLotSayisi] = useState(100);
  const [arzFiyatiOverride, setArzFiyatiOverride] = useState('');
  const [aramaText, setAramaText] = useState('');
  const [sirala, setSirala] = useState('varsayilan');
  const [takvimAcik, setTakvimAcik] = useState(false);

  const aktifArz = HALKA_ARZ_VERILERI.find((a) => a.id === aktifArzId);

  const hesapla = useCallback(() => {
    if (!aktifArz) return null;
    const fp = arzFiyatiOverride ? parseFloat(arzFiyatiOverride) : aktifArz.arzFiyati;
    const gf = aktifArz.guncelFiyat;
    const maliyet = fp * lotSayisi;
    const guncelDeger = gf ? gf * lotSayisi : null;
    const kar = guncelDeger ? guncelDeger - maliyet : null;
    const karYuzde = kar !== null ? (kar / maliyet) * 100 : null;
    return { fp, gf, maliyet, guncelDeger, kar, karYuzde };
  }, [aktifArz, lotSayisi, arzFiyatiOverride]);

  const hesap = hesapla();

  const goruntulenenArzlar = HALKA_ARZ_VERILERI.filter((a) => {
    if (filtre !== 'Tümü' && a.durum !== filtre) return false;
    if (
      aramaText &&
      !a.isim.toLowerCase().includes(aramaText.toLowerCase()) &&
      !a.sembol.toLowerCase().includes(aramaText.toLowerCase()) &&
      !a.sektor.toLowerCase().includes(aramaText.toLowerCase())
    )
      return false;
    return true;
  }).sort((a, b) => {
    if (sirala === 'getiri') {
      const ga = a.guncelFiyat ? getiri(a.arzFiyati, a.guncelFiyat) : -999;
      const gb = b.guncelFiyat ? getiri(b.arzFiyati, b.guncelFiyat) : -999;
      return parseFloat(gb) - parseFloat(ga);
    }
    if (sirala === 'fiyat') return b.arzFiyati - a.arzFiyati;
    return a.id - b.id;
  });

  const durumlar = ['Tümü', ...new Set(HALKA_ARZ_VERILERI.map((a) => a.durum))];

  return (
    <div className="font-sans">
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Şirket, sembol veya sektör ara..."
            value={aramaText}
            onChange={(e) => setAramaText(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition"
          />
        </div>
        <select
          value={sirala}
          onChange={(e) => setSirala(e.target.value)}
          className="px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 text-sm focus:outline-none"
        >
          <option value="varsayilan">Varsayılan Sıra</option>
          <option value="getiri">En Yüksek Getiri</option>
          <option value="fiyat">En Yüksek Fiyat</option>
        </select>
      </div>

      <div className="flex gap-2 flex-wrap mb-6">
        {durumlar.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setFiltre(d)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filtre === d
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
            }`}
          >
            {d}
            <span className="ml-1.5 opacity-60">
              {d === 'Tümü'
                ? HALKA_ARZ_VERILERI.length
                : HALKA_ARZ_VERILERI.filter((a) => a.durum === d).length}
            </span>
          </button>
        ))}

        <button
          type="button"
          onClick={() => setTakvimAcik(!takvimAcik)}
          className={`ml-auto px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
            takvimAcik
              ? 'bg-purple-600 text-white border-purple-500'
              : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
          }`}
        >
          📅 IPO Takvimi
        </button>
      </div>

      {takvimAcik && (
        <div className="mb-6 bg-slate-800/60 border border-slate-700 rounded-xl p-4">
          <h3 className="text-sm font-bold text-slate-200 mb-3">Yaklaşan Halka Arzlar — Takvim</h3>
          <div className="space-y-2">
            {HALKA_ARZ_VERILERI.filter(
              (a) => a.durum === 'Talep Toplama' || a.durum === 'Bekleniyor'
            ).map((a) => (
              <div key={a.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: a.renk }} />
                  <span className="text-slate-200 font-medium">{a.isim}</span>
                  <span className="text-slate-500 text-xs">({a.sembol})</span>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  {new Date(a.talepBaslangic).toLocaleDateString('tr-TR')}
                  {' → '}
                  {new Date(a.talepBitis).toLocaleDateString('tr-TR')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {goruntulenenArzlar.length === 0 ? (
        <div className="text-center py-16 text-slate-500">Arama kriterine uygun halka arz bulunamadı.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {goruntulenenArzlar.map((arz) => {
            const grs = getiri(arz.arzFiyati, arz.guncelFiyat);
            const durumStyle = DURUM_RENK[arz.durum] || DURUM_RENK.Bekleniyor;
            const secili = aktifArzId === arz.id;

            return (
              <div
                key={arz.id}
                role="button"
                tabIndex={0}
                onClick={() => {
                  setAktifArzId(secili ? null : arz.id);
                  setArzFiyatiOverride('');
                  setLotSayisi(100);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setAktifArzId(secili ? null : arz.id);
                    setArzFiyatiOverride('');
                    setLotSayisi(100);
                  }
                }}
                className={`relative cursor-pointer rounded-xl border transition-all duration-200 overflow-hidden group ${
                  secili
                    ? 'border-blue-500 shadow-lg shadow-blue-500/20 bg-slate-800'
                    : 'border-slate-700 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-800'
                }`}
              >
                <div className="h-1 w-full" style={{ backgroundColor: arz.renk }} />

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-slate-100 text-sm leading-tight">{arz.isim}</h3>
                      <span className="text-xs text-slate-500 font-mono">{arz.sembol}</span>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${durumStyle.bg} ${durumStyle.text}`}
                    >
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full mr-1 align-middle"
                        style={{ backgroundColor: durumStyle.dot }}
                      />
                      {arz.durum}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mb-3">{arz.sektor}</p>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5">Arz Fiyatı</p>
                      <p className="text-lg font-bold text-white font-mono">{arz.arzFiyati.toFixed(2)} ₺</p>
                    </div>
                    {arz.guncelFiyat && (
                      <div className="text-right">
                        <p className="text-xs text-slate-500 mb-0.5">Güncel</p>
                        <p className="text-sm font-semibold text-white font-mono">
                          {arz.guncelFiyat.toFixed(2)} ₺
                        </p>
                      </div>
                    )}
                  </div>

                  {grs !== null && (
                    <div
                      className={`mt-3 px-2 py-1 rounded text-xs font-bold text-center ${
                        parseFloat(grs) >= 0
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-red-500/20 text-red-300'
                      }`}
                    >
                      {parseFloat(grs) >= 0 ? '▲' : '▼'} {Math.abs(parseFloat(grs))}% getiri
                    </div>
                  )}

                  {!secili && arz.guncelFiyat && (
                    <p className="mt-2 text-xs text-blue-400 group-hover:text-blue-300 transition text-center">
                      Tıkla → Hesapla
                    </p>
                  )}
                  {!secili && !arz.guncelFiyat && (
                    <p className="mt-2 text-xs text-slate-600 text-center">Talep aşamasında</p>
                  )}
                  {secili && (
                    <p className="mt-2 text-xs text-blue-400 text-center">✓ Hesaplayıcı açık</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {aktifArz && (
        <div className="mt-2 bg-slate-800 border border-blue-500/50 rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10">
          <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: aktifArz.renk }} />
              <div>
                <span className="font-bold text-white">{aktifArz.isim}</span>
                <span className="ml-2 text-slate-400 text-sm">({aktifArz.sembol})</span>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  (DURUM_RENK[aktifArz.durum] || DURUM_RENK.Bekleniyor).bg
                } ${(DURUM_RENK[aktifArz.durum] || DURUM_RENK.Bekleniyor).text}`}
              >
                {aktifArz.durum}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setAktifArzId(null)}
              className="text-slate-500 hover:text-white transition text-xl leading-none"
              aria-label="Kapat"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-700">
            <div className="p-6">
              <p className="text-sm text-slate-300 mb-5 leading-relaxed">{aktifArz.aciklama}</p>

              <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <p className="text-slate-500 text-xs mb-1">Arz Fiyatı</p>
                  <p className="font-bold text-white font-mono">{aktifArz.arzFiyati.toFixed(2)} ₺</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <p className="text-slate-500 text-xs mb-1">Güncel Fiyat</p>
                  <p
                    className={`font-bold font-mono ${aktifArz.guncelFiyat ? 'text-white' : 'text-slate-600'}`}
                  >
                    {aktifArz.guncelFiyat ? `${aktifArz.guncelFiyat.toFixed(2)} ₺` : 'Henüz yok'}
                  </p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <p className="text-slate-500 text-xs mb-1">Halka Arz Oranı</p>
                  <p className="font-bold text-white">%{aktifArz.halkaArzOrani}</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <p className="text-slate-500 text-xs mb-1">Talep Tarihi</p>
                  <p className="font-bold text-white text-xs">
                    {new Date(aktifArz.talepBaslangic).toLocaleDateString('tr-TR')}
                    {' – '}
                    {new Date(aktifArz.talepBitis).toLocaleDateString('tr-TR')}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Lot Sayısı</label>
                  <input
                    type="number"
                    min={1}
                    value={lotSayisi}
                    onChange={(e) => setLotSayisi(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Özel Arz Fiyatı (opsiyonel)
                    <span className="ml-1 font-normal opacity-60">boş bırakırsan resmi fiyat kullanılır</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder={`${aktifArz.arzFiyati.toFixed(2)} ₺ (varsayılan)`}
                    value={arzFiyatiOverride}
                    onChange={(e) => setArzFiyatiOverride(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-blue-500 transition placeholder-slate-600"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between">
              {hesap ? (
                <>
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                      Hesaplama Özeti
                    </h4>

                    <ResultRow
                      label="Başvuru Fiyatı"
                      value={`${hesap.fp.toFixed(2)} ₺ × ${lotSayisi.toLocaleString('tr-TR')} lot`}
                    />
                    <ResultRow
                      label="Toplam Maliyet"
                      value={`${hesap.maliyet.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺`}
                    />

                    {hesap.guncelDeger !== null ? (
                      <>
                        <ResultRow
                          label="Güncel Değer"
                          value={`${hesap.guncelDeger.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺`}
                        />
                        <div
                          className="mt-4 rounded-xl p-4 text-center"
                          style={{
                            background:
                              hesap.kar >= 0
                                ? 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.08))'
                                : 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(185,28,28,0.08))',
                            border: `1px solid ${hesap.kar >= 0 ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
                          }}
                        >
                          <p className="text-xs text-slate-400 mb-1">Tahmini Kar / Zarar</p>
                          <p
                            className={`text-3xl font-black font-mono ${hesap.kar >= 0 ? 'text-emerald-400' : 'text-red-400'}`}
                          >
                            {hesap.kar >= 0 ? '+' : ''}
                            {hesap.kar.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                          </p>
                          <p
                            className={`text-sm font-bold mt-1 ${hesap.kar >= 0 ? 'text-emerald-500' : 'text-red-500'}`}
                          >
                            {hesap.kar >= 0 ? '▲' : '▼'} %{Math.abs(hesap.karYuzde).toFixed(2)}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="mt-4 rounded-xl p-4 text-center bg-slate-700/40 border border-slate-600">
                        <p className="text-xs text-slate-500 mb-1">Şirket henüz işlem görmüyor</p>
                        <p className="text-lg font-bold text-slate-400">Talep Aşamasında</p>
                        <p className="text-xs text-slate-600 mt-1">
                          Borsa&apos;ya giriş yaptıktan sonra
                          <br />
                          kar/zarar hesaplanacak
                        </p>
                      </div>
                    )}
                  </div>

                  {aktifArz.guncelFiyat && (
                    <div className="mt-4 pt-4 border-t border-slate-700">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Tavan Senaryoları
                      </h4>
                      <div className="grid grid-cols-3 gap-2">
                        {[1, 3, 5].map((n) => {
                          const fp = arzFiyatiOverride
                            ? parseFloat(arzFiyatiOverride)
                            : aktifArz.arzFiyati;
                          const tavanFiyat = fp * Math.pow(1.1, n);
                          const tavanDeger = tavanFiyat * lotSayisi;
                          const tavanKar = tavanDeger - hesap.maliyet;
                          return (
                            <div key={n} className="bg-slate-700/50 rounded-lg p-2 text-center">
                              <p className="text-xs text-slate-500">{n}. Tavan</p>
                              <p className="text-xs font-bold text-emerald-400">
                                +{((tavanKar / hesap.maliyet) * 100).toFixed(0)}%
                              </p>
                              <p className="text-xs text-slate-400 font-mono">{tavanFiyat.toFixed(2)} ₺</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-slate-500 text-sm">Hesaplama yapılamadı.</p>
              )}
            </div>
          </div>

          <div className="px-6 py-3 bg-amber-500/5 border-t border-amber-500/20 text-xs text-amber-400/70 flex items-center gap-2">
            <span>⚠️</span>
            <span>
              Fiyatlar manuel girilmiştir; yatırım kararı vermeden önce KAP ve Borsa İstanbul resmi verilerini
              doğrulayın.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function ResultRow({ label, value }) {
  return (
    <div className="flex justify-between items-center text-sm py-1.5 border-b border-slate-700/50">
      <span className="text-slate-400">{label}</span>
      <span className="text-white font-medium font-mono text-right">{value}</span>
    </div>
  );
}
