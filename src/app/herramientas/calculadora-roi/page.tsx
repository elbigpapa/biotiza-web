'use client'

/**
 * app/herramientas/calculadora-roi/page.tsx — Calculadora de ROI Biotiza
 * Estima el retorno de inversión al implementar el programa Biotiza.
 */

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, TrendingUp } from 'lucide-react'
import Container from '@/components/ui/Container'
import { CROPS_DATA } from '@/data/constants'

// ─── Constants ────────────────────────────────────────────────────────────────

const BIOTIZA_INVESTMENT_PER_HA = 4_500   // MXN/ha (estimado del programa)
const YIELD_IMPROVEMENT         = 0.15    // 15% de incremento promedio documentado

// Default yield by crop (t/ha) and price ($/kg MXN)
const CROP_DEFAULTS: Record<string, { yield: number; price: number }> = {
  tomate:    { yield: 60,  price: 12  },
  fresa:     { yield: 35,  price: 30  },
  arandano:  { yield: 8,   price: 80  },
  frambuesa: { yield: 10,  price: 60  },
  zarzamora: { yield: 12,  price: 50  },
  aguacate:  { yield: 10,  price: 25  },
  chile:     { yield: 25,  price: 18  },
  citricos:  { yield: 20,  price: 8   },
}

// ─── Formatter ────────────────────────────────────────────────────────────────

