'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import SectionHeading from '@/components/ui/SectionHeading'
import { Container } from '@/components/ui/Container'
import ProductCard, { type ProductCardData } from '@/components/products/ProductCard'

// ─── Productos destacados ─────────────────────────────────────────────────

const FEATURED_PRODUCTS: ProductCardData[] = [
  {
    id: 'bp-calcio',
    slug: 'bp-calcio',
    name: 'BP Calcio',
    line: 'especialidades',
    tagline: 'Calcio quelado 10% + Boro 0.5%. Previene bitter pit y rajaduras en frutos.',
    icon: '🧪',
  },
  {
    id: 'bp-moots',
    slug: 'bp-moots',
    name: 'BP Moots',
    line: 'organicos',
    tagline: 'Enraizador orgánico: Ácidos húmicos 8% + Ácidos fúlvicos 2% + Micorrizas.',
    icon: '🌱',
  },
  {
    id: 'bp-nitro-fx',
    slug: 'bp-nitro-fx',
    name: 'BP Nitro FX',
    line: 'nutricion',
    tagline: 'Nitrógeno líquido de alta concentración 20-0-0. Ideal para crecimiento vegetativo.',
    icon: '💧',
  },
  {
    id: 'bp-fiore',
    slug: 'bp-fiore',
    name: 'BP Fioré',
    line: 'bioestimulantes',
    tagline: 'Inductor de floración: Citoquininas + Auxinas + Giberelinas. Homogeneidad en la flor.',
    icon: '🌸',
  },
  {
    id: 'bp-cuaje',
    slug: 'bp-cuaje',
    name: 'BP Cuaje',
    line: 'bioestimulantes',
    tagline: 'Bioestimulante de cuajado con aminoácidos y cofactores enzimáticos. Reduce aborto floral.',
    icon: '🍇',
  },
  {
    id: 'bp-gross',
    slug: 'bp-gross',
    name: 'BP Gross',
    line: 'bioestimulantes',
    tagline: 'Engordador de fruto: Potasio + Citoquininas + Algas. Calibre y peso superiores.',
    icon: '⚖️',
  },
  {
    id: 'n-ultra',
    slug: 'n-ultra',
    name: 'N-Ultra',
    line: 'nutricion',
    tagline: 'NPK 20-20-20 + microelementos quelados. Fertilizante completo para fertirrigación.',
    icon: '🔬',
  },
  {
    id: 'zen-chrys',
    slug: 'zen-chrys',
    name: 'Zen-Chrys',
    line: 'zentia',
    tagline: 'Insecticida biológico a base de crisantemo. Control de trips, mosca blanca y ácaros.',
    icon: '🛡️',
  },
]

// ─── Componente ───────────────────────────────────────────────────────────

export default function FeaturedProductsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' })
  }

  return (
    <section className="relative bg-gris-50/50 py-24 lg:py-32 overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-verde-50/30 to-transparent pointer-events-none" aria-hidden="true" />

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <motion.div variants={fadeInUp} className="flex items-end justify-between mb-14 flex-wrap gap-4">
            <SectionHeading
              tag="Lo más pedido"
              title="Productos estrella"
              align="left"
              animate={false}
            />
            {/* Flechas desktop premium */}
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <button
                onClick={() => scroll('left')}
                aria-label="Anterior"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-gris-200 bg-white text-gris-500 shadow-sm transition-all duration-300 hover:border-verde-300 hover:text-verde-600 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scroll('right')}
                aria-label="Siguiente"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-gris-200 bg-white text-gris-500 shadow-sm transition-all duration-300 hover:border-verde-300 hover:text-verde-600 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Carrusel */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-6 px-4 sm:px-6 lg:px-8 xl:px-[max(2rem,calc((100vw-1280px)/2+2rem))]"
        style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
      >
        {FEATURED_PRODUCTS.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ scrollSnapAlign: 'start' }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}

        {/* Spacer final */}
        <div className="w-4 shrink-0" aria-hidden="true" />
      </div>

      {/* Scroll indicator mobile */}
      <div className="mt-6 flex justify-center gap-1.5 sm:hidden">
        {Array.from({ length: Math.ceil(FEATURED_PRODUCTS.length / 2) }).map((_, i) => (
          <span key={i} className={`h-1.5 rounded-full transition-all ${i === 0 ? 'w-6 bg-verde-500' : 'w-1.5 bg-gris-300'}`} />
        ))}
      </div>
    </section>
  )
}
