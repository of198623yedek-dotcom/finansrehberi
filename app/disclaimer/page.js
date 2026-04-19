'use client';

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        {/* Header */}
        <div className="mb-8 border-b-2 border-red-600 pb-6">
          <h1 className="text-4xl font-bold text-red-600 mb-2">⚠️ Yasal Uyarı & Disclaimer</h1>
          <p className="text-gray-600 text-lg">FinansRehberi - Finansal Bilgi Platformu</p>
          <p className="text-gray-500 text-sm mt-2">Son Güncelleme: 10 Nisan 2026</p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Yatırım Tavsiyesi Değildir (NOT FINANCIAL ADVICE - NFA)</h2>
            <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-4">
              <p className="text-red-800 font-semibold">
                ⚠️ FinansRehberi tarafından sağlanan tüm bilgiler, haberler, analizler ve veriler YATIRIMHıRZA SAYILMADİKTAR.
              </p>
            </div>
            <p className="text-gray-700 mb-4">
              Bu platform üzerinde yer alan içerik:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Herhangi bir finansal araçta yatırım yapmanız için tavsiye değildir</li>
              <li>Hisse senedi, kripto para, altın, döviz vb. alım-satım önerileri içermez</li>
              <li>Kişisel finansal hedefleriniz için rehberlik sağlamaz</li>
              <li>Vergi veya yasal danışmanlık anlamına gelmez</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Sorumluluk Reddi</h2>
            <p className="text-gray-700 mb-4">
              FinansRehberi ve sahibi/yöneticileri aşağıdakilerden sorumlu DEĞİLDİR:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Bu platform'da yer alan bilgilerin doğruluğu, eksiksizliği veya güncelliği</li>
              <li>Sağlanan verilerin kullanılması sonucu oluşan herhangi bir kayıp veya zarar</li>
              <li>Yapılan yatırımların başarısız olması nedeniyle ortaya çıkan maddi/manevi hasarlar</li>
              <li>Kripto para, hisse senedi, döviz veya diğer finansal araçlarda yaşadığınız kayıplar</li>
              <li>Sistem hatası, veri kaybı veya işlev bozukluğu sonucu oluşan hasarlar</li>
              <li>Üçüncü taraf tarafından sağlanan API veya veri kaynaklarının güvenilirliği</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Verinin Güvenilirliği</h2>
            <p className="text-gray-700 mb-4">
              Bu platform'da yer alan gerçek zamanlı finansal veriler:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Üçüncü taraf API ve haber servisleri tarafından sağlanmaktadır</li>
              <li>Gecikmeli veya yanlış olabilir</li>
              <li>Resmi kaynaklarla (BIST, TCMB, etc.) kontrol edilmelidir</li>
              <li>Gerçek alım-satım kararları için resmi finansal kaynaklar kullanılmalıdır</li>
            </ul>
            <p className="text-gray-700 mt-4 font-semibold">
              ✓ Ticari kararlar için her zaman resmi kaynak ve profesyonel danışmanlık alınız!
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Yasal Riskler</h2>
            <p className="text-gray-700 mb-4">
              Finansal Piyasalara ilişkin tavsiye veya yatırım yapmanız:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Yüksek risk taşır (kayıp tam olabilir)</li>
              <li>Geçmiş performans gelecek performansın garantisi değildir</li>
              <li>Vergi sonuçlarını içerir (TR: Gelir Vergisi, Banka Muhasebe Vergisi, vb.)</li>
              <li>Kişisel durumunuza göre uygun olmayabilir</li>
              <li>Yalnızca kendiniz sorumlu olursunuz</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Türkiye Yasal Uyarı</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 mb-4">
              <p className="text-yellow-800">
                Türkiye'de finansal tavsiye vermek için <strong>SPK (Sermaye Piyasası Kurulu)</strong> tarafından verilen lisans gerekmektedir. 
                FinansRehberi'nin böyle bir lisansı yoktur.
              </p>
            </div>
            <p className="text-gray-700 mb-2">
              Yatırım danışmanlığı için yetkili kuruluşlara başvurunuz:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>📍 SPK Lisanslı Aracı Kurumlar</li>
              <li>📍 Banka Yatırım Danışmanları</li>
              <li>📍 Bağımsız Mali Müşavirler (Chartered Financial Planner)</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Kripto Para Uyarısı</h2>
            <div className="bg-orange-50 border-l-4 border-orange-600 p-4 mb-4">
              <p className="text-orange-800 font-semibold">
                Kripto paralar yüksek riski finansal araçlardır ve henüz tam olarak düzenlenmiş değildir.
              </p>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Volatilite çok yüksektir (%50+ günlük değişim mümkündür)</li>
              <li>Kayıp riskiniz yüksektir</li>
              <li>Türkiye'de vergi konusu halen belirsizdir</li>
              <li>Saatlik takip gerektirir (uzun vadeli tutuş riski)</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Platform Kullanım Şartları</h2>
            <p className="text-gray-700 mb-4">
              Bu platformu kullanarak:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Bu disclaimer'ı kabul etmiş sayılırsınız</li>
              <li>Olası zararlardan FinansRehberi'ni sorumlu tutamazsınız</li>
              <li>Yaptığınız yatırımların sonuçlarından siz sorumlusunuz</li>
              <li>Aldığınız kararlar tamamen kendi inisiyatifinizdedir</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. İletişim & Sorular</h2>
            <p className="text-gray-700 mb-4">
              Bu disclaimer hakkında sorusu olan kullanıcılar:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Email: info@finans-rehberi.com (örnek)</li>
              <li>Hukuki danışmanlık için: Kendi avukatınıza danışınız</li>
              <li>Finansal danışmanlık için: SPK lisanslı şirketlere danışınız</li>
            </ul>
          </section>

          {/* Final Warning */}
          <div className="bg-red-100 border-2 border-red-600 rounded-lg p-6 text-center mt-8">
            <p className="text-red-900 font-bold text-xl mb-2">
              ⚠️ ÖNEMLİ ⚠️
            </p>
            <p className="text-red-800 text-lg">
              Eğer finansal kararlarını kolay ve garantili olarak alıp, "zengin olmak"ı düşünüyorsan, 
              <br />
              <span className="font-bold">LÜTFEN BU PLATFORMU KULLLANMA!</span>
            </p>
            <p className="text-red-700 mt-4">
              Finansal piyasalar risklidir. Sadece kaybetmeyi göze alabileceğin parayı yatır.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-500 text-sm text-center">
            Bu Disclaimer, FinansRehberi'ni yatırım tavsiyesi verme sorumluluğundan korumak içindir. 
            Tüm yatırım kararları tamamen sizin sorumluluğunuzdadır.
          </p>
          <p className="text-gray-500 text-sm text-center mt-2">
            © 2026 FinansRehberi. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </div>
  );
}
