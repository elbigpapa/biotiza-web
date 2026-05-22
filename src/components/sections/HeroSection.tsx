import Link from 'next/link'
import { HERO_IMAGES } from '@/data/crop-images'
import Scene from '@/components/redesign/Scene'
import { Reveal, RevealItem } from '@/components/redesign/ScrollReveal'
import ScrollCue from '@/components/redesign/ScrollCue'

export default function HeroSection() {
  return (
    <Scene
      tone="dark"
      image={{ src: HERO_IMAGES.cultivatedField.src, alt: HERO_IMAGES.cultivatedField.alt }}
      id="hero"
    >
      {/* Content wrapper: tall first screen */}
      <div className="flex min-h-[88vh] flex-col justify-center pb-16 pt-32 lg:pt-40">
        <Reveal className="flex flex-col gap-6">
          {/* Eyebrow */}
          <RevealItem>
            <p className="eyebrow-edit eyebrow-light">
              — Biosoluciones agrícolas mexicanas
            </p>
          </RevealItem>

          {/* Headline */}
          <RevealItem>
            <h1 className="title-hero text-white max-w-[14ch]">
              Ciencia<br />
              <em style={{ fontFamily: 'var(--serif-it)' }}>que rinde</em><br />
              al campo.
            </h1>
          </RevealItem>

          {/* Subtitle */}
          <RevealItem>
            <p className="dek-edit text-white/85 max-w-[40ch]">
              Biosoluciones formuladas en laboratorio, con asesoría técnica
              de agrónomos especializados incluida en cada compra.
            </p>
          </RevealItem>

          {/* Metrics row */}
          <RevealItem>
            <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 border-t border-white/15 pt-5">
              <span>
                <span className="text-verde-300 mr-1.5">47</span>productos
              </span>
              <span>
                <span className="text-verde-300 mr-1.5">35</span>cultivos con protocolo
              </span>
              <span>
                <span className="text-verde-300 mr-1.5">25+</span>años de I+D
              </span>
            </div>
          </RevealItem>

          {/* CTA row */}
          <RevealItem>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/cotizacion"
                className="inline-flex items-center gap-2 px-6 py-4 bg-naranja-500 text-white font-mono text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-naranja-600 transition-colors duration-200"
              >
                Cotizar
              </Link>
              <Link
                href="/soluciones"
                className="inline-flex items-center gap-2 px-6 py-4 border border-white/40 text-white font-mono text-[11px] font-semibold uppercase tracking-[0.16em] hover:border-white hover:bg-white/10 transition-colors duration-200"
              >
                Ver soluciones →
              </Link>
            </div>
          </RevealItem>
        </Reveal>

        {/* Scroll cue — centered at bottom */}
        <div className="mt-16 flex justify-center">
          <ScrollCue tone="dark" />
        </div>
      </div>
    </Scene>
  )
}
