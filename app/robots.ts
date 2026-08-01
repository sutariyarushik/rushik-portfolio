import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/chat', '/api/contact'],
    },
    sitemap: 'https://rushik-portfolio.vercel.app/sitemap.xml',
  };
}
