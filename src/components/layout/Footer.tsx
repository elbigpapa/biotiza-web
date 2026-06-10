'use client'

/**
 * Footer.tsx — Sub-fase 3.2 · versión editorial
 * Reemplaza biotiza-web/src/components/layout/Footer.tsx
 *
 * Cambios vs versión anterior:
 *  · Fondo verde-950 cinematográfico (no gris-900)
 *  · Tagline serif italic protagonista
 *  · 4 columnas editoriales con eyebrows monospace
 *  · Instagram apunta a https://www.instagram.com/biotiza.mx/
 *  · Newsletter card minimal
 *  · Sello "Generamos vida y valor al campo" como pull quote
 *  · Sin onda decorativa SVG previa (transición limpia)
 */

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { Mail, MapPin, ArrowRight, Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import BiotizaLogo from '@/components/brand/BiotizaLogo'
import { CONTACT_INFO } from '@/data/constants'

const COL_SOLUCIONES = [
  { label: 'Línea Orgánicos',      href: '/soluciones/organicos'       },
  { label: 'Especialidades',       href: '/soluciones/especialidades'  },
  { label: 'Bioestimulantes',      href: '/soluciones/bioestimulantes' },
  { label: 'Nutrición Líquida',    href: '/soluciones/nutricion'       },
  { label: 'Bioprotección',        href: '/soluciones/bioproteccion'   },
  { label: 'Casa y Jardín',        href: '/casa-jardin'                },
  { label: 'Ver catálogo completo',href: '/soluciones'                 },
]
const COL_RECURSOS = [
  { label: 'Cultivos · programas',  href: '/cultivos'                       },
  { label: 'Huella de carbono',     href: '/huella-de-carbono'              },
  { label: 'Calculadora ROI',       href: '/herramientas/calculadora-roi'   },
  { label: 'Calculadora de dosis',  href: '/herramientas/calculadora-dosis' },
  { label: 'Diagnóstico de cultivo',href: '/herramientas/diagnostico'       },
  { label: 'Compatibilidad',        href: '/herramientas/compatibilidad'    },
  { label: 'Academia · blog',       href: '/academia'                       },
]
const COL_EMPRESA = [
  { label: 'Nosotros',              href: '/nosotros'                      },
  { label: 'Certificaciones',       href: '/#certificaciones'              },
  { label: 'Contacto',              href: '/contacto'                      },
  { label: 'Solicitar cotización',  href: '/cotizacion'                    },
  { label: 'Política de privacidad',href: '/politica-privacidad'           },
  { label: 'Huella de carbono',     href: '/huella-de-carbono'             },
]

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="5"/>
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function NewsletterForm() {
  const [email, setEmail]         = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email,
          fuente: 'newsletter',
          notas: 'Suscripción al newsletter técnico desde el footer del sitio.',
        }),
      })
      if (!res.ok) {
        setError('No pudimos registrar tu correo. Intenta de nuevo.')
        return
      }
      setSubmitted(true)
    } catch {
      setError('Error de red. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border border-white/15 bg-white/[0.04] p-5">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-verde-300 mb-3">
        — Newsletter técnico
      </p>
      <p className="font-serif text-2xl leading-tight text-white mb-3">
        Tips de campo cada quincena.
      </p>
      {submitted ? (
        <p className="text-sm text-verde-300 mt-3">
          ✓ ¡Listo! Tu correo quedó registrado. Pronto te llegará contenido técnico.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2 mt-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.mx"
            required
            aria-label="Correo para newsletter"
            className={cn(
              'min-w-0 flex-1 px-3 py-2.5 text-sm',
              'bg-transparent border border-white/20 text-white placeholder:text-white/35',
              'focus:border-verde-300 focus:outline-none',
            )}
          />
          <button
            type="submit"
            disabled={loading}
            aria-label="Suscribirse"
            className="flex h-[42px] w-[42px] shrink-0 items-center justify-center bg-naranja-500 text-white hover:bg-naranja-600 transition-colors disabled:opacity-60"
          >
            {loading
              ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              : <Send size={15} />}
          </button>
        </form>
      )}
      {error && (
        <p className="text-sm text-naranja-300 mt-3" role="alert">{error}</p>
      )}
    </div>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-verde-950 text-white/80">
      {/* Aura decorativa sutil */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 50% 80% at 90% 10%, rgba(34,181,115,0.18), transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 pt-20 pb-10">
        {/* ─── TOP · brand + tagline ─────────────────────────────── */}
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr] mb-16">
          {/* Brand */}
          <div className="space-y-7">
            <Link
              href="/"
              className="inline-flex items-center transition-opacity hover:opacity-85"
              aria-label="Inicio · Biotiza"
            >
              <BiotizaLogo variant="lockup-h" mode="mono-light" className="h-12 w-auto" />
            </Link>

            <p className="font-serif italic text-2xl leading-tight text-verde-300 max-w-[28ch]">
              Generamos vida y valor al campo.
            </p>

            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55">
              Zapotiltic, Jalisco · Hecho en México
            </p>

            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Hola%20Biotiza%2C%20quiero%20informaci%C3%B3n`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white hover:text-verde-300 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                  </svg>
                  WhatsApp <em className="not-italic font-medium">+52 33 1602 2708</em>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={13} className="text-verde-300" />
                <a href="mailto:ventas@biotiza.mx" className="text-white hover:text-verde-300 transition-colors">
                  ventas@biotiza.mx
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/biotiza.mx/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white hover:text-verde-300 transition-colors"
                >
                  <InstagramIcon size={13} />
                  @biotiza.mx
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/65">
                <MapPin size={13} className="text-verde-300 mt-0.5" />
                <span>Zapotiltic, Jalisco, México</span>
              </li>
            </ul>

            <NewsletterForm />
          </div>

          {/* Columnas editoriales */}
          <FooterColumn title="Soluciones" links={COL_SOLUCIONES} />
          <FooterColumn title="Recursos"   links={COL_RECURSOS}   />
          <FooterColumn title="Empresa"    links={COL_EMPRESA}    />
        </div>

        {/* ─── BOTTOM · certificaciones + CTA ────────────────────── */}
        <div className="border-t border-white/15 pt-8 mb-8 flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
              Certificaciones:
            </span>
            {['COFEPRIS', 'OMRI Listed', 'Hecho en México'].map((label) => (
              <span
                key={label}
                className="inline-flex items-center px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white border border-white/20 bg-white/[0.05]"
              >
                {label}
              </span>
            ))}
          </div>

          <Link
            href="/cotizacion"
            className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-naranja-500 text-white font-mono text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-naranja-600 hover:-translate-y-0.5 transition-all duration-300"
          >
            Solicitar cotización
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* ─── COPYRIGHT ─────────────────────────────────────────── */}
        <div className="border-t border-white/10 pt-6 flex flex-col items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/55 lg:flex-row">
          <span>© {currentYear} Biotiza · Todos los derechos reservados</span>
          <div className="flex items-center gap-6">
            <Link href="/politica-privacidad" className="hover:text-white transition-colors">
              Privacidad
            </Link>
            <Link href="/contacto" className="hover:text-white transition-colors">
              Contacto
            </Link>
            <a href="https://biotiza.mx" className="text-verde-300 hover:text-verde-200 transition-colors">
              biotiza.mx
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div>
      <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50 mb-5">
        — {title}
      </h3>
      <ul className="space-y-3">
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="block py-1 text-sm text-white hover:text-verde-300 transition-colors duration-200"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
