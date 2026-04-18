import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  CheckCircle,
  MessageCircle,
  ShoppingCart,
  Package,
  Calendar,
  Users,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import Container from '@/components/ui/Container'
import Badge from '@/components/ui/Badge'
import {
  GARDEN_PACKAGES,
  GARDEN_CATEGORIES,
  getPackageBySlug,
  getPackagesByCategory,
} from '@/data/home-garden'
import { cn } from '@/lib/utils'

export function generateStaticParams() {
  return GARDEN_PACKAGES.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const pkg = getPackageBySlug(slug)
  if (!pkg) return {}

  return {
    title: `${pkg.name} — Biotiza Casa y Jardín`,
    description: pkg.shortDescription,
    alternates: { canonical: `https://biotiza.mx/casa-jardin/paquete/${pkg.slug}` },
    openGraph: {
      title: pkg.name,
      description: pkg.shortDescription,
      type: 'article',
    },
  }
}

// ─── JSON-LD ────────────────────────────────────────────────────────────────
function PackageJsonLd({ pkg, categoryName }: { pkg: (typeof GARDEN_PACKAGES)[number]; categoryName: string }) {
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: pkg.name,
    description: pkg.longDescription,
    category: categoryName,
    url: `https://biotiza.mx/casa-jardin/paquete/${pkg.slug}`,
    brand: { '@type': 'Brand', name: 'Biotiza' },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: pkg.price,
      priceCurrency: 'MXN',
      seller: { '@type': 'Organization', name: 'Biotiza', url: 'https://biotiza.mx' },
    },
  }
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
  )
}

