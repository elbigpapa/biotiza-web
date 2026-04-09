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
    accent: 'border-verde-400 bg-verde-50',
    iconBg: 'bg-verde-100 text-verde-600',
  },
  {
    icons: [FlaskConical, CheckCircle],
    title: 'Ciencia Comprobada',
    description: 'Formulaciones con registro COFEPRIS y certificación OMRI para los estándares más exigentes del mercado de exportación.',
    accent: 'border-azul-400 bg-azul-50/50',
    iconBg: 'bg-azul-100 text-azul-600',
  },
  {
    icons: [Headphones, Bot],
    title: 'Asesoría 24/7',
    description: 'Agrónomos especializados + nuestra Asesora IA que te acompaña desde el trasplante hasta la cosecha.',
    accent: 'border-naranja-400 bg-naranja-50/50',
    iconBg: 'bg-naranja-100 text-naranja-500',
  },
  {
    icons: [Globe, TrendingUp],
    title: 'Para Cultivos de Exportación',
    description: 'Soluciones diseñadas para productores que abastecen a Hortifrut, Driscoll\'s y los mercados internacionales.',
    accent: 'border-verde-500 bg-verde-50',
    iconBg: 'bg-verde-100 text-verde-600',
  },
]

export default function WhyBiotizaSection() {
  return (
    <section className="bg-verde-50 py-20 lg:py-28">
      <Container>
        <SectionHeading
          tag="Nuestra propuesta"
          title="¿Por qué Biotiza?"
          subtitle="Combinamos ciencia de punta, asesoría experta y tecnología para llevar biosoluciones premium directamente a tus cultivos."
          className="mb-16"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-6 sm:grid-cols-2"
        >
          {FEATURES.map((feat, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className={cn(
                'group rounded-2xl border-l-4 bg-white p-6',
                'shadow-card hover:shadow-lg transition-all duration-300',
                'hover:-translate-y-0.5',
                feat.accent,
              )}
            >
              {/* Iconos */}
              <div className="mb-4 flex items-center gap-2">
                {feat.icons.map((Icon, j) => (
                  <span key={j} className={cn('flex h-10 w-10 items-center justify-center rounded-xl', feat.iconBg)}>
                    <Icon size={20} />
                  </span>
                ))}
              </div>

              <h3 className="mb-2 font-sans text-lg font-semibold text-gris-900">
                {feat.title}
              </h3>
              <p className="text-sm leading-relaxed text-gris-600">
                {feat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
