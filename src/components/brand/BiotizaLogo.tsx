/**
 * BiotizaLogo.tsx — Marca registrada Biotiza
 *
 * Componente reusable inline SVG con múltiples variantes:
 *   - icon         → solo el isotipo (símbolo)
 *   - wordmark     → solo "Biotiza" en tipografía
 *   - lockup-h     → icono + texto en línea (default header)
 *   - lockup-v     → icono encima, texto debajo (favicon, OG, redes)
 *
 * Y modos de color:
 *   - color → full color (gradiente verde + cotiledones naranja)
 *   - mono  → verde plano (usa color verde-800 o el que pase via prop)
 *   - white → blanco (para fondos oscuros)
 *
 * El logo es SVG inline para tener control de color, animaciones y NO depender
 * de carga de imagen externa. Es la marca registrada de Biotiza.
 */

type Mode = 'color' | 'mono' | 'white'
type Variant = 'icon' | 'wordmark' | 'lockup-h' | 'lockup-v'

interface BiotizaLogoProps {
  variant?: Variant
  mode?: Mode
  className?: string
  /** Override del color en modo mono (default: currentColor) */
  monoColor?: string
  /** ID único para gradientes (evita conflictos cuando hay múltiples logos en una página) */
  gradientId?: string
  /** Aria label custom */
  ariaLabel?: string
}

// ─── Subcomponente: el isotipo (símbolo) ────────────────────────────────────

interface IconProps {
  mode: Mode
  monoColor?: string
  gradientPrefix: string
}

function BiotizaIcon({ mode, monoColor, gradientPrefix }: IconProps) {
  const idStem    = `${gradientPrefix}-stem`
  const idField   = `${gradientPrefix}-field`
  const idPetal   = `${gradientPrefix}-petal`

  // Color de relleno para versión monocromo
  const monoFill  = monoColor ?? 'currentColor'
  // Color de los "huecos" (slits y valle)
  const slitFill  = mode === 'white' ? 'transparent' : '#ffffff'

  // Fills para cada parte según modo
  const stemFill  = mode === 'color' ? `url(#${idStem})`  : monoFill
  const fieldFill = mode === 'color' ? `url(#${idField})` : monoFill
  const petalFill = mode === 'color' ? `url(#${idPetal})` : monoFill

  return (
    <>
      {mode === 'color' && (
        <defs>
          <linearGradient id={idStem} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#0d5c4a" />
            <stop offset="100%" stopColor="#0a4a3b" />
          </linearGradient>
          <linearGradient id={idField} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e7a5e" />
            <stop offset="100%" stopColor="#0d5c4a" />
          </linearGradient>
          <linearGradient id={idPetal} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff7a1a" />
            <stop offset="100%" stopColor="#e8690f" />
          </linearGradient>
        </defs>
      )}

      {/* Surcos / campos cultivados */}
      <g fill={fieldFill}>
        <path d="M 12 178 Q 38 120 100 116 L 100 134 Q 50 138 30 178 Z" />
        <path d="M 22 158 Q 50 108 100 102 L 100 118 Q 62 122 42 158 Z" opacity={mode === 'color' ? '0.95' : '1'} />
        <path d="M 36 138 Q 65 96 100 90 L 100 104 Q 75 108 56 138 Z"   opacity={mode === 'color' ? '0.9'  : '1'} />
        <path d="M 188 178 Q 162 120 100 116 L 100 134 Q 150 138 170 178 Z" />
        <path d="M 178 158 Q 150 108 100 102 L 100 118 Q 138 122 158 158 Z" opacity={mode === 'color' ? '0.95' : '1'} />
        <path d="M 164 138 Q 135 96 100 90 L 100 104 Q 125 108 144 138 Z"   opacity={mode === 'color' ? '0.9'  : '1'} />
      </g>

      {/* Tallo central */}
      <rect x="93" y="62" width="14" height="58" rx="3" fill={stemFill} />

      {/* Cotiledones (corazón invertido) */}
      <path d="M 100 40 Q 98 22 78 18 Q 54 18 50 38 Q 50 56 70 64 Q 88 68 100 60 Z" fill={petalFill} />
      <path d="M 100 40 Q 102 22 122 18 Q 146 18 150 38 Q 150 56 130 64 Q 112 68 100 60 Z" fill={petalFill} />

      {/* Slits y valle */}
      <g fill={slitFill}>
        <ellipse cx="74" cy="42" rx="14" ry="4" transform="rotate(-18 74 42)" />
        <ellipse cx="126" cy="42" rx="14" ry="4" transform="rotate(18 126 42)" />
        <path d="M 92 56 Q 100 64 108 56 L 108 60 Q 100 70 92 60 Z" />
      </g>
    </>
  )
}

