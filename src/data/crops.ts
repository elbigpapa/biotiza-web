/**
 * crops.ts — Protocolos de nutrición por cultivo
 * 8 cultivos con etapas fenológicas y productos Biotiza recomendados
 */

import type { CropProtocol } from '@/types'

export interface StageProduct {
  productId:   string
  productName: string
  line:        string
  dose:        string
  method:      string
  frequency:   string
  notes?:      string
  isProtection?: boolean   // true → sección de bioprotección
}

export interface CropStage {
  id:          string
  name:        string
  emoji:       string
  durationDays: number
  objective:   string
  color:       string    // clase Tailwind bg-
  textColor:   string    // clase Tailwind text-
  products:    StageProduct[]
}

export interface FullCropProtocol extends Omit<CropProtocol, 'stages'> {
  stages:       CropStage[]
  emoji:        string
  gradient:     string   // classes Tailwind from-/to-
  accentColor:  string   // hex
  season:       string
  regions:      string[]
  cycle_days:   number
  common_challenges: string[]
}

// ─────────────────────────────────────────────────────────────────────────
// TOMATE
// ─────────────────────────────────────────────────────────────────────────

const TOMATE: FullCropProtocol = {
  id: 'tomate', slug: 'tomate', name: 'Tomate', scientific_name: 'Solanum lycopersicum',
  emoji: '🍅', gradient: 'from-red-700 to-red-500', accentColor: '#ef4444',
  description: 'Uno de los cultivos más importantes de México para exportación. Requiere un programa de nutrición preciso en cada etapa para lograr calibre, Brix y firmeza que cumplan los estándares internacionales.',
  cycle_days: 120,
  season: 'Todo el año bajo invernadero; ciclo otoño-invierno en campo abierto',
  regions: ['Sinaloa', 'Sonora', 'Baja California', 'Jalisco', 'Michoacán'],
  featured_products: ['bp-calcio', 'bp-moots', 'bp-cuaje', 'bp-gross', 'ca-ultra', 'zen-chrys'],
  common_challenges: ['Botrytis', 'Virosis (TYLCV)', 'Trips', 'Mosca blanca', 'Blossom end rot', 'Rajadura de fruto'],
  stages: [
    {
      id: 'trasplante', name: 'Trasplante y Enraizamiento', emoji: '🌱',
      durationDays: 14, objective: 'Establecer un sistema radicular robusto que soporte el ciclo completo. Reducir el estrés de trasplante al mínimo.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'bp-moots', productName: 'BP Moots', line: 'organicos', dose: '2 mL/L', method: 'Drench', frequency: 'Al trasplante, días 7 y 14', notes: 'Aplicar en la tarde para evitar fotodegradación del AIB' },
        { productId: 'bontera-sa10', productName: 'Bontera SA-10', line: 'nutricion', dose: '1 L/ha', method: 'Fertirrigación', frequency: 'Semanal', notes: 'Mejora la CIC y la disponibilidad de nutrientes' },
        { productId: 'p-ultra', productName: 'P-Ultra', line: 'nutricion', dose: '1 L/ha', method: 'Fertirrigación', frequency: 'Días 1, 7, 14', notes: 'El P estimula el crecimiento radicular' },
        { productId: 'zen-chrys', productName: 'Zen-Chrys', line: 'zentia', dose: '1.5 mL/L', method: 'Aspersión', frequency: 'Preventivo cada 7 días', notes: 'Prevenir mosca blanca vectora de virosis', isProtection: true },
      ],
    },
    {
      id: 'crecimiento', name: 'Crecimiento Vegetativo', emoji: '🌿',
      durationDays: 21, objective: 'Construir un dosel foliar productivo, activar la fotosíntesis y preparar la planta para floración.',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '5 L/ha', method: 'Fertirrigación', frequency: '2 veces/semana', notes: 'Alta demanda de N en crecimiento activo' },
        { productId: 'bp-nutri', productName: 'BP Nutri', line: 'organicos', dose: '1.5 mL/L', method: 'Foliar', frequency: 'Cada 10 días', notes: 'Las algas aportan citoquininas y auxinas naturales' },
        { productId: 'mg-ultra', productName: 'Mg-Ultra', line: 'nutricion', dose: '2 L/ha', method: 'Fertirrigación', frequency: 'Semanal', notes: 'Clave para la síntesis de clorofila' },
        { productId: 'bp-mix', productName: 'BP Mix', line: 'nutricion', dose: '1 L/ha', method: 'Fertirrigación', frequency: 'Cada 14 días', notes: 'Paquete completo de microelementos' },
        { productId: 'zen-fungi', productName: 'Zen-Fungi', line: 'zentia', dose: '2 mL/L', method: 'Aspersión', frequency: 'Cada 10 días', notes: 'Prevención de Botrytis y Alternaria', isProtection: true },
      ],
    },
    {
      id: 'floracion', name: 'Inducción y Floración', emoji: '🌸',
      durationDays: 14, objective: 'Maximizar la densidad de flores viables y asegurar la correcta germinación del polen.',
      color: 'bg-pink-100', textColor: 'text-pink-700',
      products: [
        { productId: 'bp-fiore', productName: 'BP Fioré', line: 'bioestimulantes', dose: '0.8 g/L', method: 'Foliar', frequency: '3 días antes y en plena flor', notes: 'Aplicar en las primeras horas del día para mejor absorción' },
        { productId: 'bp-boro', productName: 'BP Boro', line: 'especialidades', dose: '0.4 mL/L', method: 'Foliar', frequency: 'Inicio y plena flor', notes: 'Esencial para la germinación del tubo polínico' },
        { productId: 'bp-vit', productName: 'BP Vit', line: 'especialidades', dose: '1 mL/L', method: 'Foliar', frequency: 'Cada 10 días', notes: 'Activa enzimas clave del metabolismo floral' },
        { productId: 'p-ultra', productName: 'P-Ultra', line: 'nutricion', dose: '2 L/ha', method: 'Fertirrigación', frequency: 'Alta en floración', notes: 'El P es clave en la energía para la floración' },
      ],
    },
    {
      id: 'cuaje', name: 'Cuajado de Fruto', emoji: '🍅',
      durationDays: 14, objective: 'Lograr el máximo porcentaje de cuaje y prevenir el aborto floral por estrés.',
      color: 'bg-orange-100', textColor: 'text-orange-700',
      products: [
        { productId: 'bp-cuaje', productName: 'BP Cuaje', line: 'bioestimulantes', dose: '2 mL/L', method: 'Foliar', frequency: 'En plena flor, +5 días, +10 días', notes: 'Reduce el aborto floral hasta 30%' },
        { productId: 'ca-ultra', productName: 'Ca-Ultra', line: 'nutricion', dose: '3 L/ha', method: 'Fertirrigación', frequency: 'Iniciar al cuaje', notes: 'Prevenir BER desde el inicio del cuaje' },
        { productId: 'bp-calcio', productName: 'BP Calcio', line: 'organicos', dose: '2.5 mL/L', method: 'Foliar', frequency: 'Cada 7 días', notes: 'Fortalecer la pared celular del fruto recién cuajado' },
      ],
    },
    {
      id: 'engorde', name: 'Engorde de Fruto', emoji: '⚖️',
      durationDays: 28, objective: 'Maximizar el calibre comercial, el peso y los grados Brix del fruto.',
      color: 'bg-yellow-100', textColor: 'text-yellow-700',
      products: [
        { productId: 'bp-gross', productName: 'BP Gross', line: 'bioestimulantes', dose: '0.8 g/L', method: 'Foliar', frequency: 'Inicio engorde y 7 días después', notes: 'Las expansinas aceleran la elongación celular del fruto' },
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '5 L/ha', method: 'Fertirrigación', frequency: 'Alta frecuencia en engorde', notes: 'K es el motor del transporte de azúcares al fruto' },
        { productId: 'bp-potasio', productName: 'BP Potasio', line: 'organicos', dose: '2.5 mL/L', method: 'Foliar', frequency: 'Cada 10 días', notes: 'Aumenta Brix y coloración' },
        { productId: 'ae-calcium', productName: 'AE Calcium', line: 'organicos', dose: '2.5 mL/L', method: 'Foliar', frequency: 'Cada 7 días', notes: 'Máxima absorción de calcio en etapa crítica' },
        { productId: 'zen-spider', productName: 'Zen-Spider', line: 'zentia', dose: '2 mL/L', method: 'Aspersión', frequency: 'Cada 7 días si hay presión', notes: 'Control de araña roja en envés', isProtection: true },
      ],
    },
    {
      id: 'maduracion', name: 'Maduración y Cosecha', emoji: '🏆',
      durationDays: 21, objective: 'Mejorar la coloración, Brix, firmeza y vida de anaquel para cumplir estándares de exportación.',
      color: 'bg-red-100', textColor: 'text-red-700',
      products: [
        { productId: 'bp-potasio', productName: 'BP Potasio', line: 'organicos', dose: '3 mL/L', method: 'Foliar', frequency: 'Cada 7 días', notes: 'Alta demanda de K en maduración' },
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '6 L/ha', method: 'Fertirrigación', frequency: 'Máxima en pre-cosecha', notes: 'Elevar Brix y color' },
        { productId: 'bp-calcio', productName: 'BP Calcio', line: 'organicos', dose: '3 mL/L', method: 'Foliar', frequency: 'Cada 7 días', notes: 'Mantener firmeza para transporte' },
        { productId: 'healex', productName: 'Healex', line: 'zentia', dose: '1.5 mL/L', method: 'Aspersión', frequency: 'Post-poda y deshoje', notes: 'Cicatrizar heridas de deshoje para prevenir Botrytis', isProtection: true },
      ],
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────
// FRESA
// ─────────────────────────────────────────────────────────────────────────

