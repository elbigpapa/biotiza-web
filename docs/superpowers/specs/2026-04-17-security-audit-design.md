# Security Audit + Forms Backend + Analytics + Consent — Design Spec

**Fecha**: 2026-04-17
**Autor**: Colaboración usuario + Claude (sesión brainstorming)
**Proyecto**: biotiza.mx (biotiza-web)
**Sub-proyecto**: A — Security + code audit + forms-to-backend
**Estado**: Diseño aprobado por usuario · Pendiente revisión legal del texto de privacidad

---

## Resumen ejecutivo

Biotiza tiene hoy un sitio Next.js 16.2.2 con formularios de contacto y cotización que son **mocks** (`console.log` + setTimeout), sin backend real. Sin headers de seguridad, sin analytics, sin cookie consent, y sin auditoría de accesibilidad. Este spec cubre una auditoría completa y la conversión de los formularios a un sistema funcional de producción.

Alcance concreto:

1. Conectar los 2 formularios a un backend real que envía emails vía SMTP de Google Workspace.
2. Añadir anti-spam de 2 capas (honeypot + Cloudflare Turnstile).
3. Implementar GA4 + Meta Pixel + TikTok Pixel vía Google Tag Manager, con Consent Mode v2.
4. Implementar un banner de consent de cookies con categorías, cumpliendo LFPDPPP (México) + CCPA/CPRA (California).
5. Endurecer headers de seguridad (CSP con nonce, HSTS, X-Frame-Options, etc.) y corregir el bug de JSON-LD en 2 páginas.
6. Ejecutar una auditoría WCAG 2.2 AA completa con fixes antes de merge.
7. Refactorizar las páginas legales duplicadas en una única página canónica.
8. Entregar 6 guías de creación de cuentas (Cloudflare, Workspace SMTP, GA4, GTM, Meta, TikTok) para que el usuario las ejecute él mismo.

Queda **fuera de scope** en este spec: rate-limit con Redis, Sentry, observability pagada, CAPI (Meta Conversions API server-side), internacionalización a inglés, auditoría con usuarios reales, revisión legal profunda del texto (se marca `/* REVISAR CON ABOGADO */` y queda como bloqueante externo).

---

## Decisiones tomadas (9 preguntas)

| # | Tema | Decisión |
|---|------|----------|
| 1 | Scope del audit | (b) Audit existente + conectar forms a backend real |
| 2 | Email provider | (c) SMTP Google Workspace → `ventas@biotiza.mx` |
| 3 | Flujo email | (b) Notificación interna + auto-reply al cliente |
| 4 | Anti-spam | (b) Honeypot + Cloudflare Turnstile |
| 5 | Analytics stack | (d) GA4 + Meta Pixel + TikTok Pixel |
| 6 | Mercado legal | (b) México + USA/Canadá → LFPDPPP + CCPA + CPRA |
| 7 | Cuentas ads | (b) No existen → spec incluye guías de alta |
| 8 | Accesibilidad | (a) WCAG 2.2 AA completo con fixes |
| 9 | Credenciales infra | (b) No existen → spec incluye guías de alta |

Enfoque elegido: **B** — API Routes + GTM + consent custom (vs A "Server-first" o C "Library-heavy").

---

## 1. Arquitectura & Estructura de archivos

### Diagrama de alto nivel

```
┌───────────────────────────────────────────────────────────────────┐
│                          CLIENT (Browser)                          │
│                                                                    │
│  ┌─────────────┐   ┌─────────────┐   ┌──────────────────────────┐ │
│  │ /contacto   │   │ /cotizacion │   │  Cookie Consent Banner   │ │
│  │  (RHF form) │   │  (RHF form) │   │  (LFPDPPP + CCPA)        │ │
│  └─────┬───────┘   └─────┬───────┘   └───────────┬──────────────┘ │
│        │ POST            │ POST                  │                 │
│        │ + Turnstile     │ + Turnstile           │ writes consent  │
│        │ + honeypot      │ + honeypot            │ to localStorage │
│        ▼                 ▼                       ▼                 │
└────────┼─────────────────┼───────────────────────┼─────────────────┘
         │                 │                       │
         │                 │                       ▼
         │                 │       ┌──────────────────────────┐
         │                 │       │  Google Tag Manager      │
         │                 │       │  (1 script, carga pixels │
         │                 │       │   según consent)         │
         │                 │       └──────┬───────────────────┘
         │                 │              │
         │                 │              ▼
         │                 │    ┌──────┬──────┬──────┐
         │                 │    │ GA4  │ Meta │ TikTok│
         │                 │    └──────┴──────┴──────┘
         ▼                 ▼
┌───────────────────────────────────────────────────────────────────┐
│                         SERVER (Next.js)                           │
│                                                                    │
│  ┌──────────────────────────┐  ┌──────────────────────────────┐  │
│  │ /api/contact/route.ts    │  │ /api/cotizacion/route.ts     │  │
│  │  1. Zod validate         │  │  1. Zod validate             │  │
│  │  2. Honeypot check       │  │  2. Honeypot check           │  │
│  │  3. Verify Turnstile     │  │  3. Verify Turnstile         │  │
│  │  4. Rate limit (IP)      │  │  4. Rate limit (IP)          │  │
│  │  5. Send 2 emails        │  │  5. Send 2 emails + cart     │  │
│  └──────────┬───────────────┘  └──────────┬───────────────────┘  │
│             │                              │                      │
│             └──────────────┬───────────────┘                      │
│                            ▼                                      │
│              ┌───────────────────────────┐                        │
│              │  lib/email.ts             │                        │
│              │  (nodemailer + SMTP)      │                        │
│              └──────────┬────────────────┘                        │
└─────────────────────────┼─────────────────────────────────────────┘
                          │
                          ▼ SMTP (TLS)
                ┌──────────────────────┐
                │ smtp.gmail.com:587   │
                │ Google Workspace     │
                │ ventas@biotiza.mx    │
                └──────────┬───────────┘
                           │
                           ├──► Notificación interna (inbox Biotiza)
                           └──► Auto-reply (inbox del cliente)
```

### Archivos nuevos

