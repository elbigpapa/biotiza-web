# 🚀 Deploy Biotiza Web — Guía paso a paso

Esta guía te lleva de **código local** a **biotiza.mx funcionando** en ~15 minutos.

---

## 1 · Pre-requisitos

- Cuenta de **GitHub** (para el repo)
- Cuenta de **Vercel** (para deploy — plan Hobby es gratis para empezar)
- Acceso a **DNS de biotiza.mx** (para apuntar dominio)
- Opcional pero recomendado:
  - **Anthropic API key** (para activar Claude en el chat) — https://console.anthropic.com/
  - **Zapier/Make/n8n** (para recibir leads y formularios)

---

## 2 · Subir código a GitHub

```bash
# desde la raíz del proyecto biotiza-web
git init
git add .
git commit -m "Initial commit — biotiza-web production-ready"
git branch -M main
git remote add origin git@github.com:biotiza/biotiza-web.git
git push -u origin main
```

---

## 3 · Conectar a Vercel

1. Ve a https://vercel.com/new
2. **Import Git Repository** → selecciona `biotiza-web`
3. Framework Preset: **Next.js** (detectado automático)
4. Root Directory: `./` (raíz)
5. Build Command: `next build` (default)
6. Output Directory: `.next` (default)
7. **NO deploys todavía** — primero configura los env vars en el paso 4

---

## 4 · Variables de entorno en Vercel

**Settings → Environment Variables** → añade una por una:

| Variable | Valor | Notas |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://biotiza.mx` | Para sitemap/OG/JSON-LD |
| `ANTHROPIC_API_KEY` | `sk-ant-api03-…` | Desde console.anthropic.com. Sin esto, el chat usa heurística local. |
| `CONTACT_WEBHOOK_URL` | tu webhook | Recibe submits de `/api/contact` |
| `COTIZACION_WEBHOOK_URL` | tu webhook | Recibe submits de `/api/cotizacion` |
| `LEADS_WEBHOOK_URL` | tu webhook | Recibe leads del chat + CRM (puede ser el mismo) |

