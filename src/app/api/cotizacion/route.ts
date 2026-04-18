import { NextResponse } from 'next/server'
import { z } from 'zod'

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

// ─── Rate limit en memoria ─────────────────────────────────────────────────
const attempts = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 60_000
const MAX = 5

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

// ─── POST /api/cotizacion ─────────────────────────────────────────────────
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

  const parsed = cotizacionSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Datos inválidos.', issues: parsed.error.issues.map((i) => i.message) },
      { status: 422 },
    )
  }

  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true })
  }

  const webhook = process.env.COTIZACION_WEBHOOK_URL
  if (webhook) {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ type: 'cotizacion', ...parsed.data, ip, at: new Date().toISOString() }),
      })
    } catch (err) {
      console.error('[cotizacion] webhook error', err)
    }
  } else if (process.env.NODE_ENV !== 'production') {
    console.log('[cotizacion] received', { ...parsed.data, itemsCount: parsed.data.items.length })
  }

  return NextResponse.json({ ok: true, reference: `COT-${Date.now().toString(36).toUpperCase()}` })
}
