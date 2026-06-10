'use client'

/**
 * template.tsx — Transición de página global
 *
 * En Next.js App Router, `template.tsx` se re-monta en cada navegación,
 * a diferencia de `layout.tsx` que persiste. Esto nos da el hook perfecto
 * para una entrada suave en cada cambio de página.
 *
 * SEO / LCP CRÍTICO: la entrada NUNCA parte de `opacity: 0`. Si lo hiciera,
 * todo el HTML renderizado en el servidor llegaría invisible hasta que el JS
 * hidratara, acoplando el LCP al JS y haciendo que Googlebot (y cualquier
 * usuario sin JS) viera la página visualmente vacía.
 *
 * Solución: el contenido arranca SIEMPRE visible (`opacity: 1`) y solo hace un
 * sutil deslizamiento vertical (translateY) que no oculta nada. El HTML inicial
 * es plenamente visible sin JS; la animación es puro adorno progresivo.
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
      // Arranca visible (opacity: 1): el contenido SSR nunca se oculta.
      // Solo un leve translateY como entrada elegante.
      initial={{ opacity: 1, y: 8 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
