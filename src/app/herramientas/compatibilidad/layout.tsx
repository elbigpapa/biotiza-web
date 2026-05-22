import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Compatibilidad de mezclas',
  description:
    'Verifica si dos productos Biotiza pueden mezclarse en el mismo tanque de aspersión antes de aplicar, y consulta el orden de mezcla recomendado.',
  alternates: { canonical: 'https://biotiza.mx/herramientas/compatibilidad' },
  openGraph: {
    title: 'Compatibilidad de mezclas · Biotiza',
    description:
      'Verifica si dos productos pueden mezclarse en el mismo tanque antes de aplicar.',
    url: 'https://biotiza.mx/herramientas/compatibilidad',
    type: 'website',
  },
}

export default function CompatibilidadLayout({ children }: { children: React.ReactNode }) {
  return children
}
