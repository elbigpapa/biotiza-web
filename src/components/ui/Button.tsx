'use client'

/**
 * Button.tsx — Componente de botón principal de Biotiza
 *
 * Uso:
 *   <Button variant="primary" size="lg">Cotizar ahora</Button>
 *   <Button variant="whatsapp" leftIcon={<MessageCircle size={18} />}>WhatsApp</Button>
 *   <Button asChild><Link href="/soluciones">Ver productos</Link></Button>
 *   <Button loading>Enviando...</Button>
 */

import {
  forwardRef,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Tipos ────────────────────────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'whatsapp' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Clona el children y le pasa las clases/atributos (ideal para Next.js Link) */
  asChild?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  /** Muestra spinner y desactiva el botón */
  loading?: boolean
  /** Ocupa el ancho completo del contenedor */
  fullWidth?: boolean
}

// ─── Estilos ──────────────────────────────────────────────────────────────

const base = [
  'inline-flex items-center justify-center font-sans font-semibold',
  'rounded-lg select-none whitespace-nowrap',
  'transition-all duration-200 ease-out',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verde-500 focus-visible:ring-offset-2',
  'disabled:pointer-events-none disabled:opacity-50',
  'cursor-pointer',
].join(' ')

const variants: Record<ButtonVariant, string> = {
  primary: [
    'bg-verde-500 text-white',
    'hover:bg-verde-600 hover:shadow-brand',
    'active:bg-verde-700 active:scale-[0.98]',
  ].join(' '),

  secondary: [
    'border-2 border-verde-500 text-verde-600 bg-transparent',
    'hover:bg-verde-50 hover:border-verde-600',
    'active:bg-verde-100 active:scale-[0.98]',
  ].join(' '),

  accent: [
    'bg-naranja-500 text-white',
    'hover:bg-naranja-600 hover:shadow-[0_4px_20px_rgba(232,105,15,0.3)]',
    'active:bg-naranja-600 active:scale-[0.98]',
  ].join(' '),

  ghost: [
    'bg-transparent text-gris-700',
    'hover:bg-gris-100 hover:text-gris-900',
    'active:bg-gris-200 active:scale-[0.98]',
  ].join(' '),

  whatsapp: [
    'bg-[#25D366] text-white',
    'hover:bg-[#1ebe57] hover:shadow-[0_4px_20px_rgba(37,211,102,0.35)]',
    'active:bg-[#17a84a] active:scale-[0.98]',
  ].join(' '),

  danger: [
    'bg-red-500 text-white',
    'hover:bg-red-600',
    'active:bg-red-700 active:scale-[0.98]',
  ].join(' '),
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-8  px-3   text-xs  gap-1.5',
  md: 'h-10 px-4   text-sm  gap-2',
  lg: 'h-12 px-6   text-base gap-2.5',
}

/** Tamaño del spinner según el botón */
const spinnerSize: Record<ButtonSize, number> = { sm: 14, md: 16, lg: 18 }

// ─── Componente ───────────────────────────────────────────────────────────

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      asChild = false,
      leftIcon,
      rightIcon,
      loading = false,
      fullWidth = false,
      disabled,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const classes = cn(
      base,
      variants[variant],
      sizes[size],
      fullWidth && 'w-full',
      className,
    )

    const content = (
      <>
        {loading ? (
          <Loader2 size={spinnerSize[size]} className="animate-spin" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        {children}
        {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </>
    )

    // ── Modo asChild: clona el primer hijo y le pasa las clases ──────────
    if (asChild && isValidElement(children)) {
      return cloneElement(children as ReactElement<Record<string, unknown>>, {
        className: classes,
        ...(disabled || loading ? { 'aria-disabled': true, tabIndex: -1 } : {}),
      })
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {content}
      </button>
    )
  },
)

Button.displayName = 'Button'

export default Button
