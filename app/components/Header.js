'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, profile, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-[100] transition-all duration-500 ${
      scrolled ? 'bg-slate-950/70 backdrop-blur-2xl py-3 border-b border-white/5' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-black text-white shadow-xl shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500 border border-white/20">
              FR
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tighter text-white leading-none">FinansRehberi</span>
              <span className="text-[9px] font-black text-blue-500 tracking-[0.2em] uppercase leading-none mt-1">PRO TERMINAL</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <NavLink href="/market">Piyasa</NavLink>
            <NavLink href="/halka-arz">Halka Arz</NavLink>
            
            {/* Varlıklar Dropdown */}
            <Dropdown label="Varlıklar">
              <DropdownLink href="/assets/altin">💰 Altın (Gold)</DropdownLink>
              <DropdownLink href="/assets/usd-try">💵 USD/TRY</DropdownLink>
              <DropdownLink href="/assets/bitcoin">₿ Bitcoin</DropdownLink>
              <DropdownLink href="/assets/ethereum">Ξ Ethereum</DropdownLink>
              <DropdownLink href="/assets/bist-100">📊 BIST 100</DropdownLink>
            </Dropdown>
            
            {/* Araçlar Dropdown */}
            <Dropdown label="Araçlar">
              <DropdownLink href="/tools/ceiling">🎯 Tavan Serisi</DropdownLink>
              <DropdownLink href="/tools/profit">💰 Kar Hesapla</DropdownLink>
              <DropdownLink href="/tools/lot">📊 Lot Hesapla</DropdownLink>
            </Dropdown>

            <NavLink href="/blog">Haberler</NavLink>
            <NavLink href="/guides">Rehberler</NavLink>

            <div className="h-6 w-px bg-white/10 mx-2"></div>

            {isAuthenticated ? (
              <Dropdown label={profile?.full_name?.split(' ')[0] || 'Hesabım'}>
                <DropdownLink href="/dashboard">📊 Kontrol Paneli</DropdownLink>
                <button onClick={logout} className="w-full text-left px-5 py-3 hover:bg-red-500/10 text-slate-300 hover:text-red-400 text-xs font-bold transition-colors">
                  🚪 Çıkış
                </button>
              </Dropdown>
            ) : (
              <Link 
                href="/auth" 
                className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
              >
                Giriş Yap
              </Link>
            )}
            
            <Link href="/market" className="bg-white text-black px-6 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-xl hover:shadow-blue-500/40">
              BAŞLA
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 transition-all active:scale-95"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex flex-col gap-1.5">
              <span className={`w-5 h-0.5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-5 h-0.5 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-5 h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-8 space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="grid grid-cols-2 gap-3">
              <MobileLink href="/market" label="Piyasa" />
              <MobileLink href="/halka-arz" label="Halka Arz" />
              <MobileLink href="/blog" label="Haberler" />
              <MobileLink href="/guides" label="Rehberler" />
            </div>
            
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Popüler Varlıklar</p>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/assets/altin" className="text-xs font-bold text-slate-300">💰 Altın</Link>
                <Link href="/assets/bitcoin" className="text-xs font-bold text-slate-300">₿ Bitcoin</Link>
                <Link href="/assets/usd-try" className="text-xs font-bold text-slate-300">💵 USD/TRY</Link>
                <Link href="/assets/bist-100" className="text-xs font-bold text-slate-300">📊 BIST 100</Link>
              </div>
            </div>

            <Link href="/market" className="block w-full py-4 bg-blue-600 text-white text-center rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-blue-600/20">
              HEMEN BAŞLA
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

function NavLink({ href, children }) {
  return (
    <Link 
      href={href} 
      className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all relative group"
    >
      {children}
      <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-blue-500 rounded-full group-hover:w-full transition-all duration-300"></span>
    </Link>
  );
}

function Dropdown({ label, children }) {
  return (
    <div className="relative group">
      <button className="text-[11px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-all flex items-center gap-1.5">
        {label} <span className="text-[8px] opacity-50 group-hover:rotate-180 transition-transform duration-300">▼</span>
      </button>
      <div className="absolute left-0 mt-4 w-56 bg-slate-950/90 backdrop-blur-3xl border border-white/10 rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 shadow-2xl overflow-hidden scale-95 group-hover:scale-100 origin-top-left">
        {children}
      </div>
    </div>
  );
}

function DropdownLink({ href, children }) {
  return (
    <Link href={href} className="block px-5 py-3 hover:bg-white/5 border-b border-white/5 text-slate-300 hover:text-white text-xs font-bold transition-colors">
      {children}
    </Link>
  );
}

function MobileLink({ href, label }) {
  return (
    <Link href={href} className="bg-white/5 border border-white/5 p-4 rounded-xl text-center text-[10px] font-black uppercase tracking-widest text-slate-300 active:bg-blue-600 active:text-white transition-all">
      {label}
    </Link>
  );
}
