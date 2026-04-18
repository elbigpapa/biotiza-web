/**
 * types/index.ts — Tipos principales del proyecto Biotiza
 *
 * Nomenclatura:
 *  - Interfaces de dominio: PascalCase con prefijo descriptivo (Product, CropProtocol…)
 *  - Union types cortos: tipo literal (ProductLine, PhenologicalStage…)
 *  - Enums no se usan; se prefieren union types o const maps.
 */

// ─── Líneas de Producto ────────────────────────────────────────────────────

/**
 * Las 5 líneas de producto de Biotiza con sus colores de marca.
 * organicos    → #22b573 verde
 * especialidades → #0e6e99 azul-teal
 * bioestimulantes → #e8690f naranja
 * nutricion    → #f28a3d naranja claro
 * zentia       → #1189bf azul
 */
export type ProductLine =
  | 'organicos'
  | 'especialidades'
  | 'bioestimulantes'
  | 'nutricion'
  | 'zentia'

// ─── Marcas de Proveedor ──────────────────────────────────────────────────

/**
 * Marcas de los tres proveedores cuyos productos distribuye Biotiza.
 * bioproductos → Bioproductos Agrícolas (líneas originales: BP / Zentia / ULTRA)
 * agrobionsa   → Agrobiológicos del Noroeste (control biológico microbiano)
 * veganic      → Veganic® (fabricados en España, tecnologías NeoDuo / NeoPrime / MicroGea)
 */
export type ProductBrand = 'bioproductos' | 'agrobionsa' | 'veganic'

// ─── Certificaciones ─────────────────────────────────────────────────────

export type Certification = 'COFEPRIS' | 'OMRI' | 'Hecho en México' | string

// ─── Métodos de Aplicación ────────────────────────────────────────────────

export type ApplicationMethod =
  | 'fertirrigación'
  | 'drench'
  | 'foliar'
  | 'aspersión'
  | 'drench radicular'
  | 'inyección al suelo'
  | string

// ─── Presentaciones ──────────────────────────────────────────────────────

export interface ProductPresentation {
  /** Volumen o peso, ej: "1 L", "20 L", "1 kg" */
  size: string
  /** Unidad normalizada: "L" | "kg" | "mL" | "g" */
  unit: 'L' | 'kg' | 'mL' | 'g' | string
  /** Precio sugerido MXN (opcional, puede ser nulo para B2B) */
  priceMXN?: number
}

// ─── Composición ─────────────────────────────────────────────────────────

export interface CompositionItem {
  /** Nombre del ingrediente/nutriente, ej: "Ácido húmico", "Nitrógeno total" */
  ingredient: string
  /** Valor con unidad, ej: "8 %", "200 ppm", "1×10⁸ UFC/mL" */
  value: string
  /** Unidad normalizada para cálculos, ej: "%", "ppm", "UFC/mL" */
  unit?: string
  /** Notas técnicas opcionales */
  notes?: string
}

// ─── Dosis Recomendada ────────────────────────────────────────────────────

export interface RecommendedDose {
  /** Dosis para fertirrigación, ej: "2-3 L/ha" */
  fertirigacion?: string
  /** Dosis foliar, ej: "1-2 mL/L" */
  foliar?: string
  /** Dosis drench, ej: "3-5 mL/planta" */
  drench?: string
  /** Cualquier otro método con su dosis */
  [method: string]: string | undefined
}

// ─── Dosis por Sistema de Producción ─────────────────────────────────────

export interface DosageBySystem {
  /** Sistema de producción: extensivo, intensivo, hidropónico */
  system: 'extensivo' | 'intensivo' | 'hidropónico' | string
  /** Dosis, ej: "2-3 L/ha" */
  dose: string
  /** Método de aplicación */
  method: string
  /** Frecuencia */
  frequency: string
}

// ─── Dosis por Cultivo ───────────────────────────────────────────────────

export interface DosageByCrop {
  /** Slug del cultivo */
  crop: string
  /** Nombre visible del cultivo */
  cropName: string
  /** Etapas fenológicas recomendadas */
  stages: string[]
  /** Dosis */
  dose: string
  /** Método de aplicación */
  method: string
  /** Frecuencia */
  frequency: string
  /** Notas técnicas */
  notes?: string
}

