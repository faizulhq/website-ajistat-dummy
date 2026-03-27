import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  allowedDevOrigins: ['*.trycloudflare.com'],
  async rewrites() {
    return [
      // Path dengan trailing slash — teruskan apa adanya
      {
        source: '/api/:path*/',
        destination: 'https://faizulhq10.pythonanywhere.com/:path*/',
      },
      // Path tanpa trailing slash — tambahkan trailing slash agar Django happy
      {
        source: '/api/:path*',
        destination: 'https://faizulhq10.pythonanywhere.com/:path*/',
      },
    ];
  },
};

export default nextConfig;
