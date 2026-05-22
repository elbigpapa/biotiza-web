/**
 * CropsSection.tsx — Escena 05 · Cultivos
 * Redesign Phase 2: invitación medular al expediente por cultivo.
 * Server Component — usa Scene (dark), Reveal/RevealItem, next/image, next/link.
 */

import Link from 'next/link'
import Image from 'next/image'
import Scene from '@/components/redesign/Scene'
import { Reveal, RevealItem } from '@/components/redesign/ScrollReveal'
import { getCropImage } from '@/data/crop-images'
import { CROPS_DATA } from '@/data/constants'

// 8 featured crops pulled from CROPS_DATA by real slug
const FEATURED_SLUGS = [
  'tomate',
  'fresa',
  'arandano',
  'aguacate',
  'chile',
  'citricos',
  'maiz',
  'uva',
]

const featuredCrops = FEATURED_SLUGS.map(slug => {
  const crop = CROPS_DATA.find(c => c.slug === slug)!
  const photo = getCropImage(slug)
  return { ...crop, photo }
})

export default function CropsSection() {
  return (
    <Scene tone="dark" id="cultivos">
      <Reveal className="space-y-12 lg:space-y-16">

        {/* ── Header ── */}
        <RevealItem className="max-w-3xl">
          <p className="eyebrow-edit eyebrow-light mb-5">— 05 · Cultivos</p>
          <h2 className="title-display text-white mb-5 max-w-[18ch]">
            ¿Qué le doy a{' '}
            <em style={{ fontFamily: 'var(--serif-it)' }} className="text-verde-300">
              mi cultivo
            </em>
            ?
          </h2>
          <p className="dek-edit text-white/85 max-w-[56ch]">
            Elige tu cultivo y ve exactamente qué productos Biotiza aplican,
            con protocolo completo por etapa fenológica.
          </p>
        </RevealItem>

        {/* ── Grid fotográfico 4×2 ── */}
        <RevealItem>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
            {featuredCrops.map(crop => (
              <Link
                key={crop.slug}
                href={`/cultivos/${crop.slug}`}
                className="group relative aspect-[3/4] overflow-hidden rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-verde-300 focus-visible:outline-offset-2"
              >
                {/* Photo or gradient fallback */}
                {crop.photo ? (
                  <Image
                    src={crop.photo.src}
                    alt={crop.photo.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className={`absolute inset-0 bg-gradient-to-b ${crop.gradientFrom} ${crop.gradientTo}`}
                    aria-hidden="true"
                  />
                )}

                {/* Legibility gradient */}
                <div
                  className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-90"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(3,26,17,0) 30%, rgba(3,26,17,0.55) 65%, rgba(3,26,17,0.92) 100%)',
                  }}
                  aria-hidden="true"
                />

                {/* Hover ring accent */}
                <div
                  className="absolute inset-0 ring-inset ring-0 group-hover:ring-2 group-hover:ring-verde-400/60 transition-all duration-300 rounded-sm"
                  aria-hidden="true"
                />

                {/* Crop name */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-verde-300/80 mb-1 leading-none">
                    {crop.description}
                  </p>
                  <h3 className="font-serif text-[clamp(20px,2.4vw,30px)] leading-none tracking-tight text-white">
                    {crop.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </RevealItem>

        {/* ── Big CTA ── */}
        <RevealItem className="flex justify-center sm:justify-start">
          <Link
            href="/cultivos"
            className="
              inline-flex items-center gap-3
              bg-naranja-500 hover:bg-naranja-400
              text-white font-sans font-semibold
              text-base sm:text-lg
              px-8 py-4 sm:px-10 sm:py-5
              rounded-sm
              shadow-lg shadow-naranja-500/25
              transition-all duration-300
              hover:-translate-y-0.5
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-naranja-400 focus-visible:outline-offset-2
            "
          >
            Ver los 35 expedientes
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M3 9h12M10 4l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </RevealItem>

      </Reveal>
    </Scene>
  )
}
