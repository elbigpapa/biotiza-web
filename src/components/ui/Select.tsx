/**
 * Select.tsx — Selector nativo con label, helper text y estado de error
 *
 * Compatible con react-hook-form:
 *   <Select label="Estado" error={errors.state} {...register('state')}>
 *     <option value="">Seleccionar...</option>
 *     <option value="jalisco">Jalisco</option>
 *   </Select>
 */

import { forwardRef, type SelectHTMLAttributes, type ReactNode } from 'react'
import type { FieldError } from 'react-hook-form'
import { ChevronDown, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Tipos ────────────────────────────────────────────────────────────────

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  helper?: string
  error?: FieldError | string
  required?: boolean
  /** Placeholder como primera option deshabilitada */
  placeholder?: string
  variant?: 'default' | 'filled'
}

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

// ─── Estilos base ─────────────────────────────────────────────────────────

const selectBase = [
  'w-full rounded-lg text-sm text-gris-900',
  'appearance-none',
  'transition-all duration-200',
  'focus:outline-none focus:ring-2 focus:ring-verde-500 focus:ring-offset-0 focus:border-verde-500',
  'disabled:cursor-not-allowed disabled:bg-gris-100 disabled:text-gris-400',
  // padding derecho extra para no solapar la flecha
  'pr-10',
].join(' ')

const selectVariants = {
  default: 'bg-white border border-gris-300 hover:border-gris-400',
  filled:  'bg-gris-50 border border-gris-200 hover:border-gris-300',
}

const selectError = 'border-red-400 hover:border-red-400 focus:ring-red-400'

function getErrorMessage(error: FieldError | string | undefined): string | undefined {
  if (!error) return undefined
  if (typeof error === 'string') return error
  return error.message
}

// ─── Componente ───────────────────────────────────────────────────────────

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helper,
      error,
      required,
      placeholder,
      variant = 'default',
      className,
      id,
      children,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)
    const errorMsg = getErrorMessage(error)
    const hasError = Boolean(errorMsg)

    return (
      <div className="flex flex-col gap-1.5">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gris-700 leading-none"
          >
            {label}
            {required && (
              <span className="ml-1 text-red-500" aria-hidden="true">*</span>
            )}
          </label>
        )}

        {/* Select wrapper */}
        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            aria-invalid={hasError}
            aria-describedby={
              errorMsg ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined
            }
            className={cn(
              selectBase,
              selectVariants[variant],
              'h-10 pl-3 py-2',
              hasError && selectError,
              className,
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {children}
          </select>

          {/* Flecha personalizada */}
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gris-500">
            {hasError ? (
              <AlertCircle size={16} className="text-red-500" />
            ) : (
              <ChevronDown size={16} />
            )}
          </span>
        </div>

        {/* Error o helper */}
        {errorMsg ? (
          <p id={`${inputId}-error`} role="alert" className="text-xs text-red-500">
            {errorMsg}
          </p>
        ) : helper ? (
          <p id={`${inputId}-helper`} className="text-xs text-gris-500">
            {helper}
          </p>
        ) : null}
      </div>
    )
  },
)

Select.displayName = 'Select'

export default Select

// ─── Helper: options desde array ─────────────────────────────────────────

/**
 * Convierte un array de opciones en elementos <option>.
 *
 * @example
 *   <Select label="Cultivo">
 *     {renderOptions(CULTIVOS_OPTIONS)}
 *   </Select>
 */
export function renderOptions(options: SelectOption[]) {
  return options.map(({ value, label, disabled }) => (
    <option key={value} value={value} disabled={disabled}>
      {label}
    </option>
  ))
}

// ─── Opciones comunes de México ───────────────────────────────────────────

export const ESTADOS_MEXICO: SelectOption[] = [
  { value: 'aguascalientes',   label: 'Aguascalientes' },
  { value: 'baja-california',  label: 'Baja California' },
  { value: 'baja-california-sur', label: 'Baja California Sur' },
  { value: 'campeche',         label: 'Campeche' },
  { value: 'chiapas',          label: 'Chiapas' },
  { value: 'chihuahua',        label: 'Chihuahua' },
  { value: 'coahuila',         label: 'Coahuila' },
  { value: 'colima',           label: 'Colima' },
  { value: 'cdmx',             label: 'Ciudad de México' },
  { value: 'durango',          label: 'Durango' },
  { value: 'guanajuato',       label: 'Guanajuato' },
  { value: 'guerrero',         label: 'Guerrero' },
  { value: 'hidalgo',          label: 'Hidalgo' },
  { value: 'jalisco',          label: 'Jalisco' },
  { value: 'edomex',           label: 'Estado de México' },
  { value: 'michoacan',        label: 'Michoacán' },
  { value: 'morelos',          label: 'Morelos' },
  { value: 'nayarit',          label: 'Nayarit' },
  { value: 'nuevo-leon',       label: 'Nuevo León' },
  { value: 'oaxaca',           label: 'Oaxaca' },
  { value: 'puebla',           label: 'Puebla' },
  { value: 'queretaro',        label: 'Querétaro' },
  { value: 'quintana-roo',     label: 'Quintana Roo' },
  { value: 'san-luis-potosi',  label: 'San Luis Potosí' },
  { value: 'sinaloa',          label: 'Sinaloa' },
  { value: 'sonora',           label: 'Sonora' },
  { value: 'tabasco',          label: 'Tabasco' },
  { value: 'tamaulipas',       label: 'Tamaulipas' },
  { value: 'tlaxcala',         label: 'Tlaxcala' },
  { value: 'veracruz',         label: 'Veracruz' },
  { value: 'yucatan',          label: 'Yucatán' },
  { value: 'zacatecas',        label: 'Zacatecas' },
]
