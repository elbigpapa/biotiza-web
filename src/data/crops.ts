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
        { productId: 'vgn-brotanic', productName: 'Brotanic', line: 'nutricion', dose: '1.0 → 1.5 → 2.0 L / 200 L agua (foliar) · 1–3 L/ha (riego)', method: 'Foliar / Fertirrigación', frequency: '3 aplicaciones escalonadas en el ciclo vegetativo y reproductivo', notes: 'Veganic · Cu 1.66 % + Mn 0.90 % + Zn 0.59 %. Previene clorosis y deficiencias de micros. Grupo hortalizas.' },
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
        { productId: 'vgn-brotanic', productName: 'Brotanic', line: 'nutricion', dose: '1.5 → 2.0 → 2.5 L / 200 L agua (foliar) · 2–3 L/ha (riego)', method: 'Foliar / Fertirrigación', frequency: '3 aplicaciones escalonadas', notes: 'Veganic · Cu + Mn + Zn para vigor foliar y prevención de deficiencias en sustrato ácido. Grupo frutales.' },
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
        { productId: 'vgn-brotanic', productName: 'Brotanic', line: 'nutricion', dose: '1.5 → 2.0 → 2.5 L / 200 L agua (foliar) · 2–3 L/ha (riego)', method: 'Foliar / Fertirrigación', frequency: '3 aplicaciones escalonadas', notes: 'Veganic · pH 2.73 favorece asimilación de Cu, Mn y Zn en pH de suelo bajo. Grupo frutales.' },
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
        { productId: 'vgn-brotanic', productName: 'Brotanic', line: 'nutricion', dose: '1.5 → 2.0 → 2.5 L / 200 L agua (foliar) · 2–3 L/ha (riego)', method: 'Foliar / Fertirrigación', frequency: '3 aplicaciones escalonadas por flujo vegetativo', notes: 'Veganic · refuerza Cu + Mn + Zn antes de inducción floral; mejora viabilidad de polen. Grupo frutales.' },
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
        { productId: 'vgn-brotanic', productName: 'Brotanic', line: 'nutricion', dose: '1.0 → 1.5 → 2.0 L / 200 L agua (foliar) · 1–3 L/ha (riego)', method: 'Foliar / Fertirrigación', frequency: '3 aplicaciones escalonadas', notes: 'Veganic · corrige clorosis y BER incipiente en chile por deficiencia de Mn/Zn. Grupo hortalizas.' },
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
        { productId: 'vgn-brotanic', productName: 'Brotanic', line: 'nutricion', dose: '1.5 → 2.0 → 2.5 L / 200 L agua (foliar) · 2–3 L/ha (riego)', method: 'Foliar / Fertirrigación', frequency: '3 aplicaciones escalonadas', notes: 'Veganic · Cu + Mn + Zn para elongación homogénea de canes y prevención de micros. Grupo frutales.' },
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
        { productId: 'vgn-brotanic', productName: 'Brotanic', line: 'nutricion', dose: '1.5 → 2.0 → 2.5 L / 200 L agua (foliar) · 2–3 L/ha (riego)', method: 'Foliar / Fertirrigación', frequency: '3 aplicaciones escalonadas', notes: 'Veganic · activa enzimas fotosintéticas y viabilidad de polen en nuevos brotes. Grupo frutales.' },
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
        { productId: 'vgn-brotanic', productName: 'Brotanic', line: 'nutricion', dose: '1.5 → 2.0 → 2.5 L / 200 L agua (foliar) · 2–3 L/ha (riego)', method: 'Foliar / Fertirrigación', frequency: '3 aplicaciones escalonadas', notes: 'Veganic · complementa Zn y Mn (deficiencia típica en cítricos) y refuerza inmunidad por Cu. Grupo frutales.' },
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

// ─────────────────────────────────────────────────────────────────────────
// TOMATE CHERRY
// ─────────────────────────────────────────────────────────────────────────

