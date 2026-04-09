'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { cn } from '@/lib/utils'

// ─── Counter animado ──────────────────────────────────────────────────────

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref        = useRef<HTMLSpanElement>(null)
  const count      = useMotionValue(0)
  const rounded    = useTransform(count, (v) => Math.round(v))
  const isInView   = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    if (isInView) animate(count, to, { duration: 2, ease: 'easeOut' })
  }, [isInView, count, to])

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

// ─── Datos de stats ───────────────────────────────────────────────────────

const STATS = [
  { value: 35, suffix: '+', label: 'Productos',          numeric: true  },
  { value: 5,  suffix: '',  label: 'Líneas de solución', numeric: true  },
  { value: 0,  suffix: '',  label: 'OMRI Certificados',  numeric: false, display: 'OMRI' },
  { value: 0,  suffix: '',  label: 'Sin intermediarios', numeric: false, display: 'DTC'  },
]

// ─── Fondo orgánico ───────────────────────────────────────────────────────

function DecorativeBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Círculo grande esquina superior derecha */}
      <svg className="absolute -right-24 -top-24 h-96 w-96 text-verde-500 opacity-10" viewBox="0 0 384 384">
        <circle cx="192" cy="192" r="192" fill="currentColor" />
      </svg>
      {/* Hoja / gota esquina inferior izquierda */}
      <svg className="absolute -bottom-16 -left-16 h-72 w-72 text-verde-400 opacity-10" viewBox="0 0 200 200">
        <path d="M100,10 Q190,100 100,190 Q10,100 100,10 Z" fill="currentColor" />
      </svg>
      {/* Círculo mediano centrado a la derecha */}
      <svg className="absolute right-1/4 top-1/3 h-48 w-48 text-naranja-500 opacity-5" viewBox="0 0 192 192">
        <circle cx="96" cy="96" r="96" fill="currentColor" />
      </svg>
      {/* Líneas orgánicas sutiles */}
      <svg className="absolute left-0 top-0 h-full w-full text-verde-300 opacity-5" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <path d="M0,300 Q360,150 720,300 Q1080,450 1440,300" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M0,500 Q400,350 800,500 Q1200,650 1440,500" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col bg-gradient-to-br from-verde-900 via-verde-800 to-verde-700">
      <DecorativeBackground />

      {/* Contenido centrado */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8"
      >
        {/* Eyebrow */}
        <motion.span
          variants={fadeInUp}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-verde-500/30 bg-verde-800/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-verde-300 backdrop-blur-sm"
        >
          🌱 Biosoluciones de laboratorio a tu campo
        </motion.span>

        {/* Título principal */}
        <motion.h1
          variants={fadeInUp}
          className="max-w-4xl font-serif text-4xl font-normal leading-tight text-white text-balance sm:text-5xl md:text-6xl"
        >
          Ciencia que nutre la tierra.{' '}
          <span className="text-verde-300">
            Resultados que transforman tu cosecha.
          </span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          variants={fadeInUp}
          className="mt-6 max-w-2xl text-base leading-relaxed text-verde-200 sm:text-lg md:text-xl"
        >
          Biosoluciones premium de laboratorio a tu campo. Nutrición, estimulación
          y protección para cultivos de exportación.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/soluciones"
            className={cn(
              'inline-flex items-center gap-2 rounded-lg',
              'border-2 border-white px-6 py-3',
              'text-sm font-semibold text-white',
              'transition-all duration-200',
              'hover:bg-white hover:text-verde-900',
              'active:scale-[0.97]',
            )}
          >
            Explorar Soluciones
            <ArrowRight size={16} />
          </Link>
          <Link
            href="https://wa.me/523300000000?text=Hola%20Biotiza%2C%20quiero%20hablar%20con%20un%20asesor"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-2 rounded-lg',
              'bg-naranja-500 px-6 py-3',
              'text-sm font-semibold text-white',
              'hover:bg-naranja-600 active:scale-[0.97]',
              'shadow-[0_4px_20px_rgba(232,105,15,0.4)]',
              'transition-all duration-200',
            )}
          >
            <MessageCircle size={16} />
            Hablar con un Asesor
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={fadeInUp}
          className="mt-16 flex flex-col items-center gap-2 text-verde-400/60"
        >
          <span className="text-xs tracking-widest uppercase">Descubrir más</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="h-8 w-0.5 rounded-full bg-verde-500/40"
          />
        </motion.div>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="relative z-10 border-t border-verde-700/50 bg-verde-800/50 backdrop-blur-md"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 divide-x divide-verde-700/40 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <div key={i} className="flex flex-col items-center py-5 px-4 text-center">
                <span className="font-serif text-2xl font-normal text-white sm:text-3xl">
                  {stat.numeric
                    ? <CountUp to={stat.value} suffix={stat.suffix} />
                    : stat.display
                  }
                </span>
                <span className="mt-1 text-xs font-medium text-verde-300 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
