/**
 * home-garden.ts — Biotiza Casa y Jardín
 *
 * Línea "consumer" de Biotiza para consumidores finales, jardineros caseros,
 * administradores de áreas verdes, campos de golf y gobiernos municipales.
 *
 * Estrategia: paquetes pre-armados con productos ya existentes del catálogo
 * profesional, adaptados en dosis y presentación para usuario no técnico.
 */

import type { ProductLine } from '@/types'

// ─── Categorías ────────────────────────────────────────────────────────────

export type GardenCategory =
  | 'interior'
  | 'pasto-jardin'
  | 'frutales-caseros'
  | 'flores-ornamentales'
  | 'areas-verdes'

export interface GardenCategoryConfig {
  id: GardenCategory
  slug: string
  name: string
  tagline: string
  description: string
  emoji: string
  icon: string // lucide icon name
  gradient: string // tailwind gradient classes
  color: string    // hex
  audience: string
  useCases: string[]
}

export const GARDEN_CATEGORIES: GardenCategoryConfig[] = [
  {
    id: 'interior',
    slug: 'plantas-de-interior',
    name: 'Plantas de interior',
    tagline: 'Para monsteras, pothos, ficus, suculentas y todas las plantas que viven contigo.',
    description:
      'Tus plantas de interior viven en macetas con sustrato limitado y poca luz. Necesitan nutrición balanceada y micronutrientes que el sustrato no puede reponer. Nuestros paquetes están calibrados para evitar sobre-fertilización — el problema más común en cuidado casero.',
    emoji: '🪴',
    icon: 'Flower2',
    gradient: 'from-emerald-700 to-teal-500',
    color: '#10b981',
    audience: 'Quienes tienen plantas decorativas en apartamento, oficina o interior de casa',
    useCases: [
      'Monstera, filodendro, pothos, costilla de Adán',
      'Ficus lyrata, ficus elástica, palma areca',
      'Suculentas y cactus',
      'Orquídeas (phalaenopsis, cattleya)',
      'Bonsáis domésticos',
    ],
  },
  {
    id: 'pasto-jardin',
    slug: 'pasto-y-jardin',
    name: 'Pasto y jardín',
    tagline: 'Césped verde intenso, sin hongos ni plagas que arruinen tu jardín.',
    description:
      'Un pasto sano se ve profundamente verde, es denso al pisar y resiste sequía, hongos y plagas. Nuestros programas combinan nutrición radicular, micronutrientes para color y bioprotección preventiva. Sirven para pasto San Agustín, Kikuyu, Bermuda y variedades ornamentales.',
    emoji: '🌿',
    icon: 'Trees',
    gradient: 'from-green-700 to-lime-500',
    color: '#22c55e',
    audience: 'Dueños de casa con jardín, edificios con áreas verdes comunes',
    useCases: [
      'Renverdecimiento de pasto amarillento',
      'Control de manchas marrones (hongos)',
      'Prevención de grillotopo y larvas de escarabajo',
      'Arbustos, setos y coberturas verdes',
      'Pasto post-sequía o post-tráfico intenso',
    ],
  },
  {
    id: 'frutales-caseros',
    slug: 'frutales-caseros',
    name: 'Frutales caseros',
    tagline: 'De tu limón, aguacate o mango a la mesa — con frutos grandes, sanos y dulces.',
    description:
      'Los frutales del traspatio y huertos familiares tienen potencial enorme pero suelen estar sub-nutridos. Nuestros paquetes se basan en los mismos productos que usan agricultores de exportación, ajustados a la escala de 1 a 20 árboles.',
    emoji: '🍊',
    icon: 'Apple',
    gradient: 'from-amber-700 to-orange-500',
    color: '#f97316',
    audience: 'Familias con frutales en jardín o huerto casero',
    useCases: [
      'Limonero, naranjo, mandarino, toronja',
      'Aguacate Hass en traspatio',
      'Mango, guayaba, papaya',
      'Granado, higuera, nectarino',
      'Arbustos de berries domésticos (zarzamora, frambuesa)',
    ],
  },
  {
    id: 'flores-ornamentales',
    slug: 'flores-y-ornamentales',
    name: 'Flores y ornamentales',
    tagline: 'Floración abundante, colores vibrantes y tallos firmes temporada tras temporada.',
    description:
      'Las flores son el escaparate de un jardín. Necesitan fósforo y micronutrientes para florecer densamente, potasio para colores intensos y bioprotección contra hongos foliares. Cubrimos desde petunias hasta rosales de exhibición.',
    emoji: '🌸',
    icon: 'Flower',
    gradient: 'from-pink-700 to-rose-500',
    color: '#f43f5e',
    audience: 'Jardineros decorativos, entusiastas de rosales, exhibidores',
    useCases: [
      'Rosales híbridos y trepadores',
      'Dalias, crisantemos, gerberas',
      'Petunias, alegrías, begonias',
      'Buganvilias (prolongar floración)',
      'Cactus y suculentas con flor',
    ],
  },
  {
    id: 'areas-verdes',
    slug: 'areas-verdes-institucionales',
    name: 'Áreas verdes institucionales',
    tagline: 'Gobierno, parques, campos de golf, escuelas y corporativos: áreas verdes premium a gran escala.',
    description:
      'Programa especial para administradores de áreas verdes con hectáreas de responsabilidad. Ofrecemos productos en presentaciones industriales, asesoría técnica dedicada y planes de aplicación por temporada. Todos nuestros productos Zentia son compatibles con reapertura al público sin intervalos prolongados de seguridad.',
    emoji: '⛳',
    icon: 'Landmark',
    gradient: 'from-verde-800 to-verde-600',
    color: '#166534',
    audience: 'Gobiernos municipales, green keepers, administradores de campus, corporativos con áreas verdes',
    useCases: [
      'Campos de golf (greens, tees, fairways)',
      'Parques municipales y plazas',
      'Campus escolares y universitarios',
      'Complejos deportivos y estadios',
      'Jardines corporativos y residenciales de lujo',
    ],
  },
]