const FRESA: FullCropProtocol = {
  id: 'fresa', slug: 'fresa', name: 'Fresa', scientific_name: 'Fragaria × ananassa',
  emoji: '🍓', gradient: 'from-rose-700 to-rose-500', accentColor: '#f43f5e',
  description: 'Cultivo de alto valor para exportación. Requiere un manejo muy fino de calcio, bioprotección constante y estimulación de la floración continua.',
  cycle_days: 180,
  season: 'Ciclo otoño-primavera principalmente; producción continua bajo invernadero',
  regions: ['Baja California', 'Jalisco', 'Guanajuato', 'México'],
  featured_products: ['ae-calcium', 'bp-fiore', 'bp-cuaje', 'zen-fungi', 'zen-chrys', 'bp-moots'],
  common_challenges: ['Botrytis cinerea', 'Oídio', 'Araña roja', 'Trips', 'Lygus', 'Phytophthora en corona'],
  stages: [
    {
      id: 'plantacion', name: 'Plantación y Arraigo', emoji: '🌱',
      durationDays: 21, objective: 'Establecer raíces fuertes y corona sana para un ciclo productivo largo.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'bp-moots', productName: 'BP Moots', line: 'organicos', dose: '2 mL/L', method: 'Drench', frequency: 'Días 1, 10, 20', notes: 'Esencial para el arraigo en camas elevadas' },
        { productId: 'biotiza-lactobacillus', productName: 'Lactobacillus', line: 'especialidades', dose: '1 g/L', method: 'Drench', frequency: 'Días 1 y 14', notes: 'Establece microbiota benéfica en sustrato' },
        { productId: 'p-ultra', productName: 'P-Ultra', line: 'nutricion', dose: '1.5 L/ha', method: 'Fertirrigación', frequency: 'Alta en arraigo', notes: 'El P es clave para el desarrollo radicular inicial' },
      ],
    },
    {
      id: 'vegetativo', name: 'Desarrollo Vegetativo', emoji: '🌿',
      durationDays: 28, objective: 'Construir una planta vigorosa con suficiente biomasa para sostener múltiples cosechas.',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '4 L/ha', method: 'Fertirrigación', frequency: 'Según CE objetivo', notes: 'Mantener CE 1.2–1.8 mS/cm en esta etapa' },
        { productId: 'bp-nitro-fx', productName: 'BP Nitro FX', line: 'organicos', dose: '1.5 mL/L', method: 'Foliar', frequency: 'Cada 14 días', notes: 'Los aminoácidos aceleran la construcción de tejido' },
        { productId: 'bp-mix', productName: 'BP Mix', line: 'nutricion', dose: '1 L/ha', method: 'Fertirrigación', frequency: 'Cada 14 días', notes: 'Microelementos para hojas sanas y oscuras' },
        { productId: 'zen-can', productName: 'Zen-Can', line: 'zentia', dose: '1.5 mL/L', method: 'Aspersión', frequency: 'Cada 10 días', notes: 'Prevención de oídio y trips desde inicio', isProtection: true },
      ],
    },
    {
      id: 'floracion', name: 'Floración Continua', emoji: '🌸',
      durationDays: 30, objective: 'Mantener una floración continua y homogénea durante toda la temporada productiva.',
      color: 'bg-pink-100', textColor: 'text-pink-700',
      products: [
        { productId: 'bp-fiore', productName: 'BP Fioré', line: 'bioestimulantes', dose: '0.7 g/L', method: 'Foliar', frequency: 'Cada 12 días', notes: 'Homogeneiza la apertura floral en toda la cama' },
        { productId: 'bp-boro', productName: 'BP Boro', line: 'especialidades', dose: '0.4 mL/L', method: 'Foliar', frequency: 'Con cada pico de floración', notes: 'Mejora la germinación del pólen en días fríos' },
        { productId: 'bp-cuaje', productName: 'BP Cuaje', line: 'bioestimulantes', dose: '2 mL/L', method: 'Foliar', frequency: 'Cada 10 días', notes: 'En fresa la cuaja continua es crítica para el rendimiento' },
        { productId: 'zen-fungi', productName: 'Zen-Fungi', line: 'zentia', dose: '2 mL/L', method: 'Aspersión', frequency: 'Cada 7 días en flor', notes: 'Botrytis es el principal problema en floración', isProtection: true },
      ],
    },
    {
      id: 'engorde', name: 'Engorde y Coloración', emoji: '🍓',
      durationDays: 21, objective: 'Maximizar calibre, firmeza, Brix y coloración uniforme del fruto.',
      color: 'bg-rose-100', textColor: 'text-rose-700',
      products: [
        { productId: 'ae-calcium', productName: 'AE Calcium', line: 'organicos', dose: '2.5 mL/L', method: 'Foliar', frequency: 'Cada 7 días', notes: 'La máxima fuente de Ca para firmeza de fresa' },
        { productId: 'bp-gross', productName: 'BP Gross', line: 'bioestimulantes', dose: '0.8 g/L', method: 'Foliar', frequency: 'Al inicio del engorde', notes: 'Aumenta el calibre comercial del fruto' },
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '4 L/ha', method: 'Fertirrigación', frequency: 'Alta en engorde', notes: 'K para Brix, color y firmeza' },
        { productId: 'zen-spider', productName: 'Zen-Spider', line: 'zentia', dose: '2 mL/L', method: 'Aspersión', frequency: 'Cada 7 días en temporada cálida', notes: 'Araña roja afecta el calibre del fruto', isProtection: true },
      ],
    },
    {
      id: 'cosecha', name: 'Cosecha Continua', emoji: '🏆',
      durationDays: 60, objective: 'Mantener la productividad y calidad durante los múltiples pases de cosecha.',
      color: 'bg-red-100', textColor: 'text-red-700',
      products: [
        { productId: 'bp-nutri', productName: 'BP Nutri', line: 'organicos', dose: '1.5 mL/L', method: 'Foliar', frequency: 'Cada 14 días', notes: 'Mantiene el vigor de la planta en cosecha continua' },
        { productId: 'bp-calcio', productName: 'BP Calcio', line: 'organicos', dose: '2.5 mL/L', method: 'Foliar', frequency: 'Cada 7 días', notes: 'Firmeza continua para transporte a EUA' },
        { productId: 'healex', productName: 'Healex', line: 'zentia', dose: '1.5 mL/L', method: 'Aspersión', frequency: 'Post-cosecha semanal', notes: 'Cicatrizar pedúnculos para prevenir Botrytis', isProtection: true },
        { productId: 'funbac-plus', productName: 'Funbac Plus', line: 'zentia', dose: '1.5 mL/L', method: 'Aspersión', frequency: 'Alternar con Zen-Fungi cada 7 días', notes: 'Rotación de modos de acción contra Botrytis', isProtection: true },
      ],
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────
// ARÁNDANO
// ─────────────────────────────────────────────────────────────────────────

const ARANDANO: FullCropProtocol = {
  id: 'arandano', slug: 'arandano', name: 'Arándano', scientific_name: 'Vaccinium corymbosum',
  emoji: '🫐', gradient: 'from-indigo-700 to-indigo-500', accentColor: '#6366f1',
  description: 'Cultivo exigente en pH ácido (4.5–5.5) y con alta demanda de microelementos. El programa de nutrición debe considerar el manejo del sustrato y la acidificación constante.',
  cycle_days: 150,
  season: 'Verano-otoño principalmente; producción escalonada según variedad',
  regions: ['Jalisco', 'Michoacán', 'Baja California', 'Sinaloa'],
  featured_products: ['bp-ferrum', 'bp-moots', 'bp-koren', 'bontera-sa10', 'zen-fungi', 'zen-chrys'],
  common_challenges: ['Mummy berry', 'Botrytis', 'Monilinia', 'Trips californiano', 'Araña roja', 'Déficit de hierro en suelos altos en pH'],
  stages: [
    {
      id: 'plantacion', name: 'Plantación', emoji: '🌱',
      durationDays: 30, objective: 'Establecer raíces y micorrizas en sustrato ácido para asegurar la absorción de nutrientes.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'bp-koren', productName: 'BP Koren', line: 'organicos', dose: '1.5 mL/L', method: 'Drench', frequency: 'Días 1, 15, 30', notes: 'Alta concentración de AIB para establecimiento en sustrato' },
        { productId: 'biotiza-lactobacillus', productName: 'Lactobacillus', line: 'especialidades', dose: '1 g/L', method: 'Drench', frequency: 'Días 1 y 21', notes: 'Mejora la disponibilidad de nutrientes en pH ácido' },
        { productId: 'bontera-sa10', productName: 'Bontera SA-10', line: 'nutricion', dose: '1 L/ha', method: 'Fertirrigación', frequency: 'Semanal', notes: 'Los ácidos fúlvicos quelan nutrientes en pH bajo' },
        { productId: 'bp-ferrum', productName: 'BP Ferrum', line: 'nutricion', dose: '1 L/ha', method: 'Fertirrigación', frequency: 'Semanal', notes: 'El arándano es muy sensible a la deficiencia de hierro' },
      ],
    },
    {
      id: 'vegetativo', name: 'Brotación y Crecimiento', emoji: '🌿',
      durationDays: 30, objective: 'Desarrollar canes vigorosos y follaje sano para soportar la carga de fruta.',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '3 L/ha', method: 'Fertirrigación', frequency: '2 veces/semana', notes: 'Usar fuentes amoniacales para mantener pH bajo' },
        { productId: 'bp-zinc', productName: 'BP Zinc', line: 'nutricion', dose: '0.5 L/ha', method: 'Fertirrigación', frequency: 'Cada 14 días', notes: 'El Zn activa la síntesis de auxinas para crecimiento de canes' },
        { productId: 'mg-ultra', productName: 'Mg-Ultra', line: 'nutricion', dose: '2 L/ha', method: 'Fertirrigación', frequency: 'Semanal', notes: 'Frecuente deficiencia de Mg en sustratos ácidos' },
        { productId: 'zen-chrys', productName: 'Zen-Chrys', line: 'zentia', dose: '2 mL/L', method: 'Aspersión', frequency: 'Cada 7 días', notes: 'Trips californiano es el mayor problema en arándano', isProtection: true },
      ],
    },
    {
      id: 'floracion', name: 'Floración', emoji: '🌸',
      durationDays: 21, objective: 'Maximizar la densidad y viabilidad de flores en todo el arbusto.',
      color: 'bg-pink-100', textColor: 'text-pink-700',
      products: [
        { productId: 'bp-fiore', productName: 'BP Fioré', line: 'bioestimulantes', dose: '0.6 g/L', method: 'Foliar', frequency: 'Pre-flor y plena flor', notes: 'Homogeneizar la apertura en todas las variedades' },
        { productId: 'bp-boro', productName: 'BP Boro', line: 'especialidades', dose: '0.4 mL/L', method: 'Foliar', frequency: '2 aplicaciones en flor', notes: 'El boro es crítico para la cuaja en arándano' },
        { productId: 'bp-cuaje', productName: 'BP Cuaje', line: 'bioestimulantes', dose: '2 mL/L', method: 'Foliar', frequency: 'Plena flor y cuaje', notes: 'Reduce el aborto especialmente en temperaturas extremas' },
      ],
    },
    {
      id: 'engorde', name: 'Engorde de Baya', emoji: '🫐',
      durationDays: 35, objective: 'Maximizar calibre de baya, Brix y reducción de bacterias superficiales.',
      color: 'bg-indigo-100', textColor: 'text-indigo-700',
      products: [
        { productId: 'bp-gibb', productName: 'BP Gibb', line: 'bioestimulantes', dose: '0.3 mL/L', method: 'Foliar', frequency: 'Inicio del engorde', notes: 'AG3 aumenta el calibre de la baya hasta 15%' },
        { productId: 'bp-gross', productName: 'BP Gross', line: 'bioestimulantes', dose: '0.8 g/L', method: 'Foliar', frequency: '2 aplicaciones en engorde', notes: 'Las expansinas promueven la elongación celular de la baya' },
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '4 L/ha', method: 'Fertirrigación', frequency: 'Alta en engorde', notes: 'K para Brix y color azul uniforme' },
        { productId: 'ae-calcium', productName: 'AE Calcium', line: 'organicos', dose: '2 mL/L', method: 'Foliar', frequency: 'Cada 10 días', notes: 'Firmeza de la baya para resistir el transporte' },
        { productId: 'zen-fungi', productName: 'Zen-Fungi', line: 'zentia', dose: '2 mL/L', method: 'Aspersión', frequency: 'Cada 10 días', notes: 'Prevención de Mummy berry y Botrytis', isProtection: true },
      ],
    },
    {
      id: 'maduracion', name: 'Maduración', emoji: '🏆',
      durationDays: 14, objective: 'Lograr el color azul uniforme, firmeza óptima y vida de anaquel máxima.',
      color: 'bg-blue-100', textColor: 'text-blue-700',
      products: [
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '5 L/ha', method: 'Fertirrigación', frequency: 'Máxima en pre-cosecha', notes: 'El K activa los antocianos responsables del color azul' },
        { productId: 'bp-calcio', productName: 'BP Calcio', line: 'organicos', dose: '2.5 mL/L', method: 'Foliar', frequency: 'Cada 7 días', notes: 'Firmeza para exportación de larga distancia' },
      ],
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────
// AGUACATE
// ─────────────────────────────────────────────────────────────────────────

