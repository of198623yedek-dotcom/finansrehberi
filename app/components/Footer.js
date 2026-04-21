'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020617] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand & Mission */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-black text-white border border-white/20 shadow-xl shadow-blue-500/10">
                FR
              </div>
              <span className="font-black text-xl tracking-tighter text-white uppercase">FinansRehberi</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              Türkiye'nin yeni nesil finans terminali. Borsa İstanbul, küresel piyasalar ve kripto dünyasını tek bir premium platformdan takip edin.
            </p>
            <div className="flex items-center gap-4">
               <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-8 h-8 rounded-full border-2 border-[#020617] bg-slate-800 overflow-hidden">
                     <img src={`https://i.pravatar.cc/100?u=${i+20}`} className="w-full h-full grayscale" />
                   </div>
                 ))}
               </div>
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">+10K AKTİF KULLANICI</span>
            </div>
          </div>

          {/* Navigation Sections */}
          <div>
            <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em] mb-6">Piyasalar</h4>
            <ul className="space-y-4">
              <FooterLink href="/market" label="Borsa İstanbul" />
              <FooterLink href="/assets/usd-try" label="Döviz & Pariteler" />
              <FooterLink href="/assets/altin" label="Emtia Piyasası" />
              <FooterLink href="/assets/bitcoin" label="Kripto Terminali" />
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em] mb-6">Araçlar & Analiz</h4>
            <ul className="space-y-4">
              <FooterLink href="/tools/ceiling" label="Tavan Hesaplama" />
              <FooterLink href="/tools/profit" label="Portföy Analizi" />
              <FooterLink href="/blog" label="Uzman Görüşleri" />
              <FooterLink href="/halka-arz" label="Halka Arz Takvimi" />
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="bg-white/5 rounded-[32px] p-8 border border-white/5 relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl group-hover:scale-150 transition duration-1000"></div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4 relative z-10">BÜLTENE KATILIN</h4>
            <p className="text-[11px] text-slate-400 mb-6 font-medium relative z-10">Piyasa özetleri ve fırsat analizleri her sabah e-postanızda.</p>
            <div className="relative z-10 space-y-3">
              <input 
                type="email" 
                placeholder="E-posta Adresiniz"
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all"
              />
              <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                ABONE OL
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-10 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap justify-center gap-8">
            <LegalLink href="/privacy" label="Gizlilik" />
            <LegalLink href="/terms" label="Kullanım Şartları" />
            <LegalLink href="/disclaimer" label="Yasal Uyarı" />
            <LegalLink href="/contact" label="İletişim" />
          </div>
          <p className="text-[10px] font-mono font-bold text-slate-600 uppercase tracking-tighter">
            © {currentYear} FINANSREHBERI PRO TERMINAL. ALL RIGHTS RESERVED.
          </p>
        </div>

        {/* Disclaimer Footer */}
        <div className="mt-10 p-6 bg-red-500/5 border border-red-500/10 rounded-2xl text-center">
          <p className="text-[10px] text-red-400/80 font-black uppercase tracking-widest leading-relaxed">
            ⚠️ UYARI: BURADA YER ALAN BİLGİ VE ANALİZLER YATIRIM TAVSİYESİ DEĞİLDİR. TÜM YATIRIM KARARLARI KULLANICININ SORUMLULUĞUNDADIR.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }) {
  return (
    <li>
      <Link href={href} className="text-xs font-bold text-slate-500 hover:text-white transition-all flex items-center gap-2 group">
        <span className="w-0 h-px bg-blue-500 group-hover:w-3 transition-all duration-300"></span>
        {label}
      </Link>
    </li>
  );
}

function LegalLink({ href, label }) {
  return (
    <Link href={href} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors">
      {label}
    </Link>
  );
}
