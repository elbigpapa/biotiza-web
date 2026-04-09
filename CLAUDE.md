# CLAUDE.md — Proyecto Biotiza Website + Asistente IA

## Contexto
Biotiza (biotiza.mx) es una empresa mexicana de biosoluciones agrícolas con sede en Zapopan, Jalisco. Vende fertilizantes orgánicos, bioestimulantes, nutrición líquida y bioprotección (línea Zentia) directamente a agricultores de exportación (DTC). También distribuye productos de Veganic, Agrobionsa y Bioproductos Agrícolas.

## Stack
- Next.js 14+ (App Router) con TypeScript
- Tailwind CSS 3.4+ con configuración custom
- Framer Motion 11+
- MDX para blog
- React Hook Form + Zod
- Lucide React para iconos
- Desplegado en Vercel

## Convenciones
- Español para contenido visible. Inglés para código.
- Componentes: PascalCase (ProductCard.tsx)
- Hooks: camelCase con "use" (useScrollAnimation.ts)
- Constantes: SCREAMING_SNAKE (PRODUCTS_DATA.ts)
- Mobile-first responsive (sm → md → lg → xl)
- Todas las imágenes con next/image + sizes prop
- Animaciones: framer-motion con whileInView + viewport={{ once: true }}

## Estructura de Carpetas
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx            # Homepage
│   ├── nosotros/
│   ├── soluciones/
│   │   ├── page.tsx        # Catálogo completo
│   │   ├── [linea]/
│   │   │   ├── page.tsx    # Listado por línea
│   │   │   └── [slug]/
│   │   │       └── page.tsx # Detalle de producto
│   ├── cultivos/
│   │   └── [cultivo]/
│   ├── herramientas/
│   │   ├── calculadora-dosis/
│   │   ├── diagnostico/
│   │   ├── compatibilidad/
│   │   └── calculadora-roi/
│   ├── academia/
│   │   └── blog/
│   ├── contacto/
│   └── cotizacion/
├── components/
│   ├── layout/             # Header, Footer, Navigation, MegaMenu
│   ├── ui/                 # Button, Card, Badge, Input, Select, Modal
│   ├── sections/           # Hero, Features, CTA, Stats, Testimonials
│   ├── products/           # ProductCard, ProductGrid, CompositionTable, Comparator
│   ├── crops/              # CropCard, PhenologicalTimeline, StageDetail
│   ├── tools/              # DoseCalculator, DeficiencyWizard, CompatibilityChecker
│   ├── chat/               # ChatWidget, ChatMessage, ChatInput
│   └── shared/             # WhatsAppFloat, SEOHead, CookieConsent
├── data/
│   ├── products.ts         # Base de datos de productos (35+)
│   ├── crops.ts            # Protocolos por cultivo
│   ├── compatibility.ts    # Matriz de compatibilidad
│   └── constants.ts        # Config global
├── hooks/
│   ├── useScrollAnimation.ts
│   ├── useMediaQuery.ts
│   └── useQuotationCart.ts
├── lib/
│   ├── animations.ts       # Variantes de Framer Motion reutilizables
│   ├── utils.ts
│   └── seo.ts
├── styles/
│   └── globals.css
└── types/
    └── index.ts
```

## Datos de Contacto
- Email: ventas@biotiza.mx
- WhatsApp: PENDIENTE (usar placeholder 523300000000)
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
productos OMRI México, fertilizantes líquidos, aminoácidos plantas

## Personalidad del Asistente IA (Chat Widget)
Nombre: "Asesora Biotiza"
Tono: Profesional pero cercano. Usa "tú", emojis moderados (🌱🍅✅).
Siempre recomienda productos específicos del catálogo con dosis y método.
Si no sabe, lo dice y ofrece conectar con agrónomo humano.

## Diseño
- Fuentes: DM Serif Display (títulos) + DM Sans (cuerpo)
- Estilo: Moderno, orgánico, profesional. Formas de hoja/gota como elementos decorativos.
- Separadores entre secciones: formas SVG orgánicas, no líneas rectas.
- Composiciones de producto: fondo gris-900, tipografía mono, valores en verde-400.
- Mega-menu de Soluciones con 5 columnas color-coded.
