'use client'

/**
 * PrintFichaButton — dispara el diálogo de impresión del navegador.
 *
 * El usuario elige "Guardar como PDF" o imprime directo para llevar la
 * ficha de manejo al campo. Sin dependencias de generación de PDF en
 * servidor: la hoja ya está maquetada con estilos @media print.
 */

import { Printer } from 'lucide-react'

export default function PrintFichaButton({
  label = 'Descargar / Imprimir PDF',
  className = '',
}: {
  label?: string
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={
        className ||
        'inline-flex items-center justify-center gap-2 rounded-full bg-verde-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-verde-700'
      }
    >
      <Printer size={16} aria-hidden="true" />
      {label}
    </button>
  )
}
