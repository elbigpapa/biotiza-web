'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CalendarCheck, MessageCircle } from 'lucide-react'
import { staggerContainer, fadeInUp } from '@/lib/animations'

function CTABackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Mesh gradient */}
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(ellipse 60% 50% at 20% 50%, rgba(34, 181, 115, 0.15) 0%, transparent 60%),
          radial-gradient(ellipse 50% 60% at 80% 30%, rgba(17, 137, 191, 0.1) 0%, transparent 60%)
        `,
      }} />

      {/* Glow orbs */}
      <div className="absolute -left-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-verde-500/10 blur-[100px] animate-float-slow" />
      <div className="absolute -right-[5%] bottom-[10%] h-[300px] w-[300px] rounded-full bg-azul-500/8 blur-[80px] animate-float-reverse" />

      {/* Dot pattern */}
      <div className="absolute inset-0 dot-pattern-dark opacity-30" />

      {/* Decorative shapes */}
      <svg className="absolute -left-20 -bottom-20 h-80 w-80 text-verde-500 opacity-[0.06]" viewBox="0 0 200 200">
        <path d="M100,10 Q190,100 100,190 Q10,100 100,10 Z" fill="currentColor" />
      </svg>
      <svg className="absolute -right-16 -top-16 h-72 w-72 text-verde-400 opacity-[0.04]" viewBox="0 0 384 384">
        <circle cx="192" cy="192" r="192" fill="currentColor" />
      </svg>
    </div>
  )
}

export default function CTASection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" style={{
      background: 'linear-gradient(135deg, #115e43 0%, #0d4d37 40%, #082e21 100%)',
    }}>
      <CTABackground />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <motion.span
            variants={fadeInUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-verde-500/20 bg-verde-500/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-verde-300 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-verde-400" />
            Asesoría sin costo
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl font-normal text-white text-balance sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1]"
          >
            ¿No sabes qué producto necesitas?
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mt-6 text-base leading-relaxed text-verde-200/80 sm:text-lg"
          >
            Nuestros agrónomos te asesoran sin costo. Cuéntanos sobre tu cultivo
            y te armamos un programa de nutrición a la medida.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            <Link href="/contacto" className="btn-secondary group">
              <CalendarCheck size={16} />
              Agendar Asesoría
            </Link>
            <a
              href="https://wa.me/523316022708?text=Hola%20Biotiza%2C%20quiero%20asesor%C3%ADa%20para%20mi%20cultivo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-7 py-3 text-sm font-semibold text-white hover:bg-[#1ebe57] active:scale-[0.97] shadow-[0_4px_24px_rgba(37,211,102,0.35)] transition-all duration-300 hover:-translate-y-0.5"
            >
              <MessageCircle size={16} />
              Enviar WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