const AGUACATE: FullCropProtocol = {
  id: 'aguacate', slug: 'aguacate', name: 'Aguacate', scientific_name: 'Persea americana',
  emoji: '🥑', gradient: 'from-green-800 to-green-600', accentColor: '#16a34a',
  description: 'El principal cultivo de exportación de México. Requiere un programa de inducción floral preciso, manejo de Phytophthora cinnamomi y nutrición de calcio y boro para calibre y corcho interno.',
  cycle_days: 365,
  season: 'Producción continua; pico de exportación octubre-abril',
  regions: ['Michoacán', 'Jalisco', 'México', 'Nayarit', 'Guerrero'],
  featured_products: ['bp-calcio', 'bp-boro', 'bp-fiore', 'bp-cuaje', 'biotiza-calcio-boro', 'bp-oxyagro'],
  common_challenges: ['Phytophthora cinnamomi', 'Trips de aguacate', 'Barrenador de ramas', 'Corcho interno', 'Baja cuaja', 'Caída prematura de frutos'],
  stages: [
    {
      id: 'vegetativo', name: 'Crecimiento Vegetativo', emoji: '🌿',
      durationDays: 60, objective: 'Desarrollar flujos de crecimiento vigorosos y preparar las yemas para inducción floral.',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'bontera-sa10', productName: 'Bontera SA-10', line: 'nutricion', dose: '1.5 L/ha', method: 'Fertirrigación', frequency: 'Cada 21 días', notes: 'Mejora la CIC en suelos volcánicos de Michoacán' },
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '4 L/ha', method: 'Fertirrigación', frequency: 'En flujos activos', notes: 'Alta N en cada flujo de crecimiento' },
        { productId: 'bp-mix', productName: 'BP Mix', line: 'nutricion', dose: '1.5 L/ha', method: 'Fertirrigación', frequency: 'Cada 21 días', notes: 'Microelementos para hojas de exportación' },
        { productId: 'bp-oxyagro', productName: 'BP Oxyagro', line: 'organicos', dose: '2 mL/L', method: 'Drench', frequency: 'Cada 21 días', notes: 'Prevención y control de Phytophthora cinnamomi', isProtection: true },
      ],
    },
    {
      id: 'induccion', name: 'Inducción Floral', emoji: '🌸',
      durationDays: 30, objective: 'Inducir una floración homogénea y abundante en toda la huerta.',
      color: 'bg-pink-100', textColor: 'text-pink-700',
      products: [
        { productId: 'bp-fiore', productName: 'BP Fioré', line: 'bioestimulantes', dose: '1 g/L', method: 'Foliar', frequency: '2 aplicaciones antes de botón floral', notes: 'Clave para homogeneizar la inducción en huertas grandes' },
        { productId: 'bp-boro', productName: 'BP Boro', line: 'especialidades', dose: '0.5 mL/L', method: 'Foliar', frequency: 'Pre-flor y plena flor', notes: 'Esencial para la viabilidad del tubo polínico en aguacate' },
        { productId: 'bp-vit', productName: 'BP Vit', line: 'especialidades', dose: '1.2 mL/L', method: 'Foliar', frequency: 'Cada 10 días', notes: 'Activa el metabolismo enzimático de la floración' },
        { productId: 'p-ultra', productName: 'P-Ultra', line: 'nutricion', dose: '2 L/ha', method: 'Fertirrigación', frequency: 'Alta en inducción', notes: 'Alta demanda de P en inducción floral' },
      ],
    },
    {
      id: 'cuaje', name: 'Cuajado y Fruto Chícharo', emoji: '🥑',
      durationDays: 60, objective: 'Retener el máximo número de frutos cuajados y prevenir la caída prematura.',
      color: 'bg-lime-100', textColor: 'text-lime-700',
      products: [
        { productId: 'bp-cuaje', productName: 'BP Cuaje', line: 'bioestimulantes', dose: '2.5 mL/L', method: 'Foliar', frequency: 'Plena flor y fruto chícharo', notes: 'Crítico reducir la caída de fruto chícharo' },
        { productId: 'biotiza-calcio-boro', productName: 'Calcio Boro', line: 'especialidades', dose: '2 mL/L', method: 'Foliar', frequency: 'Cada 14 días', notes: 'Prevenir corcho interno desde el inicio del fruto' },
        { productId: 'bp-gibb', productName: 'BP Gibb', line: 'bioestimulantes', dose: '0.3 mL/L', method: 'Foliar', frequency: 'Fruto chícharo (3–5 mm)', notes: 'AG3 ayuda a retener frutos recién cuajados' },
      ],
    },
    {
      id: 'engorde', name: 'Engorde y Llenado', emoji: '⚖️',
      durationDays: 120, objective: 'Alcanzar el calibre comercial mínimo (14+ mm), materia seca y calidad de exportación.',
      color: 'bg-yellow-100', textColor: 'text-yellow-700',
      products: [
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '5 L/ha', method: 'Fertirrigación', frequency: 'Alta en llenado de fruto', notes: 'K para materia seca y llenado' },
        { productId: 'bp-calcio', productName: 'BP Calcio', line: 'organicos', dose: '3 mL/L', method: 'Foliar', frequency: 'Cada 14 días', notes: 'Prevenir corcho y paredes blandas' },
        { productId: 'ca-ultra', productName: 'Ca-Ultra', line: 'nutricion', dose: '4 L/ha', method: 'Fertirrigación', frequency: 'Cada 14 días', notes: 'Ca continuo durante el largo período de llenado' },
        { productId: 'zen-chrys', productName: 'Zen-Chrys', line: 'zentia', dose: '2 mL/L', method: 'Aspersión', frequency: 'Cada 14 días', notes: 'Control de trips del aguacate (Heliothrips haemorrhoidalis)', isProtection: true },
      ],
    },
    {
      id: 'cosecha', name: 'Pre-cosecha y Cosecha', emoji: '🏆',
      durationDays: 30, objective: 'Optimizar madurez de corte, materia seca mínima y vida de anaquel.',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'bp-potasio', productName: 'BP Potasio', line: 'organicos', dose: '3 mL/L', method: 'Foliar', frequency: 'Últimas 2 aplicaciones', notes: 'Elevar materia seca para estándares USDA' },
        { productId: 'bp-calcio', productName: 'BP Calcio', line: 'organicos', dose: '3 mL/L', method: 'Foliar', frequency: 'Últimas 3 aplicaciones', notes: 'Firmeza para transporte y vida de anaquel' },
      ],
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────
// CHILE
// ─────────────────────────────────────────────────────────────────────────

