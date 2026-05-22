# Rediseño Home Biotiza — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reconstruir la página de inicio de Biotiza como una experiencia de scroll de 9 escenas con modelo de 2 capas (gancho + inmersión), animación al hacer scroll, y arreglar los botones flotantes.

**Architecture:** Se crean 5 componentes-primitiva reutilizables (`SmoothScrollProvider`, `Scene`, `ScrollReveal`, `Immersion`, `ScrollCue`) en `src/components/redesign/`. Cada una de las 9 secciones de la home se reescribe usando esas primitivas. El `page.tsx` se reensambla en el nuevo orden. Trabajo aislado en un git worktree (rama `rediseno`), sin deploy hasta aprobación final.

**Tech Stack:** Next.js 16 · React 19 · Tailwind v4 · `motion` (sustituye a `framer-motion`) · `lenis` (smooth scroll). Sin WebGL, sin otras dependencias.

**Spec de referencia:** `docs/superpowers/specs/2026-05-22-rediseno-home-biotiza-design.md`

---

## Modelo de verificación

Este es un rediseño visual de frontend; la "prueba" de cada tarea no es un unit-test clásico sino:

- **VC (verificación de compilación):** `node node_modules/next/dist/bin/next build` termina en `EXIT:0`, sin errores de TypeScript ni de lint.
- **VV (verificación visual):** levantar el dev server (`preview_start` con `.claude/launch.json`) y revisar la ruta `/` — la escena se ve y anima como describe el spec; en móvil (375 px) no hay scroll horizontal ni texto ilegible.
- **VComport. (verificación de comportamiento):** solo para Tarea 15 (formulario/API) — el formulario valida y arma el POST correcto.

Cada tarea termina en **commit**. Mensajes en español, prefijo convencional (`feat:`, `fix:`, `chore:`, `refactor:`).

## Estructura de archivos

**Se crean:**
- `src/components/redesign/SmoothScrollProvider.tsx` — inicializa Lenis
- `src/components/redesign/ScrollReveal.tsx` — exporta `Reveal` y `RevealItem`
- `src/components/redesign/Scene.tsx` — envoltura de escena (fondo, parallax, layout)
- `src/components/redesign/Immersion.tsx` — acordeón accesible (capa 2)
- `src/components/redesign/ScrollCue.tsx` — indicador "sigue bajando"
- `src/components/sections/HerramientasSection.tsx` — escena 6 (nueva)
- `src/components/sections/MiniLeadForm.tsx` — formulario rápido del CTA

**Se modifican:**
- `src/components/sections/HeroSection.tsx`, `WhyBiotizaSection.tsx`, `ServiceSection.tsx`, `ProductLinesSection.tsx`, `CropsSection.tsx`, `SustainabilitySection.tsx`, `TestimonialsSection.tsx`, `CTASection.tsx` — reescritas con las primitivas
- `src/app/page.tsx` — nuevo orden de 9 escenas
- `src/app/layout.tsx` — envolver con `SmoothScrollProvider`
- `src/components/shared/WhatsAppFloat.tsx`, `src/components/chat/ChatWidget.tsx` — posicionamiento
- `src/app/api/leads/route.ts` — agregar `'home-cta'` al enum `fuente`
- `package.json` — `motion` y `lenis` en lugar de `framer-motion`

**No se tocan:** datos (`src/data/*`), las 4 APIs salvo el enum de leads, el tema editorial de `globals.css`, las páginas interiores.

---

## FASE 0 — Setup

### Task 1: Worktree aislado + dependencias

**Files:**
- Modify: `package.json` (dependencias)

- [ ] **Step 1: Crear el worktree**

Desde la carpeta del proyecto (`biotiza-web`), con la rama `main` limpia:

```bash
git worktree add ../biotiza-rediseno -b rediseno
cd ../biotiza-rediseno
```

Todo el trabajo restante del plan ocurre dentro de `../biotiza-rediseno`.

- [ ] **Step 2: Instalar `motion` y `lenis`, quitar `framer-motion`**

```bash
npm install motion lenis
npm uninstall framer-motion
```

- [ ] **Step 3: Migrar imports `framer-motion` → `motion`**

