'use client'

/**
 * /soluciones — Catálogo completo con búsqueda y filtros
 *
 * Diseño "a granel": todos los productos juntos, agrupados por línea
 * de producto (Orgánicos, Especialidades, Bioestimulantes, Nutrición,
 * Zentia). NO se separa ni menciona por marca/proveedor.
 */

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, X, Filter } from 'lucide-react'
import { PRODUCTS, getProductsByLine } from '@/data/products'
import { PRODUCT_LINES } from '@/data/constants'
import { getProductImage } from '@/data/product-images'
import { ProductPhotoFallback } from '@/components/products/ProductPhoto'
import { cn } from '@/lib/utils'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import Badge from '@/components/ui/Badge'
import SectionHeading from '@/components/ui/SectionHeading'
import Container from '@/components/ui/Container'
import type { ProductLine } from '@/types'

// ─── ProductCard minimalista para el grid ─────────────────────────────────
function CatalogCard({ product }: { product: typeof PRODUCTS[0] }) {
  const lineConfig = PRODUCT_LINES.find(l => l.id === product.line)!
  const photo = getProductImage(product.slug)

  return (
    <Link
      href={`/soluciones/${product.line}/${product.slug}`}
      aria-label={`Ver ficha de ${product.name}`}
      className={cn(
        'group flex flex-col rounded-xl bg-white border border-gris-100',
        'shadow-card hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(34,181,115,0.13)]',
        'transition-all duration-300 overflow-hidden',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-verde-500 focus-visible:ring-offset-2',
      )}
    >
      {/* Cabecera: foto HD del envase si existe, fallback al icono */}
      <div
        className="relative flex h-36 sm:h-40 items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${lineConfig.color}18, ${lineConfig.color}34)` }}
      >
        {/* Glow sutil */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[140%] w-[140%] rounded-full blur-2xl opacity-60"
          style={{ background: `radial-gradient(circle, ${lineConfig.color}33 0%, transparent 60%)` }}
          aria-hidden="true"
        />

        {photo ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            width={300}
            height={420}
            sizes="(min-width: 1280px) 18vw, (min-width: 1024px) 22vw, (min-width: 640px) 32vw, 48vw"
            className="relative z-10 h-[88%] w-auto object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.22)] transition-transform duration-500 group-hover:scale-[1.08]"
          />
        ) : (
          <ProductPhotoFallback
            name={product.name}
            line={product.line}
            variant="thumb"
            className="absolute inset-0"
          />
        )}

        {/* Top badge "Top" si es featured */}
        {product.featured && (
          <span className="absolute top-2.5 right-2.5 z-20 rounded-full bg-naranja-500 px-2 py-0.5 text-[10px] font-bold text-white uppercase shadow-md">
            ⭐ Top
          </span>
        )}
        {/* Badge de línea bottom-left para identificar tipo */}
        <div className="absolute bottom-2.5 left-2.5 z-20">
          <Badge line={product.line} size="sm" />
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4 gap-2">
        <h3 className="text-sm font-semibold text-gris-900 leading-tight group-hover:text-verde-700 transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-gris-500 line-clamp-2 flex-1 leading-relaxed">
          {product.description}
        </p>
        <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-verde-600 group-hover:gap-1.5 transition-all">
          Ver ficha →
        </span>
      </div>
    </Link>
  )
}

// ─── Tabs de líneas ──────────────────────────────────────────────────────
const LINE_TABS: { id: ProductLine | 'all'; label: string; count: number }[] = [
  { id: 'all', label: 'Todos', count: PRODUCTS.length },
  ...PRODUCT_LINES.map(l => ({ id: l.id, label: l.name, count: getProductsByLine(l.id).length })),
]

// ─── Componente ───────────────────────────────────────────────────────────