```
biotiza-web/
├── .env.example                              [NEW] Template con PENDIENTE
├── middleware.ts                             [NEW] Security headers + rate limit
├── docs/
│   └── superpowers/
│       ├── specs/
│       │   └── 2026-04-17-security-audit-design.md  [NEW — este spec]
│       └── guides/
│           ├── cloudflare-turnstile-setup.md        [NEW]
│           ├── google-workspace-smtp-setup.md       [NEW]
│           ├── gtm-setup.md                         [NEW]
│           ├── ga4-setup.md                         [NEW]
│           ├── meta-pixel-setup.md                  [NEW]
│           └── tiktok-pixel-setup.md                [NEW]
└── src/
    ├── app/
    │   ├── api/
    │   │   ├── contact/route.ts              [NEW]
    │   │   └── cotizacion/route.ts           [NEW]
    │   └── aviso-de-privacidad/page.tsx      [NEW] URL canónica, 13 secciones + TOC
    ├── components/
    │   ├── analytics/
    │   │   ├── GoogleTagManager.tsx          [NEW]
    │   │   └── ConsentMode.tsx               [NEW]
    │   ├── consent/
    │   │   ├── CookieBanner.tsx              [NEW]
    │   │   ├── CookiePreferences.tsx         [NEW]
    │   │   └── DoNotSellLink.tsx             [NEW]
    │   └── legal/
    │       ├── PrivacySection.tsx            [NEW]
    │       └── TableOfContents.tsx           [NEW]
    ├── data/
    │   └── privacy-content.ts                [NEW]
    ├── lib/
    │   ├── email.ts                          [NEW]
    │   ├── turnstile.ts                      [NEW]
    │   ├── rate-limit.ts                     [NEW]
    │   ├── consent.ts                        [NEW]
    │   ├── escape-json-ld.ts                 [NEW]
    │   └── schemas.ts                        [NEW]
    └── types/
        └── consent.ts                        [NEW]
```

### Archivos modificados

```
biotiza-web/
├── next.config.ts                            [MODIFY] + security headers + redirects
├── package.json                              [MODIFY] + nodemailer, vitest, playwright
├── eslint.config.mjs                         [MODIFY] + jsx-a11y strict rules
└── src/
    ├── app/
    │   ├── layout.tsx                        [MODIFY] + GTM + Consent + escape JSON-LD
    │   ├── contacto/page.tsx                 [MODIFY] onSubmit → POST real + Turnstile
    │   ├── cotizacion/page.tsx               [MODIFY] onSubmit → POST real + Turnstile
    │   └── soluciones/[linea]/[slug]/
    │       └── page.tsx                      [MODIFY] + escape JSON-LD
    └── components/
        └── layout/
            └── Footer.tsx                    [MODIFY] + Do Not Sell + Preferencias
```

### Archivos eliminados

```
biotiza-web/src/app/politica-privacidad/page.tsx  [DELETE] Duplicado (redirect 301 → /aviso-de-privacidad)
biotiza-web/src/app/privacidad/page.tsx           [DELETE] Duplicado (redirect 301 → /aviso-de-privacidad)
```

### Resumen numérico

- **27 archivos nuevos** (2 API routes, 7 componentes, 6 libs, 1 data, 1 types, 1 middleware, 1 env, 1 página nueva `aviso-de-privacidad/page.tsx`, 7 docs incluyendo este spec).
- **8 archivos modificados** (3 config: next/package/eslint + 4 app pages + 1 footer — `privacidad/page.tsx` ya no cuenta porque se elimina).
- **2 archivos eliminados** (`privacidad/page.tsx` y `politica-privacidad/page.tsx` — ambos se convierten en redirects 301 vía `next.config.ts`).
- **~2,400 LOC estimadas** incluyendo tests.

---

## 2. Backend de formularios

### Contrato API

Ambas rutas siguen el mismo shape de respuesta. El frontend maneja un solo patrón de éxito/error.

```
POST /api/contact
POST /api/cotizacion

Request body (JSON):
{
  ...campos del formulario (validados con Zod),
  _gotcha: string,              // honeypot — debe estar vacío
  turnstileToken: string,       // token del widget Cloudflare
}

Response 200 (OK):        { success: true, id: "uuid-v4" }
Response 400 (Inválido):  { success: false, error: "VALIDATION_ERROR" | "SPAM_DETECTED" | "TURNSTILE_FAILED" }
Response 429 (Rate):      { success: false, error: "RATE_LIMITED", retryAfter: 60 }
Response 500 (Interno):   { success: false, error: "INTERNAL_ERROR" }
```

### Pipeline de validación (orden estricto)

```typescript
// app/api/contact/route.ts (pseudocódigo)
export async function POST(req: Request) {
  // 1️⃣ Parse + validar con Zod
  const body = contactSchema.safeParse(await req.json())
  if (!body.success) return json({ error: 'VALIDATION_ERROR' }, 400)

  // 2️⃣ Honeypot: si _gotcha tiene texto, es bot → descarta silenciosamente (200 OK)
  if (body.data._gotcha) return json({ success: true, id: 'drop' }, 200)

  // 3️⃣ Rate limit por IP (máx 5 reqs / 10 min)
  const ip = headers().get('x-forwarded-for') ?? 'unknown'
  if (!(await rateLimit(ip))) return json({ error: 'RATE_LIMITED' }, 429)

  // 4️⃣ Verificar Turnstile (server-side, obligatorio)
  if (!(await verifyTurnstile(body.data.turnstileToken, ip))) {
    return json({ error: 'TURNSTILE_FAILED' }, 400)
  }

  // 5️⃣ Enviar 2 emails en paralelo (fallar rápido)
  const id = crypto.randomUUID()
  try {
    await Promise.all([
      sendInternalNotification(body.data, id),
      sendCustomerAutoReply(body.data, id),
    ])
  } catch (err) {
    console.error('[contact]', err)
    return json({ error: 'INTERNAL_ERROR' }, 500)
  }

  return json({ success: true, id }, 200)
}
```

**Decisión honeypot**: responder 200 OK cuando detecta bot. Si respondemos 400, los bots aprenden y cambian estrategia. Con 200 se van felices creyendo que enviaron.

### Rate limiting — LRU en memoria (no Redis)

```typescript
// lib/rate-limit.ts
// LRU cache en memoria (proceso Next.js) — 5 requests / 10 min por IP
// Después reinicia con el cold start de la función serverless
```

**Trade-off**: gratis y simple. Si Vercel escala a 2 contenedores, cada uno tiene su propio contador → efectivamente ~10 req/10min por IP. Aceptable para B2B con tráfico bajo. Upgrade a `@upstash/ratelimit` ($0.20/mes) es spec separado si hace falta.

### Schemas Zod

```typescript
// lib/schemas.ts
export const contactSchema = z.object({
  nombre: z.string().min(2).max(80),
  email: z.string().email().max(120),
  telefono: z.string().regex(/^[\d\s\-\+\(\)]{10,20}$/),
  cultivo: z.string().max(100).optional(),
  mensaje: z.string().min(10).max(2000),
  privacyAccepted: z.literal(true),
  _gotcha: z.string().max(0),
  turnstileToken: z.string().min(10),
})

export const cotizacionSchema = contactSchema.extend({
  items: z.array(z.object({
    productId: z.string(),
    cantidad: z.number().int().positive(),
  })).min(1).max(50),
  hectareas: z.number().positive().optional(),
  entrega: z.enum(['ordinaria', 'express']),
})
```