// ─── Documentos del Producto ─────────────────────────────────────────────

export interface ProductDocuments {
  /** Ruta a ficha técnica PDF */
  datasheet?: string
  /** Ruta a hoja de seguridad PDF */
  safety_sheet?: string
  /** Ruta a certificación OMRI PDF */
  omri_cert?: string
  /** Ruta a registro COFEPRIS PDF */
  cofepris_cert?: string
}

// ─── Compatibilidad ──────────────────────────────────────────────────────

export interface ProductCompatibility {
  /** IDs de productos compatibles */
  compatible: string[]
  /** IDs de productos incompatibles (no mezclar) */
  incompatible: string[]
  /** IDs con compatibilidad condicional (requiere prueba de jarrita) */
  conditional?: string[]
}

// ─── Producto ────────────────────────────────────────────────────────────

export interface Product {
  /** Identificador único, ej: "biotiza-root-plus" */
  id: string
  /** Slug para URL, ej: "biotiza-root-plus" */
  slug: string
  /** Nombre corto de marketing, ej: "Biotiza Root Plus" */
  name: string
  /** Nombre técnico completo, ej: "Biotiza Root Plus — Enraizador Orgánico" */
  full_name: string
  /** Línea de producto */
  line: ProductLine
  /** Marca del proveedor (distribuimos 3 marcas) */
  brand: ProductBrand
  /** Categoría dentro de la línea, ej: "Enraizadores", "Bioprotección foliar" */
  category: string
  /** Descripción de marketing (1-3 oraciones) */
  description: string
  /** Descripción técnica extendida (para página de detalle) */
  technical_description?: string
  /** Composición analítica */
  composition: CompositionItem[]
  /** Presentaciones disponibles */
  presentations: ProductPresentation[]
  /** Certificaciones que posee */
  certifications: Certification[]
  /** Métodos de aplicación válidos */
  application_methods: ApplicationMethod[]
  /** Dosis recomendadas por método */
  recommended_dose: RecommendedDose
  /** Frecuencia de aplicación, ej: "Cada 15-20 días" */
  frequency: string
  /** Etapas fenológicas donde se recomienda, ej: ["germinación", "crecimiento"] */
  best_stages: PhenologicalStage[]
  /** Beneficios clave (bullets de marketing) */
  benefits: string[]
  /** Cultivos en los que se recomienda (slugs de cultivo) */
  crops: string[]
  /** Matriz de compatibilidad */
  compatibility: ProductCompatibility
  /** Problemas que resuelve, ej: ["deficiencia de zinc", "estrés hídrico"] */
  solves_problems: string[]
  /** ¿Se muestra en sección Featured/destacados? */
  featured: boolean
  /** URL de imagen principal */
  image?: string
  /** Galería de imágenes adicionales */
  images?: string[]
  /** Ficha técnica PDF (ruta o URL) */
  datasheet_url?: string
  /** Fecha de última actualización del registro */
  updated_at?: string
  /** Tabla de dosis por sistema de producción */
  dosage_table?: DosageBySystem[]
  /** Dosis específica por cultivo */
  dosage_by_crop?: DosageByCrop[]
  /** Documentos descargables */
  documents?: ProductDocuments
  /** IDs de casos de éxito relacionados */
  case_studies?: string[]
}

// ─── Etapa Fenológica ─────────────────────────────────────────────────────

export type PhenologicalStage =
  | 'pre-siembra'
  | 'germinación'
  | 'emergencia'
  | 'crecimiento vegetativo'
  | 'trasplante'
  | 'inducción floral'
  | 'floración'
  | 'cuajado'
  | 'desarrollo de fruto'
  | 'maduración'
  | 'cosecha'
  | 'post-cosecha'
  | string

// ─── Protocolo de Cultivo ─────────────────────────────────────────────────

export interface StageProtocol {
  /** Etapa fenológica */
  stage: PhenologicalStage
  /** Duración típica en días */
  duration_days: number
  /** Productos recomendados para esta etapa (IDs de Product) */
  recommended_products: string[]
  /** Notas agronómicas de la etapa */
  notes?: string
  /** Parámetros clave a monitorear */
  monitoring?: string[]
}

