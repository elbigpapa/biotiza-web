/**
 * /marcas/[slug] — Página de detalle de una marca
 *
 * Muestra la identidad, tecnologías y portafolio completo de una marca
 * (Bioproductos, Agrobionsa o Veganic) con filtros por línea.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ChevronRight,
  Globe,
  Leaf,
  Microscope,
  Sparkles,
  CheckCircle,
  type LucideIcon,
} from 'lucide-react'
import { BRANDS, PRODUCT_LINES } from '@/data/constants'
import { PRODUCTS } from '@/data/products'
import Container from '@/components/ui/Container'
import Badge from '@/components/ui/Badge'
import { cn } from '@/lib/utils'
import type { ProductBrand } from '@/types'

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return BRANDS.map((b) => ({ slug: b.slug }))
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const brand    = BRANDS.find((b) => b.slug === slug)
  if (!brand) return {}

  return {
    title:       `${brand.name} — Marca distribuida por Biotiza`,
    description: `${brand.tagline}. ${brand.description.slice(0, 140)}`,
    keywords:    [brand.name, brand.tagline, 'Biotiza', 'México'],
  }
}

// ---------------------------------------------------------------------------
// Icon map
// ---------------------------------------------------------------------------

const BRAND_ICONS: Record<ProductBrand, LucideIcon> = {
  bioproductos: Leaf,
  agrobionsa:   Microscope,
  veganic:      Sparkles,
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function BrandDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const brand = BRANDS.find((b) => b.slug === slug)
  if (!brand) notFound()

  const Icon     = BRAND_ICONS[brand.id]
  const products = PRODUCTS.filter((p) => p.brand === brand.id)

  // Agrupar productos por línea
  const byLine = PRODUCT_LINES.map((line) => ({
    line,
    items: products.filter((p) => p.line === line.id),
  })).filter((g) => g.items.length > 0)

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gris-100 bg-gris-50">
        <Container className="py-3">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-gris-500 flex-wrap"
          >
            <Link href="/" className="hover:text-verde-600 transition-colors">
              Inicio
            </Link>
            <ChevronRight size={12} />
            <Link href="/marcas" className="hover:text-verde-600 transition-colors">
              Marcas
            </Link>
            <ChevronRight size={12} />
            <span className="font-medium text-gris-800">{brand.name}</span>
          </nav>
        </Container>
      </div>

      {/* Hero de la marca */}
      <div
        className="relative overflow-hidden py-16 lg:py-20"
        style={{
          background: `linear-gradient(135deg, ${brand.color} 0%, ${brand.color}dd 55%, ${brand.color}99 100%)`,
        }}
      >
        <div
          className="absolute -right-10 top-0 h-72 w-72 rounded-full bg-white/10"
          aria-hidden="true"
        />
        <div
          className="absolute -left-10 bottom-0 h-56 w-56 rounded-full bg-white/10"
          aria-hidden="true"
        />
        <Container className="relative">
          <Link
            href="/marcas"
            className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            Todas las marcas
          </Link>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-sm">
              <Icon size={48} className="text-white" />
            </div>
            <div className="flex-1">
              <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                {products.length} producto{products.length !== 1 ? 's' : ''} en catálogo
              </span>
              <h1 className="mt-3 font-serif text-4xl text-white lg:text-5xl">
                {brand.name}
              </h1>
              <p className="mt-2 text-base text-white/90 lg:text-lg">{brand.tagline}</p>
              <div className="mt-3 flex items-center gap-1.5 text-sm text-white/80">
                <Globe size={14} />
                {brand.origin}
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-12 lg:py-16">
        {/* Descripción y fortalezas */}
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <h2 className="font-sans text-xs font-semibold uppercase tracking-wider text-gris-500">
              Sobre la marca
            </h2>
            <p className="mt-3 text-base leading-relaxed text-gris-700 lg:text-lg">
              {brand.description}
            </p>
            {brand.website && (
              <a
                href={`https://${brand.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-all hover:gap-2.5"
                style={{ color: brand.color }}
              >
                Sitio oficial · {brand.website}
                <ChevronRight size={14} />
              </a>
            )}
          </div>
          <aside
            className="rounded-2xl p-6"
            style={{ backgroundColor: `${brand.color}0f`, border: `1px solid ${brand.color}33` }}
          >
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-gris-500">
              Fortalezas clave
            </h3>
            <ul className="mt-3 flex flex-col gap-2.5">
              {brand.strengths.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-2 text-sm leading-relaxed text-gris-700"
                >
                  <CheckCircle
                    size={16}
                    className="mt-0.5 shrink-0"
                    style={{ color: brand.color }}
                  />
                  {s}
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {/* Catálogo por línea */}
        <div className="mt-14 lg:mt-20">
          <h2 className="font-serif text-2xl text-gris-900 lg:text-3xl">
            Catálogo completo
          </h2>
          <p className="mt-1 text-sm text-gris-500">
            {products.length} productos de {brand.name} agrupados por línea técnica
          </p>

          <div className="mt-8 space-y-12">
            {byLine.map((group) => (
              <section key={group.line.id}>
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="h-2 w-10 rounded-full"
                    style={{ backgroundColor: group.line.color }}
                    aria-hidden="true"
                  />
                  <h3 className="font-serif text-xl text-gris-900">
                    {group.line.name}
                  </h3>
                  <span className="rounded-full bg-gris-100 px-2.5 py-0.5 text-xs font-semibold text-gris-600">
                    {group.items.length}
                  </span>
                </div>
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                  {group.items.map((product) => (
                    <Link
                      key={product.id}
                      href={`/soluciones/${product.line}/${product.slug}`}
                      className={cn(
                        'group flex flex-col rounded-xl border border-gris-100 bg-white p-4 gap-2',
                        'shadow-[0_2px_10px_rgba(15,23,42,0.04)] transition-all duration-300',
                        'hover:-translate-y-0.5 hover:shadow-[0_8px_28px_var(--brand-shadow)]',
                      )}
                      style={{
                        ['--brand-shadow' as string]: `${brand.color}26`,
                      }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <Badge line={product.line} size="sm" />
                        {product.featured && (
                          <span className="rounded-full bg-naranja-100 px-1.5 py-0.5 text-[10px] font-bold text-naranja-600 uppercase">
                            ⭐
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-semibold text-gris-900 leading-tight group-hover:text-gris-700 transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gris-500 leading-relaxed line-clamp-2 flex-1">
                        {product.description}
                      </p>
                      <span
                        className="mt-1 text-xs font-semibold group-hover:underline"
                        style={{ color: brand.color }}
                      >
                        Ver ficha →
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* CTA al final */}
        <div
          className="mt-16 rounded-2xl p-8 text-center lg:p-12"
          style={{
            background: `linear-gradient(135deg, ${brand.color}11 0%, ${brand.color}22 100%)`,
            border: `1px solid ${brand.color}33`,
          }}
        >
          <h2 className="font-serif text-2xl text-gris-900 lg:text-3xl">
            ¿Necesitas un protocolo con productos {brand.name}?
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-gris-600 lg:text-base">
            Nuestro equipo agronómico te ayuda a combinar las tres marcas en el
            programa óptimo para tu cultivo, región y etapa fenológica.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors"
              style={{ backgroundColor: brand.color }}
            >
              Hablar con un agrónomo
              <ChevronRight size={14} />
            </Link>
            <Link
              href="/cotizacion"
              className="inline-flex items-center gap-1.5 rounded-lg border border-gris-300 bg-white px-5 py-2.5 text-sm font-semibold text-gris-700 hover:border-gris-400 transition-colors"
            >
              Solicitar cotización
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
