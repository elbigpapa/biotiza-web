'use client'

/**
 * HeroSection.tsx — Hero editorial · Sub-fase 3.3a
 * Reemplaza biotiza-web/src/components/sections/HeroSection.tsx
 *
 * Cambios vs versión anterior:
 *  · 3 capas máx (foto + overlay + grain) en vez de 8
 *  · Sin orbs flotantes, sin iconos lucide flotantes
 *  · Tipografía 64-200px protagonista
 *  · Sin shimmer animado en el título (cinematográfico estático)
 *  · Topmeta y métricas en monospace minimal
 *  · 1 CTA primario (WhatsApp) + link secundario
 */

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { HERO_IMAGES } from '@/data/crop-images'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const contentY       = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -60])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6, 1], reduce ? [1, 1, 1] : [1, 0.7, 0])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col overflow-hidden bg-verde-950"
      style={{ marginTop: '-5.25rem', paddingTop: '5.25rem' }}
    >
      {/* CAPA 1 · Foto cinematográfica · Ken Burns lento */}
      <div className="absolute inset-0 motion-safe:animate-[kenburns_22s_cubic-bezier(0.25,0.1,0.25,1)_forwards]">
        <Image
          src={HERO_IMAGES.cultivatedField.src}
          alt={HERO_IMAGES.cultivatedField.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* CAPA 2 · Overlay verde-oscuro corporativo */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, rgba(8,46,33,0.30) 0%, rgba(8,46,33,0.55) 55%, rgba(8,46,33,0.95) 100%)
          `,
        }}
        aria-hidden="true"
      />

      {/* CAPA 3 · Grain orgánico sutil */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
        aria-hidden="true"
      />

      {/* CONTENIDO con parallax suave */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-4 sm:px-6 lg:px-12 py-24"
      >
        {/* Top meta · monospace minimal */}
        <div
          className="flex items-baseline justify-between gap-6 flex-wrap pb-7 border-b border-white/15"
        >
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
            <span className="text-verde-300 font-semibold">Biotiza</span> · biosoluciones agrícolas · Zapopan, MX
          </span>
          <span className="hidden md:inline font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
            25 años de I+D · COFEPRIS · OMRI
          </span>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
            MMXXVI
          </span>
        </div>

        {/* Título display protagonista */}
        <div className="flex-1 flex flex-col justify-end pt-20">
          <h1 className="title-hero text-white max-w-[12ch] mb-6">
            Ciencia<br />
            <em>que rinde</em><br />
            al campo.
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-white/85 max-w-[38ch] leading-relaxed mb-9">
            Biosoluciones formuladas en laboratorio, con asesoría técnica
            de agrónomos especializados incluida en cada compra.
          </p>

          <div className="flex items-center gap-6 flex-wrap">
            <a
              href="https://wa.me/523316022708?text=Hola%20Biotiza%2C%20quiero%20hablar%20con%20un%20asesor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-4 bg-naranja-500 text-white font-mono text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-naranja-600 hover:-translate-y-0.5 transition-all duration-300 hover:shadow-[0_12px_28px_-8px_rgba(232,105,15,0.5)]"
            >
              <MessageCircle size={14} />
              Hablar por WhatsApp
              <ArrowRight size={14} />
            </a>
            <Link
              href="/soluciones"
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white/85 border-b border-white/40 pb-1 hover:text-verde-300 hover:border-verde-300 transition-colors"
            >
              o explorar las soluciones
            </Link>
          </div>

          {/* Métricas inline */}
          <div className="mt-14 pt-6 border-t border-white/15 flex flex-wrap gap-x-9 gap-y-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
            <span><span className="text-verde-300 mr-1.5">47</span>productos</span>
            <span><span className="text-verde-300 mr-1.5">35</span>cultivos con protocolo</span>
            <span><span className="text-verde-300 mr-1.5">25+</span>años de I+D</span>
            <span className="ml-auto">OMRI · COFEPRIS · Hecho en MX</span>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-7 right-4 sm:right-6 lg:right-12 z-10 flex items-center gap-3.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
        Descubrir
        <span className="h-10 w-px bg-gradient-to-b from-white/60 to-transparent" />
      </div>

      <style jsx>{`
        @keyframes kenburns {
          0%   { transform: scale(1.05); }
          100% { transform: scale(1.0); }
        }
      `}</style>
    </section>
  )
}
