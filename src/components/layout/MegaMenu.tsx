'use client'

/**
 * MegaMenu.tsx — Menú de Soluciones con 5 columnas por línea de producto
 * Posicionado absolute top-full dentro del Header (que es fixed).
 */

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Leaf,
  FlaskConical,
  Sparkles,
  Droplets,
  Shield,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ProductLine } from '@/types'

// ─── Datos de líneas ──────────────────────────────────────────────────────

interface LineData {
  id: ProductLine
  name: string
  tagline: string
  description: string
  productCount: number
  href: string
  icon: React.ElementType
  // Tailwind classes para bg, texto, hover y acento
  iconColor: string
  tagBg: string
  tagText: string
  hoverBorder: string
  accentBar: string
}

const LINES: LineData[] = [
  {
    id: 'organicos',
    name: 'Orgánicos',
    tagline: 'Certificados OMRI',
    description: 'Fertilizantes quelatados orgánicos certificados OMRI para producción limpia y suelos vivos.',
    productCount: 10,
    href: '/soluciones/organicos',
    icon: Leaf,
    iconColor: 'text-verde-500',
    tagBg: 'bg-verde-50',
    tagText: 'text-verde-700',
    hoverBorder: 'hover:border-verde-300 group-hover:bg-verde-50',
    accentBar: 'bg-verde-500',
  },
  {
    id: 'especialidades',
    name: 'Especialidades',
    tagline: 'Soluciones técnicas',
    description: 'Correctores de pH, inoculantes microbianos y soluciones especializadas para problemas puntuales.',
    productCount: 6,
    href: '/soluciones/especialidades',
    icon: FlaskConical,
    iconColor: 'text-azul-600',
    tagBg: 'bg-azul-100',
    tagText: 'text-azul-700',
    hoverBorder: 'hover:border-azul-200 group-hover:bg-azul-50',
    accentBar: 'bg-azul-600',
  },
  {
    id: 'bioestimulantes',
    name: 'Bioestimulantes',
    tagline: 'Floración y cuajado',
    description: 'Promotores de floración, cuajado y engorde de fruto. Aminoácidos, citoquininas y más.',
    productCount: 6,
    href: '/soluciones/bioestimulantes',
    icon: Sparkles,
    iconColor: 'text-naranja-500',
    tagBg: 'bg-naranja-100',
    tagText: 'text-naranja-600',
    hoverBorder: 'hover:border-naranja-200 group-hover:bg-naranja-100/50',
    accentBar: 'bg-naranja-500',
  },
  {
    id: 'nutricion',
    name: 'Nutrición Líquida',
    tagline: 'Alta concentración',
    description: 'Fertilizantes de alta concentración para fertirrigación: macros, micros y complejos NPK.',
    productCount: 9,
    href: '/soluciones/nutricion',
    icon: Droplets,
    iconColor: 'text-naranja-400',
    tagBg: 'bg-[#fff4eb]',
    tagText: 'text-naranja-500',
    hoverBorder: 'hover:border-naranja-200 group-hover:bg-[#fff9f4]',
    accentBar: 'bg-naranja-400',
  },
  {
    id: 'zentia',
    name: 'Línea Zentia',
    tagline: 'Bioprotección',
    description: 'Bioprotección completa: insecticidas, fungicidas y bactericidas de origen biológico.',
    productCount: 10,
    href: '/soluciones/zentia',
    icon: Shield,
    iconColor: 'text-azul-500',
    tagBg: 'bg-azul-100',
    tagText: 'text-azul-600',
    hoverBorder: 'hover:border-azul-200 group-hover:bg-azul-50',
    accentBar: 'bg-azul-500',
  },
]

// ─── Animaciones ──────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' as const, staggerChildren: 0.04, delayChildren: 0.05 },
  },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15, ease: 'easeIn' as const } },
}

const columnVariants = {
  hidden:  { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' as const } },
}

// ─── Componente ───────────────────────────────────────────────────────────

interface MegaMenuProps {
  onClose: () => void
}

export default function MegaMenu({ onClose }: MegaMenuProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn(
        'absolute inset-x-0 top-full z-50',
        'bg-white border-t border-gris-100',
        'shadow-[0_16px_40px_rgba(15,23,42,0.12)]',
      )}
      role="region"
      aria-label="Menú de soluciones"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Grid 5 columnas */}
        <div className="grid grid-cols-5 gap-4">
          {LINES.map((line) => {
            const Icon = line.icon
            return (
              <motion.div key={line.id} variants={columnVariants} className="group">
                <Link
                  href={line.href}
                  onClick={onClose}
                  className={cn(
                    'flex flex-col gap-3 rounded-xl p-4',
                    'border border-transparent transition-all duration-200',
                    'hover:border-gris-200 hover:shadow-card',
                    line.hoverBorder,
                  )}
                >
                  {/* Header de columna */}
                  <div className="flex items-start gap-2.5">
                    <div
                      className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                        line.tagBg,
                      )}
                    >
                      <Icon size={18} className={line.iconColor} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gris-900 leading-tight">
                        {line.name}
                      </p>
                      <span
                        className={cn(
                          'inline-block mt-0.5 rounded-full px-1.5 py-0.5',
                          'text-[10px] font-semibold uppercase tracking-wide',
                          line.tagBg, line.tagText,
                        )}
                      >
                        {line.tagline}
                      </span>
                    </div>
                  </div>

                  {/* Línea decorativa */}
                  <div className={cn('h-0.5 w-8 rounded-full', line.accentBar)} />

                  {/* Descripción */}
                  <p className="text-xs leading-relaxed text-gris-500 line-clamp-3">
                    {line.description}
                  </p>

                  {/* Footer */}
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xs text-gris-400">
                      {line.productCount} productos
                    </span>
                    <span
                      className={cn(
                        'flex items-center gap-1 text-xs font-semibold',
                        line.iconColor,
                        'transition-transform duration-200 group-hover:translate-x-0.5',
                      )}
                    >
                      Ver todos
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Footer del mega menu */}
        <div className="mt-6 flex items-center justify-between border-t border-gris-100 pt-4">
          <Link
            href="/soluciones"
            onClick={onClose}
            className="flex items-center gap-2 text-sm font-semibold text-verde-600 hover:text-verde-700 transition-colors"
          >
            Ver catálogo completo
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/cotizacion"
            onClick={onClose}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg px-4 py-2',
              'bg-naranja-500 text-sm font-semibold text-white',
              'hover:bg-naranja-600 transition-colors',
            )}
          >
            Solicitar cotización
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
