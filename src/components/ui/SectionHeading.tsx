'use client'

/**
 * SectionHeading.tsx — Encabezado de sección animado con línea decorativa
 *
 * Uso:
 *   <SectionHeading
 *     tag="Línea Orgánicos"
 *     title="Nutrición que la tierra agradece"
 *     subtitle="Formulaciones de origen biológico certificadas OMRI para cultivos de exportación."
 *   />
 *
 *   <SectionHeading
 *     title="Nuestros Resultados"
 *     align="left"
 *     accentColor="naranja"
 *     animate={false}
 *   />
 */

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeInUp, staggerContainer } from '@/lib/animations'

// ─── Tipos ────────────────────────────────────────────────────────────────

export type HeadingAlign = 'left' | 'center' | 'right'
export type HeadingAccent = 'verde' | 'naranja' | 'azul' | 'naranja-lt'
export type HeadingLevel = 'h1' | 'h2' | 'h3'

export interface SectionHeadingProps {
  /** Texto pequeño sobre el título (ej: nombre de línea, categoría) */
  tag?: string
  /** Título principal — DM Serif Display */
  title: string
  /** Subtítulo / descripción — DM Sans */
  subtitle?: string
  /** Alineación del bloque completo */
  align?: HeadingAlign
  /** Color de la línea decorativa y del tag */
  accentColor?: HeadingAccent
  /** Nivel HTML del título */
  level?: HeadingLevel
  /** Activa la animación fadeInUp con whileInView */
  animate?: boolean
  /** Clases extra para el contenedor raíz */
  className?: string
  /** Clases extra solo para el título */
  titleClassName?: string
}

// ─── Config de colores ────────────────────────────────────────────────────

const accentStyles: Record<HeadingAccent, { tag: string; bar: string }> = {
  verde:      { tag: 'text-verde-600 bg-verde-50',     bar: 'bg-verde-500' },
  naranja:    { tag: 'text-naranja-600 bg-naranja-100', bar: 'bg-naranja-500' },
  azul:       { tag: 'text-azul-600 bg-azul-100',      bar: 'bg-azul-500' },
  'naranja-lt': { tag: 'text-naranja-500 bg-naranja-100', bar: 'bg-naranja-400' },
}

const alignStyles: Record<HeadingAlign, string> = {
  left:   'items-start text-left',
  center: 'items-center text-center',
  right:  'items-end text-right',
}

// ─── Componente ───────────────────────────────────────────────────────────

export default function SectionHeading({
  tag,
  title,
  subtitle,
  align = 'center',
  accentColor = 'verde',
  level: Level = 'h2',
  animate = true,
  className,
  titleClassName,
}: SectionHeadingProps) {
  const accent = accentStyles[accentColor]
  const alignCls = alignStyles[align]

  const Wrapper = animate ? motion.div : 'div'
  const wrapperProps = animate
    ? {
        variants: staggerContainer,
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: { once: true, margin: '-60px' },
      }
    : {}

  const ItemWrapper = animate ? motion.div : 'div'
  const itemProps = animate ? { variants: fadeInUp } : {}

  return (
    <Wrapper
      className={cn('flex flex-col gap-4', alignCls, className)}
      {...wrapperProps}
    >
      {/* Tag / eyebrow */}
      {tag && (
        <ItemWrapper {...itemProps}>
          <span
            className={cn(
              'inline-block rounded-full px-3 py-1',
              'text-xs font-semibold uppercase tracking-widest',
              accent.tag,
            )}
          >
            {tag}
          </span>
        </ItemWrapper>
      )}

      {/* Título + línea decorativa */}
      <ItemWrapper {...itemProps} className="flex flex-col gap-3">
        <Level
          className={cn(
            'font-serif font-normal text-gris-900 text-balance leading-tight',
            titleClassName,
          )}
        >
          {title}
        </Level>

        {/* Línea decorativa */}
        <div
          className={cn(
            'h-1 w-12 rounded-full',
            accent.bar,
            align === 'center' && 'mx-auto',
            align === 'right'  && 'ml-auto',
          )}
          aria-hidden="true"
        />
      </ItemWrapper>

      {/* Subtítulo */}
      {subtitle && (
        <ItemWrapper {...itemProps}>
          <p
            className={cn(
              'max-w-2xl text-base leading-relaxed text-gris-600',
              align === 'center' && 'mx-auto',
              align === 'right'  && 'ml-auto',
            )}
          >
            {subtitle}
          </p>
        </ItemWrapper>
      )}
    </Wrapper>
  )
}
