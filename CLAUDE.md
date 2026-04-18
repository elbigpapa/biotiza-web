# CLAUDE.md — Proyecto Biotiza Website + Asistente IA

## Contexto
Biotiza (biotiza.mx) es una empresa mexicana de biosoluciones agrícolas con sede en Zapopan, Jalisco. Vende fertilizantes orgánicos, bioestimulantes, nutrición líquida y bioprotección (línea Zentia) directamente a agricultores de exportación (DTC). Distribuye productos de Veganic, Agrobionsa y Bioproductos Agrícolas. Línea adicional **Biotiza Casa y Jardín** para consumidor final (plantas de interior, pasto, frutales caseros, flores, áreas verdes institucionales y campos de golf).

## Stack real (2026-04-18)
- **Next.js 16.2.4** App Router con Turbopack (NO es 14 — breaking changes)
- **React 19.2.5**
- **Tailwind CSS v4** con `@theme` en globals.css (tailwind.config.ts es IDE-only)
- **Framer Motion 12.38**
- **TypeScript 6** strict
- **Zod 4.3** + React Hook Form 7.72
- **lucide-react 1.8** (Instagram icon removed — usar custom SVG)
- **@anthropic-ai/sdk 0.88+** para la Asesora Biotiza (Claude Opus 4.7)
- Deploy: **Vercel** (mex1 + sfo1)

## Convenciones
- Español para contenido visible. Inglés para código.
- Componentes: PascalCase (ProductCard.tsx)
- Hooks: camelCase con "use" (useScrollAnimation.ts)
- Constantes: SCREAMING_SNAKE (PRODUCTS_DATA.ts)
- Mobile-first responsive (sm → md → lg → xl)
- Todas las imágenes con next/image + sizes prop
- Animaciones: framer-motion con whileInView + viewport={{ once: true }}
- **Server Components NO pueden recibir handlers de evento como prop.** Usa CSS hover con custom properties o extrae a Client Component.

## Estructura de Carpetas
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # RootLayout con Header + Footer + ChatWidget + CookieConsent
│   ├── page.tsx            # Homepage (10 secciones con WaveSeparators)
│   ├── nosotros/
│   ├── soluciones/         # Catálogo (5 líneas + 49 productos)
│   │   ├── [linea]/
│   │   │   └── [slug]/     # Ficha con Product JSON-LD + BreadcrumbList
│   ├── cultivos/
│   │   └── [cultivo]/      # 14 cultivos, 8 con protocolo detallado
│   ├── herramientas/
│   │   ├── calculadora-dosis/
│   │   ├── diagnostico/
│   │   ├── compatibilidad/
│   │   └── calculadora-roi/
│   ├── academia/
│   │   ├── page.tsx        # Hub
│   │   └── blog/
│   │       └── [slug]/     # Artículos con Article JSON-LD
│   ├── casa-jardin/        # Línea consumer (NUEVA)
│   │   ├── page.tsx        # Hub con 5 categorías + 4 paquetes destacados
│   │   ├── [categoria]/    # Listado por categoría + "todos"
│   │   └── paquete/[slug]/ # Detalle de paquete (9 paquetes)
│   ├── marcas/
│   │   └── [slug]/         # Bioproductos / Agrobionsa / Veganic
│   ├── contacto/
│   ├── cotizacion/         # Con carrito persistente
│   ├── politica-privacidad/
│   └── api/                # 4 routes dinámicas
│       ├── chat/route.ts       # Claude Opus 4.7 + prompt caching + tool use
│       ├── contact/route.ts    # Form contacto
│       ├── cotizacion/route.ts # Form cotización + items
│       └── leads/route.ts      # CRM con prioridad + especialista
├── components/
│   ├── layout/             # Header, Footer, MegaMenu, MobileNav
│   ├── ui/                 # Button, Card, Badge, Input, Select, Container, SectionHeading
│   ├── sections/           # Hero, WhyBiotiza, ProductLines, Cultivos, CTA, Blog, etc.
│   ├── products/           # ProductCard, CompositionTable
│   ├── crops/              # CropCard
│   ├── chat/               # ChatWidget (Asesora Biotiza)
│   └── shared/             # WhatsAppFloat, WaveSeparator, CookieConsent
├── data/
│   ├── products.ts         # 49 productos
│   ├── crops.ts            # 14 cultivos, 8 con protocolos detallados
│   ├── compatibility.ts    # Matriz de compatibilidad
│   ├── articles.ts         # 3 artículos de Academia
│   ├── home-garden.ts      # 5 categorías + 9 paquetes Casa y Jardín
│   └── constants.ts        # PRODUCT_LINES, BRANDS, CROPS_DATA, CONTACT_INFO
├── hooks/
│   └── useQuotationCart.tsx
├── lib/
│   ├── animations.ts
│   └── utils.ts            # whatsappLink(), cn()
└── types/
    └── index.ts