### Templates de email

Cada envío produce **2 emails** desde `ventas@biotiza.mx`:

**1. Notificación interna** (`ventas@biotiza.mx` → `ventas@biotiza.mx`)
- Subject: `[Nuevo contacto] {nombre} — {cultivo ?? "sin cultivo"}`
- Reply-To: email del cliente (click "Responder" → va directo al cliente)
- Body: HTML tabla con todos los campos + link WhatsApp con teléfono pre-formateado

**2. Auto-reply al cliente** (`ventas@biotiza.mx` → `{email del cliente}`)
- Subject: `Recibimos tu mensaje — Biotiza`
- Reply-To: `ventas@biotiza.mx`
- Body: HTML con logo, mensaje "te contactamos en 24h hábiles", links a `/soluciones`, `/herramientas`, Instagram. Footer con dirección física (requerido por CAN-SPAM US).

Para `/cotizacion`, ambos emails incluyen tabla con items del carrito + total estimado.

### Error handling

- Nunca exponer mensaje de error interno al cliente (`err.message` se loggea server-side, no viaja al browser).
- Logs con prefijo `[contact]` / `[cotizacion]` — Vercel los captura en Runtime Logs.
- Fallos SMTP: retry automático de nodemailer (1 reintento después de 2s). Si falla los 2, responde 500 y el usuario ve "Algo salió mal, escríbenos a ventas@biotiza.mx o por WhatsApp".

### Cambios frontend

```typescript
// ANTES (mock)
const onSubmit = async (data) => {
  console.log(data)
  await new Promise(r => setTimeout(r, 1000))
  setSuccess(true)
}

// DESPUÉS (real)
const onSubmit = async (data) => {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, turnstileToken, _gotcha: honeypot }),
  })
  if (res.ok) {
    setSuccess(true)
    window.dataLayer?.push({ event: 'form_submit', form: 'contacto' })
  } else {
    const { error } = await res.json()
    setError(mapErrorToMessage(error))
  }
}
```

Se añade al JSX el widget `<Turnstile />` + input hidden `name="_gotcha"`.

---

## 3. Analytics + Consent (GTM + banner LFPDPPP/CCPA)

### Estrategia: modelo más estricto globalmente

México (LFPDPPP) exige opt-in informado. California (CPRA) permite opt-out pero exige link "Do Not Sell". Solución: **opt-in por default para todos los visitantes**. Californianos adicionalmente ven el link "Do Not Sell My Personal Information" permanente en el footer.

### Flujo UX del banner

```
Primera visita del usuario
        │
        ▼
┌─────────────────────────────────────────────────────────┐
│ [Banner bottom sheet — 80% width, no bloquea contenido] │
│  🍪 Usamos cookies para mejorar tu experiencia          │
│  Necesitamos tu permiso para activar analíticas y       │
│  píxeles publicitarios.                                 │
│  [Aceptar todas] [Rechazar todas] [Configurar]          │
│  [Política de privacidad]                                │
└─────────────────────────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
   "Aceptar"     "Configurar"    "Rechazar"
        │              │              │
        │              ▼              │
        │    ┌──────────────────┐    │
        │    │ Modal 3 switches │    │
        │    │ ✅ Necesarias     │    │
        │    │    (siempre ON)  │    │
        │    │ ⬜ Analíticas     │    │
        │    │ ⬜ Marketing      │    │
        │    └────────┬─────────┘    │
        │             │              │
        ▼             ▼              ▼
   Persistir en localStorage + cookie
        │
        ▼
   Push consent_update a dataLayer
        │
        ▼
   GTM re-evalúa tags
```

El banner **no bloquea contenido** (soft block). Es mejor UX, cumple LFPDPPP mientras no trackeemos antes del consent, y CCPA explícitamente prohíbe dark patterns.

### Categorías de cookies

```typescript
type ConsentCategory = 'necessary' | 'analytics' | 'marketing'

type ConsentState = {
  necessary: true          // siempre true, no toggle
  analytics: boolean       // GA4
  marketing: boolean       // Meta Pixel + TikTok Pixel
  timestamp: number
  version: 1
}
```

| Categoría | Cookies | Tags GTM |
|---|---|---|
| Necesarias | `biotiza_consent`, cookies de sesión del carrito | (ninguno) |
| Analíticas | `_ga`, `_ga_*` | GA4 Configuration + Events |
| Marketing | `_fbp`, `_fbc`, `_ttp`, `ttclid` | Meta Pixel + TikTok Pixel |

### Consent Mode v2 — señales a Google

```typescript
// Default: todo denegado (se inyecta ANTES del script de GTM en <head>)
gtag('consent', 'default', {
  ad_storage:              'denied',
  ad_user_data:            'denied',
  ad_personalization:      'denied',
  analytics_storage:       'denied',
  functionality_storage:   'granted',
  personalization_storage: 'denied',
  security_storage:        'granted',
  wait_for_update:         500,
})

// Cuando el usuario decide, desde CookieBanner.tsx:
gtag('consent', 'update', {
  ad_storage:         consent.marketing ? 'granted' : 'denied',
  ad_user_data:       consent.marketing ? 'granted' : 'denied',
  ad_personalization: consent.marketing ? 'granted' : 'denied',
  analytics_storage:  consent.analytics ? 'granted' : 'denied',
})
```

Sin Consent Mode v2, GA4 pierde ~30% de conversiones (no puede modelar usuarios rechazantes). Con él, conversion modeling usa señales anónimas.

### Do Not Sell / Share My Personal Information (CCPA)

Mostramos el link en el footer **a todos los visitantes** (overengineering geo-IP es peor que ser inclusivo).

```typescript
// components/consent/DoNotSellLink.tsx
<a href="/aviso-de-privacidad#do-not-sell">
  Do Not Sell or Share My Personal Information
</a>
```

Click → abre modal de categorías con `marketing: false` preseleccionado. Idéntico a deshabilitar "Marketing" — CPRA acepta este patrón siempre que el link sea tan visible como otros del footer.

### GTM container — estructura

El container (que el usuario crea después del alta) tendrá:

```
Container: GTM-XXXXXXX
├─ Tags
│  ├─ GA4 Configuration (activa si analytics_storage = granted)
│  ├─ GA4 Event — form_submit (trigger: dataLayer event)
│  ├─ GA4 Event — add_to_quote
│  ├─ Meta Pixel Base (activa si ad_storage = granted)
│  ├─ Meta Pixel PageView
│  ├─ Meta Pixel Lead (form submit)
│  ├─ TikTok Pixel Base (activa si ad_storage = granted)
│  └─ TikTok Pixel SubmitForm
├─ Triggers
│  ├─ All Pages
│  ├─ Custom Event: form_submit
│  └─ Custom Event: add_to_quote
└─ Variables
   └─ DLV — form_name (dataLayer variable)
```

