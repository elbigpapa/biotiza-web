# Rediseño de la Home de Biotiza — Documento de diseño

**Fecha:** 2026-05-22
**Estado:** Aprobado por el dueño (las 4 partes del diseño)
**Alcance de esta fase:** la página de inicio (`/`) + arreglos globales

---

## 1. Contexto y propósito

El sitio biotiza.mx está en producción con un sistema de diseño editorial
premium (Instrument Serif + paleta papel/tinta). Una revisión externa —un
colega del dueño y una evaluación con IA— señaló:

- El sitio se siente **estático**, poco dinámico.
- **Demasiado texto** y **letras pequeñas**; la gente de campo no leerá
  párrafos largos.
- Faltan **CTAs** y **formularios**.
- El **botón de IA tapa al de WhatsApp**.
- Hay **errores de alineación**.
- Sugiere **secciones desplegables/acordeón** para mostrar/ocultar info.

El dueño quiere conservar **toda la información** actual, pero reorganizarla
en una experiencia de scroll de primer nivel que **invite estructuralmente a
seguir bajando** y permita una **inmersión guiada por el interés** del
visitante en cada sección.

Referencias aportadas por el dueño: cornrevolution.resn.global (inspiración
del "invitar a bajar", no a clonar — es WebGL pesado) y scale.com (modelo
realista: B2B limpio, tarjetas, animación sutil, fotografía premium).

## 2. Objetivos y criterios de éxito

**Objetivos**

1. La home invita estructuralmente a seguir bajando: cada escena entrega a
   la siguiente con ritmo.
2. El visitante se sumerge solo en lo que le interesa (divulgación
   progresiva).
3. Se conserva el 100% de la información actual, reorganizada.
4. Más escaneable: menos texto visible, tipografía más grande.
5. Más dinámica: animación al hacer scroll.
6. Más CTAs y un formulario rápido de captación.
7. Se resuelven los bugs concretos: botón IA/WhatsApp, alineaciones.

**Criterios de éxito (verificables)**

- En móvil: cero scroll horizontal; áreas táctiles ≥ 44 px; contraste AA en
  todo texto.
- El texto visible de cada escena (capa 1) se lee de un vistazo; lo extenso
  vive en las inmersiones.
- Cada escena tiene al menos un CTA.
- El botón de chat y el de WhatsApp nunca se enciman, en ningún tamaño.
- Build limpio, sin regresiones de TypeScript ni de lint.
- El sitio no queda más pesado: imágenes vía `next/image`, lazy-load,
  rendimiento móvil sano.

## 3. Alcance

**En alcance (Fase 1 — este documento)**

- La página de inicio (`/`) completa, reconstruida.
- Arreglos globales que afectan a todo el sitio: posicionamiento de los
  botones flotantes (WhatsApp + chat).

**Fuera de alcance (Fase 2 — futuro)**

- Rediseño de páginas interiores (`/soluciones`, `/cultivos`, fichas de
  producto, `/casa-jardin`, `/academia`). Conservan su tratamiento
  editorial actual por ahora.

**No se toca**

- Los datos: `products.ts`, `crops.ts`, `home-garden.ts`, `constants.ts`,
  artículos. La estructura de datos no cambia.
- Las 4 APIs (`/api/chat`, `/api/contact`, `/api/cotizacion`, `/api/leads`).
- El sistema de color y tipografía editorial (tokens de `globals.css`).
- El contenido de las páginas interiores.

## 4. El modelo de interacción — 2 capas

Cada escena de la home funciona en **dos capas**:

- **Capa 1 — El gancho.** Lo que ve todo visitante. Imagen a todo lo ancho
  + eyebrow (número y nombre de escena) + titular serif grande + lo esencial
  (un dato, unas etiquetas) + un disparador de inmersión + un CTA + un cue
  de scroll. Escaneable en ~3 segundos. Sin párrafos largos.
- **Capa 2 — La inmersión.** Un panel desplegable (acordeón). Contiene la
  información a fondo (protocolos, datos, fichas) que hoy ya existe en el
  sitio. Se abre solo si el visitante lo decide. Tiene su propio CTA.

**Principio rector:** divulgación progresiva guiada por el interés. El
visitante pasa rápido por lo que no le importa y se sumerge en lo que sí.

## 5. Recorrido de la home — 9 escenas

Orden definitivo (antes eran 10; se elimina el marquee y la sección de
producto estrella; se agrega Herramientas):

1. **Hero — "Ciencia que rinde al campo."**
   Imagen: la foto de la mano sembrando. Gancho: titular hero + 3 métricas
   (47 productos · 35 cultivos · 25+ años) + cue de scroll. Sin tira de
   certificaciones. Sin capa 2.

2. **Proceso — "Del laboratorio a tu cultivo."**
   Gancho: titular + 4 actos como chips (01 Lab · 02 Ensayo · 03 Asesor ·
   04 Cosecha). Capa 2: tocar un acto abre su detalle. CTA en la inmersión.

3. **Servicio — "Vendemos productos. Acompañamos resultados."**
   Imagen: agrónomo con productor. Gancho: la frase + 1 dato. Capa 2: cómo
   funciona el acompañamiento. CTA: "Quiero un agrónomo".

4. **Soluciones — las 5 líneas de producto.**
   Gancho: 5 familias como tarjetas con foto y conteo. Capa 2: abrir una
   línea muestra productos destacados + enlace a `/soluciones/[linea]`.
   CTA: "Ver catálogo completo". (Los productos destacados viven aquí — por
   eso se elimina la antigua sección "Producto estrella".)

5. **Cultivos — "¿Qué le doy a mi cultivo?" — MEDULAR.**
   Invitación protagónica a `/cultivos`. Gancho: titular fuerte + buscador
   de cultivo + algunos cultivos destacados con foto. Acción: elegir un
   cultivo lleva a `/cultivos/[cultivo]`. CTA: "Ver los 35 expedientes".

6. **Herramientas — "Calcula, diagnostica, decide." — NUEVA.**
   Las 4 herramientas como tarjetas: Calculadora de dosis, Calculadora ROI,
   Diagnóstico, Compatibilidad. Cada tarjeta enlaza a su página. Sección
   interactiva — invita a usar, no solo a leer.

7. **Huella de carbono — "Menos huella, más cosecha."**
   Gancho: las 4 cifras grandes (tipografía mono ya corregida). Capa 2:
   fuentes científicas citadas + nota honesta. CTA: "Calculadora ROI".

8. **Filosofía + testimonios — "Lo que no vamos a hacer."**
   Movida del medio al final: la prueba humana refuerza antes de convertir.
   Gancho: cita editorial. Capa 2: los 4 compromisos.

9. **CTA final — "Hablemos de tu cultivo."**
   WhatsApp + cotización + mini-formulario rápido (nombre · cultivo ·
   teléfono) que entra al CRM de prospectos. Cierre fuerte.

**Certificaciones:** se retiran por completo de la home (el marquee en
movimiento se elimina). Cada ficha de producto ya muestra composición y
certificados; no hacen falta en la principal.

## 6. Anatomía y animación de una escena

**Anatomía (capa 1):**

1. Eyebrow mono — número + nombre de escena; ubica al visitante.
2. Titular serif grande — legible desde lejos y en celular.
3. Una sola frase de apoyo — lo esencial; sin párrafos.
4. Disparador de inmersión — abre la capa 2.
5. CTA — cada escena tiene el suyo.
6. Cue de scroll — indicador sutil que invita a la siguiente escena.

**Coreografía de animación:**

- **Entrada escalonada:** al entrar la escena al viewport, los elementos
  (imagen → eyebrow → titular → contenido) aparecen en secuencia con
  fade + desplazamiento; ~0.6 s total, stagger ~0.08 s.
- **Parallax:** la imagen de fondo se mueve más lento que el scroll
  (profundidad sin video).
- **Inmersión fluida:** la capa 2 se despliega con animación de altura +
  fade.
- **Ritmo claro/oscuro:** las escenas alternan fondo; la siguiente "asoma".
- **Smooth scroll:** Lenis da la sensación de "mantequilla" al bajar.
- **Accesibilidad:** todo respeta `prefers-reduced-motion` — con esa
  preferencia activa se desactivan parallax, Lenis y entradas; se muestra
  el contenido sin movimiento.

## 7. Arreglos globales

- **Botón IA / WhatsApp:** en móvil se apilan en vertical y separados
  (WhatsApp abajo, chat arriba); en escritorio ya están con offset
  horizontal. Nunca se enciman.
