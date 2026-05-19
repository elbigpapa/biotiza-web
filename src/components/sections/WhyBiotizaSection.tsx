/**
 * WhyBiotizaSection.tsx — Proceso en 4 actos · Sub-fase 3.3a
 * Reemplaza biotiza-web/src/components/sections/WhyBiotizaSection.tsx
 *
 * Antes: 4 cards uniformes con iconos coloreados
 * Después: timeline editorial Lab → Campo → Asesor → Cosecha
 */

import Container from '@/components/ui/Container'

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

export default function WhyBiotizaSection() {
  return (
    <section className="bg-paper py-24 lg:py-32 border-b border-rule">
      <Container>
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-10 lg:gap-20 items-end mb-16 lg:mb-20">
          <div>
            <p className="eyebrow-edit mb-6">— 01 · Cómo trabajamos</p>
            <h2 className="title-display mb-7 max-w-[16ch]">
              Del <em>laboratorio</em> a tu cultivo,<br />
              con un agrónomo a tu lado.
            </h2>
            <p className="dek-edit text-ink-2 max-w-[50ch]">
              Cuatro actos en un mismo proceso. Cada producto Biotiza es trazable,
              y cada protocolo se ajusta con asesoría técnica directa antes,
              durante y después de la aplicación.
            </p>
          </div>
          <div>
            <div className="font-serif text-[clamp(72px,10vw,144px)] leading-[0.85] tracking-[-0.04em] text-ink">
              25
              <em className="font-serif italic text-ink-3 text-[0.4em] align-[12%] ml-1" style={{ fontFamily: 'var(--serif-it)' }}> años</em>
            </div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-3 max-w-[30ch] mt-2 leading-relaxed">
              de investigación y desarrollo en formulaciones agrícolas mexicanas
            </p>
          </div>
        </div>

        {/* Timeline · 4 actos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-rule border-b border-rule">
          {STAGES.map((s, i) => (
            <div
              key={s.num}
              className={`relative min-w-0 p-7 sm:p-9 lg:p-10 ${
                i < STAGES.length - 1 ? 'border-b sm:border-b-0 lg:border-r border-rule' : ''
              } ${i === 1 && 'sm:border-r-0 lg:border-r'} ${i === 1 && 'lg:border-b-0'}`}
            >
              {/* Dot accent */}
              <span
                className={`absolute -top-[5px] left-7 sm:left-9 lg:left-10 w-2 h-2 rounded-full ${s.dot}`}
                aria-hidden="true"
              />

              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-4 mb-2 flex items-center gap-3">
                <span>N° {s.num}</span>
                {s.sub && <span className="opacity-60">— {s.sub}</span>}
                <span className="flex-1 h-px bg-ink-4 opacity-40 ml-2" />
              </div>

              <h3 className="font-serif text-[clamp(26px,2.6vw,40px)] leading-[1.05] tracking-[-0.03em] mb-3.5 break-words [hyphens:auto]">
                {s.em ? (
                  <em className="font-serif italic text-verde-700" style={{ fontFamily: 'var(--serif-it)' }}>
                    {s.title}
                  </em>
                ) : (
                  s.title
                )}
              </h3>

              <p className="text-sm leading-relaxed text-ink-3 max-w-[28ch]">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
