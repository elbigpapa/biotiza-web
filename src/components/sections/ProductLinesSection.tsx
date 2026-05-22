/**
 * ProductLinesSection.tsx — Escena 4: Soluciones
 * Cinco familias de producto presentadas como cards en grid responsivo.
 * Server Component. Datos reales desde PRODUCT_LINES en @/data/constants.
 */

import Link from 'next/link'
import Scene from '@/components/redesign/Scene'
import { Reveal, RevealItem } from '@/components/redesign/ScrollReveal'
import { PRODUCT_LINES } from '@/data/constants'

export default function ProductLinesSection() {
  return (
    <Scene tone="light" id="soluciones">
      <Reveal>
        {/* Encabezado editorial */}
        <RevealItem>
          <p className="eyebrow-edit mb-6">— 04 · Soluciones</p>
        </RevealItem>

        <RevealItem>
          <h2 className="title-display max-w-[22ch] mb-5">
            Cinco familias,{' '}
            <em style={{ fontFamily: 'var(--serif-it)' }}>
              un mismo criterio
            </em>
            .
          </h2>
        </RevealItem>

        <RevealItem>
          <p className="dek-edit text-ink-2 max-w-[52ch] mb-14">
            Un portafolio completo que acompaña tu cultivo en cada etapa —
            de la raíz a la cosecha — con respaldo agronómico real y un
            asesor técnico a tu lado.
          </p>
        </RevealItem>

        {/* Grid de cards — 1 col mobile, 2 en sm, 3 en md, 5 en xl */}
        <RevealItem>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-12">
            {PRODUCT_LINES.map((line) => (
              <Link
                key={line.id}
                href={`/soluciones/${line.slug}`}
                className="group flex flex-col rounded-2xl border border-rule bg-white hover:shadow-md transition-shadow duration-300 overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2"
                style={
                  {
                    '--line-color': line.color,
                    focusVisibleOutlineColor: line.color,
                  } as React.CSSProperties
                }
              >
                {/* Barra de color superior */}
                <span
                  className="block h-1 w-full shrink-0"
                  style={{ backgroundColor: line.color }}
                  aria-hidden="true"
                />

                <div className="flex flex-col gap-3 p-5 flex-1">
                  {/* Dot + nombre */}
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: line.color }}
                      aria-hidden="true"
                    />
                    <span className="font-serif text-[clamp(18px,2vw,22px)] leading-tight tracking-[-0.02em] text-ink">
                      {line.name}
                    </span>
                  </div>

                  {/* Conteo de productos */}
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-3">
                    {line.productCount} productos
                  </p>

                  {/* Tagline */}
                  <p className="text-[13px] leading-snug text-ink-2 flex-1">
                    {line.tagline}
                  </p>

                  {/* Flecha hover */}
                  <span
                    className="font-serif text-[20px] text-ink-3 self-end transition-transform duration-300 group-hover:translate-x-1"
                    style={{ color: line.color }}
                    aria-hidden="true"
                  >
                    ›
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </RevealItem>

        {/* CTA global */}
        <RevealItem>
          <Link
            href="/soluciones"
            className="inline-flex items-center gap-2 font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-ink hover:text-verde-700 transition-colors duration-200"
          >
            Ver catálogo completo
            <span aria-hidden="true" className="text-[16px]">→</span>
          </Link>
        </RevealItem>
      </Reveal>
    </Scene>
  )
}
