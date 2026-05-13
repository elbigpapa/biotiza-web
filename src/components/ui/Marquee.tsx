'use client'

/**
 * Marquee.tsx — Carousel infinito CSS-puro (sin JS lag)
 *
 * Duplica el contenido y anima translateX en loop. Pausa al hover.
 * Útil para logos de clientes, certificaciones, testimonios cortos.
 *
 * Respeta prefers-reduced-motion (pausa la animación).
 */

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MarqueeProps {
  children: ReactNode
  /** Duración de un ciclo completo en segundos (default 30) */
  duration?: number
  /** Direction left|right (default left) */
  direction?: 'left' | 'right'
  /** Pausar al hover (default true) */
  pauseOnHover?: boolean
  /** Vertical en lugar de horizontal (default false) */
  vertical?: boolean
  /** Padding lateral con fade gradient en los bordes */
  fade?: boolean
  className?: string
}

export default function Marquee({
  children,
  duration = 30,
  direction = 'left',
  pauseOnHover = true,
  vertical = false,
  fade = true,
  className,
}: MarqueeProps) {
  const animationName = vertical
    ? (direction === 'left' ? 'marquee-up' : 'marquee-down')
    : (direction === 'left' ? 'marquee-left' : 'marquee-right')

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden',
        fade && 'marquee-fade',
        vertical ? 'flex-col' : 'flex',
        className,
      )}
    >
      <div
        className={cn(
          'flex shrink-0 gap-8',
          vertical ? 'flex-col' : 'flex-row',
          pauseOnHover && 'group-hover:[animation-play-state:paused] hover:[animation-play-state:paused]',
        )}
        style={{
          animation: `${animationName} ${duration}s linear infinite`,
        }}
      >
        {children}
        {children}
      </div>

      <style jsx>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-50% - 1rem)); }
        }
        @keyframes marquee-right {
          from { transform: translateX(calc(-50% - 1rem)); }
          to   { transform: translateX(0); }
        }
        @keyframes marquee-up {
          from { transform: translateY(0); }
          to   { transform: translateY(calc(-50% - 1rem)); }
        }
        @keyframes marquee-down {
          from { transform: translateY(calc(-50% - 1rem)); }
          to   { transform: translateY(0); }
        }
        .marquee-fade {
          -webkit-mask-image: linear-gradient(to right, transparent, white 10%, white 90%, transparent);
                  mask-image: linear-gradient(to right, transparent, white 10%, white 90%, transparent);
        }
        @media (prefers-reduced-motion: reduce) {
          div[style*="animation"] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}
