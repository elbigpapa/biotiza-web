/**
 * /cultivos — Landing page del catálogo de protocolos de cultivo
 *
 * Server Component · Sin 'use client'
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CROP_PROTOCOLS } from '@/data/crops'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'

// ─── SEO ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Cultivos | Programas de Nutrición — Biotiza',
  description:
    'Protocolos de nutrición diseñados por agrónomos para los cultivos de exportación más importantes de México: tomate, fresa, arándano, aguacate y más.',
  openGraph: {
    title: 'Programas de Nutrición por Cultivo — Biotiza',
    description:
      'Protocolos etapa por etapa con productos Biotiza para tomate, fresa, arándano, frambuesa, zarzamora, aguacate, chile y cítricos.',
    url: 'https://biotiza.mx/cultivos',
  },
}

// ─── Componente ───────────────────────────────────────────────────────────

export default function CultivosPage() {
  return (
    <main className="min-h-screen">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-verde-900 to-verde-700 py-16 lg:py-20">
        <Container>
          <SectionHeading
            tag="Programas de nutrición"
            title="Cultivos"
            subtitle="Protocolos de nutrición diseñados por agrónomos para los cultivos de exportación más importantes de México."
            accentColor="verde"
            level="h1"
            className="[&_h1]:text-white [&_p]:text-white/80 [&_span]:text-verde-200 [&_span]:bg-verde-800/60"
          />
        </Container>
      </section>

      {/* ── Grid de cultivos ──────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {CROP_PROTOCOLS.map((crop) => (
              <CropCard key={crop.id} crop={crop} />
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gris-50 border-t border-gris-100">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl text-gris-900 mb-4">
              ¿No encuentras tu cultivo?
            </h2>
            <p className="text-gris-600 mb-8">
              Contáctanos y nuestro equipo de agrónomos diseñará un programa
              personalizado para tus condiciones específicas.
            </p>
            <a
              href="https://wa.me/523316022708?text=Hola%2C%20necesito%20un%20programa%20de%20nutrici%C3%B3n%20personalizado"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-verde-600 px-6 py-3 text-white font-semibold hover:bg-verde-700 transition-colors"
            >
              Hablar con un agrónomo
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Container>
      </section>
    </main>
  )
}

// ─── CropCard ─────────────────────────────────────────────────────────────

interface CropCardProps {
  crop: {
    slug: string
    name: string
    scientific_name?: string
    emoji: string
    gradient: string
    stages: { id: string }[]
  }
}

function CropCard({ crop }: CropCardProps) {
  const stageCount = crop.stages.length

  return (
    <Link
      href={`/cultivos/${crop.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      {/* Fondo degradado */}
      <div
        className={`bg-gradient-to-br ${crop.gradient} p-6 sm:p-8 flex flex-col items-center text-center gap-3 flex-1`}
      >
        {/* Emoji del cultivo */}
        <span
          className="text-6xl sm:text-7xl select-none transition-transform duration-300 group-hover:scale-110"
          role="img"
          aria-label={crop.name}
        >
          {crop.emoji}
        </span>

        {/* Nombre */}
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-white leading-tight">
            {crop.name}
          </h2>
          {crop.scientific_name && (
            <p className="text-white/70 text-xs italic mt-0.5">
              {crop.scientific_name}
            </p>
          )}
        </div>

        {/* Badge de etapas */}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-white/80" aria-hidden="true" />
          {stageCount} etapas
        </span>
      </div>

      {/* Footer */}
      <div
        className={`bg-gradient-to-br ${crop.gradient} border-t border-white/10 px-5 py-3 flex items-center justify-between`}
      >
        <span className="text-xs font-semibold text-white/80 uppercase tracking-wide">
          Ver programa
        </span>
        <ArrowRight
          className="h-4 w-4 text-white/80 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </div>
    </Link>
  )
}
