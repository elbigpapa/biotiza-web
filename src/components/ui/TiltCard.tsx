'use client'

/**
 * TiltCard.tsx — Card con efecto 3D tilt al pasar el cursor
 *
 * Usa framer-motion para detectar la posición del mouse sobre la card y
 * aplicar una rotación 3D suave en eje X/Y. Crea sensación de profundidad
 * tipo "premium product showcase" sin ser exagerado.
 *
 * Respeta prefers-reduced-motion: si el usuario lo solicita, no aplica el
 * tilt (cumple WCAG 2.3.3 Animation from Interactions).
 *
 * Uso:
 *   <TiltCard intensity={12}>
 *     <div>contenido</div>
 *   </TiltCard>
 */

import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

interface TiltCardProps {
  children: ReactNode
  /** Grados máximos de rotación (default 8). Más alto = más drama. */
  intensity?: number
  /** Spring stiffness (default 200) */
  stiffness?: number
  /** Spring damping (default 20) */
  damping?: number
  /** Habilitar brillo/glare que sigue al cursor */
  glare?: boolean
  className?: string
}

export default function TiltCard({
  children,
  intensity = 8,
  stiffness = 200,
  damping = 20,
  glare = true,
  className,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // Posición del mouse normalizada (-0.5 a 0.5)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Springs para movimiento suave
  const springConfig = { stiffness, damping, mass: 0.5 }
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), springConfig)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), springConfig)

  // Glare position (sigue al cursor)
  const glareX = useTransform(x, [-0.5, 0.5], ['20%', '80%'])
  const glareY = useTransform(y, [-0.5, 0.5], ['20%', '80%'])
  const glareOpacity = useSpring(0, { stiffness: 150, damping: 25 })

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width  - 0.5
    const py = (e.clientY - rect.top)  / rect.height - 0.5
    x.set(px)
    y.set(py)
  }

  function handleMouseEnter() {
    if (shouldReduceMotion) return
    glareOpacity.set(1)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
    glareOpacity.set(0)
  }

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1200,
      }}
      className={cn('relative', className)}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative h-full w-full"
      >
        {children}

        {/* Glare effect — luz que sigue al cursor */}
        {glare && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              background: 'radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(255,255,255,0.25) 0%, transparent 50%)',
              opacity: glareOpacity,
              ['--glare-x' as string]: glareX,
              ['--glare-y' as string]: glareY,
              mixBlendMode: 'plus-lighter',
            }}
            aria-hidden="true"
          />
        )}
      </motion.div>
    </motion.div>
  )
}
