'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FaizCalculator() {
  const [anapara, setAnapara] = useState(10000);
  const [faizOrani, setFaizOrani] = useState(8);
  const [ay, setAy] = useState(12);
  const [basit, setBasit] = useState(true);

  const hesapla = () => {
    const r = faizOrani / 100;
    const ay_sayisi = ay;
    
    if (basit) {
      const faiz = (anapara * r * (ay_sayisi / 12));
      return { faiz, toplam: anapara + faiz };
    } else {
      const toplam = anapara * Math.pow(1 + r / 12, ay_sayisi);
      const faiz = toplam - anapara;
      return { faiz, toplam };
    }
  };

  const { faiz, toplam } = hesapla();

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif'}}>
      <div style={{backgroundColor: '#f9f9f9', padding: '30px 20px', borderBottom: '1px solid #eee'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <Link href="/" style={{display: 'inline-block', marginBottom: '15px', color: '#666', textDecoration: 'none', fontSize: '14px'}}>← Geri</Link>
          <h1 style={{fontSize: '36px', fontWeight: 'bold', color: '#000', margin: 0}}>Faiz Hesaplama</h1>
        </div>
      </div>

      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '40px 20px'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px', backgroundColor: '#f9f9f9', padding: '30px', borderRadius: '8px', border: '1px solid #eee'}}>
          <div>
            <label style={{display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#000', fontSize: '14px'}}>💰 Anapara (₺)</label>
            <input type="number" value={anapara} onChange={(e) => setAnapara(parseFloat(e.target.value))} style={{width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px'}} />
          </div>
          <div>
            <label style={{display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#000', fontSize: '14px'}}>📊 Faiz Oranı (%)</label>
            <input type="number" step="0.1" value={faizOrani} onChange={(e) => setFaizOrani(parseFloat(e.target.value))} style={{width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px'}} />
          </div>
          <div>
            <label style={{display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#000', fontSize: '14px'}}>📅 Ay</label>
            <input type="number" value={ay} onChange={(e) => setAy(parseInt(e.target.value))} style={{width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px'}} />
          </div>
          <div>
            <label style={{display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#000', fontSize: '14px'}}>📌 Faiz Tipi</label>
            <select value={basit ? 'basit' : 'bileşik'} onChange={(e) => setBasit(e.target.value === 'basit')} style={{width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px'}}>
              <option value="basit">Basit Faiz</option>
              <option value="bileşik">Bileşik Faiz</option>
            </select>
          </div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px'}}>
          <div style={{backgroundColor: '#f9f9f9', padding: '25px', borderRadius: '8px', border: '1px solid #eee', textAlign: 'center'}}>
            <p style={{color: '#666', fontSize: '12px', margin: 0}}>Anapara</p>
            <p style={{fontSize: '26px', fontWeight: 'bold', color: '#000', margin: '8px 0 0 0'}}>{anapara.toLocaleString('tr-TR')} ₺</p>
          </div>
          <div style={{backgroundColor: '#f0fdf4', padding: '25px', borderRadius: '8px', border: '1px solid #dcfce7', textAlign: 'center'}}>
            <p style={{color: '#166534', fontSize: '12px', margin: 0}}>Kazanılan Faiz</p>
            <p style={{fontSize: '26px', fontWeight: 'bold', color: '#22c55e', margin: '8px 0 0 0'}}>+{faiz.toLocaleString('tr-TR', {maximumFractionDigits: 2})} ₺</p>
          </div>
          <div style={{backgroundColor: '#dbeafe', padding: '25px', borderRadius: '8px', border: '1px solid #bfdbfe', textAlign: 'center'}}>
            <p style={{color: '#1e40af', fontSize: '12px', margin: 0}}>Toplam Tutar</p>
            <p style={{fontSize: '26px', fontWeight: 'bold', color: '#3b82f6', margin: '8px 0 0 0'}}>{toplam.toLocaleString('tr-TR', {maximumFractionDigits: 2})} ₺</p>
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
