/**
 * SustainabilitySection.tsx — Huella de carbono · Sub-fase 3.3c
 * NUEVO componente · biotiza-web/src/components/sections/SustainabilitySection.tsx
 *
 * Datos sustentados con fuentes citables.
 * NO inventamos cifras Biotiza-específicas — usamos referencias de categoría.
 */

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Container from '@/components/ui/Container'

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
    <section id="sustentabilidad" className="bg-paper-2 py-24 lg:py-32 border-b border-rule">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-10 lg:gap-20 items-end mb-14">
          <div>
            <p className="eyebrow-edit mb-6">— 10 · Huella de carbono</p>
            <h2 className="title-display max-w-[16ch] mb-7">
              Menos huella,<br /><em>más cosecha</em>.
            </h2>
            <p className="dek-edit text-ink-2 max-w-[60ch]">
              Cambiar sacos de fertilizante sólido por biosoluciones líquidas reduce
              emisiones, fletes, empaque y mano de obra — con evidencia científica
              que lo respalda.
            </p>
          </div>
          <div className="self-end">
            <div className="font-serif text-[clamp(48px,6vw,80px)] leading-[0.85] tracking-[-0.04em] text-ink">
              ≈2.6
              <span className="font-mono font-medium text-ink-3 text-[0.26em] align-[42%] ml-2 tracking-[0.02em]">
                kg CO₂e
              </span>
            </div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-3 mt-2 max-w-[30ch] leading-relaxed">
              por kg de N sintético fabricado.{' '}
              <a href="#fuente-1" className="text-verde-700">[1]</a>
            </p>
          </div>
        </div>

        {/* 4 stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-rule mt-12 mb-16">
          {STATS.map(s => (
            <div key={s.ref + s.value} className="bg-paper p-7 lg:p-9 flex flex-col gap-3 min-h-[240px]">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-serif text-[clamp(40px,5vw,64px)] leading-[0.9] tracking-[-0.04em] text-verde-700">
                  {s.value}
                </span>
                <span className="font-mono font-medium text-ink-3 text-[12px] lg:text-[13px] tracking-[0.02em] leading-snug max-w-[18ch]">
                  {s.unit}
                </span>
              </div>
              <p className="text-[13px] leading-relaxed text-ink-2 flex-1">{s.label}</p>
              <a
                href={`#fuente-${s.ref}`}
                className="font-mono text-[10px] font-semibold tracking-[0.14em] uppercase text-verde-700 border-b border-current pb-0.5 self-start"
              >
                Ver fuente [{s.ref}]
              </a>
            </div>
          ))}
        </div>

        {/* CTA editorial */}
        <div className="bg-ink text-white p-8 lg:p-14 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-14 items-center mt-14">
          <div>
            <p className="eyebrow-edit eyebrow-light no-line mb-4">— Tu caso, sin adornos</p>
            <h3 className="font-serif text-[clamp(32px,4.5vw,56px)] leading-[1] tracking-[-0.03em] text-white max-w-[18ch]">
              Calculamos{' '}
              <em className="font-serif italic text-verde-300" style={{ fontFamily: 'var(--serif-it)' }}>
                tu ahorro
              </em>
              <br />con tus propios números.
            </h3>
          </div>
          <div>
            <p className="text-base leading-relaxed text-white/75 mb-7 max-w-[44ch]">
              El ahorro exacto en diésel, empaque, almacenaje y jornales depende
              de tu cultivo, superficie y logística. Nuestros agrónomos lo
              cuantifican con datos de tu propia operación.
            </p>
            <div className="flex gap-3.5 flex-wrap">
              <Link
                href="/herramientas/calculadora-roi"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-naranja-500 text-white font-mono text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-naranja-600 hover:-translate-y-0.5 transition-all duration-300"
              >
                Calculadora ROI
                <ArrowRight size={14} />
              </Link>
              <a
                href="https://wa.me/523316022708?text=Hola%20Biotiza%2C%20quiero%20calcular%20el%20ahorro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3.5 border border-white/30 text-white font-mono text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-white hover:text-ink transition-all duration-300"
              >
                Hablar con un agrónomo
              </a>
            </div>
          </div>
        </div>

        {/* Fuentes */}
        <div className="mt-16 pt-8 border-t border-ink">
          <p className="eyebrow-edit eyebrow-muted mb-6">— Fuentes citadas</p>
          <ol className="flex flex-col gap-3 max-w-[90ch]">
            {SOURCES.map(s => (
              <li
                key={s.id}
                id={`fuente-${s.id}`}
                className="pl-8 relative font-mono text-[11px] leading-[1.7] text-ink-3 scroll-mt-24"
              >
                <span
                  className="absolute left-0 top-0 font-serif text-base text-verde-700"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  [{s.id}]
                </span>
                <span>{s.cite} </span>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-verde-700 font-semibold border-b border-current pb-px ml-1 uppercase tracking-[0.12em] text-[10px]"
                >
                  Ver estudio →
                </a>
              </li>
            ))}
          </ol>
          <p className="mt-7 p-4 bg-paper border border-rule font-mono text-[11px] leading-[1.7] text-ink-3 max-w-[90ch]">
            <strong className="text-ink">Nota honesta.</strong> Las cifras citadas
            provienen de literatura científica sobre la categoría, no son resultados
            Biotiza-específicos. El ahorro real varía por cultivo, clima, suelo y
            logística, y se valida caso por caso con el agrónomo asignado.
          </p>
        </div>
      </Container>
    </section>
  )
}
