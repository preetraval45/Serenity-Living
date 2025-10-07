/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'images.unsplash.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://theserenityliving.com',
  },
  experimental: {
    esmExternals: 'loose'
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/gallery',
        destination: '/',
        permanent: true,
      },
      {
        source: '/staff',
        destination: '/about',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig