/**
 * CropCard.tsx — Tarjeta de cultivo con overlay hover
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
        'shadow-card hover:shadow-[0_8px_28px_rgba(34,181,115,0.2)]',
        'transition-all duration-300 hover:-translate-y-1',
        className,
      )}
      aria-label={`Ver programa de nutrición para ${name}`}
    >
      {/* Emoji del cultivo */}
      <span
        className="text-5xl sm:text-6xl select-none transition-transform duration-300 group-hover:scale-90"
        aria-hidden="true"
      >
        {emoji}
      </span>
      <span className="mt-2 text-sm font-semibold text-white drop-shadow-sm">
        {name}
      </span>

      {/* Overlay en hover */}
      <div
        className={cn(
          'absolute inset-0 flex flex-col items-center justify-center gap-2',
          'bg-verde-800/90 backdrop-blur-sm',
          'opacity-0 group-hover:opacity-100',
          'transition-opacity duration-300',
        )}
      >
        <span className="text-sm font-semibold text-white">Ver programa</span>
        <ArrowRight size={18} className="text-verde-300" />
      </div>
    </Link>
  )
}
