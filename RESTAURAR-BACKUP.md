# 🗄️ Biotiza · Respaldo del sitio web — Guía de restauración

**Respaldo generado:** 22 de mayo de 2026
**Sitio en producción:** https://www.biotiza.mx
**Repositorio:** carpeta `biotiza-web/`

Este archivo explica cómo dejar el sitio **corriendo de nuevo** desde cero a
partir de este respaldo. Guárdalo junto con el ZIP.

---

## 1. Qué contiene este respaldo

✅ **Incluido (todo lo necesario para que el sitio corra):**
- `src/` — todo el código fuente (199 páginas, 4 APIs, componentes, datos)
- `public/` — imágenes de producto, logos, íconos, OG image, todos los assets
- `package.json` + `package-lock.json` — lista exacta de dependencias
- `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `tailwind.config.ts` — configuración
- `.env.example` — plantilla de variables de entorno
- `vercel.json`, `renovate.json`, `.vercel/` — config de despliegue y actualizaciones
- Documentación: `CLAUDE.md`, `DEPLOY.md`, `README.md`, `AGENTS.md`, `docs/`

❌ **NO incluido (a propósito — se regenera solo):**
- `node_modules/` (~509 MB) — se reinstala con `npm install`
- `.next/` (~791 MB) — carpeta de build, se regenera con `npm run build`
- `.git/` — historial de versiones de Git. No es necesario para que el sitio
  corra. Si quieres conservar el historial de cambios, sube el proyecto a un
  repositorio privado de GitHub (ver sección 4, Opción B).

> Excluir esas carpetas hace el respaldo **~95% más liviano** sin perder nada
> para correr el sitio: `node_modules` y `.next` se reconstruyen exactas con
> los comandos de abajo.

---

## 2. Requisitos previos

| Herramienta | Versión | Dónde obtenerla |
|---|---|---|
| **Node.js** | 20 LTS o superior (22 recomendado) | https://nodejs.org |
| **npm** | viene incluido con Node.js | — |
| **Git** | opcional (para historial) | https://git-scm.com |
| Editor | VS Code recomendado | https://code.visualstudio.com |

Verifica la instalación:
```bash
node --version    # debe decir v20.x o v22.x
npm --version
```

---

## 3. Restaurar el sitio (paso a paso)

### Paso 1 — Descomprimir
Extrae el ZIP. Quedará una carpeta llamada `biotiza-web/`.

### Paso 2 — Abrir terminal en la carpeta
```bash
cd ruta/a/biotiza-web
```

### Paso 3 — Instalar dependencias
```bash
npm install
```
Esto lee `package-lock.json` y reconstruye `node_modules/` con las versiones
**exactas**. Tarda 1–3 minutos. Requiere conexión a internet.

### Paso 4 — Variables de entorno (opcional)
El sitio **corre sin ninguna variable de entorno**. Solo necesitas esto si
quieres activar integraciones:
```bash
# copia la plantilla
cp .env.example .env.local
```
Luego edita `.env.local` (ver tabla en la sección 5). Si lo dejas vacío:
- El chat "Asesora Biotiza" funciona con heurística local (gratis).
- Los formularios registran en consola en vez de enviar a un webhook.

### Paso 5 — Correr en local
```bash
npm run dev
```
Abre **http://localhost:3000** — el sitio completo funcionando.

### Paso 6 — Build de producción (verificar que compila)
```bash
npm run build
npm start
```
`npm run build` debe terminar sin errores y generar 199 páginas.

---

## 4. Volver a publicar en internet (Vercel)

El sitio vive en **Vercel** con el dominio **biotiza.mx**. Para re-desplegar:

**Opción A — desde la terminal (rápido):**
```bash
npm install -g vercel     # instala el CLI una sola vez
vercel login              # inicia sesión con tu cuenta
vercel --prod             # publica a producción
```

**Opción B — desde GitHub (recomendado a largo plazo):**
1. Sube la carpeta a un repositorio de GitHub.
2. En vercel.com → New Project → importa ese repositorio.
3. Cada `git push` a la rama `main` despliega automáticamente.

El dominio `biotiza.mx` ya está configurado en el proyecto de Vercel
(DNS apuntando desde GoDaddy). No hay que reconfigurarlo salvo que cambies
de cuenta de Vercel.

---

## 5. Variables de entorno (todas opcionales)

| Variable | Para qué sirve | Si la dejas vacía |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL pública (sitemap, OG, JSON-LD) | usa `https://biotiza.mx` |
| `ANTHROPIC_API_KEY` | Chat con Claude Opus 4.7 | el chat usa heurística local (gratis) |
| `CONTACT_WEBHOOK_URL` | Recibe el form de contacto | hace `console.log` en dev |
| `COTIZACION_WEBHOOK_URL` | Recibe el form de cotización | hace `console.log` en dev |
| `LEADS_WEBHOOK_URL` | CRM — recibe prospectos del chat y forms | usa `CONTACT_WEBHOOK_URL` o consola |

> La key de Anthropic se obtiene en https://console.anthropic.com
> Los webhooks pueden ser Zapier, Make, n8n, HubSpot, etc.
> **Nunca subas `.env.local` a GitHub** — ya está en `.gitignore`.

Nota: Google Analytics (ID `G-VY5V5D35TB`) ya está integrado directamente en
el código (`src/components/shared/GoogleAnalytics.tsx`), no requiere variable.

---

## 6. Datos clave del proyecto

| Dato | Valor |
|---|---|
| Stack | Next.js 16 (App Router) · React 19 · TypeScript 6 · Tailwind CSS v4 |
| Hosting | Vercel |
| Dominio | biotiza.mx (DNS en GoDaddy) |
| Google Analytics | G-VY5V5D35TB |
| Email | ventas@biotiza.mx |
| WhatsApp | +52 33 1602 2708 |
| Catálogo | 47 productos · 35 cultivos · 9 paquetes Casa y Jardín |
| Páginas | 199 estáticas + 4 APIs dinámicas |

---

## 7. Comandos de referencia rápida

```bash
npm install        # instalar dependencias (después de descomprimir)
npm run dev        # desarrollo local → localhost:3000
npm run build      # build de producción
npm start          # correr el build de producción
vercel --prod      # publicar a producción en Vercel
```

---

## 8. Si algo falla

- **`npm install` da error** → confirma que tienes Node 20+ (`node --version`).
- **El build falla** → borra `node_modules/` y `.next/`, corre `npm install` de nuevo.
- **El chat no responde con IA** → es normal sin `ANTHROPIC_API_KEY`; funciona con heurística local.
- **Imágenes rotas en local** → confirma que la carpeta `public/` se descomprimió completa.
- **Dudas de arquitectura** → lee `CLAUDE.md` y `DEPLOY.md` (incluidos en este respaldo).

---

*Respaldo íntegro del sitio Biotiza. Para restaurarlo basta con descomprimir,
`npm install` y `npm run dev`. Todo lo demás se regenera solo.*
