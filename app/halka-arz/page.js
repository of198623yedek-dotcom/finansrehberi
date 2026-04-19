'use client';

import HalkaArzPaneli from '@/app/components/HalkaArzPaneli';
import Link from 'next/link';

// ─── Özet İstatistikler ────────────────────────────────────────────────────
const ISTATISTIKLER = [
  { label: 'Toplam Kayıtlı Arz', deger: '8', ikon: '📋', renk: 'text-blue-400' },
  { label: 'Aktif Talep Toplama', deger: '2', ikon: '🔥', renk: 'text-orange-400' },
  { label: 'En Yüksek Getiri', deger: '%233', ikon: '🚀', renk: 'text-emerald-400' },
  { label: 'Ort. İlk Gün Artışı', deger: '%28', ikon: '📈', renk: 'text-purple-400' },
];

// ─── Bilgi Kartları ────────────────────────────────────────────────────────
const BILGI_KARTLARI = [
  {
    baslik: '💡 Halka Arz Nedir?',
    icerik:
      "Halka arz (IPO), özel bir şirketin hisselerini ilk kez halka açmasıdır. Yatırımcılar şirkete ortak olup büyümeden pay alır. BIST'te arz fiyatı SPK onayı ile belirlenir.",
  },
  {
    baslik: '📈 Tavan Nedir?',
    icerik:
      "Borsa İstanbul'da hisseler günde en fazla %10 yükselebilir. Arka arkaya tavan yapan hisseler başlangıç fiyatının birkaç katına çıkabilir. Tavan süresi kırılınca yeni taban belirlenir.",
  },
  {
    baslik: '📝 Başvuru Süreci',
    icerik:
      'Talep toplama döneminde banka veya aracı kurum üzerinden başvurulur. Talep miktarına göre tahsis yapılır. Genellikle küçük yatırımcıya öncelik tanınır.',
  },
  {
    baslik: '⚠️ Risk Uyarısı',
    icerik:
      'Her halka arz karlı değildir. Şirket analizini mutlaka yapın, izahnameyi okuyun ve sadece kaybetmeyi göze alabileceğiniz miktarda başvuru yapın.',
  },
];

// Not: Header ve Footer root layout (ClientLayout) içinde zaten var; tekrar eklenmez.

export default function HalkaArzPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <section className="relative bg-gradient-to-b from-slate-800 to-slate-900 border-b border-slate-700/60 overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none select-none" aria-hidden>
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-purple-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-xs font-semibold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">
                  Güncel IPO paneli
                </span>
                <span className="text-xs text-slate-500">
                  Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-2">🚀 Halka Arz (IPO) Paneli</h1>
              <p className="text-slate-400 max-w-xl">
                Yaklaşan ve güncel BIST halka arzlarını takip edin. Kar/zarar hesaplayıcı, tavan senaryoları ve IPO
                takvimi ile kararlarınızı destekleyin.
              </p>
            </div>

            <Link
              href="/tools/ceiling"
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 border border-orange-500/30 rounded-lg text-sm font-semibold transition"
            >
              🎯 Tavan Serisi Hesap
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
            {ISTATISTIKLER.map((s, i) => (
              <div key={i} className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 text-center">
                <p className="text-xl mb-1" aria-hidden>
                  {s.ikon}
                </p>
                <p className={`text-2xl font-black ${s.renk}`}>{s.deger}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <HalkaArzPaneli />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {BILGI_KARTLARI.map((k, i) => (
            <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-5">
              <h3 className="font-bold text-white mb-2 text-sm">{k.baslik}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{k.icerik}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-slate-800/40 border border-slate-700/60 rounded-xl p-5 flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="text-3xl" aria-hidden>
            🏦
          </div>
          <div>
            <p className="text-sm font-bold text-slate-200 mb-1">Hangi Aracı Kurumdan Başvurabilirim?</p>
            <p className="text-xs text-slate-400">
              Garanti BBVA Yatırım, İş Yatırım, Yapı Kredi Yatırım, Deniz Yatırım, Ata Yatırım ve diğer SPK lisanslı
              kurumlar üzerinden talep toplanabilir. Her arzın konsorsiyum üyeleri KAP&apos;ta ilan edilir.
            </p>
          </div>
          <a
            href="https://www.kap.org.tr"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-xs px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition"
          >
            KAP&apos;a Git →
          </a>
        </div>

        <div className="mt-8 p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
          <p className="text-xs text-amber-400/80">
            <strong>⚠️ Yasal Uyarı:</strong> Bu sayfa yalnızca eğitim ve takip amaçlıdır. Gösterilen fiyatlar ve
            getiriler gerçek veya güncel olmayabilir. Gerçek yatırım kararları almadan önce KAP, Borsa İstanbul ve SPK
            kaynaklarını inceleyin; gerektiğinde lisanslı finansal danışmana başvurun. Geçmiş getiri, gelecekteki
            sonuçları garanti etmez.
          </p>
        </div>
      </main>
    </div>
  );
}
