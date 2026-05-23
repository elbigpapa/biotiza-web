import Image from 'next/image'
import Link from 'next/link'
import { HERO_IMAGES } from '@/data/crop-images'
import Container from '@/components/ui/Container'
import { Reveal, RevealItem } from '@/components/redesign/ScrollReveal'
import ScrollCue from '@/components/redesign/ScrollCue'
import HeroMetricChips from '@/components/sections/HeroMetricChips'

/**
 * Escena 1 — Hero cinematográfico.
 *
 * Foto a pantalla completa con Ken Burns (zoom lento) + scrim editorial
 * en gradiente: el texto se lee a la izquierda y la foto respira a la
 * derecha. El mensaje completo (titular, dek, métricas, CTAs) se ve de
 * un golpe en una sola pantalla — primera impresión tipo "show".
 */
export default function HeroSection() {
  const img = HERO_IMAGES.cultivatedField

  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100svh-5.25rem)] flex-col overflow-hidden bg-verde-950 text-white"
    >
      {/* Foto cinematográfica full-bleed */}
      <div className="absolute inset-0">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          priority
          sizes="100vw"
          className="animate-kenburns object-cover"
        />
        {/* Scrim diagonal: oscuro donde va el texto, claro donde respira la foto */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, rgba(8,46,33,0.93) 0%, rgba(8,46,33,0.78) 44%, rgba(8,46,33,0.30) 100%)',
          }}
        />
        {/* Anclaje inferior */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-verde-950 via-verde-950/55 to-transparent" />
      </div>

      <Container className="relative z-10 flex flex-1 flex-col py-12">
        <Reveal className="flex flex-1 flex-col justify-center gap-5">
          {/* Eyebrow */}
          <RevealItem>
            <p className="eyebrow-edit eyebrow-light">
              — Biosoluciones agrícolas mexicanas
            </p>
          </RevealItem>

          {/* Headline */}
          <RevealItem>
            <h1 className="title-hero max-w-[15ch] text-white">
              Ciencia<br />
              <em style={{ fontFamily: 'var(--serif-it)' }}>que rinde</em><br />
              al campo.
            </h1>
          </RevealItem>

          {/* Subtitle */}
          <RevealItem>
            <p className="dek-edit max-w-[42ch] text-white/90">
              Biosoluciones formuladas en laboratorio, con asesoría técnica
              de agrónomos especializados incluida en cada compra.
            </p>
          </RevealItem>

          {/* Metrics row */}
          <RevealItem>
            <HeroMetricChips />
          </RevealItem>

          {/* CTA row */}
          <RevealItem>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/cotizacion"
                className="inline-flex items-center gap-2 bg-naranja-500 px-7 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-naranja-600"
              >
                Cotizar
              </Link>
              <Link
                href="/soluciones"
                className="inline-flex items-center gap-2 border border-white/45 px-7 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:border-white hover:bg-white/10"
              >
                Ver soluciones →
              </Link>
            </div>
          </RevealItem>
        </Reveal>

        {/* Scroll cue — al pie de la primera pantalla */}
        <div className="flex justify-center pt-6">
          <ScrollCue tone="dark" />
        </div>
      </Container>
    </section>
  )
}
