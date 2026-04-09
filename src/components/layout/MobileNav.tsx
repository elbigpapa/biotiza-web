'use client'

/**
 * MobileNav.tsx — Panel lateral deslizable desde la derecha (mobile)
 * Incluye overlay oscuro, accordion para Soluciones y CTA.
 */

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Leaf,
  FlaskConical,
  Sparkles,
  Droplets,
  Shield,
  ChevronDown,
  Home,
  Sprout,
  Wrench,
  BookOpen,
  Users,
  Phone,
  MessageCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Datos ────────────────────────────────────────────────────────────────

const SOLUTION_LINES = [
  { name: 'Orgánicos',        href: '/soluciones/organicos',       icon: Leaf,          color: 'text-verde-500',   bg: 'bg-verde-50' },
  { name: 'Especialidades',   href: '/soluciones/especialidades',  icon: FlaskConical,  color: 'text-azul-600',    bg: 'bg-azul-100' },
  { name: 'Bioestimulantes',  href: '/soluciones/bioestimulantes', icon: Sparkles,      color: 'text-naranja-500', bg: 'bg-naranja-100' },
  { name: 'Nutrición Líquida',href: '/soluciones/nutricion',       icon: Droplets,      color: 'text-naranja-400', bg: 'bg-[#fff4eb]' },
  { name: 'Línea Zentia',     href: '/soluciones/zentia',          icon: Shield,        color: 'text-azul-500',    bg: 'bg-azul-100' },
]

const NAV_LINKS = [
  { label: 'Inicio',       href: '/',             icon: Home },
  { label: 'Cultivos',     href: '/cultivos',     icon: Sprout },
  { label: 'Herramientas', href: '/herramientas', icon: Wrench },
  { label: 'Academia',     href: '/academia',     icon: BookOpen },
  { label: 'Nosotros',     href: '/nosotros',     icon: Users },
  { label: 'Contacto',     href: '/contacto',     icon: Phone },
]

// ─── Animaciones ──────────────────────────────────────────────────────────

const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
}

const easeOutQuart: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const panelVariants = {
  hidden:  { x: '100%' },
  visible: { x: 0, transition: { type: 'tween' as const, duration: 0.3, ease: easeOutQuart } },
  exit:    { x: '100%', transition: { type: 'tween' as const, duration: 0.25, ease: 'easeIn' as const } },
}

const accordionVariants = {
  hidden:  { height: 0, opacity: 0 },
  visible: { height: 'auto', opacity: 1, transition: { duration: 0.25, ease: 'easeOut' as const } },
  exit:    { height: 0, opacity: 0, transition: { duration: 0.2, ease: 'easeIn' as const } },
}

// ─── Componente ───────────────────────────────────────────────────────────

interface MobileNavProps {
  onClose: () => void
}

export default function MobileNav({ onClose }: MobileNavProps) {
  const [solutionsOpen, setSolutionsOpen] = useState(false)

  return (
    <>
      {/* ── Overlay ──────────────────────────────────────────────────── */}
      <motion.div
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-40 bg-gris-900/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Panel ────────────────────────────────────────────────────── */}
      <motion.div
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={cn(
          'fixed inset-y-0 right-0 z-50',
          'flex w-full max-w-sm flex-col',
          'bg-white shadow-2xl',
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        {/* ── Header del panel ──────────────────────────────────── */}
        <div className="flex items-center justify-between border-b border-gris-100 px-5 py-4">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2"
          >
            <Leaf size={20} className="text-naranja-500" />
            <span className="font-serif text-lg text-verde-700">Biotiza</span>
          </Link>
          <button
            onClick={onClose}
            aria-label="Cerrar menú"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gris-500 transition-colors hover:bg-gris-100 hover:text-gris-900"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Links de navegación ───────────────────────────────── */}
        <nav className="flex-1 overflow-y-auto py-4" aria-label="Menú móvil">
          <ul className="space-y-0.5 px-3">
            {/* Soluciones — accordion */}
            <li>
              <button
                onClick={() => setSolutionsOpen((v) => !v)}
                aria-expanded={solutionsOpen}
                className={cn(
                  'flex w-full items-center justify-between rounded-lg px-3 py-3',
                  'text-sm font-semibold transition-colors duration-200',
                  solutionsOpen
                    ? 'bg-verde-50 text-verde-700'
                    : 'text-gris-700 hover:bg-gris-50 hover:text-gris-900',
                )}
              >
                <span className="flex items-center gap-3">
                  <Leaf size={18} className={solutionsOpen ? 'text-verde-500' : 'text-gris-400'} />
                  Soluciones
                </span>
                <ChevronDown
                  size={16}
                  className={cn(
                    'transition-transform duration-200 text-gris-400',
                    solutionsOpen && 'rotate-180 text-verde-500',
                  )}
                />
              </button>

              {/* Líneas de producto */}
              <AnimatePresence initial={false}>
                {solutionsOpen && (
                  <motion.div
                    variants={accordionVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="overflow-hidden"
                  >
                    <ul className="ml-4 mt-1 space-y-0.5 border-l-2 border-verde-100 pl-3">
                      {SOLUTION_LINES.map((line) => {
                        const Icon = line.icon
                        return (
                          <li key={line.href}>
                            <Link
                              href={line.href}
                              onClick={onClose}
                              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-gris-600 transition-colors hover:bg-gris-50 hover:text-gris-900"
                            >
                              <span className={cn('flex h-6 w-6 items-center justify-center rounded-md shrink-0', line.bg)}>
                                <Icon size={13} className={line.color} />
                              </span>
                              {line.name}
                            </Link>
                          </li>
                        )
                      })}
                      <li>
                        <Link
                          href="/soluciones"
                          onClick={onClose}
                          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-verde-600 hover:text-verde-700 transition-colors"
                        >
                          Ver catálogo completo →
                        </Link>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Resto de links */}
            {NAV_LINKS.slice(1).map((link) => {
              const Icon = link.icon
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gris-700 transition-colors hover:bg-gris-50 hover:text-gris-900"
                  >
                    <Icon size={18} className="text-gris-400" />
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* ── Pie del panel ─────────────────────────────────────── */}
        <div className="border-t border-gris-100 p-5 space-y-3">
          {/* WhatsApp */}
          <a
            href="https://wa.me/523300000000?text=Hola%20Biotiza%2C%20necesito%20asesor%C3%ADa"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className={cn(
              'flex w-full items-center justify-center gap-2',
              'rounded-lg py-2.5 text-sm font-semibold text-white',
              'bg-[#25D366] hover:bg-[#1ebe57] transition-colors',
            )}
          >
            <MessageCircle size={18} />
            Escribir por WhatsApp
          </a>

          {/* Cotización */}
          <Link
            href="/cotizacion"
            onClick={onClose}
            className={cn(
              'flex w-full items-center justify-center',
              'rounded-lg py-2.5 text-sm font-semibold text-white',
              'bg-naranja-500 hover:bg-naranja-600 transition-colors',
            )}
          >
            Solicitar Cotización
          </Link>

          <p className="text-center text-xs text-gris-400">
            ventas@biotiza.mx · Zapopan, Jalisco
          </p>
        </div>
      </motion.div>
    </>
  )
}
