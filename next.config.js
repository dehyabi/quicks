/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports
  output: 'export',
  
  // Output directory for the static export
  distDir: 'out',
  
  // Configure images
  images: {
    unoptimized: true, // Required for static exports
  },
  
  // Enable React Strict Mode
  reactStrictMode: true,
  
  // Configure page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  
  // Optional: Add basePath if your app is not served from the root
  // basePath: '/your-base-path',
};

module.exports = nextConfig;
