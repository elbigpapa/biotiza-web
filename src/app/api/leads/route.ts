import { NextResponse } from 'next/server'
import { z } from 'zod'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// ─── Schema ────────────────────────────────────────────────────────────────
const leadSchema = z.object({
  // Identidad
  nombre:    z.string().min(2).max(80).optional(),
  email:     z.string().email().max(120).optional(),
  telefono:  z.string().max(30).optional(),
  empresa:   z.string().max(120).optional(),

  // Segmentación geográfica y agrícola
  estado:    z.string().max(40).optional(),
  ciudad:    z.string().max(60).optional(),
  cultivo:   z.string().max(60).optional(),
  hectareas: z.number().min(0).max(100000).optional(),
  etapa:     z.string().max(60).optional(),

  // Intención
  tipo_interes: z.enum(['nutricion', 'bioestimulacion', 'bioproteccion', 'programa_integral', 'cotizacion', 'otro']).optional(),
  presupuesto:  z.enum(['<5k', '5k-25k', '25k-100k', '>100k', 'sin-definir']).optional(),
  urgencia:     z.enum(['inmediata', 'esta-semana', 'este-mes', 'proximos-meses']).optional(),

  // Meta
  fuente:    z.enum(['chat', 'formulario-contacto', 'cotizacion', 'manual', 'academia', 'casa-jardin']).default('manual'),
  notas:     z.string().max(2000).optional(),

  // Honeypot
  website:   z.string().max(0).optional(),
})

// ─── Rate limit en memoria ─────────────────────────────────────────────────
const attempts = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 60_000
const MAX = 10

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

// ─── Segmentación automática (score de prioridad) ──────────────────────────
function computePriority(lead: z.infer<typeof leadSchema>): 'alta' | 'media' | 'baja' {
  let score = 0
  if (lead.hectareas && lead.hectareas >= 20) score += 3
  else if (lead.hectareas && lead.hectareas >= 5) score += 2
  else if (lead.hectareas) score += 1

  if (lead.urgencia === 'inmediata') score += 3
  else if (lead.urgencia === 'esta-semana') score += 2
  else if (lead.urgencia === 'este-mes') score += 1

  if (lead.presupuesto === '>100k') score += 3
  else if (lead.presupuesto === '25k-100k') score += 2
  else if (lead.presupuesto === '5k-25k') score += 1

  if (lead.email && lead.telefono) score += 2
  else if (lead.email || lead.telefono) score += 1

  if (lead.tipo_interes === 'cotizacion') score += 2
  else if (lead.tipo_interes === 'programa_integral') score += 2

  if (score >= 7) return 'alta'
  if (score >= 4) return 'media'
  return 'baja'
}

function suggestSpecialist(lead: z.infer<typeof leadSchema>): string {
  const c = (lead.cultivo ?? '').toLowerCase()
  if (/tomate|chile|pepino|berenjena/.test(c)) return 'Especialista solanáceas'
  if (/fresa|arándano|frambuesa|zarzamora|arandano/.test(c)) return 'Especialista berries'
  if (/aguacate|cítricos|citricos|mango/.test(c)) return 'Especialista frutales'
  if (/apio|brócoli|brocoli|lechuga|col/.test(c)) return 'Especialista hortalizas de hoja'
  if (/maíz|maiz|frijol|sorgo|trigo/.test(c)) return 'Especialista granos'
  if (/caña|cana/.test(c)) return 'Especialista industriales'
  return 'Agrónomo general'
}

// ─── POST /api/leads ────────────────────────────────────────────────────────
export async function POST(req: Request) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Demasiadas solicitudes.' },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'JSON inválido.' }, { status: 400 })
  }

  const parsed = leadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Datos inválidos.', issues: parsed.error.issues.map((i) => i.message) },
      { status: 422 },
    )
  }

  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true })
  }

  const priority = computePriority(parsed.data)
  const specialist = suggestSpecialist(parsed.data)

  const payload = {
    ...parsed.data,
    priority,
    assigned_specialist: specialist,
    capturedAt: new Date().toISOString(),
    ip,
    id: `LEAD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
  }

  const webhook = process.env.LEADS_WEBHOOK_URL ?? process.env.CONTACT_WEBHOOK_URL
  if (webhook) {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ type: 'lead', ...payload }),
      })
    } catch (err) {
      console.error('[leads] webhook error', err)
    }
  } else if (process.env.NODE_ENV !== 'production') {
    console.log('[leads] received', payload)
  }

  return NextResponse.json({
    ok: true,
    id: payload.id,
    priority,
    assigned_specialist: specialist,
  })
}
