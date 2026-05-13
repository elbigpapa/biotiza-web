'use client'

/**
 * ProductCard.tsx — Tarjeta de producto premium con efecto 3D tilt
 *
 * Usa TiltCard para crear sensación de profundidad al pasar el cursor.
 * Cada línea de producto tiene su gradiente, icono y glow personalizado.
 */

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import TiltCard from '@/components/ui/TiltCard'
import { getProductImage } from '@/data/product-images'
import type { ProductLine, ProductBrand } from '@/types'

export interface ProductCardData {
  id: string
  slug: string
  name: string
  line: ProductLine
  brand?: ProductBrand
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
  bioproteccion:   'from-azul-600    to-azul-400',
}

const LINE_ICONS: Record<ProductLine, string> = {
  organicos:       '🌿',
  especialidades:  '⚗️',
  bioestimulantes: '✨',
  nutricion:       '💧',
  bioproteccion:   '🛡️',
}

const LINE_SHADOW: Record<ProductLine, string> = {
  organicos:       'hover:shadow-[0_24px_60px_rgba(34,181,115,0.22)]',
  especialidades:  'hover:shadow-[0_24px_60px_rgba(14,110,153,0.22)]',
  bioestimulantes: 'hover:shadow-[0_24px_60px_rgba(232,105,15,0.20)]',
  nutricion:       'hover:shadow-[0_24px_60px_rgba(242,138,61,0.20)]',
  bioproteccion:   'hover:shadow-[0_24px_60px_rgba(17,137,191,0.22)]',
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { slug, name, line, brand, tagline, icon, href } = product
  const productHref = href ?? `/soluciones/${line}/${slug}`
  const gradient    = LINE_GRADIENTS[line]
  const lineIcon    = icon ?? LINE_ICONS[line]
  const lineShadow  = LINE_SHADOW[line]
  const photo       = getProductImage(slug)

  return (
    <TiltCard intensity={6} glare className={cn('w-[280px] shrink-0 sm:w-[300px]', className)}>
      <Link
        href={productHref}
        aria-label={`Ver ficha de ${name}`}
        className={cn(
          'group flex flex-col rounded-2xl bg-white border border-gris-100 h-full',
          'shadow-[0_4px_20px_rgba(15,23,42,0.06)]',
          'transition-all duration-500 overflow-hidden',
          '-translate-y-0 hover:-translate-y-1',
          'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-verde-500 focus-visible:ring-offset-2',
          lineShadow,
        )}
        style={{ willChange: 'transform, box-shadow' }}
      >
        {/* Imagen del producto: foto HD real si existe, fallback con emoji */}
        <div className={cn('relative flex items-center justify-center h-52 bg-gradient-to-br overflow-hidden', gradient)}>
          {/* Decorative elements */}
          <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/12" aria-hidden="true" />
          <div className="absolute left-6 -bottom-8 h-20 w-20 rounded-full bg-white/8" aria-hidden="true" />

          {photo ? (
            <Image
              src={photo.src}
              alt={photo.alt}
              width={400}
              height={600}
              sizes="(min-width: 1024px) 300px, (min-width: 640px) 33vw, 50vw"
              className="relative z-10 h-[88%] w-auto object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.30)] transition-transform duration-500 group-hover:scale-[1.06]"
              style={{ transform: 'translateZ(40px)' }}
            />
          ) : (
            <span
              className="text-5xl select-none drop-shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
              aria-hidden="true"
              style={{ transform: 'translateZ(40px)' }}
            >
              {lineIcon}
            </span>
          )}

          {/* Badge de línea */}
          <div className="absolute top-3 left-3 z-20">
            <Badge line={line} size="sm" />
          </div>
          {/* Badge de marca */}
          {brand && (
            <div className="absolute top-3 right-3 z-20">
              <Badge brand={brand} size="sm" showDot={false} className="bg-white/95 backdrop-blur-sm" />
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="flex flex-col flex-1 p-5 gap-2.5">
          <h3 className="text-base font-semibold text-gris-900 leading-tight group-hover:text-verde-700 transition-colors">
            {name}
          </h3>
          <p className="text-sm text-gris-500 leading-relaxed line-clamp-2 flex-1">
            {tagline}
          </p>

          <span
            className={cn(
              'inline-flex items-center gap-1.5 mt-1',
              'text-sm font-semibold text-verde-600',
              'transition-all duration-300',
              'group-hover:gap-2.5',
            )}
          >
            Ver ficha
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </TiltCard>
  )
}
