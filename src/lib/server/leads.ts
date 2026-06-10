/**
 * src/lib/server/leads.ts — Lógica de CRM compartida.
 *
 * Fuente única de verdad para la segmentación de prospectos. La usan tanto
 * /api/leads (formularios) como /api/chat (Asesora IA), de modo que un lead
 * capturado en el chat reciba la MISMA prioridad y especialista que uno de
 * formulario (antes el chat los persistía sin segmentar — hallazgo de auditoría).
 */

import { z } from 'zod'

// ─── Schema canónico del lead ──────────────────────────────────────────────
export const leadSchema = z.object({
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
  fuente:    z.enum(['chat', 'formulario-contacto', 'cotizacion', 'manual', 'academia', 'casa-jardin', 'newsletter', 'home-cta']).default('manual'),
  notas:     z.string().max(2000).optional(),

  // Honeypot
  website:   z.string().max(0).optional(),
})

export type Lead = z.infer<typeof leadSchema>

// ─── Segmentación automática (score de prioridad) ──────────────────────────
export function computePriority(lead: Lead): 'alta' | 'media' | 'baja' {
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

export function suggestSpecialist(lead: Lead): string {
  const c = (lead.cultivo ?? '').toLowerCase()
  if (/tomate|chile|pepino|berenjena/.test(c)) return 'Especialista solanáceas'
  if (/fresa|arándano|frambuesa|zarzamora|arandano/.test(c)) return 'Especialista berries'
  if (/aguacate|cítricos|citricos|mango/.test(c)) return 'Especialista frutales'
  if (/apio|brócoli|brocoli|lechuga|col/.test(c)) return 'Especialista hortalizas de hoja'
  if (/maíz|maiz|frijol|sorgo|trigo/.test(c)) return 'Especialista granos'
  if (/caña|cana/.test(c)) return 'Especialista industriales'
  return 'Agrónomo general'
}

export interface SegmentedLead extends Lead {
  priority: 'alta' | 'media' | 'baja'
  assigned_specialist: string
  capturedAt: string
  ip: string
  id: string
}

/** Construye el payload segmentado con id estable. */
export function segmentLead(lead: Lead, ip: string, nowIso: string, idSuffix: string): SegmentedLead {
  return {
    ...lead,
    priority: computePriority(lead),
    assigned_specialist: suggestSpecialist(lead),
    capturedAt: nowIso,
    ip,
    id: `LEAD-${idSuffix}`,
  }
}

/**
 * Persiste el lead al webhook del CRM (si está configurado) con timeout.
 * Devuelve true si se entregó al webhook, false si solo se registró en dev
 * o si falló la entrega. NUNCA reporta éxito falso al usuario: el llamador
 * decide qué comunicar según este resultado.
 */
export async function deliverLead(payload: SegmentedLead): Promise<{ delivered: boolean; reason?: string }> {
  const webhook = process.env.LEADS_WEBHOOK_URL ?? process.env.CONTACT_WEBHOOK_URL
  if (!webhook) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[leads] received (sin webhook configurado)', payload)
      return { delivered: false, reason: 'no-webhook-dev' }
    }
    // En producción sin webhook: registramos para no perder el lead en logs.
    console.warn('[leads] LEADS_WEBHOOK_URL no configurado — lead solo en logs', { id: payload.id, priority: payload.priority })
    return { delivered: false, reason: 'no-webhook-prod' }
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)
  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ type: 'lead', ...payload }),
      signal: controller.signal,
    })
    return { delivered: res.ok, reason: res.ok ? undefined : `webhook-status-${res.status}` }
  } catch (err) {
    console.error('[leads] webhook error', err)
    return { delivered: false, reason: 'webhook-error' }
  } finally {
    clearTimeout(timeout)
  }
}
