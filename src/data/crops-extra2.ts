/**
 * crops-extra2.ts — Segundo lote de protocolos fenológicos (mayo 2026)
 *
 * 13 cultivos:
 *  Plátano · Papaya · Sandía · Arroz · Calabaza · Trigo · Sorgo ·
 *  Alfalfa · Manzana · Uva · Nuez · Mango · Flores
 *
 * Cada protocolo se basa en agronomía de cultivo real (INIFAP, FAO,
 * UC Davis, SAGARPA) y usa exclusivamente productos del catálogo Biotiza
 * (slugs verificados contra src/data/products.ts a mayo 2026).
 */

import type { FullCropProtocol } from './crops'

// ════════════════════════════════════════════════════════════════════════
// PLÁTANO
// ════════════════════════════════════════════════════════════════════════

const PLATANO: FullCropProtocol = {
  id: 'platano', slug: 'platano', name: 'Plátano', scientific_name: 'Musa × paradisiaca',
  emoji: '🍌', gradient: 'from-yellow-600 to-lime-500', accentColor: '#ca8a04',
  description: 'Cultivo perenne tropical de altísima demanda de potasio (es el nutriente más extraído por tonelada de fruta). El programa debe sostener emisión foliar constante, llenado de dedos y manejo preventivo de Sigatoka negra y picudo negro.',
  cycle_days: 365,
  season: 'Producción continua todo el año en trópico húmedo',
  regions: ['Chiapas', 'Tabasco', 'Veracruz', 'Colima', 'Michoacán', 'Nayarit'],
  featured_products: ['k-ultra', 'bp-potasio', 'bp-koren', 'zen-fungi', 'max-kill-plus'],
  common_challenges: ['Sigatoka negra (Mycosphaerella fijiensis)', 'Picudo negro (Cosmopolites sordidus)', 'Nematodos', 'Mal de Panamá (Fusarium R4T)', 'Deficiencia de potasio y magnesio'],
  stages: [
    {
      id: 'establecimiento', name: 'Establecimiento del hijuelo', emoji: '🌱',
      durationDays: 60, objective: 'Lograr prendimiento del hijuelo o vitroplanta y un sistema radicular sano libre de nematodos.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'bp-koren', productName: 'BP Koren', line: 'organicos', dose: '3 mL/L', method: 'Drench', frequency: 'Al plantar + días 20, 40', notes: 'Enraizador concentrado para colonizar suelo rápido en zona de alta humedad' },
        { productId: 'biotiza-lactobacillus', productName: 'Biotiza Lactobacillus', line: 'especialidades', dose: '2 g/L', method: 'Drench', frequency: 'Al plantar + 30 días', notes: 'Microbiota benéfica que compite con Fusarium en rizosfera' },
        { productId: 'nemapro', productName: 'Nemapro', line: 'bioproteccion', dose: '4 L/ha', method: 'Drench al cepellón', frequency: 'Al plantar + 45 días', notes: 'Bionematicida preventivo: el nematodo barrenador es puerta de entrada de Fusarium', isProtection: true },
      ],
    },
    {
      id: 'crecimiento-foliar', name: 'Crecimiento foliar', emoji: '🌿',
      durationDays: 150, objective: 'Maximizar emisión de hojas funcionales (área foliar) que alimentarán el racimo. Cada hoja sana = más dedos llenos.',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '8 L/ha', method: 'Fertirrigación', frequency: 'Cada 15 días', notes: 'N alto sostiene la emisión foliar continua' },
        { productId: 'mg-ultra', productName: 'Mg-Ultra', line: 'nutricion', dose: '3 L/ha', method: 'Fertirrigación', frequency: 'Mensual', notes: 'El plátano sufre clorosis de Mg muy frecuente en suelos lixiviados de trópico' },
        { productId: 'bp-nutri', productName: 'BP Nutri', line: 'organicos', dose: '2 mL/L', method: 'Foliar', frequency: 'Cada 21 días', notes: 'Algas + micros para vigor de hoja bandera' },
        { productId: 'zen-fungi', productName: 'Zen-Fungi', line: 'bioproteccion', dose: '2.5 mL/L', method: 'Aspersión foliar', frequency: 'Cada 14 días en lluvias', notes: 'Manejo preventivo de Sigatoka negra — rotar con manejo cultural de deshoje', isProtection: true },
      ],
    },
    {
      id: 'floracion-racimo', name: 'Floración y formación de racimo', emoji: '🌸',
      durationDays: 90, objective: 'Asegurar buena diferenciación de la inflorescencia y cuajado uniforme de manos.',
      color: 'bg-pink-100', textColor: 'text-pink-700',
      products: [
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '12 L/ha', method: 'Fertirrigación', frequency: 'Cada 10 días', notes: 'K es EL nutriente del plátano: define peso del racimo y grosor del dedo' },
        { productId: 'bp-boro', productName: 'BP Boro', line: 'especialidades', dose: '0.5 mL/L', method: 'Foliar', frequency: 'Al diferenciar bellota', notes: 'B clave para llenado uniforme de manos y evitar deformaciones' },
        { productId: 'max-kill-plus', productName: 'Max-Kill Plus', line: 'bioproteccion', dose: '2.5 mL/L', method: 'Aspersión a pseudotallo', frequency: 'Cada 30 días', notes: 'Control biológico del picudo negro — monitorear con trampas de feromona', isProtection: true },
      ],
    },
    {
      id: 'llenado-cosecha', name: 'Llenado de dedos y cosecha', emoji: '🍌',
      durationDays: 80, objective: 'Maximizar calibre y grado del dedo para cumplir estándar de exportación (calibre y longitud).',
      color: 'bg-yellow-100', textColor: 'text-yellow-700',
      products: [
        { productId: 'bp-potasio', productName: 'BP Potasio', line: 'organicos', dose: '4 mL/L', method: 'Foliar al racimo', frequency: 'Cada 15 días', notes: 'Refuerzo de K orgánico durante el llenado para grado de exportación' },
        { productId: 'bp-gross', productName: 'BP Gross', line: 'bioestimulantes', dose: '1 g/L', method: 'Foliar', frequency: 'A los 30 y 50 días post-floración', notes: 'Engordador: incrementa calibre del dedo, factor directo del precio' },
        { productId: 'ae-calcium', productName: 'AE Calcium', line: 'organicos', dose: '2.5 mL/L', method: 'Foliar al racimo', frequency: '20 días pre-corte', notes: 'Ca refuerza vida verde y resistencia al transporte refrigerado' },
      ],
    },
  ],
}

// ════════════════════════════════════════════════════════════════════════
// PAPAYA
// ════════════════════════════════════════════════════════════════════════

const PAPAYA: FullCropProtocol = {
  id: 'papaya', slug: 'papaya', name: 'Papaya', scientific_name: 'Carica papaya',
  emoji: '🫐', gradient: 'from-orange-600 to-amber-500', accentColor: '#ea580c',
  description: 'Frutal de ciclo rápido y producción continua (Maradol para exportación). Demanda alta de Ca y B para evitar el "espinazo" y bumpy fruit, y manejo preventivo del virus de la mancha anular (PRSV) vía control de áfidos.',
  cycle_days: 300,
  season: 'Trasplante todo el año en trópico; cosecha desde el mes 8',
  regions: ['Chiapas', 'Veracruz', 'Oaxaca', 'Colima', 'Michoacán', 'Yucatán'],
  featured_products: ['bp-calcio', 'biotiza-calcio-boro', 'bp-koren', 'k-ultra', 'agb-lecanii-green'],
  common_challenges: ['Virus de la mancha anular (PRSV)', 'Ácaro blanco y araña roja', 'Antracnosis', 'Pudrición de raíz por Phytophthora', 'Deformación de fruto por deficiencia de B'],
  stages: [
    {
      id: 'vivero-trasplante', name: 'Vivero y trasplante', emoji: '🌱',
      durationDays: 45, objective: 'Plántula vigorosa con raíz sana y arraigo rápido en sitio definitivo.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'bp-koren', productName: 'BP Koren', line: 'organicos', dose: '2 mL/L', method: 'Drench', frequency: 'Al trasplante + días 10, 20', notes: 'Arraigo rápido reduce el shock y acorta el ciclo a primera flor' },
        { productId: 'p-ultra', productName: 'P-Ultra', line: 'nutricion', dose: '1 L/ha', method: 'Fertirrigación', frequency: 'Días 1, 15, 30', notes: 'P crítico para volumen radicular inicial' },
        { productId: 'agb-elicitor-sin', productName: 'ELICITOR-SIN®', line: 'bioproteccion', dose: '2 g/L', method: 'Drench', frequency: 'Al trasplante + 30 días', notes: 'Trichoderma antagonista de Phytophthora en suelo húmedo', isProtection: true },
      ],
    },
    {
      id: 'crecimiento', name: 'Crecimiento vegetativo', emoji: '🌿',
      durationDays: 90, objective: 'Construir tallo grueso y dosel foliar amplio antes de la floración temprana (mes 3-4).',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '5 L/ha', method: 'Fertirrigación', frequency: 'Semanal', notes: 'Crecimiento muy rápido: alta demanda de N en esta fase' },
        { productId: 'bp-mix', productName: 'BP Mix', line: 'nutricion', dose: '1.5 L/ha', method: 'Fertirrigación', frequency: 'Cada 14 días', notes: 'Micros completos para metabolismo acelerado' },
        { productId: 'agb-lecanii-green', productName: 'LECANII GREEN®', line: 'bioproteccion', dose: '2 mL/L', method: 'Aspersión', frequency: 'Preventivo cada 10 días', notes: 'Control de áfidos vectores del PRSV — clave: el virus no tiene cura, solo prevención', isProtection: true },
      ],
    },
    {
      id: 'floracion-cuajado', name: 'Floración y cuajado', emoji: '🌸',
      durationDays: 75, objective: 'Cuajado continuo y uniforme con fruto bien conformado (sin "carpeloidía" ni deformación).',
      color: 'bg-pink-100', textColor: 'text-pink-700',
      products: [
        { productId: 'biotiza-calcio-boro', productName: 'Biotiza Calcio Boro', line: 'especialidades', dose: '2 mL/L', method: 'Foliar', frequency: 'Cada 15 días desde inicio de flor', notes: 'Ca+B juntos: base contra deformación de fruto y caída de flor' },
        { productId: 'bp-fiore', productName: 'BP Fioré', line: 'bioestimulantes', dose: '1 g/L', method: 'Foliar', frequency: 'Inicio de floración + 15 días', notes: 'Mejora amarre floral continuo en papaya' },
        { productId: 'zen-spider', productName: 'Zen-Spider', line: 'bioproteccion', dose: '2 mL/L', method: 'Aspersión', frequency: 'Cada 10 días en seca', notes: 'Ácaro blanco deforma fruto joven — controlar antes de cuajado', isProtection: true },
      ],
    },
    {
      id: 'llenado-cosecha', name: 'Llenado y cosecha', emoji: '🏆',
      durationDays: 90, objective: 'Maximizar tamaño, °Brix y firmeza para tránsito a EUA/Canadá.',
      color: 'bg-orange-100', textColor: 'text-orange-700',
      products: [
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '8 L/ha', method: 'Fertirrigación', frequency: 'Semanal', notes: 'K define dulzor y color de pulpa de la Maradol' },
        { productId: 'bp-calcio', productName: 'BP Calcio', line: 'organicos', dose: '3 mL/L', method: 'Foliar al fruto', frequency: 'Cada 15 días', notes: 'Ca firmeza de pulpa y mayor vida de anaquel post-cosecha' },
        { productId: 'bp-fresh', productName: 'BP Fresh', line: 'bioestimulantes', dose: '1 mL/L', method: 'Foliar al fruto', frequency: '10 días pre-corte', notes: 'Reduce carga de antracnosis latente en cáscara — clave para exportación', isProtection: true },
      ],
    },
  ],
}

