'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CalendarCheck, MessageCircle } from 'lucide-react'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { cn } from '@/lib/utils'

function CTABackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg className="absolute -left-20 -bottom-20 h-80 w-80 text-verde-700 opacity-20" viewBox="0 0 200 200">
        <path d="M100,10 Q190,100 100,190 Q10,100 100,10 Z" fill="currentColor" />
      </svg>
      <svg className="absolute -right-16 -top-16 h-72 w-72 text-verde-600 opacity-15" viewBox="0 0 384 384">
        <circle cx="192" cy="192" r="192" fill="currentColor" />
      </svg>
      <svg className="absolute left-0 top-0 h-full w-full text-verde-700 opacity-10" viewBox="0 0 1440 400" preserveAspectRatio="xMidYMid slice">
        <path d="M0,150 Q360,50 720,150 Q1080,250 1440,150" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M0,250 Q400,150 800,250 Q1200,350 1440,250" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>
    </div>
  )
}

export default function CTASection() {
  return (
    <section className="relative bg-verde-800 py-20 lg:py-28 overflow-hidden">
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
            className="mb-5 inline-flex items-center rounded-full border border-verde-600/40 bg-verde-700/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-verde-300 backdrop-blur-sm"
          >
            Asesoría sin costo
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl font-normal text-white text-balance sm:text-4xl md:text-5xl"
          >
            ¿No sabes qué producto necesitas?
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mt-5 text-base leading-relaxed text-verde-200 sm:text-lg"
          >
            Nuestros agrónomos te asesoran sin costo. Cuéntanos sobre tu cultivo
            y te armamos un programa de nutrición a la medida.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/contacto"
              className={cn(
                'inline-flex items-center gap-2 rounded-lg',
                'border-2 border-white px-6 py-3',
                'text-sm font-semibold text-white',
                'transition-all duration-200',
                'hover:bg-white hover:text-verde-800',
                'active:scale-[0.97]',
              )}
            >
              <CalendarCheck size={16} />
              Agendar Asesoría
            </Link>
            <a
              href="https://wa.me/523300000000?text=Hola%20Biotiza%2C%20quiero%20asesor%C3%ADa%20para%20mi%20cultivo"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center gap-2 rounded-lg',
                'bg-[#25D366] px-6 py-3',
                'text-sm font-semibold text-white',
                'hover:bg-[#1ebe57] active:scale-[0.97]',
                'shadow-[0_4px_20px_rgba(37,211,102,0.4)]',
                'transition-all duration-200',
              )}
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
