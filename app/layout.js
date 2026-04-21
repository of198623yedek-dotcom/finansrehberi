import './globals.css';
import ClientLayout from '@/app/components/ClientLayout';

export const metadata = {
  title: {
    default: 'FinansRehberi — Borsa, Döviz, Altın ve Kripto Takip',
    template: '%s | FinansRehberi',
  },
  description:
    'BIST 100, altın, dolar kuru, euro, bitcoin ve kripto fiyatlarını canlı takip edin. Tavan serisi, lot ve kar hesaplayıcı araçlar. Ücretsiz finans rehberleri.',
  keywords:
    'borsa, BIST 100, hisse senedi, altın fiyatı, dolar kuru, bitcoin, kripto para, yatırım, halka arz, tavan serisi',
  authors: [{ name: 'FinansRehberi' }],
  creator: 'FinansRehberi',
  publisher: 'FinansRehberi',
  metadataBase: new URL('https://finans-rehberi.vercel.app'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://finans-rehberi.vercel.app',
    siteName: 'FinansRehberi',
    title: 'FinansRehberi — Borsa, Döviz, Altın ve Kripto Takip',
    description:
      'BIST 100, altın, dolar kuru, euro, bitcoin ve kripto fiyatlarını canlı takip edin.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FinansRehberi — Finans Takip Platformu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FinansRehberi — Borsa, Döviz, Altın ve Kripto',
    description: "Türkiye'nin finans takip platformu.",
    creator: '@finansrehberi',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'QZgFNGOrwXysGfcMqCtoqPCeFiHdFgzyoUl2dXQczPo',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f172a',
};

export default function RootLayout({ children }) {
  const adsenseClient =
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-XXXXXXXXXXXXXXXX';
  const isDev = adsenseClient === 'ca-pub-XXXXXXXXXXXXXXXX';

  return (
    <html lang="tr">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

        {/* ── Google AdSense ──────────────────────────────────────────────────
            ADIM 1: ca-pub-XXXXXXXXXXXXXXXX → kendi Publisher ID'nle değiştir
            ADIM 2: .env.local'a ekle: NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXX
            ADIM 3: AdSense hesabında her slot için ayrı ad unit oluştur ve
                    NEXT_PUBLIC_ADSENSE_SLOT_HERO_BOTTOM=123456789 gibi ekle
        ───────────────────────────────────────────────────────────────────── */}
        {!isDev && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
          />
        )}

        {/* ── OneSignal Push (opsiyonel) ───────────────────────────────────── */}
        {process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID && (
          <>
            <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.js" defer />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.OneSignalDeferred = window.OneSignalDeferred || [];
                  OneSignalDeferred.push(function(OneSignal) {
                    OneSignal.init({ appId: "${process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID}" });
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="bg-[#020617] text-slate-100 antialiased font-['Inter',sans-serif]">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
