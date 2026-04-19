# FinansRehberi - Hızlı Başlangıç

Modern, AdSense'e hazır bir finans rehberi web sitesi.

## 🚀 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Tarayıcıda aç: http://localhost:3000

## 📝 Google AdSense Kurulumu

### 1. AdSense Hesabı Oluştur
- https://www.google.com/adsense adresine git
- Google hesabınız ile giriş yapın
- Siteyi ekleyin

### 2. Ad Code'u Al
- AdSense hesabında "My ads" bölümüne git
- Code'u kopyala

### 3. Kodu Projeye Ekle

**`app/layout.js`'te:**
```html
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
  crossOrigin="anonymous"
></script>
```

**`app/components/AdSenseBanner.js`'te:**
```html
data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
data-ad-slot="XXXXXXXXXX"
```

`XXXXXXXXXXXXXXXX` yerine kendi ID'nizi yapıştır!

## 📂 Dosya Yapısı

```
finans-rehberi/
├── app/
│   ├── components/
│   │   ├── Header.js       # Başlık/Menü
│   │   ├── Footer.js       # Altbilgi
│   │   └── AdSenseBanner.js # Reklam Alanı
│   ├── blog/
│   │   └── page.js         # Blog sayfası
│   ├── page.js             # Ana sayfa
│   ├── layout.js           # Root layout
│   └── globals.css         # Stiller
├── package.json            # Bağımlılıklar
├── next.config.js          # Next.js ayarları
└── tailwind.config.js      # Tailwind ayarları
```

## 💡 İçerik Ekleme

### 1. Yeni Makale Ekleme

`app/blog/page.js`'te `articles` arrayına ekle:

```javascript
{
  id: 7,
  title: 'Yeni Makale Başlığı',
  excerpt: 'Kısa açıklama...',
  category: 'Kategori',
  date: '2026-04-07',
  readTime: 5,
  tags: ['tag1', 'tag2'],
}
```

### 2. Yeni Sayfa Ekleme

`app/about/page.js` oluştur:

```javascript
'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* İçerik */}
      <Footer />
    </div>
  );
}
```

## 💰 Para Kazanma Stratejisi

### Trafikçeken İçerik Fikirleri:
1. **"Top 10" Listeler** - En iyi borsa uygulamaları
2. **Nasıl Yapılır Rehberleri** - Kripto para alma
3. **Güncel Haberler** - Pazar analizi
4. **Kısa İpuçları** - Hızlı finans bilgileri
5. **Açıklamalar** - Finans terimleri nedir?

### SEO İpuçları:
- Anahtar kelimeler kullan (örn: "kripto para", "borsa")
- Yazıları uzun tut (1000+ kelime)
- İç linkler ekle
- Meta açıklamalar (description) yaz
- Başlıkları H1, H2 gibi düzenlreis

### AdSense Optimizasyon:
- Reklam yerleşimini stratejik yap
- Yüksek CPC kategoriler seç
- Trafiği artır (SEO + sosyal medya)
- İçeriği kaliteli tut (tıklama oranı önemli)

## 📊 Kazanç Tahmini

| Aylık Ziyaret | Aylık Kazanç |
|---------------|--------------|
| 10,000 | $10-50 |
| 50,000 | $50-150 |
| 100,000 | $100-300 |

## 🎨 Özelleştirme

### Renkleri Değiştir

`tailwind.config.js`'te:

```javascript
colors: {
  primary: '#0f172a',      // Arka plan
  secondary: '#1e293b',    // Yan renkler
  accent: '#0ea5e9',       // Vurgu rengi (mavi)
}
```

### Logo/Branding

`app/components/Header.js`'te ₺ işaretini değiştir:

```javascript
<div>FinansRehberi</div> // veya resim
```

## 🚀 Deployment

### Vercel'e Deploy (Ücretsiz)

```bash
npm install -g vercel
vercel
```

### Railway'e Deploy

```bash
vercel --prod
```

Çevre değişkenlerini ayarla (site adı, domain vb).

## ⚠️ Önemli Notlar

1. **AdSense Onayı Bekle** - Sitenin kurulum sonrasında onaylanması 1-2 gün sürer
2. **Kaliteli İçerik** - AdSense otomatik sitenizi kontrol eder
3. **Spam Olmasın** - Fazla reklam = AdSense hesabı silinebilir
4. **Yazı Uzunluğu** - Kısa yazılar = Düşük kazanç

## 🔗 Faydalı Linkler

- [AdSense Rehberi](https://support.google.com/adsense)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [SEO Best Practices](https://developers.google.com/search)

---

**Sorularınız varsa Twitter/LinkedIn'de bize ulaşın!**
