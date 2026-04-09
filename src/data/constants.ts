/**
 * constants.ts — Configuración global y datos estáticos de referencia
 */

import type { ProductLine } from '@/types'

// ─── Líneas de Producto ───────────────────────────────────────────────────

export interface ProductLineConfig {
  id: ProductLine
  name: string
  slug: string
  color: string        // hex
  tailwindBg: string   // clase bg-
  tailwindText: string // clase text-
  tailwindBorder: string
  iconName: string     // nombre del icono en lucide-react
  description: string
  tagline: string
  productCount: number
}

export const PRODUCT_LINES: ProductLineConfig[] = [
  {
    id:              'organicos',
    name:            'Orgánicos',
    slug:            'organicos',
    color:           '#22b573',
    tailwindBg:      'bg-verde-500',
    tailwindText:    'text-verde-600',
    tailwindBorder:  'border-verde-500',
    iconName:        'Leaf',
    description:     'Fertilizantes quelatados orgánicos con certificación OMRI. La base sólida de cualquier programa de nutrición limpia para exportación.',
    tagline:         'Certificados OMRI · Para producción orgánica',
    productCount:    10,
  },
  {
    id:              'especialidades',
    name:            'Especialidades',
    slug:            'especialidades',
    color:           '#0e6e99',
    tailwindBg:      'bg-azul-600',
    tailwindText:    'text-azul-600',
    tailwindBorder:  'border-azul-600',
    iconName:        'FlaskConical',
    description:     'Correctores de deficiencias, inoculantes microbianos y soluciones especializadas. Para productores que necesitan precisión y resultados comprobables.',
    tagline:         'Soluciones técnicas especializadas',
    productCount:    6,
  },
  {
    id:              'bioestimulantes',
    name:            'Bioestimulantes',
    slug:            'bioestimulantes',
    color:           '#e8690f',
    tailwindBg:      'bg-naranja-500',
    tailwindText:    'text-naranja-500',
    tailwindBorder:  'border-naranja-500',
    iconName:        'Sparkles',
    description:     'Promotores de floración, cuajado, engorde de fruto y sanitizantes. Aminoácidos, giberelinas, citoquininas y más para cada etapa crítica.',
    tagline:         'Floración · Cuajado · Calibre · Calidad',
    productCount:    6,
  },
  {
    id:              'nutricion',
    name:            'Nutrición Líquida',
    slug:            'nutricion',
    color:           '#f28a3d',
    tailwindBg:      'bg-naranja-400',
    tailwindText:    'text-naranja-400',
    tailwindBorder:  'border-naranja-400',
    iconName:        'Droplets',
    description:     'Fertilizantes de alta concentración con quelatos de última generación. Macronutrientes, secundarios y microelementos para fertirrigación de precisión.',
    tagline:         'Alta concentración · Quelatos premium',
    productCount:    9,
  },
  {
    id:              'zentia',
    name:            'Línea Zentia',
    slug:            'zentia',
    color:           '#1189bf',
    tailwindBg:      'bg-azul-500',
    tailwindText:    'text-azul-500',
    tailwindBorder:  'border-azul-500',
    iconName:        'Shield',
    description:     'Bioprotección integral de origen natural: insecticidas, fungicidas y bactericidas. Efectivos, seguros para el agroecosistema y compatibles con exportación.',
    tagline:         'Bioinsecticidas · Biofungicidas · Bactericidas',
    productCount:    10,
  },
]

// ─── Cultivos ─────────────────────────────────────────────────────────────

export interface CropConfig {
  id: string
  name: string
  slug: string
  emoji: string
  gradientFrom: string
  gradientTo: string
  description: string
}

export const CROPS_DATA: CropConfig[] = [
  { id: 'tomate',    name: 'Tomate',     slug: 'tomate',    emoji: '🍅', gradientFrom: 'from-red-700',    gradientTo: 'to-red-500',    description: 'Solanum lycopersicum' },
  { id: 'fresa',     name: 'Fresa',      slug: 'fresa',     emoji: '🍓', gradientFrom: 'from-rose-700',   gradientTo: 'to-rose-500',   description: 'Fragaria × ananassa' },
  { id: 'arandano',  name: 'Arándano',   slug: 'arandano',  emoji: '🫐', gradientFrom: 'from-indigo-700', gradientTo: 'to-indigo-500', description: 'Vaccinium corymbosum' },
  { id: 'frambuesa', name: 'Frambuesa',  slug: 'frambuesa', emoji: '🍇', gradientFrom: 'from-purple-700', gradientTo: 'to-purple-500', description: 'Rubus idaeus' },
  { id: 'zarzamora', name: 'Zarzamora',  slug: 'zarzamora', emoji: '🫐', gradientFrom: 'from-violet-800', gradientTo: 'to-violet-600', description: 'Rubus fruticosus' },
  { id: 'aguacate',  name: 'Aguacate',   slug: 'aguacate',  emoji: '🥑', gradientFrom: 'from-green-800',  gradientTo: 'to-green-600',  description: 'Persea americana' },
  { id: 'chile',     name: 'Chile',      slug: 'chile',     emoji: '🌶️', gradientFrom: 'from-orange-700', gradientTo: 'to-orange-500', description: 'Capsicum annuum' },
  { id: 'citricos',  name: 'Cítricos',   slug: 'citricos',  emoji: '🍊', gradientFrom: 'from-amber-600',  gradientTo: 'to-amber-400',  description: 'Citrus spp.' },
]

// ─── Certificaciones ──────────────────────────────────────────────────────

export const CERTIFICATIONS = [
  { id: 'cofepris', name: 'COFEPRIS',         description: 'Registro sanitario mexicano (Comisión Federal para la Protección contra Riesgos Sanitarios)' },
  { id: 'omri',     name: 'OMRI Listed',       description: 'Certificación orgánica internacional (Organic Materials Review Institute)' },
  { id: 'hecho-mx', name: 'Hecho en México',   description: 'Producto fabricado en territorio nacional' },
] as const

// ─── Métodos de Aplicación ────────────────────────────────────────────────

export const APPLICATION_METHODS = [
  { id: 'fertirrigacion', label: 'Fertirrigación' },
  { id: 'foliar',         label: 'Foliar'          },
  { id: 'drench',         label: 'Drench'          },
  { id: 'aspersion',      label: 'Aspersión'       },
] as const

// ─── Información de Contacto ──────────────────────────────────────────────

export const CONTACT_INFO = {
  email:      'ventas@biotiza.mx',
  whatsapp:   '523300000000',
  whatsappUrl: 'https://wa.me/523300000000',
  instagram:  '@biotiza',
  instagramUrl: 'https://instagram.com/biotiza',
  address:    'Zapopan, Jalisco, México',
  website:    'https://biotiza.mx',
  schedule: {
    weekdays: 'Lunes a Viernes: 9:00 – 18:00',
    saturday: 'Sábado: 9:00 – 13:00',
    note:     'La Asesora IA responde 24/7',
  },
} as const

// ─── Navegación ───────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: 'Soluciones',   href: '/soluciones'   },
  { label: 'Cultivos',     href: '/cultivos'     },
  { label: 'Herramientas', href: '/herramientas' },
  { label: 'Academia',     href: '/academia'     },
  { label: 'Nosotros',     href: '/nosotros'     },
  { label: 'Contacto',     href: '/contacto'     },
] as const
