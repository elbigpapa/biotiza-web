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
  { from: 'user',      text: 'Tengo manchas amarillas en mi tomate 🍅',                  delay: 0.3  },
  { from: 'assistant', text: '¿Las manchas están entre las venas o son generalizadas?\n¿En hojas de arriba o de abajo?', delay: 1.2 },
  { from: 'user',      text: 'Entre las venas, en hojas de abajo',                       delay: 2.4  },
  {
    from: 'assistant',
    text: 'Parece deficiencia de magnesio. Te recomiendo:\n\n📋 BP Magnesio — 2 mL/L foliar cada 10 días\n\n¿Quieres que lo agregue a tu cotización? ✅',
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
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={cn('flex w-full gap-2', isUser ? 'justify-end' : 'justify-start')}
        >
          {/* Avatar asistente */}
          {!isUser && (
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-verde-500 mt-1">
              <Bot size={14} className="text-white" />
            </div>
          )}

          <div
            className={cn(
              'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
              isUser
                ? 'rounded-tr-sm bg-verde-600 text-white'
                : 'rounded-tl-sm bg-gris-700 text-gris-100',
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
    <section className="bg-gradient-to-br from-gris-900 via-gris-900 to-verde-900 py-20 lg:py-28">
      <Container>
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
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-verde-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-verde-400"
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

            <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/herramientas/diagnostico"
                className={cn(
                  'inline-flex items-center gap-2 rounded-lg',
                  'bg-naranja-500 px-5 py-2.5',
                  'text-sm font-semibold text-white',
                  'hover:bg-naranja-600 transition-colors',
                )}
              >
                <Sparkles size={15} />
                Prueba la Asesora
              </Link>
              <a
                href="https://wa.me/523300000000?text=Hola%20Asesora%20Biotiza"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex items-center gap-2 rounded-lg',
                  'bg-[#25D366] px-5 py-2.5',
                  'text-sm font-semibold text-white',
                  'hover:bg-[#1ebe57] transition-colors',
                )}
              >
                <MessageCircle size={15} />
                Escríbenos por WhatsApp
              </a>
            </motion.div>
          </div>

          {/* Mockup del chat */}
          <motion.div
            ref={ref}
            variants={fadeInUp}
            className="mx-auto w-full max-w-md"
          >
            {/* Header del chat */}
            <div className="rounded-t-2xl bg-gris-800 px-4 py-3 flex items-center gap-3 border-b border-gris-700">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-verde-500">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Asesora Biotiza</p>
                <p className="text-xs text-verde-400">● En línea ahora</p>
              </div>
            </div>

            {/* Mensajes */}
            <div className="min-h-[280px] space-y-3 rounded-b-2xl bg-gris-800 p-4">
              {MESSAGES.map((msg, i) => (
                <ChatBubble key={i} msg={msg} show={visible[i]} />
              ))}
            </div>

            {/* Input simulado */}
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-gris-800 px-4 py-3">
              <input
                readOnly
                placeholder="Escribe tu consulta agronómica..."
                className="flex-1 bg-transparent text-sm text-gris-400 placeholder:text-gris-600 focus:outline-none cursor-default"
              />
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-verde-500">
                <MessageCircle size={14} className="text-white" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
