/**
 * articles.types.ts — Tipos compartidos para artículos modulares
 * Separados aquí para evitar dependencias circulares entre los archivos modulares
 * y articles.ts (el índice principal).
 */

export type ArticleCategory =
  | 'bioestimulacion'
  | 'nutricion'
  | 'bioproteccion'
  | 'cultivo'
  | 'fertirrigacion'

export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string; id?: string }
  | { type: 'h3'; text: string; id?: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'callout'; variant: 'info' | 'warn' | 'success'; title: string; text: string }
  | { type: 'product-ref'; slug: string; line: string; note: string }

export interface Article {
  slug: string
  title: string
  excerpt: string
  category: ArticleCategory
  categoryLabel: string
  readTime: number
  publishedAt: string
  updatedAt?: string
  author: { name: string; role: string }
  emoji: string
  imageGradient: string
  tags: string[]
  blocks: ArticleBlock[]
  relatedProducts?: { slug: string; line: string }[]
}
