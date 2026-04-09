'use client'

/**
 * Header.tsx — Barra de navegación principal de Biotiza
 *
 * - Sticky / fixed: bg blanco sólido desde el inicio
 * - Al scroll >50px: backdrop-blur + sombra sutil con transición 300ms
 * - Desktop: Logo | Nav con MegaMenu para Soluciones | CTA naranja
 * - Mobile: Logo | Botón hamburguesa → MobileNav (panel lateral)
 */

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AnimatePresence } from 'framer-motion'
import { Leaf, Menu, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import MegaMenu from './MegaMenu'
import MobileNav from './MobileNav'

// ─── Links del nav (excluye Soluciones que tiene MegaMenu) ───────────────

const NAV_LINKS = [
  { label: 'Cultivos',     href: '/cultivos'     },
  { label: 'Herramientas', href: '/herramientas' },
  { label: 'Academia',     href: '/academia'     },
  { label: 'Nosotros',     href: '/nosotros'     },
  { label: 'Contacto',     href: '/contacto'     },
]

// ─── Componente ───────────────────────────────────────────────────────────

export default function Header() {
  const [scrolled,    setScrolled]    = useState(false)
  const [megaOpen,    setMegaOpen]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)

  // ── Detección de scroll ──────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Bloquear scroll del body cuando el panel móvil está abierto ──────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      {/*
       * El header es fixed. El MegaMenu se renderiza como hijo absolute (top-full)
       * dentro del mismo elemento, así el mouse que pasa del botón al menú
       * nunca "sale" del header → no se cierra prematuramente.
       *
       * onMouseLeave en el <header> cierra el mega-menu cuando el cursor
       * abandona toda el área (barra + menú desplegado).
       */}
      <header
        onMouseLeave={() => setMegaOpen(false)}
        className={cn(
          'fixed inset-x-0 top-0 z-40',
          'transition-all duration-300 ease-out',
          scrolled || megaOpen
            ? 'bg-white/95 backdrop-blur-lg shadow-[0_1px_20px_rgba(15,23,42,0.08)]'
            : 'bg-white',
        )}
      >
        {/* ── Barra principal ──────────────────────────────────────── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">

            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2 shrink-0">
              <Leaf
                size={22}
                className="text-naranja-500 transition-transform duration-300 group-hover:rotate-12"
              />
              <span className="font-serif text-xl leading-none text-verde-700">
                Biotiza
              </span>
            </Link>

            {/* ── Nav desktop ───────────────────────────────────── */}
            <nav
              className="hidden lg:flex items-center gap-0.5"
              aria-label="Navegación principal"
            >
              {/* Soluciones + MegaMenu trigger */}
              <div onMouseEnter={() => setMegaOpen(true)} className="relative">
                <button
                  onClick={() => setMegaOpen((v) => !v)}
                  aria-expanded={megaOpen}
                  aria-haspopup="true"
                  className={cn(
                    'flex items-center gap-1 rounded-md px-3 py-2',
                    'text-sm font-medium transition-colors duration-200',
                    megaOpen
                      ? 'bg-verde-50 text-verde-600'
                      : 'text-gris-700 hover:bg-gris-50 hover:text-verde-600',
                  )}
                >
                  Soluciones
                  <ChevronDown
                    size={14}
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
                    'rounded-md px-3 py-2',
                    'text-sm font-medium text-gris-700',
                    'transition-colors duration-200',
                    'hover:bg-gris-50 hover:text-verde-600',
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
                  'inline-flex items-center justify-center',
                  'h-9 rounded-lg px-4',
                  'text-sm font-semibold text-white',
                  'bg-naranja-500 hover:bg-naranja-600',
                  'transition-all duration-200 active:scale-[0.97]',
                  'shadow-sm hover:shadow-[0_4px_16px_rgba(232,105,15,0.3)]',
                )}
              >
                Solicitar Cotización
              </Link>
            </div>

            {/* ── Hamburguesa mobile ────────────────────────────── */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú de navegación"
              aria-expanded={mobileOpen}
              className={cn(
                'lg:hidden -mr-2 flex h-10 w-10 items-center justify-center',
                'rounded-lg text-gris-700 transition-colors',
                'hover:bg-gris-100 hover:text-verde-600',
              )}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* ── MegaMenu (absolute dentro del header) ────────────── */}
        <AnimatePresence>
          {megaOpen && (
            <MegaMenu onClose={() => setMegaOpen(false)} />
          )}
        </AnimatePresence>
      </header>

      {/* Espaciador para compensar el header fixed */}
      <div className="h-16" aria-hidden="true" />

      {/* ── MobileNav (fuera del header, usa portal implícito via fixed) */}
      <AnimatePresence>
        {mobileOpen && (
          <MobileNav onClose={() => setMobileOpen(false)} />
        )}
      </AnimatePresence>
    </>
  )
}
