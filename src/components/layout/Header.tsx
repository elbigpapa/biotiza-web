'use client'

/**
 * Header.tsx — versión editorial
 *
 *  · Logo grande con respiración
 *  · Navegación monospace + uppercase
 *  · CTA "Cotizar" rectangular naranja
 *  · Dos menús desplegables al hover: Soluciones y Cultivos
 */

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence } from 'motion/react'
import { Menu, ChevronDown, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { scrollToTop } from '@/lib/smoothScroll'
import { PRIMARY_NAV } from '@/data/constants'
import BiotizaLogo from '@/components/brand/BiotizaLogo'
import MegaMenu from './MegaMenu'
import CultivosMegaMenu from './CultivosMegaMenu'
import MobileNav from './MobileNav'

// Enlaces planos de la barra desktop: todo PRIMARY_NAV salvo los mega-menús
// (Soluciones, Cultivos, que tienen su propio trigger) y los marcados
// desktopHidden (p. ej. Contacto, accesible por el CTA y el footer).
const DESKTOP_LINKS = PRIMARY_NAV.filter((i) => !i.mega && !i.desktopHidden)

export default function Header() {
  const [scrolled,     setScrolled]     = useState(false)
  const [megaOpen,     setMegaOpen]     = useState(false)
  const [cultivosOpen, setCultivosOpen] = useState(false)
  const [mobileOpen,   setMobileOpen]   = useState(false)

  /**
   * Solo la home (`/`) tiene un hero con foto oscura que justifica el header
   * transparente con texto blanco. En el resto de páginas el fondo superior
   * es claro — ahí el header debe ser siempre sólido.
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

  const closeMenus = () => { setMegaOpen(false); setCultivosOpen(false) }
  const solid = scrolled || megaOpen || cultivosOpen || !isHome

  /** Clases de un botón de navegación con desplegable. */
  const navTrigger = (active: boolean) =>
    cn(
      'flex items-center gap-1.5 px-3.5 py-2',
      'font-mono text-[11px] font-semibold uppercase tracking-[0.14em]',
      'transition-colors duration-200',
      active
        ? 'text-naranja-600'
        : solid
          ? 'text-ink-2 hover:text-verde-700'
          : 'text-white/85 hover:text-verde-300',
    )

  return (
    <>
      <header
        onMouseLeave={closeMenus}
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
            {/* ─── LOGO ───────────────────────────────────────────────── */}
            <Link
              href="/"
              onClick={(e) => {
                // Si ya estás en la home, el Link no navega: hay que
                // subir manualmente (y con Lenis, vía su propio scroll).
                if (isHome) {
                  e.preventDefault()
                  closeMenus()
                  scrollToTop()
                }
              }}
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

            {/* ─── NAV desktop ────────────────────────────────────────── */}
            <nav className="hidden lg:flex items-center" aria-label="Navegación principal">
              {/* Soluciones · desplegable */}
              <div
                onMouseEnter={() => { setMegaOpen(true); setCultivosOpen(false) }}
                className="relative"
              >
                <button
                  onClick={() => { setMegaOpen((v) => !v); setCultivosOpen(false) }}
                  aria-expanded={megaOpen}
                  aria-haspopup="true"
                  className={navTrigger(megaOpen)}
                >
                  Soluciones
                  <ChevronDown size={11} className={cn('transition-transform', megaOpen && 'rotate-180')} />
                </button>
              </div>

              {/* Cultivos · desplegable */}
              <div
                onMouseEnter={() => { setCultivosOpen(true); setMegaOpen(false) }}
                className="relative"
              >
                <button
                  onClick={() => { setCultivosOpen((v) => !v); setMegaOpen(false) }}
                  aria-expanded={cultivosOpen}
                  aria-haspopup="true"
                  className={navTrigger(cultivosOpen)}
                >
                  Cultivos
                  <ChevronDown size={11} className={cn('transition-transform', cultivosOpen && 'rotate-180')} />
                </button>
              </div>

              {DESKTOP_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={closeMenus}
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

            {/* ─── CTA ────────────────────────────────────────────────── */}
            <div className="hidden lg:flex items-center shrink-0">
              <Link
                href="/cotizacion"
                onMouseEnter={closeMenus}
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
        <AnimatePresence>
          {cultivosOpen && <CultivosMegaMenu onClose={() => setCultivosOpen(false)} />}
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