function fmt(n: number): string {
  return new Intl.NumberFormat('es-MX', {
    style:    'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(n)
}

function fmtNum(n: number, decimals = 1): string {
  return new Intl.NumberFormat('es-MX', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(n)
}

// ─── Bar Chart Component ──────────────────────────────────────────────────────

function RevenueBar({
  label,
  value,
  maxValue,
  color,
  mounted,
}: {
  label: string
  value: number
  maxValue: number
  color: string
  mounted: boolean
}) {
  const pct = maxValue > 0 ? (value / maxValue) * 100 : 0
  return (
    <div className="flex flex-col items-center gap-2 flex-1">
      <div className="text-xs font-semibold text-gris-500 text-center leading-tight">{label}</div>
      <div className="relative flex h-48 w-full max-w-[100px] items-end rounded-t-lg bg-gris-100">
        <div
          className={`absolute bottom-0 left-0 right-0 rounded-t-lg transition-all duration-700 ease-out ${color}`}
          style={{ height: mounted ? `${pct}%` : '0%' }}
        />
        <div className="relative z-10 w-full pb-2 text-center text-xs font-bold text-white drop-shadow">
          {mounted && <span>{fmt(value)}</span>}
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CalculadoraROIPage() {
  // Form state
  const [crop, setCrop]                     = useState(CROPS_DATA[0].id)
  const [surface, setSurface]               = useState<number>(1)
  const [currentYield, setCurrentYield]     = useState<number>(CROP_DEFAULTS[CROPS_DATA[0].id]?.yield ?? 20)
  const [salePrice, setSalePrice]           = useState<number>(CROP_DEFAULTS[CROPS_DATA[0].id]?.price ?? 15)
  const [currentInputCost, setCurrentInputCost] = useState<number>(8_000)
  const [showResults, setShowResults]       = useState(false)
  const [mounted, setMounted]               = useState(false)

  const resultsRef = useRef<HTMLDivElement>(null)

  // When crop changes, update defaults
  function handleCropChange(id: string) {
    setCrop(id)
    const defaults = CROP_DEFAULTS[id]
    if (defaults) {
      setCurrentYield(defaults.yield)
      setSalePrice(defaults.price)
    }
    setShowResults(false)
    setMounted(false)
  }

  function calculate() {
    setShowResults(false)
    setMounted(false)
    // Small delay to reset bars before animating
    setTimeout(() => {
      setShowResults(true)
      setTimeout(() => setMounted(true), 80)
      // Scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }, 50)
  }

  // ── Calculations ──────────────────────────────────────────────────────────

  const surfaceHa   = surface > 0 ? surface : 1
  const yieldHa     = currentYield > 0 ? currentYield : 0
  const price       = salePrice > 0 ? salePrice : 0
  const inputCostHa = currentInputCost >= 0 ? currentInputCost : 0

  const newYield        = yieldHa * (1 + YIELD_IMPROVEMENT)
  const currentRevenue  = yieldHa * 1_000 * price * surfaceHa
  const newRevenue      = newYield * 1_000 * price * surfaceHa
  const revenueGain     = newRevenue - currentRevenue
  const biotizaTotal    = BIOTIZA_INVESTMENT_PER_HA * surfaceHa
  const netGain         = revenueGain - biotizaTotal
  const roiPct          = biotizaTotal > 0 ? (netGain / biotizaTotal) * 100 : 0
  const breakEvenYears  = revenueGain > 0 ? biotizaTotal / (revenueGain) : 0

  const maxBar = Math.max(currentRevenue, newRevenue, 1)

  const isFormValid = surface > 0 && currentYield > 0 && salePrice > 0

  const cropName = CROPS_DATA.find((c) => c.id === crop)?.name ?? crop

  const waText = encodeURIComponent(
    `Hola, usé la calculadora de ROI de Biotiza.\n` +
    `Cultivo: ${cropName}\n` +
    `Superficie: ${surfaceHa} ha\n` +
    `ROI estimado: ${fmtNum(roiPct, 0)}%\n` +
    `¿Pueden enviarme un programa personalizado?`,
  )

  return (
    <div className="min-h-screen bg-gris-50">
      {/* Hero strip */}
      <div className="bg-gradient-to-r from-verde-800 to-verde-600 py-8">
        <Container narrow>
          <div className="flex items-center gap-3">
            <Link href="/herramientas" className="flex items-center gap-1 text-sm text-verde-200 hover:text-white transition-colors">
              <ChevronLeft className="h-4 w-4" /> Herramientas
            </Link>
            <span className="text-verde-500">/</span>
            <span className="text-sm text-white font-medium">Calculadora de ROI</span>
          </div>
          <h1 className="mt-3 font-serif text-3xl font-normal text-white lg:text-4xl">
            Calculadora de ROI
          </h1>
          <p className="mt-2 text-verde-100 text-sm">
            Estima el retorno de inversión del programa Biotiza en tu huerto.
          </p>
        </Container>
      </div>

      <Container narrow className="py-10">
        <div className="grid gap-8 lg:grid-cols-2">

          {/* ── Left: Form ── */}
          <div className="rounded-2xl border border-gris-200 bg-white p-6 shadow-sm">
            <h2 className="font-serif text-xl text-gris-900 mb-6">
              Datos de tu huerto
            </h2>

            <div className="space-y-5">
              {/* Cultivo */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gris-500 mb-1.5">
                  Cultivo
                </label>
                <select
                  value={crop}
                  onChange={(e) => handleCropChange(e.target.value)}
                  className="w-full rounded-xl border border-gris-200 bg-gris-50 px-3 py-2.5 text-sm text-gris-800 focus:outline-none focus:ring-2 focus:ring-verde-300"
                >
                  {CROPS_DATA.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.emoji} {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Superficie */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gris-500 mb-1.5">
                  Superficie (hectáreas)
                </label>
                <input
                  type="number"
                  min={0.1}
                  step={0.1}
                  value={surface}
                  onChange={(e) => { setSurface(parseFloat(e.target.value) || 0); setShowResults(false) }}
                  className="w-full rounded-xl border border-gris-200 bg-gris-50 px-3 py-2.5 text-sm text-gris-800 focus:outline-none focus:ring-2 focus:ring-verde-300"
                />
              </div>

              {/* Rendimiento */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gris-500 mb-1.5">
                  Rendimiento actual (t/ha)
                </label>
                <input
                  type="number"
                  min={0.1}
                  step={0.5}
                  value={currentYield}
                  placeholder={`Ej: ${CROP_DEFAULTS[crop]?.yield ?? 20}`}
                  onChange={(e) => { setCurrentYield(parseFloat(e.target.value) || 0); setShowResults(false) }}
                  className="w-full rounded-xl border border-gris-200 bg-gris-50 px-3 py-2.5 text-sm text-gris-800 focus:outline-none focus:ring-2 focus:ring-verde-300"
                />
                <p className="mt-1 text-[11px] text-gris-400">
                  Promedio industria: {CROP_DEFAULTS[crop]?.yield ?? '—'} t/ha para {cropName}
                </p>
              </div>

              {/* Precio de venta */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gris-500 mb-1.5">
                  Precio de venta ($ MXN / kg)
                </label>
                <input
                  type="number"
                  min={0.1}
                  step={0.5}
                  value={salePrice}
                  placeholder={`Ej: ${CROP_DEFAULTS[crop]?.price ?? 15}`}
                  onChange={(e) => { setSalePrice(parseFloat(e.target.value) || 0); setShowResults(false) }}
                  className="w-full rounded-xl border border-gris-200 bg-gris-50 px-3 py-2.5 text-sm text-gris-800 focus:outline-none focus:ring-2 focus:ring-verde-300"
                />
              </div>

              {/* Costo insumos */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gris-500 mb-1.5">
                  Costo actual de insumos ($ MXN / ha)
                </label>
                <input
                  type="number"
                  min={0}
                  step={500}
                  value={currentInputCost}
                  placeholder="Ej: 8000"
                  onChange={(e) => { setCurrentInputCost(parseFloat(e.target.value) || 0); setShowResults(false) }}
                  className="w-full rounded-xl border border-gris-200 bg-gris-50 px-3 py-2.5 text-sm text-gris-800 focus:outline-none focus:ring-2 focus:ring-verde-300"
                />
                <p className="mt-1 text-[11px] text-gris-400">
                  Biotiza programa estimado: {fmt(BIOTIZA_INVESTMENT_PER_HA)}/ha adicional
                </p>
              </div>

              {/* Calculate button */}
              <button
                onClick={calculate}
                disabled={!isFormValid}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-verde-500 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-verde-600 disabled:opacity-40"
              >
                <TrendingUp className="h-4 w-4" />
                Calcular ROI
              </button>
            </div>
          </div>

          {/* ── Right: Results ── */}
          <div ref={resultsRef}>
            {!showResults && (
              <div className="flex h-full min-h-[300px] items-center justify-center rounded-2xl border-2 border-dashed border-gris-200 bg-white text-center p-8">
                <div>
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-verde-50">
                    <TrendingUp className="h-7 w-7 text-verde-400" />
                  </div>
                  <p className="text-sm font-semibold text-gris-500">Completa el formulario</p>
                  <p className="text-xs text-gris-400 mt-1">y pulsa &quot;Calcular ROI&quot; para ver tu proyección</p>
                </div>
              </div>
            )}

            {showResults && (
              <div className="space-y-5">
                {/* Bar chart */}
                <div className="rounded-2xl border border-gris-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-gris-400 mb-5">
                    Ingresos proyectados ({surfaceHa} ha)
                  </h3>
                  <div className="flex items-end gap-4 justify-center">
                    <RevenueBar
                      label="Sin Biotiza"
                      value={currentRevenue}
                      maxValue={maxBar}
                      color="bg-gris-300"
                      mounted={mounted}
                    />
                    <RevenueBar
                      label="Con Biotiza (+15%)"
                      value={newRevenue}
                      maxValue={maxBar}
                      color="bg-verde-500"
                      mounted={mounted}
                    />
                  </div>
                </div>

                {/* Metric cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-verde-200 bg-verde-50 px-4 py-3">
                    <p className="text-[11px] text-verde-500 font-semibold uppercase tracking-wide mb-0.5">
                      💰 Ingresos adicionales
                    </p>
                    <p className="text-lg font-bold text-verde-700">
                      +{fmt(revenueGain)}
                    </p>
                    <p className="text-[10px] text-verde-400">por temporada</p>
                  </div>

                  <div className={`rounded-xl border px-4 py-3 ${roiPct >= 0 ? 'border-verde-200 bg-verde-50' : 'border-red-200 bg-red-50'}`}>
                    <p className={`text-[11px] font-semibold uppercase tracking-wide mb-0.5 ${roiPct >= 0 ? 'text-verde-500' : 'text-red-500'}`}>
                      📈 ROI Biotiza
                    </p>
                    <p className={`text-lg font-bold ${roiPct >= 0 ? 'text-verde-700' : 'text-red-700'}`}>
                      {fmtNum(roiPct, 0)}%
                    </p>
                    <p className={`text-[10px] ${roiPct >= 0 ? 'text-verde-400' : 'text-red-400'}`}>
                      {roiPct >= 0 ? 'retorno neto' : 'inversión no recuperada'}
                    </p>
                  </div>

                  <div className="rounded-xl border border-gris-200 bg-gris-50 px-4 py-3">
                    <p className="text-[11px] text-gris-500 font-semibold uppercase tracking-wide mb-0.5">
                      🌾 Rendimiento
                    </p>
                    <p className="text-base font-bold text-gris-800">
                      {fmtNum(yieldHa)} → {fmtNum(newYield)} t/ha
                    </p>
                    <p className="text-[10px] text-gris-400">+15% documentado</p>
                  </div>

                  <div className="rounded-xl border border-gris-200 bg-gris-50 px-4 py-3">
                    <p className="text-[11px] text-gris-500 font-semibold uppercase tracking-wide mb-0.5">
                      💵 Inversión Biotiza
                    </p>
                    <p className="text-base font-bold text-gris-800">
                      {fmt(biotizaTotal)}
                    </p>
                    <p className="text-[10px] text-gris-400">total para {fmtNum(surfaceHa, 1)} ha</p>
                  </div>
                </div>

                {/* Net gain highlight */}
                <div className={`rounded-xl px-5 py-4 border text-center
                  ${netGain >= 0 ? 'bg-verde-500 border-verde-500' : 'bg-red-500 border-red-500'}`}>
                  <p className="text-xs font-semibold text-white/70 uppercase tracking-widest mb-1">
                    Ganancia neta estimada
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {netGain >= 0 ? '+' : ''}{fmt(netGain)}
                  </p>
                  <p className="text-xs text-white/70 mt-0.5">
                    ingresos adicionales menos inversión Biotiza
                  </p>
                </div>

                {/* Disclaimer */}
                <div className="rounded-xl border border-gris-200 bg-gris-50 px-4 py-3 text-xs text-gris-500">
                  📊 Proyección basada en resultados promedio documentados. Los resultados reales pueden variar según manejo agronómico, clima y condiciones de mercado.
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/cotizacion"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-verde-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-verde-600"
                  >
                    Solicitar programa personalizado →
                  </Link>
                  <a
                    href={`https://wa.me/523300000000?text=${waText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-verde-300 bg-white px-6 py-3 text-sm font-semibold text-verde-700 transition-colors hover:bg-verde-50"
                  >
                    💬 Hablar con asesor
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}
