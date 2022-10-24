const URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mormedi.com'

module.exports = {
  siteUrl: URL,
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'],
  alternateRefs: [
    {
      href: URL,
      hreflang: 'en',
    },
    {
      href: `${URL}/es`,
      hreflang: 'es',
    },
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: ['/', '/_next/*.css$', '/_next/*.js$'],
        disallow: '/_next/'
      },
    ],
    additionalSitemaps: [
      `${URL}/sitemap.xml`,
      `${URL}/server-sitemap.xml`
    ],
  },
}
