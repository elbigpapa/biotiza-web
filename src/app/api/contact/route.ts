import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, getClientIp } from '@/lib/server/rateLimit'
import { segmentLead, deliverLead, type Lead } from '@/lib/server/leads'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// ─── Schema de validación ──────────────────────────────────────────────────
// El formulario de contacto tiene campos propios (asunto, mensaje) que no
// existen en el leadSchema canónico, así que mantenemos un schema local y
// mapeamos a Lead para la segmentación/persistencia compartida.
const contactSchema = z.object({
  nombre:   z.string().min(2).max(80),
  email:    z.string().email().max(120),
  telefono: z.string().max(30).optional(),
  asunto:   z.enum(['información', 'cotización', 'soporte técnico', 'distribución', 'otro']).optional().default('información'),
  cultivo:  z.string().max(60).optional(),
  mensaje:  z.string().min(10).max(2000),
  // Honeypot anti-bot: el form debe renderizar un input oculto llamado "website".
  website:  z.string().max(0).optional(),
})

type ContactData = z.infer<typeof contactSchema>

// Mapea el contacto al Lead canónico para reutilizar segmentación/entrega.
function contactToLead(data: ContactData): Lead {
  return {
    nombre:   data.nombre,
    email:    data.email,
    telefono: data.telefono,
    cultivo:  data.cultivo,
    tipo_interes: data.asunto === 'cotización' ? 'cotizacion' : 'otro',
    fuente:   'formulario-contacto',
    notas:    `[Asunto: ${data.asunto}] ${data.mensaje}`,
  }
}

// ─── POST /api/contact ────────────────────────────────────────────────────
export async function POST(req: Request) {
  const ip = getClientIp(req)

  if (!rateLimit(`contact:${ip}`, 5)) {
    return NextResponse.json(
      { ok: false, error: 'Demasiadas solicitudes. Intenta en un minuto.' },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'JSON inválido.' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Datos inválidos.', issues: parsed.error.issues.map((i) => i.message) },
      { status: 422 },
    )
  }

  // Honeypot: si llega relleno, es un bot. Respondemos ok para no darle señal,
  // pero descartamos sin procesar.
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true })
  }

  // Segmentamos y entregamos vía la infra compartida. deliverLead registra en
  // logs cuando no hay webhook configurado (no se pierde el lead en silencio).
  const segmented = segmentLead(
    contactToLead(parsed.data),
    ip,
    new Date().toISOString(),
    `${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
  )

  const { delivered, reason } = await deliverLead(segmented)
  if (!delivered) {
    // No exponemos la falla del backend al usuario, pero la dejamos en logs.
    console.warn('[contact] lead no entregado al CRM', { id: segmented.id, reason })
  }

  return NextResponse.json({ ok: true })
}
