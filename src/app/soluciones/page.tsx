/**
 * soluciones/page.tsx — Catálogo editorial · Sub-fase 3.5a
 * Reemplaza biotiza-web/src/app/soluciones/page.tsx
 *
 * Mantiene búsqueda + filtros pero con tratamiento editorial.
 */

'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, X, Filter } from 'lucide-react'
import { PRODUCTS, getProductsByLine } from '@/data/products'
import { PRODUCT_LINES } from '@/data/constants'
import { getProductImage } from '@/data/product-images'
import { cn } from '@/lib/utils'
import Container from '@/components/ui/Container'
import type { ProductLine } from '@/types'

const LINE_TABS: { id: ProductLine | 'all'; label: string; count: number }[] = [
  { id: 'all', label: 'Todos', count: PRODUCTS.length },
  ...PRODUCT_LINES.map(l => ({ id: l.id, label: l.name, count: getProductsByLine(l.id).length })),
]

function CatalogCard({ product, idx }: { product: typeof PRODUCTS[0]; idx: number }) {
  const lineConfig = PRODUCT_LINES.find(l => l.id === product.line)!
  const photo = getProductImage(product.slug)
  return (
    <Link
      href={`/soluciones/${product.line}/${product.slug}`}
      className="group flex flex-col bg-paper hover:bg-paper-2 transition-colors min-h-[380px]"
    >
      <div className="relative h-[220px] bg-paper-2 border-b border-rule flex items-center justify-center p-5 overflow-hidden">
        <span className="absolute top-3.5 left-3.5 font-mono text-[10px] font-semibold tracking-[0.16em] uppercase text-ink-3">
          N° {String(idx + 1).padStart(2, '0')}{product.featured ? ' · top' : ''}
        </span>
        {photo ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            width={200}
            height={200}
            className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-[1.06]"
            style={{ filter: 'drop-shadow(0 10px 22px rgba(0,0,0,0.15))' }}
          />
        ) : (
          <span className="font-serif text-[clamp(36px,5vw,56px)] tracking-[-0.04em] opacity-50" style={{ color: lineConfig.color }}>
            {product.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
          </span>
        )}
        <span
          className="absolute bottom-3.5 left-3.5 font-mono text-[10px] font-semibold tracking-[0.16em] uppercase"
          style={{ color: lineConfig.color }}
        >
          {lineConfig.name}
        </span>
      </div>
      <div className="flex flex-col flex-1 p-5 gap-2">
        <h4 className="font-serif text-[26px] leading-[1.05] tracking-[-0.025em] text-ink">{product.name}</h4>
        <p className="text-sm text-ink-3 leading-relaxed flex-1">{product.description}</p>
        <div className="pt-3.5 border-t border-rule flex justify-between items-baseline font-mono text-[10px] tracking-[0.14em] uppercase font-semibold text-ink-4">
          <span>{product.certifications.slice(0, 2).join(' · ')}</span>
          <span className="text-ink font-serif text-xl group-hover:translate-x-1 group-hover:text-naranja-500 transition-all duration-300">›</span>
        </div>
      </div>
    </Link>
  )
}