const TOMATE_CHERRY: FullCropProtocol = {
  id: 'tomate-cherry', slug: 'tomate-cherry', name: 'Tomate Cherry', scientific_name: 'Solanum lycopersicum var. cerasiforme',
  emoji: '🍒', gradient: 'from-red-600 to-red-400', accentColor: '#dc2626',
  description: 'Especialidad de alto valor para exportación premium a Estados Unidos, Canadá y Europa. El programa se centra en maximizar Brix (8–10 °Bx), firmeza y uniformidad de calibre en racimos completos — parámetros críticos de rechazo en retail de alta gama.',
  cycle_days: 130,
  season: 'Producción continua bajo invernadero; 3–4 ciclos cortos al año',
  regions: ['Sinaloa', 'Baja California', 'Jalisco', 'Querétaro', 'San Luis Potosí'],
  featured_products: ['bp-calcio', 'bp-gross', 'bp-potasio', 'k-ultra', 'ae-calcium', 'zen-chrys'],
  common_challenges: ['Rajadura de fruto por desbalance hídrico', 'Botrytis en racimos densos', 'Mosca blanca vectora de virosis', 'Pérdida de Brix por sobre-riego', 'Caída de racimos completos'],
  stages: [
    {
      id: 'trasplante', name: 'Trasplante y Enraizamiento', emoji: '🌱',
      durationDays: 14, objective: 'Lograr un arraigo uniforme en todo el lote para que las cosechas escalonadas sean predecibles.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'bp-moots', productName: 'BP Moots', line: 'organicos', dose: '2 mL/L', method: 'Drench', frequency: 'Días 1, 7, 14', notes: 'En cherry el arraigo debe ser homogéneo para evitar racimos desfasados' },
        { productId: 'p-ultra', productName: 'P-Ultra', line: 'nutricion', dose: '1.5 L/ha', method: 'Fertirrigación', frequency: 'Primeros 14 días', notes: 'El P es clave para raíces finas exploradoras que definen Brix futuro' },
        { productId: 'bontera-sa10', productName: 'Bontera SA-10', line: 'nutricion', dose: '1 L/ha', method: 'Fertirrigación', frequency: 'Semanal', notes: 'CIC alta libera micros para color y Brix más adelante' },
        { productId: 'agb-elicitor-sin', productName: 'ELICITOR-SIN® (Trichoderma)', line: 'zentia', dose: '240 g/ha', method: 'Drench', frequency: 'Día 1 y día 14', notes: 'Colonización rizosférica para prevenir Fusarium y Pythium', isProtection: true },
      ],
    },
    {
      id: 'vegetativo', name: 'Crecimiento Vegetativo', emoji: '🌿',
      durationDays: 25, objective: 'Construir dosel foliar controlado — en cherry se evita exceso de N para no perder Brix.',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '4 L/ha', method: 'Fertirrigación', frequency: '2 veces/semana', notes: 'Dosis moderada — exceso de N reduce Brix hasta 2 puntos' },
        { productId: 'mg-ultra', productName: 'Mg-Ultra', line: 'nutricion', dose: '2 L/ha', method: 'Fertirrigación', frequency: 'Semanal', notes: 'Clorofila activa = mayor tasa fotosintética = más Brix' },
        { productId: 'bp-mix', productName: 'BP Mix', line: 'nutricion', dose: '1 L/ha', method: 'Fertirrigación', frequency: 'Cada 14 días', notes: 'Micros completos para metabolismo de azúcares' },
        { productId: 'vgn-brotanic', productName: 'Brotanic', line: 'nutricion', dose: '1.0 → 1.5 → 2.0 L / 200 L agua', method: 'Foliar', frequency: '3 aplicaciones escalonadas', notes: 'Veganic · Cu + Mn + Zn para fortaleza foliar y viabilidad de polen en racimos múltiples' },
      ],
    },
    {
      id: 'floracion', name: 'Floración Continua', emoji: '🌸',
      durationDays: 21, objective: 'Homogeneizar la apertura floral de los primeros 5–7 racimos para uniformidad en cosecha.',
      color: 'bg-pink-100', textColor: 'text-pink-700',
      products: [
        { productId: 'bp-fiore', productName: 'BP Fioré', line: 'bioestimulantes', dose: '0.8 g/L', method: 'Foliar', frequency: 'Pre-flor y plena flor de 3er racimo', notes: 'Homogeneiza la apertura simultánea de múltiples racimos' },
        { productId: 'biotiza-calcio-boro', productName: 'Calcio Boro', line: 'especialidades', dose: '2 mL/L', method: 'Foliar', frequency: 'Plena flor', notes: 'Boro crítico para viabilidad de polen en racimos largos' },
        { productId: 'bp-cuaje', productName: 'BP Cuaje', line: 'bioestimulantes', dose: '2 mL/L', method: 'Foliar', frequency: 'Cada 10 días en flor', notes: 'Reducir aborto floral — en cherry cada flor cuenta por el alto número por planta' },
        { productId: 'zen-chrys', productName: 'Zen-Chrys', line: 'zentia', dose: '1.5 mL/L', method: 'Aspersión', frequency: 'Preventivo cada 7 días', notes: 'Mosca blanca vectora de TYLCV — crítico en invernaderos', isProtection: true },
      ],
    },
    {
      id: 'cuaje-engorde', name: 'Cuaje y Engorde', emoji: '🍒',
      durationDays: 28, objective: 'Maximizar número de frutos por racimo y uniformidad de calibre (18–22 mm estándar cherry).',
      color: 'bg-orange-100', textColor: 'text-orange-700',
      products: [
        { productId: 'bp-cuaje', productName: 'BP Cuaje', line: 'bioestimulantes', dose: '2 mL/L', method: 'Foliar', frequency: 'Cuaje y +5 días', notes: 'Esencial retener flor distal del racimo (la más tardía)' },
        { productId: 'ca-ultra', productName: 'Ca-Ultra', line: 'nutricion', dose: '3 L/ha', method: 'Fertirrigación', frequency: 'Desde cuaje', notes: 'Prevención temprana de rajadura — el cherry es hipersensible a estrés hídrico' },
        { productId: 'ae-calcium', productName: 'AE Calcium', line: 'organicos', dose: '2.5 mL/L', method: 'Foliar', frequency: 'Cada 7 días', notes: 'Máxima absorción de Ca para firmeza y vida de anaquel' },
        { productId: 'bp-gross', productName: 'BP Gross', line: 'bioestimulantes', dose: '0.8 g/L', method: 'Foliar', frequency: 'Inicio engorde', notes: 'Expansinas para calibre uniforme en todo el racimo' },
        { productId: 'bp-acua', productName: 'BP Acua', line: 'bioestimulantes', dose: '0.8 mL/L en agua de riego', method: 'Fertirrigación', frequency: 'Cada 21 días', notes: 'Limpieza de biofilm para uniformidad de riego — en cherry un gotero tapado genera rajadura', isProtection: true },
      ],
    },
    {
      id: 'maduracion-cosecha', name: 'Maduración y Cosecha Continua', emoji: '🏆',
      durationDays: 42, objective: 'Alcanzar 8–10 °Bx, color rojo intenso uniforme y vida de anaquel de 14+ días para exportación aérea.',
      color: 'bg-red-100', textColor: 'text-red-700',
      products: [
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '6 L/ha', method: 'Fertirrigación', frequency: 'Máxima en pre-cosecha', notes: 'K eleva Brix directamente — meta 8+ °Bx para cherry premium' },
        { productId: 'bp-potasio', productName: 'BP Potasio', line: 'organicos', dose: '3 mL/L', method: 'Foliar', frequency: 'Cada 7 días', notes: 'Vía foliar potencia color rojo uniforme del fruto' },
        { productId: 'bp-calcio', productName: 'BP Calcio', line: 'organicos', dose: '2.5 mL/L', method: 'Foliar', frequency: 'Cada 7 días', notes: 'Firmeza — el cherry viaja largas distancias en clamshell' },
        { productId: 'zen-fungi', productName: 'Zen-Fungi', line: 'zentia', dose: '2 mL/L', method: 'Aspersión', frequency: 'Cada 7–10 días', notes: 'Botrytis en racimos densos post-deshoje', isProtection: true },
        { productId: 'healex', productName: 'Healex', line: 'zentia', dose: '1.5 mL/L', method: 'Aspersión', frequency: 'Post-deshoje', notes: 'Cicatrizar heridas que son puerta de entrada de Botrytis', isProtection: true },
      ],
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────
// BRÓCOLI
// ─────────────────────────────────────────────────────────────────────────

