'use client'

/**
 * ServiceSection.tsx — NUEVO componente · Sub-fase 3.3a
 * Ubicación nueva: biotiza-web/src/components/sections/ServiceSection.tsx
 *
 * Reemplaza la AssistantPreviewSection oscura que estaba después del proceso.
 * Lo que comunica: "Vendemos productos. Acompañamos resultados."
 *  → diferenciador clave del servicio Biotiza
 */

import Container from '@/components/ui/Container'

const INCLUDED = [
  'Plan nutricional por cultivo',
  'Calendario y dosis ajustadas a tu zona',
  'Visitas técnicas en etapas clave',
  'Soporte por WhatsApp',
]

const MEASURED = [
  'Calibre y peso de fruto',
  'Grados Brix y firmeza',
  'Vida de anaquel post-cosecha',
  'Cumplimiento de límites de residuos',
]

export default function ServiceSection() {
  return (
    <section className="bg-white py-24 lg:py-32 border-b border-rule">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-20 items-center">
          {/* IZQ · Display title editorial */}
          <div>
            <p className="eyebrow-edit eyebrow-orange mb-5">— 02 · Servicio</p>
            <h2 className="font-serif text-[clamp(40px,6vw,80px)] leading-[0.95] tracking-[-0.03em] text-ink max-w-[14ch]">
              Vendemos<br />productos.<br />
              <em className="font-serif italic text-verde-700" style={{ fontFamily: 'var(--serif-it)' }}>
                Acompañamos
              </em><br />resultados.
            </h2>
          </div>

          {/* DER · Cuerpo + dos listas */}
          <div>
            <p className="text-lg lg:text-xl leading-relaxed text-ink-2 max-w-[54ch] mb-6">
              Otros venden en caja y desaparecen.
              En Biotiza, cada compra incluye asesoría técnica directa:
              un agrónomo especializado por cultivo y zona, que diseña
              el programa, valida la aplicación y mide los resultados con
              indicadores objetivos.
            </p>
            <p className="text-base lg:text-lg leading-relaxed text-ink-3 max-w-[54ch]">
              La diferencia no está en un solo frasco — está en tener
              el frasco correcto, en el momento correcto, en la dosis
              correcta. Y en alguien al otro lado del WhatsApp cuando
              la situación cambia.
            </p>

            <div className="mt-10 pt-7 border-t border-rule grid grid-cols-1 sm:grid-cols-2 gap-7">
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-3 mb-3">
                  — Incluido siempre
                </p>
                <ul className="space-y-1.5 text-[15px] leading-relaxed text-ink-2">
                  {INCLUDED.map(item => (
                    <li key={item}>· {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-3 mb-3">
                  — Lo que medimos
                </p>
                <ul className="space-y-1.5 text-[15px] leading-relaxed text-ink-2">
                  {MEASURED.map(item => (
                    <li key={item}>· {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
