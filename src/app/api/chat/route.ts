import { NextResponse } from 'next/server'
import { z } from 'zod'
import Anthropic from '@anthropic-ai/sdk'
import { PRODUCTS } from '@/data/products'
import { PRODUCT_LINES, CROPS_DATA, CONTACT_INFO } from '@/data/constants'
import { CROP_PROTOCOLS } from '@/data/crops'
import { SCIENCE_KB, SCIENCE_KB_STATS } from '@/data/science'
import { rateLimit, getClientIp } from '@/lib/server/rateLimit'
import { leadSchema, segmentLead, deliverLead } from '@/lib/server/leads'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 30

// Modelo configurable por env para poder actualizarlo sin redeploy de código.
const CHAT_MODEL = process.env.CHAT_MODEL ?? 'claude-fable-5'

// Construye un enlace de WhatsApp con un resumen del prospecto pre-llenado.
// El canal preferido de contacto de Biotiza es WhatsApp: cuando el chat capta
// datos del prospecto, le devolvemos un enlace listo para continuar por ahí.
function buildWhatsappHandoff(lead: Record<string, unknown>): string {
  const labels: Record<string, string> = {
    nombre: 'Nombre', cultivo: 'Cultivo', estado: 'Estado/zona',
    hectareas: 'Hectáreas', etapa: 'Etapa', telefono: 'Teléfono',
    email: 'Correo', tipo_interes: 'Interés',
  }
  const detail = Object.entries(lead)
    .filter(([, v]) => v != null && v !== '')
    .map(([k, v]) => `${labels[k] ?? k}: ${v}`)
    .join('\n')
  const msg = [
    'Hola Biotiza, estuve platicando con la Asesora IA y quiero continuar por aquí.',
    '',
    detail,
    '',
    '(Vengo del chat de biotiza.mx)',
  ].filter(Boolean).join('\n')
  return `${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(msg)}`
}

// ─── Schema de validación ──────────────────────────────────────────────────
const chatSchema = z.object({
  message: z.string().min(1).max(1200),
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string().max(1200),
  })).max(20).optional(),
  // Datos del prospecto ya capturados en esta sesión (para que el modelo no
  // los vuelva a pedir ni re-poste el mismo lead en cada turno).
  lead: z.object({
    nombre: z.string().max(80).optional(),
    email: z.string().max(120).optional(),
    telefono: z.string().max(30).optional(),
    estado: z.string().max(40).optional(),
    cultivo: z.string().max(60).optional(),
    hectareas: z.number().optional(),
    etapa: z.string().max(60).optional(),
  }).optional(),
})

// ─── System prompt CACHEABLE con catálogo + base científica ────────────────
// Este bloque cambia raramente (solo al actualizar catálogo o evidencia).
// Se aprovecha prompt caching: lectura ~90% más barata desde el segundo hit.
function buildCatalogContext(): string {
  const linesText = PRODUCT_LINES.map((l) =>
    `- **${l.name}** (#${l.color}) · ${l.productCount} productos · ${l.tagline}\n  ${l.description}`,
  ).join('\n')

  const productsText = PRODUCTS.map((p) => {
    const doseEntries = Object.entries(p.recommended_dose)
      .filter(([, v]) => v)
      .map(([method, dose]) => `${method}: ${dose}`)
      .join(' · ')
    const solves = (p.solves_problems ?? []).slice(0, 5).join(', ')
    const crops = (p.crops ?? []).slice(0, 8).join(', ')
    return `- [${p.line}] **${p.name}** (${p.slug}) [id:${p.id}] — ${p.description.slice(0, 160)}${doseEntries ? ` · Dosis: ${doseEntries}` : ''}${crops ? ` · Cultivos: ${crops}` : ''}${solves ? ` · Resuelve: ${solves}` : ''}`
  }).join('\n')

  const cropsText = CROP_PROTOCOLS.map((c) =>
    `- **${c.name}** (${c.slug}) · ${c.cycle_days} días · Etapas: ${c.stages.map((s) => s.name).join(' → ')} · Principales retos: ${c.common_challenges.slice(0, 3).join(', ')}`,
  ).join('\n')

  const cropBasic = CROPS_DATA.map((c) => `${c.name} (${c.slug})`).join(', ')

  return `# Catálogo Biotiza (referencia para responder al usuario)

## Líneas de producto (${PRODUCT_LINES.length} totales)
${linesText}

## Catálogo de productos (${PRODUCTS.length} productos)
${productsText}

## Protocolos fenológicos disponibles (${CROP_PROTOCOLS.length} cultivos con etapas detalladas)
${cropsText}

## Cultivos adicionales en catálogo
${cropBasic}

## Datos de contacto oficial
Email: ${CONTACT_INFO.email} · WhatsApp: ${CONTACT_INFO.whatsapp} (${CONTACT_INFO.whatsappUrl}) · Web: ${CONTACT_INFO.website}
Dirección: ${CONTACT_INFO.address}
Horario: ${CONTACT_INFO.schedule.weekdays} · ${CONTACT_INFO.schedule.saturday} · ${CONTACT_INFO.schedule.note}`
}