const BROCOLI: FullCropProtocol = {
  id: 'brocoli', slug: 'brocoli', name: 'Brócoli', scientific_name: 'Brassica oleracea var. italica',
  emoji: '🥦', gradient: 'from-green-700 to-green-500', accentColor: '#15803d',
  description: 'Principal hortaliza de exportación de Guanajuato y Bajío con destino EUA y Japón. Alta demanda de microelementos — especialmente Zn, B y Mo — que definen la compactación y uniformidad de la pella. Deficiencias en estos micros generan "hollow stem" (tallo hueco) y "browning" (pardeamiento), los dos mayores factores de rechazo.',
  cycle_days: 110,
  season: 'Siembra agosto-enero; ciclo corto otoño-invierno en Bajío',
  regions: ['Guanajuato', 'Querétaro', 'Michoacán', 'Estado de México', 'Puebla'],
  featured_products: ['bp-mol', 'bp-boro', 'bp-zinc', 'bp-mix', 'ae-calcium', 'n-ultra'],
  common_challenges: ['Hollow stem por deficiencia de boro', 'Pardeamiento interno por bajo Ca', 'Alternaria brassicicola', 'Mildiu (Peronospora parasitica)', 'Palomilla dorso-diamante (Plutella)', 'Oruga importada'],
  stages: [
    {
      id: 'siembra', name: 'Siembra y Establecimiento', emoji: '🌱',
      durationDays: 18, objective: 'Lograr prendimiento uniforme de trasplante y raíz vigorosa en los primeros 15 días críticos.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'bp-moots', productName: 'BP Moots', line: 'organicos', dose: '2 mL/L', method: 'Drench', frequency: 'Días 1 y 10', notes: 'AIB + extracto de algas reducen estrés de trasplante' },
        { productId: 'p-ultra', productName: 'P-Ultra', line: 'nutricion', dose: '2 L/ha', method: 'Fertirrigación', frequency: 'Primera quincena', notes: 'P alto para raíz — crítico en ciclo corto de 110 días' },
        { productId: 'bontera-sa10', productName: 'Bontera SA-10', line: 'nutricion', dose: '1.5 L/ha', method: 'Fertirrigación', frequency: 'Cada 10 días', notes: 'Mejora CIC en suelos Vertisoles del Bajío' },
        { productId: 'agb-elicitor-sin', productName: 'ELICITOR-SIN® (Trichoderma)', line: 'zentia', dose: '240 g/ha', method: 'Drench', frequency: 'Al trasplante', notes: 'Previene damping-off y Rhizoctonia en siembras densas', isProtection: true },
      ],
    },
    {
      id: 'vegetativo', name: 'Desarrollo Vegetativo', emoji: '🌿',
      durationDays: 45, objective: 'Desarrollar 16–18 hojas verdaderas sanas — la biomasa foliar determina directamente el tamaño final de la pella.',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '6 L/ha', method: 'Fertirrigación', frequency: '3 veces/semana', notes: 'Brócoli es uno de los cultivos más exigentes en N — hasta 280 kg/ha/ciclo' },
        { productId: 'mg-ultra', productName: 'Mg-Ultra', line: 'nutricion', dose: '2 L/ha', method: 'Fertirrigación', frequency: 'Semanal', notes: 'Deficiencia frecuente en Bajío — genera amarillamiento intervenal' },
        { productId: 'bp-zinc', productName: 'BP Zinc', line: 'nutricion', dose: '0.5 L/ha', method: 'Fertirrigación', frequency: 'Cada 14 días', notes: 'Zn activa auxinas para elongación de tallo principal' },
        { productId: 'vgn-brotanic', productName: 'Brotanic', line: 'nutricion', dose: '1.0 → 1.5 → 2.0 L / 200 L agua', method: 'Foliar', frequency: '3 aplicaciones escalonadas', notes: 'Veganic · Cu + Mn + Zn — Brassica es hipersensible a deficiencia de Mn' },
        { productId: 'bp-nutri', productName: 'BP Nutri', line: 'organicos', dose: '1.5 mL/L', method: 'Foliar', frequency: 'Cada 10 días', notes: 'Extracto de algas acelera la biomasa foliar' },
        { productId: 'max-kill-plus', productName: 'Max-Kill Plus', line: 'zentia', dose: '2.5 mL/L', method: 'Foliar', frequency: 'Al detectar Plutella', notes: 'Palomilla dorso-diamante es la plaga #1 en brócoli — neem + piretro rompen resistencia', isProtection: true },
      ],
    },
    {
      id: 'induccion', name: 'Inducción a Pella', emoji: '💎',
      durationDays: 14, objective: 'Activar la transición a órgano floral con micros completos — Mo, B y Zn son decisivos para la compactación.',
      color: 'bg-lime-100', textColor: 'text-lime-700',
      products: [
        { productId: 'bp-mol', productName: 'BP Mol', line: 'especialidades', dose: '0.8 g/L', method: 'Foliar', frequency: '2 aplicaciones pre-inducción', notes: 'Mo + B activan la nitrato-reductasa — sin Mo la pella queda suelta y amarilla' },
        { productId: 'bp-boro', productName: 'BP Boro', line: 'especialidades', dose: '0.5 mL/L', method: 'Foliar', frequency: 'Inicio inducción y +7 días', notes: 'Deficiencia de B = hollow stem (tallo hueco) = rechazo automático en exportación' },
        { productId: 'bp-mix', productName: 'BP Mix', line: 'nutricion', dose: '1.5 L/ha', method: 'Fertirrigación', frequency: 'Cada 10 días', notes: 'Paquete completo de micros durante inducción' },
        { productId: 'bp-vit', productName: 'BP Vit', line: 'especialidades', dose: '1.2 mL/L', method: 'Foliar', frequency: 'Cada 10 días', notes: 'Activa enzimas de diferenciación floral' },
      ],
    },
    {
      id: 'formacion-pella', name: 'Formación de Pella', emoji: '🥦',
      durationDays: 21, objective: 'Maximizar compactación, uniformidad de gránulo floral y color verde azulado intenso.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'ae-calcium', productName: 'AE Calcium', line: 'organicos', dose: '2.5 mL/L', method: 'Foliar', frequency: 'Cada 7 días', notes: 'Previene pardeamiento interno (browning) — primer factor de rechazo en retail' },
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '4 L/ha', method: 'Fertirrigación', frequency: 'Alta en formación', notes: 'K da firmeza de pella y resistencia al transporte refrigerado' },
        { productId: 'bp-gross', productName: 'BP Gross', line: 'bioestimulantes', dose: '0.8 g/L', method: 'Foliar', frequency: 'Inicio formación', notes: 'Expansinas aumentan calibre de pella comercial' },
        { productId: 'zen-cu', productName: 'Zen-Cu', line: 'zentia', dose: '2 mL/L', method: 'Aspersión', frequency: 'Preventivo cada 10 días', notes: 'Mildiu (Peronospora) en clima fresco-húmedo del Bajío', isProtection: true },
        { productId: 'bp-fresh', productName: 'BP Fresh', line: 'bioestimulantes', dose: '1 mL/L', method: 'Foliar', frequency: 'Cada 14 días', notes: 'Reduce carga bacteriana superficial previa a cosecha — crítico para inocuidad en exportación', isProtection: true },
      ],
    },
    {
      id: 'cosecha', name: 'Pre-cosecha y Cosecha', emoji: '🏆',
      durationDays: 12, objective: 'Fijar firmeza, color y vida de anaquel; garantizar parámetros microbiológicos para exportación.',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'bp-calcio', productName: 'BP Calcio', line: 'organicos', dose: '3 mL/L', method: 'Foliar', frequency: 'Últimas 2 aplicaciones', notes: 'Ca foliar previo a corte mantiene firmeza 7 días más en cadena fría' },
        { productId: 'bp-potasio', productName: 'BP Potasio', line: 'organicos', dose: '3 mL/L', method: 'Foliar', frequency: 'Última aplicación', notes: 'K final intensifica el color verde azulado característico' },
        { productId: 'bp-fresh', productName: 'BP Fresh', line: 'bioestimulantes', dose: '1 mL/L', method: 'Foliar', frequency: '7 días pre-cosecha', notes: 'Baja carga bacteriana superficial para cumplir auditorías de inocuidad USDA', isProtection: true },
      ],
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────
// APIO
// ─────────────────────────────────────────────────────────────────────────