export default async function PackagePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const pkg = getPackageBySlug(slug)
  if (!pkg) notFound()

  const category = GARDEN_CATEGORIES.find((c) => c.id === pkg.category)!
  const related = getPackagesByCategory(pkg.category).filter((p) => p.slug !== pkg.slug).slice(0, 3)

  const waText = encodeURIComponent(
    `Hola Biotiza, quiero pedir el paquete "${pkg.name}" ($${pkg.price.toLocaleString('es-MX')} MXN). ¿Cómo procedo?`,
  )

  return (
    <>
      <PackageJsonLd pkg={pkg} categoryName={category.name} />

      {/* Breadcrumb */}
      <div className="border-b border-gris-100 bg-gris-50">
        <Container className="py-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gris-500 flex-wrap">
            <Link href="/" className="hover:text-verde-600 transition-colors">Inicio</Link>
            <ChevronRight size={12} />
            <Link href="/casa-jardin" className="hover:text-verde-600 transition-colors">Casa y Jardín</Link>
            <ChevronRight size={12} />
            <Link href={`/casa-jardin/${category.slug}`} className="hover:text-verde-600 transition-colors">{category.name}</Link>
            <ChevronRight size={12} />
            <span className="font-medium text-gris-800 truncate max-w-[160px]">{pkg.name}</span>
          </nav>
        </Container>
      </div>

      {/* Hero con layout 2 columnas */}
      <section className="bg-white py-10 lg:py-14">
        <Container>
          <Link
            href={`/casa-jardin/${category.slug}`}
            className="inline-flex items-center gap-1.5 text-sm text-gris-500 hover:text-verde-600 transition-colors"
          >
            <ArrowLeft size={14} />
            Volver a {category.name}
          </Link>

          <div className="mt-6 grid gap-10 lg:grid-cols-[480px_1fr] lg:gap-14">
            {/* Columna izquierda: visual + CTAs */}
            <div className="space-y-5">
              <div className={cn('relative flex h-80 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br', pkg.gradient)}>
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-xl" aria-hidden="true" />
                <div className="absolute left-10 bottom-10 h-20 w-20 rounded-full bg-white/5" aria-hidden="true" />
                {pkg.badge && (
                  <span className="absolute top-4 right-4 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm ring-1 ring-white/30">
                    {pkg.badge === 'bestseller' ? '★ Bestseller' : pkg.badge === 'popular' ? '🔥 Popular' : '✨ Nuevo'}
                  </span>
                )}
                <span className="text-9xl drop-shadow-xl" aria-hidden="true">{pkg.emoji}</span>
              </div>

              {/* Precio + CTAs sticky en desktop */}
              <div className="lg:sticky lg:top-24">
                <div className="rounded-2xl border border-gris-100 bg-gradient-to-br from-verde-50 to-white p-6 shadow-[0_4px_20px_rgba(34,181,115,0.08)]">
                  <div className="flex items-end gap-3">
                    {pkg.priceStrike && (
                      <span className="text-lg text-gris-400 line-through">
                        ${pkg.priceStrike.toLocaleString('es-MX')}
                      </span>
                    )}
                    <div>
                      <span className="block text-3xl font-bold text-verde-700">
                        {pkg.price > 0 ? `$${pkg.price.toLocaleString('es-MX')}` : 'Cotización'}
                      </span>
                      <span className="text-xs text-gris-500">
                        {pkg.price > 0 ? 'MXN · envío gratis desde $500' : 'Según proyecto'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2.5">
                    <Link
                      href={`/cotizacion?paquete=${pkg.slug}`}
                      className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-verde-500 to-verde-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(34,181,115,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(34,181,115,0.45)]"
                    >
                      <ShoppingCart size={15} />
                      {pkg.price > 0 ? 'Pedir este paquete' : 'Solicitar cotización'}
                    </Link>
                    <a
                      href={`https://wa.me/523316022708?text=${waText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1ebe57]"
                    >
                      <MessageCircle size={15} />
                      Pedir por WhatsApp
                    </a>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {['COFEPRIS', 'OMRI Listed', 'Seguro familia'].map((b) => (
                      <span
                        key={b}
                        className="inline-flex items-center gap-1 rounded-full border border-verde-200 bg-verde-50 px-2 py-0.5 text-[10px] font-bold text-verde-700"
                      >
                        <ShieldCheck size={10} />
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha: info */}
            <div className="space-y-8">
              <div>
                <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: `${category.color}15`, color: category.color }}>
                  {category.name}
                </span>
                <h1 className="mt-3 font-serif text-3xl text-gris-900 lg:text-4xl">{pkg.name}</h1>
                <p className="mt-3 text-base text-gris-700 leading-relaxed lg:text-lg">
                  {pkg.longDescription}
                </p>
              </div>

              {/* Meta */}
              <div className="grid grid-cols-2 gap-3 rounded-2xl border border-gris-100 bg-gris-50 p-5">
                <div className="flex items-start gap-3">
                  <Package size={18} className="mt-0.5 shrink-0 text-verde-500" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gris-500">Cubre</p>
                    <p className="text-sm text-gris-800">{pkg.coverage}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar size={18} className="mt-0.5 shrink-0 text-verde-500" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gris-500">Frecuencia</p>
                    <p className="text-sm text-gris-800">{pkg.frequency}</p>
                  </div>
                </div>
              </div>

              {/* Productos incluidos */}
              <div>
                <h2 className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-gris-500">
                  Productos incluidos
                </h2>
                <div className="mt-4 space-y-3">
                  {pkg.products.map((p) => (
                    <div
                      key={p.productId}
                      className="flex items-start gap-4 rounded-xl border border-gris-100 bg-white p-4"
                    >
                      <Link
                        href={`/soluciones/${p.line}/${p.productId}`}
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-verde-50 text-verde-600 transition-colors hover:bg-verde-100"
                        aria-label={`Ver ficha de ${p.name}`}
                      >
                        <Sparkles size={18} />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <Link
                            href={`/soluciones/${p.line}/${p.productId}`}
                            className="text-sm font-semibold text-gris-900 hover:text-verde-700 transition-colors"
                          >
                            {p.name}
                          </Link>
                          <Badge line={p.line} size="sm" />
                          <span className="text-xs text-gris-400">{p.sizeCasa}</span>
                        </div>
                        <p className="mt-1 text-xs text-gris-600 leading-relaxed">{p.useDescription}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Incluye */}
              <div>
                <h2 className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-gris-500">
                  Qué incluye el kit
                </h2>
                <ul className="mt-4 space-y-2">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gris-700">
                      <CheckCircle size={16} className="mt-0.5 shrink-0 text-verde-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cómo usar */}
              <div>
                <h2 className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-gris-500">
                  Cómo usar
                </h2>
                <ol className="mt-4 space-y-3">
                  {pkg.howToUse.map((step, i) => (
                    <li key={step} className="flex items-start gap-3 text-sm text-gris-700">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-verde-100 text-xs font-bold text-verde-700">
                        {i + 1}
                      </span>
                      <span className="flex-1 leading-relaxed pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Mejor para */}
              <div>
                <h2 className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-gris-500">
                  <Users size={12} className="inline mr-1" />
                  Ideal para
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {pkg.bestFor.map((b) => (
                    <span
                      key={b}
                      className="inline-flex items-center rounded-full border border-verde-200 bg-verde-50 px-3 py-1 text-xs font-medium text-verde-700"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-gris-50 py-14 lg:py-20">
          <Container>
            <h2 className="font-serif text-2xl text-gris-900 lg:text-3xl">También te puede interesar</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/casa-jardin/paquete/${r.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gris-100 bg-white shadow-[0_2px_20px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,23,42,0.08)]"
                >
                  <div className={cn('relative flex h-36 items-center justify-center bg-gradient-to-br', r.gradient)}>
                    <span className="text-5xl drop-shadow-md">{r.emoji}</span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <h3 className="font-sans text-sm font-semibold leading-snug text-gris-900 group-hover:text-verde-700 transition-colors">
                      {r.name}
                    </h3>
                    <p className="text-xs text-gris-500 line-clamp-2 flex-1">
                      {r.shortDescription}
                    </p>
                    <span className="text-base font-bold text-verde-700">
                      {r.price > 0 ? `$${r.price.toLocaleString('es-MX')}` : 'Cotización'}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-verde-600 transition-all group-hover:gap-2">
                      Ver paquete <ArrowRight size={11} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  )
}
