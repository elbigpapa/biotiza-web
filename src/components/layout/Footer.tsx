'use client'

/**
 * Footer.tsx — Pie de página premium de Biotiza
 */

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import {
  Leaf,
  Mail,
  MapPin,
  ArrowRight,
  Send,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Datos de columnas ────────────────────────────────────────────────────

const COL_SOLUCIONES = [
  { label: 'Línea Orgánicos',      href: '/soluciones/organicos'       },
  { label: 'Especialidades',        href: '/soluciones/especialidades'  },
  { label: 'Bioestimulantes',       href: '/soluciones/bioestimulantes' },
  { label: 'Nutrición Líquida',     href: '/soluciones/nutricion'       },
  { label: 'Línea Zentia',          href: '/soluciones/zentia'          },
  { label: 'Ver catálogo completo', href: '/soluciones'                 },
]

const COL_RECURSOS = [
  { label: 'Blog agrícola',         href: '/academia/blog'             },
  { label: 'Guías técnicas',        href: '/academia/guias'            },
  { label: 'Calculadora de dosis',  href: '/herramientas/calculadora-dosis' },
  { label: 'Diagnóstico de cultivo',href: '/herramientas/diagnostico'  },
  { label: 'Compatibilidad',        href: '/herramientas/compatibilidad' },
  { label: 'Calculadora ROI',       href: '/herramientas/calculadora-roi' },
]

const COL_EMPRESA = [
  { label: 'Nosotros',              href: '/nosotros'                  },
  { label: 'Certificaciones',       href: '/nosotros#certificaciones'  },
  { label: 'Contacto',              href: '/contacto'                  },
  { label: 'Trabaja con nosotros',  href: '/contacto#trabaja'          },
  { label: 'Política de privacidad',href: '/politica-privacidad'           },
  { label: 'Términos de uso',       href: '/politica-privacidad#terminos' },
]

// ─── Custom SVG icons ─────────────────────────────────────────────────────

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.95a8.16 8.16 0 004.77 1.52V7.02a4.85 4.85 0 01-1-.33z" />
    </svg>
  )
}

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function YoutubeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

// ─── Onda SVG decorativa ──────────────────────────────────────────────────

function FooterWave() {
  return (
    <div className="relative w-full overflow-hidden bg-gris-900" aria-hidden="true">
      <svg
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="block h-14 w-full sm:h-16 lg:h-20"
      >
        <rect width="1440" height="80" fill="#f0fdf6" />
        <path d="M0,20 C200,55 400,8 600,30 C800,55 1000,12 1200,35 C1350,50 1400,28 1440,32 L1440,80 L0,80 Z" fill="#22b573" opacity="0.15" />
        <path d="M0,40 C200,70 450,20 700,50 C900,72 1150,25 1440,48 L1440,80 L0,80 Z" fill="#0f172a" />
      </svg>
    </div>
  )
}

// ─── Newsletter Form ──────────────────────────────────────────────────────

function NewsletterForm() {
  const [email,     setEmail]     = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div className="rounded-xl bg-gris-800/60 border border-gris-700/50 p-5 backdrop-blur-sm">
      <p className="mb-1 text-sm font-semibold text-white">
        Recibe tips agrícolas
      </p>
      <p className="mb-4 text-xs text-gris-400">
        Consejos de nutrición, control biológico y fenología cada 2 semanas.
      </p>

      {submitted ? (
        <p className="flex items-center gap-2 text-sm text-verde-400 font-medium">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-verde-500/20">✓</span>
          ¡Suscrito! Revisa tu correo.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.mx"
            required
            aria-label="Correo electrónico para newsletter"
            className={cn(
              'min-w-0 flex-1 rounded-lg px-3.5 py-2.5',
              'bg-gris-900/60 text-sm text-white placeholder:text-gris-500',
              'border border-gris-700/50 focus:border-verde-500',
              'focus:outline-none focus:ring-1 focus:ring-verde-500',
              'transition-all duration-300',
            )}
          />
          <button
            type="submit"
            disabled={loading}
            aria-label="Suscribirse"
            className={cn(
              'flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-lg',
              'bg-gradient-to-br from-verde-500 to-verde-600 text-white',
              'hover:shadow-brand disabled:opacity-60',
              'transition-all duration-300',
            )}
          >
            {loading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Send size={15} />
            )}
          </button>
        </form>
      )}
    </div>
  )
}

