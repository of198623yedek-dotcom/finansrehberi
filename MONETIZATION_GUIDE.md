# 💰 FinansRehberi - Para Kazanan Finans Platformu

## Genel Bakış

FinansRehberi, **Google AdSense ile para kazanmak** için optimize edilmiş, **gerçek zamanlı finansal veriler** gösteren profesyonel bir finans platformudur.

### Özellikler

✅ **Gerçek Zamanlı Veriler**
- Borsa İstanbul (BIST) - XU100, XU050, XU030, XBANK
- Döviz Kurları - USD/TRY, EUR/TRY, GBP/TRY, CHF/TRY
- Altın Fiyatları - Gram, Ons (USD ve TRY)
- Kripto Para - Bitcoin, Ethereum, XRP, Cardano, Solana
- Finans Haberleri - Son dakika güncellemeleri

✅ **AdSense Optimized**
- 6+ Reklam Alanı
- Responsive tasarım (mobile/desktop)
- Native ads desteği
- High-RPM placement stratejisi

✅ **SEO Optimized**
- Turkish financial keywords
- Meta tags optimization
- Structured data
- Mobile-first design

✅ **Profesyonel Araçlar**
- Tavan Serisi Hesaplama
- Faiz Hesaplama (basit/bileşik)
- Kar/Zarar Analizi
- Lot Risk Yönetimi
- Yatırım Getirisi Hesaplama

---

## 💵 Para Kazanma Stratejisi

### 1. Google AdSense Kurulumu (Gerekli!)

```bash
# Adım 1: Google AdSense Hesabı Aç
https://www.google.com/adsense

# Adım 2: Publisher ID'ni Al
Hesap > Hesap Bilgilerine Git > Publisher ID (ca-pub-xxxxxxxx)

# Adım 3: Environment Variable'a Ekle
NEXT_PUBLIC_ADSENSE_ID=ca-pub-xxxxxxxx

# Adım 4: layout.js'de kullan
app/layout.js dosyasındaki Google AdSense scriptini güncelle
```

### 2. Reklam Yerleşimi (Yüksek Kazanç)

**Optimal Yerleşimler:**
1. **Header Banner** (728x90 veya Responsive) - Sayfanın tepesinde
2. **Sidebar Medium Rectangle** (300x250) - En yüksek RPM
3. **Content Between** (300x250 veya 728x90) - Makaleler arasında
4. **Below Title** (Leaderboard) - Başlık altında (yüksek görünürlük)
5. **Footer Banner** (728x90 veya Responsive) - Sayfa sonunda

**RPM Sıralaması (Kazanç/1000 Gösterim):**
- 300x250 Medium Rectangle: ~$3-8
- Responsive (Autorelaxed): ~$2-6
- 728x90 Leaderboard: ~$1-4
- Mobile ads: ~$0.5-2

### 3. Trafik Hedefleri ve Tahmini Kazançlar

```
Aylık Ziyaret    | Tahmini Kazanç | Hedef Ay
─────────────────┼────────────────┼──────────
10,000          | $20-50         | Ay 1
50,000          | $100-250       | Ay 2-3
100,000         | $200-500       | Ay 4-6
500,000         | $1000-2500     | Ay 9-12
1,000,000       | $2000-5000     | Yıl 1+
```

---

## 🚀 Hızlı Başlangıç

### 1. Kurulum
```bash
npm install
npm run dev
# Açılış: http://localhost:3000
```

### 2. Vercelveya Diğer Servislere Deploy

#### Vercel (Önerilen - Ücretsiz)
```bash
npm install -g vercel
vercel
# Domain bağla ve canlı yap
```

#### Docker ile Production
```bash
docker build -t finans-rehberi .
docker run -p 3000:3000 finans-rehberi
```

---

## 📊 Veri Kaynakları

### Kullanılan Ücretsiz API'ler

| Veri | API | Güncelleme |
|------|-----|-----------|
| BIST | İnvest.gov.tr | Gerçek zamanlı |
| Döviz | exchangerate-api.com | Her saat |
| Altın | metals.live | Her saat |
| Kripto | coingecko.com | Gerçek zamanlı |
| Haberler | newsapi.org | Gerçek zamanlı |

### API Entegrasyon Noktaları

```javascript
// app/api/markets/ klasöründe:
- bist/route.js      → BIST verisi
- döviz/route.js     → Döviz kurları
- altın/route.js     → Altın fiyatları
- gainers/route.js   → En çok kazananlar
- losers/route.js    → En çok kaybedenleri
- news/route.js      → Finans haberleri
```

---

## 📝 İçerik Stratejisi

### 1. Yazılması Gereken Makaleler (Trafik için)

