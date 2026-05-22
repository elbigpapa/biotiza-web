/**
 * HerramientasSection.tsx — Escena 06 · Herramientas
 * Redesign Phase 2: cuatro herramientas gratuitas de planificación.
 * Server Component — usa Scene (light), Reveal/RevealItem, next/link, lucide-react.
 */

import Link from 'next/link'
import { Calculator, TrendingUp, Stethoscope, CheckSquare } from 'lucide-react'
import Scene from '@/components/redesign/Scene'
import { Reveal, RevealItem } from '@/components/redesign/ScrollReveal'

const TOOLS = [
  {
    icon: Calculator,
    title: 'Calculadora de dosis',
    description: 'La dosis exacta por hectárea o por tanque.',
    href: '/herramientas/calculadora-dosis',
    iconBg: 'bg-verde-100',
    iconColor: 'text-verde-600',
  },
  {
    icon: TrendingUp,
    title: 'Calculadora de ROI',
    description: 'El retorno de inversión de tu programa nutricional.',
    href: '/herramientas/calculadora-roi',
    iconBg: 'bg-naranja-50',
    iconColor: 'text-naranja-500',
  },
  {
    icon: Stethoscope,
    title: 'Diagnóstico',
    description: 'Identifica deficiencias por síntoma visual.',
    href: '/herramientas/diagnostico',
    iconBg: 'bg-azul-50',
    iconColor: 'text-azul-600',
  },
  {
    icon: CheckSquare,
    title: 'Compatibilidad',
    description: 'Verifica si dos productos pueden mezclarse.',
    href: '/herramientas/compatibilidad',
    iconBg: 'bg-verde-50',
    iconColor: 'text-verde-600',
  },
] as const

export default function HerramientasSection() {
  return (
    <Scene tone="light" id="herramientas">
      <Reveal className="space-y-12 lg:space-y-16">

        {/* ── Header ── */}
        <RevealItem className="max-w-3xl">
          <p className="eyebrow-edit mb-5">— 06 · Herramientas</p>
          <h2 className="title-display max-w-[20ch] mb-5">
            Calcula, diagnostica,{' '}
            <em style={{ fontFamily: 'var(--serif-it)' }}>decide</em>.
          </h2>
          <p className="dek-edit text-ink-2 max-w-[52ch]">
            Herramientas gratuitas para planear el programa de tu cultivo.
          </p>
        </RevealItem>

        {/* ── Cards 2×2 / 4 cols ── */}
        <RevealItem>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {TOOLS.map(({ icon: Icon, title, description, href, iconBg, iconColor }) => (
              <Link
                key={href}
                href={href}
                className="
                  group
                  flex flex-col gap-5
                  bg-white border border-rule
                  rounded-sm p-6 lg:p-7
                  shadow-sm
                  transition-all duration-300
                  hover:-translate-y-1 hover:shadow-md hover:border-ink/20
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-verde-600 focus-visible:outline-offset-2
                "
              >
                {/* Icon circle */}
                <span
                  className={`
                    inline-flex items-center justify-center
                    w-11 h-11 rounded-full
                    ${iconBg} ${iconColor}
                    transition-colors duration-300
                    group-hover:scale-105
                  `}
                  style={{ transition: 'transform 0.3s ease, background-color 0.3s ease' }}
                  aria-hidden="true"
                >
                  <Icon size={22} strokeWidth={1.75} />
                </span>

                {/* Text */}
                <div className="flex-1 flex flex-col gap-1.5">
                  <h3 className="font-serif text-[clamp(18px,2vw,22px)] leading-tight tracking-tight text-ink">
                    {title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-ink-3">
                    {description}
                  </p>
                </div>

                {/* Arrow */}
                <span
                  className="font-sans text-base font-medium text-naranja-500 transition-transform duration-300 group-hover:translate-x-1 self-start"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </RevealItem>

      </Reveal>
    </Scene>
  )
}
