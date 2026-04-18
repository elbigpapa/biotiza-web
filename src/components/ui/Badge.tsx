/**
 * Badge.tsx — Etiquetas de línea de producto y certificaciones
 *
 * Uso:
 *   <Badge line="organicos" />
 *   <Badge line="zentia" size="md" />
 *   <Badge cert="omri" />
 *   <Badge cert="cofepris" size="sm" />
 *   <Badge custom label="Nuevo" className="bg-purple-500 text-white" />
 */

import { cn } from '@/lib/utils'
import type { ProductLine, ProductBrand, Certification } from '@/types'

// ─── Tipos ────────────────────────────────────────────────────────────────

export type BadgeSize = 'sm' | 'md'

export type CertBadge = 'cofepris' | 'omri' | 'hecho-en-mexico'

interface LineBadgeProps {
  line: ProductLine
  size?: BadgeSize
  showDot?: boolean
  className?: string
}

interface BrandBadgeProps {
  brand: ProductBrand
  size?: BadgeSize
  showDot?: boolean
  className?: string
}

interface CertBadgeProps {
  cert: CertBadge
  size?: BadgeSize
  className?: string
}

interface CustomBadgeProps {
  custom: true
  label: string
  size?: BadgeSize
  className?: string
}

export type BadgeProps = LineBadgeProps | BrandBadgeProps | CertBadgeProps | CustomBadgeProps

// ─── Configuración de líneas ──────────────────────────────────────────────

interface LineConfig {
  label: string
  dot: string           // color del punto indicador
  badge: string         // clases Tailwind del badge
}

const LINE_CONFIG: Record<ProductLine, LineConfig> = {
  organicos: {
    label: 'Orgánicos',
    dot:   'bg-verde-500',
    badge: 'bg-verde-100 text-verde-700 ring-1 ring-verde-200',
  },
  especialidades: {
    label: 'Especialidades',
    dot:   'bg-azul-600',
    badge: 'bg-azul-100 text-azul-700 ring-1 ring-azul-200',
  },
  bioestimulantes: {
    label: 'Bioestimulantes',
    dot:   'bg-naranja-500',
    badge: 'bg-naranja-100 text-naranja-600 ring-1 ring-naranja-200',
  },
  nutricion: {
    label: 'Nutrición Líquida',
    dot:   'bg-naranja-400',
    badge: 'bg-[#fff4eb] text-naranja-500 ring-1 ring-naranja-200',
  },
  zentia: {
    label: 'Línea Zentia',
    dot:   'bg-azul-500',
    badge: 'bg-azul-100 text-azul-600 ring-1 ring-azul-200',
  },
}

// ─── Configuración de marcas ──────────────────────────────────────────────

const BRAND_CONFIG: Record<ProductBrand, LineConfig> = {
  bioproductos: {
    label: 'Bioproductos',
    dot:   'bg-emerald-600',
    badge: 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200',
  },
  agrobionsa: {
    label: 'Agrobionsa',
    dot:   'bg-cyan-700',
    badge: 'bg-cyan-50 text-cyan-800 ring-1 ring-cyan-200',
  },
  veganic: {
    label: 'Veganic',
    dot:   'bg-violet-600',
    badge: 'bg-violet-50 text-violet-800 ring-1 ring-violet-200',
  },
}

// ─── Configuración de certificaciones ────────────────────────────────────

interface CertConfig {
  label: string
  badge: string
  icon?: string        // emoji o símbolo pequeño
}

const CERT_CONFIG: Record<CertBadge, CertConfig> = {
  cofepris: {
    label: 'COFEPRIS',
    badge: 'bg-gris-100 text-gris-700 ring-1 ring-gris-300',
    icon:  '🇲🇽',
  },
  omri: {
    label: 'OMRI Listed',
    badge: 'bg-verde-50 text-verde-800 ring-1 ring-verde-200',
    icon:  '✓',
  },
  'hecho-en-mexico': {
    label: 'Hecho en México',
    badge: 'bg-red-50 text-red-700 ring-1 ring-red-200',
    icon:  '🇲🇽',
  },
}

