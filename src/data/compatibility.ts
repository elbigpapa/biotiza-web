/**
 * compatibility.ts — Matriz global de compatibilidad de mezclas en tanque
 *
 * Reglas clave:
 *  - bp-oxyagro (H₂O₂) es INCOMPATIBLE con todos los biológicos
 *  - bp-calcio es INCOMPATIBLE con bp-boro (precipitan en tanque)
 *  - Los biológicos (lactobacillus, bp-moots, bp-koren) son COMPATIBLES entre sí
 *  - Los productos Zen de bioprotección son COMPATIBLES con nutrición
 *  - Usar prueba de jarrita siempre que el estado sea 'conditional'
 */

import type { CompatibilityEntry, CompatibilityStatus } from '@/types'

// ─── Matriz de Compatibilidad ─────────────────────────────────────────────

export const COMPATIBILITY_MATRIX: CompatibilityEntry[] = [
  // ── bp-oxyagro (H₂O₂) — incompatible con biológicos ──────────────────
  {
    productA: 'bp-oxyagro',
    productB: 'biotiza-lactobacillus',
    status: 'incompatible',
    notes: 'El peróxido de hidrógeno destruye la microbiota viva. No mezclar nunca.',
  },
  {
    productA: 'bp-oxyagro',
    productB: 'bp-moots',
    status: 'incompatible',
    notes: 'El H₂O₂ oxida los fitohormonas orgánicas y destruye los componentes biológicos de BP Moots.',
  },
  {
    productA: 'bp-oxyagro',
    productB: 'bp-koren',
    status: 'incompatible',
    notes: 'El H₂O₂ desnaturaliza los componentes activos del enraizador BP Koren.',
  },
  {
    productA: 'bp-oxyagro',
    productB: 'zen-fungi',
    status: 'incompatible',
    notes: 'El peróxido de hidrógeno inactiva los componentes bioactivos de Zen-Fungi.',
  },
  {
    productA: 'bp-oxyagro',
    productB: 'funbac-plus',
    status: 'incompatible',
    notes: 'El H₂O₂ destruye el modo de acción biológico de Funbac Plus.',
  },
  {
    productA: 'bp-oxyagro',
    productB: 'healex',
    status: 'incompatible',
    notes: 'El H₂O₂ degrada los componentes bioactivos de Healex. Aplicar con 48 h de separación.',
  },

  // ── bp-calcio — incompatible con boro ─────────────────────────────────
  {
    productA: 'bp-calcio',
    productB: 'bp-boro',
    status: 'incompatible',
    notes: 'El calcio y el boro precipitan formando boratos insolubles en tanque. Aplicar en días alternos.',
  },
  {
    productA: 'bp-calcio',
    productB: 'biotiza-calcio-boro',
    status: 'incompatible',
    notes: 'Duplicación de calcio y riesgo de precipitación con el boro del producto. No mezclar.',
  },

  // ── bp-boro — conditional con magnesio ────────────────────────────────
  {
    productA: 'bp-boro',
    productB: 'bp-magnesio',
    status: 'conditional',
    notes: 'Realizar prueba de jarrita antes de mezclar. Agitar bien y aplicar a concentraciones normales.',
  },
  {
    productA: 'bp-boro',
    productB: 'bp-potasio',
    status: 'compatible',
    notes: 'Compatible en mezcla de tanque a dosis normales.',
  },
  {
    productA: 'bp-boro',
    productB: 'bp-vit',
    status: 'compatible',
    notes: 'Buena combinación para etapa de floración.',
  },

  // ── Nutrientes entre sí — generalmente compatibles ────────────────────
  {
    productA: 'bp-calcio',
    productB: 'bp-magnesio',
    status: 'compatible',
    notes: 'Compatible. Relación Ca:Mg recomendada 2:1 para máxima eficiencia.',
  },
  {
    productA: 'bp-calcio',
    productB: 'bp-potasio',
    status: 'compatible',
    notes: 'Compatible. En maduración se puede aplicar juntos para mejorar firmeza y Brix.',
  },
  {
    productA: 'bp-magnesio',
    productB: 'bp-potasio',
    status: 'compatible',
    notes: 'Compatible. El magnesio facilita el transporte de potasio al fruto.',
  },
  {
    productA: 'n-ultra',
    productB: 'k-ultra',
    status: 'compatible',
    notes: 'Compatible en fertirrigación. Ajustar ratio N:K según etapa del cultivo.',
  },
  {
    productA: 'n-ultra',
    productB: 'p-ultra',
    status: 'compatible',
    notes: 'Compatible. Combinación estándar NPK para crecimiento vegetativo.',
  },
  {
    productA: 'k-ultra',
    productB: 'p-ultra',
    status: 'compatible',
    notes: 'Compatible. Aumentar la proporción de K en etapa de engorde y maduración.',
  },
  {
    productA: 'ca-ultra',
    productB: 'mg-ultra',
    status: 'compatible',
    notes: 'Compatible. Ratio Ca:Mg recomendado 3:1 en fertirrigación.',
  },
  {
    productA: 'ca-ultra',
    productB: 'k-ultra',
    status: 'compatible',
    notes: 'Compatible en fertirrigación. Aumentar Ca y K en fase de engorde.',
  },
  {
    productA: 'mg-ultra',
    productB: 'n-ultra',
    status: 'compatible',
    notes: 'Compatible. El Mg es cofactor enzimático en la asimilación de N.',
  },
  {
    productA: 'bp-ferrum',
    productB: 'bp-zinc',
    status: 'compatible',
    notes: 'Compatible a dosis normales. El hierro y el zinc son complementarios.',
  },
  {
    productA: 'bp-ferrum',
    productB: 'bp-mix',
    status: 'compatible',
    notes: 'Compatible. BP Mix ya contiene quelatos de Fe pero no hay problema de exceso a dosis recomendada.',
  },
  {
    productA: 'bp-zinc',
    productB: 'bp-mix',
    status: 'compatible',
    notes: 'Compatible. Refuerzo de zinc sobre el paquete general de microelementos.',
  },
  {
    productA: 'bp-nitro-fx',
    productB: 'n-ultra',
    status: 'compatible',
    notes: 'Compatible. Los aminoácidos de BP Nitro FX potencian la asimilación del N mineral.',
  },
  {
    productA: 'bontera-sa10',
    productB: 'n-ultra',
    status: 'compatible',
    notes: 'Compatible. Los ácidos húmicos y fúlvicos mejoran la eficiencia del fertilizante mineral.',
  },

  // ── Bioestimulantes entre sí ───────────────────────────────────────────
  {
    productA: 'bp-fiore',
    productB: 'bp-cuaje',
    status: 'compatible',
    notes: 'Excelente combinación para floración y cuajado. Aplicar juntos en inicio de floración.',
  },
  {
    productA: 'bp-fiore',
    productB: 'bp-gibb',
    status: 'compatible',
    notes: 'Compatible. Las giberelinas de BP Gibb complementan la acción de BP Fioré en inducción floral.',
  },
  {
    productA: 'bp-fiore',
    productB: 'bp-gross',
    status: 'compatible',
    notes: 'Compatible. Aplicar BP Fioré en flor y BP Gross al inicio del engorde.',
  },
  {
    productA: 'bp-cuaje',
    productB: 'bp-gross',
    status: 'compatible',
    notes: 'Compatible. Protocolo de cuajado-engorde muy efectivo en tomate y chile.',
  },
  {
    productA: 'bp-cuaje',
    productB: 'bp-gibb',
    status: 'compatible',
    notes: 'Compatible. Refuerza el cuajado partenocárpico en condiciones de estrés.',
  },
  {
    productA: 'bp-gross',
    productB: 'bp-gibb',
    status: 'compatible',
    notes: 'Compatible. Ambos actúan en el engorde celular del fruto.',
  },

  // ── Biológicos entre sí — compatibles ─────────────────────────────────
  {
    productA: 'bp-moots',
    productB: 'biotiza-lactobacillus',
    status: 'compatible',
    notes: 'Excelente combinación de enraizamiento + microbiota. Aplicar juntos en trasplante.',
  },
  {
    productA: 'bp-moots',
    productB: 'bontera-sa10',
    status: 'compatible',
    notes: 'Compatible. Los ácidos húmicos de Bontera SA-10 potencian el efecto de los fitohormonas.',
  },
  {
    productA: 'biotiza-lactobacillus',
    productB: 'bontera-sa10',
    status: 'compatible',
    notes: 'Compatible. Los ácidos orgánicos crean un ambiente favorable para Lactobacillus.',
  },
  {
    productA: 'bp-koren',
    productB: 'bp-moots',
    status: 'compatible',
    notes: 'Compatible. BP Koren (AIB) + BP Moots (auxinas) para máxima inducción radicular.',
  },
  {
    productA: 'bp-koren',
    productB: 'biotiza-lactobacillus',
    status: 'compatible',
    notes: 'Compatible. Buena combinación para establecimiento de planta nueva.',
  },

  // ── Línea Zentia entre sí — compatibles ───────────────────────────────
  {
    productA: 'zen-chrys',
    productB: 'zen-fungi',
    status: 'compatible',
    notes: 'Compatible. Programa de protección integral: insecticida + fungicida en una sola aspersión.',
  },
  {
    productA: 'zen-chrys',
    productB: 'zen-spider',
    status: 'compatible',
    notes: 'Compatible. Ampliar el espectro de control de insectos en temporada de alta presión.',
  },
  {
    productA: 'zen-chrys',
    productB: 'zen-can',
    status: 'compatible',
    notes: 'Compatible. Cobertura insecticida amplia: dípteros, trips, pulgones y mosca blanca.',
  },
  {
    productA: 'zen-fungi',
    productB: 'zen-spider',
    status: 'compatible',
    notes: 'Compatible. Protección fúngica + acaricida en etapas de alta humedad.',
  },
  {
    productA: 'zen-fungi',
    productB: 'zen-can',
    status: 'compatible',
    notes: 'Compatible. El kaolín de Zen-Can no interfiere con el modo de acción de Zen-Fungi.',
  },
  {
    productA: 'zen-spider',
    productB: 'zen-can',
    status: 'compatible',
    notes: 'Compatible. Protección acaricida + barrera física para insectos pequeños.',
  },

  // ── Zentia con nutrición — mayormente compatibles ─────────────────────
  {
    productA: 'zen-chrys',
    productB: 'bp-calcio',
    status: 'compatible',
    notes: 'Compatible. Se puede incluir en mezcla foliar de protección + nutrición.',
  },
  {
    productA: 'zen-chrys',
    productB: 'bp-vit',
    status: 'compatible',
    notes: 'Compatible. Buena combinación de protección + vitaminas en floración.',
  },
  {
    productA: 'zen-spider',
    productB: 'ae-calcium',
    status: 'compatible',
    notes: 'Compatible. Protección de araña + calcio foliar en etapa de engorde.',
  },
  {
    productA: 'zen-can',
    productB: 'bp-nutri',
    status: 'compatible',
    notes: 'Compatible. Mezcla de bioprotección + bioestimulación de algas marinas.',
  },

  // ── biotiza-lactobacillus con zen-fungi — condicional ─────────────────
  {
    productA: 'biotiza-lactobacillus',
    productB: 'zen-fungi',
    status: 'conditional',
    notes: 'Reducir la dosis de Zen-Fungi al 70% para proteger la viabilidad del Lactobacillus. Preferir aplicaciones separadas.',
  },

  // ── healex y funbac-plus ───────────────────────────────────────────────
  {
    productA: 'healex',
    productB: 'funbac-plus',
    status: 'compatible',
    notes: 'Compatible. Buena combinación para bioprotección postcosecha: cicatrización + bacteriostático.',
  },
  {
    productA: 'healex',
    productB: 'zen-fungi',
    status: 'incompatible',
    notes: 'Modos de acción competitivos. Healex actúa como fungicida sistémico y Zen-Fungi como de contacto; en mezcla se anulan mutuamente. Rotar, no mezclar.',
  },
  {
    productA: 'funbac-plus',
    productB: 'zen-fungi',
    status: 'compatible',
    notes: 'Compatible. Distintos modos de acción, cobertura antifúngica + antibacteriana más amplia.',
  },
  {
    productA: 'funbac-plus',
    productB: 'zen-chrys',
    status: 'compatible',
    notes: 'Compatible. Protección bacteriana + insecticida en una sola aspersión.',
  },

  // ── ae-calcium con otros ───────────────────────────────────────────────
  {
    productA: 'ae-calcium',
    productB: 'bp-potasio',
    status: 'compatible',
    notes: 'Compatible. Excelente combinación en etapa de engorde para firmeza y Brix.',
  },
  {
    productA: 'ae-calcium',
    productB: 'bp-gross',
    status: 'compatible',
    notes: 'Compatible. Calcio para firmeza de pared celular + brassinosteroides para calibre.',
  },
  {
    productA: 'ae-calcium',
    productB: 'bp-boro',
    status: 'conditional',
    notes: 'Prueba de jarrita recomendada. Riesgo bajo de precipitación pero verificar en cada lote de agua.',
  },

  // ── biotiza-calcio-boro con otros ──────────────────────────────────────
  {
    productA: 'biotiza-calcio-boro',
    productB: 'bp-vit',
    status: 'compatible',
    notes: 'Compatible. Buena combinación en floración para maximizar germinación del tubo polínico.',
  },
  {
    productA: 'biotiza-calcio-boro',
    productB: 'bp-fiore',
    status: 'compatible',
    notes: 'Compatible. Biotiza Calcio Boro + BP Fioré es un programa completo de floración.',
  },

  // ── bp-nutri con varios ────────────────────────────────────────────────
  {
    productA: 'bp-nutri',
    productB: 'bp-nitro-fx',
    status: 'compatible',
    notes: 'Compatible. Algas marinas + aminoácidos: sinergia bioestimulante excelente.',
  },
  {
    productA: 'bp-nutri',
    productB: 'bp-vit',
    status: 'compatible',
    notes: 'Compatible. Estimulación metabólica integral con algas + vitaminas.',
  },
]

// ─── Función de consulta ──────────────────────────────────────────────────

/**
 * Busca el estado de compatibilidad entre dos productos.
 * La búsqueda es bidireccional (A,B) = (B,A).
 *
 * @returns CompatibilityStatus — 'unknown' si no existe el par en la matriz
 */
export function getCompatibility(
  idA: string,
  idB: string,
): CompatibilityStatus {
  // Normalizar orden para búsqueda bidireccional
  const entry = COMPATIBILITY_MATRIX.find(
    (e) =>
      (e.productA === idA && e.productB === idB) ||
      (e.productA === idB && e.productB === idA),
  )
  return entry?.status ?? 'unknown'
}

/**
 * Devuelve la entrada completa de compatibilidad entre dos productos,
 * incluyendo notas. Útil para mostrar la justificación técnica.
 *
 * @returns CompatibilityEntry | undefined
 */
export function getCompatibilityEntry(
  idA: string,
  idB: string,
): CompatibilityEntry | undefined {
  return COMPATIBILITY_MATRIX.find(
    (e) =>
      (e.productA === idA && e.productB === idB) ||
      (e.productA === idB && e.productB === idA),
  )
}

/**
 * Devuelve todos los productos incompatibles con un producto dado.
 */
export function getIncompatibleProducts(productId: string): string[] {
  return COMPATIBILITY_MATRIX.filter(
    (e) =>
      e.status === 'incompatible' &&
      (e.productA === productId || e.productB === productId),
  ).map((e) => (e.productA === productId ? e.productB : e.productA))
}
