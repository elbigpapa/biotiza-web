/**
 * animations.ts — Variantes reutilizables de Framer Motion para Biotiza
 *
 * Uso estándar (conforme a CLAUDE.md):
 *   <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
 *
 * Para contenedores con hijos escalonados:
 *   <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
 *     <motion.div variants={fadeInUp}>...</motion.div>
 *   </motion.div>
 */

import type { Variants } from 'framer-motion'

// Cubic bezier reutilizable
const easeOutQuart: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]
const easeOutBack: [number, number, number, number] = [0.34, 1.56, 0.64, 1]

// ─── Fade In ───────────────────────────────────────────────────────────────

/** Aparece desde abajo: opacity 0→1, y 30→0 en 0.6s */
export const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOutQuart,
    },
  },
} satisfies Variants

/** Aparece desde la izquierda: opacity 0→1, x -30→0 */
export const fadeInLeft = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: easeOutQuart,
    },
  },
} satisfies Variants

/** Aparece desde la derecha: opacity 0→1, x 30→0 */
export const fadeInRight = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: easeOutQuart,
    },
  },
} satisfies Variants

/** Solo fade, sin movimiento */
export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
} satisfies Variants

// ─── Scale ────────────────────────────────────────────────────────────────

/** Aparece con zoom sutil: scale 0.95→1, opacity 0→1 */
export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeOutBack,
    },
  },
} satisfies Variants

/** Zoom desde el centro, más pronunciado */
export const scaleInCenter = {
  hidden: {
    opacity: 0,
    scale: 0.85,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: 'easeOut' as const,
    },
  },
} satisfies Variants

// ─── Contenedores ─────────────────────────────────────────────────────────

/** Wrapper que escalone la aparición de sus hijos cada 0.1s */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
} satisfies Variants

/** Stagger más lento, para secciones con menos elementos */
export const staggerContainerSlow = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
} satisfies Variants

/** Stagger rápido, para grids con muchas tarjetas */
export const staggerContainerFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
} satisfies Variants

// ─── Números / Contadores ─────────────────────────────────────────────────

/**
 * Para animación de estadísticas/números grandes.
 * Usa con useMotionValue + useTransform para animar el valor numérico,
 * o simplemente como entrada visual del contenedor del número.
 */
export const counterUp = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: easeOutQuart,
    },
  },
} satisfies Variants

// ─── Slide ────────────────────────────────────────────────────────────────

/** Desliza desde abajo (distancia mayor, para modales/drawers) */
export const slideUp = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOutQuart,
    },
  },
  exit: {
    opacity: 0,
    y: 40,
    transition: { duration: 0.3, ease: 'easeIn' as const },
  },
} satisfies Variants

// ─── Hover helpers (para motion.div con whileHover) ───────────────────────

/** Levanta ligeramente la tarjeta en hover */
export const cardHover = {
  rest:  { y: 0,   boxShadow: '0 2px 16px 0 rgba(15, 23, 42, 0.08)' },
  hover: { y: -4,  boxShadow: '0 8px 32px 0 rgba(34, 181, 115, 0.2)', transition: { duration: 0.25 } },
}

/** Escala sutil en hover (para botones/badges) */
export const buttonHover = {
  rest:  { scale: 1 },
  hover: { scale: 1.03, transition: { duration: 0.2 } },
  tap:   { scale: 0.97 },
}

// ─── Transición de página ─────────────────────────────────────────────────

export const pageTransition = {
  hidden:  { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.4, ease: 'easeOut' as const } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.25, ease: 'easeIn' as const } },
} satisfies Variants
