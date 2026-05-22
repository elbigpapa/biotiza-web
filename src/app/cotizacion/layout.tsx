import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Solicitar cotización',
  description:
    'Arma tu cotización de productos Biotiza. Un agrónomo te responde con dosis, programa de aplicación y precio para tu cultivo y superficie.',
  alternates: { canonical: 'https://biotiza.mx/cotizacion' },
  openGraph: {
    title: 'Solicitar cotización · Biotiza',
    description:
      'Un agrónomo te responde con dosis, programa de aplicación y precio para tu cultivo.',
    url: 'https://biotiza.mx/cotizacion',
    type: 'website',
  },
}

export default function CotizacionLayout({ children }: { children: React.ReactNode }) {
  return children
}
