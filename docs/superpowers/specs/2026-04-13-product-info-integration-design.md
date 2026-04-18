# Design Spec: Product Information Integration

**Date:** 2026-04-13
**Status:** Approved
**Approach:** A — All data in TypeScript files, PDFs for download only

## Overview

Integrate all real product information from the `INFORMACION BIOPRODUCTOS` folder into the Biotiza website. This includes: real bottle photos, detailed composition and dosage data from technical datasheets, downloadable PDFs (datasheets, safety sheets, OMRI/COFEPRIS certs), anonymized field trial case studies, and new crop protocols.

## Source Material Inventory

| Type | Count | Location |
|------|-------|----------|
| Technical datasheets (PDF) | 35 | `FICHAS TECNICAS/Bionutricion/` + `Bioplaguicidas/` |
| Bottle photos (PNG) | 35 | `BOTELLAS/NUTRICIÓN/` + `PLAGUICIDAS/` |
| OMRI certifications (PDF) | 16 | `OMRI/BIONUTRICIÓN/` + `BIOPLAGUICIDAS/` |
| COFEPRIS registrations (PDF) | 28 | `COFEPRIS/BIONUTRICIÓN/` + `BIOPLAGUICIDAS/` |
| Safety data sheets (PDF) | 34 | `HOJAS DE SEGURIDAD/Bionutrición/` + `Bioplaguicidas/` |
| Field trial case studies (PDF) | 21 | `DESARROLLOS/` |

## Decisions Log

| Question | Decision |
|----------|----------|
| Case studies presentation | Both: dedicated `/casos-de-exito` section + snippets in product pages |
| Client names in case studies | Anonymized ("Productor de frambuesa en Jalisco") |
| PDF downloads | Both: buttons in product pages + centralized `/documentos` page |
| Dosage detail level | Full extraction — detailed tables rendered as HTML in product pages |
| Products without source docs | Keep with placeholder, enrich those that have docs |
| Bottle photo styling | Implementer's choice — whichever looks better |
| Crop protocols | Enrich existing 8 + add new from case studies + add maíz, caña, frijol |
| Navigation | Add "Casos de Éxito" to main nav, "Documentos" to footer |

---

## 1. Data Model Changes

### 1.1 Extended Product Type (`src/types/index.ts`)

New fields added to the existing `Product` interface:

```typescript
// New fields on Product (all optional — not all products have source docs)
dosage_table?: DosageBySystem[]
dosage_by_crop?: DosageByCrop[]
documents?: ProductDocuments
case_studies?: string[]  // IDs of related CaseStudy

// New types
interface DosageBySystem {
  system: 'extensivo' | 'intensivo' | 'hidropónico' | string
  dose: string
  method: string
  frequency: string
}

interface DosageByCrop {
  crop: string            // slug
  cropName: string        // display name
  stages: string[]        // recommended phenological stages
  dose: string
  method: string
  frequency: string
  notes?: string
}

interface ProductDocuments {
  datasheet?: string      // /docs/fichas-tecnicas/<slug>.pdf
  safety_sheet?: string   // /docs/hojas-seguridad/<slug>.pdf
  omri_cert?: string      // /docs/omri/<slug>.pdf
  cofepris_cert?: string  // /docs/cofepris/<slug>.pdf
}
```

### 1.2 New CaseStudy Type

```typescript
interface CaseStudy {
  id: string
  slug: string
  title: string
  crop: string
  cropName: string
  region: string
  season: string
  products_used: ProductUsed[]
  challenge: string
  protocol: string
  results: CaseStudyResult[]
  conclusion: string
  images?: string[]
  pdf_source?: string
}

interface ProductUsed {
  productId: string
  productName: string
  dose: string
  method: string
  frequency: string
}

interface CaseStudyResult {
  metric: string
  before?: string
  after: string
  improvement?: string
}
```

### 1.3 Data Files

- `src/data/products.ts` — update all 41 products with new fields, verify composition/doses against PDFs
- `src/data/case-studies.ts` — NEW: 21 anonymized case studies
- `src/data/crops.ts` — enrich 8 existing + add 6 new (apio, brócoli, tomate cherry, maíz, caña de azúcar, frijol)

---

## 2. Static Assets

### 2.1 Product Images

Copy bottle PNGs to `public/images/products/` renamed to product slug:

```
public/images/products/
├── bp-moots.png
├── bp-gross.png
├── zen-chrys.png
├── ... (35 files)
```

Update `image` field in each Product to point to the new path.
Products without photos keep the existing icon-based placeholder.

### 2.2 Downloadable PDFs

Copy and rename all PDFs to `public/docs/`:

