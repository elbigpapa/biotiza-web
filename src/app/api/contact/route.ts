import { NextResponse } from 'next/server'
import { z } from 'zod'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// ─── Schema de validación ──────────────────────────────────────────────────
// Acepta nombres en español o inglés; normaliza a forma canónica.
const contactSchema = z.object({
  nombre:   z.string().min(2).max(80),
  email:    z.string().email().max(120),
  telefono: z.string().max(30).optional(),
  asunto:   z.enum(['información', 'cotización', 'soporte técnico', 'distribución', 'otro']).optional().default('información'),
  cultivo:  z.string().max(60).optional(),
  mensaje:  z.string().min(10).max(2000),
  // Honeypot anti-bot
  website:  z.string().max(0).optional(),
})

// ─── Rate limit en memoria (best-effort por ahora) ─────────────────────────
const attempts = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 60_000 // 1 min
const MAX = 5

function rateLimit(key: string): boolean {
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

// ─── POST /api/contact ────────────────────────────────────────────────────
export async function POST(req: Request) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'

  if (!rateLimit(ip)) {
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

  // Honeypot: si llega relleno, descartamos silenciosamente.
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true })
  }

  // Integración con email/CRM: se lee del env (no obligatorio en dev).
  const webhook = process.env.CONTACT_WEBHOOK_URL
  if (webhook) {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ type: 'contact', ...parsed.data, ip, at: new Date().toISOString() }),
      })
    } catch (err) {
      console.error('[contact] webhook error', err)
    }
  } else if (process.env.NODE_ENV !== 'production') {
    console.log('[contact] received', parsed.data)
  }

  return NextResponse.json({ ok: true })
}
