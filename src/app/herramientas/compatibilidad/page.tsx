'use client'

/**
 * app/herramientas/compatibilidad/page.tsx — Verificador de Compatibilidad
 * Selecciona hasta 5 productos y ve si se pueden mezclar en tanque.
 */

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ChevronLeft, Search, X, CheckSquare } from 'lucide-react'
import Container from '@/components/ui/Container'
import { PRODUCTS } from '@/data/products'
import { PRODUCT_LINES } from '@/data/constants'
import { getCompatibility, getCompatibilityEntry } from '@/data/compatibility'
import type { CompatibilityStatus } from '@/types'

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_PRODUCTS = 5

const STATUS_CONFIG: Record<CompatibilityStatus, { label: string; emoji: string; cellBg: string; cellText: string; badgeBg: string }> = {
  compatible:   { label: 'Compatible',   emoji: '✅', cellBg: 'bg-verde-50',   cellText: 'text-verde-700',   badgeBg: 'bg-verde-100 text-verde-700'   },
  incompatible: { label: 'Incompatible', emoji: '❌', cellBg: 'bg-red-50',     cellText: 'text-red-700',     badgeBg: 'bg-red-100 text-red-700'       },
  conditional:  { label: 'Condicional',  emoji: '⚠️', cellBg: 'bg-naranja-50', cellText: 'text-naranja-700', badgeBg: 'bg-naranja-100 text-naranja-600' },
  unknown:      { label: 'Sin datos',    emoji: '❓', cellBg: 'bg-gris-50',    cellText: 'text-gris-400',    badgeBg: 'bg-gris-100 text-gris-500'     },
}

const LINE_COLORS: Record<string, { dot: string; badge: string }> = {
  organicos:       { dot: 'bg-verde-500',   badge: 'bg-verde-50 text-verde-700'     },
  especialidades:  { dot: 'bg-azul-600',    badge: 'bg-azul-50 text-azul-700'       },
  bioestimulantes: { dot: 'bg-naranja-500', badge: 'bg-naranja-50 text-naranja-600' },
  nutricion:       { dot: 'bg-naranja-400', badge: 'bg-orange-50 text-orange-500'   },
  zentia:          { dot: 'bg-azul-500',    badge: 'bg-azul-50 text-azul-600'       },
}

// ─── Helper: get all pairs from selected IDs ─────────────────────────────────

