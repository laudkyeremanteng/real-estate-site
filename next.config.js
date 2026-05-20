/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'imgur.com'],
    formats: ['image/webp', 'image/avif'],
  },
}

module.exports = nextConfig
