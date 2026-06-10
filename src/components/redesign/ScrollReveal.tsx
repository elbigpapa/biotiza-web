'use client'

import { motion, type Variants, useReducedMotion } from 'motion/react'

/**
 * ScrollReveal — entrada escalonada al hacer scroll.
 *
 * <Reveal> dispara la animación cuando entra al viewport; cada
 * <RevealItem> hijo aparece con un pequeño retraso secuencial.
 *
 * Respeta prefers-reduced-motion: si el usuario lo activa, el contenido
 * aparece de inmediato sin desplazamiento ni fundido.
 */

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

// Variantes neutras para prefers-reduced-motion: nada se mueve ni se oculta.
const staticContainer: Variants = { hidden: {}, show: {} }
const staticItem: Variants = { hidden: { opacity: 1 }, show: { opacity: 1 } }

export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      variants={reduce ? staticContainer : containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div variants={reduce ? staticItem : itemVariants} className={className}>
      {children}
    </motion.div>
  )
}