Los tags **no se hardcodean en código**. Se configuran en gtm.google.com. Añadir un nuevo pixel mañana (LinkedIn, Pinterest) = sin deploy, sin PR — solo GTM.

### Storage + detección repetida

```typescript
// lib/consent.ts
const CONSENT_KEY = 'biotiza_consent'
const CONSENT_VERSION = 1

export function getConsent(): ConsentState | null { /* ... */ }

export function setConsent(state: Partial<ConsentState>) {
  const full = { ...state, necessary: true, timestamp: Date.now(), version: CONSENT_VERSION }
  localStorage.setItem(CONSENT_KEY, JSON.stringify(full))
  document.cookie = `${CONSENT_KEY}=${encodeURIComponent(JSON.stringify(full))}; path=/; max-age=31536000; SameSite=Lax`
  window.dataLayer?.push({ event: 'consent_update', consent: full })
}

export function useConsent() { /* hook con openPreferences() */ }
```

Footer link "Preferencias de cookies" reabre modal — requerido por LFPDPPP (derecho a revocar tan fácil como se otorgó).

### Qué carga antes del consent

**SÍ**: HTML/CSS/JS de la UI, Consent Mode v2 default, el contenedor GTM (pero sus tags de marketing no disparan hasta consent), fonts self-hosted.

**NO**: GA4, Meta Pixel, TikTok Pixel.

---

## 4. Security Hardening

### Inventario de vulnerabilidades detectadas

| # | Vulnerabilidad | Severidad | Archivos |
|---|---|---|---|
| 1 | Sin headers de seguridad (CSP, HSTS, X-Frame, etc.) | Alta | `next.config.ts` (vacío) |
| 2 | JSON-LD sin escape de `</script>` | Media | `src/app/layout.tsx:39`, `src/app/soluciones/[linea]/[slug]/page.tsx:77` |
| 3 | Formularios sin backend → datos en console | N/A (fix ya cubierto sección 2) | |
| 4 | `lucide-react ^1.7.0` — versión sospechosamente vieja (lib real va en v0.4xx) | Alta (investigar) | `package.json` |
| 5 | Cero `npm audit` en pipeline | Media-Alta | Pipeline |

### Fix 1 — Security headers estáticos (`next.config.ts`)

```typescript
const nextConfig: NextConfig = {
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload' },
        { key: 'X-Content-Type-Options',    value: 'nosniff' },
        { key: 'X-Frame-Options',           value: 'DENY' },
        { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=(self), payment=()' },
        { key: 'X-DNS-Prefetch-Control',    value: 'on' },
      ],
    }]
  },
}
```

**Aviso HSTS con `preload`**: irreversible por ~2 años una vez enviado. Como Biotiza está en Vercel (HTTPS obligatorio), es seguro — pero se deja documentado.

### Fix 2 — CSP dinámica con nonce (`middleware.ts`)

```typescript
import { NextResponse } from 'next/server'

export function middleware(request: Request) {
  const nonce = crypto.randomUUID().replace(/-/g, '')

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic'
      https://www.googletagmanager.com
      https://www.google-analytics.com
      https://connect.facebook.net
      https://analytics.tiktok.com
      https://challenges.cloudflare.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: blob: https:;
    font-src 'self' data:;
    connect-src 'self'
      https://www.google-analytics.com
      https://analytics.google.com
      https://region1.google-analytics.com
      https://www.facebook.com
      https://analytics.tiktok.com
      https://challenges.cloudflare.com;
    frame-src 'self' https://challenges.cloudflare.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim()

  const response = NextResponse.next({
    request: { headers: new Headers(request.headers) },
  })
  response.headers.set('Content-Security-Policy', cspHeader)
  response.headers.set('x-nonce', nonce)
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
}
```

`'strict-dynamic'` permite que un script con nonce cargue dinámicamente otros sin listar cada dominio (necesario para GTM). `style-src 'unsafe-inline'` es forzado por Framer Motion + Next.js inline styles — la alternativa rompería Framer Motion.

### Fix 3 — JSON-LD escape

```typescript
// lib/escape-json-ld.ts
export function escapeJsonLd(obj: unknown): string {
  return JSON.stringify(obj)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/'/g, '\\u0027')
}
```

Aplica en `src/app/layout.tsx:39` y `src/app/soluciones/[linea]/[slug]/page.tsx:77`.

### Fix 4 — Auditar `lucide-react ^1.7.0`

Sospecha: la librería real va por v0.4xx (2026). Puede ser: v1 legítima, alias a fork propio, o typosquat.

**Plan**:
```bash
npm view lucide-react versions --json | tail -5
npm view lucide-react repository
# Si OK → dejar. Si no → reemplazar + re-verificar imports.
```

Check se ejecuta en fase de implementación con subagent (Bash roto en este entorno).

### Fix 5 — Pipeline `npm audit`

```json
{
  "scripts": {
    "audit": "npm audit --audit-level=moderate",
    "audit:fix": "npm audit fix --audit-level=moderate",
    "deps:check": "npx npm-check-updates"
  }
}
```

**Política mensual** (documentada en spec):
1. `npm audit` — si vulns ≥moderate, fix o levantar issue.
2. `npm outdated` — revisar majors importantes.
3. Revisar `next`, `react`, `framer-motion`, `nodemailer`, `zod` específicamente.

### Higiene general

- `git grep` por patterns de secrets (`AKIA`, `sk_live_`, `SG.`) + `.env` en `.gitignore`.
- Confirmar: ninguna key privada con prefijo `NEXT_PUBLIC_`.
- CORS: Next.js default `same-origin`, confirmar sin overrides.
- SSRF: ningún endpoint toma URLs del usuario para fetch server-side. Inventario: ninguno.
- Path traversal: rutas dinámicas usan `generateStaticParams` → combinaciones válidas solo.
- ReDoS: regex `/^[\d\s\-\+\(\)]{10,20}$/` es lineal, seguro.

### Matriz final de headers (target: securityheaders.com A+)

| Header | Valor |
|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `Content-Security-Policy` | (dinámica con nonce, ver arriba) |
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | restrictivo |
| `X-XSS-Protection` | *NO se añade — deprecated, puede introducir bugs* |

---

## 5. Accesibilidad WCAG 2.2 AA

### Tooling — 3 capas

**Capa 1 — Lint estático (cada save)**

```json
// eslint.config.mjs
{
  plugins: { 'jsx-a11y': jsxA11y },
  rules: {
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-is-valid': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-role': 'error',
    'jsx-a11y/click-events-have-key-events': 'error',
    'jsx-a11y/heading-has-content': 'error',
    'jsx-a11y/label-has-associated-control': 'error',
    'jsx-a11y/no-autofocus': 'error',
    'jsx-a11y/no-noninteractive-element-interactions': 'warn',
    'jsx-a11y/role-has-required-aria-props': 'error',
    // ~20 reglas más (preset strict)
  },
}
```

