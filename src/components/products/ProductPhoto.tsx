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
  zentia:          'from-azul-100/80 via-azul-50/40 to-white',
}

const LINE_GLOW: Record<ProductLine, string> = {
  organicos:       'bg-verde-500/25',
  especialidades:  'bg-azul-600/25',
  bioestimulantes: 'bg-naranja-500/25',
  nutricion:       'bg-naranja-400/25',
  zentia:          'bg-azul-500/25',
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
