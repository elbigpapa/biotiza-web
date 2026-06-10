/**
 * cultivos/[cultivo]/page.tsx — Detalle de cultivo editorial · Sub-fase 3.4b
 * Reemplaza biotiza-web/src/app/cultivos/[cultivo]/page.tsx
 *
 * PIEZA CRÍTICA del rediseño:
 *  - Hero cinematográfico con foto del cultivo + display 192px
 *  - Ficha técnica de 3 columnas (nombre científico, regiones, retos)
 *  - Timeline visual de etapas
 *  - Tabla académica de productos por etapa (dosis · método · frecuencia · notas)
 *  - Bloque destacado de bioprotección en cada etapa
 *  - Sidebar sticky con todos los productos del programa
 *  - Print CSS para PDF estilo tesis científica (ya en globals.css)
 *
 * Server Component.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { CROP_PROTOCOLS, getCropBySlug } from '@/data/crops'
import type { CropStage, StageProduct } from '@/data/crops'
import { PRODUCTS } from '@/data/products'
import { getCropImage } from '@/data/crop-images'
import { getProductImage } from '@/data/product-images'
import { canonical } from '@/lib/seo'
import Container from '@/components/ui/Container'
import PrintFichaButton from '@/components/crops/PrintFichaButton'
import TrackCultivoView from '@/components/analytics/TrackCultivoView'

export function generateStaticParams() {
  return CROP_PROTOCOLS.map((c) => ({ cultivo: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cultivo: string }>
}): Promise<Metadata> {
  const { cultivo } = await params
  const crop = getCropBySlug(cultivo)
  if (!crop) return { title: 'Cultivo no encontrado' }
  return {
    title: `Programa de Nutrición para ${crop.name}`,
    description: `Protocolo completo de nutrición para ${crop.name}: ${crop.stages.length} etapas, productos con dosis y método de aplicación.`,
    ...canonical(`/cultivos/${crop.slug}`),
  }
}

function getProductHref(productId: string): string {
  const p = PRODUCTS.find((x) => x.id === productId)
  if (!p) return '/soluciones'
  return `/soluciones/${p.line}/${p.slug}`
}

function getAllUniqueProducts(stages: CropStage[]) {
  const seen = new Set<string>()
  const out: StageProduct[] = []
  for (const st of stages) {
    for (const p of st.products) {
      if (!seen.has(p.productId)) {
        seen.add(p.productId)
        out.push(p)
      }
    }
  }
  return out
}

/* ── JSON-LD · BreadcrumbList (Inicio → Cultivos → {cultivo}) ─────────── */
function CropBreadcrumbJsonLd({ name, slug }: { name: string; slug: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio',   item: 'https://biotiza.mx' },
      { '@type': 'ListItem', position: 2, name: 'Cultivos', item: 'https://biotiza.mx/cultivos' },
      { '@type': 'ListItem', position: 3, name,             item: `https://biotiza.mx/cultivos/${slug}` },
    ],
  }
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  )
}

