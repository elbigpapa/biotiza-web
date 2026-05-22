'use client'

import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

/**
 * Immersion — la "capa 2" desplegable de una escena.
 *
 * Acordeón accesible: botón disparador real con aria-expanded /
 * aria-controls, panel que se expande con animación de altura + fade.
 */

interface ImmersionProps {
  /** Texto del disparador, p. ej. "Cómo funciona el acompañamiento". */
  trigger: string
  /** Variante de color para contrastar con el fondo de la escena. */
  tone?: 'dark' | 'light'
  children: React.ReactNode
}

export default function Immersion({
  trigger,
  tone = 'light',
  children,
}: ImmersionProps) {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  const triggerCls =
    tone === 'dark'
      ? 'border-white/25 bg-white/10 text-white hover:bg-white/15'
      : 'border-rule bg-paper-2 text-ink hover:bg-paper-3'

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className={`flex w-full min-h-[44px] items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left text-sm font-semibold transition-colors ${triggerCls}`}
      >
        <span>{trigger}</span>
        <span
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
