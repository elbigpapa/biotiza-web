/**
 * /cultivos/[cultivo]/ficha — Ficha técnica de manejo Biotiza (imprimible)
 *
 * Hoja limpia, lista para "Guardar como PDF" o imprimir y llevar al campo.
 * Contiene el manejo Biotiza completo del cultivo: retos, programa por etapa
 * fenológica (producto · dosis · método · frecuencia · notas) y contacto.
 *
 * Server Component. El único cliente es el botón de impresión.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { CROP_PROTOCOLS, getCropBySlug } from '@/data/crops'
import type { FullCropProtocol, StageProduct } from '@/data/crops'
import { PRODUCT_LINES, CONTACT_INFO } from '@/data/constants'
import PrintFichaButton from '@/components/crops/PrintFichaButton'

export function generateStaticParams() {
  return CROP_PROTOCOLS.map((crop) => ({ cultivo: crop.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cultivo: string }>
}): Promise<Metadata> {
  const { cultivo } = await params
  const crop = getCropBySlug(cultivo)
  if (!crop) return { title: 'Ficha no encontrada — Biotiza' }
  return {
    title: `Ficha de manejo ${crop.name} (PDF) | Biotiza`,
    description: `Programa de manejo Biotiza para ${crop.name}: retos, productos, dosis y frecuencia por etapa fenológica. Lista para descargar o imprimir.`,
    robots: { index: false, follow: true },
  }
}

function lineName(lineId: string): string {
  return PRODUCT_LINES.find((l) => l.id === lineId)?.name ?? lineId
}

function uniqueProducts(crop: FullCropProtocol): StageProduct[] {
  const seen = new Set<string>()
  const out: StageProduct[] = []
  for (const stage of crop.stages) {
    for (const p of stage.products) {
      if (!seen.has(p.productId)) {
        seen.add(p.productId)
        out.push(p)
      }
    }
  }
  return out
}

function ProductRows({ products }: { products: StageProduct[] }) {
  return (
    <table className="w-full border-collapse text-[12px] leading-snug">
      <thead>
        <tr className="bg-verde-50 text-left text-gris-700">
          <th className="border border-gris-200 px-2 py-1.5 font-semibold">Producto</th>
          <th className="border border-gris-200 px-2 py-1.5 font-semibold">Dosis</th>
          <th className="border border-gris-200 px-2 py-1.5 font-semibold">Método</th>
          <th className="border border-gris-200 px-2 py-1.5 font-semibold">Frecuencia</th>
          <th className="border border-gris-200 px-2 py-1.5 font-semibold">Notas</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.productId} className="align-top">
            <td className="border border-gris-200 px-2 py-1.5">
              <span className="font-semibold text-gris-900">{p.productName}</span>
              <span className="block text-[10px] uppercase tracking-wide text-gris-400">
                {lineName(p.line)}
                {p.isProtection ? ' · Bioprotección' : ''}
              </span>
            </td>
            <td className="border border-gris-200 px-2 py-1.5 font-mono text-gris-800">{p.dose}</td>
            <td className="border border-gris-200 px-2 py-1.5 text-gris-700">{p.method}</td>
            <td className="border border-gris-200 px-2 py-1.5 text-gris-700">{p.frequency}</td>
            <td className="border border-gris-200 px-2 py-1.5 text-gris-500">{p.notes ?? '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default async function FichaCultivoPage({
  params,
}: {
  params: Promise<{ cultivo: string }>
}) {
  const { cultivo } = await params
  const crop = getCropBySlug(cultivo)
  if (!crop) notFound()

  const all = uniqueProducts(crop)
  const waText = encodeURIComponent(
    `Hola Biotiza, quiero el programa de manejo personalizado para mi cultivo de ${crop.name}.`,
  )

  return (
    <div className="bg-gris-50 py-8 print:bg-white print:py-0">
      <div className="mx-auto max-w-[860px] px-4 sm:px-6 print:px-0">
        {/* Barra de acciones (no se imprime) */}
        <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/cultivos/${crop.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gris-600 transition-colors hover:text-verde-700"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Volver a {crop.name}
          </Link>
          <PrintFichaButton />
        </div>

        {/* ── Hoja imprimible ─────────────────────────────────────────── */}
        <article className="ficha-print rounded-2xl bg-white p-8 shadow-sm print:rounded-none print:p-0 print:shadow-none">
          {/* Encabezado de marca */}
          <header className="flex items-end justify-between border-b-2 border-verde-600 pb-4">
            <div>
              <p className="font-serif text-3xl leading-none text-verde-700">Biotiza</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-gris-500">
                Biosoluciones Agrícolas · biotiza.mx
              </p>
            </div>
            <p className="text-right text-sm font-semibold uppercase tracking-wide text-gris-500">
              Ficha técnica
              <br />
              de manejo
            </p>
          </header>

          {/* Título del cultivo */}
          <div className="mt-6 flex items-start gap-3">
            <span className="text-4xl leading-none" aria-hidden="true">
              {crop.emoji}
            </span>
            <div>
              <h1 className="font-serif text-3xl text-gris-900">
                Programa de manejo para {crop.name}
              </h1>
              {crop.scientific_name && (
                <p className="italic text-gris-500">{crop.scientific_name}</p>
              )}
            </div>
          </div>

          {/* Meta */}
          <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-4">
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wide text-gris-400">Ciclo</dt>
              <dd className="text-gris-800">{crop.cycle_days} días</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wide text-gris-400">Etapas</dt>
              <dd className="text-gris-800">{crop.stages.length} fenológicas</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-[10px] font-semibold uppercase tracking-wide text-gris-400">Regiones</dt>
              <dd className="text-gris-800">{crop.regions.join(' · ')}</dd>
            </div>
            <div className="col-span-2 sm:col-span-4">
              <dt className="text-[10px] font-semibold uppercase tracking-wide text-gris-400">Temporada</dt>
              <dd className="text-gris-800">{crop.season}</dd>
            </div>
          </dl>

          {/* Descripción */}
          <p className="mt-5 text-sm leading-relaxed text-gris-700">{crop.description}</p>

          {/* Retos del cultivo */}
          {crop.common_challenges?.length > 0 && (
            <section className="mt-6 break-inside-avoid rounded-xl border border-amber-200 bg-amber-50 p-4">
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-amber-800">
                Retos de este cultivo
              </h2>
              <p className="text-sm text-amber-900">
                {crop.common_challenges.join(' · ')}
              </p>
              <p className="mt-2 text-xs text-amber-700">
                El programa Biotiza de abajo está diseñado para prevenir y resolver
                estos retos en cada etapa.
              </p>
            </section>
          )}

          {/* Programa por etapa */}
          <h2 className="mt-8 font-serif text-2xl text-gris-900">
            Manejo Biotiza por etapa fenológica
          </h2>
          <div className="mt-4 flex flex-col gap-6">
            {crop.stages.map((stage, i) => (
              <section key={stage.id} className="break-inside-avoid">
                <h3 className="flex items-baseline gap-2 border-b border-gris-200 pb-1.5 text-lg font-semibold text-gris-900">
                  <span aria-hidden="true">{stage.emoji}</span>
                  <span>
                    {i + 1}. {stage.name}
                  </span>
                  <span className="ml-auto text-xs font-normal text-gris-400">
                    {stage.durationDays} días
                  </span>
                </h3>
                <p className="mb-2 mt-2 text-xs italic text-gris-600">{stage.objective}</p>
                <ProductRows products={stage.products} />
              </section>
            ))}
          </div>

          {/* Resumen de productos */}
          <section className="mt-8 break-inside-avoid">
            <h2 className="mb-2 font-serif text-xl text-gris-900">
              Productos del programa ({all.length})
            </h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-[12px] text-gris-700 sm:grid-cols-3">
              {all.map((p) => (
                <li key={p.productId}>
                  <span className="font-semibold text-gris-900">{p.productName}</span>{' '}
                  <span className="text-gris-400">· {lineName(p.line)}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Contacto + CTA */}
          <section className="mt-8 break-inside-avoid rounded-xl border border-verde-200 bg-verde-50 p-5">
            <h2 className="font-serif text-xl text-verde-800">
              Solicita tu programa personalizado
            </h2>
            <p className="mt-1 text-sm text-verde-900">
              Nuestros agrónomos ajustan este manejo a tu suelo, clima, variedad y
              metas de rendimiento, sin costo de asesoría.
            </p>
            <div className="mt-3 grid gap-1 text-sm text-gris-800 sm:grid-cols-2">
              <p>
                <strong>WhatsApp:</strong> +52 33 1602 2708
              </p>
              <p>
                <strong>Email:</strong> {CONTACT_INFO.email}
              </p>
              <p>
                <strong>Web:</strong> biotiza.mx
              </p>
              <p>
                <strong>Ubicación:</strong> {CONTACT_INFO.address}
              </p>
            </div>
          </section>

          <footer className="mt-6 border-t border-gris-200 pt-3 text-[10px] text-gris-400">
            Generado desde biotiza.mx · Las dosis son orientativas y deben validarse
            con análisis de suelo/agua y la supervisión de un agrónomo Biotiza ·
            Certificaciones COFEPRIS · OMRI Listed · Hecho en México.
          </footer>
        </article>

        {/* Acciones inferiores (no se imprime) */}
        <div className="no-print mt-6 flex flex-wrap items-center justify-center gap-3">
          <PrintFichaButton />
          <a
            href={`https://wa.me/523316022708?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-verde-600 px-5 py-2.5 text-sm font-semibold text-verde-700 transition-colors hover:bg-verde-50"
          >
            Solicitar programa por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
