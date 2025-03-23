/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Add webpack configuration to handle external modules
  webpack: (config) => {
    return config;
  },
  
  // For GitHub Pages deployment
  // Comment these out when not deploying to GitHub Pages
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/research-chatbot' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/research-chatbot/' : '',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig 