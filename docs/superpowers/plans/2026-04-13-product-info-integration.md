# Product Information Integration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate all real product information (bottle photos, technical datasheets, case studies, downloadable PDFs, crop protocols) from the `INFORMACION BIOPRODUCTOS` folder into the Biotiza website, replacing placeholder data with real data.

**Architecture:** Static data approach — all product data lives in TypeScript files under `src/data/`. PDFs are copied to `public/docs/` for direct download. Bottle photos go to `public/images/products/`. No CMS, no dynamic PDF parsing. Three new pages (`/casos-de-exito`, `/casos-de-exito/[slug]`, `/documentos`) plus enhancements to existing product and crop pages.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion 12. Node at `C:\Program Files\nodejs\node.exe`. Build command: `"C:/Program Files/nodejs/node.exe" node_modules/next/dist/bin/next build`.

**Important conventions:**
- `'use client'` must be the VERY FIRST line in client components (before imports, comments, everything)
- Framer Motion: use `as const` on ease arrays, `satisfies Variants` pattern
- lucide-react v1.7.0: no social icons (use inline SVGs)
- Turbopack requires `.tsx` extension for any file with JSX
- Spanish for visible content, English for code
- All images must use `next/image` with `sizes` prop

**Source files location:** `C:\Users\elbig\OneDrive\Documentos\BIOTIZA\biotiza claude\files\INFORMACION BIOPRODUCTOS\`

---

## Task 1: Update Types and Constants (Foundation)

**Files:**
- Modify: `src/types/index.ts`
- Modify: `src/data/constants.ts`

- [ ] **Step 1: Add new types to `src/types/index.ts`**

Add these after the existing `RecommendedDose` interface (around line 77):

```typescript
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
```

- [ ] **Step 2: Add new optional fields to the `Product` interface**

In the existing `Product` interface (around line 92), add these fields after `updated_at`:

```typescript
  /** Tabla de dosis por sistema de producción */
  dosage_table?: DosageBySystem[]
  /** Dosis específica por cultivo */
  dosage_by_crop?: DosageByCrop[]
  /** Documentos descargables */
  documents?: ProductDocuments
  /** IDs de casos de éxito relacionados */
  case_studies?: string[]
```

- [ ] **Step 3: Add CaseStudy types at the end of `src/types/index.ts`**

Append after the `DoseCalculatorResult` interface:

```typescript
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
```

- [ ] **Step 4: Update `NAV_LINKS` in `src/data/constants.ts`**

Replace the existing `NAV_LINKS` array (line 150-157):

```typescript
export const NAV_LINKS = [
  { label: 'Soluciones',     href: '/soluciones'     },
  { label: 'Cultivos',       href: '/cultivos'       },
  { label: 'Herramientas',   href: '/herramientas'   },
  { label: 'Casos de Éxito', href: '/casos-de-exito' },
  { label: 'Academia',       href: '/academia'       },
  { label: 'Nosotros',       href: '/nosotros'       },
  { label: 'Contacto',       href: '/contacto'       },
] as const
```

- [ ] **Step 5: Add 6 new crops to `CROPS_DATA` in `src/data/constants.ts`**

Add after the existing 8 crops in the `CROPS_DATA` array (after line 111):

```typescript
  { id: 'apio',         name: 'Apio',            slug: 'apio',         emoji: '🥬', gradientFrom: 'from-emerald-700', gradientTo: 'to-emerald-500', description: 'Apium graveolens' },
  { id: 'brocoli',      name: 'Brócoli',         slug: 'brocoli',      emoji: '🥦', gradientFrom: 'from-green-700',   gradientTo: 'to-green-500',   description: 'Brassica oleracea var. italica' },
  { id: 'tomate-cherry',name: 'Tomate Cherry',   slug: 'tomate-cherry',emoji: '🍒', gradientFrom: 'from-red-600',     gradientTo: 'to-red-400',     description: 'Solanum lycopersicum var. cerasiforme' },
  { id: 'maiz',         name: 'Maíz',            slug: 'maiz',         emoji: '🌽', gradientFrom: 'from-yellow-600',  gradientTo: 'to-yellow-400',  description: 'Zea mays' },
  { id: 'cana-azucar',  name: 'Caña de Azúcar',  slug: 'cana-azucar',  emoji: '🎋', gradientFrom: 'from-lime-700',    gradientTo: 'to-lime-500',    description: 'Saccharum officinarum' },
  { id: 'frijol',       name: 'Frijol',          slug: 'frijol',       emoji: '🫘', gradientFrom: 'from-amber-800',   gradientTo: 'to-amber-600',   description: 'Phaseolus vulgaris' },
```

- [ ] **Step 6: Verify build**

Run: `"C:/Program Files/nodejs/node.exe" node_modules/next/dist/bin/next build`

Expected: Build succeeds with no type errors. Warnings about unused new types are fine at this stage.

- [ ] **Step 7: Commit**

```bash
git add src/types/index.ts src/data/constants.ts
git commit -m "feat: add types for dosage tables, documents, case studies and new crops"
```

---

## Task 2: Copy Static Assets (Images + PDFs)

**Files:**
- Create: `public/images/products/` (35 PNG files)
- Create: `public/docs/fichas-tecnicas/` (35 PDF files)
- Create: `public/docs/hojas-seguridad/` (34 PDF files)
- Create: `public/docs/omri/` (16 PDF files)
- Create: `public/docs/cofepris/` (28 PDF files)

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p public/images/products
mkdir -p public/docs/fichas-tecnicas
mkdir -p public/docs/hojas-seguridad
mkdir -p public/docs/omri
mkdir -p public/docs/cofepris
```

- [ ] **Step 2: Copy and rename bottle photos**

Copy each PNG from `INFORMACION BIOPRODUCTOS/BOTELLAS/` to `public/images/products/` renaming to the product slug. The mapping is:

**NUTRICIÓN (26 files):**
| Source filename | Target filename |
|---|---|
| `BP CALCIO.png` | `bp-calcio.png` |
| `BP MAGNESIO.png` | `bp-magnesio.png` |
| `BP POTASIO.png` | `bp-potasio.png` |
| `BP MOOTS.png` | `bp-moots.png` |
| `BP NUTRI.png` | `bp-nutri.png` |
| `BP NITRO FX.png` | `bp-nitro-fx.png` |
| `BP BORO.png` | `bp-boro.png` |
| `BP ZINC.png` | `bp-zinc.png` |
| `BP FERRUM.png` | `bp-ferrum.png` |
| `AE CALCIUM.png` | `ae-calcium.png` |
| `BP MOL.png` | `bp-mol.png` |
| `BP VIT.png` | `bp-vit.png` |
| `BP MIX.png` | `bp-mix.png` |
| `BP ACUA.png` | `bp-acua.png` |
| `BP GIBB.png` | `bp-gibb.png` |
| `BP FIORE.png` | `bp-fiore.png` |
| `BP CUALE.png` | `bp-cuaje.png` |
| `BP FRESH.png` | `bp-fresh.png` |
| `BP GROSS.png` | `bp-gross.png` |
| `BP KOREN.png` | `bp-koren.png` |
| `N ULTRA.png` | `n-ultra.png` |
| `P ULTRA.png` | `p-ultra.png` |
| `K ULTRA.png` | `k-ultra.png` |
| `CA ULTRA.png` | `ca-ultra.png` |
| `MG ULTRA.png` | `mg-ultra.png` |
| `BP CU AGRO ORGANIC.png` | `bp-cu-agro.png` |

**PLAGUICIDAS (9 files):**
| Source filename | Target filename |
|---|---|
| `ZEN-CHRYS.png` | `zen-chrys.png` |
| `ZEN-CAN.png` | `zen-can.png` |
| `ZEN-FUNGI.png` | `zen-fungi.png` |
| `ZEN-CU.png` | `zen-cu.png` |
| `ZEN-SPIDER.png` | `zen-spider.png` |
| `FUNBAC PLUS.png` | `funbac-plus.png` |
| `MAX KILL PLUS.png` | `max-kill-plus.png` |
| `ENHANCER.png` | `enhancer.png` |
| `NEMAPRO.png` | `nemapro.png` |

Script to copy all:

```bash
SRC="C:/Users/elbig/OneDrive/Documentos/BIOTIZA/biotiza claude/files/INFORMACION BIOPRODUCTOS"
DST="public/images/products"

# Nutrición
cp "$SRC/BOTELLAS/NUTRICIÓN/BP CALCIO.png" "$DST/bp-calcio.png"
cp "$SRC/BOTELLAS/NUTRICIÓN/BP MAGNESIO.png" "$DST/bp-magnesio.png"
cp "$SRC/BOTELLAS/NUTRICIÓN/BP POTASIO.png" "$DST/bp-potasio.png"
cp "$SRC/BOTELLAS/NUTRICIÓN/BP MOOTS.png" "$DST/bp-moots.png"
cp "$SRC/BOTELLAS/NUTRICIÓN/BP NUTRI.png" "$DST/bp-nutri.png"
cp "$SRC/BOTELLAS/NUTRICIÓN/BP NITRO FX.png" "$DST/bp-nitro-fx.png"
cp "$SRC/BOTELLAS/NUTRICIÓN/BP BORO.png" "$DST/bp-boro.png"
cp "$SRC/BOTELLAS/NUTRICIÓN/BP ZINC.png" "$DST/bp-zinc.png"
cp "$SRC/BOTELLAS/NUTRICIÓN/BP FERRUM.png" "$DST/bp-ferrum.png"
cp "$SRC/BOTELLAS/NUTRICIÓN/AE CALCIUM.png" "$DST/ae-calcium.png"
cp "$SRC/BOTELLAS/NUTRICIÓN/BP MOL.png" "$DST/bp-mol.png"
cp "$SRC/BOTELLAS/NUTRICIÓN/BP VIT.png" "$DST/bp-vit.png"
cp "$SRC/BOTELLAS/NUTRICIÓN/BP MIX.png" "$DST/bp-mix.png"
cp "$SRC/BOTELLAS/NUTRICIÓN/BP ACUA.png" "$DST/bp-acua.png"
cp "$SRC/BOTELLAS/NUTRICIÓN/BP GIBB.png" "$DST/bp-gibb.png"
cp "$SRC/BOTELLAS/NUTRICIÓN/BP FIORE.png" "$DST/bp-fiore.png"
cp "$SRC/BOTELLAS/NUTRICIÓN/BP CUALE.png" "$DST/bp-cuaje.png"
cp "$SRC/BOTELLAS/NUTRICIÓN/BP FRESH.png" "$DST/bp-fresh.png"
cp "$SRC/BOTELLAS/NUTRICIÓN/BP GROSS.png" "$DST/bp-gross.png"
cp "$SRC/BOTELLAS/NUTRICIÓN/BP KOREN.png" "$DST/bp-koren.png"
cp "$SRC/BOTELLAS/NUTRICIÓN/N ULTRA.png" "$DST/n-ultra.png"
cp "$SRC/BOTELLAS/NUTRICIÓN/P ULTRA.png" "$DST/p-ultra.png"
cp "$SRC/BOTELLAS/NUTRICIÓN/K ULTRA.png" "$DST/k-ultra.png"
cp "$SRC/BOTELLAS/NUTRICIÓN/CA ULTRA.png" "$DST/ca-ultra.png"
cp "$SRC/BOTELLAS/NUTRICIÓN/MG ULTRA.png" "$DST/mg-ultra.png"
cp "$SRC/BOTELLAS/NUTRICIÓN/BP CU AGRO ORGANIC.png" "$DST/bp-cu-agro.png"

# Plaguicidas
cp "$SRC/BOTELLAS/PLAGUICIDAS/ZEN-CHRYS.png" "$DST/zen-chrys.png"
cp "$SRC/BOTELLAS/PLAGUICIDAS/ZEN-CAN.png" "$DST/zen-can.png"
cp "$SRC/BOTELLAS/PLAGUICIDAS/ZEN-FUNGI.png" "$DST/zen-fungi.png"
cp "$SRC/BOTELLAS/PLAGUICIDAS/ZEN-CU.png" "$DST/zen-cu.png"
cp "$SRC/BOTELLAS/PLAGUICIDAS/ZEN-SPIDER.png" "$DST/zen-spider.png"
cp "$SRC/BOTELLAS/PLAGUICIDAS/FUNBAC PLUS.png" "$DST/funbac-plus.png"
cp "$SRC/BOTELLAS/PLAGUICIDAS/MAX KILL PLUS.png" "$DST/max-kill-plus.png"
cp "$SRC/BOTELLAS/PLAGUICIDAS/ENHANCER.png" "$DST/enhancer.png"
cp "$SRC/BOTELLAS/PLAGUICIDAS/NEMAPRO.png" "$DST/nemapro.png"
```

- [ ] **Step 3: Copy and rename technical datasheets**

```bash
DST_FT="public/docs/fichas-tecnicas"

# Bionutrición (26)
cp "$SRC/FICHAS TECNICAS/Bionutricion/FT BP Calcio.pdf" "$DST_FT/bp-calcio.pdf"
cp "$SRC/FICHAS TECNICAS/Bionutricion/FT BP MAGNESIO.pdf" "$DST_FT/bp-magnesio.pdf"
cp "$SRC/FICHAS TECNICAS/Bionutricion/FT BP POTASIO.pdf" "$DST_FT/bp-potasio.pdf"
cp "$SRC/FICHAS TECNICAS/Bionutricion/FT BP Moots.pdf" "$DST_FT/bp-moots.pdf"
cp "$SRC/FICHAS TECNICAS/Bionutricion/FT BP Nutri.pdf" "$DST_FT/bp-nutri.pdf"
cp "$SRC/FICHAS TECNICAS/Bionutricion/FT BP NITRO FX.pdf" "$DST_FT/bp-nitro-fx.pdf"
cp "$SRC/FICHAS TECNICAS/Bionutricion/FT Bp Boro.pdf" "$DST_FT/bp-boro.pdf"
cp "$SRC/FICHAS TECNICAS/Bionutricion/FT BP ZINC.pdf" "$DST_FT/bp-zinc.pdf"
cp "$SRC/FICHAS TECNICAS/Bionutricion/FT Bp FERRUM.pdf" "$DST_FT/bp-ferrum.pdf"
cp "$SRC/FICHAS TECNICAS/Bionutricion/FT Ca-ULTRA.pdf" "$DST_FT/ca-ultra.pdf"
cp "$SRC/FICHAS TECNICAS/Bionutricion/FT BP Mol.pdf" "$DST_FT/bp-mol.pdf"
cp "$SRC/FICHAS TECNICAS/Bionutricion/FT BP VIT.pdf" "$DST_FT/bp-vit.pdf"
cp "$SRC/FICHAS TECNICAS/Bionutricion/FT BP MIX.pdf" "$DST_FT/bp-mix.pdf"
cp "$SRC/FICHAS TECNICAS/Bionutricion/FT Bp Acua.pdf" "$DST_FT/bp-acua.pdf"
cp "$SRC/FICHAS TECNICAS/Bionutricion/FT Bp GIBB.pdf" "$DST_FT/bp-gibb.pdf"
cp "$SRC/FICHAS TECNICAS/Bionutricion/FT Bp Fioré.pdf" "$DST_FT/bp-fiore.pdf"
cp "$SRC/FICHAS TECNICAS/Bionutricion/FT Bp Cuaje.pdf" "$DST_FT/bp-cuaje.pdf"
cp "$SRC/FICHAS TECNICAS/Bionutricion/FT Bp Fresh.pdf" "$DST_FT/bp-fresh.pdf"
cp "$SRC/FICHAS TECNICAS/Bionutricion/FT BP GROSS.pdf" "$DST_FT/bp-gross.pdf"
cp "$SRC/FICHAS TECNICAS/Bionutricion/FT BP KOREN.pdf" "$DST_FT/bp-koren.pdf"
cp "$SRC/FICHAS TECNICAS/Bionutricion/FT N-ULTRA.pdf" "$DST_FT/n-ultra.pdf"
cp "$SRC/FICHAS TECNICAS/Bionutricion/FT P-ULTRA.pdf" "$DST_FT/p-ultra.pdf"
cp "$SRC/FICHAS TECNICAS/Bionutricion/FT K-ULTRA.pdf" "$DST_FT/k-ultra.pdf"
cp "$SRC/FICHAS TECNICAS/Bionutricion/FT Mg-ULTRA.pdf" "$DST_FT/mg-ultra.pdf"
cp "$SRC/FICHAS TECNICAS/Bionutricion/FT Bontera.pdf" "$DST_FT/bontera-sa10.pdf"
cp "$SRC/FICHAS TECNICAS/Bionutricion/FT Bp CU - Agro Organic.pdf" "$DST_FT/bp-cu-agro.pdf"

# Bioplaguicidas (9)
cp "$SRC/FICHAS TECNICAS/Bioplaguicidas/FT-ZenChrys.pdf" "$DST_FT/zen-chrys.pdf"
cp "$SRC/FICHAS TECNICAS/Bioplaguicidas/FT-ZenCan.pdf" "$DST_FT/zen-can.pdf"
cp "$SRC/FICHAS TECNICAS/Bioplaguicidas/FT- ZENFUNGI.pdf" "$DST_FT/zen-fungi.pdf"
cp "$SRC/FICHAS TECNICAS/Bioplaguicidas/FT-ZenCu.pdf" "$DST_FT/zen-cu.pdf"
cp "$SRC/FICHAS TECNICAS/Bioplaguicidas/FT-ZENSPIDER 2025.pdf" "$DST_FT/zen-spider.pdf"
cp "$SRC/FICHAS TECNICAS/Bioplaguicidas/FT- FUNBAC PLUS.pdf" "$DST_FT/funbac-plus.pdf"
cp "$SRC/FICHAS TECNICAS/Bioplaguicidas/FT MAX-KILL PLUS.pdf" "$DST_FT/max-kill-plus.pdf"
cp "$SRC/FICHAS TECNICAS/Bioplaguicidas/FT-ENHANCER.pdf" "$DST_FT/enhancer.pdf"
cp "$SRC/FICHAS TECNICAS/Bioplaguicidas/FT BP OXYAGRO.pdf" "$DST_FT/bp-oxyagro.pdf"
```

- [ ] **Step 4: Copy and rename safety data sheets**

```bash
DST_HDS="public/docs/hojas-seguridad"

# Bionutrición (27)
cp "$SRC/HOJAS DE SEGURIDAD/Bionutrición/HDS BP Calcio.pdf" "$DST_HDS/bp-calcio.pdf"
cp "$SRC/HOJAS DE SEGURIDAD/Bionutrición/HDS BP Magnesio.pdf" "$DST_HDS/bp-magnesio.pdf"
cp "$SRC/HOJAS DE SEGURIDAD/Bionutrición/HDS BP Potasio.pdf" "$DST_HDS/bp-potasio.pdf"
cp "$SRC/HOJAS DE SEGURIDAD/Bionutrición/HDS BP Moots.pdf" "$DST_HDS/bp-moots.pdf"
cp "$SRC/HOJAS DE SEGURIDAD/Bionutrición/HDS BP Nutri.pdf" "$DST_HDS/bp-nutri.pdf"
cp "$SRC/HOJAS DE SEGURIDAD/Bionutrición/HDS BP Nitro FX.pdf" "$DST_HDS/bp-nitro-fx.pdf"
cp "$SRC/HOJAS DE SEGURIDAD/Bionutrición/HDS BP Boro.pdf" "$DST_HDS/bp-boro.pdf"
cp "$SRC/HOJAS DE SEGURIDAD/Bionutrición/HDS BP Zinc.pdf" "$DST_HDS/bp-zinc.pdf"
cp "$SRC/HOJAS DE SEGURIDAD/Bionutrición/HDS BP Ferrum.pdf" "$DST_HDS/bp-ferrum.pdf"
cp "$SRC/HOJAS DE SEGURIDAD/Bionutrición/HDS AE Calcium.pdf" "$DST_HDS/ae-calcium.pdf"
cp "$SRC/HOJAS DE SEGURIDAD/Bionutrición/HDS BP Mol.pdf" "$DST_HDS/bp-mol.pdf"
cp "$SRC/HOJAS DE SEGURIDAD/Bionutrición/HDS BP Vit.pdf" "$DST_HDS/bp-vit.pdf"
cp "$SRC/HOJAS DE SEGURIDAD/Bionutrición/HDS BP Mix.pdf" "$DST_HDS/bp-mix.pdf"
cp "$SRC/HOJAS DE SEGURIDAD/Bionutrición/HDS BP Fioré.pdf" "$DST_HDS/bp-fiore.pdf"
cp "$SRC/HOJAS DE SEGURIDAD/Bionutrición/HDS BP Cuaje.pdf" "$DST_HDS/bp-cuaje.pdf"
cp "$SRC/HOJAS DE SEGURIDAD/Bionutrición/HDS BP Fresh.pdf" "$DST_HDS/bp-fresh.pdf"
cp "$SRC/HOJAS DE SEGURIDAD/Bionutrición/HDS BP Gross.pdf" "$DST_HDS/bp-gross.pdf"
cp "$SRC/HOJAS DE SEGURIDAD/Bionutrición/HDS BP Koren.pdf" "$DST_HDS/bp-koren.pdf"
cp "$SRC/HOJAS DE SEGURIDAD/Bionutrición/HDS BP N-Ultra.pdf" "$DST_HDS/n-ultra.pdf"
cp "$SRC/HOJAS DE SEGURIDAD/Bionutrición/HDS BP P-Ultra.pdf" "$DST_HDS/p-ultra.pdf"
cp "$SRC/HOJAS DE SEGURIDAD/Bionutrición/HDS BP K-Ultra.pdf" "$DST_HDS/k-ultra.pdf"
cp "$SRC/HOJAS DE SEGURIDAD/Bionutrición/HDS BP Ca-Ultra.pdf" "$DST_HDS/ca-ultra.pdf"
cp "$SRC/HOJAS DE SEGURIDAD/Bionutrición/HDS BP Mg-Ultra.pdf" "$DST_HDS/mg-ultra.pdf"
cp "$SRC/HOJAS DE SEGURIDAD/Bionutrición/HDS BP Gibb Plant.pdf" "$DST_HDS/bp-gibb.pdf"
cp "$SRC/HOJAS DE SEGURIDAD/Bionutrición/HDS BONTERA.pdf" "$DST_HDS/bontera-sa10.pdf"
cp "$SRC/HOJAS DE SEGURIDAD/Bionutrición/HDS BP Cu Agro Organic.pdf" "$DST_HDS/bp-cu-agro.pdf"
cp "$SRC/HOJAS DE SEGURIDAD/Bionutrición/HDS BP OxyAgro.pdf" "$DST_HDS/bp-oxyagro.pdf"

# Bioplaguicidas (7)
cp "$SRC/HOJAS DE SEGURIDAD/Bioplaguicidas/HDS-ZenChrys.pdf" "$DST_HDS/zen-chrys.pdf"
cp "$SRC/HOJAS DE SEGURIDAD/Bioplaguicidas/HDS-ZenCan.pdf" "$DST_HDS/zen-can.pdf"
cp "$SRC/HOJAS DE SEGURIDAD/Bioplaguicidas/HDS-ZENFUNGI.pdf" "$DST_HDS/zen-fungi.pdf"
cp "$SRC/HOJAS DE SEGURIDAD/Bioplaguicidas/HDS-ZenCu.pdf" "$DST_HDS/zen-cu.pdf"
cp "$SRC/HOJAS DE SEGURIDAD/Bioplaguicidas/HDS-ZEN SPIDER.pdf" "$DST_HDS/zen-spider.pdf"
cp "$SRC/HOJAS DE SEGURIDAD/Bioplaguicidas/HDS-FUNBAC PLUS.pdf" "$DST_HDS/funbac-plus.pdf"
cp "$SRC/HOJAS DE SEGURIDAD/Bioplaguicidas/HDS MAX-KILL PLUS.pdf" "$DST_HDS/max-kill-plus.pdf"
```

- [ ] **Step 5: Copy and rename OMRI certifications**

```bash
DST_OMRI="public/docs/omri"

# Bionutrición (11)
cp "$SRC/OMRI/BIONUTRICIÓN/bbf-14858-cert BP CALCIO.pdf" "$DST_OMRI/bp-calcio.pdf"
cp "$SRC/OMRI/BIONUTRICIÓN/bbf-14860-cert BP MAGNESIO.pdf" "$DST_OMRI/bp-magnesio.pdf"
cp "$SRC/OMRI/BIONUTRICIÓN/bbf-14859-cert BP POTASIO.pdf" "$DST_OMRI/bp-potasio.pdf"
cp "$SRC/OMRI/BIONUTRICIÓN/bbf-14856-cert BP MOOTS.pdf" "$DST_OMRI/bp-moots.pdf"
cp "$SRC/OMRI/BIONUTRICIÓN/bbf-14855-cert BP NUTRI.pdf" "$DST_OMRI/bp-nutri.pdf"
cp "$SRC/OMRI/BIONUTRICIÓN/bbf-14857-cert BP NITRO FX.pdf" "$DST_OMRI/bp-nitro-fx.pdf"
cp "$SRC/OMRI/BIONUTRICIÓN/bbf-18911-cert BP ZINC.pdf" "$DST_OMRI/bp-zinc.pdf"
cp "$SRC/OMRI/BIONUTRICIÓN/qes-21445-cert AE CALCIUM.pdf" "$DST_OMRI/ae-calcium.pdf"
cp "$SRC/OMRI/BIONUTRICIÓN/qes-21430-cert BP KOREN.pdf" "$DST_OMRI/bp-koren.pdf"
cp "$SRC/OMRI/BIONUTRICIÓN/qes-12425-cert OXYAGRO.pdf" "$DST_OMRI/bp-oxyagro.pdf"
cp "$SRC/OMRI/BIONUTRICIÓN/qes-22336-cert CU AGRO ORGANIC.pdf" "$DST_OMRI/bp-cu-agro.pdf"

# Bioplaguicidas (5)
cp "$SRC/OMRI/BIOPLAGUICIDAS/bbf-16319-cert ZEN-CHRYS.pdf" "$DST_OMRI/zen-chrys.pdf"
cp "$SRC/OMRI/BIOPLAGUICIDAS/bbf-16318-cert ZEN-CAN.pdf" "$DST_OMRI/zen-can.pdf"
cp "$SRC/OMRI/BIOPLAGUICIDAS/bbf-17454-cert ZEN-FUNGI.pdf" "$DST_OMRI/zen-fungi.pdf"
cp "$SRC/OMRI/BIOPLAGUICIDAS/bbf-17852-cert FUNBAC PLUS.pdf" "$DST_OMRI/funbac-plus.pdf"
cp "$SRC/OMRI/BIOPLAGUICIDAS/bbf-17864-cert MAX-KILL PLUS.pdf" "$DST_OMRI/max-kill-plus.pdf"
```