// ─── Base de evidencia científica (cacheable) ──────────────────────────────
// Estudios peer-reviewed verificados que respaldan los ingredientes activos.
// Esto eleva a la Asesora a nivel "tesis doctoral": cita evidencia real.
function buildScienceContext(): string {
  const blocks = SCIENCE_KB.map((e) => {
    const cites = e.citations.map((c) => {
      const ref = `${c.authors} (${c.year}). "${c.title}". ${c.source}.${c.doi ? ` DOI: ${c.doi}.` : ''}`
      return `    • ${ref}\n      Hallazgo: ${c.finding}${c.cropContext ? ` [Contexto: ${c.cropContext}]` : ''} (confianza: ${c.confidence})`
    }).join('\n')
    return `### ${e.ingredient} — ${e.scientificName}
Productos: ${e.productIds.join(', ')}
Modo de acción: ${e.mechanism}
Estudios verificados (${e.citations.length}):
${cites}`
  }).join('\n\n')

  return `# Base de evidencia científica Biotiza (${SCIENCE_KB_STATS.ingredients} activos · ${SCIENCE_KB_STATS.verifiedCitations} estudios peer-reviewed verificados)

Cada estudio listado fue verificado contra su fuente real (DOI). Úsalos para
respaldar tus recomendaciones con evidencia citable cuando un investigador o
agricultor pregunte por el sustento científico de un producto o ingrediente.

REGLAS AL CITAR:
- Cita solo lo que está aquí. Si te preguntan por un ingrediente sin estudios
  en esta base, dilo con honestidad ("la evidencia publicada que tengo a la
  mano es limitada para este activo") y ofrece conectar con el equipo técnico.
- No exageres: muchos estudios muestran que la eficacia en campo es menor que
  en laboratorio (depende de cepa, dosis, clima). Refleja esa realidad.
- Al citar, menciona autor y año de forma natural (ej: "según Barbosa et al.,
  2022, un meta-análisis..."). No inventes DOIs ni cifras.

${blocks}`
}