export interface CropProtocol {
  /** Identificador único del cultivo, ej: "aguacate" */
  id: string
  /** Slug para URL */
  slug: string
  /** Nombre común en español */
  name: string
  /** Nombre científico */
  scientific_name?: string
  /** Descripción breve del cultivo */
  description: string
  /** Ciclo total aproximado en días */
  cycle_days?: number
  /** Temporada típica en México */
  season?: string
  /** Regiones de México donde se cultiva */
  regions?: string[]
  /** Protocolo por etapa fenológica */
  stages: StageProtocol[]
  /** Productos más usados en este cultivo (IDs) */
  featured_products: string[]
  /** Imagen representativa del cultivo */
  image?: string
  /** Desafíos comunes del cultivo */
  common_challenges?: string[]
}

// ─── Compatibilidad (Matriz Global) ──────────────────────────────────────

export type CompatibilityStatus = 'compatible' | 'incompatible' | 'conditional' | 'unknown'

export interface CompatibilityEntry {
  productA: string
  productB: string
  status: CompatibilityStatus
  notes?: string
}

// ─── Cotización (Carrito) ─────────────────────────────────────────────────

export interface QuotationItem {
  product: Product
  quantity: number
  presentation: ProductPresentation
  notes?: string
}

export interface Quotation {
  id?: string
  items: QuotationItem[]
  customerName?: string
  customerEmail?: string
  customerPhone?: string
  cropType?: string
  hectares?: number
  createdAt: Date
}

// ─── Blog / Academia ──────────────────────────────────────────────────────

export type ArticleCategory =
  | 'nutrición'
  | 'bioestimulación'
  | 'bioprotección'
  | 'suelos'
  | 'cultivos'
  | 'noticias'

export interface Article {
  slug: string
  title: string
  excerpt: string
  content?: string
  category: ArticleCategory
  tags: string[]
  author: string
  published_at: string
  updated_at?: string
  image?: string
  reading_time?: number
  featured: boolean
}

// ─── Testimonial ─────────────────────────────────────────────────────────

export interface Testimonial {
  id: string
  author: string
  role: string
  company?: string
  region?: string
  crop?: string
  quote: string
  rating?: number
  image?: string
  featured?: boolean
}

// ─── Navegación ──────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
  description?: string
  icon?: string
  children?: NavItem[]
}

// ─── Formulario de Contacto ───────────────────────────────────────────────

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  state?: string
  crop?: string
  subject: string
  message: string
  newsletter?: boolean
}

// ─── Calculadora de Dosis ────────────────────────────────────────────────

export interface DoseCalculatorInput {
  productId: string
  applicationMethod: ApplicationMethod
  hectares?: number
  litersOfWater?: number
  plantsPerHectare?: number
}

export interface DoseCalculatorResult {
  productName: string
  method: ApplicationMethod
  totalQuantity: number
  unit: string
  concentration?: string
  notes?: string
}

// ─── Caso de Éxito ───────────────────────────────────────────────────────

export interface ProductUsed {
  productId: string
  productName: string
  dose: string
  method: string
  frequency: string
}

export interface CaseStudyResult {
  /** Métrica medida, ej: "Peso de raíz", "Rendimiento" */
  metric: string
  /** Valor antes/testigo */
  before?: string
  /** Valor después/tratamiento */
  after: string
  /** Mejora, ej: "↑ 34%", "↑ 2.1 °Brix" */
  improvement?: string
}

export interface CaseStudy {
  id: string
  slug: string
  /** Título descriptivo anonimizado */
  title: string
  /** Slug del cultivo */
  crop: string
  /** Nombre visible del cultivo */
  cropName: string
  /** Región/estado */
  region: string
  /** Temporada, ej: "Otoño-Invierno 2024" */
  season: string
  /** Productos utilizados */
  products_used: ProductUsed[]
  /** Desafío que enfrentaba el productor */
  challenge: string
  /** Protocolo aplicado (anonimizado) */
  protocol: string
  /** Resultados medibles */
  results: CaseStudyResult[]
  /** Conclusión */
  conclusion: string
  /** Imágenes de campo */
  images?: string[]
  /** Ruta al PDF original (si no contiene info confidencial) */
  pdf_source?: string
}