`motion` expone la misma API en el subpath `motion/react`. Buscar todos los imports:

```bash
grep -rl "from 'framer-motion'" src/
```

En cada archivo encontrado, reemplazar `from 'framer-motion'` por `from 'motion/react'`. La API (`motion`, `AnimatePresence`, `useScroll`, `useTransform`, `whileInView`, etc.) es idéntica — solo cambia la ruta del import.

- [ ] **Step 4: VC — build limpio**

Run: `node node_modules/next/dist/bin/next build`
Expected: `EXIT:0`, compila sin errores. Confirma que la migración a `motion` no rompió nada.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json src/
git commit -m "chore(rediseno): worktree + migra framer-motion a motion + agrega lenis"
```

---

## FASE 1 — Primitivas reutilizables

### Task 2: SmoothScrollProvider (Lenis)

**Files:**
- Create: `src/components/redesign/SmoothScrollProvider.tsx`

- [ ] **Step 1: Crear el componente**

```tsx
'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Smooth scroll global. Respeta prefers-reduced-motion: si el usuario
 * pidió menos movimiento, no se activa Lenis y el scroll es nativo.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
```

- [ ] **Step 2: VC — build limpio**

Run: `node node_modules/next/dist/bin/next build`
Expected: `EXIT:0`. (Aún no se usa; solo compila.)

- [ ] **Step 3: Commit**

```bash
git add src/components/redesign/SmoothScrollProvider.tsx
git commit -m "feat(rediseno): SmoothScrollProvider con Lenis y prefers-reduced-motion"
```

### Task 3: ScrollReveal (entrada escalonada)

**Files:**
- Create: `src/components/redesign/ScrollReveal.tsx`

- [ ] **Step 1: Crear el componente**

```tsx
'use client'

import { motion, type Variants } from 'motion/react'

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Contenedor que dispara la entrada escalonada al entrar al viewport. */
export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Cada hijo directo de <Reveal> que deba aparecer escalonado. */
export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}
```

Nota: `motion` respeta `prefers-reduced-motion` automáticamente reduciendo las transiciones; no hace falta lógica extra aquí.

- [ ] **Step 2: VC — build limpio**

Run: `node node_modules/next/dist/bin/next build`
Expected: `EXIT:0`.

- [ ] **Step 3: Commit**

```bash
git add src/components/redesign/ScrollReveal.tsx
git commit -m "feat(rediseno): ScrollReveal — entrada escalonada al hacer scroll"
```

### Task 4: Scene (envoltura de escena con parallax)

**Files:**
- Create: `src/components/redesign/Scene.tsx`

- [ ] **Step 1: Crear el componente**

`Scene` envuelve cada escena: aplica el fondo (imagen full-bleed con parallax, o color sólido), la variante clara/oscura, y el contenedor centrado. Props:
- `tone`: `'dark' | 'light'` — fondo oscuro (verde-950) o claro (paper).
- `image?`: `{ src: string; alt: string }` — si se pasa, fondo de imagen con overlay y parallax; si no, fondo de color según `tone`.
- `id?`: `string` — ancla opcional.
- `children`: contenido de la escena.

```tsx
'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import Container from '@/components/ui/Container'

interface SceneProps {
  tone?: 'dark' | 'light'
  image?: { src: string; alt: string }
  id?: string
  children: React.ReactNode
}

export default function Scene({
  tone = 'light',
  image,
  id,
  children,
}: SceneProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // Parallax: la imagen se desplaza más lento que el scroll.
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  const bg = tone === 'dark' ? 'bg-verde-950 text-white' : 'bg-paper text-ink'

  return (
    <section
      ref={ref}
      id={id}
      className={`relative overflow-hidden py-24 lg:py-32 ${bg}`}
    >
      {image && (
        <motion.div style={{ y }} className="absolute inset-0 -z-10" aria-hidden="true">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            className={`absolute inset-0 ${
              tone === 'dark' ? 'bg-verde-950/72' : 'bg-paper/70'
            }`}
          />
        </motion.div>
      )}
      <Container>{children}</Container>
    </section>
  )
}
```

- [ ] **Step 2: VC — build limpio**

Run: `node node_modules/next/dist/bin/next build`
Expected: `EXIT:0`.

- [ ] **Step 3: Commit**

```bash
git add src/components/redesign/Scene.tsx
git commit -m "feat(rediseno): Scene — envoltura de escena con fondo y parallax"
```

### Task 5: Immersion (acordeón accesible — capa 2)

**Files:**
- Create: `src/components/redesign/Immersion.tsx`

- [ ] **Step 1: Crear el componente**

Acordeón de una sola pieza: un botón disparador + un panel que se expande. Accesible: `<button>` real, `aria-expanded`, `aria-controls`, panel con `id`, navegable por teclado (un `<button>` ya es enfocable y activable con Enter/Espacio).

```tsx
'use client'

