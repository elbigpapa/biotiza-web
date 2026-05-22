'use client'

/**
 * Toast.tsx — Sistema de notificaciones flotantes
 *
 * Context provider que expone useToast() hook. Las notificaciones aparecen
 * abajo a la derecha con animación slide-in, auto-dismiss configurable y
 * stack de hasta 3 simultáneas.
 *
 * Uso:
 *   const { showToast } = useToast()
 *   showToast({ type: 'success', title: '¡Listo!', message: 'Enviado.' })
 */

import {
  createContext, useContext, useState, useCallback,
  type ReactNode,
} from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface ToastOptions {
  type?: ToastType
  title: string
  message?: string
  /** ms hasta auto-dismiss (default 5000; 0 = no auto-dismiss) */
  duration?: number
}

interface ToastItem extends ToastOptions {
  id: string
}

interface ToastContextValue {
  showToast: (opts: ToastOptions) => void
  dismissToast: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}

// ─── Estilos por tipo ───────────────────────────────────────────────────────

const TYPE_STYLES: Record<ToastType, { Icon: typeof CheckCircle; bg: string; ring: string; iconColor: string }> = {
  success: { Icon: CheckCircle, bg: 'bg-verde-50',     ring: 'ring-verde-200',   iconColor: 'text-verde-600'   },
  error:   { Icon: AlertCircle, bg: 'bg-red-50',       ring: 'ring-red-200',     iconColor: 'text-red-600'     },
  info:    { Icon: Info,        bg: 'bg-azul-50',      ring: 'ring-azul-200',    iconColor: 'text-azul-600'    },
  warning: { Icon: AlertCircle, bg: 'bg-naranja-50',   ring: 'ring-naranja-200', iconColor: 'text-naranja-600' },
}

// ─── Provider ───────────────────────────────────────────────────────────────

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const dismissToast = useCallback((id: string) => {
    setToasts((curr) => curr.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback((opts: ToastOptions) => {
    const id = `t-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
    const item: ToastItem = { type: 'info', duration: 5000, ...opts, id }
    setToasts((curr) => [...curr.slice(-2), item]) // max 3 visible
    if (item.duration && item.duration > 0) {
      setTimeout(() => dismissToast(id), item.duration)
    }
  }, [dismissToast])

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}

      {/* Contenedor de toasts: bottom-right en desktop, bottom-center en mobile */}
      <div
        className="pointer-events-none fixed bottom-4 right-4 left-4 sm:left-auto z-[70] flex flex-col items-end gap-3 max-w-sm"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => {
            const styles = TYPE_STYLES[toast.type ?? 'info']
            const Icon = styles.Icon
            return (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, x: 60, scale: 0.92 }}
                animate={{ opacity: 1, x: 0,  scale: 1    }}
                exit={{    opacity: 0, x: 60, scale: 0.92 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  'pointer-events-auto w-full sm:w-80 rounded-2xl p-4 shadow-[0_16px_40px_rgba(15,23,42,0.18)] ring-1 backdrop-blur-xl bg-white/95',
                  styles.ring,
                )}
                role="alert"
              >
                <div className="flex items-start gap-3">
                  <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', styles.bg)}>
                    <Icon size={18} className={styles.iconColor} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gris-900 text-sm leading-tight">{toast.title}</p>
                    {toast.message && (
                      <p className="mt-1 text-xs text-gris-600 leading-relaxed">{toast.message}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => dismissToast(toast.id)}
                    aria-label="Cerrar notificación"
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-gris-400 transition-colors hover:bg-gris-100 hover:text-gris-700"
                  >
                    <X size={14} />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
