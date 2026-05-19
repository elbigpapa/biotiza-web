/**
 * page.tsx — Homepage editorial · Sub-fase 3.3
 * Reemplaza biotiza-web/src/app/page.tsx
 *
 * Cambios:
 *  · Quita WaveSeparators (eran demasiado "template")
 *  · Nueva secuencia editorial:
 *      Hero → Proceso (4 actos) → Servicio (qué nos diferencia)
 *    → Marquee certificaciones → Líneas (editorial list) → Producto signature
 *    → Cultivos (8 expedientes) → Lo que medimos (objetivos)
 *    → Sustentabilidad (huella) → Mapa MX → Caso reportaje → CTA final
 *  · Bordes hairline entre secciones, no ondas
 *
 * NOTA (aplicación Sub-fase 3.3a): `SustainabilitySection` y `MapSection`
 * aún no se han entregado al repo. Quedan importados/usados pero
 * COMENTADOS para que el build compile y la home editorial quede en
 * producción. Al recibir esos 2 componentes, descomentar las 4 líneas
 * marcadas con «TODO Sub-fase 3.3b».
 */

import HeroSection           from '@/components/sections/HeroSection'
import WhyBiotizaSection     from '@/components/sections/WhyBiotizaSection'
import ServiceSection        from '@/components/sections/ServiceSection'
import CertificationsMarquee from '@/components/sections/CertificationsMarquee'
import ProductLinesSection   from '@/components/sections/ProductLinesSection'
import FeaturedProductsSection from '@/components/sections/FeaturedProductsSection'
import CropsSection          from '@/components/sections/CropsSection'
import StatsSection          from '@/components/sections/StatsSection'
// TODO Sub-fase 3.3b: import SustainabilitySection from '@/components/sections/SustainabilitySection'
// TODO Sub-fase 3.3b: import MapSection            from '@/components/sections/MapSection'
import TestimonialsSection   from '@/components/sections/TestimonialsSection'
import CTASection            from '@/components/sections/CTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyBiotizaSection />        {/* Proceso Lab → Campo → Asesor → Cosecha */}
      <ServiceSection />           {/* "Vendemos productos. Acompañamos resultados." */}
      <CertificationsMarquee />    {/* COFEPRIS · OMRI · Hecho en MX (delgado) */}
      <ProductLinesSection />      {/* Lista editorial 5 líneas */}
      <FeaturedProductsSection />  {/* BP Koren signature card */}
      <CropsSection />             {/* Grid fotográfico 8 cultivos */}
      <StatsSection />             {/* Lo que medimos · 4 indicadores */}
      {/* TODO Sub-fase 3.3b: <SustainabilitySection /> — Huella de carbono con fuentes citadas */}
      {/* TODO Sub-fase 3.3b: <MapSection /> — México 8 zonas de asesoría */}
      <TestimonialsSection />      {/* Caso reportaje · dato como titular */}
      <CTASection />               {/* Cuéntanos tu cultivo · WhatsApp */}
    </>
  )
}
