/**
 * robots.ts — App Router dynamic robots.txt
 *
 * Permite a todos los rastreadores indexar el sitio público,
 * bloquea las rutas dinámicas internas (/api/*) y apunta al sitemap.
 */

import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: 'https://biotiza.mx/sitemap.xml',
    host: 'https://biotiza.mx',
  }
}
