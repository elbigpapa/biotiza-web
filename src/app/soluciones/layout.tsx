import type { Metadata } from 'next'

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
  alternates: { canonical: 'https://biotiza.mx/soluciones' },
  openGraph: {
    title: 'Catálogo de soluciones agrícolas · Biotiza',
    description:
      '47 productos de nutrición, bioestimulación y bioprotección para agricultura de exportación.',
    url: 'https://biotiza.mx/soluciones',
    type: 'website',
  },
}

export default function SolucionesLayout({ children }: { children: React.ReactNode }) {
  return children
}
