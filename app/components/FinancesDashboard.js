'use client';

// Finans kontrol paneli - Gerçek zamanlı veriler göstericisi
import { useState, useEffect } from 'react';

export default function FinancesDashboard() {
  const [stats, setStats] = useState({
    visitorsOnline: 342,
    dailyPageViews: 4821,
    monthlyRevenue: 234.50,
    averageSessionTime: '3m 45s',
    bounceRate: '32%',
    topPage: 'Borsa Analizi',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simule canlı veri güncelleme
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        visitorsOnline: prev.visitorsOnline + Math.floor(Math.random() * 10 - 5),
        dailyPageViews: prev.dailyPageViews + Math.floor(Math.random() * 20),
        monthlyRevenue: prev.monthlyRevenue + (Math.random() * 2),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #eee', padding: '20px', marginTop: '30px'}}>
      <h3 style={{fontSize: '18px', fontWeight: 'bold', margin: '0 0 20px 0', color: '#000'}}>
        📊 Site Performansı
      </h3>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px'}}>
        <div style={{backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '6px', padding: '15px'}}>
          <p style={{margin: 0, fontSize: '12px', color: '#666', fontWeight: 'bold'}}>ÇEVRIMIÇI ZİYARETÇİ</p>
          <p style={{margin: '8px 0 0 0', fontSize: '28px', fontWeight: 'bold', color: '#22c55e'}}>
            {stats.visitorsOnline}
          </p>
          <p style={{margin: '5px 0 0 0', fontSize: '11px', color: '#999'}}>Şu anda aktif</p>
        </div>

        <div style={{backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '6px', padding: '15px'}}>
          <p style={{margin: 0, fontSize: '12px', color: '#666', fontWeight: 'bold'}}>GÜNLÜK SAYFA GÖRÜNTÜSÜ</p>
          <p style={{margin: '8px 0 0 0', fontSize: '28px', fontWeight: 'bold', color: '#3b82f6'}}>
            {stats.dailyPageViews.toLocaleString()}
          </p>
          <p style={{margin: '5px 0 0 0', fontSize: '11px', color: '#999'}}>Bugün</p>
        </div>

        <div style={{backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '6px', padding: '15px'}}>
          <p style={{margin: 0, fontSize: '12px', color: '#666', fontWeight: 'bold'}}>AYLÍK KAZANÇ</p>
          <p style={{margin: '8px 0 0 0', fontSize: '28px', fontWeight: 'bold', color: '#f59e0b'}}>
            ${stats.monthlyRevenue.toFixed(2)}
          </p>
          <p style={{margin: '5px 0 0 0', fontSize: '11px', color: '#999'}}>Google AdSense</p>
        </div>

        <div style={{backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '6px', padding: '15px'}}>
          <p style={{margin: 0, fontSize: '12px', color: '#666', fontWeight: 'bold'}}>ORT. OTURUM SÜRESİ</p>
          <p style={{margin: '8px 0 0 0', fontSize: '28px', fontWeight: 'bold', color: '#ec4899'}}>
            {stats.averageSessionTime}
          </p>
          <p style={{margin: '5px 0 0 0', fontSize: '11px', color: '#999'}}>Etkileşim süresi</p>
        </div>

        <div style={{backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '6px', padding: '15px'}}>
          <p style={{margin: 0, fontSize: '12px', color: '#666', fontWeight: 'bold'}}>GERİ DÖNÜŞ ORANI</p>
          <p style={{margin: '8px 0 0 0', fontSize: '28px', fontWeight: 'bold', color: '#ef4444'}}>
            {stats.bounceRate}
          </p>
          <p style={{margin: '5px 0 0 0', fontSize: '11px', color: '#999'}}>Çıkış oranı</p>
        </div>

        <div style={{backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '6px', padding: '15px'}}>
          <p style={{margin: 0, fontSize: '12px', color: '#666', fontWeight: 'bold'}}>EN POPÜLER SAYFA</p>
          <p style={{margin: '8px 0 0 0', fontSize: '16px', fontWeight: 'bold', color: '#000'}}>
            {stats.topPage}
          </p>
          <p style={{margin: '5px 0 0 0', fontSize: '11px', color: '#999'}}>Bugünün en çok ziyareti</p>
        </div>
      </div>

      <div style={{marginTop: '20px', padding: '15px', backgroundColor: '#dbeafe', borderRadius: '6px', border: '1px solid #93c5fd'}}>
        <p style={{margin: 0, fontSize: '13px', color: '#1e40af', fontWeight: 'bold'}}>
          💡 İpucu: Her 1000 ziyaretçi ile reklam kazancı 2-5$ arasında değişir. Kaliteli içerik ve SEO iyileştirmeleri trafiği artırır!
        </p>
      </div>
    </div>
  );
}
