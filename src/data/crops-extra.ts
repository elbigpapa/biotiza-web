/**
 * crops-extra.ts — Protocolos fenológicos adicionales
 *
 * 7 cultivos complementarios al núcleo principal de crops.ts:
 *  Agave · Cebolla · Espárrago · Pepino · Papa · Lechuga · Piña
 *
 * Cada protocolo se basa en estudios INIFAP, UC Davis, UNAM y experiencia
 * de campo en regiones productoras mexicanas. Usa exclusivamente productos
 * del catálogo Biotiza (verificar slugs en src/data/products.ts).
 */

import type { FullCropProtocol } from './crops'

// ════════════════════════════════════════════════════════════════════════
// AGAVE (tequilero / espadín)
// ════════════════════════════════════════════════════════════════════════

const AGAVE: FullCropProtocol = {
  id: 'agave', slug: 'agave', name: 'Agave', scientific_name: 'Agave tequilana / Agave salmiana',
  emoji: '🪴', gradient: 'from-teal-700 to-teal-500', accentColor: '#0d9488',
  description: 'Cultivo perenne de ciclo largo (5-10 años) clave para la industria del tequila y mezcal. Demanda K muy alta para acumulación de azúcares (fructanos), B para vigor del meristemo y control biológico del picudo del agave (Scyphophorus acupunctatus).',
  cycle_days: 2920,
  season: 'Plantación de mayo a octubre; cosecha cuando alcanza madurez (5-10 años)',
  regions: ['Jalisco', 'Oaxaca', 'Guanajuato', 'Tamaulipas', 'Michoacán'],
  featured_products: ['bp-koren', 'k-ultra', 'bp-potasio', 'bp-mol', 'max-kill-plus'],
  common_challenges: ['Picudo del agave', 'Pudrición de cogollo (Erwinia)', 'Marchitez por Fusarium', 'Hijuelos débiles', 'Bajo contenido de fructanos'],
  stages: [
    {
      id: 'plantacion', name: 'Plantación y Establecimiento', emoji: '🌱',
      durationDays: 180, objective: 'Asegurar prendimiento de hijuelos y desarrollo radicular inicial. La sobrevivencia al año 1 define la productividad a 10 años.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'bp-koren', productName: 'BP Koren', line: 'organicos', dose: '5 mL/L', method: 'Drench', frequency: 'Al plantar + días 30, 60', notes: 'Enraizador concentrado: crítico para colonizar el suelo desde el hijuelo' },
        { productId: 'biotiza-lactobacillus', productName: 'Lactobacillus', line: 'especialidades', dose: '2 g/L', method: 'Drench', frequency: 'Al plantar + 90 días', notes: 'Inhibe Erwinia que causa pudrición del cogollo en hijuelos jóvenes' },
        { productId: 'agb-elicitor-sin', productName: 'ELICITOR-SIN®', line: 'bioproteccion', dose: '2 g/L', method: 'Drench', frequency: 'Cada 90 días', notes: 'Trichoderma antagonista de Fusarium, principal patógeno radicular del agave', isProtection: true },
      ],
    },
    {
      id: 'crecimiento-inicial', name: 'Crecimiento Inicial (años 1-3)', emoji: '🌿',
      durationDays: 1095, objective: 'Construir biomasa foliar (pencas) que será fuente de fotoasimilados para la futura piña. Cada penca nueva = energía acumulada.',
      color: 'bg-teal-100', textColor: 'text-teal-700',
      products: [
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '15 L/ha', method: 'Fertirrigación', frequency: '2 veces/año (lluvias y secas)', notes: 'N moderado: el agave NO tolera N alto, induce floración prematura (chiqueo) y reduce vida útil' },
        { productId: 'bp-mix', productName: 'BP Mix', line: 'nutricion', dose: '2 L/ha', method: 'Foliar al brote', frequency: 'Cada 6 meses', notes: 'Micros completos para fotosíntesis máxima de la roseta' },
        { productId: 'bp-mol', productName: 'BP Mol', line: 'especialidades', dose: '0.5 g/L', method: 'Foliar', frequency: 'Anual', notes: 'Mo + B + P clave para meristemo vigoroso y desarrollo del cogollo' },
        { productId: 'max-kill-plus', productName: 'Max-Kill Plus', line: 'bioproteccion', dose: '2.5 mL/L', method: 'Aspersión dirigida a base de pencas', frequency: 'Cada 4 meses', notes: 'Control biológico del picudo del agave (Scyphophorus): clave para evitar pérdida del 30-40% en plantaciones afectadas', isProtection: true },
      ],
    },
    {
      id: 'crecimiento-medio', name: 'Crecimiento Medio (años 4-7)', emoji: '🌵',
      durationDays: 1460, objective: 'Maximizar acumulación de fructanos (inulina) en la piña. K es el motor del transporte de azúcares.',
      color: 'bg-cyan-100', textColor: 'text-cyan-700',
      products: [
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '20 L/ha', method: 'Fertirrigación / Aplicación al cogollo', frequency: '2 veces/año', notes: 'K es EL nutriente crítico del agave: define cantidad y calidad de fructanos para destilación' },
        { productId: 'bp-potasio', productName: 'BP Potasio', line: 'organicos', dose: '4 mL/L', method: 'Foliar al cogollo', frequency: 'Cada 6 meses', notes: 'K foliar complementa fertirrigación' },
        { productId: 'agb-beauver', productName: 'BEAUVER®', line: 'bioproteccion', dose: '2 mL/L', method: 'Aspersión a base de pencas', frequency: 'Cada 6 meses', notes: 'Beauveria controla picudo en larvas dentro del cogollo', isProtection: true },
      ],
    },
    {
      id: 'pre-cosecha', name: 'Pre-Cosecha (años 8-10)', emoji: '🏆',
      durationDays: 1095, objective: 'Maximizar peso de la piña (cabeza) y concentración de azúcares antes de la jima. Cada °Brix adicional vale para la industria.',
      color: 'bg-amber-100', textColor: 'text-amber-700',
      products: [
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '25 L/ha', method: 'Fertirrigación', frequency: 'Año previo a cosecha', notes: 'Aplicación final intensa de K para maximizar fructanos al jimar' },
        { productId: 'bp-gross', productName: 'BP Gross', line: 'bioestimulantes', dose: '1 g/L', method: 'Foliar', frequency: 'Cada 4 meses', notes: 'Engordador: incrementa peso de piña, factor directo del rendimiento por hectárea' },
        { productId: 'bp-nutri', productName: 'BP Nutri', line: 'organicos', dose: '2.5 mL/L', method: 'Foliar', frequency: 'Cada 3 meses', notes: 'Bioestimulante de algas: ayuda a tolerar sequía y maximizar metabolismo CAM' },
      ],
    },
  ],
}

