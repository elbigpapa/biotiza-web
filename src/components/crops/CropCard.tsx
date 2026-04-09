/**
 * CropCard.tsx — Tarjeta de cultivo premium con overlay hover
 */

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CropCardData {
  slug: string
  name: string
  emoji: string
  color: string   // clases Tailwind para el gradiente de fondo
}

interface CropCardProps {
  crop: CropCardData
  className?: string
}

export default function CropCard({ crop, className }: CropCardProps) {
  const { slug, name, emoji, color } = crop

  return (
    <Link
      href={`/cultivos/${slug}`}
      className={cn(
        'group relative flex flex-col items-center justify-center',
        'rounded-2xl overflow-hidden aspect-square',
        'bg-gradient-to-br', color,
        'shadow-[0_4px_20px_rgba(15,23,42,0.1)]',
        'hover:shadow-[0_12px_40px_rgba(15,23,42,0.18)]',
        'transition-all duration-500 hover:-translate-y-1',
        className,
      )}
      aria-label={`Ver programa de nutrición para ${name}`}
    >
      {/* Decorative circles */}
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" aria-hidden="true" />
      <div className="absolute left-4 -bottom-8 h-20 w-20 rounded-full bg-white/5" aria-hidden="true" />

      {/* Emoji del cultivo */}
      <span
        className="text-5xl sm:text-6xl select-none transition-all duration-500 group-hover:scale-90 group-hover:opacity-30 drop-shadow-md"
        aria-hidden="true"
      >
        {emoji}
      </span>
      <span className="mt-2.5 text-sm font-semibold text-white drop-shadow-md tracking-wide transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-2">
        {name}
      </span>

      {/* Overlay en hover — premium glass effect */}
      <div
        className={cn(
          'absolute inset-0 flex flex-col items-center justify-center gap-3',
          'bg-gradient-to-br from-gris-900/85 to-gris-900/95 backdrop-blur-sm',
          'opacity-0 group-hover:opacity-100',
          'transition-all duration-500',
        )}
      >
        <span className="text-3xl mb-1" aria-hidden="true">{emoji}</span>
        <span className="text-base font-semibold text-white">{name}</span>
        <span className="flex items-center gap-1.5 text-xs font-medium text-verde-400 uppercase tracking-wider">
          Ver programa
          <ArrowRight size={12} />
        </span>
      </div>
    </Link>
  )
}