// ════════════════════════════════════════════════════════════════════════
// SANDÍA
// ════════════════════════════════════════════════════════════════════════

const SANDIA: FullCropProtocol = {
  id: 'sandia', slug: 'sandia', name: 'Sandía', scientific_name: 'Citrullus lanatus',
  emoji: '🍉', gradient: 'from-green-700 to-red-500', accentColor: '#16a34a',
  description: 'Cucurbitácea de ciclo corto (80-95 días) muy sensible al manejo de riego y al equilibrio K/Ca durante el llenado. El éxito comercial depende del calibre, Brix y de un manejo estricto de mosca blanca (vector de virus) y mildiú.',
  cycle_days: 90,
  season: 'Ciclo primavera-verano y otoño-invierno en el noroeste',
  regions: ['Sonora', 'Sinaloa', 'Jalisco', 'Nayarit', 'Veracruz', 'Chihuahua'],
  featured_products: ['k-ultra', 'bp-koren', 'bp-cuaje', 'bp-gross', 'zen-chrys'],
  common_challenges: ['Mosca blanca (vector de geminivirus)', 'Mildiú y cenicilla', 'Fusarium del melón/sandía', 'Rajadura de fruto por desbalance hídrico', 'Bajo Brix por exceso de N'],
  stages: [
    {
      id: 'siembra-establecimiento', name: 'Siembra y establecimiento', emoji: '🌱',
      durationDays: 18, objective: 'Emergencia uniforme y raíz pivotante fuerte para soportar la alta demanda hídrica posterior.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'bp-koren', productName: 'BP Koren', line: 'organicos', dose: '2 mL/L', method: 'Drench', frequency: 'Al trasplante y a los 10 días', notes: 'Sistema radicular profundo es seguro contra estrés hídrico de verano' },
        { productId: 'p-ultra', productName: 'P-Ultra', line: 'nutricion', dose: '1.5 L/ha', method: 'Fertirrigación', frequency: 'Días 1, 7, 14', notes: 'P arranca el desarrollo radicular y de guía' },
        { productId: 'zen-chrys', productName: 'Zen-Chrys', line: 'bioproteccion', dose: '1.5 mL/L', method: 'Aspersión', frequency: 'Preventivo cada 7 días', notes: 'Mosca blanca temprana = virus: prevención desde plántula', isProtection: true },
        { productId: 'max-kill-plus', productName: 'Max-Kill Plus', line: 'bioproteccion', dose: '2.5 mL/L', method: 'Aspersión', frequency: 'Cada 5-7 días en pico de infestación', notes: 'Rotación de modo de acción contra mosca blanca: 5 activos en sinergia (piretro + ajo + canela + neem + mostaza) · per catálogo recommended_dose foliar 2-3 mL/L · máx 3 aplicaciones consecutivas', isProtection: true },
      ],
    },
    {
      id: 'guia-vegetativo', name: 'Desarrollo de guía', emoji: '🌿',
      durationDays: 22, objective: 'Construir guía vigorosa y dosel suficiente para sostener la carga de fruto.',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '4 L/ha', method: 'Fertirrigación', frequency: '2 veces/semana', notes: 'N moderado: el exceso retrasa floración y baja Brix' },
        { productId: 'vgn-brotanic', productName: 'BROTANIC', line: 'nutricion', dose: '1.5 → 2.0 L / 200 L agua', method: 'Foliar', frequency: '2 aplicaciones escalonadas', notes: 'Genera nuevos haces vasculares → mayor flujo de savia y mejor asimilación de nutrientes y fitosanitarios; brotación sin hormonas' },
        { productId: 'zen-fungi', productName: 'Zen-Fungi', line: 'bioproteccion', dose: '2 mL/L', method: 'Aspersión', frequency: 'Cada 10 días', notes: 'Preventivo de mildiú y cenicilla en follaje denso', isProtection: true },
      ],
    },
    {
      id: 'floracion-cuajado', name: 'Floración y amarre', emoji: '🌸',
      durationDays: 20, objective: 'Maximizar amarre de fruto en las primeras flores femeninas (las que dan mejor calibre).',
      color: 'bg-pink-100', textColor: 'text-pink-700',
      products: [
        { productId: 'bp-cuaje', productName: 'BP Cuaje', line: 'bioestimulantes', dose: '2 mL/L', method: 'Foliar', frequency: 'Inicio de flor + 7 días', notes: 'Mejora amarre de las primeras flores — clave para uniformidad de corte' },
        { productId: 'bp-boro', productName: 'BP Boro', line: 'especialidades', dose: '0.4 mL/L', method: 'Foliar', frequency: 'Pre-floración y plena flor', notes: 'B mejora viabilidad de polen y cuajado' },
        { productId: 'biotiza-calcio-boro', productName: 'Biotiza Calcio Boro', line: 'especialidades', dose: '2 mL/L', method: 'Foliar', frequency: 'Al inicio de cuajado', notes: 'Previene rajadura y mejora pared del fruto joven' },
      ],
    },
    {
      id: 'llenado-cosecha', name: 'Llenado y cosecha', emoji: '🍉',
      durationDays: 30, objective: 'Calibre comercial + Brix >11° con cáscara firme para transporte.',
      color: 'bg-red-100', textColor: 'text-red-700',
      products: [
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '10 L/ha', method: 'Fertirrigación', frequency: 'Cada 5 días', notes: 'K es el motor del Brix y el color rojo de pulpa' },
        { productId: 'bp-gross', productName: 'BP Gross', line: 'bioestimulantes', dose: '1 g/L', method: 'Foliar', frequency: '15 y 25 días post-amarre', notes: 'Engordador para alcanzar calibre de exportación' },
        { productId: 'ae-calcium', productName: 'AE Calcium', line: 'organicos', dose: '2 mL/L', method: 'Foliar', frequency: 'Cada 10 días en llenado', notes: 'Ca evita rajadura y corazón hueco; mejora transporte' },
      ],
    },
  ],
}

// ════════════════════════════════════════════════════════════════════════
// ARROZ
// ════════════════════════════════════════════════════════════════════════

const ARROZ: FullCropProtocol = {
  id: 'arroz', slug: 'arroz', name: 'Arroz', scientific_name: 'Oryza sativa',
  emoji: '🌾', gradient: 'from-lime-600 to-green-500', accentColor: '#65a30d',
  description: 'Cereal de inundación donde el manejo fraccionado de nitrógeno define el macollamiento y el número de panículas. El programa prioriza arraigue, macollaje, llenado de grano y manejo de sogata/hoja blanca.',
  cycle_days: 130,
  season: 'Ciclo primavera-verano (temporal) y otoño-invierno (riego)',
  regions: ['Campeche', 'Veracruz', 'Nayarit', 'Michoacán', 'Tabasco', 'Morelos'],
  featured_products: ['n-ultra', 'k-ultra', 'bp-zinc', 'bp-koren', 'zen-chrys'],
  common_challenges: ['Sogata (vector del virus de la hoja blanca)', 'Añublo del arroz (Pyricularia)', 'Deficiencia de zinc en suelos inundados', 'Acame por exceso de N', 'Vaneamiento de grano'],
  stages: [
    {
      id: 'establecimiento', name: 'Establecimiento y amacolle inicial', emoji: '🌱',
      durationDays: 30, objective: 'Plántula bien anclada y arranque del macollamiento; corregir el Zn que se bloquea en suelo inundado.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'bp-koren', productName: 'BP Koren', line: 'organicos', dose: '1 L/ha', method: 'Fertirrigación', frequency: 'A los 12 y 25 días', notes: 'Estimula raíz en suelo saturado y reduce estrés de inundación' },
        { productId: 'bp-zinc', productName: 'BP Zinc', line: 'nutricion', dose: '1 L/ha', method: 'Fertirrigación / Foliar', frequency: 'A los 15 días', notes: 'La deficiencia de Zn es el problema #1 del arroz inundado ("khaira")' },
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '4 L/ha', method: 'Fertirrigación', frequency: 'Primera fracción a los 20 días', notes: 'Primer tercio del N: arranque del macollamiento' },
      ],
    },
    {
      id: 'macollamiento', name: 'Macollamiento máximo', emoji: '🌿',
      durationDays: 35, objective: 'Maximizar número de tallos productivos (macollos) — define el potencial de panículas por m².',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '5 L/ha', method: 'Fertirrigación', frequency: 'Segunda fracción a los 40 días', notes: 'Segundo tercio de N en máximo macollaje' },
        { productId: 'bp-nutri', productName: 'BP Nutri', line: 'organicos', dose: '1.5 mL/L', method: 'Foliar', frequency: 'Cada 15 días', notes: 'Algas: tallos más gruesos, menor acame posterior' },
        { productId: 'zen-chrys', productName: 'Zen-Chrys', line: 'bioproteccion', dose: '1.5 mL/L', method: 'Aspersión', frequency: 'Al detectar sogata', notes: 'Sogata transmite el virus de la hoja blanca: controlar poblaciones temprano', isProtection: true },
      ],
    },
    {
      id: 'panoja', name: 'Embuche y panícula', emoji: '🌾',
      durationDays: 35, objective: 'Diferenciación de panícula con máximo número de espiguillas y prevención del añublo.',
      color: 'bg-yellow-100', textColor: 'text-yellow-700',
      products: [
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '6 L/ha', method: 'Fertirrigación', frequency: 'Inicio de embuche', notes: 'K fortalece tallo (anti-acame) y llena la panícula' },
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '3 L/ha', method: 'Fertirrigación', frequency: 'Tercera fracción al embuche', notes: 'Último tercio de N: número y peso de grano' },
        { productId: 'zen-fungi', productName: 'Zen-Fungi', line: 'bioproteccion', dose: '2.5 mL/L', method: 'Aspersión', frequency: 'Embuche y espigamiento', notes: 'Preventivo contra Pyricularia (añublo de cuello), la enfermedad más destructiva', isProtection: true },
      ],
    },
    {
      id: 'llenado-grano', name: 'Llenado y maduración', emoji: '🏆',
      durationDays: 30, objective: 'Llenado completo del grano, minimizando vaneamiento, hasta madurez de cosecha.',
      color: 'bg-amber-100', textColor: 'text-amber-700',
      products: [
        { productId: 'bp-potasio', productName: 'BP Potasio', line: 'organicos', dose: '3 mL/L', method: 'Foliar', frequency: 'Grano lechoso y pastoso', notes: 'K foliar reduce grano vano y mejora peso hectolítrico' },
        { productId: 'bp-mix', productName: 'BP Mix', line: 'nutricion', dose: '1 L/ha', method: 'Fertirrigación', frequency: 'Inicio de llenado', notes: 'Micros para fotosíntesis sostenida hasta madurez' },
      ],
    },
  ],
}

