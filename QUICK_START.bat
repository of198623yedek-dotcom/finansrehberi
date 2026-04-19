@echo off
REM Windows Hızlı Başlangıç Dosyası

echo ╔════════════════════════════════════════════════════════════════╗
echo ║          FinansRehberi - Para Kazanan Platform                ║
echo ║     Gerçek Zamanlı Finans Verileri ^& Google AdSense           ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM 1. Bağımlılıkları yükle
echo 📦 Bağımlılıklar yükleniyor...
call npm install
echo ✅ Bağımlılıklar yüklendi!
echo.

REM 2. Environment setup
echo ⚙️  Environment ayarları kontrol ediliyor...
if not exist .env.local (
  echo NEXT_PUBLIC_FINNHUB_API_KEY=your_finnhub_api_key_here > .env.local
  echo ✅ .env.local oluşturuldu
) else (
  echo ✅ .env.local zaten mevcut
)
echo.

REM 3. Dev server başlat
echo 🚀 Dev server başlatılıyor...
echo 📍 Adres: http://localhost:3000
echo.
call npm run dev

pause
