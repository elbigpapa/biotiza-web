import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Flower2,
  Trees,
  Apple,
  Flower,
  Landmark,
  Home,
  Sparkles,
  ShieldCheck,
  Package,
  type LucideIcon,
} from 'lucide-react'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { GARDEN_CATEGORIES, GARDEN_PACKAGES, getFeaturedPackages } from '@/data/home-garden'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Biotiza Casa y Jardín — Biosoluciones para el hogar',
  description:
    'Productos Biotiza adaptados para casa, jardín, frutales caseros, áreas verdes y campos de golf. Los mismos productos que usan los exportadores agrícolas, en paquetes para consumidor final.',
  alternates: { canonical: 'https://biotiza.mx/casa-jardin' },
  openGraph: {
    title: 'Biotiza Casa y Jardín',
    description:
      'Kits y paquetes de biosoluciones para plantas de interior, pasto, frutales caseros y flores.',
    type: 'website',
  },
}

const ICONS: Record<string, LucideIcon> = {
  Flower2, Trees, Apple, Flower, Landmark,
}

const FEATURES = [
  {
    icon: ShieldCheck,
    title: '100% orgánicos y certificados',
    description: 'COFEPRIS, OMRI Listed, Hecho en México. Seguros para niños y mascotas.',
  },
  {
    icon: Sparkles,
    title: 'Calidad profesional',
    description: 'Los mismos productos que usan los exportadores agrícolas — ahora para tu casa.',
  },
  {
    icon: Package,
    title: 'Paquetes listos para usar',
    description: 'Kits pre-armados con dosificador, calendario y asesoría por WhatsApp.',
  },
]