// ════════════════════════════════════════════════════════════════════════
// CALABAZA
// ════════════════════════════════════════════════════════════════════════

const CALABAZA: FullCropProtocol = {
  id: 'calabaza', slug: 'calabaza', name: 'Calabaza (de Castilla / pumpkin)', scientific_name: 'Cucurbita moschata / C. maxima',
  emoji: '🎃', gradient: 'from-orange-600 to-amber-500', accentColor: '#ea580c',
  description: 'Calabaza de fruto grande para pulpa, semilla (pepita) y mercado de temporada (calabaza de Castilla, kabocha, butternut, pumpkin). Ciclo medio con un solo fruto/planta de gran calibre que se cosecha maduro. Muy sensible a cenicilla, mosca blanca y a la pudrición apical por deficiencia de Ca. Para calabacita/zucchini de corte continuo, consulta el protocolo de Calabacín.',
  cycle_days: 110,
  season: 'Primavera-verano y otoño-invierno (noroeste y Bajío)',
  regions: ['Sonora', 'Sinaloa', 'Jalisco', 'Guanajuato', 'Zacatecas', 'Morelos'],
  featured_products: ['bp-koren', 'bp-cuaje', 'k-ultra', 'zen-chrys', 'zen-fungi'],
  common_challenges: ['Cenicilla polvosa (Podosphaera xanthii)', 'Mosca blanca y pulgón (vectores de virus)', 'Aborto floral por estrés térmico', 'Pudrición apical por deficiencia de Ca', 'Mildiú velloso'],
  stages: [
    {
      id: 'siembra', name: 'Siembra y emergencia', emoji: '🌱',
      durationDays: 18, objective: 'Emergencia pareja y raíz fuerte que sostenga una planta de guía larga y un fruto de gran calibre.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'bp-koren', productName: 'BP Koren', line: 'organicos', dose: '2 mL/L', method: 'Drench', frequency: 'Emergencia y a los 12 días', notes: 'Raíz profunda: la calabaza de fruto grande demanda mucha agua y nutrición' },
        { productId: 'p-ultra', productName: 'P-Ultra', line: 'nutricion', dose: '1.5 L/ha', method: 'Fertirrigación', frequency: 'Días 1, 10, 18', notes: 'P para volumen radicular y arranque vegetativo' },
        { productId: 'zen-chrys', productName: 'Zen-Chrys', line: 'bioproteccion', dose: '1.5 mL/L', method: 'Aspersión', frequency: 'Preventivo desde emergencia', notes: 'Mosca blanca y pulgón temprano transmiten virus que arruinan el ciclo', isProtection: true },
        { productId: 'max-kill-plus', productName: 'Max-Kill Plus', line: 'bioproteccion', dose: '2.5 mL/L', method: 'Aspersión', frequency: 'Cada 5-7 días en pico de infestación', notes: 'Rotación de modo de acción contra mosca blanca y pulgón: 5 activos en sinergia (piretro + ajo + canela + neem + mostaza) · per catálogo recommended_dose foliar 2-3 mL/L · máx 3 aplicaciones consecutivas', isProtection: true },
      ],
    },
    {
      id: 'vegetativo', name: 'Desarrollo de guía', emoji: '🌿',
      durationDays: 35, objective: 'Construir guía larga y dosel foliar amplio: la fábrica de azúcares que llenará el fruto grande.',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '5 L/ha', method: 'Fertirrigación', frequency: '2 veces/semana', notes: 'N sostiene la guía vigorosa — moderar al acercarse la floración' },
        { productId: 'bp-mix', productName: 'BP Mix', line: 'nutricion', dose: '1.5 L/ha', method: 'Fertirrigación', frequency: 'Cada 14 días', notes: 'Micros completos para fotosíntesis del dosel' },
        { productId: 'zen-fungi', productName: 'Zen-Fungi', line: 'bioproteccion', dose: '2 mL/L', method: 'Aspersión', frequency: 'Cada 10 días', notes: 'Preventivo de cenicilla — la enfermedad más limitante en calabaza', isProtection: true },
      ],
    },
    {
      id: 'floracion', name: 'Floración y amarre', emoji: '🌸',
      durationDays: 25, objective: 'Amarrar el fruto en la posición correcta de la guía y evitar aborto por estrés o mala polinización.',
      color: 'bg-yellow-100', textColor: 'text-yellow-700',
      products: [
        { productId: 'bp-fiore', productName: 'BP Fioré', line: 'bioestimulantes', dose: '1 g/L', method: 'Foliar', frequency: 'Inicio de floración', notes: 'Mejora proporción de flores femeninas y amarre del fruto principal' },
        { productId: 'bp-cuaje', productName: 'BP Cuaje', line: 'bioestimulantes', dose: '2 mL/L', method: 'Foliar', frequency: 'Inicio de flor + 10 días', notes: 'Asegura el amarre del fruto que se llevará a calibre comercial' },
        { productId: 'biotiza-calcio-boro', productName: 'Biotiza Calcio Boro', line: 'especialidades', dose: '2 mL/L', method: 'Foliar', frequency: 'Cada 12 días', notes: 'Ca+B contra pudrición apical y deformación del fruto joven' },
      ],
    },
    {
      id: 'llenado-maduracion', name: 'Llenado y maduración del fruto', emoji: '🎃',
      durationDays: 32, objective: 'Maximizar calibre, contenido de pulpa/pepita y curado de la cáscara para almacenamiento prolongado.',
      color: 'bg-orange-100', textColor: 'text-orange-700',
      products: [
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '8 L/ha', method: 'Fertirrigación', frequency: 'Semanal', notes: 'K es el motor del calibre, materia seca y color de pulpa del fruto grande' },
        { productId: 'bp-gross', productName: 'BP Gross', line: 'bioestimulantes', dose: '1 g/L', method: 'Foliar', frequency: '20 y 40 días post-amarre', notes: 'Engordador: maximiza peso del fruto, factor directo del rendimiento' },
        { productId: 'ae-calcium', productName: 'AE Calcium', line: 'organicos', dose: '2.5 mL/L', method: 'Foliar', frequency: 'Cada 12 días', notes: 'Ca cura la cáscara para resistir manejo y almacén de varios meses' },
        { productId: 'bp-fresh', productName: 'BP Fresh', line: 'bioestimulantes', dose: '1 mL/L', method: 'Foliar al fruto', frequency: '15 días pre-cosecha', notes: 'Sanitiza la superficie del fruto y reduce pudriciones en almacenamiento', isProtection: true },
      ],
    },
  ],
}

// ════════════════════════════════════════════════════════════════════════
// CALABACÍN (calabacita / zucchini / zapallito italiano)
// ════════════════════════════════════════════════════════════════════════

