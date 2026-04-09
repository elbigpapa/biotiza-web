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
    categoryColor: 'bg-naranja-100 text-naranja-600',
    title: '¿Qué son los bioestimulantes y cómo benefician tu cultivo?',
    excerpt: 'Los bioestimulantes son el futuro de la agricultura de precisión. Descubre cómo las citoquininas, auxinas y aminoácidos pueden transformar tu rendimiento.',
    readTime: '5 min',
    imageBg: 'from-naranja-600 to-naranja-400',
    emoji: '✨',
  },
  {
    slug: 'deficiencia-calcio-tomate',
    category: 'Nutrición',
    categoryColor: 'bg-verde-100 text-verde-700',
    title: 'Guía completa: deficiencia de calcio en tomate',
    excerpt: 'Bitter pit, blossom end rot, rajaduras… La deficiencia de calcio cuesta millones. Aprende a identificarla, prevenirla y corregirla a tiempo.',
    readTime: '8 min',
    imageBg: 'from-verde-700 to-verde-500',
    emoji: '🍅',
  },
  {
    slug: 'bioproteccion-vs-quimicos',
    category: 'Bioprotección',
    categoryColor: 'bg-azul-100 text-azul-700',
    title: 'Bioprotección vs. químicos: la tercera vía',
    excerpt: 'No tienes que elegir entre eficacia y sostenibilidad. Conoce cómo integrar bioinsecticidas y biofungicidas en tu programa sin sacrificar resultado.',
    readTime: '6 min',
    imageBg: 'from-azul-700 to-azul-500',
    emoji: '🛡️',
  },
]

export default function BlogPreviewSection() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-14">
          <SectionHeading
            tag="Academia Biotiza"
            title="Aprende con Biotiza"
            align="left"
            animate={false}
          />
          <Link
            href="/academia/blog"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-verde-600 hover:text-verde-700 transition-colors sm:inline-flex"
          >
            Ver todos los artículos
            <ArrowRight size={14} />
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
                className="group flex flex-col rounded-2xl bg-white border border-gris-100 shadow-card overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 h-full"
              >
                {/* Imagen placeholder */}
                <div className={cn('relative flex h-44 items-center justify-center bg-gradient-to-br', article.imageBg)}>
                  <span className="text-5xl select-none" aria-hidden="true">{article.emoji}</span>
                </div>

                <div className="flex flex-col flex-1 p-5 gap-3">
                  {/* Meta */}
                  <div className="flex items-center justify-between">
                    <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-semibold', article.categoryColor)}>
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gris-400">
                      <Clock size={11} />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-sans text-base font-semibold leading-snug text-gris-900 group-hover:text-verde-700 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-gris-600 line-clamp-2 flex-1">
                    {article.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-verde-600 transition-all group-hover:gap-2">
                    Leer más
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA mobile */}
        <div className="mt-8 text-center sm:hidden">
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
