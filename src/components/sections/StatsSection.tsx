'use client'

/**
 * StatsSection.tsx — Métricas de credibilidad con count-up
 *
 * Patrón aplicado: "Trust & Authority" (UI/UX Pro Max #26)
 *  - métricas con count-up al hacer scroll
 *  - iconos color-coded por categoría
 *  - layout grid responsive
 *  - background subtle gradient para warmth
 */

import { useRef, useEffect } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { Leaf, Sprout, Award, Users, type LucideIcon } from 'lucide-react'
import Container from '@/components/ui/Container'
import { cn } from '@/lib/utils'

// ─── Counter ──────────────────────────────────────────────────────────────

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref      = useRef<HTMLSpanElement>(null)
  const count    = useMotionValue(0)
  const rounded  = useTransform(count, (v) => Math.round(v))
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (isInView) animate(count, to, { duration: 2.4, ease: [0.16, 1, 0.3, 1] })
  }, [isInView, count, to])

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

// ─── Datos ────────────────────────────────────────────────────────────────

interface Stat {
  icon: LucideIcon
  value: number
  suffix: string
  label: string
  accent: 'verde' | 'naranja' | 'azul' | 'amber'
}

const STATS: Stat[] = [
  { icon: Sprout, value: 49,  suffix: '',  label: 'Productos en catálogo',   accent: 'verde'   },
  { icon: Leaf,   value: 14,  suffix: '',  label: 'Cultivos con protocolo',   accent: 'naranja' },
  { icon: Award,  value: 25,  suffix: '+', label: 'Años de I+D agrícola',     accent: 'azul'    },
  { icon: Users,  value: 800, suffix: '+', label: 'Productores atendidos',    accent: 'amber'   },
]

const ACCENTS: Record<Stat['accent'], { bg: string; ring: string; text: string; iconBg: string }> = {
  verde:   { bg: 'bg-verde-50',     ring: 'ring-verde-100',     text: 'text-verde-700',     iconBg: 'bg-verde-500'     },
  naranja: { bg: 'bg-naranja-50',   ring: 'ring-naranja-100',   text: 'text-naranja-700',   iconBg: 'bg-naranja-500'   },
  azul:    { bg: 'bg-azul-50',      ring: 'ring-azul-100',      text: 'text-azul-700',      iconBg: 'bg-azul-500'      },
  amber:   { bg: 'bg-amber-50',     ring: 'ring-amber-100',     text: 'text-amber-700',     iconBg: 'bg-amber-500'     },
}

// ─── Componente ────────────────────────────────────────────────────────────

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-verde-50/40 py-20 lg:py-28">
      {/* Decorative blurred orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-[15%] top-0 h-64 w-64 rounded-full bg-verde-200/30 blur-3xl" />
        <div className="absolute right-[10%] bottom-0 h-72 w-72 rounded-full bg-amber-200/20 blur-3xl" />
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-2xl text-center lg:mb-16"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-verde-200 bg-verde-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-verde-700">
            Datos que respaldan
          </span>
          <h2 className="mt-4 font-serif text-3xl text-gris-900 text-balance lg:text-4xl">
            Cifras que importan al campo mexicano
          </h2>
          <p className="mt-3 text-base text-gris-600 lg:text-lg">
            No prometemos lo que no podemos cumplir. Estos son los números que respaldan cada protocolo Biotiza.
          </p>
        </motion.div>

        {/* Grid de stats */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => {
            const Icon = stat.icon
            const c = ACCENTS[stat.accent]
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  'group relative flex flex-col gap-4 rounded-2xl border border-gris-100 bg-white p-7 ring-1 transition-all duration-500',
                  'hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,23,42,0.08)]',
                  c.ring,
                )}
              >
                {/* Icon badge */}
                <span
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-md',
                    c.iconBg,
                  )}
                >
                  <Icon size={22} strokeWidth={1.8} />
                </span>

                {/* Value */}
                <div className="flex flex-col">
                  <span className={cn('font-serif text-5xl font-normal lg:text-6xl', c.text)}>
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="mt-2 text-sm font-medium text-gris-600">{stat.label}</span>
                </div>

                {/* Decorative accent */}
                <div
                  className={cn(
                    'absolute right-4 top-4 h-1.5 w-1.5 rounded-full opacity-40 transition-opacity group-hover:opacity-100',
                    c.iconBg,
                  )}
                  aria-hidden="true"
                />
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