const CALABACIN: FullCropProtocol = {
  id: 'calabacin', slug: 'calabacin', name: 'Calabacín (calabacita / zucchini)', scientific_name: 'Cucurbita pepo',
  emoji: '🥒', gradient: 'from-green-600 to-lime-500', accentColor: '#16a34a',
  description: 'Calabacita, zucchini o zapallito italiano: cucurbitácea de ciclo ultracorto y cosecha continua diaria (el fruto se corta tierno cada 24-48 h durante varias semanas). El éxito comercial depende de sostener un cuajado constante sin aborto floral, calibre uniforme y un manejo estricto de mosca blanca (virosis) y cenicilla sin residuo.',
  cycle_days: 70,
  season: 'Producción casi continua en invernadero; ciclos escalonados en campo abierto',
  regions: ['Sinaloa', 'Sonora', 'Jalisco', 'Guanajuato', 'Baja California', 'Morelos'],
  featured_products: ['bp-koren', 'bp-cuaje', 'k-ultra', 'zen-chrys', 'biotiza-calcio-boro'],
  common_challenges: ['Mosca blanca y pulgón (vectores de virosis: CYSDV, ToLCNDV)', 'Cenicilla polvosa (Podosphaera xanthii)', 'Aborto floral por estrés térmico o nutricional', 'Fruto curvo o de calibre disparejo', 'Pudrición apical (blossom-end) por deficiencia de Ca'],
  stages: [
    {
      id: 'siembra', name: 'Siembra y emergencia', emoji: '🌱',
      durationDays: 12, objective: 'Emergencia uniforme y raíz rápida: el calabacín no perdona tropiezos por su ciclo ultracorto.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'bp-koren', productName: 'BP Koren', line: 'organicos', dose: '2 mL/L', method: 'Drench', frequency: 'Emergencia y a los 8 días', notes: 'Arranque radicular crítico — cada día cuenta en un cultivo de 70 días' },
        { productId: 'p-ultra', productName: 'P-Ultra', line: 'nutricion', dose: '1 L/ha', method: 'Fertirrigación', frequency: 'Días 1, 6, 12', notes: 'P para volumen radicular y arranque vegetativo veloz' },
        { productId: 'zen-chrys', productName: 'Zen-Chrys', line: 'bioproteccion', dose: '1.5 mL/L', method: 'Aspersión', frequency: 'Preventivo desde emergencia', notes: 'Mosca blanca temprana = virosis que colapsa el ciclo: prevenir desde plántula', isProtection: true },
        { productId: 'max-kill-plus', productName: 'Max-Kill Plus', line: 'bioproteccion', dose: '2.5 mL/L', method: 'Aspersión', frequency: 'Cada 5-7 días en pico de infestación', notes: 'Rotación de modo de acción contra mosca blanca y pulgón: 5 activos en sinergia (piretro + ajo + canela + neem + mostaza) · per catálogo recommended_dose foliar 2-3 mL/L · máx 3 aplicaciones consecutivas', isProtection: true },
      ],
    },
    {
      id: 'vegetativo', name: 'Desarrollo vegetativo', emoji: '🌿',
      durationDays: 18, objective: 'Planta compacta y vigorosa con buena área foliar antes del inicio temprano de floración (≈ día 30).',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '4 L/ha', method: 'Fertirrigación', frequency: '2 veces/semana', notes: 'N para área foliar — equilibrar para no retrasar la floración' },
        { productId: 'bp-mix', productName: 'BP Mix', line: 'nutricion', dose: '1 L/ha', method: 'Fertirrigación', frequency: 'Cada 10 días', notes: 'Micros completos para el metabolismo acelerado del ciclo corto' },
        { productId: 'zen-fungi', productName: 'Zen-Fungi', line: 'bioproteccion', dose: '2 mL/L', method: 'Aspersión', frequency: 'Cada 8 días', notes: 'Preventivo de cenicilla — clave: sin residuo visible para fruto de corte continuo', isProtection: true },
      ],
    },
    {
      id: 'floracion-cuajado', name: 'Floración y cuajado continuo', emoji: '🌸',
      durationDays: 14, objective: 'Lograr el flujo continuo de flores femeninas amarradas que sostendrá la cosecha diaria.',
      color: 'bg-yellow-100', textColor: 'text-yellow-700',
      products: [
        { productId: 'bp-fiore', productName: 'BP Fioré', line: 'bioestimulantes', dose: '1 g/L', method: 'Foliar', frequency: 'Inicio de floración', notes: 'Aumenta la proporción de flores femeninas — más fruto por planta' },
        { productId: 'bp-cuaje', productName: 'BP Cuaje', line: 'bioestimulantes', dose: '2 mL/L', method: 'Foliar', frequency: 'Inicio de flor + cada 8 días', notes: 'Sostiene el amarre continuo bajo cosecha escalonada diaria' },
        { productId: 'biotiza-calcio-boro', productName: 'Biotiza Calcio Boro', line: 'especialidades', dose: '2 mL/L', method: 'Foliar', frequency: 'Cada 8 días', notes: 'Ca+B contra pudrición apical y fruto curvo/deforme — defecto #1 de descarte' },
      ],
    },
    {
      id: 'cosecha-continua', name: 'Cosecha continua (corte diario)', emoji: '🥒',
      durationDays: 26, objective: 'Mantener calibre uniforme, color brillante y firmeza durante 3-4 semanas de corte diario sin agotar la planta.',
      color: 'bg-lime-100', textColor: 'text-lime-700',
      products: [
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '6 L/ha', method: 'Fertirrigación', frequency: 'Cada 4 días', notes: 'K sostiene calibre, color y firmeza fruto tras fruto en cosecha intensiva' },
        { productId: 'bp-nutri', productName: 'BP Nutri', line: 'organicos', dose: '2 mL/L', method: 'Foliar', frequency: 'Cada 7 días', notes: 'Algas: sostienen vigor de la planta bajo estrés de corte diario, alargan la vida productiva' },
        { productId: 'ae-calcium', productName: 'AE Calcium', line: 'organicos', dose: '2 mL/L', method: 'Foliar', frequency: 'Cada 7 días', notes: 'Ca firmeza y vida post-corte: el zucchini se deshidrata rápido en anaquel' },
        { productId: 'bp-fresh', productName: 'BP Fresh', line: 'bioestimulantes', dose: '1 mL/L', method: 'Foliar', frequency: 'Semanal durante cosecha', notes: 'Sanitiza superficie del fruto tierno y reduce pudriciones en cadena de frío', isProtection: true },
      ],
    },
  ],
}

// ════════════════════════════════════════════════════════════════════════
// TRIGO
// ════════════════════════════════════════════════════════════════════════

const TRIGO: FullCropProtocol = {
  id: 'trigo', slug: 'trigo', name: 'Trigo', scientific_name: 'Triticum aestivum / T. durum',
  emoji: '🌾', gradient: 'from-amber-600 to-yellow-500', accentColor: '#d97706',
  description: 'Cereal de invierno donde el nitrógeno fraccionado define el amacolle, el número de espigas y el contenido de proteína (gluten). Programa enfocado en macollamiento, encañe, llenado de grano y manejo de roya.',
  cycle_days: 150,
  season: 'Otoño-invierno bajo riego (noroeste y Bajío)',
  regions: ['Sonora', 'Baja California', 'Guanajuato', 'Sinaloa', 'Michoacán', 'Jalisco'],
  featured_products: ['n-ultra', 'k-ultra', 'bp-nutri', 'zen-fungi', 'bp-zinc'],
  common_challenges: ['Roya de la hoja y roya amarilla', 'Pulgón del follaje y de la espiga', 'Acame por exceso de N', 'Baja proteína por mal fraccionamiento de N', 'Carbón parcial'],
  stages: [
    {
      id: 'siembra-amacolle', name: 'Siembra y amacolle', emoji: '🌱',
      durationDays: 35, objective: 'Población uniforme y máximo número de macollos productivos.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'p-ultra', productName: 'P-Ultra', line: 'nutricion', dose: '2 L/ha', method: 'Fertirrigación', frequency: 'Primer riego', notes: 'P al arranque define vigor radicular y amacolle' },
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '5 L/ha', method: 'Fertirrigación', frequency: 'Primer riego de auxilio', notes: 'Primera fracción de N: arranque del macollamiento' },
        { productId: 'bp-zinc', productName: 'BP Zinc', line: 'nutricion', dose: '1 L/ha', method: 'Fertirrigación', frequency: 'A los 25 días', notes: 'Zn mejora amacolle y es deficiente en suelos calcáreos del noroeste' },
      ],
    },
    {
      id: 'encane', name: 'Encañe', emoji: '🌿',
      durationDays: 35, objective: 'Construir tallos fuertes y maximizar espiguillas por espiga; prevenir acame.',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '6 L/ha', method: 'Fertirrigación', frequency: 'Segunda fracción al encañe', notes: 'Segunda fracción de N en máxima demanda — define número de espiguillas' },
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '4 L/ha', method: 'Fertirrigación', frequency: 'Al encañe', notes: 'K da rigidez al tallo: clave anti-acame' },
        { productId: 'bp-nutri', productName: 'BP Nutri', line: 'organicos', dose: '1.5 mL/L', method: 'Foliar', frequency: 'Cada 15 días', notes: 'Algas: tallos más gruesos y mayor tolerancia a estrés' },
      ],
    },
    {
      id: 'espigamiento', name: 'Espigamiento y floración', emoji: '🌾',
      durationDays: 40, objective: 'Proteger la hoja bandera (la que más aporta al grano) y asegurar fecundación.',
      color: 'bg-yellow-100', textColor: 'text-yellow-700',
      products: [
        { productId: 'zen-fungi', productName: 'Zen-Fungi', line: 'bioproteccion', dose: '2.5 mL/L', method: 'Aspersión', frequency: 'Hoja bandera y espigamiento', notes: 'Proteger hoja bandera de roya = mayor llenado de grano', isProtection: true },
        { productId: 'agb-lecanii-green', productName: 'LECANII GREEN®', line: 'bioproteccion', dose: '2 mL/L', method: 'Aspersión', frequency: 'Al detectar pulgón', notes: 'Pulgón de la espiga reduce peso de grano y transmite virus', isProtection: true },
        { productId: 'bp-boro', productName: 'BP Boro', line: 'especialidades', dose: '0.4 mL/L', method: 'Foliar', frequency: 'Pre-floración', notes: 'B mejora fecundación y reduce esterilidad de espiguillas' },
      ],
    },
    {
      id: 'llenado-grano', name: 'Llenado de grano', emoji: '🏆',
      durationDays: 40, objective: 'Maximizar peso de grano y contenido de proteína (calidad panadera/galletera).',
      color: 'bg-amber-100', textColor: 'text-amber-700',
      products: [
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '3 L/ha', method: 'Foliar', frequency: 'Grano lechoso', notes: 'N foliar tardío: sube el % de proteína sin causar acame' },
        { productId: 'bp-potasio', productName: 'BP Potasio', line: 'organicos', dose: '3 mL/L', method: 'Foliar', frequency: 'Grano lechoso y pastoso', notes: 'K mejora peso hectolítrico y llenado uniforme' },
      ],
    },
  ],
}

// ════════════════════════════════════════════════════════════════════════
// SORGO
// ════════════════════════════════════════════════════════════════════════