import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

interface ImmersionProps {
  /** Texto del disparador, p. ej. "Cómo funciona el acompañamiento". */
  trigger: string
  /** Variante de color para que contraste con el fondo de la escena. */
  tone?: 'dark' | 'light'
  children: React.ReactNode
}

export default function Immersion({
  trigger,
  tone = 'light',
  children,
}: ImmersionProps) {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  const triggerCls =
    tone === 'dark'
      ? 'border-white/25 bg-white/10 text-white hover:bg-white/15'
      : 'border-rule bg-paper-2 text-ink hover:bg-paper-3'

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className={`flex w-full items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left text-sm font-semibold transition-colors min-h-[44px] ${triggerCls}`}
      >
        <span>{trigger}</span>
        <span className={`transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true">
          ▾
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

- [ ] **Step 2: VC — build limpio**

Run: `node node_modules/next/dist/bin/next build`
Expected: `EXIT:0`.

- [ ] **Step 3: Commit**

```bash
git add src/components/redesign/Immersion.tsx
git commit -m "feat(rediseno): Immersion — acordeón accesible para la capa 2"
```

### Task 6: ScrollCue (indicador de scroll)

**Files:**
- Create: `src/components/redesign/ScrollCue.tsx`

- [ ] **Step 1: Crear el componente**

```tsx
'use client'

import { motion } from 'motion/react'

/** Indicador sutil que late, invitando a seguir bajando. */
export default function ScrollCue({
  label = 'Sigue bajando',
  tone = 'dark',
}: {
  label?: string
  tone?: 'dark' | 'light'
}) {
  const color = tone === 'dark' ? 'text-white/70' : 'text-ink-3'
  return (
    <div className={`flex flex-col items-center gap-2 ${color}`}>
      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em]">
        {label}
      </span>
      <motion.span
        aria-hidden="true"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="text-lg leading-none"
      >
        ↓
      </motion.span>
    </div>
  )
}
```

- [ ] **Step 2: VC — build limpio**

Run: `node node_modules/next/dist/bin/next build`
Expected: `EXIT:0`.

- [ ] **Step 3: Commit**

```bash
git add src/components/redesign/ScrollCue.tsx
git commit -m "feat(rediseno): ScrollCue — indicador animado de scroll"
```

---

## FASE 2 — Las 9 escenas

Cada tarea de esta fase reescribe una sección usando las primitivas de la
Fase 1. **Patrón de uso** (ejemplo completo de referencia — Escena Servicio):

```tsx
import Scene from '@/components/redesign/Scene'
import { Reveal, RevealItem } from '@/components/redesign/ScrollReveal'
import Immersion from '@/components/redesign/Immersion'

export default function ServiceSection() {
  return (
    <Scene tone="dark" image={{ src: '/...', alt: '...' }}>
      <Reveal className="max-w-[60ch]">
        <RevealItem>
          <p className="eyebrow-edit eyebrow-light mb-5">— 03 · Servicio</p>
        </RevealItem>
        <RevealItem>
          <h2 className="title-display text-white mb-5">
            Vendemos productos. <em>Acompañamos resultados.</em>
          </h2>
        </RevealItem>
        <RevealItem>
          <p className="dek-edit text-white/85 mb-8">Una frase corta.</p>
        </RevealItem>
        <RevealItem>
          <Immersion trigger="Cómo funciona el acompañamiento" tone="dark">
            {/* contenido a fondo de la capa 2 */}
          </Immersion>
        </RevealItem>
      </Reveal>
    </Scene>
  )
}
```

Todas las escenas siguen esta estructura. Cada tarea especifica el `tone`,
la imagen, el contenido de capa 1 (eyebrow, titular, frase), el contenido de
capa 2 (qué datos), y el CTA. Las clases editoriales (`eyebrow-edit`,
`title-display`, `dek-edit`) ya existen en `globals.css`.

**Verificación de todas las tareas de Fase 2:** VC (`next build` → `EXIT:0`) + VV (revisar la escena en `/` con el dev server: se ve, anima al entrar, la inmersión abre/cierra, legible en móvil 375 px) + commit.

### Task 7: Escena 1 — Hero

**Files:**
- Modify: `src/components/sections/HeroSection.tsx`

- [ ] **Step 1: Reescribir HeroSection**

- `tone`: dark. Imagen: `HERO_IMAGES.cultivatedField` (la foto de la mano sembrando, ya en `src/data/crop-images.ts`).
- Capa 1: eyebrow `MMXXVI · Biosoluciones`; titular hero `Ciencia` / *`que rinde`* / `al campo.` (clase `title-hero`, blanco); 3 métricas en fila (`47 productos`, `35 cultivos`, `25+ años de I+D`).
- **Sin** tira de certificaciones.
- Al pie: `<ScrollCue tone="dark" />`.
- Mantener el Ken Burns suave de la foto que ya tenía el hero.
- Sin capa 2 (el hero no lleva inmersión).

- [ ] **Step 2: VC + VV** — `next build` `EXIT:0`; el hero llena la primera pantalla, texto blanco legible sobre la foto, el ScrollCue late.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/HeroSection.tsx
git commit -m "feat(rediseno): escena 1 — Hero"
```

### Task 8: Escena 2 — Proceso

**Files:**
- Modify: `src/components/sections/WhyBiotizaSection.tsx`

- [ ] **Step 1: Reescribir como escena Proceso**

- `tone`: light. Imagen: laboratorio/campo (slot reemplazable; usar Unsplash de laboratorio agrícola).
- Capa 1: eyebrow `— 02 · Proceso`; titular `Del laboratorio a tu cultivo`; los 4 actos como chips (`01 Laboratorio`, `02 Ensayo`, `03 Acompañamiento`, `04 Cosecha medible`) — datos del array `STAGES` que ya existe en el archivo.
- Capa 2: una `Immersion` por acto (o una sola `Immersion` "Ver el proceso a detalle" que liste los 4 con su descripción — usar las `description` del array `STAGES`).
- CTA dentro de la inmersión: "Conoce a tu agrónomo →" hacia `/contacto`.

- [ ] **Step 2: VC + VV** — build `EXIT:0`; la inmersión abre y muestra el detalle de los actos; legible en móvil.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/WhyBiotizaSection.tsx
git commit -m "feat(rediseno): escena 2 — Proceso"
```

### Task 9: Escena 3 — Servicio

**Files:**
- Modify: `src/components/sections/ServiceSection.tsx`

- [ ] **Step 1: Reescribir como escena Servicio**

- `tone`: dark. Imagen: agrónomo con productor en campo (slot reemplazable).
- Capa 1: eyebrow `— 03 · Servicio`; titular `Vendemos productos. ` *`Acompañamos resultados.`*; una frase de apoyo corta.
- Capa 2: `Immersion` "Cómo funciona el acompañamiento" — agrónomo asignado por zona, plan/dosis/calendario, visitas en etapas clave, ajuste con datos de campo.
- CTA: "Quiero un agrónomo →" hacia `/contacto` (botón naranja).

- [ ] **Step 2: VC + VV** — build `EXIT:0`; escena oscura legible, inmersión funciona.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/ServiceSection.tsx
git commit -m "feat(rediseno): escena 3 — Servicio"
```

### Task 10: Escena 4 — Soluciones (5 líneas)

**Files:**
- Modify: `src/components/sections/ProductLinesSection.tsx`

- [ ] **Step 1: Reescribir como escena Soluciones**

- `tone`: light.
- Capa 1: eyebrow `— 04 · Soluciones`; titular `Cinco familias, un mismo criterio`; las 5 líneas como tarjetas (datos de `PRODUCT_LINES` de `src/data/constants.ts`: nombre, descripción, `productCount`, color). Cada tarjeta enlaza a `/soluciones/[slug]`.
- Capa 2: una `Immersion` por línea NO; en su lugar, cada tarjeta es un enlace directo a su línea. Mantener simple: 5 tarjetas-enlace.
- CTA: "Ver catálogo completo →" hacia `/soluciones`.

- [ ] **Step 2: VC + VV** — build `EXIT:0`; las 5 tarjetas con sus conteos reales (9·6·6·9·17 = 47), enlaces correctos.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/ProductLinesSection.tsx
git commit -m "feat(rediseno): escena 4 — Soluciones"
```

### Task 11: Escena 5 — Cultivos (invitación medular)

**Files:**
- Modify: `src/components/sections/CropsSection.tsx`

- [ ] **Step 1: Reescribir como escena Cultivos**

- `tone`: dark. Imagen: mosaico/campo de cultivos.
- Capa 1: eyebrow `— 05 · Cultivos`; titular `¿Qué le doy a mi cultivo?`; frase: el cliente ve qué productos Biotiza aplican a su cultivo.
- Mostrar 6-8 cultivos destacados como tarjetas con foto (datos de `CROPS_DATA` de `src/data/constants.ts` + `getCropImage` de `src/data/crop-images.ts`). Cada tarjeta → `/cultivos/[slug]`.
- CTA grande y protagónico: "Ver los 35 expedientes →" hacia `/cultivos`.
- Esta es la invitación protagónica a la página medular — el CTA debe destacar.

- [ ] **Step 2: VC + VV** — build `EXIT:0`; tarjetas de cultivo con foto, enlaces correctos, CTA a `/cultivos` prominente.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/CropsSection.tsx
git commit -m "feat(rediseno): escena 5 — Cultivos (invitación medular)"
```

### Task 12: Escena 6 — Herramientas (nueva)

**Files:**
- Create: `src/components/sections/HerramientasSection.tsx`

- [ ] **Step 1: Crear HerramientasSection**

- `tone`: light.
- Capa 1: eyebrow `— 06 · Herramientas`; titular `Calcula, diagnostica, decide`.
- 4 tarjetas, una por herramienta, cada una enlaza a su ruta:
  - Calculadora de dosis → `/herramientas/calculadora-dosis`
  - Calculadora de ROI → `/herramientas/calculadora-roi`
  - Diagnóstico de deficiencias → `/herramientas/diagnostico`
  - Compatibilidad de mezclas → `/herramientas/compatibilidad`
- Cada tarjeta: icono (lucide-react: `Calculator`, `TrendingUp`, `Stethoscope`, `CheckSquare`), título, una línea de descripción, flecha.

- [ ] **Step 2: VC + VV** — build `EXIT:0`; 4 tarjetas, los 4 enlaces resuelven a páginas reales.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/HerramientasSection.tsx
git commit -m "feat(rediseno): escena 6 — Herramientas (nueva)"
```

### Task 13: Escena 7 — Huella de carbono

**Files:**
- Modify: `src/components/sections/SustainabilitySection.tsx`

- [ ] **Step 1: Reescribir como escena Huella**

- `tone`: dark.
- Capa 1: eyebrow `— 07 · Huella de carbono`; titular `Menos huella, más cosecha`; las 4 cifras grandes (datos del array `STATS` que ya existe en el archivo) con la tipografía mono ya corregida para las unidades.
- Capa 2: `Immersion` "Ver las fuentes científicas" — la lista `SOURCES` con sus citas y enlaces, + la nota honesta.
- CTA: "Calcula tu ahorro →" hacia `/herramientas/calculadora-roi`.

- [ ] **Step 2: VC + VV** — build `EXIT:0`; las 4 cifras legibles (unidades en mono), inmersión muestra las fuentes citadas.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/SustainabilitySection.tsx
git commit -m "feat(rediseno): escena 7 — Huella de carbono"
```

### Task 14: Escena 8 — Filosofía + testimonios

**Files:**
- Modify: `src/components/sections/TestimonialsSection.tsx`

- [ ] **Step 1: Reescribir como escena Filosofía**

- `tone`: light.
- Capa 1: eyebrow `— 08 · Filosofía`; un pull-quote editorial grande (la cita que ya usa el componente).
- Capa 2: `Immersion` "Lo que no vamos a hacer" — los 4 compromisos (mismo contenido que la sección "Compromiso" de `/nosotros`: no prometemos números mágicos, no vendemos sin acompañamiento, no recomendamos lo que no usaríamos, no desaparecemos tras la venta).

- [ ] **Step 2: VC + VV** — build `EXIT:0`; pull-quote legible, inmersión con los 4 compromisos.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/TestimonialsSection.tsx
git commit -m "feat(rediseno): escena 8 — Filosofía y testimonios"
```

### Task 15: Escena 9 — CTA final + MiniLeadForm

**Files:**
- Create: `src/components/sections/MiniLeadForm.tsx`
- Modify: `src/components/sections/CTASection.tsx`
- Modify: `src/app/api/leads/route.ts`

- [ ] **Step 1: Agregar `'home-cta'` al enum `fuente` de la API de leads**

En `src/app/api/leads/route.ts`, el enum de `fuente`:

```ts
fuente: z.enum(['chat', 'formulario-contacto', 'cotizacion', 'manual', 'academia', 'casa-jardin', 'newsletter', 'home-cta']).default('manual'),
```

- [ ] **Step 2: Crear `MiniLeadForm`**

Client Component. Campos: `nombre` (texto, requerido, mín. 2), `cultivo` (texto, opcional), `telefono` (tel, requerido). Honeypot `website` (oculto). Inputs con `min-h-[44px]`. Al enviar: `POST /api/leads` con `{ nombre, cultivo, telefono, fuente: 'home-cta', notas: 'Mini-formulario del CTA de la home.' }`. Manejo de estados: enviando / éxito / error, con mensajes honestos. Reusar el patrón del formulario de `/contacto` (React Hook Form + Zod + `fetch`).

- [ ] **Step 3: Reescribir CTASection**

- `tone`: dark (variante naranja/oscuro de cierre).
- Capa 1: eyebrow `— 09`; titular `Hablemos de tu cultivo`.
- Tres vías de contacto: botón WhatsApp (`https://wa.me/523316022708`), botón "Solicitar cotización" (`/cotizacion`), y el `<MiniLeadForm />`.

- [ ] **Step 4: VComport. — verificar el formulario**

Levantar el dev server. En la escena 9: enviar el form vacío → muestra errores de validación. Enviarlo con nombre + teléfono válidos → estado de éxito. En la pestaña Red del navegador, confirmar `POST /api/leads` con el body correcto (`fuente: 'home-cta'`). VC: `next build` `EXIT:0`.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/MiniLeadForm.tsx src/components/sections/CTASection.tsx src/app/api/leads/route.ts
git commit -m "feat(rediseno): escena 9 — CTA final con mini-formulario"
```

---

## FASE 3 — Arreglos globales y ensamblaje

### Task 16: Arreglar el cruce botón IA / WhatsApp

**Files:**
- Modify: `src/components/shared/WhatsAppFloat.tsx`
- Modify: `src/components/chat/ChatWidget.tsx`

- [ ] **Step 1: Reposicionar los flotantes**

El problema: en móvil ambos quedan en `bottom-*/right-*` casi en el mismo punto. Solución — apilarlos verticalmente en móvil:
- `WhatsAppFloat`: contenedor `fixed bottom-6 right-5 z-50` (queda abajo).
- `ChatWidget` botón: en móvil `fixed bottom-24 right-5 z-50` (queda arriba del de WhatsApp, separado ~72 px); en escritorio mantener el offset horizontal actual (`lg:bottom-6 lg:right-24`). El panel del chat abierto: `bottom-40` en móvil para no encimar.

Confirmar que ambos botones miden 44×44 px o más y nunca se solapan a 375 px.

- [ ] **Step 2: VC + VV** — build `EXIT:0`; en viewport 375 px los dos botones se ven separados, ninguno tapa al otro; el panel del chat abre sin encimar el de WhatsApp.

- [ ] **Step 3: Commit**

```bash
git add src/components/shared/WhatsAppFloat.tsx src/components/chat/ChatWidget.tsx
git commit -m "fix(rediseno): el botón de chat ya no tapa al de WhatsApp en móvil"
```

### Task 17: Envolver el layout con SmoothScrollProvider

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Integrar el provider**

Importar `SmoothScrollProvider` y envolver el contenido del `<body>` (dentro de los providers existentes, sin alterar Header/Footer/ChatWidget). El provider es client-side y no rompe el renderizado de Server Components que envuelve.

- [ ] **Step 2: VC + VV** — build `EXIT:0`; al hacer scroll en `/` se siente el smooth scroll; con `prefers-reduced-motion` activo el scroll es nativo.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(rediseno): smooth scroll global vía SmoothScrollProvider"
```

### Task 18: Reensamblar page.tsx con el orden de 9 escenas

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Reescribir el orden de la home**

`page.tsx` renderiza, en este orden exacto:

```tsx
<HeroSection />          {/* 1 */}
<WhyBiotizaSection />    {/* 2 Proceso */}
<ServiceSection />       {/* 3 */}
<ProductLinesSection />  {/* 4 Soluciones */}
<CropsSection />         {/* 5 Cultivos */}
<HerramientasSection />  {/* 6 */}
<SustainabilitySection />{/* 7 Huella */}
<TestimonialsSection />  {/* 8 Filosofía */}
<CTASection />           {/* 9 */}
```

Eliminar los imports y usos de `CertificationsMarquee` y `FeaturedProductsSection`. Mantener el `export const metadata` de la home tal cual.

- [ ] **Step 2: VC + VV** — build `EXIT:0`; la home muestra las 9 escenas en orden, sin el marquee ni la sección de producto estrella.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(rediseno): ensambla la home con las 9 escenas"
```

---

## FASE 4 — Verificación final

### Task 19: Auditoría de la home rediseñada

**Files:** ninguno nuevo — verificación.

- [ ] **Step 1: Build de producción limpio**

Run: `node node_modules/next/dist/bin/next build`
Expected: `EXIT:0`, sin errores de TypeScript ni de lint, todas las páginas generadas.

- [ ] **Step 2: Revisión responsive y de accesibilidad**

Con el dev server, revisar `/` en 375 px y 1280 px:
- Sin scroll horizontal en móvil.
- Áreas táctiles (botones, disparadores de inmersión, tarjetas) ≥ 44 px.
- Contraste de texto AA en todas las escenas (texto claro sobre fondo oscuro y viceversa).
- Cada escena tiene al menos un CTA.
- Las inmersiones abren/cierran y son operables por teclado.
- Con `prefers-reduced-motion` activo: sin parallax ni smooth-scroll, contenido visible.

- [ ] **Step 3: Revisión de enlaces**

Verificar que todos los enlaces de la home resuelven: las 5 líneas → `/soluciones/*`, los cultivos destacados → `/cultivos/*`, las 4 herramientas → `/herramientas/*`, los CTA → `/contacto`, `/cotizacion`, `/cultivos`, `/soluciones`.

- [ ] **Step 4: Commit final de la rama**

```bash
git add -A
git commit -m "chore(rediseno): verificación final de la home rediseñada"
```

- [ ] **Step 5: Entregar para revisión**

NO fusionar a `main` ni desplegar. Avisar al dueño que el rediseño está listo en la rama `rediseno` (carpeta `biotiza-rediseno`) para que lo revise con el dev server. La fusión a `main` + el deploy único ocurren solo tras su aprobación.

---

## Notas de cierre

- **Imágenes:** todas las imágenes de escena son slots con stock de alta calidad (Unsplash, verificadas visualmente). Diseñadas para que la agencia del cliente las sustituya por contenido propio sin tocar código.
- **Sin deploy:** ninguna tarea despliega. El sitio en vivo (`main`) no se toca hasta la aprobación final.
- **Páginas interiores:** fuera de alcance — Fase 2 futura.
