/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
    UPLOAD_IO_API_KEY: process.env.UPLOAD_IO_API_KEY
  },
  swcMinify: true,
  images: {
    domains: [
      'pbs.twimg.com',
      'kajabi-storefronts-production.kajabi-cdn.com',
      'i.insider.com',
      'upload.wikimedia.org',
      'pbs.twimg.com',
      'yt3.ggpht.com',
      'picsum.photos',
      'avatars.dicebear.com',
      'upcdn.io',
      'gateway.pinata.cloud'
    ],
  },
}

module.exports = nextConfig
