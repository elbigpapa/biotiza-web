/**
 * product-images.ts — Mapeo de slugs de producto a fotografías HD
 *
 * Cada entrada incluye:
 *  - src: ruta dentro de /public (transparente, PNG)
 *  - alt: texto descriptivo del envase para SEO + a11y
 *  - line: línea de producto para color del backdrop
 *
 * Las fotos provienen del shooting oficial de Bioproductos Agrícolas
 * (envases con fondo transparente, ideal para colocar sobre gradientes).
 */

import type { Product } from '@/types'

export interface ProductImage {
  src: string
  alt: string
}

/**
 * Mapeo slug → imagen HD. 35 productos con foto real.
 * Los slugs sin foto en el mapeo usan getProductImage() para devolver fallback.
 */
export const PRODUCT_IMAGES: Record<string, ProductImage> = {
  // NUTRICIÓN (26)
  'ae-calcium':   { src: '/images/products/ae-calcium.png',   alt: 'AE Calcium — Calcio de alta pureza Biotiza, envase 1 L' },
  'bp-acua':      { src: '/images/products/bp-acua.png',      alt: 'BP Acua — Penetrante y dispersante orgánico Biotiza, envase 1 L' },
  'bp-boro':      { src: '/images/products/bp-boro.png',      alt: 'BP Boro — Boro orgánico líquido Biotiza, envase 1 L' },
  'bp-calcio':    { src: '/images/products/bp-calcio.png',    alt: 'BP Calcio — Calcio orgánico quelatado Biotiza, envase 1 L' },
  'bp-cu-agro':   { src: '/images/products/bp-cu-agro.png',   alt: 'BP Cu Agro Organic — Cobre orgánico Biotiza, envase 1 L' },
  'bp-cuaje':     { src: '/images/products/bp-cuaje.png',     alt: 'BP Cuaje — Cuajador orgánico Biotiza, envase 1 L' },
  'bp-ferrum':    { src: '/images/products/bp-ferrum.png',    alt: 'BP Ferrum — Hierro quelatado Biotiza, envase 1 L' },
  'bp-fiore':     { src: '/images/products/bp-fiore.png',     alt: 'BP Fiore — Inductor floral Biotiza, envase 1 L' },
  'bp-fresh':     { src: '/images/products/bp-fresh.png',     alt: 'BP Fresh — Sanitizante orgánico Biotiza, envase 1 L' },
  'bp-gibb':      { src: '/images/products/bp-gibb.png',      alt: 'BP Gibb — Giberelinas orgánicas Biotiza, envase 1 L' },
  'bp-gross':     { src: '/images/products/bp-gross.png',     alt: 'BP Gross — Engrosador de fruto Biotiza, envase 1 L' },
  'bp-koren':     { src: '/images/products/bp-koren.png',     alt: 'BP Koren — Enraizador orgánico Biotiza, envase 1 L' },
  'bp-magnesio':  { src: '/images/products/bp-magnesio.png',  alt: 'BP Magnesio — Magnesio orgánico quelatado Biotiza, envase 1 L' },
  'bp-mix':       { src: '/images/products/bp-mix.png',       alt: 'BP Mix — Mezcla de micronutrientes Biotiza, envase 1 L' },
  'bp-mol':       { src: '/images/products/bp-mol.png',       alt: 'BP Mol — Molibdeno orgánico Biotiza, envase 1 L' },
  'bp-moots':     { src: '/images/products/bp-moots.png',     alt: 'BP Moots — Activador radicular Biotiza, envase 1 L' },
  'bp-nitro-fx':  { src: '/images/products/bp-nitro-fx.png',  alt: 'BP Nitro FX — Nitrógeno orgánico Biotiza, envase 1 L' },
  'bp-nutri':     { src: '/images/products/bp-nutri.png',     alt: 'BP Nutri — Nutrición foliar balanceada Biotiza, envase 1 L' },
  'bp-potasio':   { src: '/images/products/bp-potasio.png',   alt: 'BP Potasio — Potasio orgánico quelatado Biotiza, envase 1 L' },
  'bp-vit':       { src: '/images/products/bp-vit.png',       alt: 'BP Vit — Complejo vitamínico Biotiza, envase 1 L' },
  'bp-zinc':      { src: '/images/products/bp-zinc.png',      alt: 'BP Zinc — Zinc orgánico quelatado Biotiza, envase 1 L' },
  'ca-ultra':     { src: '/images/products/ca-ultra.png',     alt: 'Ca Ultra — Calcio Ultra alta concentración Biotiza, envase 1 L' },
  'k-ultra':      { src: '/images/products/k-ultra.png',      alt: 'K Ultra — Potasio Ultra alta concentración Biotiza, envase 1 L' },
  'mg-ultra':     { src: '/images/products/mg-ultra.png',     alt: 'Mg Ultra — Magnesio Ultra alta concentración Biotiza, envase 1 L' },
  'n-ultra':      { src: '/images/products/n-ultra.png',      alt: 'N Ultra — Nitrógeno Ultra alta concentración Biotiza, envase 1 L' },
  'p-ultra':      { src: '/images/products/p-ultra.png',      alt: 'P Ultra — Fósforo Ultra alta concentración Biotiza, envase 1 L' },

  // BIOPROTECCIÓN / PLAGUICIDAS (9)
  'enhancer':       { src: '/images/products/enhancer.png',       alt: 'Enhancer — Potenciador biológico Biotiza, envase 1 L' },
  'funbac-plus':    { src: '/images/products/funbac-plus.png',    alt: 'Funbac Plus — Bioestimulante anti-hongos Biotiza, envase 1 L' },
  'max-kill-plus':  { src: '/images/products/max-kill-plus.png',  alt: 'Max Kill Plus — Bioinsecticida concentrado Biotiza, envase 1 L' },
  'nemapro':        { src: '/images/products/nemapro.png',        alt: 'Nemapro — Bionematicida Biotiza, envase 1 L' },
  'zen-can':        { src: '/images/products/zen-can.png',        alt: 'Zen-Can — Bioprotección Línea Zentia Biotiza, envase 1 L' },
  'zen-chrys':      { src: '/images/products/zen-chrys.png',      alt: 'Zen-Chrys — Bioprotección con Chrysoperla Línea Zentia Biotiza, envase 1 L' },
  'zen-cu':         { src: '/images/products/zen-cu.png',         alt: 'Zen-Cu — Bioprotección con cobre Línea Zentia Biotiza, envase 1 L' },
  'zen-fungi':      { src: '/images/products/zen-fungi.png',      alt: 'Zen-Fungi — Biofungicida Línea Zentia Biotiza, envase 1 L' },
  'zen-spider':     { src: '/images/products/zen-spider.png',     alt: 'Zen-Spider — Bioprotección contra ácaros Línea Zentia Biotiza, envase 1 L' },
}

/**
 * Devuelve la foto real del producto si existe en el mapeo, o `null`.
 * Los componentes deciden el fallback (icono + gradiente, p.ej.).
 */
export function getProductImage(slug: string): ProductImage | null {
  return PRODUCT_IMAGES[slug] ?? null
}

/**
 * Devuelve true si el producto tiene foto HD real.
 */
export function hasProductPhoto(slug: string): boolean {
  return slug in PRODUCT_IMAGES
}

/**
 * Color de backdrop sugerido por línea (para gradientes detrás de la botella).
 */
export const LINE_BACKDROP: Record<Product['line'], { from: string; to: string }> = {
  organicos:       { from: '#22B573', to: '#16a05e' },
  especialidades:  { from: '#0E6E99', to: '#085880' },
  bioestimulantes: { from: '#E8690F', to: '#cd5500' },
  nutricion:       { from: '#F28A3D', to: '#d97520' },
  zentia:          { from: '#1189BF', to: '#0a6b97' },
}