// ════════════════════════════════════════════════════════════════════════
// CEBOLLA
// ════════════════════════════════════════════════════════════════════════

const CEBOLLA: FullCropProtocol = {
  id: 'cebolla', slug: 'cebolla', name: 'Cebolla', scientific_name: 'Allium cepa',
  emoji: '🧅', gradient: 'from-purple-700 to-orange-500', accentColor: '#a855f7',
  description: 'Cultivo de día largo o corto según variedad. Tamaño y calidad del bulbo dependen críticamente del manejo de S, K y agua. México exporta a EUA en ventana de invierno.',
  cycle_days: 110,
  season: 'Día corto: octubre-marzo (Tamaulipas, Chihuahua). Día largo: marzo-julio (Guanajuato, B.C.)',
  regions: ['Chihuahua', 'Guanajuato', 'Tamaulipas', 'Baja California', 'Zacatecas'],
  featured_products: ['bp-mix', 'k-ultra', 'bp-calcio', 'zen-fungi', 'beauver'],
  common_challenges: ['Trips de la cebolla (Thrips tabaci)', 'Mildiú (Peronospora destructor)', 'Botrytis del cuello', 'Bulbos divididos', 'Sin pungencia (déficit de S)'],
  stages: [
    {
      id: 'trasplante', name: 'Trasplante / Establecimiento', emoji: '🌱',
      durationDays: 21, objective: 'Prendimiento rápido de la plántula y construcción de sistema radicular fibroso. La cebolla tiene raíces superficiales — necesita raíz densa.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'bp-koren', productName: 'BP Koren', line: 'organicos', dose: '2 mL/L', method: 'Drench', frequency: 'Días 1, 7, 14', notes: 'Enraizador esencial para cebolla — raíz fibrosa = bulbo grande' },
        { productId: 'p-ultra', productName: 'P-Ultra', line: 'nutricion', dose: '2 L/ha', method: 'Fertirrigación', frequency: 'Alta en establecimiento', notes: 'P arranca el sistema radicular y prepara la planta para crecimiento foliar' },
        { productId: 'agb-elicitor-sin', productName: 'ELICITOR-SIN®', line: 'bioproteccion', dose: '2 g/L', method: 'Drench', frequency: 'Días 5 y 20', notes: 'Trichoderma protege contra Pythium y Fusarium en suelos húmedos', isProtection: true },
      ],
    },
    {
      id: 'vegetativo', name: 'Crecimiento Vegetativo (hojas)', emoji: '🌿',
      durationDays: 35, objective: 'Construir 7-9 hojas funcionales — cada hoja se traducirá en una capa de bulbo. Más hojas = bulbo más grande.',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '4 L/ha', method: 'Fertirrigación', frequency: '2 veces/semana', notes: 'N alto en vegetativo, BAJAR drásticamente al iniciar bulbificación' },
        { productId: 'bp-nutri', productName: 'BP Nutri', line: 'organicos', dose: '2 mL/L', method: 'Foliar', frequency: 'Cada 10 días', notes: 'Algas marinas + micros para hojas erectas y verdes' },
        { productId: 'mg-ultra', productName: 'Mg-Ultra', line: 'nutricion', dose: '2 L/ha', method: 'Fertirrigación', frequency: 'Semanal', notes: 'Mg para clorofila — hojas verde oscuro absorben más luz' },
        { productId: 'zen-chrys', productName: 'Zen-Chrys', line: 'bioproteccion', dose: '2 mL/L', method: 'Aspersión', frequency: 'Cada 10 días preventivo', notes: 'Trips de la cebolla afectan rendimiento y son vectores de IYSV (virus)', isProtection: true },
      ],
    },
    {
      id: 'bulbificacion', name: 'Inicio de Bulbificación', emoji: '🧅',
      durationDays: 25, objective: 'Transición de hoja a bulbo. K, S y reducción de N son los reguladores clave. Errores aquí = bulbos divididos o pequeños.',
      color: 'bg-purple-100', textColor: 'text-purple-700',
      products: [
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '5 L/ha', method: 'Fertirrigación', frequency: '2 veces/semana', notes: 'K dispara la formación del bulbo y define tamaño final' },
        { productId: 'bp-calcio', productName: 'BP Calcio', line: 'organicos', dose: '2.5 mL/L', method: 'Foliar', frequency: 'Cada 10 días', notes: 'Ca da firmeza al bulbo y vida post-cosecha extendida' },
        { productId: 'bp-vit', productName: 'BP Vit', line: 'especialidades', dose: '1 mL/L', method: 'Foliar', frequency: 'Inicio de bulbificación', notes: 'Cofactores enzimáticos para metabolismo de azufre y pungencia' },
        { productId: 'funbac-plus', productName: 'Funbac Plus', line: 'bioproteccion', dose: '2 mL/L', method: 'Aspersión', frequency: 'Cada 7 días si hay humedad', notes: 'Bacillus controla mildiú y Botrytis del cuello — devastadores en bulbificación', isProtection: true },
      ],
    },
    {
      id: 'llenado', name: 'Llenado y Madurez', emoji: '⚖️',
      durationDays: 25, objective: 'Maximizar peso del bulbo, dureza y formación de catáfilas externas que dan vida de anaquel.',
      color: 'bg-orange-100', textColor: 'text-orange-700',
      products: [
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '6 L/ha', method: 'Fertirrigación', frequency: 'Alta en llenado', notes: 'K máximo para peso y dureza del bulbo' },
        { productId: 'bp-potasio', productName: 'BP Potasio', line: 'organicos', dose: '3 mL/L', method: 'Foliar', frequency: 'Cada 7 días', notes: 'K foliar refuerza maduración y color externo de catáfilas' },
        { productId: 'ae-calcium', productName: 'AE Calcium', line: 'organicos', dose: '2.5 mL/L', method: 'Foliar', frequency: 'Cada 10 días', notes: 'Ca para dureza y vida post-cosecha — cebolla blanda se rechaza en empaque' },
      ],
    },
    {
      id: 'pre-cosecha', name: 'Curado y Cosecha', emoji: '🏆',
      durationDays: 14, objective: 'Doblamiento natural de hojas, suspensión de riego progresiva, formación de catáfila seca protectora.',
      color: 'bg-amber-100', textColor: 'text-amber-700',
      products: [
        { productId: 'bp-fresh', productName: 'BP Fresh', line: 'bioestimulantes', dose: '1 mL/L', method: 'Foliar', frequency: '10 días pre-cosecha', notes: 'Reduce carga bacteriana en cuello — previene pudrición durante curado y almacén', isProtection: true },
      ],
    },
  ],
}