export default function CasaJardinPage() {
  const featured = getFeaturedPackages()

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-verde-900 via-verde-800 to-emerald-900 py-24 lg:py-32">
        <div className="absolute inset-0 dot-pattern-dark opacity-40" aria-hidden="true" />
        <div className="absolute -right-20 top-10 h-96 w-96 rounded-full bg-verde-500/15 blur-3xl" aria-hidden="true" />
        <div className="absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" aria-hidden="true" />

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-verde-300 backdrop-blur-sm">
              <Home size={13} />
              Nueva línea · Casa y Jardín
            </span>
            <h1 className="mt-5 font-serif text-4xl text-white text-balance lg:text-6xl">
              Biotiza llega a tu hogar
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-gris-300 text-pretty lg:text-lg">
              Los mismos productos que usan los agricultores profesionales para exportación —
              ahora adaptados para tus plantas, pasto, flores y frutales caseros.
              100% orgánicos, seguros para tu familia y mascotas.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="#categorias"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-gris-900 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(255,255,255,0.15)]"
              >
                Explorar categorías
                <ArrowRight size={15} />
              </Link>
              <Link
                href="#paquetes"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                Ver paquetes destacados
              </Link>
            </div>

            {/* Certificados */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
              {['COFEPRIS', 'OMRI Listed', 'Hecho en México', 'Sin residuos químicos'].map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-verde-200 backdrop-blur-sm"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="bg-white py-16 lg:py-20">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-gris-100 bg-white p-6 shadow-[0_2px_20px_rgba(15,23,42,0.04)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-verde-50 text-verde-600">
                  <Icon size={22} />
                </span>
                <h3 className="mt-4 font-serif text-lg text-gris-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gris-600">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Categorías */}
      <section id="categorias" className="bg-gris-50 py-16 lg:py-24">
        <Container>
          <SectionHeading
            tag="Por tipo de uso"
            title="Elige tu categoría"
            subtitle="Desde un apartamento con 3 macetas hasta un campo de golf de 9 hoyos — hay un programa Biotiza para cada escala."
            align="center"
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {GARDEN_CATEGORIES.map((cat) => {
              const Icon = ICONS[cat.icon] ?? Flower2
              return (
                <Link
                  key={cat.id}
                  href={`/casa-jardin/${cat.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gris-100 bg-white shadow-[0_2px_20px_rgba(15,23,42,0.04)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)]"
                >
                  <div className={cn('relative flex h-32 items-center justify-center bg-gradient-to-br overflow-hidden', cat.gradient)}>
                    <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/10" aria-hidden="true" />
                    <div className="absolute left-4 bottom-4 h-10 w-10 rounded-full bg-white/5" aria-hidden="true" />
                    <span className="text-5xl drop-shadow-md transition-transform duration-500 group-hover:scale-110" aria-hidden="true">
                      {cat.emoji}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div className="flex items-center gap-2">
                      <Icon size={16} style={{ color: cat.color }} />
                      <h3 className="font-serif text-lg text-gris-900 group-hover:text-verde-700 transition-colors">
                        {cat.name}
                      </h3>
                    </div>
                    <p className="text-xs text-gris-500 leading-relaxed line-clamp-3 flex-1">
                      {cat.tagline}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-verde-600 transition-all group-hover:gap-2">
                      Ver paquetes <ArrowRight size={11} />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Paquetes destacados */}
      <section id="paquetes" className="bg-white py-16 lg:py-24">
        <Container>
          <SectionHeading
            tag="Bestsellers"
            title="Paquetes más vendidos"
            subtitle="Los kits que eligen la mayoría de nuestros clientes. Resultados visibles en 3–6 semanas."
            align="center"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((pkg) => {
              const category = GARDEN_CATEGORIES.find((c) => c.id === pkg.category)
              return (
                <Link
                  key={pkg.slug}
                  href={`/casa-jardin/paquete/${pkg.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gris-100 bg-white shadow-[0_2px_20px_rgba(15,23,42,0.04)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(15,23,42,0.1)]"
                >
                  <div className={cn('relative flex h-44 items-center justify-center bg-gradient-to-br overflow-hidden', pkg.gradient)}>
                    {pkg.badge && (
                      <span className="absolute top-3 right-3 rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm ring-1 ring-white/30">
                        {pkg.badge === 'bestseller' ? '★ Bestseller' : pkg.badge === 'popular' ? '🔥 Popular' : '✨ Nuevo'}
                      </span>
                    )}
                    <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/10" aria-hidden="true" />
                    <span className="text-6xl drop-shadow-md transition-transform duration-500 group-hover:scale-110" aria-hidden="true">
                      {pkg.emoji}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: category?.color }}>
                      {category?.name}
                    </span>
                    <h3 className="font-sans text-base font-semibold leading-snug text-gris-900 group-hover:text-verde-700 transition-colors">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-gris-500 line-clamp-2 flex-1">
                      {pkg.shortDescription}
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      {pkg.priceStrike && (
                        <span className="text-xs text-gris-400 line-through">${pkg.priceStrike}</span>
                      )}
                      <span className="text-lg font-bold text-verde-700">
                        {pkg.price > 0 ? `$${pkg.price.toLocaleString('es-MX')} MXN` : 'Cotización'}
                      </span>
                    </div>
                    <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-verde-600 transition-all group-hover:gap-2">
                      Ver paquete <ArrowRight size={11} />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/casa-jardin/todos"
              className="inline-flex items-center gap-2 rounded-xl border border-gris-200 bg-white px-5 py-3 text-sm font-semibold text-gris-700 transition-colors hover:border-verde-300 hover:text-verde-700"
            >
              Ver todos los paquetes
              <ArrowRight size={14} />
            </Link>
          </div>
        </Container>
      </section>

      {/* Sub-sección: gobiernos / instituciones */}
      <section className="bg-gradient-to-br from-verde-900 to-gris-900 py-16 lg:py-20">
        <Container>
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_300px] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-verde-300 backdrop-blur-sm">
                <Landmark size={11} />
                Gobierno · Instituciones · Grandes superficies
              </span>
              <h2 className="mt-4 font-serif text-3xl text-white text-balance lg:text-4xl">
                Áreas verdes seguras para las familias, profesionales para los resultados
              </h2>
              <p className="mt-4 text-base text-gris-300 text-pretty lg:text-lg">
                Tenemos programas personalizados para campos de golf, parques municipales,
                campus escolares y corporativos. Todos nuestros productos son 100% biológicos
                y compatibles con reapertura inmediata al público.
              </p>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {[
                  'Licitaciones públicas · NOM compliance',
                  'Capacitación a operadores',
                  'Visitas técnicas trimestrales',
                  'Reportes de aplicación y análisis de suelo',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gris-300">
                    <ShieldCheck size={15} className="mt-0.5 shrink-0 text-verde-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contacto?tipo=institucional"
                  className="inline-flex items-center gap-2 rounded-xl bg-verde-500 px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-verde-400 hover:shadow-[0_10px_30px_rgba(34,181,115,0.35)]"
                >
                  Agendar cita técnica
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/casa-jardin/areas-verdes-institucionales"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
                >
                  Ver programas
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <div className="text-6xl text-center mb-3">⛳</div>
              <p className="text-center font-serif text-xl text-white">Campos de golf</p>
              <p className="mt-2 text-center text-xs text-verde-200">
                Programas tournament-grade
              </p>
              <div className="my-4 h-px bg-white/10" />
              <div className="text-6xl text-center mb-3">🏛️</div>
              <p className="text-center font-serif text-xl text-white">Gobiernos</p>
              <p className="mt-2 text-center text-xs text-verde-200">
                Licitaciones y NOM-compliant
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ breve */}
      <section className="bg-gris-50 py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              tag="Preguntas frecuentes"
              title="Lo que más nos preguntan"
              align="center"
            />
            <div className="mt-10 space-y-4">
              {[
                {
                  q: '¿Son seguros para niños y mascotas?',
                  a: 'Sí. Todos nuestros productos son 100% biológicos, con certificaciones COFEPRIS y OMRI. Pueden entrar al jardín inmediatamente después del secado de la aplicación (aprox. 30 min).',
                },
                {
                  q: '¿Son compatibles con agricultura orgánica casera?',
                  a: 'Totalmente. OMRI Listed significa que son aprobados para agricultura orgánica certificada — con mayor razón para uso casero.',
                },
                {
                  q: '¿Cómo recibo el paquete?',
                  a: 'Enviamos a todo México por paquetería (2–4 días hábiles). Desde $500 MXN envío gratis. Pago por transferencia, tarjeta o contra-entrega en Zapopan.',
                },
                {
                  q: '¿Hay soporte post-compra?',
                  a: 'Sí. Cada kit incluye acceso al chat con nuestra Asesora Biotiza y, si es necesario, consulta gratuita por WhatsApp con un agrónomo humano (envías fotos de tu planta).',
                },
              ].map(({ q, a }) => (
                <details
                  key={q}
                  className="group rounded-2xl border border-gris-200 bg-white p-5 open:border-verde-300 open:shadow-[0_4px_20px_rgba(34,181,115,0.08)]"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-gris-900">
                    {q}
                    <ArrowRight size={14} className="shrink-0 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-gris-600">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
