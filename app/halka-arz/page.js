'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdSenseBanner from '../components/AdSenseBanner';

const HALKA_ARZ_DATA = [
  { company: 'Enpara Bank A.Ş.', code: 'ENPRA', status: 'Taslak', price: 'TBD', method: 'Sermaye Artırımı', market: 'Yıldız Pazar' },
  { company: 'Ağaoğlu Avrasya GYO A.Ş.', code: 'AAGYO', status: 'Taslak', price: 'TBD', method: 'Eşit Dağıtım', market: 'Yıldız Pazar' },
  { company: 'MetropolCard (Metropal)', code: 'MCARD', status: 'Taslak', price: 'TBD', method: 'Eşit Dağıtım', market: 'Ana Pazar' },
  { company: 'Luxera GYO A.Ş.', code: 'LXGYO', status: 'Taslak', price: 'TBD', method: 'Eşit Dağıtım', market: 'Ana Pazar' },
  { company: 'Gentaş Kimya Sanayi', code: 'GENKM', status: 'Taslak', price: 'TBD', method: 'Eşit Dağıtım', market: 'Ana Pazar' },
  { company: 'Netcad Yazılım A.Ş.', code: 'NETCD', status: 'Taslak', price: 'TBD', method: 'Sermaye Artırımı', market: 'Yıldız Pazar' },
  { company: 'Meysu Gıda San. ve Tic. A.Ş.', code: 'MEYSU', status: 'Taslak', price: 'TBD', method: 'Eşit Dağıtım', market: 'Ana Pazar' },
  { company: 'Pasifik Holding A.Ş.', code: 'PAHOL', status: 'Taslak', price: 'TBD', method: 'Eşit Dağıtım', market: 'Yıldız Pazar' },
  { company: 'Ecogreen Enerji Holding', code: 'ECOGR', status: 'Taslak', price: 'TBD', method: 'Eşit Dağıtım', market: 'Yıldız Pazar' },
  { company: 'Üçay Mühendislik Enerji', code: 'UCAYM', status: 'Taslak', price: 'TBD', method: 'Eşit Dağıtım', market: 'Ana Pazar' },
  { company: 'Vakıf Faktoring A.Ş.', code: 'VAKFA', status: 'Taslak', price: 'TBD', method: 'Eşit Dağıtım', market: 'Ana Pazar' },
  { company: 'Zeray GYO A.Ş.', code: 'ZERGY', status: 'Taslak', price: 'TBD', method: 'Eşit Dağıtım', market: 'Ana Pazar' },
  { company: 'Formül Plastik ve Metal', code: 'FRMPL', status: 'Taslak', price: 'TBD', method: 'Eşit Dağıtım', market: 'Ana Pazar' },
];

