'use client'

/**
 * ChatWidget.tsx — "Asesora Biotiza"
 *
 * Widget flotante con panel desplegable. Se comunica con /api/chat
 * que devuelve respuesta + sugerencias clicables. Diseñado para ser
 * amigable, profesional, con micro-animaciones sutiles.
 */

import { useState, useRef, useEffect, type FormEvent, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Send, X, Sparkles, Loader2 } from 'lucide-react'
import { track } from '@vercel/analytics'
import { cn } from '@/lib/utils'
import BiotizaLogo from '@/components/brand/BiotizaLogo'

interface Message {
  role: 'user' | 'assistant'
  content: string
  suggestions?: string[]
  degraded?: boolean
}

type CapturedLead = Record<string, string | number>

// ── Render de markdown ligero (negritas, enlaces, listas) ──────────────────
// Las respuestas de Claude llegan con markdown; sin esto el usuario vería
// asteriscos y corchetes literales (hallazgo de auditoría). Parser acotado y
// seguro (sin dangerouslySetInnerHTML).
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = []
  // Tokeniza **negritas**, [texto](url) y URLs sueltas.
  const regex = /(\*\*([^*]+)\*\*)|(\[([^\]]+)\]\((https?:\/\/[^)]+)\))|(https?:\/\/[^\s]+)/g
  let last = 0
  let m: RegExpExecArray | null
  let i = 0
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index))
    if (m[1]) {
      nodes.push(<strong key={`${keyPrefix}-b${i}`}>{m[2]}</strong>)
    } else if (m[3]) {
      nodes.push(
        <a key={`${keyPrefix}-l${i}`} href={m[5]} target={m[5].startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="font-semibold text-verde-600 underline">{m[4]}</a>,
      )
    } else if (m[6]) {
      nodes.push(
        <a key={`${keyPrefix}-u${i}`} href={m[6]} target="_blank" rel="noopener noreferrer" className="font-semibold text-verde-600 underline break-all">{m[6]}</a>,
      )
    }
    last = m.index + m[0].length
    i++
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

function MessageContent({ content, index }: { content: string; index: number }) {
  const lines = content.split('\n').filter((l) => l.trim() !== '')
  const out: ReactNode[] = []
  let bullets: ReactNode[] = []
  const flush = () => {
    if (bullets.length) {
      out.push(<ul key={`ul-${out.length}`} className="ml-1 list-disc space-y-0.5 pl-4">{bullets}</ul>)
      bullets = []
    }
  }
  lines.forEach((line, li) => {
    const bullet = line.match(/^\s*[-*]\s+(.*)$/)
    if (bullet) {
      bullets.push(<li key={`li-${index}-${li}`}>{renderInline(bullet[1], `${index}-${li}`)}</li>)
    } else {
      flush()
      out.push(<p key={`p-${index}-${li}`} className={out.length ? 'mt-1.5' : ''}>{renderInline(line, `${index}-${li}`)}</p>)
    }
  })
  flush()
  return <>{out}</>
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
  const panelRef = useRef<HTMLElement>(null)
  const hasTrackedOpen = useRef(false)
  const leadRef = useRef<CapturedLead>({})

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, loading])

  // Focus input al abrir + tracking del primer open por sesión
  useEffect(() => {
    if (open) {
      setUnread(false)
      if (!hasTrackedOpen.current) {
        hasTrackedOpen.current = true
        track('chat_opened')
      }
      setTimeout(() => inputRef.current?.focus(), 180)
    }
  }, [open])

  // Cerrar con Escape y mantener el foco dentro del panel mientras está abierto
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])',
        )
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    setMessages((m) => [...m, { role: 'user', content: trimmed }])
    setInput('')
    setLoading(true)

    // Historial sin el saludo inicial 'assistant': Anthropic exige que la
    // conversación empiece en 'user' (el backend también lo sanea).
    const priorHistory = messages
      .filter((m, i) => !(i === 0 && m.role === 'assistant'))
      .slice(-8)
      .map((m) => ({ role: m.role, content: m.content }))

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 28000)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          message: trimmed,
          history: priorHistory,
          lead: Object.keys(leadRef.current).length > 0 ? leadRef.current : undefined,
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
          { role: 'assistant', content: json.reply, suggestions: json.suggestions, degraded: json.mode === 'degraded' },
        ])
        if (json.lead && typeof json.lead === 'object') {
          leadRef.current = { ...leadRef.current, ...json.lead }
          track('chat_lead_captured', { fieldsCount: Object.keys(json.lead).length })
        }
      }
    } catch (err) {
      const aborted = err instanceof DOMException && err.name === 'AbortError'
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content: aborted
            ? 'La respuesta tardó demasiado. Intenta de nuevo o escríbenos por WhatsApp.'
            : 'No logré conectarme. Revisa tu conexión o escríbenos por WhatsApp.',
        },
      ])
    } finally {
      clearTimeout(timeout)
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
          'fixed bottom-24 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-[0_12px_40px_rgba(34,181,115,0.4)]',
          'bg-gradient-to-br from-verde-500 to-verde-600 text-white',
          'transition-transform duration-300 hover:scale-105 active:scale-95',
          'lg:bottom-6 lg:right-24', // móvil: apilado arriba del WhatsApp · desktop: offset lateral
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
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Chat con Asesora Biotiza"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={cn(
              'fixed bottom-44 right-5 z-50 flex w-[calc(100vw-2.5rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-gris-100 bg-white shadow-[0_25px_60px_rgba(15,23,42,0.2)]',
              'h-[min(560px,calc(100vh-17rem))]',
              'lg:bottom-24 lg:right-24',
            )}
          >
            {/* Header */}
            <header className="relative flex items-center gap-3 overflow-hidden bg-gradient-to-br from-verde-600 via-verde-500 to-verde-600 px-4 py-3.5 text-white">
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10 blur-xl" aria-hidden="true" />
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-2 ring-white/40 p-1 overflow-hidden">
                <BiotizaLogo variant="icon" mode="color" className="h-full w-full object-contain" />
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
              aria-live="polite"
              aria-atomic="false"
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
                    {m.role === 'assistant'
                      ? <MessageContent content={m.content} index={i} />
                      : m.content}
                    {m.degraded && (
                      <span className="mt-1.5 block text-[10px] font-medium text-naranja-500">
                        Respuesta en modo básico (asistente avanzado no disponible)
                      </span>
                    )}
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
