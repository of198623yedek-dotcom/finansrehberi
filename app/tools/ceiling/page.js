'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CeilingCalculator() {
  const [hisseFiyati, setHisseFiyati] = useState(100);
  const [lot, setLot] = useState(100);
  const [tavanSayisi, setTavanSayisi] = useState(21);

  const sermaye = hisseFiyati * lot;

  const calculateCeiling = (tavanIndex) => {
    const multiplier = Math.pow(1.1, tavanIndex + 1);
    const yeniHisse = hisseFiyati * multiplier;
    const hisseninDegeri = yeniHisse * lot;
    const kazanc = hisseninDegeri - sermaye;
    const yuzde = ((hisseninDegeri / sermaye - 1) * 100);

    return {
      tavanNo: tavanIndex + 1,
      yeniHisse: yeniHisse.toFixed(2),
      hisseninDegeri: Math.floor(hisseninDegeri),
      kazanc: Math.floor(kazanc),
      yuzde: yuzde.toFixed(1),
    };
  };

  const ceilingData = Array.from({ length: tavanSayisi }, (_, i) => calculateCeiling(i));

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif'}}>
      <div style={{backgroundColor: '#f9f9f9', padding: '30px 20px', borderBottom: '1px solid #eee'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <Link href="/" style={{display: 'inline-block', marginBottom: '15px', color: '#666', textDecoration: 'none', fontSize: '14px'}}>← Geri</Link>
          <h1 style={{fontSize: '36px', fontWeight: 'bold', color: '#000', margin: 0}}>Tavan Serisi Hesaplama</h1>
        </div>
      </div>

      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '40px 20px'}}>
        {/* INPUT SECTION */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px'}}>
          <div>
            <label style={{display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#000', fontSize: '14px'}}>💰 Hisse Fiyatı (₺)</label>
            <input type="number" value={hisseFiyati} onChange={(e) => setHisseFiyati(parseFloat(e.target.value))} style={{width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px'}} />
          </div>
          <div>
            <label style={{display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#000', fontSize: '14px'}}>📊 Lot</label>
            <input type="number" value={lot} onChange={(e) => setLot(parseInt(e.target.value))} style={{width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px'}} />
          </div>
          <div>
            <label style={{display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#000', fontSize: '14px'}}>🎯 Tavan Sayısı</label>
            <select value={tavanSayisi} onChange={(e) => setTavanSayisi(parseInt(e.target.value))} style={{width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px'}}>
              {[5, 10, 15, 21].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>

        {/* ÖZET KARTLAR */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '40px'}}>
          <div style={{backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #eee', textAlign: 'center'}}>
            <p style={{color: '#666', fontSize: '12px', margin: 0}}>Başlangıç Yatırımı</p>
            <p style={{fontSize: '24px', fontWeight: 'bold', color: '#000', margin: '8px 0 0 0'}}>{sermaye.toLocaleString('tr-TR')} ₺</p>
          </div>
          <div style={{backgroundColor: '#f0fdf4', padding: '20px', borderRadius: '8px', border: '1px solid #dcfce7', textAlign: 'center'}}>
            <p style={{color: '#166534', fontSize: '12px', margin: 0}}>1. Tavan</p>
            <p style={{fontSize: '24px', fontWeight: 'bold', color: '#22c55e', margin: '8px 0 0 0'}}>+{calculateCeiling(0).kazanc.toLocaleString('tr-TR')} ₺</p>
          </div>
          <div style={{backgroundColor: '#f0fdf4', padding: '20px', borderRadius: '8px', border: '1px solid #dcfce7', textAlign: 'center'}}>
            <p style={{color: '#166534', fontSize: '12px', margin: 0}}>Toplam Kazanç ({tavanSayisi}. Tavan)</p>
            <p style={{fontSize: '24px', fontWeight: 'bold', color: '#22c55e', margin: '8px 0 0 0'}}>+{calculateCeiling(tavanSayisi - 1).kazanc.toLocaleString('tr-TR')} ₺</p>
          </div>
        </div>

        {/* TAVAN TABLOSU */}
        <div style={{backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #eee', overflowX: 'auto'}}>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
              <tr style={{backgroundColor: '#f0f0f0', borderBottom: '2px solid #ddd'}}>
                <th style={{padding: '12px', textAlign: 'left', fontWeight: 'bold', color: '#000', fontSize: '13px'}}>Tavan #</th>
                <th style={{padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#000', fontSize: '13px'}}>Hisse Fiyatı</th>
                <th style={{padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#000', fontSize: '13px'}}>Toplam Değer</th>
                <th style={{padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#000', fontSize: '13px'}}>Kazanç</th>
                <th style={{padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#000', fontSize: '13px'}}>Kazanç %</th>
              </tr>
            </thead>
            <tbody>
              {ceilingData.map((data, idx) => (
                <tr key={idx} style={{borderBottom: '1px solid #eee', backgroundColor: idx % 2 === 0 ? '#fff' : '#fafafa'}}>
                  <td style={{padding: '12px', fontWeight: 'bold', color: '#000', fontSize: '13px'}}>{data.tavanNo}</td>
                  <td style={{padding: '12px', textAlign: 'center', color: '#666', fontSize: '13px'}}>{parseFloat(data.yeniHisse).toLocaleString('tr-TR', {maximumFractionDigits: 2})} ₺</td>
                  <td style={{padding: '12px', textAlign: 'center', color: '#000', fontWeight: 'bold', fontSize: '13px'}}>{data.hisseninDegeri.toLocaleString('tr-TR')} ₺</td>
                  <td style={{padding: '12px', textAlign: 'center', color: '#22c55e', fontWeight: 'bold', fontSize: '13px'}}>+{data.kazanc.toLocaleString('tr-TR')} ₺</td>
                  <td style={{padding: '12px', textAlign: 'center', color: '#22c55e', fontWeight: 'bold', fontSize: '13px'}}>+{data.yuzde}%</td>
                </tr>
              ))}
            </tbody>
          </table>
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
