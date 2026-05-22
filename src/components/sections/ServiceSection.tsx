import Link from 'next/link'
import Scene from '@/components/redesign/Scene'
import { Reveal, RevealItem } from '@/components/redesign/ScrollReveal'
import Immersion from '@/components/redesign/Immersion'

const INCLUDED = [
  'Agrónomo asignado por cultivo y zona',
  'Plan nutricional, dosis y calendario para tu rancho',
  'Visitas técnicas en etapas clave del ciclo',
  'Ajuste del protocolo con datos de campo',
]

const MEASURED = [
  'Calibre y peso de fruto',
  'Grados Brix y firmeza',
  'Vida de anaquel post-cosecha',
  'Cumplimiento de límites de residuos',
]

export default function ServiceSection() {
  return (
    <Scene tone="dark" id="servicio">
      <Reveal>
        {/* Eyebrow */}
        <RevealItem>
          <p className="eyebrow-edit eyebrow-light">— 03 · Servicio</p>
        </RevealItem>

        {/* Headline */}
        <RevealItem>
          <h2 className="title-display text-white mt-4">
            Vendemos productos.{' '}
            <em style={{ fontFamily: 'var(--serif-it)' }} className="text-verde-300">
              Acompañamos resultados.
            </em>
          </h2>
        </RevealItem>

        {/* Lead */}
        <RevealItem>
          <p className="dek-edit text-white/85 max-w-[54ch] mt-6">
            Otros venden en caja y desaparecen. En Biotiza, cada compra incluye
            asesoría técnica directa: el frasco correcto, en el momento correcto,
            en la dosis correcta — y alguien al otro lado cuando la situación cambia.
          </p>
        </RevealItem>

        {/* CTA */}
        <RevealItem>
          <Link
            href="/contacto"
            className="inline-block mt-8 px-7 py-3.5 rounded-full bg-naranja-500 text-white font-semibold text-base leading-none hover:bg-naranja-600 transition-colors"
          >
            Quiero un agrónomo →
          </Link>
        </RevealItem>
      </Reveal>

      {/* Capa 2 — Immersion */}
      <Immersion trigger="Cómo funciona el acompañamiento" tone="dark">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50 mb-4">
              — Incluido siempre
            </p>
            <ul className="space-y-2 text-[15px] leading-relaxed text-white/80">
              {INCLUDED.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50 mb-4">
              — Lo que medimos
            </p>
            <ul className="space-y-2 text-[15px] leading-relaxed text-white/80">
              {MEASURED.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Immersion>
    </Scene>
  )
}
