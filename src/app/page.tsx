/**
 * page.tsx — Homepage · rediseño 2026
 *
 * 9 escenas con el modelo de 2 capas (gancho escaneable + inmersión
 * opcional). Cada escena entra con animación al hacer scroll e invita
 * a seguir bajando.
 *
 * Orden: Hero → Proceso → Servicio → Soluciones → Cultivos →
 *        Herramientas → Huella de carbono → Filosofía → CTA.
 *
 * Se retiraron del home la banda de Certificaciones (la cubre cada
 * ficha de producto) y la sección de Producto Estrella (los destacados
 * ya viven en Soluciones).
 */

import type { Metadata } from 'next'
import HeroSection           from '@/components/sections/HeroSection'
import WhyBiotizaSection     from '@/components/sections/WhyBiotizaSection'
import ServiceSection        from '@/components/sections/ServiceSection'
import ProductLinesSection   from '@/components/sections/ProductLinesSection'
import CropsSection          from '@/components/sections/CropsSection'
import HerramientasSection   from '@/components/sections/HerramientasSection'
import SustainabilitySection from '@/components/sections/SustainabilitySection'
import TestimonialsSection   from '@/components/sections/TestimonialsSection'
import CTASection            from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'Biotiza — Biosoluciones agrícolas mexicanas | Fertilizantes orgánicos y bioprotección',
  description:
    '25 años formulando bioestimulantes, fertilizantes orgánicos OMRI y bioprotección para agricultura de exportación. 47 productos · 35 cultivos con protocolo agronómico. Zapopan, Jalisco.',
  alternates: { canonical: 'https://biotiza.mx' },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://biotiza.mx',
    siteName: 'Biotiza',
    title: 'Biotiza — Biosoluciones agrícolas mexicanas',
    description:
      'Del laboratorio a tu cultivo, con un agrónomo a tu lado. Fertilizantes orgánicos, bioestimulantes y bioprotección para cultivos de exportación.',
    // images omitidas → Next usa src/app/opengraph-image.tsx (1200×630 generado)
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biotiza — Biosoluciones agrícolas mexicanas',
    description: '25 años · 47 productos · 35 cultivos. Asesoría técnica directa en campo.',
    // images omitidas → Next usa src/app/twitter-image.tsx
  },
}

export default function HomePage() {
  return (
    <>
      {/* 01 · Hero — "Ciencia que rinde al campo" */}
      <HeroSection />

      {/* 02 · Proceso — "Del laboratorio a tu cultivo" (4 actos) */}
      <WhyBiotizaSection />

      {/* 03 · Servicio — "Acompañamos resultados" */}
      <ServiceSection />

      {/* 04 · Soluciones — las 5 líneas de producto */}
      <ProductLinesSection />

      {/* 05 · Cultivos — invitación medular a /cultivos */}
      <CropsSection />

      {/* 06 · Herramientas — "Calcula, diagnostica, decide" */}
      <HerramientasSection />

      {/* 07 · Huella de carbono — datos sustentados con fuentes */}
      <SustainabilitySection />

      {/* 08 · Filosofía — pull quote + "lo que no vamos a hacer" */}
      <TestimonialsSection />

      {/* 09 · CTA final — WhatsApp + cotización + mini-formulario */}
      <CTASection />
    </>
  )
}
