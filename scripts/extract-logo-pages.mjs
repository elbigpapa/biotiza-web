/**
 * extract-logo-pages.mjs
 *
 * Extrae cada página del PDF oficial del logo Biotiza como PNG vectorial-fiel
 * usando pdfjs-dist (legacy build para Node) + @napi-rs/canvas (prebuilt, sin
 * compilación nativa). Las imágenes NO se modifican — son renderings exactos
 * del PDF registrado.
 *
 * Uso:
 *   node scripts/extract-logo-pages.mjs
 */

import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const { getDocument } = require('pdfjs-dist/legacy/build/pdf.js')
import { createCanvas } from '@napi-rs/canvas'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = resolve(__dirname, '..')
const PDF_PATH     = join(__dirname, 'biotiza-logo-original.pdf')
const OUTPUT_DIR   = join(PROJECT_ROOT, 'public', 'images', 'logos')

const PAGE_NAMES = {
  1:  'lockup-v-color',
  2:  'lockup-v-mono-flat',
  3:  'lockup-v-mono-dark',
  4:  'lockup-v-mono-light',
  5:  'lockup-v-on-green',
  6:  'lockup-h-color',
  7:  'lockup-h-mono-flat',
  8:  'lockup-h-mono-dark',
  9:  'lockup-h-mono-light',
  10: 'lockup-h-on-green',
  11: 'icon-color',
  12: 'icon-mono-flat',
  13: 'icon-mono-dark',
  14: 'icon-mono-light',
  15: 'icon-on-green',
  16: 'wordmark-gradient',
  17: 'wordmark-dark',
  18: 'wordmark-flat',
  19: 'wordmark-orange',
  20: 'wordmark-on-green',
}

const SCALE = 4.0

async function main() {
  console.log(`PDF        : ${PDF_PATH}`)
  console.log(`Output dir : ${OUTPUT_DIR}`)
  console.log(`Scale      : ${SCALE}x\n`)

  await mkdir(OUTPUT_DIR, { recursive: true })

  const pdfBuffer = await readFile(PDF_PATH)
  const data = new Uint8Array(pdfBuffer)

  const doc = await getDocument({
    data,
    disableFontFace: true,
    useSystemFonts: false,
  }).promise

  console.log(`Paginas en el PDF: ${doc.numPages}\n`)

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i)
    const viewport = page.getViewport({ scale: SCALE })

    const canvas = createCanvas(viewport.width, viewport.height)
    const ctx = canvas.getContext('2d')

    await page.render({
      canvasContext: ctx,
      viewport,
    }).promise

    const pngBuffer = await canvas.encode('png')
    const name = PAGE_NAMES[i] ?? `page-${i}`
    const filename = `biotiza-${name}.png`
    await writeFile(join(OUTPUT_DIR, filename), pngBuffer)
    console.log(`  OK pag ${i.toString().padStart(2, '0')} -> ${filename}  (${(pngBuffer.length / 1024).toFixed(1)} KB)`)
  }

  await doc.destroy()
  console.log(`\n✓ ${doc.numPages} archivos generados`)
}

main().catch((err) => {
  console.error('\nError extrayendo logo:', err)
  process.exit(1)
})
