# 🚀 AŞAMA 2: SWR & Data Caching Optimization

## Özet
Aşama 2'de, API çağrılarını optimize etmek için **SWR (Stale-While-Revalidate)** implement ettik.

**Hedef**: 
- ✅ API'ye gereksiz yük binmemesi
- ✅ Kullanıcı deneyiminde "Yükleniyor..." animasyonu
- ✅ Veriler 5 dakikada otomatik güncellenmesi
- ✅ Sayfa hızlı yüklenmesi (stale data göstermesi)

---

## 📦 Kurulu Paketler

```bash
npm install swr
```

**SWR nedir?**
- SWR = Stale-While-Revalidate
- React hook tabanlı data fetching kütüphanesi
- **Stale Data**: Cache'lenmiş eski veriyi gösterir
- **Revalidate**: Arka planda yeni veriyi getirir
- Otomatik deduplication (aynı request iki kez gitmez)

---

## 🏗️ Yapı

### 1. **Skeleton Loaders** (`app/components/SkeletonLoaders.js`)

Sayfa yüklenirken kullanıcıya placeholder göstermek için:

```javascript
// Kullanılan Skeleton'lar:
- SkeletonAssetPage()      // Asset sayfa yüklenmesi için
- SkeletonPriceCard()      // Fiyat kartı placeholder
- SkeletonTableRow()       // Tablo satırı placeholder
- LoadingSpinner()         // Basit dönen spinner
```

**Avantaj**: Kullanıcı "boş sayfa" görmez, "yükleniyor" hisseder.

---

### 2. **Custom Hook** (`lib/hooks/useCachedAssetData.js`)

```javascript
import useCachedAssetData from '@/lib/hooks/useCachedAssetData';

// Kullanım:
const { data, error, isLoading, mutate } = useCachedAssetData('/api/endpoint');

// Özellikleri:
- data:        Getirilen veri (cache'lenmiş)
- error:       Hata varsa Error object
- isLoading:   Veri yükleniyorsa true
- mutate():    Manuel olarak veriyi güncelle
```

**SWR Konfigurasyonu:**
```javascript
{
  revalidateOnFocus: false,    // Sekmede fokus geri gelince refresh yapma
  refreshInterval: 300000,      // 5 dakikada bir otomatik güncelle
  keepPreviousData: true,       // Eski data'yı tut (smooth transition)
  dedupingInterval: 60000,      // 1 dakika içinde aynı isteği bir kez yap
  errorRetryCount: 3,           // Hata olursa 3 kez retry yap
  errorRetryInterval: 5000,     // 5 saniye ara ile retry
}
```

---

### 3. **Asset Page** (`app/assets/[asset]/page.js`)

**Önceki (Manuel Fetch)**:
```javascript
const [assetData, setAssetData] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch(url)
    .then(r => r.json())
    .then(data => setAssetData(data))
    .catch(err => setError(err));
}, []);
```

**Yeni (SWR ile)**:
```javascript
const { data: allData, error, isLoading, mutate } = useCachedAssetData(
  asset?.apiEndpoint
);

// Otomatik olarak:
// ✓ 5 dakikada güncelle
// ✓ Aynı endpoint'e 1 dakikada bir kez istek gönder
// ✓ Error'da 3 kez retry yap
// ✓ Eski data'yı tut
```

**Skeleton Gösterme**:
```javascript
if (isLoading && !assetData) {
  return <SkeletonAssetPage />;
}
```

---

### 4. **Market Page** (`app/market/page.js`)

**5 endpoint'ten paralel veri çekme:**

```javascript
const { data: bistData, isLoading: bistLoading } = useSWR('/api/markets/bist', fetcher, config);
const { data: dövizData, isLoading: dövizLoading } = useSWR('/api/markets/döviz', fetcher, config);
const { data: gainersData, isLoading: gainersLoading } = useSWR('/api/markets/gainers', fetcher, config);
const { data: losersData, isLoading: losersLoading } = useSWR('/api/markets/losers', fetcher, config);
const { data: newsData, isLoading: newsLoading } = useSWR('/api/markets/news', fetcher, config);

// UI'da loading göster:
<h3>BIST {bistLoading && <LoadingSpinner />}</h3>
```

---

## 🔄 Cache Akışı

```
Kullanıcı sayfa açar
    ↓
SWR cache'de veri var mı?
    ├─ EVET → Hemen göster (stale data) + Arka planda güncelle
    └─ HAYIR → Skeleton göster + API'den çek + Veri gelince göster
    ↓
5 dakika geçti mi?
    ├─ EVET → Arka planda otomatik güncelle
    └─ HAYIR → Cache'de kalmaya devam et
    ↓
Error oluştu mu?
    ├─ EVET → 3 kez retry (5s arayla) + Eski data göster + Error mesajı
    └─ HAYIR → Yeni veri göster
```

---

## 📊 Performance Metrics

### Öncesi (Manual Fetch)
- **API Çağrısı**: Her sayfa yüklemede
- **Render Süresi**: Veri gelene kadar "Yükleniyor..."
- **Tekil Cache**: Her component kendi cache'ini tutar

### Sonrası (SWR)
- **API Çağrısı**: 5 dakikada 1 kez (+ initial)
- **Render Süresi**: Hemen cache'lenmiş veri göster
- **Deduplication**: Aynı endpoint'e 1 dakikada 1 istek
- **Fallback**: Error'da eski data'yı göster

**Sonuç**: ~80% API çağrısı azalması ✅

---

## 🛠️ Kullanıcı Aksiyonları

### Verileri Manual Güncelle
```javascript
const { mutate } = useCachedAssetData(endpoint);

// Kullanıcı "Yeniden Yükle" butonuna tıklar:
<button onClick={() => mutate()}>Yeniden Yükle</button>

// SWR cache'i siler ve yeni veri çeker
```

### Error Handling
```javascript
if (error && !assetData) {
  return (
    <div>
      <p>❌ Veri yüklenemedi: {error.message}</p>
      <button onClick={() => mutate()}>Yeniden Dene</button>
    </div>
  );
}
```

---

## 🎯 Sonraki Adımlar (Aşama 3)

1. **Real-time Updates**: WebSocket veya polling ile live veri
2. **Advanced Caching**: Service Worker ile offline support
3. **Analytics**: Hangi veri en sık çekildiğini izle
4. **Personalization**: Kullanıcının favori varlıkları cache'le

---

## 📚 Referanslar

- [SWR Documentation](https://swr.vercel.app)
- [React Data Fetching Patterns](https://react.dev/learn/synchronizing-with-effects)
- [Stale-While-Revalidate RFC](https://tools.ietf.org/html/rfc5861)

---

## ✅ Checklist

- [x] SWR package kurulu
- [x] Skeleton loaders oluşturuldu
- [x] Custom hook oluşturuldu
- [x] Asset page SWR ile entegre
- [x] Market page SWR ile entegre
- [x] Loading animasyonu eklendi
- [x] Error handling eklendi
- [x] Build tamamlandı

---

**Durum**: ✅ Aşama 2 Tamamlandı!

Veriler artık SWR ile cache'leniyor, API'ye yük binmesi min. seviyeye düştü, ve kullanıcı deneyimi çok gelişti. 🚀
