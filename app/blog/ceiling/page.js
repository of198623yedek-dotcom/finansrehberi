'use client';

import Link from 'next/link';

export default function CeilingSeriesBlog() {
  return (
    <article className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900">
      {/* Hero Section */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🎯</span>
            <span className="text-orange-400 font-semibold">Borsa Rehberi</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Tavan Serisi Rehberi: %10 Artışlarla Kazanç Hesaplama
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Borsa hisselerinde tavan limitlerinin ne olduğunu, nasıl çalıştığını ve kazanç potansiyelini hesaplamayı öğrenin.
          </p>
          <div className="flex flex-wrap gap-4 text-slate-400">
            <span>📅 7 Nisan 2026</span>
            <span>⏱️ 19 dakika okuma</span>
            <span>✍️ Finans Rehberi</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-invert max-w-none">
          {/* Başlangıç */}
          <div className="bg-slate-800/50 rounded-xl p-8 mb-12 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">Tavan Serisi Nedir?</h2>
            <p className="text-slate-300 mb-4">
              Tavan Serisi (Ceiling Series), borsa&apos;da hisse senetlerinin günlük fiyat hareketlerini sınırlandırmak için kullanılan bir mekanizmadır. 
              Türkiye&apos;deki Borsa İstanbul&apos;da, hisse senedi fiyatı bir günde maksimum %10 oranında artabilir.
            </p>
            <p className="text-slate-300 mb-4">
              Örneğin, bir hisse senedinin günün açılış fiyatı 100 TL ise, o gün içinde maksimum 110 TL&apos;ye kadar çıkabilir. 
              Fiyat 110 TL&apos;ye ulaştığında tavan kırılmış olur ve ertesi gün yeni bir tavan başlar.
            </p>
            <div className="bg-indigo-900/30 border-l-4 border-indigo-500 pl-4 py-2">
              <p className="text-indigo-200">
                💡 <strong>Neden böyle bir sistem var?</strong> Bu sistem, pazar istikrarını sağlamak ve aşırı volatiliteyi kontrol etmek için tasarlanmıştır.
              </p>
            </div>
          </div>

          {/* Tavan Serisi Mekanizması */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Tavan Serisi Nasıl Çalışır?</h2>
            
            <div className="space-y-4">
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">1. Gün Adımı</h3>
                <p className="text-slate-300 mb-3">
                  Her pazar günü, hisse senedi yeni bir fiyattan başlar. Diyelim ki AAPL 100 TL&apos;den açılıyor.
                </p>
                <div className="bg-slate-900 p-3 rounded font-mono text-sm text-slate-300">
                  Gün 1 Açılış: 100 TL → 1. Tavan: 110 TL
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">2. Tavan Kırılması</h3>
                <p className="text-slate-300 mb-3">
                  Hisse fiyatı 110 TL&apos;ye ulaştığında, 1. Tavan kırılmış olur. 
                  Ertesi gün, yeni taban 110 TL olur ve 2. Tavan 121 TL olacaktır.
                </p>
                <div className="bg-slate-900 p-3 rounded font-mono text-sm text-slate-300">
                  Gün 2 Açılış: 110 TL → 2. Tavan: 121 TL (+10%)
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">3. Sürekli Artış</h3>
                <p className="text-slate-300 mb-3">
                  Bu sistem devam eder. Her tavanın kırılması, ertesi günün yeni tabanını oluşturur.
                </p>
                <div className="bg-slate-900 p-3 rounded font-mono text-sm text-slate-300 space-y-1">
                  <div>Gün 3 Açılış: 121 TL → 3. Tavan: 133 TL</div>
                  <div>Gün 4 Açılış: 133 TL → 4. Tavan: 146 TL</div>
                  <div>... ve böyle devam eder</div>
                </div>
              </div>
            </div>
          </div>

          {/* Formülü */}
          <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 rounded-xl p-8 mb-12 border border-purple-500/30">
            <h2 className="text-2xl font-bold text-white mb-6">Matematiksel Formül</h2>
            <p className="text-slate-300 mb-6">
              N. Tavan&apos;ın fiyatını hesaplamak için şu formülü kullanırız:
            </p>
            <div className="bg-slate-900 rounded-lg p-6 mb-6 font-mono text-center text-lg">
              <p className="text-purple-300 mb-4">
                <strong>N. Tavan Fiyatı = Başlangıç Fiyatı × 1.1<sup>n</sup></strong>
              </p>
              <p className="text-slate-400 text-sm">
                (Başlangıç Fiyatı, her tavanın başlangıcındaki fiyattır)
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-800/50 rounded p-4">
                <p className="text-slate-400 text-sm mb-2">Örnek Hesaplama:</p>
                <div className="font-mono text-sm text-slate-300 space-y-1">
                  <div>Başlangıç: 100 TL</div>
                  <div>1. Tavan: 100 × 1.1¹ = 110 TL</div>
                  <div>5. Tavan: 100 × 1.1⁵ = 161 TL</div>
                  <div>10. Tavan: 100 × 1.1¹⁰ = 259 TL</div>
                  <div>21. Tavan: 100 × 1.1²¹ = 865 TL</div>
                </div>
              </div>
              <div className="bg-slate-800/50 rounded p-4">
                <p className="text-slate-400 text-sm mb-2">Kazanç Yüzdesi:</p>
                <div className="font-mono text-sm text-green-300 space-y-1">
                  <div>1. Tavan: +10%</div>
                  <div>5. Tavan: +61%</div>
                  <div>10. Tavan: +159%</div>
                  <div>21. Tavan: +765%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pratik Örnek */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Pratik Örnek: 100 Lot Satın Alma</h2>
            <p className="text-slate-300 mb-6">
              Diyelim ki hisse fiyatı 50 TL&apos;den 100 lot satın aldınız. Yatırım tutarınız: 5.000 TL
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                    <th className="px-4 py-3 text-left">Tavan</th>
                    <th className="px-4 py-3 text-right">Hisse Fiyatı</th>
                    <th className="px-4 py-3 text-right">Portföy Değeri</th>
                    <th className="px-4 py-3 text-right">Kazanç</th>
                    <th className="px-4 py-3 text-right">Yüzde</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {[1, 2, 3, 5, 10, 15, 21].map((n) => {
                    const price = 50 * Math.pow(1.1, n);
                    const value = price * 100;
                    const gain = value - 5000;
                    const percent = ((value / 5000) - 1) * 100;
                    return (
                      <tr key={n} className={percent > 100 ? 'bg-green-900/20' : percent > 50 ? 'bg-emerald-900/20' : 'bg-slate-800/30'}>
                        <td className="px-4 py-3 text-slate-300 font-semibold">{n}. Tavan</td>
                        <td className="px-4 py-3 text-right text-slate-300 font-mono">{price.toFixed(2)} TL</td>
                        <td className="px-4 py-3 text-right text-slate-300 font-mono">{Math.floor(value).toLocaleString('tr-TR')} TL</td>
                        <td className="px-4 py-3 text-right text-green-400 font-mono font-semibold">+{Math.floor(gain).toLocaleString('tr-TR')} TL</td>
                        <td className="px-4 py-3 text-right text-green-400 font-mono font-bold">+{percent.toFixed(1)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-slate-400 text-sm mt-4">
              💡 Görülüyor ki 21. tavana kadar gidilirse, yatırım 5 katından fazla değer kazanır!
            </p>
          </div>

          {/* Önemli Noktalar */}
          <div className="bg-indigo-900/20 rounded-xl p-8 mb-12 border border-indigo-500/30">
            <h2 className="text-2xl font-bold text-white mb-6">⚠️ Önemli Noktalar</h2>
            <ul className="space-y-3 text-slate-300">
              <li className="flex gap-3">
                <span className="text-indigo-400 font-bold">✓</span>
                <span><strong>Tavan Hergün Sıfırlanır:</strong> Tavanlar sadece pazar saatleri içinde geçerlidir. Pazar kapandığında tavanlar sıfırlanır.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-indigo-400 font-bold">✓</span>
                <span><strong>Taban Yok:</strong> Düşüş için bir limit yoktur! Hisse %50, %60 hatta daha da düşebilir.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-indigo-400 font-bold">✓</span>
                <span><strong>Likidite Sorunu:</strong> Çok güçlü tavanlar yaşayan hisseler satmakta zorluk çekebilir.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-indigo-400 font-bold">✓</span>
                <span><strong>Zamanla Hafifler:</strong> Her gün tavan kırıldıkça, yeni yatırımcılar girmek isteyebilir.</span>
              </li>
            </ul>
          </div>

          {/* Yatırım Stratejileri */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Tavan Serilerinden Para Kazanma Stratejileri</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-green-400 mb-3">✓ Momentum Stratejisi</h3>
                <p className="text-slate-300 text-sm mb-3">
                  Güçlü tavanlar yaşayan hisseleri erken satın al, takip et ve her tavan kırıldığında kar al.
                </p>
                <div className="bg-slate-900/50 rounded p-3 text-xs text-slate-400">
                  Risik: Çok yüksek. Zamanlaması kritiktir.
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">⚡ Ayarlanmış Al-Tut</h3>
                <p className="text-slate-300 text-sm mb-3">
                  Üç-beş tavanın ardından, kar elde tutarak gözlemle. Tavanlar yavaşlarsa sat.
                </p>
                <div className="bg-slate-900/50 rounded p-3 text-xs text-slate-400">
                  Risk: Orta. Daha güvenli ama başlangıç karını kaçırabilirsin.
                </div>
              </div>
            </div>
          </div>

          {/* Araçlar */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-8 mb-12 border border-slate-600">
            <h2 className="text-2xl font-bold text-white mb-4">🛠️ Hesaplama Aracımızı Kullan</h2>
            <p className="text-slate-300 mb-6">
              Tavan Serisi Hesaplama aracımız ile anında tüm tavanları ve kazanç potansiyelini hesapla:
            </p>
            <Link
              href="/tools/ceiling"
              className="inline-block bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
            >
              🎯 Tavan Serisi Hesaplama Aracına Git
            </Link>
          </div>

          {/* Sonuç */}
          <div className="bg-purple-900/20 rounded-xl p-8 border border-purple-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">Sonuç</h2>
            <p className="text-slate-300 mb-4">
              Tavan Serisi, borsa&apos;da fiyat hareketlerini anlamak için çok önemli bir konsepttir. 
              Doğru stratejiler ile bu mekanizmayı kullanarak kazanç elde edebilirsin.
            </p>
            <p className="text-slate-300">
              Ancak unutma: Her zaman risk yönetimi yap, stop-loss belirle ve duygusal kararlar alma. 
              <strong> Hiçbir şey garanti değildir!</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Diğer Araçlar */}
      <section className="border-t border-slate-800 bg-slate-900/50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Diğer Ticaret Araçlarımız</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/tools/profit"
              className="bg-slate-800 hover:bg-slate-700 p-4 rounded-lg transition text-slate-300 hover:text-white"
            >
              💰 Kar Hesapla
            </Link>
            <Link
              href="/tools/lot"
              className="bg-slate-800 hover:bg-slate-700 p-4 rounded-lg transition text-slate-300 hover:text-white"
            >
              📊 Lot Hesapla
            </Link>
            <Link
              href="/tools/compound"
              className="bg-slate-800 hover:bg-slate-700 p-4 rounded-lg transition text-slate-300 hover:text-white"
            >
              📈 Bileşik Faiz
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