export default function HalkaArzTerminal() {
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState('Hepsi');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-['Inter',sans-serif]">
      <Header />

      {/* --- PAGE HEADER --- */}
      <div className="bg-gradient-to-b from-blue-600/10 to-transparent pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/20 rounded-full border border-blue-500/30 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Canlı Halka Arz Takvimi</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-tight">
            Halka Arz <span className="text-blue-500">Terminali</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-lg max-w-2xl mx-auto font-medium">
            SPK onaylı yeni halka arzlar, taslak aşamasındaki şirketler ve hisse performanslarını profesyonel terminal kalitesinde takip edin.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12">
        
        {/* --- ACTIVE / HOT SECTION --- */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-white uppercase tracking-widest border-l-4 border-blue-600 pl-4">Öne Çıkan Fırsatlar</h2>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Sıcak Arzlar</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ArzCard 
              company="Enpara Bank A.Ş." 
              code="ENPRA" 
              tag="TASLAK" 
              color="blue"
              desc="Türkiye'nin ilk dijital bankası halka arz yolunda. SPK onayı bekleniyor."
              details={[{l: 'Yöntem', v: 'Eşit Dağıtım'}, {l: 'Pazar', v: 'Yıldız Pazar'}]}
            />
            <ArzCard 
              company="Netcad Yazılım A.Ş." 
              code="NETCD" 
              tag="TASLAK" 
              color="purple"
              desc="Türkiye'nin öncü GIS ve CAD yazılım firması halka arz sürecini başlattı."
              details={[{l: 'Yöntem', v: 'Sermaye Artırımı'}, {l: 'Pazar', v: 'Yıldız Pazar'}]}
            />
            <ArzCard 
              company="MetropolCard" 
              code="MCARD" 
              tag="TASLAK" 
              color="emerald"
              desc="Kurumsal hizmetlerin dijital yüzü MetropolCard borsaya merhaba demeye hazırlanıyor."
              details={[{l: 'Yöntem', v: 'Eşit Dağıtım'}, {l: 'Pazar', v: 'Ana Pazar'}]}
            />
          </div>
        </section>

        {/* --- FULL CALENDAR TABLE --- */}
        <section className="mb-20">
          <div className="bg-[#0f172a]/40 backdrop-blur-3xl border border-white/5 rounded-[32px] overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-black text-white tracking-tighter">Halka Arz Takvimi (2024-2025)</h3>
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest mt-1">SPK TASLAK VE ONAYLI LİSTE</p>
              </div>
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                {['Hepsi', 'Taslak', 'Onaylı'].map(t => (
                  <button 
                    key={t}
                    onClick={() => setFilter(t)}
                    className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                      filter === t ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-500 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/5">
                  <tr>
                    <th className="px-8 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest">Şirket Ünvanı</th>
                    <th className="px-8 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest text-center">Kod</th>
                    <th className="px-8 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest text-center">Durum</th>
                    <th className="px-8 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest text-right">Dağıtım</th>
                    <th className="px-8 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest text-right">Pazar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {HALKA_ARZ_DATA.map((arz, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors group cursor-pointer">
                      <td className="px-8 py-6">
                        <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{arz.company}</div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="font-mono text-xs font-black text-blue-500 bg-blue-500/10 px-2 py-1 rounded-md">{arz.code}</span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="text-[10px] font-black text-yellow-400 border border-yellow-500/30 px-2 py-1 rounded-md uppercase tracking-tighter">
                          {arz.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span className="text-xs text-slate-400 font-medium">{arz.method}</span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{arz.market}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-white/5 text-center">
               <button className="text-[11px] font-black text-blue-500 hover:text-white transition-all uppercase tracking-[0.3em]">TÜM LİSTEYİ YÜKLE</button>
            </div>
          </div>
        </section>

        <AdSenseBanner slot="halka-arz-center" label="Reklam" />

        {/* --- EDUCATIONAL SECTION --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
           <div className="bg-gradient-to-br from-blue-600/10 to-indigo-600/10 p-10 rounded-[32px] border border-blue-500/20">
              <h3 className="text-2xl font-black text-white mb-4 tracking-tighter">Halka Arza Nasıl Katılırım?</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Halka arzlara bankanızın veya aracı kurumunuzun mobil uygulaması üzerinden "Halka Arz" sekmesini kullanarak katılabilirsiniz. 
                Katılım yöntemi "Eşit" mi yoksa "Oransal" mı dikkat etmelisiniz.
              </p>
              <Link href="/guides/halka-arz-katilim" className="inline-flex items-center gap-2 text-xs font-black text-blue-500 hover:text-white uppercase tracking-widest transition-all">
                REHBERİ OKU <span>→</span>
              </Link>
           </div>
           <div className="bg-slate-900/40 p-10 rounded-[32px] border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="text-8xl">📊</span>
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tighter">Tavan Serisi Takibi</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Yeni halka arz olan şirketlerin borsadaki ilk günlerini ve tavan serisi performanslarını "Tavan Hesaplayıcı" aracımızla analiz edin.
              </p>
              <Link href="/tools/ceiling" className="inline-flex items-center gap-2 text-xs font-black text-blue-500 hover:text-white uppercase tracking-widest transition-all">
                ARACI KULLAN <span>→</span>
              </Link>
           </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

function ArzCard({ company, code, tag, color, desc, details }) {
  const colors = {
    blue: 'border-blue-500/30 group-hover:border-blue-500/60 shadow-blue-900/10 text-blue-500',
    purple: 'border-purple-500/30 group-hover:border-purple-500/60 shadow-purple-900/10 text-purple-500',
    emerald: 'border-emerald-500/30 group-hover:border-emerald-500/60 shadow-emerald-900/10 text-emerald-500'
  };

  return (
    <div className={`bg-[#0f172a]/40 backdrop-blur-2xl border p-8 rounded-[32px] transition-all duration-500 group relative overflow-hidden shadow-2xl ${colors[color]}`}>
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
      <div className="flex items-center justify-between mb-6">
        <span className="text-[10px] font-black uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/10 text-white">
          {tag}
        </span>
        <span className="text-xl font-black font-mono tracking-tighter opacity-80">{code}</span>
      </div>
      <h3 className="text-2xl font-black text-white mb-4 tracking-tighter group-hover:text-blue-400 transition-colors">{company}</h3>
      <p className="text-xs text-slate-400 leading-relaxed mb-8 font-medium">
        {desc}
      </p>
      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
        {details.map((d, i) => (
          <div key={i}>
            <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">{d.l}</p>
            <p className="text-xs font-bold text-slate-200">{d.v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
