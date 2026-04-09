/**
 * Textarea.tsx — Área de texto multilínea con label, helper y estado de error
 *
 * Compatible con react-hook-form:
 *   <Textarea
 *     label="Mensaje"
 *     error={errors.message}
 *     rows={4}
 *     {...register('message')}
 *   />
 */

import { forwardRef, type TextareaHTMLAttributes } from 'react'
import type { FieldError } from 'react-hook-form'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Tipos ────────────────────────────────────────────────────────────────

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  helper?: string
  error?: FieldError | string
  required?: boolean
  variant?: 'default' | 'filled'
  /** Muestra contador de caracteres si se pasa maxLength */
  showCount?: boolean
}

// ─── Estilos base ─────────────────────────────────────────────────────────

const textareaBase = [
  'w-full rounded-lg text-sm text-gris-900 placeholder:text-gris-400',
  'transition-all duration-200 resize-y',
  'focus:outline-none focus:ring-2 focus:ring-verde-500 focus:ring-offset-0 focus:border-verde-500',
  'disabled:cursor-not-allowed disabled:bg-gris-100 disabled:text-gris-400',
].join(' ')

const textareaVariants = {
  default: 'bg-white border border-gris-300 hover:border-gris-400',
  filled:  'bg-gris-50 border border-gris-200 hover:border-gris-300',
}

const textareaError = 'border-red-400 hover:border-red-400 focus:ring-red-400'

function getErrorMessage(error: FieldError | string | undefined): string | undefined {
  if (!error) return undefined
  if (typeof error === 'string') return error
  return error.message
}

// ─── Componente ───────────────────────────────────────────────────────────

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helper,
      error,
      required,
      variant = 'default',
      showCount = false,
      maxLength,
      className,
      id,
      value,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)
    const errorMsg = getErrorMessage(error)
    const hasError = Boolean(errorMsg)

    const currentLength =
      showCount && value != null ? String(value).length : undefined

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

        {/* Textarea */}
        <div className="relative">
          <textarea
            ref={ref}
            id={inputId}
            maxLength={maxLength}
            value={value}
            aria-invalid={hasError}
            aria-describedby={
              errorMsg ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined
            }
            className={cn(
              textareaBase,
              textareaVariants[variant],
              'px-3 py-2.5 min-h-[96px]',
              hasError && textareaError,
              className,
            )}
            {...props}
          />

          {hasError && (
            <span className="pointer-events-none absolute right-3 top-3 text-red-500">
              <AlertCircle size={16} />
            </span>
          )}
        </div>

        {/* Footer: error/helper a la izquierda, contador a la derecha */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
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

          {showCount && maxLength != null && currentLength != null && (
            <p
              className={cn(
                'shrink-0 text-xs tabular-nums',
                currentLength >= maxLength * 0.9
                  ? 'text-naranja-500'
                  : 'text-gris-400',
              )}
            >
              {currentLength}/{maxLength}
            </p>
          )}
        </div>
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'

export default Textarea
