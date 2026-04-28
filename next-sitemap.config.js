/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://realcap.app',
  outputDir: './out',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  exclude: ['/api/*'],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
};