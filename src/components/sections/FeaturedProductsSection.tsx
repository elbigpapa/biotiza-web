'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import SectionHeading from '@/components/ui/SectionHeading'
import { Container } from '@/components/ui/Container'
import ProductCard, { type ProductCardData } from '@/components/products/ProductCard'

// ─── Productos estrella (orden definido por equipo comercial) ─────────────
// El orden es importante: el primer producto es el más prioritario.
// Mezcla líneas (orgánicos · bioestimulantes · nutrición · bioprotección) para
// mostrar la amplitud del catálogo a la vez que destacamos los más pedidos.

const FEATURED_PRODUCTS: ProductCardData[] = [
  {
    id: 'bp-koren',
    slug: 'bp-koren',
    name: 'BP Koren',
    line: 'organicos',
    tagline: 'Enraizador de alta concentración. Activa raíces nuevas en 7 días post-trasplante.',
    icon: '🌱',
  },
  {
    id: 'bp-fiore',
    slug: 'bp-fiore',
    name: 'BP Fioré',
    line: 'bioestimulantes',
    tagline: 'Inductor de floración. Más yemas florales, más uniformes, más rentables.',
    icon: '🌸',
  },
  {
    id: 'bp-gross',
    slug: 'bp-gross',
    name: 'BP Gross',
    line: 'bioestimulantes',
    tagline: 'Engordador de fruto. Calibre comercial superior con K + citoquininas.',
    icon: '⚖️',
  },
  {
    id: 'k-ultra',
    slug: 'k-ultra',
    name: 'K-Ultra',
    line: 'nutricion',
    tagline: 'Potasio líquido K₂O 40%. Motor del Brix, la firmeza y la coloración del fruto.',
    icon: '💧',
  },
  {
    id: 'bp-potasio',
    slug: 'bp-potasio',
    name: 'BP Potasio',
    line: 'organicos',
    tagline: 'Potasio orgánico quelatado OMRI Listed. Calidad de fruto sin residuos.',
    icon: '🍇',
  },
  {
    id: 'bp-calcio',
    slug: 'bp-calcio',
    name: 'BP Calcio',
    line: 'organicos',
    tagline: 'Calcio orgánico quelatado. Previene BER, rajaduras y bitter pit.',
    icon: '🧪',
  },
  {
    id: 'ae-calcium',
    slug: 'ae-calcium',
    name: 'AE Calcium',
    line: 'organicos',
    tagline: 'Calcio premium con ácidos polihidroxicarboxílicos. Máxima firmeza post-cosecha.',
    icon: '💎',
  },
  {
    id: 'brotanic',
    slug: 'brotanic',
    name: 'Brotanic',
    line: 'nutricion',
    tagline: 'Cu + Mn + Zn líquidos de Veganic. Vigor foliar y prevención de clorosis.',
    icon: '🍃',
  },
  {
    id: 'elicitor-sin',
    slug: 'elicitor-sin',
    name: 'Elicitor-Sin',
    line: 'bioproteccion',
    tagline: 'Biofungicida con Trichoderma harzianum. Antagonista natural de Fusarium y Rhizoctonia.',
    icon: '🛡️',
  },
  {
    id: 'max-kill-plus',
    slug: 'max-kill-plus',
    name: 'Max-Kill Plus',
    line: 'bioproteccion',
    tagline: 'Bioinsecticida multiacción. Control biológico de plagas con resistencia química.',
    icon: '🦠',
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
