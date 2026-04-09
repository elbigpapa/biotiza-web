import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Leaf,
  Target,
  Eye,
  Heart,
  Shield,
  Zap,
  Users,
  Globe,
  Award,
  ChevronRight,
} from 'lucide-react'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import Badge from '@/components/ui/Badge'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: 'Nosotros — Biotiza',
  description:
    'Somos Biotiza, empresa mexicana de biosoluciones agrícolas con sede en Zapopan, Jalisco. Desarrollamos fertilizantes orgánicos, bioestimulantes y bioprotección para productores de exportación comprometidos con la agricultura sustentable.',
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const milestones = [
  { year: '2018', label: 'Fundación en Zapopan, Jalisco' },
  { year: '2020', label: 'Primera certificación OMRI Listed' },
  { year: '2023', label: 'Expansión a nivel nacional' },
]

const stats = [
  { value: '8', label: 'cultivos atendidos' },
  { value: '5', label: 'líneas de producto' },
  { value: '🇲🇽', label: 'México' },
]

const valores = [
  {
    emoji: '🔬',
    title: 'Ciencia',
    description: 'Formulaciones basadas en investigación y evidencia',
  },
  {
    emoji: '🌱',
    title: 'Sustentabilidad',
    description: 'Productos que cuidan el suelo para las próximas generaciones',
  },
  {
    emoji: '🤝',
    title: 'Cercanía',
    description: 'Acompañamiento técnico personalizado en campo',
  },
  {
    emoji: '🏆',
    title: 'Calidad',
    description: 'Certificaciones OMRI y COFEPRIS como garantía',
  },
  {
    emoji: '🇲🇽',
    title: 'Orgullo mexicano',
    description: 'Hecho en México para el campo mexicano',
  },
]

const teamMembers = [
  { name: 'Carlos M.', role: 'Director General' },
  { name: 'Dr. Ana L.', role: 'I+D Agronómica' },
  { name: 'Roberto H.', role: 'Ventas y Territorio' },
  { name: 'Ing. Patricia V.', role: 'Servicio Técnico' },
]

const cofeprisChecks = [
  'Registro sanitario vigente',
  'Formulaciones auditadas',
  'Etiquetado oficial',
]

