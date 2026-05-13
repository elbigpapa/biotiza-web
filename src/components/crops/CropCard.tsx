'use client'

/**
 * CropCard.tsx — Tarjeta de cultivo premium con foto HD + tilt 3D
 *
 * Cuando hay foto HD para el cultivo (Unsplash curado), la usa como
 * background. Aplica overlay verde con gradiente al hacer hover para
 * mostrar el CTA. Si no hay foto, fallback al gradient + emoji.
 */

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getCropImage } from '@/data/crop-images'
import TiltCard from '@/components/ui/TiltCard'

export interface CropCardData {
  slug: string
  name: string
  emoji: string
  color: string   // clases Tailwind para el gradiente de fondo (fallback)
}

interface CropCardProps {
  crop: CropCardData
  className?: string
}

export default function CropCard({ crop, className }: CropCardProps) {
  const { slug, name, emoji, color } = crop
  const photo = getCropImage(slug)

  return (
    <TiltCard intensity={6} glare className={className}>
      <Link
        href={`/cultivos/${slug}`}
        className={cn(
          'group relative flex flex-col items-center justify-center',
          'rounded-2xl overflow-hidden aspect-square',
          'bg-gradient-to-br', color,
          'shadow-[0_8px_30px_rgba(15,23,42,0.12)]',
          'hover:shadow-[0_20px_50px_rgba(15,23,42,0.25)]',
          'transition-shadow duration-500',
          'block',
        )}
        aria-label={`Ver programa de nutrición para ${name}`}
      >
        {/* Foto HD de fondo si está disponible */}
        {photo && (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover scale-110 transition-transform duration-[1.2s] group-hover:scale-125"
          />
        )}

        {/* Gradient overlay desde abajo (legibilidad del nombre) */}
        <div
          className="absolute inset-0"
          style={{
            background: photo
              ? 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.1) 50%, rgba(13, 92, 74, 0.92) 100%)'
              : undefined,
          }}
          aria-hidden="true"
        />

        {/* Decorative circles (solo en fallback sin foto) */}
        {!photo && (
          <>
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" aria-hidden="true" />
            <div className="absolute left-4 -bottom-8 h-20 w-20 rounded-full bg-white/5" aria-hidden="true" />
          </>
        )}

        {/* Contenido base: emoji + nombre */}
        <div className="relative z-10 flex flex-col items-center justify-end h-full w-full pb-5">
          <span
            className={cn(
              'select-none drop-shadow-lg transition-all duration-500',
              photo ? 'text-4xl mb-2' : 'text-5xl sm:text-6xl mb-2.5',
              'group-hover:scale-90 group-hover:opacity-0',
            )}
            aria-hidden="true"
          >
            {emoji}
          </span>
          <span className="text-sm font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] tracking-wide transition-all duration-500 group-hover:-translate-y-3 group-hover:opacity-0">
            {name}
          </span>
        </div>

        {/* Overlay en hover — premium glass effect verde */}
        <div
          className={cn(
            'absolute inset-0 flex flex-col items-center justify-center gap-3 z-20',
            'bg-gradient-to-br from-verde-900/90 via-verde-800/85 to-verde-950/95 backdrop-blur-sm',
            'opacity-0 group-hover:opacity-100',
            'transition-all duration-500',
          )}
        >
          <span className="text-4xl mb-1 drop-shadow-md" aria-hidden="true">{emoji}</span>
          <span className="text-base font-bold text-white tracking-wide">{name}</span>
          <span className="flex items-center gap-1.5 rounded-full bg-verde-500/20 ring-1 ring-verde-400/40 px-3 py-1 text-[10px] font-bold text-verde-200 uppercase tracking-[0.15em]">
            Ver programa
            <ArrowRight size={11} />
          </span>
        </div>
      </Link>
    </TiltCard>
  )
}