// ════════════════════════════════════════════════════════════════════════
// ESPÁRRAGO
// ════════════════════════════════════════════════════════════════════════

const ESPARRAGO: FullCropProtocol = {
  id: 'esparrago', slug: 'esparrago', name: 'Espárrago', scientific_name: 'Asparagus officinalis',
  emoji: '🌿', gradient: 'from-emerald-700 to-lime-500', accentColor: '#10b981',
  description: 'Cultivo perenne de alta inversión inicial pero 10-12 años productivos. La acumulación de reservas en la corona durante el helecho define el rendimiento de turiones de la siguiente temporada.',
  cycle_days: 365,
  season: 'Producción de turiones: enero-abril (Sonora) y agosto-octubre (Bajío). Helecho: resto del año.',
  regions: ['Sonora', 'Baja California', 'Guanajuato', 'Jalisco'],
  featured_products: ['k-ultra', 'bp-koren', 'bp-mix', 'elicitor-sin', 'zen-fungi'],
  common_challenges: ['Stemphylium (mancha purpurea)', 'Roya (Puccinia asparagi)', 'Fusarium oxysporum (declinación)', 'Turiones delgados', 'Pudrición de corona'],
  stages: [
    {
      id: 'brotacion', name: 'Brotación de Turiones', emoji: '🌱',
      durationDays: 60, objective: 'Maximizar número y calibre de turiones a partir de las reservas acumuladas en la corona durante el helecho anterior.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'bp-koren', productName: 'BP Koren', line: 'organicos', dose: '4 mL/L', method: 'Drench al inicio de brotación', frequency: 'Aplicación única al despertar', notes: 'Activa el sistema radicular después del descanso vegetativo' },
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '3 L/ha', method: 'Fertirrigación', frequency: 'Semanal en brotación', notes: 'N moderado para vigor del turión sin exceso que reduce diámetro' },
        { productId: 'bp-mix', productName: 'BP Mix', line: 'nutricion', dose: '1 L/ha', method: 'Fertirrigación', frequency: 'Cada 14 días', notes: 'Micros para metabolismo proteico activo' },
      ],
    },
    {
      id: 'cosecha', name: 'Cosecha de Turiones (60-70 días)', emoji: '🌾',
      durationDays: 70, objective: 'Cosecha diaria de turiones de calibre comercial sin agotar las reservas de la corona — el balance es crítico.',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'bp-fresh', productName: 'BP Fresh', line: 'bioestimulantes', dose: '1 mL/L', method: 'Aspersión al brotar turión', frequency: 'Cada 5 días', notes: 'Sanitiza turión emergente y previene manchado en empaque', isProtection: true },
        { productId: 'bp-acua', productName: 'BP Acua', line: 'bioestimulantes', dose: '0.5 mL/L', method: 'Fertirrigación', frequency: 'Mensual', notes: 'Sanitiza agua de riego — Fusarium se propaga vía agua en surcos' },
      ],
    },
    {
      id: 'helecho-vegetativo', name: 'Helecho — Crecimiento Vegetativo', emoji: '🌳',
      durationDays: 120, objective: 'Construir helecho denso y vigoroso para fotosíntesis máxima durante 4-5 meses — todo lo que se acumule alimenta turiones del próximo año.',
      color: 'bg-lime-100', textColor: 'text-lime-700',
      products: [
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '6 L/ha', method: 'Fertirrigación', frequency: '2 veces/semana', notes: 'N alto en helecho para biomasa fotosintética máxima' },
        { productId: 'bp-nutri', productName: 'BP Nutri', line: 'organicos', dose: '2 mL/L', method: 'Foliar', frequency: 'Cada 14 días', notes: 'Algas + micros: helecho denso = más reservas en corona' },
        { productId: 'mg-ultra', productName: 'Mg-Ultra', line: 'nutricion', dose: '3 L/ha', method: 'Fertirrigación', frequency: 'Quincenal', notes: 'Mg sostiene actividad fotosintética en helecho persistente' },
        { productId: 'zen-fungi', productName: 'Zen-Fungi', line: 'bioproteccion', dose: '2 mL/L', method: 'Aspersión', frequency: 'Cada 10 días preventivo', notes: 'Stemphylium puede defoliar helecho 50% — prevención semanal es clave', isProtection: true },
        { productId: 'zen-cu', productName: 'Zen-Cu', line: 'bioproteccion', dose: '1.5 mL/L', method: 'Aspersión', frequency: 'Cada 14 días rotación', notes: 'Cu orgánico contra roya — alternar con Bacillus', isProtection: true },
      ],
    },
    {
      id: 'helecho-acumulacion', name: 'Helecho — Acumulación de Reservas', emoji: '🌽',
      durationDays: 115, objective: 'Translocar máximo de carbohidratos del helecho a la corona. K es el motor de este transporte.',
      color: 'bg-yellow-100', textColor: 'text-yellow-700',
      products: [
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '10 L/ha', method: 'Fertirrigación', frequency: 'Alta en fin de helecho', notes: 'K dispara translocación de fotoasimilados a corona — define cosecha próxima' },
        { productId: 'bp-potasio', productName: 'BP Potasio', line: 'organicos', dose: '3 mL/L', method: 'Foliar', frequency: 'Cada 10 días', notes: 'K foliar complementa fertirrigación en pre-descanso' },
        { productId: 'agb-elicitor-sin', productName: 'ELICITOR-SIN®', line: 'bioproteccion', dose: '2 g/L', method: 'Drench mensual', frequency: 'Durante todo helecho', notes: 'Trichoderma antagoniza Fusarium en corona — declinación es enemigo a largo plazo', isProtection: true },
      ],
    },
  ],
}