const omriChecks = [
  'Ingredientes de origen biológico',
  'Sin contaminantes sintéticos',
  'Aceptado en producción orgánica USDA/EU',
]

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default function NosotrosPage() {
  return (
    <main>

      {/* ------------------------------------------------------------------ */}
      {/* 1. Hero                                                             */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative bg-gradient-to-br from-verde-900 via-verde-800 to-verde-700 py-20 lg:py-28 overflow-hidden">
        {/* Decorative circles */}
        <span className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-white opacity-10 pointer-events-none" />
        <span className="absolute bottom-0 -left-24 w-96 h-96 rounded-full bg-white opacity-10 pointer-events-none" />
        <span className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-white opacity-20 pointer-events-none" />

        <Container>
          <div className="relative z-10 max-w-3xl">
            {/* Tag */}
            <span className="inline-block bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs uppercase tracking-wider mb-6">
              Zapopan, Jalisco · Desde 2018
            </span>

            {/* Headline */}
            <h1 className="font-serif text-4xl lg:text-6xl text-white leading-tight">
              Generamos Vida y Valor al Campo
            </h1>

            {/* Subtitle */}
            <p className="text-white/80 max-w-2xl mt-4 text-lg leading-relaxed">
              Somos una empresa mexicana de biosoluciones agrícolas que acompaña a los
              productores de exportación con ciencia, tecnología y servicio personalizado.
            </p>

            {/* Stats pills */}
            <div className="flex flex-wrap gap-3 mt-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-sm font-semibold text-white">
                41 productos
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-sm font-semibold text-white">
                5 líneas especializadas
              </span>
            </div>

            {/* CTA */}
            <Link
              href="/soluciones"
              className="inline-flex items-center gap-2 mt-8 rounded-lg bg-verde-500 px-6 py-3 text-sm font-semibold text-white hover:bg-verde-400 transition-colors"
            >
              Ver nuestras soluciones →
            </Link>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. Historia / Propósito                                             */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 lg:py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: text */}
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-verde-600 mb-3">
                Nuestra Historia
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl text-gris-900 leading-snug mb-6">
                Ciencia al servicio del campo mexicano
              </h2>

              <div className="space-y-4 text-gris-600 text-base leading-relaxed">
                <p>
                  Biotiza nació en Zapopan, Jalisco, con una convicción clara: los productores
                  mexicanos merecen acceso a las mismas soluciones biológicas de vanguardia que
                  utilizan los agricultores más competitivos del mundo. Desde nuestra fundación
                  en 2018, hemos construido un portafolio de más de 41 productos orientado
                  exclusivamente a resultados medibles en campo.
                </p>
                <p>
                  Nuestro equipo de investigación y desarrollo trabaja de la mano con agrónomos
                  especializados para formular cada producto con evidencia científica sólida.
                  Obtenemos las certificaciones más exigentes del mercado —COFEPRIS y OMRI
                  Listed— porque entendemos que la confianza del productor se gana con
                  transparencia y rigor técnico.
                </p>
                <p>
                  Hoy acompañamos a productores de exportación en los principales estados
                  agrícolas de México, ayudándolos a reducir el uso de agroquímicos sintéticos,
                  mejorar la salud del suelo y obtener certificaciones orgánicas que abren
                  puertas a mercados internacionales más rentables.
                </p>
              </div>

              {/* Timeline */}
              <div className="mt-8 flex flex-col sm:flex-row gap-0 sm:gap-0 relative">
                {/* connector line */}
                <div className="hidden sm:block absolute top-5 left-5 right-5 h-px bg-verde-100 z-0" />
                {milestones.map((m, i) => (
                  <div key={i} className="relative z-10 flex sm:flex-col items-start sm:items-center gap-3 sm:gap-2 flex-1 pb-4 sm:pb-0">
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-verde-500 text-white text-xs font-bold flex items-center justify-center shadow-md">
                      {m.year.slice(2)}
                    </span>
                    <div className="sm:text-center">
                      <p className="text-xs font-bold text-verde-700">{m.year}</p>
                      <p className="text-xs text-gris-500 leading-snug">{m.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: decorative card + stats */}
            <div className="flex flex-col gap-4">
              {/* Large decorative card */}
              <div className="relative rounded-2xl bg-gradient-to-br from-verde-700 to-verde-500 p-8 overflow-hidden">
                <span className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />
                <Leaf size={40} className="text-white/70 mb-4" />
                <p className="font-serif text-2xl text-white leading-snug">
                  "Cada producto que formulamos es una promesa de rendimiento y responsabilidad
                  con la tierra."
                </p>
                <p className="mt-4 text-sm text-white/70">— Equipo Biotiza</p>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-3 gap-3">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-gris-100 bg-white p-4 text-center shadow-sm"
                  >
                    <p className="text-2xl font-bold text-verde-600">{s.value}</p>
                    <p className="text-xs text-gris-500 mt-1 leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. Misión, Visión y Valores                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-gris-50 py-16 lg:py-20">
        <Container>
          <SectionHeading
            tag="Nuestra esencia"
            title="Misión, Visión y Valores"
            align="center"
            className="mb-10"
          />

          {/* Misión + Visión */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Misión */}
            <div className="rounded-2xl bg-verde-500 p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Target size={28} className="opacity-80" />
                <h3 className="font-serif text-xl">Misión</h3>
              </div>
              <p className="text-white/90 leading-relaxed">
                Empoderar a los productores de México con soluciones biológicas probadas,
                basadas en ciencia, que incrementan la productividad, protegen la salud del
                suelo y entregan alimentos más seguros al mundo.
              </p>
            </div>

            {/* Visión */}
            <div className="rounded-2xl bg-gris-900 p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Eye size={28} className="opacity-80" />
                <h3 className="font-serif text-xl">Visión</h3>
              </div>
              <p className="text-white/90 leading-relaxed">
                Una agricultura latinoamericana próspera donde la innovación biológica permite
                a cada productor producir más y mejores alimentos de manera sustentable.
              </p>
            </div>
          </div>

          {/* Valores */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {valores.map((v) => (
              <div
                key={v.title}
                className="rounded-xl border border-gris-100 bg-white p-5 shadow-sm flex flex-col items-center text-center"
              >
                <span className="text-3xl mb-3">{v.emoji}</span>
                <p className="font-semibold text-gris-800 text-sm mb-1">{v.title}</p>
                <p className="text-xs text-gris-500 leading-snug">{v.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. Certificaciones                                                  */}
      {/* ------------------------------------------------------------------ */}
      <section id="certificaciones" className="py-16 lg:py-20">
        <Container>
          <SectionHeading
            tag="Respaldo oficial"
            title="Certificaciones que nos avalan"
            subtitle="Nuestros productos cumplen con los estándares más exigentes del mercado nacional e internacional."
            align="center"
            className="mb-10"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* COFEPRIS */}
            <div className="rounded-2xl border border-gris-200 bg-white p-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">🇲🇽</span>
                <div>
                  <p className="font-serif text-xl text-gris-900">COFEPRIS</p>
                  <p className="text-xs text-gris-500">
                    Comisión Federal para la Protección contra Riesgos Sanitarios
                  </p>
                </div>
              </div>
              <p className="text-sm text-gris-600 leading-relaxed mt-4 mb-5">
                Todos nuestros productos cuentan con registro sanitario ante la COFEPRIS,
                garantizando su seguridad, eficacia y legalidad en México.
              </p>
              <ul className="space-y-2">
                {cofeprisChecks.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gris-700">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-verde-100 flex items-center justify-center">
                      <ChevronRight size={12} className="text-verde-600" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* OMRI */}
            <div className="rounded-2xl border border-verde-200 bg-verde-50 p-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-verde-500 flex items-center justify-center text-white font-bold text-sm">
                  ✓
                </span>
                <div>
                  <p className="font-serif text-xl text-gris-900">OMRI Listed</p>
                  <p className="text-xs text-gris-500">Organic Materials Review Institute</p>
                </div>
              </div>
              <p className="text-sm text-gris-600 leading-relaxed mt-4 mb-5">
                La certificación OMRI es el estándar internacional que avala que nuestros
                productos son aptos para ser usados en agricultura orgánica certificada.
              </p>
              <ul className="space-y-2">
                {omriChecks.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gris-700">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-verde-500 flex items-center justify-center">
                      <ChevronRight size={12} className="text-white" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. Equipo                                                           */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-gris-50 py-16">
        <Container>
          <SectionHeading
            tag="Las personas detrás de Biotiza"
            title="Nuestro Equipo"
            subtitle="Un equipo multidisciplinario de agrónomos, científicos y especialistas comprometidos con el campo."
            align="center"
            className="mb-10"
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="rounded-xl border border-gris-100 bg-verde-50 p-6 flex flex-col items-center text-center shadow-sm"
              >
                {/* Avatar placeholder */}
                <div className="w-16 h-16 bg-gris-200 rounded-full mb-4 flex items-center justify-center">
                  <Users size={24} className="text-gris-400" />
                </div>
                <p className="font-semibold text-gris-800 text-sm">{member.name}</p>
                <p className="text-xs text-gris-500 mt-0.5">{member.role}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 6. CTA final                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-gradient-to-r from-verde-700 to-verde-500 py-16">
        <Container narrow>
          <div className="text-center">
            <h2 className="font-serif text-3xl lg:text-4xl text-white mb-4">
              ¿Listo para transformar tu cultivo?
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8 text-base leading-relaxed">
              Habla con nuestro equipo agronómico y descubre qué línea de biosoluciones es
              la indicada para tu cultivo y etapa fenológica.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/cotizacion"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-verde-700 hover:bg-verde-50 transition-colors"
              >
                Solicitar cotización
                <ChevronRight size={16} />
              </Link>
              <Link
                href="/soluciones"
                className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
              >
                Ver productos
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </Container>
      </section>

    </main>
  )
}