**Opciones para webhooks:**
- **Gratis**: [Zapier Catch Hook](https://zapier.com/) → Gmail/Sheets/HubSpot/Slack
- **Gratis**: [Make.com](https://make.com/) — más potente
- **Self-hosted**: [n8n](https://n8n.io/)
- **Enterprise**: HubSpot Forms API, Salesforce API

---

## 5 · Primer deploy

En Vercel, haz click en **Deploy**. En ~2 minutos tendrás una URL como `biotiza-web.vercel.app`.

Prueba:
- Home → ver ChatWidget flotante
- `/casa-jardin` → explorar paquetes
- `/cotizacion` → añadir producto + enviar form
- `/api/chat` → abrir widget y escribir "hola"

---

## 6 · Apuntar dominio biotiza.mx

### En Vercel
**Project → Settings → Domains** → añade `biotiza.mx` y `www.biotiza.mx`.

Vercel te dará los registros DNS que tienes que poner.

### En tu proveedor de DNS (CloudFlare / GoDaddy / namecheap)

**Ejemplo CloudFlare:**

| Tipo | Nombre | Valor | Proxy |
|---|---|---|---|
| A | @ | `76.76.21.21` | Off (DNS only) |
| CNAME | www | `cname.vercel-dns.com` | Off (DNS only) |

**Importante**: Desactiva el proxy de CloudFlare (orange cloud) — Vercel necesita ver el tráfico directo.

Espera 5-15 minutos a que propague DNS. Vercel mostrará ✓ Valid Configuration cuando esté listo. El certificado HTTPS se emite automáticamente (Let's Encrypt).

---

## 7 · Verificación post-deploy

Checklist (idealmente en https://biotiza.mx):

- [ ] Home carga con hero + ChatWidget
- [ ] Header muestra "Casa y Jardín" en nav
- [ ] `/academia/blog` muestra 3 artículos
- [ ] `/casa-jardin` muestra 5 categorías
- [ ] Abre una ficha de producto (ej. `/soluciones/organicos/bp-calcio`) y revisa:
  - Breadcrumb funcional
  - JSON-LD en el HTML (inspecciona → script[type="application/ld+json"])
- [ ] ChatWidget responde (prueba con "hola, tengo tomate en Sinaloa")
- [ ] Formulario de contacto envía sin error
- [ ] WhatsApp float abre https://wa.me/523316022708
- [ ] https://www.biotiza.mx/sitemap.xml existe y lista 100+ URLs
- [ ] https://www.biotiza.mx/robots.txt permite crawl

**Herramientas de validación:**
- https://search.google.com/test/rich-results — pega URL del producto, debe ver Product + BreadcrumbList
- https://pagespeed.web.dev/ — debe estar >90 en móvil y desktop
- https://securityheaders.com/?q=biotiza.mx — debe dar A o A+

---

## 8 · Google Search Console + Analytics

1. Añade biotiza.mx a https://search.google.com/search-console/
2. Verifica ownership (DNS TXT o HTML file — el TXT es más sencillo)
3. Sube el sitemap: `https://biotiza.mx/sitemap.xml`
4. **Opcional**: integra Vercel Analytics (gratis hasta 100K events) → **Project → Analytics → Enable**
5. **Opcional**: añade Google Analytics con `NEXT_PUBLIC_GA_MEASUREMENT_ID` (hay que agregar el script al layout, pendiente)

---

## 9 · Workflow de desarrollo continuo

```
local (feature branch)  →  git push  →  Vercel preview deploy (URL única)  →  merge a main  →  production deploy (biotiza.mx)
```

Cada push a una rama genera un **Preview Deploy** con URL temporal. Puedes compartirla con los ingenieros para revisión antes de hacer merge.

---

## 10 · Cómo funciona el chat con Claude

**Sin `ANTHROPIC_API_KEY`**: heurística local. Matchea palabras clave (cultivos, líneas, problemas) y responde con productos del catálogo. Gratis, rápido, siempre funciona.

**Con `ANTHROPIC_API_KEY`**: Claude Opus 4.7 con:
- **Prompt caching del catálogo completo** (41 productos + 14 cultivos + protocolos). Primera request paga ~1.25× el costo normal; las siguientes leen del cache a ~0.1×. Resultado: ~90% de ahorro.
- **Adaptive thinking**: el modelo decide cuándo razonar más.
- **Tool use automático**: cuando el usuario comparte datos ("tengo 5 hectáreas de tomate en Sinaloa"), el modelo llama al tool `capture_lead` y los datos viajan a `/api/leads` sin que tengas que configurar nada.
- **Segmentación automática**: el lead se clasifica en prioridad alta/media/baja y se asigna a especialista por cultivo.

Costo aproximado: ~$0.01 USD por conversación de 5-10 mensajes con cache activo. Sin cache: ~$0.10 USD.

---

## 11 · Cómo conectar el chat a WhatsApp (fase 2)

El chat y WhatsApp son canales separados hoy. Para conectarlos:

### Opción A — WhatsApp Business API (oficial, pago)
1. Aplica a [WhatsApp Business API](https://business.whatsapp.com/products/business-platform) a través de un proveedor (Twilio, 360dialog, MessageBird, Vonage).
2. Aprueba tu número +52 33 1602 2708 como cuenta Business.
3. Crea plantillas de mensaje para auto-respuestas.
4. Implementa un webhook: cada mensaje entrante se reenvía a `/api/chat` con modo `whatsapp`, el modelo responde, y la respuesta vuelve a WhatsApp.
5. Costo aproximado: $0.05-0.15 USD por conversación según proveedor.

### Opción B — Bridge vía n8n + WhatsApp Web (grey area, no oficial)
1. Instala n8n.
2. Usa el node de WhatsApp no-oficial (whatsapp-web.js).
3. Conecta a /api/chat en tu Vercel.
4. **Riesgo**: Meta puede bloquear el número por violar TOS.

### Opción C — Simplificar: botón "Continuar por WhatsApp"
Mantén el chat solo en la web. Cuando el usuario quiere algo más, un botón lo manda a WhatsApp con el historial pre-llenado. Esta es la UX actual del `ChatWidget.tsx`. **Recomiendo empezar aquí.**

---

## 12 · Qué sigue

- [ ] Reemplazar el placeholder de biotiza-logo.png en JSON-LD cuando tengas el logo oficial
- [ ] Añadir OG image `/public/og-image.jpg` (1200×630) con branding
- [ ] Integrar pagos reales (Stripe / Mercado Pago) para tienda Casa y Jardín
- [ ] Grabar videos cortos (30s) para cada línea de producto y embedearlos
- [ ] Añadir testimonios reales de agricultores en homepage
- [ ] Traducción al inglés (para clientes en USA que exportan desde MX)

Para cualquier duda técnica, la Asesora Biotiza (el chat) conoce el catálogo completo 24/7.