export default function SolucionesPage() {
  const [query,      setQuery]      = useState('')
  const [activeLine, setActiveLine] = useState<ProductLine | 'all'>('all')
  const [activeCert, setActiveCert] = useState<string>('all')
  const [activeMethod, setActiveMethod] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchLine   = activeLine === 'all' || p.line === activeLine
      const matchCert   = activeCert === 'all' || p.certifications.includes(activeCert)
      const matchMethod = activeMethod === 'all' || p.application_methods.includes(activeMethod)
      const matchQuery  = !query || (
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.solves_problems.some(s => s.toLowerCase().includes(query.toLowerCase()))
      )
      return matchLine && matchCert && matchMethod && matchQuery
    })
  }, [query, activeLine, activeCert, activeMethod])

  const hasFilters = activeLine !== 'all' || activeCert !== 'all' || activeMethod !== 'all' || query

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-verde-900 to-verde-700 py-16 lg:py-20">
        <Container>
          <SectionHeading
            tag="Portafolio completo"
            title="Nuestras Soluciones"
            subtitle={`${PRODUCTS.length} productos en 5 líneas especializadas: Orgánicos, Especialidades, Bioestimulantes, Nutrición Líquida y Bioprotección. Para cada etapa de tu cultivo.`}
            theme="dark"
            animate={false}
          />
        </Container>
      </div>

      <Container className="py-10 lg:py-14">
        {/* Buscador */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gris-400" />
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscar producto, problema o ingrediente..."
              className="w-full rounded-lg border border-gris-200 bg-white py-2.5 pl-9 pr-9 text-sm text-gris-900 placeholder:text-gris-400 focus:border-verde-400 focus:outline-none focus:ring-2 focus:ring-verde-500/20"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gris-400 hover:text-gris-600">
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gris-500">{filtered.length} producto{filtered.length !== 1 ? 's' : ''}</span>
            <button
              onClick={() => setShowFilters(v => !v)}
              className={cn(
                'flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
                showFilters ? 'border-verde-400 bg-verde-50 text-verde-700' : 'border-gris-200 text-gris-600 hover:border-gris-300',
              )}
            >
              <Filter size={14} />
              Filtros
              {(activeCert !== 'all' || activeMethod !== 'all') && (
                <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-verde-500 text-[10px] font-bold text-white">!</span>
              )}
            </button>
            {hasFilters && (
              <button
                onClick={() => { setQuery(''); setActiveLine('all'); setActiveCert('all'); setActiveMethod('all') }}
                className="text-xs text-gris-500 hover:text-red-500 transition-colors"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Panel de filtros */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 rounded-xl border border-gris-100 bg-gris-50 p-4 grid gap-4 sm:grid-cols-2"
          >
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gris-500">Certificación</label>
              <div className="flex flex-wrap gap-2">
                {['all', 'COFEPRIS', 'OMRI', 'Hecho en México'].map(cert => (
                  <button
                    key={cert}
                    onClick={() => setActiveCert(cert)}
                    className={cn(
                      'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                      activeCert === cert ? 'bg-verde-500 text-white' : 'bg-white border border-gris-200 text-gris-600 hover:border-verde-300',
                    )}
                  >
                    {cert === 'all' ? 'Todas' : cert}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gris-500">Método de aplicación</label>
              <div className="flex flex-wrap gap-2">
                {['all', 'foliar', 'fertirrigación', 'drench', 'aspersión'].map(method => (
                  <button
                    key={method}
                    onClick={() => setActiveMethod(method)}
                    className={cn(
                      'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                      activeMethod === method ? 'bg-verde-500 text-white' : 'bg-white border border-gris-200 text-gris-600 hover:border-verde-300',
                    )}
                  >
                    {method === 'all' ? 'Todos' : method.charAt(0).toUpperCase() + method.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Tabs de línea de producto */}
        <div className="mb-8 flex items-center gap-3">
          <span className="hidden text-xs font-semibold uppercase tracking-wider text-gris-500 sm:inline">Línea</span>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {LINE_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveLine(tab.id)}
                className={cn(
                  'flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  activeLine === tab.id
                    ? 'bg-verde-500 text-white shadow-brand'
                    : 'bg-gris-100 text-gris-600 hover:bg-gris-200',
                )}
              >
                {tab.label}
                <span className={cn('rounded-full px-1.5 py-0.5 text-[10px] font-bold',
                  activeLine === tab.id ? 'bg-white/20 text-white' : 'bg-white text-gris-600'
                )}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid de productos */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-gris-500">No encontramos productos con esos filtros.</p>
            <button onClick={() => { setQuery(''); setActiveLine('all'); setActiveCert('all'); setActiveMethod('all') }} className="mt-3 text-sm text-verde-600 hover:underline">
              Limpiar filtros →
            </button>
          </div>
        ) : (
          <motion.div
            key={`${activeLine}-${query}-${activeCert}-${activeMethod}`}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          >
            {filtered.map(product => (
              <motion.div key={product.id} variants={fadeInUp}>
                <CatalogCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </Container>
    </div>
  )
}
