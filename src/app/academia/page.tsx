import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Leaf,
  GraduationCap,
  FileText,
  Wrench,
} from 'lucide-react'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { ARTICLES, getLatestArticles, getCategoryStyle } from '@/data/articles'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Academia Biotiza — Aprende con expertos agrícolas',
  description:
    'Artículos, guías y herramientas gratuitas sobre bioestimulantes, nutrición, bioprotección y fertirrigación. Academia Biotiza, para productores que exigen resultados.',
  openGraph: {
    title: 'Academia Biotiza',
    description:
      'Contenido técnico sobre nutrición, bioestimulación y bioprotección, validado por agrónomos.',
  },
}

const PILLARS = [
  {
    icon: BookOpen,
    title: 'Blog agrícola',
    description: 'Artículos técnicos escritos por nuestro equipo agronómico y especialistas invitados.',
    href: '/academia/blog',
    color: 'verde',
  },
  {
    icon: FileText,
    title: 'Guías por cultivo',
    description: 'Protocolos fenológicos completos: etapas, productos, dosis y calendario.',
    href: '/cultivos',
    color: 'azul',
  },
  {
    icon: Wrench,
    title: 'Herramientas',
    description: 'Calculadora de dosis, diagnóstico visual, compatibilidad y ROI.',
    href: '/herramientas',
    color: 'naranja',
  },
  {
    icon: Calculator,
    title: 'Casos de estudio',
    description: 'Resultados reales de productores mexicanos usando nuestros programas.',
    href: '/academia/blog?cat=cultivo',
    color: 'azul',
  },
] as const

const COLOR_CLASSES: Record<string, { bg: string; text: string; border: string; hover: string }> = {
  verde:   { bg: 'bg-verde-50',   text: 'text-verde-600',   border: 'border-verde-100',   hover: 'hover:border-verde-300' },
  azul:    { bg: 'bg-azul-50',    text: 'text-azul-600',    border: 'border-azul-100',    hover: 'hover:border-azul-300'  },
  naranja: { bg: 'bg-naranja-50', text: 'text-naranja-600', border: 'border-naranja-100', hover: 'hover:border-naranja-300' },
}

export default function AcademiaPage() {
  const latest = getLatestArticles(3)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-verde-900 via-verde-800 to-gris-900 py-24 lg:py-32">
        <div className="absolute inset-0 dot-pattern-dark opacity-40" aria-hidden="true" />
        <div className="absolute -right-20 top-10 h-80 w-80 rounded-full bg-verde-500/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -left-10 bottom-0 h-72 w-72 rounded-full bg-azul-500/10 blur-3xl" aria-hidden="true" />

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-verde-300 backdrop-blur-sm">
              <GraduationCap size={13} />
              Academia Biotiza
            </span>
            <h1 className="mt-4 font-serif text-4xl text-white text-balance lg:text-6xl">
              Conocimiento agronómico sin rodeos
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-gris-300 text-pretty lg:text-lg">
              Todo lo que necesitas saber sobre biosoluciones agrícolas, escrito por personas que
              están en campo todos los días. Sin jerga innecesaria. Con datos que puedes aplicar mañana.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/academia/blog"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-gris-900 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(255,255,255,0.15)]"
              >
                Explorar artículos
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/herramientas"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                Usar las herramientas
                <Wrench size={15} />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Pilares */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <SectionHeading
            tag="Cómo aprender con Biotiza"
            title="Cuatro pilares, un mismo objetivo"
            subtitle="Te acompañamos desde la teoría hasta la aplicación en campo, con recursos prácticos y gratuitos."
            align="center"
          />
          <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2">
            {PILLARS.map(({ icon: Icon, title, description, href, color }) => {
              const c = COLOR_CLASSES[color]
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'group flex gap-5 rounded-2xl border bg-white p-6 transition-all duration-300',
                    'shadow-[0_2px_20px_rgba(15,23,42,0.04)] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]',
                    c.border, c.hover,
                  )}
                >
                  <div className={cn('flex h-14 w-14 shrink-0 items-center justify-center rounded-xl', c.bg)}>
                    <Icon size={24} className={c.text} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl text-gris-900 group-hover:text-gris-700 transition-colors">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gris-600">
                      {description}
                    </p>
                    <span className={cn('mt-3 inline-flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2', c.text)}>
                      Abrir <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Últimos artículos */}
      <section className="bg-gris-50 py-16 lg:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <SectionHeading
              tag="Últimas publicaciones"
              title="Artículos recientes"
              align="left"
              animate={false}
            />
            <Link
              href="/academia/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-verde-600 hover:text-verde-700 transition-colors"
            >
              Ver todos
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {latest.map((article) => {
              const cat = getCategoryStyle(article.category)
              return (
                <Link
                  key={article.slug}
                  href={`/academia/blog/${article.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-gris-100 shadow-[0_2px_20px_rgba(15,23,42,0.04)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,23,42,0.1)]"
                >
                  <div className={cn('relative flex h-44 items-center justify-center bg-gradient-to-br overflow-hidden', article.imageGradient)}>
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" aria-hidden="true" />
                    <span className="text-6xl drop-shadow-md transition-transform duration-500 group-hover:scale-110" aria-hidden="true">
                      {article.emoji}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <span className={cn('self-start rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ring-1', cat.bg, cat.text, cat.ring)}>
                      {article.categoryLabel}
                    </span>
                    <h3 className="font-sans text-base font-semibold leading-snug text-gris-900 group-hover:text-verde-700 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gris-500 line-clamp-2 flex-1">
                      {article.excerpt}
                    </p>
                    <span className="text-xs text-gris-400">
                      {article.readTime} min · {new Date(article.publishedAt).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-verde-800 py-16 lg:py-20">
        <div className="absolute inset-0 gradient-brand-radial opacity-80" aria-hidden="true" />
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <Leaf size={32} className="mx-auto text-verde-300" />
            <h2 className="mt-4 font-serif text-3xl text-white text-balance lg:text-4xl">
              ¿Prefieres hablar con un agrónomo de carne y hueso?
            </h2>
            <p className="mt-4 text-base text-verde-100 text-pretty">
              Nuestro equipo te ayuda a aterrizar cualquiera de estos conceptos a tu cultivo,
              etapa fenológica y región específica.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-verde-800 transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Agendar asesoría
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/herramientas/diagnostico"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/15"
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
