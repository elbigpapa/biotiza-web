/**
 * sitemap.ts — App Router dynamic sitemap.xml
 *
 * Cubre TODAS las rutas:
 *  · Estáticas: home, nosotros, soluciones, cultivos, herramientas, academia,
 *    casa-jardin, contacto, cotizacion, política, huella de carbono.
 *  · Dinámicas: 5 líneas, 47 productos, 35 cultivos, 9 paquetes Casa y Jardín,
 *    8 categorías de Casa y Jardín, artículos del blog.
 *
 * Reemplaza el postbuild de next-sitemap (que ya no es necesario).
 */

import type { MetadataRoute } from 'next'
import { PRODUCTS } from '@/data/products'
import { PRODUCT_LINES, CROPS_DATA } from '@/data/constants'
import { ARTICLES } from '@/data/articles'
import { GARDEN_CATEGORIES, GARDEN_PACKAGES } from '@/data/home-garden'

const SITE = 'https://biotiza.mx'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // ─── Estáticas de alta prioridad ──────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`,                        lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE}/soluciones`,              lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE}/cultivos`,                lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE}/casa-jardin`,             lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${SITE}/nosotros`,                lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/contacto`,                lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/cotizacion`,              lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/herramientas`,            lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/herramientas/calculadora-dosis`,   lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/herramientas/diagnostico`,         lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/herramientas/compatibilidad`,      lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/herramientas/calculadora-roi`,     lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/academia`,                lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${SITE}/academia/blog`,           lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${SITE}/academia/guias`,          lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/huella-de-carbono`,       lastModified: now, changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${SITE}/politica-privacidad`,     lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  // ─── Líneas de producto ──────────────────────────────────────────────────
  const lineRoutes: MetadataRoute.Sitemap = PRODUCT_LINES.map((line) => ({
    url: `${SITE}/soluciones/${line.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // ─── Fichas de producto (47) ──────────────────────────────────────────────
  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${SITE}/soluciones/${p.line}/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // ─── Fichas de cultivo (35) ───────────────────────────────────────────────
  const cropRoutes: MetadataRoute.Sitemap = CROPS_DATA.flatMap((c) => [
    {
      url: `${SITE}/cultivos/${c.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${SITE}/cultivos/${c.slug}/ficha`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ])

  // ─── Casa y Jardín — categorías y paquetes ────────────────────────────────
  const gardenCategoryRoutes: MetadataRoute.Sitemap = GARDEN_CATEGORIES.map((c) => ({
    url: `${SITE}/casa-jardin/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  const gardenPackageRoutes: MetadataRoute.Sitemap = GARDEN_PACKAGES.map((p) => ({
    url: `${SITE}/casa-jardin/paquete/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }))

  // ─── Blog ─────────────────────────────────────────────────────────────────
  const articleRoutes: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${SITE}/academia/blog/${a.slug}`,
    lastModified: new Date(a.updatedAt ?? a.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...staticRoutes,
    ...lineRoutes,
    ...productRoutes,
    ...cropRoutes,
    ...gardenCategoryRoutes,
    ...gardenPackageRoutes,
    ...articleRoutes,
  ]
}
