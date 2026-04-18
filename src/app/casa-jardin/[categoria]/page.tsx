import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, ArrowLeft, ChevronRight, CheckCircle } from 'lucide-react'
import Container from '@/components/ui/Container'
import {
  GARDEN_CATEGORIES,
  GARDEN_PACKAGES,
  getGardenCategoryBySlug,
  getPackagesByCategory,
} from '@/data/home-garden'
import { cn } from '@/lib/utils'

export function generateStaticParams() {
  // incluye también "todos" y "paquete" → se manejan como casos especiales
  return GARDEN_CATEGORIES.map((c) => ({ categoria: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string }>
}): Promise<Metadata> {
  const { categoria } = await params
  const cat = getGardenCategoryBySlug(categoria)
  if (!cat) return {}

  return {
    title: `${cat.name} — Biotiza Casa y Jardín`,
    description: cat.tagline,
    alternates: { canonical: `https://biotiza.mx/casa-jardin/${cat.slug}` },
    openGraph: {
      title: `${cat.name} · Biotiza Casa y Jardín`,
      description: cat.tagline,
    },
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoria: string }>
}) {
  const { categoria } = await params

  // Caso especial: "todos" muestra todos los paquetes
  if (categoria === 'todos') {
    return <AllPackagesPage />
  }

  const cat = getGardenCategoryBySlug(categoria)
  if (!cat) notFound()

  const packages = getPackagesByCategory(cat.id)

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-gris-100 bg-gris-50">
        <Container className="py-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gris-500 flex-wrap">
            <Link href="/" className="hover:text-verde-600 transition-colors">Inicio</Link>
            <ChevronRight size={12} />
            <Link href="/casa-jardin" className="hover:text-verde-600 transition-colors">Casa y Jardín</Link>
            <ChevronRight size={12} />
            <span className="font-medium text-gris-800">{cat.name}</span>
          </nav>
        </Container>
      </div>

      {/* Hero */}
      <section className={cn('relative overflow-hidden py-16 lg:py-20 bg-gradient-to-br', cat.gradient)}>
        <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -left-10 bottom-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />

        <Container className="relative">
          <Link
            href="/casa-jardin"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            Volver a Casa y Jardín
          </Link>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_200px] lg:items-center">
            <div>
              <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white ring-1 ring-white/30 backdrop-blur-sm">
                {packages.length} paquete{packages.length !== 1 ? 's' : ''} disponible{packages.length !== 1 ? 's' : ''}
              </span>
              <h1 className="mt-4 font-serif text-4xl text-white text-balance lg:text-5xl">
                {cat.name}
              </h1>
              <p className="mt-3 text-base text-white/90 text-pretty lg:text-lg">
                {cat.tagline}
              </p>
              <p className="mt-3 text-sm text-white/75 leading-relaxed lg:text-base">
                {cat.description}
              </p>
            </div>
            <div className="hidden items-center justify-center lg:flex">
              <span className="text-9xl drop-shadow-2xl" aria-hidden="true">
                {cat.emoji}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Use cases */}
      <section className="bg-white py-12">
        <Container>
          <div className="mx-auto max-w-4xl rounded-2xl border border-gris-100 bg-gris-50 p-6 lg:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gris-500">
              Para
            </p>
            <p className="mt-2 text-base text-gris-800 lg:text-lg">{cat.audience}</p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {cat.useCases.map((uc) => (
                <div key={uc} className="flex items-start gap-2 text-sm text-gris-700">
                  <CheckCircle size={15} className="mt-0.5 shrink-0" style={{ color: cat.color }} />
                  {uc}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Packages */}
      <section className="bg-gris-50 py-12 lg:py-16">
        <Container>
          {packages.length === 0 ? (
            <div className="mx-auto max-w-lg rounded-2xl border border-gris-200 bg-white p-10 text-center">
              <p className="text-sm text-gris-500">
                Estamos preparando paquetes especiales para esta categoría.
              </p>
              <Link
                href="/contacto"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-verde-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-verde-600"
              >
                Solicitar asesoría personalizada
                <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {packages.map((pkg) => (
                <Link
                  key={pkg.slug}
                  href={`/casa-jardin/paquete/${pkg.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gris-100 bg-white shadow-[0_2px_20px_rgba(15,23,42,0.04)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(15,23,42,0.1)]"
                >
                  <div className={cn('relative flex h-48 items-center justify-center bg-gradient-to-br overflow-hidden', pkg.gradient)}>
                    {pkg.badge && (
                      <span className="absolute top-3 right-3 rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm ring-1 ring-white/30">
                        {pkg.badge === 'bestseller' ? '★ Bestseller' : pkg.badge === 'popular' ? '🔥 Popular' : '✨ Nuevo'}
                      </span>
                    )}
                    <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/10" aria-hidden="true" />
                    <span className="text-7xl drop-shadow-md transition-transform duration-500 group-hover:scale-110" aria-hidden="true">
                      {pkg.emoji}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h3 className="font-serif text-xl text-gris-900 group-hover:text-verde-700 transition-colors">
                      {pkg.name}
                    </h3>
                    <p className="text-sm text-gris-600 line-clamp-3 leading-relaxed flex-1">
                      {pkg.shortDescription}
                    </p>
                    <p className="text-xs text-gris-500">
                      <strong>Cubre:</strong> {pkg.coverage}
                    </p>
                    <div className="flex items-end justify-between gap-3 border-t border-gris-100 pt-4 mt-1">
                      <div>
                        {pkg.priceStrike && (
                          <span className="block text-xs text-gris-400 line-through">
                            ${pkg.priceStrike.toLocaleString('es-MX')}
                          </span>
                        )}
                        <span className="text-xl font-bold text-verde-700">
                          {pkg.price > 0 ? `$${pkg.price.toLocaleString('es-MX')} MXN` : 'Cotización'}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-verde-600 transition-all group-hover:gap-2">
                        Ver detalles <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  )
}

// ─── "Todos los paquetes" ─────────────────────────────────────────────────
function AllPackagesPage() {
  return (
    <>
      <div className="border-b border-gris-100 bg-gris-50">
        <Container className="py-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gris-500 flex-wrap">
            <Link href="/" className="hover:text-verde-600 transition-colors">Inicio</Link>
            <ChevronRight size={12} />
            <Link href="/casa-jardin" className="hover:text-verde-600 transition-colors">Casa y Jardín</Link>
            <ChevronRight size={12} />
            <span className="font-medium text-gris-800">Todos los paquetes</span>
          </nav>
        </Container>
      </div>

      <section className="bg-white py-12">
        <Container>
          <h1 className="font-serif text-3xl text-gris-900 lg:text-4xl">
            Todos los paquetes
          </h1>
          <p className="mt-2 text-gris-500">
            {GARDEN_PACKAGES.length} paquetes disponibles en {GARDEN_CATEGORIES.length} categorías
          </p>
        </Container>
      </section>

      <section className="bg-gris-50 py-12 lg:py-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {GARDEN_PACKAGES.map((pkg) => {
              const category = GARDEN_CATEGORIES.find((c) => c.id === pkg.category)
              return (
                <Link
                  key={pkg.slug}
                  href={`/casa-jardin/paquete/${pkg.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gris-100 bg-white shadow-[0_2px_20px_rgba(15,23,42,0.04)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(15,23,42,0.1)]"
                >
                  <div className={cn('relative flex h-40 items-center justify-center bg-gradient-to-br overflow-hidden', pkg.gradient)}>
                    {pkg.badge && (
                      <span className="absolute top-3 right-3 rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-sm ring-1 ring-white/30">
                        {pkg.badge === 'bestseller' ? '★' : pkg.badge === 'popular' ? '🔥' : '✨'}
                      </span>
                    )}
                    <span className="text-6xl drop-shadow-md transition-transform duration-500 group-hover:scale-110" aria-hidden="true">
                      {pkg.emoji}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: category?.color }}>
                      {category?.name}
                    </span>
                    <h3 className="font-sans text-sm font-semibold leading-snug text-gris-900 group-hover:text-verde-700 transition-colors">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-gris-500 line-clamp-2 flex-1">
                      {pkg.shortDescription}
                    </p>
                    <span className="text-base font-bold text-verde-700">
                      {pkg.price > 0 ? `$${pkg.price.toLocaleString('es-MX')}` : 'Cotización'}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </Container>
      </section>
    </>
  )
}