```

## Datos de Contacto
- Email: ventas@biotiza.mx
- WhatsApp: **+52 33 1602 2708** (real)
- Instagram: @biotiza
- Web: biotiza.mx
- Ubicación: Zapopan, Jalisco, México

## Líneas de Producto y Colores
- Orgánicos (#22B573 verde) — 10 productos
- Especialidades (#0E6E99 teal) — 6 productos
- Bioestimulantes y Sanitizantes (#E8690F naranja) — 6 productos
- Nutrición Líquida (#F28A3D naranja claro) — 9 productos
- Línea Zentia / Bioprotección (#1189BF azul) — 10 productos

## Certificaciones
- COFEPRIS (registro sanitario mexicano)
- OMRI Listed (certificación orgánica internacional)
- Hecho en México

## SEO Keywords
bioestimulantes México, fertilizantes orgánicos, control biológico plagas,
fertirrigación, enraizadores orgánicos, nutrición vegetal, bioprotección cultivos,
productos OMRI México, fertilizantes líquidos, aminoácidos plantas, productos casa y jardín México

## Asistente IA (Chat Widget)
Nombre: **Asesora Biotiza**
- Sin `ANTHROPIC_API_KEY`: heurística local (gratis, siempre funciona)
- Con `ANTHROPIC_API_KEY`: Claude Opus 4.7 con:
  - Prompt caching del catálogo completo (~90% más barato desde el 2.° hit)
  - Adaptive thinking
  - Tool `capture_lead`: extrae datos del prospecto de la conversación natural
  - Tool `suggest_next_steps`: devuelve chips clicables
- Tono: Profesional pero cercano. Usa "tú", emojis moderados (🌱🍅✅ — máximo 2 por respuesta).
- Recomienda productos específicos con dosis y método.
- Si no sabe, lo dice y ofrece conectar con agrónomo humano por WhatsApp.

## CRM de prospectos (/api/leads)
Cada lead se segmenta automáticamente:
- **Prioridad**: alta | media | baja (score: hectáreas + urgencia + presupuesto + contacto completo + tipo de interés)
- **Especialista**: asignado por cultivo (solanáceas, berries, frutales, hortalizas de hoja, granos, industriales, general)
- **Fuentes**: `chat` | `formulario-contacto` | `cotizacion` | `manual` | `academia` | `casa-jardin`
- Persistencia: si `LEADS_WEBHOOK_URL` está definido, POST al webhook. En dev, console.log.

## Seguridad (producción)
- CSP estricto en next.config.ts (con excepción para Google Analytics, Vercel Live, fonts)
- HSTS con preload (solo prod)
- X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin
- Permissions-Policy: camera/microphone off, geolocation self, interest-cohort off
- Cross-Origin-Opener-Policy same-origin
- Rate limit in-memory en las 4 APIs (5-15 req/min por IP)
- Honeypot field en todos los forms
- Zod validation en todos los endpoints

## Diseño
- Fuentes: DM Serif Display (títulos) + DM Sans (cuerpo) + JetBrains Mono (data)
- Estilo: Moderno, orgánico, profesional. Formas de hoja/gota, separadores WaveSeparator SVG.
- Composiciones de producto: fondo gris-900, tipografía mono, valores en verde-400.
- Mega-menu de Soluciones con 5 columnas color-coded.
- Utilidades premium en globals.css: `.glass`, `.glass-dark`, `.gradient-brand`, `.gradient-mesh-hero`, `.card-premium`, `.btn-primary/accent/secondary`, `.noise-overlay`, `.dot-pattern`.

## Estado actual
- **108 páginas estáticas + 4 APIs dinámicas**
- TypeScript clean · Build clean · 0 console errors
- Casa y Jardín completa (5 cat + 9 paquetes)
- Chat funcional con Claude + CRM con segmentación automática
- Listo para deploy a Vercel (ver `vercel.json` + `.env.example`)

## Para continuar en próxima sesión
Leer en orden:
1. `~/.claude/projects/.../memory/MEMORY.md` — índice
2. `project_biotiza.md` — overview
3. `reference_bash_env.md` — quirks del bash de Windows
4. `reference_build_commands.md` — cómo hacer build/dev
5. `project_pending_integrations.md` — webhooks/WhatsApp/LLM pendientes de env
