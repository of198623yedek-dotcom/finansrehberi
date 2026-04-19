import AffiliateCard from '@/app/components/AffiliateCard';

export const metadata = {
  title: 'IPO Listeleri - FinansRehberi',
  description: 'Yaklaşan ve devam eden IPO listesi. Yeni halka arzlar hakkında bilgi ve ticaret fırsatları.',
};

const mockIPOs = [
  {
    id: 1,
    company: 'TechVision AI',
    sector: 'Yapay Zeka',
    expectedDate: '2026-05-15',
    priceRange: '$18-22',
    description: 'Yapay zeka ve makine öğrenmesi çözümleri',
    logo: '🤖',
  },
  {
    id: 2,
    company: 'GreenEnergy Solutions',
    sector: 'Enerji',
    expectedDate: '2026-06-01',
    priceRange: '$25-30',
    description: 'Yenilenebilir enerji teknolojileri',
    logo: '⚡',
  },
  {
    id: 3,
    company: 'BioHealth Pharma',
    sector: 'İlaç',
    expectedDate: '2026-06-20',
    priceRange: '$20-25',
    description: 'Biyoteknoloji ve ilaç geliştirme',
    logo: '💊',
  },
  {
    id: 4,
    company: 'CloudBase Systems',
    sector: 'Bulut Bilişim',
    expectedDate: '2026-07-10',
    priceRange: '$28-35',
    description: 'Bulut altyapısı ve veri merkezi hizmetleri',
    logo: '☁️',
  },
  {
    id: 5,
    company: 'FintechWallet Pro',
    sector: 'FinTech',
    expectedDate: '2026-08-05',
    priceRange: '$15-20',
    description: 'Dijital cüzdan ve ödeme çözümleri',
    logo: '💰',
  },
  {
    id: 6,
    company: 'QuantumCompute Inc',
    sector: 'Teknoloji',
    expectedDate: '2026-08-25',
    priceRange: '$40-50',
    description: 'Kuantum bilgisayar araştırması ve geliştirmesi',
    logo: '💻',
  },
];

export default function IPOPage() {
  const upcomingIPOs = mockIPOs.sort((a, b) => new Date(a.expectedDate) - new Date(b.expectedDate));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            IPO (Halka Arz) Listeleri
          </h1>
          <p className="text-slate-400 text-lg">
            Yaklaşan ve devam eden halka arzlar. Yeni yatırım fırsatlarını keşfet.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Info Banner */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-12">
          <p className="text-blue-300">
            💡 <strong>IPO Nedir?</strong> İlk Halka Arz (IPO), özel bir şirketin hisse senetlerini ilk kez kamuya açmasıdır. Yatırımcılar bu şirketlerde pay sahibi olabilirler.
          </p>
        </div>

        {/* IPO Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {upcomingIPOs.map((ipo) => (
            <div
              key={ipo.id}
              className="group relative p-6 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10"
            >
              {/* Logo & Company */}
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{ipo.logo}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">{ipo.company}</h3>
                  <p className="text-sm text-slate-400">{ipo.sector}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-300 mb-4">{ipo.description}</p>

              {/* Details */}
              <div className="space-y-3 mb-6 pb-6 border-b border-slate-700">
                <div>
                  <p className="text-xs text-slate-500 uppercase">Beklenen Tarih</p>
                  <p className="text-white font-semibold">
                    {new Date(ipo.expectedDate).toLocaleDateString('tr-TR')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase">Fiyat Aralığı</p>
                  <p className="text-white font-semibold">{ipo.priceRange}</p>
                </div>
              </div>

              {/* CTA */}
              <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
                Uyarı Ayarla
              </button>
            </div>
          ))}
        </div>

        {/* Trading Platforms */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8">IPO&apos;lar Üzerinden Ticaret Yap</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AffiliateCard
              broker="Binance"
              url="https://accounts.binance.com/register?ref=your_ref_id"
              description="Kripto para IPO'ları"
            />
            <AffiliateCard
              broker="eToro"
              url="https://etoro.com"
              description="Hisse senedi halka arzları"
            />
            <AffiliateCard
              broker="Crypto.com"
              url="https://crypto.com"
              description="Kripto projesi ön satış"
            />
          </div>
        </div>

        {/* Tips */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-4">✓ IPO Başarı İpuçları</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex gap-3">
                <span className="text-emerald-400">✓</span>
                <span>Şirketin finansal raporlarını okuyun</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-400">✓</span>
                <span>İşletme modelini ve rekabeti anlayın</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-400">✓</span>
                <span>Fiyat aralığını önceki halka arzlarla karşılaştırın</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-400">✓</span>
                <span>Yönetim ekibinin deneyimini kontrol edin</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-4">⚠️ IPO Riskleri</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex gap-3">
                <span className="text-red-400">⚠</span>
                <span>Yeni şirketler daha riskli ve değişkendirler</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400">⚠</span>
                <span>Likidite başlangıçta sınırlı olabilir</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400">⚠</span>
                <span>Aşırı hype&apos;a rağmen düşebilirler</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400">⚠</span>
                <span>Yeterli araştırma yapın, duygularla karar vermeyin</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
