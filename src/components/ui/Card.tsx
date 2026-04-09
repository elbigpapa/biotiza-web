/**
 * Card.tsx — Componente de tarjeta base con sub-componentes
 *
 * Uso básico:
 *   <Card>
 *     <CardHeader>
 *       <h3>Título</h3>
 *     </CardHeader>
 *     <CardContent>Contenido</CardContent>
 *     <CardFooter>
 *       <Button>Acción</Button>
 *     </CardFooter>
 *   </Card>
 *
 * Con variantes:
 *   <Card variant="elevated" hover>
 *   <Card variant="flat" noPadding>
 *   <Card variant="outlined" className="border-verde-200">
 */

import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

// ─── Tipos ────────────────────────────────────────────────────────────────

export type CardVariant = 'default' | 'elevated' | 'flat' | 'outlined' | 'glass'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  /** Activa la elevación animada en hover */
  hover?: boolean
  /** Quita el padding interno del Card */
  noPadding?: boolean
  /** Fuerza overflow hidden (útil para imágenes que llegan al borde) */
  clipped?: boolean
}

// ─── Estilos de variante ──────────────────────────────────────────────────

const cardVariants: Record<CardVariant, string> = {
  default: [
    'bg-white',
    'border border-gris-200',
    'shadow-card',
  ].join(' '),

  elevated: [
    'bg-white',
    'border border-gris-100',
    'shadow-[0_4px_24px_rgba(15,23,42,0.1)]',
  ].join(' '),

  flat: [
    'bg-gris-50',
    'border border-gris-200',
  ].join(' '),

  outlined: [
    'bg-white',
    'border-2 border-gris-200',
  ].join(' '),

  glass: [
    'bg-white/70 backdrop-blur-md',
    'border border-white/40',
    'shadow-card',
  ].join(' '),
}

const hoverStyles = [
  'transition-all duration-300 ease-out',
  'hover:-translate-y-1',
  'hover:shadow-[0_8px_32px_rgba(34,181,115,0.15)]',
  'hover:border-verde-200',
  'cursor-pointer',
].join(' ')

// ─── Card ─────────────────────────────────────────────────────────────────

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      hover = false,
      noPadding = false,
      clipped = true,
      className,
      children,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        'rounded-xl',
        clipped && 'overflow-hidden',
        !noPadding && 'p-0',       // padding lo manejan los sub-componentes
        cardVariants[variant],
        hover && hoverStyles,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
)
Card.displayName = 'Card'

// ─── CardHeader ───────────────────────────────────────────────────────────

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Agrega un borde inferior */
  divided?: boolean
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ divided = false, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'px-5 pt-5 pb-4',
        divided && 'border-b border-gris-100 pb-4 mb-1',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
)
CardHeader.displayName = 'CardHeader'

// ─── CardContent ─────────────────────────────────────────────────────────

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-5 py-4', className)}
      {...props}
    >
      {children}
    </div>
  ),
)
CardContent.displayName = 'CardContent'

// ─── CardFooter ──────────────────────────────────────────────────────────

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Agrega un borde superior */
  divided?: boolean
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ divided = false, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'px-5 pb-5 pt-4',
        'flex items-center gap-3',
        divided && 'border-t border-gris-100 mt-1',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
)
CardFooter.displayName = 'CardFooter'

// ─── CardImage ───────────────────────────────────────────────────────────
// Wrapper para imágenes que llegan hasta el borde superior del card

export interface CardImageProps extends HTMLAttributes<HTMLDivElement> {
  /** Aspect ratio del contenedor de imagen */
  aspect?: 'square' | 'video' | 'wide' | '4/3'
}

const aspectStyles: Record<NonNullable<CardImageProps['aspect']>, string> = {
  square: 'aspect-square',
  video:  'aspect-video',
  wide:   'aspect-[16/7]',
  '4/3':  'aspect-[4/3]',
}

const CardImage = forwardRef<HTMLDivElement, CardImageProps>(
  ({ aspect = '4/3', className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative w-full overflow-hidden',
        aspectStyles[aspect],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
)
CardImage.displayName = 'CardImage'

// ─── Exports ─────────────────────────────────────────────────────────────

export { Card, CardHeader, CardContent, CardFooter, CardImage }
export default Card
