/**
 * /marcas/[slug] — Redirección permanente a /soluciones.
 *
 * Las páginas de marca individual fueron retiradas: Biotiza se presenta como
 * un único catálogo de soluciones, sin promover marcas de proveedores.
 * Cualquier enlace antiguo (/marcas/bioproductos, etc.) cae a /soluciones.
 */

import { permanentRedirect } from 'next/navigation'

export function generateStaticParams() {
  return [
    { slug: 'bioproductos' },
    { slug: 'agrobionsa' },
    { slug: 'veganic' },
  ]
}

export default function MarcaSlugRedirect() {
  permanentRedirect('/soluciones')
}
