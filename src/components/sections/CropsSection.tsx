/**
 * CropsSection.tsx — Grid fotográfico · Sub-fase 3.3b
 * Reemplaza biotiza-web/src/components/sections/CropsSection.tsx
 *
 * Antes: grid 2x4 con emoji + gradiente
 * Después: 8 expedientes fotográficos macro · nombre serif sobre foto cinematográfica
 */

import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Container from '@/components/ui/Container'
import { getCropImage } from '@/data/crop-images'

const FEATURED_CROPS = [
  { slug:'tomate',     num:'01', name:'Tomate',     family:'Solanácea', stages:6, cycle:120 },
  { slug:'fresa',      num:'02', name:'Fresa',      family:'Rosácea',   stages:5, cycle:180 },
  { slug:'arandano',   num:'03', name:'Arándano',   family:'Ericácea',  stages:5, cycle:150 },
  { slug:'frambuesa',  num:'04', name:'Frambuesa',  family:'Rosácea',   stages:4, cycle:160 },
  { slug:'zarzamora',  num:'05', name:'Zarzamora',  family:'Rosácea',   stages:3, cycle:180 },
  { slug:'aguacate',   num:'06', name:'Aguacate',   family:'Laurácea',  stages:5, cycle:365 },
  { slug:'chile',      num:'07', name:'Chile',      family:'Solanácea', stages:5, cycle:150 },
  { slug:'citricos',   num:'08', name:'Cítricos',   family:'Rutácea',   stages:4, cycle:365 },
]

export default function CropsSection() {
  return (
    <section className="bg-paper py-24 lg:py-32 border-b border-rule">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-10 lg:gap-20 items-end mb-14 lg:mb-16">
          <div>
            <p className="eyebrow-edit mb-6">— 05 · Cultivos</p>
            <h2 className="title-display max-w-[16ch] mb-7">
              28 expedientes,<br />
              con <em>protocolo completo</em>.
            </h2>
            <p className="dek-edit text-ink-2 max-w-[60ch]">
              Por cultivo, por etapa fenológica, por problema. Cada expediente
              lleva los productos, las dosis y el calendario que nuestros agrónomos
              calibran después con tu zona, tu agua y tu objetivo.
            </p>
          </div>
          <Link
            href="/cultivos"
            className="self-end inline-flex items-center gap-2.5 px-6 py-3.5 border border-ink text-ink font-mono text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-ink hover:text-white transition-all duration-300"
          >
            Ver los 28 expedientes
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid fotográfico 4×2 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-paper-3 border border-paper-3">
          {FEATURED_CROPS.map(crop => {
            const photo = getCropImage(crop.slug)
            return (
              <Link
                key={crop.slug}
                href={`/cultivos/${crop.slug}`}
                className="group relative aspect-[3/4] overflow-hidden flex flex-col justify-end p-5 lg:p-6 transition-all duration-500"
                style={{
                  backgroundImage: photo
                    ? `url(${photo.src})`
                    : 'linear-gradient(135deg, #115e43, #082e21)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Gradiente legibilidad */}
                <div
                  className="absolute inset-0 transition-all duration-500 group-hover:opacity-90"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(8,46,33,0.65) 70%, rgba(8,46,33,0.96) 100%)',
                  }}
                  aria-hidden="true"
                />

                {/* Top labels */}
                <span className="absolute top-5 left-5 z-10 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
                  N° {crop.num} · {crop.family}
                </span>
                <ArrowUpRight
                  size={20}
                  className="absolute top-5 right-5 z-10 text-white/0 group-hover:text-naranja-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-400"
                />

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="font-serif text-[clamp(28px,3vw,42px)] leading-[0.95] tracking-[-0.03em] text-white">
                    {crop.name}
                  </h3>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70 mt-2">
                    {crop.stages} etapas · {crop.cycle} días
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
