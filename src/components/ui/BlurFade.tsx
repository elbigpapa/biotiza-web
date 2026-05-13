'use client'

/**
 * BlurFade.tsx — Componente reusable de reveal on scroll
 *
 * El elemento empieza con blur + opacity 0 + offset y se anima a su
 * estado natural cuando entra en viewport. Patrón usado por Vercel,
 * Linear, Stripe — sensación premium sin ser exagerado.
 *
 * Respeta prefers-reduced-motion.
 *
 * Uso:
 *   <BlurFade delay={0.1}>
 *     <h1>Título</h1>
 *   </BlurFade>
 */

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface BlurFadeProps {
  children: ReactNode
  className?: string
  /** Delay en segundos (default 0) */
  delay?: number
  /** Duración (default 0.6) */
  duration?: number
  /** Offset Y inicial (default 24px) */
  offset?: number
  /** Blur inicial en px (default 8) */
  blur?: number
  /** once = solo dispara una vez (default true) */
  once?: boolean
  /** Margin para trigger del viewport (default '-80px') */
  margin?: string
  /** Direction: 'up' | 'down' | 'left' | 'right' (default 'up') */
  direction?: 'up' | 'down' | 'left' | 'right'
}

export default function BlurFade({
  children,
  className,
  delay = 0,
  duration = 0.6,
  offset = 24,
  blur = 8,
  once = true,
  margin = '-80px',
  direction = 'up',
}: BlurFadeProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  const offsetMap = {
    up:    { y:  offset, x: 0 },
    down:  { y: -offset, x: 0 },
    left:  { y: 0, x:  offset },
    right: { y: 0, x: -offset },
  }
  const initial = {
    opacity: 0,
    filter: `blur(${blur}px)`,
    ...offsetMap[direction],
  }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0, y: 0 }}
      viewport={{ once, margin }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // cubic-bezier premium
      }}
    >
      {children}
    </motion.div>
  )
}
