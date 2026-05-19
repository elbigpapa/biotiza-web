/**
 * page.tsx — Homepage editorial · Sub-fase 3.3d
 * Reemplaza biotiza-web/src/app/page.tsx
 *
 * NOTA · WaveSeparators eliminados intencionalmente: con la paleta tierra
 * editorial las transiciones se manejan con cambios sutiles de fondo
 * (white → paper-2 → paper → ink → verde-950), sin SVG decorativo entre
 * secciones.
 *
 * Si todavía tienes WhyBiotizaSection, StatsSection, AssistantPreviewSection
 * o BlogPreviewSection, decide si reincorporarlos. Este orden propone una
 * narrativa editorial de 11 secciones consecutivas.
 */

import HeroSection             from '@/components/sections/HeroSection'
import CertificationsMarquee   from '@/components/sections/CertificationsMarquee'
import ProductLinesSection     from '@/components/sections/ProductLinesSection'
import FeaturedProductsSection from '@/components/sections/FeaturedProductsSection'
import CropsSection            from '@/components/sections/CropsSection'
import TestimonialsSection     from '@/components/sections/TestimonialsSection'
import SustainabilitySection   from '@/components/sections/SustainabilitySection'
import MapSection              from '@/components/sections/MapSection'
import CTASection              from '@/components/sections/CTASection'

export default function HomePage() {
  return (
    <>
      {/* 01 · Hero cinematográfico — foto + display 200px */}
      <HeroSection />

      {/* 02 · Marquee trust bar — certificaciones */}
      <CertificationsMarquee />

      {/* 03 · Portafolio — lista editorial de 5 líneas */}
      <ProductLinesSection />

      {/* 04 · Producto signature — BP Koren con ciencia visible */}
      <FeaturedProductsSection />

      {/* 05 · Cultivos — grid fotográfico cinematográfico */}
      <CropsSection />

      {/* 06 · Filosofía / pull quote editorial */}
      <TestimonialsSection />

      {/* 07 · Huella de carbono — datos sustentados con fuentes */}
      <SustainabilitySection />

      {/* 08 · Mapa México — 9 zonas con asesoría */}
      <MapSection />

      {/* 09 · CTA final — WhatsApp + calculadora ROI */}
      <CTASection />
    </>
  )
}
