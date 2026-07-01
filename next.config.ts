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
};

export default nextConfig;
