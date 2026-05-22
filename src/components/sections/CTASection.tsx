/**
 * CTASection.tsx — Escena 9 · CTA final del rediseño
 *
 * Server Component. El único island cliente es <MiniLeadForm />.
 */

import Link from 'next/link'
import Scene from '@/components/redesign/Scene'
import { Reveal, RevealItem } from '@/components/redesign/ScrollReveal'
import MiniLeadForm from '@/components/sections/MiniLeadForm'

// WhatsApp SVG icon (lucide-react no incluye WhatsApp)
function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function CTASection() {
  return (
    <Scene tone="dark" id="contacto-cta">
      <Reveal className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-start">

        {/* ── Columna izquierda: copy ───────────────────────────────────────── */}
        <div>
          <RevealItem>
            <p className="eyebrow-edit eyebrow-light mb-6">— 09</p>
          </RevealItem>

          <RevealItem>
            <h2 className="title-display text-white mb-6">
              Hablemos de{' '}
              <em style={{ fontFamily: 'var(--serif-it)' }} className="text-verde-300">
                tu cultivo
              </em>
              .
            </h2>
          </RevealItem>

          <RevealItem>
            <p className="dek-edit text-white/85 max-w-[42ch] mb-10">
              Un agrónomo especializado te acompaña a diseñar el programa
              nutricional exacto para tu zona y tu etapa fenológica.
              Sin compromisos.
            </p>
          </RevealItem>

          {/* Contact paths */}
          <RevealItem className="flex flex-col sm:flex-row gap-4 flex-wrap">
            {/* (a) WhatsApp */}
            <a
              href="https://wa.me/523316022708?text=Hola%20Biotiza%2C%20quiero%20dise%C3%B1ar%20mi%20programa%20nutricional"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 min-h-[44px] rounded-lg bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1ebe5a] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <WhatsAppIcon size={18} />
              Hablar por WhatsApp
            </a>

            {/* (b) Cotización */}
            <Link
              href="/cotizacion"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] rounded-lg bg-naranja-500 px-6 py-3 text-sm font-semibold text-white hover:bg-naranja-600 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Solicitar cotización
            </Link>
          </RevealItem>

          {/* Footer meta */}
          <RevealItem className="mt-10 pt-8 border-t border-white/15 flex flex-wrap gap-6 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
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
          </RevealItem>
        </div>

        {/* ── Columna derecha: mini form ────────────────────────────────────── */}
        <RevealItem>
          <div className="rounded-2xl border border-white/15 bg-white/5 p-7 lg:p-8 backdrop-blur-sm">
            <p className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-verde-300 mb-3">
              O déjanos tus datos
            </p>
            <p className="text-sm text-white/65 mb-6">
              Te llamamos nosotros — sin que tengas que escribir primero.
            </p>
            {/* (c) MiniLeadForm — Client island */}
            <MiniLeadForm />
          </div>
        </RevealItem>

      </Reveal>
    </Scene>
  )
}
