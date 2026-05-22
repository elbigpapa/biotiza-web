import Scene from '@/components/redesign/Scene'
import { Reveal, RevealItem } from '@/components/redesign/ScrollReveal'
import Immersion from '@/components/redesign/Immersion'

const commitments = [
  {
    lead: 'No prometemos números mágicos.',
    body: 'Cada cifra que publicamos proviene de ficha técnica o certificado verificable.',
  },
  {
    lead: 'No vendemos en caja sin acompañamiento.',
    body: 'Cada compra incluye al agrónomo asignado a tu zona.',
  },
  {
    lead: 'No recomendamos lo que no usaríamos.',
    body: 'Si el problema requiere un producto de otro fabricante, lo decimos.',
  },
  {
    lead: 'No desaparecemos después de la venta.',
    body: 'Estamos en WhatsApp cuando algo cambia en campo.',
  },
]

export default function TestimonialsSection() {
  return (
    <Scene tone="light" id="filosofia">
      <Reveal>
        {/* Eyebrow */}
        <RevealItem>
          <p className="eyebrow-edit mb-8">— 08 · Filosofía</p>
        </RevealItem>

        {/* Editorial pull-quote */}
        <RevealItem>
          <blockquote className="max-w-5xl border-l-[3px] border-verde-700 pl-6 sm:pl-8 mb-16">
            <p
              className="font-serif italic text-[clamp(30px,4.2vw,62px)] leading-[1.12] tracking-[-0.025em] text-ink text-balance"
              style={{ fontFamily: 'var(--serif-it)' }}
            >
              Un buen protocolo en el papel no sirve si nadie está contigo
              cuando el cultivo lo necesita.
            </p>
            <footer className="mt-6 font-mono not-italic text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-3">
              — Filosofía Biotiza · servicio técnico
            </footer>
          </blockquote>
        </RevealItem>

        {/* Immersion: Lo que no vamos a hacer */}
        <RevealItem>
          <Immersion trigger="Lo que no vamos a hacer" tone="light">
            <ul className="space-y-8 py-4">
              {commitments.map(({ lead, body }) => (
                <li key={lead} className="flex flex-col gap-1 max-w-[68ch]">
                  <span className="font-semibold text-ink text-base leading-snug">
                    {lead}
                  </span>
                  <span className="dek-edit text-ink-2 text-sm leading-relaxed">
                    {body}
                  </span>
                </li>
              ))}
            </ul>
          </Immersion>
        </RevealItem>
      </Reveal>
    </Scene>
  )
}
