/**
 * app/herramientas/page.tsx — Landing de Herramientas Biotiza
 * Server Component
 */

import Link from 'next/link'
import { Calculator, Stethoscope, CheckSquare, TrendingUp } from 'lucide-react'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'

// ─── Data ────────────────────────────────────────────────────────────────────

const TOOLS = [
  {
    href:        '/herramientas/calculadora-dosis',
    title:       'Calculadora de Dosis',
    description: 'Calcula la dosis exacta de cualquier producto para tu superficie y método de aplicación',
    Icon:        Calculator,
    iconBg:      'bg-verde-100',
    iconColor:   'text-verde-600',
    accent:      'hover:border-verde-400',
    tag:         'Nutrición',
    tagColor:    'bg-verde-50 text-verde-700',
  },
  {
    href:        '/herramientas/diagnostico',
    title:       'Diagnóstico de Deficiencias',
    description: 'Identifica deficiencias nutricionales y problemas en tu cultivo con nuestro asistente guiado',
    Icon:        Stethoscope,
    iconBg:      'bg-naranja-100',
    iconColor:   'text-naranja-600',
    accent:      'hover:border-naranja-400',
    tag:         'Diagnóstico',
    tagColor:    'bg-naranja-50 text-naranja-600',
  },
  {
    href:        '/herramientas/compatibilidad',
    title:       'Compatibilidad de Productos',
    description: 'Verifica si puedes mezclar productos en el mismo tanque antes de aplicar',
    Icon:        CheckSquare,
    iconBg:      'bg-azul-100',
    iconColor:   'text-azul-600',
    accent:      'hover:border-azul-400',
    tag:         'Mezclas',
    tagColor:    'bg-azul-100 text-azul-700',
  },
  {
    href:        '/herramientas/calculadora-roi',
    title:       'Calculadora de ROI',
    description: 'Estima el retorno de inversión al implementar el programa Biotiza en tu huerto',
    Icon:        TrendingUp,
    iconBg:      'bg-verde-100',
    iconColor:   'text-verde-700',
    accent:      'hover:border-verde-400',
    tag:         'Financiero',
    tagColor:    'bg-verde-50 text-verde-700',
  },
] as const

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HerramientasPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-verde-900 to-verde-700 py-20 lg:py-28">
        <Container narrow>
          <div className="text-center text-white">
            <span className="mb-4 inline-block rounded-full bg-verde-600/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-verde-100">
              Herramientas Técnicas
            </span>
            <h1 className="font-serif text-4xl font-normal leading-tight text-white sm:text-5xl lg:text-6xl">
              Toma mejores decisiones<br className="hidden sm:block" /> en campo
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-verde-100">
              Calculadoras, diagnósticos y verificadores diseñados para ayudarte a aplicar los productos Biotiza con precisión y confianza.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Tool Cards ── */}
      <section className="bg-gris-50 py-16 lg:py-24">
        <Container>
          <SectionHeading
            tag="4 herramientas disponibles"
            title="Todo lo que necesitas para un programa exitoso"
            subtitle="Gratis, sin registro. Directamente pensadas para productores de exportación."
            className="mb-12 lg:mb-16"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            {TOOLS.map(({ href, title, description, Icon, iconBg, iconColor, accent, tag, tagColor }) => (
              <Link
                key={href}
                href={href}
                className={`group flex flex-col rounded-2xl border border-gris-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${accent}`}
              >
                {/* Icon */}
                <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}>
                  <Icon className={`h-6 w-6 ${iconColor}`} strokeWidth={1.75} />
                </div>

                {/* Tag */}
                <span className={`mb-3 inline-block self-start rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${tagColor}`}>
                  {tag}
                </span>

                {/* Content */}
                <h2 className="mb-2 font-serif text-xl font-normal text-gris-900 leading-snug">
                  {title}
                </h2>
                <p className="flex-1 text-sm leading-relaxed text-gris-500">
                  {description}
                </p>

                {/* CTA */}
                <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-verde-600 group-hover:text-verde-700">
                  Abrir herramienta
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-white py-16">
        <Container narrow>
          <div className="rounded-2xl bg-verde-50 border border-verde-100 px-8 py-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-verde-600 mb-3">
              ¿Prefieres hablar con un experto?
            </p>
            <h2 className="font-serif text-2xl font-normal text-gris-900 mb-4">
              Nuestro equipo técnico está disponible para asesorarte
            </h2>
            <p className="text-gris-500 text-sm mb-6 max-w-lg mx-auto">
              Si tienes dudas específicas sobre tu cultivo o necesitas un programa personalizado, escríbenos por WhatsApp o solicita una cotización.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/523300000000?text=Hola%2C+necesito+asesoría+técnica+sobre+productos+Biotiza"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-verde-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-verde-600"
              >
                💬 Hablar por WhatsApp
              </a>
              <Link
                href="/cotizacion"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-verde-300 bg-white px-6 py-3 text-sm font-semibold text-verde-700 transition-colors hover:bg-verde-50"
              >
                Solicitar cotización
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
