# Deployment Guide

This document provides instructions for deploying the Climate Change Solutions Chatbot to various platforms.

## Vercel Deployment (Recommended)

Vercel is the easiest platform for deploying Next.js applications:

1. Create an account at [Vercel](https://vercel.com) if you don't have one
2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Login to Vercel:
   ```bash
   vercel login
   ```
4. Deploy from the project directory:
   ```bash
   vercel
   ```
5. For production deployment:
   ```bash
   vercel --prod
   ```

You can also connect your GitHub repository directly to Vercel for automatic deployments:

1. Go to [Vercel](https://vercel.com) and sign in
2. Click "Add New..." > "Project"
3. Import your GitHub repository
4. Configure project settings (the defaults work well for Next.js)
5. Click "Deploy"

## GitHub Pages Deployment

For GitHub Pages deployment, you'll need to add some configuration:

1. Install the gh-pages package:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Update your `next.config.js` file:
   ```js
   const nextConfig = {
     output: 'export',
     basePath: '/research-chatbot',
     assetPrefix: '/research-chatbot/',
     images: {
       unoptimized: true,
     },
   };
   
   module.exports = nextConfig;
   ```

3. Add deployment scripts to your `package.json`:
   ```json
   "scripts": {
     "deploy": "next build && next export && touch out/.nojekyll && gh-pages -d out -t true"
   }
   ```

4. Run the deployment:
   ```bash
   npm run deploy
   ```

Note that GitHub Pages has some limitations with Next.js applications, particularly with API routes. For a full-featured deployment, Vercel is recommended. 