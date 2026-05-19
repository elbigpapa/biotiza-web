'use client'

/**
 * GoogleAnalytics.tsx — GA4 con Consent Mode v2
 *
 * - Carga gtag.js solo después del consentimiento de cookies (LFPDPPP-MX + GDPR)
 * - Default = todo "denied". Si el usuario acepta cookies, mandamos
 *   `gtag('consent','update', {...granted...})` y se empiezan a registrar
 *   eventos sin recargar la página.
 * - `setConsent()` se exporta para que CookieConsent lo llame cuando el
 *   usuario toma decisión.
 */

import Script from 'next/script'
import { useEffect } from 'react'

const STORAGE_KEY = 'biotiza_cookie_consent_v1'

// Helper global — lo expone window.setBiotizaConsent
declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
    setBiotizaConsent?: (value: 'all' | 'essential') => void
  }
}

export function setConsent(value: 'all' | 'essential') {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  if (value === 'all') {
    window.gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted',
      functionality_storage: 'granted',
      personalization_storage: 'granted',
      security_storage: 'granted',
    })
  } else {
    window.gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'granted',
      personalization_storage: 'denied',
      security_storage: 'granted',
    })
  }
}

interface Props {
  gaId: string
}

export default function GoogleAnalytics({ gaId }: Props) {
  // Aplica consentimiento previo si existe (visitas recurrentes)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const { value } = JSON.parse(raw) as { value: 'all' | 'essential' }
        setConsent(value)
      }
    } catch {
      /* localStorage bloqueado */
    }
    // Exponer helper para CookieConsent
    window.setBiotizaConsent = setConsent
  }, [])

  return (
    <>
      <Script
        id="ga-consent-default"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              functionality_storage: 'granted',
              personalization_storage: 'denied',
              security_storage: 'granted',
              wait_for_update: 500
            });
            gtag('js', new Date());
            gtag('config', '${gaId}', { anonymize_ip: true });
          `,
        }}
      />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
    </>
  )
}