**Capa 2 — Runtime automático (axe-core en dev)**

```tsx
// src/app/layout.tsx (solo en dev)
if (process.env.NODE_ENV === 'development') {
  import('@axe-core/react').then(({ default: axe }) => {
    axe(React, ReactDOM, 1000)
  })
}
```

**Capa 3 — CI (Lighthouse)**

```bash
npx @lhci/cli autorun --collect.url=https://biotiza-preview.vercel.app
```

Target: Lighthouse **Accessibility ≥ 95/100** en todas las páginas.

### Auditoría manual — checklist por página

Páginas a auditar: `/`, `/nosotros`, `/soluciones`, `/soluciones/[linea]`, `/soluciones/[linea]/[slug]`, `/cultivos/[cultivo]`, `/marcas`, `/marcas/[slug]`, `/contacto`, `/cotizacion`, `/aviso-de-privacidad`.

```
Checklist WCAG 2.2 AA — Página: __________

Estructura
  ⬜ Un solo <h1> por página
  ⬜ Jerarquía h1 → h2 → h3 sin saltos
  ⬜ <main>, <nav>, <footer> correctos
  ⬜ Skip link "Saltar al contenido" visible al tab

Navegación por teclado
  ⬜ Tab pasa por todos los interactivos
  ⬜ Orden lógico
  ⬜ Focus ring visible (nunca outline:none sin reemplazo)
  ⬜ Enter/Space activan botones
  ⬜ Escape cierra modales
  ⬜ Ningún keyboard trap

Contraste (Chrome DevTools)
  ⬜ Texto normal ≥ 4.5:1
  ⬜ Texto ≥18px o negrita ≥ 3:1
  ⬜ Iconos informativos ≥ 3:1
  ⬜ Focus ring ≥ 3:1

Imágenes & media
  ⬜ <img> informativas con alt descriptivo
  ⬜ Decorativas con alt=""
  ⬜ Iconos Lucide con aria-label si interactivos

Formularios
  ⬜ Cada input con <label> asociado (htmlFor=id)
  ⬜ Errores con aria-live="polite"
  ⬜ Required con aria-required
  ⬜ Errores cercanos al campo + color + texto

ARIA
  ⬜ ARIA solo cuando HTML semántico no basta
  ⬜ aria-label en botones-icono
  ⬜ aria-expanded en acordeones/menús
  ⬜ aria-current="page" en nav activa

Screen reader (NVDA Windows / VoiceOver Mac)
  ⬜ Navegación por heading (h) tiene sentido
  ⬜ Enlaces fuera de contexto entendibles
  ⬜ Formularios sin confusión

Motion
  ⬜ prefers-reduced-motion respetado en Framer Motion
  ⬜ Sin contenido que parpadee >3 veces/segundo
```

### Fixes probables (basado en revisión preliminar)

| # | Prob | Issue | Fix |
|---|---|---|---|
| 1 | Alta | `text-gris-500` sobre `bg-white` probablemente ≤4.5:1 | Subir a `text-gris-600` en párrafos |
| 2 | Alta | Framer Motion sin `prefers-reduced-motion` | `useReducedMotion()` hook en animaciones |
| 3 | Media | Skip link inexistente | `<a href="#main">Saltar al contenido</a>` en layout |
| 4 | Media | Focus ring default eliminado sin reemplazo | `focus-visible:ring-2 focus-visible:ring-verde-500` |
| 5 | Media | Modal cotización sin `role="dialog"` + focus trap | `aria-modal="true"`, focus trap manual |
| 6 | Baja | `<Link>` con solo icono sin `aria-label` | Caso por caso |
| 7 | Baja | Mega-menú dropdown sin teclado | Flechas arriba/abajo, Escape |
| 8 | Baja | `<img>` sin `alt` en hero banners | Añadir descripción o `alt=""` |
| 9 | Baja | Errores form solo por color | Icono ⚠ + texto "Requerido" |

### WCAG 2.2 criterios nuevos (desde 2.1)

- **2.4.11 Focus Not Obscured (Minimum)** — focus no puede quedar oculto detrás del header sticky. Revisar mega-menú.
- **2.5.8 Target Size (Minimum)** — targets clicables ≥24×24 px. Revisar botones-icono pequeños.
- **3.3.7 Redundant Entry** — no re-pedir info ya ingresada. Revisar flow cotización.

No aplican: 2.5.7 (sin drag), 3.3.8 (sin login).

### Entregables

1. **Reporte** `docs/a11y-audit-2026-04.md` con issues por página + severidad + estimación.
2. **Fixes**: issues Alta y Media resueltos antes de merge. Baja pueden quedar follow-up si son >30 min c/u.
3. **Scripts**: `lint:a11y`, `test:lighthouse` en `package.json`.
4. **Baseline**: Lighthouse Accessibility ≥95 en ≥8 de 11 páginas clave.

### Fuera de scope

- Auditoría con usuarios reales con discapacidad (~$3K USD, third-party).
- Traducción a inglés (spec separado).
- AAA.
- Auditoría de PDFs (si existen, nota en reporte pero fix aparte).

---

## 6. Privacidad & Legal

### Situación actual

- 2 páginas redundantes: `/privacidad` y `/politica-privacidad`.
- Sin Terms of Service.
- Sin Cookie Policy separada.
- Sin notificación Consent Mode ni Do Not Sell.

### Decisión estructural

**URL canónica**: `/aviso-de-privacidad` (matching existing live URL en `biotiza.mx/aviso-de-privacidad`, preserva SEO). Todas las anclas internas (`#cookies`, `#do-not-sell`, `#derechos-arco`, etc.) cuelgan de esa ruta. Las 2 rutas redundantes actuales (`/privacidad` y `/politica-privacidad`) se convierten en redirects 301.

```typescript
// next.config.ts
async redirects() {
  return [
    { source: '/privacidad', destination: '/aviso-de-privacidad', permanent: true },
    { source: '/privacidad/:path*', destination: '/aviso-de-privacidad', permanent: true },
    { source: '/politica-privacidad', destination: '/aviso-de-privacidad', permanent: true },
    { source: '/politica-privacidad/:path*', destination: '/aviso-de-privacidad', permanent: true },
  ]
}
```

**Archivos afectados por el cambio de URL**:
- `src/app/aviso-de-privacidad/page.tsx` [NEW] — la canónica, ya reflejada en Archivos nuevos.
- `src/app/privacidad/page.tsx` [DELETE] — ya reflejada en Archivos eliminados.
- `src/app/politica-privacidad/page.tsx` [DELETE] — ya reflejada en Archivos eliminados.

### Estructura de `/aviso-de-privacidad`

