/**
 * Container.tsx — Contenedor responsivo estándar de Biotiza
 *
 * Uso:
 *   <Container>           → max-w-7xl  (1280px) — default
 *   <Container narrow>    → max-w-4xl  (896px)  — contenido editorial
 *   <Container wide>      → max-w-screen-2xl (1536px) — layouts full
 *   <Container as="section" className="py-20">
 */

import { forwardRef, type ElementType, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

// ─── Tipos ────────────────────────────────────────────────────────────────

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /** Reduce el ancho máximo a max-w-4xl — ideal para artículos/formularios */
  narrow?: boolean
  /** Expande el ancho máximo a max-w-screen-2xl — ideal para layouts full */
  wide?: boolean
  /** Cambia el elemento HTML del contenedor */
  as?: ElementType
}

// ─── Estilos ──────────────────────────────────────────────────────────────

const base = 'mx-auto w-full px-4 sm:px-6 lg:px-8'

const widthStyles = {
  narrow:  'max-w-4xl',
  default: 'max-w-7xl',
  wide:    'max-w-screen-2xl',
}

// ─── Componente ───────────────────────────────────────────────────────────

const Container = forwardRef<HTMLElement, ContainerProps>(
  (
    {
      narrow = false,
      wide = false,
      as: Component = 'div',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const width = narrow
      ? widthStyles.narrow
      : wide
        ? widthStyles.wide
        : widthStyles.default

    return (
      <Component
        ref={ref}
        className={cn(base, width, className)}
        {...props}
      >
        {children}
      </Component>
    )
  },
)

Container.displayName = 'Container'

// Exportar tanto como default como named para flexibilidad de import
export { Container }
export default Container

// ─── Variantes de conveniencia ────────────────────────────────────────────

/**
 * Sección con padding vertical estándar + Container.
 * Evita repetir `<section className="py-16 lg:py-24"><Container>...</Container></section>`
 *
 * Uso:
 *   <Section id="productos" className="bg-gris-50">
 *     <SectionHeading title="Productos" />
 *   </Section>
 */
export function Section({
  narrow,
  wide,
  className,
  innerClassName,
  children,
  ...props
}: ContainerProps & {
  innerClassName?: string
}) {
  return (
    <section className={cn('py-16 lg:py-24', className)} {...props}>
      <Container narrow={narrow} wide={wide} className={innerClassName}>
        {children}
      </Container>
    </section>
  )
}
