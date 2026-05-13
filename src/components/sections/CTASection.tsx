'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CalendarCheck, MessageCircle, Check } from 'lucide-react'
import { staggerContainer, fadeInUp } from '@/lib/animations'

function CTABackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Mesh gradient — un poco más intenso para dar profundidad */}
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(ellipse 60% 50% at 20% 50%, rgba(34, 181, 115, 0.20) 0%, transparent 60%),
          radial-gradient(ellipse 50% 60% at 80% 30%, rgba(252, 85, 4, 0.10) 0%, transparent 60%)
        `,
      }} />

      {/* Glow orbs */}
      <div className="absolute -left-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-verde-500/12 blur-[100px] animate-float-slow" />
      <div className="absolute -right-[5%] bottom-[10%] h-[300px] w-[300px] rounded-full bg-azul-500/10 blur-[80px] animate-float-reverse" />

      {/* Dot pattern */}
      <div className="absolute inset-0 dot-pattern-dark opacity-35" />

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
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-verde-400/30 bg-verde-500/12 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-verde-200 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-verde-300" />
            Asesoría sin costo
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl font-normal text-white text-balance sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05]"
            style={{ textShadow: '0 4px 16px rgba(0,0,0,0.35)' }}
          >
            ¿Listo para llevar tu cosecha al siguiente nivel?
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mt-6 text-base leading-relaxed sm:text-lg max-w-2xl mx-auto"
            style={{ color: '#f0fdf6', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
          >
            Cuéntanos sobre tu cultivo y un agrónomo Biotiza te arma un protocolo
            personalizado en menos de 24 horas. Sin compromiso, sin spam.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="https://wa.me/523316022708?text=Hola%20Biotiza%2C%20quiero%20asesor%C3%ADa%20para%20mi%20cultivo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-7 py-3 text-sm font-semibold text-white hover:bg-[#1ebe57] active:scale-[0.97] shadow-[0_4px_24px_rgba(37,211,102,0.40)] transition-all duration-300 hover:-translate-y-0.5"
            >
              <MessageCircle size={16} />
              Hablar por WhatsApp
            </a>
            <Link href="/contacto" className="btn-secondary group">
              <CalendarCheck size={16} />
              Agendar asesoría
            </Link>
          </motion.div>

          {/* Trust line — invita al contacto sin presión */}
          <motion.ul
            variants={fadeInUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] font-medium"
            style={{ color: '#b8f4da' }}
          >
            <li className="inline-flex items-center gap-1.5">
              <Check size={14} className="text-verde-300" strokeWidth={2.5} />
              Respuesta en menos de 24h
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Check size={14} className="text-verde-300" strokeWidth={2.5} />
              Asesoría incluida en cada compra
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Check size={14} className="text-verde-300" strokeWidth={2.5} />
              Productos OMRI · COFEPRIS
            </li>
          </motion.ul>
        </motion.div>
      </div>
    </section>
  )
}
