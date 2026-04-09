import type { Metadata } from 'next'
import Link from 'next/link'
import { Home, Search, ArrowLeft, Leaf } from 'lucide-react'
import Container from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Página no encontrada — Biotiza',
}

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white">
      <Container>
        <div className="max-w-lg mx-auto text-center space-y-8 py-16">

          {/* Ilustración SVG */}
          <div className="flex justify-center">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="60" cy="60" r="56" fill="#f0fdf6" stroke="#b8f4da" strokeWidth="2"/>
              <path d="M60 85 C60 85 35 70 35 48 C35 35 47 25 60 25 C73 25 85 35 85 48 C85 70 60 85 60 85Z" fill="#22b573" opacity="0.2"/>
              <path d="M60 85 C60 85 42 68 42 50 C42 39 50 30 60 30 C70 30 78 39 78 50 C78 68 60 85 60 85Z" fill="#22b573" opacity="0.5"/>
              <path d="M60 85 L60 45" stroke="#22b573" strokeWidth="2" strokeLinecap="round"/>
              <path d="M60 60 C60 60 50 52 48 45" stroke="#22b573" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
              <path d="M60 70 C60 70 68 62 70 55" stroke="#22b573" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
              <text x="60" y="110" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="system-ui">404</text>
            </svg>
          </div>

          {/* Texto */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-verde-500">
              Error 404
            </p>
            <h1 className="font-serif text-3xl text-gris-900 sm:text-4xl">
              Esta página no existe
            </h1>
            <p className="text-base text-gris-500 leading-relaxed">
              La página que buscas fue movida, eliminada o nunca existió. Pero tenemos muchas cosas buenas esperándote.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-verde-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-verde-600 transition-colors"
            >
              <Home size={16} />
              Ir al inicio
            </Link>
            <Link
              href="/soluciones"
              className="inline-flex items-center gap-2 rounded-lg bg-gris-100 px-5 py-2.5 text-sm font-semibold text-gris-700 hover:bg-gris-200 transition-colors"
            >
              <Leaf size={16} />
              Ver productos
            </Link>
            <Link
              href="/cultivos"
              className="inline-flex items-center gap-2 rounded-lg bg-gris-100 px-5 py-2.5 text-sm font-semibold text-gris-700 hover:bg-gris-200 transition-colors"
            >
              <Search size={16} />
              Ir a cultivos
            </Link>
          </div>

          {/* Enlace inferior */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-gris-400 hover:text-verde-600 transition-colors"
          >
            <ArrowLeft size={14} />
            Volver al inicio
          </Link>

        </div>
      </Container>
    </div>
  )
}
