import type { Metadata, Viewport } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SmoothScrollProvider from '@/components/redesign/SmoothScrollProvider'
import WhatsAppFloat from '@/components/shared/WhatsAppFloat'
import CookieConsent from '@/components/shared/CookieConsent'
import GoogleAnalytics from '@/components/shared/GoogleAnalytics'
import ScrollProgress from '@/components/ui/ScrollProgress'
import ToastProvider from '@/components/ui/Toast'
// ChatWidget cargado de forma diferida (next/dynamic + ssr:false) vía un
// wrapper cliente, para sacarlo del bundle JS inicial de las 186 páginas.
// El wrapper es necesario porque este layout es Server Component y Next 16
// no permite `ssr:false` con next/dynamic dentro de Server Components.
import ChatWidget from '@/components/chat/ChatWidgetLazy'

// ─── Organization + LocalBusiness JSON-LD ─────────────────────────────────
function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": "https://biotiza.mx/#org",
    "name": "Biotiza",
    "legalName": "Biotiza Biosoluciones Agrícolas",
    "url": "https://biotiza.mx",
    "logo": {
      "@type": "ImageObject",
      "url": "https://biotiza.mx/images/logos/biotiza-icon-color.png",
      "width": 800,
      "height": 800,
    },
    "image": "https://biotiza.mx/og-image.png",
    "description": "Empresa mexicana de biosoluciones agrícolas. Fertilizantes orgánicos, bioestimulantes y bioprotección para cultivos de exportación.",
    "foundingDate": "2021",
    "slogan": "Del laboratorio a tu cultivo, con un agrónomo a tu lado.",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Carretera Cd. Guzmán - Zapotiltic KM 8",
      "addressLocality": "Zapotiltic",
      "addressRegion": "Jalisco",
      "postalCode": "49000",
      "addressCountry": "MX"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 19.6538185,
      "longitude": -103.4744823
    },
    "areaServed": [
      { "@type": "Country", "name": "México" },
      { "@type": "AdministrativeArea", "name": "Jalisco" },
      { "@type": "AdministrativeArea", "name": "Sinaloa" },
      { "@type": "AdministrativeArea", "name": "Michoacán" },
      { "@type": "AdministrativeArea", "name": "Guanajuato" }
    ],
    "contactPoint": [{
      "@type": "ContactPoint",
      "telephone": "+52-33-1602-2708",
      "contactType": "sales",
      "availableLanguage": ["Spanish"],
      "areaServed": "MX"
    }],
    "email": "ventas@biotiza.mx",
    "telephone": "+52-33-1602-2708",
    "sameAs": [
      "https://www.instagram.com/biotiza.mx/",
      "https://facebook.com/biotiza",
      "https://linkedin.com/company/biotiza"
    ]
  }
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://biotiza.mx/#website",
    "url": "https://biotiza.mx",
    "name": "Biotiza",
    "inLanguage": "es-MX",
    "publisher": { "@id": "https://biotiza.mx/#org" },
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  )
}

// ─── Viewport ──────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0d5c4a' },
  ],
  colorScheme: 'light',
}

// ─── Google Fonts ──────────────────────────────────────────────────────────
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dm-serif',
  display: 'swap',
})

// ─── Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: 'Biotiza — Biosoluciones Agrícolas',
    template: '%s | Biotiza',
  },
  description:
    'Fertilizantes orgánicos, bioestimulantes y bioprotección para cultivos de exportación. Directo de laboratorio a tu campo. Zapotiltic, Jalisco.',
  keywords: [
    'bioestimulantes México',
    'fertilizantes orgánicos',
    'control biológico plagas',
    'fertirrigación',
    'enraizadores orgánicos',
    'nutrición vegetal',
    'bioprotección cultivos',
    'productos OMRI México',
    'fertilizantes líquidos',
    'aminoácidos plantas',
  ],
  authors: [{ name: 'Biotiza', url: 'https://biotiza.mx' }],
  creator: 'Biotiza',
  metadataBase: new URL('https://biotiza.mx'),
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://biotiza.mx',
    siteName: 'Biotiza',
    title: 'Biotiza — Biosoluciones Agrícolas',
    description:
      'Fertilizantes orgánicos, bioestimulantes y bioprotección para cultivos de exportación. Directo de laboratorio a tu campo.',
    // Sin `images` aquí — Next usa el opengraph-image.tsx (1200×630 dinámico)
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biotiza — Biosoluciones Agrícolas',
    description:
      'Fertilizantes orgánicos, bioestimulantes y bioprotección para cultivos de exportación.',
    // Sin `images` — Next usa el twitter-image.tsx
  },
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
  },
}

// ─── Root Layout ───────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${dmSans.variable} ${dmSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-sans text-gris-900">
        <OrganizationJsonLd />
        <div className="no-print">
          <ScrollProgress />
        </div>
        <ToastProvider>
          <Header />
          <main className="flex-1">
            <SmoothScrollProvider>{children}</SmoothScrollProvider>
          </main>
          <Footer />
          <div className="no-print">
            <WhatsAppFloat />
            <ChatWidget />
            <CookieConsent />
          </div>
        </ToastProvider>
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId="G-VY5V5D35TB" />
      </body>
    </html>
  )
}
