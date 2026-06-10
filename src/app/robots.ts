/**
 * robots.ts — App Router dynamic robots.txt
 *
 * Permite a todos los rastreadores indexar el sitio público,
 * bloquea solo las rutas dinámicas internas (/api/*) y apunta al sitemap.
 *
 * IMPORTANTE: NO se bloquea `/_next/` ni `/_next/static`. Googlebot DEBE poder
 * cargar el CSS/JS desde ahí para renderizar la página; bloquearlo deja el
 * render de Google visualmente vacío y degrada la indexación. Los assets de
 * `/_next/static` no son indexables por sí mismos, así que permitirlos no
 * genera URLs basura en el índice.
 */

import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://biotiza.mx/sitemap.xml',
    host: 'https://biotiza.mx',
  }
}
