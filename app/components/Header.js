'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, profile, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-slate-900/80 border-b border-slate-700/50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center font-bold text-white group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all">
              FR
            </div>
            <span className="font-bold text-lg hidden sm:inline text-white">FinansRehberi</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/market" 
              className="text-slate-300 hover:text-white font-medium transition relative group"
            >
              Pazar
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <Link 
              href="/halka-arz" 
              className="text-slate-300 hover:text-white font-medium transition relative group"
            >
              Halka Arz
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            {/* Dropdown: Varlıklar */}
            <div className="relative group">
              <button className="text-slate-300 hover:text-white font-medium transition relative">
                Varlıklar ↓
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-slate-800/95 backdrop-blur border border-slate-700 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-xl">
                <Link href="/assets/altin" className="block px-4 py-3 hover:bg-blue-600/20 border-b border-slate-700/50 text-slate-300 hover:text-white font-medium">
                  💰 Altın (Gold)
                </Link>
                <Link href="/assets/gumush" className="block px-4 py-3 hover:bg-blue-600/20 border-b border-slate-700/50 text-slate-300 hover:text-white">
                  🥈 Gümüş (Silver)
                </Link>
                <Link href="/assets/usd-try" className="block px-4 py-3 hover:bg-blue-600/20 border-b border-slate-700/50 text-slate-300 hover:text-white">
                  💵 USD/TRY
                </Link>
                <Link href="/assets/eur-try" className="block px-4 py-3 hover:bg-blue-600/20 border-b border-slate-700/50 text-slate-300 hover:text-white">
                  💶 EUR/TRY
                </Link>
                <Link href="/assets/bitcoin" className="block px-4 py-3 hover:bg-blue-600/20 border-b border-slate-700/50 text-slate-300 hover:text-white">
                  ₿ Bitcoin
                </Link>
                <Link href="/assets/ethereum" className="block px-4 py-3 hover:bg-blue-600/20 border-b border-slate-700/50 text-slate-300 hover:text-white">
                  Ξ Ethereum
                </Link>
                <Link href="/assets/xrp" className="block px-4 py-3 hover:bg-blue-600/20 border-b border-slate-700/50 text-slate-300 hover:text-white">
                  XRP (Ripple)
                </Link>
                <Link href="/assets/solana" className="block px-4 py-3 hover:bg-blue-600/20 border-b border-slate-700/50 text-slate-300 hover:text-white">
                  ◎ Solana
                </Link>
                <Link href="/assets/bist-100" className="block px-4 py-3 hover:bg-blue-600/20 text-slate-300 hover:text-white">
                  📊 BIST 100
                </Link>
              </div>
            </div>
            
            <Link 
              href="/blog" 
              className="text-slate-300 hover:text-white font-medium transition relative group"
            >
              Blog
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/guides" 
              className="text-slate-300 hover:text-white font-medium transition relative group"
            >
              Rehberler
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>

            {/* 🆕 Auth Buttons */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium">
                  👤 {profile?.full_name?.split(' ')[0] || 'Profil'}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-slate-800/95 backdrop-blur border border-slate-700 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-xl">
                  <Link href="/dashboard" className="block px-4 py-3 hover:bg-blue-600/20 border-b border-slate-700/50 text-slate-300 hover:text-white">
                    📊 Kontrol Paneli
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 hover:bg-red-600/20 text-slate-300 hover:text-white"
                  >
                    🚪 Çıkış
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                href="/auth" 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
              >
                Giriş / Kayıt
              </Link>
            )}
            <Link href="/market" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition shadow-lg hover:shadow-blue-500/50">
              Başla
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-slate-800 rounded-lg transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden border-t border-slate-700 pb-4 space-y-3">
            <Link 
              href="/market" 
              className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition font-medium"
            >
              Pazar
            </Link>
            <Link 
              href="/halka-arz" 
              className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition font-medium"
            >
              Halka Arz
            </Link>
            <div className="px-4">
              <p className="text-slate-400 text-sm font-semibold mb-2">Varlıklar</p>
              <div className="space-y-2 ml-4">
                <Link href="/assets/altin" className="block text-slate-300 hover:text-white text-sm">
                  💰 Altın
                </Link>
                <Link href="/assets/usd-try" className="block text-slate-300 hover:text-white text-sm">
                  💵 USD/TRY
                </Link>
                <Link href="/assets/bitcoin" className="block text-slate-300 hover:text-white text-sm">
                  ₿ Bitcoin
                </Link>
                <Link href="/assets/ethereum" className="block text-slate-300 hover:text-white text-sm">
                  Ξ Ethereum
                </Link>
                <Link href="/assets/bist-100" className="block text-slate-300 hover:text-white text-sm">
                  📊 BIST 100
                </Link>
              </div>
            </div>
            <Link 
              href="/blog" 
              className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition"
            >
              Blog
            </Link>
            <Link 
              href="/guides" 
              className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition"
            >
              Rehberler
            </Link>
            <Link href="/market" className="block mx-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium transition">
              Başla
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
