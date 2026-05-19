/**
 * CTASection.tsx — CTA final · Sub-fase 3.3c
 * Reemplaza biotiza-web/src/components/sections/CTASection.tsx
 *
 * Fondo verde-950 cinematográfico, sin gradientes saturados.
 */

import Container from '@/components/ui/Container'

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-verde-950 text-white py-24 lg:py-32 border-b border-white/10">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 90% 20%, rgba(34,181,115,0.22), transparent 60%), radial-gradient(ellipse 50% 50% at 10% 80%, rgba(232,105,15,0.18), transparent 60%)',
        }}
        aria-hidden="true"
      />
      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-20 items-center">
          <div>
            <p className="eyebrow-edit eyebrow-light no-line mb-5">Siguiente paso</p>
            <h2 className="title-display text-white max-w-[14ch]">
              Cuéntanos<br />tu cultivo.<br />
              <em style={{ fontFamily: 'var(--serif-it)' }} className="text-verde-300">
                Diseñamos
              </em>
              <br />tu programa.
            </h2>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-white/85 max-w-[44ch] mb-9">
              Un agrónomo especializado responde por WhatsApp y te acompaña a diseñar
              un protocolo nutricional para tu cultivo y zona. Sin compromisos.
            </p>
            <div className="flex items-center gap-5 flex-wrap mb-8">
              <a
                href="https://wa.me/523316022708?text=Hola%20Biotiza%2C%20quiero%20dise%C3%B1ar%20mi%20programa%20nutricional"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-naranja-500 text-white font-mono text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-naranja-600 hover:-translate-y-0.5 transition-all duration-300"
              >
                Hablar por WhatsApp →
              </a>
              <a
                href="/herramientas/calculadora-roi"
                className="inline-flex items-center px-6 py-3.5 border border-white/30 text-white font-mono text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-white hover:text-ink transition-all duration-300"
              >
                Calculadora ROI estimada
              </a>
            </div>
            <div className="pt-6 border-t border-white/15 flex flex-wrap gap-7 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
              <span>+52 33 1602 2708</span>
              <span>ventas@biotiza.mx</span>
              <a
                href="https://www.instagram.com/biotiza.mx/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-verde-300 transition-colors"
              >
                @biotiza.mx
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
