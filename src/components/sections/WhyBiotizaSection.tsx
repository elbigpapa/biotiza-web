'use client'

import { motion } from 'framer-motion'
import { Truck, FlaskConical, Headphones, Globe, CheckCircle, TrendingUp, Bot } from 'lucide-react'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { cn } from '@/lib/utils'
import SectionHeading from '@/components/ui/SectionHeading'
import { Container } from '@/components/ui/Container'

const FEATURES = [
  {
    icons: [Truck],
    title: 'De Laboratorio a tu Campo',
    description: 'Sin intermediarios. Precio justo y soporte directo con asesoría técnica incluida en cada compra.',
    gradient: 'from-verde-500 to-verde-600',
    glowColor: 'rgba(34, 181, 115, 0.12)',
    borderColor: 'border-verde-200/60',
    hoverBorder: 'hover:border-verde-300',
  },
  {
    icons: [FlaskConical, CheckCircle],
    title: 'Ciencia Comprobada',
    description: 'Formulaciones con registro COFEPRIS y certificación OMRI para los estándares más exigentes del mercado de exportación.',
    gradient: 'from-azul-500 to-azul-600',
    glowColor: 'rgba(17, 137, 191, 0.12)',
    borderColor: 'border-azul-200/60',
    hoverBorder: 'hover:border-azul-300',
  },
  {
    icons: [Headphones, Bot],
    title: 'Asesoría 24/7',
    description: 'Agrónomos especializados + nuestra Asesora IA que te acompaña desde el trasplante hasta la cosecha.',
    gradient: 'from-naranja-500 to-naranja-600',
    glowColor: 'rgba(232, 105, 15, 0.12)',
    borderColor: 'border-naranja-200/60',
    hoverBorder: 'hover:border-naranja-300',
  },
  {
    icons: [Globe, TrendingUp],
    title: 'Para Cultivos de Exportación',
    description: 'Soluciones diseñadas para productores que abastecen a Hortifrut, Driscoll\'s y los mercados internacionales.',
    gradient: 'from-verde-600 to-azul-500',
    glowColor: 'rgba(34, 181, 115, 0.12)',
    borderColor: 'border-verde-200/60',
    hoverBorder: 'hover:border-verde-300',
  },
]

export default function WhyBiotizaSection() {
  return (
    <section className="relative bg-verde-50/50 py-24 lg:py-32 overflow-hidden">
      {/* Dot pattern background */}
      <div className="absolute inset-0 dot-pattern opacity-60" aria-hidden="true" />

      <Container className="relative z-10">
        <SectionHeading
          tag="Nuestra propuesta"
          title="¿Por qué Biotiza?"
          subtitle="Combinamos ciencia de punta, asesoría experta y tecnología para llevar biosoluciones premium directamente a tus cultivos."
          className="mb-20"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-5 sm:grid-cols-2 lg:gap-6"
        >
          {FEATURES.map((feat, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className={cn(
                'group relative rounded-2xl bg-white p-7 lg:p-8',
                'border', feat.borderColor, feat.hoverBorder,
                'shadow-[0_2px_20px_rgba(15,23,42,0.04)]',
                'hover:shadow-[0_12px_40px_rgba(15,23,42,0.08)]',
                'transition-all duration-500 ease-out',
                'hover:-translate-y-1',
              )}
            >
              {/* Subtle glow on hover */}
              <div
                className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: `0 0 60px ${feat.glowColor}` }}
                aria-hidden="true"
              />

              {/* Iconos con gradiente */}
              <div className="relative mb-5 flex items-center gap-3">
                {feat.icons.map((Icon, j) => (
                  <span
                    key={j}
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br',
                      feat.gradient,
                      'text-white shadow-sm',
                    )}
                  >
                    <Icon size={20} strokeWidth={1.8} />
                  </span>
                ))}
              </div>

              <h3 className="relative mb-3 font-sans text-lg font-semibold text-gris-900">
                {feat.title}
              </h3>
              <p className="relative text-sm leading-relaxed text-gris-500">
                {feat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
