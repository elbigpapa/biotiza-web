'use client'

/**
 * Header.tsx — Sub-fase 3.2 · versión editorial
 * Reemplaza biotiza-web/src/components/layout/Header.tsx
 *
 * Cambios vs versión anterior:
 *  · Logo MÁS GRANDE (72px hero, 58px scrolled) con respiración
 *  · Navegación monospace + uppercase con tracking ancho
 *  · CTA "Cotizar" rectangular (sin rounded-xl) en naranja sólido
 *  · Estados de color editorial sobre fondo claro / oscuro
 *  · MegaMenu y MobileNav preservados intactos
 */

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence } from 'motion/react'
import { Menu, ChevronDown, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import BiotizaLogo from '@/components/brand/BiotizaLogo'
import MegaMenu from './MegaMenu'
import MobileNav from './MobileNav'

const NAV_LINKS = [
  { label: 'Cultivos',      href: '/cultivos'     },
  { label: 'Casa y Jardín', href: '/casa-jardin'  },
  { label: 'Herramientas',  href: '/herramientas' },
  { label: 'Academia',      href: '/academia'     },
  { label: 'Nosotros',      href: '/nosotros'     },
]

export default function Header() {
  const [scrolled,   setScrolled]   = useState(false)
  const [megaOpen,   setMegaOpen]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  /**
   * Solo la home (`/`) tiene un hero con foto oscura que justifica el header
   * transparente con texto blanco. En el resto de páginas el fondo superior
   * es claro (bg-paper editorial) — ahí el header debe ser SIEMPRE sólido,
   * o el logo, la navegación y la hamburguesa se vuelven blanco-sobre-claro
   * (ilegibles).
   */
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const solid = scrolled || megaOpen || !isHome

  return (
    <>
      <header
        onMouseLeave={() => setMegaOpen(false)}
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-all duration-400 ease-out',
          'border-b',
          solid
            ? 'bg-[rgba(244,239,227,0.92)] backdrop-blur-xl border-[rgba(10,26,20,0.12)]'
            : 'bg-transparent border-transparent',
        )}
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between gap-8 py-3.5">
            {/* ─── LOGO grande con respiración ───────────────────────── */}
            <Link
              href="/"
              className="group flex items-center shrink-0 transition-opacity hover:opacity-85"
              aria-label="Inicio · Biotiza"
            >
              <BiotizaLogo
                variant="lockup-h"
                mode={solid ? 'color' : 'mono-light'}
                priority
                className={cn(
                  'w-auto transition-all duration-300',
                  solid ? 'h-[58px]' : 'h-[72px]',
                  'max-md:h-[44px] max-md:!h-[44px]',
                )}
              />
            </Link>

            {/* ─── NAV desktop · monospace editorial ─────────────────── */}
            <nav className="hidden lg:flex items-center" aria-label="Navegación principal">
              <div onMouseEnter={() => setMegaOpen(true)} className="relative">
                <button
                  onClick={() => setMegaOpen((v) => !v)}
                  aria-expanded={megaOpen}
                  aria-haspopup="true"
                  className={cn(
                    'flex items-center gap-1.5 px-3.5 py-2',
                    'font-mono text-[11px] font-semibold uppercase tracking-[0.14em]',
                    'transition-colors duration-200',
                    megaOpen
                      ? 'text-naranja-600'
                      : solid
                        ? 'text-ink-2 hover:text-verde-700'
                        : 'text-white/85 hover:text-verde-300',
                  )}
                >
                  Soluciones
                  <ChevronDown size={11} className={cn('transition-transform', megaOpen && 'rotate-180')} />
                </button>
              </div>

              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3.5 py-2',
                    'font-mono text-[11px] font-semibold uppercase tracking-[0.14em]',
                    'transition-colors duration-200',
                    solid
                      ? 'text-ink-2 hover:text-verde-700'
                      : 'text-white/85 hover:text-verde-300',
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* ─── CTA editorial · rectangular ───────────────────────── */}
            <div className="hidden lg:flex items-center shrink-0">
              <Link
                href="/cotizacion"
                className={cn(
                  'group inline-flex items-center justify-center gap-2.5',
                  'px-6 py-3.5',
                  'font-mono text-[11px] font-semibold uppercase tracking-[0.16em]',
                  'bg-naranja-500 text-white',
                  'transition-all duration-300',
                  'hover:bg-naranja-600 hover:-translate-y-0.5',
                  'hover:shadow-[0_12px_28px_-8px_rgba(232,105,15,0.5)]',
                )}
              >
                Cotizar
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Hamburguesa mobile */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú de navegación"
              aria-expanded={mobileOpen}
              className={cn(
                'lg:hidden flex h-11 w-11 shrink-0 items-center justify-center -mr-2',
                'transition-colors duration-200',
                solid ? 'text-ink-2 hover:text-verde-700' : 'text-white/85 hover:text-verde-300',
              )}
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {megaOpen && <MegaMenu onClose={() => setMegaOpen(false)} />}
        </AnimatePresence>
      </header>

      {/* Espaciador del header fixed */}
      <div className="h-[5.25rem]" aria-hidden="true" />

      <AnimatePresence>
        {mobileOpen && <MobileNav onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
