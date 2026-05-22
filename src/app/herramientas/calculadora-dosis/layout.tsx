import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calculadora de dosis',
  description:
    'Calcula la dosis exacta de producto Biotiza por hectárea o por tanque de aspersión según tu cultivo, superficie y volumen de agua.',
  alternates: { canonical: 'https://biotiza.mx/herramientas/calculadora-dosis' },
  openGraph: {
    title: 'Calculadora de dosis · Biotiza',
    description:
      'Dosis exacta por hectárea o por tanque según cultivo, superficie y volumen de agua.',
    url: 'https://biotiza.mx/herramientas/calculadora-dosis',
    type: 'website',
  },
}

export default function CalcDosisLayout({ children }: { children: React.ReactNode }) {
  return children
}
