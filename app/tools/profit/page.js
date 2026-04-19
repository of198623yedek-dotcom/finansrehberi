'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProfitCalculator() {
  const [girisPrice, setGirisPrice] = useState(100);
  const [cikisPrice, setCikisPrice] = useState(120);
  const [adet, setAdet] = useState(10);

  const toplam_gidis = girisPrice * adet;
  const toplam_cikis = cikisPrice * adet;
  const kar_zarar = toplam_cikis - toplam_gidis;
  const kar_zarar_yuzde = ((kar_zarar / toplam_gidis) * 100).toFixed(2);

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif'}}>
      <div style={{backgroundColor: '#f9f9f9', padding: '30px 20px', borderBottom: '1px solid #eee'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <Link href="/" style={{display: 'inline-block', marginBottom: '15px', color: '#666', textDecoration: 'none', fontSize: '14px'}}>← Geri</Link>
          <h1 style={{fontSize: '36px', fontWeight: 'bold', color: '#000', margin: 0}}>Kar/Zarar Hesaplama</h1>
        </div>
      </div>

      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '40px 20px'}}>
        {/* INPUT SECTION */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px', backgroundColor: '#f9f9f9', padding: '30px', borderRadius: '8px', border: '1px solid #eee'}}>
          <div>
            <label style={{display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#000', fontSize: '14px'}}>💼 Alış Fiyatı (₺)</label>
            <input type="number" value={girisPrice} onChange={(e) => setGirisPrice(parseFloat(e.target.value))} style={{width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px'}} />
          </div>
          <div>
            <label style={{display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#000', fontSize: '14px'}}>📈 Satış Fiyatı (₺)</label>
            <input type="number" value={cikisPrice} onChange={(e) => setCikisPrice(parseFloat(e.target.value))} style={{width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px'}} />
          </div>
          <div>
            <label style={{display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#000', fontSize: '14px'}}>📊 Adet</label>
            <input type="number" value={adet} onChange={(e) => setAdet(parseInt(e.target.value))} style={{width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px'}} />
          </div>
        </div>

        {/* SONUÇLAR */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px'}}>
          <div style={{backgroundColor: '#f9f9f9', padding: '25px', borderRadius: '8px', border: '1px solid #eee', textAlign: 'center'}}>
            <p style={{color: '#666', fontSize: '12px', margin: 0}}>Toplam Alış</p>
            <p style={{fontSize: '26px', fontWeight: 'bold', color: '#000', margin: '8px 0 0 0'}}>{toplam_gidis.toLocaleString('tr-TR')} ₺</p>
          </div>
          <div style={{backgroundColor: '#f9f9f9', padding: '25px', borderRadius: '8px', border: '1px solid #eee', textAlign: 'center'}}>
            <p style={{color: '#666', fontSize: '12px', margin: 0}}>Toplam Satış</p>
            <p style={{fontSize: '26px', fontWeight: 'bold', color: '#000', margin: '8px 0 0 0'}}>{toplam_cikis.toLocaleString('tr-TR')} ₺</p>
          </div>
          <div style={{backgroundColor: kar_zarar >= 0 ? '#f0fdf4' : '#fef2f2', padding: '25px', borderRadius: '8px', border: kar_zarar >= 0 ? '1px solid #dcfce7' : '1px solid #fecaca', textAlign: 'center'}}>
            <p style={{color: kar_zarar >= 0 ? '#166534' : '#991b1b', fontSize: '12px', margin: 0}}>Kar/Zarar Tutarı</p>
            <p style={{fontSize: '26px', fontWeight: 'bold', color: kar_zarar >= 0 ? '#22c55e' : '#ef4444', margin: '8px 0 0 0'}}>
              {kar_zarar >= 0 ? '+' : ''}{kar_zarar.toLocaleString('tr-TR')} ₺
            </p>
          </div>
          <div style={{backgroundColor: kar_zarar >= 0 ? '#dbeafe' : '#fee2e2', padding: '25px', borderRadius: '8px', border: kar_zarar >= 0 ? '1px solid #bfdbfe' : '1px solid #fecaca', textAlign: 'center'}}>
            <p style={{color: kar_zarar >= 0 ? '#1e40af' : '#991b1b', fontSize: '12px', margin: 0}}>Kar/Zarar %</p>
            <p style={{fontSize: '26px', fontWeight: 'bold', color: kar_zarar >= 0 ? '#3b82f6' : '#ef4444', margin: '8px 0 0 0'}}>
              {kar_zarar >= 0 ? '+' : ''}{kar_zarar_yuzde}%
            </p>
          </div>
        </div>

        {/* FOOTER LINK */}
        <div style={{textAlign: 'center', marginTop: '40px'}}>
          <Link href="/tools" style={{display: 'inline-block', padding: '12px 32px', backgroundColor: '#000', color: '#fff', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold'}}>
            Tüm Araçlara Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
