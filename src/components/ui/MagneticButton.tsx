'use client'

/**
 * MagneticButton.tsx — Botón premium que "atrae" el cursor
 *
 * Cuando el cursor está cerca, el botón se desplaza ligeramente hacia él
 * creando sensación táctil. Patrón usado por Awwwards-winning sites,
 * Linear, Vercel, Apple.
 *
 * Por dentro es un <button> o <a> regular — recibe children y onClick/href.
 */

import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  /** Fuerza de atracción (default 0.35; 0=ninguna, 1=full follow) */
  strength?: number
  /** Radio del área magnética en px (default 100) */
  radius?: number
  onClick?: () => void
  href?: string
  type?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
}

export default function MagneticButton({
  children,
  className,
  strength = 0.35,
  radius = 100,
  onClick,
  href,
  type = 'button',
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 })

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width  / 2
    const cy = rect.top  + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.hypot(dx, dy)
    if (dist > radius) {
      x.set(0)
      y.set(0)
      return
    }
    x.set(dx * strength)
    y.set(dy * strength)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className="inline-flex"
    >
      {href ? (
        <a href={href} aria-label={ariaLabel} className={cn(className)}>
          {children}
        </a>
      ) : (
        <button type={type} onClick={onClick} aria-label={ariaLabel} className={cn(className)}>
          {children}
        </button>
      )}
    </motion.div>
  )

  return inner
}
