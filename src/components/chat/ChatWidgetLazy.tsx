'use client'

/**
 * ChatWidgetLazy — wrapper cliente para diferir la carga del ChatWidget.
 *
 * Por qué existe: el root `layout.tsx` es un Server Component, y en Next 16
 * `next/dynamic` con `ssr: false` NO está permitido en Server Components
 * (lanza error de build). La forma soportada de usar `ssr: false` es hacerlo
 * dentro de un Client Component, que es justo lo que hace este wrapper.
 *
 * Efecto: el ChatWidget (widget flotante 100% cliente) queda fuera del bundle
 * JS inicial de las 186 páginas y solo se descarga en el cliente tras la
 * hidratación, sin SSR. Mejora el TBT/LCP del render inicial.
 */

import dynamic from 'next/dynamic'

const ChatWidget = dynamic(() => import('@/components/chat/ChatWidget'), {
  ssr: false,
})

export default function ChatWidgetLazy() {
  return <ChatWidget />
}
