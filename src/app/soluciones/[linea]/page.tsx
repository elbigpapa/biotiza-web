/**
 * /soluciones/[linea] — Página de línea de producto
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { PRODUCTS, getProductsByLine } from '@/data/products'
import { PRODUCT_LINES } from '@/data/constants'
import { cn } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import type { ProductLine } from '@/types'

// ─── Static params ────────────────────────────────────────────────────────

export function generateStaticParams() {
  return PRODUCT_LINES.map(line => ({ linea: line.slug }))
}

// ─── Metadata dinámica ────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: Promise<{ linea: string }> }): Promise<Metadata> {
  const { linea } = await params
  const lineConfig = PRODUCT_LINES.find(l => l.slug === linea)
  if (!lineConfig) return {}
  return {
    title: `${lineConfig.name} — Biotiza`,
    description: lineConfig.description,
  }
}

// ─── Componente ───────────────────────────────────────────────────────────

export default async function LineaPage({ params }: { params: Promise<{ linea: string }> }) {
  const { linea } = await params
  const lineConfig = PRODUCT_LINES.find(l => l.slug === linea)
  if (!lineConfig) notFound()

  const products = getProductsByLine(lineConfig.id as ProductLine)

  // Otras líneas para navegación lateral
  const otherLines = PRODUCT_LINES.filter(l => l.id !== lineConfig.id)

  return (
    <div className="bg-white">
      {/* Hero con color de línea */}
      <div
        className="relative overflow-hidden py-20 lg:py-24"
        style={{ background: `linear-gradient(135deg, ${lineConfig.color}ee, ${lineConfig.color}99)` }}
      >
        {/* Círculo decorativo */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-20"
          style={{ backgroundColor: 'white' }}
          aria-hidden="true"
        />

        <Container>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-white/70">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/soluciones" className="hover:text-white transition-colors">Soluciones</Link>
            <span>/</span>
            <span className="text-white font-medium">{lineConfig.name}</span>
          </nav>

          <div className="max-w-2xl">
            <Badge line={lineConfig.id} size="md" className="mb-4 bg-white/20 text-white border border-white/30" />
            <h1 className="font-serif text-4xl text-white lg:text-5xl">{lineConfig.name}</h1>
            <p className="mt-4 text-base text-white/80 leading-relaxed">{lineConfig.description}</p>
            <p className="mt-2 text-sm font-semibold text-white/60 uppercase tracking-wider">
              {lineConfig.tagline}
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Grid de productos */}
          <div className="flex-1">
            <SectionHeading
              title={`${products.length} productos en esta línea`}
              align="left"
              animate={false}
              accentColor={lineConfig.id === 'organicos' ? 'verde' : lineConfig.id === 'bioestimulantes' ? 'naranja' : 'azul'}
              level="h2"
              className="mb-8"
            />

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {products.map(product => (
                <Link
                  key={product.id}
                  href={`/soluciones/${linea}/${product.slug}`}
                  className="group flex flex-col rounded-xl border border-gris-100 bg-white shadow-card hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  {/* Color strip de línea */}
                  <div className="h-1 w-full" style={{ backgroundColor: lineConfig.color }} />

                  <div className="flex flex-col flex-1 p-5 gap-3">
                    {product.featured && (
                      <span className="self-start rounded-full bg-naranja-100 px-2 py-0.5 text-[10px] font-bold text-naranja-600 uppercase">
                        ⭐ Producto estrella
                      </span>
                    )}
                    <h3 className="font-sans text-base font-semibold text-gris-900 group-hover:text-verde-700 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gris-500 leading-relaxed line-clamp-3 flex-1">
                      {product.description}
                    </p>

                    {/* Composición rápida */}
                    {product.composition.length > 0 && (
                      <div className="rounded-lg bg-gris-50 px-3 py-2">
                        <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-gris-400 mb-1">
                          Composición
                        </p>
                        {product.composition.slice(0, 2).map((c, i) => (
                          <p key={i} className="text-[11px] font-mono text-gris-600">
                            <span className="text-verde-600 font-bold">{c.value}</span>
                            {' '}{c.ingredient}
                          </p>
                        ))}
                        {product.composition.length > 2 && (
                          <p className="text-[10px] text-gris-400 mt-0.5">+{product.composition.length - 2} más</p>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-1">
                      <div className="flex flex-wrap gap-1">
                        {product.certifications.slice(0, 2).map(cert => (
                          <span key={cert} className="rounded bg-gris-100 px-1.5 py-0.5 text-[10px] font-semibold text-gris-500">
                            {cert}
                          </span>
                        ))}
                      </div>
                      <span className="flex items-center gap-1 text-xs font-semibold text-verde-600 group-hover:gap-2 transition-all">
                        Ver ficha
                        <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar: otras líneas */}
          <aside className="lg:w-64 shrink-0">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gris-500">
              Otras líneas
            </h2>
            <div className="flex flex-col gap-2">
              {otherLines.map(line => (
                <Link
                  key={line.id}
                  href={`/soluciones/${line.slug}`}
                  className="flex items-center gap-3 rounded-xl border border-gris-100 bg-white p-3 text-sm font-medium text-gris-700 shadow-sm hover:border-gris-200 hover:shadow-card transition-all"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white text-xs font-bold"
                    style={{ backgroundColor: line.color }}>
                    {line.productCount}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-gris-800 truncate">{line.name}</p>
                    <p className="text-xs text-gris-400 truncate">{line.tagline}</p>
                  </div>
                  <ArrowRight size={14} className="shrink-0 text-gris-300 ml-auto" />
                </Link>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-verde-200 bg-verde-50 p-4">
              <p className="text-sm font-semibold text-verde-800">¿Necesitas asesoría?</p>
              <p className="mt-1 text-xs text-verde-700 leading-relaxed">
                Nuestros agrónomos te recomiendan el programa ideal para tu cultivo.
              </p>
              <Link
                href="/contacto"
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-verde-700 hover:text-verde-800"
              >
                Contactar agrónomo →
              </Link>
            </div>
          </aside>
        </div>

        {/* Navegación breadcrumb inferior */}
        <div className="mt-12 pt-6 border-t border-gris-100 flex items-center gap-2">
          <Link href="/soluciones" className="inline-flex items-center gap-1.5 text-sm text-gris-500 hover:text-verde-600 transition-colors">
            <ArrowLeft size={14} />
            Ver catálogo completo
          </Link>
        </div>
      </Container>
    </div>
  )
}
