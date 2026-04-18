'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { MessageCircle, Bot, Sparkles } from 'lucide-react'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { cn } from '@/lib/utils'
import SectionHeading from '@/components/ui/SectionHeading'
import { Container } from '@/components/ui/Container'

// ─── Mensajes del chat ────────────────────────────────────────────────────

const MESSAGES = [
  { from: 'user',      text: 'Tengo manchas amarillas en mi tomate',                    delay: 0.3  },
  { from: 'assistant', text: '¿Las manchas están entre las venas o son generalizadas?\n¿En hojas de arriba o de abajo?', delay: 1.2 },
  { from: 'user',      text: 'Entre las venas, en hojas de abajo',                       delay: 2.4  },
  {
    from: 'assistant',
    text: 'Parece deficiencia de magnesio. Te recomiendo:\n\nBP Magnesio — 2 mL/L foliar cada 10 días\n\n¿Quieres que lo agregue a tu cotización?',
    delay: 3.6,
  },
]

// ─── Burbuja de chat ──────────────────────────────────────────────────────

function ChatBubble({ msg, show }: { msg: typeof MESSAGES[0]; show: boolean }) {
  const isUser = msg.from === 'user'

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={cn('flex w-full gap-2.5', isUser ? 'justify-end' : 'justify-start')}
        >
          {/* Avatar asistente */}
          {!isUser && (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-verde-400 to-verde-600 mt-1 shadow-sm">
              <Bot size={14} className="text-white" />
            </div>
          )}

          <div
            className={cn(
              'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
              isUser
                ? 'rounded-tr-md bg-gradient-to-br from-verde-500 to-verde-600 text-white shadow-[0_2px_12px_rgba(34,181,115,0.3)]'
                : 'rounded-tl-md bg-gris-800/80 text-gris-200 border border-gris-700/50',
            )}
            style={{ whiteSpace: 'pre-line' }}
          >
            {msg.text}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────

export default function AssistantPreviewSection() {
  const ref        = useRef<HTMLDivElement>(null)
  const isInView   = useInView(ref, { once: true, margin: '-80px' })
  const [visible, setVisible] = useState<boolean[]>(new Array(MESSAGES.length).fill(false))

  useEffect(() => {
    if (!isInView) return
    MESSAGES.forEach((msg, i) => {
      setTimeout(() => {
        setVisible((prev) => {
          const next = [...prev]
          next[i] = true
          return next
        })
      }, msg.delay * 1000)
    })
  }, [isInView])

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #082e21 40%, #0f172a 100%)',
    }}>
      {/* Glow orbs */}
      <div className="absolute top-[10%] left-[5%] h-[400px] w-[400px] rounded-full bg-verde-500/8 blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-[5%] right-[10%] h-[300px] w-[300px] rounded-full bg-azul-500/6 blur-[80px] pointer-events-none" aria-hidden="true" />

      {/* Dot pattern */}
      <div className="absolute inset-0 dot-pattern-dark opacity-30" aria-hidden="true" />

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-16 lg:grid-cols-2 lg:items-center"
        >
          {/* Texto izquierdo */}
          <div>
            <motion.span
              variants={fadeInUp}
              className="mb-5 inline-flex items-center gap-2 rounded-full bg-verde-500/10 border border-verde-500/20 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-verde-400 backdrop-blur-sm"
            >
              <Sparkles size={12} />
              Asesora IA · 24/7
            </motion.span>

            <SectionHeading
              title="Pregunta, diagnostica, resuelve — en 30 segundos"
              subtitle="Tu agrónomo de bolsillo. Disponible 24/7 por WhatsApp y directamente en nuestro sitio."
              align="left"
              accentColor="verde"
              animate
              titleClassName="text-white"
              className="[&_p]:text-gris-400"
            />

            <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap gap-4">
              <Link href="/herramientas/diagnostico" className="btn-accent">
                <Sparkles size={15} />
                Prueba la Asesora
              </Link>
              <a
                href="https://wa.me/523316022708?text=Hola%20Asesora%20Biotiza"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex items-center gap-2 rounded-xl',
                  'bg-[#25D366]/10 border border-[#25D366]/30 px-6 py-3',
                  'text-sm font-semibold text-[#25D366]',
                  'hover:bg-[#25D366]/20 transition-all duration-300',
                  'backdrop-blur-sm',
                )}
              >
                <MessageCircle size={15} />
                WhatsApp
              </a>
            </motion.div>
          </div>

          {/* Mockup del chat */}
          <motion.div
            ref={ref}
            variants={fadeInUp}
            className="mx-auto w-full max-w-md"
          >
            {/* Glow behind mockup */}
            <div className="absolute inset-0 -z-10 blur-[80px] opacity-20 pointer-events-none"
              style={{ background: 'radial-gradient(circle at 50% 50%, rgba(34, 181, 115, 0.4) 0%, transparent 60%)' }}
              aria-hidden="true"
            />

            <div className="rounded-2xl border border-gris-700/50 bg-gris-900/80 backdrop-blur-xl shadow-elevated overflow-hidden">
              {/* Header del chat */}
              <div className="px-5 py-4 flex items-center gap-3 border-b border-gris-800/80 bg-gris-900/60">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-verde-400 to-verde-600 shadow-brand">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Asesora Biotiza</p>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verde-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-verde-400" />
                    </span>
                    <p className="text-xs text-verde-400">En línea</p>
                  </div>
                </div>
              </div>

              {/* Mensajes */}
              <div className="min-h-[280px] space-y-3 p-5">
                {MESSAGES.map((msg, i) => (
                  <ChatBubble key={i} msg={msg} show={visible[i]} />
                ))}
              </div>

              {/* Input simulado */}
              <div className="flex items-center gap-3 border-t border-gris-800/60 px-5 py-3.5 bg-gris-900/40">
                <input
                  readOnly
                  placeholder="Escribe tu consulta agronómica..."
                  className="flex-1 bg-transparent text-sm text-gris-400 placeholder:text-gris-600 focus:outline-none cursor-default"
                />
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-verde-400 to-verde-600 shadow-sm">
                  <MessageCircle size={14} className="text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
