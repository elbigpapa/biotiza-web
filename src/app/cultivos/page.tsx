/**
 * CropsPage (listado) — Sub-fase 3.4a
 * Reemplaza biotiza-web/src/app/cultivos/page.tsx
 *
 * Grid fotográfico editorial: 34 cultivos como expediente.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { CROP_PROTOCOLS } from '@/data/crops'
import { getCropImage } from '@/data/crop-images'
import { canonical } from '@/lib/seo'
import Container from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Cultivos · Programas por cultivo',
  description: 'Expedientes técnicos por cultivo con protocolo fenológico completo: tomate, fresa, arándano, aguacate, chile, cítricos y más.',
  ...canonical('/cultivos'),
}

export default function CultivosPage() {
  return (
    <div className="bg-white">
      {/* Hero editorial */}
      <section className="bg-paper py-32 lg:py-40 border-b border-rule">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-10 lg:gap-20 items-end">
            <div>
              <p className="eyebrow-edit eyebrow-muted mb-6">
                Programas por cultivo · {CROP_PROTOCOLS.length} expedientes
              </p>
              <h1 className="title-display mb-7">
                Cultivos<br /><em>con protocolo</em>.
              </h1>
              <p className="dek-edit text-ink-2 max-w-[52ch]">
                Por cultivo, por etapa fenológica, por problema típico.
                Cada expediente lleva los productos, las dosis sugeridas
                y los retos que un agrónomo ajusta después con tu zona.
              </p>
            </div>
            <div className="self-end">
              <div className="font-serif text-[clamp(72px,10vw,144px)] leading-[0.85] tracking-[-0.04em] text-ink">
                {CROP_PROTOCOLS.length}
              </div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-3 mt-3 max-w-[30ch] leading-relaxed">
                expedientes completos · cada uno con protocolo fenológico · ajustable con asesor
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Grid fotográfico cinematográfico */}
      <section className="bg-paper-2">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-paper-3">
          {CROP_PROTOCOLS.map(c => {
            const photo = getCropImage(c.slug)
            return (
              <Link
                key={c.slug}
                href={`/cultivos/${c.slug}`}
                className="group relative aspect-[3/4] bg-ink overflow-hidden flex flex-col justify-end p-6"
                style={{
                  backgroundImage: photo?.src ? `url(${photo.src})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(8,46,33,0.65) 70%, rgba(8,46,33,0.95) 100%)',
                  }}
                  aria-hidden="true"
                />
                <span className="absolute top-5 left-5 font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-white/70 z-10">
                  N° {String(CROP_PROTOCOLS.indexOf(c) + 1).padStart(2, '0')} · {c.scientific_name?.split(' ')[0] ?? ''}
                </span>
                <span className="absolute top-5 right-5 font-serif text-2xl text-naranja-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-400 z-10">
                  ↗
                </span>
                <span className="relative z-10 font-serif text-[clamp(28px,3vw,42px)] leading-[0.95] tracking-[-0.03em] text-white">
                  {c.name}
                </span>
                <span className="relative z-10 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70 mt-2">
                  {c.stages.length} etapas · {c.cycle_days} días · protocolo completo
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Pull quote */}
      <section className="bg-white py-24 lg:py-28">
        <Container>
          <blockquote
            className="font-serif italic text-[clamp(28px,5vw,64px)] leading-[1.08] tracking-[-0.025em] text-ink max-w-[28ch] pl-7 border-l-[3px] border-naranja-500"
            style={{ fontFamily: 'var(--serif-it)' }}
          >
            Un buen protocolo en el papel no sirve si nadie está contigo
            cuando el cultivo lo necesita.
            <cite className="block mt-7 font-mono not-italic text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-4">
              — Filosofía Biotiza · agronomía de servicio
            </cite>
          </blockquote>
        </Container>
      </section>
    </div>
  )
}
