'use client'

import Link from 'next/link'
import { track } from '@vercel/analytics'

/**
 * HeroMetricChips — Las dos métricas clicables ("47 productos" y "35 cultivos
 * con protocolo") + el chip estático "Asesoría técnica incluida".
 *
 * Se extrae a client component sólo para poder disparar `track(...)` en el
 * onClick de los links. El resto del Hero se mantiene como server component
 * para preservar LCP.
 */
export default function HeroMetricChips() {
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-2 border-t border-white/20 pt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">
      <Link
        href="/soluciones"
        onClick={() => track('hero_metric_clicked', { metric: 'productos' })}
        className="group transition-colors hover:text-white"
      >
        <span className="mr-1.5 text-verde-300">47</span>
        <span className="underline decoration-white/30 decoration-1 underline-offset-4 transition-colors group-hover:decoration-white">productos</span>
      </Link>
      <Link
        href="/cultivos"
        onClick={() => track('hero_metric_clicked', { metric: 'cultivos' })}
        className="group transition-colors hover:text-white"
      >
        <span className="mr-1.5 text-verde-300">35</span>
        <span className="underline decoration-white/30 decoration-1 underline-offset-4 transition-colors group-hover:decoration-white">cultivos con protocolo</span>
      </Link>
      <span><span className="mr-1.5 text-verde-300">Asesoría</span>técnica incluida</span>
    </div>
  )
}