const SORGO: FullCropProtocol = {
  id: 'sorgo', slug: 'sorgo', name: 'Sorgo', scientific_name: 'Sorghum bicolor',
  emoji: '🌾', gradient: 'from-red-700 to-orange-500', accentColor: '#b91c1c',
  description: 'Cereal rústico tolerante a sequía, clave para grano y forraje. El programa optimiza arraigue, panoja y llenado, con énfasis en el control del pulgón amarillo del sorgo y la mosquita midge.',
  cycle_days: 120,
  season: 'Primavera-verano (temporal) y otoño-invierno (riego, Tamaulipas)',
  regions: ['Tamaulipas', 'Guanajuato', 'Sinaloa', 'Michoacán', 'Jalisco', 'Morelos'],
  featured_products: ['n-ultra', 'k-ultra', 'bp-koren', 'agb-lecanii-green', 'bp-zinc'],
  common_challenges: ['Pulgón amarillo del sorgo (Melanaphis sacchari)', 'Mosquita del sorgo (midge)', 'Gusano cogollero', 'Carbón de la panoja', 'Deficiencia de Fe/Zn en suelos calcáreos'],
  stages: [
    {
      id: 'establecimiento', name: 'Establecimiento', emoji: '🌱',
      durationDays: 25, objective: 'Emergencia uniforme y raíz profunda que sostenga el cultivo en condiciones de sequía.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'bp-koren', productName: 'BP Koren', line: 'organicos', dose: '1 L/ha', method: 'Fertirrigación', frequency: 'A los 12 y 22 días', notes: 'Raíz profunda = tolerancia a sequía, la principal ventaja del sorgo' },
        { productId: 'p-ultra', productName: 'P-Ultra', line: 'nutricion', dose: '2 L/ha', method: 'Fertirrigación', frequency: 'Primer riego', notes: 'P arranca crecimiento radicular' },
        { productId: 'bp-zinc', productName: 'BP Zinc', line: 'nutricion', dose: '1 L/ha', method: 'Foliar', frequency: 'A los 20 días', notes: 'Zn frecuente deficiente en suelos calcáreos del Bajío y Tamaulipas' },
      ],
    },
    {
      id: 'crecimiento', name: 'Crecimiento vegetativo', emoji: '🌿',
      durationDays: 35, objective: 'Construir biomasa y prepararse para diferenciación de panoja; control temprano del pulgón amarillo.',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '5 L/ha', method: 'Fertirrigación', frequency: 'A los 30 días', notes: 'N para construir el dosel que llenará la panoja' },
        { productId: 'bp-nutri', productName: 'BP Nutri', line: 'organicos', dose: '1.5 mL/L', method: 'Foliar', frequency: 'Cada 15 días', notes: 'Algas: vigor y tolerancia a estrés hídrico' },
        { productId: 'agb-lecanii-green', productName: 'LECANII GREEN®', line: 'bioproteccion', dose: '2 mL/L', method: 'Aspersión dirigida al envés', frequency: 'Al umbral de pulgón amarillo', notes: 'El pulgón amarillo es la plaga #1 del sorgo desde 2014: monitoreo semanal del envés', isProtection: true },
      ],
    },
    {
      id: 'panoja', name: 'Embuche y panoja', emoji: '🌾',
      durationDays: 30, objective: 'Máximo número de granos por panoja y protección contra la mosquita del sorgo en floración.',
      color: 'bg-yellow-100', textColor: 'text-yellow-700',
      products: [
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '5 L/ha', method: 'Fertirrigación', frequency: 'Inicio de embuche', notes: 'K fortalece tallo y llena la panoja' },
        { productId: 'bp-boro', productName: 'BP Boro', line: 'especialidades', dose: '0.4 mL/L', method: 'Foliar', frequency: 'Pre-floración', notes: 'B mejora fecundación y reduce esterilidad de la panoja' },
        { productId: 'max-kill-plus', productName: 'Max-Kill Plus', line: 'bioproteccion', dose: '2 mL/L', method: 'Aspersión a la panoja', frequency: 'Inicio de floración (crítico)', notes: 'La mosquita ataca SOLO en floración: la ventana de control es muy estrecha', isProtection: true },
      ],
    },
    {
      id: 'llenado-grano', name: 'Llenado de grano', emoji: '🏆',
      durationDays: 30, objective: 'Llenado completo y peso de grano hasta madurez fisiológica.',
      color: 'bg-amber-100', textColor: 'text-amber-700',
      products: [
        { productId: 'bp-potasio', productName: 'BP Potasio', line: 'organicos', dose: '3 mL/L', method: 'Foliar', frequency: 'Grano lechoso y pastoso', notes: 'K mejora peso y reduce grano vano' },
        { productId: 'bp-mix', productName: 'BP Mix', line: 'nutricion', dose: '1 L/ha', method: 'Fertirrigación', frequency: 'Inicio de llenado', notes: 'Micros para fotosíntesis sostenida' },
      ],
    },
  ],
}

// ════════════════════════════════════════════════════════════════════════
// ALFALFA
// ════════════════════════════════════════════════════════════════════════

const ALFALFA: FullCropProtocol = {
  id: 'alfalfa', slug: 'alfalfa', name: 'Alfalfa', scientific_name: 'Medicago sativa',
  emoji: '🍀', gradient: 'from-green-700 to-emerald-500', accentColor: '#15803d',
  description: 'Forraje perenne de cortes múltiples (8-12 al año) y leguminosa fijadora de N. El programa NO usa N (la planta lo fija): prioriza establecimiento, P-K-S-B, recuperación post-corte y control del picudo de la alfalfa.',
  cycle_days: 1825,
  season: 'Perenne (4-6 años de vida útil); cortes cada 28-35 días',
  regions: ['Chihuahua', 'Durango', 'Guanajuato', 'Hidalgo', 'Baja California', 'La Laguna'],
  featured_products: ['p-ultra', 'k-ultra', 'biotiza-lactobacillus', 'bp-boro', 'max-kill-plus'],
  common_challenges: ['Picudo de la alfalfa (Hypera postica)', 'Pulgón manchado y verde', 'Pudrición de corona y raíz', 'Deficiencia de B y K (acortan vida de la pradera)', 'Acidez de suelo (limita la fijación de N)'],
  stages: [
    {
      id: 'establecimiento', name: 'Establecimiento de la pradera', emoji: '🌱',
      durationDays: 60, objective: 'Lograr población densa con corona profunda y nodulación efectiva — define la vida útil de la pradera.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'bp-koren', productName: 'BP Koren', line: 'organicos', dose: '1 L/ha', method: 'Fertirrigación', frequency: 'A los 15 y 35 días', notes: 'Raíz pivotante profunda = pradera longeva y tolerante a sequía' },
        { productId: 'p-ultra', productName: 'P-Ultra', line: 'nutricion', dose: '3 L/ha', method: 'Fertirrigación', frequency: 'Pre-siembra y a los 30 días', notes: 'P es el nutriente clave del establecimiento de leguminosas' },
        { productId: 'biotiza-lactobacillus', productName: 'Biotiza Lactobacillus', line: 'especialidades', dose: '2 g/L', method: 'Drench', frequency: 'A la siembra + 40 días', notes: 'Microbiota benéfica que favorece nodulación y sanidad de raíz' },
      ],
    },
    {
      id: 'desarrollo', name: 'Desarrollo y primer corte', emoji: '🌿',
      durationDays: 45, objective: 'Construir reservas en corona para soportar el régimen de cortes intensivo.',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '6 L/ha', method: 'Fertirrigación', frequency: 'Cada 21 días', notes: 'K es el nutriente más extraído por el forraje: repone reservas' },
        { productId: 'bp-boro', productName: 'BP Boro', line: 'especialidades', dose: '0.5 mL/L', method: 'Foliar', frequency: 'Cada corte', notes: 'B es críticamente deficiente en alfalfa: rebrote y vida de la pradera' },
        { productId: 'bp-mix', productName: 'BP Mix', line: 'nutricion', dose: '1.5 L/ha', method: 'Fertirrigación', frequency: 'Cada 30 días', notes: 'Micros completos para fotosíntesis del rebrote' },
      ],
    },
    {
      id: 'cortes-produccion', name: 'Ciclo de cortes (producción)', emoji: '✂️',
      durationDays: 280, objective: 'Maximizar rendimiento y proteína del forraje en cada corte sin agotar la corona.',
      color: 'bg-lime-100', textColor: 'text-lime-700',
      products: [
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '5 L/ha', method: 'Fertirrigación', frequency: 'Después de cada corte', notes: 'Reposición de K post-corte: cada corte exporta mucho K' },
        { productId: 'bp-nutri', productName: 'BP Nutri', line: 'organicos', dose: '2 mL/L', method: 'Foliar', frequency: 'Al rebrote (10 cm)', notes: 'Algas aceleran el rebrote = más cortes por año' },
        { productId: 'max-kill-plus', productName: 'Max-Kill Plus', line: 'bioproteccion', dose: '2.5 mL/L', method: 'Aspersión post-corte', frequency: 'Al umbral del picudo', notes: 'El picudo de la alfalfa devasta el rebrote: aplicar justo después del corte', isProtection: true },
      ],
    },
    {
      id: 'mantenimiento', name: 'Mantenimiento anual de la pradera', emoji: '🔄',
      durationDays: 1440, objective: 'Sostener productividad año tras año y prolongar la vida útil más allá de 4 años.',
      color: 'bg-teal-100', textColor: 'text-teal-700',
      products: [
        { productId: 'p-ultra', productName: 'P-Ultra', line: 'nutricion', dose: '4 L/ha', method: 'Fertirrigación', frequency: 'Anual (otoño)', notes: 'Reposición anual de P para mantener densidad de la pradera' },
        { productId: 'biotiza-lactobacillus', productName: 'Biotiza Lactobacillus', line: 'especialidades', dose: '3 L/ha', method: 'Drench', frequency: '2 veces/año', notes: 'Mantiene sanidad de corona y reduce pudriciones que matan plantas' },
      ],
    },
  ],
}

// ════════════════════════════════════════════════════════════════════════
// MANZANA
// ════════════════════════════════════════════════════════════════════════

const MANZANA: FullCropProtocol = {
  id: 'manzana', slug: 'manzana', name: 'Manzana', scientific_name: 'Malus domestica',
  emoji: '🍎', gradient: 'from-red-700 to-rose-500', accentColor: '#dc2626',
  description: 'Frutal caducifolio de zonas templadas (Chihuahua, Durango). El programa gira en torno a la brotación tras el reposo invernal, el manejo del calcio (anti bitter pit) y la calidad de fruto para anaquel prolongado.',
  cycle_days: 220,
  season: 'Brotación en marzo-abril; cosecha de agosto a octubre',
  regions: ['Chihuahua', 'Durango', 'Coahuila', 'Puebla', 'Zacatecas'],
  featured_products: ['ae-calcium', 'bp-calcio', 'bp-koren', 'k-ultra', 'zen-fungi'],
  common_challenges: ['Bitter pit (deficiencia de Ca en fruto)', 'Cenicilla y roña (Venturia)', 'Pulgón lanígero y palomilla de la manzana', 'Mala brotación por bajo frío invernal', 'Alternancia de producción (añerismo)'],
  stages: [
    {
      id: 'brotacion', name: 'Brotación y amarre', emoji: '🌱',
      durationDays: 40, objective: 'Brotación uniforme tras el reposo y buen amarre tras la floración.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'bp-koren', productName: 'BP Koren', line: 'organicos', dose: '2 mL/L', method: 'Drench / Fertirrigación', frequency: 'Inicio de brotación', notes: 'Reactiva raíces absorbentes tras el invierno para sostener la brotación' },
        { productId: 'bp-boro', productName: 'BP Boro', line: 'especialidades', dose: '0.5 mL/L', method: 'Foliar', frequency: 'Yema hinchada y plena flor', notes: 'B mejora viabilidad del polen y amarre — clásico limitante en pomáceas' },
        { productId: 'bp-fiore', productName: 'BP Fioré', line: 'bioestimulantes', dose: '1 g/L', method: 'Foliar', frequency: 'Botón rosa', notes: 'Mejora calidad de flor y amarre, reduce alternancia' },
      ],
    },
    {
      id: 'crecimiento-fruto', name: 'Crecimiento de fruto', emoji: '🌿',
      durationDays: 80, objective: 'División y expansión celular del fruto; cargar el fruto de calcio desde temprano.',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'bp-calcio', productName: 'BP Calcio', line: 'organicos', dose: '3 mL/L', method: 'Foliar al fruto', frequency: 'Cada 14 días desde cuajado', notes: 'El Ca al fruto debe iniciar temprano: el bitter pit se previene, no se cura' },
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '4 L/ha', method: 'Fertirrigación', frequency: 'Cada 15 días', notes: 'N moderado: el exceso compite con Ca y agrava bitter pit' },
        { productId: 'zen-fungi', productName: 'Zen-Fungi', line: 'bioproteccion', dose: '2.5 mL/L', method: 'Aspersión', frequency: 'Cada 12 días en lluvia', notes: 'Preventivo de roña (Venturia) y cenicilla — manchas que descartan fruta', isProtection: true },
      ],
    },
    {
      id: 'llenado', name: 'Llenado y calibre', emoji: '🍎',
      durationDays: 60, objective: 'Maximizar calibre y firmeza con calcio suficiente para anaquel largo.',
      color: 'bg-orange-100', textColor: 'text-orange-700',
      products: [
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '8 L/ha', method: 'Fertirrigación', frequency: 'Semanal', notes: 'K motor del calibre, color y azúcares' },
        { productId: 'ae-calcium', productName: 'AE Calcium', line: 'organicos', dose: '3 mL/L', method: 'Foliar al fruto', frequency: 'Cada 10 días', notes: 'Refuerzo de Ca de alta penetración: firmeza y vida de anaquel (clave en manzana de guarda)' },
        { productId: 'bp-gross', productName: 'BP Gross', line: 'bioestimulantes', dose: '1 g/L', method: 'Foliar', frequency: '30 y 60 días pre-cosecha', notes: 'Engordador para alcanzar calibre de mesa premium' },
      ],
    },
    {
      id: 'maduracion-cosecha', name: 'Maduración, cosecha y post-reposo', emoji: '🏆',
      durationDays: 40, objective: 'Color de cubrimiento óptimo, cosecha en firmeza ideal y reposición para el siguiente ciclo.',
      color: 'bg-amber-100', textColor: 'text-amber-700',
      products: [
        { productId: 'bp-potasio', productName: 'BP Potasio', line: 'organicos', dose: '4 mL/L', method: 'Foliar', frequency: '25 y 12 días pre-cosecha', notes: 'K final intensifica color rojo de cubrimiento y °Brix' },
        { productId: 'bp-nutri', productName: 'BP Nutri', line: 'organicos', dose: '2.5 mL/L', method: 'Foliar post-cosecha', frequency: 'Antes de caída de hoja', notes: 'Carga de reservas en yema (almidón) para una brotación pareja el siguiente año — reduce añerismo' },
      ],
    },
  ],
}

