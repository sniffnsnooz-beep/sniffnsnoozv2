import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'loremflickr.com' },
      // fallback for any future external image hosts
      { protocol: 'https', hostname: '*.cloudinary.com' },
    ],
    // Enable image optimization for better performance on Vercel
    formats: ['image/avif', 'image/webp'],
  },
  // Needed for Vercel: disable x-powered-by header
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: '/vetic',
        destination: 'https://vetic.in',
        permanent: false,
      },
      {
        source: '/deepet',
        destination: 'https://deepetservices.com',
        permanent: false,
      },
      {
        source: '/incredipets',
        destination: 'https://incredipets.in',
        permanent: false,
      },
      {
        source: '/pawfriend',
        destination: 'https://pawfriend.in',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
