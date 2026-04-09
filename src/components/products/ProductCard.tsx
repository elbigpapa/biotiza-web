/**
 * ProductCard.tsx — Tarjeta de producto premium para grids y carruseles
 */

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import type { ProductLine } from '@/types'

export interface ProductCardData {
  id: string
  slug: string
  name: string
  line: ProductLine
  tagline: string
  icon?: string
  href?: string
}

interface ProductCardProps {
  product: ProductCardData
  className?: string
}

// Gradientes por línea para el placeholder de imagen
const LINE_GRADIENTS: Record<ProductLine, string> = {
  organicos:       'from-verde-700   to-verde-500',
  especialidades:  'from-azul-700    to-azul-500',
  bioestimulantes: 'from-naranja-600 to-naranja-400',
  nutricion:       'from-naranja-500 to-naranja-300',
  zentia:          'from-azul-600    to-azul-400',
}

const LINE_ICONS: Record<ProductLine, string> = {
  organicos:       '🌿',
  especialidades:  '⚗️',
  bioestimulantes: '✨',
  nutricion:       '💧',
  zentia:          '🛡️',
}

const LINE_GLOW: Record<ProductLine, string> = {
  organicos:       '0 12px 40px rgba(34, 181, 115, 0.15)',
  especialidades:  '0 12px 40px rgba(14, 110, 153, 0.15)',
  bioestimulantes: '0 12px 40px rgba(232, 105, 15, 0.12)',
  nutricion:       '0 12px 40px rgba(242, 138, 61, 0.12)',
  zentia:          '0 12px 40px rgba(17, 137, 191, 0.15)',
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { slug, name, line, tagline, icon, href } = product
  const productHref = href ?? `/soluciones/${line}/${slug}`
  const gradient    = LINE_GRADIENTS[line]
  const lineIcon    = icon ?? LINE_ICONS[line]

  return (
    <div
      className={cn(
        'group flex flex-col rounded-2xl bg-white border border-gris-100',
        'shadow-[0_2px_16px_rgba(15,23,42,0.05)]',
        'transition-all duration-500 overflow-hidden',
        'w-[280px] shrink-0 sm:w-[300px]',
        className,
      )}
      style={{ willChange: 'transform, box-shadow' }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = LINE_GLOW[line]
        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(15, 23, 42, 0.05)'
        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
      }}
    >
      {/* Imagen placeholder con gradiente de la línea */}
      <div className={cn('relative flex items-center justify-center h-44 bg-gradient-to-br overflow-hidden', gradient)}>
        {/* Decorative elements */}
        <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10" aria-hidden="true" />
        <div className="absolute left-6 -bottom-8 h-20 w-20 rounded-full bg-white/5" aria-hidden="true" />

        <span className="text-5xl select-none drop-shadow-md transition-transform duration-500 group-hover:scale-110" aria-hidden="true">
          {lineIcon}
        </span>
        {/* Badge de línea */}
        <div className="absolute top-3 left-3">
          <Badge line={line} size="sm" />
        </div>
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-1 p-5 gap-2.5">
        <h3 className="text-base font-semibold text-gris-900 leading-tight">
          {name}
        </h3>
        <p className="text-sm text-gris-500 leading-relaxed line-clamp-2 flex-1">
          {tagline}
        </p>

        <Link
          href={productHref}
          className={cn(
            'inline-flex items-center gap-1.5 mt-1',
            'text-sm font-semibold text-verde-600',
            'transition-all duration-300',
            'group-hover:gap-2.5',
          )}
        >
          Ver ficha
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}
