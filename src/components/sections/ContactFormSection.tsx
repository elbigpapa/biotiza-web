'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, CheckCircle, Clock, Send } from 'lucide-react'

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
  { value: 'tomate',    label: 'Tomate' },
  { value: 'fresa',     label: 'Fresa' },
  { value: 'arandano',  label: 'Arándano' },
  { value: 'frambuesa', label: 'Frambuesa' },
  { value: 'zarzamora', label: 'Zarzamora' },
  { value: 'aguacate',  label: 'Aguacate' },
  { value: 'chile',     label: 'Chile / Pimiento' },
  { value: 'citricos',  label: 'Cítricos' },
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
    <section className="relative bg-verde-50/50 py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-40" aria-hidden="true" />

      <Container className="relative z-10">
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

            <ul className="mt-10 space-y-5">
              {[
                { icon: Mail,          label: 'Email',     value: 'ventas@biotiza.mx',              href: 'mailto:ventas@biotiza.mx' },
                { icon: Phone,         label: 'WhatsApp',  value: '+52 330 000 0000',               href: 'https://wa.me/523300000000' },
                { icon: MapPin,        label: 'Dirección', value: 'Zapopan, Jalisco, México',       href: '' },
                { icon: InstagramIcon, label: 'Instagram', value: '@biotiza',                       href: 'https://instagram.com/biotiza' },
              ].map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-verde-500 to-verde-600 text-white shadow-sm">
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gris-400">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-sm font-medium text-gris-800 hover:text-verde-600 transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-gris-800">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl bg-white/80 border border-verde-100 p-5 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={15} className="text-verde-600" />
                <p className="text-sm font-semibold text-verde-800">Horario de atención</p>
              </div>
              <p className="text-sm text-gris-600">Lunes a Viernes: 9:00 – 18:00 hrs</p>
              <p className="text-sm text-gris-600">Sábado: 9:00 – 13:00 hrs</p>
              <p className="mt-2 text-xs text-verde-600 font-medium">La Asesora IA responde 24/7</p>
            </div>
          </motion.div>

          {/* ── Columna derecha: formulario ─────────────────────── */}
          <motion.div variants={fadeInRight}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-5 rounded-2xl bg-white p-12 shadow-[0_4px_24px_rgba(15,23,42,0.06)] border border-gris-100 text-center min-h-[400px]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-verde-400 to-verde-600 shadow-brand">
                  <CheckCircle size={32} className="text-white" />
                </div>
                <h3 className="font-serif text-2xl text-gris-900">¡Mensaje enviado!</h3>
                <p className="text-sm text-gris-500 max-w-xs leading-relaxed">
                  Recibimos tu mensaje. Un agrónomo de Biotiza te contactará en menos de 24 horas.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-sm text-verde-600 hover:text-verde-700 font-semibold transition-colors"
                >
                  Enviar otro mensaje →
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex flex-col gap-5 rounded-2xl bg-white p-7 shadow-[0_4px_24px_rgba(15,23,42,0.06)] border border-gris-100 sm:p-9"
              >
                <div className="mb-1">
                  <h3 className="font-serif text-xl text-gris-900">Enviar mensaje</h3>
                  <p className="text-sm text-gris-400 mt-1">Todos los campos marcados * son obligatorios</p>
                </div>

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
                    'btn-primary w-full',
                    isSubmitting && 'opacity-60 cursor-not-allowed',
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Enviar Mensaje
                    </>
                  )}
                </button>

                <p className="text-xs text-gris-400 text-center">
                  Al enviar aceptas nuestra{' '}
                  <a href="/privacidad" className="underline hover:text-verde-600 transition-colors">
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