// ─── Subcomponente: wordmark "Biotiza" ──────────────────────────────────────

interface WordmarkProps {
  mode: Mode
  monoColor?: string
  /** Posición/tamaño del texto dentro del viewBox del padre */
  x?: number
  y?: number
  fontSize?: number
  anchor?: 'start' | 'middle' | 'end'
}

function BiotizaWordmark({
  mode,
  monoColor,
  x = 0,
  y = 50,
  fontSize = 48,
  anchor = 'start',
}: WordmarkProps) {
  const fill =
    mode === 'white' ? '#ffffff' :
    mode === 'mono'  ? (monoColor ?? 'currentColor') :
    '#0d5c4a' // color full = verde profundo del logo oficial

  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily='var(--font-dm-sans), "DM Sans", -apple-system, system-ui, sans-serif'
      fontWeight={700}
      fontSize={fontSize}
      fill={fill}
      letterSpacing="-0.025em"
    >
      Biotiza
    </text>
  )
}

// ─── Componente principal ──────────────────────────────────────────────────

export default function BiotizaLogo({
  variant = 'lockup-h',
  mode = 'color',
  className = '',
  monoColor,
  gradientId,
  ariaLabel,
}: BiotizaLogoProps) {
  // ID único para gradientes
  const gradPrefix = gradientId ?? `bz-${variant}-${mode}`

  const label =
    ariaLabel ??
    (variant === 'icon'
      ? 'Biotiza isotipo'
      : variant === 'wordmark'
      ? 'Biotiza'
      : 'Biotiza — Biosoluciones Agrícolas')

  // ── Variante: solo icono ──
  if (variant === 'icon') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        className={className}
        role="img"
        aria-label={label}
        fill="none"
      >
        <BiotizaIcon mode={mode} monoColor={monoColor} gradientPrefix={gradPrefix} />
      </svg>
    )
  }

  // ── Variante: solo wordmark ──
  if (variant === 'wordmark') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 240 64"
        className={className}
        role="img"
        aria-label={label}
        fill="none"
      >
        <BiotizaWordmark mode={mode} monoColor={monoColor} x={0} y={48} fontSize={56} />
      </svg>
    )
  }

  // ── Variante: lockup horizontal (icono + texto al lado) ──
  if (variant === 'lockup-h') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 540 200"
        className={className}
        role="img"
        aria-label={label}
        fill="none"
      >
        <g transform="translate(0, 0)">
          <BiotizaIcon mode={mode} monoColor={monoColor} gradientPrefix={gradPrefix} />
        </g>
        <g transform="translate(220, 0)">
          <BiotizaWordmark mode={mode} monoColor={monoColor} x={0} y={130} fontSize={120} />
        </g>
      </svg>
    )
  }

  // ── Variante: lockup vertical (icono encima, texto debajo) ──
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 280"
      className={className}
      role="img"
      aria-label={label}
      fill="none"
    >
      <g transform="translate(20, 0)">
        <BiotizaIcon mode={mode} monoColor={monoColor} gradientPrefix={gradPrefix} />
      </g>
      <BiotizaWordmark mode={mode} monoColor={monoColor} x={120} y={258} fontSize={48} anchor="middle" />
    </svg>
  )
}
