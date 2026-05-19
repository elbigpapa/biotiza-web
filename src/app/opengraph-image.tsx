/**
 * opengraph-image.tsx — Imagen OG/Twitter dinámica 1200×630
 *
 * Next 16 + ImageResponse genera la imagen en build time (rutas estáticas)
 * y on-demand (rutas dinámicas). Reemplaza al `og-image.png` cuadrado
 * (1080×1080) por una versión en proporción correcta para previews de
 * Facebook, Twitter/X, LinkedIn y WhatsApp.
 *
 * Aplica al root (homepage). Cada subruta puede tener su propio
 * opengraph-image.tsx si se quisiera personalizar por sección.
 */

import { ImageResponse } from 'next/og'

export const alt = 'Biotiza — Biosoluciones agrícolas mexicanas'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 96px',
          background: 'linear-gradient(135deg, #0d5c4a 0%, #166534 50%, #0d5c4a 100%)',
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Top row · eyebrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 18,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.7)',
            fontWeight: 600,
          }}
        >
          <span
            style={{
              width: 48,
              height: 1,
              background: 'rgba(255,255,255,0.5)',
              display: 'block',
            }}
          />
          Biotiza · biosoluciones agrícolas
        </div>

        {/* Center · headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.02,
              letterSpacing: '-0.04em',
              fontWeight: 400,
              fontFamily: 'Georgia, serif',
              maxWidth: 920,
            }}
          >
            Del laboratorio a tu cultivo, con un agrónomo a tu lado.
          </div>
          <div
            style={{
              fontSize: 28,
              color: 'rgba(255,255,255,0.85)',
              maxWidth: 880,
              lineHeight: 1.35,
            }}
          >
            25 años · 47 productos · 35 cultivos con protocolo · Zapopan, Jalisco
          </div>
        </div>

        {/* Bottom row · brand + URL */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: 22,
            color: 'rgba(255,255,255,0.85)',
            fontWeight: 600,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 56,
                height: 56,
                background: '#ffffff',
                color: '#0d5c4a',
                borderRadius: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 36,
                fontWeight: 700,
                fontFamily: 'Georgia, serif',
              }}
            >
              B
            </div>
            <span style={{ fontSize: 32, color: '#ffffff', letterSpacing: '-0.01em' }}>Biotiza</span>
          </div>
          <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', letterSpacing: 2 }}>
            biotiza.mx
          </span>
        </div>
      </div>
    ),
    size,
  )
}