// ════════════════════════════════════════════════════════════════════════
// UVA
// ════════════════════════════════════════════════════════════════════════

const UVA: FullCropProtocol = {
  id: 'uva', slug: 'uva', name: 'Uva', scientific_name: 'Vitis vinifera',
  emoji: '🍇', gradient: 'from-purple-800 to-violet-600', accentColor: '#7c3aed',
  description: 'Vid para uva de mesa, pasa y vino. El programa acompaña la brotación, floración y envero, con manejo estricto de oídio y mildiú y un balance K/Ca preciso para Brix, color y firmeza del grano.',
  cycle_days: 210,
  season: 'Brotación febrero-marzo; cosecha de junio a septiembre según región',
  regions: ['Sonora', 'Baja California', 'Zacatecas', 'Aguascalientes', 'Coahuila', 'Querétaro'],
  featured_products: ['k-ultra', 'bp-calcio', 'bp-koren', 'zen-fungi', 'bp-gross'],
  common_challenges: ['Oídio (Erysiphe necator) y mildiú', 'Trips y araña roja', 'Corrimiento de racimo (mal cuajado)', 'Rajadura y desgrane del grano', 'Bajo color en variedades tintas'],
  stages: [
    {
      id: 'brotacion', name: 'Brotación', emoji: '🌱',
      durationDays: 35, objective: 'Brotación pareja y desarrollo de pámpanos vigorosos tras la poda invernal.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'bp-koren', productName: 'BP Koren', line: 'organicos', dose: '2 mL/L', method: 'Drench / Fertirrigación', frequency: 'Inicio de brotación', notes: 'Reactiva raíz tras reposo: sostiene la brotación con reservas frescas' },
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '4 L/ha', method: 'Fertirrigación', frequency: 'Cada 12 días', notes: 'N para desarrollo de área foliar inicial — moderar antes de flor' },
        { productId: 'bp-mix', productName: 'BP Mix', line: 'nutricion', dose: '1 L/ha', method: 'Foliar', frequency: 'A 4-6 hojas', notes: 'Micros para arranque fotosintético del pámpano' },
      ],
    },
    {
      id: 'floracion-cuajado', name: 'Floración y cuajado', emoji: '🌸',
      durationDays: 30, objective: 'Cuajado uniforme del racimo evitando corrimiento (caída de flores/granos).',
      color: 'bg-pink-100', textColor: 'text-pink-700',
      products: [
        { productId: 'bp-boro', productName: 'BP Boro', line: 'especialidades', dose: '0.4 mL/L', method: 'Foliar', frequency: 'Pre-floración y plena flor', notes: 'B es decisivo en cuajado de la vid: previene corrimiento de racimo' },
        { productId: 'bp-cuaje', productName: 'BP Cuaje', line: 'bioestimulantes', dose: '2 mL/L', method: 'Foliar', frequency: 'Inicio de flor', notes: 'Mejora amarre y uniformidad de grano' },
        { productId: 'zen-fungi', productName: 'Zen-Fungi', line: 'bioproteccion', dose: '2.5 mL/L', method: 'Aspersión', frequency: 'Cada 10 días desde brotación', notes: 'Oídio ataca desde brotación: protección preventiva continua, foco en racimo', isProtection: true },
      ],
    },
    {
      id: 'crecimiento-grano', name: 'Crecimiento de grano', emoji: '🍇',
      durationDays: 55, objective: 'Expansión del grano con pared celular firme (anti rajadura) antes del envero.',
      color: 'bg-purple-100', textColor: 'text-purple-700',
      products: [
        { productId: 'bp-calcio', productName: 'BP Calcio', line: 'organicos', dose: '3 mL/L', method: 'Foliar al racimo', frequency: 'Cada 12 días', notes: 'Ca da firmeza al grano y previene rajadura y desgrane en transporte' },
        { productId: 'bp-gross', productName: 'BP Gross', line: 'bioestimulantes', dose: '1 g/L', method: 'Foliar', frequency: 'Grano tamaño chícharo', notes: 'Engordador para calibre de uva de mesa de exportación' },
        { productId: 'zen-spider', productName: 'Zen-Spider', line: 'bioproteccion', dose: '2 mL/L', method: 'Aspersión', frequency: 'Cada 12 días en seca', notes: 'Araña roja y trips manchan grano: controlar antes del envero', isProtection: true },
      ],
    },
    {
      id: 'envero-cosecha', name: 'Envero y cosecha', emoji: '🏆',
      durationDays: 40, objective: 'Maximizar °Brix, color y firmeza para uva de mesa o parámetros enológicos.',
      color: 'bg-violet-100', textColor: 'text-violet-700',
      products: [
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '8 L/ha', method: 'Fertirrigación', frequency: 'Desde inicio de envero', notes: 'K es EL nutriente del envero: dispara Brix y color de variedades tintas' },
        { productId: 'bp-potasio', productName: 'BP Potasio', line: 'organicos', dose: '4 mL/L', method: 'Foliar al racimo', frequency: 'Cada 10 días en envero', notes: 'Refuerzo de K orgánico para color homogéneo del racimo' },
        { productId: 'ae-calcium', productName: 'AE Calcium', line: 'organicos', dose: '2.5 mL/L', method: 'Foliar', frequency: '15 días pre-cosecha', notes: 'Ca de alta penetración: firmeza del grano para transporte largo' },
      ],
    },
  ],
}

// ════════════════════════════════════════════════════════════════════════
// NUEZ
// ════════════════════════════════════════════════════════════════════════

const NUEZ: FullCropProtocol = {
  id: 'nuez', slug: 'nuez', name: 'Nuez', scientific_name: 'Carya illinoinensis',
  emoji: '🌰', gradient: 'from-amber-800 to-yellow-600', accentColor: '#92400e',
  description: 'Nogal pecanero de ciclo largo y alta demanda de zinc (el nutriente más limitante). El programa acompaña la brotación, llenado de almendra y la carga de reservas para combatir la alternancia (añerismo).',
  cycle_days: 240,
  season: 'Brotación abril-mayo; cosecha de octubre a diciembre',
  regions: ['Chihuahua', 'Coahuila', 'Sonora', 'Durango', 'Nuevo León'],
  featured_products: ['bp-zinc', 'bp-koren', 'k-ultra', 'ae-calcium', 'zen-fungi'],
  common_challenges: ['Deficiencia de zinc (rosetado)', 'Pulgón amarillo y barrenador del ruezno', 'Tizón / mancha por Colletotrichum', 'Almendra vana o mal llenada', 'Alternancia de producción (añerismo)'],
  stages: [
    {
      id: 'brotacion', name: 'Brotación y amarre', emoji: '🌱',
      durationDays: 50, objective: 'Brotación vigorosa libre de rosetado por Zn y buen amarre de fruto.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'bp-zinc', productName: 'BP Zinc', line: 'nutricion', dose: '3 mL/L', method: 'Foliar', frequency: 'Cada 10 días desde brotación', notes: 'Zn es EL nutriente del nogal: sin Zn hay "rosetado" y la cosecha colapsa' },
        { productId: 'bp-koren', productName: 'BP Koren', line: 'organicos', dose: '2 mL/L', method: 'Fertirrigación', frequency: 'Inicio de brotación', notes: 'Reactiva raíces absorbentes tras el reposo invernal' },
        { productId: 'bp-boro', productName: 'BP Boro', line: 'especialidades', dose: '0.5 mL/L', method: 'Foliar', frequency: 'Prefloración', notes: 'B mejora amarre y reduce caída de fruto recién cuajado' },
      ],
    },
    {
      id: 'crecimiento-fruto', name: 'Crecimiento de fruto (agua)', emoji: '🌿',
      durationDays: 70, objective: 'Expansión del fruto y formación de la cáscara antes del llenado de almendra.',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '8 L/ha', method: 'Fertirrigación', frequency: 'Cada 14 días', notes: 'Alta demanda de N en árbol adulto en plena expansión de fruto' },
        { productId: 'bp-zinc', productName: 'BP Zinc', line: 'nutricion', dose: '2 mL/L', method: 'Foliar', frequency: 'Cada 15 días', notes: 'Mantener nivel foliar de Zn durante todo el crecimiento' },
        { productId: 'zen-fungi', productName: 'Zen-Fungi', line: 'bioproteccion', dose: '2.5 mL/L', method: 'Aspersión', frequency: 'Cada 14 días en lluvia', notes: 'Preventivo de tizón/mancha que mancha y vana la nuez', isProtection: true },
      ],
    },
    {
      id: 'llenado-almendra', name: 'Llenado de almendra', emoji: '🌰',
      durationDays: 70, objective: 'Llenado completo de la almendra (% almendra) — el factor de precio más importante.',
      color: 'bg-yellow-100', textColor: 'text-yellow-700',
      products: [
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '12 L/ha', method: 'Fertirrigación', frequency: 'Semanal en llenado', notes: 'K es decisivo en el llenado de almendra: define el % de pulpa' },
        { productId: 'bp-potasio', productName: 'BP Potasio', line: 'organicos', dose: '4 mL/L', method: 'Foliar', frequency: 'Cada 12 días', notes: 'Refuerzo de K orgánico para almendra densa y completa' },
        { productId: 'agb-lecanii-green', productName: 'LECANII GREEN®', line: 'bioproteccion', dose: '2 mL/L', method: 'Aspersión', frequency: 'Al umbral de pulgón amarillo', notes: 'El pulgón amarillo defolia y reduce el llenado: monitoreo semanal', isProtection: true },
      ],
    },
    {
      id: 'maduracion-reservas', name: 'Maduración y carga de reservas', emoji: '🏆',
      durationDays: 50, objective: 'Madurez de cosecha (apertura del ruezno) y reposición de reservas para evitar añerismo.',
      color: 'bg-amber-100', textColor: 'text-amber-700',
      products: [
        { productId: 'ae-calcium', productName: 'AE Calcium', line: 'organicos', dose: '2.5 mL/L', method: 'Foliar', frequency: '20 días pre-cosecha', notes: 'Ca mejora integridad de cáscara y reduce germinación en árbol' },
        { productId: 'bp-nutri', productName: 'BP Nutri', line: 'organicos', dose: '2.5 mL/L', method: 'Foliar post-cosecha', frequency: 'Antes de caída de hoja', notes: 'Carga de reservas (almidón) post-cosecha: clave para romper la alternancia del nogal' },
      ],
    },
  ],
}