const CHILE: FullCropProtocol = {
  id: 'chile', slug: 'chile', name: 'Chile / Pimiento', scientific_name: 'Capsicum annuum',
  emoji: '🌶️', gradient: 'from-orange-700 to-orange-500', accentColor: '#ea580c',
  description: 'Cultivo de alto valor con demanda continua de calcio y potasio para paredes gruesas y calibre adecuado para exportación a Estados Unidos y Europa.',
  cycle_days: 150,
  season: 'Todo el año bajo invernadero; campo abierto en primavera-verano',
  regions: ['Sinaloa', 'Sonora', 'Chihuahua', 'Zacatecas', 'San Luis Potosí'],
  featured_products: ['bp-calcio', 'ae-calcium', 'bp-cuaje', 'bp-gross', 'ca-ultra', 'zen-chrys'],
  common_challenges: ['Trips (TSWV)', 'Phytophthora capsici', 'Virosis', 'Blossom end rot', 'Rajadura', 'Araña roja'],
  stages: [
    {
      id: 'trasplante', name: 'Trasplante', emoji: '🌱',
      durationDays: 14, objective: 'Establecer raíces rápidamente para un ciclo de producción rentable.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'bp-moots', productName: 'BP Moots', line: 'organicos', dose: '2 mL/L', method: 'Drench', frequency: 'Días 1, 7, 14', notes: 'Reducir el estrés de trasplante al mínimo' },
        { productId: 'p-ultra', productName: 'P-Ultra', line: 'nutricion', dose: '1.5 L/ha', method: 'Fertirrigación', frequency: 'Primera semana', notes: 'Alta demanda de P en establecimiento' },
        { productId: 'zen-chrys', productName: 'Zen-Chrys', line: 'zentia', dose: '2 mL/L', method: 'Aspersión', frequency: 'Preventivo semanal', notes: 'Trips vectores de TSWV desde trasplante', isProtection: true },
      ],
    },
    {
      id: 'vegetativo', name: 'Crecimiento Vegetativo', emoji: '🌿',
      durationDays: 28, objective: 'Construir una planta robusta con estructura para soportar la carga de frutos.',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '5 L/ha', method: 'Fertirrigación', frequency: '2 veces/semana', notes: 'Alta demanda de N en crecimiento vegetativo' },
        { productId: 'mg-ultra', productName: 'Mg-Ultra', line: 'nutricion', dose: '2 L/ha', method: 'Fertirrigación', frequency: 'Semanal', notes: 'Frecuente deficiencia en suelos arenosos del norte' },
        { productId: 'bp-nutri', productName: 'BP Nutri', line: 'organicos', dose: '1.5 mL/L', method: 'Foliar', frequency: 'Cada 14 días', notes: 'Vigor y resistencia al estrés térmico' },
      ],
    },
    {
      id: 'floracion', name: 'Floración', emoji: '🌸',
      durationDays: 21, objective: 'Homogeneizar la floración y maximizar el porcentaje de cuaje.',
      color: 'bg-pink-100', textColor: 'text-pink-700',
      products: [
        { productId: 'bp-fiore', productName: 'BP Fioré', line: 'bioestimulantes', dose: '0.8 g/L', method: 'Foliar', frequency: 'Pre-flor y plena flor', notes: 'Homogeneizar la apertura en todo el invernadero' },
        { productId: 'biotiza-calcio-boro', productName: 'Calcio Boro', line: 'especialidades', dose: '2 mL/L', method: 'Foliar', frequency: 'Plena flor y cuaje', notes: 'Combinación ideal para cuaja de chile' },
        { productId: 'bp-cuaje', productName: 'BP Cuaje', line: 'bioestimulantes', dose: '2 mL/L', method: 'Foliar', frequency: 'Cada 10 días en flor', notes: 'Reduce el aborto por altas temperaturas nocturnas' },
      ],
    },
    {
      id: 'engorde', name: 'Engorde de Fruto', emoji: '🌶️',
      durationDays: 30, objective: 'Desarrollar paredes gruesas, calibre comercial y evitar BER y rajaduras.',
      color: 'bg-orange-100', textColor: 'text-orange-700',
      products: [
        { productId: 'ae-calcium', productName: 'AE Calcium', line: 'organicos', dose: '2.5 mL/L', method: 'Foliar', frequency: 'Cada 7 días', notes: 'Paredes gruesas y prevención de BER en chile' },
        { productId: 'bp-gross', productName: 'BP Gross', line: 'bioestimulantes', dose: '0.8 g/L', method: 'Foliar', frequency: 'Inicio engorde y 7 días', notes: 'Aumentar calibre del fruto' },
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '5 L/ha', method: 'Fertirrigación', frequency: 'Alta en engorde', notes: 'K para color rojo uniforme en pimiento' },
        { productId: 'zen-spider', productName: 'Zen-Spider', line: 'zentia', dose: '2 mL/L', method: 'Aspersión', frequency: 'Cada 7 días', notes: 'Araña roja en envés durante temporada cálida', isProtection: true },
      ],
    },
    {
      id: 'maduracion', name: 'Maduración y Color', emoji: '🏆',
      durationDays: 21, objective: 'Desarrollar el color final (rojo/amarillo/naranja) y firmeza para exportación.',
      color: 'bg-red-100', textColor: 'text-red-700',
      products: [
        { productId: 'bp-potasio', productName: 'BP Potasio', line: 'organicos', dose: '3 mL/L', method: 'Foliar', frequency: 'Cada 7 días', notes: 'Potasio activa los pigmentos de color en pimiento' },
        { productId: 'bp-calcio', productName: 'BP Calcio', line: 'organicos', dose: '3 mL/L', method: 'Foliar', frequency: 'Cada 7 días', notes: 'Firmeza para transporte' },
      ],
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────
// Cultivos simplificados (Frambuesa, Zarzamora, Cítricos)
// ─────────────────────────────────────────────────────────────────────────

const FRAMBUESA: FullCropProtocol = {
  id: 'frambuesa', slug: 'frambuesa', name: 'Frambuesa', scientific_name: 'Rubus idaeus',
  emoji: '🍇', gradient: 'from-purple-700 to-purple-500', accentColor: '#9333ea',
  description: 'Cultivo de alto valor con programa similar al arándano. Alta demanda de calcio para firmeza y manejo continuo de Botrytis.',
  cycle_days: 160,
  season: 'Primavera-verano principalmente',
  regions: ['Jalisco', 'Michoacán', 'Baja California'],
  featured_products: ['bp-moots', 'ae-calcium', 'zen-fungi', 'zen-chrys', 'bp-fiore', 'bp-cuaje'],
  common_challenges: ['Botrytis', 'Oídio', 'Araña roja', 'Trips', 'Phytophthora en corona'],
  stages: [
    {
      id: 'plantacion', name: 'Plantación y Arraigo', emoji: '🌱',
      durationDays: 21, objective: 'Establecer canes primocane y raíces absorbentes.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'bp-moots', productName: 'BP Moots', line: 'organicos', dose: '2 mL/L', method: 'Drench', frequency: 'Días 1, 10, 21', notes: 'Arraigo en sistema de camas o maceta' },
        { productId: 'biotiza-lactobacillus', productName: 'Lactobacillus', line: 'especialidades', dose: '1 g/L', method: 'Drench', frequency: 'Días 1 y 14', notes: 'Inocular microbiota benéfica desde inicio' },
        { productId: 'zen-chrys', productName: 'Zen-Chrys', line: 'zentia', dose: '1.5 mL/L', method: 'Aspersión', frequency: 'Preventivo semanal', notes: 'Trips desde el inicio del ciclo', isProtection: true },
      ],
    },
    {
      id: 'vegetativo', name: 'Crecimiento de Canes', emoji: '🌿',
      durationDays: 30, objective: 'Desarrollar canes floricanes robustos con múltiples primordios florales.',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '3 L/ha', method: 'Fertirrigación', frequency: 'Alta en crecimiento', notes: 'N para elongación de canes' },
        { productId: 'bp-nutri', productName: 'BP Nutri', line: 'organicos', dose: '1.5 mL/L', method: 'Foliar', frequency: 'Cada 14 días', notes: 'Vigor y respuesta al estrés' },
        { productId: 'zen-fungi', productName: 'Zen-Fungi', line: 'zentia', dose: '2 mL/L', method: 'Aspersión', frequency: 'Cada 10 días', notes: 'Oídio y Botrytis desde inicio de crecimiento', isProtection: true },
      ],
    },
    {
      id: 'floracion', name: 'Floración y Cuaje', emoji: '🌸',
      durationDays: 21, objective: 'Máximo cuaje de drupas en cada inflorescencia.',
      color: 'bg-pink-100', textColor: 'text-pink-700',
      products: [
        { productId: 'bp-fiore', productName: 'BP Fioré', line: 'bioestimulantes', dose: '0.7 g/L', method: 'Foliar', frequency: 'Pre-flor y plena flor', notes: 'Homogeneizar apertura en toda la planta' },
        { productId: 'bp-cuaje', productName: 'BP Cuaje', line: 'bioestimulantes', dose: '2 mL/L', method: 'Foliar', frequency: 'Plena flor, +5 días', notes: 'Cuaje máximo de drupas por inflorescencia' },
        { productId: 'bp-boro', productName: 'BP Boro', line: 'especialidades', dose: '0.4 mL/L', method: 'Foliar', frequency: 'En flor', notes: 'Viabilidad del tubo polínico' },
        { productId: 'zen-fungi', productName: 'Zen-Fungi', line: 'zentia', dose: '2 mL/L', method: 'Aspersión', frequency: 'Cada 7 días en flor', notes: 'Botrytis en flores es la mayor pérdida', isProtection: true },
      ],
    },
    {
      id: 'engorde', name: 'Engorde y Cosecha', emoji: '🍇',
      durationDays: 30, objective: 'Calibre, firmeza y Brix óptimos para exportación.',
      color: 'bg-purple-100', textColor: 'text-purple-700',
      products: [
        { productId: 'ae-calcium', productName: 'AE Calcium', line: 'organicos', dose: '2 mL/L', method: 'Foliar', frequency: 'Cada 7 días', notes: 'Firmeza de drupa para transporte aéreo a EUA' },
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '4 L/ha', method: 'Fertirrigación', frequency: 'Alta en engorde', notes: 'K para Brix y color rojo uniforme' },
        { productId: 'healex', productName: 'Healex', line: 'zentia', dose: '1.5 mL/L', method: 'Aspersión', frequency: 'Post-cosecha', notes: 'Cicatrizar pedúnculos', isProtection: true },
      ],
    },
  ],
}

