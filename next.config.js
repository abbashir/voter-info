/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',           // service worker files will be in /public
  register: true,           // auto register SW
  skipWaiting: true,        // activate new SW immediately
  disable: process.env.NODE_ENV === 'development', // disable PWA in dev
});

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = withPWA(nextConfig);
