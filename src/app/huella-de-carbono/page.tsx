/**
 * /huella-de-carbono — Sostenibilidad y huella de carbono
 *
 * Contenido con datos SUSTENTADOS y citados (revisión científica e
 * industria). No se inventan cifras Biotiza-específicas: lo medible se
 * presenta como evidencia de categoría + un aviso honesto de que el
 * ahorro exacto se cuantifica por operación con el agrónomo Biotiza.
 *
 * Server Component.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { Leaf, Truck, Factory, FlaskConical, Sprout, ExternalLink } from 'lucide-react'
import Container from '@/components/ui/Container'
import { canonical } from '@/lib/seo'
import { CONTACT_INFO } from '@/data/constants'

export const metadata: Metadata = {
  title: 'Huella de Carbono',
  description:
    'Por qué cambiar sacos de fertilizante sólido por biosoluciones líquidas Biotiza reduce emisiones, fletes, empaque y mano de obra. Datos científicos citados.',
  ...canonical('/huella-de-carbono'),
  openGraph: {
    title: 'Huella de Carbono — Biotiza',
    description:
      'Evidencia científica sobre eficiencia de nutrientes, biostimulantes y fertirrigación. Menos huella, más cosecha.',
    url: 'https://biotiza.mx/huella-de-carbono',
  },
}

// ─── Datos verificados (cada uno con fuente) ──────────────────────────────
const HARD_STATS = [
  {
    value: '≈2.6 kg',
    unit: 'CO₂e por kg de N',
    label:
      'Emisiones para fabricar fertilizante nitrogenado sintético (promedio global).',
    ref: 1,
  },
  {
    value: '+17.9 %',
    unit: 'rendimiento promedio',
    label:
      'Respuesta media de cosecha con biostimulantes en >1,000 ensayos de campo (180 estudios).',
    ref: 3,
  },
  {
    value: '−40 %',
    unit: 'fertilizante',
    label:
      'Ahorro de fertilizante vía fertirrigación frente a aplicación al voleo, sin afectar el rendimiento.',
    ref: 4,
  },
  {
    value: '−25 %',
    unit: 'nitrógeno',
    label:
      'Extractos de algas mantuvieron el desempeño con 25 % menos de N aplicado.',
    ref: 2,
  },
]

const SOURCES = [
  {
    id: 1,
    cite: 'Menegat, Ledo & Tirado (2022). “Greenhouse gas emissions from global production and use of nitrogen synthetic fertilisers in agriculture”. Scientific Reports 12, 14490 (Nature).',
    url: 'https://www.nature.com/articles/s41598-022-18773-w',
  },
  {
    id: 2,
    cite: 'Reducing fertiliser inputs: plant biostimulants as an emerging strategy to improve nutrient use efficiency. Discover Sustainability (2025), Springer Nature.',
    url: 'https://link.springer.com/article/10.1007/s43621-025-00910-w',
  },
  {
    id: 3,
    cite: 'Li, Van Gerrewey & Geelen (2022). “A Meta-Analysis of Biostimulant Yield Effectiveness in Field Trials”. Frontiers in Plant Science, 13:836702.',
    url: 'https://www.frontiersin.org/journals/plant-science/articles/10.3389/fpls.2022.836702/full',
  },
  {
    id: 4,
    cite: 'Fertigation — A technique for efficient use of fertilizer through drip irrigation (revisión agronómica) y UGA Extension B1130, “Drip Chemigation”.',
    url: 'https://extension.uga.edu/publications/detail.html?number=B1130',
  },
  {
    id: 5,
    cite: 'University of Connecticut, CAHNR Soil Nutrient Analysis Laboratory — “Foliar Fertilization”.',
    url: 'https://soiltesting.cahnr.uconn.edu/foliar-fertilization/',
  },
]

const OPERATIONAL = [
  {
    icon: Factory,
    title: 'Menos emisiones de fabricación',
    body: 'Cada kilo de N sintético arrastra ≈2.6 kg CO₂e solo de producción. Mejorar la eficiencia de nutrientes y reducir la dosis aplicada baja directamente esa huella incorporada.',
    ref: 1,
  },
  {
    icon: Truck,
    title: 'Menos diésel, fletes y empaque',
    body: 'Un concentrado líquido sustituye decenas de sacos de fertilizante sólido por hectárea: menos tonelaje transportado significa menos viajes, menos diésel, menos plástico/costalera y menos espacio de almacén. La proporción exacta depende del programa y se calcula por operación.',
    ref: 4,
  },
  {
    icon: Sprout,
    title: 'Menos mano de obra de aplicación',
    body: 'Aplicar vía fertirrigación o foliar elimina pases de tractor/esparcidora y el manejo manual de sacos. La fertirrigación ahorra hasta ~40 % de fertilizante frente al voleo sin perder rendimiento; los micros por goteo rinden mucho más al evitar el “tie-up” del suelo.',
    ref: 4,
  },
  {
    icon: FlaskConical,
    title: 'Mejor asimilación',
    body: 'El foliar es muy eficiente para secundarios y micros (Ca, Mg, Zn, Fe) y para corregir deficiencias a mitad de ciclo; los biostimulantes elevan la eficiencia de uso de nutrientes y permiten bajar la dosis manteniendo cosecha.',
    ref: 2,
  },
]

export default function HuellaDeCarbonoPage() {
  return (
    <div className="bg-white">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-verde-900 to-verde-700">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 78% 28%, white 0%, transparent 55%)',
          }}
          aria-hidden="true"
        />
        <Container className="relative z-10 py-20 lg:py-28">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/95 backdrop-blur-sm">
              <Leaf className="h-4 w-4" aria-hidden="true" />
              Sostenibilidad
            </p>
            <h1 className="mb-4 font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              Menos huella, más cosecha
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
              Cambiar sacos de fertilizante sólido por biosoluciones líquidas y
              biostimulantes Biotiza reduce emisiones, fletes, empaque y mano de
              obra — y la evidencia científica lo respalda. Aquí van los datos,
              sin adornos y con sus fuentes.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Stats duros ───────────────────────────────────────────────── */}
      <section className="border-b border-gris-100 bg-gris-50 py-14">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HARD_STATS.map((s) => (
              <div
                key={s.label}
                className="flex flex-col rounded-2xl border border-gris-100 bg-white p-6 shadow-sm"
              >
                <p className="font-serif text-3xl text-verde-700">{s.value}</p>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-gris-500">
                  {s.unit}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-gris-600">
                  {s.label}
                </p>
                <a
                  href={`#fuente-${s.ref}`}
                  className="mt-3 text-xs font-semibold text-verde-600 hover:text-verde-700"
                >
                  Ver fuente [{s.ref}]
                </a>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── El costo oculto del fertilizante sólido ───────────────────── */}
      <section className="py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl text-gris-900 lg:text-4xl">
              El costo oculto del saco de fertilizante
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gris-600">
              La producción de fertilizante nitrogenado sintético emite{' '}
              <strong className="text-gris-900">≈2.6 kg de CO₂e por cada kg de N</strong>.
              En toda la cadena del N sintético, la fabricación representa el
              38.8 % de las emisiones, las emisiones de campo el 58.6 % y el
              transporte el 2.6 %.{' '}
              <a href="#fuente-1" className="font-semibold text-verde-600 hover:text-verde-700">
                [1]
              </a>{' '}
              Cada kilo de nutriente que tu cultivo aprovecha mejor — o que dejas
              de aplicar sin perder rendimiento — es huella que no se emite.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {OPERATIONAL.map((o) => {
              const Icon = o.icon
              return (
                <div
                  key={o.title}
                  className="flex gap-4 rounded-2xl border border-gris-100 bg-white p-6 shadow-sm"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-verde-50">
                    <Icon className="h-5 w-5 text-verde-600" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-gris-900">
                      {o.title}{' '}
                      <a
                        href={`#fuente-${o.ref}`}
                        className="align-super text-[11px] font-semibold text-verde-600 hover:text-verde-700"
                      >
                        [{o.ref}]
                      </a>
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-gris-600">
                      {o.body}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ── Lo que dice la ciencia ────────────────────────────────────── */}
      <section className="bg-verde-50 py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center font-serif text-3xl text-gris-900 lg:text-4xl">
              Lo que dice la ciencia
            </h2>
            <ul className="mt-8 space-y-4">
              <li className="rounded-xl border border-verde-100 bg-white p-5 text-sm leading-relaxed text-gris-700">
                Un metaanálisis de <strong>más de 1,000 ensayos de campo</strong>{' '}
                en 180 estudios encontró una respuesta media de rendimiento de{' '}
                <strong className="text-verde-700">+17.9 %</strong> con
                biostimulantes (rango 8.5–30.8 % según categoría).{' '}
                <a href="#fuente-3" className="font-semibold text-verde-600 hover:text-verde-700">[3]</a>
              </li>
              <li className="rounded-xl border border-verde-100 bg-white p-5 text-sm leading-relaxed text-gris-700">
                Revisiones revisadas por pares concluyen que los biostimulantes
                permiten <strong>reducir la dosis de fertilizante manteniendo la
                cosecha</strong>; p. ej. extractos de <em>Ascophyllum nodosum</em>{' '}
                sostuvieron el desempeño con <strong>25 % menos de N</strong>.{' '}
                <a href="#fuente-2" className="font-semibold text-verde-600 hover:text-verde-700">[2]</a>
              </li>
              <li className="rounded-xl border border-verde-100 bg-white p-5 text-sm leading-relaxed text-gris-700">
                La fertirrigación puede ahorrar <strong>~40 % de fertilizante</strong>{' '}
                frente a la aplicación al voleo sin afectar el rendimiento, y los
                micronutrientes por goteo rinden mucho más al evitar el bloqueo en
                el suelo.{' '}
                <a href="#fuente-4" className="font-semibold text-verde-600 hover:text-verde-700">[4]</a>
              </li>
              <li className="rounded-xl border border-verde-100 bg-white p-5 text-sm leading-relaxed text-gris-700">
                La nutrición foliar es altamente eficiente para secundarios y
                micros (Ca, Mg, Zn, Fe) y para corregir deficiencias a mitad de
                ciclo — complementa al suelo, no lo sustituye por completo.{' '}
                <a href="#fuente-5" className="font-semibold text-verde-600 hover:text-verde-700">[5]</a>
              </li>
            </ul>
          </div>
        </Container>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-2xl rounded-3xl bg-gradient-to-br from-verde-700 to-verde-600 p-8 text-center sm:p-12">
            <h2 className="font-serif text-3xl text-white">
              Calcula tu caso, sin adornos
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">
              El ahorro exacto en diésel, empaque, almacenaje y jornales depende
              de tu cultivo, superficie y logística. Nuestros agrónomos lo
              cuantifican contigo, con números de tu propia operación.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/herramientas/calculadora-roi"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-verde-800 transition-transform hover:-translate-y-0.5"
              >
                Calculadora de ROI
              </Link>
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Hola%20Biotiza%2C%20quiero%20calcular%20el%20ahorro%20y%20la%20huella%20de%20cambiar%20a%20sus%20biosoluciones`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                Hablar con un agrónomo
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Fuentes + disclaimer ──────────────────────────────────────── */}
      <section className="border-t border-gris-100 bg-gris-50 py-12">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-xl text-gris-900">Fuentes</h2>
            <ol className="mt-4 space-y-3">
              {SOURCES.map((s) => (
                <li
                  key={s.id}
                  id={`fuente-${s.id}`}
                  className="scroll-mt-24 text-xs leading-relaxed text-gris-600"
                >
                  <span className="font-semibold text-gris-800">[{s.id}]</span>{' '}
                  {s.cite}{' '}
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-verde-600 hover:text-verde-700"
                  >
                    Ver estudio
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-6 rounded-xl border border-gris-200 bg-white p-4 text-xs leading-relaxed text-gris-500">
              <strong className="text-gris-700">Nota honesta:</strong> las cifras
              citadas provienen de literatura científica e industria sobre la
              categoría (biosoluciones, biostimulantes, fertirrigación y foliar),
              no son resultados Biotiza-específicos. El ahorro real de emisiones,
              combustible, empaque, almacenaje y mano de obra varía por cultivo,
              clima, suelo y logística, y se valida caso por caso con análisis y
              el acompañamiento de un agrónomo Biotiza. No publicamos números que
              no podamos sustentar.
            </p>
          </div>
        </Container>
      </section>
    </div>
  )
}
