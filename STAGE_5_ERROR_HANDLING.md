# 🛡️ AŞAMA 5: Error Handling & Stale Data Fallback

**Status**: ✅ COMPLETE & DEPLOYED  
**Production URL**: https://finans-rehberi.vercel.app  
**Date**: April 10, 2026

---

## 📋 Özet

Aşama 5'te, **error handling & stale data fallback** sistemi uygulandı:

✅ **API fails → Stale data göster** (never blank screen!)  
✅ **Freshness warning banner** ("10 dakika önce")  
✅ **Quality score** (0-100)  
✅ **Retry logic** (exponential backoff)  
✅ **Data source badge** (API, Cache, Previous, Mock)  

---

## 🎯 Problem & Solution

### Problem:
```
API down / Timeout
    ↓
User sees blank page / Error ❌
    ↓
Trust lost
```

### Solution (AŞAMA 5):
```
API down / Timeout
    ↓
Show last successful data ✅
    ↓
Display "10 dakika önce" warning
    ↓
User stays informed, keeps using app
```

---

## 🏗️ System Architecture

```
User Request
    ↓
Try Fresh API ──► Success ──► Return fresh (100% quality)
    ├─ Timeout/Error
    │
    └──► Try Stale Data (DB) ──► Found ──► Return stale + ⚠️ warning
             ├─ Not found
             │
             └──► Try Previous Value ──► Return prev + 🔶 warning
                    ├─ Not found
                    │
                    └──► Return Mock Data + 🔴 Critical Alert
```

---

## 📁 Yeni Dosyalar

### 1. **`STAGE_5_ERROR_HANDLING_SCHEMA.sql`**
Database enhancements:
- `data_quality_log` - Veri kalitesi tracking
- `api_health_status` - API sağlık durum
- `fallback_strategy` - Stratejik kararlar
- `error_recovery_queue` - Retry mekanizması
- `data_history` - Tarihçe & rollback
- Views for monitoring

### 2. **`lib/errorHandling.js`** (400+ lines)
Error handling functions:
- `getLastSuccessfulData()` - Stale data oku
- `calculateDataQualityScore()` - Kalite hesapla
- `getFallbackData()` - Cascade strategy
- `recordError()` - Error tracking
- `retryWithBackoff()` - Exponential retry
- `getDataWithFallback()` - Main function
- `retryFailedAssets()` - Batch recovery

### 3. **`app/components/DataStalenessWarning.js`** (350+ lines)
Warning components:
- `DataStalenessWarning` - Full banner with levels
- `InlineDataWarning` - Minimal inline
- `CriticalDataAlert` - Critical errors
- `DataSourceBadge` - Source indicator

### 4. Enhanced API Routes
- `/api/markets/bist` updated with `dataQuality` metadata
- Source tracking (api, database, stale-data, mock)
- Quality score in response

---

## ⚠️ Warning Levels

### 🟢 Green (Fresh)
```
✓ Veriler günceldir
- API'den alınan veri (< 5 dakika)
- Kalite: 100%
```

### 🟡 Yellow (Stale)
```
⚠️ Veriler 10 dakika önce güncellenmiştir
- DB'den alınan eski veri
- Kalite: 70-90%
- "Yenile" butonu sunulur
```

### 🟠 Orange (Very Stale)
```
⚠️ Veriler 2 saat önce güncellenmiştir
- Eski cache veya önceki değer
- Kalite: 30-70%
- "Yeniden Dene" teşvik edilir
```

### 🔴 Red (Critical)
```
🚨 Veri Alınamadı
- Tamamen başarısız
- Kalite: 0%
- "Yeniden Dene" butonu + durum sayfası
```

---

## 📊 Data Quality Scoring

```javascript
Base Score: 100

- Age penalty:
  - < 5 min: 0 penalty (fresh)
  - 5-30 min: -10 (slightly old)
  - 30-60 min: -20 (old)
  - > 60 min: -40 (very old)

- Error count:
  - Each error: -5 (max -30)

- Validation:
  - Invalid data: -20
  - Negative price: -20

Final Score: 0-100
```

---

## 🔄 Retry Strategy

### Exponential Backoff
```
Attempt 1: Immediate
Attempt 2: Wait 1s + random jitter
Attempt 3: Wait 2s + random jitter
Attempt 4: Wait 4s + random jitter (max 60s)

Total max wait: ~7 seconds
Then fallback to stale data
```

