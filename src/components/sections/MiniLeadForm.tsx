'use client'

/**
 * MiniLeadForm — mini formulario del CTA de la home.
 *
 * Al enviar, abre WhatsApp con el mensaje pre-llenado para que llegue
 * directo al celular del equipo de Biotiza. No requiere webhook ni CRM.
 */

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MessageCircle, CheckCircle } from 'lucide-react'
import { track } from '@vercel/analytics'
import { whatsappLink } from '@/lib/utils'

const schema = z.object({
  nombre:   z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  cultivo:  z.string().optional(),
  telefono: z.string().min(7, 'Ingresa un número de teléfono válido'),
  website:  z.string().max(0).optional(), // honeypot
})

type FormData = z.infer<typeof schema>

const labelClass = 'block text-sm font-medium text-white/80 mb-1'
const inputClass =
  'w-full min-h-[44px] rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-verde-400 focus:outline-none focus:ring-2 focus:ring-verde-400/25 transition-colors'
const errorClass = 'text-xs text-naranja-300 mt-1'

export default function MiniLeadForm() {
  const [submitted, setSubmitted] = useState(false)
  const [waUrl, setWaUrl] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = (data: FormData) => {
    // Honeypot: si está lleno (bot), simulamos éxito sin abrir WhatsApp.
    if (data.website && data.website.length > 0) {
      setSubmitted(true)
      return
    }

    const lines = [
      'Hola Biotiza, vi su sitio y quiero que me contacten para asesoría.',
      '',
      `Nombre: ${data.nombre}`,
      data.cultivo ? `Cultivo principal: ${data.cultivo}` : null,
      `Teléfono / WhatsApp: ${data.telefono}`,
      '',
      '(Enviado desde el formulario de la home de biotiza.mx)',
    ].filter(Boolean) as string[]

    const url = whatsappLink(lines.join('\n'))
    track('form_submitted', { source: 'home-cta' })
    window.open(url, '_blank', 'noopener,noreferrer')
    setWaUrl(url)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-3 py-6">
        <CheckCircle size={32} className="text-verde-300" />
        <div>
          <p className="font-semibold text-white text-lg leading-snug">
            ¡Listo! Te abrimos WhatsApp.
          </p>
          <p className="text-sm text-white/65 mt-1">
            Solo dale &ldquo;Enviar&rdquo; en tu app para que recibamos tu
            mensaje. Te respondemos en menos de 24 h hábiles.
          </p>
          {waUrl && (
            <p className="text-xs text-white/45 mt-3">
              ¿No se abrió WhatsApp?{' '}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-verde-300 underline underline-offset-2"
              >
                Ábrelo manualmente
              </a>
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* Honeypot — oculto para usuarios reales */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">No llenar</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

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

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2 min-h-[44px] rounded-lg bg-naranja-500 px-6 py-3 text-sm font-semibold text-white hover:bg-naranja-600 active:bg-naranja-700 transition-colors"
      >
        <MessageCircle size={16} />
        Enviar por WhatsApp
      </button>

      <p className="text-xs text-white/35 leading-relaxed">
        Te abrimos WhatsApp con tu mensaje listo — solo dale &ldquo;Enviar&rdquo;.
      </p>
    </form>
  )
}
