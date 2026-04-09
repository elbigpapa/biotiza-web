'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Leaf, FlaskConical, Sparkles, Droplets, Shield, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import SectionHeading from '@/components/ui/SectionHeading'
import { Container } from '@/components/ui/Container'
import { fadeInLeft } from '@/lib/animations'

const LINES = [
  {
    id: 'organicos',
    name: 'Orgánicos',
    count: '10 productos',
    description: 'Fertilizantes quelatados orgánicos con certificación OMRI. Base sólida para programas de nutrición limpia.',
    href: '/soluciones/organicos',
    icon: Leaf,
    borderColor: 'border-verde-500',
    iconBg: 'bg-verde-50',
    iconColor: 'text-verde-600',
    countColor: 'text-verde-600 bg-verde-50',
    hoverShadow: 'hover:shadow-[0_4px_24px_rgba(34,181,115,0.15)]',
  },
  {
    id: 'especialidades',
    name: 'Especialidades',
    count: '6 productos',
    description: 'Correctores de deficiencias, inoculantes microbianos y soluciones especializadas para problemas puntuales.',
    href: '/soluciones/especialidades',
    icon: FlaskConical,
    borderColor: 'border-azul-600',
    iconBg: 'bg-azul-50',
    iconColor: 'text-azul-600',
    countColor: 'text-azul-600 bg-azul-50',
    hoverShadow: 'hover:shadow-[0_4px_24px_rgba(14,110,153,0.15)]',
  },
  {
    id: 'bioestimulantes',
    name: 'Bioestimulantes',
    count: '6 productos',
    description: 'Promotores de floración, cuajado, engorde de fruto y sanitizantes. Aminoácidos, citoquininas y más.',
    href: '/soluciones/bioestimulantes',
    icon: Sparkles,
    borderColor: 'border-naranja-500',
    iconBg: 'bg-naranja-100',
    iconColor: 'text-naranja-500',
    countColor: 'text-naranja-600 bg-naranja-100',
    hoverShadow: 'hover:shadow-[0_4px_24px_rgba(232,105,15,0.15)]',
  },
  {
    id: 'nutricion',
    name: 'Nutrición Líquida',
    count: '9 productos',
    description: 'Fertilizantes de alta concentración con quelatos de última generación para fertirrigación de precisión.',
    href: '/soluciones/nutricion',
    icon: Droplets,
    borderColor: 'border-naranja-400',
    iconBg: 'bg-[#fff4eb]',
    iconColor: 'text-naranja-400',
    countColor: 'text-naranja-500 bg-[#fff4eb]',
    hoverShadow: 'hover:shadow-[0_4px_24px_rgba(242,138,61,0.15)]',
  },
  {
    id: 'zentia',
    name: 'Línea Zentia',
    count: '10 productos',
    description: 'Insecticidas, fungicidas y bactericidas de origen natural. Bioprotección integral certificada.',
    href: '/soluciones/zentia',
    icon: Shield,
    borderColor: 'border-azul-500',
    iconBg: 'bg-azul-50',
    iconColor: 'text-azul-500',
    countColor: 'text-azul-600 bg-azul-50',
    hoverShadow: 'hover:shadow-[0_4px_24px_rgba(17,137,191,0.15)]',
  },
]

export default function ProductLinesSection() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeading
          tag="Portafolio completo"
          title="Soluciones integrales para cada etapa de tu cultivo"
          subtitle="Cinco líneas especializadas que cubren nutrición, estimulación y protección de forma integral."
          className="mb-16"
        />

        <div className="flex flex-col gap-4">
          {LINES.map((line, i) => {
            const Icon = line.icon
            return (
              <motion.div
                key={line.id}
                variants={fadeInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={line.href}
                  className={cn(
                    'group flex items-start gap-5 rounded-xl border-l-4 bg-white p-5',
                    'border border-gris-100 shadow-card',
                    'transition-all duration-300 hover:-translate-y-0.5',
                    line.borderColor, line.hoverShadow,
                  )}
                >
                  {/* Icono */}
                  <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-xl', line.iconBg)}>
                    <Icon size={22} className={line.iconColor} />
                  </div>

                  {/* Texto */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <h3 className="font-sans text-base font-semibold text-gris-900">
                        {line.name}
                      </h3>
                      <span className={cn('rounded-full px-2 py-0.5 text-xs font-semibold', line.countColor)}>
                        {line.count}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-gris-600">
                      {line.description}
                    </p>
                  </div>

                  {/* Flecha */}
                  <ArrowRight
                    size={18}
                    className={cn(
                      'shrink-0 mt-0.5 text-gris-300',
                      'transition-all duration-200',
                      'group-hover:translate-x-1 group-hover:text-verde-500',
                    )}
                  />
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* CTA catálogo */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/soluciones"
            className="inline-flex items-center gap-2 rounded-lg bg-verde-500 px-6 py-3 text-sm font-semibold text-white hover:bg-verde-600 transition-colors shadow-brand"
          >
            Ver catálogo completo
            <ArrowRight size={15} />
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}
