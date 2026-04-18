import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, ArrowRight, ChevronRight } from 'lucide-react'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { ARTICLES, getCategoryStyle, type ArticleCategory } from '@/data/articles'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Blog Biotiza — Artículos técnicos sobre biosoluciones agrícolas',
  description:
    'Contenido técnico sobre bioestimulación, nutrición, bioprotección y fertirrigación. Actualizado por el equipo agronómico de Biotiza.',
  alternates: { canonical: 'https://biotiza.mx/academia/blog' },
  openGraph: {
    title: 'Blog Biotiza',
    description:
      'Artículos técnicos sobre biosoluciones agrícolas, escritos por agrónomos.',
    type: 'website',
  },
}

const CATEGORIES: Array<{ id: ArticleCategory | 'all'; label: string }> = [
  { id: 'all', label: 'Todos' },
  { id: 'bioestimulacion', label: 'Bioestimulación' },
  { id: 'nutricion', label: 'Nutrición' },
  { id: 'bioproteccion', label: 'Bioprotección' },
  { id: 'cultivo', label: 'Cultivo' },
  { id: 'fertirrigacion', label: 'Fertirrigación' },
]

export default function BlogIndexPage() {
  const sorted = [...ARTICLES].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
  const featured = sorted[0]
  const rest = sorted.slice(1)

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-gris-100 bg-gris-50">
        <Container className="py-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gris-500 flex-wrap">
            <Link href="/" className="hover:text-verde-600 transition-colors">Inicio</Link>
            <ChevronRight size={12} />
            <Link href="/academia" className="hover:text-verde-600 transition-colors">Academia</Link>
            <ChevronRight size={12} />
            <span className="font-medium text-gris-800">Blog</span>
          </nav>
        </Container>
      </div>

      {/* Header */}
      <section className="bg-white py-12 lg:py-16">
        <Container>
          <SectionHeading
            tag="Blog"
            title="Artículos técnicos"
            subtitle="Investigación aplicada, casos reales de campo y guías prácticas para productores profesionales."
            align="center"
          />

          {/* Filtros */}
          <div className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((c) => (
              <span
                key={c.id}
                className={cn(
                  'inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors',
                  c.id === 'all'
                    ? 'border-verde-500 bg-verde-500 text-white'
                    : 'border-gris-200 bg-white text-gris-600',
                )}
              >
                {c.label}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured */}
      {featured && (
        <section className="bg-gris-50 py-12 lg:py-16">
          <Container>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gris-500">
              Destacado
            </span>
            <Link
              href={`/academia/blog/${featured.slug}`}
              className="group mt-3 flex flex-col overflow-hidden rounded-3xl border border-gris-100 bg-white shadow-[0_2px_30px_rgba(15,23,42,0.05)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(15,23,42,0.1)] md:flex-row"
            >
              <div className={cn('relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br md:aspect-auto md:w-2/5', featured.imageGradient)}>
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" aria-hidden="true" />
                <div className="absolute left-8 bottom-10 h-24 w-24 rounded-full bg-white/5" aria-hidden="true" />
                <span className="text-8xl drop-shadow-lg transition-transform duration-500 group-hover:scale-105" aria-hidden="true">
                  {featured.emoji}
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-center gap-4 p-7 lg:p-10">
                {(() => {
                  const cat = getCategoryStyle(featured.category)
                  return (
                    <span className={cn('self-start rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ring-1', cat.bg, cat.text, cat.ring)}>
                      {featured.categoryLabel}
                    </span>
                  )
                })()}
                <h2 className="font-serif text-2xl text-gris-900 lg:text-3xl group-hover:text-verde-700 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-sm leading-relaxed text-gris-600 lg:text-base">
                  {featured.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-gris-500">
                  <span>Por <strong className="text-gris-700">{featured.author.name}</strong></span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} /> {featured.readTime} min
                  </span>
                  <span>{new Date(featured.publishedAt).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-verde-600 transition-all group-hover:gap-2">
                  Leer artículo <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </Container>
        </section>
      )}

      {/* Listado */}
      <section className="bg-white py-12 lg:py-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((article) => {
              const cat = getCategoryStyle(article.category)
              return (
                <Link
                  key={article.slug}
                  href={`/academia/blog/${article.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gris-100 bg-white shadow-[0_2px_20px_rgba(15,23,42,0.04)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,23,42,0.1)]"
                >
                  <div className={cn('relative flex h-48 items-center justify-center bg-gradient-to-br overflow-hidden', article.imageGradient)}>
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" aria-hidden="true" />
                    <span className="text-6xl drop-shadow-md transition-transform duration-500 group-hover:scale-110" aria-hidden="true">
                      {article.emoji}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="flex items-center justify-between">
                      <span className={cn('rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ring-1', cat.bg, cat.text, cat.ring)}>
                        {article.categoryLabel}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gris-400">
                        <Clock size={11} /> {article.readTime} min
                      </span>
                    </div>
                    <h3 className="font-sans text-base font-semibold leading-snug text-gris-900 group-hover:text-verde-700 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gris-500 line-clamp-3 flex-1">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-verde-600 transition-all group-hover:gap-2.5">
                      Leer más <ArrowRight size={13} />
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
