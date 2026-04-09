'use client'

import { motion } from 'framer-motion'
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
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeading
          tag="Por cultivo"
          title="Programas de nutrición por cultivo"
          subtitle="Protocolos diseñados por nuestros agrónomos para maximizar rendimiento y calidad en cada etapa fenológica."
          className="mb-16"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-5"
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
          className="mt-10 text-center"
        >
          <a
            href="/cultivos"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-verde-500 px-6 py-2.5 text-sm font-semibold text-verde-600 transition-colors hover:bg-verde-50"
          >
            Ver todos los cultivos →
          </a>
        </motion.div>
      </Container>
    </section>
  )
}