const SYSTEM_PERSONA = `Eres la **Asesora Biotiza**, asistente IA de nivel agronómico avanzado de Biotiza (biotiza.mx), empresa mexicana de biosoluciones agrícolas en Jalisco. Atiendes a agricultores de exportación, técnicos e investigadores.

## Tu personalidad
- Profesional pero cercana. Usas "tú" (no "usted").
- Emojis moderados (🌱🍅✅ — uno o dos por respuesta máximo, nunca más).
- Respuestas concisas y bien estructuradas: 2-4 párrafos cortos. Puedes usar **negritas** y listas con guiones; el chat las renderiza.
- Recomiendas productos ESPECÍFICOS del catálogo Biotiza con dosis y método exactos.
- Adaptas la profundidad a quien pregunta: directo y práctico para el agricultor; con respaldo científico y cifras cuando un técnico o investigador lo pide.

## Rigor científico (nivel doctoral, con honestidad)
- Cuando te pregunten por el "por qué" o el sustento de un producto/ingrediente, apóyate en la BASE DE EVIDENCIA CIENTÍFICA que se te proporciona (estudios peer-reviewed verificados con DOI). Cita autor y año de forma natural.
- NUNCA inventes estudios, DOIs, cifras, productos ni dosis. Si no está en el catálogo o en la base de evidencia, dilo con honestidad y ofrece conectar con un agrónomo humano.
- Sé honesto sobre los límites: la eficacia de los biológicos en campo suele ser menor y más variable que en laboratorio (depende de cepa, dosis, clima, humedad, UV). No prometas control total tipo químico.
- Distingue entre evidencia sólida (meta-análisis, ensayos de campo) y preliminar (in vitro). Posiciona los biológicos dentro de un manejo integrado.

## Capturar datos del prospecto
Identifica y extrae datos que el usuario mencione naturalmente (nombre, email, teléfono, estado/zona, cultivo, hectáreas, etapa, tipo de interés). Cuando tengas DOS O MÁS datos NUEVOS que no estén ya en los "datos ya capturados" que se te indican, llama a \`capture_lead\` solo con los datos nuevos. No le pidas explícitamente sus datos; extráelos de lo que cuenta. Si no hay datos nuevos, NO llames a la función.

## Flujo ideal
1. Entiende cultivo, etapa fenológica y problema.
2. Recomienda 1-3 productos del catálogo con dosis y método; añade el respaldo científico si aporta valor.
3. Si pide cotización o asesoría profunda, ofrece conectar con agrónomo humano.
4. Cierra sugiriendo 2-3 acciones cortas (chips clicables) vía \`suggest_next_steps\`.

## Canales
- WhatsApp: ${CONTACT_INFO.whatsappUrl}
- Formulario: ${CONTACT_INFO.website}/contacto · Cotización: ${CONTACT_INFO.website}/cotizacion
- Herramientas: /herramientas (calculadora-dosis, diagnostico, compatibilidad, calculadora-roi)

Responde en español mexicano profesional. Nunca cites precios (los maneja ventas).`

// ─── Fallback heurístico (sin API key) ─────────────────────────────────────
function heuristicAnswer(message: string): { reply: string; suggestions: string[] } {
  const lower = message.toLowerCase()

  if (/\b(hola|buen[oa]s|saludos|qué tal)/i.test(lower)) {
    return {
      reply:
        '¡Hola! 🌱 Soy la Asesora Biotiza. Te puedo ayudar a elegir productos, resolver dudas de dosis o diagnosticar problemas de cultivo. ¿Qué cultivo manejas?',
      suggestions: ['Deficiencia de calcio en tomate', 'Bioestimulante para cuajado', 'Control biológico de mosca blanca'],
    }
  }

  const cultivoMatch = CROP_PROTOCOLS.find((c) => lower.includes(c.slug) || lower.includes(c.name.toLowerCase()))
  if (cultivoMatch) {
    return {
      reply: `Para ${cultivoMatch.name} tengo un protocolo fenológico completo de ${cultivoMatch.cycle_days} días con ${cultivoMatch.stages.length} etapas: ${cultivoMatch.stages.map((s) => s.name).join(' → ')} 🍅. ¿En qué etapa estás?`,
      suggestions: cultivoMatch.stages.slice(0, 3).map((s) => s.name),
    }
  }

  const lineMatch = PRODUCT_LINES.find((l) => lower.includes(l.name.toLowerCase()))
  if (lineMatch) {
    return {
      reply: `Nuestra línea ${lineMatch.name} incluye ${lineMatch.productCount} productos. ${lineMatch.description} ¿Buscas algo específico?`,
      suggestions: [`Ver catálogo ${lineMatch.name}`, 'Quiero cotización', 'Hablar con un agrónomo'],
    }
  }

  return {
    reply:
      'Cuéntame más: ¿qué cultivo manejas, en qué etapa está y cuál es tu objetivo principal (nutrición, bioestimulación, control de plagas)? También puedes usar el diagnóstico visual en /herramientas/diagnostico.',
    suggestions: ['Ver productos por cultivo', 'Abrir diagnóstico guiado', 'Hablar con un agrónomo'],
  }
}

