# 🗄️ Supabase Kurulum Rehberi

## FinansRehberi - Caching Layer Veritabanı Setup

**Tarih:** 10 Nisan 2026  
**Durum:** Production Ready  
**Amaç:** API verileri için güvenilir caching ve fallback sistem

---

## 📋 İçindekiler

1. [Neden Supabase?](#neden-supabase)
2. [Adım Adım Kurulum](#adım-adım-kurulum)
3. [Veritabanı Schema](#veritabanı-schema)
4. [Test Etme](#test-etme)
5. [Troubleshooting](#troubleshooting)

---

## 🎯 Neden Supabase?

### Sorun (Before)
```
API Çağrısı → Hata → Site Boş Görünür → Kullanıcı Kaçar ❌
```

### Çözüm (After)
```
Supabase Cache → Stale Data Fallback → Kullanıcı Her Zaman Veri Görür ✅
```

### Supabase Avantajları
- ✅ PostgreSQL tabanlı (güvenilir)
- ✅ Gerçek zamanlı sync
- ✅ TTL (Time to Live) desteği
- ✅ Ücretsiz tier 500 MB veritabanı
- ✅ RLS (Row Level Security) ile güvenli
- ✅ Vercel ile otomatik uyumlu

---

## 🚀 Adım Adım Kurulum

### Adım 1: Supabase Hesabı Oluştur

1. **https://supabase.com** ziyaret et
2. **"Start your project"** tıkla
3. **GitHub ile giriş** yap (kolay)
4. **Yeni Organization** oluştur (örn: "finans-rehberi")

### Adım 2: Yeni Project Oluştur

```
1. Supabase Dashboard > "New Project"
2. Proje adı: "finans-rehberi"
3. Şifre: Güçlü bir şifre oluştur (sakla!)
4. Region: "Turkey" (İstanbul) seç ⭐
5. "Create new project" tıkla
6. Bekleme: ~2 dakika
```

### Adım 3: Credentials Al

```
Supabase Dashboard > Project Settings > API
```

Buradan kopyala ve `.env.local`'a yapıştır:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...xxxxx
```

### Adım 4: Veritabanı Setup

1. **SQL Editor**'a git
2. **"New Query"** tıkla
3. Aşağıdaki SQL'i kopyala-yapıştır:

```sql
-- Caching tablosunu oluştur
CREATE TABLE markets_cache (
  cache_key TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- İndeksler (hızlı sorgulamalar için)
CREATE INDEX idx_cache_key ON markets_cache(cache_key);
CREATE INDEX idx_created_at ON markets_cache(created_at);

-- Eski verileri otomatik sil (14 gün sonra)
-- ⚠️ Bu bağımlılık gerektirir: pg_cron
-- CREATE EXTENSION IF NOT EXISTS pg_cron;
-- SELECT cron.schedule('clean_cache', '0 0 * * *', 
--   'DELETE FROM markets_cache WHERE created_at < NOW() - INTERVAL ''14 days''');

-- Row Level Security (RLS) Aktif Et
ALTER TABLE markets_cache ENABLE ROW LEVEL SECURITY;

-- Tüm kullanıcılar okuyabilsin
CREATE POLICY "Allow all users to read cache" ON markets_cache
  FOR SELECT USING (true);

-- Service role yazabilsin (backend API)
CREATE POLICY "Allow service role to write cache" ON markets_cache
  FOR INSERT, UPDATE, DELETE USING (true);
```

4. **"Run"** tıkla
5. ✅ Başarıyla yürütüldü mesajı almalısın

---

## 📊 Veritabanı Schema

### Tablo: `markets_cache`

```sql
Column      | Type                  | Açıklama
------------|----------------------|----------------------------------
cache_key   | TEXT (PRIMARY KEY)   | Benzersiz cache anahtarı
data        | JSONB                | Gerçek veriler (JSON formatı)
created_at  | TIMESTAMP WITH TZ    | Oluşturulma zamanı
```

### Cache Keys Reference

```javascript
// Turk Markets'ten gelen cache keys:
'bist_indices'        // BIST 100, 50, 30, XBANK endeksleri
'exchange_rates'      // USD/TRY, EUR/TRY, vb.
'metals_prices'       // Altın, gümüş fiyatları
'crypto_prices'       // BTC, ETH, XRP, vb.
'top_gainers'         // En çok kazananlar
'top_losers'          // En çok kaybedenleri
'financial_news'      // Finans haberleri
```

---

## ✅ Test Etme

### Test 1: Local Development

```bash
# 1. .env.local'ı doldur
# NEXT_PUBLIC_SUPABASE_URL=...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# 2. Development server'ı başlat
npm run dev

# 3. http://localhost:3000/market açılış
# 4. Console (F12) açılış → Network tab
# 5. API çağrılarını izle
```

**Beklenen Davranış:**
```
[Cache] MISS for bist_indices
[Cache] Fetching fresh data...
[Cache] Saved fresh data for bist_indices

// 5 dakika sonra tekrar çağrı:
[Cache] HIT for bist_indices (age: 2m)
```

### Test 2: Cache Expired (TTL Testi)

```javascript
// lib/supabase.js'te TTL'yi 10 saniyeye değiştir:
return getCachedData(cacheKey, fetchBistFromAPI, 10); // 10 seconds for testing

// 10 saniye bekle, sayfa refresh et
// Expected: EXPIRED mesajı görmelisin
```

### Test 3: API Hatası Simülasyonu

```javascript
// lib/turk-markets.js'te fetchBistFromAPI'yi değiştir:
async function fetchBistFromAPI() {
  throw new Error('Simulated API Error');
}

// Sayfayı refresh et → Eski verileri görmeli (Stale Data)
```

---

## 🔍 Monitoring & Logs

### Supabase Dashboard'da Kontrol

```
1. Project > Database > Browse Data
2. "markets_cache" tablosunu aç
3. Cached veri göreceksin:
   - cache_key: "bist_indices"
   - data: {xu100: {...}, ...}
   - created_at: 2026-04-10T15:30:00Z
```

### Console Logs (Chrome DevTools)

```
F12 → Console

[Cache] HIT for bist_indices (age: 120s)
[Cache] MISS for exchange_rates
[Cache] Fetching fresh data...
[Cache] Saved fresh data for exchange_rates
```

---

## 🛡️ Security Best Practices

### 1. ✅ RLS (Row Level Security) Etkin
```sql
ALTER TABLE markets_cache ENABLE ROW LEVEL SECURITY;
```

### 2. ✅ Gizli Keys Koruması
```env
# .env.local - İğne DİŞ paylaşma!
NEXT_PUBLIC_SUPABASE_ANON_KEY=secret_key_here  # Public key (tamam)
SUPABASE_SERVICE_ROLE_KEY=...  # Private key (kesinlikle gizli!)
```

### 3. ✅ CORS Configuration
```
Supabase Settings > API > CORS Allowed Origins
- http://localhost:3000 (dev)
- https://finans-rehberi.vercel.app (prod)
```

### 4. ✅ Rate Limiting
```
Platform'da zaten kurulu:
- getCachedData() 300+ saniye TTL ile kontrol ediyor
- API çağrıları minimum düzeyde tuttuyor
```

---

## 📈 Scaling

### Faz 1: Development (Mevcut)
- ✅ Supabase Free tier
- ✅ 500 MB veritabanı
- ✅ TTL tabanlı cleanup

### Faz 2: Üretimu (3-6 ay sonra)
```
Tahmini: 10K+ günlük ziyaretçi
Supabase Pro: $25/ay
- 8GB veritabanı
- Kesin backup
- Priority support
```

### Faz 3: Enterprise (1+ yıl sonra)
```
Tahmini: 100K+ günlük ziyaretçi
Supabase Enterprise
- Unlimited veritabanı
- Dedike desteği
- Custom SLA
```

---

## 🐛 Troubleshooting

### Sorun 1: "Supabase credentials not configured"

**Çözüm:**
```
1. .env.local kontrol et
2. NEXT_PUBLIC_SUPABASE_URL ve NEXT_PUBLIC_SUPABASE_ANON_KEY dolu mu?
3. Dosya: c:\Users\ömer\OneDrive\Masaüstü\Finans-rehberi\.env.local
4. Development server'ı restart et: npm run dev
```

### Sorun 2: "SELECT permission denied"

**Çözüm:**
```sql
-- RLS policies'ni kontrol et
SELECT * FROM pg_policies 
WHERE schemaname = 'public' AND tablename = 'markets_cache';

-- Policy'yi fix et:
CREATE POLICY "Allow all users to read cache" ON markets_cache
  FOR SELECT USING (true);
```

### Sorun 3: "Connection timeout"

**Çözüm:**
```
1. Supabase Status: https://status.supabase.com
2. Region kontrol et (Turkey seçili mi?)
3. VPN devre dışı bırakma
4. Network bağlantısı test et
```

### Sorun 4: Cache'de veri yok

**Çözüm:**
```javascript
// Supabase CLI ile manuel clear:
import { getSupabaseClient, clearAllCache } from '@/lib/supabase';

const supabase = getSupabaseClient();
await clearAllCache();
// Sonra sayfa refresh et
```

---

## 📚 Kaynaklar

- **Supabase Docs:** https://supabase.com/docs
- **PostgreSQL Manual:** https://www.postgresql.org/docs/
- **Next.js Docs:** https://nextjs.org/docs
- **Our Implementation:** `/lib/supabase.js`

---

## ✨ Sonraki Adımlar

1. ✅ Supabase setup ve test
2. 📝 Yasal sayfalar (disclaimer, terms, privacy)
3. 🚀 Vercel'e deploy
4. 📊 Analytics setup
5. 💰 Google AdSense onayı

---

**Sorular?**  
📧 info@finans-rehberi.com  
🔗 https://supabase.com/support

---

*Son güncelleme: 10 Nisan 2026*
