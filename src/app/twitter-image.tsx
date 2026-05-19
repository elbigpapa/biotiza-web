/**
 * twitter-image.tsx — Reusa el opengraph-image para Twitter cards.
 *
 * Next 16 buscará `twitter-image` para `<meta name="twitter:image">`
 * y caerá al `opengraph-image` si no existe — pero al exportarlo
 * explícitamente quedan tags duplicados garantizados, evitando que
 * algunos parsers ignoren el card grande.
 */

export { default, alt, size, contentType } from './opengraph-image'