/* ── Tabla técnica de productos por etapa ────────────────────────────── */
function ProductTable({ products, dark = false }: { products: StageProduct[]; dark?: boolean }) {
  if (products.length === 0) return null
  return (
    <div className="overflow-x-auto">
      <table className={`w-full border-collapse ${dark ? 'text-white' : 'text-ink'} font-sans`}>
        <thead>
          <tr className={dark ? 'border-b border-white/20' : 'border-b border-ink'}>
            <th className={`text-left p-3.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] whitespace-nowrap ${dark ? 'text-white/50' : 'text-ink-4'}`}>
              Producto
            </th>
            <th className={`text-left p-3.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] whitespace-nowrap ${dark ? 'text-white/50' : 'text-ink-4'}`}>
              Dosis
            </th>
            <th className={`text-left p-3.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] whitespace-nowrap ${dark ? 'text-white/50' : 'text-ink-4'}`}>
              Método
            </th>
            <th className={`text-left p-3.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] whitespace-nowrap ${dark ? 'text-white/50' : 'text-ink-4'}`}>
              Frecuencia
            </th>
            <th className={`text-left p-3.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] whitespace-nowrap ${dark ? 'text-white/50' : 'text-ink-4'}`}>
              Notas técnicas
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => {
            const photo = getProductImage(p.productId)
            const last = i === products.length - 1
            return (
              <tr key={p.productId} className={last ? '' : dark ? 'border-b border-white/10' : 'border-b border-rule'}>
                <td className="p-3.5 align-top w-[220px]">
                  <Link href={getProductHref(p.productId)} className="flex items-center gap-3">
                    {photo ? (
                      <Image src={photo.src} alt={photo.alt} width={48} height={60}
                             className="w-10 h-[50px] object-contain shrink-0" />
                    ) : (
                      <span className={`w-10 h-[50px] flex items-center justify-center font-serif text-[13px] shrink-0 ${dark ? 'bg-white/10 text-white/50' : 'bg-paper-2 text-ink-3'}`}>
                        {p.productName.split(' ').map(w => w[0]).slice(0, 2).join('')}
                      </span>
                    )}
                    <span className="font-semibold text-[15px] hover:underline">{p.productName}</span>
                  </Link>
                </td>
                <td className={`p-3.5 align-top font-mono text-[13px] ${dark ? 'text-verde-300' : 'text-verde-700'}`}>
                  {p.dose ?? '—'}
                </td>
                <td className="p-3.5 align-top text-[13px]">{p.method ?? '—'}</td>
                <td className="p-3.5 align-top text-[13px]">{p.frequency ?? '—'}</td>
                <td className={`p-3.5 align-top text-[12px] leading-relaxed max-w-[280px] ${dark ? 'text-white/65' : 'text-ink-3'}`}>
                  {p.notes ?? '—'}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

/* ─── Página principal ────────────────────────────────────────────────── */
export default async function CultivoDetailPage({
  params,
}: {
  params: Promise<{ cultivo: string }>
}) {
  const { cultivo } = await params
  const crop = getCropBySlug(cultivo)
  if (!crop) notFound()

  const totalDays = crop.stages.reduce((s, st) => s + st.durationDays, 0)
  const allProducts = getAllUniqueProducts(crop.stages)
  const photo = getCropImage(crop.slug)

  return (
    <div className="bg-white">
      <CropBreadcrumbJsonLd name={crop.name} slug={crop.slug} />
      <TrackCultivoView slug={crop.slug} name={crop.name} hasProtocol={(crop.stages?.length ?? 0) > 0} />
      {/* ─── HERO editorial cinematográfico ─────────────────────────── */}
      <section
        className="relative min-h-[78vh] overflow-hidden flex flex-col justify-end"
        style={{
          backgroundImage: photo?.src
            ? `linear-gradient(180deg, rgba(8,46,33,0.30) 0%, rgba(8,46,33,0.65) 55%, rgba(8,46,33,0.95) 100%), url(${photo.src})`
            : undefined,
          backgroundColor: '#082e21',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container className="relative z-[1] py-[160px_60px] text-white">
          <div className="flex justify-between items-baseline font-mono text-[11px] tracking-[0.2em] uppercase text-white/70 font-semibold mb-7 pb-4 border-b border-white/20">
            <span>
              Expediente N° {String(CROP_PROTOCOLS.indexOf(crop) + 1).padStart(2, '0')}
            </span>
            <span className="font-serif italic normal-case tracking-[-0.01em] text-sm text-white/85" style={{ fontFamily: 'var(--serif-it)' }}>
              {crop.scientific_name}
            </span>
          </div>

          <h1 className="title-hero text-white max-w-[14ch]">{crop.name}</h1>

          {crop.description && (
            <p className="mt-7 max-w-[60ch] text-[clamp(15px,1.4vw,19px)] leading-[1.55] text-white/88">
              {crop.description}
            </p>
          )}

          <div className="mt-9 flex flex-wrap gap-9 pt-6 border-t border-white/20 font-mono text-[11px] tracking-[0.18em] uppercase font-semibold text-white/78">
            <span><span className="text-verde-300 mr-1.5">{crop.cycle_days}</span>días</span>
            <span><span className="text-verde-300 mr-1.5">{crop.stages.length}</span>etapas</span>
            <span><span className="text-verde-300 mr-1.5">{crop.regions?.length ?? 0}</span>regiones</span>
            <span><span className="text-verde-300 mr-1.5">{allProducts.length}</span>productos</span>
            <span className="ml-auto">{crop.season}</span>
          </div>

          <div className="mt-9 flex gap-3.5 flex-wrap" data-no-print>
            <Link
              href={`/cotizacion?cultivo=${crop.slug}`}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-naranja-500 text-white font-mono text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-naranja-600 hover:-translate-y-0.5 transition-all duration-300"
            >
              Solicitar visita técnica →
            </Link>
            <PrintFichaButton label="Descargar / imprimir PDF" />
          </div>
        </Container>
      </section>

      {/* ─── Ficha técnica: 3 columnas ─────────────────────────────── */}
      <section className="bg-paper py-20 lg:py-24 border-b border-rule">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            <div>
              <p className="eyebrow-edit eyebrow-muted">— Nombre científico</p>
              <h3 className="font-serif italic text-[clamp(28px,3.4vw,42px)] leading-[1.05] tracking-[-0.025em] mt-4 text-verde-700" style={{ fontFamily: 'var(--serif-it)' }}>
                {crop.scientific_name}
              </h3>
              <p className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3 font-semibold">
                Familia · {crop.scientific_name?.split(' ')[0]}
              </p>
            </div>
            <div>
              <p className="eyebrow-edit eyebrow-muted">— Regiones productoras</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {crop.regions?.map(r => (
                  <span key={r} className="px-3 py-2 border border-ink font-mono text-[11px] font-semibold tracking-[0.12em] uppercase text-ink">
                    {r}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow-edit eyebrow-orange">— Retos típicos</p>
              <ul className="mt-4 font-mono text-[12px] text-ink-2 leading-[1.9] tracking-[0.04em] list-none p-0">
                {crop.common_challenges?.map((ch, i) => (
                  <li key={ch} className="flex gap-2.5 items-baseline">
                    <span className="text-naranja-500 font-semibold">{String(i + 1).padStart(2, '0')}</span>
                    <span>{ch}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Línea de tiempo + protocolo etapa por etapa ───────────── */}
      <section className="bg-white py-24 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-10 lg:gap-20 items-end mb-14">
            <div>
              <p className="eyebrow-edit mb-6">
                — Protocolo · {crop.stages.length} etapas · {totalDays} días estimados
              </p>
              <h2 className="title-display max-w-[16ch] mb-6">
                Línea de <em>tiempo</em><br />del ciclo completo.
              </h2>
              <p className="dek-edit text-ink-2 max-w-[60ch]">
                Cada etapa con sus productos recomendados. Las dosis específicas,
                mezclas y calendario final se ajustan en visita técnica con el
                agrónomo asignado.
              </p>
            </div>
            <div className="self-end">
              <div className="font-serif text-[clamp(72px,10vw,144px)] leading-[0.85] tracking-[-0.04em] text-ink">
                {totalDays}
                <em className="font-serif italic text-ink-3 text-[0.4em] align-[12%] ml-1" style={{ fontFamily: 'var(--serif-it)' }}>
                  {' '}días
                </em>
              </div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-3 mt-3 max-w-[30ch] leading-relaxed">
                Duración total del protocolo orientativo · ajustable a tu variedad y zona
              </p>
            </div>
          </div>

          {/* Timeline visual */}
          <div className="mt-8 mb-14" data-no-print>
            <div
              className="grid gap-0.5 mb-4"
              style={{ gridTemplateColumns: crop.stages.map(s => `${s.durationDays}fr`).join(' ') }}
            >
              {crop.stages.map((st, i) => (
                <a
                  key={st.id}
                  href={`#stage-${st.id}`}
                  className={`h-20 flex flex-col items-center justify-center gap-1 text-white text-center px-1 py-2 ${i % 2 === 0 ? 'bg-verde-700' : 'bg-naranja-500'}`}
                >
                  <span className="font-mono text-[10px] font-semibold tracking-[0.14em] uppercase opacity-70">
                    N° {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-serif text-[clamp(14px,1.4vw,18px)] leading-[1.1] tracking-[-0.02em]">
                    {st.durationDays}d
                  </span>
                </a>
              ))}
            </div>
            <div className="flex justify-between font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-ink-4">
              <span>Día 0 · inicio del ciclo</span>
              <span>Día {totalDays} · cosecha</span>
            </div>
          </div>

          {/* Grid principal: etapas + sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-10 lg:gap-14 items-start">
            <div className="flex flex-col gap-14">
              {crop.stages.map((st, i) => {
                const dayFrom = crop.stages.slice(0, i).reduce((s, p) => s + p.durationDays, 0)
                const dayTo = dayFrom + st.durationDays
                const nutritionProducts = st.products.filter(p => !p.isProtection)
                const protectionProducts = st.products.filter(p => p.isProtection)
                return (
                  <div key={st.id} id={`stage-${st.id}`} className="scroll-mt-24 protocol-stage">
                    <div className="border-t-2 border-ink pt-6 grid grid-cols-[80px_1fr_auto] gap-5 items-baseline mb-6">
                      <span
                        className={`font-serif text-[clamp(48px,6vw,80px)] leading-[0.9] tracking-[-0.04em] ${i % 2 === 0 ? 'text-verde-700' : 'text-naranja-500'}`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="font-serif text-[clamp(28px,3.4vw,44px)] leading-[1.05] tracking-[-0.03em] mb-1.5">
                          {st.name}
                        </h3>
                        <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-4 font-semibold">
                          {st.durationDays} días · día {dayFrom} a {dayTo}
                        </div>
                      </div>
                    </div>

                    {st.objective && (
                      <p
                        className="font-serif italic text-[clamp(17px,1.6vw,22px)] leading-[1.4] tracking-[-0.01em] text-ink-2 max-w-[60ch] mb-8"
                        style={{ fontFamily: 'var(--serif-it)' }}
                      >
                        {st.objective}
                      </p>
                    )}

                    {nutritionProducts.length > 0 && (
                      <div className="mb-6">
                        <ProductTable products={nutritionProducts} />
                      </div>
                    )}

                    {protectionProducts.length > 0 && (
                      <div className="bg-ink text-white mt-4">
                        <div className="px-4 py-3 border-b border-white/20 flex items-center gap-2.5 font-mono text-[10px] font-semibold tracking-[0.2em] uppercase text-azul-300">
                          ● Bioprotección recomendada
                        </div>
                        <ProductTable products={protectionProducts} dark />
                      </div>
                    )}
                  </div>
                )
              })}

              <p className="mt-5 pt-5 border-t border-rule font-mono text-[11px] tracking-[0.14em] uppercase text-ink-4 font-semibold leading-[1.7] max-w-[90ch]">
                Nota · Protocolo orientativo basado en condiciones promedio. Dosis,
                mezclas y calendario final se calibran en visita técnica con el
                agrónomo asignado, considerando tu zona, agua de riego, sustrato,
                variedad y objetivo de producción.
              </p>
            </div>

            {/* Sidebar sticky */}
            <aside className="sticky top-24 self-start hidden lg:block" data-no-print>
              <div className="bg-white border border-ink">
                <div className="p-4 bg-paper-2 border-b border-ink font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-ink-2">
                  Productos del programa · {allProducts.length}
                </div>
                <div className="flex flex-col">
                  {allProducts.map((p, i) => {
                    const ph = getProductImage(p.productId)
                    return (
                      <Link
                        key={p.productId}
                        href={getProductHref(p.productId)}
                        className={`grid grid-cols-[36px_1fr_16px] gap-3 items-center px-4 py-3 hover:bg-paper transition-colors ${i < allProducts.length - 1 ? 'border-b border-rule' : ''}`}
                      >
                        {ph ? (
                          <Image src={ph.src} alt={ph.alt} width={36} height={36} className="w-9 h-9 object-contain" />
                        ) : (
                          <span className="w-9 h-9 bg-paper-2 flex items-center justify-center font-serif text-sm text-ink-3">
                            {p.productName.split(' ').map(w => w[0]).slice(0, 2).join('')}
                          </span>
                        )}
                        <div>
                          <div className="text-[13px] font-medium text-ink leading-tight">{p.productName}</div>
                          {p.isProtection && (
                            <div className="font-mono text-[9px] font-semibold tracking-[0.14em] uppercase text-azul-600 mt-0.5">
                              Bioprotección
                            </div>
                          )}
                        </div>
                        <span className="text-ink-4">›</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
              <Link
                href={`/cotizacion?cultivo=${crop.slug}`}
                className="block mt-4 p-5 bg-naranja-500 text-white font-serif text-[22px] leading-[1.1] tracking-[-0.02em] hover:bg-naranja-600 transition-colors"
              >
                Cotizar este<br />
                <em style={{ fontFamily: 'var(--serif-it)' }}>programa</em> →
              </Link>
            </aside>
          </div>
        </Container>
      </section>

      {/* ─── CTA final ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-verde-950 text-white py-20 lg:py-28"
        data-no-print
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 80% at 90% 20%, rgba(34,181,115,0.22), transparent 60%)' }}
          aria-hidden="true"
        />
        <Container className="relative">
          <p className="eyebrow-edit eyebrow-light no-line mb-5">— Siguiente paso</p>
          <h2 className="title-display text-white mb-6">
            ¿Quieres este protocolo<br />ajustado a <em>tu rancho</em>?
          </h2>
          <p className="text-lg leading-relaxed text-white/85 max-w-[46ch] mb-9">
            Agendamos una visita técnica con el agrónomo de tu zona. Sin costo,
            sin compromiso, con datos en la mano para diseñar tu programa.
          </p>
          <div className="flex items-center gap-5 flex-wrap">
            <a
              href={`https://wa.me/523316022708?text=Hola%2C%20quiero%20el%20protocolo%20de%20${encodeURIComponent(crop.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-naranja-500 text-white font-mono text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-naranja-600 hover:-translate-y-0.5 transition-all duration-300"
            >
              Solicitar visita técnica →
            </a>
            <PrintFichaButton
              label="Descargar / imprimir PDF"
              className="inline-flex items-center px-6 py-3.5 border border-white/30 text-white font-mono text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-white hover:text-ink transition-all duration-300"
            />
            <Link href="/cultivos" className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white/85 border-b border-current pb-0.5 hover:text-verde-300">
              o ver otros expedientes
            </Link>
          </div>
        </Container>
      </section>
    </div>
  )
}
