/**
 * CompositionTable.tsx — Tabla de composición garantizada
 *
 * Fondo gris-900, tipografía JetBrains Mono, valores en verde-400.
 *
 * Uso:
 *   <CompositionTable items={product.composition} productName={product.name} />
 */

import { cn } from '@/lib/utils'
import type { CompositionItem } from '@/types'

interface CompositionTableProps {
  items: CompositionItem[]
  productName?: string
  className?: string
  /** Variante compacta para cards */
  compact?: boolean
}

export default function CompositionTable({
  items,
  productName,
  compact = false,
  className,
}: CompositionTableProps) {
  if (!items.length) return null

  return (
    <div
      className={cn(
        'rounded-xl bg-gris-900 font-mono',
        compact ? 'p-4' : 'p-5 sm:p-6',
        className,
      )}
      aria-label={productName ? `Composición garantizada de ${productName}` : 'Composición garantizada'}
    >
      {/* Header */}
      <div className={cn('mb-4 flex items-center justify-between', compact && 'mb-3')}>
        <span
          className={cn(
            'font-mono font-bold uppercase tracking-widest text-verde-400',
            compact ? 'text-[10px]' : 'text-xs',
          )}
        >
          {/* Símbolo de terminal */}
          <span className="mr-1.5 text-gris-600">$</span>
          Composición garantizada
        </span>
        <span className="rounded bg-verde-900/40 px-2 py-0.5 text-[10px] text-verde-500">
          v1.0
        </span>
      </div>

      {/* Separador */}
      <div className="mb-4 h-px bg-gris-700" />

      {/* Filas de composición */}
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li
            key={i}
            className={cn(
              'flex items-baseline justify-between gap-4',
              'rounded-lg px-3 py-2',
              'bg-gris-800/50 hover:bg-gris-800 transition-colors',
            )}
          >
            {/* Ingrediente */}
            <span
              className={cn(
                'font-mono text-gris-300 leading-none',
                compact ? 'text-[11px]' : 'text-xs',
              )}
            >
              {/* Número de línea estilo code */}
              <span className="mr-2 select-none text-gris-600">
                {String(i + 1).padStart(2, '0')}
              </span>
              {item.ingredient}
            </span>

            {/* Valor + unidad */}
            <span className="shrink-0 flex items-baseline gap-1">
              <span
                className={cn(
                  'font-mono font-bold text-verde-400',
                  compact ? 'text-sm' : 'text-base',
                )}
              >
                {item.value.replace(/[^\d.,+×]/g, '') || item.value}
              </span>
              <span
                className={cn(
                  'font-mono text-gris-500',
                  compact ? 'text-[10px]' : 'text-xs',
                )}
              >
                {item.unit ?? extractUnit(item.value)}
              </span>
            </span>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="mt-4 border-t border-gris-700 pt-3 text-[10px] text-gris-600 font-mono">
        <span className="text-gris-700">// </span>
        Composición en base húmeda. Registrado ante COFEPRIS.
      </div>
    </div>
  )
}

// ─── Helper ───────────────────────────────────────────────────────────────

/** Extrae la unidad del string de valor si no viene separada */
function extractUnit(value: string): string {
  const match = value.match(/[a-zA-Z%/]+$/)
  return match ? match[0] : ''
}
