'use client'

/**
 * ChatWidget.tsx — "Asesora Biotiza"
 *
 * Widget flotante con panel desplegable. Se comunica con /api/chat
 * que devuelve respuesta + sugerencias clicables. Diseñado para ser
 * amigable, profesional, con micro-animaciones sutiles.
 */

import { useState, useRef, useEffect, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Send, X, Leaf, Sparkles, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  role: 'user' | 'assistant'
  content: string
  suggestions?: string[]
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content:
    '¡Hola! 🌱 Soy la Asesora Biotiza. Te puedo ayudar a elegir productos, resolver dudas de dosis o diagnosticar problemas de cultivo. ¿En qué te apoyo?',
  suggestions: [
    'Deficiencia de calcio en tomate',
    'Bioestimulante para cuajado',
    'Control biológico de mosca blanca',
  ],
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [unread, setUnread] = useState(true)

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, loading])

  // Focus input al abrir
  useEffect(() => {
    if (open) {
      setUnread(false)
      setTimeout(() => inputRef.current?.focus(), 180)
    }
  }, [open])

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    setMessages((m) => [...m, { role: 'user', content: trimmed }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: messages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
        }),
      })
      const json = await res.json()
      if (!res.ok || !json?.ok) {
        setMessages((m) => [
          ...m,
          {
            role: 'assistant',
            content:
              json?.error ??
              'Se me cruzaron los cables 😅. Intenta de nuevo en unos segundos o escríbenos por WhatsApp.',
          },
        ])
      } else {
        setMessages((m) => [
          ...m,
          { role: 'assistant', content: json.reply, suggestions: json.suggestions },
        ])
      }
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content: 'No logré conectarme. Revisa tu conexión o escríbenos por WhatsApp.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      {/* ── Botón flotante ──────────────────────────────────────────────── */}
      <button
        type="button"
        aria-label={open ? 'Cerrar asistente' : 'Abrir asistente Biotiza'}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-[0_12px_40px_rgba(34,181,115,0.4)]',
          'bg-gradient-to-br from-verde-500 to-verde-600 text-white',
          'transition-transform duration-300 hover:scale-105 active:scale-95',
          'lg:bottom-6 lg:right-24', // deja espacio al WhatsAppFloat
        )}
      >
        {open ? (
          <X size={22} strokeWidth={2.2} />
        ) : (
          <>
            <Sparkles size={22} strokeWidth={2} />
            {unread && (
              <span className="absolute right-0.5 top-0.5 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-naranja-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-naranja-500 ring-2 ring-white" />
              </span>
            )}
          </>
        )}
      </button>

      {/* ── Panel del chat ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.aside
            role="dialog"
            aria-label="Chat con Asesora Biotiza"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={cn(
              'fixed bottom-24 right-5 z-50 flex w-[calc(100vw-2.5rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-gris-100 bg-white shadow-[0_25px_60px_rgba(15,23,42,0.2)]',
              'h-[min(560px,calc(100vh-7rem))]',
              'lg:right-24',
            )}
          >
            {/* Header */}
            <header className="relative flex items-center gap-3 overflow-hidden bg-gradient-to-br from-verde-600 via-verde-500 to-verde-600 px-4 py-3.5 text-white">
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10 blur-xl" aria-hidden="true" />
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm ring-2 ring-white/30">
                <Leaf size={18} />
              </div>
              <div className="relative flex-1">
                <p className="font-serif text-base leading-tight">Asesora Biotiza</p>
                <p className="flex items-center gap-1.5 text-[11px] text-verde-100">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-verde-300 animate-pulse" />
                  En línea · 24/7
                </p>
              </div>
              <button
                type="button"
                aria-label="Cerrar chat"
                onClick={() => setOpen(false)}
                className="relative flex h-8 w-8 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </button>
            </header>

            {/* Mensajes */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto bg-gradient-to-b from-verde-50/30 to-white px-4 py-4"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex max-w-[85%] flex-col gap-2',
                    m.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start',
                  )}
                >
                  <div
                    className={cn(
                      'rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm',
                      m.role === 'user'
                        ? 'rounded-br-sm bg-verde-500 text-white'
                        : 'rounded-bl-sm border border-gris-100 bg-white text-gris-800',
                    )}
                  >
                    {m.content}
                  </div>

                  {m.role === 'assistant' && m.suggestions && m.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {m.suggestions.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => sendMessage(s)}
                          disabled={loading}
                          className="rounded-full border border-verde-200 bg-white px-3 py-1 text-xs font-medium text-verde-700 transition-colors hover:bg-verde-50 disabled:opacity-50"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="mr-auto flex max-w-[85%] items-center gap-2 rounded-2xl rounded-bl-sm border border-gris-100 bg-white px-3.5 py-2.5 shadow-sm">
                  <Loader2 size={14} className="animate-spin text-verde-500" />
                  <span className="text-xs text-gris-500">La Asesora está pensando...</span>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t border-gris-100 bg-white p-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu pregunta..."
                  maxLength={500}
                  disabled={loading}
                  aria-label="Mensaje para la Asesora Biotiza"
                  className="min-w-0 flex-1 rounded-xl border border-gris-200 bg-gris-50 px-3.5 py-2.5 text-sm text-gris-800 placeholder:text-gris-400 focus:border-verde-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-verde-500/15 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  aria-label="Enviar mensaje"
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white transition-all',
                    'bg-gradient-to-br from-verde-500 to-verde-600 shadow-sm',
                    'hover:shadow-[0_4px_14px_rgba(34,181,115,0.35)] hover:-translate-y-0.5',
                    'active:scale-95',
                    'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-sm',
                  )}
                >
                  <Send size={15} />
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-gris-400">
                Para respuestas de un agrónomo humano, usa{' '}
                <a href="https://wa.me/523316022708" target="_blank" rel="noopener noreferrer" className="font-semibold text-verde-600 hover:underline">
                  WhatsApp
                </a>
                {' '}o{' '}
                <a href="/contacto" className="font-semibold text-verde-600 hover:underline">
                  /contacto
                </a>
                .
              </p>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
