import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Clock,
  Calendar,
  CheckCircle,
  Info,
  AlertTriangle,
  Quote,
  User as UserIcon,
  Tag,
} from 'lucide-react'
import Container from '@/components/ui/Container'
import { ARTICLES, getArticleBySlug, getCategoryStyle } from '@/data/articles'
import { PRODUCTS } from '@/data/products'
import { PRODUCT_LINES } from '@/data/constants'
import { cn } from '@/lib/utils'

// ─── Static params ──────────────────────────────────────────────────────────
export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }))
}

// ─── Metadata ──────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.tags,
    alternates: { canonical: `https://biotiza.mx/academia/blog/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: [article.author.name],
      tags: article.tags,
      url: `https://biotiza.mx/academia/blog/${article.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
    },
  }
}

// ─── JSON-LD ───────────────────────────────────────────────────────────────
function ArticleJsonLd({ article }: { article: (typeof ARTICLES)[number] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Biotiza',
      logo: {
        '@type': 'ImageObject',
        url: 'https://biotiza.mx/images/biotiza-logo.png',
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    keywords: article.tags.join(', '),
    inLanguage: 'es-MX',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://biotiza.mx/academia/blog/${article.slug}`,
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const cat = getCategoryStyle(article.category)
  const related = ARTICLES.filter((a) => a.slug !== article.slug && a.category === article.category).slice(0, 2)
  const relatedProducts = (article.relatedProducts ?? [])
    .map(({ slug: s }) => PRODUCTS.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <>
      <ArticleJsonLd article={article} />

      {/* Breadcrumb */}
      <div className="border-b border-gris-100 bg-gris-50">
        <Container className="py-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gris-500 flex-wrap">
            <Link href="/" className="hover:text-verde-600 transition-colors">Inicio</Link>
            <ChevronRight size={12} />
            <Link href="/academia" className="hover:text-verde-600 transition-colors">Academia</Link>
            <ChevronRight size={12} />
            <Link href="/academia/blog" className="hover:text-verde-600 transition-colors">Blog</Link>
            <ChevronRight size={12} />
            <span className="font-medium text-gris-800 line-clamp-1">{article.title}</span>
          </nav>
        </Container>
      </div>

      {/* Hero */}
      <section className={cn('relative overflow-hidden py-16 lg:py-20 bg-gradient-to-br', article.imageGradient)}>
        <div className="absolute -right-20 top-10 h-80 w-80 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
        <div className="absolute -left-10 bottom-0 h-64 w-64 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
        <Container className="relative">
          <Link
            href="/academia/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            Todos los artículos
          </Link>

          <div className="mx-auto mt-5 max-w-3xl text-center">
            <span className={cn('inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white ring-1 ring-white/30 backdrop-blur-sm')}>
              {article.categoryLabel}
            </span>
            <h1 className="mt-5 font-serif text-3xl text-white text-balance lg:text-5xl">
              {article.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-white/90 text-pretty lg:text-base">
              {article.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-xs text-white/80">
              <span className="inline-flex items-center gap-1.5">
                <UserIcon size={13} /> {article.author.name}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={13} />
                {new Date(article.publishedAt).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={13} /> {article.readTime} min de lectura
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Cuerpo */}
      <section className="bg-white py-14 lg:py-20">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_300px]">
            {/* Contenido */}
            <article className="prose-like">
              {article.blocks.map((block, idx) => {
                switch (block.type) {
                  case 'p':
                    return (
                      <p key={idx} className="mt-5 text-base leading-[1.85] text-gris-700 first:mt-0">
                        {block.text}
                      </p>
                    )
                  case 'h2':
                    return (
                      <h2 key={idx} id={block.id} className="mt-12 font-serif text-2xl text-gris-900 first:mt-0 lg:text-3xl">
                        {block.text}
                      </h2>
                    )
                  case 'h3':
                    return (
                      <h3 key={idx} id={block.id} className="mt-8 font-serif text-xl text-gris-900">
                        {block.text}
                      </h3>
                    )
                  case 'ul':
                    return (
                      <ul key={idx} className="mt-5 space-y-2.5">
                        {block.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-base leading-relaxed text-gris-700">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-verde-500" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )
                  case 'ol':
                    return (
                      <ol key={idx} className="mt-5 space-y-3">
                        {block.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-base leading-relaxed text-gris-700">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-verde-100 text-xs font-bold text-verde-700">
                              {i + 1}
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ol>
                    )
                  case 'quote':
                    return (
                      <blockquote key={idx} className="my-8 rounded-2xl border-l-4 border-verde-500 bg-verde-50/50 p-6">
                        <Quote size={20} className="mb-3 text-verde-500" />
                        <p className="font-serif text-xl italic leading-relaxed text-gris-800">
                          {block.text}
                        </p>
                        {block.author && (
                          <cite className="mt-3 block text-sm font-medium not-italic text-gris-500">
                            — {block.author}
                          </cite>
                        )}
                      </blockquote>
                    )
                  case 'callout': {
                    const icons = { info: Info, warn: AlertTriangle, success: CheckCircle }
                    const Icon = icons[block.variant]
                    const colorMap = {
                      info:    { bg: 'bg-azul-50',    text: 'text-azul-700',    ring: 'ring-azul-200',    icon: 'text-azul-500'    },
                      warn:    { bg: 'bg-naranja-50', text: 'text-naranja-700', ring: 'ring-naranja-200', icon: 'text-naranja-500' },
                      success: { bg: 'bg-verde-50',   text: 'text-verde-700',   ring: 'ring-verde-200',   icon: 'text-verde-500'   },
                    }
                    const c = colorMap[block.variant]
                    return (
                      <aside
                        key={idx}
                        className={cn('my-8 flex gap-4 rounded-2xl p-5 ring-1', c.bg, c.ring)}
                      >
                        <Icon size={22} className={cn('mt-0.5 shrink-0', c.icon)} />
                        <div>
                          <p className={cn('font-semibold', c.text)}>{block.title}</p>
                          <p className="mt-1 text-sm leading-relaxed text-gris-700">{block.text}</p>
                        </div>
                      </aside>
                    )
                  }
                  default:
                    return null
                }
              })}

              {/* Tags */}
              <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-gris-100 pt-6">
                <Tag size={13} className="text-gris-400" />
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gris-100 px-3 py-1 text-xs font-medium text-gris-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              {/* Autor */}
              <div className="rounded-2xl border border-gris-100 bg-gris-50 p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gris-500">
                  Autor
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-verde-500 to-verde-600 text-lg font-bold text-white">
                    {article.author.name.split(' ').slice(0, 2).map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gris-900">{article.author.name}</p>
                    <p className="text-xs text-gris-500">{article.author.role}</p>
                  </div>
                </div>
              </div>

              {/* Productos relacionados */}
              {relatedProducts.length > 0 && (
                <div className="rounded-2xl border border-verde-100 bg-verde-50/60 p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-verde-700">
                    Productos mencionados
                  </p>
                  <div className="mt-3 space-y-2">
                    {relatedProducts.map((p) => {
                      const line = PRODUCT_LINES.find((l) => l.id === p.line)
                      return (
                        <Link
                          key={p.id}
                          href={`/soluciones/${p.line}/${p.slug}`}
                          className="block rounded-lg border border-verde-100 bg-white p-3 transition-colors hover:border-verde-300"
                        >
                          <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: line?.color }}>
                            {line?.name}
                          </span>
                          <p className="mt-0.5 text-sm font-semibold text-gris-900">{p.name}</p>
                          <p className="mt-1 text-xs text-gris-500 line-clamp-2">{p.description}</p>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* CTA cotización */}
              <div className="rounded-2xl bg-gris-900 p-5 text-white">
                <p className="font-serif text-lg leading-tight">
                  ¿Necesitas aplicar esto en tu cultivo?
                </p>
                <p className="mt-2 text-sm text-gris-300">
                  Nuestro equipo agronómico te construye un programa a medida.
                </p>
                <Link
                  href="/cotizacion"
                  className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-verde-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-verde-600"
                >
                  Solicitar cotización
                  <ArrowRight size={13} />
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Artículos relacionados */}
      {related.length > 0 && (
        <section className="bg-gris-50 py-14 lg:py-20">
          <Container>
            <h2 className="font-serif text-2xl text-gris-900 lg:text-3xl">Sigue leyendo</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {related.map((a) => {
                const c = getCategoryStyle(a.category)
                return (
                  <Link
                    key={a.slug}
                    href={`/academia/blog/${a.slug}`}
                    className="group flex gap-5 rounded-2xl border border-gris-100 bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,23,42,0.08)]"
                  >
                    <div className={cn('flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-3xl', a.imageGradient)}>
                      {a.emoji}
                    </div>
                    <div className="flex-1">
                      <span className={cn('rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ring-1', c.bg, c.text, c.ring)}>
                        {a.categoryLabel}
                      </span>
                      <h3 className="mt-2 text-sm font-semibold text-gris-900 leading-snug group-hover:text-verde-700 transition-colors">
                        {a.title}
                      </h3>
                      <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-verde-600">
                        Leer <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </Container>
        </section>
      )}
    </>
  )
}
