import type { Metadata } from 'next'

/**
 * Metadata del layout de /soluciones.
 *
 * IMPORTANTE: este es un LAYOUT, por lo que su metadata se hereda por TODAS
 * las páginas hijas (/soluciones/[linea] y /soluciones/[linea]/[slug]).
 * Por eso NO debe declarar `alternates.canonical` ni `openGraph.url` fijos:
 * eso marcaría las 5 páginas de línea y las 47 fichas de producto como
 * duplicados de /soluciones. El canonical y el og:url los define cada página
 * hija (y la propia /soluciones) en su `generateMetadata`/`metadata`.
 *
 * Solo conservamos title/description/keywords genéricos como FALLBACK seguro:
 * las hijas los sobreescriben con su propio `title` vía generateMetadata.
 */
export const metadata: Metadata = {
  title: 'Catálogo de soluciones agrícolas',
  description:
    '47 productos de nutrición vegetal, bioestimulación y bioprotección para agricultura de exportación: fertilizantes orgánicos OMRI, fertirrigación de precisión y control biológico.',
  keywords: [
    'fertilizantes orgánicos México',
    'bioestimulantes agrícolas',
    'bioprotección cultivos',
    'nutrición líquida fertirrigación',
    'control biológico plagas',
  ],
  // Sin `alternates.canonical` ni `openGraph.url`: se definen por página.
  openGraph: {
    type: 'website',
  },
}

export default function SolucionesLayout({ children }: { children: React.ReactNode }) {
  return children
}