const ZARZAMORA: FullCropProtocol = {
  id: 'zarzamora', slug: 'zarzamora', name: 'Zarzamora', scientific_name: 'Rubus fruticosus',
  emoji: '🫐', gradient: 'from-violet-800 to-violet-600', accentColor: '#7c3aed',
  description: 'México es el mayor exportador mundial de zarzamora, con Michoacán como epicentro. Programa muy similar a frambuesa con énfasis en firmeza y Botrytis.',
  cycle_days: 180,
  season: 'Todo el año con manejo de riego; picos en otoño-invierno',
  regions: ['Michoacán', 'Jalisco', 'Baja California'],
  featured_products: ['ae-calcium', 'bp-fiore', 'zen-fungi', 'k-ultra', 'bp-moots', 'bp-gross'],
  common_challenges: ['Botrytis cinerea', 'Antracnosis', 'Araña roja', 'Trips', 'Phytophthora'],
  stages: [
    {
      id: 'brotacion', name: 'Brotación y Crecimiento', emoji: '🌱',
      durationDays: 30, objective: 'Brotación homogénea y desarrollo de canes productivos.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'bp-moots', productName: 'BP Moots', line: 'organicos', dose: '2 mL/L', method: 'Drench', frequency: 'Al inicio de brotación', notes: 'Estimular la brotación homogénea de yemas' },
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '4 L/ha', method: 'Fertirrigación', frequency: 'Alta en brotación', notes: 'N para elongación vigorosa de canes' },
        { productId: 'zen-can', productName: 'Zen-Can', line: 'zentia', dose: '1.5 mL/L', method: 'Aspersión', frequency: 'Cada 10 días', notes: 'Antracnosis y oídio desde brotación', isProtection: true },
      ],
    },
    {
      id: 'floracion', name: 'Floración', emoji: '🌸',
      durationDays: 21, objective: 'Floración homogénea y vigorosa con máximo cuaje de drupas.',
      color: 'bg-pink-100', textColor: 'text-pink-700',
      products: [
        { productId: 'bp-fiore', productName: 'BP Fioré', line: 'bioestimulantes', dose: '0.7 g/L', method: 'Foliar', frequency: 'Pre-flor y plena flor', notes: 'Homogeneizar la apertura floral' },
        { productId: 'bp-cuaje', productName: 'BP Cuaje', line: 'bioestimulantes', dose: '2 mL/L', method: 'Foliar', frequency: 'Plena flor y cuaje', notes: 'Maximizar el cuaje de drupas por inflorescencia' },
        { productId: 'zen-fungi', productName: 'Zen-Fungi', line: 'zentia', dose: '2 mL/L', method: 'Aspersión', frequency: 'Cada 7 días', notes: 'Botrytis en flor es la principal pérdida', isProtection: true },
      ],
    },
    {
      id: 'engorde', name: 'Engorde y Maduración', emoji: '🫐',
      durationDays: 35, objective: 'Calibre, firmeza y brix óptimos. El mercado exige frutos firmes y uniformes.',
      color: 'bg-violet-100', textColor: 'text-violet-700',
      products: [
        { productId: 'ae-calcium', productName: 'AE Calcium', line: 'organicos', dose: '2.5 mL/L', method: 'Foliar', frequency: 'Cada 7 días', notes: 'La firmeza es el primer parámetro de rechazo en exportación' },
        { productId: 'bp-gross', productName: 'BP Gross', line: 'bioestimulantes', dose: '0.8 g/L', method: 'Foliar', frequency: 'Inicio del engorde', notes: 'Maximizar calibre comercial' },
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '5 L/ha', method: 'Fertirrigación', frequency: 'Alta en engorde-maduración', notes: 'K para color negro uniforme y Brix' },
        { productId: 'funbac-plus', productName: 'Funbac Plus', line: 'zentia', dose: '1.5 mL/L', method: 'Aspersión', frequency: 'Alternar con Zen-Fungi cada 7 días', notes: 'Rotación en control de Botrytis y Antracnosis', isProtection: true },
      ],
    },
  ],
}

