import './globals.css';
import ClientLayout from '@/app/components/ClientLayout';

export const metadata = {
  title: 'FinansRehberi - Borsa, Yatırım ve Kripto Para Rehberi',
  description: 'Borsa, hisse senedi, kripto para, yatırım stratejileri ve finans haberleri hakkında detaylı bilgiler.',
  keywords: 'borsa, yatırım, kripto para, hisse senedi, finans, ticaret',
  author: 'FinansRehberi',
  robots: 'index, follow',
  verification: {
    google: 'QZgFNGOrwXysGfcMqCtoqPCeFiHdFgzyoUl2dXQczPo',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" href="/favicon.svg" />
        
        {/* Google AdSense — NEXT_PUBLIC_ADSENSE_CLIENT ile AdSenseBanner aynı client ID */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-XXXXXXXXXXXXXXXX'}`}
          crossOrigin="anonymous"
        />

        {/* OneSignal Web Push */}
        <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.js" defer></script>
        <script>
          {`
            window.OneSignalDeferred = window.OneSignalDeferred || [];
            OneSignalDeferred.push(function(OneSignal) {
              OneSignal.init({
                appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID || "placeholder",
              });
            });
          `}
        </script>
      </head>
      <body className="bg-slate-900 text-slate-100 antialiased">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
