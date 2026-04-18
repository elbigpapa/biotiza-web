'use client'

/**
 * CookieConsent.tsx — Banner de consentimiento de cookies (LFPDPPP-MX + GDPR)
 *
 * - Persiste decisión en localStorage (`biotiza_cookie_consent_v1`)
 * - Solo muestra si no hay decisión previa
 * - Dos acciones: aceptar todo / solo esenciales
 */

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Cookie, X } from 'lucide-react'

const STORAGE_KEY = 'biotiza_cookie_consent_v1'

type Consent = 'all' | 'essential'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const existing = localStorage.getItem(STORAGE_KEY)
      if (!existing) setVisible(true)
    } catch {
      // localStorage puede estar bloqueado (modo incógnito estricto)
    }
  }, [])

  const decide = (value: Consent) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ value, at: new Date().toISOString() }))
    } catch {}
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Consentimiento de cookies"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-x-3 bottom-3 z-[60] sm:inset-x-auto sm:bottom-4 sm:left-4 sm:max-w-md"
        >
          <div className="relative overflow-hidden rounded-2xl border border-gris-200 bg-white/95 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.18)] backdrop-blur-md">
            <button
              type="button"
              onClick={() => decide('essential')}
              aria-label="Cerrar banner"
              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg text-gris-400 transition-colors hover:bg-gris-100 hover:text-gris-700"
            >
              <X size={16} />
            </button>

            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-verde-50 text-verde-600">
                <Cookie size={20} />
              </span>
              <div>
                <p className="text-sm font-semibold text-gris-900">Usamos cookies</p>
                <p className="mt-1 text-xs leading-relaxed text-gris-600">
                  Para mejorar tu experiencia, analizar tráfico y optimizar el
                  sitio. Puedes elegir aceptar todas o solo las esenciales.
                  Más detalles en nuestra{' '}
                  <Link href="/politica-privacidad" className="font-medium text-verde-600 underline hover:text-verde-700">
                    política de privacidad
                  </Link>.
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => decide('all')}
                className="flex-1 min-w-[140px] rounded-lg bg-gradient-to-br from-verde-500 to-verde-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                Aceptar todas
              </button>
              <button
                type="button"
                onClick={() => decide('essential')}
                className="flex-1 min-w-[140px] rounded-lg border border-gris-200 bg-white px-4 py-2 text-xs font-semibold text-gris-700 transition-colors hover:bg-gris-50"
              >
                Solo esenciales
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
