'use client'

/**
 * app/herramientas/calculadora-dosis/page.tsx — Calculadora de Dosis
 * Wizard de 4 pasos para calcular la cantidad exacta de producto a aplicar.
 */

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ChevronLeft, Search, Calculator, Droplets, Wind, Beaker } from 'lucide-react'
import Container from '@/components/ui/Container'
import { PRODUCTS } from '@/data/products'
import { PRODUCT_LINES } from '@/data/constants'
import type { Product } from '@/types'

// ─── Types ────────────────────────────────────────────────────────────────────

type SurfaceUnit = 'ha' | 'm2'
type WizardStep = 1 | 2 | 3 | 4

const METHOD_META: Record<string, { label: string; icon: string; emoji: string }> = {
  foliar:          { label: 'Foliar',          icon: '🌿', emoji: '🌿' },
  fertirrigación:  { label: 'Fertirrigación',  icon: '💧', emoji: '💧' },
  fertirrigacion:  { label: 'Fertirrigación',  icon: '💧', emoji: '💧' },
  drench:          { label: 'Drench',          icon: '🪣', emoji: '🪣' },
  aspersión:       { label: 'Aspersión',       icon: '🌬️', emoji: '🌬️' },
  aspersion:       { label: 'Aspersión',       icon: '🌬️', emoji: '🌬️' },
  'drench radicular': { label: 'Drench Radicular', icon: '🪣', emoji: '🪣' },
}

// ─── Line color config ────────────────────────────────────────────────────────

const LINE_COLORS: Record<string, { dot: string; badge: string }> = {
  organicos:       { dot: 'bg-verde-500',   badge: 'bg-verde-50 text-verde-700'   },
  especialidades:  { dot: 'bg-azul-600',    badge: 'bg-azul-50 text-azul-700'     },
  bioestimulantes: { dot: 'bg-naranja-500', badge: 'bg-naranja-50 text-naranja-600' },
  nutricion:       { dot: 'bg-naranja-400', badge: 'bg-orange-50 text-orange-500' },
  zentia:          { dot: 'bg-azul-500',    badge: 'bg-azul-50 text-azul-600'     },
}

// ─── Dose parser ──────────────────────────────────────────────────────────────

/**
 * Parsea strings de dosis como "2–3 mL/L", "2-4 L/ha", "3–5 mL/planta".
 * Retorna { min, max, unit } o null si no se puede parsear.
 */
function parseDose(doseStr: string): { min: number; max: number; unit: string } | null {
  if (!doseStr) return null
  // Match: "2–3 mL/L" or "2-4 L/ha" or "0.5–1 L/ha"
  const match = doseStr.match(/([\d.]+)\s*[–\-]\s*([\d.]+)\s*([a-zA-Záéíóú/]+)/)
  if (match) {
    return { min: parseFloat(match[1]), max: parseFloat(match[2]), unit: match[3] }
  }
  // Single value: "2 mL/L"
  const single = doseStr.match(/([\d.]+)\s*([a-zA-Záéíóú/]+)/)
  if (single) {
    const val = parseFloat(single[1])
    return { min: val, max: val, unit: single[2] }
  }
  return null
}

function calculateTotal(
  doseStr: string,
  surfaceHa: number,
  method: string,
): { minTotal: number; maxTotal: number; unit: string; label: string } | null {
  const parsed = parseDose(doseStr)
  if (!parsed) return null

  const { min, max, unit } = parsed
  const unitLower = unit.toLowerCase()

  // L/ha or mL/ha — multiply by hectares
  if (unitLower === 'l/ha') {
    return {
      minTotal: +(min * surfaceHa).toFixed(2),
      maxTotal: +(max * surfaceHa).toFixed(2),
      unit: 'L',
      label: `para ${surfaceHa} ha`,
    }
  }
  if (unitLower === 'ml/ha') {
    return {
      minTotal: +((min * surfaceHa) / 1000).toFixed(2),
      maxTotal: +((max * surfaceHa) / 1000).toFixed(2),
      unit: 'L',
      label: `para ${surfaceHa} ha`,
    }
  }

  // mL/L — foliar assumes 200 L agua/ha
  if (unitLower === 'ml/l' || unitLower === 'ml/l') {
    const waterPerHa = 200
    const totalMin = (min * waterPerHa * surfaceHa) / 1000
    const totalMax = (max * waterPerHa * surfaceHa) / 1000
    return {
      minTotal: +totalMin.toFixed(2),
      maxTotal: +totalMax.toFixed(2),
      unit: 'L',
      label: `(base 200 L agua/ha × ${surfaceHa} ha)`,
    }
  }

  // L/L — similar
  if (unitLower === 'l/l') {
    const waterPerHa = 200
    return {
      minTotal: +(min * waterPerHa * surfaceHa).toFixed(2),
      maxTotal: +(max * waterPerHa * surfaceHa).toFixed(2),
      unit: 'L',
      label: `(base 200 L agua/ha × ${surfaceHa} ha)`,
    }
  }

  // mL/planta or L/planta — return per-plant dose
  if (unitLower.includes('planta')) {
    return {
      minTotal: min,
      maxTotal: max,
      unit: unit,
      label: 'por planta',
    }
  }

  // Fallback — just show as-is
  return {
    minTotal: min,
    maxTotal: max,
    unit: unit,
    label: '',
  }
}

