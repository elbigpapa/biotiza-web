/**
 * WhyBiotizaSection.tsx — Escena 2: Proceso · Rediseño Phase 2
 *
 * Línea de tiempo conectada de 4 actos (Origen → Validación → Asesoría →
 * Resultado): un riel continuo con nodos de color, números editoriales
 * grandes y la descripción visible en cada paso. El claim apunta al
 * resultado — más rendimiento, mejor calidad y una cosecha que vale más.
 */

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Scene from '@/components/redesign/Scene'
import { Reveal, RevealItem } from '@/components/redesign/ScrollReveal'

interface Stage {
  num: string
  sub: string
  title: string
  em?: boolean
  description: string
  dot: string
}

const STAGES: Stage[] = [
  {
    num: '01',
    sub: 'Origen',
    title: 'Laboratorio',
    description:
      'Formulación con materias primas certificadas. Cada lote se analiza antes de etiquetarse.',
    dot: 'bg-ink',
  },
  {
    num: '02',
    sub: 'Validación',
    title: 'Ensayo',
    em: true,
    description:
      'Pruebas en campo con productores en distintas zonas antes de liberarse a catálogo comercial.',
    dot: 'bg-azul-500',
  },
  {
    num: '03',
    sub: 'Asesoría',
    title: 'Acompañamiento',
    description:
      'Agrónomo asignado por cultivo y zona. Plan, dosis y calendario diseñados para tu rancho.',
    dot: 'bg-verde-600',
  },
  {
    num: '04',
    sub: 'Resultado',
    title: 'Cosecha medible',
    em: true,
    description:
      'Indicadores objetivos: calibre, peso, Brix y firmeza. Datos en cada visita técnica.',
    dot: 'bg-naranja-500',
  },
]

/** Colores de nodo mapeados explícitamente para que Tailwind los conserve. */
const DOT_MAP: Record<string, string> = {
  'bg-ink': 'bg-ink',
  'bg-azul-500': 'bg-azul-500',
  'bg-verde-600': 'bg-verde-600',
  'bg-naranja-500': 'bg-naranja-500',
}

/** Color del número grande, a juego con el nodo de cada acto. */
const NUM_MAP: Record<string, string> = {
  'bg-ink': 'text-ink',
  'bg-azul-500': 'text-azul-500',
  'bg-verde-600': 'text-verde-600',
  'bg-naranja-500': 'text-naranja-500',
}

export default function WhyBiotizaSection() {
  const lastIndex = STAGES.length - 1

  return (
    <Scene tone="light" id="proceso">
      {/* ── Encabezado ─────────────────────────────────────────── */}
      <Reveal>
        <RevealItem>
          <p className="eyebrow-edit mb-6">— 02 · Proceso</p>
        </RevealItem>

        <RevealItem>
          <h2 className="title-display mb-6 max-w-[40ch]">
            Más rendimiento, mejor calidad<br />
            y una cosecha que{' '}
            <em style={{ fontFamily: 'var(--serif-it)' }}>vale más</em>.
          </h2>
        </RevealItem>

        <RevealItem>
          <p className="dek-edit text-ink-2 mb-14 lg:mb-20 max-w-[54ch]">
            Eso no es suerte: detrás de cada cosecha rentable hay un proceso de
            cuatro pasos —del laboratorio a tu campo—, con un agrónomo de
            Biotiza en cada uno.
          </p>
        </RevealItem>
      </Reveal>

      {/* ── Línea de tiempo conectada ──────────────────────────── */}
      <Reveal className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
        {STAGES.map((s, i) => (
          <RevealItem
            key={s.num}
            className="relative flex items-start gap-5 lg:block"
          >
            {/* Riel · segmento horizontal (desktop) */}
            {i < lastIndex && (
              <div
                className="absolute top-[6px] hidden h-[2px] bg-ink/15 lg:block"
                style={{ left: '7px', right: 'calc(-2rem - 7px)' }}
                aria-hidden="true"
              />
            )}
            {/* Riel · segmento vertical (mobile) */}
            {i < lastIndex && (
              <div
                className="absolute left-[6px] w-[2px] bg-ink/15 lg:hidden"
                style={{ top: '7px', bottom: 'calc(-2.5rem - 7px)' }}
                aria-hidden="true"
              />
            )}

            {/* Nodo */}
            <div className="relative z-10 shrink-0 lg:mb-7">
              <span
                className={`block h-3.5 w-3.5 rounded-full ring-4 ring-paper ${DOT_MAP[s.dot]}`}
                aria-hidden="true"
              />
            </div>

            {/* Contenido del acto */}
            <div className="min-w-0 flex-1">
              <p
                className={`font-serif leading-[0.95] tracking-[-0.01em] ${NUM_MAP[s.dot]}`}
                style={{ fontSize: 'clamp(40px, 4.4vw, 64px)' }}
              >
                {s.num}
              </p>
              <p className="mt-3 font-serif text-[clamp(19px,1.7vw,23px)] leading-[1.15] tracking-[-0.02em] text-ink lg:mt-4">
                {s.em ? (
                  <em style={{ fontFamily: 'var(--serif-it)' }}>{s.title}</em>
                ) : (
                  s.title
                )}
              </p>
              <p className="mt-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-3">
                {s.sub}
              </p>
              <p className="mt-3.5 max-w-[34ch] text-[15px] leading-relaxed text-ink-2 lg:max-w-none">
                {s.description}
              </p>
            </div>
          </RevealItem>
        ))}
      </Reveal>

      {/* ── Cierre · valor agregado + CTA ──────────────────────── */}
      <Reveal>
        <RevealItem className="mt-14 border-t border-rule pt-8 lg:mt-20 lg:pt-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="dek-edit text-ink-2 max-w-[46ch]">
              No vendemos un producto y desaparecemos: un agrónomo de Biotiza te
              acompaña, con asesoría técnica{' '}
              <em style={{ fontFamily: 'var(--serif-it)' }}>incluida</em>.
            </p>
            <Link
              href="/contacto"
              className="group inline-flex shrink-0 items-center justify-center gap-2.5 border border-ink px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition-all duration-300 hover:bg-ink hover:text-paper"
            >
              Conoce a tu agrónomo
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </RevealItem>
      </Reveal>
    </Scene>
  )
}