13 secciones con anclas `#`:

1. Identidad del responsable (LFPDPPP Art. 16 I)
2. Datos personales recabados
3. Finalidades del tratamiento (primarias vs secundarias)
4. Transferencias a terceros (Google, Meta, TikTok, Cloudflare, Workspace, Vercel)
5. Cookies y tecnologías similares (`#cookies`)
6. Derechos ARCO (`#derechos-arco`) — usuarios México
7. California Privacy Rights (`#ccpa`)
8. Do Not Sell (`#do-not-sell`) con botón opt-out
9. Menores de edad
10. Retención de datos (contactos 24m, clientes +10 años SAT, GA4 14m, Meta/TikTok 13m)
11. Medidas de seguridad
12. Cambios al aviso (30 días de notificación)
13. Contacto del encargado — `privacidad@biotiza.mx` + fecha última actualización

### Texto existente vs nuevo (importante: hay contenido lícito que reusamos)

**El sitio ya tiene** `biotiza.mx/aviso-de-privacidad` redactado por abogado (2024). Cubre LFPDPPP completo con citas textuales a artículos 7, 8, 10, 11, 12, 15 y 16 de la ley. Domicilio legal: **Biotiza S.A. de C.V. — Culiacán, Sinaloa** (no Zapopan como dice `CLAUDE.md`; Zapopan es oficina operativa).

**Usamos textualmente el contenido existente** para las siguientes secciones de la estructura refactorizada:
- Sección 1 — Identidad del responsable (Culiacán, Sinaloa + oficinas Zapopan y Ciudad Guzmán).
- Sección 2 — Finalidades (5 subsecciones que ya redactó el abogado: expediente, autoridades, legal, contratos, publicidad).
- Sección 6 — Derechos ARCO → `ventas@biotiza.mx` (el existente).
- Sección 12 — Cambios al aviso (notificación por web + correo).
- Sección 13 — Contacto del responsable.

**Contenido NUEVO que hay que redactar** (no está en el aviso actual):
- Sección 3 — separación explícita de finalidades primarias vs secundarias (el aviso existente las mezcla).
- Sección 4 — **transferencias a terceros** (Google, Meta, TikTok, Cloudflare, Workspace, Vercel). El aviso actual dice "no se realizarán transferencias" — esto es **contradictorio** con lo que haremos al instalar pixels. Requiere actualizarse.
- Sección 5 — **Cookies y tecnologías similares** (no existe hoy).
- Sección 7 — **California Privacy Rights** (no existe hoy).
- Sección 8 — **Do Not Sell or Share** (no existe hoy).
- Sección 10 — Retención de datos granular (el aviso actual no detalla periodos).
- Sección 11 — Medidas de seguridad técnicas (ampliación).

**Decisión clave sobre el contenido nuevo** (⚠️ **bloqueador lógico para PR 6**):

El abogado que redactó el texto actual declaró "no se realizarán transferencias de datos personales". Instalar GTM + GA4 + Meta + TikTok **viola esa declaración** — es transferencia a terceros en USA. Tres opciones:

- **(a) Pedir al mismo abogado** que extienda el aviso con las nuevas secciones. Costo estimado: $3K–8K MXN. Tiempo: 1–3 semanas. ✅ Más seguro legalmente.
- **(b) Usar plantilla de Termly/iubenda** para las secciones nuevas (CCPA, cookies, terceros) y conectarla al texto LFPDPPP existente. Costo: $10–40 USD/mes. Tiempo: hoy. ⚠️ Template genérico, no garantiza coherencia con la estructura particular de Biotiza.
- **(c) Escribir yo el contenido base** + marcarlo `/* REVISIÓN PENDIENTE */` y publicar sólo si el abogado lo valida después. ⚠️ Riesgo: si se publica antes de validar y hay inconsistencias, compromiso legal real.

**Default en el plan**: opción **(a)**. El PR 6 incluye la preparación técnica (estructura, componentes, redirects, TOC, banner flow) y deja el texto de las nuevas secciones como marcadores `[PENDIENTE REDACCIÓN LEGAL — sección X]`. El merge a producción del PR 6 espera al texto del abogado. Los demás PRs (1–5 y 7) no se bloquean.

Usuario puede sobreescribir ese default a (b) o (c) cuando el plan esté generado.

### Implementación técnica

```
src/app/aviso-de-privacidad/page.tsx   [NEW]    Consume data/privacy-content.ts
src/data/privacy-content.ts   [NEW]    Contenido estructurado con ids
src/components/legal/
  PrivacySection.tsx          [NEW]    Render de cada sección
  TableOfContents.tsx         [NEW]    Nav lateral sticky con anclas
```

Estructurado (no MDX libre) para linkear directo a `#cookies`, `#do-not-sell` sin cargar la página entera.

### SEO

- `/aviso-de-privacidad` con canonical self.
- Sitemap incluye solo `/aviso-de-privacidad`.
- Sin hreflang (monolingüe español).

### Footer

```tsx
<div className="flex gap-4 text-xs">
  <Link href="/aviso-de-privacidad">Aviso de Privacidad</Link>
  <Link href="/aviso-de-privacidad#cookies">Cookies</Link>
  <button onClick={openPreferences}>Preferencias de Cookies</button>
  <Link href="/aviso-de-privacidad#do-not-sell">
    Do Not Sell or Share My Personal Information
  </Link>
</div>
```

Cumple 4 requisitos mínimos: privacy link (LFPDPPP+CCPA), cookies link (CCPA), control preferencias (LFPDPPP), Do Not Sell (CPRA).

---

## 7. Setup Guides (6 cuentas)

### Por qué

Regla de seguridad: **no puedo crear cuentas en tu nombre**. Entrego guías paso a paso para que el usuario ejecute las altas en 5–15 min cada una.

### Orden de creación

```
1. Cloudflare Turnstile    (~10 min, gratis) → 2 keys
2. Google Workspace SMTP   (~5 min, usando Workspace existente) → 1 password
3. Google Analytics 4      (~10 min, gratis) → MEASUREMENT_ID
   ▼
4. Google Tag Manager      (~15 min, gratis) → GTM_ID (usa GA4 adentro)
   ▼
5. Meta Business + Pixel   (~15 min, gratis) → META_PIXEL_ID
6. TikTok Ads + Pixel      (~10 min, gratis) → TIKTOK_PIXEL_ID
```

Dependencias reales: GTM necesita GA4 antes. Meta + TikTok independientes. Cloudflare + Workspace también independientes.

Total ~60 min en una sentada.

### Cada guía entrega

