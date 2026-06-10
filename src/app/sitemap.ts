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
  // NOTA SEO: NO se fija `lastModified` con la fecha de build (`new Date()`).
  // Una fecha que cambia en cada build es una señal falsa de "contenido
  // actualizado" y Google la interpreta como baja calidad. Para contenido
  // estático cuya fecha real desconocemos, es preferible OMITIR `lastModified`.
  // Solo los artículos del blog, que SÍ tienen fecha real de publicación/
  // actualización en los datos, llevan `lastModified`.

  // ─── Estáticas de alta prioridad ──────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`,                        changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE}/soluciones`,              changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE}/cultivos`,                changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE}/casa-jardin`,             changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${SITE}/nosotros`,                changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/contacto`,                changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/cotizacion`,              changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/herramientas`,            changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/herramientas/calculadora-dosis`,   changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/herramientas/diagnostico`,         changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/herramientas/compatibilidad`,      changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/herramientas/calculadora-roi`,     changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/academia`,                changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${SITE}/academia/blog`,           changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${SITE}/academia/guias`,          changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/huella-de-carbono`,       changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${SITE}/politica-privacidad`,     changeFrequency: 'yearly',  priority: 0.3 },
  ]

  // ─── Líneas de producto ──────────────────────────────────────────────────
  const lineRoutes: MetadataRoute.Sitemap = PRODUCT_LINES.map((line) => ({
    url: `${SITE}/soluciones/${line.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // ─── Fichas de producto (47) ──────────────────────────────────────────────
  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${SITE}/soluciones/${p.line}/${p.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // ─── Fichas de cultivo (35) ───────────────────────────────────────────────
  const cropRoutes: MetadataRoute.Sitemap = CROPS_DATA.flatMap((c) => [
    {
      url: `${SITE}/cultivos/${c.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${SITE}/cultivos/${c.slug}/ficha`,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ])

  // ─── Casa y Jardín — categorías (incluye "todos") y paquetes ──────────────
  const gardenCategoryRoutes: MetadataRoute.Sitemap = [
    ...GARDEN_CATEGORIES.map((c) => c.slug),
    'todos', // ruta agregada generada estáticamente en [categoria]/page.tsx
  ].map((slug) => ({
    url: `${SITE}/casa-jardin/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  const gardenPackageRoutes: MetadataRoute.Sitemap = GARDEN_PACKAGES.map((p) => ({
    url: `${SITE}/casa-jardin/paquete/${p.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }))

  // ─── Blog (con fecha real de publicación/actualización) ───────────────────
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
