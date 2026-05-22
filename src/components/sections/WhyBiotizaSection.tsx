/**
 * WhyBiotizaSection.tsx — Escena 2: Proceso · Rediseño Phase 2
 *
 * Capa 1: eyebrow + headline + dek + 4 chips de acto (escaneable)
 * Capa 2: Immersion con descripción completa de cada acto + CTA a /contacto
 */

import Link from 'next/link'
import Scene from '@/components/redesign/Scene'
import { Reveal, RevealItem } from '@/components/redesign/ScrollReveal'
import Immersion from '@/components/redesign/Immersion'

const STAGES = [
  {
    num: '01',
    sub: '',
    title: 'Laboratorio',
    description: 'Formulación con materias primas certificadas. Cada lote se analiza antes de etiquetarse.',
    dot: 'bg-ink',
  },
  {
    num: '02',
    sub: 'Validación',
    title: 'Ensayo',
    em: true,
    description: 'Pruebas en campo con productores en distintas zonas antes de liberarse a catálogo comercial.',
    dot: 'bg-azul-500',
  },
  {
    num: '03',
    sub: 'Asesoría',
    title: 'Acompañamiento',
    description: 'Agrónomo asignado por cultivo y zona. Plan, dosis y calendario diseñados para tu rancho.',
    dot: 'bg-verde-600',
  },
  {
    num: '04',
    sub: 'Resultado',
    title: 'Cosecha medible',
    em: true,
    description: 'Indicadores objetivos: calibre, Brix, firmeza, vida de anaquel, residuos. Datos en cada visita.',
    dot: 'bg-naranja-500',
  },
]

/** Dot colors mapped explicitly for Tailwind to include them in the build */
const DOT_MAP: Record<string, string> = {
  'bg-ink': 'bg-ink',
  'bg-azul-500': 'bg-azul-500',
  'bg-verde-600': 'bg-verde-600',
  'bg-naranja-500': 'bg-naranja-500',
}

export default function WhyBiotizaSection() {
  return (
    <Scene tone="light" id="proceso">
      <Reveal>
        {/* Eyebrow */}
        <RevealItem>
          <p className="eyebrow-edit mb-6">— 02 · Proceso</p>
        </RevealItem>

        {/* Headline */}
        <RevealItem>
          <h2 className="title-display mb-6 max-w-[22ch]">
            Del laboratorio a tu cultivo,<br />
            con un{' '}
            <em style={{ fontFamily: 'var(--serif-it)' }}>agrónomo</em>{' '}
            a tu lado.
          </h2>
        </RevealItem>

        {/* Dek */}
        <RevealItem>
          <p className="dek-edit text-ink-2 mb-12 max-w-[52ch]">
            Cuatro actos trazables desde el laboratorio hasta tu cosecha,
            con asesoría técnica directa en cada etapa.
          </p>
        </RevealItem>

        {/* Chips de acto — escaneable, capa 1 */}
        <RevealItem>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
            {STAGES.map((s) => (
              <div
                key={s.num}
                className="relative rounded-xl border border-rule bg-paper-2 px-4 py-5"
              >
                {/* Dot accent */}
                <span
                  className={`absolute top-4 right-4 w-2 h-2 rounded-full ${DOT_MAP[s.dot]}`}
                  aria-hidden="true"
                />

                {/* Number */}
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-3 mb-2">
                  N° {s.num}
                </p>

                {/* Title */}
                <p className="font-serif text-[clamp(18px,1.8vw,22px)] leading-[1.1] tracking-[-0.02em] text-ink mb-1">
                  {s.em ? (
                    <em style={{ fontFamily: 'var(--serif-it)' }}>{s.title}</em>
                  ) : (
                    s.title
                  )}
                </p>

                {/* Sub label */}
                {s.sub && (
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3 opacity-70">
                    {s.sub}
                  </p>
                )}
              </div>
            ))}
          </div>
        </RevealItem>

        {/* Capa 2 — Immersion */}
        <RevealItem>
          <Immersion trigger="Ver el proceso a detalle" tone="light">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 mb-8">
              {STAGES.map((s) => (
                <div key={s.num} className="flex gap-4">
                  {/* Número vertical */}
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-3 pt-0.5 shrink-0">
                    {s.num}
                  </span>

                  <div>
                    <p className="font-serif text-[clamp(16px,1.4vw,18px)] leading-[1.15] tracking-[-0.02em] text-ink mb-1.5">
                      {s.em ? (
                        <em style={{ fontFamily: 'var(--serif-it)' }}>{s.title}</em>
                      ) : (
                        s.title
                      )}
                      {s.sub && (
                        <span className="font-sans font-normal text-ink-3 text-sm ml-2 not-italic">
                          — {s.sub}
                        </span>
                      )}
                    </p>
                    <p className="text-sm leading-relaxed text-ink-2">
                      {s.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA interno */}
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 text-sm font-semibold text-verde-700 hover:text-verde-900 transition-colors"
            >
              Conoce a tu agrónomo
              <span aria-hidden="true">→</span>
            </Link>
          </Immersion>
        </RevealItem>
      </Reveal>
    </Scene>
  )
}
