import { NextResponse } from 'next/server'
import { rateLimit, getClientIp } from '@/lib/server/rateLimit'
import { leadSchema, segmentLead, deliverLead } from '@/lib/server/leads'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// ─── POST /api/leads ────────────────────────────────────────────────────────
export async function POST(req: Request) {
  const ip = getClientIp(req)

  if (!rateLimit(`leads:${ip}`, 10)) {
    return NextResponse.json({ ok: false, error: 'Demasiadas solicitudes.' }, { status: 429 })
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

  // Honeypot: si el campo oculto viene lleno, es un bot. Respondemos ok para
  // no darle señal, pero no procesamos.
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true })
  }

  const segmented = segmentLead(
    parsed.data,
    ip,
    new Date().toISOString(),
    `${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
  )

  await deliverLead(segmented)

  return NextResponse.json({
    ok: true,
    id: segmented.id,
    priority: segmented.priority,
    assigned_specialist: segmented.assigned_specialist,
  })
}