```
public/docs/
├── fichas-tecnicas/
│   ├── bp-moots.pdf
│   └── ... (35 files)
├── hojas-seguridad/
│   ├── bp-moots.pdf
│   └── ... (34 files)
├── omri/
│   ├── bp-moots.pdf
│   └── ... (16 files)
├── cofepris/
│   ├── bp-moots.pdf
│   └── ... (28 files)
└── casos-de-exito/
    ├── enraizamiento-frambuesa-jalisco.pdf
    └── ... (only PDFs that do NOT contain real client names;
             if originals have confidential info, they are NOT uploaded)
```

---

## 3. New Pages

### 3.1 `/casos-de-exito` — Case Studies Listing

- Grid of case study cards
- Filters by crop and by product
- Each card shows: title, crop, region, key result metric, products used
- Links to detail page

### 3.2 `/casos-de-exito/[slug]` — Case Study Detail

- Header: title, crop, region, season
- Challenge section: what problem the producer faced
- Protocol section: what was applied, how
- Results table: metric | control/before | treatment/after | improvement %
- Products used: cards linking to product pages
- Conclusion
- Download original PDF button

### 3.3 `/documentos` — Document Center

- All documents grouped by type (tabs or sections): Fichas Técnicas, Hojas de Seguridad, OMRI, COFEPRIS
- Filters by product name and by product line
- Search by product name
- Each row: product name, document type, download button
- Direct download (no embedded viewer)

---

## 4. Enhanced Existing Pages

### 4.1 Product Detail Page (`/soluciones/[linea]/[slug]`)

Section order top to bottom:

1. Breadcrumb (existing)
2. Header + bottle photo (photo replaces icon placeholder)
3. Composición Garantizada (existing table, verified against PDFs)
4. **Tabla de Dosis por Sistema** (NEW: extensivo/intensivo/hidropónico)
5. **Dosis por Cultivo** (NEW: expandable table with per-crop doses)
6. Beneficios (existing)
7. Resuelve (existing tags)
8. Cultivos Recomendados (existing links)
9. Etapas de Aplicación (existing tags)
10. Certificaciones (existing badges)
11. **Documentos** (NEW: download buttons for available PDFs)
12. **Resultados en Campo** (NEW: case study summary cards)
13. Presentaciones (moved lower) + CTAs (Cotización + WhatsApp)
14. Productos Relacionados (existing grid)

### 4.2 Crop Detail Page (`/cultivos/[cultivo]`)

Add new section "Casos de Éxito en este Cultivo" showing case study cards filtered to that crop. Verify product recommendations against real datasheet data.

### 4.3 Crops Listing Page (`/cultivos`)

Add 6 new crops to the grid:
- Apio (from case study: BP Koren + BP Moots en apio)
- Brócoli (from case study: BP Calcio en brócoli)
- Tomate Cherry (from case study: Zen-Can en tomate cherry)
- Maíz (extensive crop, general protocol)
- Caña de Azúcar (extensive crop, general protocol)
- Frijol (extensive crop, general protocol)

New crops from case studies get protocols built from case data.
Extensive crops (maíz, caña, frijol) get general agronomic protocols with Biotiza product recommendations.

---

## 5. Navigation Changes

### 5.1 Main Nav (`NAV_LINKS` in constants.ts)

Add "Casos de Éxito" between "Herramientas" and "Academia":

```typescript
{ label: 'Casos de Éxito', href: '/casos-de-exito' }
```

### 5.2 Footer

Add links to:
- "Casos de Éxito" → `/casos-de-exito`
- "Documentos" → `/documentos`

### 5.3 MegaMenu

No changes needed — Soluciones mega menu stays as-is with 5 product lines.

---

## 6. Data Extraction Strategy

For each of the 35 products with technical datasheets:

1. Read the PDF to extract: full composition table, dosage by system, dosage by crop, packaging sizes, certifications
2. Cross-reference with existing product data in `products.ts`
3. Update/correct any discrepancies (composition values, dose ranges, presentations)
4. Add new fields (dosage_table, dosage_by_crop, documents)
5. Map bottle photo to product slug

For each of the 21 case studies:

1. Read the PDF to extract: crop, products used, doses, results data
2. Anonymize all client/farm names
3. Create CaseStudy object with measurable results
4. Link to related products and crops

---

## 7. SEO Considerations

- All product data rendered as HTML (not in PDFs) for full indexability
- Case study pages get their own meta tags with crop + product keywords
- Documents page uses structured data for downloadable resources
- New crop pages get SEO metadata matching existing pattern
- JSON-LD Product schema on product pages updated with new data

---

## 8. Out of Scope

- Visual/styling overhaul (to be done separately after data integration)
- CMS or admin interface
- PDF parsing automation (manual extraction)
- User authentication for document downloads
- Product pricing
- Chat widget / AI assistant training on new data