// ─── Estilos de tamaño ────────────────────────────────────────────────────

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[10px] font-semibold tracking-wide gap-1',
  md: 'px-2.5 py-1 text-xs font-semibold tracking-wide gap-1.5',
}

const dotSizeStyles: Record<BadgeSize, string> = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
}

const baseBadge = 'inline-flex items-center rounded-full uppercase leading-none'

// ─── Componente ───────────────────────────────────────────────────────────

export default function Badge(props: BadgeProps) {
  const size: BadgeSize = props.size ?? 'sm'

  // ── Badge de línea de producto ─────────────────────────────────────
  if ('line' in props) {
    const { line, showDot = true, className } = props
    const config = LINE_CONFIG[line]

    return (
      <span
        className={cn(baseBadge, sizeStyles[size], config.badge, className)}
        aria-label={`Línea ${config.label}`}
      >
        {showDot && (
          <span
            className={cn('rounded-full shrink-0', config.dot, dotSizeStyles[size])}
            aria-hidden="true"
          />
        )}
        {config.label}
      </span>
    )
  }

  // ── Badge de marca ─────────────────────────────────────────────────
  if ('brand' in props) {
    const { brand, showDot = true, className } = props
    const config = BRAND_CONFIG[brand]

    return (
      <span
        className={cn(baseBadge, sizeStyles[size], config.badge, className)}
        aria-label={`Marca ${config.label}`}
      >
        {showDot && (
          <span
            className={cn('rounded-full shrink-0', config.dot, dotSizeStyles[size])}
            aria-hidden="true"
          />
        )}
        {config.label}
      </span>
    )
  }

  // ── Badge de certificación ─────────────────────────────────────────
  if ('cert' in props) {
    const { cert, className } = props
    const config = CERT_CONFIG[cert]

    return (
      <span
        className={cn(baseBadge, sizeStyles[size], config.badge, className)}
        aria-label={`Certificación: ${config.label}`}
      >
        {config.icon && (
          <span className="not-italic" aria-hidden="true">
            {config.icon}
          </span>
        )}
        {config.label}
      </span>
    )
  }

  // ── Badge personalizado ────────────────────────────────────────────
  if ('custom' in props) {
    const { label, className } = props
    return (
      <span className={cn(baseBadge, sizeStyles[size], className)}>
        {label}
      </span>
    )
  }

  return null
}

// ─── Exports de conveniencia ──────────────────────────────────────────────

/** Grupo de certificaciones de un producto */
export function CertBadgeGroup({
  certs,
  size = 'sm',
  className,
}: {
  certs: Certification[]
  size?: BadgeSize
  className?: string
}) {
  const certMap: Record<string, CertBadge> = {
    COFEPRIS: 'cofepris',
    OMRI: 'omri',
    'OMRI Listed': 'omri',
    'Hecho en México': 'hecho-en-mexico',
  }

  const validCerts = certs
    .map((c) => certMap[c])
    .filter(Boolean) as CertBadge[]

  if (!validCerts.length) return null

  return (
    <div className={cn('flex flex-wrap gap-1', className)}>
      {validCerts.map((cert) => (
        <Badge key={cert} cert={cert} size={size} />
      ))}
    </div>
  )
}

/** Mapa de colores de línea para uso en código (borders, fills, etc.) */
export const LINE_COLORS: Record<ProductLine, { bg: string; text: string; hex: string }> = {
  organicos:       { bg: 'bg-verde-500',   text: 'text-verde-500',   hex: '#22b573' },
  especialidades:  { bg: 'bg-azul-600',    text: 'text-azul-600',    hex: '#0e6e99' },
  bioestimulantes: { bg: 'bg-naranja-500', text: 'text-naranja-500', hex: '#e8690f' },
  nutricion:       { bg: 'bg-naranja-400', text: 'text-naranja-400', hex: '#f28a3d' },
  zentia:          { bg: 'bg-azul-500',    text: 'text-azul-500',    hex: '#1189bf' },
}
