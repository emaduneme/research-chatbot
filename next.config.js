/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Add webpack configuration to handle external modules
  webpack: (config) => {
    return config;
  },
}

module.exports = nextConfig 