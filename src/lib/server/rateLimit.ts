/**
 * src/lib/server/rateLimit.ts — Limitador de tasa compartido por las 4 API routes.
 *
 * NOTA DE HONESTIDAD (hallazgo de auditoría): este limitador vive en la memoria
 * de cada instancia serverless. En Vercel, cada cold start o escalado horizontal
 * crea un contador nuevo, por lo que NO es una defensa robusta contra abuso
 * distribuido. Sirve como freno básico por instancia. Para protección real
 * (especialmente del endpoint de Claude, que tiene costo por request) se debe
 * migrar a un store distribuido (Vercel KV / Upstash Redis) o reglas de WAF.
 * Ver TODO abajo.
 */

type Bucket = { count: number; resetAt: number }

const store = new Map<string, Bucket>()
let lastSweep = 0

/** Purga entradas expiradas para que el Map no crezca sin límite. */
function sweep(now: number) {
  if (now - lastSweep < 60_000) return
  lastSweep = now
  for (const [key, bucket] of store) {
    if (bucket.resetAt < now) store.delete(key)
  }
}

/**
 * Devuelve true si la request está permitida.
 * @param key      identificador (normalmente la IP, namespaced por endpoint)
 * @param max      máximo de requests por ventana
 * @param windowMs duración de la ventana en ms (default 60s)
 */
export function rateLimit(key: string, max: number, windowMs = 60_000): boolean {
  const now = Date.now()
  sweep(now)
  const bucket = store.get(key)
  if (!bucket || bucket.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (bucket.count >= max) return false
  bucket.count += 1
  return true
}

/** Extrae la IP del cliente de los headers de la request. */
export function getClientIp(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  )
}

// TODO(infra): rate limiting distribuido con @upstash/ratelimit + Vercel KV
// para que el límite sea efectivo a través de instancias serverless. Añadir
// además un presupuesto/circuit-breaker de tokens para /api/chat.