// ─── Step Indicator ───────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: WizardStep }) {
  const steps = [
    { n: 1, label: 'Producto' },
    { n: 2, label: 'Superficie' },
    { n: 3, label: 'Método' },
    { n: 4, label: 'Resultado' },
  ]

  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((s, idx) => (
        <div key={s.n} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors
                ${current === s.n ? 'bg-verde-500 text-white ring-4 ring-verde-100' :
                  current > s.n  ? 'bg-verde-300 text-white' :
                  'bg-gris-200 text-gris-400'}`}
            >
              {current > s.n ? '✓' : s.n}
            </div>
            <span className={`mt-1 hidden sm:block text-[10px] font-medium
              ${current === s.n ? 'text-verde-600' : current > s.n ? 'text-verde-400' : 'text-gris-400'}`}>
              {s.label}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div className={`h-0.5 w-12 sm:w-20 mx-1 transition-colors
              ${current > s.n ? 'bg-verde-300' : 'bg-gris-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CalculadoraDosisPage() {
  const [step, setStep] = useState<WizardStep>(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [surface, setSurface] = useState<number>(1)
  const [surfaceUnit, setSurfaceUnit] = useState<SurfaceUnit>('ha')
  const [selectedMethod, setSelectedMethod] = useState<string>('')

  // Surface in hectares
  const surfaceHa = surfaceUnit === 'ha' ? surface : surface / 10_000

  // Filtered products
  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return PRODUCTS.filter(
      (p) =>
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.full_name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    )
  }, [searchQuery])

  // Products grouped by line
  const grouped = useMemo(() => {
    const map: Record<string, Product[]> = {}
    for (const p of filteredProducts) {
      if (!map[p.line]) map[p.line] = []
      map[p.line].push(p)
    }
    return map
  }, [filteredProducts])

  // Dose string for selected method
  const doseStr = selectedProduct?.recommended_dose?.[selectedMethod] ?? ''
  const doseResult = doseStr ? calculateTotal(doseStr, surfaceHa, selectedMethod) : null

  // WhatsApp message
  const waText = selectedProduct
    ? encodeURIComponent(
        `Hola, estoy usando la calculadora de Biotiza.\n` +
        `Producto: ${selectedProduct.name}\n` +
        `Superficie: ${surfaceHa} ha\n` +
        `Método: ${METHOD_META[selectedMethod]?.label ?? selectedMethod}\n` +
        `Dosis: ${doseStr}\n` +
        `¿Pueden ayudarme con mi pedido?`,
      )
    : ''

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gris-50">
      {/* Hero strip */}
      <div className="bg-gradient-to-r from-verde-900 to-verde-700 py-8">
        <Container narrow>
          <div className="flex items-center gap-3">
            <Link
              href="/herramientas"
              className="flex items-center gap-1 text-sm text-verde-200 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-4 w-4" /> Herramientas
            </Link>
            <span className="text-verde-600">/</span>
            <span className="text-sm text-white font-medium">Calculadora de Dosis</span>
          </div>
          <h1 className="mt-3 font-serif text-3xl font-normal text-white lg:text-4xl">
            Calculadora de Dosis
          </h1>
          <p className="mt-2 text-verde-100 text-sm">
            Calcula la cantidad exacta de producto para tu superficie y método de aplicación.
          </p>
        </Container>
      </div>

      {/* Wizard */}
      <Container narrow className="py-12">
        <StepIndicator current={step} />

        {/* ── Step 1: Seleccionar Producto ── */}
        {step === 1 && (
          <div>
            <h2 className="text-center font-serif text-2xl text-gris-900 mb-6">
              ¿Qué producto vas a aplicar?
            </h2>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gris-400" />
              <input
                type="text"
                placeholder="Buscar producto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-gris-200 bg-white py-3 pl-10 pr-4 text-sm text-gris-800 placeholder:text-gris-400 focus:outline-none focus:ring-2 focus:ring-verde-300"
              />
            </div>

            {/* Grouped list */}
            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-1">
              {PRODUCT_LINES.map((line) => {
                const products = grouped[line.id]
                if (!products?.length) return null
                const colors = LINE_COLORS[line.id]
                return (
                  <div key={line.id}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${colors.dot}`} />
                      <span className="text-xs font-semibold uppercase tracking-wider text-gris-500">
                        {line.name}
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      {products.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => {
                            setSelectedProduct(product)
                            setSelectedMethod('')
                            setStep(2)
                          }}
                          className="flex w-full items-center justify-between rounded-xl border border-gris-200 bg-white px-4 py-3 text-left transition-all hover:border-verde-300 hover:bg-verde-50 hover:shadow-sm"
                        >
                          <div>
                            <p className="text-sm font-semibold text-gris-800">{product.name}</p>
                            <p className="text-xs text-gris-400 mt-0.5">{product.category}</p>
                          </div>
                          <span className={`ml-3 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${colors.badge}`}>
                            {line.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })}
              {filteredProducts.length === 0 && (
                <p className="text-center text-gris-400 py-8">
                  No se encontraron productos para &quot;{searchQuery}&quot;
                </p>
              )}
            </div>
          </div>
        )}

        {/* ── Step 2: Superficie ── */}
        {step === 2 && selectedProduct && (
          <div>
            <button
              onClick={() => setStep(1)}
              className="mb-6 flex items-center gap-1 text-sm text-gris-400 hover:text-gris-700 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" /> Cambiar producto
            </button>

            <div className="mb-4 rounded-xl bg-verde-50 border border-verde-100 px-4 py-3 flex items-center gap-3">
              <div className={`h-2.5 w-2.5 rounded-full ${LINE_COLORS[selectedProduct.line]?.dot}`} />
              <p className="text-sm font-semibold text-verde-800">{selectedProduct.name}</p>
            </div>

            <h2 className="font-serif text-2xl text-gris-900 mb-6">
              ¿Cuánta superficie vas a tratar?
            </h2>

            {/* Unit toggle */}
            <div className="mb-4 flex rounded-xl border border-gris-200 bg-gris-100 p-1 max-w-xs">
              {(['ha', 'm2'] as const).map((u) => (
                <button
                  key={u}
                  onClick={() => setSurfaceUnit(u)}
                  className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all
                    ${surfaceUnit === u ? 'bg-white text-verde-700 shadow-sm' : 'text-gris-500 hover:text-gris-700'}`}
                >
                  {u === 'ha' ? 'Hectáreas' : 'Metros²'}
                </button>
              ))}
            </div>

            {/* Number input */}
            <input
              type="number"
              min={0.01}
              step={0.01}
              value={surface}
              onChange={(e) => setSurface(parseFloat(e.target.value) || 0)}
              className="w-full max-w-xs rounded-xl border border-gris-200 bg-white px-4 py-3 text-2xl font-bold text-gris-900 focus:outline-none focus:ring-2 focus:ring-verde-300"
            />
            <p className="mt-1.5 text-sm text-gris-400">
              {surfaceUnit === 'ha' ? 'hectáreas' : 'metros cuadrados'}
            </p>

            {surfaceUnit === 'm2' && surface > 0 && (
              <p className="mt-2 text-sm text-verde-600">
                = {surfaceHa.toFixed(4)} ha
              </p>
            )}

            <button
              onClick={() => setStep(3)}
              disabled={!surface || surface <= 0}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-verde-500 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-verde-600 disabled:opacity-40"
            >
              Siguiente →
            </button>
          </div>
        )}

        {/* ── Step 3: Método de Aplicación ── */}
        {step === 3 && selectedProduct && (
          <div>
            <button
              onClick={() => setStep(2)}
              className="mb-6 flex items-center gap-1 text-sm text-gris-400 hover:text-gris-700 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" /> Cambiar superficie
            </button>

            <div className="mb-4 rounded-xl bg-verde-50 border border-verde-100 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`h-2.5 w-2.5 rounded-full ${LINE_COLORS[selectedProduct.line]?.dot}`} />
                <p className="text-sm font-semibold text-verde-800">{selectedProduct.name}</p>
              </div>
              <span className="text-sm text-verde-600">
                {surfaceHa.toFixed(surfaceHa < 1 ? 4 : 2)} ha
              </span>
            </div>

            <h2 className="font-serif text-2xl text-gris-900 mb-6">
              ¿Cómo lo vas a aplicar?
            </h2>

            <div className="space-y-3">
              {selectedProduct.application_methods.map((method) => {
                const meta = METHOD_META[method] ?? { label: method, icon: '🌱', emoji: '🌱' }
                const isSelected = selectedMethod === method
                return (
                  <button
                    key={method}
                    onClick={() => setSelectedMethod(method)}
                    className={`flex w-full items-center gap-4 rounded-xl border px-5 py-4 text-left transition-all
                      ${isSelected
                        ? 'border-verde-400 bg-verde-50 ring-1 ring-verde-300'
                        : 'border-gris-200 bg-white hover:border-verde-200 hover:bg-verde-50/50'}`}
                  >
                    <span className="text-2xl">{meta.emoji}</span>
                    <div>
                      <p className="font-semibold text-gris-800">{meta.label}</p>
                      {selectedProduct.recommended_dose?.[method] && (
                        <p className="text-xs text-gris-400 mt-0.5">
                          Dosis: {selectedProduct.recommended_dose[method]}
                        </p>
                      )}
                    </div>
                    {isSelected && (
                      <span className="ml-auto text-verde-500 font-bold">✓</span>
                    )}
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => setStep(4)}
              disabled={!selectedMethod}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-verde-500 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-verde-600 disabled:opacity-40"
            >
              Ver resultado →
            </button>
          </div>
        )}

        {/* ── Step 4: Resultado ── */}
        {step === 4 && selectedProduct && selectedMethod && (
          <div>
            <button
              onClick={() => setStep(3)}
              className="mb-6 flex items-center gap-1 text-sm text-gris-400 hover:text-gris-700 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" /> Cambiar método
            </button>

            {/* Result card */}
            <div className="rounded-2xl border border-verde-200 bg-white shadow-sm overflow-hidden">
              {/* Header */}
              <div className="bg-verde-500 px-6 py-5 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <Calculator className="h-5 w-5 text-verde-100" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-verde-100">
                    Resultado del cálculo
                  </span>
                </div>
                <h2 className="font-serif text-2xl font-normal">{selectedProduct.name}</h2>
                <p className="text-sm text-verde-100 mt-1">
                  {METHOD_META[selectedMethod]?.emoji} {METHOD_META[selectedMethod]?.label ?? selectedMethod}
                  {' · '}{surfaceHa.toFixed(surfaceHa < 1 ? 4 : 2)} ha
                </p>
              </div>

              {/* Body */}
              <div className="px-6 py-6">
                {/* Dose string */}
                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-gris-50 px-4 py-3">
                    <p className="text-xs text-gris-400 mb-1">Dosis recomendada</p>
                    <p className="text-lg font-bold text-gris-800 font-mono">{doseStr}</p>
                  </div>
                  {doseResult && (
                    <div className="rounded-xl bg-verde-50 border border-verde-100 px-4 py-3">
                      <p className="text-xs text-gris-400 mb-1">Cantidad total estimada</p>
                      <p className="text-lg font-bold text-verde-700 font-mono">
                        {doseResult.minTotal === doseResult.maxTotal
                          ? `${doseResult.minTotal} ${doseResult.unit}`
                          : `${doseResult.minTotal}–${doseResult.maxTotal} ${doseResult.unit}`}
                      </p>
                      <p className="text-xs text-gris-400 mt-0.5">{doseResult.label}</p>
                    </div>
                  )}
                </div>

                {/* Summary bullets */}
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-gris-600">
                    <span className="text-verde-500 font-bold">·</span>
                    Producto: <strong className="text-gris-800">{selectedProduct.full_name}</strong>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gris-600">
                    <span className="text-verde-500 font-bold">·</span>
                    Método: <strong className="text-gris-800">{METHOD_META[selectedMethod]?.label ?? selectedMethod}</strong>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gris-600">
                    <span className="text-verde-500 font-bold">·</span>
                    Superficie: <strong className="text-gris-800">{surfaceHa.toFixed(4)} ha ({surface} {surfaceUnit === 'ha' ? 'hectárea(s)' : 'm²'})</strong>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gris-600">
                    <span className="text-verde-500 font-bold">·</span>
                    Frecuencia: <strong className="text-gris-800">{selectedProduct.frequency}</strong>
                  </li>
                </ul>

                {/* Note */}
                <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-700">
                  ⚠️ Las dosis son orientativas. Consulta siempre con el equipo técnico de Biotiza antes de aplicar en campo.
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/523316022708?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-verde-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-verde-600"
              >
                💬 Pedir por WhatsApp
              </a>
              <Link
                href="/cotizacion"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-gris-200 bg-white px-6 py-3 text-sm font-semibold text-gris-700 transition-colors hover:bg-gris-50"
              >
                Ir a Cotización
              </Link>
            </div>

            {/* Restart */}
            <div className="mt-4 text-center">
              <button
                onClick={() => {
                  setStep(1)
                  setSelectedProduct(null)
                  setSelectedMethod('')
                  setSurface(1)
                  setSurfaceUnit('ha')
                  setSearchQuery('')
                }}
                className="text-sm text-gris-400 underline underline-offset-2 hover:text-gris-600 transition-colors"
              >
                Calcular otro producto
              </button>
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}