export default function SolucionesPage() {
  const [query, setQuery] = useState('')
  const [activeLine, setActiveLine] = useState<ProductLine | 'all'>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [activeCert, setActiveCert] = useState('all')

  const filtered = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchLine = activeLine === 'all' || p.line === activeLine
      const matchCert = activeCert === 'all' || p.certifications.includes(activeCert)
      const matchQuery = !query || (
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.solves_problems.some(s => s.toLowerCase().includes(query.toLowerCase()))
      )
      return matchLine && matchCert && matchQuery
    })
  }, [query, activeLine, activeCert])

  return (
    <div className="bg-white">
      {/* Hero editorial */}
      <section className="bg-paper py-32 lg:py-40 border-b border-rule">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-10 lg:gap-20 items-end">
            <div>
              <p className="eyebrow-edit eyebrow-muted mb-6">
                Catálogo · {PRODUCTS.length} productos · 5 líneas
              </p>
              <h1 className="title-display mb-7">
                Todas nuestras<br /><em>biosoluciones</em>.
              </h1>
              <p className="dek-edit text-ink-2 max-w-[46ch]">
                Orgánicos, especialidades, bioestimulantes, nutrición líquida y
                bioprotección. Cada producto con ficha técnica y certificado de
                análisis por lote.
              </p>
            </div>
            <div className="self-end">
              <div className="font-serif text-[clamp(72px,10vw,144px)] leading-[0.85] tracking-[-0.04em] text-ink">
                {filtered.length}
              </div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-3 mt-3">
                producto{filtered.length !== 1 ? 's' : ''}{' '}
                {activeLine === 'all' ? 'mostrados' : `en línea ${activeLine}`}
              </p>
            </div>
          </div>

          {/* Búsqueda + filtros */}
          <div className="mt-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-4" />
              <input
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Buscar producto, problema o ingrediente..."
                className="w-full bg-white border border-ink py-3 pl-9 pr-9 text-sm text-ink placeholder:text-ink-4 focus:outline-none focus:ring-2 focus:ring-verde-500/30 font-mono"
              />
              {query && (
                <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-4 hover:text-ink">
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(v => !v)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 border font-mono text-[11px] font-semibold uppercase tracking-[0.14em] transition-all',
                showFilters ? 'bg-ink text-white border-ink' : 'border-ink text-ink hover:bg-ink hover:text-white'
              )}
            >
              <Filter size={14} />
              Filtros
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 p-5 border border-rule bg-paper-2">
              <p className="eyebrow-edit eyebrow-muted mb-3">Certificación</p>
              <div className="flex flex-wrap gap-2">
                {['all', 'COFEPRIS', 'OMRI', 'Hecho en México'].map(c => (
                  <button
                    key={c}
                    onClick={() => setActiveCert(c)}
                    className={cn(
                      'px-3 py-1.5 font-mono text-[11px] font-semibold tracking-[0.12em] uppercase border transition-all',
                      activeCert === c ? 'bg-verde-700 text-white border-verde-700' : 'bg-white border-rule text-ink hover:border-ink'
                    )}
                  >
                    {c === 'all' ? 'Todas' : c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tabs de línea */}
          <div className="mt-8 flex gap-3 overflow-x-auto pb-3">
            {LINE_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveLine(tab.id)}
                className={cn(
                  'flex shrink-0 items-center gap-2 px-4 py-2.5 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase transition-all',
                  activeLine === tab.id ? 'bg-ink text-white' : 'bg-transparent text-ink-3 hover:text-ink border border-rule hover:border-ink'
                )}
              >
                {tab.label}
                <span className="opacity-60">· {tab.count}</span>
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Grid editorial · sin gap, separadores hairline */}
      <section>
        {filtered.length === 0 ? (
          <Container className="py-20 text-center">
            <p className="text-ink-3">No encontramos productos con esos filtros.</p>
          </Container>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-rule">
            {filtered.map((p, i) => <CatalogCard key={p.id} product={p} idx={i} />)}
          </div>
        )}
      </section>

      {/* CTA tail */}
      <section className="bg-paper py-24 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <h3 className="font-serif text-[clamp(36px,5vw,64px)] leading-[0.98] tracking-[-0.035em] max-w-[14ch]">
              ¿No sabes por dónde<br />
              <span className="font-serif italic text-verde-700" style={{ fontFamily: 'var(--serif-it)' }}>empezar</span>?
            </h3>
            <div>
              <p className="text-lg leading-relaxed text-ink-2 max-w-[46ch] mb-7">
                Cuéntanos tu cultivo, tu zona y tu objetivo. Un agrónomo te propone
                un programa con productos, dosis y calendario sin compromiso.
              </p>
              <div className="flex gap-4 flex-wrap">
                <a
                  href="https://wa.me/523316022708"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-naranja-500 text-white font-mono text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-naranja-600 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Hablar con un asesor →
                </a>
                <Link href="/herramientas" className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink border-b border-current pb-0.5">
                  o usar nuestras herramientas
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
