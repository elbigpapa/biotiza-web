/**
 * /soluciones/[linea]/[slug] — Página de detalle de producto
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, MessageCircle, ShoppingCart, CheckCircle, Target, Droplets, Leaf, FlaskConical, Sparkles, Shield, ChevronRight } from 'lucide-react'
import { PRODUCTS, getProductBySlug, getRelatedProducts } from '@/data/products'
import { PRODUCT_LINES } from '@/data/constants'
import { cn } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import Container from '@/components/ui/Container'
import CompositionTable from '@/components/products/CompositionTable'
import type { ProductLine } from '@/types'

// ─── Static params: todos los productos ──────────────────────────────────

export function generateStaticParams() {
  return PRODUCTS.map(p => ({ linea: p.line, slug: p.slug }))
}

// ─── Metadata SEO dinámica ────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ linea: string; slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}

  const line = PRODUCT_LINES.find(l => l.id === product.line)

  return {
    title: `${product.name} — ${line?.name ?? ''} | Biotiza`,
    description: product.description,
    keywords: [product.name, ...(product.solves_problems ?? []), 'Biotiza', 'México'],
    openGraph: {
      title: product.full_name,
      description: product.description,
      type: 'article',
    },
  }
}

// ─── JSON-LD: Product Schema ─────────────────────────────────────────────
function ProductJsonLd({ product }: { product: { name: string; full_name: string; description: string; line: string; slug: string } }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.full_name,
    description: product.description,
    url: `https://biotiza.mx/soluciones/${product.line}/${product.slug}`,
    brand: { '@type': 'Brand', name: 'Biotiza' },
    manufacturer: {
      '@type': 'Organization',
      name: 'Biotiza',
      url: 'https://biotiza.mx',
    },
    category: product.line,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'Biotiza' },
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ─── Icono por línea ──────────────────────────────────────────────────────
const LINE_ICONS: Record<ProductLine, React.ElementType> = {
  organicos: Leaf, especialidades: FlaskConical,
  bioestimulantes: Sparkles, nutricion: Droplets, zentia: Shield,
}

// ─── Componente principal ─────────────────────────────────────────────────

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ linea: string; slug: string }>
}) {
  const { linea, slug } = await params
  const product = getProductBySlug(slug)
  if (!product || product.line !== linea) notFound()

  const lineConfig = PRODUCT_LINES.find(l => l.id === product.line)!
  const related    = getRelatedProducts(product, 4)
  const Icon       = LINE_ICONS[product.line]

  const waText = encodeURIComponent(
    `Hola Biotiza, quiero información sobre ${product.name}. ¿Cuál es la dosis para mi cultivo?`
  )

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gris-100 bg-gris-50">
        <Container className="py-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gris-500 flex-wrap">
            <Link href="/" className="hover:text-verde-600 transition-colors">Inicio</Link>
            <ChevronRight size={12} />
            <Link href="/soluciones" className="hover:text-verde-600 transition-colors">Soluciones</Link>
            <ChevronRight size={12} />
            <Link href={`/soluciones/${linea}`} className="hover:text-verde-600 transition-colors capitalize">{lineConfig.name}</Link>
            <ChevronRight size={12} />
            <span className="font-medium text-gris-800 truncate max-w-[140px]">{product.name}</span>
          </nav>
        </Container>
      </div>

      <Container className="py-10 lg:py-14">
        {/* Layout 2 columnas */}
        <div className="grid gap-10 lg:grid-cols-[420px_1fr] lg:gap-16">

          {/* ── Columna izquierda: imagen + presentaciones ─────── */}
          <div className="space-y-5">
            {/* Imagen placeholder */}
            <div
              className="relative flex h-72 items-center justify-center rounded-2xl overflow-hidden sm:h-80 lg:h-72 xl:h-80"
              style={{ background: `linear-gradient(135deg, ${lineConfig.color}33, ${lineConfig.color}66)` }}
            >
              <div
                className="flex h-24 w-24 items-center justify-center rounded-3xl"
                style={{ backgroundColor: `${lineConfig.color}40` }}
              >
                <Icon size={48} style={{ color: lineConfig.color }} />
              </div>
              {product.featured && (
                <div className="absolute top-4 right-4 rounded-full bg-naranja-500 px-3 py-1 text-xs font-bold text-white">
                  ⭐ Estrella
                </div>
              )}
            </div>

            {/* Presentaciones */}
            {product.presentations.length > 0 && (
              <div className="rounded-xl border border-gris-100 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gris-500">
                  Presentaciones disponibles
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.presentations.map((pres, i) => (
                    <span key={i} className="rounded-lg border border-gris-200 bg-gris-50 px-3 py-1.5 text-sm font-medium text-gris-700">
                      {pres.size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs sticky */}
            <div className="flex flex-col gap-3">
              <Link
                href="/cotizacion"
                className="flex items-center justify-center gap-2 rounded-lg bg-naranja-500 py-3 px-5 text-sm font-semibold text-white hover:bg-naranja-600 transition-colors shadow-[0_4px_16px_rgba(232,105,15,0.3)]"
              >
                <ShoppingCart size={16} />
                Solicitar Cotización
              </Link>
              <a
                href={`https://wa.me/523300000000?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] py-3 px-5 text-sm font-semibold text-white hover:bg-[#1ebe57] transition-colors"
              >
                <MessageCircle size={16} />
                Preguntar por WhatsApp
              </a>
            </div>
          </div>

          {/* ── Columna derecha: ficha técnica ─────────────────── */}
          <div className="space-y-7">
            {/* Header del producto */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge line={product.line} size="md" />
                <span className="text-xs font-semibold uppercase tracking-wider text-gris-400">
                  {product.category}
                </span>
              </div>
              <h1 className="font-serif text-3xl text-gris-900 lg:text-4xl">
                {product.name}
              </h1>
              <p className="mt-1 text-sm font-medium text-gris-500">{product.full_name}</p>
              <p className="mt-4 text-base leading-relaxed text-gris-700">
                {product.description}
              </p>
              {product.technical_description && (
                <p className="mt-2 text-sm leading-relaxed text-gris-500">
                  {product.technical_description}
                </p>
              )}
            </div>

            {/* Composición garantizada */}
            <div>
              <h2 className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-gris-500">
                Composición garantizada
              </h2>
              <CompositionTable items={product.composition} productName={product.name} />
            </div>

            {/* Dosis recomendadas */}
            {Object.keys(product.recommended_dose).length > 0 && (
              <div>
                <h2 className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-gris-500">
                  Dosis recomendadas
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {Object.entries(product.recommended_dose).map(([method, dose]) => dose && (
                    <div key={method} className="rounded-xl border border-gris-100 bg-gris-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gris-400 capitalize mb-1">
                        {method}
                      </p>
                      <p className="text-sm font-bold text-verde-700">{dose}</p>
                    </div>
                  ))}
                </div>
                {product.frequency && (
                  <p className="mt-3 text-xs text-gris-500">
                    <span className="font-semibold text-gris-700">Frecuencia:</span> {product.frequency}
                  </p>
                )}
              </div>
            )}

            {/* Certificaciones */}
            {product.certifications.length > 0 && (
              <div>
                <h2 className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-gris-500">
                  Certificaciones
                </h2>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map(cert => {
                    const certKey = cert === 'COFEPRIS' ? 'cofepris' : cert === 'OMRI' || cert === 'OMRI Listed' ? 'omri' : 'hecho-en-mexico'
                    return <Badge key={cert} cert={certKey as 'cofepris' | 'omri' | 'hecho-en-mexico'} size="md" />
                  })}
                </div>
              </div>
            )}

            {/* Beneficios */}
            {product.benefits.length > 0 && (
              <div>
                <h2 className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-gris-500">
                  Beneficios
                </h2>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gris-700">
                      <CheckCircle size={16} className="mt-0.5 shrink-0 text-verde-500" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Resuelve */}
            {product.solves_problems.length > 0 && (
              <div>
                <h2 className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-gris-500">
                  Resuelve
                </h2>
                <div className="flex flex-wrap gap-2">
                  {product.solves_problems.map((prob, i) => (
                    <span key={i} className="inline-flex items-center gap-1 rounded-full bg-naranja-50 px-3 py-1 text-xs font-medium text-naranja-700">
                      <Target size={11} />
                      {prob}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Cultivos */}
            {product.crops.length > 0 && (
              <div>
                <h2 className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-gris-500">
                  Cultivos recomendados
                </h2>
                <div className="flex flex-wrap gap-2">
                  {product.crops.map(cropSlug => (
                    <Link
                      key={cropSlug}
                      href={`/cultivos/${cropSlug}`}
                      className="inline-flex items-center rounded-full border border-verde-200 bg-verde-50 px-3 py-1 text-xs font-medium text-verde-700 hover:bg-verde-100 hover:border-verde-300 transition-colors capitalize"
                    >
                      {cropSlug.replace('-', ' ')}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Etapas fenológicas */}
            {product.best_stages.length > 0 && (
              <div>
                <h2 className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-gris-500">
                  Etapas de aplicación
                </h2>
                <div className="flex flex-wrap gap-2">
                  {product.best_stages.map(stage => (
                    <span key={stage} className="rounded-full border border-azul-200 bg-azul-50 px-3 py-1 text-xs font-medium text-azul-700 capitalize">
                      {stage}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Productos relacionados ─────────────────────────── */}
        {related.length > 0 && (
          <div className="mt-16 border-t border-gris-100 pt-12">
            <h2 className="mb-8 font-serif text-2xl text-gris-900">
              Productos relacionados
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map(rel => {
                const relLine = PRODUCT_LINES.find(l => l.id === rel.line)!
                const RelIcon = LINE_ICONS[rel.line]
                return (
                  <Link
                    key={rel.id}
                    href={`/soluciones/${rel.line}/${rel.slug}`}
                    className="group flex flex-col rounded-xl border border-gris-100 bg-white shadow-card hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <div
                      className="flex h-20 items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${relLine.color}22, ${relLine.color}44)` }}
                    >
                      <RelIcon size={28} style={{ color: relLine.color }} />
                    </div>
                    <div className="p-4 space-y-1.5">
                      <Badge line={rel.line} size="sm" />
                      <p className="text-sm font-semibold text-gris-900 group-hover:text-verde-700 transition-colors">
                        {rel.name}
                      </p>
                      <p className="text-xs text-gris-500 line-clamp-2">{rel.description}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Navegación inferior */}
        <div className="mt-10 flex items-center gap-2 border-t border-gris-100 pt-6">
          <Link
            href={`/soluciones/${linea}`}
            className="inline-flex items-center gap-1.5 text-sm text-gris-500 hover:text-verde-600 transition-colors"
          >
            <ArrowLeft size={14} />
            Volver a {lineConfig.name}
          </Link>
        </div>
      </Container>

      {/* SEO: Product JSON-LD */}
      <ProductJsonLd product={product} />
    </div>
  )
}