**1. `cloudflare-turnstile-setup.md`** → `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`
**2. `google-workspace-smtp-setup.md`** → `SMTP_PASS` (App Password Google, 16 chars, requiere 2FA)
**3. `ga4-setup.md`** → `NEXT_PUBLIC_GA4_MEASUREMENT_ID` (`G-XXXXXXXXXX`)
**4. `gtm-setup.md`** → `NEXT_PUBLIC_GTM_ID` (`GTM-XXXXXXX`) + permiso editor para mi email
**5. `meta-pixel-setup.md`** → `NEXT_PUBLIC_META_PIXEL_ID` (15–16 dígitos)
**6. `tiktok-pixel-setup.md`** → `NEXT_PUBLIC_TIKTOK_PIXEL_ID` (`CXXXXXXXXXXXXXXXX`)

Decisiones recomendadas en las guías:
- GA4: habilitar Enhanced measurement, **deshabilitar** Google signals por default.
- Meta: sin CAPI por ahora (follow-up si >$5K/mes en ads).
- TikTok: habilitar advanced matching (hash email).

### Almacenamiento

- **Nunca en el repo**: `.env.local` va en `.gitignore`.
- **Producción Vercel**: dashboard → Settings → Environment Variables.
- **Preview**: misma interfaz, scope "Preview".

### `.env.example` template

```bash
# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=PENDIENTE
TURNSTILE_SECRET_KEY=PENDIENTE

# Google Workspace SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=ventas@biotiza.mx
SMTP_PASS=PENDIENTE

# Google Analytics 4
NEXT_PUBLIC_GA4_MEASUREMENT_ID=PENDIENTE

# Google Tag Manager
NEXT_PUBLIC_GTM_ID=PENDIENTE

# Meta Pixel
NEXT_PUBLIC_META_PIXEL_ID=PENDIENTE

# TikTok Pixel
NEXT_PUBLIC_TIKTOK_PIXEL_ID=PENDIENTE

# Deploy config
NEXT_PUBLIC_SITE_URL=https://biotiza.mx
```

Regla: todo con `NEXT_PUBLIC_` viaja al browser. Turnstile secret y SMTP password son server-only (sin prefijo).

### Entregable final

8 valores que usuario pega en Vercel + `.env.local`. SMTP_HOST/USER/PORT son conocidos sin necesidad.

---

## 8. Testing + Rollout

### Estrategia de testing

4 capas. No voy a 100% cobertura — costo excede beneficio para catálogo.

```
┌─────────────────────────────┐
│  4. Manual QA               │  ← 90%, humano
│     Smoke + a11y            │
├─────────────────────────────┤
│  3. E2E (Playwright)        │  ← 2 tests
│     Form submit happy       │
├─────────────────────────────┤
│  2. Integration (Vitest)    │  ← API routes
├─────────────────────────────┤
│  1. Unit (Vitest)           │  ← Funciones puras
│     schemas, rate-limit,    │
│     escape-json-ld, consent │
└─────────────────────────────┘
```

### Capa 1 — Unit (Vitest)

| Módulo | Tests | Por qué |
|---|---|---|
| `lib/schemas.ts` | Zod válido/inválido | Bug de schema se replica por submit |
| `lib/escape-json-ld.ts` | `</script>`, Unicode, anidado | Bug XSS crítico |
| `lib/rate-limit.ts` | Límite/expiración/IPs distintas | Off-by-one = DoS o bypass |
| `lib/consent.ts` | localStorage, version mismatch | Violación LFPDPPP si rompe |
| `lib/turnstile.ts` | Mock fetch, tokens | Bots pasan si falla |

**NO se testean**: componentes React visuales, páginas Next.js, hooks triviales.

Target: **≥80% coverage en los 5 módulos**. Nada más.

### Capa 2 — Integration (API routes)

~12 tests entre las 2 routes. <5s total.

```typescript
describe('POST /api/contact', () => {
  it('returns 200 for valid input', async () => { /* ... */ })
  it('returns 400 for missing required field', async () => { /* ... */ })
  it('returns 400 for invalid turnstile token', async () => { /* ... */ })
  it('returns 200 but discards when honeypot is filled', async () => { /* ... */ })
  it('returns 429 after 5 requests from same IP', async () => { /* ... */ })
  it('returns 500 when SMTP fails', async () => { /* ... */ })
})
```

### Capa 3 — E2E (Playwright)

Solo 2 tests críticos:

```typescript
// e2e/contact-form.spec.ts
test('complete contact form submission', async ({ page }) => {
  await page.goto('/contacto')
  await page.fill('[name="nombre"]', 'Juan Pérez')
  // ... fill, check privacy, wait Turnstile (test sitekey), submit
  await expect(page.locator('[data-success]')).toBeVisible()
})

// e2e/cotizacion-form.spec.ts — mismo patrón con carrito
```

Turnstile en testing: Cloudflare ofrece **sitekeys especiales** (siempre pasan o siempre fallan), se usan en `.env.test`.

### Capa 4 — Manual QA (90% del valor)

Checklist completo en `docs/qa-checklist.md`. Secciones: Security, Formularios, Cookies & Consent, Analytics, Accesibilidad, Legal, Performance.

Tiempo estimado QA completo: **~2 horas por deploy a producción**.

### Orden de deploy estricto

```
0. [Bloqueador] Resolver situación git repo (no existe .git folder)

1. [Setup cuentas — Usuario] Ejecuta 6 guías → me pasa 8 valores

2. [PR 1 — Refactor puro, sin features]
   ├─ Crear /aviso-de-privacidad con estructura + TOC
   ├─ Convertir /privacidad y /politica-privacidad en redirects 301
   ├─ Fix JSON-LD escape (layout.tsx + [slug]/page.tsx)
   ├─ Auditoría lucide-react
   ├─ npm audit/test scripts
   └─ Deploy preview → verificar sitio igual

3. [PR 2 — Security headers]
   ├─ next.config.ts + middleware.ts CSP
   └─ QA con securityheaders.com

4. [PR 3 — Env vars Vercel — Usuario]
   └─ Pegar 8 valores en dashboard Vercel, scope "Preview"

5. [PR 4 — Forms backend]
   ├─ nodemailer, lib/email.ts, lib/turnstile.ts, lib/rate-limit.ts
   ├─ API routes, frontend updates, Turnstile widget
   ├─ Tests unit + integration
   └─ QA manual

6. [PR 5 — Consent + GTM]
   ├─ lib/consent.ts, componentes Banner/Preferences/DoNotSell
   ├─ GoogleTagManager.tsx + ConsentMode.tsx
   └─ QA manual consent

7. [PR 6 — Legal page]
   ├─ privacy-content.ts + crear /aviso-de-privacidad
   ├─ Footer con 4 links legales
   └─ ⚠️ Bloqueado hasta revisión abogado

8. [PR 7 — Accessibility fixes]
   ├─ jsx-a11y strict, axe-core dev, skip link, focus rings
   ├─ prefers-reduced-motion hook
   └─ Lighthouse ≥95

9. [Deploy PROD]
   ├─ Copiar env vars Preview → Production
   ├─ Merge PRs 1→7 a main
   └─ Monitoreo 48h
```

