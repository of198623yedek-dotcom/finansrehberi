'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LotCalculator() {
  const [tutar, setTutar] = useState(10000);
  const [fiyat, setFiyat] = useState(100);

  const lot = Math.floor(tutar / fiyat);

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif'}}>
      <div style={{backgroundColor: '#f9f9f9', padding: '30px 20px', borderBottom: '1px solid #eee'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <Link href="/" style={{display: 'inline-block', marginBottom: '15px', color: '#666', textDecoration: 'none', fontSize: '14px'}}>← Geri</Link>
          <h1 style={{fontSize: '36px', fontWeight: 'bold', color: '#000', margin: 0}}>Lot Hesaplama</h1>
        </div>
      </div>

      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '40px 20px'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px', backgroundColor: '#f9f9f9', padding: '30px', borderRadius: '8px', border: '1px solid #eee'}}>
          <div>
            <label style={{display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#000', fontSize: '14px'}}>💰 Yatırım Tutarı (₺)</label>
            <input type="number" value={tutar} onChange={(e) => setTutar(parseFloat(e.target.value))} style={{width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px'}} />
          </div>
          <div>
            <label style={{display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#000', fontSize: '14px'}}>📊 Hisse Fiyatı (₺)</label>
            <input type="number" value={fiyat} onChange={(e) => setFiyat(parseFloat(e.target.value))} style={{width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px'}} />
          </div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px'}}>
          <div style={{backgroundColor: '#f9f9f9', padding: '25px', borderRadius: '8px', border: '1px solid #eee', textAlign: 'center'}}>
            <p style={{color: '#666', fontSize: '12px', margin: 0}}>Yatırım Tutarı</p>
            <p style={{fontSize: '26px', fontWeight: 'bold', color: '#000', margin: '8px 0 0 0'}}>{tutar.toLocaleString('tr-TR')} ₺</p>
          </div>
          <div style={{backgroundColor: '#f9f9f9', padding: '25px', borderRadius: '8px', border: '1px solid #eee', textAlign: 'center'}}>
            <p style={{color: '#666', fontSize: '12px', margin: 0}}>Hisse Fiyatı</p>
            <p style={{fontSize: '26px', fontWeight: 'bold', color: '#000', margin: '8px 0 0 0'}}>{fiyat.toLocaleString('tr-TR')} ₺</p>
          </div>
          <div style={{backgroundColor: '#dbeafe', padding: '25px', borderRadius: '8px', border: '1px solid #bfdbfe', textAlign: 'center'}}>
            <p style={{color: '#1e40af', fontSize: '12px', margin: 0}}>Lot = Yatırım / Fiyat</p>
            <p style={{fontSize: '26px', fontWeight: 'bold', color: '#3b82f6', margin: '8px 0 0 0'}}>{lot}</p>
          </div>
        </div>

        <div style={{textAlign: 'center', marginTop: '40px'}}>
          <Link href="/tools" style={{display: 'inline-block', padding: '12px 32px', backgroundColor: '#000', color: '#fff', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold'}}>
            Tüm Araçlara Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
