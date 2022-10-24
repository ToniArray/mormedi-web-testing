/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  eslint: {
    ignoreDuringBuilds: true,
  },

  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
  },
}

module.exports = nextConfig
