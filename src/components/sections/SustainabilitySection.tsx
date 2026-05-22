/**
 * SustainabilitySection.tsx — Escena 7 · Huella de carbono
 * Rediseño Phase 2 · biotiza-web/src/components/sections/SustainabilitySection.tsx
 *
 * Datos sustentados con fuentes citables.
 * NO inventamos cifras Biotiza-específicas — usamos referencias de categoría.
 */

import Link from 'next/link'
import Scene from '@/components/redesign/Scene'
import { Reveal, RevealItem } from '@/components/redesign/ScrollReveal'
import Immersion from '@/components/redesign/Immersion'

const STATS = [
  { value:'≈2.6', unit:'kg CO₂e / kg N', label:'Emisiones para fabricar fertilizante nitrogenado sintético (promedio global)', ref:1 },
  { value:'+17.9', unit:'% rendimiento', label:'Respuesta media en >1,000 ensayos de campo con biostimulantes (180 estudios)', ref:3 },
  { value:'−40',  unit:'% fertilizante', label:'Ahorro de fertilizante vía fertirrigación frente a aplicación al voleo',         ref:4 },
  { value:'−25',  unit:'% nitrógeno',    label:'Extractos de algas mantuvieron el desempeño con 25% menos de N aplicado',         ref:2 },
]

const SOURCES = [
  { id:1, cite:'Menegat, Ledo & Tirado (2022). "Greenhouse gas emissions from global production and use of nitrogen synthetic fertilisers in agriculture". Scientific Reports 12, 14490 (Nature).', url:'https://www.nature.com/articles/s41598-022-18773-w' },
  { id:2, cite:'Reducing fertiliser inputs: plant biostimulants as an emerging strategy. Discover Sustainability (2025), Springer Nature.', url:'https://link.springer.com/article/10.1007/s43621-025-00910-w' },
  { id:3, cite:'Li, Van Gerrewey & Geelen (2022). "A Meta-Analysis of Biostimulant Yield Effectiveness in Field Trials". Frontiers in Plant Science, 13:836702.', url:'https://www.frontiersin.org/journals/plant-science/articles/10.3389/fpls.2022.836702/full' },
  { id:4, cite:'UGA Extension B1130, "Drip Chemigation"; Fertigation — revisión agronómica.', url:'https://extension.uga.edu/publications/detail.html?number=B1130' },
]

export default function SustainabilitySection() {
  return (
    <Scene tone="dark" id="sustentabilidad">
      <Reveal className="flex flex-col gap-16">

        {/* ── Capa 1: eyebrow + headline + dek + stat grid ── */}
        <div className="flex flex-col gap-12">

          {/* Header */}
          <div className="flex flex-col gap-6 max-w-[52ch]">
            <RevealItem>
              <p className="eyebrow-edit eyebrow-light">— 07 · Huella de carbono</p>
            </RevealItem>
            <RevealItem>
              <h2 className="title-display text-white">
                Menos huella,{' '}
                <em className="text-verde-300" style={{ fontFamily: 'var(--serif-it)' }}>
                  más cosecha
                </em>
                .
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="dek-edit text-white/85 max-w-[56ch]">
                Biosoluciones líquidas reducen emisiones, fletes, empaque y
                mano de obra — con evidencia científica que lo respalda.
              </p>
            </RevealItem>
          </div>

          {/* Stats grid */}
          <RevealItem>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
              {STATS.map((s) => (
                <div
                  key={s.ref}
                  className="bg-verde-950 p-7 lg:p-9 flex flex-col gap-3 min-h-[220px]"
                >
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-serif text-[clamp(40px,5vw,64px)] leading-[0.9] tracking-[-0.04em] text-verde-300">
                      {s.value}
                    </span>
                    <span className="font-mono font-medium text-white/50 text-[12px] lg:text-[13px] tracking-[0.02em] leading-snug max-w-[18ch]">
                      {s.unit}
                    </span>
                  </div>
                  <p className="text-[13px] leading-relaxed text-white/70 flex-1">
                    {s.label}
                  </p>
                  <span className="font-mono text-[10px] font-semibold tracking-[0.14em] uppercase text-verde-300/60 self-start">
                    [{s.ref}]
                  </span>
                </div>
              ))}
            </div>
          </RevealItem>
        </div>

        {/* ── CTA ── */}
        <RevealItem>
          <Link
            href="/herramientas/calculadora-roi"
            className="inline-flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white border-b border-white/30 pb-1 hover:text-verde-300 hover:border-verde-300 transition-colors duration-300"
          >
            Calcula tu ahorro →
          </Link>
        </RevealItem>

        {/* ── Capa 2: Fuentes científicas (Immersion) ── */}
        <RevealItem>
          <Immersion trigger="Ver las fuentes científicas" tone="dark">
            <div className="flex flex-col gap-6">
              <ol className="flex flex-col gap-4 max-w-[88ch]">
                {SOURCES.map((s) => (
                  <li
                    key={s.id}
                    id={`fuente-${s.id}`}
                    className="pl-8 relative font-mono text-[11px] leading-[1.75] text-white/55 scroll-mt-24"
                  >
                    <span
                      className="absolute left-0 top-0 font-serif text-base text-verde-300"
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      [{s.id}]
                    </span>
                    <span>{s.cite} </span>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-verde-300 font-semibold border-b border-verde-300/40 pb-px ml-1 uppercase tracking-[0.12em] text-[10px] hover:border-verde-300 transition-colors"
                    >
                      Ver estudio →
                    </a>
                  </li>
                ))}
              </ol>
              <p className="p-4 border border-white/10 bg-white/5 font-mono text-[11px] leading-[1.7] text-white/50 max-w-[88ch]">
                <strong className="text-white/80">Nota honesta.</strong>{' '}
                Las cifras citadas provienen de literatura científica sobre la categoría,
                no son resultados Biotiza-específicos. El ahorro real varía por cultivo,
                clima, suelo y logística, y se valida caso por caso con el agrónomo asignado.
              </p>
            </div>
          </Immersion>
        </RevealItem>

      </Reveal>
    </Scene>
  )
}
