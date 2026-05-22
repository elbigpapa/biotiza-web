'use client'

import { motion } from 'motion/react'

/**
 * ScrollCue — indicador sutil que late, invitando a seguir bajando.
 */
export default function ScrollCue({
  label = 'Sigue bajando',
  tone = 'dark',
}: {
  label?: string
  tone?: 'dark' | 'light'
}) {
  const color = tone === 'dark' ? 'text-white/70' : 'text-ink-3'
  return (
    <div className={`flex flex-col items-center gap-2 ${color}`}>
      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em]">
        {label}
      </span>
      <motion.span
        aria-hidden="true"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="text-lg leading-none"
      >
        ↓
      </motion.span>
    </div>
  )
}
