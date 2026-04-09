/**
 * ProductCard.tsx — Tarjeta de producto para grids y carruseles
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
  tagline: string          // composición principal / tagline corto
  icon?: string            // emoji representativo
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

export default function ProductCard({ product, className }: ProductCardProps) {
  const { slug, name, line, tagline, icon, href } = product
  const productHref = href ?? `/soluciones/${line}/${slug}`
  const gradient    = LINE_GRADIENTS[line]
  const lineIcon    = icon ?? LINE_ICONS[line]

  return (
    <div
      className={cn(
        'group flex flex-col rounded-2xl bg-white border border-gris-100',
        'shadow-card hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(34,181,115,0.14)]',
        'transition-all duration-300 overflow-hidden',
        'w-64 shrink-0 sm:w-72',          // tamaño fijo para el carrusel
        className,
      )}
    >
      {/* Imagen placeholder con gradiente de la línea */}
      <div className={cn('relative flex items-center justify-center h-40 bg-gradient-to-br', gradient)}>
        <span className="text-5xl select-none drop-shadow-sm" aria-hidden="true">
          {lineIcon}
        </span>
        {/* Badge de línea */}
        <div className="absolute top-3 left-3">
          <Badge line={line} size="sm" />
        </div>
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <h3 className="text-sm font-semibold text-gris-900 leading-tight">
          {name}
        </h3>
        <p className="text-xs text-gris-500 leading-relaxed line-clamp-2 flex-1">
          {tagline}
        </p>

        <Link
          href={productHref}
          className={cn(
            'inline-flex items-center gap-1 mt-1',
            'text-xs font-semibold text-verde-600',
            'transition-all duration-200',
            'group-hover:gap-2',
          )}
        >
          Ver ficha
          <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}
