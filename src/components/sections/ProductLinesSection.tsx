'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Leaf, FlaskConical, Sparkles, Droplets, Shield, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import SectionHeading from '@/components/ui/SectionHeading'
import { Container } from '@/components/ui/Container'
import { staggerContainer, fadeInUp } from '@/lib/animations'

const LINES = [
  {
    id: 'organicos',
    name: 'Orgánicos',
    count: 10,
    description: 'Fertilizantes quelatados orgánicos con certificación OMRI. Base sólida para programas de nutrición limpia.',
    href: '/soluciones/organicos',
    icon: Leaf,
    gradient: 'from-verde-500 to-verde-600',
    lightBg: 'bg-verde-50',
    hoverGlow: '0 8px 40px rgba(34, 181, 115, 0.2)',
    accentColor: '#22b573',
  },
  {
    id: 'especialidades',
    name: 'Especialidades',
    count: 6,
    description: 'Correctores de deficiencias, inoculantes microbianos y soluciones especializadas para problemas puntuales.',
    href: '/soluciones/especialidades',
    icon: FlaskConical,
    gradient: 'from-azul-600 to-azul-500',
    lightBg: 'bg-azul-50',
    hoverGlow: '0 8px 40px rgba(14, 110, 153, 0.2)',
    accentColor: '#0e6e99',
  },
  {
    id: 'bioestimulantes',
    name: 'Bioestimulantes',
    count: 6,
    description: 'Promotores de floración, cuajado, engorde de fruto y sanitizantes. Aminoácidos, citoquininas y más.',
    href: '/soluciones/bioestimulantes',
    icon: Sparkles,
    gradient: 'from-naranja-500 to-naranja-400',
    lightBg: 'bg-naranja-50',
    hoverGlow: '0 8px 40px rgba(232, 105, 15, 0.18)',
    accentColor: '#e8690f',
  },
  {
    id: 'nutricion',
    name: 'Nutrición Líquida',
    count: 9,
    description: 'Fertilizantes de alta concentración con quelatos de última generación para fertirrigación de precisión.',
    href: '/soluciones/nutricion',
    icon: Droplets,
    gradient: 'from-naranja-400 to-naranja-300',
    lightBg: 'bg-naranja-50',
    hoverGlow: '0 8px 40px rgba(242, 138, 61, 0.18)',
    accentColor: '#f28a3d',
  },
  {
    id: 'zentia',
    name: 'Línea Zentia',
    count: 10,
    description: 'Insecticidas, fungicidas y bactericidas de origen natural. Bioprotección integral certificada.',
    href: '/soluciones/zentia',
    icon: Shield,
    gradient: 'from-azul-500 to-azul-400',
    lightBg: 'bg-azul-50',
    hoverGlow: '0 8px 40px rgba(17, 137, 191, 0.2)',
    accentColor: '#1189bf',
  },
]

export default function ProductLinesSection() {
  return (
    <section className="relative bg-white py-24 lg:py-32 overflow-hidden">
      <Container>
        <SectionHeading
          tag="Portafolio completo"
          title="Soluciones integrales para cada etapa de tu cultivo"
          subtitle="Cinco líneas especializadas que cubren nutrición, estimulación y protección de forma integral."
          className="mb-20"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {LINES.map((line) => {
            const Icon = line.icon
            return (
              <motion.div key={line.id} variants={fadeInUp}>
                <Link
                  href={line.href}
                  className="group relative flex flex-col h-full rounded-2xl bg-white border border-gris-100 overflow-hidden transition-all duration-500 hover:-translate-y-1"
                  style={{
                    boxShadow: '0 2px 16px rgba(15, 23, 42, 0.05)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = line.hoverGlow
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(15, 23, 42, 0.05)'
                  }}
                >
                  {/* Header con gradiente */}
                  <div className={cn(
                    'relative flex items-center gap-4 px-6 py-5 bg-gradient-to-r',
                    line.gradient,
                  )}>
                    {/* Decorative circles */}
                    <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10" aria-hidden="true" />
                    <div className="absolute right-12 -bottom-8 h-16 w-16 rounded-full bg-white/5" aria-hidden="true" />

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                      <Icon size={22} className="text-white" strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-sans text-base font-semibold text-white leading-tight">
                        {line.name}
                      </h3>
                      <span className="text-xs text-white/70 font-medium">
                        {line.count} productos
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    <p className="text-sm leading-relaxed text-gris-500 flex-1">
                      {line.description}
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-sm font-semibold transition-all duration-300"
                      style={{ color: line.accentColor }}
                    >
                      Explorar línea
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className="h-0.5 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r"
                    style={{ backgroundImage: `linear-gradient(to right, ${line.accentColor}, transparent)` }}
                  />
                </Link>
              </motion.div>
            )
          })}

          {/* CTA card */}
          <motion.div variants={fadeInUp}>
            <Link
              href="/soluciones"
              className="group relative flex flex-col h-full items-center justify-center rounded-2xl border-2 border-dashed border-verde-200 bg-verde-50/50 p-8 text-center transition-all duration-500 hover:border-verde-400 hover:bg-verde-50 hover:-translate-y-1"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-verde-100 mb-4 transition-transform duration-300 group-hover:scale-110">
                <ArrowRight size={24} className="text-verde-600" />
              </div>
              <h3 className="font-sans text-base font-semibold text-verde-800 mb-2">
                Ver catálogo completo
              </h3>
              <p className="text-sm text-verde-600/70">
                Explora las 5 líneas y 35+ productos
              </p>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
