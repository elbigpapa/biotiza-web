/**
 * TestimonialsSection.tsx — Caso reportaje · Sub-fase 3.3c
 * Reemplaza biotiza-web/src/components/sections/TestimonialsSection.tsx
 *
 * Antes: 4 cards de testimonio con iniciales en gradiente, dato como chip pequeño
 * Después: reportaje editorial con dato como titular display
 *
 * Nota: usa filosofía Biotiza, no atribución específica a clientes
 * (autorizaciones pendientes).
 */

import Container from '@/components/ui/Container'

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-24 lg:py-32 border-b border-rule">
      <Container>
        <div className="mb-12 lg:mb-16">
          <p className="eyebrow-edit mb-6">— 09 · Filosofía</p>
          <h2 className="title-display max-w-[18ch]">
            La mitad del trabajo<br />no es el <em>producto</em>.
          </h2>
          <p className="dek-edit text-ink-2 max-w-[60ch] mt-5">
            Es el agrónomo que está contigo cada semana — el que valida
            el protocolo, ajusta dosis y mide los indicadores que importan.
          </p>
        </div>

        {/* Pull quote editorial · sin atribución a cliente específico */}
        <div className="max-w-[1000px] mx-auto py-10 lg:py-12">
          <p
            className="font-serif italic text-[clamp(32px,5vw,64px)] leading-[1.1] tracking-[-0.025em] text-ink pl-6 border-l-[3px] border-naranja-500 max-w-[22ch]"
            style={{ fontFamily: 'var(--serif-it)' }}
          >
            Un buen protocolo en el papel no sirve si nadie está contigo
            cuando el cultivo lo necesita.
            <span className="block mt-7 font-mono not-italic text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-4">
              — Filosofía Biotiza · servicio técnico
            </span>
          </p>
        </div>
      </Container>
    </section>
  )
}
