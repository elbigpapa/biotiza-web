import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Habla con el equipo agronómico de Biotiza. Respuesta en menos de 24 h hábiles. WhatsApp +52 33 1602 2708 · ventas@biotiza.mx · Ciudad Guzmán, Jalisco, México.',
  alternates: { canonical: 'https://biotiza.mx/contacto' },
  openGraph: {
    title: 'Contacto · Biotiza',
    description:
      'Habla con el equipo agronómico de Biotiza. Respuesta en menos de 24 h hábiles.',
    url: 'https://biotiza.mx/contacto',
    type: 'website',
  },
}

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return children
}
