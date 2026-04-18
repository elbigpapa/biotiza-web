/**
 * /marcas — Listado de las 3 marcas que distribuye Biotiza.
 *
 * Biotiza representa en México tres líneas de proveedores con identidades,
 * tecnologías y geografías distintas. Esta página actúa como puerta de
 * entrada para que el visitante entienda de dónde vienen los productos y
 * pueda filtrar el catálogo por marca.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  ChevronRight,
  Globe,
  Leaf,
  Microscope,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { BRANDS } from '@/data/constants'
import { getProductsByBrand, PRODUCTS } from '@/data/products'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import type { ProductBrand } from '@/types'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Marcas — Biotiza | Bioproductos, Agrobionsa y Veganic',
  description:
    'Conoce las tres marcas de biosoluciones agrícolas que distribuye Biotiza en México: Bioproductos Agrícolas (Zapopan), Agrobionsa (Sinaloa) y Veganic (España). Catálogo completo OMRI + COFEPRIS.',
  keywords: [
    'Bioproductos Agrícolas',
    'Agrobionsa',
    'Veganic',
    'biosoluciones México',
    'control biológico México',
    'fertilizantes orgánicos México',
  ],
}

// ---------------------------------------------------------------------------
// Icon map
// ---------------------------------------------------------------------------

const BRAND_ICONS: Record<ProductBrand, LucideIcon> = {
  bioproductos: Leaf,
  agrobionsa:   Microscope,
  veganic:      Sparkles,
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function MarcasPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gris-900 via-verde-900 to-azul-900 py-20 lg:py-24">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(34,181,115,.4) 0, transparent 40%), radial-gradient(circle at 80% 60%, rgba(109,40,217,.35) 0, transparent 40%), radial-gradient(circle at 50% 90%, rgba(14,116,144,.35) 0, transparent 40%)',
          }}
          aria-hidden="true"
        />
        <Container className="relative">
          <SectionHeading
            tag={`3 marcas · ${PRODUCTS.length} productos`}
            title="Las marcas que representamos"
            subtitle="Biotiza integra en un solo catálogo las biosoluciones más completas del mercado mexicano: fabricantes nacionales con décadas de experiencia y tecnologías premium importadas de España."
            titleClassName="text-white"
            className="[&_p]:text-gris-200 [&_span]:text-verde-200 [&_span]:bg-white/10 [&_span]:backdrop-blur-sm"
            animate={false}
          />
        </Container>
      </div>

      {/* Grid de marcas */}
      <Container className="py-14 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-3">
          {BRANDS.map((brand) => {
            const Icon  = BRAND_ICONS[brand.id]
            const count = getProductsByBrand(brand.id).length

            return (
              <article
                key={brand.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-gris-100 bg-white shadow-[0_2px_16px_rgba(15,23,42,0.05)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_42px_rgba(15,23,42,0.12)]"
              >
                {/* Header de color */}
                <div
                  className="relative flex h-36 items-center justify-center overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${brand.color} 0%, ${brand.color}dd 60%, ${brand.color}99 100%)`,
                  }}
                >
                  <div
                    className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/15"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute -left-6 -bottom-8 h-24 w-24 rounded-full bg-white/10"
                    aria-hidden="true"
                  />
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                    <Icon size={32} className="text-white" />
                  </div>
                </div>

                {/* Cuerpo */}
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <h2 className="font-serif text-2xl text-gris-900">
                        {brand.name}
                      </h2>
                      <span
                        className="rounded-full px-2.5 py-0.5 text-xs font-bold text-white"
                        style={{ backgroundColor: brand.color }}
                      >
                        {count}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gris-500">
                      {brand.tagline}
                    </p>
                  </div>

                  <div className="flex items-start gap-1.5 text-xs text-gris-500">
                    <Globe size={13} className="mt-0.5 shrink-0" />
                    <span>{brand.origin}</span>
                  </div>

                  <p className="text-sm leading-relaxed text-gris-700">
                    {brand.description}
                  </p>

                  <ul className="flex flex-col gap-1.5">
                    {brand.strengths.slice(0, 3).map((s) => (
                      <li
                        key={s}
                        className="flex items-start gap-2 text-sm text-gris-600"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: brand.color }}
                          aria-hidden="true"
                        />
                        {s}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/marcas/${brand.slug}`}
                    className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5"
                    style={{ color: brand.color }}
                  >
                    Ver catálogo de {brand.name}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        {/* Nota de Biotiza como integrador */}
        <div className="mt-16 rounded-2xl border border-gris-100 bg-gradient-to-br from-verde-50 to-white p-8 lg:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-2xl text-gris-900 lg:text-3xl">
              Un solo aliado · tres casas de I+D
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gris-600 lg:text-base">
              Elegimos representar estas tres marcas porque se complementan sin
              competir entre sí: Bioproductos Agrícolas aporta la nutrición y
              bioprotección mexicana de volumen; Agrobionsa, la precisión del
              control biológico microbiano; Veganic, la biotecnología europea
              con dosis reducidas. Nuestro equipo agronómico te ayuda a
              combinarlas en el protocolo óptimo para tu cultivo.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/soluciones"
                className="inline-flex items-center gap-1.5 rounded-lg bg-verde-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-verde-600 transition-colors shadow-[0_4px_16px_rgba(34,181,115,0.3)]"
              >
                Explorar las {PRODUCTS.length} soluciones
                <ChevronRight size={14} />
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-1.5 rounded-lg border border-gris-200 px-5 py-2.5 text-sm font-semibold text-gris-700 hover:border-gris-300 transition-colors"
              >
                Hablar con un agrónomo
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
