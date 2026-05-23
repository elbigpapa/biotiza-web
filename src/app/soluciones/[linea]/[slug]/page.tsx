/**
 * soluciones/[linea]/[slug]/page.tsx — Detalle producto editorial · Sub-fase 3.5b
 * Reemplaza biotiza-web/src/app/soluciones/[linea]/[slug]/page.tsx
 *
 * Server Component · Editorial product spread con composición mono visible.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PRODUCTS, getProductBySlug, getRelatedProducts } from '@/data/products'
import { PRODUCT_LINES } from '@/data/constants'
import { getProductImage } from '@/data/product-images'
import Container from '@/components/ui/Container'

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ linea: p.line, slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ linea: string; slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const p = getProductBySlug(slug)
  if (!p) return { title: 'Producto no encontrado · Biotiza' }
  return {
    title: `${p.name} | Biotiza`,
    description: p.description,
  }
}

// ─── JSON-LD · Product + BreadcrumbList (SEO rich-results) ────────────────
// Marca/fabricante = "Biotiza" (catálogo único; no se expone el proveedor).
// Renderiza sólo <script> invisibles — cero impacto en el diseño editorial.
function ProductJsonLd({
  product,
  lineName,
}: {
  product: {
    name: string
    full_name?: string
    description: string
    line: string
    slug: string
    certifications: string[]
  }
  lineName: string
}) {
  const url = `https://biotiza.mx/soluciones/${product.line}/${product.slug}`

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.full_name ?? product.name,
    alternateName: product.name,
    description: product.description,
    url,
    brand: { '@type': 'Brand', name: 'Biotiza' },
    manufacturer: { '@type': 'Organization', name: 'Biotiza', url: 'https://biotiza.mx' },
    category: lineName,
    hasCertification: product.certifications.map((cert) => ({
      '@type': 'Certification',
      name: cert,
    })),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'Biotiza', url: 'https://biotiza.mx' },
      priceCurrency: 'MXN',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: 0,
        priceCurrency: 'MXN',
        description: 'Precio bajo cotización',
      },
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio',     item: 'https://biotiza.mx' },
      { '@type': 'ListItem', position: 2, name: 'Soluciones', item: 'https://biotiza.mx/soluciones' },
      { '@type': 'ListItem', position: 3, name: lineName,     item: `https://biotiza.mx/soluciones/${product.line}` },
      { '@type': 'ListItem', position: 4, name: product.name, item: url },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  )
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ linea: string; slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const lineConfig = PRODUCT_LINES.find(l => l.id === product.line)!
  const photo = getProductImage(product.slug)
  const related = getRelatedProducts(product, 4)

  return (
    <main className="bg-white">
      {/* SEO · datos estructurados (invisible — no afecta el diseño editorial) */}
      <ProductJsonLd product={product} lineName={lineConfig.name} />

      {/* Hero del producto · 5-7 split editorial */}
      <section className="bg-paper py-32 lg:py-40 border-b border-rule">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-20 items-end">
            {/* Foto · lado izquierdo sobre paper-2 */}
            <div className="relative aspect-[3/4] bg-paper-2 border border-ink flex items-center justify-center p-14">
              <span className="absolute top-6 left-6 font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-ink-3">
                Ficha N° {String(PRODUCTS.indexOf(product) + 1).padStart(2, '0')}
              </span>
              {photo ? (
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={400}
                  height={500}
                  className="max-h-full w-auto object-contain"
                  style={{ filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.18))' }}
                />
              ) : (
                <span className="font-serif text-[clamp(80px,12vw,160px)] tracking-[-0.04em] leading-[0.9]" style={{ color: lineConfig.color }}>
                  {product.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                </span>
              )}
              <span
                className="absolute bottom-6 left-6 font-mono text-[10px] font-semibold tracking-[0.18em] uppercase"
                style={{ color: lineConfig.color }}
              >
                ● {lineConfig.name}
              </span>
            </div>

            {/* Info · lado derecho */}
            <div>
              <div className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-ink-4 mb-6">
                <Link href="/soluciones" className="hover:text-naranja-600">Soluciones</Link>
                <span className="mx-2.5 text-ink-5">/</span>
                <Link href={`/soluciones/${product.line}`} className="hover:text-naranja-600">{lineConfig.name}</Link>
                <span className="mx-2.5 text-ink-5">/</span>
                <span className="text-ink">{product.name}</span>
              </div>

              <h1 className="title-hero text-ink mb-6">
                {product.name.split(' ').slice(0, -1).join(' ')}{' '}
                <em style={{ fontFamily: 'var(--serif-it)' }}>{product.name.split(' ').slice(-1)}</em>
              </h1>

              <p className="dek-edit text-ink-2 max-w-[34ch] mb-9">{product.description}</p>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-5 py-6 border-y border-rule mb-9">
                <div>
                  <div className="font-serif text-[clamp(36px,4vw,52px)] leading-[0.9] tracking-[-0.035em] text-ink">
                    {product.composition[0]?.value || '—'}
                  </div>
                  <div className="font-mono text-[10px] font-semibold tracking-[0.16em] uppercase text-ink-3 mt-1.5">
                    {product.composition[0]?.ingredient.split(' ')[0]}
                  </div>
                </div>
                <div>
                  <div className="font-serif text-[clamp(36px,4vw,52px)] leading-[0.9] tracking-[-0.035em] text-ink">
                    {product.certifications.length}
                    <em className="font-serif italic text-ink-3 text-[0.4em] align-[24%] ml-1" style={{ fontFamily: 'var(--serif-it)' }}>certs.</em>
                  </div>
                  <div className="font-mono text-[10px] font-semibold tracking-[0.16em] uppercase text-ink-3 mt-1.5">
                    {product.certifications.join(' · ')}
                  </div>
                </div>
                <div>
                  <div className="font-serif text-[clamp(36px,4vw,52px)] leading-[0.9] tracking-[-0.035em] text-ink">
                    24
                    <em className="font-serif italic text-ink-3 text-[0.4em] align-[24%] ml-1" style={{ fontFamily: 'var(--serif-it)' }}>meses</em>
                  </div>
                  <div className="font-mono text-[10px] font-semibold tracking-[0.16em] uppercase text-ink-3 mt-1.5">
                    Vida útil declarada
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-center flex-wrap">
                <a
                  href={`https://wa.me/523316022708?text=Hola%2C%20quiero%20cotizar%20${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-naranja-500 text-white font-mono text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-naranja-600 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Cotizar por WhatsApp →
                </a>
                <Link
                  href="/cotizacion"
                  className="inline-flex items-center px-6 py-3.5 border border-ink text-ink font-mono text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-ink hover:text-white transition-all duration-300"
                >
                  Agregar a cotización
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Composición · ciencia visible */}
      <section className="bg-white py-24 lg:py-32 border-b border-rule">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-20">
            <div>
              <p className="eyebrow-edit eyebrow-green mb-5">— Análisis · Lote estándar</p>
              <h2 className="title-display max-w-[14ch]" style={{ fontSize: 'clamp(36px,5vw,64px)' }}>
                Composición <em>declarada</em>.
              </h2>
              <p className="mt-5 text-base leading-[1.7] text-ink-2 max-w-[40ch]">
                Cada lote se analiza antes de salir del laboratorio. Los valores
                aquí publicados coinciden con el certificado de análisis que
                recibes con tu pedido.
              </p>
            </div>

            <div className="composition-edit">
              <div className="text-[10px] tracking-[0.2em] uppercase font-semibold text-white/50 mb-4 flex items-center gap-2.5">
                <span className="w-4 h-px bg-white/30" />
                // {product.name} · análisis
              </div>
              {product.composition.map((c, i) => (
                <div key={i} className="row">
                  <div className="text-white/85">{c.ingredient.split(' ')[0]}</div>
                  <div className="v">{c.value}</div>
                  <div className="text-white/50 text-[11px]">{c.ingredient.split(' ').slice(1).join(' ')}</div>
                </div>
              ))}
              {product.certifications.length > 0 && (
                <div className="mt-3.5 pt-3.5 border-t border-white/15 flex flex-wrap gap-3.5 text-[10px] tracking-[0.18em] uppercase font-semibold text-verde-300">
                  {product.certifications.map(c => <span key={c}>● {c}</span>)}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Aplicación recomendada */}
      <section className="bg-paper py-24 lg:py-32 border-b border-rule">
        <Container>
          <p className="eyebrow-edit eyebrow-green mb-5">— Aplicación recomendada</p>
          <h2 className="title-display mb-4" style={{ fontSize: 'clamp(36px,5vw,64px)' }}>
            Cuándo, cómo, <em>cuánto</em>.
          </h2>
          <p className="dek-edit text-ink-3 max-w-[60ch] mb-12">
            Dosis orientativas de ficha técnica. El agrónomo asignado ajusta
            cantidades según cultivo, etapa y condiciones locales.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-y-2 border-ink">
            {Object.entries(product.recommended_dose).map(([method, dose], i) => (
              <div key={method} className={`p-6 ${i < 3 ? 'border-r border-rule' : ''}`}>
                <div className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-ink-4 mb-2 flex items-center gap-2.5">
                  N° {String(i + 1).padStart(2, '0')}
                  <span className="flex-1 h-px bg-rule" />
                </div>
                <h4 className="font-serif text-[clamp(24px,2.5vw,36px)] leading-none tracking-[-0.03em] mb-3.5 capitalize">
                  {method === 'fertirrigacion' ? 'Fertirrigación' : method}
                </h4>
                <p className="font-mono text-[13px] text-verde-700 font-semibold">{dose}</p>
              </div>
            ))}
          </div>

          {product.frequency && (
            <div className="mt-8 max-w-[60ch]">
              <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-ink-3 mb-2">
                Frecuencia
              </p>
              <p className="text-base text-ink-2 leading-relaxed">{product.frequency}</p>
            </div>
          )}
        </Container>
      </section>

      {/* Beneficios + cultivos compatibles */}
      <section className="bg-white py-24 lg:py-32 border-b border-rule">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            {product.benefits && product.benefits.length > 0 && (
              <div>
                <p className="eyebrow-edit eyebrow-green mb-5">— Beneficios</p>
                <h3 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.05] tracking-[-0.03em] mb-7">
                  Lo que <em style={{ fontFamily: 'var(--serif-it)' }} className="text-verde-700">consigues</em>.
                </h3>
                <ol className="flex flex-col gap-3.5">
                  {product.benefits.map((b, i) => (
                    <li key={b} className="grid grid-cols-[40px_1fr] gap-3.5 items-baseline pb-3.5 border-b border-rule">
                      <span className="font-serif text-[22px] text-verde-700 tracking-[-0.03em]">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-base leading-[1.55] text-ink-2">{b}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {product.crops && product.crops.length > 0 && (
              <div>
                <p className="eyebrow-edit eyebrow-orange mb-5">— Cultivos compatibles</p>
                <h3 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.05] tracking-[-0.03em] mb-7">
                  Donde se <em style={{ fontFamily: 'var(--serif-it)' }} className="text-naranja-600">recomienda</em>.
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.crops.map(c => (
                    <Link
                      key={c}
                      href={`/cultivos/${c}`}
                      className="px-3.5 py-2 border border-ink font-mono text-[11px] font-semibold tracking-[0.12em] uppercase text-ink hover:bg-ink hover:text-white transition-colors"
                    >
                      {c}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Productos relacionados */}
      {related.length > 0 && (
        <section className="bg-paper py-24 lg:py-28">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-10 lg:gap-20 items-end mb-12">
              <div>
                <p className="eyebrow-edit mb-5">— Complementarios</p>
                <h2 className="title-display max-w-[18ch]" style={{ fontSize: 'clamp(36px,5vw,64px)' }}>
                  Funciona <em>en sinergia</em> con...
                </h2>
              </div>
              <Link href="/soluciones" className="self-end font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink border-b border-current pb-0.5 inline-block">
                Ver catálogo completo →
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-rule">
              {related.map((p, i) => {
                const lc = PRODUCT_LINES.find(l => l.id === p.line)!
                const ph = getProductImage(p.slug)
                return (
                  <Link key={p.id} href={`/soluciones/${p.line}/${p.slug}`} className="group flex flex-col bg-paper hover:bg-paper-2 transition-colors min-h-[380px]">
                    <div className="relative h-[220px] bg-paper-2 border-b border-rule flex items-center justify-center p-5 overflow-hidden">
                      <span className="absolute top-3.5 left-3.5 font-mono text-[10px] font-semibold tracking-[0.16em] uppercase text-ink-3">
                        N° {String(i + 1).padStart(2, '0')}
                      </span>
                      {ph ? (
                        <Image src={ph.src} alt={ph.alt} width={200} height={200}
                               className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-[1.06]" />
                      ) : (
                        <span className="font-serif text-[clamp(36px,5vw,56px)] tracking-[-0.04em] opacity-50" style={{ color: lc.color }}>
                          {p.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                        </span>
                      )}
                      <span className="absolute bottom-3.5 left-3.5 font-mono text-[10px] font-semibold tracking-[0.16em] uppercase" style={{ color: lc.color }}>
                        {lc.name}
                      </span>
                    </div>
                    <div className="flex flex-col flex-1 p-5 gap-2">
                      <h4 className="font-serif text-[24px] leading-[1.05] tracking-[-0.025em] text-ink">{p.name}</h4>
                      <p className="text-sm text-ink-3 leading-relaxed flex-1 line-clamp-2">{p.description}</p>
                      <div className="pt-3.5 border-t border-rule flex justify-between items-baseline font-mono text-[10px] tracking-[0.14em] uppercase font-semibold text-ink-4">
                        <span>{p.certifications.slice(0, 2).join(' · ')}</span>
                        <span className="text-ink font-serif text-xl group-hover:translate-x-1 group-hover:text-naranja-500 transition-all duration-300">›</span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </Container>
        </section>
      )}
    </main>
  )
}