- **Más CTAs:** uno por escena + el CTA final + los cues de scroll.
- **Mini-formulario:** nuevo, en la escena 9 (nombre · cultivo · teléfono);
  POST a `/api/leads` con honeypot y validación Zod.
- **Alineación:** cada escena se reconstruye sobre una grilla consistente
  (mismo `Container`, mismos paddings) — desaparecen los desajustes.
- **Tipografía:** sube el tamaño base del cuerpo; titulares grandes. Lo
  extenso se mueve a las inmersiones.

## 8. Arquitectura de componentes

**Nuevos / reutilizables**

- `Scene` — envoltura de escena: fondo (imagen full-bleed o color),
  parallax, layout del contenedor, variante clara/oscura.
- `ScrollReveal` — aplica la animación de entrada escalonada (`whileInView`).
- `Immersion` — el panel desplegable de la capa 2; accesible (botón,
  `aria-expanded`, navegable por teclado).
- `ScrollCue` — el indicador "sigue bajando".
- `SmoothScrollProvider` — inicializa Lenis del lado cliente; respeta
  `prefers-reduced-motion`.
- `HerramientasSection` — escena 6, nueva.
- `MiniLeadForm` — el formulario rápido de la escena 9.

**Modificados**

- Cada sección de la home se reescribe usando `Scene` + `ScrollReveal` +
  `Immersion`.
- `WhatsAppFloat` y `ChatWidget` — se corrige el posicionamiento.
- `page.tsx` — nuevo orden de 9 escenas.

**Retirados de la home**

- `CertificationsMarquee` y `FeaturedProductsSection` — se desconectan de
  `page.tsx`. Los archivos pueden conservarse sin uso o eliminarse.

## 9. Stack y dependencias

La auditoría confirmó que el núcleo (Next.js 16 · React 19 · TypeScript 6 ·
Tailwind 4 · Vercel) ya está en su última versión mayor — no se cambia.

Para el rediseño:

- **Migrar `framer-motion` → `motion`** — la librería se renombró; mismo
  motor, nombre canónico actual.
- **Agregar `lenis`** (~4 KB) — smooth scroll, para la sensación de
  "invitar a bajar".
- Sin otras dependencias nuevas. Sin WebGL.

(Las actualizaciones menores de SDK/resolvers y la configuración de
Dependabot ya se aplicaron en `main`, commit `0ec514b`.)

## 10. Aislamiento del trabajo

- El rediseño se desarrolla en un **git worktree**: carpeta separada, rama
  `rediseno`. La rama `main` y el sitio en vivo quedan intactos.
- **Cero deploys** hasta que el dueño apruebe el diseño final.
- Al terminar y aprobar: fusionar `rediseno` → `main` y hacer **un solo
  deploy** controlado.
- Si algo no convence, la rama se descarta sin afectar producción.

## 11. Riesgos y consideraciones

- **Smooth scroll en gama baja:** Lenis debe mantenerse ligero (lerp
  moderado) y desactivarse con `prefers-reduced-motion`. Probar en celular
  real de gama media/baja.
- **Imágenes stock:** por ahora se usa banco de imágenes de alta calidad;
  el diseño deja "slots" de imagen reemplazables para que la agencia del
  cliente sustituya por contenido propio sin tocar código.
- **Accesibilidad de acordeones:** navegación por teclado, foco visible,
  `aria-expanded`, lectores de pantalla.
- **Peso de la página:** no debe quedar más pesada que hoy — `next/image`,
  lazy-load, formatos modernos.
- **Sin video por ahora:** el dinamismo proviene de animación de scroll y
  parallax de fotografía, no de video.

## 12. Lo que NO cambia (resumen)

- Datos del catálogo (47 productos, 35 cultivos, 9 paquetes).
- Las 4 APIs y el CRM de prospectos.
- El sistema de color y tipografía editorial.
- Las páginas interiores (Fase 2).

## 13. Pendientes a resolver en implementación

- Selección de las imágenes específicas por escena (stock de alta calidad,
  verificadas visualmente).
- Redacción final del texto recortado de cada gancho.
- Valor de `fuente` para el `MiniLeadForm` en `/api/leads` (p. ej.
  `home-cta`) — agregar al enum del endpoint.
