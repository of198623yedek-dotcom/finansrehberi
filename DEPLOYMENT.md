# 🌐 Deployment & Canlı Yayına Alma Rehberi

## 1. Vercel'e Deploy (RECOMMENDED - Ücretsiz & Otomatik)

### Adım 1: Vercel Hesabı Oluştur
```bash
# https://vercel.com/signup
# GitHub hesabınızla bağlayın
```

### Adım 2: Repository Push
```bash
git init
git add .
git commit -m "Initial commit: FinansRehberi monetization setup"
git remote add origin https://github.com/YourUsername/finans-rehberi.git
git push -u origin main
```

### Adım 3: Vercel'de Deploy
```bash
npm install -g vercel
vercel
# Vercel CLI size soruları soracak, tümü için "Yes" cevapla
```

### Adım 4: Domain Bağla
```
Vercel Dashboard > Project Settings > Domains
+ Add Domain
```

### Sonuç
- 🌐 URL: `https://finans-rehberi.vercel.app`
- ⚡ CDN: Otomatik
- 🔄 Deploy: Her push'ta otomatik

---

## 2. Docker + VPS'de Deploy

### Dockerfile Konfigürasyonu
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY .next .next
COPY public public

EXPOSE 3000

CMD ["npm", "start"]
```

### VPS'de Çalıştır (DigitalOcean, Linode, etc.)
```bash
# VPS'ye SSH ile bağlan
ssh root@your-server-ip

# Docker yükle
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Repo clone et
git clone https://github.com/YourUsername/finans-rehberi.git
cd finans-rehberi

# Build & Run
docker build -t finans-rehberi .
docker run -d -p 80:3000 --restart always finans-rehberi

# Vercel alternatifi: Railway.app
# https://railway.app
```

---

## 3. Environment Variables Setup

### Vercel'de Setting
```
Vercel Dashboard > Project Settings > Environment Variables

Eklenecek:
- NEXT_PUBLIC_FINNHUB_API_KEY = your_api_key
- NEXT_PUBLIC_ADSENSE_ID = ca-pub-xxxxxxxx
```

### Production URL
```
Açılış: https://your-domain.com
API endpoints: https://your-domain.com/api/markets/*
```

---

## 4. Google AdSense Approval

### Adım 1: Site Canlı Olması Gerekli
✅ Vercel'de deployed
✅ Custom domain bağlı
✅ 10+ makalesi yazılı
✅ Privacy Policy & Terms of Service

### Adım 2: AdSense Başvurusu
```
https://www.google.com/adsense
1. Sign in
2. "Get Started" tıkla
3. Site URL'ini gir
4. Bekleme süresi: 1-2 gün
```

### Adım 3: Approval sonrası
```javascript
// app/layout.js güncelle
const ADSENSE_ID = 'ca-pub-YOUR_PUBLISHER_ID_HERE';

// Script ekle:
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
  crossOrigin="anonymous"></script>
```

---

## 5. SEO Optimization Checklist

### Pre-Launch
- [ ] Google Search Console kayıt
- [ ] Sitemap.xml oluştur
- [ ] robots.txt ekle
- [ ] Meta descriptions optimize et
- [ ] OpenGraph tags ekle
- [ ] Mobile responsiveness test et
- [ ] Page speed optimize et (Lighthouse)
- [ ] SSL certificate (Vercel auto)

### Post-Launch
- [ ] Google Analytics setup
- [ ] Google Search Console verification
- [ ] Bing Webmaster Tools kayıt
- [ ] Schema markup ekle
- [ ] Structured data test et
- [ ] Backlink stratejisi oluştur

---

## 6. Monitoring & Analytics

### Google Analytics 4 Setup
```javascript
// app/layout.js
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### İzlenecek Metrikler
- Page Views
- Sessions
- Users
- Bounce Rate
- Average Session Duration
- Conversion Rate

### AdSense Performance
- Page RPM (Revenue Per Mille)
- CTR (Click Through Rate)
- CPC (Cost Per Click)
- Impressions

---

## 7. Production Best Practices

### Security
```
- HTTPS/SSL: ✅ (Vercel otomatik)
- CORS Headers: Güvenli yapılandır
- XSS Protection: Next.js default
- CSRF Token: Form'larda ekle
- Rate Limiting: API endpoints'e ekle
```

### Performance
```
- Image Optimization: Next/Image kullan
- Code Splitting: Dynamic imports
- Caching: 1 saat (markets data)
- CDN: Vercel global
- Database: Edge functions
```

### Monitoring
```
- Error Tracking: Sentry.io
- Uptime Monitoring: UptimeRobot
- Performance: New Relic
- Logs: Vercel Logs
```

---

## 8. Scaling Strategy

### Phase 1 (Month 1-2)
- Single Vercel deployment
- Global CDN
- Basic monitoring

### Phase 2 (Month 3-6)
- Edge functions
- Database (Prisma + PostgreSQL)
- Advanced analytics

### Phase 3 (Month 6+)
- Multi-region deployment
- Microservices architecture
- Machine learning recommendations

---

## 9. Troubleshooting

### Build Errors
```bash
npm cache clean --force
rm -rf node_modules .next
npm install
npm run build
```

### API Errors
```
Check: /api/markets/* endpoints
Fallback data yakalaması var
Check: CORS headers
```

### AdSense Issues
```
- Approval pending: 1-2 gün bekle
- Low earnings: Content quality ↑
- Impressions düşük: Traffic ↑
```

---

## 10. Maintenance Checklist

### Haftalık
- [ ] Content güncellemeleri
- [ ] Analytics kontrol
- [ ] Error logs kontrol

### Aylık
- [ ] Performance report
- [ ] Revenue analysis
- [ ] SEO audit
- [ ] Backup verisi

### Üç Aylık
- [ ] Major feature updates
- [ ] Security audit
- [ ] Content strategy review

---

## 🚀 Go Live Checklist

```
Pre-Launch:
☐ Site responsive test
☐ All pages working
☐ Links checked
☐ Spelling/grammar
☐ Images optimized
☐ Meta tags filled
☐ Analytics setup
☐ AdSense code ready

Launch:
☐ DNS configured
☐ SSL working
☐ Form submissions working
☐ Email verification
☐ Mobile test
☐ Browser compatibility

Post-Launch:
☐ Search Console submit
☐ Analytics monitoring
☐ Error tracking
☐ Backup strategy
☐ Team training
```

---

## 📞 Support

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Google AdSense:** https://support.google.com/adsense
- **SEO Guide:** https://developers.google.com/search

---

**Tebrikler! Siteniz canlı yayında!** 🎉

Başarılar dilerim! 🚀💰
