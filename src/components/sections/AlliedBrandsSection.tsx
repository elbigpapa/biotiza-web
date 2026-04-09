'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import SectionHeading from '@/components/ui/SectionHeading'
import { Container } from '@/components/ui/Container'

const BRANDS = [
  {
    name: 'Veganic',
    description: 'Productos especializados de nutrición vegetal con enfoque en soluciones orgánicas de alta eficiencia.',
    tag: 'Nutrición especializada',
    initial: 'VG',
    color: 'from-emerald-600 to-teal-500',
    href: '#',
  },
  {
    name: 'Agrobionsa',
    description: 'Biosoluciones innovadoras para agricultura intensiva. Inoculantes y bioestimulantes de nueva generación.',
    tag: 'Biosoluciones',
    initial: 'AB',
    color: 'from-verde-600 to-verde-400',
    href: '#',
  },
  {
    name: 'Bioproductos Agrícolas',
    description: 'Insumos de alta tecnología agrícola. Línea completa de micronutrientes y quelatos especializados.',
    tag: 'Alta tecnología',
    initial: 'BA',
    color: 'from-azul-600 to-azul-400',
    href: '#',
  },
]

export default function AlliedBrandsSection() {
  return (
    <section className="bg-gris-50 py-20 lg:py-28">
      <Container>
        <SectionHeading
          tag="Marcas aliadas"
          title="Completamos tu programa con las mejores marcas"
          subtitle="Distribuimos líneas complementarias líderes en el mercado para que tengas todo en un solo proveedor."
          className="mb-16"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-6 sm:grid-cols-3"
        >
          {BRANDS.map((brand) => (
            <motion.div
              key={brand.name}
              variants={fadeInUp}
              className="group flex flex-col rounded-2xl bg-white border border-gris-100 shadow-card overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Placeholder logo */}
              <div className={`relative flex h-36 items-center justify-center bg-gradient-to-br ${brand.color}`}>
                <span className="font-serif text-4xl font-normal text-white/90 select-none">
                  {brand.initial}
                </span>
                <span className="absolute bottom-3 left-3 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                  {brand.tag}
                </span>
              </div>

              <div className="flex flex-col flex-1 p-5 gap-3">
                <h3 className="font-sans text-base font-semibold text-gris-900">
                  {brand.name}
                </h3>
                <p className="text-sm leading-relaxed text-gris-600 flex-1">
                  {brand.description}
                </p>
                <Link
                  href={brand.href}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-verde-600 transition-all group-hover:gap-2.5"
                >
                  Ver productos
                  <ExternalLink size={12} />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