// ─── Tools ──────────────────────────────────────────────────────────────────
const tools: Anthropic.Tool[] = [
  {
    name: 'capture_lead',
    description:
      'Registra datos que el usuario menciona naturalmente sobre sí mismo. Úsalo cuando detectes al menos 2 datos NUEVOS (que no estén ya capturados). Extráelos de lo que cuenta; no se los pidas explícitamente.',
    input_schema: {
      type: 'object',
      properties: {
        nombre: { type: 'string', description: 'Nombre del prospecto si lo menciona' },
        email: { type: 'string', description: 'Correo electrónico si lo menciona' },
        telefono: { type: 'string', description: 'Teléfono si lo menciona' },
        estado: { type: 'string', description: 'Estado/zona de México donde cultiva' },
        cultivo: { type: 'string', description: 'Cultivo principal' },
        hectareas: { type: 'number', description: 'Superficie en hectáreas' },
        etapa: { type: 'string', description: 'Etapa fenológica actual' },
        tipo_interes: {
          type: 'string',
          enum: ['nutricion', 'bioestimulacion', 'bioproteccion', 'programa_integral', 'cotizacion', 'otro'],
          description: 'Qué busca principalmente',
        },
        notas: { type: 'string', description: 'Observaciones relevantes en 1-2 oraciones' },
      },
    },
  },
  {
    name: 'suggest_next_steps',
    description:
      'Al final de tu respuesta, SIEMPRE sugiere 2-3 acciones cortas que el usuario podría tomar. Aparecen como chips clicables en la UI.',
    input_schema: {
      type: 'object',
      properties: {
        suggestions: {
          type: 'array',
          items: { type: 'string' },
          minItems: 2,
          maxItems: 3,
          description: 'Lista de 2 a 3 sugerencias cortas (máximo 6 palabras cada una)',
        },
      },
      required: ['suggestions'],
    },
  },
]

// Schema interno para validar lo que el modelo extrae antes de tocar el CRM.
const captureLeadSchema = z.object({
  nombre: z.string().min(2).max(80).optional(),
  email: z.string().email().max(120).optional(),
  telefono: z.string().max(30).optional(),
  estado: z.string().max(40).optional(),
  cultivo: z.string().max(60).optional(),
  hectareas: z.number().min(0).max(100000).optional(),
  etapa: z.string().max(60).optional(),
  tipo_interes: z.enum(['nutricion', 'bioestimulacion', 'bioproteccion', 'programa_integral', 'cotizacion', 'otro']).optional(),
  notas: z.string().max(2000).optional(),
})