// ════════════════════════════════════════════════════════════════════════
// PEPINO
// ════════════════════════════════════════════════════════════════════════

const PEPINO: FullCropProtocol = {
  id: 'pepino', slug: 'pepino', name: 'Pepino', scientific_name: 'Cucumis sativus',
  emoji: '🥒', gradient: 'from-green-700 to-emerald-400', accentColor: '#22c55e',
  description: 'Cultivo de invernadero de ciclo corto e intensivo. Producción continua exige nutrición precisa, control biológico activo y CE bien manejada. México exporta 75% de su producción a EUA.',
  cycle_days: 75,
  season: 'Ciclo continuo bajo invernadero todo el año; pico productivo otoño-invierno',
  regions: ['Sinaloa', 'Sonora', 'Baja California', 'Jalisco', 'Querétaro'],
  featured_products: ['bp-cuaje', 'k-ultra', 'bp-calcio', 'bp-boro', 'zen-chrys'],
  common_challenges: ['Mosquita blanca (Bemisia tabaci)', 'Oídio (Podosphaera)', 'Pythium en raíz', 'Frutos torcidos', 'Aborto por estrés térmico'],
  stages: [
    {
      id: 'trasplante', name: 'Trasplante y Establecimiento', emoji: '🌱',
      durationDays: 10, objective: 'Arraigo rápido y emisión de las 2-3 primeras hojas verdaderas vigorosas.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'bp-koren', productName: 'BP Koren', line: 'organicos', dose: '2 mL/L', method: 'Drench', frequency: 'Días 1 y 7', notes: 'Enraizador con ácidos húmicos para arraigo en sustrato' },
        { productId: 'biotiza-lactobacillus', productName: 'Lactobacillus', line: 'especialidades', dose: '2 g/L', method: 'Drench', frequency: 'Día 1', notes: 'Coloniza rizosfera antes que patógenos' },
        { productId: 'zen-chrys', productName: 'Zen-Chrys', line: 'bioproteccion', dose: '1.5 mL/L', method: 'Foliar', frequency: 'Preventivo desde día 3', notes: 'Mosquita blanca llega desde el primer momento — prevención inmediata', isProtection: true },
      ],
    },
    {
      id: 'vegetativo', name: 'Crecimiento Vegetativo', emoji: '🌿',
      durationDays: 20, objective: 'Construir guía principal y arquitectura vegetativa que sostenga la producción continua.',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '5 L/ha', method: 'Fertirrigación', frequency: 'Diario en invernadero', notes: 'CE 1.8-2.2 mS/cm en vegetativo' },
        { productId: 'bp-nutri', productName: 'BP Nutri', line: 'organicos', dose: '1.5 mL/L', method: 'Foliar', frequency: 'Cada 10 días', notes: 'Algas activan crecimiento de zarcillos y vigor vegetativo' },
        { productId: 'bp-mix', productName: 'BP Mix', line: 'nutricion', dose: '1.5 L/ha', method: 'Fertirrigación', frequency: 'Cada 14 días', notes: 'Micros completos — Fe especialmente crítico en sustrato' },
        { productId: 'funbac-plus', productName: 'Funbac Plus', line: 'bioproteccion', dose: '2 mL/L', method: 'Aspersión', frequency: 'Cada 10 días preventivo', notes: 'Oídio aparece rápidamente en invernadero con alta humedad', isProtection: true },
      ],
    },
    {
      id: 'floracion', name: 'Floración e Inicio de Cuajado', emoji: '🌼',
      durationDays: 10, objective: 'Maximizar floración femenina (la productiva) y asegurar cuajado de los primeros frutos.',
      color: 'bg-yellow-100', textColor: 'text-yellow-700',
      products: [
        { productId: 'bp-fiore', productName: 'BP Fioré', line: 'bioestimulantes', dose: '0.8 g/L', method: 'Foliar', frequency: 'Inicio de flor', notes: 'Inductor de floración — más yemas femeninas' },
        { productId: 'bp-boro', productName: 'BP Boro', line: 'especialidades', dose: '0.4 mL/L', method: 'Foliar', frequency: 'Inicio y plena flor', notes: 'B crítico para germinación del polen y desarrollo del fruto' },
        { productId: 'bp-cuaje', productName: 'BP Cuaje', line: 'bioestimulantes', dose: '2 mL/L', method: 'Foliar', frequency: 'Cada 7 días en floración', notes: 'Reduce aborto en pepinos partenocárpicos bajo estrés térmico' },
        { productId: 'p-ultra', productName: 'P-Ultra', line: 'nutricion', dose: '2 L/ha', method: 'Fertirrigación', frequency: 'Subir en floración', notes: 'P para energía de cuajado y desarrollo de fruto' },
      ],
    },
    {
      id: 'cosecha-continua', name: 'Cosecha Continua (40-50 días)', emoji: '🥒',
      durationDays: 35, objective: 'Mantener producción uniforme con calibre, color y forma consistentes para exportación. Pepino torcido se descarta.',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '6 L/ha', method: 'Fertirrigación', frequency: 'Diario en cosecha', notes: 'K alto: define color, firmeza y forma recta del fruto. CE 2.5-3.0 en cosecha' },
        { productId: 'ae-calcium', productName: 'AE Calcium', line: 'organicos', dose: '2.5 mL/L', method: 'Foliar', frequency: 'Cada 7 días', notes: 'Ca evita "cuello blanco" y prolonga vida post-cosecha' },
        { productId: 'bp-calcio', productName: 'BP Calcio', line: 'organicos', dose: '3 mL/L', method: 'Foliar', frequency: 'Cada 10 días', notes: 'Ca foliar para firmeza al transporte' },
        { productId: 'bp-gross', productName: 'BP Gross', line: 'bioestimulantes', dose: '0.8 g/L', method: 'Foliar', frequency: 'Cada 14 días', notes: 'Engordador: mantiene calibre comercial en producción larga' },
        { productId: 'agb-beauver', productName: 'BEAUVER®', line: 'bioproteccion', dose: '2 mL/L', method: 'Aspersión envés', frequency: 'Cada 7 días', notes: 'Control de mosquita blanca y trips sin afectar polinizadores ni dejar residuo', isProtection: true },
      ],
    },
  ],
}

