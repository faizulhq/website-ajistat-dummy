import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Standalone output untuk deploy ke cPanel Node.js
  output: 'standalone',

  // Gambar tidak dioptimasi oleh server (diperlukan di non-Vercel)
  images: {
    unoptimized: true,
  },

  allowedDevOrigins: ['*.trycloudflare.com'],

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.aji-institute.com/api/:path*',
      },
    ];
  },
};

export default nextConfig;

