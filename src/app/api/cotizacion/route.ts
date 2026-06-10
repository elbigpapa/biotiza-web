import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, getClientIp } from '@/lib/server/rateLimit'
import { segmentLead, deliverLead, type Lead } from '@/lib/server/leads'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// ─── Schema ────────────────────────────────────────────────────────────────
const itemSchema = z.object({
  productId: z.string().min(1).max(60),
  name:      z.string().min(1).max(120),
  line:      z.string().min(1).max(40),
  quantity:  z.number().int().min(1).max(9999),
  unit:      z.string().max(20).optional(),
})

// La cotización lleva un carrito (items) y campos propios que no existen en el
// leadSchema canónico → schema local + mapeo a Lead para segmentar/entregar.
const cotizacionSchema = z.object({
  nombre:     z.string().min(2).max(80),
  empresa:    z.string().max(120).optional(),
  email:      z.string().email().max(120),
  telefono:   z.string().min(7).max(30),
  estado:     z.string().max(40).optional(),
  cultivo:    z.string().max(60).optional(),
  superficie: z.string().max(40).optional(),
  comentarios: z.string().max(2000).optional(),
  items:      z.array(itemSchema).min(0).max(60),
  website:    z.string().max(0).optional(), // honeypot
})

type CotizacionData = z.infer<typeof cotizacionSchema>

// Mapea la cotización al Lead canónico. El carrito y la superficie se resumen
// en notas para que el CRM conserve el contexto sin perder la segmentación.
function cotizacionToLead(data: CotizacionData): Lead {
  const itemsResumen = data.items.length
    ? data.items.map((i) => `${i.quantity}× ${i.name} (${i.line})`).join('; ')
    : 'sin productos en carrito'
  const notas = [
    data.superficie ? `Superficie: ${data.superficie}` : null,
    `Productos: ${itemsResumen}`,
    data.comentarios ? `Comentarios: ${data.comentarios}` : null,
  ]
    .filter(Boolean)
    .join(' | ')

  return {
    nombre:   data.nombre,
    empresa:  data.empresa,
    email:    data.email,
    telefono: data.telefono,
    estado:   data.estado,
    cultivo:  data.cultivo,
    tipo_interes: 'cotizacion',
    fuente:   'cotizacion',
    notas,
  }
}

// ─── POST /api/cotizacion ─────────────────────────────────────────────────
export async function POST(req: Request) {
  const ip = getClientIp(req)

  if (!rateLimit(`cotizacion:${ip}`, 5)) {
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

  const parsed = cotizacionSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Datos inválidos.', issues: parsed.error.issues.map((i) => i.message) },
      { status: 422 },
    )
  }

  // Honeypot: bot detectado → ok sin procesar.
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true })
  }

  const reference = `COT-${Date.now().toString(36).toUpperCase()}`

  // Segmentamos y entregamos vía la infra compartida. deliverLead registra en
  // logs cuando no hay webhook configurado (no se pierde la cotización).
  const segmented = segmentLead(
    cotizacionToLead(parsed.data),
    ip,
    new Date().toISOString(),
    `${reference}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
  )

  const { delivered, reason } = await deliverLead(segmented)
  if (!delivered) {
    console.warn('[cotizacion] lead no entregado al CRM', { id: segmented.id, reference, reason })
  }

  return NextResponse.json({ ok: true, reference })
}
