'use client'

/**
 * Header.tsx — Barra de navegación premium de Biotiza
 *
 * - Fixed con glassmorphism al hacer scroll
 * - Desktop (lg+): Logo | Nav con MegaMenu | CTA premium
 * - Mobile: Logo | Hamburguesa → MobileNav (panel lateral)
 */

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AnimatePresence } from 'framer-motion'
import { Leaf, Menu, ChevronDown, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import MegaMenu from './MegaMenu'
import MobileNav from './MobileNav'

// ─── Links del nav ──────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Cultivos',      href: '/cultivos'     },
  { label: 'Casa y Jardín', href: '/casa-jardin'  },
  { label: 'Herramientas',  href: '/herramientas' },
  { label: 'Academia',      href: '/academia'     },
  { label: 'Nosotros',      href: '/nosotros'     },
]

// ─── Componente ───────────────────────────────────────────────────────────

export default function Header() {
  const [scrolled,    setScrolled]    = useState(false)
  const [megaOpen,    setMegaOpen]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)

  // ── Detección de scroll ──────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Bloquear scroll del body cuando el panel móvil está abierto ──────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isActive = scrolled || megaOpen

  return (
    <>
      <header
        onMouseLeave={() => setMegaOpen(false)}
        className={cn(
          'fixed inset-x-0 top-0 z-40',
          'transition-all duration-500 ease-out',
          isActive
            ? 'bg-white/80 backdrop-blur-2xl shadow-[0_1px_24px_rgba(15,23,42,0.06)] border-b border-gris-100/50'
            : 'bg-transparent',
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[4.5rem] items-center justify-between">

            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2.5 shrink-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-verde-500 to-verde-600 shadow-sm transition-all duration-300 group-hover:shadow-brand group-hover:scale-105">
                <Leaf size={18} className="text-white" />
              </div>
              <span className={cn(
                'font-serif text-xl leading-none transition-colors duration-300',
                isActive ? 'text-verde-800' : 'text-white',
              )}>
                Biotiza
              </span>
            </Link>

            {/* ── Nav desktop ───────────────────────────────────── */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Navegación principal"
            >
              {/* Soluciones + MegaMenu trigger */}
              <div onMouseEnter={() => setMegaOpen(true)} className="relative">
                <button
                  onClick={() => setMegaOpen((v) => !v)}
                  aria-expanded={megaOpen}
                  aria-haspopup="true"
                  className={cn(
                    'flex items-center gap-1.5 rounded-lg px-3.5 py-2',
                    'text-sm font-medium transition-all duration-300',
                    megaOpen
                      ? 'bg-verde-50 text-verde-600'
                      : isActive
                        ? 'text-gris-700 hover:bg-gris-50 hover:text-verde-600'
                        : 'text-white/80 hover:text-white hover:bg-white/10',
                  )}
                >
                  Soluciones
                  <ChevronDown
                    size={13}
                    className={cn(
                      'transition-transform duration-200',
                      megaOpen && 'rotate-180',
                    )}
                  />
                </button>
              </div>

              {/* Resto de links */}
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-lg px-3.5 py-2',
                    'text-sm font-medium',
                    'transition-all duration-300',
                    isActive
                      ? 'text-gris-600 hover:bg-gris-50 hover:text-verde-600'
                      : 'text-white/70 hover:text-white hover:bg-white/10',
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* ── CTA desktop ───────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <Link
                href="/cotizacion"
                className={cn(
                  'group inline-flex items-center justify-center gap-2',
                  'h-10 rounded-xl px-5',
                  'text-sm font-semibold text-white',
                  'bg-gradient-to-r from-naranja-500 to-naranja-600',
                  'transition-all duration-300 active:scale-[0.97]',
                  'shadow-[0_4px_16px_rgba(232,105,15,0.25)]',
                  'hover:shadow-[0_8px_24px_rgba(232,105,15,0.35)]',
                  'hover:-translate-y-0.5',
                )}
              >
                Cotizar
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* ── Hamburguesa mobile ────────────────────────────── */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú de navegación"
              aria-expanded={mobileOpen}
              className={cn(
                'lg:hidden -mr-2 flex h-10 w-10 items-center justify-center',
                'rounded-xl transition-all duration-300',
                isActive
                  ? 'text-gris-700 hover:bg-gris-100 hover:text-verde-600'
                  : 'text-white/80 hover:text-white hover:bg-white/10',
              )}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* ── MegaMenu ────────────────────────────────────────── */}
        <AnimatePresence>
          {megaOpen && (
            <MegaMenu onClose={() => setMegaOpen(false)} />
          )}
        </AnimatePresence>
      </header>

      {/* Espaciador para compensar el header fixed */}
      <div className="h-[4.5rem]" aria-hidden="true" />

      {/* ── MobileNav ──────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <MobileNav onClose={() => setMobileOpen(false)} />
        )}
      </AnimatePresence>
    </>
  )
}
