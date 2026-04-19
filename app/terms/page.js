'use client';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        {/* Header */}
        <div className="mb-8 border-b-2 border-blue-600 pb-6">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">📋 Kullanım Şartları</h1>
          <p className="text-gray-600 text-lg">FinansRehberi - Hizmet Şartları</p>
          <p className="text-gray-500 text-sm mt-2">Son Güncelleme: 10 Nisan 2026</p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Hizmet Tanımı</h2>
            <p className="text-gray-700 mb-4">
              FinansRehberi ("Platform"), aşağıdaki hizmetleri sunan bir informasyon platformudur:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Gerçek zamanlı finansal veriler (BIST, döviz, altın, kripto)</li>
              <li>Finansal haberler ve analitikler</li>
              <li>Eğitici içerik ve rehberler</li>
              <li>Finansal araçlar ve hesaplayıcılar</li>
            </ul>
            <p className="text-gray-700 mt-4 font-semibold">
              Platform NEDİR değil: Yatırım danışmanlığı, ticaret platformu veya broker hizmeti
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Kullanıcı Sorumlulukları</h2>
            <p className="text-gray-700 mb-4">
              Platform'u kullanarak şu sorumlulukları kabul edersiniz:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Platforma sağladığınız bilgiler doğru ve yasal olmalıdır</li>
              <li>Platform'u yasa dışı veya zararlı amaçlar için kullanamazsınız</li>
              <li>Diğer kullanıcıların haklarını ihlal etmeyeceksiniz</li>
              <li>Virüs, kötü amaçlı kod veya spam göndermeyeceksiniz</li>
              <li>Platform'un kaynaklarını haksız kullanmayacaksınız (bot, scraping, vb.)</li>
              <li>Telif hakkı ve fikri mülkiyet haklarına saygı göstereceksiniz</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Fikri Mülkiyet Hakları</h2>
            <p className="text-gray-700 mb-4">
              Platform üzerinde yer alan tüm içerik (metinler, görseller, veri, kod, vb.):
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>FinansRehberi veya lisans sahibi tarafından korunmaktadır</li>
              <li>Telif hakkı © 2026 FinansRehberi. Tüm hakları saklıdır</li>
              <li>Rıza olmaksızın çoğaltılamaz, dağıtılamaz veya değiştirilemez</li>
              <li>Kişisel kullanım dışında ticari kullanımı yasaktır</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Üçüncü taraf kaynaklardan alınan içerik ilgili haklar sahibi tarafından korunmaktadır.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Veri Doğruluğu ve Disclaimer</h2>
            <p className="text-gray-700 mb-4">
              Platform'da yer alan veriler hakkında:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Üçüncü taraf API'ler tarafından sağlanan verilerdir</li>
              <li>Gecikmeli, eksik veya yanlış olabilir</li>
              <li>Garanti verilmez ve olduğu gibi ("AS IS") sunulur</li>
              <li>Önemli kararlar için resmi kaynaklarla doğrulanmalıdır</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Sorumluluk Sınırlaması</h2>
            <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-4">
              <p className="text-red-800 font-semibold">
                FinansRehberi, platform'un kullanımı veya kullanılamaması sonucu 
                oluşan herhangi bir hasardan sorumlu DEĞİLDİR.
              </p>
            </div>
            <p className="text-gray-700 mb-4">
              Buna dahil ancak sınırlı olmamak üzere:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Veri kaybı</li>
              <li>Yatırım kayıpları</li>
              <li>Mal ve hizmet kayıpları</li>
              <li>İş kesintileri</li>
              <li>Dolaylı, özel veya cezai hasarlar</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Hizmetin Kesintiye Uğrabilmesi</h2>
            <p className="text-gray-700 mb-4">
              FinansRehberi, aşağıdakiler de dahil olmak üzere platform'u kesintiye uğratabilir:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Planlı bakım ve yükseltmeler</li>
              <li>Acil durum ve güvenlik sorunları</li>
              <li>API veya veri kaynakları kullanılamaz olduğunda</li>
              <li>Sistem hatası veya aşırı yük</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Kesintiler nedeniyle meydana gelen zararlar için FinansRehberi sorumlu değildir.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Gizlilik ve Veri Koruması</h2>
            <p className="text-gray-700 mb-4">
              Kullanıcı verilerinin işlenmesi:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Privacy Policy'ye uygun olarak yapılır</li>
              <li>Türkiye Kişisel Verileri Koruma Kanunu (KVKK) ile uyumludur</li>
              <li>Veri güvenliği için makul önlemler alınır</li>
              <li>Üçüncü taraflarla izin olmadan paylaşılmaz</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Detaylı bilgi için Privacy Policy'yi okuyunuz.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Dış Bağlantılar (Links)</h2>
            <p className="text-gray-700 mb-4">
              Platform, üçüncü taraf web sitelerine bağlantılar içerebilir:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>FinansRehberi bu site'leri kontrol etmez</li>
              <li>Bu site'lerin içeriğinden sorumlu değildir</li>
              <li>Dış site'lerdeki işlemlerden sorumlu değildir</li>
              <li>Dış site'lerin gizlilik politikaları FinansRehberi'ye bağlı değildir</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Dış site'leri kullanmadan önce kendi şartlarını okuyunuz.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Yasalar ve Yetki</h2>
            <p className="text-gray-700 mb-4">
              Bu şartlar:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Türkiye Cumhuriyeti yasalarına tabidir</li>
              <li>Anlaşmazlıklar İstanbul Mahkemelerinde çözülür</li>
              <li>Türkçe versiyon esas kabul edilir</li>
            </ul>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Değişiklikler ve Güncellemeler</h2>
            <p className="text-gray-700 mb-4">
              FinansRehberi, bu şartları istediği zaman değiştirebilir:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Değişiklikler platform'da yayınlanarak bildirilir</li>
              <li>Önemli değişiklikler email ile uyarılabilir</li>
              <li>Platform'u kullanmaya devam etmek = yeni şartları kabul etmek</li>
            </ul>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Kullanıcı Hesabı</h2>
            <p className="text-gray-700 mb-4">
              Eğer platform'da hesap oluşturursanız:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Doğru ve güncel bilgi sağlamalısınız</li>
              <li>Hesabınızın güvenliğinden sorumlusunuz</li>
              <li>Şifrenizi gizli tutmalısınız</li>
              <li>Hesabınızda yapılan işlemlerden sorumlusunuz</li>
              <li>Hesap kapatmak için isteğiniz kabul edilirse silinir</li>
            </ul>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. İletişim</h2>
            <p className="text-gray-700 mb-4">
              Bu şartlar hakkında sorularınız için:
            </p>
            <p className="text-gray-700 ml-4">
              📧 Email: info@finans-rehberi.com (örnek)<br/>
              🌐 Web: www.finans-rehberi.com
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-500 text-sm text-center">
            Bu Kullanım Şartlarını kabul ederek Platform'u kullanıyorsunuz.
          </p>
          <p className="text-gray-500 text-sm text-center mt-2">
            © 2026 FinansRehberi. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </div>
  );
}
