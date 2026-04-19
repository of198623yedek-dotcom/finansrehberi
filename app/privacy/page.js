'use client';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        {/* Header */}
        <div className="mb-8 border-b-2 border-green-600 pb-6">
          <h1 className="text-4xl font-bold text-green-600 mb-2">🔒 Gizlilik Politikası</h1>
          <p className="text-gray-600 text-lg">FinansRehberi - Veri Gizliliği</p>
          <p className="text-gray-500 text-sm mt-2">Son Güncelleme: 10 Nisan 2026</p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Giriş</h2>
            <p className="text-gray-700 mb-4">
              FinansRehberi ("biz" veya "Platform"), kullanıcıların gizliliğine saygı gösterir. 
              Bu Gizlilik Politikası, kişisel verilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu açıklar.
            </p>
            <p className="text-gray-700">
              Bu politika Türkiye'nin <strong>Kişisel Verileri Koruma Kanunu (KVKK)</strong> ile uyumludur.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Toplanan Kişisel Veriler</h2>
            <p className="text-gray-700 mb-4">
              Aşağıdaki bilgileri toplayabiliriz:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Hesap Bilgileri:</strong> Ad, e-posta, telefon (isteğe bağlı)</li>
              <li><strong>Kullanım Verileri:</strong> Ziyaret edilen sayfalar, tıklamalar, oturumlar</li>
              <li><strong>Teknik Veriler:</strong> IP adresi, tarayıcı türü, işletim sistemi</li>
              <li><strong>Çerezler:</strong> Tercihler, oturum bilgileri, analitik</li>
              <li><strong>İletişim:</strong> E-posta sorguları, geri bildirimler, şikayetler</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Veriler Nasıl Toplanır?</h2>
            <p className="text-gray-700 mb-4">
              Verileriniz şu yollarla toplanır:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Doğrudan:</strong> Hesap oluşturduğunuzda sağladığınız bilgiler</li>
              <li><strong>Otomatik:</strong> Tarayıcı ve cihaz bilgileri (çerezler, analytics)</li>
              <li><strong>Üçüncü Taraf:</strong> Google Analytics, reklam ağları, sosyal medya</li>
              <li><strong>Türev:</strong> Verilerden hesaplanan veriler (örn: davranış analizi)</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Veriler Neden Toplanır?</h2>
            <p className="text-gray-700 mb-4">
              Verilerinizi şu amaçlarla kullanırız:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>📊 Platform hizmetini sunmak ve geliştirmek</li>
              <li>📱 Kullanıcı deneyimini kişiselleştirmek</li>
              <li>📧 Haberler, güncellemeler ve tanıtım göndermek</li>
              <li>🔒 Güvenlik ve dolandırıcılığı önlemek</li>
              <li>📈 Platform performansını analiz etmek</li>
              <li>⚖️ Yasal zorunlulukları yerine getirmek</li>
              <li>💬 Müşteri desteği sağlamak</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Veriler Kiminle Paylaşılır?</h2>
            <p className="text-gray-700 mb-4">
              Verileriniz aşağıdakiler tarafından işlenebilir:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>İçerik Sağlayıcılar:</strong> API servisleri (BIST, döviz, kripto verisi)</li>
              <li><strong>Analytics:</strong> Google Analytics (anonim)</li>
              <li><strong>Reklam Ağları:</strong> Google AdSense, reklam ortakları</li>
              <li><strong>Bulut Hizmetleri:</strong> Vercel, Supabase (sunucu ve depolama)</li>
              <li><strong>Yasal Makamlar:</strong> Mahkeme kararı durumunda</li>
            </ul>
            <p className="text-gray-700 mt-4">
              ⚠️ Hiçbir durumda verileriniz sizin rızanız olmaksızın üçüncü taraflara satılmaz.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Verileriniz Ne Kadar Tutulur?</h2>
            <p className="text-gray-700 mb-4">
              Veriler tutulma süresi:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Hesap Bilgileri:</strong> Hesap kapanana kadar (silinebilir)</li>
              <li><strong>Çerezler:</strong> Tarayıcı kapanana kadar (veya 30 gün)</li>
              <li><strong>Analytics:</strong> Maksimum 26 ay</li>
              <li><strong>Yasal:</strong> Vergi / hukuki talepler için gerekli süre</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Hesabınızı silmek isterseniz, platform'dan talebte bulunabilirsiniz.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Çerezler (Cookies)</h2>
            <p className="text-gray-700 mb-4">
              Platform aşağıdaki çerez türlerini kullanır:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Zorunlu:</strong> Oturum açma, güvenlik</li>
              <li><strong>İşlevsel:</strong> Tercihler, dil ayarları</li>
              <li><strong>Analytics:</strong> Google Analytics (anonim)</li>
              <li><strong>Pazarlama:</strong> Google AdSense, retargeting</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Çerezleri tarayıcı ayarlarından devre dışı bırakabilirsiniz 
              (ancak bazı işlevler çalışmayabilir).
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Veri Güvenliği</h2>
            <p className="text-gray-700 mb-4">
              Verilerinizi korumak için:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>🔐 SSL/TLS şifrelemesi kullanırız</li>
              <li>🔒 Şifreler hash'lenmiş olarak depolanır</li>
              <li>🚨 Güvenlik açıkları için izlemesi yapılır</li>
              <li>📋 Verilere erişim sınırlandırılır</li>
              <li>⚠️ Veri ihlali durumunda uyarılırsınız</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Ancak, internet üzerinde %100 güvenlik garantilenemez.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Kullanıcı Hakları</h2>
            <p className="text-gray-700 mb-4">
              KVKK kapsamında size verilen haklar:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>✅ <strong>Erişim Hakkı:</strong> Kişisel verilerinizi öğrenme</li>
              <li>✏️ <strong>Düzeltme Hakkı:</strong> Yanlış verileri düzeltme</li>
              <li>🗑️ <strong>Silme Hakkı:</strong> Verileri silme talebinde bulunma</li>
              <li>🚫 <strong>Sınırlama Hakkı:</strong> İşlemeyi durdurma talebi</li>
              <li>📤 <strong>Aktarım Hakkı:</strong> Verilerinizi başka platforma aktarma</li>
              <li>🙅 <strong>İtiraz Hakkı:</strong> Verilerinizin kullanılmasına itiraz</li>
              <li>🤖 <strong>Otomatik Karar Alma Hakkı:</strong> Elle inceleme talebinde bulunma</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Bu hakları kullanmak için info@finans-rehberi.com adresine başvurunuz.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Kişi Dışı Veriler</h2>
            <p className="text-gray-700 mb-4">
              Platform aşağıdaki kişi dışı verileri toplayabilir (hangi politika kapsamında değil):
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Toplam ziyaretçi sayısı</li>
              <li>Sayfa görünüşleri (toplam)</li>
              <li>En popüler sayfalar</li>
              <li>Platformda harcanan ortalama zaman</li>
            </ul>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Minör Koruma</h2>
            <p className="text-gray-700 mb-4">
              Platform, 18 yaşından küçüklerin kullanımına yönelik değildir. Eğer ebeveyn/vasi iseniz 
              ve çocuğunuzun kişisel verisi toplanmışsa, platform'la iletişime geçiniz.
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Değişiklikler</h2>
            <p className="text-gray-700 mb-4">
              Bu politika değişebilir. Değişiklikler platform'da yayınlanarak bildirilir. 
              Önemli değişiklikler email ile uyarılabilir.
            </p>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. İletişim</h2>
            <p className="text-gray-700 mb-4">
              Bu politika hakkında sorularınız veya talebiniz için:
            </p>
            <p className="text-gray-700 ml-4">
              📧 <strong>Email:</strong> info@finans-rehberi.com (örnek)<br/>
              🌐 <strong>Web:</strong> www.finans-rehberi.com<br/>
              📮 <strong>Adres:</strong> FinansRehberi Yönetim, İstanbul, Türkiye
            </p>
          </section>

          {/* Section 14 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. KVKK Bildirim</h2>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
              <p className="text-blue-800">
                <strong>Veri İşleyen:</strong> FinansRehberi<br/>
                <strong>Hukuki Dayanak:</strong> Rıza (Hesap) / Meşru Menfaat (Analytics)<br/>
                <strong>İşleme Amacı:</strong> Hizmet sunma, geliştirme, analitik<br/>
                <strong>Veri Koruma Sorumlusu:</strong> info@finans-rehberi.com
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-500 text-sm text-center">
            Bu Gizlilik Politikasını kabul ederek Platform'u kullanıyorsunuz.
          </p>
          <p className="text-gray-500 text-sm text-center mt-2">
            © 2026 FinansRehberi. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </div>
  );
}
