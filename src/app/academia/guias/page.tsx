/**
 * /academia/guias — Guías técnicas de Biotiza
 *
 * Hub que organiza el conocimiento agronómico en cuatro tipos de guías:
 *   1. Guías por cultivo (protocolos fenológicos completos)
 *   2. Guías técnicas por tema (deficiencias, plagas, MIP)
 *   3. Guías de herramientas (uso de las calculadoras)
 *   4. Descargables (futuros PDFs)
 *
 * Se alimenta de `src/data/articles/*` con filtros temáticos. No es un
 * listado de artículos — es un mapa práctico para que el agricultor
 * encuentre la guía exacta que necesita.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Calculator,
  Microscope,
  Sprout,
  Shield,
  TrendingUp,
  Layers,
  FileText,
  Download,
} from 'lucide-react'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { ARTICLES, getCategoryStyle } from '@/data/articles'
import { CROP_PROTOCOLS } from '@/data/crops'
import { getCropImage } from '@/data/crop-images'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Guías técnicas — Academia',
  description:
    'Guías agronómicas prácticas: protocolos por cultivo, manejo de deficiencias, bioprotección y herramientas. Conocimiento aplicable directo a tu campo.',
  alternates: { canonical: '/academia/guias' },
  openGraph: {
    title: 'Guías técnicas — Academia Biotiza',
    description:
      'Protocolos completos, manuales por cultivo y referencias para productores que exigen resultados.',
  },
}

// ─── Categorías de guías ──────────────────────────────────────────────────

const GUIDE_CATEGORIES = [
  {
    icon: Sprout,
    title: 'Por cultivo',
    description: 'Protocolos fenológicos paso a paso: etapas, productos, dosis y calendario.',
    href: '/cultivos',
    color: 'verde',
    count: `${CROP_PROTOCOLS.length} cultivos`,
  },
  {
    icon: Microscope,
    title: 'Nutrición mineral',
    description: 'Deficiencias, antagonismos, calibración de fertirriego y análisis foliar.',
    href: '/academia/blog?cat=nutricion',
    color: 'verde',
    count: 'Diagnóstico + corrección',
  },
  {
    icon: TrendingUp,
    title: 'Bioestimulación',
    description: 'Aminoácidos, algas, hormonas y cómo dosificarlos por etapa fenológica.',
    href: '/academia/blog?cat=bioestimulacion',
    color: 'naranja',
    count: 'EBIC + evidencia',
  },
  {
    icon: Shield,
    title: 'Bioprotección',
    description: 'MIP, biológicos vs químicos, compatibilidad y rotación de moléculas.',
    href: '/academia/blog?cat=bioproteccion',
    color: 'azul',
    count: 'Trichoderma · Bacillus · Beauveria',
  },
  {
    icon: Calculator,
    title: 'Herramientas',
    description: 'Cómo usar la calculadora de dosis, diagnóstico visual y ROI de un programa.',
    href: '/herramientas',
    color: 'naranja',
    count: '4 herramientas',
  },
  {
    icon: Layers,
    title: 'Sostenibilidad',
    description: 'Suelo vivo, certificación OMRI, mercados de exportación y huella ambiental.',
    href: '/academia/blog?cat=cultivo',
    color: 'azul',
    count: 'OMRI · COFEPRIS · USDA',
  },
] as const

const COLOR_CLASSES: Record<string, { bg: string; text: string; border: string; hover: string; ring: string }> = {
  verde:   { bg: 'bg-verde-50',   text: 'text-verde-700',   border: 'border-verde-100',   hover: 'hover:border-verde-300',   ring: 'ring-verde-100' },
  azul:    { bg: 'bg-azul-50',    text: 'text-azul-700',    border: 'border-azul-100',    hover: 'hover:border-azul-300',    ring: 'ring-azul-100' },
  naranja: { bg: 'bg-naranja-50', text: 'text-naranja-700', border: 'border-naranja-100', hover: 'hover:border-naranja-300', ring: 'ring-naranja-100' },
}

// Selección curada de artículos "deep dive" — los que de verdad funcionan como guía
const FEATURED_GUIDE_SLUGS = [
  'deficiencia-calcio-tomate',
  'bioproteccion-vs-quimicos',
  'que-son-bioestimulantes',
]

export default function GuiasPage() {
  const featuredArticles = FEATURED_GUIDE_SLUGS.map(slug =>
    ARTICLES.find(a => a.slug === slug),
  ).filter((a): a is NonNullable<typeof a> => Boolean(a))

  // 8 cultivos con foto HD para el hero visual
  const cropsWithPhoto = CROP_PROTOCOLS
    .map(c => ({ ...c, photo: getCropImage(c.slug) }))
    .filter(c => c.photo)
    .slice(0, 8)

  return (
    <>
      {/* ── Breadcrumb ────────────────────────────────────────────────── */}
      <div className="bg-gris-50 border-b border-gris-100">
        <Container>
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 py-3 text-xs text-gris-500">
            <Link href="/" className="hover:text-verde-700 transition-colors">Inicio</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/academia" className="hover:text-verde-700 transition-colors">Academia</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-semibold text-gris-800">Guías técnicas</span>
          </nav>
        </Container>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-verde-900 via-verde-800 to-gris-900 py-24 lg:py-32">
        <div className="absolute inset-0 dot-pattern-dark opacity-40" aria-hidden="true" />
        <div className="absolute -right-20 top-10 h-80 w-80 rounded-full bg-verde-500/15 blur-3xl" aria-hidden="true" />
        <div className="absolute -left-10 bottom-0 h-72 w-72 rounded-full bg-azul-500/10 blur-3xl" aria-hidden="true" />

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-verde-300 backdrop-blur-sm">
              <BookOpen size={13} />
              Academia · Guías
            </span>
            <h1 className="mt-4 font-serif text-4xl text-white text-balance lg:text-6xl">
              Guías técnicas que se aplican en campo
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-gris-200 text-pretty lg:text-lg">
              Protocolos paso a paso por cultivo, manuales por tema y referencias de manejo,
              redactados por agrónomos con experiencia en cultivos de exportación.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/cultivos"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-gris-900 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(255,255,255,0.15)]"
              >
                Guías por cultivo
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/academia/blog"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                Ver el blog
                <FileText size={15} />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Categorías de guías ───────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <SectionHeading
            tag="Encuentra la guía que necesitas"
            title="Guías por tema"
            subtitle="Cada bloque es un punto de entrada al conocimiento. Empieza por donde más urge."
            align="center"
          />
          <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GUIDE_CATEGORIES.map(({ icon: Icon, title, description, href, color, count }) => {
              const c = COLOR_CLASSES[color]
              return (
                <Link
                  key={href + title}
                  href={href}
                  className={cn(
                    'group flex flex-col gap-4 rounded-2xl border bg-white p-6 transition-all duration-300',
                    'shadow-[0_2px_20px_rgba(15,23,42,0.04)] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,23,42,0.10)]',
                    c.border, c.hover,
                  )}
                >
                  <div className={cn('flex h-14 w-14 items-center justify-center rounded-xl', c.bg)}>
                    <Icon size={24} className={c.text} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-gris-900 leading-tight">
                      {title}
                    </h3>
                    <p className={cn('mt-1 text-xs font-semibold uppercase tracking-wider', c.text)}>
                      {count}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-gris-600">
                      {description}
                    </p>
                  </div>
                  <span className={cn('mt-auto inline-flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2', c.text)}>
                    Abrir <ArrowRight size={13} />
                  </span>
                </Link>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ── Guías destacadas con foto ─────────────────────────────────── */}
      <section className="bg-gris-50 py-16 lg:py-24 border-y border-gris-100">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <SectionHeading
              tag="Lecturas obligadas"
              title="Guías destacadas"
              align="left"
              animate={false}
            />
            <Link
              href="/academia/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-verde-600 hover:text-verde-700 transition-colors"
            >
              Ver todas
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredArticles.map(article => {
              const cat = getCategoryStyle(article.category)
              return (
                <Link
                  key={article.slug}
                  href={`/academia/blog/${article.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-gris-100 shadow-[0_2px_20px_rgba(15,23,42,0.04)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(15,23,42,0.10)]"
                >
                  <div className={cn('relative flex h-44 items-center justify-center bg-gradient-to-br overflow-hidden', article.imageGradient)}>
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/15" aria-hidden="true" />
                    <div className="absolute left-6 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 backdrop-blur-sm">
                      <span className={cn('text-[10px] font-bold uppercase tracking-wide', cat.text)}>
                        {article.categoryLabel}
                      </span>
                    </div>
                    <span className="text-6xl drop-shadow-md transition-transform duration-500 group-hover:scale-110" aria-hidden="true">
                      {article.emoji}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <h3 className="font-sans text-base font-semibold leading-snug text-gris-900 group-hover:text-verde-700 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gris-500 line-clamp-3 flex-1">
                      {article.excerpt}
                    </p>
                    <span className="text-xs text-gris-400">
                      {article.readTime} min de lectura
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ── Cultivos con guía completa ────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <SectionHeading
            tag="Protocolos por cultivo"
            title="Cultivos con guía completa"
            subtitle="Cada guía incluye etapas fenológicas, productos por etapa, dosis y frecuencia. Listas para imprimir."
            align="center"
          />

          <div className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cropsWithPhoto.map(crop => (
              <Link
                key={crop.slug}
                href={`/cultivos/${crop.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-gris-100 aspect-[4/5] shadow-[0_4px_20px_rgba(15,23,42,0.08)] hover:shadow-[0_18px_40px_rgba(15,23,42,0.18)] transition-shadow duration-500"
              >
                {crop.photo && (
                  <Image
                    src={crop.photo.src}
                    alt={crop.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover scale-105 transition-transform duration-[1.2s] group-hover:scale-115"
                  />
                )}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 30%, rgba(11, 60, 47, 0.92) 100%)' }} aria-hidden="true" />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <span className="text-3xl mb-2 drop-shadow-lg" aria-hidden="true">{crop.emoji}</span>
                  <p className="font-serif text-xl text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                    {crop.name}
                  </p>
                  <p className="mt-1 text-xs text-white/80 font-medium">
                    {crop.stages.length} etapas · {crop.cycle_days ?? '—'} días
                  </p>
                  <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-verde-500/30 ring-1 ring-verde-300/40 px-3 py-1 text-[10px] font-bold text-verde-100 uppercase tracking-[0.1em] backdrop-blur-sm">
                    Ver guía
                    <ArrowRight size={11} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/cultivos"
              className="inline-flex items-center gap-2 rounded-xl border border-verde-200 bg-verde-50 px-5 py-3 text-sm font-semibold text-verde-700 hover:bg-verde-100 hover:border-verde-300 transition-all"
            >
              Ver los {CROP_PROTOCOLS.length} cultivos
              <ArrowRight size={14} />
            </Link>
          </div>
        </Container>
      </section>

      {/* ── Descargables ──────────────────────────────────────────────── */}
      <section className="bg-verde-50 py-16 lg:py-20 border-t border-verde-100">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Download size={32} className="mx-auto text-verde-600" />
            <h2 className="mt-4 font-serif text-3xl text-gris-900 lg:text-4xl">
              Descarga las guías que estás usando hoy
            </h2>
            <p className="mt-4 text-base text-gris-600 leading-relaxed">
              Nuestros agrónomos te envían los PDFs personalizados para tu cultivo y región
              cuando agendas una asesoría sin costo.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 rounded-xl bg-verde-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-verde-700 hover:shadow-[0_10px_30px_rgba(34,181,115,0.25)]"
              >
                Solicitar guía PDF
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/herramientas/diagnostico"
                className="inline-flex items-center gap-2 rounded-xl border border-verde-200 bg-white px-5 py-3 text-sm font-semibold text-verde-700 transition-all hover:bg-verde-50"
              >
                Diagnóstico online
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
