/**
 * WaveSeparator.tsx — SVG wave separator between sections
 * Premium organic transitions with smooth curves
 */

// Mapa de colores de sección a hex
const COLORS: Record<string, string> = {
  'white':       '#ffffff',
  'verde-50':    '#f0fdf6',
  'verde-800':   '#115e43',
  'verde-900':   '#0d4d37',
  'verde-950':   '#082e21',
  'gris-50':     '#f8fafc',
  'gris-800':    '#1e293b',
  'gris-900':    '#0f172a',
  'gris-950':    '#020617',
  'dark-green':  '#082e21',
}

type ColorKey = keyof typeof COLORS

interface WaveSeparatorProps {
  from: ColorKey
  to: ColorKey
  flip?: boolean
  variant?: 'gentle' | 'steep' | 'double'
  className?: string
}

const PATHS: Record<NonNullable<WaveSeparatorProps['variant']>, string[]> = {
  gentle: [
    'M0,30 C240,60 480,10 720,35 C960,60 1200,15 1440,40 L1440,80 L0,80 Z',
  ],
  steep: [
    'M0,15 C180,65 420,5 660,45 C900,75 1140,10 1440,35 L1440,80 L0,80 Z',
  ],
  double: [
    'M0,25 C200,55 400,10 600,30 C800,55 1000,15 1200,38 C1350,52 1400,30 1440,35 L1440,80 L0,80 Z',
    'M0,45 C200,72 450,22 700,52 C900,74 1150,28 1440,50 L1440,80 L0,80 Z',
  ],
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
  const paths     = PATHS[variant]

  return (
    <div
      className={`relative w-full overflow-hidden leading-none -my-px ${className}`}
      style={{ backgroundColor: toColor }}
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
        {/* Background = "from" color */}
        <rect width="1440" height="80" fill={fromColor} />

        {/* Wave paths drawn with "to" color */}
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill={toColor}
            opacity={i === 0 && paths.length > 1 ? 0.5 : 1}
          />
        ))}
      </svg>
    </div>
  )
}
