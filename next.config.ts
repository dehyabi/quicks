import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure build outputs to the 'out' directory
  distDir: 'out',

  // Optional: Add basePath if your app is not served from the root
  // basePath: '/your-base-path',

  // Required for static image support
  images: {
    unoptimized: true,
  },

  // Enable React Strict Mode
  reactStrictMode: true,

  // Optional: Custom page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

export default nextConfig;
