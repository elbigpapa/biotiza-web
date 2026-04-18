'use client'

/**
 * cotizacion/page.tsx — Página de solicitud de cotización
 *
 * Layout: dos columnas en lg (formulario | resumen de carrito sticky)
 * El componente raíz envuelve todo en <QuotationCartProvider> para que
 * useQuotationCart funcione correctamente en esta página standalone.
 */

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  Send,
  CheckCircle,
  ArrowLeft,
  Package,
} from 'lucide-react'
import { QuotationCartProvider, useQuotationCart } from '@/hooks/useQuotationCart'
import { CONTACT_INFO, PRODUCT_LINES } from '@/data/constants'
import Container from '@/components/ui/Container'
import Badge from '@/components/ui/Badge'
import type { ProductLine } from '@/types'

// ─── Schema de validación ─────────────────────────────────────────────────────

const schema = z.object({
  nombre:       z.string().min(2, 'Nombre requerido'),
  empresa:      z.string().optional(),
  email:        z.string().email('Email inválido'),
  telefono:     z.string().min(10, 'Teléfono de 10 dígitos').max(15),
  cultivo:      z.string().optional(),
  superficie:   z.string().optional(),
  estado:       z.string().min(1, 'Selecciona tu estado'),
  comentarios:  z.string().optional(),
})

type FormData = z.infer<typeof schema>

// ─── Estados mexicanos ────────────────────────────────────────────────────────

const MEXICAN_STATES = [
  'Aguascalientes',
  'Baja California',
  'Baja California Sur',
  'Campeche',
  'Chiapas',
  'Chihuahua',
  'Ciudad de México',
  'Coahuila',
  'Colima',
  'Durango',
  'Guanajuato',
  'Guerrero',
  'Hidalgo',
  'Jalisco',
  'México',
  'Michoacán',
  'Morelos',
  'Nayarit',
  'Nuevo León',
  'Oaxaca',
  'Puebla',
  'Querétaro',
  'Quintana Roo',
  'San Luis Potosí',
  'Sinaloa',
  'Sonora',
  'Tabasco',
  'Tamaulipas',
  'Tlaxcala',
  'Veracruz',
  'Yucatán',
  'Zacatecas',
]

// ─── Estilos de campo ────────────────────────────────────────────────────────

const inputClass =
  'border border-gris-200 rounded-lg px-4 py-2.5 text-sm focus:border-verde-400 focus:outline-none focus:ring-2 focus:ring-verde-500/20 w-full bg-white text-gris-900 placeholder:text-gris-400'

const labelClass = 'block text-sm font-medium text-gris-700 mb-1'

const errorClass = 'mt-1 text-xs text-red-500'

// ─── Componente interno (usa el hook ya con Provider activo) ──────────────────