- [ ] **Step 6: Copy and rename COFEPRIS registrations**

```bash
DST_COF="public/docs/cofepris"

# Bionutrición (21)
cp "$SRC/COFEPRIS/BIONUTRICIÓN/RSCO-012-II-21 BP CALCIO.pdf" "$DST_COF/bp-calcio.pdf"
cp "$SRC/COFEPRIS/BIONUTRICIÓN/RSCO-226-X-19 BP MAGNESIO.pdf" "$DST_COF/bp-magnesio.pdf"
cp "$SRC/COFEPRIS/BIONUTRICIÓN/RSCO-245-XII-19 BP POTASIO.pdf" "$DST_COF/bp-potasio.pdf"
cp "$SRC/COFEPRIS/BIONUTRICIÓN/RSCO-067-VII-20 BP MOOTS.pdf" "$DST_COF/bp-moots.pdf"
cp "$SRC/COFEPRIS/BIONUTRICIÓN/RSCO-066-VI-20 BP NUTRI.pdf" "$DST_COF/bp-nutri.pdf"
cp "$SRC/COFEPRIS/BIONUTRICIÓN/RSCO-230-X-19 NITRO FX.pdf" "$DST_COF/bp-nitro-fx.pdf"
cp "$SRC/COFEPRIS/BIONUTRICIÓN/RSCO-069-VII-20 BP BORO.pdf" "$DST_COF/bp-boro.pdf"
cp "$SRC/COFEPRIS/BIONUTRICIÓN/RSCO-471 IX 24 BP ZINC.pdf" "$DST_COF/bp-zinc.pdf"
cp "$SRC/COFEPRIS/BIONUTRICIÓN/RSCO-456 IX 24 BP FERRUM.pdf" "$DST_COF/bp-ferrum.pdf"
cp "$SRC/COFEPRIS/BIONUTRICIÓN/RSCO-012-II-21 AE CALCIUM.pdf" "$DST_COF/ae-calcium.pdf"
cp "$SRC/COFEPRIS/BIONUTRICIÓN/RSCO-244 XII 19 BP MOL.pdf" "$DST_COF/bp-mol.pdf"
cp "$SRC/COFEPRIS/BIONUTRICIÓN/RSCO-229-X-19 BP VIT.pdf" "$DST_COF/bp-vit.pdf"
cp "$SRC/COFEPRIS/BIONUTRICIÓN/RSCO-302-IX-22 BP MIX.pdf" "$DST_COF/bp-mix.pdf"
cp "$SRC/COFEPRIS/BIONUTRICIÓN/RSCO-072-VII-20 BP CUAJE.pdf" "$DST_COF/bp-cuaje.pdf"
cp "$SRC/COFEPRIS/BIONUTRICIÓN/RSCO-014-II-20 BP GROSS.pdf" "$DST_COF/bp-gross.pdf"
cp "$SRC/COFEPRIS/BIONUTRICIÓN/RSCO-067-VII-20 BP KOREN.pdf" "$DST_COF/bp-koren.pdf"
cp "$SRC/COFEPRIS/BIONUTRICIÓN/RSCO-025-I-24  N ULTRA.pdf" "$DST_COF/n-ultra.pdf"
cp "$SRC/COFEPRIS/BIONUTRICIÓN/RSC0-357-VIIl-23 P ULTRA.pdf" "$DST_COF/p-ultra.pdf"
cp "$SRC/COFEPRIS/BIONUTRICIÓN/RSC0-388-Vlll-23 K ULTRA.pdf" "$DST_COF/k-ultra.pdf"
cp "$SRC/COFEPRIS/BIONUTRICIÓN/RSCO-441-IX-24 CA-ULTR.pdf" "$DST_COF/ca-ultra.pdf"

# Bioplaguicidas (7)
cp "$SRC/COFEPRIS/BIOPLAGUICIDAS/RSCO-INAC-O185-X0588-009-2.5 BIOPRODUCTOS AGRICOLAS ZEN-CHRYS.pdf" "$DST_COF/zen-chrys.pdf"
cp "$SRC/COFEPRIS/BIOPLAGUICIDAS/RSCO-INAC-0104R-X0584-009-25.0_BIOPRODUCTOS_AGRICOLAS_ZEN-CAN.pdf" "$DST_COF/zen-can.pdf"
cp "$SRC/COFEPRIS/BIOPLAGUICIDAS/RSCO-FUNG-0301M-X0538-375-90.12 ZEN-FUNGI.pdf" "$DST_COF/zen-fungi.pdf"
cp "$SRC/COFEPRIS/BIOPLAGUICIDAS/RSCO-FUNG-305G-X0356-375-26.0 BIOPRODUCTOS AGRICOLAS ZEN-CU.pdf" "$DST_COF/zen-cu.pdf"
cp "$SRC/COFEPRIS/BIOPLAGUICIDAS/ZEN SPIDER RSCO-MEZC-INAC-0930Z-X0208-375-35.0.pdf" "$DST_COF/zen-spider.pdf"
cp "$SRC/COFEPRIS/BIOPLAGUICIDAS/FUNBAC PLUS RSCO-MEZC-FUNG-0911E-X0087-009.pdf" "$DST_COF/funbac-plus.pdf"
cp "$SRC/COFEPRIS/BIOPLAGUICIDAS/MAX-KILL PLUS RSCO-MEZC-INAC-0911G-X0085-009-8.25.pdf" "$DST_COF/max-kill-plus.pdf"
```

- [ ] **Step 7: Verify files copied correctly**

```bash
echo "=== Images ===" && ls -1 public/images/products/ | wc -l
echo "=== Fichas ===" && ls -1 public/docs/fichas-tecnicas/ | wc -l
echo "=== HDS ======" && ls -1 public/docs/hojas-seguridad/ | wc -l
echo "=== OMRI =====" && ls -1 public/docs/omri/ | wc -l
echo "=== COFEPRIS =" && ls -1 public/docs/cofepris/ | wc -l
```

Expected: Images ~35, Fichas ~35, HDS ~34, OMRI ~16, COFEPRIS ~28. If any are missing, check the source filename for special characters (accents, extra spaces).

- [ ] **Step 8: Add `public/docs/` and `public/images/products/` to `.gitignore` or add to git**

Since these are large binary files (~150+ PDFs + 35 PNGs), decide based on repo size tolerance. If the total is under ~50MB, commit them. If over, add to `.gitignore` and handle deployment separately.

```bash
du -sh public/docs/ public/images/products/
```

If committing:
```bash
git add public/images/products/ public/docs/
git commit -m "assets: add product bottle photos and downloadable PDFs"
```

---

## Task 3: Extract Product Data from PDFs and Update products.ts

**Files:**
- Modify: `src/data/products.ts`
- Read: All 35 PDF technical datasheets from `INFORMACION BIOPRODUCTOS/FICHAS TECNICAS/`

This is the most intensive task. For each product that has a technical datasheet:

1. Read the PDF
2. Extract: composition table, dosage by system, dosage by crop, packaging sizes
3. Cross-reference with existing data in products.ts
4. Update/correct any discrepancies
5. Add new fields: `image`, `dosage_table`, `dosage_by_crop`, `documents`

- [ ] **Step 1: Read each PDF and update the corresponding product**

For each product, follow this pattern. Here's the complete example for `bp-moots`:

Read: `INFORMACION BIOPRODUCTOS/FICHAS TECNICAS/Bionutricion/FT BP Moots.pdf`

Then update the product object in `src/data/products.ts`. Add/update these fields:

```typescript
{
  id: 'bp-moots',
  // ... existing fields stay, but verify composition against PDF ...
  image: '/images/products/bp-moots.png',
  dosage_table: [
    { system: 'extensivo', dose: '2-3 L/ha', method: 'Drench radicular', frequency: 'Cada 15-20 días' },
    { system: 'intensivo', dose: '2-4 L/ha', method: 'Fertirrigación', frequency: 'Cada 10-15 días' },
    { system: 'hidropónico', dose: '1-2 mL/L', method: 'Solución nutritiva', frequency: 'Cada 7-10 días' },
  ],
  dosage_by_crop: [
    { crop: 'tomate', cropName: 'Tomate', stages: ['trasplante', 'crecimiento vegetativo'], dose: '2 mL/L', method: 'Drench', frequency: 'Al trasplante, días 7 y 14', notes: 'Aplicar en la tarde' },
    { crop: 'fresa', cropName: 'Fresa', stages: ['trasplante'], dose: '2-3 mL/L', method: 'Drench', frequency: 'Al trasplante y cada 15 días', notes: 'Excelente respuesta en corona' },
    // ... extract all crops from the PDF dosage table ...
  ],
  documents: {
    datasheet: '/docs/fichas-tecnicas/bp-moots.pdf',
    safety_sheet: '/docs/hojas-seguridad/bp-moots.pdf',
    omri_cert: '/docs/omri/bp-moots.pdf',
    cofepris_cert: '/docs/cofepris/bp-moots.pdf',
  },
}
```

