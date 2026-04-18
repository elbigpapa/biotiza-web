import { NextResponse } from 'next/server'
import { z } from 'zod'
import Anthropic from '@anthropic-ai/sdk'
import { PRODUCTS } from '@/data/products'
import { PRODUCT_LINES, CROPS_DATA, CONTACT_INFO } from '@/data/constants'
import { CROP_PROTOCOLS } from '@/data/crops'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 30

// ─── Schema de validación ──────────────────────────────────────────────────
const chatSchema = z.object({
  message: z.string().min(1).max(1200),
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string().max(1200),
  })).max(20).optional(),
  lead: z.object({
    nombre: z.string().optional(),
    email: z.string().optional(),
    telefono: z.string().optional(),
    estado: z.string().optional(),
    cultivo: z.string().optional(),
    hectareas: z.number().optional(),
    etapa: z.string().optional(),
  }).optional(),
})

// ─── Rate limit en memoria ─────────────────────────────────────────────────
const attempts = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 60_000
const MAX = 15

function rateLimit(key: string) {
  const now = Date.now()
  const entry = attempts.get(key)
  if (!entry || entry.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }
  if (entry.count >= MAX) return false
  entry.count += 1
  return true
}

// ─── System prompt CACHEABLE con catálogo completo ────────────────────────
// Este bloque cambia raramente (solo cuando agregamos productos/cultivos).
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
    return `- [${p.line}] **${p.name}** (${p.slug}) — ${p.description.slice(0, 160)}${doseEntries ? ` · Dosis: ${doseEntries}` : ''}${crops ? ` · Cultivos: ${crops}` : ''}${solves ? ` · Resuelve: ${solves}` : ''}`
  }).join('\n')

  const cropsText = CROP_PROTOCOLS.map((c) =>
    `- **${c.name}** (${c.slug}) · ${c.cycle_days} días · Etapas: ${c.stages.map((s) => s.name).join(' → ')} · Principales retos: ${c.common_challenges.slice(0, 3).join(', ')}`,
  ).join('\n')

  const cropBasic = CROPS_DATA.map((c) => `${c.name} (${c.slug})`).join(', ')

  return `# Catálogo Biotiza (referencia para responder al usuario)

## Líneas de producto (5 totales)
${linesText}

## Catálogo de productos (${PRODUCTS.length} productos)
${productsText}

## Protocolos fenológicos disponibles (${CROP_PROTOCOLS.length} cultivos con etapas detalladas)
${cropsText}

## Cultivos adicionales en catálogo (sin protocolo detallado todavía)
${cropBasic}

## Datos de contacto oficial
Email: ${CONTACT_INFO.email} · WhatsApp: +52 33 1602 2708 · Web: ${CONTACT_INFO.website}
Ubicación: ${CONTACT_INFO.address}`
}

const SYSTEM_PERSONA = `Eres la **Asesora Biotiza**, asistente IA especializada de Biotiza (biotiza.mx), empresa mexicana de biosoluciones agrícolas con sede en Zapopan, Jalisco.

## Tu personalidad
- Profesional pero cercana. Usas "tú" (no "usted").
- Emojis moderados (🌱🍅✅ — uno o dos por respuesta máximo, nunca más).
- Respuestas concisas: 2-4 párrafos cortos, máximo. El usuario está en un chat widget, no quiere leer ensayos.
- Recomiendas productos ESPECÍFICOS del catálogo Biotiza siempre que sea posible, con dosis y método exactos.
- Si una pregunta requiere diagnóstico visual o está fuera del catálogo, lo dices honestamente y ofreces conectar con un agrónomo humano por WhatsApp (+52 33 1602 2708) o formulario /contacto.
- Nunca inventas productos ni dosis: usa solo los del catálogo que te paso abajo.

## Capturar datos del prospecto
Durante la conversación, identifica y extrae estos datos sobre el usuario si los menciona:
- **nombre** (ej: "soy Juan")
- **email** ("juan@ejemplo.mx")
- **telefono** ("tengo +52 33...")
- **estado/zona** ("estoy en Sinaloa", "en Jalisco")
- **cultivo** ("tengo tomate", "siembro fresa")
- **hectareas** ("tengo 5 hectáreas", "50 ha")
- **etapa** ("en floración", "acabo de trasplantar")

Cuando tengas DOS O MÁS de estos datos nuevos, llama a la función \`capture_lead\` con los datos extraídos. No le pidas al usuario explícitamente "dame tus datos" — los capturas de lo que te cuenta naturalmente. Si no hay datos nuevos, no llames a la función.

## Flujo ideal de atención
1. Entiende el cultivo, etapa fenológica y problema.
2. Recomienda 1-3 productos específicos del catálogo con dosis y método.
3. Si el usuario pide cotización o necesita asesoría más profunda, ofrece conectar con agrónomo humano.
4. Al final de cada respuesta clave, sugiere 2-3 acciones cortas que el usuario podría tomar (aparecen como chips clicables en la UI).

## Canales externos
- WhatsApp: https://wa.me/523316022708
- Formulario: https://biotiza.mx/contacto
- Cotización: https://biotiza.mx/cotizacion
- Herramientas online: /herramientas (calculadora-dosis, diagnostico, compatibilidad, calculadora-roi)

Responde siempre en español mexicano profesional. Nunca cites precios (los maneja el equipo de ventas).`

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

