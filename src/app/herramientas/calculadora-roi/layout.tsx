import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calculadora de ROI',
  description:
    'Estima el retorno de inversión de un programa nutricional Biotiza: compara costo del programa contra el valor adicional de cosecha por hectárea.',
  alternates: { canonical: 'https://biotiza.mx/herramientas/calculadora-roi' },
  openGraph: {
    title: 'Calculadora de ROI · Biotiza',
    description:
      'Compara el costo del programa contra el valor adicional de cosecha por hectárea.',
    url: 'https://biotiza.mx/herramientas/calculadora-roi',
    type: 'website',
  },
}

export default function CalcRoiLayout({ children }: { children: React.ReactNode }) {
  return children
}
