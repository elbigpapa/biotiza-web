'use client'

/**
 * ScrollProgress.tsx — Barra de progreso fija arriba que muestra cuánto
 * has scrolleado del artículo/página.
 *
 * Sub-pixel rendering vía framer-motion useScroll. No bloquea interacción.
 * Patrón usado por Medium, Substack, Linear y otros sitios premium.
 */

import { motion, useScroll, useSpring } from 'framer-motion'

interface ScrollProgressProps {
  className?: string
  /** Color del gradient. Default: brand verde + azul */
  gradient?: string
}

export default function ScrollProgress({
  className = '',
  gradient = 'linear-gradient(90deg, #22b573 0%, #1189bf 50%, #e8690f 100%)',
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className={`fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left ${className}`}
      style={{
        scaleX,
        background: gradient,
        transformOrigin: '0% 50%',
      }}
      aria-hidden="true"
    />
  )
}
