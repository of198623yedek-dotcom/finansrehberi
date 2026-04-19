#!/bin/bash

# 🚀 FinansRehberi - Hızlı Başlangıç Rehberi

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║          FinansRehberi - Para Kazanan Platform                ║"
echo "║     Gerçek Zamanlı Finans Verileri & Google AdSense           ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# 1. Bağımlılıkları yükle
echo "📦 Bağımlılıklar yükleniyor..."
npm install
echo "✅ Bağımlılıklar yüklendi!"
echo ""

# 2. Environment setup
echo "⚙️  Environment ayarları kontrol ediliyor..."
if [ ! -f .env.local ]; then
  echo "NEXT_PUBLIC_FINNHUB_API_KEY=your_finnhub_api_key_here" > .env.local
  echo "✅ .env.local oluşturuldu"
else
  echo "✅ .env.local zaten mevcut"
fi
echo ""

# 3. Dev server başlat
echo "🚀 Dev server başlatılıyor..."
echo "📍 Adres: http://localhost:3000"
echo ""
npm run dev
