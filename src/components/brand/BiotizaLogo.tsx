/**
 * BiotizaLogo.tsx — Marca registrada oficial Biotiza
 *
 * Renderiza las imágenes oficiales del manual de marca, sin modificarlas.
 * Las imágenes provienen del archivo .ai registrado y se extrajeron al
 * proyecto vía `scripts/extract-logo-pages.mjs`.
 *
 * Cada combinación de variant + mode corresponde a una página específica
 * del PDF oficial — el mapping se hace explícito abajo. Si no estás seguro
 * qué variante usar, prefiere `lockup-h-color` sobre fondos claros y
 * `lockup-h-on-green` sobre fondos oscuros.
 */

import Image from 'next/image'
import { cn } from '@/lib/utils'

type Variant = 'icon' | 'wordmark' | 'lockup-h' | 'lockup-v'
type Mode = 'color' | 'mono-flat' | 'mono-dark' | 'mono-light' | 'on-green' | 'orange' | 'gradient'

interface BiotizaLogoProps {
  variant?: Variant
  mode?: Mode
  className?: string
  /** Prioridad de carga (true para logos above-the-fold como Header) */
  priority?: boolean
  /** Alt text personalizado (default: "Biotiza — Biosoluciones Agrícolas") */
  alt?: string
}

// ─── Mapeo variant + mode → archivo oficial ─────────────────────────────────
// Si una combinación no existe en el manual oficial, cae al equivalente más cercano.

const SOURCE_MAP: Record<string, { src: string; width: number; height: number }> = {
  // Lockup vertical
  'lockup-v|color':       { src: '/images/logos/biotiza-lockup-v-color.png',       width: 240, height: 280 },
  'lockup-v|mono-flat':   { src: '/images/logos/biotiza-lockup-v-mono-flat.png',   width: 240, height: 280 },
  'lockup-v|mono-dark':   { src: '/images/logos/biotiza-lockup-v-mono-dark.png',   width: 240, height: 280 },
  'lockup-v|mono-light':  { src: '/images/logos/biotiza-lockup-v-mono-light.png',  width: 240, height: 280 },
  'lockup-v|on-green':    { src: '/images/logos/biotiza-lockup-v-on-green.png',    width: 240, height: 280 },

  // Lockup horizontal (más usado en Header/Footer)
  'lockup-h|color':       { src: '/images/logos/biotiza-lockup-h-color.png',       width: 540, height: 200 },
  'lockup-h|mono-flat':   { src: '/images/logos/biotiza-lockup-h-mono-flat.png',   width: 540, height: 200 },
  'lockup-h|mono-dark':   { src: '/images/logos/biotiza-lockup-h-mono-dark.png',   width: 540, height: 200 },
  'lockup-h|mono-light':  { src: '/images/logos/biotiza-lockup-h-mono-light.png',  width: 540, height: 200 },
  'lockup-h|on-green':    { src: '/images/logos/biotiza-lockup-h-on-green.png',    width: 540, height: 200 },

  // Isotipo solo
  'icon|color':           { src: '/images/logos/biotiza-icon-color.png',           width: 200, height: 200 },
  'icon|mono-flat':       { src: '/images/logos/biotiza-icon-mono-flat.png',       width: 200, height: 200 },
  'icon|mono-dark':       { src: '/images/logos/biotiza-icon-mono-dark.png',       width: 200, height: 200 },
  'icon|mono-light':      { src: '/images/logos/biotiza-icon-mono-light.png',      width: 200, height: 200 },
  'icon|on-green':        { src: '/images/logos/biotiza-icon-on-green.png',        width: 200, height: 200 },

  // Wordmark solo
  'wordmark|gradient':    { src: '/images/logos/biotiza-wordmark-gradient.png',    width: 480, height: 200 },
  'wordmark|mono-dark':   { src: '/images/logos/biotiza-wordmark-dark.png',        width: 480, height: 200 },
  'wordmark|mono-flat':   { src: '/images/logos/biotiza-wordmark-flat.png',        width: 480, height: 200 },
  'wordmark|orange':      { src: '/images/logos/biotiza-wordmark-orange.png',      width: 480, height: 200 },
  'wordmark|on-green':    { src: '/images/logos/biotiza-wordmark-on-green.png',    width: 480, height: 200 },
}

// Alias para retro-compatibilidad con código que usaba mode='white'
const MODE_ALIAS: Record<string, Mode> = {
  'white': 'on-green',  // para fondos oscuros usar versión on-green con cotiledones naranja
  'mono':  'mono-dark',
}

function resolveSource(variant: Variant, mode: Mode) {
  const realMode = (MODE_ALIAS[mode as unknown as string] ?? mode) as Mode
  const key = `${variant}|${realMode}`
  return SOURCE_MAP[key] ?? SOURCE_MAP[`${variant}|color`] ?? SOURCE_MAP['lockup-h|color']
}

// ─── Componente ────────────────────────────────────────────────────────────

export default function BiotizaLogo({
  variant = 'lockup-h',
  mode    = 'color',
  className = '',
  priority = false,
  alt = 'Biotiza — Biosoluciones Agrícolas',
}: BiotizaLogoProps) {
  const { src, width, height } = resolveSource(variant, mode)

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={cn('select-none', className)}
      draggable={false}
    />
  )
}
