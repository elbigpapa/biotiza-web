'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------
const schema = z.object({
  nombre:   z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  cultivo:  z.string().optional(),
  telefono: z.string().min(7, 'Ingresa un número de teléfono válido'),
  website:  z.string().max(0).optional(), // honeypot
})

type FormData = z.infer<typeof schema>

// ---------------------------------------------------------------------------
// Shared styles — dark-background variant
// ---------------------------------------------------------------------------
const labelClass = 'block text-sm font-medium text-white/80 mb-1'
const inputClass =
  'w-full min-h-[44px] rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-verde-400 focus:outline-none focus:ring-2 focus:ring-verde-400/25 transition-colors'
const errorClass = 'text-xs text-naranja-300 mt-1'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function MiniLeadForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    // Honeypot: if filled, silently succeed
    if (data.website && data.website.length > 0) {
      setStatus('success')
      return
    }

    setStatus('submitting')
    setServerError(null)

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          nombre:   data.nombre,
          cultivo:  data.cultivo || undefined,
          telefono: data.telefono,
          fuente:   'home-cta',
          notas:    'Mini-formulario del CTA de la home.',
        }),
      })

      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        setServerError(json?.error ?? 'No pudimos registrar tus datos. Intenta de nuevo.')
        setStatus('error')
        return
      }

      setStatus('success')
    } catch {
      setServerError('Error de red. Por favor intenta de nuevo.')
      setStatus('error')
    }
  }

  // ── Success state ──────────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div className="flex flex-col items-start gap-3 py-6">
        <CheckCircle size={32} className="text-verde-300" />
        <div>
          <p className="font-semibold text-white text-lg leading-snug">
            ¡Listo! Te contactamos pronto.
          </p>
          <p className="text-sm text-white/65 mt-1">
            Un agrónomo de Biotiza se pondrá en contacto contigo en menos de 24 horas hábiles.
          </p>
        </div>
      </div>
    )
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* Honeypot — hidden from real users */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">No llenar</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      {/* Nombre */}
      <div>
        <label htmlFor="mini-nombre" className={labelClass}>
          Tu nombre <span className="text-naranja-400">*</span>
        </label>
        <input
          id="mini-nombre"
          type="text"
          placeholder="Juan García"
          autoComplete="given-name"
          {...register('nombre')}
          className={inputClass}
        />
        {errors.nombre && <p className={errorClass}>{errors.nombre.message}</p>}
      </div>

      {/* Cultivo */}
      <div>
        <label htmlFor="mini-cultivo" className={labelClass}>
          Cultivo principal{' '}
          <span className="text-white/45 font-normal">(opcional)</span>
        </label>
        <input
          id="mini-cultivo"
          type="text"
          placeholder="p. ej. tomate, fresa, aguacate…"
          autoComplete="off"
          {...register('cultivo')}
          className={inputClass}
        />
      </div>

      {/* Teléfono */}
      <div>
        <label htmlFor="mini-telefono" className={labelClass}>
          WhatsApp / Teléfono <span className="text-naranja-400">*</span>
        </label>
        <input
          id="mini-telefono"
          type="tel"
          placeholder="+52 33 1234 5678"
          autoComplete="tel"
          {...register('telefono')}
          className={inputClass}
        />
        {errors.telefono && <p className={errorClass}>{errors.telefono.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full inline-flex items-center justify-center gap-2 min-h-[44px] rounded-lg bg-naranja-500 px-6 py-3 text-sm font-semibold text-white hover:bg-naranja-600 active:bg-naranja-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {status === 'submitting' ? (
          <>
            <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Enviando…
          </>
        ) : (
          <>
            <Send size={15} />
            Quiero que me contacten
          </>
        )}
      </button>

      {/* Server error */}
      {status === 'error' && serverError && (
        <div className="flex items-start gap-2 text-sm text-naranja-300" role="alert">
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          <span>{serverError}</span>
        </div>
      )}

      <p className="text-xs text-white/35 leading-relaxed">
        Sin spam. Solo te contactamos para asesorarte sobre tus cultivos.
      </p>
    </form>
  )
}