### Why Exponential?
- Prevents "thundering herd" (all servers retry same time)
- Gives API time to recover
- User doesn't wait too long

---

## 💾 Database Tracking

### Three Timestamps Tracked
```sql
last_updated_at         -- When did we fetch it?
last_successful_fetch_at -- When was it last OK?
stale_since             -- When did it become stale?
```

### Enables:
- Accurate "10 dakika önce" messages
- Automatic stale marking
- Recovery prioritization

---

## 🛡️ Fallback Cascade

### Strategy 1: Stale Data
```
✓ Fresh API fail
✓ DB has last successful fetch
→ Use stale + warning
→ Show "10 dakika önce"
```

### Strategy 2: Previous Value
```
✓ No fresh API
✓ No stale data but has previous
→ Use previous + strong warning
→ Show "Last known value"
```

### Strategy 3: Mock Data
```
✓ Everything failed
✓ No previous value
→ Use mock + critical alert
→ Show error + retry button
```

---

## 📈 User Experience

### Before (Without AŞAMA 5)
```
API down
  ↓
Blank page / Error 500
  ↓
User closes tab ❌
```

### After (With AŞAMA 5)
```
API down
  ↓
Show cached data + ⚠️ "10 dakika önce"
  ↓
User can still see prices
  ↓
App auto-retries in background
  ↓
Data updates when available ✅
```

---

## 🎨 UI Components

### Banner Positioning
```
┌─────────────────────────────────────┐
│  ⚠️ Veriler 10 dakika önce          │
│  Veri kalitesi: ████░░░░░░ 50%      │
│                                      │
│  [↻ Yenile] [Kapat]                  │
└─────────────────────────────────────┘
    ↓
Asset page content (still visible)
    ↓
Prices, charts, analysis (all cached)
```

### Source Badge
```
Asset Page Footer:

🔴 Canlı  (API source, fresh)
🟡 Cache  (Stale data from DB)
🔶 Önceki (Previous value)
⚪ Demo   (Mock/demo data)
```

---

## 📊 Metrics Tracked

### In `data_quality_log`
- Data age
- Quality score
- Confidence level
- Error type
- Recommendation

### In `api_health_status`
- Last successful call
- Consecutive failures
- Rate limit status
- Health status message

### In `error_recovery_queue`
- Failed asset ID
- Error type
- Retry count
- Recovery method used

---

## 🚀 Real-World Scenarios

### Scenario 1: Short API Timeout (30 sec)
```
Cron job: 9/10 assets OK, 1 timeout
→ Error recorded, queued for retry
→ User sees 9 fresh, 1 stale
→ Retry happens next cron cycle
```

### Scenario 2: Extended Outage (2 hours)
```
Cron job: All API calls fail
→ All assets marked as stale
→ All show "2 saat önce" warning
→ Quality score: 30%
→ Still usable! Users can see prices
```

### Scenario 3: Partial Data Corruption
```
API returns: 8 valid + 2 invalid
→ Invalid marked as stale
→ Valid updated normally
→ User experiences seamless transition
```

---

## ✅ Implementation Features

- [x] Stale data fallback system
- [x] Quality score calculation
- [x] Warning banners (4 levels)
- [x] Retry with exponential backoff
- [x] Error recovery queue
- [x] Data history tracking
- [x] Source badges
- [x] Graceful degradation
- [x] API health monitoring
- [x] Fallback cascade strategy

---

## 📚 Code Examples

### Using in Component
```javascript
import { DataStalenessWarning } from '@/app/components/DataStalenessWarning';

// In your component:
<DataStalenessWarning
  staleSinceSeconds={data.staleSinceSeconds}
  qualityScore={80}
  message="Veriler 10 dakika önce güncellenmiştir"
  onDismiss={handleDismiss}
/>
```

### Using in API Route
```javascript
import { getDataWithFallback } from '@/lib/errorHandling';

const result = await getDataWithFallback('bitcoin', () => {
  return fetchFromExternalAPI();
});

// Returns: { success, data, source, qualityScore, warning }
```

---

## 🎯 Result

**Never again blank page!**

```
✅ User sees data (fresh or stale)
✅ Warning explains age of data
✅ App keeps functioning during outages
✅ Automatic recovery in background
✅ Trust maintained ✨
```

---

**Aşama 5 Complete!** 🛡️

Sistem artık **robust & user-friendly** error handling'e sahip! 🚀