function QuotationPageContent() {
  const { items, removeItem, updateQuantity, clearCart, totalItems } =
    useQuotationCart()
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [reference, setReference] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  // ── Submit ─────────────────────────────────────────────────────────────────

  const onSubmit = async (data: FormData) => {
    setServerError(null)
    try {
      const res = await fetch('/api/cotizacion', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...data,
          items: items.map((i) => ({
            productId: i.productId,
            name: i.productName,
            line: i.productLine,
            quantity: i.quantity,
            unit: i.unit,
          })),
        }),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        setServerError(json?.error ?? 'No pudimos enviar tu cotización.')
        return
      }
      const json = await res.json()
      if (json?.reference) setReference(json.reference)
      setSubmitted(true)
      clearCart()
    } catch {
      setServerError('Error de red. Intenta de nuevo.')
    }
  }

  // ── Mensaje de WhatsApp pre-llenado ────────────────────────────────────────

  const buildWhatsAppMessage = () => {
    if (items.length === 0) {
      return encodeURIComponent(
        'Hola, me gustaría recibir información sobre los productos de Biotiza.',
      )
    }
    const productList = items
      .map((i) => `• ${i.productName}: ${i.quantity} ${i.unit}`)
      .join('\n')
    return encodeURIComponent(
      `Hola, quisiera cotizar los siguientes productos de Biotiza:\n\n${productList}\n\nQuedo en espera de su respuesta.`,
    )
  }

  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${buildWhatsAppMessage()}`

  // ── Estado de éxito ────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center py-20">
        <div className="mx-auto max-w-lg text-center">
          <div className="mb-6 flex justify-center">
            <CheckCircle className="h-20 w-20 text-verde-500" strokeWidth={1.5} />
          </div>
          <h1 className="font-serif text-3xl font-bold text-gris-900 mb-3">
            ¡Cotización enviada exitosamente!
          </h1>
          <p className="text-gris-600 mb-2 text-base">
            Nuestro equipo se pondrá en contacto contigo en menos de 24 horas
            hábiles.
          </p>
          <p className="text-gris-500 text-sm mb-3">
            También puedes escribirnos directamente por WhatsApp para una
            respuesta inmediata.
          </p>
          {reference && (
            <p className="mb-6 inline-block rounded-lg bg-verde-50 px-4 py-2 text-xs font-mono font-semibold text-verde-700">
              Folio: {reference}
            </p>
          )}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#25d366] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1ebe5c] transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              Escribir por WhatsApp
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg border border-gris-200 px-5 py-2.5 text-sm font-semibold text-gris-700 hover:bg-gris-50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ── Layout principal ───────────────────────────────────────────────────────

  return (
    <>
      {/* Breadcrumb */}
      <nav className="border-b border-gris-100 bg-gris-50 py-3">
        <Container>
          <ol className="flex items-center gap-2 text-xs text-gris-500">
            <li>
              <Link href="/" className="hover:text-verde-600 transition-colors">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true" className="select-none">
              /
            </li>
            <li className="text-gris-800 font-medium">Cotización</li>
          </ol>
        </Container>
      </nav>

      {/* Contenido principal */}
      <Container className="py-10">
        <div className="lg:grid lg:grid-cols-[1fr_420px] lg:gap-12 xl:gap-16">
          {/* ── Columna izquierda: formulario ─────────────────────────── */}
          <div>
            {/* Encabezado */}
            <div className="mb-8">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-verde-100">
                  <ShoppingCart className="h-5 w-5 text-verde-600" />
                </div>
                <h1 className="font-serif text-3xl font-bold text-gris-900">
                  Solicitar Cotización
                </h1>
              </div>
              <p className="text-gris-500 text-sm leading-relaxed">
                Completa tus datos y nuestro equipo te responde en menos de 24
                horas.
              </p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              {/* Fila 1: nombre + empresa */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nombre" className={labelClass}>
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    autoComplete="given-name"
                    placeholder="Juan García"
                    {...register('nombre')}
                    className={inputClass}
                  />
                  {errors.nombre && (
                    <p className={errorClass}>{errors.nombre.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="empresa" className={labelClass}>
                    Empresa
                  </label>
                  <input
                    id="empresa"
                    type="text"
                    autoComplete="organization"
                    placeholder="Agrícola del Valle"
                    {...register('empresa')}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Fila 2: email + teléfono */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="juan@ejemplo.com"
                    {...register('email')}
                    className={inputClass}
                  />
                  {errors.email && (
                    <p className={errorClass}>{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="telefono" className={labelClass}>
                    Teléfono <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="telefono"
                    type="tel"
                    autoComplete="tel"
                    placeholder="3312345678"
                    {...register('telefono')}
                    className={inputClass}
                  />
                  {errors.telefono && (
                    <p className={errorClass}>{errors.telefono.message}</p>
                  )}
                </div>
              </div>

              {/* Fila 3: cultivo + superficie */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cultivo" className={labelClass}>
                    Cultivo principal
                  </label>
                  <input
                    id="cultivo"
                    type="text"
                    placeholder="Tomate, aguacate…"
                    {...register('cultivo')}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="superficie" className={labelClass}>
                    Superficie
                  </label>
                  <input
                    id="superficie"
                    type="text"
                    placeholder="ej: 5 ha"
                    {...register('superficie')}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Fila 4: estado */}
              <div>
                <label htmlFor="estado" className={labelClass}>
                  Estado <span className="text-red-500">*</span>
                </label>
                <select
                  id="estado"
                  {...register('estado')}
                  className={inputClass}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Selecciona tu estado
                  </option>
                  {MEXICAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.estado && (
                  <p className={errorClass}>{errors.estado.message}</p>
                )}
              </div>

              {/* Fila 5: comentarios */}
              <div>
                <label htmlFor="comentarios" className={labelClass}>
                  Comentarios o preguntas
                </label>
                <textarea
                  id="comentarios"
                  rows={4}
                  placeholder="Cuéntanos más sobre tu situación: problemas que enfrentas, etapa del cultivo, productos que usas actualmente…"
                  {...register('comentarios')}
                  className={inputClass}
                />
              </div>

              {/* Botón de envío */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-naranja-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-naranja-600 focus:outline-none focus:ring-2 focus:ring-naranja-500/30 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Enviando…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Enviar solicitud de cotización
                  </>
                )}
              </button>

              {/* Aviso de privacidad */}
              <p className="text-center text-xs text-gris-400">
                🔒 Tu información está protegida. No compartimos tus datos con
                terceros.
              </p>

              {serverError && (
                <p className="text-center text-sm text-red-500" role="alert">
                  {serverError}
                </p>
              )}
            </form>
          </div>

          {/* ── Columna derecha: resumen del carrito (sticky) ──────────── */}
          <aside className="mt-10 lg:mt-0">
            <div className="sticky top-8 space-y-4">
              {/* Tarjeta del carrito */}
              <div className="rounded-2xl border border-gris-200 bg-white shadow-sm overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gris-100 px-5 py-4">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4 text-gris-500" />
                    <h2 className="font-semibold text-gris-900 text-sm">
                      Tu cotización
                    </h2>
                  </div>
                  {items.length > 0 && (
                    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-verde-500 px-1.5 text-[10px] font-bold text-white">
                      {items.length}
                    </span>
                  )}
                </div>

                {/* Contenido */}
                {items.length === 0 ? (
                  /* Carrito vacío */
                  <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gris-100">
                      <Package className="h-8 w-8 text-gris-400" />
                    </div>
                    <p className="mb-1 text-sm font-medium text-gris-700">
                      Aún no tienes productos.
                    </p>
                    <p className="mb-5 text-xs text-gris-400 leading-relaxed">
                      Navega el catálogo y agrega los que necesites.
                    </p>
                    <Link
                      href="/soluciones"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-verde-300 bg-verde-50 px-4 py-2 text-xs font-semibold text-verde-700 hover:bg-verde-100 transition-colors"
                    >
                      Ver catálogo de productos
                    </Link>
                  </div>
                ) : (
                  /* Lista de ítems */
                  <ul className="divide-y divide-gris-100 max-h-[400px] overflow-y-auto">
                    {items.map((item) => (
                      <li key={item.productId} className="px-5 py-4">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gris-900 leading-snug truncate">
                              {item.productName}
                            </p>
                            <div className="mt-1">
                              <Badge
                                line={item.productLine as ProductLine}
                                size="sm"
                              />
                            </div>
                          </div>
                          {/* Botón eliminar */}
                          <button
                            type="button"
                            onClick={() => removeItem(item.productId)}
                            className="shrink-0 flex h-7 w-7 items-center justify-center rounded-lg text-gris-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                            aria-label={`Eliminar ${item.productName}`}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        {/* Controles de cantidad */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity - 1)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-gris-200 text-gris-600 hover:bg-gris-50 disabled:opacity-40 transition-colors"
                            disabled={item.quantity <= 1}
                            aria-label="Reducir cantidad"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <input
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={(e) => {
                              const val = parseInt(e.target.value, 10)
                              if (!isNaN(val)) {
                                updateQuantity(item.productId, val)
                              }
                            }}
                            className="h-7 w-14 rounded-md border border-gris-200 text-center text-sm font-medium text-gris-900 focus:border-verde-400 focus:outline-none focus:ring-1 focus:ring-verde-500/20"
                            aria-label={`Cantidad de ${item.productName}`}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-gris-200 text-gris-600 hover:bg-gris-50 transition-colors"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                          <span className="text-xs text-gris-500 ml-1">
                            {item.unit}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Resumen de totales */}
                {items.length > 0 && (
                  <div className="border-t border-gris-100 px-5 py-4 bg-gris-50">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gris-600">
                        {items.length}{' '}
                        {items.length === 1 ? 'producto' : 'productos'} en tu
                        cotización
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Botón de WhatsApp */}
              {items.length > 0 && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25d366] py-3 px-5 text-sm font-semibold text-white shadow-sm hover:bg-[#1ebe5c] transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Consultar por WhatsApp
                </a>
              )}

              {/* Nota de precios */}
              <p className="text-xs text-gris-400 leading-relaxed text-center px-2">
                Los precios se confirman con el equipo técnico según volumen y
                región.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </>
  )
}

// ─── Página exportada (envuelve en Provider) ──────────────────────────────────

export default function CotizacionPage() {
  return (
    <QuotationCartProvider>
      <QuotationPageContent />
    </QuotationCartProvider>
  )
}
