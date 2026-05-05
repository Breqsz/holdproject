/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 640, 828, 1080, 1280, 1920],
    minimumCacheTTL: 31536000,
  },
}

export default nextConfig
