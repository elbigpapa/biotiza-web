/**
 * UI Components — Barrel export
 *
 * Importa desde aquí para mayor comodidad:
 *   import { Button, Badge, Card, Input, SectionHeading, Container } from '@/components/ui'
 */

export { default as Button }          from './Button'
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button'

export { default as Badge, CertBadgeGroup, LINE_COLORS } from './Badge'
export type { BadgeProps, BadgeSize, CertBadge }         from './Badge'

export { default as Card, CardHeader, CardContent, CardFooter, CardImage } from './Card'
export type { CardProps, CardVariant, CardHeaderProps, CardFooterProps }   from './Card'

export { default as Input }           from './Input'
export type { InputProps }            from './Input'

export { default as Select, renderOptions, ESTADOS_MEXICO } from './Select'
export type { SelectProps, SelectOption }                    from './Select'

export { default as Textarea }        from './Textarea'
export type { TextareaProps }         from './Textarea'

export { default as SectionHeading }  from './SectionHeading'
export type { SectionHeadingProps, HeadingAlign, HeadingAccent } from './SectionHeading'

export { default as Container, Section } from './Container'
export type { ContainerProps }           from './Container'