// ════════════════════════════════════════════════════════════════════════
// PAPA
// ════════════════════════════════════════════════════════════════════════

const PAPA: FullCropProtocol = {
  id: 'papa', slug: 'papa', name: 'Papa', scientific_name: 'Solanum tuberosum',
  emoji: '🥔', gradient: 'from-stone-700 to-amber-500', accentColor: '#78716c',
  description: 'Cultivo de tubérculo de demanda alta de K y Ca. La tuberización es la etapa crítica: bien manejada determina 70% del rendimiento. México produce variedades blancas (Alpha, Atlantic) y rojas para mercado fresco e industria de fritura.',
  cycle_days: 110,
  season: 'Ciclo otoño-invierno principal; siembras escalonadas según región',
  regions: ['Sinaloa', 'Sonora', 'Guanajuato', 'Nuevo León', 'Puebla', 'Chihuahua'],
  featured_products: ['k-ultra', 'bp-calcio', 'bp-koren', 'elicitor-sin', 'max-kill-plus'],
  common_challenges: ['Tizón tardío (Phytophthora infestans)', 'Tizón temprano (Alternaria)', 'Gusano blanco (Phyllophaga)', 'Sarna común (Streptomyces)', 'Tubérculos verdes', 'Hollow heart'],
  stages: [
    {
      id: 'emergencia', name: 'Emergencia y Establecimiento', emoji: '🌱',
      durationDays: 18, objective: 'Emergencia uniforme del tubérculo-semilla y desarrollo del sistema radicular y estolones primarios.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'bp-koren', productName: 'BP Koren', line: 'organicos', dose: '3 mL/L', method: 'Drench al surco', frequency: 'Aplicación al sembrar', notes: 'Activa raíces y estolones — base de la futura cosecha' },
        { productId: 'p-ultra', productName: 'P-Ultra', line: 'nutricion', dose: '3 L/ha', method: 'Fertirrigación / banda al sembrar', frequency: 'Toda al inicio', notes: 'P se mueve poco en suelo — ponerlo en banda cerca del tubérculo-semilla' },
        { productId: 'agb-elicitor-sin', productName: 'ELICITOR-SIN®', line: 'bioproteccion', dose: '3 g/L', method: 'Drench al sembrar', frequency: 'Aplicación al surco', notes: 'Trichoderma protege contra Rhizoctonia (canchro) y Fusarium en estolones', isProtection: true },
      ],
    },
    {
      id: 'vegetativo', name: 'Crecimiento Vegetativo', emoji: '🌿',
      durationDays: 25, objective: 'Construir follaje y biomasa fotosintética para sostener la posterior tuberización. Hojas sanas = tubérculos grandes.',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '5 L/ha', method: 'Fertirrigación', frequency: '2 veces/semana', notes: 'N alto en vegetativo, BAJAR drásticamente al iniciar tuberización (N tardío = papa esponjosa)' },
        { productId: 'bp-mix', productName: 'BP Mix', line: 'nutricion', dose: '2 L/ha', method: 'Fertirrigación', frequency: 'Cada 14 días', notes: 'Micros completos para clorofila y enzimas fotosintéticas' },
        { productId: 'mg-ultra', productName: 'Mg-Ultra', line: 'nutricion', dose: '3 L/ha', method: 'Fertirrigación', frequency: 'Quincenal', notes: 'Mg para clorofila — papa es demandante de Mg' },
        { productId: 'zen-fungi', productName: 'Zen-Fungi', line: 'bioproteccion', dose: '2 mL/L', method: 'Aspersión preventivo', frequency: 'Cada 10 días', notes: 'Tizón temprano (Alternaria) ataca en vegetativo bajo estrés', isProtection: true },
      ],
    },
    {
      id: 'tuberizacion', name: 'Inicio de Tuberización', emoji: '🥔',
      durationDays: 20, objective: 'Maximizar número de tubérculos por estolón. La densidad de tuberización en esta ventana define la cosecha completa.',
      color: 'bg-yellow-100', textColor: 'text-yellow-700',
      products: [
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '6 L/ha', method: 'Fertirrigación', frequency: '3 veces/semana', notes: 'K dispara tuberización — mayor demanda nutricional del ciclo' },
        { productId: 'bp-calcio', productName: 'BP Calcio', line: 'organicos', dose: '3 mL/L', method: 'Foliar + drench', frequency: 'Cada 7 días', notes: 'Ca previene sarna común y hollow heart (defectos internos)' },
        { productId: 'bp-mol', productName: 'BP Mol', line: 'especialidades', dose: '0.5 g/L', method: 'Foliar', frequency: 'Al inicio de tuberización', notes: 'Mo + P + B sinergia para metabolismo de tubérculo' },
        { productId: 'funbac-plus', productName: 'Funbac Plus', line: 'bioproteccion', dose: '2 mL/L', method: 'Aspersión', frequency: 'Cada 7 días', notes: 'Tizón tardío (Phytophthora) puede destruir cultivo en 14 días — prevención continua', isProtection: true },
      ],
    },
    {
      id: 'llenado', name: 'Llenado de Tubérculo', emoji: '⚖️',
      durationDays: 30, objective: 'Engorde de tubérculos: peso, materia seca, gravedad específica para industria. Calibre comercial.',
      color: 'bg-amber-100', textColor: 'text-amber-700',
      products: [
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '8 L/ha', method: 'Fertirrigación', frequency: 'Pico de aplicación', notes: 'K = peso del tubérculo, almacenamiento de almidón, gravedad específica' },
        { productId: 'bp-potasio', productName: 'BP Potasio', line: 'organicos', dose: '3 mL/L', method: 'Foliar', frequency: 'Cada 7 días', notes: 'K foliar refuerza materia seca y prevención de hollow heart' },
        { productId: 'ae-calcium', productName: 'AE Calcium', line: 'organicos', dose: '2.5 mL/L', method: 'Foliar', frequency: 'Cada 10 días', notes: 'Ca foliar para firmeza de piel y reducir lesiones de manejo' },
        { productId: 'max-kill-plus', productName: 'Max-Kill Plus', line: 'bioproteccion', dose: '2.5 mL/L', method: 'Drench / al surco', frequency: 'Si hay gusano blanco', notes: 'Control de Phyllophaga (gallina ciega) — daño directo al tubérculo', isProtection: true },
      ],
    },
    {
      id: 'madurez', name: 'Madurez y Secado de Follaje', emoji: '🏆',
      durationDays: 17, objective: 'Curado natural del tubérculo, formación de piel firme que permita cosecha mecánica sin daños y almacenamiento prolongado.',
      color: 'bg-stone-100', textColor: 'text-stone-700',
      products: [
        { productId: 'bp-fresh', productName: 'BP Fresh', line: 'bioestimulantes', dose: '1 mL/L', method: 'Foliar', frequency: '10 días pre-cosecha', notes: 'Reduce carga bacteriana y previene pudrición durante almacenamiento', isProtection: true },
      ],
    },
  ],
}

