/**
 * articles.ts — Artículos de Academia Biotiza
 *
 * Contenido educativo estructurado como bloques tipados (p, h2, h3, ul, quote,
 * table). Cada artículo tiene slug, metadata para SEO, y referencias a
 * productos del catálogo cuando aplica.
 */

export type ArticleCategory =
  | 'bioestimulacion'
  | 'nutricion'
  | 'bioproteccion'
  | 'cultivo'
  | 'fertirrigacion'

export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string; id?: string }
  | { type: 'h3'; text: string; id?: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'callout'; variant: 'info' | 'warn' | 'success'; title: string; text: string }
  | { type: 'product-ref'; slug: string; line: string; note: string }

export interface Article {
  slug: string
  title: string
  excerpt: string
  category: ArticleCategory
  categoryLabel: string
  readTime: number
  publishedAt: string
  updatedAt?: string
  author: { name: string; role: string }
  emoji: string
  imageGradient: string
  tags: string[]
  blocks: ArticleBlock[]
  relatedProducts?: { slug: string; line: string }[]
}

const CAT_COLORS: Record<ArticleCategory, { bg: string; text: string; ring: string }> = {
  bioestimulacion: { bg: 'bg-naranja-50',  text: 'text-naranja-600', ring: 'ring-naranja-100' },
  nutricion:       { bg: 'bg-verde-50',    text: 'text-verde-700',   ring: 'ring-verde-100'   },
  bioproteccion:   { bg: 'bg-azul-50',     text: 'text-azul-700',    ring: 'ring-azul-100'    },
  cultivo:         { bg: 'bg-gris-100',    text: 'text-gris-700',    ring: 'ring-gris-200'    },
  fertirrigacion:  { bg: 'bg-verde-50',    text: 'text-verde-700',   ring: 'ring-verde-100'   },
}

export function getCategoryStyle(cat: ArticleCategory) {
  return CAT_COLORS[cat]
}

// ─── Artículos ───────────────────────────────────────────────────────────

