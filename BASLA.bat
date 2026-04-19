@echo off
REM FinansRehberi - Hızlı Başlat Script

echo.
echo ==========================================
echo  FinansRehberi - Hızlı Başlangıç
echo ==========================================
echo.

REM npm yüklü mü kontrol et
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [HATA] Node.js ve npm yüklü değil!
    pause
    exit /b 1
)

echo [✓] Node.js bulundu
echo.

REM node_modules kontrol et
if not exist "node_modules" (
    echo [ℹ] Bağımlılıklar yükleniyor...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [HATA] Kurulum başarısız!
        pause
        exit /b 1
    )
)

echo [✓] Bağımlılıklar hazır
echo.

echo ==========================================
echo  Geliştirme sunucusu başlatılıyor...
echo ==========================================
echo.
echo [ℹ] URL: http://localhost:3000
echo.

timeout /t 2 >nul
start http://localhost:3000
call npm run dev

pause
