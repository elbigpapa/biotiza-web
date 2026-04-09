'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, CheckCircle } from 'lucide-react'

// Instagram icon (removed from lucide-react v1.7+)
function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from '@/lib/animations'
import SectionHeading from '@/components/ui/SectionHeading'
import { Container } from '@/components/ui/Container'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Textarea from '@/components/ui/Textarea'
import { cn } from '@/lib/utils'

// ─── Validación ───────────────────────────────────────────────────────────

const contactSchema = z.object({
  name:    z.string().min(2, 'Escribe tu nombre completo'),
  email:   z.string().email('Email no válido'),
  phone:   z.string().optional(),
  crop:    z.string().optional(),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
})

type ContactForm = z.infer<typeof contactSchema>

const CROPS = [
  { value: '', label: 'Selecciona tu cultivo (opcional)' },
  { value: 'tomate',    label: '🍅 Tomate' },
  { value: 'fresa',     label: '🍓 Fresa' },
  { value: 'arandano',  label: '🫐 Arándano' },
  { value: 'frambuesa', label: '🍇 Frambuesa' },
  { value: 'zarzamora', label: '🫐 Zarzamora' },
  { value: 'aguacate',  label: '🥑 Aguacate' },
  { value: 'chile',     label: '🌶️ Chile / Pimiento' },
  { value: 'citricos',  label: '🍊 Cítricos' },
  { value: 'otro',      label: 'Otro cultivo' },
]

// ─── Componente ───────────────────────────────────────────────────────────

export default function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactForm) => {
    // TODO: conectar con API route /api/contact
    await new Promise((r) => setTimeout(r, 800))
    console.log('Formulario enviado:', data)
    setSubmitted(true)
  }

  return (
    <section className="bg-verde-50 py-20 lg:py-28">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start"
        >
          {/* ── Columna izquierda: info ─────────────────────────── */}
          <motion.div variants={fadeInLeft}>
            <SectionHeading
              title="Contáctanos"
              subtitle="Cuéntanos sobre tu cultivo y te asignamos un agrónomo especializado sin costo."
              align="left"
              animate={false}
            />

            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-verde-100 text-verde-600">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gris-500">Email</p>
                  <a href="mailto:ventas@biotiza.mx" className="text-sm font-medium text-gris-800 hover:text-verde-600 transition-colors">
                    ventas@biotiza.mx
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-verde-100 text-verde-600">
                  <Phone size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gris-500">WhatsApp</p>
                  <a
                    href="https://wa.me/523300000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-gris-800 hover:text-verde-600 transition-colors"
                  >
                    +52 330 000 0000
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-verde-100 text-verde-600">
                  <MapPin size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gris-500">Dirección</p>
                  <p className="text-sm font-medium text-gris-800">Zapopan, Jalisco, México</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-verde-100 text-verde-600">
                  <InstagramIcon size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gris-500">Instagram</p>
                  <a
                    href="https://instagram.com/biotiza"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-gris-800 hover:text-verde-600 transition-colors"
                  >
                    @biotiza
                  </a>
                </div>
              </li>
            </ul>

            <div className="mt-6 rounded-xl bg-verde-100/60 p-4 text-sm">
              <p className="font-semibold text-verde-800">⏰ Horario de atención</p>
              <p className="mt-1 text-verde-700">Lunes a Viernes: 9:00 – 18:00 hrs</p>
              <p className="text-verde-700">Sábado: 9:00 – 13:00 hrs</p>
              <p className="mt-2 text-xs text-verde-600">La Asesora IA responde 24/7</p>
            </div>
          </motion.div>

          {/* ── Columna derecha: formulario ─────────────────────── */}
          <motion.div variants={fadeInRight}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-white p-10 shadow-card text-center min-h-[360px]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-verde-100">
                  <CheckCircle size={32} className="text-verde-600" />
                </div>
                <h3 className="font-serif text-2xl text-gris-900">¡Mensaje enviado!</h3>
                <p className="text-sm text-gris-600 max-w-xs">
                  Recibimos tu mensaje. Un agrónomo de Biotiza te contactará en menos de 24 horas.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-sm text-verde-600 hover:text-verde-700 font-medium"
                >
                  Enviar otro mensaje →
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex flex-col gap-5 rounded-2xl bg-white p-6 shadow-card sm:p-8"
              >
                <h3 className="font-serif text-xl text-gris-900">Enviar mensaje</h3>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Nombre"
                    placeholder="Tu nombre completo"
                    required
                    error={errors.name}
                    {...register('name')}
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="tu@correo.mx"
                    required
                    error={errors.email}
                    {...register('email')}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Teléfono"
                    type="tel"
                    placeholder="+52 33 0000 0000"
                    error={errors.phone}
                    {...register('phone')}
                  />
                  <Select
                    label="Cultivo"
                    error={errors.crop}
                    {...register('crop')}
                  >
                    {CROPS.map(({ value, label }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </Select>
                </div>

                <Textarea
                  label="Mensaje"
                  placeholder="Cuéntanos sobre tu cultivo, el problema que tienes o qué tipo de asesoría necesitas..."
                  rows={4}
                  required
                  error={errors.message}
                  {...register('message')}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    'inline-flex items-center justify-center gap-2',
                    'rounded-lg bg-verde-500 py-3 px-6',
                    'text-sm font-semibold text-white',
                    'hover:bg-verde-600 disabled:opacity-60',
                    'transition-all duration-200 active:scale-[0.98]',
                    'shadow-brand',
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Enviando...
                    </>
                  ) : 'Enviar Mensaje'}
                </button>

                <p className="text-xs text-gris-400 text-center">
                  Al enviar aceptas nuestra{' '}
                  <a href="/privacidad" className="underline hover:text-verde-600">
                    Política de Privacidad
                  </a>
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