// ════════════════════════════════════════════════════════════════════════
// LECHUGA
// ════════════════════════════════════════════════════════════════════════

const LECHUGA: FullCropProtocol = {
  id: 'lechuga', slug: 'lechuga', name: 'Lechuga', scientific_name: 'Lactuca sativa',
  emoji: '🥬', gradient: 'from-lime-700 to-green-400', accentColor: '#65a30d',
  description: 'Cultivo de ciclo corto y rotación rápida. Tipos: cabeza (iceberg, batavia), hoja (romana, hoja de roble) y minihojas (baby leaf). Demanda nutrición balanceada, agua constante y prevención estricta de tipburn (déficit de Ca).',
  cycle_days: 65,
  season: 'Producción todo el año en zonas templadas; ciclos escalonados cada 10 días',
  regions: ['Guanajuato', 'Querétaro', 'Puebla', 'Baja California', 'Jalisco', 'Estado de México'],
  featured_products: ['bp-calcio', 'ae-calcium', 'bp-mix', 'zen-fungi', 'funbac-plus'],
  common_challenges: ['Tipburn (déficit de Ca)', 'Sclerotinia (moho blanco)', 'Botrytis', 'Mildiú (Bremia lactucae)', 'Pulgones', 'Bolting (espigado prematuro)'],
  stages: [
    {
      id: 'trasplante', name: 'Trasplante', emoji: '🌱',
      durationDays: 7, objective: 'Prendimiento rápido sin estrés — lechuga es muy sensible al choque de trasplante.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'bp-koren', productName: 'BP Koren', line: 'organicos', dose: '2 mL/L', method: 'Drench', frequency: 'Días 1 y 5', notes: 'Reduce estrés de trasplante en plántula tierna' },
        { productId: 'biotiza-coadyuvante', productName: 'Coadyuvante', line: 'bioestimulantes', dose: '0.5 mL/L', method: 'Foliar', frequency: 'Día 3', notes: 'Mejora absorción y reduce estrés osmótico inicial' },
        { productId: 'agb-elicitor-sin', productName: 'ELICITOR-SIN®', line: 'bioproteccion', dose: '2 g/L', method: 'Drench', frequency: 'Día 1', notes: 'Trichoderma contra Pythium en plántula recién trasplantada', isProtection: true },
      ],
    },
    {
      id: 'vegetativo', name: 'Crecimiento Vegetativo Activo', emoji: '🌿',
      durationDays: 30, objective: 'Construir biomasa foliar densa con hojas verdes, turgentes y sin defectos. La lechuga se vende al ojo.',
      color: 'bg-lime-100', textColor: 'text-lime-700',
      products: [
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '3 L/ha', method: 'Fertirrigación', frequency: 'Diario', notes: 'N moderado — exceso induce bolting (espigado) y reduce vida útil' },
        { productId: 'bp-nutri', productName: 'BP Nutri', line: 'organicos', dose: '1.5 mL/L', method: 'Foliar', frequency: 'Cada 10 días', notes: 'Algas + micros para hojas turgentes y brillantes' },
        { productId: 'bp-mix', productName: 'BP Mix', line: 'nutricion', dose: '1.5 L/ha', method: 'Fertirrigación', frequency: 'Cada 14 días', notes: 'Micros — Fe especialmente para color verde profundo' },
        { productId: 'mg-ultra', productName: 'Mg-Ultra', line: 'nutricion', dose: '2 L/ha', method: 'Fertirrigación', frequency: 'Semanal', notes: 'Mg para clorofila intensa — color comercial' },
      ],
    },
    {
      id: 'formacion-cabeza', name: 'Formación de Cabeza (cabeza/iceberg)', emoji: '🥬',
      durationDays: 18, objective: 'Cierre de cabeza compacta sin tipburn (necrosis interna por déficit de Ca). El Ca DEBE llegar a las hojas internas — solo entra por flujo de agua.',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'bp-calcio', productName: 'BP Calcio', line: 'organicos', dose: '3 mL/L', method: 'Foliar dirigido a cogollo', frequency: 'Cada 5 días', notes: 'Ca foliar al cogollo — el Ca por raíz no siempre llega a hojas internas' },
        { productId: 'ae-calcium', productName: 'AE Calcium', line: 'organicos', dose: '2.5 mL/L', method: 'Foliar', frequency: 'Cada 5 días alternando', notes: 'Calcio premium para máxima absorción — previene tipburn que arruina cabezas' },
        { productId: 'biotiza-calcio-boro', productName: 'Calcio-Boro', line: 'especialidades', dose: '2 mL/L', method: 'Foliar', frequency: 'Cada 7 días', notes: 'Sinergia Ca-B para pared celular firme' },
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '3 L/ha', method: 'Fertirrigación', frequency: 'Cada 3 días', notes: 'K para firmeza y peso de cabeza' },
        { productId: 'funbac-plus', productName: 'Funbac Plus', line: 'bioproteccion', dose: '2 mL/L', method: 'Aspersión', frequency: 'Cada 7 días preventivo', notes: 'Sclerotinia y Botrytis devastan cabezas — prevención biológica continua', isProtection: true },
      ],
    },
    {
      id: 'pre-cosecha', name: 'Pre-Cosecha', emoji: '🏆',
      durationDays: 10, objective: 'Maximizar firmeza y vida post-cosecha sin riesgo de pudrición de campo.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'zen-fungi', productName: 'Zen-Fungi', line: 'bioproteccion', dose: '2 mL/L', method: 'Aspersión', frequency: 'Cada 5 días', notes: 'Bacillus rota con Funbac para evitar resistencia y mantener prevención', isProtection: true },
        { productId: 'bp-fresh', productName: 'BP Fresh', line: 'bioestimulantes', dose: '1 mL/L', method: 'Foliar', frequency: '5 días pre-cosecha', notes: 'Reduce carga microbiana superficial — clave para vida útil en empaque', isProtection: true },
      ],
    },
  ],
}

