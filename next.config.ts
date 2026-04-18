import type { NextConfig } from 'next'

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
const cspDirectives: Record<string, string[]> = {
  'default-src':  ["'self'"],
  'script-src':   ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://www.googletagmanager.com', 'https://www.google-analytics.com', 'https://vercel.live'],
  'style-src':    ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  'img-src':      ["'self'", 'data:', 'blob:', 'https:'],
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
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

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
      {
        source: '/fonts/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },

  async redirects() {
    return [
      { source: '/aviso-de-privacidad', destination: '/politica-privacidad', permanent: true },
      { source: '/productos/:path*', destination: '/soluciones/:path*', permanent: true },
    ]
  },

  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
}

export default nextConfig
