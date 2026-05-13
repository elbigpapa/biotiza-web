'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, useMotionValue, useTransform, animate, useScroll, useReducedMotion } from 'framer-motion'
import { ArrowRight, MessageCircle, Leaf, Droplets, Shield, FlaskConical, Sparkles } from 'lucide-react'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { HERO_IMAGES } from '@/data/crop-images'

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
  { value: 49, suffix: '',  label: 'Productos',           numeric: true  },
  { value: 14, suffix: '',  label: 'Cultivos',            numeric: true  },
  { value: 25, suffix: '+', label: 'Años de I+D',         numeric: true  },
  { value: 0,  suffix: '',  label: 'OMRI · COFEPRIS',     numeric: false, display: '✓' },
]

// ─── Orbs decorativos con parallax + foto HD con Ken Burns ─────────────────

function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Foto HD de campo cultivado — capa base con Ken Burns lento */}
      <div className="absolute inset-0 motion-safe:animate-[kenburns_28s_ease-in-out_infinite_alternate]">
        <Image
          src={HERO_IMAGES.cultivatedField.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Overlay corporativo verde-oscuro — degradado complejo para profundidad */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(115deg, rgba(5, 32, 24, 0.78) 0%, rgba(11, 60, 47, 0.62) 35%, rgba(13, 92, 74, 0.50) 70%, rgba(34, 181, 115, 0.30) 100%),
            radial-gradient(ellipse 70% 50% at 18% 30%, rgba(34, 181, 115, 0.30) 0%, transparent 70%),
            radial-gradient(ellipse 55% 70% at 82% 80%, rgba(17, 137, 191, 0.22) 0%, transparent 70%)
          `,
        }}
      />

      {/* Vignette sutil para enfocar el contenido central */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 85% 70% at 50% 50%, transparent 35%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* Glow orbs animados encima de la foto */}
      <div className="absolute -top-[20%] -left-[10%] h-[600px] w-[600px] rounded-full bg-verde-500/20 blur-[120px] animate-float-slow" />
      <div className="absolute -bottom-[10%] -right-[10%] h-[500px] w-[500px] rounded-full bg-azul-500/14 blur-[100px] animate-float-reverse" />
      <div className="absolute top-[18%] right-[12%] h-[320px] w-[320px] rounded-full bg-naranja-500/14 blur-[80px] animate-float" />
      <div className="absolute bottom-[18%] left-[14%] h-[260px] w-[260px] rounded-full bg-verde-400/12 blur-[60px] animate-float-slow" />

      {/* Grid de puntos sutil */}
      <div className="absolute inset-0 dot-pattern-dark opacity-30" />

      {/* Grain orgánico premium */}
      <div className="absolute inset-0 noise-overlay opacity-25 mix-blend-overlay" />

      {/* Líneas orgánicas decorativas (más visibles) */}
      <svg className="absolute left-0 top-0 h-full w-full opacity-[0.08]" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <path d="M0,200 Q360,50 720,200 Q1080,350 1440,200" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M0,400 Q400,250 800,400 Q1200,550 1440,400" stroke="white" strokeWidth="1.2" fill="none" />
        <path d="M0,600 Q300,500 700,650 Q1100,700 1440,550" stroke="white" strokeWidth="1" fill="none" />
        <path d="M0,750 Q480,650 960,780 Q1280,820 1440,720" stroke="rgba(34,181,115,0.6)" strokeWidth="1" fill="none" />
      </svg>

      {/* Light rays diagonal — sensación cinematográfica */}
      <div
        className="absolute inset-0 mix-blend-screen opacity-30"
        style={{
          background:
            'linear-gradient(115deg, transparent 25%, rgba(255, 240, 200, 0.18) 40%, transparent 60%)',
        }}
      />
    </div>
  )
}

// ─── Floating product icons ───────────────────────────────────────────────

function FloatingIcons() {
  const icons = [
    { Icon: Leaf,        color: 'text-verde-400/30',   x: '8%',  y: '20%', delay: 0,   size: 40 },
    { Icon: FlaskConical,color: 'text-azul-400/25',    x: '85%', y: '15%', delay: 1,   size: 36 },
    { Icon: Droplets,    color: 'text-naranja-400/20', x: '75%', y: '65%', delay: 2,   size: 32 },
    { Icon: Shield,      color: 'text-azul-300/20',    x: '12%', y: '70%', delay: 0.5, size: 28 },
    { Icon: Sparkles,    color: 'text-verde-300/20',   x: '92%', y: '45%', delay: 1.5, size: 24 },
  ]

  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
      {icons.map(({ Icon, color, x, y, delay, size }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 + delay * 0.3, duration: 0.8, ease: 'easeOut' }}
          className="absolute"
          style={{ left: x, top: y }}
        >
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 5, -3, 0] }}
            transition={{ duration: 6 + i * 0.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Icon size={size} className={color} strokeWidth={1.2} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  // Parallax suave: el contenido se desplaza hacia arriba más rápido que el fondo
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -80])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6, 1], reduce ? [1, 1, 1] : [1, 0.6, 0])

  return (
    <section ref={sectionRef} className="relative flex min-h-[calc(100vh-4rem)] flex-col overflow-hidden">
      <HeroBackground />
      <FloatingIcons />

      {/* Noise texture overlay */}
      <div className="noise-overlay absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Contenido centrado con parallax suave */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8"
      >
        {/* Eyebrow con glow */}
        <motion.span
          variants={fadeInUp}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-verde-400/20 bg-verde-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-verde-300 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verde-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-verde-400" />
          </span>
          Biosoluciones de laboratorio a tu campo
        </motion.span>

        {/* Título principal */}
        <motion.h1
          variants={fadeInUp}
          className="max-w-5xl font-serif text-4xl font-normal leading-[1.1] text-white text-balance sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Ciencia que nutre la tierra.{' '}
          <span className="gradient-text-premium">
            Resultados que transforman tu cosecha.
          </span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          variants={fadeInUp}
          className="mt-7 max-w-2xl text-base leading-relaxed text-gris-200 sm:text-lg md:text-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
        >
          Biosoluciones premium de laboratorio a tu campo. Nutrición, estimulación
          y protección para cultivos de exportación.
        </motion.p>

        {/* CTAs con diseño premium */}
        <motion.div variants={fadeInUp} className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link href="/soluciones" className="btn-secondary group">
            Explorar Soluciones
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="https://wa.me/523316022708?text=Hola%20Biotiza%2C%20quiero%20hablar%20con%20un%20asesor"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent"
          >
            <MessageCircle size={16} />
            Hablar con un Asesor
          </Link>
        </motion.div>

        {/* Certificaciones mini */}
        <motion.div
          variants={fadeInUp}
          className="mt-14 flex flex-wrap items-center justify-center gap-6 text-xs text-gris-200"
        >
          {['COFEPRIS', 'OMRI Listed', 'Hecho en MX'].map((cert) => (
            <span key={cert} className="flex items-center gap-1.5 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-verde-400" />
              {cert}
            </span>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={fadeInUp}
          className="mt-16 flex flex-col items-center gap-2 text-gris-300"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase font-semibold">Descubrir</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="h-10 w-[1.5px] rounded-full bg-gradient-to-b from-verde-400/80 to-transparent"
          />
        </motion.div>
      </motion.div>

      {/* Stats bar con glass effect */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 border-t border-white/[0.06] bg-white/[0.04] backdrop-blur-xl"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 divide-x divide-white/[0.06] md:grid-cols-4">
            {STATS.map((stat, i) => (
              <div key={i} className="flex flex-col items-center py-6 px-4 text-center">
                <span className="font-serif text-2xl font-normal text-white sm:text-3xl lg:text-4xl">
                  {stat.numeric
                    ? <CountUp to={stat.value} suffix={stat.suffix} />
                    : stat.display
                  }
                </span>
                <span className="mt-1.5 text-[10px] font-semibold text-gris-200 uppercase tracking-[0.15em]">
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
