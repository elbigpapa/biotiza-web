'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import Container from '@/components/ui/Container'

/**
 * Scene — envoltura de una escena de la home.
 *
 * Aplica el fondo (imagen full-bleed con parallax + overlay, o color
 * sólido), la variante clara/oscura, y el contenedor centrado.
 */

interface SceneProps {
  tone?: 'dark' | 'light'
  image?: { src: string; alt: string }
  id?: string
  /** Si es false, la escena no aplica el padding vertical por defecto
   *  (el hijo controla su propia altura — p. ej. el Hero a pantalla completa). */
  padded?: boolean
  children: React.ReactNode
}

export default function Scene({
  tone = 'light',
  image,
  id,
  padded = true,
  children,
}: SceneProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // Parallax: la imagen se desplaza más lento que el scroll.
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  const bg = tone === 'dark' ? 'bg-verde-950 text-white' : 'bg-paper text-ink'

  return (
    <section
      ref={ref}
      id={id}
      className={`relative overflow-hidden ${padded ? 'py-24 lg:py-32' : ''} ${bg}`}
    >
      {image && (
        <motion.div
          style={{ y }}
          className="absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            className={`absolute inset-0 ${
              tone === 'dark' ? 'bg-verde-950/72' : 'bg-paper/70'
            }`}
          />
        </motion.div>
      )}
      <Container>{children}</Container>
    </section>
  )
}
