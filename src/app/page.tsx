/**
 * page.tsx — Homepage editorial · Sub-fase 3.7
 *
 * Reconstruida para coincidir con el prototipo de Claude Design
 * (biotizamx/project/prototype/home.jsx). La versión 3.3d había
 * ELIMINADO dos secciones que sí están en el prototipo:
 *   · WhyBiotizaSection  — "Del laboratorio a tu cultivo" (proceso 4 actos)
 *   · ServiceSection     — "Vendemos productos. Acompañamos resultados."
 * Ahora se reincorporan en el orden del prototipo.
 *
 * MapSection se RETIRA por petición del usuario (no le gustó). El
 * archivo del componente se conserva en el repo, sólo se desconecta
 * del home.
 *
 * Orden del prototipo:
 *   Hero → Proceso → Servicio → Portafolio → Filosofía(pull quote)
 *   → Producto signature → Cultivos → Sustentabilidad → CTA
 * Sin WaveSeparators (transiciones por cambio de fondo editorial).
 */

import HeroSection             from '@/components/sections/HeroSection'
import CertificationsMarquee   from '@/components/sections/CertificationsMarquee'
import WhyBiotizaSection       from '@/components/sections/WhyBiotizaSection'
import ServiceSection          from '@/components/sections/ServiceSection'
import ProductLinesSection     from '@/components/sections/ProductLinesSection'
import TestimonialsSection     from '@/components/sections/TestimonialsSection'
import FeaturedProductsSection from '@/components/sections/FeaturedProductsSection'
import CropsSection            from '@/components/sections/CropsSection'
import SustainabilitySection   from '@/components/sections/SustainabilitySection'
import CTASection              from '@/components/sections/CTASection'

export default function HomePage() {
  return (
    <>
      {/* 01 · Hero cinematográfico — foto + display 200px */}
      <HeroSection />

      {/* 02 · Marquee trust bar — certificaciones */}
      <CertificationsMarquee />

      {/* 03 · Proceso — "Del laboratorio a tu cultivo" (4 actos) */}
      <WhyBiotizaSection />

      {/* 04 · Servicio — "Vendemos productos. Acompañamos resultados." */}
      <ServiceSection />

      {/* 05 · Portafolio — lista editorial de 5 líneas */}
      <ProductLinesSection />

      {/* 06 · Filosofía — pull quote editorial */}
      <TestimonialsSection />

      {/* 07 · Producto signature — BP Koren con ciencia visible */}
      <FeaturedProductsSection />

      {/* 08 · Cultivos — grid fotográfico cinematográfico */}
      <CropsSection />

      {/* 09 · Huella de carbono — datos sustentados con fuentes */}
      <SustainabilitySection />

      {/* 10 · CTA final — WhatsApp + calculadora ROI */}
      <CTASection />
    </>
  )
}
