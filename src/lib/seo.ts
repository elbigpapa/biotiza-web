/**
 * seo.ts — Helpers de metadata para App Router (Next 16)
 *
 * Centraliza la construcción de canonicals self-referenciales para evitar
 * que un `layout.tsx` imponga un canonical fijo a todas sus páginas hijas
 * (lo que las declararía como duplicados de la ruta del layout).
 *
 * Regla de oro: el canonical SIEMPRE lo define la página concreta vía su
 * `generateMetadata`, nunca un layout compartido.
 */

import type { Metadata } from 'next'

export const SITE_URL = 'https://biotiza.mx'

/**
 * Devuelve un bloque `alternates.canonical` self-referencial para una ruta.
 * Acepta rutas relativas ('/soluciones/organicos') o absolutas.
 *
 * @example
 *   export async function generateMetadata(): Promise<Metadata> {
 *     return { title: '...', ...canonical('/soluciones/organicos') }
 *   }
 */
export function canonical(path: string): Pick<Metadata, 'alternates'> {
  const url = path.startsWith('http')
    ? path
    : `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`
  return { alternates: { canonical: url } }
}