const APIO: FullCropProtocol = {
  id: 'apio', slug: 'apio', name: 'Apio', scientific_name: 'Apium graveolens',
  emoji: '🥬', gradient: 'from-emerald-700 to-emerald-500', accentColor: '#059669',
  description: 'Cultivo hortícola de ciclo largo con fuerte demanda continua de calcio — la deficiencia genera "black heart" (corazón negro) y agrietamiento del pecíolo, los dos defectos que más rechaza el mercado de EUA. Post-cosecha Botrytis cinerea es el patógeno más agresivo durante el transporte refrigerado.',
  cycle_days: 140,
  season: 'Ciclo otoño-invierno-primavera; prefiere temperaturas 15–22 °C',
  regions: ['Guanajuato', 'Querétaro', 'Puebla', 'Estado de México', 'Baja California'],
  featured_products: ['bp-calcio', 'ae-calcium', 'ca-ultra', 'zen-fungi', 'bp-boro', 'bp-mix'],
  common_challenges: ['Black heart (corazón negro) por déficit de calcio', 'Agrietamiento del pecíolo', 'Botrytis cinerea post-cosecha', 'Septoriosis (Septoria apiicola)', 'Mosca minadora', 'Bacteriosis en alta humedad'],
  stages: [
    {
      id: 'trasplante', name: 'Trasplante', emoji: '🌱',
      durationDays: 21, objective: 'Establecer plantas uniformes y raíces absorbentes capaces de sostener un ciclo de 140 días con alta demanda de Ca.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'bp-moots', productName: 'BP Moots', line: 'organicos', dose: '2 mL/L', method: 'Drench', frequency: 'Días 1, 10, 21', notes: 'Arraigo rápido es clave — en apio la raíz define la capacidad de absorber Ca luego' },
        { productId: 'biotiza-lactobacillus', productName: 'Lactobacillus', line: 'especialidades', dose: '1 g/L', method: 'Drench', frequency: 'Días 1 y 14', notes: 'Competencia contra bacteriosis del suelo en camas densas' },
        { productId: 'p-ultra', productName: 'P-Ultra', line: 'nutricion', dose: '1.5 L/ha', method: 'Fertirrigación', frequency: 'Primera quincena', notes: 'P para raíz exploradora' },
        { productId: 'agb-elicitor-sin', productName: 'ELICITOR-SIN® (Trichoderma)', line: 'zentia', dose: '240 g/ha', method: 'Drench', frequency: 'Al trasplante y +14 días', notes: 'Barrera rizosférica contra Fusarium oxysporum f.sp. apii', isProtection: true },
      ],
    },
    {
      id: 'vegetativo-temprano', name: 'Crecimiento Vegetativo Temprano', emoji: '🌿',
      durationDays: 35, objective: 'Desarrollar roseta foliar vigorosa de 8–10 hojas antes del inicio del llenado de pecíolos.',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '5 L/ha', method: 'Fertirrigación', frequency: '2 veces/semana', notes: 'N alto en vegetativo — pero reducir antes de llenado para evitar agrietamiento' },
        { productId: 'mg-ultra', productName: 'Mg-Ultra', line: 'nutricion', dose: '2 L/ha', method: 'Fertirrigación', frequency: 'Semanal', notes: 'Mg mantiene el verde intenso del follaje — parámetro visual de calidad' },
        { productId: 'bp-mix', productName: 'BP Mix', line: 'nutricion', dose: '1.5 L/ha', method: 'Fertirrigación', frequency: 'Cada 14 días', notes: 'Micros completos — apio responde especialmente a Mn y Zn' },
        { productId: 'vgn-brotanic', productName: 'Brotanic', line: 'nutricion', dose: '1.0 → 1.5 → 2.0 L / 200 L agua', method: 'Foliar', frequency: '3 aplicaciones escalonadas', notes: 'Veganic · previene clorosis intervenal por Mn en suelos alcalinos' },
        { productId: 'bp-nutri', productName: 'BP Nutri', line: 'organicos', dose: '1.5 mL/L', method: 'Foliar', frequency: 'Cada 10 días', notes: 'Algas aportan citoquininas para más ramificación foliar' },
      ],
    },
    {
      id: 'llenado-peciolo', name: 'Llenado de Pecíolo', emoji: '🥬',
      durationDays: 50, objective: 'Maximizar longitud y grosor de pecíolos manteniendo firmeza — aquí se define 70% del valor comercial.',
      color: 'bg-lime-100', textColor: 'text-lime-700',
      products: [
        { productId: 'ca-ultra', productName: 'Ca-Ultra', line: 'nutricion', dose: '5 L/ha', method: 'Fertirrigación', frequency: '2 veces/semana', notes: 'Máxima demanda del ciclo — prevenir black heart exige Ca continuo' },
        { productId: 'bp-calcio', productName: 'BP Calcio', line: 'organicos', dose: '3 mL/L', method: 'Foliar', frequency: 'Cada 7 días', notes: 'Vía foliar complementa fertirrigación — llega a meristemo apical donde se forma el corazón' },
        { productId: 'ae-calcium', productName: 'AE Calcium', line: 'organicos', dose: '2.5 mL/L', method: 'Foliar', frequency: 'Cada 7 días (alternar con BP Calcio)', notes: 'Máxima asimilación de Ca — el apio es el cultivo más demandante del catálogo' },
        { productId: 'bp-boro', productName: 'BP Boro', line: 'especialidades', dose: '0.4 mL/L', method: 'Foliar', frequency: 'Cada 14 días', notes: 'B complementa Ca en la fortaleza de la pared celular' },
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '4 L/ha', method: 'Fertirrigación', frequency: 'Alta en llenado', notes: 'K mantiene turgencia y firmeza de pecíolo' },
        { productId: 'zen-fungi', productName: 'Zen-Fungi', line: 'zentia', dose: '2 mL/L', method: 'Aspersión', frequency: 'Cada 7 días preventivo', notes: 'Botrytis es el principal patógeno post-cosecha — prevenir desde campo', isProtection: true },
      ],
    },
    {
      id: 'blanqueamiento', name: 'Blanqueo y Finalización', emoji: '✨',
      durationDays: 21, objective: 'Lograr pecíolos firmes de color verde claro a blanco-crema según mercado destino, sin fibrosidad.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'bp-calcio', productName: 'BP Calcio', line: 'organicos', dose: '3 mL/L', method: 'Foliar', frequency: 'Cada 7 días', notes: 'Ca hasta la cosecha — un solo día sin Ca puede generar corazón negro' },
        { productId: 'bp-potasio', productName: 'BP Potasio', line: 'organicos', dose: '2.5 mL/L', method: 'Foliar', frequency: 'Cada 10 días', notes: 'K final para firmeza y vida de anaquel refrigerado' },
        { productId: 'max-kill-plus', productName: 'Max-Kill Plus', line: 'zentia', dose: '2 mL/L', method: 'Foliar', frequency: 'En presión de mosca minadora', notes: 'Piretro + neem rompen ciclo de Liriomyza spp. sin residuos', isProtection: true },
      ],
    },
    {
      id: 'cosecha', name: 'Cosecha y Post-cosecha', emoji: '🏆',
      durationDays: 13, objective: 'Asegurar firmeza, bajo recuento bacteriano y resistencia a Botrytis durante la cadena fría.',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'bp-calcio', productName: 'BP Calcio', line: 'organicos', dose: '3 mL/L', method: 'Foliar', frequency: '5 y 2 días pre-cosecha', notes: 'Últimas aplicaciones de Ca prolongan vida útil en anaquel 5+ días' },
        { productId: 'zen-fungi', productName: 'Zen-Fungi', line: 'zentia', dose: '2 mL/L', method: 'Aspersión', frequency: '7 y 3 días pre-cosecha', notes: 'Reduce inóculo de Botrytis que se activa en refrigeración', isProtection: true },
        { productId: 'bp-fresh', productName: 'BP Fresh', line: 'bioestimulantes', dose: '1 mL/L', method: 'Foliar', frequency: '3 días pre-cosecha', notes: 'Sanitizante foliar — cumple estándares de inocuidad para mercado USA', isProtection: true },
      ],
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────
// MAÍZ
// ─────────────────────────────────────────────────────────────────────────

