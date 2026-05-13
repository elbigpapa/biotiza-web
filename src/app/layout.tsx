import type { Metadata } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import './globals.css'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/shared/WhatsAppFloat'
import CookieConsent from '@/components/shared/CookieConsent'
import ChatWidget from '@/components/chat/ChatWidget'

// ─── Organization JSON-LD ─────────────────────────────────────────────────
function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
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
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Zapopan",
      "addressRegion": "Jalisco",
      "addressCountry": "MX"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+52-33-1602-2708",
      "contactType": "sales",
      "availableLanguage": "Spanish",
      "areaServed": "MX"
    },
    "sameAs": [
      "https://instagram.com/biotiza",
      "https://facebook.com/biotiza",
      "https://linkedin.com/company/biotiza"
    ]
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
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
    'Fertilizantes orgánicos, bioestimulantes y bioprotección para cultivos de exportación. Directo de laboratorio a tu campo. Zapopan, Jalisco.',
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
    images: [
      {
        url: '/og-image.png',
        width: 1080,
        height: 1080,
        alt: 'Biotiza — Biosoluciones agrícolas',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biotiza — Biosoluciones Agrícolas',
    description:
      'Fertilizantes orgánicos, bioestimulantes y bioprotección para cultivos de exportación.',
    images: ['/og-image.png'],
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
      className={`${dmSans.variable} ${dmSerif.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-sans text-gris-900">
        <OrganizationJsonLd />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <ChatWidget />
        <CookieConsent />
      </body>
    </html>
  )
}
