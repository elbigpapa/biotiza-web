/**
 * /marcas — Redirección permanente a /soluciones.
 *
 * Biotiza presenta un único catálogo de soluciones. No se promueven marcas
 * individuales de proveedores; todo el portafolio se navega por línea y
 * categoría desde /soluciones.
 */

import { permanentRedirect } from 'next/navigation'

export default function MarcasRedirect() {
  permanentRedirect('/soluciones')
}