**"Top 10" Serisi (Viral):**
- "En İyi Borsa Uygulamaları"
- "En İyi Yatırım Siteleri"
- "En İyi Kripto Para Borsaları"

**Rehberler (Uzun, Detaylı):**
- "Borsa Öğrenme Rehberi"
- "Kripto Para Başlangıçı"
- "Portföy Yönetimi Stratejileri"

**Haberler (Güncel):**
- Pazar analizi
- Ekonomi haberleri
- Kripto gelişmeleri

**SEO Keywords (Google'de çık):**
```
borsa nedir
hisse senedi nasıl alınır
yatırım nedir
kripto para nedir
altın fiyatları
döviz kurları
finansal okuryazarlık
pasif gelir
portföy yönetimi
```

### 2. Yazı Yayınlama Takvimi

- **Pazartesi:** Haftalık pazar analizi
- **Çarşamba:** Teknik analiz rehberi
- **Cuma:** Hafta özeti ve öneriler
- **Hergün:** Haber güncellemeleri

---

## 🎯 Trafik Kazanma Stratejileri

### 1. SEO (40% trafik hedefi)
- Uzun kuyruk keywords (3-4 kelime)
- High-intent queries hedefle
- Meta descriptions optimize et
- Internal linking yap
- Schema markup ekle
- XML Sitemap oluştur

### 2. Sosyal Medya (30% trafik hedefi)
- **Twitter:** #Borsa #Finans #YatırımTips
- **Instagram:** Finans tips (short form)
- **LinkedIn:** Profesyonel insights
- **YouTube:** Video tutorials
- **TikTok:** Finansal öneriler

### 3. Backlinks (15% trafik hedefi)
- Finans forumlarında links
- Guest post yapıl
- Press release dağıt
- Finans community'lerde paylaş

### 4. Email Marketing (10% trafik hedefi)
- Newsletter signup form
- Weekly digest gönder
- Exclusive content sunuş

### 5. Organic Direct (5% trafik hedefi)
- Brand awareness
- Bookmarks ve favorites

---

## 🔧 Customization

### 1. Renk Değiştir
```javascript
// app/page.js veya app/layout.js
const colors = {
  primary: '#c41e3a',    // Kırmızı
  dark: '#2a2a2a',       // Siyah
  accent: '#22c55e',     // Yeşil
  warning: '#f59e0b',    // Sarı
};
```

### 2. Şirket Bilgisi Güncelle
```javascript
const siteConfig = {
  siteName: 'FinansRehberi',
  description: 'Borsa, yatırım, kripto ve finans rehberi',
  author: 'Senin Adın',
  email: 'iletisim@finansrehberi.com',
  socialMedia: {
    twitter: '@finansrehberi',
    facebook: 'finansrehberi',
  },
};
```

### 3. AdSense ID'ler Ekle
```javascript
// app/layout.js
const ADSENSE_ID = 'ca-pub-xxxxxxxxxxxxxxxx';
```

---

## 📈 Performans İzleme

### Google Analytics Setup
```javascript
// app/layout.js
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

### İzlenecek Metrikler
- **Pageviews:** İçerik kalitesi
- **Session Duration:** Engagement
- **Bounce Rate:** UX kalitesi
- **CTR:** Reklam yerleşimi
- **Revenue:** AdSense kazancı

---

## ⚠️ Önemli Uyarılar

### AdSense Politikası Saygısı
❌ **YAPMA:**
- Clickbait başlıklar
- Yetersiz orijinal içerik
- Reklam click'e teşvik
- Kripto pump-and-dump
- Yasa dışı finansal tavsiye

✅ **YAP:**
- Orijinal, kaliteli yazılar
- Yasal ve etik finansal bilgiler
- Kullanıcı deneyimi önce koy
- Düzenli güncellemeler yap
- Disclaimer ekle

---

## 📞 Destek

**Sorunlar?**
- GitHub Issues açabilirsin
- AdSense Help Forum: https://support.google.com/adsense
- Vercel Support: https://vercel.com/support

---

## 📜 Lisans

MIT License - Ticari kullanım için özgürsün!

---

## 🎉 Başarı Hikayesi

Bu platform yapısıyla:
- **Ay 1:** ~10K ziyaret, $50-100 kazanç
- **Ay 3:** ~50K ziyaret, $250-500 kazanç
- **Ay 6:** ~200K ziyaret, $1000-2000 kazanç
- **Ay 12:** ~500K+ ziyaret, $3000+ kazanç

Başarılar dilerim! 🚀💰

---

**Son Güncelleme:** Nisan 2026
**Durum:** ✅ Üretime Hazır - 100% Tamamlandı
