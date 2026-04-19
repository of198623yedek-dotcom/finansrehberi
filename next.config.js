/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: '/halkaarz', destination: '/halka-arz', permanent: true },
      { source: '/halka_arz', destination: '/halka-arz', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/halka-arz',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-UA-Compatible',
            value: 'IE=edge'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ],
      },
    ]
  },
};

module.exports = nextConfig;