**Repeat for ALL 35 products with PDFs.** The products to process are:

**Bionutrición (26):** bp-calcio, bp-magnesio, bp-potasio, bp-moots, bp-nutri, bp-nitro-fx, bp-boro, bp-zinc, bp-ferrum, ae-calcium, bp-mol, bp-vit, bp-mix, bp-acua, bp-gibb, bp-fiore, bp-cuaje, bp-fresh, bp-gross, bp-koren, n-ultra, p-ultra, k-ultra, ca-ultra, mg-ultra, bp-cu-agro

**Bioplaguicidas (9):** zen-chrys, zen-can, zen-fungi, zen-cu, zen-spider, funbac-plus, max-kill-plus, enhancer, bp-oxyagro

**Products WITHOUT PDFs** (6 remaining from the 41): bontera-sa10, bp-acua (check if has PDF), biotiza-lactobacillus, biotiza-coadyuvante, nemapro, biotiza-calcio-boro. For these, only add the `image` field if a bottle photo exists, and leave the other new fields undefined.

- [ ] **Step 2: For products without a PDF, add only `image` and `documents` where available**

Check which products have a bottle photo but no datasheet. For these, add:

```typescript
image: '/images/products/<slug>.png',  // only if photo exists
documents: {
  // only include fields for documents that exist
  safety_sheet: '/docs/hojas-seguridad/<slug>.pdf',  // if exists
},
```

- [ ] **Step 3: Verify products.ts compiles**

Run: `"C:/Program Files/nodejs/node.exe" node_modules/next/dist/bin/next build`

Expected: Build succeeds. Fix any TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/data/products.ts
git commit -m "data: enrich all products with real PDF data, images, dosage tables, and document links"
```

---

## Task 4: Create Case Studies Data

**Files:**
- Create: `src/data/case-studies.ts`
- Read: All 21 PDFs from `INFORMACION BIOPRODUCTOS/DESARROLLOS/`

- [ ] **Step 1: Read each case study PDF and extract data**

For each PDF, extract:
- Crop and region
- Products used with doses
- Results (metrics, before/after values)
- Anonymize ALL client/farm names

Here's the complete example pattern for one case study:

```typescript
import type { CaseStudy } from '@/types'

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'enraizamiento-frambuesa-jalisco',
    slug: 'enraizamiento-frambuesa-jalisco',
    title: 'Enraizamiento en frambuesa con BP Moots',
    crop: 'frambuesa',
    cropName: 'Frambuesa',
    region: 'Jalisco',
    season: 'Primavera 2024',
    products_used: [
      { productId: 'bp-moots', productName: 'BP Moots', dose: '2 mL/L', method: 'Drench', frequency: 'Días 0, 7, 14' },
    ],
    challenge: 'Bajo porcentaje de prendimiento en trasplante de frambuesa, con pérdida del 15% de plantas en las primeras 3 semanas.',
    protocol: 'Se aplicó BP Moots en drench radicular al momento del trasplante y en dos aplicaciones posteriores (día 7 y 14). Se comparó contra parcela testigo sin enraizador.',
    results: [
      { metric: 'Prendimiento', before: '85%', after: '97%', improvement: '↑ 12 puntos' },
      { metric: 'Peso de raíz (30 días)', before: '4.2 g', after: '6.8 g', improvement: '↑ 62%' },
      { metric: 'Longitud de raíz', before: '8 cm', after: '14 cm', improvement: '↑ 75%' },
    ],
    conclusion: 'BP Moots mejoró significativamente el prendimiento y desarrollo radicular, reduciendo la pérdida de plantas en trasplante.',
  },
  // ... 20 more case studies extracted from the remaining PDFs ...
]
```

**All 21 PDFs to process:**

1. `AGROFARM, BP GROSS,POTASIO, MOOTS EN FRAMBUESA.pdf`
2. `JUANELOS, BP MOOTS EN FRAMBUESA.pdf`
3. `PEQUEÑO MILAGRO, BP CALCIO+BP POTASIO EN FRAMBUESA.pdf`
4. `JALIFRESH, BP Calcio BP MG BP POTASIO EN ZARZAMORA.pdf`
5. `BYOS BERRIES, BP KOREN EN ARANDANO.pdf`
6. `BYOS BERRIES, Zen-Chrys y Zen-Can en Arandano.pdf`
7. `EL SAGRADO RANCHO SAN VICENTE BP KOREN Y BP MOOTS EN APIO.pdf`
8. `MEGAFRESH, BP CALCIO EN Brocoli.pdf`
9. `SierraPack,Prueba de Zen-Can en tomate cherry.PDF`
10. `PRODUCIR LA CONCHA, BP KOREN EN SALADETTE.PDF`
11. `Max Kill Plus-Grupo Alta.pdf`
12. `ARGAMAN-Zen ChrysZen Spider.pdf`
13. `Desarrollo Finka.pdf`
14. `Desarrollo Produp.pdf`
15. `Chilchota- BP Moots.pdf`
16. `Desarrollo Las Palmas .pdf`
17. `Desarrollo R.Los Espinos.pdf`
18. `Desarrollo Agricola Bravo.pdf`
19. `Desarrollo de pdto. Agricola Nieto.pdf`
20. `Desarrollo-Zen Fungi,Grupo Alta.pdf.pdf`
21. `MAX KILL PLUS en agricola Campo Blanco.pdf`

**CRITICAL:** Replace ALL farm/client names with anonymous descriptions:
- "AGROFARM" → "Productor de frambuesa en Jalisco"
- "BYOS BERRIES" → "Productor de arándano en Jalisco"
- "Grupo Alta" → "Productor en la región"
- etc.

- [ ] **Step 2: Add helper functions**

```typescript
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((cs) => cs.slug === slug)
}

export function getCaseStudiesByCrop(crop: string): CaseStudy[] {
  return CASE_STUDIES.filter((cs) => cs.crop === crop)
}

export function getCaseStudiesByProduct(productId: string): CaseStudy[] {
  return CASE_STUDIES.filter((cs) =>
    cs.products_used.some((p) => p.productId === productId)
  )
}
```

- [ ] **Step 3: Update products.ts — link case_studies field**

For each product that appears in a case study, add the `case_studies` field with the IDs:

```typescript
// Example for bp-moots:
case_studies: ['enraizamiento-frambuesa-jalisco', 'chilchota-bp-moots', /* ... */],
```

- [ ] **Step 4: Verify build**

Run: `"C:/Program Files/nodejs/node.exe" node_modules/next/dist/bin/next build`

- [ ] **Step 5: Commit**

```bash
git add src/data/case-studies.ts src/data/products.ts
git commit -m "data: add 21 anonymized case studies and link to products"
```

---

## Task 5: Add New Crop Protocols

**Files:**
- Modify: `src/data/crops.ts`

- [ ] **Step 1: Add 3 crops from case studies (apio, brócoli, tomate cherry)**

These get protocols built from case study data. Add to `src/data/crops.ts` following the exact pattern of existing crops (e.g. TOMATE). Each needs:
- `FullCropProtocol` object with id, slug, name, scientific_name, emoji, gradient, accentColor, description, cycle_days, season, regions, featured_products, common_challenges, stages[]

Example for Apio:

```typescript
const APIO: FullCropProtocol = {
  id: 'apio', slug: 'apio', name: 'Apio', scientific_name: 'Apium graveolens',
  emoji: '🥬', gradient: 'from-emerald-700 to-emerald-500', accentColor: '#10b981',
  description: 'Cultivo de hoja de alto valor para mercado nacional y exportación. Requiere nutrición balanceada y enraizamiento fuerte desde trasplante.',
  cycle_days: 120,
  season: 'Otoño-Invierno en la mayoría de las regiones',
  regions: ['Guanajuato', 'Puebla', 'Estado de México', 'Jalisco'],
  featured_products: ['bp-koren', 'bp-moots', 'bp-calcio', 'n-ultra'],
  common_challenges: ['Septoria', 'Cercospora', 'Deficiencia de boro', 'Corazón negro'],
  stages: [
    {
      id: 'trasplante', name: 'Trasplante y Enraizamiento', emoji: '🌱',
      durationDays: 14, objective: 'Establecer sistema radicular robusto.',
      color: 'bg-emerald-100', textColor: 'text-emerald-700',
      products: [
        { productId: 'bp-moots', productName: 'BP Moots', line: 'organicos', dose: '2 mL/L', method: 'Drench', frequency: 'Al trasplante, días 7 y 14' },
        { productId: 'bp-koren', productName: 'BP Koren', line: 'organicos', dose: '1.5 mL/L', method: 'Foliar', frequency: 'Semanal desde día 10' },
      ],
    },
    // ... add remaining stages following existing crop patterns ...
  ],
}
```

- [ ] **Step 2: Add 3 extensive crops (maíz, caña de azúcar, frijol)**

These get general agronomic protocols with Biotiza product recommendations. Follow same pattern but with extensive-agriculture-appropriate stages and doses.

- [ ] **Step 3: Add all 6 to the CROP_PROTOCOLS export array**

```typescript
export const CROP_PROTOCOLS: FullCropProtocol[] = [
  TOMATE, FRESA, ARANDANO, FRAMBUESA, ZARZAMORA, AGUACATE, CHILE, CITRICOS,
  APIO, BROCOLI, TOMATE_CHERRY, MAIZ, CANA_AZUCAR, FRIJOL,
]
```

- [ ] **Step 4: Verify build**

Run: `"C:/Program Files/nodejs/node.exe" node_modules/next/dist/bin/next build`

- [ ] **Step 5: Commit**

```bash
git add src/data/crops.ts
git commit -m "data: add 6 new crop protocols (apio, brócoli, tomate cherry, maíz, caña, frijol)"
```

---

## Task 6: New UI Components

**Files:**
- Create: `src/components/products/DosageSystemTable.tsx`
- Create: `src/components/products/DosageByCropTable.tsx`
- Create: `src/components/products/ProductDocuments.tsx`
- Create: `src/components/products/CaseStudyCard.tsx`

- [ ] **Step 1: Create `DosageSystemTable.tsx`**

```tsx
import type { DosageBySystem } from '@/types'