export const ARTICLES: Article[] = [
  {
    slug: 'que-son-bioestimulantes',
    title: '¿Qué son los bioestimulantes y cómo benefician tu cultivo?',
    excerpt:
      'Los bioestimulantes son el futuro de la agricultura de precisión. Descubre cómo las citoquininas, auxinas y aminoácidos pueden transformar tu rendimiento.',
    category: 'bioestimulacion',
    categoryLabel: 'Bioestimulación',
    readTime: 6,
    publishedAt: '2026-02-14',
    updatedAt: '2026-04-02',
    author: { name: 'Dra. Laura Méndez', role: 'Agrónoma · I+D Biotiza' },
    emoji: '✨',
    imageGradient: 'from-naranja-600 to-naranja-400',
    tags: ['bioestimulantes', 'fisiología vegetal', 'hormonas', 'aminoácidos'],
    blocks: [
      {
        type: 'p',
        text: 'Un bioestimulante es un producto que contiene sustancias o microorganismos cuya función, al aplicarse en plantas o en la rizosfera, es estimular procesos naturales para mejorar la absorción de nutrientes, la tolerancia al estrés y la calidad del cultivo. A diferencia de un fertilizante, no nutre directamente: activa la maquinaria metabólica de la planta.',
      },
      { type: 'h2', text: 'Las cinco familias reconocidas por EBIC', id: 'familias' },
      {
        type: 'ul',
        items: [
          'Ácidos húmicos y fúlvicos — mejoran estructura de suelo y absorción radicular',
          'Aminoácidos y péptidos — ahorran energía de síntesis proteica en etapas críticas',
          'Extractos de algas (Ascophyllum, Ecklonia) — citoquininas y betaínas naturales',
          'Microorganismos benéficos (Trichoderma, Bacillus, micorrizas)',
          'Sustancias inorgánicas bioactivas — silicio, selenio en trazas',
        ],
      },
      { type: 'h2', text: '¿Cuándo aplicar cada familia?', id: 'cuando-aplicar' },
      {
        type: 'p',
        text: 'El timing lo es todo. En trasplante y recuperación de estrés, los aminoácidos libres tipo L-α son prioritarios porque la planta necesita construir enzimas y clorofila rápido. En floración y cuajado, citoquininas y giberelinas dirigen la diferenciación de yemas. Para llenado y calibre, potasio combinado con bioestimulantes de origen algal empujan el engorde.',
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'Regla práctica',
        text: 'Un bioestimulante no reemplaza una buena nutrición base. Funciona como multiplicador de eficiencia: si la planta tiene hambre, primero aliméntala.',
      },
      { type: 'h2', text: 'Beneficios medibles', id: 'beneficios' },
      {
        type: 'ol',
        items: [
          'Incremento de 8–22 % en rendimiento por hectárea',
          'Reducción de 15–30 % en aborto floral bajo estrés térmico',
          'Mejor uniformidad de calibre y menos descarte en empaque',
          'Mejor tolerancia a heladas, salinidad y déficit hídrico',
          'Recuperación más rápida post-aplicación de fitosanitarios',
        ],
      },
      { type: 'h2', text: 'Errores frecuentes', id: 'errores' },
      {
        type: 'p',
        text: 'Mezclar bioestimulantes con fungicidas cúpricos oxidantes sin verificar compatibilidad puede degradar los aminoácidos. Aplicar citoquininas en exceso durante floración genera sobre-cuajado y frutos pequeños. Y usar extracto de algas al mediodía en verano con alta radiación destruye parte de las hormonas activas: mejor en fresco, temprano.',
      },
      {
        type: 'quote',
        text: 'El bioestimulante es como el coach de un atleta: no corre la carrera, pero decide si la gana.',
        author: 'Dr. Patrick du Jardin, Universidad de Lieja',
      },
    ],
    relatedProducts: [
      { slug: 'bp-aminofort', line: 'bioestimulantes' },
      { slug: 'bp-algamar', line: 'bioestimulantes' },
    ],
  },
  {
    slug: 'deficiencia-calcio-tomate',
    title: 'Guía completa: deficiencia de calcio en tomate',
    excerpt:
      'Bitter pit, blossom end rot, rajaduras… La deficiencia de calcio cuesta millones. Aprende a identificarla, prevenirla y corregirla a tiempo.',
    category: 'nutricion',
    categoryLabel: 'Nutrición',
    readTime: 9,
    publishedAt: '2026-01-27',
    author: { name: 'Ing. Rodrigo Alcaraz', role: 'Agrónomo Senior · Cultivos de exportación' },
    emoji: '🍅',
    imageGradient: 'from-verde-700 to-verde-500',
    tags: ['tomate', 'calcio', 'pudrición apical', 'nutrición mineral'],
    blocks: [
      {
        type: 'p',
        text: 'El calcio es el nutriente más subestimado en tomate de exportación. No es un macronutriente aparente en los análisis foliares rutinarios, y sin embargo su deficiencia en el fruto causa entre el 5 % y el 20 % de descarte en campañas intensivas. El síntoma estrella es la pudrición apical — blossom end rot — pero los daños silenciosos son mucho mayores.',
      },
      { type: 'h2', text: 'Por qué falla el calcio aunque el suelo tenga', id: 'por-que-falla' },
      {
        type: 'p',
        text: 'El calcio se mueve casi exclusivamente por xilema, jalado por la transpiración. Cualquier factor que reduzca el flujo de agua hacia el fruto — estrés hídrico, altas temperaturas, exceso de N, conductividad eléctrica alta, raíces dañadas — cortará el suministro de calcio al fruto. Puedes tener calcio de sobra en el suelo y aun así desarrollar blossom end rot.',
      },
      { type: 'h2', text: 'Diagnóstico visual por etapa', id: 'diagnostico' },
      {
        type: 'h3',
        text: 'Fase vegetativa',
      },
      {
        type: 'ul',
        items: [
          'Hojas jóvenes deformadas y con bordes necróticos ("hook shape")',
          'Ápice de brote de crecimiento retardado o muerto',
          'Raíces secundarias gruesas y cortas',
        ],
      },
      { type: 'h3', text: 'Floración y cuajado' },
      {
        type: 'ul',
        items: [
          'Caída prematura de flores',
          'Aborto de frutos pequeños en la parte distal',
          'Deformaciones en cuello del fruto',
        ],
      },
      { type: 'h3', text: 'Llenado y maduración' },
      {
        type: 'ul',
        items: [
          'Blossom end rot: mancha húmeda parda-negra en zona estilar',
          'Rajaduras radiales y concéntricas',
          'Frutos blandos y de vida post-cosecha corta',
        ],
      },
      { type: 'h2', text: 'Protocolo preventivo', id: 'protocolo' },
      {
        type: 'callout',
        variant: 'success',
        title: 'Programa recomendado Biotiza',
        text: 'Calcio BP quelatado vía fertirrigación semanal + foliar de calcio-boro cada 10 días durante cuajado y llenado. En golpe de calor, añadir aminoácidos y osmoprotector.',
      },
      {
        type: 'ol',
        items: [
          'Mantén humedad constante en el bulbo radicular — nunca dejes que el cultivo estrese',
          'Limita la conductividad eléctrica del riego: por encima de 3.5 mS/cm el calcio compite con K/Mg',
          'Baja el nitrógeno amoniacal: el NH4+ antagoniza el Ca²⁺',
          'Foliar de Ca-B en tres tiempos: primeros racimos, llenado, pre-cosecha',
          'Si hay síntomas agudos: drench de calcio quelatado 2.5 L/ha inmediato',
        ],
      },
      { type: 'h2', text: 'Cuándo el foliar NO resuelve', id: 'limites-foliar' },
      {
        type: 'p',
        text: 'El calcio aplicado en foliar casi no se transloca al fruto — se queda en la hoja. Por eso el foliar sirve para mantener hojas sanas que jalen agua, pero no suple calcio directo al fruto. La solución sostenible es corregir la zona radicular. El calcio en drench y fertirrigación es el que llega al xilema.',
      },
      {
        type: 'quote',
        text: 'No existe tal cosa como “aplicar calcio para curar blossom end rot”. Lo que existe es corregir el desequilibrio hídrico y nutricional que lo causó.',
        author: 'Dr. Marc van Iersel, University of Georgia',
      },
    ],
    relatedProducts: [
      { slug: 'bp-calcio', line: 'organicos' },
      { slug: 'ultra-calcio-boro', line: 'nutricion' },
    ],
  },
  {
    slug: 'bioproteccion-vs-quimicos',
    title: 'Bioprotección vs. químicos: la tercera vía',
    excerpt:
      'No tienes que elegir entre eficacia y sostenibilidad. Conoce cómo integrar bioinsecticidas y biofungicidas en tu programa sin sacrificar resultado.',
    category: 'bioproteccion',
    categoryLabel: 'Bioprotección',
    readTime: 7,
    publishedAt: '2026-03-05',
    author: { name: 'M.C. Andrea Figueroa', role: 'Especialista en MIP · Zentia' },
    emoji: '🛡️',
    imageGradient: 'from-azul-700 to-azul-500',
    tags: ['control biológico', 'MIP', 'Zentia', 'residuos', 'exportación'],
    blocks: [
      {
        type: 'p',
        text: 'La dicotomía bioprotección-química dejó de ser real hace una década. Los programas que ganan mercados de exportación combinan ambas estrategias con criterio: el biológico como columna vertebral, el químico como corrección quirúrgica. La clave está en la secuencia, la rotación y los intervalos pre-cosecha.',
      },
      { type: 'h2', text: 'Tres razones para que tu programa sea biológico primero', id: 'razones' },
      {
        type: 'ol',
        items: [
          'Residuos: EU MRL reduce LMR cada año. Un programa biológico-primero entra a Europa sin sobresaltos.',
          'Resistencia: las poblaciones de Tuta, mosquita blanca y trips se adaptan a moléculas químicas en 3–5 campañas. A los biológicos de modo múltiple, no.',
          'Polinizadores y auxiliares: los abejorros y las crisopas no sobreviven a un programa piretroide semanal.',
        ],
      },
      { type: 'h2', text: 'Biológicos con evidencia que funciona', id: 'evidencia' },
      {
        type: 'p',
        text: 'No todo lo que se vende como "biológico" tiene datos. Lo que sí tiene investigación robusta en campo mexicano:',
      },
      {
        type: 'ul',
        items: [
          'Beauveria bassiana (hongo entomopatógeno) — mosquita blanca, trips, paratrioza',
          'Metarhizium anisopliae — picudo del chile, gallina ciega, larvas de escarabajo',
          'Trichoderma harzianum — antagonista de Fusarium, Rhizoctonia, Pythium',
          'Bacillus thuringiensis subsp. kurstaki — lepidópteros en general',
          'Bacillus subtilis — biofungicida foliar, complementa rotación con químicos',
          'Nematodos entomopatógenos (Steinernema) — gallina ciega, picudo en aguacate',
        ],
      },
      {
        type: 'callout',
        variant: 'warn',
        title: 'Mezclas que matan al biológico',
        text: 'Cúpricos oxidantes (oxicloruro de cobre), azufres, y fungicidas del grupo benzimidazoles dañan la viabilidad de hongos entomopatógenos. Siempre separa aplicaciones mínimo 72 h.',
      },
      { type: 'h2', text: 'Programa MIP de referencia en tomate', id: 'programa-tomate' },
      {
        type: 'ol',
        items: [
          'Trasplante–floración: Trichoderma en drench cada 15 días + Beauveria foliar preventivo',
          'Inicio de cuajado: aplicación dirigida de Bacillus subtilis si hay humedad foliar',
          'Llenado: Metarhizium si aparece mosca, rotando con Beauveria para evitar tolerancia',
          'Si la presión excede umbral: químico selectivo compatible con auxiliares (p.e., spiromesifen para mosca)',
          'Pre-cosecha 14 días: suspender todo químico, mantener solo biológicos OMRI',
        ],
      },
      { type: 'h2', text: 'ROI del programa biológico', id: 'roi' },
      {
        type: 'p',
        text: 'El mito de que "lo biológico cuesta más" solo aplica si lo ves por aplicación aislada. Por hectárea completa de ciclo, el programa biológico-primero cuesta entre un 10 % menos y un 15 % más que el químico tradicional. Pero el valor del producto se incrementa 20–40 % por certificación orgánica o residuo-cero, y el descarte por rechazo en destino cae a la mitad.',
      },
    ],
    relatedProducts: [
      { slug: 'zentia-beauveria', line: 'zentia' },
      { slug: 'zentia-metarhizium', line: 'zentia' },
      { slug: 'zentia-trichoderma', line: 'zentia' },
    ],
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug)
}

export function getArticlesByCategory(cat: ArticleCategory): Article[] {
  return ARTICLES.filter((a) => a.category === cat)
}

export function getLatestArticles(limit: number): Article[] {
  return [...ARTICLES]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, limit)
}
