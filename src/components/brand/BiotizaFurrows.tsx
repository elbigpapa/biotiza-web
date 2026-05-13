/**
 * BiotizaFurrows.tsx — Decoración inspirada en los surcos del logo oficial
 *
 * Renderiza los surcos curvos del isotipo como decoración SVG full-width.
 * Útil como divisor entre secciones, background acento o marca de agua sutil.
 *
 * Variantes:
 *   - 'divider'    → versión horizontal estilizada para separar secciones
 *   - 'corner'     → esquina decorativa
 *   - 'background' → background pattern de baja opacidad
 *
 * Refuerza la identidad de marca al repetir el motivo gráfico del logo.
 */

import { cn } from '@/lib/utils'

type Variant = 'divider' | 'corner' | 'background'
type Tone = 'light' | 'dark' | 'brand'

interface BiotizaFurrowsProps {
  variant?: Variant
  tone?: Tone
  className?: string
  /** Opacidad base (0-1); útil para usar como marca de agua */
  opacity?: number
  /** Voltear horizontalmente (mirror) */
  flip?: boolean
}

export default function BiotizaFurrows({
  variant = 'divider',
  tone = 'brand',
  className = '',
  opacity = 0.12,
  flip = false,
}: BiotizaFurrowsProps) {
  const baseColor =
    tone === 'light' ? '#ffffff' :
    tone === 'dark'  ? '#0a4a3b' :
    '#0d5c4a' // brand verde oscuro

  // ── Divider horizontal (200x40 viewBox para que se estire bien) ──
  if (variant === 'divider') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className={cn('block w-full', flip && 'scale-y-[-1]', className)}
        aria-hidden="true"
        fill={baseColor}
        style={{ opacity }}
      >
        {/* Surcos curvos repetidos para crear textura horizontal */}
        <g>
          <path d="M 0 70 Q 150 30 300 50 Q 450 70 600 40 Q 750 10 900 35 Q 1050 60 1200 30 L 1200 80 L 0 80 Z" />
          <path d="M 0 60 Q 150 20 300 40 Q 450 60 600 30 Q 750 0 900 25 Q 1050 50 1200 20 L 1200 80 L 0 80 Z" opacity="0.6" />
          <path d="M 0 50 Q 150 10 300 30 Q 450 50 600 20 Q 750 -10 900 15 Q 1050 40 1200 10 L 1200 80 L 0 80 Z" opacity="0.3" />
        </g>
      </svg>
    )
  }

  // ── Esquina decorativa (cuadrante con surcos abriéndose) ──
  if (variant === 'corner') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        className={cn(flip && 'scale-x-[-1]', className)}
        aria-hidden="true"
        fill={baseColor}
        style={{ opacity }}
      >
        <path d="M 12 178 Q 38 120 100 116 L 100 134 Q 50 138 30 178 Z" />
        <path d="M 22 158 Q 50 108 100 102 L 100 118 Q 62 122 42 158 Z" opacity="0.7" />
        <path d="M 36 138 Q 65 96 100 90 L 100 104 Q 75 108 56 138 Z" opacity="0.5" />
      </svg>
    )
  }

  // ── Background pattern full ──
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className={cn('absolute inset-0 w-full h-full pointer-events-none', flip && 'scale-x-[-1]', className)}
      aria-hidden="true"
      fill={baseColor}
      style={{ opacity }}
    >
      {/* Surcos en abanico desde el centro inferior */}
      <g transform="translate(400, 600)">
        <path d="M -380 0 Q -200 -300 -100 -380 L -90 -360 Q -185 -290 -360 -10 Z" />
        <path d="M -340 0 Q -160 -340 -50 -420 L -40 -400 Q -150 -325 -320 -10 Z" opacity="0.7" />
        <path d="M -300 0 Q -120 -380 0 -460 L 0 -440 Q -110 -360 -280 -10 Z" opacity="0.5" />
        <path d="M 380 0 Q 200 -300 100 -380 L 90 -360 Q 185 -290 360 -10 Z" />
        <path d="M 340 0 Q 160 -340 50 -420 L 40 -400 Q 150 -325 320 -10 Z" opacity="0.7" />
        <path d="M 300 0 Q 120 -380 0 -460 L 0 -440 Q 110 -360 280 -10 Z" opacity="0.5" />
      </g>
    </svg>
  )
}
