/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  appDir: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
        pathname:
          '/img/ecommerce-images/product-page-01-related-product-01.jpg',
      },
    ],
  },
}

module.exports = nextConfig