const MAIZ: FullCropProtocol = {
  id: 'maiz', slug: 'maiz', name: 'Maíz', scientific_name: 'Zea mays',
  emoji: '🌽', gradient: 'from-yellow-600 to-yellow-400', accentColor: '#ca8a04',
  description: 'Grano básico de mayor superficie en México. Programa de nutrición enfocado en NPK de alto volumen con corrección puntual de Zn (deficiencia crónica en más del 60% de los suelos maiceros mexicanos). El período crítico es V6–V12 (floración pre-jilote) donde se define el número de hileras y granos por mazorca.',
  cycle_days: 140,
  season: 'Primavera-verano temporal; otoño-invierno bajo riego en Sinaloa',
  regions: ['Sinaloa', 'Jalisco', 'Chiapas', 'Guanajuato', 'Michoacán', 'Estado de México'],
  featured_products: ['n-ultra', 'p-ultra', 'k-ultra', 'bp-zinc', 'bp-mol', 'bontera-sa10'],
  common_challenges: ['Deficiencia de Zn (hoja blanca / roseta)', 'Gusano cogollero (Spodoptera frugiperda)', 'Mancha de asfalto (Phyllachora maydis)', 'Tizón foliar por Exserohilum', 'Acame por déficit de K', 'Achaparramiento viral'],
  stages: [
    {
      id: 'siembra', name: 'Siembra y Emergencia', emoji: '🌱',
      durationDays: 14, objective: 'Lograr germinación uniforme y emergencia vigorosa para establecer el stand (plantas/ha) objetivo.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'biotiza-lactobacillus', productName: 'Lactobacillus', line: 'especialidades', dose: '1 kg/ha', method: 'Fertirrigación', frequency: 'En primer riego', notes: 'Solubiliza P y Zn del suelo — reduce hasta 25% la dosis de arranque' },
        { productId: 'p-ultra', productName: 'P-Ultra', line: 'nutricion', dose: '3 L/ha', method: 'Fertirrigación', frequency: 'Pre-siembra y V1', notes: 'P de arranque clave en suelos fríos del Bajío temporal' },
        { productId: 'bontera-sa10', productName: 'Bontera SA-10', line: 'nutricion', dose: '2 L/ha', method: 'Fertirrigación', frequency: 'Primer riego', notes: 'Ácidos húmicos activan microbiota que libera P fijado en Vertisoles' },
      ],
    },
    {
      id: 'vegetativo-temprano', name: 'V3 – V6 Vegetativo Temprano', emoji: '🌿',
      durationDays: 28, objective: 'Construir sistema radicular secundario y corregir deficiencia temprana de Zn antes de V6 (punto crítico).',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '8 L/ha', method: 'Fertirrigación', frequency: 'Semanal', notes: 'N intensivo — maíz absorbe 180–250 kg N/ha/ciclo de grano' },
        { productId: 'bp-zinc', productName: 'BP Zinc', line: 'nutricion', dose: '1 L/ha', method: 'Fertirrigación', frequency: 'V3 y V5', notes: 'Zn en V3–V5 previene "hoja blanca" — deficiencia más frecuente en maíz mexicano' },
        { productId: 'vgn-brotanic', productName: 'Brotanic', line: 'nutricion', dose: '0.5 → 1.0 → 1.5 L / 200 L agua', method: 'Foliar', frequency: '3 aplicaciones escalonadas desde V3', notes: 'Veganic · Cu + Mn + Zn — el Mn activa cloroplastos y previene veteado clorótico' },
        { productId: 'max-kill-plus', productName: 'Max-Kill Plus', line: 'zentia', dose: '2.5 mL/L', method: 'Foliar', frequency: 'Al detectar Spodoptera L1–L2', notes: 'Cogollero controlado antes de L3 — piretro + neem rompen resistencia a Bt', isProtection: true },
      ],
    },
    {
      id: 'pre-floracion', name: 'V8 – VT Pre-floración', emoji: '🌾',
      durationDays: 21, objective: 'Maximizar número de hileras y granos por mazorca — aquí se define 60% del rendimiento final.',
      color: 'bg-lime-100', textColor: 'text-lime-700',
      products: [
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '10 L/ha', method: 'Fertirrigación', frequency: 'Máxima en V8–V12', notes: 'Pico de demanda de N — definición de hileras en la mazorca' },
        { productId: 'bp-mol', productName: 'BP Mol', line: 'especialidades', dose: '0.8 g/L', method: 'Foliar', frequency: '2 aplicaciones V8 y V10', notes: 'Mo activa nitrato-reductasa — traduce N absorbido en proteína de grano' },
        { productId: 'bp-boro', productName: 'BP Boro', line: 'especialidades', dose: '0.4 mL/L', method: 'Foliar', frequency: 'V10 y VT', notes: 'B es crítico para viabilidad de polen — una deficiencia en floración reduce 30% los granos' },
        { productId: 'bp-mix', productName: 'BP Mix', line: 'nutricion', dose: '1.5 L/ha', method: 'Fertirrigación', frequency: 'V10', notes: 'Micros completos antes de floración' },
      ],
    },
    {
      id: 'floracion', name: 'VT – R1 Floración y Jiloteo', emoji: '🌸',
      durationDays: 14, objective: 'Lograr polinización completa y cuaje uniforme de todos los óvulos de la mazorca.',
      color: 'bg-yellow-100', textColor: 'text-yellow-700',
      products: [
        { productId: 'bp-fiore', productName: 'BP Fioré', line: 'bioestimulantes', dose: '1 g/L', method: 'Foliar', frequency: 'Pre-floración y plena flor', notes: 'Homogeneiza emergencia de espiga y sedas (sincronización es crítica)' },
        { productId: 'bp-cuaje', productName: 'BP Cuaje', line: 'bioestimulantes', dose: '2 mL/L', method: 'Foliar', frequency: 'En R1 (sedas visibles)', notes: 'Reduce aborto de granos en punta de mazorca ante estrés térmico' },
        { productId: 'ca-ultra', productName: 'Ca-Ultra', line: 'nutricion', dose: '3 L/ha', method: 'Fertirrigación', frequency: 'R1', notes: 'Ca para fortaleza de olote y prevención de acame' },
        { productId: 'max-kill-plus', productName: 'Max-Kill Plus', line: 'zentia', dose: '2.5 mL/L', method: 'Foliar', frequency: 'En gusano elotero', notes: 'Helicoverpa zea ataca sedas y granos jóvenes — crítico no perder polinización', isProtection: true },
      ],
    },
    {
      id: 'llenado-grano', name: 'R2 – R5 Llenado de Grano', emoji: '🌽',
      durationDays: 42, objective: 'Maximizar peso de mil granos (PMG) y llenado hasta la punta — K es el motor de traslocación de azúcares.',
      color: 'bg-amber-100', textColor: 'text-amber-700',
      products: [
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '5 L/ha', method: 'Fertirrigación', frequency: 'Semanal en R3–R5', notes: 'K mueve azúcares al grano — reduce acame y eleva PMG hasta 15%' },
        { productId: 'bp-potasio', productName: 'BP Potasio', line: 'organicos', dose: '3 mL/L', method: 'Foliar', frequency: 'Cada 10 días', notes: 'K foliar complementa fertirrigación en etapa de máxima demanda' },
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '5 L/ha', method: 'Fertirrigación', frequency: 'R2–R3', notes: 'N residual para traslocación de proteína al grano' },
        { productId: 'funbac-plus', productName: 'Funbac Plus', line: 'zentia', dose: '1.5 mL/L', method: 'Aspersión', frequency: 'En presión de mancha de asfalto', notes: 'Phyllachora maydis puede defoliar 40% del dosel en llenado', isProtection: true },
      ],
    },
    {
      id: 'madurez', name: 'R6 Madurez Fisiológica', emoji: '🏆',
      durationDays: 21, objective: 'Alcanzar humedad de cosecha (14–18%) manteniendo calidad de grano para comercialización.',
      color: 'bg-yellow-100', textColor: 'text-yellow-700',
      products: [
        { productId: 'bp-potasio', productName: 'BP Potasio', line: 'organicos', dose: '3 mL/L', method: 'Foliar', frequency: 'Últimas 2 aplicaciones', notes: 'K final acelera llenado terminal y reduce riesgo de acame pre-cosecha' },
      ],
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────
// CAÑA DE AZÚCAR
// ─────────────────────────────────────────────────────────────────────────

const CANA_AZUCAR: FullCropProtocol = {
  id: 'cana-azucar', slug: 'cana-azucar', name: 'Caña de Azúcar', scientific_name: 'Saccharum officinarum',
  emoji: '🎋', gradient: 'from-lime-700 to-lime-500', accentColor: '#65a30d',
  description: 'Cultivo industrial de ciclo largo (plantilla 12–18 meses, socas subsecuentes) con la mayor demanda de potasio del catálogo — hasta 400 kg K₂O/ha. El programa se enfoca en macollamiento temprano, acumulación de sacarosa en maduración y manejo de soca (rebrote) para 4–6 años productivos por plantación.',
  cycle_days: 400,
  season: 'Plantilla siembra agosto-noviembre; zafra noviembre-mayo',
  regions: ['Veracruz', 'Jalisco', 'San Luis Potosí', 'Oaxaca', 'Chiapas', 'Tamaulipas'],
  featured_products: ['k-ultra', 'n-ultra', 'bontera-sa10', 'bp-mix', 'bp-moots', 'bp-potasio'],
  common_challenges: ['Roya naranja (Puccinia kuehnii)', 'Carbón de la caña (Sporisorium scitamineum)', 'Barrenador del tallo (Diatraea saccharalis)', 'Chinche salivosa', 'Escaldadura bacteriana', 'Bajo Pol por deficiencia de K'],
  stages: [
    {
      id: 'plantacion', name: 'Plantación y Brotación', emoji: '🌱',
      durationDays: 45, objective: 'Establecer brotación uniforme de yemas de la cepa — cada yema perdida reduce proporcionalmente el macollo final.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'bp-moots', productName: 'BP Moots', line: 'organicos', dose: '3 L/ha', method: 'Drench', frequency: 'Al momento de la plantación', notes: 'AIB estimula brotación uniforme de yemas de la cepa' },
        { productId: 'bontera-sa10', productName: 'Bontera SA-10', line: 'nutricion', dose: '3 L/ha', method: 'Fertirrigación', frequency: 'Mensual los primeros 3 meses', notes: 'Ácidos húmicos son esenciales en suelos cañeros compactados y con bajo C orgánico' },
        { productId: 'p-ultra', productName: 'P-Ultra', line: 'nutricion', dose: '3 L/ha', method: 'Fertirrigación', frequency: 'Primer mes', notes: 'P para desarrollo de raíces adventicias de la cepa' },
        { productId: 'biotiza-lactobacillus', productName: 'Lactobacillus', line: 'especialidades', dose: '1 kg/ha', method: 'Fertirrigación', frequency: 'Al sembrar y a los 30 días', notes: 'Coloniza rizósfera y mejora solubilización de P y Zn en suelos pesados' },
      ],
    },
    {
      id: 'macollamiento', name: 'Macollamiento', emoji: '🌿',
      durationDays: 90, objective: 'Maximizar número de tallos industriales por metro lineal (meta 10–14 tallos/m) — el macollo define el tonelaje final.',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '10 L/ha', method: 'Fertirrigación', frequency: 'Quincenal durante macollo', notes: 'N intensivo — caña absorbe 200–300 kg N/ha para ciclo completo' },
        { productId: 'mg-ultra', productName: 'Mg-Ultra', line: 'nutricion', dose: '3 L/ha', method: 'Fertirrigación', frequency: 'Mensual', notes: 'Mg para biomasa fotosintética — follaje verde intenso = más sacarosa futura' },
        { productId: 'bp-nutri', productName: 'BP Nutri', line: 'organicos', dose: '2 L/ha', method: 'Fertirrigación', frequency: 'Cada 21 días', notes: 'Algas aportan citoquininas que estimulan formación de tallos secundarios' },
        { productId: 'vgn-brotanic', productName: 'Brotanic', line: 'nutricion', dose: '0.5 → 1.0 → 1.5 L / 200 L agua', method: 'Foliar', frequency: '3 aplicaciones escalonadas durante macollo', notes: 'Veganic · Cu + Mn + Zn — Mn activa cloroplastos en follaje denso' },
      ],
    },
    {
      id: 'gran-crecimiento', name: 'Gran Crecimiento', emoji: '🎋',
      durationDays: 150, objective: 'Elongación de entrenudos e incremento de biomasa — caña puede crecer 3 cm/día en esta etapa con manejo adecuado.',
      color: 'bg-lime-100', textColor: 'text-lime-700',
      products: [
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '8 L/ha', method: 'Fertirrigación', frequency: 'Mensual', notes: 'Reducir gradualmente hacia el final para no retrasar maduración' },
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '8 L/ha', method: 'Fertirrigación', frequency: 'Quincenal', notes: 'Iniciar carga alta de K — caña es el cultivo con mayor demanda de K del catálogo (400 kg K₂O/ha)' },
        { productId: 'bp-mix', productName: 'BP Mix', line: 'nutricion', dose: '2 L/ha', method: 'Fertirrigación', frequency: 'Mensual', notes: 'Micros completos — Fe y Mn sostienen la tasa fotosintética alta' },
        { productId: 'bp-zinc', productName: 'BP Zinc', line: 'nutricion', dose: '1 L/ha', method: 'Fertirrigación', frequency: 'Cada 45 días', notes: 'Zn activa auxinas que elongan entrenudos — entrenudos largos = más peso por tallo' },
        { productId: 'funbac-plus', productName: 'Funbac Plus', line: 'zentia', dose: '2 mL/L', method: 'Aspersión', frequency: 'En presión de roya', notes: 'Puccinia melanocephala puede defoliar 50% del dosel en variedades susceptibles', isProtection: true },
        { productId: 'max-kill-plus', productName: 'Max-Kill Plus', line: 'zentia', dose: '3 mL/L', method: 'Foliar', frequency: 'En presencia de chinche salivosa', notes: 'Aeneolamia postica reduce Pol hasta 30% — neem + piretro para control', isProtection: true },
      ],
    },
    {
      id: 'maduracion', name: 'Maduración y Acumulación de Sacarosa', emoji: '🍯',
      durationDays: 90, objective: 'Inducir el cese del crecimiento vegetativo y traslocar máxima sacarosa al tallo — meta Pol 13–15% y Brix 18–22%.',
      color: 'bg-yellow-100', textColor: 'text-yellow-700',
      products: [
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '10 L/ha', method: 'Fertirrigación', frequency: 'Semanal en maduración', notes: 'Máxima K del ciclo — K es el motor de traslocación de sacarosa al tallo, eleva Pol 1–2 puntos' },
        { productId: 'bp-potasio', productName: 'BP Potasio', line: 'organicos', dose: '3 mL/L', method: 'Foliar', frequency: 'Cada 15 días', notes: 'K foliar refuerza traslocación en etapa crítica de acumulación' },
        { productId: 'mg-ultra', productName: 'Mg-Ultra', line: 'nutricion', dose: '2 L/ha', method: 'Fertirrigación', frequency: 'Mensual', notes: 'Mg mantiene cloroplastos activos produciendo azúcares hasta el último día' },
      ],
    },
    {
      id: 'pre-zafra', name: 'Pre-zafra', emoji: '🏆',
      durationDays: 25, objective: 'Fijar Pol máximo y preparar la cepa para una soca vigorosa en el siguiente ciclo.',
      color: 'bg-amber-100', textColor: 'text-amber-700',
      products: [
        { productId: 'bp-potasio', productName: 'BP Potasio', line: 'organicos', dose: '3 mL/L', method: 'Foliar', frequency: 'Última aplicación 15 días pre-corte', notes: 'Último empuje de K para maximizar Pol al momento del corte industrial' },
        { productId: 'bp-moots', productName: 'BP Moots', line: 'organicos', dose: '2 L/ha', method: 'Drench', frequency: 'Post-corte en el socado', notes: 'AIB estimula rebrote de yemas basales para una soca productiva' },
      ],
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────
// FRIJOL
// ─────────────────────────────────────────────────────────────────────────

const FRIJOL: FullCropProtocol = {
  id: 'frijol', slug: 'frijol', name: 'Frijol', scientific_name: 'Phaseolus vulgaris',
  emoji: '🫘', gradient: 'from-amber-800 to-amber-600', accentColor: '#92400e',
  description: 'Leguminosa de consumo masivo en México con ciclo corto (85–110 días). La planta fija 40–60 kg N/ha vía simbiosis con Rhizobium — los activadores Mo y Zn son decisivos para que el proceso opere al 100% y se reduzca la dosis de N de síntesis hasta en 40%. Programa centrado en nutrición microbiana del suelo y control de Mosaico Dorado (BGYMV).',
  cycle_days: 95,
  season: 'Primavera-verano temporal (P-V); otoño-invierno bajo riego en Sinaloa',
  regions: ['Zacatecas', 'Sinaloa', 'Durango', 'Nayarit', 'Chihuahua', 'San Luis Potosí'],
  featured_products: ['biotiza-lactobacillus', 'bp-mol', 'bp-zinc', 'bp-boro', 'p-ultra', 'zen-chrys'],
  common_challenges: ['Mosaico Dorado (BGYMV, vector Bemisia)', 'Antracnosis (Colletotrichum lindemuthianum)', 'Roya (Uromyces appendiculatus)', 'Mustia hilachosa', 'Picudo del ejote', 'Baja fijación de N en suelos sin historial de Rhizobium'],
  stages: [
    {
      id: 'siembra', name: 'Siembra e Inoculación', emoji: '🌱',
      durationDays: 10, objective: 'Establecer simbiosis con Rhizobium en las primeras raíces antes de V2 — cada día sin nódulos activos significa más dependencia de N químico.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'biotiza-lactobacillus', productName: 'Lactobacillus', line: 'especialidades', dose: '1 kg/ha', method: 'Fertirrigación', frequency: 'Al primer riego', notes: 'En suelos sin Rhizobium específico, el Lactobacillus actúa como inoculante base y solubiliza P + Zn para acelerar arraigo' },
        { productId: 'bp-moots', productName: 'BP Moots', line: 'organicos', dose: '2 L/ha', method: 'Drench', frequency: 'Al primer riego', notes: 'AIB estimula raíz principal antes de ramificación lateral — raíz fuerte = más nódulos' },
        { productId: 'p-ultra', productName: 'P-Ultra', line: 'nutricion', dose: '3 L/ha', method: 'Fertirrigación', frequency: 'Primer y segundo riego', notes: 'P es clave en leguminosas — los nódulos consumen 3× más P que el tejido vegetativo' },
        { productId: 'bontera-sa10', productName: 'Bontera SA-10', line: 'nutricion', dose: '2 L/ha', method: 'Fertirrigación', frequency: 'Primer riego', notes: 'Ácidos húmicos activan microbiota benéfica — clave en suelos degradados de Zacatecas' },
      ],
    },
    {
      id: 'vegetativo', name: 'V3 – V4 Vegetativo y Activación de Nódulos', emoji: '🌿',
      durationDays: 25, objective: 'Activar plenamente la fijación biológica de N — aportar Mo y Zn como cofactores enzimáticos de la nitrogenasa y leghemoglobina.',
      color: 'bg-green-100', textColor: 'text-green-700',
      products: [
        { productId: 'bp-mol', productName: 'BP Mol', line: 'especialidades', dose: '0.8 g/L', method: 'Foliar', frequency: 'V3 y V5', notes: 'Mo es el cofactor de la nitrogenasa — sin Mo los nódulos forman pero no fijan N (reducción hasta 40% en rendimiento)' },
        { productId: 'bp-zinc', productName: 'BP Zinc', line: 'nutricion', dose: '0.5 L/ha', method: 'Fertirrigación', frequency: 'V3 y V5', notes: 'Zn activa enzimas de síntesis de triptófano y leghemoglobina (el pigmento rojo del nódulo activo)' },
        { productId: 'n-ultra', productName: 'N-Ultra', line: 'nutricion', dose: '2 L/ha', method: 'Fertirrigación', frequency: 'V3 únicamente', notes: 'Dosis baja de arranque — exceso de N apaga la fijación biológica por Rhizobium' },
        { productId: 'vgn-brotanic', productName: 'Brotanic', line: 'nutricion', dose: '0.5 → 1.0 → 1.5 L / 200 L agua', method: 'Foliar', frequency: '3 aplicaciones escalonadas desde V3', notes: 'Veganic · Cu + Mn + Zn — el Cu activa enzimas de la fijación simbiótica' },
        { productId: 'zen-chrys', productName: 'Zen-Chrys', line: 'zentia', dose: '2 mL/L', method: 'Aspersión', frequency: 'Preventivo cada 7 días', notes: 'Bemisia tabaci vectora BGYMV (Mosaico Dorado) — una planta infectada en V4 es pérdida total', isProtection: true },
      ],
    },
    {
      id: 'floracion', name: 'R5 – R6 Floración', emoji: '🌸',
      durationDays: 14, objective: 'Maximizar número de flores y reducir el aborto floral por estrés — en frijol se aborta hasta 70% de las flores naturalmente.',
      color: 'bg-pink-100', textColor: 'text-pink-700',
      products: [
        { productId: 'bp-fiore', productName: 'BP Fioré', line: 'bioestimulantes', dose: '0.8 g/L', method: 'Foliar', frequency: 'Pre-flor y plena flor', notes: 'Homogeneiza la apertura floral en todo el lote para madurez uniforme' },
        { productId: 'bp-boro', productName: 'BP Boro', line: 'especialidades', dose: '0.4 mL/L', method: 'Foliar', frequency: 'Inicio flor', notes: 'B mejora viabilidad de polen — frijol auto-polinizante pero requiere B funcional' },
        { productId: 'bp-cuaje', productName: 'BP Cuaje', line: 'bioestimulantes', dose: '2 mL/L', method: 'Foliar', frequency: 'Cada 7 días en flor', notes: 'Reducir aborto floral en altas temperaturas del verano zacatecano' },
        { productId: 'funbac-plus', productName: 'Funbac Plus', line: 'zentia', dose: '1.5 mL/L', method: 'Aspersión', frequency: 'Cada 10 días', notes: 'Antracnosis (Colletotrichum) y Roya son críticas en floración húmeda', isProtection: true },
      ],
    },
    {
      id: 'llenado-vaina', name: 'R7 – R8 Llenado de Vaina', emoji: '🫛',
      durationDays: 28, objective: 'Maximizar número de granos por vaina y peso de grano individual — periodo de mayor demanda nutricional del ciclo.',
      color: 'bg-lime-100', textColor: 'text-lime-700',
      products: [
        { productId: 'k-ultra', productName: 'K-Ultra', line: 'nutricion', dose: '4 L/ha', method: 'Fertirrigación', frequency: 'Semanal', notes: 'K es el motor de traslocación de fotosintatos a la vaina — define peso de mil granos' },
        { productId: 'ca-ultra', productName: 'Ca-Ultra', line: 'nutricion', dose: '2 L/ha', method: 'Fertirrigación', frequency: 'Cada 10 días', notes: 'Ca da firmeza al grano y resistencia a la deshidratación terminal' },
        { productId: 'bp-mix', productName: 'BP Mix', line: 'nutricion', dose: '1.5 L/ha', method: 'Fertirrigación', frequency: 'R7', notes: 'Micros completos para el metabolismo de proteínas de reserva del grano' },
        { productId: 'bp-potasio', productName: 'BP Potasio', line: 'organicos', dose: '3 mL/L', method: 'Foliar', frequency: 'Cada 10 días', notes: 'K foliar complementa llenado en etapa crítica' },
        { productId: 'max-kill-plus', productName: 'Max-Kill Plus', line: 'zentia', dose: '2.5 mL/L', method: 'Foliar', frequency: 'En picudo del ejote', notes: 'Apion godmani perfora vaina y deposita larvas — control en R6–R7 evita daño visible en grano', isProtection: true },
      ],
    },
    {
      id: 'madurez', name: 'R9 Madurez Fisiológica', emoji: '🏆',
      durationDays: 18, objective: 'Alcanzar humedad de cosecha (14–16%) con grano brillante, sin manchado y con buena prueba de cocción.',
      color: 'bg-amber-100', textColor: 'text-amber-700',
      products: [
        { productId: 'bp-potasio', productName: 'BP Potasio', line: 'organicos', dose: '3 mL/L', method: 'Foliar', frequency: 'Última aplicación', notes: 'K final mejora brillo de testa del grano — primer factor visual de calidad en mercado' },
        { productId: 'bp-fresh', productName: 'BP Fresh', line: 'bioestimulantes', dose: '1 mL/L', method: 'Foliar', frequency: '10 días pre-cosecha', notes: 'Reduce carga bacteriana en vainas — menor incidencia de manchado de grano durante secado', isProtection: true },
      ],
    },
  ],
}

// ─── Export principal ─────────────────────────────────────────────────────

export const CROP_PROTOCOLS: FullCropProtocol[] = [
  TOMATE, FRESA, ARANDANO, FRAMBUESA, ZARZAMORA, AGUACATE, CHILE, CITRICOS,
  TOMATE_CHERRY, BROCOLI, APIO, MAIZ, CANA_AZUCAR, FRIJOL,
]

export function getCropBySlug(slug: string): FullCropProtocol | undefined {
  return CROP_PROTOCOLS.find(c => c.slug === slug)
}
