'use client'

/**
 * CultivosMegaMenu.tsx — Menú desplegable de Cultivos.
 *
 * Lista los 35 cultivos con protocolo; cada uno enlaza directo a su
 * expediente. Posicionado absolute top-full dentro del Header (fixed).
 */

import { motion } from 'motion/react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CROPS_DATA } from '@/data/constants'

const variants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' as const } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15, ease: 'easeIn' as const } },
}

interface CultivosMegaMenuProps {
  onClose: () => void
}

export default function CultivosMegaMenu({ onClose }: CultivosMegaMenuProps) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn(
        'absolute inset-x-0 top-full z-50',
        'border-t border-gris-100 bg-white',
        'shadow-[0_16px_40px_rgba(15,23,42,0.12)]',
      )}
      role="region"
      aria-label="Menú de cultivos"
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-gris-400">
          Elige tu cultivo · 35 expedientes con protocolo agronómico
        </p>

        {/* Grid de cultivos */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 sm:grid-cols-4 lg:grid-cols-6">
          {CROPS_DATA.map((crop) => (
            <Link
              key={crop.slug}
              href={`/cultivos/${crop.slug}`}
              onClick={onClose}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gris-700 transition-colors hover:bg-verde-50 hover:text-verde-700"
            >
              {crop.name}
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-gris-100 pt-4">
          <Link
            href="/cultivos"
            onClick={onClose}
            className="flex items-center gap-2 text-sm font-semibold text-verde-600 transition-colors hover:text-verde-700"
          >
            Ver los 35 expedientes con protocolo completo
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/cotizacion"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 rounded-lg bg-naranja-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-naranja-600"
          >
            Solicitar cotización
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
