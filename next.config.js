/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for Netlify
  output: 'export',
  
  // Optional: Add basePath if your app is not served from the root
  // basePath: '/your-base-path',
  
  // Configure images
  images: {
    unoptimized: true, // Required for static exports
  },
  
  // Enable React Strict Mode
  reactStrictMode: true,
  
  // Configure page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

module.exports = nextConfig;
