'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AdSenseBanner from '../../components/AdSenseBanner';
import Link from 'next/link';

export default function Article({ params }) {
  const { id } = params;

  const articlesContent = {
    1: {
      title: 'Top 10 Kripto Uygulamaları 2026 - En İyileri ve En Güvenilir Çözümler',
      metaDescription: 'Bitcoin almak, yönetmek ve kripto para işlemleri için 2026 yılının en güvenli, kullanıcı dostu kripto uygulamalarını keşfedin. Coinbase, MetaMask, Trust Wallet ve daha fazlası.',
      keywords: 'kripto uygulaması, bitcoin cüzdanı, ethereum wallet, kripto para yönetimi',
      category: 'Kripto',
      author: 'FinansRehberi',
      date: '2026-04-06',
      readTime: 18,
      intro: 'Bitcoin ve diğer kripto paraları güvenli bir şekilde yönetmek için en iyi uygulamaları keşfedin. 2026 yılında en popüler ve güvenilir kripto cüzdanları ve yönetim platformları. Başlangıççılardan profesyonellere kadar herkes için uygun çözümler.',
      relatedArticles: [2, 3],
      sections: [
        {
          title: 'Kripto Uygulaması Seçiminin Neden Bu Kadar Önemli Olduğu?',
          content: 'Kripto para dünyasında güvenlik ve kullanıcı deneyimi hayati önem taşır. Doğru uygulama seçimi, varlıklarınızın güvenliğini sağlarken işlem maliyetlerini de azaltır. Yanlış seçim yaparsanız, yüksek işlem ücretleri, karmaşık arayüzler ve hatta güvenlik riskleriyle karşı karşıya kalabilirsiniz.\n\n2026 yılında en popüler uygulamalar entegre çözümler sunmaktadır:\n• Kripto cüzdanları ve çoklu blockchain desteği\n• Fiat para dönüşümü (dolar, euro vb.)\n• Tasarruf hesapları ve faiz kazanma\n• Ödeme seçenekleri (debit kartı, transfer vb.)\n• İleri düzey güvenlik özellikleri (2FA, biometrik kimlik doğrulama)\n• Yapı yapıştırılmış vergi raporları'
        },
        {
          title: 'En İyi 10 Kripto Uygulaması - Detaylı İnceleme',
          content: '1. COINBASE - Başlangıççılar için En İyi Seçim\n   Özellikleri:\n   • 100+ kripto para destekler\n   • Kolay, sezgisel arayüz\n   • USD Coin (USDC) kazanma olanağı\n   • Güvenlik: 98/100\n   • Ücret: Standart (%1.49-2.99)\n   • En uygun: Yeni başlayanlar\n\n2. EXODUS - Eksiksiz Kripto Çözümü\n   Özellikleri:\n   • 1 milyon+ kripto varlık desteği\n   • 50+ blockchain ağına bağlı\n   • Desktop ve mobil uyumlu\n   • İçerişik swap hizmetleri\n   • Güvenlik: 97/100\n   • Ücret: Düşük (%0.5 swap ücretleri)\n   • En uygun: Portföy yönetimi\n\n3. TRUST WALLET - Merkezsiz Ağ Seçimi\n   Özellikleri:\n   • 100+ blockchain destek\n   • Geniş ağ uyumluluğu (Ethereum, BSC, Solana vb.)\n   • Binance tarafından sahip\n   • DeFi uygulamaları entegrasyonu\n   • Güvenlik: 96/100\n   • Ücret: Çoğu işlem ücretsiz\n\n4. METAMASK - Ethereum Odaklı Profesyoneller\n   Özellikleri:\n   • Ethereum ve EVM tabanlı tokenler için en popüler\n   • DeFi protokollerine doğrudan erişim\n   • NFT yönetimi\n   • Hardware wallet desteği\n   • Güvenlik: 99/100\n   • Ücret: Ağ ücretlerine bağlı\n\n5. PHANTOM - Solana Ekosistemi Uzmanı\n   Özellikleri:\n   • Solana için en iyi seçim\n   • Hızlı ve düşük maliyetli işlemler\n   • Diğer blockchain desteği\n   • Güvenlik: 98/100\n   • Ücret: Son derece düşük\n\n6. WIREX - Multi-Asset Platform\n   Özellikleri:\n   • Kripto + Fiat para entegrasyonu\n   • Visa debit kartı (gerçek)\n   • Anında para çekme\n   • Satın alma ve satış işlevleri\n   • Güvenlik: 95/100\n   • Ücret: Orta düzey (%1-2)\n\n7. BITPAY - Self-Custody ve Ödeme\n   Özellikleri:\n   • Kendi kendine saklama\n   • Fatura ödeme entegrasyonu\n   • Kripto debit kartı\n   • Doğrudan banka transferi\n   • Güvenlik: 97/100\n   • Ücret: Düşük (%0.5-1)\n\n8. REVOLUT - Geleneksel + Kripto Hibrit\n   Özellikleri:\n   • Geleneksel banka hizmetleri\n   • Kripto ticaret entegrasyonu\n   • Çok para birimi desteği\n   • Seyahat için ideal\n   • Güvenlik: 96/100\n   • Ücret: Düşük ve sabit\n\n9. NEXO - Kripto Lending Şampiyonu\n   Özellikleri:\n   • Kripto lending (ödünç verme)\n   • %5-12 faiz kazanma\n   • Stabil coin faizi\n   • Anında kredi\n   • Güvenlik: 94/100\n   • Ücret: Faiz dönemsel\n\n10. CLAPP - Tüm-Bir-Arada Modern Çözüm\n    Özellikleri:\n    • Entegre ekosistem\n    • %8.2 APR tasarruf\n    • Düşük ücretler\n    • Hızlı işlemler\n    • Güvenlik: 93/100\n    • Ücret: Rekabetçi'
        },
        {
          title: 'Kripto Uygulaması Seçerken Güvenlik İpuçları',
          content: 'Kripto uygulaması seçerken mutlaka dikkate almanız gereken güvenlik hususları:\n\n1. İki Faktörlü Kimlik Doğrulama (2FA)\n   • Her zaman etkinleştirin\n   • Authenticator uygulaması (Google Authenticator, Authy) kullanın\n   • SMS tabanlı 2FA yerine app-based tercih edin\n\n2. İşlem Ücretleri\n   • Düşük işlem ücretlerine sahip platformları tercih edin (%0.5-%1)\n   • Ağ ücretleri hakkında bilin\n   • Gizli ücretlerden kaçının\n\n3. Hardware Wallet Desteği\n   • Hardware wallet desteği olan uygulamaları seçin\n   • Ledger, Trezor uyumluluğunu kontrol edin\n   • Soğuk depolama seçeneğini düşünün\n\n4. Lisans ve Düzenlemeler\n   • Uygulamanın lisans duruşunu araştırın\n   • Düzenleyici kurum onayını kontrol edin\n   • Şirketin tarihi ve itibarını araştırın\n\n5. Başlangıçta Test Etme\n   • Başlangıçta küçük miktarlarla test edin\n   • Tüm işlevleri deneyerek aşina olun\n   • Çıkartma işlemini test edin'
        },
        {
          title: '2026 Kripto Uygulamaları Trendeleri',
          content: 'Bu yıl kripto aplikasyonlarında dikkat çeken trendler ve gelecek yönünü belirleyen unsurlar:\n\n1. Doğrudan Fiat Para Giriş/Çıkışı\n   • Artık geleneksel banka hesabından direkt kripto satın alma\n   • Kredi kartısı ve banka transferi entegrasyonu\n   • Açık banka standartları (Open Banking) uygulanması\n\n2. Basit Varlık Yönetimi\n   • Karmaşık arayüzlerden uzaklaşma\n   • Bir tıkla portföy yönetimi\n   • Otomatik yeniden dengeleme (Rebalancing)\n\n3. Tahmin Edilebilir Getiriler\n   • Staking ve lending hizmetleri\n   • Sabit getiri ürünleri\n   • Sigorta korumasıyla birlikte\n\n4. Esnek Likidite Seçenekleri\n   • Anında çıkartma\n   • Kitleme dönemleri olmadan\n   • Hızlı transfer ağları\n\n5. Açık Düzenleyici Çerçeve\n   • Yasal uyumluluğun artması\n   • KYC (Know Your Customer) standartları\n   • Şeffaf vergi raporları\n\n6. Mobile-First Tasarım\n   • Masaüstüden mobil odağa kaymış\n   • Uygulama-centric platform tasarımı\n   • Progressive Web Apps (PWA) destekleri',
          relatedLink: { text: 'Yatırım Hatalarına Bakın →', id: 3 }
        }
      ]
    },
    2: {
      title: 'Gün İçinde 500 Dolar Kazanmanın 7 Pratik Yolu - Hızlı İçeri Hesabı 2026',
      metaDescription: 'Gün içinde 500$ kazanmanın gerçek yolları. Delivery, freelance yazarlık, pet care ve daha fazla - hiçbir önceki deneyim gerekli değil.',
      keywords: 'hızlı para kazanma, gün içinde para kazanma, yan gelir, freelance iş',
      category: 'Finans',
      author: 'FinansRehberi',
      date: '2026-04-06',
      readTime: 22,
      intro: 'Hızlı ve meşru yollarla ekstra gelir elde etmek mümkündür. Günlük veya haftalık bazda para kazanabilecek 7 pratik yolu öğrenin. Sosyal medya sahte vaatleri değil, gerçek stratejiler sunuyoruz.',
      relatedArticles: [1, 4, 5],
      sections: [
        {
          title: 'Hızlı Para Kazanma: Gerçekçi Beklentileri Anlamak',
          content: 'Sosyal medyada "24 saatte 5.000$ kazan" tarzı iddialardan kaçının. Bunlar %99 dolandırıcılıktır. Gerçekçi beklentiler şunlardır:\n\n• Çoğu hızlı yöntem zaman karşılığında saatlik ücret sunar\n• Tipik saatlik ücret: $15-$25 (ABD\'de)\n• Hazır olma süresi: 3-7 gün veya hemen\n• Ödeme süresi: Aynı gün ile 2 hafta arası\n• İlk ay çoğunlukla daha düşük kazanç (1-2 hafta)\n\nAna faktör: Başarı aktif katılım gerektiriyor. Otomatik zenginleşme yok!'
        },
        {
          title: 'Hemen Başlayabileceğiniz 7 Yol - Detaylı Rehber',
          content: 'YOL 1: Kullanılmayan Eşyaları Satma ($50-$500 haftalık)\n   Başlangıç Süresi: Hemen (bu gün)\n   Günlük Potansiyel: $50-$200\n   \n   Nerede Satılır:\n   • Facebook Marketplace - En popüler ve güvenli\n   • OfferUp - Mobil-first uygulama\n   • eBay - İnternet üzerinde satış\n   • Craigslist - Yerel alıcılar\n   \n   Ne Satılabilir:\n   • Oyuncaklar - Yeni görünen eski oyuncaklar çok satılır\n   • Elektronikler - Telefonlar, laptoplar, tabletler\n   • Kitaplar - Ders kitapları yüksek fiyata satılır\n   • Giysiler - Markalar (Nike, Adidas) daha iyi satılır\n   • Mobilya - Büyük miktarla para kazandırır\n   • Spor Ekipmanı - Yüksek satış oranı\n   \n   Para Kazanma Taktikleri:\n   • Dış mekânda fotoğraf çek\n   • Detaylı açıklamalar yaz\n   • Anında ödeme seçeneği sun\n   • İlk alıcılara indirim yap (daha hızlı satış)\n   • Ödeme: Hemen veya sonraki gün\n\nYOL 2: Delivery Hizmetleri ($20-$30/saat, $100-$150 günlük)\n   Başlangıç Süresi: 3-7 gün\n   Günlük Potansiyel: $100-$200 (4-6 saatlik iş)\n   \n   Platforms:\n   • DoorDash - En esnek, en iyi para\n   • Uber Eats - Düzenli akış\n   • Instacart - Yüksek vergiler, iyi ücretler\n   • Grubhub - Tutarlı iş\n   \n   Kazanç Artırma:\n   • Öğle ve akşam yemeği saatlerine odaklan\n   • Hava durumunun kötü olduğu günlerde daha fazla teklif\n   • Cömert müşteriler yakın yerlerden seç\n   • Bonus programlarını takip et\n   \n   Maliyetler:\n   • Araç (kendi arabanı kullan)\n   • Benzin/Elektrik\n   • Araç sigortası (artar)\n   • Ödeme: Haftalık\n\nYOL 3: Pet Care Hizmetleri ($15-$25/yürüyüş, $100-$150 günlük)\n   Başlangıç Süresi: 2 gün\n   Günlük Potansiyel: $100-$150 (5-6 yürüyüş)\n   \n   Platforms:\n   • Rover - En popüler, 20-40% komisyon\n   • Wag - Hızlı ödemeler\n   • Care.com - Geniş seçenek\n   • Nextdoor - Yerel müşteriler\n   \n   Hizmetler:\n   • Köpek Yürütme: $15-$25 (30 dakika)\n   • Pet Sitting: $25-$40 (2 saat)\n   • Başlangıç Ziyareti: $30-$50\n   \n   Başarı Sırrı:\n   • Eğitim ve deneyim gerekli\n   • İlk müşterilerle ilgili ol\n   • Fotoğraflar gönder\n   • Ödeme: 2-3 gün\n\nYOL 4: Online Anketler ($1-$5/saat, $20-$50 günlük)\n   Başlangıç Süresi: Hemen\n   Günlük Potansiyel: $20-$50 (4-6 saat çalışma)\n   \n   Sites:\n   • SurveyJunkie - $1-$3 anket\n   • Swagbucks - Çeşitli görevler\n   • Toluna - Aktif topluluk\n   • UserTesting - $10 test\n   \n   Maksimum Para Kazanma:\n   • Birden fazla sitede kaydol\n   • Sabah erken başla (anketler sınırlı)\n   • Profil bilgilerini doğru doldur\n   • Ödeme: Haftalık veya günlük\n\nYOL 5: Freelance Yazarlık ($20-$100/yazı, $50-$200 günlük)\n   Başlangıç Süresi: 1-2 gün\n   Günlük Potansiyel: $50-$150 (2-3 makale)\n   \n   Platformlar:\n   • Fiverr - Kendi hızında çalış\n   • Upwork - Proje tabanlı\n   • Medium Partnership - Aylık gelir\n   • Content Mills - Hızlı para\n   \n   Yüksek Ödeme Stratejisi:\n   • 1500+ kelime yazı isteyenler seç\n   • SEO konuşmalarına odaklan\n   • Teknik yazı (daha yüksek ücret)\n   • Portfolio oluştur\n   \n   Ödeme: 2-4 hafta\n\nYOL 6: Sanal Asistan ($15-$25/saat, $60-$150 günlük)\n   Başlangıç Süresi: 1-2 gün\n   Günlük Potansiyel: $60-$150 (4-6 saatlik iş)\n   \n   Görevler:\n   • Email yönetimi\n   • Sosyal medya postları hazırlama\n   • Randevu planlama\n   • Belge düzenleme\n   \n   Bulma Yerleri:\n   • Upwork\n   • Fiverr\n   • Virtual Assistant job boards\n   • Remote job sites\n   \n   Ödeme: Haftalık\n\nYOL 7: Müşteri Hizmetleri ($16-$20/saat, $100-$160 günlük)\n   Başlangıç Süresi: 5-7 gün\n   Günlük Potansiyel: $100-$160 (5-8 saatlik iş)\n   \n   Şirketler:\n   • Amazon Customer Service\n   • Apple At Home Advisors\n   • Facebook Community Operations\n   • Google Ads Support\n   \n   Avantajları:\n   • Sabit ücret\n   • Yardım sağlama\n   • Evden çalış\n   • Ödeme: Haftalık veya bi-haftalık'
        },
        {
          title: 'Günlük 500$ Hedefine Ulaşma Stratejisi',
          content: 'Tek bir kaynakla $500/gün kazanmak başlangıçta zordur. Kombinasyon yaklaşımı kullanın:\n\nÖRNEK KAZANÇ TABLOSU:\n• Delivery (5 saat): $100-$150\n• Freelance yazarlık (3 saat, 2 makale): $80-$150\n• Online anketler (2 saat): $10-$30\n• Eski eşyaları sat (1 eşya): $100-$200\n• Pet care (2 yürüyüş): $40-$50\n• Toplam: $330-$580\n\nBu kombinasyon haftalık $2000+ kazanç sağlayabilir.\n\nADIM ADIM UYGULAMA:\nHafta 1: Eşya satmaya başla\nHafta 2: Delivery uygulamalarına kaydol\nHafta 3: Pet care ve freelance ekle\nHafta 4: Optimization - En karlı işlere odaklan\n\nDİKKATİ IPUÇLARI:\n• Vergileri hesaba kat (%15-25)\n• Masrafları takip et (araç, benzin vb.)\n• En karlı saatlere odaklan\n• Mevsimsel fırsatları yakalamaya çalış'
        },
        {
          title: 'Hileli Sistemleri Tanımak - Kaçınılması Gereken Tuzaklar',
          content: 'Sosyal medya dolandırıcılığından korumak için dikkat etmeniz gereken işaretler:\n\nKAÇINILMASI GEREKEN:\n❌ \"Ön ödeme gerektiren eğitim\" - 100% dolandırıcılık\n❌ \"MLM ve piramit şemalar\" - Matematiksel olarak imkansız\n❌ \"Kripto sinyal grupları\" - Şansa bağlı oyun\n❌ \"Garantili getiri teklifi\" - Yasa dışı finansal danışmanlık\n❌ \"24 saatte zengin ol\" - Gerçekçi değil\n❌ \"Hiçbir çalışma gerekmez\" - Yalan\n\nGERÇEK İŞARETLER:\n✅ Belirsiz koşullar veya açıklamalar\n✅ Sosyal medyada yapılan talep (LinkedIn, Instagram)\n✅ Gizli Grup veya Private Discord\n✅ Referral bonusları (çok fazla kazanılıyor)\n✅ İnsan hikayeleri (Instagram modelleri, Lamborghini fotoları)\n\nAMANET KURALI: \nEğer çok iyi görünüyorsa, muhtemelen öyle değildir. Tutarlı gelir zamanla inşa edilir.'
        }
      ]
    },
    3: {
      title: 'Yatırımcıların Yaptığı 10 Kritik Hata - Milyonlarca Dolar Kaybı Nasıl Önlenir',
      metaDescription: 'Başlangıç ve deneyimli yatırımcıların yaptığı 10 kritik hata. Bu hataları nasıl kaçınılır öğrenin ve yatırım başarınızı artırın.',
      keywords: 'yatırım hataları, hisse senedi hataları, portföy yönetimi',
      category: 'Yatırım',
      author: 'FinansRehberi',
      date: '2026-04-05',
      readTime: 25,
      intro: 'Başlangıçtan en deneyimli yatırımcıların bile yaptığı ortak hatalar. Bu hataları tanıyıp kaçınırsanız, milyonlarca dolar kazanabilirsiniz. İstatistikler gösteriyor ki %95 yatırımcı temel hataları yapar.',
      relatedArticles: [4, 7, 8],
      sections: [
        {
          title: '#1: Duygular Rehber Olsun - FOMO ve Korkunun Hükümranlığı',
          content: 'En yaygın hata ve en maliyetli olanı. FOMO (kaçırma korkusu) ve kayıp korkusu yatırımcıları yanlış kararlar almaya iter.\n\nSOBUÇ: Yüksekten satın al, düşükten sat - Gerçekliğin tam tersi!\n\nÖRNEK:\n2024 Bitcoin: $60.000\'dan başladı\nFOMO\'lu yatırımcı: Tüccarlar zengin oluyor diye $80.000\'da aldı\nCorrection: $50.000\'a düştü\nKorku: %40 düşüş gördü, "Kaybı azalt" diye sattı!\nGerçeklik: Hisse $90.000\'a yükseldi\n\nÇÖZÜM:\n• Uzun vadeli stratejinize sadık kalın (10+ yıl)\n• Pazarın günlük dalgalanmalarını görmezden gelin\n• Her ay düzenli yatırım yapın (DCA - Dollar Cost Averaging)\n• 10+ yıllık hedefler belirleyin\n• Emosyonel kararlardan 24 saat bekle'
        },
        {
          title: '#2: Temeller Bilmeden Yatırım Yapma',
          content: 'Çoğu başlangıççı risk, getiri, çeşitlendirme hakkında hiçbir şey bilmeden yatırım yaparlar.\n\nKENCE SORUN:\nTemel bilgileri öğrenmek sadece 1 hafta sürer!\n\nÖĞRENMENİZ GEREKEN:\n1. Hisse Senedi vs Tahvil vs Kripto\n   • Risk seviyeleri\n   • Getiri potansiyelleri\n   • Likidite seviyeleri\n\n2. Risk Toleransı Hesaplama\n   • Yaşınız\n   • Mali durumunuz\n   • Kaç yıl için yatırım\n   • Uyku kaybı toleransı\n\n3. Çeşitlendirme Stratejileri\n   • Sektör çeşitlendirmesi\n   • Coğrafik çeşitlendirme\n   • Varlık sınıfı çeşitlendirmesi\n\n4. Pazar Davranışı ve Döngüleri\n   • Bull markets (yükseliş)\n   • Bear markets (düşüş)\n   • Düzeltmeler (Corrections)\n   • Kripto volatilitesi'
        },
        {
          title: '#3: Gerçek Olmayan Getiri Beklentileri',
          content: 'Sosyal medyadaki etkileyiciler her zaman "%" vaat eder, ama hiç kayıplardan bahsetmez.\n\nGERÇEK BEKLENTILER:\n• Devlet Tahvilleri: 4-5%\n• Ortalama Hisse Senedi: 7-10%\n• Yüksek Risk Varlıklar: -50% ile +200% arasında\n• Garantili getiri: YOK\n\n2026 İÇERDEN BAKIŞ:\n• \"Eğer yapabilirsem, sen de yapabilirsin\" = %99 Yalan\n• Geçmiş performans = Gelecek performans garantisi değil\n• Şanslı yatırımcıları başarılı düşünmeyin\n• Sosyal medya başarısı hikayesi görmeyiz\n\nGERÇEKLİK:\nSocial Media Status | Gerçeklik\n$100 yatırımdan $1000 kar | Nadir (<%0.01)\nBugün başla, ayda $10,000 yap | İmkansız\nKripto 100x getirisi | Mümkün ancak %99 kayıp\nHer ay %5 getiri garantisi | Yasa dışı iddia'
        }
      ]
    },
    4: {
      title: 'Borsa Başlamak İçin Adım Adım Rehber 2026 - Sıfırdan Başlayanlar İçin',
      metaDescription: 'Borsa\'ya sıfırdan başlamak için tam rehber. Hesap açmadan sonra yapmanız gerekenler, yatırım stratejileri ve ilk adımlar.',
      keywords: 'borsa rehberi, hisse senedi başlangıç, yatırım nasıl başlanır',
      category: 'Rehber',
      author: 'FinansRehberi',
      date: '2026-04-05',
      readTime: 20,
      intro: 'Sıfırdan hisse senedi yatırımına başlamak basittir ancak doğru kararlar gerekli. İlk hesap açmadan önce okuymanız gereken adım adım rehber.',
      relatedArticles: [3, 5, 7],
      sections: [
        {
          title: 'Neden Hisse Senedine Yatırım Yapılır?',
          content: 'S&P 500 endeksi 1926\'den bu yana ortalama yıllık %10 getiri sağlamıştır (enflasyona göre ayarlandıktan sonra %7).\n\nBU NE DEMEK:\nHer ay 500$ yatırıyorsanız: 30 yılda 1.1 milyon$\nÖrnekler:\n• 25 yaşında 500$ yatırı = 65 yaşında 1.1 milyon$\n• 35 yaşında 500$ yatırı = 65 yaşında 550.000$\n\nSABİTLİK:\nHisse senetleri uzun vadede hemen hemen her zaman yükselir\nTarihsel olgular:\n• 1926-2026: Her 10 yıllık dönem pozitif getiri\n• Büyük Buhran bile 10 yılda geri kazandı\n• COVID-19 pandemisi 8 ay sonra dengelendi\n\nEMEKLİLİK:\nErken başlayanlar milyonlar biriktirebilir\nBileşik faiz gücü:\n• Zaman = En büyük yatırım aracı\n• 20 yıl = 4x para\n• 30 yıl = 8-10x para'
        }
      ]
    },
    5: {
      title: 'Pasif Gelir: Uyurken Para Kazanma - 1000$/Ay İçin Kapsamlı Rehber',
      metaDescription: 'Gerçek pasif gelir stratejileri. Dividend yatırımı, faiz, gayrimenkul - uyurken para kazanmanın tüm yolları.',
      keywords: 'pasif gelir, dividend yatırımı, uyurken para kazanma',
      category: 'Finans',
      author: 'FinansRehberi',
      date: '2026-04-04',
      readTime: 20,
      intro: 'Gerçek pasif gelir stratejileri: paranız çalışırken siz uyuyun. Dividend ve faiz getirisi stratejileri.',
      relatedArticles: [1, 2, 4],
      sections: [
        {
          title: 'Pasif Gelir Nedir? Gerçek vs Sahte',
          content: 'YANLIŞ Pasif Gelir (Aslında Aktif İş):\n❌ Blog yazıları (her hafta yazı yazmak)\n❌ YouTube videolar (sürekli yeni içerik)\n❌ Affiliate pazarlaması (sosyal medya)  \n❌ Kurs satışı (hep promosyon)\n\nGERÇEK Pasif Gelir (Kurulduktan sonra hiçbir iş):\n✅ Dividend Hisseleri\n✅ Faiz (Para Piyasası Hesapları)\n✅ Gayrimenkul Kiraları (vasi ile)\n✅ Telif Hakları\n✅ Kredi Faizi\n\nFARK: Bir kez kurulduktan sonra para otomatik olarak gelir.'
        }
      ]
    },
    6: {
      title: 'Teknik Analiz 101: Grafikler Nasıl Okunur - Başlangıçtan İleri Düzey',
      metaDescription: 'Teknik analiz temelleri. Mum grafikleri, support-resistance, trend çizgileri - profesyonel yatırımcı gibi grafik okuyun.',
      keywords: 'teknik analiz, grafik okuma, candlestick',
      category: 'Analiz',
      author: 'FinansRehberi',
      date: '2026-04-03',
      readTime: 18,
      intro: 'Mum grafikleri, trend çizgileri, support ve resistance. Profesyonel yatırımcı gibi pazar analizi yapın.',
      relatedArticles: [3, 7],
      sections: []
    },
    7: {
      title: 'ETF vs Bireysel Hisse: 2026\'de Hangisi Daha İyi? Detaylı Karşılaştırma',
      metaDescription: 'ETF ve bireysel hisse karşılaştırması. Veriler, istatistikler ve sizin için hangisinin daha iyi olduğu.',
      keywords: 'ETF, hisse senedi, yatırım karşılaştırması',
      category: 'Yatırım',
      author: 'FinansRehberi',
      date: '2026-04-02',
      readTime: 15,
      intro: 'ETF ve Bireysel Hisseler. Hangisini seçmeliysiniz? Veriler biliyor.',
      relatedArticles: [4, 3],
      sections: []
    },
    8: {
      title: 'Vergi Planlaması: Yasal Olarak Vergisiz Para Kazanma - 2026 Vergi Kütüğü',
      metaDescription: '2026 vergi planlaması stratejileri. Roth IRA, 401k, vergi kaybı hasadı - vergisiz para kazanma.',
      keywords: 'vergi planlama, roth ira, 401k, vergi tasarrufu',
      category: 'Vergi',
      author: 'FinansRehberi',
      date: '2026-04-01',
      readTime: 16,
      intro: '2026 vergi kanunları değişti. Yatırım gelirinden yasal olarak vergi ödememek mümkün.',
      relatedArticles: [3, 4],
      sections: []
    }
  };

  const article = articlesContent[id];

  // Schema.org Article JSON-LD
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article?.title,
    "description": article?.metaDescription,
    "image": "https://finans-rehberi.vercel.app/og-image.png",
    "datePublished": article?.date,
    "author": {
      "@type": "Organization",
      "name": article?.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "FinansRehberi",
      "logo": {
        "@type": "ImageObject",
        "url": "https://finans-rehberi.vercel.app/logo.png"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="min-h-screen flex flex-col">
        <Header />

        <article className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-accent text-primary px-4 py-1 rounded-full font-bold text-sm">
                {article?.category || 'Yatırım'}
              </span>
              <span className="text-slate-400 text-sm">{article?.readTime || 0} dk okuma</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
              {article?.title || 'Makale Bulunamadı'}
            </h1>

            <p className="text-lg text-slate-300 mb-6">
              {article?.intro || 'Aradığınız makale sistem&apos;te mevcut değil.'}
            </p>

            <div className="flex items-center gap-4 text-slate-400 mb-8">
              <span>{article?.author || 'FinansRehberi'}</span>
              <span>•</span>
              <span>{article?.date || '2026-04-06'}</span>
            </div>
          </div>

          <AdSenseBanner slot="article-top" />

          <div className="prose prose-invert max-w-none mb-12">
            {article?.sections ? (
              article.sections.map((section, idx) => (
                <div key={idx} className="mb-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mt-8 mb-4">
                    {section.title}
                  </h2>
                  <div className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">
                    {section.content}
                  </div>
                  {section.relatedLink && (
                    <div className="mt-4 p-4 bg-slate-700 rounded-lg">
                      <Link href={`/article/${section.relatedLink.id}`} className="text-accent hover:underline">
                        {section.relatedLink.text}
                      </Link>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-slate-300 text-lg">Makale içeriği yüklenemedi.</p>
            )}
          </div>

          {/* İç Linkler - Related Articles */}
          {article?.relatedArticles && article.relatedArticles.length > 0 && (
            <div className="mb-12 p-6 bg-slate-800 rounded-lg border border-slate-700">
              <h3 className="text-xl font-bold text-slate-100 mb-4">İlgili Makaleler</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {article.relatedArticles.map((relatedId) => {
                  const relatedArticle = articlesContent[relatedId];
                  return (
                    <Link key={relatedId} href={`/article/${relatedId}`}>
                      <div className="p-4 bg-slate-700 rounded hover:bg-slate-600 transition cursor-pointer">
                        <p className="font-bold text-accent text-sm">{relatedArticle?.category}</p>
                        <p className="text-slate-100 font-semibold text-sm mt-1">{relatedArticle?.title}</p>
                        <p className="text-slate-400 text-xs mt-2">{relatedArticle?.readTime} dk okuma</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <AdSenseBanner slot="below-content" />
        </article>

        <section className="bg-slate-800 my-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
            <h3 className="text-2xl font-bold text-slate-200 mb-4">Daha Fazla İçerik</h3>
            <Link
              href="/blog"
              className="inline-block bg-accent text-primary px-8 py-3 rounded-lg font-bold hover:bg-blue-400 transition"
            >
              Tüm Makalelere Dön
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}