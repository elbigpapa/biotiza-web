/**
 * ProductPhoto.tsx — Visualización unificada de fotos de envase de producto
 *
 * Renderiza la foto HD (transparente) del producto sobre un fondo
 * con gradiente de la línea, con efectos de profundidad (glow, sombra
 * inferior simulando que la botella reposa sobre una superficie).
 *
 * Si no hay foto disponible para el slug, devuelve null (el padre
 * mantiene el fallback con icono).
 */

import Image from 'next/image'
import { getProductImage } from '@/data/product-images'
import type { ProductLine } from '@/types'

interface ProductPhotoProps {
  slug: string
  line: ProductLine
  /** Variante de tamaño/relación de aspecto */
  variant?: 'hero' | 'card' | 'thumb'
  /** Si true, renderiza el círculo decorativo y el glow */
  showGlow?: boolean
  /** Prioridad de carga (para LCP en heroes) */
  priority?: boolean
  className?: string
}

const LINE_BG_GRADIENT: Record<ProductLine, string> = {
  organicos:       'from-verde-100 via-verde-50/40 to-white',
  especialidades:  'from-azul-100/80 via-azul-50/40 to-white',
  bioestimulantes: 'from-naranja-100/80 via-naranja-50/40 to-white',
  nutricion:       'from-naranja-100/60 via-yellow-50/30 to-white',
  bioproteccion:   'from-azul-100/80 via-azul-50/40 to-white',
}

const LINE_GLOW: Record<ProductLine, string> = {
  organicos:       'bg-verde-500/25',
  especialidades:  'bg-azul-600/25',
  bioestimulantes: 'bg-naranja-500/25',
  nutricion:       'bg-naranja-400/25',
  bioproteccion:   'bg-azul-500/25',
}

// ─── Fallback de marca (producto sin foto de envase disponible) ───────────
// En vez de un emoji suelto que hace ver el catálogo "incompleto", se
// renderiza una placa premium con silueta de envase + nombre + línea.
const LINE_ACCENT: Record<ProductLine, { from: string; to: string; label: string }> = {
  organicos:       { from: '#1a8f5a', to: '#22b573', label: 'Orgánicos'        },
  especialidades:  { from: '#0a5577', to: '#0e6e99', label: 'Especialidades'   },
  bioestimulantes: { from: '#c2560c', to: '#e8690f', label: 'Bioestimulantes'  },
  nutricion:       { from: '#d97520', to: '#f28a3d', label: 'Nutrición Líquida'},
  bioproteccion:   { from: '#0c6f9c', to: '#1189bf', label: 'Bioprotección'    },
}

export function ProductPhotoFallback({
  name,
  line,
  variant = 'card',
  className = '',
}: {
  name: string
  line: ProductLine
  variant?: 'hero' | 'card' | 'thumb'
  className?: string
}) {
  const accent = LINE_ACCENT[line]
  const bottleH =
    variant === 'hero' ? 'h-28 w-28' : variant === 'thumb' ? 'h-12 w-12' : 'h-16 w-16'
  const nameSize =
    variant === 'hero' ? 'text-2xl' : variant === 'thumb' ? 'text-xs' : 'text-base'

  return (
    <div
      className={`relative w-full h-full overflow-hidden flex flex-col items-center justify-center text-center px-4 ${className}`}
      style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
    >
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/12" aria-hidden="true" />
      <div className="absolute -left-6 -bottom-8 h-24 w-24 rounded-full bg-white/8" aria-hidden="true" />

      {/* Silueta de envase Biotiza */}
      <svg
        viewBox="0 0 48 64"
        className={`${bottleH} text-white/85 drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)]`}
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M20 3h8v6l5 4c2 1.6 3 4 3 6.5V56a5 5 0 0 1-5 5H17a5 5 0 0 1-5-5V25.5c0-2.5 1-4.9 3-6.5l5-4V3Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path d="M18 3h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M13 38h22" stroke="currentColor" strokeWidth="2.5" />
        {/* Hoja Biotiza dentro de la etiqueta */}
        <path
          d="M24 43c-4 0-7 3-7 7 4 0 7-3 7-7Zm0 0c4 0 7 3 7 7-4 0-7-3-7-7Z"
          fill="currentColor"
          opacity="0.9"
        />
      </svg>

      {variant !== 'thumb' && (
        <>
          <p className={`mt-4 font-serif ${nameSize} leading-tight text-white`}>{name}</p>
          <span className="mt-2 inline-flex items-center rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
            {accent.label}
          </span>
        </>
      )}
    </div>
  )
}

export default function ProductPhoto({
  slug,
  line,
  variant = 'card',
  showGlow = true,
  priority = false,
  className = '',
}: ProductPhotoProps) {
  const photo = getProductImage(slug)
  if (!photo) return null

  const sizes =
    variant === 'hero'
      ? '(min-width: 1024px) 420px, (min-width: 640px) 340px, 100vw'
      : variant === 'card'
        ? '(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw'
        : '120px'

  const objectSize =
    variant === 'hero' ? 'max-h-[88%] max-w-[72%]'
    : variant === 'card' ? 'max-h-[80%] max-w-[70%]'
    : 'max-h-[78%] max-w-[68%]'

  return (
    <div className={`relative w-full h-full overflow-hidden bg-gradient-to-br ${LINE_BG_GRADIENT[line]} ${className}`}>
      {/* Decoración: círculos + glow */}
      {showGlow && (
        <>
          <div
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[120%] w-[120%] rounded-full blur-3xl ${LINE_GLOW[line]}`}
            aria-hidden="true"
          />
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/40 mix-blend-overlay" aria-hidden="true" />
          <div className="absolute -left-6 -bottom-6 h-24 w-24 rounded-full bg-white/30 mix-blend-overlay" aria-hidden="true" />
        </>
      )}

      {/* Foto del envase */}
      <div className={`absolute inset-0 flex items-end justify-center pb-3`}>
        <div className={`relative w-full h-full flex items-center justify-center`}>
          <Image
            src={photo.src}
            alt={photo.alt}
            width={800}
            height={1200}
            sizes={sizes}
            priority={priority}
            className={`${objectSize} h-auto w-auto object-contain drop-shadow-[0_24px_40px_rgba(15,23,42,0.20)] transition-transform duration-700 ease-out hover:scale-[1.03]`}
            style={{ filter: 'drop-shadow(0 6px 4px rgba(15,23,42,0.15))' }}
          />
        </div>
      </div>

      {/* Reflexión sutil bajo la botella */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[8%] bg-gradient-to-t from-black/12 via-black/4 to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </div>
  )
}