// ─── Guardar lead (webhook o log) ──────────────────────────────────────────
async function persistLead(lead: Record<string, unknown>, ip: string) {
  const payload = {
    type: 'lead',
    source: 'chat-widget',
    capturedAt: new Date().toISOString(),
    ip,
    ...lead,
  }

  const webhook = process.env.LEADS_WEBHOOK_URL ?? process.env.CONTACT_WEBHOOK_URL
  if (webhook) {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch (err) {
      console.error('[leads] webhook error', err)
    }
  } else if (process.env.NODE_ENV !== 'production') {
    console.log('[leads] captured', payload)
  }
}

// ─── POST /api/chat ────────────────────────────────────────────────────────
export async function POST(req: Request) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'

  if (!rateLimit(ip)) {
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

  const history = parsed.data.history ?? []
  const messages: Anthropic.MessageParam[] = [
    ...history.map((h) => ({ role: h.role, content: h.content })),
    { role: 'user', content: parsed.data.message },
  ]

  // Tool para capturar datos del prospecto de forma estructurada
  const tools: Anthropic.Tool[] = [
    {
      name: 'capture_lead',
      description:
        'Registra datos que el usuario menciona naturalmente sobre sí mismo (su cultivo, zona, hectáreas, etapa, nombre, email, teléfono). Úsalo cuando detectes al menos 2 datos nuevos durante la conversación. No le pidas explícitamente al usuario "dame tus datos"; extráelos de lo que te cuenta.',
      input_schema: {
        type: 'object',
        properties: {
          nombre: { type: 'string', description: 'Nombre del prospecto si lo menciona' },
          email: { type: 'string', description: 'Correo electrónico si lo menciona' },
          telefono: { type: 'string', description: 'Teléfono si lo menciona' },
          estado: { type: 'string', description: 'Estado/zona de México donde cultiva (ej: Sinaloa, Jalisco)' },
          cultivo: { type: 'string', description: 'Cultivo principal (ej: tomate, fresa, aguacate)' },
          hectareas: { type: 'number', description: 'Superficie en hectáreas si la menciona' },
          etapa: { type: 'string', description: 'Etapa fenológica actual del cultivo' },
          tipo_interes: {
            type: 'string',
            enum: ['nutricion', 'bioestimulacion', 'bioproteccion', 'programa_integral', 'otro'],
            description: 'Qué busca el prospecto principalmente',
          },
          notas: { type: 'string', description: 'Observaciones relevantes en 1-2 oraciones' },
        },
      },
    },
    {
      name: 'suggest_next_steps',
      description:
        'Al final de tu respuesta, SIEMPRE sugiere 2-3 acciones cortas que el usuario podría tomar. Aparecen como chips clicables en la UI del chat.',
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

  try {
    // Prompt caching: el catálogo es un prefijo estable y grande → ~90% más
    // barato en lecturas repetidas. Se invalida solo al actualizar catálogo.
    const response = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 1200,
      thinking: { type: 'adaptive' },
      system: [
        { type: 'text', text: SYSTEM_PERSONA },
        {
          type: 'text',
          text: buildCatalogContext(),
          cache_control: { type: 'ephemeral' }, // ← aquí el ahorro
        },
      ],
      messages,
      tools,
    })

    // Extraer texto + tool uses
    let replyText = ''
    let suggestions: string[] = []
    let capturedLead: Record<string, unknown> | null = null

    for (const block of response.content) {
      if (block.type === 'text') {
        replyText += block.text
      } else if (block.type === 'tool_use') {
        if (block.name === 'capture_lead') {
          capturedLead = block.input as Record<string, unknown>
        } else if (block.name === 'suggest_next_steps') {
          const input = block.input as { suggestions?: string[] }
          if (Array.isArray(input.suggestions)) {
            suggestions = input.suggestions
          }
        }
      }
    }

    // Persistir lead si fue capturado
    if (capturedLead && Object.keys(capturedLead).length > 0) {
      await persistLead(capturedLead, ip)
    }

    // Fallback de sugerencias si el modelo no las emitió
    if (suggestions.length === 0) {
      suggestions = ['Hablar con un agrónomo', 'Ver catálogo', 'Calcular dosis']
    }

    return NextResponse.json({
      ok: true,
      reply: replyText.trim() || '¿Podrías darme un poco más de contexto sobre tu cultivo?',
      suggestions,
      lead: capturedLead,
      mode: 'claude',
      usage: {
        input: response.usage.input_tokens,
        output: response.usage.output_tokens,
        cacheRead: response.usage.cache_read_input_tokens ?? 0,
        cacheWrite: response.usage.cache_creation_input_tokens ?? 0,
      },
    })
  } catch (err) {
    console.error('[chat] Claude error', err)

    if (err instanceof Anthropic.RateLimitError) {
      return NextResponse.json(
        { ok: false, error: 'Asistente saturado. Intenta en unos segundos o usa WhatsApp.' },
        { status: 429 },
      )
    }

    // Caída a heurística en caso de cualquier otro error
    const fallback = heuristicAnswer(parsed.data.message)
    return NextResponse.json({ ok: true, ...fallback, mode: 'fallback' })
  }
}
