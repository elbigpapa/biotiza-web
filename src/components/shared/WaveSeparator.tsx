/**
 * WaveSeparator.tsx — Separador orgánico SVG entre secciones
 *
 * Uso:
 *   <WaveSeparator from="white" to="verde-50" />
 *   <WaveSeparator from="verde-50" to="white" flip />
 *   <WaveSeparator from="white" to="gris-900" variant="double" />
 */

// Mapa de colores de sección a hex
const COLORS: Record<string, string> = {
  'white':      '#ffffff',
  'verde-50':   '#f0fdf6',
  'verde-800':  '#115e43',
  'verde-900':  '#0d4d37',
  'gris-50':    '#f8fafc',
  'gris-900':   '#0f172a',
  'gris-800':   '#1e293b',
}

type ColorKey = keyof typeof COLORS

interface WaveSeparatorProps {
  /** Color de la sección superior */
  from: ColorKey
  /** Color de la sección inferior (fill del SVG) */
  to: ColorKey
  /** Voltea la ola horizontalmente para variedad */
  flip?: boolean
  /** Variante de la ola */
  variant?: 'gentle' | 'steep' | 'double'
  className?: string
}

const PATHS: Record<NonNullable<WaveSeparatorProps['variant']>, string> = {
  gentle: 'M0,0 C360,64 1080,0 1440,48 L1440,80 L0,80 Z',
  steep:  'M0,0 C200,80 500,0 720,50 C940,100 1240,10 1440,40 L1440,80 L0,80 Z',
  double: 'M0,20 C240,60 480,0 720,35 C960,70 1200,10 1440,30 L1440,80 L0,80 Z',
}

export default function WaveSeparator({
  from,
  to,
  flip = false,
  variant = 'gentle',
  className = '',
}: WaveSeparatorProps) {
  const fromColor = COLORS[from] ?? '#ffffff'
  const toColor   = COLORS[to]   ?? '#ffffff'
  const path      = PATHS[variant]

  return (
    <div
      className={`relative w-full overflow-hidden leading-none ${className}`}
      style={{ backgroundColor: fromColor }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="block w-full"
        style={{
          height: '60px',
          transform: flip ? 'scaleX(-1)' : undefined,
          display: 'block',
        }}
      >
        <path d={path} fill={toColor} />
      </svg>
    </div>
  )
}
