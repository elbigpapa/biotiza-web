'use client'

/**
 * SectionHeading.tsx — Encabezado de sección premium con línea decorativa gradiente
 */

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeInUp, staggerContainer } from '@/lib/animations'

// ─── Tipos ────────────────────────────────────────────────────────────────

export type HeadingAlign = 'left' | 'center' | 'right'
export type HeadingAccent = 'verde' | 'naranja' | 'azul' | 'naranja-lt'
export type HeadingLevel = 'h1' | 'h2' | 'h3'

export interface SectionHeadingProps {
  tag?: string
  title: string
  subtitle?: string
  align?: HeadingAlign
  accentColor?: HeadingAccent
  level?: HeadingLevel
  animate?: boolean
  className?: string
  titleClassName?: string
}

// ─── Config de colores ────────────────────────────────────────────────────

const accentStyles: Record<HeadingAccent, { tag: string; barFrom: string; barTo: string }> = {
  verde:      { tag: 'text-verde-600 bg-verde-50 ring-1 ring-verde-100',     barFrom: '#22b573', barTo: '#1189bf' },
  naranja:    { tag: 'text-naranja-600 bg-naranja-50 ring-1 ring-naranja-100', barFrom: '#e8690f', barTo: '#f28a3d' },
  azul:       { tag: 'text-azul-600 bg-azul-50 ring-1 ring-azul-100',        barFrom: '#1189bf', barTo: '#22b573' },
  'naranja-lt': { tag: 'text-naranja-500 bg-naranja-50 ring-1 ring-naranja-100', barFrom: '#f28a3d', barTo: '#e8690f' },
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
      className={cn('flex flex-col gap-5', alignCls, className)}
      {...wrapperProps}
    >
      {/* Tag / eyebrow */}
      {tag && (
        <ItemWrapper {...itemProps}>
          <span
            className={cn(
              'inline-flex items-center gap-2 rounded-full px-4 py-1.5',
              'text-[11px] font-bold uppercase tracking-[0.15em]',
              accent.tag,
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" aria-hidden="true" />
            {tag}
          </span>
        </ItemWrapper>
      )}

      {/* Título + línea decorativa gradiente */}
      <ItemWrapper {...itemProps} className="flex flex-col gap-4">
        <Level
          className={cn(
            'font-serif font-normal text-gris-900 text-balance leading-[1.15]',
            titleClassName,
          )}
        >
          {title}
        </Level>

        {/* Línea decorativa con gradiente */}
        <div className="flex items-center gap-2"
          style={align === 'center' ? { justifyContent: 'center' } : align === 'right' ? { justifyContent: 'flex-end' } : {}}
          aria-hidden="true"
        >
          <div
            className="h-1 w-10 rounded-full"
            style={{ background: `linear-gradient(90deg, ${accent.barFrom}, ${accent.barTo})` }}
          />
          <div
            className="h-1 w-3 rounded-full opacity-40"
            style={{ background: accent.barFrom }}
          />
        </div>
      </ItemWrapper>

      {/* Subtítulo */}
      {subtitle && (
        <ItemWrapper {...itemProps}>
          <p
            className={cn(
              'max-w-2xl text-base leading-relaxed text-gris-500 sm:text-lg',
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
