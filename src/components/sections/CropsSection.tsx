'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { staggerContainer, scaleIn } from '@/lib/animations'
import SectionHeading from '@/components/ui/SectionHeading'
import { Container } from '@/components/ui/Container'
import CropCard, { type CropCardData } from '@/components/crops/CropCard'

const CROPS: CropCardData[] = [
  { slug: 'tomate',    name: 'Tomate',     emoji: '🍅', color: 'from-red-700    to-red-500'    },
  { slug: 'fresa',     name: 'Fresa',      emoji: '🍓', color: 'from-rose-700   to-rose-500'   },
  { slug: 'arandano',  name: 'Arándano',   emoji: '🫐', color: 'from-indigo-700 to-indigo-500' },
  { slug: 'frambuesa', name: 'Frambuesa',  emoji: '🍇', color: 'from-purple-700 to-purple-500' },
  { slug: 'zarzamora', name: 'Zarzamora',  emoji: '🫐', color: 'from-violet-800 to-violet-600' },
  { slug: 'aguacate',  name: 'Aguacate',   emoji: '🥑', color: 'from-verde-800  to-verde-600'  },
  { slug: 'chile',     name: 'Chile',      emoji: '🌶️', color: 'from-orange-700 to-orange-500' },
  { slug: 'citricos',  name: 'Cítricos',   emoji: '🍊', color: 'from-amber-600  to-amber-400'  },
]

export default function CropsSection() {
  return (
    <section className="relative bg-white py-24 lg:py-32 overflow-hidden">
      {/* Subtle decorative element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-verde-50/50 blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" aria-hidden="true" />

      <Container className="relative z-10">
        <SectionHeading
          tag="Por cultivo"
          title="Programas de nutrición por cultivo"
          subtitle="Protocolos diseñados por nuestros agrónomos para maximizar rendimiento y calidad en cada etapa fenológica."
          className="mb-20"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-5 lg:gap-6"
        >
          {CROPS.map((crop) => (
            <motion.div key={crop.slug} variants={scaleIn}>
              <CropCard crop={crop} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="/cultivos"
            className="group inline-flex items-center gap-2 rounded-xl border-2 border-verde-500 px-7 py-3 text-sm font-semibold text-verde-600 transition-all duration-300 hover:bg-verde-500 hover:text-white hover:shadow-brand"
          >
            Ver todos los cultivos
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </Container>
    </section>
  )
}
