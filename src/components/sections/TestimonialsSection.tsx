'use client'

/**
 * TestimonialsSection.tsx — Social proof premium
 *
 * Cambios vs versión anterior:
 *   • "productos de la línea Zentia" → "productos de Bioprotección"
 *   • "Migramos a la línea Zentia"   → "Migramos a Bioprotección"
 */

import { motion } from 'framer-motion'
import { Quote, Star, Sparkles } from 'lucide-react'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import SectionHeading from '@/components/ui/SectionHeading'
import Container from '@/components/ui/Container'
import { cn } from '@/lib/utils'

// ─── Datos de testimonios ────────────────────────────────────────────────

interface Testimonial {
  name: string
  role: string
  location: string
  avatarBg: string  // Tailwind gradient
  rating: number
  quote: string
  cultivoOrUseCase: string
  highlight?: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Roberto Alcaraz',
    role: 'Productor de tomate de exportación',
    location: 'Culiacán, Sinaloa',
    avatarBg: 'from-red-500 to-orange-500',
    rating: 5,
    quote:
      'Pasamos de 12% de pudrición apical a menos de 2% en una sola temporada con el protocolo de Calcio BP + Ca-Ultra. Los rendimientos por hectárea subieron 18% y el descarte en empaque cayó a la mitad.',
    cultivoOrUseCase: 'Tomate · 45 ha',
    highlight: '+18% rendimiento',
  },
  {
    name: 'Ing. María López',
    role: 'Agrónoma · Berries del Pacífico',
    location: 'Jocotepec, Jalisco',
    avatarBg: 'from-rose-500 to-pink-500',
    rating: 5,
    quote:
      'El acompañamiento técnico es lo que más valoro. Cualquier duda la resolvemos por WhatsApp en horas, no en días. Y los productos de Bioprotección nos sacaron de un brote serio de Botrytis sin afectar la certificación orgánica.',
    cultivoOrUseCase: 'Fresa · 28 ha',
    highlight: 'Cert. orgánica intacta',
  },
  {
    name: 'Lic. Carlos Méndez',
    role: 'Director de Áreas Verdes',
    location: 'Municipio de Zapopan',
    avatarBg: 'from-emerald-600 to-green-500',
    rating: 5,
    quote:
      'Migramos de pesticidas químicos a Bioprotección hace 18 meses. Ahora podemos abrir los parques inmediatamente después de aplicar y sin restricciones. Los vecinos lo notaron — recibimos cartas de agradecimiento.',
    cultivoOrUseCase: 'Parques municipales · 240 ha',
    highlight: 'Cero quejas vecinales',
  },
  {
    name: 'Andrea Figueroa',
    role: 'Jardinera amateur',
    location: 'Guadalajara, Jalisco',
    avatarBg: 'from-naranja-400 to-naranja-600',
    rating: 5,
    quote:
      'Tenía un limonero de 8 años que daba 12 limones al año. Apliqué el Kit Limonero Productivo y la siguiente temporada tuvo 4 floraciones distintas. Ahora regalo limones a mis vecinos.',
    cultivoOrUseCase: 'Frutales caseros',
    highlight: '40× más cosecha',
  },
]

// ─── Logos confiados (versión texto stylizado) ────────────────────────────

const TRUSTED_BY = [
  'Berries del Pacífico',
  'Agrícola del Valle',
  'Gobierno Zapopan',
  'Aguacate Premium',
  'Cítricos del Bajío',
  'Hortalizas Sonora',
]

// ─── Avatar inicial ───────────────────────────────────────────────────────

function InitialAvatar({ name, gradient }: { name: string; gradient: string }) {
  const initials = name
    .split(' ')
    .filter((w) => !/^(?:Ing\.|Lic\.|Dr\.|Mtra?\.)$/i.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  return (
    <span
      className={cn(
        'flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-bold text-sm text-white shadow-md ring-2 ring-white',
        'bg-gradient-to-br',
        gradient,
      )}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}

// ─── Stars ────────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={cn(
            'transition-colors',
            i < rating ? 'fill-naranja-400 text-naranja-400' : 'fill-gris-200 text-gris-200',
          )}
        />
      ))}
    </div>
  )
}

// ─── Card de testimonio ────────────────────────────────────────────────────

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  return (
    <motion.article
      variants={fadeInUp}
      className={cn(
        'group relative flex flex-col gap-5 rounded-2xl border border-gris-100 bg-white p-7 lg:p-8',
        'shadow-[0_2px_24px_rgba(15,23,42,0.05)] transition-all duration-500',
        'hover:-translate-y-1 hover:border-verde-200/80 hover:shadow-[0_16px_40px_rgba(34,181,115,0.12)]',
        // alternar fondo sutil para variedad visual
        index % 2 === 1 && 'lg:translate-y-6',
      )}
    >
      {/* Quote mark decorativo */}
      <Quote
        size={32}
        className="absolute right-6 top-6 text-verde-100 transition-colors group-hover:text-verde-200"
        aria-hidden="true"
      />

      {/* Header: avatar + meta */}
      <header className="flex items-start gap-4">
        <InitialAvatar name={t.name} gradient={t.avatarBg} />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gris-900 leading-tight">{t.name}</p>
          <p className="mt-0.5 text-xs text-gris-500 leading-snug">{t.role}</p>
          <p className="text-[11px] text-gris-400 mt-0.5">{t.location}</p>
        </div>
      </header>

      {/* Rating */}
      <StarRating rating={t.rating} />

      {/* Quote */}
      <blockquote className="text-sm leading-relaxed text-gris-700 lg:text-[15px]">
        “{t.quote}”
      </blockquote>

      {/* Footer: cultivo/uso + highlight */}
      <footer className="mt-auto flex flex-wrap items-center gap-2 border-t border-gris-100 pt-4">
        <span className="rounded-full bg-gris-100 px-2.5 py-1 text-[11px] font-medium text-gris-700">
          {t.cultivoOrUseCase}
        </span>
        {t.highlight && (
          <span className="inline-flex items-center gap-1 rounded-full bg-verde-50 px-2.5 py-1 text-[11px] font-bold text-verde-700 ring-1 ring-verde-100">
            <Sparkles size={11} />
            {t.highlight}
          </span>
        )}
      </footer>
    </motion.article>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────

export default function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      {/* Background mesh sutil */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-verde-100/40 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-naranja-100/30 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <SectionHeading
          tag="Lo que dicen quienes ya usan Biotiza"
          title="Resultados reales en campo"
          subtitle="Productores de exportación, jardineros entusiastas y administradores de áreas verdes coinciden: cuando la nutrición está bien, todo lo demás funciona."
          align="center"
        />

        {/* Grid de testimonios */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 lg:items-start"
        >
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </motion.div>

        {/* Trust bar — confían en nosotros */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-20 lg:mt-24"
        >
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-gris-400">
            Confían en Biotiza
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {TRUSTED_BY.map((logo) => (
              <span
                key={logo}
                className="font-serif text-base text-gris-500 transition-colors hover:text-verde-700 lg:text-lg"
              >
                {logo}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
