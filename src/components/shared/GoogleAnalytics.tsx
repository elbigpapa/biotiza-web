'use client'

/**
 * GoogleAnalytics.tsx — GA4 con Consent Mode v2 (default-denied)
 *
 * Implementación correcta de Consent Mode v2 (LFPDPPP-MX + GDPR):
 *  - gtag.js SÍ se carga en cada visita, pero arranca con TODO el consentimiento
 *    de analítica/ads en "denied". Mientras esté denegado, GA no escribe cookies
 *    ni envía hits identificables (a lo sumo pings sin cookies / cookieless).
 *  - El orden importa: el script `ga-consent-default` (que ejecuta
 *    `gtag('consent','default', {...denied})`) se declara ANTES del `<Script src>`
 *    de gtag.js, de modo que el default-denied se aplica antes de cualquier hit.
 *  - Si el usuario acepta cookies, CookieConsent llama a `setConsent('all')` →
 *    `gtag('consent','update', {...granted})` y el tracking se activa sin recargar.
 *  - `setConsent()` se exporta para que CookieConsent lo invoque al decidir.
 *
 * NOTA: el comentario anterior afirmaba que gtag.js se cargaba "solo después del
 * consentimiento". Eso era falso (siempre se cargaba) y además NO es el patrón de
 * Consent Mode v2. Lo correcto es cargar siempre con default-denied, como aquí.
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
      {/*
        gtag.js se carga DESPUÉS del script de consent-default (orden del DOM +
        misma estrategia afterInteractive). Así el default-denied ya está
        aplicado cuando la librería arranca: Consent Mode v2 correcto.
      */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
    </>
  )
}