export function getGardenCategoryBySlug(slug: string): GardenCategoryConfig | undefined {
  return GARDEN_CATEGORIES.find((c) => c.slug === slug)
}

// ─── Paquetes Biotiza Casa y Jardín ────────────────────────────────────────

export interface PackageProduct {
  productId: string     // id del catálogo principal (products.ts)
  name: string
  line: ProductLine
  sizeCasa: string      // presentación específica para casa (ej: "250 mL")
  useDescription: string
}

export interface GardenPackage {
  slug: string
  name: string
  category: GardenCategory
  badge?: 'popular' | 'nuevo' | 'bestseller'
  shortDescription: string
  longDescription: string
  price: number                // MXN (orientativo)
  priceStrike?: number         // precio tachado (para mostrar descuento)
  products: PackageProduct[]
  coverage: string             // ej: "10 plantas de maceta" o "50 m² de pasto"
  frequency: string            // ej: "Aplicación cada 2 semanas"
  includes: string[]           // bullets de qué incluye
  howToUse: string[]           // pasos de uso
  bestFor: string[]
  emoji: string
  gradient: string
}

export const GARDEN_PACKAGES: GardenPackage[] = [
  // ═════════════════════════════════════════ INTERIOR ═══════════════════════
  {
    slug: 'kit-plantas-interior-esencial',
    name: 'Kit Plantas Felices — Esencial',
    category: 'interior',
    badge: 'bestseller',
    shortDescription:
      'El kit indispensable para mantener sanas 10 plantas de interior durante 3 meses.',
    longDescription:
      'Todo lo que una monstera, un ficus o un pothos necesita para no amarillarse, producir hojas nuevas grandes y resistir el cambio de estación. Basado en la misma nutrición que usamos en viveros comerciales, adaptada a dosis seguras para plantas en maceta.',
    price: 589,
    priceStrike: 720,
    coverage: '10 plantas de maceta medianas durante ~3 meses',
    frequency: 'Nutrición cada 15 días · Bioprotección mensual preventiva',
    emoji: '🪴',
    gradient: 'from-emerald-600 to-teal-500',
    products: [
      { productId: 'bp-nutri', name: 'BP Nutri (algas marinas)', line: 'organicos', sizeCasa: '250 mL concentrado', useDescription: 'Bioestimulante de algas marinas: mantiene hojas firmes y brillantes, estimula nuevos brotes.' },
      { productId: 'bp-mix', name: 'BP Mix (microelementos)', line: 'nutricion', sizeCasa: '250 mL', useDescription: 'Corrige amarilleamientos por deficiencia de Fe, Zn, Mn en sustratos viejos.' },
      { productId: 'bp-moots', name: 'BP Moots (enraizador)', line: 'organicos', sizeCasa: '100 mL', useDescription: 'Para trasplante: ayuda a las raíces a colonizar el sustrato nuevo en 7 días.' },
    ],
    includes: [
      '3 productos concentrados con dosificador',
      'Tarjeta con tabla de diluciones por tipo de planta',
      'Calendario imprimible de aplicaciones',
      'Acceso a chat con la Asesora Biotiza para dudas',
    ],
    howToUse: [
      'Diluir 2 mL de BP Nutri por litro de agua y regar cada 15 días.',
      'Cada 30 días, alternar con BP Mix a 1 mL/L para micronutrientes.',
      'Al trasplantar o comprar planta nueva, aplicar BP Moots a 2 mL/L en el primer riego.',
      'No aplicar sobre flores abiertas ni en horas de sol directo.',
    ],
    bestFor: [
      'Plantas de follaje grande (monstera, filodendro)',
      'Ficus que pierden hojas por cambios de temperatura',
      'Orquídeas que no vuelven a florecer',
      'Suculentas amarillentas por falta de micros',
    ],
  },
  {
    slug: 'rescate-planta-enferma',
    name: 'Rescate — Planta enferma',
    category: 'interior',
    badge: 'nuevo',
    shortDescription:
      'Tu planta se está muriendo. Este kit le da 30 días para recuperarse.',
    longDescription:
      'Planta amarilla, pegada, con manchas negras o que pierde hojas sin razón aparente. Usamos el mismo protocolo de rescate de viveros profesionales. No garantizamos milagros, pero si la planta tiene raíz viva, este kit le da su mejor oportunidad.',
    price: 429,
    coverage: '1–3 plantas enfermas · programa de 30 días',
    frequency: 'Aplicación intensiva primeras 2 semanas, mantenimiento después',
    emoji: '🚑',
    gradient: 'from-red-700 to-orange-500',
    products: [
      { productId: 'bp-moots', name: 'BP Moots (enraizador)', line: 'organicos', sizeCasa: '100 mL', useDescription: 'Reactiva raíces dañadas y activa tejido nuevo en zona radicular.' },
      { productId: 'zen-fungi', name: 'Zen-Fungi (antihongos)', line: 'zentia', sizeCasa: '100 mL', useDescription: 'Bioprotección contra hongos de raíz (Fusarium, Pythium) y foliares (Botrytis).' },
      { productId: 'bp-nitro-fx', name: 'BP Nitro FX (aminoácidos)', line: 'organicos', sizeCasa: '100 mL', useDescription: 'Aminoácidos libres: la planta ahorra energía de síntesis y recupera tejido 3× más rápido.' },
    ],
    includes: [
      '3 productos con instrucciones de "protocolo de rescate"',
      'Consulta por WhatsApp con agrónomo para diagnóstico visual (envía foto)',
      'Guía de señales para saber si la planta está respondiendo',
    ],
    howToUse: [
      'Día 1: revisar raíces (sacar la planta del tiesto). Si todas están negras, no hay rescate.',
      'Día 1–3: drench con BP Moots + Zen-Fungi a dosis indicada. Suelo ligeramente húmedo, nunca encharcado.',
      'Días 7, 14: repetir drench con BP Moots + foliar con BP Nitro FX.',
      'Día 30: la planta debe tener al menos un brote nuevo si está respondiendo.',
    ],
    bestFor: [
      'Plantas con pudrición de raíz por exceso de riego',
      'Hojas amarillas masivas después de cambiar de ubicación',
      'Post-plaga (cochinilla, araña) ya controlada pero planta débil',
    ],
  },
  // ═════════════════════════════════════════ PASTO Y JARDÍN ════════════════
  {
    slug: 'kit-pasto-verde-intenso',
    name: 'Kit Pasto Verde Intenso',
    category: 'pasto-jardin',
    badge: 'popular',
    shortDescription:
      'El protocolo de green-keeper para jardines residenciales hasta 200 m². Resultados en 3 semanas.',
    longDescription:
      'Los campos de golf usan estos mismos productos. Nosotros adaptamos dosis y presentación para jardines residenciales. Ataca 3 frentes simultáneos: color (Fe+Mg), densidad (N+bioestimulación) y defensa (biofungicida preventivo).',
    price: 1290,
    priceStrike: 1580,
    coverage: 'Hasta 200 m² de pasto durante 3 meses',
    frequency: 'Nutrición cada 3 semanas · Bioprotección preventiva mensual',
    emoji: '🌿',
    gradient: 'from-green-700 to-lime-500',
    products: [
      { productId: 'n-ultra', name: 'N-Ultra (nitrógeno)', line: 'nutricion', sizeCasa: '1 L concentrado', useDescription: 'Nitrógeno de alta asimilación: el pasto crece denso y vigoroso sin quemarse.' },
      { productId: 'bp-mix', name: 'BP Mix (micros)', line: 'nutricion', sizeCasa: '500 mL', useDescription: 'Hierro + manganeso + magnesio: el verde profundo que hace que se vea "de golf".' },
      { productId: 'bp-nutri', name: 'BP Nutri (algas)', line: 'organicos', sizeCasa: '500 mL', useDescription: 'Resistencia a estrés hídrico y térmico, menos estrés de corte.' },
      { productId: 'zen-fungi', name: 'Zen-Fungi (biofungicida)', line: 'zentia', sizeCasa: '500 mL', useDescription: 'Preventivo contra manchas foliares, pythium y dollar spot.' },
    ],
    includes: [
      '4 productos concentrados con dosificador',
      'Aspersor manual de 1 L con mochila opcional',
      'Calendario impreso de 3 meses con cada aplicación marcada',
      'Guía de diagnóstico de 12 problemas comunes de pasto',
    ],
    howToUse: [
      'Semana 1: diluir N-Ultra 30 mL + BP Mix 15 mL en 10 L de agua, regar uniforme.',
      'Semana 3: repetir con BP Nutri 20 mL + N-Ultra 20 mL.',
      'Mensual: aplicar Zen-Fungi 15 mL/10 L en aspersión foliar preventiva.',
      'Cortar pasto 1 día antes de la aplicación para mejor absorción.',
    ],
    bestFor: [
      'Pasto amarillento post-sequía',
      'Áreas con sombra parcial',
      'Zonas de tráfico (niños, perros, juegos)',
      'Pastos San Agustín, Kikuyu, Bermuda',
    ],
  },
  {
    slug: 'proteccion-jardin-integral',
    name: 'Protección Integral del Jardín',
    category: 'pasto-jardin',
    shortDescription:
      'Previene plagas y enfermedades en jardín completo (pasto + arbustos) durante toda la temporada húmeda.',
    longDescription:
      'Cuando empieza la temporada de lluvia, los hongos se multiplican. Este programa es preventivo: aplicas cada 3 semanas y evitas manchas marrones, oídio en rosales, y larvas en la base del pasto. Más barato prevenir que curar.',
    price: 869,
    coverage: 'Jardín hasta 150 m² · temporada húmeda completa (~4 meses)',
    frequency: 'Cada 3 semanas preventivo',
    emoji: '🛡️',
    gradient: 'from-azul-600 to-cyan-500',
    products: [
      { productId: 'zen-fungi', name: 'Zen-Fungi (biofungicida)', line: 'zentia', sizeCasa: '500 mL', useDescription: 'Bacillus subtilis: protección foliar preventiva.' },
      { productId: 'zen-chrys', name: 'Zen-Chrys (Beauveria)', line: 'zentia', sizeCasa: '250 mL', useDescription: 'Control biológico de trips, mosca blanca y pulgón.' },
      { productId: 'bp-acua', name: 'BP Acua (sanitizante)', line: 'bioestimulantes', sizeCasa: '250 mL', useDescription: 'Sanitiza el agua de riego, previene propagación por encharcamientos.' },
    ],
    includes: [
      '3 productos de bioprotección',
      'Aspersor manual de 2 L',
      'Ficha de señales de plaga (qué buscar antes de aplicar)',
    ],
    howToUse: [
      'Cada 21 días: diluir Zen-Fungi 15 mL + Zen-Chrys 8 mL en 10 L de agua.',
      'Aplicar en aspersión foliar al atardecer sobre pasto y arbustos.',
      'Mensualmente: añadir BP Acua 5 mL al tanque de riego o manguera.',
    ],
    bestFor: [
      'Temporada de lluvias / alta humedad',
      'Jardines con rosas, bugambilias, hortensias',
      'Casas con mascotas (productos seguros post-secado)',
    ],
  },
  // ═════════════════════════════════════════ FRUTALES CASEROS ══════════════
  {
    slug: 'kit-limonero-productivo',
    name: 'Kit Limonero / Cítrico Productivo',
    category: 'frutales-caseros',
    badge: 'popular',
    shortDescription:
      'De 10 limones al año a una temporada completa de cosechas. Programa anual para 1-3 cítricos.',
    longDescription:
      'Un limonero o naranjo bien nutrido puede dar cientos de frutos al año. Los árboles de traspatio suelen fallar por 3 razones: falta de calcio, falta de micronutrientes (sobre todo Fe y Zn), y sin control preventivo de pulgón/mosquita blanca. Este kit ataca las 3.',
    price: 979,
    coverage: '1–3 árboles cítricos adultos · 1 año completo',
    frequency: 'Por fase fenológica: 5 aplicaciones al año',
    emoji: '🍋',
    gradient: 'from-yellow-600 to-amber-500',
    products: [
      { productId: 'bp-calcio', name: 'BP Calcio (calcio orgánico)', line: 'organicos', sizeCasa: '500 mL', useDescription: 'Calcio quelatado para evitar rajaduras y mejorar vida post-cosecha.' },
      { productId: 'bp-mix', name: 'BP Mix (micros)', line: 'nutricion', sizeCasa: '250 mL', useDescription: 'Corrige clorosis férrica y amarillez de hojas nuevas.' },
      { productId: 'bp-fiore', name: 'BP Fioré (inductor floración)', line: 'bioestimulantes', sizeCasa: '100 g', useDescription: 'Aumenta floración y cuajado de frutos.' },
      { productId: 'zen-chrys', name: 'Zen-Chrys (Beauveria)', line: 'zentia', sizeCasa: '250 mL', useDescription: 'Control biológico de pulgón, mosquita blanca y psílido asiático.' },
    ],
    includes: [
      '4 productos para ciclo anual completo',
      'Calendario por meses con etapa fenológica del cítrico',
      'Ficha de identificación de HLB y otros problemas de cítricos',
      'Recordatorios por WhatsApp para cada aplicación',
    ],
    howToUse: [
      'Febrero (pre-floración): BP Fioré 1 g/L foliar + BP Mix 2 mL/L.',
      'Mayo (llenado): BP Calcio 3 mL/L foliar cada 15 días × 3 veces.',
      'Agosto (maduración): BP Calcio + BP Mix cada 20 días.',
      'Preventivo mensual Zen-Chrys para plagas durante temporada.',
    ],
    bestFor: [
      'Limoneros de traspatio',
      'Naranjos y mandarinos de jardín',
      'Toronjos adultos con baja producción',
      'Prevención de HLB (zona endémica)',
    ],
  },
  {
    slug: 'kit-aguacate-casero',
    name: 'Kit Aguacate Casero',
    category: 'frutales-caseros',
    shortDescription:
      'Para aguacates de traspatio: frutos grandes, sin caídas prematuras.',
    longDescription:
      'El aguacate es el rey del traspatio mexicano pero difícil de manejar: aborto floral masivo, frutos que no engordan, hongos de raíz. Este programa fue derivado del protocolo profesional para aguacate Hass adaptado a 1-5 árboles.',
    price: 1189,
    coverage: '1–5 aguacates adultos · ciclo completo',
    frequency: 'Cada 6 semanas por 8 meses',
    emoji: '🥑',
    gradient: 'from-green-800 to-emerald-500',
    products: [
      { productId: 'bp-cuaje', name: 'BP Cuaje (amarre de fruto)', line: 'bioestimulantes', sizeCasa: '250 mL', useDescription: 'Reduce aborto floral y mejora amarre de aguacatitos.' },
      { productId: 'bp-calcio', name: 'BP Calcio (orgánico)', line: 'organicos', sizeCasa: '500 mL', useDescription: 'Firmeza del fruto, prevención de rajaduras y micro-grietas.' },
      { productId: 'ca-ultra', name: 'Ca-Ultra (fertirrigación)', line: 'nutricion', sizeCasa: '1 L', useDescription: 'Para aplicar en drench al pie del árbol cada 6 semanas.' },
      { productId: 'zen-fungi', name: 'Zen-Fungi (biofungicida)', line: 'zentia', sizeCasa: '250 mL', useDescription: 'Prevención de antracnosis del fruto y Phytophthora en raíz.' },
    ],
    includes: [
      '4 productos ciclo completo',
      'Guía específica para Hass, Fuerte y criollos',
      'Consulta online con agrónomo en caso de problemas',
    ],
    howToUse: [
      'Inicio de floración: BP Cuaje 2 mL/L foliar.',
      'Post-amarre: Ca-Ultra 15 mL en 5 L en drench al pie.',
      'Engorde: BP Calcio 3 mL/L foliar + Ca-Ultra mensual.',
      'Preventivo Zen-Fungi cada 2 meses durante temporada lluviosa.',
    ],
    bestFor: [
      'Aguacates Hass de traspatio',
      'Árboles criollos con frutos pequeños',
      'Zonas con hongos frecuentes (humedad alta)',
    ],
  },
  // ═════════════════════════════════════════ FLORES ═════════════════════════
  {
    slug: 'kit-rosales-floracion',
    name: 'Kit Rosales en Floración',
    category: 'flores-ornamentales',
    badge: 'bestseller',
    shortDescription:
      'Rosales con flores grandes, colores intensos y sin manchas negras en las hojas.',
    longDescription:
      'La mancha negra del rosal (Diplocarpon rosae) arruina más rosales que cualquier otra cosa. Este kit combina nutrición para floración abundante con bioprotección preventiva — sin los pesticidas químicos que dejan residuo en las flores.',
    price: 749,
    coverage: '5–15 rosales · temporada de floración completa (~6 meses)',
    frequency: 'Cada 3 semanas',
    emoji: '🌹',
    gradient: 'from-pink-600 to-rose-500',
    products: [
      { productId: 'bp-fiore', name: 'BP Fioré (inductor)', line: 'bioestimulantes', sizeCasa: '100 g', useDescription: 'Mayor densidad de botones florales.' },
      { productId: 'bp-potasio', name: 'BP Potasio', line: 'organicos', sizeCasa: '500 mL', useDescription: 'Intensifica color y vida de la flor cortada.' },
      { productId: 'zen-fungi', name: 'Zen-Fungi', line: 'zentia', sizeCasa: '250 mL', useDescription: 'Prevención de mancha negra y oídio.' },
    ],
    includes: [
      '3 productos para temporada completa',
      'Aspersor foliar de 1 L',
      'Guía de poda para floración óptima',
    ],
    howToUse: [
      '3 semanas antes de floración esperada: BP Fioré 0.5 g/L foliar.',
      'En floración: BP Potasio 2 mL/L foliar cada 3 semanas.',
      'Preventivo Zen-Fungi 2 mL/L cada 2 semanas en temporada de humedad.',
    ],
    bestFor: [
      'Rosales híbridos de té',
      'Rosales trepadores',
      'Colecciones de exhibición',
    ],
  },
  // ═════════════════════════════════════════ ÁREAS VERDES ══════════════════
  {
    slug: 'programa-campo-golf',
    name: 'Programa Campo de Golf',
    category: 'areas-verdes',
    shortDescription:
      'Protocolo B2B para green-keepers: greens, tees y fairways con calidad tournament.',
    longDescription:
      'Programa a medida para campos de golf basado en análisis de suelo, variedad de pasto y calendario de torneos. Requiere consulta previa con nuestro equipo técnico para diseñar el plan específico. Precio depende de hectareaje.',
    price: 0, // cotización
    coverage: 'Campos de golf · hectareaje variable · cotización personalizada',
    frequency: 'Programa semanal personalizado por green-keeper',
    emoji: '⛳',
    gradient: 'from-verde-800 to-verde-600',
    products: [
      { productId: 'n-ultra', name: 'N-Ultra (presentación 20 L)', line: 'nutricion', sizeCasa: '20 L', useDescription: 'Base nitrogenada mensual para todos los greens.' },
      { productId: 'bp-mix', name: 'BP Mix (20 L)', line: 'nutricion', sizeCasa: '20 L', useDescription: 'Color profundo y uniformidad visual.' },
      { productId: 'bp-nutri', name: 'BP Nutri (20 L)', line: 'organicos', sizeCasa: '20 L', useDescription: 'Resistencia a estrés de corte bajo y tráfico.' },
      { productId: 'zen-fungi', name: 'Zen-Fungi (20 L)', line: 'zentia', sizeCasa: '20 L', useDescription: 'Programa preventivo anti-dollar spot, pythium blight y brown patch.' },
    ],
    includes: [
      'Análisis de suelo inicial por laboratorio certificado',
      'Plan anual personalizado por zona (greens/tees/fairways/roughs)',
      'Capacitación al green-keeper',
      'Soporte técnico continuo por WhatsApp directo con agrónomo asignado',
      'Visitas técnicas trimestrales sin costo',
    ],
    howToUse: [
      'Agenda inicial: contacto con equipo técnico Biotiza.',
      'Auditoría de campo (1 día) con toma de muestras.',
      'Plan anual entregado en 15 días con calendario de aplicaciones.',
      'Ejecución por green-keeper con soporte continuo.',
    ],
    bestFor: [
      'Campos de golf competitivos',
      'Clubes con exigencia de estándar tournament',
      'Campos con presupuesto para programa integrado',
    ],
  },
  {
    slug: 'programa-parques-municipales',
    name: 'Programa Parques Municipales',
    category: 'areas-verdes',
    shortDescription:
      'Para gobiernos: áreas verdes urbanas saludables sin pesticidas químicos, seguros para familias y mascotas.',
    longDescription:
      'Nuestros productos Zentia son 100% biológicos y compatibles con reapertura inmediata al público. Ideales para parques, plazas, camellones y zonas escolares donde los pesticidas químicos son un riesgo político y sanitario.',
    price: 0, // cotización
    coverage: 'Parques municipales · programa anual por convocatoria',
    frequency: 'Programa mensual',
    emoji: '🏛️',
    gradient: 'from-slate-700 to-gris-600',
    products: [
      { productId: 'bp-nutri', name: 'BP Nutri', line: 'organicos', sizeCasa: '20 L tambo', useDescription: 'Estimulación natural, sin nitrógeno de síntesis.' },
      { productId: 'zen-fungi', name: 'Zen-Fungi', line: 'zentia', sizeCasa: '20 L tambo', useDescription: 'Bioprotección familiar-compatible (sin restricción de acceso).' },
      { productId: 'zen-chrys', name: 'Zen-Chrys', line: 'zentia', sizeCasa: '20 L tambo', useDescription: 'Control biológico de insectos sin impacto en polinizadores.' },
    ],
    includes: [
      'Atención a licitaciones públicas',
      'Cumplimiento NOM y regulaciones municipales',
      'Capacitación a operadores',
      'Reportes trimestrales de aplicación',
    ],
    howToUse: [
      'Contacto con nuestro equipo de ventas institucionales.',
      'Armado de propuesta según especificaciones de licitación.',
      'Entrega + capacitación + reportes.',
    ],
    bestFor: [
      'Gobiernos municipales',
      'Fideicomisos de áreas verdes',
      'Parques nacionales y áreas protegidas',
    ],
  },
]

export function getPackageBySlug(slug: string): GardenPackage | undefined {
  return GARDEN_PACKAGES.find((p) => p.slug === slug)
}

export function getPackagesByCategory(cat: GardenCategory): GardenPackage[] {
  return GARDEN_PACKAGES.filter((p) => p.category === cat)
}

export function getFeaturedPackages(): GardenPackage[] {
  return GARDEN_PACKAGES.filter((p) => p.badge).slice(0, 4)
}
