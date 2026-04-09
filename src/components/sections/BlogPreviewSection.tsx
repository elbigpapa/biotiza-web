'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import SectionHeading from '@/components/ui/SectionHeading'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils'

const ARTICLES = [
  {
    slug: 'que-son-bioestimulantes',
    category: 'Bioestimulación',
    categoryColor: 'bg-naranja-50 text-naranja-600 ring-1 ring-naranja-100',
    title: '¿Qué son los bioestimulantes y cómo benefician tu cultivo?',
    excerpt: 'Los bioestimulantes son el futuro de la agricultura de precisión. Descubre cómo las citoquininas, auxinas y aminoácidos pueden transformar tu rendimiento.',
    readTime: '5 min',
    imageBg: 'from-naranja-600 to-naranja-400',
    emoji: '✨',
  },
  {
    slug: 'deficiencia-calcio-tomate',
    category: 'Nutrición',
    categoryColor: 'bg-verde-50 text-verde-700 ring-1 ring-verde-100',
    title: 'Guía completa: deficiencia de calcio en tomate',
    excerpt: 'Bitter pit, blossom end rot, rajaduras... La deficiencia de calcio cuesta millones. Aprende a identificarla, prevenirla y corregirla a tiempo.',
    readTime: '8 min',
    imageBg: 'from-verde-700 to-verde-500',
    emoji: '🍅',
  },
  {
    slug: 'bioproteccion-vs-quimicos',
    category: 'Bioprotección',
    categoryColor: 'bg-azul-50 text-azul-700 ring-1 ring-azul-100',
    title: 'Bioprotección vs. químicos: la tercera vía',
    excerpt: 'No tienes que elegir entre eficacia y sostenibilidad. Conoce cómo integrar bioinsecticidas y biofungicidas en tu programa sin sacrificar resultado.',
    readTime: '6 min',
    imageBg: 'from-azul-700 to-azul-500',
    emoji: '🛡️',
  },
]

export default function BlogPreviewSection() {
  return (
    <section className="relative bg-white py-24 lg:py-32 overflow-hidden">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-16">
          <SectionHeading
            tag="Academia Biotiza"
            title="Aprende con Biotiza"
            align="left"
            animate={false}
          />
          <Link
            href="/academia/blog"
            className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-verde-600 hover:text-verde-700 transition-colors sm:inline-flex group"
          >
            Ver todos los artículos
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-6 sm:grid-cols-3"
        >
          {ARTICLES.map((article) => (
            <motion.article key={article.slug} variants={fadeInUp}>
              <Link
                href={`/academia/blog/${article.slug}`}
                className="group flex flex-col rounded-2xl bg-white border border-gris-100 overflow-hidden h-full shadow-[0_2px_20px_rgba(15,23,42,0.04)] hover:shadow-[0_12px_40px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-1"
              >
                {/* Imagen placeholder premium */}
                <div className={cn('relative flex h-48 items-center justify-center bg-gradient-to-br overflow-hidden', article.imageBg)}>
                  {/* Decorative circles */}
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" aria-hidden="true" />
                  <div className="absolute left-6 -bottom-6 h-20 w-20 rounded-full bg-white/5" aria-hidden="true" />

                  <span className="text-6xl select-none drop-shadow-md transition-transform duration-500 group-hover:scale-110" aria-hidden="true">{article.emoji}</span>
                </div>

                <div className="flex flex-col flex-1 p-6 gap-3">
                  {/* Meta */}
                  <div className="flex items-center justify-between">
                    <span className={cn('rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide', article.categoryColor)}>
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gris-400">
                      <Clock size={11} />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-sans text-base font-semibold leading-snug text-gris-900 group-hover:text-verde-700 transition-colors duration-300">
                    {article.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-gris-500 line-clamp-2 flex-1">
                    {article.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-verde-600 transition-all duration-300 group-hover:gap-2.5">
                    Leer más
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA mobile */}
        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/academia/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-verde-600"
          >
            Ver todos los artículos <ArrowRight size={14} />
          </Link>
        </div>
      </Container>
    </section>
  )
}