function getPairs(ids: string[]) {
  const pairs: Array<{ a: string; b: string; status: CompatibilityStatus; notes?: string }> = []
  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      const status = getCompatibility(ids[i], ids[j])
      const entry = getCompatibilityEntry(ids[i], ids[j])
      pairs.push({ a: ids[i], b: ids[j], status, notes: entry?.notes })
    }
  }
  return pairs
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CompatibilidadPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)

  // Filtered + grouped products
  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return PRODUCTS.filter(
      (p) =>
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    )
  }, [searchQuery])

  const grouped = useMemo(() => {
    const map: Record<string, typeof PRODUCTS> = {}
    for (const p of filtered) {
      if (!map[p.line]) map[p.line] = []
      map[p.line].push(p)
    }
    return map
  }, [filtered])

  // Selected product objects
  const selectedProducts = selectedIds.map((id) => PRODUCTS.find((p) => p.id === id)!).filter(Boolean)

  // All pairs + summary
  const pairs = showResults && selectedIds.length >= 2 ? getPairs(selectedIds) : []
  const incompatiblePairs = pairs.filter((p) => p.status === 'incompatible')
  const conditionalPairs = pairs.filter((p) => p.status === 'conditional')
  const allCompatible = pairs.length > 0 && incompatiblePairs.length === 0 && conditionalPairs.length === 0

  function toggleProduct(id: string) {
    setShowResults(false)
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= MAX_PRODUCTS) return prev
      return [...prev, id]
    })
  }

  // Cell status between two product IDs (same product → '—')
  function cellStatus(idA: string, idB: string): CompatibilityStatus | '—' {
    if (idA === idB) return '—'
    return getCompatibility(idA, idB)
  }

  const productName = (id: string) => PRODUCTS.find((p) => p.id === id)?.name ?? id

  return (
    <div className="min-h-screen bg-gris-50">
      {/* Hero strip */}
      <div className="bg-gradient-to-r from-azul-700 to-azul-500 py-8">
        <Container narrow>
          <div className="flex items-center gap-3">
            <Link href="/herramientas" className="flex items-center gap-1 text-sm text-azul-100 hover:text-white transition-colors">
              <ChevronLeft className="h-4 w-4" /> Herramientas
            </Link>
            <span className="text-azul-400">/</span>
            <span className="text-sm text-white font-medium">Compatibilidad de Productos</span>
          </div>
          <h1 className="mt-3 font-serif text-3xl font-normal text-white lg:text-4xl">
            Compatibilidad de Productos
          </h1>
          <p className="mt-2 text-azul-100 text-sm">
            Selecciona hasta 5 productos y verifica si puedes mezclarlos en el mismo tanque.
          </p>
        </Container>
      </div>

      <Container narrow className="py-10">
        <div className="grid gap-8 lg:grid-cols-5">

          {/* ── Left: Product selector ── */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-semibold text-gris-700 mb-3 uppercase tracking-widest">
              Seleccionar productos ({selectedIds.length}/{MAX_PRODUCTS})
            </h2>

            {/* Selected chips */}
            {selectedProducts.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {selectedProducts.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-1.5 rounded-full bg-azul-100 text-azul-700 px-3 py-1 text-xs font-semibold"
                  >
                    <span className={`h-2 w-2 rounded-full ${LINE_COLORS[p.line]?.dot}`} />
                    {p.name}
                    <button
                      onClick={() => toggleProduct(p.id)}
                      className="ml-1 rounded-full text-azul-400 hover:text-azul-700 transition-colors"
                      aria-label={`Quitar ${p.name}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gris-400" />
              <input
                type="text"
                placeholder="Buscar producto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-gris-200 bg-white py-2.5 pl-9 pr-3 text-sm text-gris-800 placeholder:text-gris-400 focus:outline-none focus:ring-2 focus:ring-azul-300"
              />
            </div>

            {/* Product list */}
            <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1">
              {PRODUCT_LINES.map((line) => {
                const products = grouped[line.id]
                if (!products?.length) return null
                const colors = LINE_COLORS[line.id]
                return (
                  <div key={line.id}>
                    <div className="mb-1.5 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${colors.dot}`} />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-gris-400">
                        {line.name}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {products.map((product) => {
                        const isSelected = selectedIds.includes(product.id)
                        const isDisabled = !isSelected && selectedIds.length >= MAX_PRODUCTS
                        return (
                          <button
                            key={product.id}
                            onClick={() => !isDisabled && toggleProduct(product.id)}
                            disabled={isDisabled}
                            className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs transition-all
                              ${isSelected
                                ? 'border-azul-300 bg-azul-50 font-semibold text-azul-800'
                                : isDisabled
                                ? 'border-gris-100 bg-gris-50 text-gris-300 cursor-not-allowed'
                                : 'border-gris-200 bg-white text-gris-700 hover:border-azul-200 hover:bg-azul-50/50'}`}
                          >
                            <div className={`h-1.5 w-1.5 rounded-full shrink-0 ${colors.dot}`} />
                            <span className="truncate flex-1">{product.name}</span>
                            {isSelected && <span className="text-azul-500 font-bold">✓</span>}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
              {filtered.length === 0 && (
                <p className="text-center text-gris-400 py-6 text-sm">
                  No se encontraron productos para &quot;{searchQuery}&quot;
                </p>
              )}
            </div>

            {/* Verify button */}
            <button
              onClick={() => setShowResults(true)}
              disabled={selectedIds.length < 2}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-azul-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-azul-600 disabled:opacity-40"
            >
              <CheckSquare className="h-4 w-4" />
              Verificar compatibilidad
            </button>
          </div>

          {/* ── Right: Results ── */}
          <div className="lg:col-span-3">
            {!showResults && (
              <div className="flex h-full items-center justify-center rounded-2xl border-2 border-dashed border-gris-200 bg-white py-16 text-center">
                <div>
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-azul-50">
                    <CheckSquare className="h-6 w-6 text-azul-400" />
                  </div>
                  <p className="text-sm font-semibold text-gris-500">Selecciona 2 o más productos</p>
                  <p className="text-xs text-gris-400 mt-1">y pulsa &quot;Verificar compatibilidad&quot;</p>
                </div>
              </div>
            )}

            {showResults && selectedProducts.length >= 2 && (
              <div>
                {/* Summary banner */}
                <div className={`rounded-xl border px-4 py-3 mb-5 text-sm font-semibold flex items-center gap-2
                  ${allCompatible
                    ? 'border-verde-200 bg-verde-50 text-verde-700'
                    : incompatiblePairs.length > 0
                    ? 'border-red-200 bg-red-50 text-red-700'
                    : 'border-naranja-200 bg-naranja-50 text-naranja-600'}`}>
                  {allCompatible
                    ? '✅ Todos los productos son compatibles para mezclar'
                    : incompatiblePairs.length > 0
                    ? `❌ Hay ${incompatiblePairs.length} par(es) incompatible(s). No mezclar.`
                    : `⚠️ Existen mezclas condicionales. Realizar prueba de jarrita.`}
                </div>

                {/* Matrix table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr>
                        <th className="w-24 border border-gris-200 bg-gris-100 p-2 text-left text-[10px] font-semibold text-gris-500 uppercase tracking-wide">
                          Producto
                        </th>
                        {selectedProducts.map((p) => (
                          <th
                            key={p.id}
                            className="border border-gris-200 bg-gris-100 p-2 text-center text-[10px] font-semibold text-gris-700 max-w-[80px]"
                          >
                            <div className="truncate max-w-[70px] mx-auto">{p.name}</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProducts.map((rowProduct) => (
                        <tr key={rowProduct.id}>
                          <td className="border border-gris-200 bg-gris-50 p-2 text-[11px] font-semibold text-gris-700 max-w-[80px]">
                            <div className="truncate">{rowProduct.name}</div>
                          </td>
                          {selectedProducts.map((colProduct) => {
                            const status = cellStatus(rowProduct.id, colProduct.id)
                            if (status === '—') {
                              return (
                                <td
                                  key={colProduct.id}
                                  className="border border-gris-200 bg-gris-200 p-2 text-center text-gris-400"
                                >
                                  —
                                </td>
                              )
                            }
                            const cfg = STATUS_CONFIG[status]
                            return (
                              <td
                                key={colProduct.id}
                                className={`border border-gris-200 p-2 text-center text-base ${cfg.cellBg}`}
                                title={cfg.label}
                              >
                                {cfg.emoji}
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Legend */}
                <div className="mt-3 flex flex-wrap gap-3">
                  {Object.entries(STATUS_CONFIG)
                    .filter(([k]) => k !== 'unknown')
                    .map(([, cfg]) => (
                      <div key={cfg.label} className="flex items-center gap-1.5 text-xs text-gris-600">
                        <span>{cfg.emoji}</span>
                        <span>{cfg.label}</span>
                      </div>
                    ))}
                </div>

                {/* Incompatible pairs detail */}
                {incompatiblePairs.length > 0 && (
                  <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                    <h3 className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-2">
                      ❌ Pares incompatibles — No mezclar
                    </h3>
                    <ul className="space-y-1.5">
                      {incompatiblePairs.map((p) => (
                        <li key={`${p.a}-${p.b}`} className="text-xs text-red-600">
                          <strong>{productName(p.a)}</strong> + <strong>{productName(p.b)}</strong>
                          {p.notes && <span className="text-red-400 ml-1">— {p.notes}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Conditional pairs detail */}
                {conditionalPairs.length > 0 && (
                  <div className="mt-3 rounded-xl border border-naranja-200 bg-naranja-50 px-4 py-3">
                    <h3 className="text-xs font-semibold text-naranja-600 uppercase tracking-wide mb-2">
                      ⚠️ Mezclas condicionales
                    </h3>
                    <ul className="space-y-1.5">
                      {conditionalPairs.map((p) => (
                        <li key={`${p.a}-${p.b}`} className="text-xs text-naranja-600">
                          <strong>{productName(p.a)}</strong> + <strong>{productName(p.b)}</strong>
                          {p.notes && <span className="text-naranja-400 ml-1">— {p.notes}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Disclaimer */}
                <div className="mt-4 rounded-xl border border-gris-200 bg-gris-50 px-4 py-3 text-xs text-gris-500">
                  💡 La compatibilidad puede variar según pH del agua, temperatura y concentración. Siempre realizar prueba de jarrita antes de aplicar en campo.
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}
