'use client'

/**
 * AddToQuoteButton — botón cliente que agrega un producto al carrito de
 * cotización. Sustituye al antiguo enlace estático "Agregar a cotización"
 * que no hacía nada (el carrito quedaba siempre vacío). Tras agregar, muestra
 * confirmación y un acceso a /cotizacion.
 */

import { useState } from 'react'
import Link from 'next/link'
import { Check, Plus } from 'lucide-react'
import { track } from '@vercel/analytics'
import { useQuotationCart } from '@/hooks/useQuotationCart'
import type { ProductLine } from '@/types'

interface AddToQuoteButtonProps {
  productId: string
  productName: string
  productLine: ProductLine
  productSlug: string
  /** Unidad de referencia para el carrito (L, kg, unidad…) */
  unit?: string
}

export default function AddToQuoteButton({
  productId,
  productName,
  productLine,
  productSlug,
  unit = 'L',
}: AddToQuoteButtonProps) {
  const { addItem, isInCart } = useQuotationCart()
  const [justAdded, setJustAdded] = useState(false)
  const added = justAdded || isInCart(productId)

  const handleAdd = () => {
    addItem({ productId, productName, productLine, productSlug, unit })
    setJustAdded(true)
    track('add_to_quote', { product: productSlug })
  }

  if (added) {
    return (
      <div className="inline-flex items-center gap-3 flex-wrap">
        <span className="inline-flex items-center gap-2 px-6 py-3.5 border border-verde-500 text-verde-700 font-mono text-[11px] font-semibold uppercase tracking-[0.16em]">
          <Check size={14} /> En tu cotización
        </span>
        <Link
          href="/cotizacion"
          className="inline-flex items-center px-6 py-3.5 bg-ink text-white font-mono text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-ink/90 transition-colors"
        >
          Ver cotización →
        </Link>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      className="inline-flex items-center gap-2 px-6 py-3.5 border border-ink text-ink font-mono text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-ink hover:text-white transition-all duration-300"
    >
      <Plus size={14} /> Agregar a cotización
    </button>
  )
}