// ════════════════════════════════════════════════════════════════════════
// MANGO
// ════════════════════════════════════════════════════════════════════════

const MANGO: FullCropProtocol = {
  id: 'mango', slug: 'mango', name: 'Mango', scientific_name: 'Mangifera indica',
  emoji: '🥭', gradient: 'from-orange-600 to-yellow-500', accentColor: '#ea580c',
  description: 'Frutal tropical de exportación (Ataulfo, Tommy, Kent, Keitt). El programa acompaña la inducción y floración, el amarre y el llenado, con manejo estricto de antracnosis y mosca de la fruta para cumplir el tratamiento hidrotérmico de exportación.',
  cycle_days: 240,
  season: 'Floración diciembre-febrero; cosecha de marzo a agosto según región',
  regions: ['Sinaloa', 'Nayarit', 'Chiapas', 'Oaxaca', 'Michoacán', 'Guerrero', 'Veracruz'],
  featured_products: ['bp-fiore', 'bp-calcio', 'k-ultra', 'bp-koren', 'zen-fungi'],
  common_challenges: ['Antracnosis (Colletotrichum)', 'Mosca de la fruta (Anastrepha)', 'Cenicilla de la inflorescencia', 'Floración despareja / amarre bajo', 'Deficiencia de Ca y B (caída de fruto)'],
  stages: [
    {
      id: 'reposo-induccion', name: 'Reposo e inducción floral', emoji: '🌿',
      durationDays: 60, objective: 'Madurar yemas y promover una inducción floral pareja y abundante.',
      color: 'bg-teal-100', textColor: 'text-teal-700',
      products: [
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '8 L/ha', method: 'Fertirrigación', frequency: 'Pre-inducción', notes: 'Relación alta K/N favorece la inducción floral del mango' },
        { productId: 'bp-mol', productName: 'BP Mol', line: 'especialidades', dose: '0.5 g/L', method: 'Foliar', frequency: 'Madurez de brote', notes: 'Mo+B+P maduran el brote para que responda a la inducción' },
        { productId: 'bp-nutri', productName: 'BP Nutri', line: 'organicos', dose: '2 mL/L', method: 'Foliar', frequency: 'Cada 20 días', notes: 'Algas: brotes maduros y uniformes, base de floración pareja' },
      ],
    },
    {
      id: 'floracion', name: 'Floración', emoji: '🌸',
      durationDays: 35, objective: 'Panícula sana y bien polinizada; proteger la flor de antracnosis y cenicilla.',
      color: 'bg-pink-100', textColor: 'text-pink-700',
      products: [
        { productId: 'bp-fiore', productName: 'BP Fioré', line: 'bioestimulantes', dose: '1 g/L', method: 'Foliar', frequency: 'Inicio de panícula', notes: 'Mejora calidad de inflorescencia y proporción de flores hermafroditas' },
        { productId: 'bp-boro', productName: 'BP Boro', line: 'especialidades', dose: '0.4 mL/L', method: 'Foliar', frequency: 'Panícula visible y plena flor', notes: 'B mejora viabilidad del polen y amarre inicial' },
        { productId: 'zen-fungi', productName: 'Zen-Fungi', line: 'bioproteccion', dose: '2.5 mL/L', method: 'Aspersión', frequency: 'Cada 7-10 días en floración', notes: 'Antracnosis en flor = pérdida directa de amarre: protección preventiva', isProtection: true },
      ],
    },
    {
      id: 'amarre-crecimiento', name: 'Amarre y crecimiento de fruto', emoji: '🥭',
      durationDays: 80, objective: 'Retener el máximo de frutos amarrados (el mango tira mucho fruto) y crecerlos sanos.',
      color: 'bg-yellow-100', textColor: 'text-yellow-700',
      products: [
        { productId: 'bp-calcio', productName: 'BP Calcio', line: 'organicos', dose: '3 mL/L', method: 'Foliar al fruto', frequency: 'Cada 14 días', notes: 'Ca reduce la caída de fruto fisiológica y mejora firmeza' },
        { productId: 'bp-cuaje', productName: 'BP Cuaje', line: 'bioestimulantes', dose: '2 mL/L', method: 'Foliar', frequency: 'Fruto "canica" y +15 días', notes: 'Reduce la caída de fruto joven, principal pérdida del mango' },
        { productId: 'max-kill-plus', productName: 'Max-Kill Plus', line: 'bioproteccion', dose: '2 mL/L', method: 'Aspersión + trampeo', frequency: 'Desde fruto canica', notes: 'Mosca de la fruta: control obligado para certificación de exportación (tratamiento hidrotérmico)', isProtection: true },
      ],
    },
    {
      id: 'llenado-cosecha', name: 'Llenado y cosecha', emoji: '🏆',
      durationDays: 65, objective: 'Maximizar °Brix, color y firmeza; cosechar en madurez fisiológica correcta para tránsito.',
      color: 'bg-orange-100', textColor: 'text-orange-700',
      products: [
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '10 L/ha', method: 'Fertirrigación', frequency: 'Semanal en llenado', notes: 'K dispara Brix y color de pulpa del Ataulfo/Kent' },
        { productId: 'bp-gross', productName: 'BP Gross', line: 'bioestimulantes', dose: '1 g/L', method: 'Foliar', frequency: '40 y 25 días pre-cosecha', notes: 'Engordador para calibre de exportación' },
        { productId: 'ae-calcium', productName: 'AE Calcium', line: 'organicos', dose: '2.5 mL/L', method: 'Foliar al fruto', frequency: '20 días pre-cosecha', notes: 'Ca alta penetración: firmeza para soportar el tratamiento hidrotérmico y 21 días de tránsito' },
      ],
    },
  ],
}

// ════════════════════════════════════════════════════════════════════════
// FLORES (ornamentales / flor de corte)
// ════════════════════════════════════════════════════════════════════════

const FLORES: FullCropProtocol = {
  id: 'flores', slug: 'flores', name: 'Flores', scientific_name: 'Floricultura ornamental (rosa, gerbera, crisantemo)',
  emoji: '🌹', gradient: 'from-pink-600 to-rose-500', accentColor: '#db2777',
  description: 'Floricultura de corte y maceta (rosa, gerbera, crisantemo, lilis). El valor está en la longitud y rigidez del tallo, el tamaño y color del botón y la vida en florero. El programa busca raíz potente, vigor de tallo, calidad de botón y manejo de trips/oídio sin residuo visible.',
  cycle_days: 120,
  season: 'Producción continua bajo invernadero todo el año',
  regions: ['Estado de México', 'Morelos', 'Puebla', 'Jalisco', 'Querétaro'],
  featured_products: ['bp-koren', 'k-ultra', 'bp-calcio', 'bp-fiore', 'zen-chrys'],
  common_challenges: ['Trips (vector del TSWV)', 'Oídio y mildiú en follaje', 'Araña roja en invernadero cálido', 'Tallos cortos o débiles (baja categoría)', 'Botón pequeño o mal color'],
  stages: [
    {
      id: 'establecimiento', name: 'Plantación y enraizamiento', emoji: '🌱',
      durationDays: 25, objective: 'Arraigo rápido del esqueje o plántula para arrancar el cultivo con uniformidad.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'bp-koren', productName: 'BP Koren', line: 'organicos', dose: '2 mL/L', method: 'Drench', frequency: 'Al plantar + días 8, 16', notes: 'Raíz potente y rápida = uniformidad del lote, base de la calidad' },
        { productId: 'p-ultra', productName: 'P-Ultra', line: 'nutricion', dose: '1 L/ha', method: 'Fertirrigación', frequency: 'Días 1, 8, 16', notes: 'P para volumen radicular en sustrato' },
        { productId: 'biotiza-lactobacillus', productName: 'Biotiza Lactobacillus', line: 'especialidades', dose: '1 g/L', method: 'Drench', frequency: 'Al plantar + 15 días', notes: 'Microbiota benéfica que reduce pudriciones de cuello en sustrato húmedo' },
      ],
    },
    {
      id: 'vegetativo', name: 'Crecimiento vegetativo', emoji: '🌿',
      durationDays: 40, objective: 'Construir follaje sano y tallos largos y rígidos (define la categoría comercial).',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '4 L/ha', method: 'Fertirrigación', frequency: '2 veces/semana', notes: 'N para área foliar y elongación de tallo' },
        { productId: 'bp-nutri', productName: 'BP Nutri', line: 'organicos', dose: '1.5 mL/L', method: 'Foliar', frequency: 'Cada 10 días', notes: 'Algas + micros: tallos vigorosos y follaje brillante' },
        { productId: 'zen-chrys', productName: 'Zen-Chrys', line: 'bioproteccion', dose: '1.5 mL/L', method: 'Aspersión', frequency: 'Preventivo cada 7 días', notes: 'Trips transmite el TSWV y deforma botón: control biológico sin residuo visible', isProtection: true },
      ],
    },
    {
      id: 'boton-floral', name: 'Formación de botón', emoji: '🌸',
      durationDays: 30, objective: 'Botón grande, bien conformado y de color intenso, con tallo firme que lo sostenga.',
      color: 'bg-pink-100', textColor: 'text-pink-700',
      products: [
        { productId: 'bp-fiore', productName: 'BP Fioré', line: 'bioestimulantes', dose: '1 g/L', method: 'Foliar', frequency: 'Inicio de botón + 12 días', notes: 'Inductor floral: más botones, mejor conformados y uniformes' },
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '6 L/ha', method: 'Fertirrigación', frequency: 'Cada 5 días', notes: 'K intensifica color del pétalo y da rigidez al tallo floral' },
        { productId: 'zen-fungi', productName: 'Zen-Fungi', line: 'bioproteccion', dose: '2 mL/L', method: 'Aspersión', frequency: 'Cada 8 días', notes: 'Oídio mancha follaje y botón: preventivo sin dejar residuo visible', isProtection: true },
      ],
    },
    {
      id: 'corte-poscosecha', name: 'Corte y vida en florero', emoji: '🏆',
      durationDays: 25, objective: 'Cortar en punto óptimo con la mayor vida en florero y firmeza de tallo posible.',
      color: 'bg-rose-100', textColor: 'text-rose-700',
      products: [
        { productId: 'bp-calcio', productName: 'BP Calcio', line: 'organicos', dose: '2.5 mL/L', method: 'Foliar', frequency: 'Cada 7 días pre-corte', notes: 'Ca firmeza de tallo y pétalo: alarga la vida en florero' },
        { productId: 'bp-potasio', productName: 'BP Potasio', line: 'organicos', dose: '3 mL/L', method: 'Foliar', frequency: '10 y 4 días pre-corte', notes: 'K para color final y turgencia del tallo cortado' },
        { productId: 'bp-fresh', productName: 'BP Fresh', line: 'bioestimulantes', dose: '1 mL/L', method: 'Foliar', frequency: '5 días pre-corte', notes: 'Sanitiza superficie de follaje y botón para reducir Botrytis en cadena de frío', isProtection: true },
      ],
    },
  ],
}

