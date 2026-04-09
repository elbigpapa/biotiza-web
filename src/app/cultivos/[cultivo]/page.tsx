/**
 * /cultivos/[cultivo] — Página de detalle de protocolo de cultivo
 *
 * Server Component · Sin 'use client'
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ChevronRight,
  Leaf,
  Shield,
  Target,
  Clock,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react'
import { CROP_PROTOCOLS, getCropBySlug } from '@/data/crops'
import type { FullCropProtocol, CropStage, StageProduct } from '@/data/crops'
import { PRODUCTS } from '@/data/products'
import { cn } from '@/lib/utils'
import Container from '@/components/ui/Container'
import Badge from '@/components/ui/Badge'
import type { ProductLine } from '@/types'

// ─── Static Params ────────────────────────────────────────────────────────

export function generateStaticParams() {
  return CROP_PROTOCOLS.map((crop) => ({ cultivo: crop.slug }))
}

// ─── Metadata ─────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cultivo: string }>
}): Promise<Metadata> {
  const { cultivo } = await params
  const crop = getCropBySlug(cultivo)

  if (!crop) {
    return { title: 'Cultivo no encontrado — Biotiza' }
  }

  return {
    title: `Programa de Nutrición para ${crop.name} | Biotiza`,
    description: `Protocolo completo de nutrición para ${crop.name} (${crop.scientific_name ?? ''}): ${crop.stages.length} etapas, productos Biotiza con dosis y frecuencia de aplicación.`,
    openGraph: {
      title: `Programa de Nutrición para ${crop.name} — Biotiza`,
      description: crop.description,
      url: `https://biotiza.mx/cultivos/${crop.slug}`,
    },
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────

/** Devuelve la ruta de detalle de un producto según su línea y slug. */
function getProductHref(productId: string): string {
  const product = PRODUCTS.find((p) => p.id === productId)
  if (!product) return '/soluciones'
  return `/soluciones/${product.line}/${product.slug}`
}

/** Devuelve la línea de un producto para el Badge. */
function getProductLine(productId: string): ProductLine | null {
  const product = PRODUCTS.find((p) => p.id === productId)
  return product?.line ?? null
}

/** Recopila todos los productos únicos de todas las etapas. */
function getAllUniqueProducts(crop: FullCropProtocol): StageProduct[] {
  const seen = new Set<string>()
  const result: StageProduct[] = []

  for (const stage of crop.stages) {
    for (const p of stage.products) {
      if (!seen.has(p.productId)) {
        seen.add(p.productId)
        result.push(p)
      }
    }
  }

  return result
}

// ─── Sub-componentes inline ───────────────────────────────────────────────