// ════════════════════════════════════════════════════════════════════════
// PIÑA
// ════════════════════════════════════════════════════════════════════════

const PINA: FullCropProtocol = {
  id: 'pina', slug: 'pina', name: 'Piña', scientific_name: 'Ananas comosus',
  emoji: '🍍', gradient: 'from-yellow-600 to-amber-500', accentColor: '#f59e0b',
  description: 'Cultivo perenne tropical de ciclo 18-24 meses. Variedad MD-2 (Gold) domina exportación. Demanda K alta para Brix, manejo preciso de inducción floral (etileno o calcio carburo) y control de cochinilla harinosa vector de wilt.',
  cycle_days: 600,
  season: 'Plantación todo el año en trópico húmedo; cosecha programada 14-15 meses post-inducción',
  regions: ['Veracruz', 'Oaxaca', 'Tabasco', 'Quintana Roo', 'Chiapas'],
  featured_products: ['k-ultra', 'bp-koren', 'bp-fiore', 'bp-calcio', 'max-kill-plus'],
  common_challenges: ['Cochinilla harinosa (Dysmicoccus brevipes)', 'Wilt asociado a cochinilla', 'Pudrición de cogollo (Phytophthora)', 'Translucencia de pulpa', 'Coloración interna deficiente'],
  stages: [
    {
      id: 'plantacion', name: 'Plantación y Establecimiento', emoji: '🌱',
      durationDays: 90, objective: 'Arraigo de hijuelos (slips o suckers) y emisión de raíces nuevas vigorosas. La sanidad del hijuelo define todo el ciclo.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'bp-koren', productName: 'BP Koren', line: 'organicos', dose: '4 mL/L', method: 'Inmersión + drench', frequency: 'Antes de plantar + día 30', notes: 'Inmersión del hijuelo en solución activa raíces antes de plantar' },
        { productId: 'biotiza-lactobacillus', productName: 'Lactobacillus', line: 'especialidades', dose: '3 g/L', method: 'Drench', frequency: 'Día 1 + 60', notes: 'Inhibe Erwinia y bacterias que pudren cogollo' },
        { productId: 'agb-elicitor-sin', productName: 'ELICITOR-SIN®', line: 'bioproteccion', dose: '3 g/L', method: 'Drench', frequency: 'Día 1 + 45', notes: 'Trichoderma vs Phytophthora — patógeno radicular crítico en zonas húmedas', isProtection: true },
        { productId: 'max-kill-plus', productName: 'Max-Kill Plus', line: 'bioproteccion', dose: '2.5 mL/L', method: 'Aspersión a axilas de hojas', frequency: 'Mensual', notes: 'Control biológico de cochinilla desde inicio — vector del wilt de piña', isProtection: true },
      ],
    },
    {
      id: 'crecimiento-vegetativo', name: 'Crecimiento Vegetativo', emoji: '🌿',
      durationDays: 240, objective: 'Construir roseta con 30-35 hojas funcionales (D-leaf vigorosas). Tamaño y peso de la planta al momento de inducir = potencial de fruto.',
      color: 'bg-lime-100', textColor: 'text-lime-700',
      products: [
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '10 L/ha', method: 'Fertirrigación / banda foliar', frequency: 'Mensual', notes: 'N alto en vegetativo, SUSPENDER 60 días antes de inducción floral' },
        { productId: 'bp-nutri', productName: 'BP Nutri', line: 'organicos', dose: '2 mL/L', method: 'Foliar', frequency: 'Cada 30 días', notes: 'Algas + micros: piña responde fuerte a bioestimulación marina' },
        { productId: 'bp-mix', productName: 'BP Mix', line: 'nutricion', dose: '2 L/ha', method: 'Fertirrigación', frequency: 'Cada 60 días', notes: 'Micros completos — Fe y Zn especialmente clave en suelos ácidos tropicales' },
        { productId: 'mg-ultra', productName: 'Mg-Ultra', line: 'nutricion', dose: '3 L/ha', method: 'Fertirrigación', frequency: 'Cada 60 días', notes: 'Mg para clorofila — hojas D verdes oscuras = más fotosíntesis' },
      ],
    },
    {
      id: 'induccion-floral', name: 'Inducción Floral', emoji: '🌸',
      durationDays: 30, objective: 'Diferenciación floral uniforme tras aplicación de inductor (etileno/ácido NAA). Aplicación de soporte nutricional para floración densa.',
      color: 'bg-pink-100', textColor: 'text-pink-700',
      products: [
        { productId: 'bp-fiore', productName: 'BP Fioré', line: 'bioestimulantes', dose: '1 g/L', method: 'Foliar al cogollo', frequency: '3-5 días post-inducción', notes: 'Apoya diferenciación floral y uniformidad en parcela' },
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '12 L/ha', method: 'Fertirrigación', frequency: 'Subir drásticamente desde aquí', notes: 'K se vuelve el nutriente dominante hasta cosecha' },
        { productId: 'bp-boro', productName: 'BP Boro', line: 'especialidades', dose: '0.5 mL/L', method: 'Foliar', frequency: 'Al inducir', notes: 'B para viabilidad de yemas florales' },
      ],
    },
    {
      id: 'desarrollo-fruto', name: 'Desarrollo de Fruto', emoji: '🍍',
      durationDays: 180, objective: 'Engorde del fruto y acumulación de azúcares. K define peso y Brix; Ca define firmeza y resistencia al transporte.',
      color: 'bg-yellow-100', textColor: 'text-yellow-700',
      products: [
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '15 L/ha', method: 'Fertirrigación', frequency: 'Mensual', notes: 'K máximo: peso, Brix y color amarillo del fruto' },
        { productId: 'bp-potasio', productName: 'BP Potasio', line: 'organicos', dose: '3 mL/L', method: 'Foliar', frequency: 'Cada 30 días', notes: 'K orgánico complementa fertirrigación — Brix > 14° para exportación' },
        { productId: 'bp-calcio', productName: 'BP Calcio', line: 'organicos', dose: '3 mL/L', method: 'Foliar al fruto', frequency: 'Cada 30 días', notes: 'Ca evita translucencia de pulpa y mejora vida post-cosecha' },
        { productId: 'bp-gross', productName: 'BP Gross', line: 'bioestimulantes', dose: '1 g/L', method: 'Foliar al fruto', frequency: 'Mes 3 y 4 post-inducción', notes: 'Engordador para alcanzar 1.6-2 kg por fruto en MD-2' },
        { productId: 'agb-beauver', productName: 'BEAUVER®', line: 'bioproteccion', dose: '2 mL/L', method: 'Aspersión axilas', frequency: 'Mensual', notes: 'Mantener control biológico de cochinilla durante fructificación', isProtection: true },
      ],
    },
    {
      id: 'maduracion', name: 'Maduración y Cosecha', emoji: '🏆',
      durationDays: 60, objective: 'Maduración uniforme con corona vigorosa y coloración externa óptima para mercado.',
      color: 'bg-orange-100', textColor: 'text-orange-700',
      products: [
        { productId: 'bp-potasio', productName: 'BP Potasio', line: 'organicos', dose: '3 mL/L', method: 'Foliar', frequency: '20 y 10 días pre-cosecha', notes: 'K final para Brix máximo y color amarillo intenso' },
        { productId: 'ae-calcium', productName: 'AE Calcium', line: 'organicos', dose: '2.5 mL/L', method: 'Foliar', frequency: '15 días pre-cosecha', notes: 'Ca refuerza firmeza para 21 días de transporte refrigerado a destino' },
        { productId: 'bp-fresh', productName: 'BP Fresh', line: 'bioestimulantes', dose: '1 mL/L', method: 'Foliar al fruto', frequency: '7 días pre-cosecha', notes: 'Reduce carga superficial de mohos en cáscara — clave para exportación a EU y EUA', isProtection: true },
      ],
    },
  ],
}

// ─── Export ───────────────────────────────────────────────────────────────

export const EXTRA_CROP_PROTOCOLS: FullCropProtocol[] = [
  AGAVE, CEBOLLA, ESPARRAGO, PEPINO, PAPA, LECHUGA, PINA,
]
