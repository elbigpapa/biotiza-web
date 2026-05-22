'use client'

/**
 * template.tsx — Transición de página global
 *
 * En Next.js App Router, `template.tsx` se re-monta en cada navegación,
 * a diferencia de `layout.tsx` que persiste. Esto nos da el hook perfecto
 * para fade-in suave en cada cambio de página.
 *
 * Respeta prefers-reduced-motion (se vuelve un no-op).
 */

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <>{children}</>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