/** Línea de tiempo fenológica — desktop horizontal, mobile vertical */
function PhenologicalTimeline({ crop }: { crop: FullCropProtocol }) {
  return (
    <div className="bg-white border border-gris-100 rounded-2xl p-6 shadow-sm">
      <h2 className="font-serif text-lg text-gris-900 mb-5 flex items-center gap-2">
        <Clock className="h-5 w-5 text-verde-600" aria-hidden="true" />
        Ciclo fenológico
      </h2>

      {/* Desktop: fila horizontal */}
      <div className="hidden sm:flex items-start gap-0">
        {crop.stages.map((stage, index) => (
          <a
            key={stage.id}
            href={`#stage-${stage.id}`}
            className="flex-1 group flex flex-col items-center gap-2 min-w-0"
          >
            {/* Conector izquierdo + círculo + conector derecho */}
            <div className="flex items-center w-full">
              {index > 0 && (
                <div className="flex-1 h-0.5 bg-gris-200 group-hover:bg-verde-300 transition-colors" />
              )}
              <div
                className={cn(
                  'shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold',
                  'border-2 transition-all duration-200',
                  'border-gris-300 bg-white text-gris-600',
                  'group-hover:border-verde-500 group-hover:text-verde-700 group-hover:bg-verde-50',
                )}
              >
                {index + 1}
              </div>
              {index < crop.stages.length - 1 && (
                <div className="flex-1 h-0.5 bg-gris-200 group-hover:bg-verde-300 transition-colors" />
              )}
              {index === crop.stages.length - 1 && <div className="flex-1" />}
            </div>

            {/* Emoji + nombre + días */}
            <div className="text-center px-1">
              <div className="text-2xl mb-0.5" aria-hidden="true">
                {stage.emoji}
              </div>
              <p className="text-xs font-semibold text-gris-700 group-hover:text-verde-700 transition-colors leading-tight">
                {stage.name}
              </p>
              <p className="text-[10px] text-gris-400 mt-0.5">
                {stage.durationDays}d
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* Mobile: lista vertical */}
      <ol className="sm:hidden flex flex-col gap-0">
        {crop.stages.map((stage, index) => (
          <li key={stage.id} className="flex gap-3">
            {/* Línea vertical + dot */}
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-verde-100 border-2 border-verde-400 flex items-center justify-center text-xs font-bold text-verde-700 shrink-0">
                {index + 1}
              </div>
              {index < crop.stages.length - 1 && (
                <div className="w-0.5 flex-1 bg-gris-200 my-1" />
              )}
            </div>

            {/* Contenido */}
            <a
              href={`#stage-${stage.id}`}
              className="flex items-center gap-2 pb-4 group"
            >
              <span className="text-xl" aria-hidden="true">
                {stage.emoji}
              </span>
              <div>
                <p className="text-sm font-semibold text-gris-800 group-hover:text-verde-700 transition-colors">
                  {stage.name}
                </p>
                <p className="text-xs text-gris-400">{stage.durationDays} días</p>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </div>
  )
}

/** Tabla de productos de una etapa (desktop) + tarjetas (mobile) */
function StageProductsTable({ products }: { products: StageProduct[] }) {
  if (products.length === 0) return null

  return (
    <>
      {/* Desktop: tabla */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-gris-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gris-50 border-b border-gris-100">
              <th className="text-left px-4 py-3 font-semibold text-gris-600 text-xs uppercase tracking-wide">
                Producto
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gris-600 text-xs uppercase tracking-wide">
                Dosis
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gris-600 text-xs uppercase tracking-wide">
                Método
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gris-600 text-xs uppercase tracking-wide">
                Frecuencia
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gris-600 text-xs uppercase tracking-wide">
                Notas
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gris-50">
            {products.map((p) => {
              const line = getProductLine(p.productId)
              return (
                <tr
                  key={p.productId}
                  className="bg-white hover:bg-gris-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <Link
                        href={getProductHref(p.productId)}
                        className="font-semibold text-gris-900 hover:text-verde-700 transition-colors"
                      >
                        {p.productName}
                      </Link>
                      {line && <Badge line={line as ProductLine} size="sm" />}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-sm text-gris-800">
                    {p.dose}
                  </td>
                  <td className="px-4 py-3 text-gris-600">{p.method}</td>
                  <td className="px-4 py-3 text-gris-600">{p.frequency}</td>
                  <td className="px-4 py-3 text-gris-500 text-xs max-w-[220px]">
                    {p.notes ?? '—'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile: tarjetas apiladas */}
      <div className="md:hidden flex flex-col gap-3">
        {products.map((p) => {
          const line = getProductLine(p.productId)
          return (
            <div
              key={p.productId}
              className="rounded-xl border border-gris-100 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <Link
                  href={getProductHref(p.productId)}
                  className="font-semibold text-gris-900 hover:text-verde-700 transition-colors leading-snug"
                >
                  {p.productName}
                </Link>
                {line && <Badge line={line as ProductLine} size="sm" />}
              </div>

              <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-wide text-gris-400">
                    Dosis
                  </dt>
                  <dd className="font-mono text-gris-800">{p.dose}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-wide text-gris-400">
                    Método
                  </dt>
                  <dd className="text-gris-700">{p.method}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-[10px] font-semibold uppercase tracking-wide text-gris-400">
                    Frecuencia
                  </dt>
                  <dd className="text-gris-700">{p.frequency}</dd>
                </div>
                {p.notes && (
                  <div className="col-span-2">
                    <dt className="text-[10px] font-semibold uppercase tracking-wide text-gris-400">
                      Notas
                    </dt>
                    <dd className="text-gris-500 text-xs">{p.notes}</dd>
                  </div>
                )}
              </dl>
            </div>
          )
        })}
      </div>
    </>
  )
}

/** Sección de etapa fenológica individual */
function StageSection({ stage }: { stage: CropStage }) {
  const nutritionProducts = stage.products.filter((p) => !p.isProtection)
  const protectionProducts = stage.products.filter((p) => p.isProtection)

  return (
    <section
      id={`stage-${stage.id}`}
      className="scroll-mt-24 flex flex-col gap-6"
    >
      {/* Header de la etapa */}
      <div
        className={cn(
          'flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl p-5',
          stage.color,
        )}
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl sm:text-4xl" aria-hidden="true">
            {stage.emoji}
          </span>
          <div>
            <span
              className={cn(
                'text-xs font-bold uppercase tracking-widest',
                stage.textColor,
              )}
            >
              Etapa
            </span>
            <h3
              className={cn(
                'font-serif text-xl sm:text-2xl font-semibold leading-tight',
                stage.textColor,
              )}
            >
              {stage.name}
            </h3>
          </div>
        </div>
        <div className="sm:ml-auto flex flex-wrap gap-2">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-white/60',
              stage.textColor,
            )}
          >
            <Clock className="h-3 w-3" aria-hidden="true" />
            {stage.durationDays} días
          </span>
        </div>
      </div>

      {/* Objetivo de la etapa */}
      <div className="flex items-start gap-2 text-gris-600">
        <Target
          className="h-4 w-4 text-verde-600 mt-0.5 shrink-0"
          aria-hidden="true"
        />
        <p className="text-sm leading-relaxed">{stage.objective}</p>
      </div>

      {/* Productos de nutrición */}
      {nutritionProducts.length > 0 && (
        <StageProductsTable products={nutritionProducts} />
      )}

      {/* Productos de bioprotección */}
      {protectionProducts.length > 0 && (
        <div className="rounded-xl border border-azul-200 bg-azul-50 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-azul-100 border-b border-azul-200">
            <Shield
              className="h-4 w-4 text-azul-600"
              aria-hidden="true"
            />
            <h4 className="font-semibold text-azul-700 text-sm">
              🛡️ Bioprotección recomendada
            </h4>
          </div>
          <div className="p-4">
            <StageProductsTable products={protectionProducts} />
          </div>
        </div>
      )}
    </section>
  )
}

// ─── Página principal ─────────────────────────────────────────────────────

export default async function CultivoPage({
  params,
}: {
  params: Promise<{ cultivo: string }>
}) {
  const { cultivo } = await params
  const crop = getCropBySlug(cultivo)

  if (!crop) {
    notFound()
  }

  const allProducts = getAllUniqueProducts(crop)

  return (
    <main className="min-h-screen bg-white">
      {/* ── Breadcrumb ────────────────────────────────────────────────── */}
      <div className="bg-gris-50 border-b border-gris-100">
        <Container>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 py-3 text-xs text-gris-500"
          >
            <Link href="/" className="hover:text-verde-700 transition-colors">
              Inicio
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0" aria-hidden="true" />
            <Link
              href="/cultivos"
              className="hover:text-verde-700 transition-colors"
            >
              Cultivos
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0" aria-hidden="true" />
            <span className="font-semibold text-gris-800">{crop.name}</span>
          </nav>
        </Container>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section
        className={`bg-gradient-to-br ${crop.gradient} py-16 lg:py-20 relative overflow-hidden`}
      >
        {/* Decoración de fondo */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 70% 50%, white 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <div className="max-w-3xl">
            {/* Emoji del cultivo */}
            <div className="text-8xl sm:text-9xl mb-6 animate-bounce-slow">
              {crop.emoji}
            </div>

            {/* Eyebrow */}
            <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-2">
              Programa de Nutrición para
            </p>

            {/* Nombre del cultivo */}
            <h1 className="font-serif text-4xl sm:text-5xl text-white font-normal leading-tight mb-3">
              {crop.name}
            </h1>

            {/* Nombre científico */}
            {crop.scientific_name && (
              <p className="text-white/60 italic text-lg mb-5">
                {crop.scientific_name}
              </p>
            )}

            {/* Descripción */}
            <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
              {crop.description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 mb-8">
              {crop.cycle_days && (
                <div className="bg-white/15 rounded-xl px-4 py-3 text-center">
                  <p className="text-2xl font-bold text-white">
                    {crop.cycle_days}
                  </p>
                  <p className="text-white/70 text-xs uppercase tracking-wide mt-0.5">
                    días de ciclo
                  </p>
                </div>
              )}
              <div className="bg-white/15 rounded-xl px-4 py-3 text-center">
                <p className="text-2xl font-bold text-white">
                  {crop.stages.length}
                </p>
                <p className="text-white/70 text-xs uppercase tracking-wide mt-0.5">
                  etapas
                </p>
              </div>
              {crop.regions && crop.regions.length > 0 && (
                <div className="bg-white/15 rounded-xl px-4 py-3 text-center">
                  <p className="text-base font-bold text-white">
                    {crop.regions[0]}
                  </p>
                  <p className="text-white/70 text-xs uppercase tracking-wide mt-0.5">
                    región principal
                  </p>
                </div>
              )}
            </div>

            {/* Desafíos comunes como pills */}
            {crop.common_challenges && crop.common_challenges.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <span className="text-white/60 text-xs font-semibold uppercase tracking-wide self-center">
                  Desafíos:
                </span>
                {crop.common_challenges.map((challenge) => (
                  <span
                    key={challenge}
                    className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/90"
                  >
                    <AlertTriangle
                      className="h-3 w-3 text-white/60"
                      aria-hidden="true"
                    />
                    {challenge}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ── Línea de tiempo ───────────────────────────────────────────── */}
      <section className="py-10 bg-gris-50 border-b border-gris-100">
        <Container>
          <PhenologicalTimeline crop={crop} />
        </Container>
      </section>

      {/* ── Contenido principal + sidebar ─────────────────────────────── */}
      <section className="py-12 lg:py-16">
        <Container>
          <div className="grid lg:grid-cols-[1fr_280px] gap-10 items-start">
            {/* ── Columna principal: etapas ──────────────────────────── */}
            <div className="flex flex-col gap-12">
              {crop.stages.map((stage) => (
                <StageSection key={stage.id} stage={stage} />
              ))}
            </div>

            {/* ── Sidebar (solo desktop) ─────────────────────────────── */}
            <aside className="hidden lg:flex flex-col gap-6 sticky top-24">
              {/* Todos los productos del programa */}
              <div className="rounded-2xl border border-gris-100 bg-white shadow-sm overflow-hidden">
                <div className="bg-gris-50 border-b border-gris-100 px-4 py-3">
                  <h3 className="font-semibold text-gris-800 text-sm flex items-center gap-2">
                    <Leaf
                      className="h-4 w-4 text-verde-600"
                      aria-hidden="true"
                    />
                    Todos los productos de este programa
                  </h3>
                </div>
                <ul className="divide-y divide-gris-50">
                  {allProducts.map((p) => {
                    const line = getProductLine(p.productId)
                    return (
                      <li key={p.productId}>
                        <Link
                          href={getProductHref(p.productId)}
                          className="flex items-center justify-between gap-2 px-4 py-2.5 hover:bg-gris-50 transition-colors group"
                        >
                          <span className="text-sm text-gris-700 group-hover:text-verde-700 transition-colors font-medium leading-snug">
                            {p.productName}
                          </span>
                          {line && (
                            <Badge
                              line={line as ProductLine}
                              size="sm"
                              showDot={false}
                            />
                          )}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* Desafíos comunes */}
              {crop.common_challenges &&
                crop.common_challenges.length > 0 && (
                  <div className="rounded-2xl border border-amber-100 bg-amber-50 overflow-hidden">
                    <div className="bg-amber-100 border-b border-amber-200 px-4 py-3">
                      <h3 className="font-semibold text-amber-800 text-sm flex items-center gap-2">
                        <AlertTriangle
                          className="h-4 w-4 text-amber-600"
                          aria-hidden="true"
                        />
                        Desafíos comunes
                      </h3>
                    </div>
                    <ul className="px-4 py-3 flex flex-col gap-2">
                      {crop.common_challenges.map((challenge) => (
                        <li
                          key={challenge}
                          className="flex items-center gap-2 text-sm text-amber-800"
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0"
                            aria-hidden="true"
                          />
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* CTA WhatsApp */}
              <div
                className={`rounded-2xl bg-gradient-to-br ${crop.gradient} p-5 text-center`}
              >
                <p className="font-serif text-lg text-white mb-1">
                  Solicitar programa
                </p>
                <p className="text-white/75 text-xs mb-4">
                  Para tu {crop.name} específico
                </p>
                <a
                  href={`https://wa.me/523300000000?text=Hola%2C%20necesito%20un%20programa%20de%20nutrici%C3%B3n%20para%20mi%20cultivo%20de%20${encodeURIComponent(crop.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-white/20 border border-white/30 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/30 transition-colors"
                >
                  Hablar con agrónomo
                </a>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* ── CTA final ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-verde-50 border-t border-verde-100">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-5xl mb-4" aria-hidden="true">
              {crop.emoji}
            </div>
            <h2 className="font-serif text-3xl text-gris-900 mb-4">
              ¿Listo para optimizar tu {crop.name}?
            </h2>
            <p className="text-gris-600 mb-8 text-base leading-relaxed">
              Nuestros agrónomos pueden personalizar este programa según tus
              condiciones de suelo, clima y variedad. Solicita tu cotización hoy.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/cotizacion"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-verde-600 px-6 py-3 text-white font-semibold hover:bg-verde-700 transition-colors"
              >
                <CheckCircle className="h-4 w-4" aria-hidden="true" />
                Solicitar cotización
              </Link>
              <a
                href={`https://wa.me/523300000000?text=Hola%2C%20quiero%20hablar%20con%20un%20agr%C3%B3nomo%20sobre%20mi%20cultivo%20de%20${encodeURIComponent(crop.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-verde-600 px-6 py-3 text-verde-700 font-semibold hover:bg-verde-50 transition-colors"
              >
                Hablar con agrónomo
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Navegación inferior ───────────────────────────────────────── */}
      <div className="py-6 border-t border-gris-100 bg-white">
        <Container>
          <Link
            href="/cultivos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gris-600 hover:text-verde-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Volver a Cultivos
          </Link>
        </Container>
      </div>
    </main>
  )
}
