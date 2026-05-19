/**
 * ProductLinesSection.tsx — Lista editorial · Sub-fase 3.3b
 * Reemplaza biotiza-web/src/components/sections/ProductLinesSection.tsx
 *
 * Antes: 6 cards rectangulares idénticas con gradiente
 * Después: lista editorial estilo índice de revista con número de catálogo
 */

import Link from 'next/link'
import Container from '@/components/ui/Container'

const LINES = [
  { id:'organicos',       num:'01', name:'Orgánicos',       em:'quelatados', count:9,  meta:'Cert. OMRI · base de programas limpios',              color:'text-verde-700' },
  { id:'especialidades',  num:'02', name:'Especialidades',  em:null,         count:6,  meta:'Correctores · inoculantes microbianos',              color:'text-azul-600'  },
  { id:'bioestimulantes', num:'03', name:'Bioestimulantes', em:null,         count:6,  meta:'Floración · cuajado · engorde · sanitizantes',       color:'text-naranja-500' },
  { id:'nutricion',       num:'04', name:'Nutrición',       em:'líquida',    count:10, meta:'Fertirrigación · quelatos premium · micros',         color:'text-naranja-400' },
  { id:'bioproteccion',   num:'05', name:'Bioprotección',   em:'natural',    count:16, meta:'Bioinsecticidas · biofungicidas · entomopatógenos',  color:'text-azul-500'  },
]

export default function ProductLinesSection() {
  return (
    <section className="bg-paper py-24 lg:py-32 border-b border-rule">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-10 lg:gap-20 mb-14">
          <div>
            <p className="eyebrow-edit mb-6">— 03 · Portafolio</p>
            <h2 className="title-display max-w-[18ch] mb-7">
              Cada etapa del cultivo,<br />
              <em>resuelta</em>.
            </h2>
            <p className="dek-edit text-ink-2 max-w-[50ch]">
              Cinco líneas que cubren desde el trasplante hasta la cosecha.
              Cada producto con ficha técnica y certificado de análisis por lote.
            </p>
          </div>
          <div className="self-end">
            <div className="font-serif text-[clamp(60px,8vw,120px)] leading-[0.85] tracking-[-0.04em] text-ink">
              47
              <em className="font-serif italic text-verde-700 text-[0.4em] align-[12%] ml-1" style={{ fontFamily: 'var(--serif-it)' }}> productos</em>
            </div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-3 max-w-[30ch] mt-2 leading-relaxed">
              en catálogo · cinco líneas · ficha técnica y certificado de análisis por lote
            </p>
          </div>
        </div>

        {/* LISTA editorial */}
        <div className="border-t border-ink">
          {LINES.map(L => (
            <Link
              key={L.id}
              href={`/soluciones/${L.id}`}
              className="group grid grid-cols-[60px_1fr_120px_30px] sm:grid-cols-[80px_1fr_140px_40px] items-center gap-6 sm:gap-12 py-6 sm:py-8 border-b border-rule transition-all duration-300 hover:pl-6"
            >
              <span className={`font-serif text-[clamp(36px,4vw,56px)] leading-none tracking-[-0.04em] ${L.color}`}>
                {L.num}
              </span>
              <div>
                <div className="font-serif text-[clamp(28px,3.5vw,48px)] leading-tight tracking-[-0.03em] text-ink">
                  {L.em ? (
                    <>
                      {L.name}{' '}
                      <em className={`font-serif italic ${L.color}`} style={{ fontFamily: 'var(--serif-it)' }}>
                        {L.em}
                      </em>
                    </>
                  ) : (
                    L.name
                  )}
                </div>
                <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink-4 mt-1.5">
                  {L.meta}
                </div>
              </div>
              <div className="text-right hidden sm:block font-mono text-[13px] text-ink-3">
                <span className={`font-serif text-[32px] leading-none tracking-[-0.03em] mr-1 ${L.color}`}>
                  {L.count}
                </span>
                productos
              </div>
              <span className="font-serif text-[28px] text-ink-3 transition-all duration-300 group-hover:translate-x-2 group-hover:text-naranja-500">
                ›
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