// ─── POST /api/chat ────────────────────────────────────────────────────────
export async function POST(req: Request) {
  const ip = getClientIp(req)

  if (!rateLimit(`chat:${ip}`, 15)) {
    return NextResponse.json(
      { ok: false, error: 'Estás escribiendo muy rápido. Dame unos segundos.' },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'JSON inválido.' }, { status: 400 })
  }

  const parsed = chatSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Mensaje inválido.' }, { status: 422 })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY

  // ── Fallback heurístico cuando no hay API key ────────────────────────────
  if (!apiKey) {
    const answer = heuristicAnswer(parsed.data.message)
    return NextResponse.json({ ok: true, ...answer, mode: 'heuristic' })
  }

  // ── Claude real ──────────────────────────────────────────────────────────
  const client = new Anthropic({ apiKey })

  // Saneamos el historial: Anthropic exige que la conversación empiece con un
  // turno 'user'. El widget incluye un saludo inicial 'assistant' que, sin
  // limpiar, hacía fallar TODA primera conversación con 400 (hallazgo crítico).
  const rawHistory = parsed.data.history ?? []
  const firstUserIdx = rawHistory.findIndex((h) => h.role === 'user')
  const history = firstUserIdx === -1 ? [] : rawHistory.slice(firstUserIdx)

  const messages: Anthropic.MessageParam[] = [
    ...history.map((h) => ({ role: h.role, content: h.content })),
    { role: 'user', content: parsed.data.message },
  ]

  // Datos ya capturados → se inyectan para que el modelo no los re-pida ni
  // re-poste el mismo lead en cada turno.
  const known = parsed.data.lead
  const knownText = known && Object.keys(known).length > 0
    ? `\n\n## Datos ya capturados de este prospecto (no los vuelvas a pedir ni re-registres):\n${Object.entries(known).filter(([, v]) => v != null && v !== '').map(([k, v]) => `- ${k}: ${v}`).join('\n')}`
    : ''

  try {
    let replyText = ''
    let suggestions: string[] = []
    let capturedLead: Record<string, unknown> | null = null
    const convo: Anthropic.MessageParam[] = [...messages]

    // Bucle de tool_use: continuamos la conversación enviando tool_result
    // hasta que el modelo cierre (end_turn). Antes era de una sola vuelta y
    // el texto/sugerencias se perdían si el modelo emitía solo tool_use.
    for (let turn = 0; turn < 4; turn++) {
      const response: Anthropic.Message = await client.messages.create({
        model: CHAT_MODEL,
        max_tokens: 2048,
        system: [
          { type: 'text', text: SYSTEM_PERSONA + knownText },
          { type: 'text', text: buildCatalogContext() },
          {
            type: 'text',
            text: buildScienceContext(),
            cache_control: { type: 'ephemeral' }, // ← prefijo estable y grande = ahorro
          },
        ],
        messages: convo,
        tools,
      })

      const toolResults: Anthropic.ToolResultBlockParam[] = []
      for (const block of response.content) {
        if (block.type === 'text') {
          replyText += block.text
        } else if (block.type === 'tool_use') {
          if (block.name === 'capture_lead') {
            const safe = captureLeadSchema.safeParse(block.input)
            if (safe.success && Object.keys(safe.data).length > 0) {
              capturedLead = safe.data as Record<string, unknown>
            }
          } else if (block.name === 'suggest_next_steps') {
            const input = block.input as { suggestions?: string[] }
            if (Array.isArray(input.suggestions)) {
              suggestions = input.suggestions.slice(0, 3).map(String)
            }
          }
          toolResults.push({ type: 'tool_result', tool_use_id: block.id, content: 'ok' })
        }
      }

      if (response.stop_reason !== 'tool_use' || toolResults.length === 0) break

      // Continuar la conversación con los resultados de las tools.
      convo.push({ role: 'assistant', content: response.content })
      convo.push({ role: 'user', content: toolResults })
    }

    // Persistir lead segmentado (mismo CRM que los formularios) y preparar el
    // hand-off a WhatsApp (canal de contacto preferido de Biotiza).
    let whatsappUrl: string | null = null
    if (capturedLead && Object.keys(capturedLead).length > 0) {
      whatsappUrl = buildWhatsappHandoff(capturedLead)
      const safe = leadSchema.safeParse({ ...capturedLead, fuente: 'chat' })
      if (safe.success) {
        const segmented = segmentLead(
          safe.data,
          ip,
          new Date().toISOString(),
          `${Date.now().toString(36).toUpperCase()}-CHAT`,
        )
        await deliverLead(segmented)
      }
    }

    if (suggestions.length === 0) {
      suggestions = ['Hablar con un agrónomo', 'Ver catálogo', 'Calcular dosis']
    }

    return NextResponse.json({
      ok: true,
      reply: replyText.trim() || '¿Podrías darme un poco más de contexto sobre tu cultivo?',
      suggestions,
      lead: capturedLead,
      whatsappUrl,
      mode: 'claude',
    })
  } catch (err) {
    console.error('[chat] Claude error', err)

    if (err instanceof Anthropic.RateLimitError) {
      return NextResponse.json(
        { ok: false, error: 'Asistente saturado. Intenta en unos segundos o usa WhatsApp.' },
        { status: 429 },
      )
    }

    // Caída a heurística en caso de cualquier otro error, señalada como degradada.
    const fallback = heuristicAnswer(parsed.data.message)
    return NextResponse.json({ ok: true, ...fallback, mode: 'degraded' })
  }
}