// ════════════════════════════════════════════════════════════════════════
// CAFÉ
// ════════════════════════════════════════════════════════════════════════

const CAFE: FullCropProtocol = {
  id: 'cafe', slug: 'cafe', name: 'Café', scientific_name: 'Coffea arabica',
  emoji: '☕', gradient: 'from-amber-900 to-amber-700', accentColor: '#b45309',
  description: 'Cultivo perenne de altura (mayormente arábica en México) cuya rentabilidad se define por el rendimiento por hectárea y la calidad de taza. El programa busca raíz sana libre de nematodos, follaje vigoroso con manejo preventivo de roya, una floración pareja tras las lluvias y un llenado de grano completo con control biológico de la broca. El café es perenne: la etapa de vivero y establecimiento es de una sola vez; el resto se repite cada ciclo anual de producción.',
  cycle_days: 365,
  season: 'Floración tras las primeras lluvias (mar–may); cosecha sep–feb según altura',
  regions: ['Chiapas', 'Veracruz', 'Oaxaca', 'Puebla', 'Guerrero', 'Nayarit', 'Hidalgo', 'San Luis Potosí'],
  featured_products: ['bp-koren', 'bp-magnesio', 'zen-cu', 'agb-beauver', 'k-ultra'],
  common_challenges: ['Roya del café (Hemileia vastatrix)', 'Broca del café (Hypothenemus hampei)', 'Nematodos (Meloidogyne, Pratylenchus)', 'Ojo de gallo / antracnosis', 'Clorosis de Mg y Fe en suelos ácidos lixiviados'],
  stages: [
    {
      id: 'vivero-establecimiento', name: 'Vivero y establecimiento', emoji: '🌱',
      durationDays: 120, objective: 'Plántula vigorosa con raíz sana y arraigo rápido al trasplante a campo, libre de nematodos.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'bp-koren', productName: 'BP Koren', line: 'organicos', dose: '1.5 mL/L', method: 'Drench', frequency: 'Al trasplante y en recuperación; máx 2 veces', notes: 'Enraizador (AIB) para colonizar el suelo rápido al pasar de vivero a campo' },
        { productId: 'p-ultra', productName: 'P-Ultra', line: 'nutricion', dose: '1 L/ha', method: 'Fertirrigación', frequency: 'Al trasplante y a los 30 días', notes: 'El fósforo estimula el desarrollo radicular durante el establecimiento' },
        { productId: 'agb-elicitor-sin', productName: 'ELICITOR-SIN®', line: 'bioproteccion', dose: '360 g/ha', method: 'Drench', frequency: '2–3 aplicaciones a intervalos de 7–11 días', notes: 'Trichoderma harzianum: protege la raíz de hongos del suelo e induce resistencia (meta-análisis Barbosa et al., 2022)', isProtection: true },
      ],
    },
    {
      id: 'crecimiento-vegetativo', name: 'Crecimiento vegetativo y mantenimiento', emoji: '🌿',
      durationDays: 180, objective: 'Construir follaje sano y madera productiva (bandolas) con manejo preventivo de roya. Cada hoja sana sostiene la cosecha del año.',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'bp-nitro-fx', productName: 'BP Nitro FX', line: 'organicos', dose: '2.5 L/ha', method: 'Fertirrigación', frequency: 'Cada 14 días en etapa vegetativa', notes: 'N orgánico + L-aminoácidos: empuja la brotación de bandolas sin estrés' },
        { productId: 'bp-magnesio', productName: 'BP Magnesio', line: 'organicos', dose: '2 mL/L', method: 'Foliar', frequency: 'Cada 10–15 días o al detectar clorosis intervenal', notes: 'La clorosis de Mg es de las más comunes en café de suelos ácidos lixiviados' },
        { productId: 'bp-mix', productName: 'BP Mix', line: 'nutricion', dose: '1.5 mL/L', method: 'Foliar', frequency: 'Cada 14 días como preventivo', notes: 'Coctel de micronutrientes para sostener la fotosíntesis y el vigor' },
        { productId: 'zen-cu', productName: 'Zen-Cu', line: 'bioproteccion', dose: '2 mL/L', method: 'Foliar', frequency: 'Cada 10–14 días en temporada de lluvias', notes: 'Cobre preventivo contra la roya (Hemileia vastatrix), la principal enfermedad del café; aplicar antes del pico de lluvias', isProtection: true },
        { productId: 'zen-fungi', productName: 'Zen-Fungi', line: 'bioproteccion', dose: '2 mL/L', method: 'Foliar', frequency: 'Cada 14 días preventivo; alternar con el cobre', notes: 'Biofungicida botánico para rotar modo de acción contra roya y ojo de gallo', isProtection: true },
      ],
    },
    {
      id: 'floracion', name: 'Floración', emoji: '🌸',
      durationDays: 30, objective: 'Inducir y amarrar una floración pareja tras las lluvias para un cuajado uniforme.',
      color: 'bg-pink-100', textColor: 'text-pink-700',
      products: [
        { productId: 'bp-fiore', productName: 'BP Fioré', line: 'bioestimulantes', dose: '0.5 g/L', method: 'Foliar', frequency: '3–5 días antes del inicio de floración; repetir en plena flor', notes: 'Promotor de floración para una apertura pareja de la flor' },
        { productId: 'bp-boro', productName: 'BP Boro', line: 'especialidades', dose: '0.5 mL/L', method: 'Foliar', frequency: 'Inicio de floración; máx 3 veces por ciclo', notes: 'El boro es clave para la viabilidad del polen y el amarre del grano' },
        { productId: 'bp-vit', productName: 'BP Vit', line: 'especialidades', dose: '1.5 mL/L', method: 'Foliar', frequency: 'En pre-floración', notes: 'Antiestrés (L-cisteína + ácido fólico) para sostener la floración en clima variable' },
      ],
    },
    {
      id: 'llenado-grano', name: 'Llenado y desarrollo del grano', emoji: '🫘',
      durationDays: 120, objective: 'Llenar el grano por completo (peso y densidad) y proteger del barrenado de la broca.',
      color: 'bg-amber-100', textColor: 'text-amber-700',
      products: [
        { productId: 'bp-cuaje', productName: 'BP Cuaje', line: 'bioestimulantes', dose: '2 mL/L', method: 'Foliar', frequency: 'En plena flor, a los 5 y 10 días del cuaje', notes: 'Reduce la caída del grano recién cuajado' },
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '4 L/ha', method: 'Fertirrigación', frequency: 'Cada 10 días en llenado', notes: 'El potasio es el motor del llenado del grano y de la calidad de taza' },
        { productId: 'bp-calcio', productName: 'BP Calcio', line: 'organicos', dose: '2.5 mL/L', method: 'Foliar', frequency: 'Cada 7–10 días en llenado', notes: 'Ca para grano firme y menos caída fisiológica' },
        { productId: 'agb-beauver', productName: 'BEAUVER®', line: 'bioproteccion', dose: '480 g / 200 L de agua', method: 'Foliar dirigido al fruto', frequency: '2 aplicaciones a intervalos de 14 días', notes: 'Beauveria bassiana: control biológico clásico de la broca del café (Hypothenemus hampei); aplicar al inicio de la infestación con el fruto en estado lechoso', isProtection: true },
      ],
    },
    {
      id: 'maduracion-cosecha', name: 'Maduración y cosecha', emoji: '☕',
      durationDays: 60, objective: 'Madurar la cereza de forma pareja con la mejor calidad de taza y sanidad para el corte.',
      color: 'bg-red-100', textColor: 'text-red-700',
      products: [
        { productId: 'bp-potasio', productName: 'BP Potasio', line: 'organicos', dose: '3 mL/L', method: 'Foliar', frequency: 'Cada 10 días en maduración', notes: 'Refuerzo de K orgánico para uniformidad de maduración y perfil de taza' },
        { productId: 'ca-ultra', productName: 'Ca-Ultra', line: 'nutricion', dose: '3 L/ha', method: 'Fertirrigación', frequency: 'En llenado y maduración', notes: 'Ca refuerza la firmeza de la cereza y la resistencia al manejo poscosecha' },
        { productId: 'zen-cu', productName: 'Zen-Cu', line: 'bioproteccion', dose: '2 mL/L', method: 'Foliar', frequency: 'Cada 10–14 días si hay presión de roya', notes: 'Mantener la sanidad foliar hasta el corte protege la cosecha del año siguiente', isProtection: true },
      ],
    },
  ],
}

// ─── Export ───────────────────────────────────────────────────────────────

export const EXTRA_CROP_PROTOCOLS_2: FullCropProtocol[] = [
  PLATANO, PAPAYA, SANDIA, ARROZ, CALABAZA, CALABACIN, TRIGO, SORGO,
  ALFALFA, MANZANA, UVA, NUEZ, MANGO, FLORES, CAFE,
]
