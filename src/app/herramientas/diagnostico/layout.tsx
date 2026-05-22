import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Diagnóstico de deficiencias',
  description:
    'Identifica deficiencias nutricionales en tu cultivo a partir de síntomas visuales y recibe una recomendación de producto y dosis Biotiza.',
  alternates: { canonical: 'https://biotiza.mx/herramientas/diagnostico' },
  openGraph: {
    title: 'Diagnóstico de deficiencias · Biotiza',
    description:
      'Identifica deficiencias nutricionales por síntoma visual y recibe una recomendación.',
    url: 'https://biotiza.mx/herramientas/diagnostico',
    type: 'website',
  },
}

export default function DiagnosticoLayout({ children }: { children: React.ReactNode }) {
  return children
}