const CITRICOS: FullCropProtocol = {
  id: 'citricos', slug: 'citricos', name: 'Cítricos', scientific_name: 'Citrus spp.',
  emoji: '🍊', gradient: 'from-amber-600 to-amber-400', accentColor: '#d97706',
  description: 'México ocupa los primeros lugares mundiales en producción de limón, naranja y mandarina. El programa debe contemplar la inducción floral en la época seca y el manejo de Phytophthora.',
  cycle_days: 365,
  season: 'Producción escalonada según variedad y región',
  regions: ['Veracruz', 'Tamaulipas', 'Colima', 'Michoacán', 'Jalisco', 'San Luis Potosí'],
  featured_products: ['bp-boro', 'bp-fiore', 'bp-cuaje', 'bp-calcio', 'bp-mix', 'bp-oxyagro'],
  common_challenges: ['Phytophthora spp.', 'Huanglongbing (HLB)', 'Trips de la flor', 'Escamas', 'Caída de frutos jóvenes', 'Deficiencia de hierro y zinc'],
  stages: [
    {
      id: 'reposo', name: 'Reposo e Inducción', emoji: '😴',
      durationDays: 45, objective: 'Inducir el estrés hídrico necesario para una floración abundante y homogénea.',
      color: 'bg-amber-100', textColor: 'text-amber-700',
      products: [
        { productId: 'bp-fiore', productName: 'BP Fioré', line: 'bioestimulantes', dose: '1 g/L', method: 'Foliar', frequency: '2 aplicaciones en pre-flor', notes: 'Aplicar al reiniciar riego post-estrés hídrico' },
        { productId: 'bp-boro', productName: 'BP Boro', line: 'especialidades', dose: '0.5 mL/L', method: 'Foliar', frequency: 'Inicio de botón floral', notes: 'Esencial para la viabilidad del tubo polínico' },
        { productId: 'bontera-sa10', productName: 'Bontera SA-10', line: 'nutricion', dose: '2 L/ha', method: 'Fertirrigación', frequency: 'Al reiniciar riego', notes: 'Reactivar la microbiota y nutrición del suelo' },
      ],
    },
    {
      id: 'floracion', name: 'Floración y Cuaje', emoji: '🌸',
      durationDays: 30, objective: 'Maximizar el cuaje de frutos y reducir la caída de junio.',
      color: 'bg-yellow-100', textColor: 'text-yellow-700',
      products: [
        { productId: 'bp-cuaje', productName: 'BP Cuaje', line: 'bioestimulantes', dose: '2.5 mL/L', method: 'Foliar', frequency: 'Plena flor y caída de pétalos', notes: 'Reducir la caída fisiológica de frutos jóvenes' },
        { productId: 'biotiza-calcio-boro', productName: 'Calcio Boro', line: 'especialidades', dose: '2 mL/L', method: 'Foliar', frequency: 'En floración', notes: 'Combinación ideal para cuaje de cítricos' },
        { productId: 'bp-vit', productName: 'BP Vit', line: 'especialidades', dose: '1 mL/L', method: 'Foliar', frequency: 'Cada 10 días', notes: 'Activar el metabolismo durante la floración' },
        { productId: 'zen-chrys', productName: 'Zen-Chrys', line: 'zentia', dose: '2 mL/L', method: 'Aspersión', frequency: 'En flor', notes: 'Trips de la flor en cítricos', isProtection: true },
      ],
    },
    {
      id: 'crecimiento-fruto', name: 'Crecimiento del Fruto', emoji: '🍊',
      durationDays: 90, objective: 'Desarrollar el tamaño comercial y prevenir la caída de frutos.',
      color: 'bg-orange-100', textColor: 'text-orange-700',
      products: [
        { productId: 'bp-calcio', productName: 'BP Calcio', line: 'organicos', dose: '2.5 mL/L', method: 'Foliar', frequency: 'Cada 14 días', notes: 'Esencial para el desarrollo del fruto en cítricos' },
        { productId: 'bp-mix', productName: 'BP Mix', line: 'nutricion', dose: '1.5 L/ha', method: 'Fertirrigación', frequency: 'Cada 21 días', notes: 'Microelementos para follaje sano y fruto de exportación' },
        { productId: 'bp-ferrum', productName: 'BP Ferrum', line: 'nutricion', dose: '1 L/ha', method: 'Fertirrigación', frequency: 'Cada 21 días', notes: 'Corrección de clorosis férrica en suelos calizos' },
        { productId: 'bp-oxyagro', productName: 'BP Oxyagro', line: 'organicos', dose: '2 mL/L', method: 'Drench', frequency: 'Cada 30 días', notes: 'Prevención de Phytophthora en suelos pesados', isProtection: true },
      ],
    },
    {
      id: 'maduracion', name: 'Maduración', emoji: '🏆',
      durationDays: 60, objective: 'Desarrollar color, Brix y acidez óptimos para exportación.',
      color: 'bg-amber-100', textColor: 'text-amber-700',
      products: [
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '5 L/ha', method: 'Fertirrigación', frequency: 'Alta en maduración', notes: 'K para color, Brix y acidez equilibrados' },
        { productId: 'bp-potasio', productName: 'BP Potasio', line: 'organicos', dose: '3 mL/L', method: 'Foliar', frequency: 'Últimas 3 aplicaciones', notes: 'Elevar Brix para cumplir estándares de exportación' },
      ],
    },
  ],
}

// ─── Export principal ─────────────────────────────────────────────────────

export const CROP_PROTOCOLS: FullCropProtocol[] = [
  TOMATE, FRESA, ARANDANO, FRAMBUESA, ZARZAMORA, AGUACATE, CHILE, CITRICOS,
]

export function getCropBySlug(slug: string): FullCropProtocol | undefined {
  return CROP_PROTOCOLS.find(c => c.slug === slug)
}
