'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-black">
      <div className="container mx-auto px-6 py-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              FinansRehberi
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Finansal bağımsızlık için kapsamlı rehberler ve stratejiler.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Hızlı Linkler</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-gray-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition">
                  Rehberler
                </Link>
              </li>
              <li>
                <Link href="/market" className="text-gray-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition">
                  Pazar
                </Link>
              </li>
              <li>
                <Link href="/halka-arz" className="text-gray-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition">
                  Halka Arz
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Kategoriler</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#kripto" className="text-gray-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition">
                  Kripto
                </a>
              </li>
              <li>
                <a href="#yatirm" className="text-gray-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition">
                  Yatırım
                </a>
              </li>
              <li>
                <a href="#finans" className="text-gray-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition">
                  Finans
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Bültene Abone Ol</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Haftalık finans rehberleri doğrudan posta kutunuza.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-3 py-2 rounded-l-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm"
              />
              <button className="px-3 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition text-sm">
                Gönder
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-slate-700 py-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {currentYear} FinansRehberi. Tüm hakları saklıdır.</p>
          <div className="flex gap-6 mt-4 md:mt-0 flex-wrap justify-center">
            <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white transition">
              Gizlilik
            </Link>
            <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white transition">
              Şartlar
            </Link>
            <Link href="/disclaimer" className="hover:text-red-600 dark:hover:text-red-400 transition font-semibold">
              ⚠️ Disclaimer
            </Link>
            <a href="mailto:info@finans-rehberi.com" className="hover:text-slate-900 dark:hover:text-white transition">
              İletişim
            </a>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700 text-xs text-gray-500 dark:text-gray-500 text-center">
          <p>
            ⚠️ <strong>Yasal Uyarı:</strong> Bu platform yatırım tavsiyesi vermemektedir. 
            Tüm finansal kararlar tamamen kendi sorumluluğunuzdadır. 
            <Link href="/disclaimer" className="text-red-600 dark:text-red-400 hover:underline ml-1">
              Disclaimer'ı oku
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
