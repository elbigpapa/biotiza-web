'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
} from 'lucide-react'

// Instagram icon (removed from lucide-react v1.7+)
function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'

// ---------------------------------------------------------------------------
// Zod schema
// ---------------------------------------------------------------------------
const schema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Ingresa un correo electrónico válido'),
  telefono: z.string().optional(),
  asunto: z.enum([
    'información',
    'cotización',
    'soporte técnico',
    'distribución',
    'otro',
  ]),
  mensaje: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
})

type FormData = z.infer<typeof schema>

// ---------------------------------------------------------------------------
// Shared input class
// ---------------------------------------------------------------------------
const inputClass =
  'border border-gris-200 rounded-lg px-4 py-3 text-sm w-full min-h-[44px] focus:border-verde-400 focus:outline-none focus:ring-2 focus:ring-verde-500/20 transition-colors bg-white'
const errorClass = 'text-xs text-red-500 mt-1'
const labelClass = 'block text-sm font-medium text-gris-700 mb-1'

// ---------------------------------------------------------------------------
// Contact info cards data
// ---------------------------------------------------------------------------
const contactItems = [
  {
    icon: Mail,
    label: 'Correo electrónico',
    value: 'ventas@biotiza.mx',
    href: 'mailto:ventas@biotiza.mx',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp / Llamadas',
    value: '+52 33 1602 2708',
    href: 'https://wa.me/523316022708',
  },
  {
    icon: MapPin,
    label: 'Ubicación',
    value: 'Carretera Cd. Guzmán - Zapotiltic KM 8, 49000 Zapotiltic, Jal.',
    href: null,
  },
  {
    icon: Clock,
    label: 'Horario de atención',
    value: 'Lun-Vie 9:00–18:00 · Sáb 9:00–13:00',
    href: null,
  },
]

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default function ContactoPage() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      asunto: 'información',
    },
  })

  const onSubmit = async (data: FormData) => {
    setServerError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        setServerError(json?.error ?? 'No pudimos enviar tu mensaje.')
        return
      }
      setSubmitted(true)
    } catch {
      setServerError('Error de red. Intenta de nuevo.')
    }
  }

  return (
    <main>
      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-gradient-to-br from-verde-900 to-verde-700 py-16">
        <Container>
          <SectionHeading
            tag="Estamos para servirte"
            title="Contacto"
            subtitle="Nuestro equipo agronómico responde en menos de 24 horas hábiles. Para urgencias usa WhatsApp."
            align="center"
            animate={false}
            theme="dark"
          />
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Main content                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-12 lg:py-16">
        <Container>
          <div className="grid lg:grid-cols-[1fr_480px] gap-12 lg:gap-16">

            {/* -------------------------------------------------------------- */}
            {/* Left column — Info + map                                        */}
            {/* -------------------------------------------------------------- */}
            <div>
              {/* Contact info cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {contactItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.label}
                      className="flex items-start gap-4 rounded-xl border border-gris-100 bg-white p-4 shadow-sm"
                    >
                      <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-verde-50">
                        <Icon size={20} className="text-verde-500" />
                      </span>
                      <div>
                        <p className="text-xs font-medium text-gris-500 uppercase tracking-wider mb-0.5">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith('http') ? '_blank' : undefined}
                            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-sm font-semibold text-gris-800 hover:text-verde-600 transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-semibold text-gris-800">{item.value}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Social media row */}
              <div className="mt-6 flex items-center gap-3">
                <span className="text-sm text-gris-500">Síguenos:</span>
                <a
                  href="https://www.instagram.com/biotiza.mx/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-gris-200 px-4 py-1.5 text-sm font-medium text-gris-700 hover:border-verde-400 hover:text-verde-600 transition-colors"
                >
                  <InstagramIcon size={16} />
                  @biotiza
                </a>
              </div>

              {/* Mapa de ubicación — embebido */}
              <div className="mt-6 rounded-2xl overflow-hidden border border-gris-200 bg-gris-100">
                <iframe
                  title="Ubicación de Biotiza en Zapotiltic, Jalisco, México"
                  src="https://www.google.com/maps?q=19.6538185,-103.4744823&z=16&output=embed"
                  width="100%"
                  height="240"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block w-full"
                  style={{ border: 0 }}
                />
                <div className="flex items-center justify-between gap-3 bg-white px-4 py-3 border-t border-gris-200">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-gris-700">
                    <MapPin size={16} className="text-verde-500" />
                    Carretera Cd. Guzmán - Zapotiltic KM 8, 49000 Zapotiltic, Jal.
                  </span>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=19.6538185,-103.4744823"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-verde-600 hover:text-verde-700 transition-colors"
                  >
                    Cómo llegar →
                  </a>
                </div>
              </div>

              {/* Trabaja con nosotros */}
              <div id="trabaja" className="mt-8 rounded-xl bg-verde-50 border border-verde-100 p-5">
                <p className="text-sm font-semibold text-verde-800 mb-1">
                  ¿Eres agrónomo o representante?
                </p>
                <p className="text-sm text-gris-600">
                  Siempre estamos buscando talento comprometido con el campo mexicano. Escríbenos a{' '}
                  <a
                    href="mailto:reclutamiento@biotiza.mx"
                    className="font-medium text-verde-700 hover:underline"
                  >
                    reclutamiento@biotiza.mx
                  </a>
                </p>
              </div>
            </div>

            {/* -------------------------------------------------------------- */}
            {/* Right column — Form                                             */}
            {/* -------------------------------------------------------------- */}
            <div className="rounded-2xl border border-gris-100 bg-white p-6 lg:p-8 shadow-sm">
              <h2 className="font-serif text-2xl text-gris-900 mb-6">
                Envíanos un mensaje
              </h2>

              {submitted ? (
                /* Success state */
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <CheckCircle size={48} className="text-verde-500" />
                  <div>
                    <p className="font-serif text-xl text-gris-900 mb-2">¡Mensaje enviado!</p>
                    <p className="text-sm text-gris-500">
                      Te responderemos a tu correo en menos de 24 horas hábiles.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                  {/* Nombre */}
                  <div>
                    <label htmlFor="nombre" className={labelClass}>
                      Nombre completo <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="nombre"
                      type="text"
                      placeholder="Juan García"
                      {...register('nombre')}
                      className={inputClass}
                    />
                    {errors.nombre && (
                      <p className={errorClass}>{errors.nombre.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Correo electrónico <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="juan@ejemplo.com"
                      {...register('email')}
                      className={inputClass}
                    />
                    {errors.email && (
                      <p className={errorClass}>{errors.email.message}</p>
                    )}
                  </div>

                  {/* Telefono */}
                  <div>
                    <label htmlFor="telefono" className={labelClass}>
                      Teléfono{' '}
                      <span className="text-gris-400 font-normal">(opcional)</span>
                    </label>
                    <input
                      id="telefono"
                      type="tel"
                      placeholder="+52 33 1234 5678"
                      {...register('telefono')}
                      className={inputClass}
                    />
                  </div>

                  {/* Asunto */}
                  <div>
                    <label htmlFor="asunto" className={labelClass}>
                      Asunto <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="asunto"
                      {...register('asunto')}
                      className={inputClass}
                    >
                      <option value="información">Información general</option>
                      <option value="cotización">Solicitud de cotización</option>
                      <option value="soporte técnico">Soporte técnico</option>
                      <option value="distribución">Distribución</option>
                      <option value="otro">Otro</option>
                    </select>
                    {errors.asunto && (
                      <p className={errorClass}>{errors.asunto.message}</p>
                    )}
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label htmlFor="mensaje" className={labelClass}>
                      Mensaje <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="mensaje"
                      rows={5}
                      placeholder="Cuéntanos en qué podemos ayudarte..."
                      {...register('mensaje')}
                      className={`${inputClass} resize-none`}
                    />
                    {errors.mensaje && (
                      <p className={errorClass}>{errors.mensaje.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-verde-500 px-6 py-3 text-sm font-semibold text-white hover:bg-verde-600 active:bg-verde-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Enviar mensaje
                      </>
                    )}
                  </button>

                  {serverError && (
                    <p className="text-center text-sm text-red-500" role="alert">
                      {serverError}
                    </p>
                  )}
                </form>
              )}
            </div>

          </div>
        </Container>
      </section>
    </main>
  )
}
