/**
 * crop-images.ts — Fotografías HD curadas para cultivos
 *
 * URLs de Unsplash (CC0, uso comercial gratuito) — todas seleccionadas
 * por su calidad fotográfica profesional y representatividad del cultivo
 * real. Resolución por defecto 1200px de ancho con compresión q=80.
 *
 * Para añadir variantes en otros tamaños, usa los parámetros de Unsplash:
 *   ?w=1200&q=80&auto=format&fit=crop
 *
 * Si el cultivo no tiene foto curada, se devuelve null y el caller debe
 * usar el gradient + emoji como fallback.
 */

interface CropImage {
  src: string
  alt: string
  /** Crédito al fotógrafo (Unsplash CC0 no lo exige pero es buena práctica) */
  credit?: string
}

const CROP_IMAGES: Record<string, CropImage> = {
  tomate: {
    src: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=1200&q=80&auto=format&fit=crop',
    alt: 'Tomates rojos en planta',
  },
  cafe: {
    src: 'https://images.unsplash.com/photo-1586095516671-d085ff58cdd4?w=1200&q=80&auto=format&fit=crop',
    alt: 'Cerezas de café rojas maduras en la rama',
  },
  'tomate-cherry': {
    src: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=1200&q=80&auto=format&fit=crop',
    alt: 'Tomates cherry maduros en racimo',
  },
  fresa: {
    src: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=1200&q=80&auto=format&fit=crop',
    alt: 'Fresas frescas',
  },
  arandano: {
    src: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=1200&q=80&auto=format&fit=crop',
    alt: 'Arándanos azules en arbusto',
  },
  frambuesa: {
    src: 'https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?w=1200&q=80&auto=format&fit=crop',
    alt: 'Frambuesas rojas maduras',
  },
  zarzamora: {
    src: 'https://images.unsplash.com/photo-1723580892175-2e267106c089?w=1200&q=80&auto=format&fit=crop',
    alt: 'Zarzamoras maduras de cerca',
  },
  aguacate: {
    src: 'https://images.unsplash.com/photo-1601039641847-7857b994d704?w=1200&q=80&auto=format&fit=crop',
    alt: 'Aguacates Hass en árbol',
  },
  chile: {
    src: 'https://images.unsplash.com/photo-1604488943825-f95dc6796ca5?w=1200&q=80&auto=format&fit=crop',
    alt: 'Chile pimiento (morrón) creciendo en la planta',
  },
  citricos: {
    src: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=1200&q=80&auto=format&fit=crop',
    alt: 'Naranjas en árbol',
  },
  apio: {
    src: 'https://images.unsplash.com/photo-1716434128739-ddbf5d3a1b7e?w=1200&q=80&auto=format&fit=crop',
    alt: 'Tallos de apio fresco con hojas verdes',
  },
  brocoli: {
    src: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=1200&q=80&auto=format&fit=crop',
    alt: 'Brócoli fresco',
  },
  maiz: {
    src: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=1200&q=80&auto=format&fit=crop',
    alt: 'Maíz dorado en mazorca',
  },
  'cana-azucar': {
    src: 'https://images.unsplash.com/photo-1637335556827-bf5923d77f33?w=1200&q=80&auto=format&fit=crop',
    alt: 'Campo de caña de azúcar al atardecer',
  },
  frijol: {
    src: 'https://images.unsplash.com/photo-1639947219179-bb0357b8856a?w=1200&q=80&auto=format&fit=crop',
    alt: 'Planta de frijol creciendo con hojas verdes',
  },
  agave: {
    src: 'https://images.unsplash.com/photo-1732043846829-dc34d9e2e989?w=1200&q=80&auto=format&fit=crop',
    alt: 'Plantación de agave azul tequilana con sierra al fondo',
  },
  cebolla: {
    src: 'https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?w=1200&q=80&auto=format&fit=crop',
    alt: 'Cebollas frescas',
  },
  esparrago: {
    src: 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=1200&q=80&auto=format&fit=crop',
    alt: 'Espárragos verdes frescos en manojo',
  },
  pepino: {
    src: 'https://images.unsplash.com/photo-1568584711271-6c929fb49b60?w=1200&q=80&auto=format&fit=crop',
    alt: 'Pepinos frescos',
  },
  papa: {
    src: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=1200&q=80&auto=format&fit=crop',
    alt: 'Papas frescas',
  },
  lechuga: {
    src: 'https://images.unsplash.com/photo-1622205313162-be1d5712a43f?w=1200&q=80&auto=format&fit=crop',
    alt: 'Lechuga fresca',
  },
  pina: {
    src: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=1200&q=80&auto=format&fit=crop',
    alt: 'Piña madura',
  },
  platano: {
    src: 'https://images.unsplash.com/photo-1620036924477-c3d6e9ce36fc?w=1200&q=80&auto=format&fit=crop',
    alt: 'Racimo de plátano verde en la planta',
  },
  papaya: {
    src: 'https://images.unsplash.com/photo-1671769194959-6d61b233aad9?w=1200&q=80&auto=format&fit=crop',
    alt: 'Papayos con frutos verdes y maduros en el árbol',
  },
  sandia: {
    src: 'https://images.unsplash.com/photo-1658482199477-5b441d4e2321?w=1200&q=80&auto=format&fit=crop',
    alt: 'Sandía creciendo en el campo',
  },
  arroz: {
    src: 'https://images.unsplash.com/photo-1728895604559-a4e16081504e?w=1200&q=80&auto=format&fit=crop',
    alt: 'Espigas de arroz en parcela inundada',
  },
  calabaza: {
    src: 'https://images.unsplash.com/photo-1697382492273-d7725efe3b62?w=1200&q=80&auto=format&fit=crop',
    alt: 'Campo de calabazas maduras',
  },
  calabacin: {
    src: 'https://images.unsplash.com/photo-1661604661117-790b6cb80108?w=1200&q=80&auto=format&fit=crop',
    alt: 'Calabacita (zucchini) creciendo en la planta',
  },
  trigo: {
    src: 'https://images.unsplash.com/photo-1594842059196-5b6b8fa73187?w=1200&q=80&auto=format&fit=crop',
    alt: 'Campo de trigo dorado al atardecer',
  },
  sorgo: {
    src: 'https://images.unsplash.com/photo-1758356860542-a2df92aad294?w=1200&q=80&auto=format&fit=crop',
    alt: 'Panículas de sorgo rojizo en el campo',
  },
  alfalfa: {
    src: 'https://images.unsplash.com/photo-1631532319613-e512b18253a0?w=1200&q=80&auto=format&fit=crop',
    alt: 'Campo verde de alfalfa',
  },
  manzana: {
    src: 'https://images.unsplash.com/photo-1537811465496-6c38a51d2d81?w=1200&q=80&auto=format&fit=crop',
    alt: 'Huerto de manzanos con manzanas rojas',
  },
  uva: {
    src: 'https://images.unsplash.com/photo-1515778767554-42d4b373f2b3?w=1200&q=80&auto=format&fit=crop',
    alt: 'Racimos de uva en la vid',
  },
  nuez: {
    src: 'https://images.unsplash.com/photo-1718118069316-9b7675979ef7?w=1200&q=80&auto=format&fit=crop',
    alt: 'Nuez con cáscara verde en el árbol',
  },
  mango: {
    src: 'https://images.unsplash.com/photo-1705723115413-a0ec375ac414?w=1200&q=80&auto=format&fit=crop',
    alt: 'Mangos creciendo en el árbol',
  },
  flores: {
    src: 'https://images.unsplash.com/photo-1561361376-f84b523f6a96?w=1200&q=80&auto=format&fit=crop',
    alt: 'Surcos de flores en producción de floricultura',
  },
}

export function getCropImage(slug: string): CropImage | null {
  return CROP_IMAGES[slug] ?? null
}

// ─── Hero photography ──────────────────────────────────────────────────────

export const HERO_IMAGES = {
  /** Manos sembrando plántulas — foto del hero del prototipo Claude Design */
  cultivatedField: {
    src: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=2400&q=85&auto=format&fit=crop',
    alt: 'Manos sembrando plántulas en charola de germinación',
  },
  /** Jardín casero — para Casa y Jardín hero */
  homeGarden: {
    src: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=2400&q=85&auto=format&fit=crop',
    alt: 'Jardín lleno de plantas',
  },
  /** Manos en tierra fértil — para Why Biotiza */
  fertileSoil: {
    src: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=2400&q=85&auto=format&fit=crop',
    alt: 'Tierra fértil',
  },
  /** Hojas verdes detalladas — para Academia */
  leafCloseup: {
    src: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=2400&q=85&auto=format&fit=crop',
    alt: 'Hojas verdes',
  },
}
