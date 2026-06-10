import type { NextConfig } from 'next'
import path from 'node:path'

/**
 * next.config.ts — Biotiza Website
 *
 * Configura:
 *  • Optimización de imágenes (AVIF/WebP, dominios remotos seguros)
 *  • Headers de seguridad (CSP, HSTS, clickjacking, MIME sniffing, referrer, permissions)
 *  • Compresión, poweredByHeader off, eslint/typecheck en build
 *  • Redirects legacy (/privacidad/* → /politica-privacidad)
 */

const isProd = process.env.NODE_ENV === 'production'

// ─── Content Security Policy ────────────────────────────────────────────────
// Nota: Next 16 + React 19 inline algunos scripts de runtime → 'unsafe-inline'
// en script-src es inevitable sin nonces. Mantenemos 'self' + dominios conocidos.
//
// DEUDA TÉCNICA (XSS): 'unsafe-inline' en script-src debilita el CSP. Quitarlo
// requiere migrar a nonces/hashes en los scripts inline de Next y GA (Consent
// Mode). Pendiente. 'unsafe-eval' SOLO se permite en desarrollo (Turbopack/React
// Refresh lo necesitan); en producción NO se incluye.
const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  ...(isProd ? [] : ["'unsafe-eval'"]),
  'https://www.googletagmanager.com',
  'https://www.google-analytics.com',
  'https://vercel.live',
]

// img-src acotado a los orígenes realmente usados:
//  • 'self' / data: / blob:  → logos y productos locales, imágenes optimizadas
//  • images.unsplash.com      → fotos de cultivos/hero (ver src/data/crop-images.ts)
//  • google-analytics / gtm   → pixeles de tracking de GA4
const imgSrc = [
  "'self'",
  'data:',
  'blob:',
  'https://images.unsplash.com',
  'https://www.google-analytics.com',
  'https://www.googletagmanager.com',
]

const cspDirectives: Record<string, string[]> = {
  'default-src':  ["'self'"],
  'script-src':   scriptSrc,
  'style-src':    ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  'img-src':      imgSrc,
  'font-src':     ["'self'", 'data:', 'https://fonts.gstatic.com'],
  'connect-src':  ["'self'", 'https://www.google-analytics.com', 'https://vitals.vercel-insights.com', 'https://vercel.live', 'wss://ws-us3.pusher.com'],
  'media-src':    ["'self'", 'https:'],
  'object-src':   ["'none'"],
  'base-uri':     ["'self'"],
  'form-action':  ["'self'"],
  'frame-ancestors': ["'none'"],
  'frame-src':    ["'self'", 'https://www.google.com', 'https://maps.google.com'],
  'upgrade-insecure-requests': [],
}

const cspHeader = Object.entries(cspDirectives)
  .map(([key, values]) => (values.length ? `${key} ${values.join(' ')}` : key))
  .join('; ')

// ─── Security headers ───────────────────────────────────────────────────────
const securityHeaders = [
  { key: 'Content-Security-Policy', value: cspHeader },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()' },
  // Deprecado: el filtro XSS heredado de los navegadores puede introducir
  // vulnerabilidades. '0' lo desactiva; la protección real la da el CSP.
  { key: 'X-XSS-Protection', value: '0' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Resolver la raíz correcta del workspace (Windows tiene un package-lock.json en
  // C:\Users\elbig\ que confunde a Turbopack)
  turbopack: {
    root: path.resolve(__dirname),
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7,
    remotePatterns: [
      { protocol: 'https', hostname: 'biotiza.mx' },
      { protocol: 'https', hostname: 'www.biotiza.mx' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },

  typescript: {
    ignoreBuildErrors: false,
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: isProd ? securityHeaders : securityHeaders.filter(h => h.key !== 'Strict-Transport-Security'),
      },
      // Nota: no hay carpeta public/fonts (las fuentes van por next/font, que ya
      // emite Cache-Control immutable con hash). Se eliminó la regla muerta.
    ]
  },

  async redirects() {
    return [
      { source: '/aviso-de-privacidad', destination: '/politica-privacidad', permanent: true },
      { source: '/productos/:path*', destination: '/soluciones/:path*', permanent: true },
      // Legacy: Línea Zentia ahora es categoría Bioprotección
      { source: '/soluciones/zentia', destination: '/soluciones/bioproteccion', permanent: true },
      { source: '/soluciones/zentia/:slug*', destination: '/soluciones/bioproteccion/:slug*', permanent: true },
    ]
  },

  experimental: {
    optimizePackageImports: ['lucide-react', 'motion'],
  },
}

export default nextConfig
