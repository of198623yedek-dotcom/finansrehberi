'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white text-xs">
                FR
              </div>
              <h3 className="text-base font-bold text-white">FinansRehberi</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Türkiye&apos;nin kapsamlı finans takip platformu. Borsa, döviz, altın ve kripto canlı veriler.
            </p>
            <div className="flex gap-3 mt-4">
              <span className="flex items-center gap-1 text-xs text-emerald-400">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                Canlı Veri
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Sayfalar</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: '/market', label: '📈 Pazar' },
                { href: '/blog', label: '📰 Blog' },
                { href: '/guides', label: '📚 Rehberler' },
                { href: '/halka-arz', label: '🚀 Halka Arz' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-slate-400 hover:text-white transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & Assets */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Araçlar & Varlıklar</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: '/tools/ceiling', label: '🎯 Tavan Serisi' },
                { href: '/tools/profit', label: '💰 Kar Hesapla' },
                { href: '/tools/lot', label: '📊 Lot Hesapla' },
                { href: '/assets/altin', label: '🥇 Altın' },
                { href: '/assets/bitcoin', label: '₿ Bitcoin' },
                { href: '/assets/bist-100', label: '📊 BIST 100' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-slate-400 hover:text-white transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Bülten</h4>
            <p className="text-slate-400 text-sm mb-4">
              Haftalık finans rehberleri ve piyasa özeti doğrudan posta kutunuza.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-3 py-2 rounded-l-lg border border-slate-700 bg-slate-800 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button className="px-3 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition text-sm font-medium">
                Abone Ol
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 mb-6" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; {currentYear} FinansRehberi. Tüm hakları saklıdır.</p>
          <div className="flex gap-6 mt-4 md:mt-0 flex-wrap justify-center">
            <Link href="/privacy" className="hover:text-slate-300 transition">Gizlilik</Link>
            <Link href="/terms" className="hover:text-slate-300 transition">Şartlar</Link>
            <Link href="/disclaimer" className="hover:text-red-400 transition font-semibold">⚠️ Disclaimer</Link>
            <a href="mailto:info@finans-rehberi.com" className="hover:text-slate-300 transition">İletişim</a>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="mt-5 pt-5 border-t border-slate-800 text-xs text-slate-600 text-center">
          <p>
            ⚠️ <strong className="text-slate-500">Yasal Uyarı:</strong> Bu platform yatırım tavsiyesi vermemektedir.
            Tüm finansal kararlar tamamen kendi sorumluluğunuzdadır.{' '}
            <Link href="/disclaimer" className="text-red-500 hover:underline">
              Disclaimer&apos;ı oku
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