// ─── Footer principal ─────────────────────────────────────────────────────

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      {/* Onda decorativa */}
      <FooterWave />

      <footer className="bg-gris-900 text-gris-300">
        {/* ── Sección principal ─────────────────────────────────── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-10">
          <div className="grid gap-10 lg:grid-cols-[2fr_1fr_1fr_1fr_1.5fr]">

            {/* Col 0: Marca + tagline + newsletter */}
            <div className="space-y-6">
              <Link href="/" className="group inline-flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-verde-500 to-verde-600 shadow-sm transition-all duration-300 group-hover:shadow-brand">
                  <Leaf size={18} className="text-white" />
                </div>
                <span className="font-serif text-xl text-white">Biotiza</span>
              </Link>

              <p className="text-sm leading-relaxed text-gris-400">
                <em className="not-italic font-medium text-verde-400">
                  Generamos Vida y Valor al Campo
                </em>
                <br />
                Biosoluciones agrícolas para cultivos de exportación.
                Directo de laboratorio a tu campo, desde Zapopan, Jalisco.
              </p>

              <ul className="space-y-2.5 text-sm">
                <li className="flex items-center gap-2.5">
                  <Mail size={14} className="text-verde-500 shrink-0" />
                  <a href="mailto:ventas@biotiza.mx" className="text-gris-400 transition-colors hover:text-verde-400">
                    ventas@biotiza.mx
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin size={14} className="text-verde-500 shrink-0 mt-0.5" />
                  <span className="text-gris-400">Zapopan, Jalisco, México</span>
                </li>
              </ul>

              <NewsletterForm />
            </div>

            {/* Col 1: Soluciones */}
            <FooterColumn title="Soluciones" links={COL_SOLUCIONES} />

            {/* Col 2: Recursos */}
            <FooterColumn title="Recursos" links={COL_RECURSOS} />

            {/* Col 3: Empresa */}
            <FooterColumn title="Empresa" links={COL_EMPRESA} />

            {/* Col 4: Contacto directo */}
            <div className="space-y-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-white">
                Contáctanos
              </h3>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/523316022708?text=Hola%20Biotiza%2C%20quiero%20informaci%C3%B3n"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center gap-2.5 rounded-xl px-4 py-3.5',
                  'bg-[#25D366]/10 text-[#25D366]',
                  'border border-[#25D366]/20',
                  'text-sm font-semibold transition-all duration-300',
                  'hover:bg-[#25D366]/20 hover:border-[#25D366]/30',
                )}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>

              {/* Redes sociales */}
              <div>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gris-500">
                  Síguenos
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { icon: InstagramIcon, href: 'https://instagram.com/biotiza',  label: 'Instagram' },
                    { icon: YoutubeIcon,   href: 'https://youtube.com/@biotiza',   label: 'YouTube'   },
                    { icon: FacebookIcon,  href: 'https://facebook.com/biotiza',   label: 'Facebook'  },
                    { icon: LinkedinIcon,  href: 'https://linkedin.com/company/biotiza', label: 'LinkedIn' },
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-xl',
                        'text-gris-400 bg-gris-800/60 border border-gris-700/30',
                        'transition-all duration-300',
                        'hover:bg-verde-500 hover:text-white hover:border-verde-500 hover:scale-105 hover:shadow-brand',
                      )}
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                  <a
                    href="https://tiktok.com/@biotiza"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-xl',
                      'text-gris-400 bg-gris-800/60 border border-gris-700/30',
                      'transition-all duration-300',
                      'hover:bg-verde-500 hover:text-white hover:border-verde-500 hover:scale-105 hover:shadow-brand',
                    )}
                  >
                    <TikTokIcon size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Certificaciones ───────────────────────────────────── */}
        <div className="border-t border-gris-800/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gris-500">
                  Certificaciones:
                </span>
                {[
                  { label: 'COFEPRIS',           classes: 'bg-gris-800/60 text-gris-300 border border-gris-700/50' },
                  { label: 'OMRI Listed',         classes: 'bg-verde-900/30 text-verde-400 border border-verde-800/50' },
                  { label: 'Hecho en México',     classes: 'bg-gris-800/60 text-gris-300 border border-gris-700/50' },
                ].map(({ label, classes }) => (
                  <span
                    key={label}
                    className={cn(
                      'inline-flex items-center rounded-full px-3 py-1',
                      'text-[10px] font-semibold uppercase tracking-wide',
                      classes,
                    )}
                  >
                    {label}
                  </span>
                ))}
              </div>

              <Link
                href="/cotizacion"
                className="group inline-flex items-center gap-2 rounded-xl px-5 py-2 bg-gradient-to-r from-verde-500 to-verde-600 text-sm font-semibold text-white hover:shadow-brand transition-all duration-300 hover:-translate-y-0.5"
              >
                Solicitar cotización
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Copyright ─────────────────────────────────────────── */}
        <div className="border-t border-gris-800/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex flex-col items-center justify-between gap-2 text-xs text-gris-600 sm:flex-row">
              <p>© {currentYear} Biotiza. Todos los derechos reservados.</p>
              <div className="flex items-center gap-4">
                <Link href="/politica-privacidad" className="hover:text-gris-400 transition-colors">
                  Política de Privacidad
                </Link>
                <Link href="/politica-privacidad#terminos" className="hover:text-gris-400 transition-colors">
                  Términos de Uso
                </Link>
                <a href="https://biotiza.mx" className="hover:text-verde-500 transition-colors">
                  biotiza.mx
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

// ─── Sub-componente: columna de links ─────────────────────────────────────

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-white">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className={cn(
                'text-sm text-gris-400 transition-all duration-300',
                'hover:text-verde-400 hover:translate-x-0.5 inline-block',
              )}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