**Regla**: cada PR pasa por Preview antes de Production.

### Rollback

Vercel "Instant Rollback" a cualquier deploy anterior (1 click). No necesito feature flags.

**No se revierte**: env vars (manual), cambios GTM (history propio), emails ya enviados (nada).

### Monitoreo post-deploy 48h

| Métrica | Herramienta | Threshold | Acción |
|---|---|---|---|
| Form submit success | Vercel Logs | >95% | Investigar 5xx |
| Email delivery | Workspace outbound logs | >99% | Revisar App Password, SPF |
| CSP violations | Browser console (beta users) | <10/día | Ajustar CSP |
| GA4 realtime | analytics.google.com | ≥ tráfico normal | Verificar GTM |
| Core Web Vitals | PageSpeed | LCP<2.5, CLS<0.1 | Revisar scripts |
| Consent acceptance | GTM preview | 60–80% | Si <40%, banner rompe UX |

### Git — bloqueador crítico

**No existe `.git` folder en `C:\Users\elbig\OneDrive\Documentos\BIOTIZA\biotiza claude\`**. Sin git, ninguno de los 7 PRs puede existir.

**Opciones**:
- (A) Repo real en otra carpeta — usuario indica ruta.
- (B) Re-clonar `elbigpapa/biotiza-web` y trasladar cambios recientes (riesgo: perder cambios no sincronizados).
- (C) `git init` + commit inicial + push force a main (solo si remote vacío o usuario confirma sobrescribir).

**Esta decisión bloquea TODO el rollout**. Va al principio del plan de implementación.

### Timeline estimado

| Fase | Ejecutor | Tiempo |
|---|---|---|
| Setup cuentas (6 guías) | Usuario | ~1 hora |
| PR 1 — Refactor + fixes | Claude | ~2 horas |
| PR 2 — Security headers | Claude + QA | ~3 horas |
| PR 3 — Env vars Vercel | Usuario | ~15 min |
| PR 4 — Forms backend | Claude + QA | ~6 horas |
| PR 5 — Consent + GTM | Claude + QA | ~6 horas |
| PR 6 — Legal page | Claude | ~4 horas |
| PR 6b — Revisión abogado | Externo | ~3–5 días |
| PR 7 — Accessibility | Claude + QA | ~8 horas |
| Deploy prod + monitoreo | Claude + Usuario | ~4 horas |
| **Total (sin revisión legal)** | | **~35 horas + 48h observación** |

Calendario: sesiones de ~4 horas, ~2 semanas. Con bloqueo de abogado, ~3 semanas.

---

## Bloqueos y dependencias externas

1. **Git repo no disponible en la carpeta local** — bloqueante #1 para cualquier PR. Usuario indicó opción (A): señalará la ruta del repo real.
2. **Usuario debe crear 6 cuentas** antes de PR 4 (forms backend).
3. **Extensión legal del aviso de privacidad existente** — bloqueante #2 específicamente para **merge a producción del PR 6** (la infraestructura técnica avanza sin bloqueo). El aviso actual declara "no transferencias" — inconsistente con instalar pixels. Se requiere redacción profesional de secciones nuevas (CCPA, cookies, terceros).
4. **Decisión `lucide-react`** — si resulta typosquat, puede requerir reemplazo amplio de imports.

## Criterios de éxito

Al terminar la implementación completa:

- ✅ `securityheaders.com` grade **A o A+**.
- ✅ `observatory.mozilla.org` grade **≥ B+**.
- ✅ Lighthouse **Accessibility ≥95** en ≥8/11 páginas clave.
- ✅ Lighthouse **Performance ≥85** mobile.
- ✅ Formularios envían emails reales desde `ventas@biotiza.mx` con reply-to correcto.
- ✅ Auto-reply llega al cliente en <30s.
- ✅ Honeypot + Turnstile bloquean >99% de bots en test.
- ✅ GA4 + Meta + TikTok firing correctamente en GTM Preview Mode post-consent.
- ✅ Sin analytics cargando antes del consent (verificado en DevTools Network).
- ✅ Banner persiste decisión, reapertura funciona, "Do Not Sell" visible.
- ✅ `/aviso-de-privacidad` única, 13 secciones con anclas, redirects 301 desde `/privacidad` y `/politica-privacidad`.
- ✅ Cero secrets en repo (`git grep` limpio).
- ✅ `npm audit` sin vulns ≥moderate.

## Qué NO se entrega en este spec

- Redis rate limiting (spec separado si escala tráfico).
- Sentry o similar (spec separado).
- CAPI Meta (follow-up si >$5K/mes en Meta Ads).
- Internacionalización inglés (sub-proyecto separado).
- Chat widget / asistente IA (sub-proyecto E del roadmap original).
- Knowledge base por producto (sub-proyecto C/D del roadmap original).
- Ficha técnica / estudios científicos por producto (sub-proyecto D).
- Rediseño visual (sub-proyecto F).
- Dependabot / Renovate / Snyk (spec separado).

---

## Referencias

- WCAG 2.2 AA: https://www.w3.org/TR/WCAG22/
- LFPDPPP (México): Ley Federal de Protección de Datos Personales en Posesión de los Particulares
- CCPA/CPRA (California): https://oag.ca.gov/privacy/ccpa
- Google Consent Mode v2: https://developers.google.com/tag-platform/security/guides/consent
- Cloudflare Turnstile docs: https://developers.cloudflare.com/turnstile/
- Next.js Security Headers: https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
- securityheaders.com (scanner): https://securityheaders.com

## Decisiones abiertas (o resueltas en última iteración)

1. **Git repo** — Usuario eligió (A): me indica ruta correcta del repo cuando corresponda ejecutar PRs. Sigue siendo bloqueador hasta que se indique la ruta.
2. **URL canónica privacidad** — ✅ **RESUELTO**: `/aviso-de-privacidad` (matching URL existente en biotiza.mx).
3. **Texto legal para secciones nuevas (CCPA, cookies, terceros, Do Not Sell)** — ⏳ default en plan: opción (a) — pedir al abogado que extendió el texto actual. Usuario puede cambiar a (b) Termly/iubenda o (c) escribir primero + validar después.
4. **Email auto-reply** — Usuario aún no eligió explícitamente. Default en plan: `ventas@biotiza.mx` (consistente con el contacto ARCO existente).
5. **Inbox ARCO** — ✅ **RESUELTO implícitamente**: `ventas@biotiza.mx` (es lo que dice el aviso existente — cambiarlo rompería consistencia con el documento firmado por abogado).

---

*Fin del spec. Próximo paso: `writing-plans` para generar el plan de implementación ejecutable PR por PR.*
