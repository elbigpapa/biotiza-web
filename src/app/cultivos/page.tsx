/**
 * /cultivos — Landing page del catálogo de protocolos de cultivo
 *
 * Server Component · Sin 'use client'
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Layers } from 'lucide-react'
import { CROP_PROTOCOLS } from '@/data/crops'
import { getCropImage } from '@/data/crop-images'
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
            theme="dark"
          />
        </Container>
      </section>

      {/* ── Grid de cultivos ──────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <div className="mb-10 flex items-center justify-between flex-wrap gap-4">
            <p className="text-sm text-gris-500">
              <span className="font-semibold text-gris-800">{CROP_PROTOCOLS.length} cultivos</span> con protocolo Biotiza
            </p>
            <p className="text-xs text-gris-400 uppercase tracking-wider">
              Da clic en cualquier cultivo para ver su programa
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
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

// ─── CropCard — HD photo card profesional ────────────────────────────────

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
  const photo = getCropImage(crop.slug)

  return (
    <Link
      href={`/cultivos/${crop.slug}`}
      aria-label={`Ver programa de nutrición para ${crop.name}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl aspect-[4/5] shadow-[0_4px_24px_rgba(15,23,42,0.10)] hover:shadow-[0_20px_50px_rgba(15,23,42,0.20)] transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-verde-500 focus-visible:ring-offset-2"
    >
      {/* Foto HD del cultivo (fondo) */}
      {photo ? (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover scale-105 transition-transform duration-[1.4s] ease-out group-hover:scale-115"
        />
      ) : (
        // Fallback al gradiente si por alguna razón no hay foto curada
        <div className={`absolute inset-0 bg-gradient-to-br ${crop.gradient}`} aria-hidden="true" />
      )}

      {/* Overlay con gradiente para legibilidad del texto */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.25) 45%, rgba(11, 60, 47, 0.92) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Badge de etapas (top-left) */}
      <div className="relative z-10 p-5 flex items-start justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md ring-1 ring-white/30 px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
          <Layers size={10} />
          {stageCount} etapas
        </span>
        {/* Emoji decorativo discreto */}
        <span
          className="text-lg opacity-80 drop-shadow-md transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        >
          {crop.emoji}
        </span>
      </div>

      {/* Contenido: nombre + CTA al fondo */}
      <div className="relative z-10 mt-auto p-5 sm:p-6 flex flex-col gap-3">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white leading-tight drop-shadow-[0_3px_10px_rgba(0,0,0,0.5)]">
            {crop.name}
          </h2>
          {crop.scientific_name && (
            <p className="text-white/80 text-xs italic mt-0.5 drop-shadow-md">
              {crop.scientific_name}
            </p>
          )}
        </div>

        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-verde-500/25 ring-1 ring-verde-300/40 backdrop-blur-sm px-3 py-1.5 text-[11px] font-bold text-verde-100 uppercase tracking-[0.12em] transition-all duration-300 group-hover:bg-verde-500/40 group-hover:gap-2.5">
          Ver programa
          <ArrowRight size={11} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}
