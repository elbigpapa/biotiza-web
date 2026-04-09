import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// ─── Clases de Tailwind ────────────────────────────────────────────────────

/**
 * Combina clases condicionales (clsx) y resuelve conflictos de Tailwind (twMerge).
 *
 * @example
 *   cn('px-4 py-2', isActive && 'bg-verde-500', className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

// ─── Formato de números ────────────────────────────────────────────────────

/**
 * Formatea un número con separadores de miles (default: español-México).
 *
 * @example
 *   formatNumber(1500000)       // "1,500,000"
 *   formatNumber(12.5, 'es-MX') // "12.5"
 */
export function formatNumber(
  value: number,
  locale: string = 'es-MX',
  options?: Intl.NumberFormatOptions,
): string {
  return value.toLocaleString(locale, options)
}

/**
 * Formatea un número como moneda en pesos mexicanos.
 *
 * @example
 *   formatCurrency(1250)  // "$1,250.00"
 */
export function formatCurrency(
  value: number,
  currency: string = 'MXN',
  locale: string = 'es-MX',
): string {
  return value.toLocaleString(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  })
}

/**
 * Formatea dosis agronómica con unidad.
 *
 * @example
 *   formatDose(2.5, 'L/ha')   // "2.5 L/ha"
 *   formatDose(500, 'mL/100L') // "500 mL/100L"
 */
export function formatDose(value: number, unit: string): string {
  return `${value.toLocaleString('es-MX')} ${unit}`
}

// ─── Strings ──────────────────────────────────────────────────────────────

/**
 * Convierte un string a slug URL-friendly.
 *
 * @example
 *   slugify('Línea Orgánicos')  // "linea-organicos"
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // elimina acentos
    .replace(/[^a-z0-9\s-]/g, '')    // elimina caracteres especiales
    .trim()
    .replace(/\s+/g, '-')            // espacios → guiones
    .replace(/-+/g, '-')             // múltiples guiones → uno
}

/**
 * Capitaliza la primera letra de un string.
 *
 * @example
 *   capitalize('bioestimulante') // "Bioestimulante"
 */
export function capitalize(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Trunca texto largo con elipsis.
 *
 * @example
 *   truncate('Descripción muy larga...', 50)
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trimEnd() + '…'
}

// ─── Arrays / Objetos ─────────────────────────────────────────────────────

/**
 * Agrupa un array por una clave dada.
 *
 * @example
 *   groupBy(products, p => p.line)
 */
export function groupBy<T>(
  array: T[],
  keyFn: (item: T) => string,
): Record<string, T[]> {
  return array.reduce<Record<string, T[]>>((acc, item) => {
    const key = keyFn(item)
    if (!acc[key]) acc[key] = []
    acc[key].push(item)
    return acc
  }, {})
}

// ─── Validaciones ─────────────────────────────────────────────────────────

/** Verifica si un valor es un email válido. */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/** Verifica si un string es un número de teléfono mexicano válido (10 dígitos). */
export function isValidMexPhone(phone: string): boolean {
  return /^(\+?52)?[1-9]\d{9}$/.test(phone.replace(/[\s\-().]/g, ''))
}

// ─── URLs ─────────────────────────────────────────────────────────────────

/**
 * Construye un link de WhatsApp con mensaje predefinido.
 *
 * @example
 *   whatsappLink('Hola, quiero cotizar Biotiza Root')
 */
export function whatsappLink(message: string, phone = '523300000000'): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}
