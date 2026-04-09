/**
 * Input.tsx — Campo de texto con label, helper text y estado de error
 *
 * Compatible con react-hook-form via ref forwarding:
 *   const { register, formState: { errors } } = useForm()
 *   <Input label="Nombre" error={errors.name} {...register('name')} />
 *
 * También uso standalone:
 *   <Input label="Email" type="email" placeholder="tu@correo.mx" />
 */

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import type { FieldError } from 'react-hook-form'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Tipos ────────────────────────────────────────────────────────────────

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Etiqueta visible sobre el campo */
  label?: string
  /** Texto de ayuda debajo del campo */
  helper?: string
  /** Error de react-hook-form o string para mensaje custom */
  error?: FieldError | string
  /** Icono a la izquierda del input */
  leftIcon?: ReactNode
  /** Icono a la derecha del input */
  rightIcon?: ReactNode
  /** El campo es obligatorio — agrega asterisco al label */
  required?: boolean
  /** Variante del input */
  variant?: 'default' | 'filled'
}

// ─── Estilos base ─────────────────────────────────────────────────────────

const inputBase = [
  'w-full rounded-lg text-sm text-gris-900 placeholder:text-gris-400',
  'transition-all duration-200',
  'focus:outline-none focus:ring-2 focus:ring-verde-500 focus:ring-offset-0 focus:border-verde-500',
  'disabled:cursor-not-allowed disabled:bg-gris-100 disabled:text-gris-400',
].join(' ')

const inputVariants = {
  default: 'bg-white border border-gris-300 hover:border-gris-400',
  filled:  'bg-gris-50 border border-gris-200 hover:border-gris-300',
}

const inputError = 'border-red-400 hover:border-red-400 focus:ring-red-400 focus:border-red-400'

// ─── Helpers ─────────────────────────────────────────────────────────────

function getErrorMessage(error: FieldError | string | undefined): string | undefined {
  if (!error) return undefined
  if (typeof error === 'string') return error
  return error.message
}

// ─── Componente ───────────────────────────────────────────────────────────

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helper,
      error,
      leftIcon,
      rightIcon,
      required,
      variant = 'default',
      className,
      id,
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

        {/* Input wrapper */}
        <div className="relative">
          {leftIcon && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gris-400">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            aria-invalid={hasError}
            aria-describedby={
              errorMsg ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined
            }
            className={cn(
              inputBase,
              inputVariants[variant],
              'h-10 px-3 py-2',
              leftIcon  && 'pl-9',
              rightIcon && 'pr-9',
              hasError && inputError,
              className,
            )}
            {...props}
          />

          {rightIcon && !hasError && (
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gris-400">
              {rightIcon}
            </span>
          )}

          {hasError && (
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
              <AlertCircle size={16} />
            </span>
          )}
        </div>

        {/* Error o helper */}
        {errorMsg ? (
          <p
            id={`${inputId}-error`}
            role="alert"
            className="flex items-center gap-1 text-xs text-red-500"
          >
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

Input.displayName = 'Input'

export default Input
