/**
 * page.tsx — Homepage de Biotiza
 *
 * Composición de todas las secciones con separadores orgánicos SVG entre ellas.
 * El orden y los separadores están diseñados para un flujo visual coherente.
 */

import HeroSection            from '@/components/sections/HeroSection'
import WhyBiotizaSection      from '@/components/sections/WhyBiotizaSection'
import AssistantPreviewSection from '@/components/sections/AssistantPreviewSection'
import ProductLinesSection    from '@/components/sections/ProductLinesSection'
import FeaturedProductsSection from '@/components/sections/FeaturedProductsSection'
import CropsSection           from '@/components/sections/CropsSection'
import AlliedBrandsSection    from '@/components/sections/AlliedBrandsSection'
import CTASection             from '@/components/sections/CTASection'
import BlogPreviewSection     from '@/components/sections/BlogPreviewSection'
import ContactFormSection     from '@/components/sections/ContactFormSection'
import WaveSeparator          from '@/components/shared/WaveSeparator'

export default function HomePage() {
  return (
    <>
      {/* 1 ─ Hero: verde-900 → verde-700 */}
      <HeroSection />

      {/* Transición: verde-900 → verde-50 */}
      <WaveSeparator from="verde-900" to="verde-50" variant="gentle" />

      {/* 2 ─ ¿Por qué Biotiza? — fondo verde-50 */}
      <WhyBiotizaSection />

      {/* Transición: verde-50 → gris-900 */}
      <WaveSeparator from="verde-50" to="gris-900" variant="steep" />

      {/* 3 ─ Asistente IA — fondo gris-900 */}
      <AssistantPreviewSection />

      {/* Transición: gris-900 → white */}
      <WaveSeparator from="gris-900" to="white" variant="double" flip />

      {/* 4 ─ Líneas de producto — fondo blanco */}
      <ProductLinesSection />

      {/* Transición: white → verde-50 */}
      <WaveSeparator from="white" to="verde-50" variant="gentle" flip />

      {/* 5 ─ Productos destacados (carrusel) — fondo verde-50 */}
      <FeaturedProductsSection />

      {/* Transición: verde-50 → white */}
      <WaveSeparator from="verde-50" to="white" variant="steep" />

      {/* 6 ─ Cultivos — fondo blanco */}
      <CropsSection />

      {/* Transición: white → gris-50 */}
      <WaveSeparator from="white" to="gris-50" variant="gentle" flip />

      {/* 7 ─ Marcas aliadas — fondo gris-50 */}
      <AlliedBrandsSection />

      {/* Transición: gris-50 → verde-800 */}
      <WaveSeparator from="gris-50" to="verde-800" variant="double" />

      {/* 8 ─ CTA — fondo verde-800 */}
      <CTASection />

      {/* Transición: verde-800 → white */}
      <WaveSeparator from="verde-800" to="white" variant="steep" flip />

      {/* 9 ─ Blog — fondo blanco */}
      <BlogPreviewSection />

      {/* Transición: white → verde-50 */}
      <WaveSeparator from="white" to="verde-50" variant="gentle" />

      {/* 10 ─ Contacto — fondo verde-50 */}
      <ContactFormSection />
    </>
  )
}
