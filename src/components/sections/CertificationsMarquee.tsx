'use client'

/**
 * CertificationsMarquee.tsx — Banda horizontal infinita de certificaciones
 *
 * Tira de logos/badges de certificaciones que reconocen los productos
 * Biotiza. Loop CSS puro, pausa al hover, fade en los bordes.
 *
 * Patrón usado por Stripe, Vercel, Linear para mostrar "trusted by".
 */

import { ShieldCheck, Award, Globe2, Leaf, FlaskConical, Star } from 'lucide-react'
import Container from '@/components/ui/Container'
import Marquee from '@/components/ui/Marquee'
import { cn } from '@/lib/utils'

interface Badge {
  label: string
  sub?: string
  Icon: typeof ShieldCheck
  color: string  // tailwind text color class
}

const CERTIFICATIONS: Badge[] = [
  { label: 'COFEPRIS',         sub: 'Registro sanitario',          Icon: ShieldCheck,  color: 'text-azul-600'    },
  { label: 'OMRI Listed',      sub: 'Insumo agricultura orgánica', Icon: Leaf,         color: 'text-verde-600'   },
  { label: 'Hecho en México',  sub: 'Formulación nacional',        Icon: Globe2,       color: 'text-naranja-600' },
  { label: 'Apto USDA NOP',    sub: 'Programas orgánicos vía OMRI',Icon: Star,         color: 'text-amber-600'   },
  { label: 'I+D propio',       sub: '25+ años en campo',           Icon: FlaskConical, color: 'text-verde-700'   },
  { label: 'Análisis por lote',sub: 'Trazabilidad de producto',    Icon: Award,        color: 'text-azul-700'    },
]

function BadgeCard({ badge }: { badge: Badge }) {
  const { label, sub, Icon, color } = badge
  return (
    <div className="group flex items-center gap-3 rounded-2xl border border-gris-100 bg-white px-5 py-3.5 shadow-[0_2px_12px_rgba(15,23,42,0.04)] transition-all duration-300 hover:border-verde-200 hover:shadow-[0_8px_30px_rgba(34,181,115,0.12)]">
      <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gris-50 transition-colors group-hover:bg-verde-50', color)}>
        <Icon size={18} strokeWidth={2} />
      </span>
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-bold text-gris-900">{label}</span>
        {sub && (
          <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-gris-500">{sub}</span>
        )}
      </div>
    </div>
  )
}

export default function CertificationsMarquee() {
  return (
    <section className="relative bg-white py-12 lg:py-16 overflow-hidden">
      <Container>
        <p className="mb-6 text-center text-[10px] font-bold uppercase tracking-[0.25em] text-gris-400">
          Certificaciones y reconocimientos
        </p>
      </Container>

      <Marquee duration={40} fade pauseOnHover>
        {CERTIFICATIONS.map((badge, i) => (
          <BadgeCard key={i} badge={badge} />
        ))}
      </Marquee>
    </section>
  )
}
