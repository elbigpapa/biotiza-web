import type Lenis from 'lenis'

/**
 * smoothScroll — puente al singleton de Lenis.
 *
 * SmoothScrollProvider crea la instancia de Lenis y la registra aquí.
 * Así cualquier componente (p. ej. el logo del Header) puede desplazar
 * la página de forma suave sin volver a instanciar Lenis ni pelear con
 * su control del scroll.
 */

let instance: Lenis | null = null

/** SmoothScrollProvider registra (o limpia) la instancia activa de Lenis. */
export function registerLenis(lenis: Lenis | null) {
  instance = lenis
}

/**
 * Desplaza la página hasta arriba.
 * Usa Lenis si está activo; si no (p. ej. prefers-reduced-motion),
 * hace un salto nativo instantáneo.
 */
export function scrollToTop() {
  if (instance) {
    instance.scrollTo(0, { duration: 1.1 })
  } else if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0 })
  }
}
