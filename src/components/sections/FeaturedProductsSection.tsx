/**
 * FeaturedProductsSection.tsx — Producto signature · Sub-fase 3.3b
 * Reemplaza biotiza-web/src/components/sections/FeaturedProductsSection.tsx
 *
 * Antes: carrusel horizontal de 10 cards uniformes
 * Después: producto signature BP Koren con composición visible
 */

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Container from '@/components/ui/Container'
import { getProductImage } from '@/data/product-images'

const PRODUCT = {
  slug: 'bp-koren',
  line: 'organicos',
  name: 'BP Koren',
  tagline: 'Auxinas, citoquininas y aminoácidos libres en una sola formulación orgánica certificada OMRI. Compatible con drench y fertirrigación.',
  stat: { value: '17', unit: 'aa libres', label: 'Aminoácidos libres en la formulación · 22% del producto' },
  composition: [
    { k: 'Aux + Cit',    v: '<1%',   d: 'auxinas + citoq.' },
    { k: 'N total',      v: '4.0%',  d: 'orgánico'          },
    { k: 'K₂O',          v: '6.0%',  d: 'quelatado'         },
    { k: 'Aminoácidos',  v: '22%',   d: '17 aa libres'      },
  ],
  certs: ['OMRI', 'COFEPRIS', 'Hecho en MX'],
}

export default function FeaturedProductsSection() {
  const photo = getProductImage(PRODUCT.slug)

  return (
    <section className="bg-white py-24 lg:py-32 border-b border-rule">
      <Container>
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <p className="eyebrow-edit mb-6">— 04 · Producto del mes</p>
          <h2 className="title-display max-w-[16ch]">
            Enraizador <em>BP Koren</em>.
          </h2>
          <p className="dek-edit text-ink-2 max-w-[60ch] mt-5">
            La base de los protocolos post-trasplante diseñados por nuestros agrónomos.
            Sin hormonas sintéticas, con certificación OMRI.
          </p>
        </div>

        {/* Card editorial */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] bg-paper border border-ink min-h-[540px]">
          {/* IZQ · Producto sobre paper-2 */}
          <div className="relative flex items-center justify-center p-8 lg:p-14 bg-paper-2 border-r-0 lg:border-r border-b lg:border-b-0 border-ink min-h-[420px]">
            <span className="absolute top-6 left-6 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-3">
              N° 01 · Catálogo
            </span>
            {photo ? (
              <Image
                src={photo.src}
                alt={photo.alt}
                width={400}
                height={600}
                sizes="(min-width: 1024px) 380px, 70vw"
                className="max-h-[460px] w-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
              />
            ) : (
              <div className="font-serif text-9xl text-verde-700/40">BK</div>
            )}
            <span className="absolute bottom-6 right-6 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-verde-700">
              Orgánicos · OMRI
            </span>
          </div>

          {/* DER · Info editorial */}
          <div className="p-8 lg:p-14 flex flex-col gap-6">
            <p className="eyebrow-edit eyebrow-green">Enraizador orgánico · cert. OMRI</p>
            <h3 className="font-serif text-[clamp(36px,5vw,64px)] leading-[0.95] tracking-[-0.035em] max-w-[16ch]">
              BP Koren · aminoácidos{' '}
              <em className="font-serif italic text-verde-700" style={{ fontFamily: 'var(--serif-it)' }}>
                libres
              </em>{' '}
              + raíz nueva.
            </h3>
            <p className="dek-edit text-ink-2 max-w-[36ch]">
              {PRODUCT.tagline}
            </p>

            {/* Stat signature */}
            <div className="pt-5 border-t border-rule">
              <div className="font-serif text-[clamp(60px,8vw,96px)] leading-[0.85] tracking-[-0.04em] text-ink">
                {PRODUCT.stat.value}
                <em
                  className="font-serif italic text-verde-700 text-[0.4em] align-[14%] ml-1.5"
                  style={{ fontFamily: 'var(--serif-it)' }}
                >
                  {' '}{PRODUCT.stat.unit}
                </em>
              </div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-3 mt-2">
                {PRODUCT.stat.label}
              </p>
            </div>

            {/* Composición mono dark */}
            <div className="composition-edit">
              <div className="text-white/40 text-[10px] font-semibold uppercase tracking-[0.2em] mb-3 flex items-center gap-2.5 before:content-[''] before:w-4 before:h-px before:bg-white/30">
                // {PRODUCT.name} · composición
              </div>
              {PRODUCT.composition.map((row, i) => (
                <div key={i} className="row">
                  <div className="text-white/85">{row.k}</div>
                  <div className="v">{row.v}</div>
                  <div className="text-white/50 text-[11px]">{row.d}</div>
                </div>
              ))}
              <div className="mt-4 pt-3.5 border-t border-white/15 flex flex-wrap gap-3.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-verde-300">
                {PRODUCT.certs.map(c => <span key={c}>● {c}</span>)}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto flex items-center gap-5 flex-wrap pt-2">
              <Link
                href={`/soluciones/${PRODUCT.line}/${PRODUCT.slug}`}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-naranja-500 text-white font-mono text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-naranja-600 hover:-translate-y-0.5 transition-all duration-300"
              >
                Ver ficha completa
                <ArrowRight size={14} />
              </Link>
              <a
                href={`https://wa.me/523316022708?text=Hola%2C%20quiero%20cotizar%20${PRODUCT.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink border-b border-ink pb-0.5 hover:text-verde-700 hover:border-verde-700 transition-colors"
              >
                Cotizar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