interface DosageSystemTableProps {
  items: DosageBySystem[]
  productName: string
}

const SYSTEM_LABELS: Record<string, string> = {
  extensivo: 'Extensivo',
  intensivo: 'Intensivo',
  'hidropónico': 'Hidropónico',
}

export default function DosageSystemTable({ items, productName }: DosageSystemTableProps) {
  if (items.length === 0) return null

  return (
    <div className="overflow-x-auto rounded-xl border border-gris-100">
      <table className="w-full text-sm">
        <caption className="sr-only">Dosis de {productName} por sistema de producción</caption>
        <thead>
          <tr className="border-b border-gris-100 bg-gris-50">
            <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gris-500">Sistema</th>
            <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gris-500">Dosis</th>
            <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gris-500">Método</th>
            <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gris-500">Frecuencia</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i} className="border-b border-gris-50 last:border-0">
              <td className="px-4 py-2.5 font-medium text-gris-800">{SYSTEM_LABELS[item.system] ?? item.system}</td>
              <td className="px-4 py-2.5 font-bold text-verde-700">{item.dose}</td>
              <td className="px-4 py-2.5 text-gris-600">{item.method}</td>
              <td className="px-4 py-2.5 text-gris-600">{item.frequency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

- [ ] **Step 2: Create `DosageByCropTable.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { DosageByCrop } from '@/types'

interface DosageByCropTableProps {
  items: DosageByCrop[]
  productName: string
}

export default function DosageByCropTable({ items, productName }: DosageByCropTableProps) {
  const [expanded, setExpanded] = useState(false)

  if (items.length === 0) return null

  const visible = expanded ? items : items.slice(0, 5)

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-gris-100">
        <table className="w-full text-sm">
          <caption className="sr-only">Dosis de {productName} por cultivo</caption>
          <thead>
            <tr className="border-b border-gris-100 bg-gris-50">
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gris-500">Cultivo</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gris-500">Dosis</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gris-500">Método</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gris-500">Etapas</th>
              <th className="hidden sm:table-cell px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gris-500">Frecuencia</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((item, i) => (
              <tr key={i} className="border-b border-gris-50 last:border-0">
                <td className="px-4 py-2.5 font-medium text-gris-800 capitalize">{item.cropName}</td>
                <td className="px-4 py-2.5 font-bold text-verde-700">{item.dose}</td>
                <td className="px-4 py-2.5 text-gris-600">{item.method}</td>
                <td className="px-4 py-2.5 text-gris-600">
                  {item.stages.map((s) => (
                    <span key={s} className="mr-1 inline-block rounded bg-azul-50 px-1.5 py-0.5 text-xs text-azul-700 capitalize">{s}</span>
                  ))}
                </td>
                <td className="hidden sm:table-cell px-4 py-2.5 text-gris-600">{item.frequency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {items.length > 5 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 flex items-center gap-1 text-sm font-medium text-verde-600 hover:text-verde-700 transition-colors"
        >
          {expanded ? 'Ver menos' : `Ver ${items.length - 5} cultivos más`}
          <ChevronDown size={14} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Create `ProductDocuments.tsx`**

```tsx
import { FileText, Shield, Award, ClipboardCheck } from 'lucide-react'
import type { ProductDocuments as ProductDocsType } from '@/types'

interface ProductDocumentsProps {
  documents: ProductDocsType
  productName: string
}

const DOC_CONFIG = [
  { key: 'datasheet' as const, label: 'Ficha Técnica', icon: FileText, color: 'text-verde-600 bg-verde-50 border-verde-200 hover:bg-verde-100' },
  { key: 'safety_sheet' as const, label: 'Hoja de Seguridad', icon: Shield, color: 'text-azul-600 bg-azul-50 border-azul-200 hover:bg-azul-100' },
  { key: 'omri_cert' as const, label: 'Certificación OMRI', icon: Award, color: 'text-naranja-600 bg-naranja-50 border-naranja-200 hover:bg-naranja-100' },
  { key: 'cofepris_cert' as const, label: 'Registro COFEPRIS', icon: ClipboardCheck, color: 'text-azul-600 bg-azul-50 border-azul-200 hover:bg-azul-100' },
] as const

export default function ProductDocumentsSection({ documents, productName }: ProductDocumentsProps) {
  const available = DOC_CONFIG.filter((d) => documents[d.key])
  if (available.length === 0) return null

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {available.map(({ key, label, icon: Icon, color }) => (
        <a
          key={key}
          href={documents[key]!}
          target="_blank"
          rel="noopener noreferrer"
          download
          className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${color}`}
        >
          <Icon size={18} />
          <span>{label}</span>
          <span className="ml-auto text-xs opacity-60">PDF</span>
        </a>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Create `CaseStudyCard.tsx`**

```tsx
import Link from 'next/link'
import { TrendingUp, MapPin, Beaker } from 'lucide-react'
import type { CaseStudy } from '@/types'

interface CaseStudyCardProps {
  study: CaseStudy
  compact?: boolean
}

export default function CaseStudyCard({ study, compact = false }: CaseStudyCardProps) {
  const topResult = study.results[0]

  return (
    <Link
      href={`/casos-de-exito/${study.slug}`}
      className="group flex flex-col rounded-xl border border-gris-100 bg-white shadow-card hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-verde-500 to-verde-600 px-4 py-3">
        <p className="text-xs font-semibold text-white/80">{study.cropName} · {study.region}</p>
      </div>

      <div className="flex flex-1 flex-col p-4 space-y-3">
        <h3 className="text-sm font-semibold text-gris-900 group-hover:text-verde-700 transition-colors line-clamp-2">
          {study.title}
        </h3>

        {!compact && (
          <p className="text-xs text-gris-500 line-clamp-2">{study.challenge}</p>
        )}

        {/* Key result */}
        {topResult && (
          <div className="flex items-center gap-2 rounded-lg bg-verde-50 px-3 py-2">
            <TrendingUp size={14} className="text-verde-600 shrink-0" />
            <span className="text-xs font-medium text-verde-700">
              {topResult.metric}: {topResult.improvement ?? topResult.after}
            </span>
          </div>
        )}

        {/* Products used */}
        <div className="flex flex-wrap gap-1 mt-auto">
          {study.products_used.slice(0, 3).map((p) => (
            <span key={p.productId} className="inline-flex items-center gap-1 rounded-full bg-gris-100 px-2 py-0.5 text-xs text-gris-600">
              <Beaker size={10} />
              {p.productName}
            </span>
          ))}
          {study.products_used.length > 3 && (
            <span className="rounded-full bg-gris-100 px-2 py-0.5 text-xs text-gris-500">
              +{study.products_used.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
```

- [ ] **Step 5: Verify build**

Run: `"C:/Program Files/nodejs/node.exe" node_modules/next/dist/bin/next build`

- [ ] **Step 6: Commit**

```bash
git add src/components/products/DosageSystemTable.tsx src/components/products/DosageByCropTable.tsx src/components/products/ProductDocuments.tsx src/components/products/CaseStudyCard.tsx
git commit -m "feat: add product components for dosage tables, documents, and case study cards"
```

---

## Task 7: Update Product Detail Page

**Files:**
- Modify: `src/app/soluciones/[linea]/[slug]/page.tsx`

- [ ] **Step 1: Add imports for new components and data**

At the top of the file, add:

```typescript
import Image from 'next/image'
import DosageSystemTable from '@/components/products/DosageSystemTable'
import DosageByCropTable from '@/components/products/DosageByCropTable'
import ProductDocumentsSection from '@/components/products/ProductDocuments'
import CaseStudyCard from '@/components/products/CaseStudyCard'
import { getCaseStudiesByProduct } from '@/data/case-studies'
```

- [ ] **Step 2: Replace the image placeholder with real bottle photo**

In the left column, replace the icon-based placeholder div (lines ~126-136) with:

```tsx
<div
  className="relative flex h-72 items-center justify-center rounded-2xl overflow-hidden sm:h-80 lg:h-72 xl:h-80"
  style={{ background: `linear-gradient(135deg, ${lineConfig.color}22, ${lineConfig.color}44)` }}
>
  {product.image ? (
    <Image
      src={product.image}
      alt={product.name}
      width={280}
      height={320}
      className="object-contain p-4 max-h-full"
      sizes="(max-width: 768px) 100vw, 420px"
    />
  ) : (
    <div
      className="flex h-24 w-24 items-center justify-center rounded-3xl"
      style={{ backgroundColor: `${lineConfig.color}40` }}
    >
      <Icon size={48} style={{ color: lineConfig.color }} />
    </div>
  )}
  {product.featured && (
    <div className="absolute top-4 right-4 rounded-full bg-naranja-500 px-3 py-1 text-xs font-bold text-white">
      Estrella
    </div>
  )}
</div>
```

- [ ] **Step 3: Add Dosage by System section after Composición**

After the CompositionTable section (~line 209), add:

```tsx
{/* Dosis por sistema de producción */}
{product.dosage_table && product.dosage_table.length > 0 && (
  <div>
    <h2 className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-gris-500">
      Dosis por sistema de producción
    </h2>
    <DosageSystemTable items={product.dosage_table} productName={product.name} />
  </div>
)}
```

- [ ] **Step 4: Add Dosage by Crop section**

Right after the dosage by system section:

```tsx
{/* Dosis por cultivo */}
{product.dosage_by_crop && product.dosage_by_crop.length > 0 && (
  <div>
    <h2 className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-gris-500">
      Dosis por cultivo
    </h2>
    <DosageByCropTable items={product.dosage_by_crop} productName={product.name} />
  </div>
)}
```

- [ ] **Step 5: Add Documentos section after Certificaciones**

After the certifications section (~line 249):

```tsx
{/* Documentos descargables */}
{product.documents && (
  <div>
    <h2 className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-gris-500">
      Documentos
    </h2>
    <ProductDocumentsSection documents={product.documents} productName={product.name} />
  </div>
)}
```

- [ ] **Step 6: Add Resultados en Campo section**

After the Documentos section, add case studies. Note: this requires fetching case studies in the component body:

In the component body (after `const waText = ...`), add:

```typescript
const caseStudies = getCaseStudiesByProduct(product.id)
```

Then in the JSX, after the Documentos section:

```tsx
{/* Resultados en campo */}
{caseStudies.length > 0 && (
  <div>
    <h2 className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-gris-500">
      Resultados en campo
    </h2>
    <div className="grid gap-3 sm:grid-cols-2">
      {caseStudies.slice(0, 4).map((study) => (
        <CaseStudyCard key={study.id} study={study} compact />
      ))}
    </div>
  </div>
)}
```

- [ ] **Step 7: Verify build**

Run: `"C:/Program Files/nodejs/node.exe" node_modules/next/dist/bin/next build`

- [ ] **Step 8: Commit**

```bash
git add src/app/soluciones/[linea]/[slug]/page.tsx
git commit -m "feat: enhance product detail page with bottle photos, dosage tables, documents, case studies"
```

---

## Task 8: Create Case Studies Pages

**Files:**
- Create: `src/app/casos-de-exito/page.tsx`
- Create: `src/app/casos-de-exito/[slug]/page.tsx`

- [ ] **Step 1: Create listing page `src/app/casos-de-exito/page.tsx`**

```tsx
'use client'

import { useState, useMemo } from 'react'
import { Search, Filter } from 'lucide-react'
import { CASE_STUDIES } from '@/data/case-studies'
import { CROPS_DATA } from '@/data/constants'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import CaseStudyCard from '@/components/products/CaseStudyCard'

export default function CasosDeExitoPage() {
  const [cropFilter, setCropFilter] = useState('')
  const [search, setSearch] = useState('')

  const crops = useMemo(() => {
    const cropSlugs = [...new Set(CASE_STUDIES.map((cs) => cs.crop))]
    return cropSlugs.map((slug) => {
      const config = CROPS_DATA.find((c) => c.slug === slug)
      return { slug, name: config?.name ?? slug }
    })
  }, [])

  const filtered = useMemo(() => {
    return CASE_STUDIES.filter((cs) => {
      if (cropFilter && cs.crop !== cropFilter) return false
      if (search) {
        const q = search.toLowerCase()
        return (
          cs.title.toLowerCase().includes(q) ||
          cs.cropName.toLowerCase().includes(q) ||
          cs.products_used.some((p) => p.productName.toLowerCase().includes(q))
        )
      }
      return true
    })
  }, [cropFilter, search])

  return (
    <div className="bg-white">
      <div className="bg-gradient-to-b from-verde-50 to-white py-16">
        <Container>
          <SectionHeading
            tag="Evidencia real"
            title="Casos de Éxito"
            subtitle="Resultados comprobados en campo con productos Biotiza. Datos reales de productores mexicanos."
          />
        </Container>
      </div>

      <Container className="pb-16">
        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gris-400" />
            <input
              type="text"
              placeholder="Buscar por cultivo, producto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gris-200 bg-white py-2.5 pl-9 pr-4 text-sm text-gris-800 placeholder:text-gris-400 focus:border-verde-500 focus:outline-none focus:ring-1 focus:ring-verde-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-gris-400" />
            <select
              value={cropFilter}
              onChange={(e) => setCropFilter(e.target.value)}
              className="rounded-lg border border-gris-200 bg-white px-3 py-2.5 text-sm text-gris-700 focus:border-verde-500 focus:outline-none focus:ring-1 focus:ring-verde-500"
            >
              <option value="">Todos los cultivos</option>
              {crops.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-12 text-center text-sm text-gris-500">
            No se encontraron casos de éxito con esos filtros.
          </p>
        )}
      </Container>
    </div>
  )
}
```

- [ ] **Step 2: Create detail page `src/app/casos-de-exito/[slug]/page.tsx`**

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ChevronRight, MapPin, Calendar, TrendingUp, Beaker, FileDown } from 'lucide-react'
import { CASE_STUDIES, getCaseStudyBySlug } from '@/data/case-studies'
import { PRODUCTS } from '@/data/products'
import Container from '@/components/ui/Container'
import Badge from '@/components/ui/Badge'
import type { ProductLine } from '@/types'

export function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudyBySlug(slug)
  if (!study) return {}

  return {
    title: `${study.title} | Casos de Éxito — Biotiza`,
    description: `${study.challenge} Resultados con ${study.products_used.map((p) => p.productName).join(', ')} en ${study.cropName}.`,
  }
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = getCaseStudyBySlug(slug)
  if (!study) notFound()

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gris-100 bg-gris-50">
        <Container className="py-3">
          <nav className="flex items-center gap-1.5 text-xs text-gris-500 flex-wrap">
            <Link href="/" className="hover:text-verde-600 transition-colors">Inicio</Link>
            <ChevronRight size={12} />
            <Link href="/casos-de-exito" className="hover:text-verde-600 transition-colors">Casos de Éxito</Link>
            <ChevronRight size={12} />
            <span className="font-medium text-gris-800 truncate max-w-[200px]">{study.title}</span>
          </nav>
        </Container>
      </div>

      <Container className="py-10 lg:py-14">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-gris-500">
              <span className="inline-flex items-center gap-1"><MapPin size={14} /> {study.region}</span>
              <span className="inline-flex items-center gap-1"><Calendar size={14} /> {study.season}</span>
              <span className="rounded-full bg-verde-50 border border-verde-200 px-2.5 py-0.5 text-xs font-medium text-verde-700 capitalize">{study.cropName}</span>
            </div>
            <h1 className="font-serif text-3xl text-gris-900 lg:text-4xl">{study.title}</h1>
          </div>

          {/* Desafío */}
          <div>
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gris-500">Desafío</h2>
            <p className="text-base leading-relaxed text-gris-700">{study.challenge}</p>
          </div>

          {/* Protocolo */}
          <div>
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gris-500">Protocolo Aplicado</h2>
            <p className="text-base leading-relaxed text-gris-700">{study.protocol}</p>
          </div>

          {/* Productos utilizados */}
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gris-500">Productos Utilizados</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {study.products_used.map((p) => {
                const product = PRODUCTS.find((pr) => pr.id === p.productId)
                return (
                  <Link
                    key={p.productId}
                    href={product ? `/soluciones/${product.line}/${product.slug}` : '/soluciones'}
                    className="flex flex-col rounded-xl border border-gris-100 p-4 hover:border-verde-200 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Beaker size={14} className="text-verde-600" />
                      <span className="text-sm font-semibold text-gris-900">{p.productName}</span>
                      {product && <Badge line={product.line as ProductLine} size="sm" />}
                    </div>
                    <div className="text-xs text-gris-500 space-y-0.5">
                      <p><span className="font-medium text-gris-700">Dosis:</span> {p.dose}</p>
                      <p><span className="font-medium text-gris-700">Método:</span> {p.method}</p>
                      <p><span className="font-medium text-gris-700">Frecuencia:</span> {p.frequency}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Resultados */}
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gris-500">Resultados</h2>
            <div className="overflow-x-auto rounded-xl border border-gris-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gris-100 bg-gris-50">
                    <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gris-500">Métrica</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gris-500">Testigo</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gris-500">Tratamiento</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gris-500">Mejora</th>
                  </tr>
                </thead>
                <tbody>
                  {study.results.map((r, i) => (
                    <tr key={i} className="border-b border-gris-50 last:border-0">
                      <td className="px-4 py-2.5 font-medium text-gris-800">{r.metric}</td>
                      <td className="px-4 py-2.5 text-gris-500">{r.before ?? '—'}</td>
                      <td className="px-4 py-2.5 text-gris-700">{r.after}</td>
                      <td className="px-4 py-2.5 font-bold text-verde-600">{r.improvement ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Conclusión */}
          <div>
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gris-500">Conclusión</h2>
            <p className="text-base leading-relaxed text-gris-700">{study.conclusion}</p>
          </div>

          {/* Download PDF */}
          {study.pdf_source && (
            <a
              href={study.pdf_source}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center gap-2 rounded-lg border border-verde-200 bg-verde-50 px-4 py-2.5 text-sm font-medium text-verde-700 hover:bg-verde-100 transition-colors"
            >
              <FileDown size={16} />
              Descargar estudio completo (PDF)
            </a>
          )}

          {/* Back */}
          <div className="border-t border-gris-100 pt-6">
            <Link
              href="/casos-de-exito"
              className="inline-flex items-center gap-1.5 text-sm text-gris-500 hover:text-verde-600 transition-colors"
            >
              <ArrowLeft size={14} />
              Volver a Casos de Éxito
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
```

- [ ] **Step 3: Verify build**

Run: `"C:/Program Files/nodejs/node.exe" node_modules/next/dist/bin/next build`

- [ ] **Step 4: Commit**

```bash
git add src/app/casos-de-exito/
git commit -m "feat: add case studies listing and detail pages"
```

---

## Task 9: Create Documents Page

**Files:**
- Create: `src/app/documentos/page.tsx`

- [ ] **Step 1: Create `/documentos` page**

```tsx
'use client'

import { useState, useMemo } from 'react'
import { Search, FileText, Shield, Award, ClipboardCheck, Download } from 'lucide-react'
import { PRODUCTS } from '@/data/products'
import { PRODUCT_LINES } from '@/data/constants'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'

type DocType = 'datasheet' | 'safety_sheet' | 'omri_cert' | 'cofepris_cert'

const TABS: { id: DocType; label: string; icon: typeof FileText }[] = [
  { id: 'datasheet', label: 'Fichas Técnicas', icon: FileText },
  { id: 'safety_sheet', label: 'Hojas de Seguridad', icon: Shield },
  { id: 'omri_cert', label: 'OMRI', icon: Award },
  { id: 'cofepris_cert', label: 'COFEPRIS', icon: ClipboardCheck },
]

export default function DocumentosPage() {
  const [activeTab, setActiveTab] = useState<DocType>('datasheet')
  const [lineFilter, setLineFilter] = useState('')
  const [search, setSearch] = useState('')

  const products = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (!p.documents?.[activeTab]) return false
      if (lineFilter && p.line !== lineFilter) return false
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [activeTab, lineFilter, search])

  return (
    <div className="bg-white">
      <div className="bg-gradient-to-b from-gris-50 to-white py-16">
        <Container>
          <SectionHeading
            tag="Recursos técnicos"
            title="Centro de Documentos"
            subtitle="Descarga fichas técnicas, hojas de seguridad y certificaciones de todos nuestros productos."
          />
        </Container>
      </div>

      <Container className="pb-16">
        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-verde-500 text-white'
                  : 'bg-gris-100 text-gris-600 hover:bg-gris-200'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gris-400" />
            <input
              type="text"
              placeholder="Buscar producto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gris-200 bg-white py-2.5 pl-9 pr-4 text-sm placeholder:text-gris-400 focus:border-verde-500 focus:outline-none focus:ring-1 focus:ring-verde-500"
            />
          </div>
          <select
            value={lineFilter}
            onChange={(e) => setLineFilter(e.target.value)}
            className="rounded-lg border border-gris-200 bg-white px-3 py-2.5 text-sm text-gris-700 focus:border-verde-500 focus:outline-none focus:ring-1 focus:ring-verde-500"
          >
            <option value="">Todas las líneas</option>
            {PRODUCT_LINES.map((l) => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gris-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gris-100 bg-gris-50">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gris-500">Producto</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gris-500">Línea</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gris-500">Descargar</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const line = PRODUCT_LINES.find((l) => l.id === p.line)
                return (
                  <tr key={p.id} className="border-b border-gris-50 last:border-0 hover:bg-gris-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gris-800">{p.name}</td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
                        style={{ backgroundColor: line?.color }}
                      >
                        {line?.name}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <a
                        href={p.documents![activeTab]!}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="inline-flex items-center gap-1.5 rounded-lg border border-verde-200 bg-verde-50 px-3 py-1.5 text-xs font-medium text-verde-700 hover:bg-verde-100 transition-colors"
                      >
                        <Download size={12} />
                        PDF
                      </a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <p className="py-12 text-center text-sm text-gris-500">
            No se encontraron documentos con esos filtros.
          </p>
        )}
      </Container>
    </div>
  )
}
```

- [ ] **Step 2: Verify build**

Run: `"C:/Program Files/nodejs/node.exe" node_modules/next/dist/bin/next build`

- [ ] **Step 3: Commit**

```bash
git add src/app/documentos/
git commit -m "feat: add document center page with search and filters"
```

---

## Task 10: Update Crop Pages and Navigation

**Files:**
- Modify: `src/app/cultivos/[cultivo]/page.tsx`
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Add case studies section to crop detail page**

In `src/app/cultivos/[cultivo]/page.tsx`, add import:

```typescript
import { getCaseStudiesByCrop } from '@/data/case-studies'
import CaseStudyCard from '@/components/products/CaseStudyCard'
```

In the component body, after fetching the crop data, add:

```typescript
const cropCaseStudies = getCaseStudiesByCrop(crop.slug)
```

Then add this section in the JSX, before the closing `</Container>`:

```tsx
{/* Casos de éxito */}
{cropCaseStudies.length > 0 && (
  <div className="mt-16 border-t border-gris-100 pt-12">
    <h2 className="mb-6 font-serif text-2xl text-gris-900">
      Casos de Éxito en {crop.name}
    </h2>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cropCaseStudies.map((study) => (
        <CaseStudyCard key={study.id} study={study} />
      ))}
    </div>
  </div>
)}
```

- [ ] **Step 2: Add "Documentos" and "Casos de Éxito" links to Footer**

In `src/components/layout/Footer.tsx`, add to the `COL_RECURSOS` array:

```typescript
{ label: 'Casos de Éxito',     href: '/casos-de-exito'          },
{ label: 'Documentos técnicos',href: '/documentos'              },
```

- [ ] **Step 3: Verify build**

Run: `"C:/Program Files/nodejs/node.exe" node_modules/next/dist/bin/next build`

- [ ] **Step 4: Commit**

```bash
git add src/app/cultivos/[cultivo]/page.tsx src/components/layout/Footer.tsx
git commit -m "feat: add case studies to crop pages and update footer navigation"
```

---

## Task 11: Final Build Verification and Deploy

- [ ] **Step 1: Full build**

Run: `"C:/Program Files/nodejs/node.exe" node_modules/next/dist/bin/next build`

Expected: Build succeeds with zero errors. All static pages generated.

- [ ] **Step 2: Verify page counts**

Check the build output for:
- `/soluciones/[linea]/[slug]` — should show 41 product pages
- `/cultivos/[cultivo]` — should show 14 crop pages (8 original + 6 new)
- `/casos-de-exito/[slug]` — should show 21 case study pages
- `/documentos` — 1 page
- `/casos-de-exito` — 1 page

- [ ] **Step 3: Push to GitHub for Vercel deploy**

```bash
git push origin main
```

Expected: Vercel picks up the push and deploys successfully.
