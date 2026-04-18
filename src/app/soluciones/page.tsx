'use client'

/**
 * /soluciones — Catálogo completo con búsqueda y filtros
 */

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, X, Filter, Leaf, FlaskConical, Sparkles, Droplets, Shield } from 'lucide-react'
import { PRODUCTS, getProductsByLine, getProductsByBrand } from '@/data/products'
import { PRODUCT_LINES, BRANDS } from '@/data/constants'
import { cn } from '@/lib/utils'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import Badge from '@/components/ui/Badge'
import SectionHeading from '@/components/ui/SectionHeading'
import Container from '@/components/ui/Container'
import type { ProductLine, ProductBrand } from '@/types'

// ─── Icono por línea ──────────────────────────────────────────────────────
const LINE_ICONS: Record<ProductLine, React.ElementType> = {
  organicos: Leaf, especialidades: FlaskConical,
  bioestimulantes: Sparkles, nutricion: Droplets, zentia: Shield,
}

// ─── ProductCard minimalista para el grid ─────────────────────────────────
function CatalogCard({ product }: { product: typeof PRODUCTS[0] }) {
  const Icon = LINE_ICONS[product.line]
  const lineConfig = PRODUCT_LINES.find(l => l.id === product.line)!

  return (
    <Link
      href={`/soluciones/${product.line}/${product.slug}`}
      className={cn(
        'group flex flex-col rounded-xl bg-white border border-gris-100',
        'shadow-card hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(34,181,115,0.13)]',
        'transition-all duration-300 overflow-hidden',
      )}
    >
      {/* Header colorido */}
      <div
        className="flex h-28 items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${lineConfig.color}22, ${lineConfig.color}44)` }}
      >
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${lineConfig.color}30` }}
        >
          <Icon size={26} style={{ color: lineConfig.color }} />
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="flex items-start justify-between gap-2">
          <Badge line={product.line} size="sm" />
          {product.featured && (
            <span className="rounded-full bg-naranja-100 px-2 py-0.5 text-[10px] font-bold text-naranja-600 uppercase">⭐ Top</span>
          )}
        </div>
        <Badge brand={product.brand} size="sm" showDot={false} className="self-start" />
        <h3 className="text-sm font-semibold text-gris-900 leading-tight group-hover:text-verde-700 transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-gris-500 line-clamp-2 flex-1 leading-relaxed">
          {product.description}
        </p>
        <span className="mt-1 text-xs font-semibold text-verde-600 group-hover:underline">
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

// ─── Tabs de marcas ───────────────────────────────────────────────────────
const BRAND_TABS: { id: ProductBrand | 'all'; label: string; count: number }[] = [
  { id: 'all', label: 'Todas las marcas', count: PRODUCTS.length },
  ...BRANDS.map(b => ({ id: b.id, label: b.name, count: getProductsByBrand(b.id).length })),
]

// ─── Componente ───────────────────────────────────────────────────────────

export default function SolucionesPage() {
  const [query,      setQuery]      = useState('')
  const [activeLine, setActiveLine] = useState<ProductLine | 'all'>('all')
  const [activeBrand, setActiveBrand] = useState<ProductBrand | 'all'>('all')
  const [activeCert, setActiveCert] = useState<string>('all')
  const [activeMethod, setActiveMethod] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchLine   = activeLine === 'all' || p.line === activeLine
      const matchBrand  = activeBrand === 'all' || p.brand === activeBrand
      const matchCert   = activeCert === 'all' || p.certifications.includes(activeCert)
      const matchMethod = activeMethod === 'all' || p.application_methods.includes(activeMethod)
      const matchQuery  = !query || (
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.solves_problems.some(s => s.toLowerCase().includes(query.toLowerCase()))
      )
      return matchLine && matchBrand && matchCert && matchMethod && matchQuery
    })
  }, [query, activeLine, activeBrand, activeCert, activeMethod])

  const hasFilters = activeLine !== 'all' || activeBrand !== 'all' || activeCert !== 'all' || activeMethod !== 'all' || query

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-verde-900 to-verde-700 py-16 lg:py-20">
        <Container>
          <SectionHeading
            tag="Portafolio completo"
            title="Nuestras Soluciones"
            subtitle={`${PRODUCTS.length} productos · 3 marcas (Bioproductos, Agrobionsa, Veganic) · 5 líneas especializadas. Nutrición, estimulación y bioprotección para cada etapa de tu cultivo.`}
            titleClassName="text-white"
            className="[&_p]:text-verde-200 [&_span]:text-verde-300 [&_span]:bg-verde-800/50"
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
                onClick={() => { setQuery(''); setActiveLine('all'); setActiveBrand('all'); setActiveCert('all'); setActiveMethod('all') }}
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

        {/* Tabs de marca (proveedor) */}
        <div className="mb-3 flex items-center gap-3">
          <span className="hidden text-xs font-semibold uppercase tracking-wider text-gris-500 sm:inline">Marca</span>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {BRAND_TABS.map(tab => {
              const brandColor = tab.id !== 'all' ? BRANDS.find(b => b.id === tab.id)?.color : undefined
              const isActive = activeBrand === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveBrand(tab.id)}
                  className={cn(
                    'flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors border',
                    isActive
                      ? 'text-white border-transparent'
                      : 'bg-white text-gris-600 border-gris-200 hover:border-gris-300',
                  )}
                  style={isActive && brandColor ? { backgroundColor: brandColor } : undefined}
                >
                  {tab.label}
                  <span className={cn('rounded-full px-1.5 py-0.5 text-[10px] font-bold',
                    isActive ? 'bg-white/25 text-white' : 'bg-gris-100 text-gris-600'
                  )}>
                    {tab.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Tabs de línea */}
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
            <button onClick={() => { setQuery(''); setActiveLine('all'); setActiveBrand('all'); setActiveCert('all'); setActiveMethod('all') }} className="mt-3 text-sm text-verde-600 hover:underline">
              Limpiar filtros →
            </button>
          </div>
        ) : (
          <motion.div
            key={`${activeLine}-${activeBrand}-${query}-${activeCert}-${activeMethod}`}
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
