'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import SectionHeading from '@/components/ui/SectionHeading'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils'

const BRANDS = [
  {
    name: 'Veganic',
    description: 'Productos especializados de nutrición vegetal con enfoque en soluciones orgánicas de alta eficiencia.',
    tag: 'Nutrición especializada',
    initial: 'VG',
    gradient: 'from-emerald-600 to-teal-500',
    borderHover: 'hover:border-emerald-200',
    href: '#',
  },
  {
    name: 'Agrobionsa',
    description: 'Biosoluciones innovadoras para agricultura intensiva. Inoculantes y bioestimulantes de nueva generación.',
    tag: 'Biosoluciones',
    initial: 'AB',
    gradient: 'from-verde-600 to-verde-400',
    borderHover: 'hover:border-verde-200',
    href: '#',
  },
  {
    name: 'Bioproductos Agrícolas',
    description: 'Insumos de alta tecnología agrícola. Línea completa de micronutrientes y quelatos especializados.',
    tag: 'Alta tecnología',
    initial: 'BA',
    gradient: 'from-azul-600 to-azul-400',
    borderHover: 'hover:border-azul-200',
    href: '#',
  },
]

export default function AlliedBrandsSection() {
  return (
    <section className="relative bg-gris-50/50 py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-40" aria-hidden="true" />

      <Container className="relative z-10">
        <SectionHeading
          tag="Marcas aliadas"
          title="Completamos tu programa con las mejores marcas"
          subtitle="Distribuimos líneas complementarias líderes en el mercado para que tengas todo en un solo proveedor."
          className="mb-20"
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
              className={cn(
                'group flex flex-col rounded-2xl bg-white border border-gris-100 overflow-hidden',
                'shadow-[0_2px_20px_rgba(15,23,42,0.04)]',
                'hover:shadow-[0_12px_40px_rgba(15,23,42,0.08)]',
                'transition-all duration-500 hover:-translate-y-1',
                brand.borderHover,
              )}
            >
              {/* Logo placeholder con gradiente premium */}
              <div className={cn('relative flex h-40 items-center justify-center bg-gradient-to-br', brand.gradient, 'overflow-hidden')}>
                {/* Decorative elements */}
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" aria-hidden="true" />
                <div className="absolute left-8 -bottom-10 h-20 w-20 rounded-full bg-white/5" aria-hidden="true" />

                <span className="font-serif text-5xl font-normal text-white/90 select-none drop-shadow-sm">
                  {brand.initial}
                </span>
                <span className="absolute bottom-4 left-4 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                  {brand.tag}
                </span>
              </div>

              <div className="flex flex-col flex-1 p-6 gap-3">
                <h3 className="font-sans text-base font-semibold text-gris-900">
                  {brand.name}
                </h3>
                <p className="text-sm leading-relaxed text-gris-500 flex-1">
                  {brand.description}
                </p>
                <Link
                  href={brand.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-verde-600 transition-all duration-300 group-hover:gap-2.5"
                >
                  Ver productos
                  <ExternalLink size={13} />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
