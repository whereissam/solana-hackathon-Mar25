/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Add this if you're using mapbox-gl or other browser APIs
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  }
}

module.exports = nextConfig
