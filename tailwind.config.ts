/**
 * tailwind.config.ts — Biotiza Design System
 *
 * NOTA: El proyecto usa Tailwind CSS v4. En v4 la config runtime vive en
 * globals.css (directiva @theme). Este archivo sirve como:
 *  1. Referencia documental de todos los tokens del sistema de diseño.
 *  2. Soporte para plugins de IDE (Tailwind IntelliSense) que aún leen
 *     el archivo JS/TS para autocompletar clases custom.
 *
 * Si en algún momento necesitas migrar a v3 o usar @config en v4,
 * este archivo ya tiene la estructura lista.
 */

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── Colores de Marca ──────────────────────────────────────────────
      colors: {
        /**
         * Verde — Línea Orgánicos
         * Brand: #22B573 (verde-500)
         */
        verde: {
          50:  '#f0fdf6',
          100: '#dcfaed',
          200: '#b8f4da',
          300: '#82ecc0',
          400: '#43d99e',
          500: '#22b573', // ← brand primary
          600: '#18966a',
          700: '#147a57',
          800: '#115e43',
          900: '#0d4d37',
        },
        /**
         * Naranja — Bioestimulantes (#E8690F) y Nutrición Líquida (#F28A3D)
         */
        naranja: {
          50:  '#fef9f3',
          100: '#fef3ea',
          200: '#fde0c5',
          300: '#fbcc9d',
          400: '#f28a3d', // ← Nutrición Líquida brand
          500: '#e8690f', // ← Bioestimulantes brand
          600: '#c4560c',
          700: '#a23f06',
        },
        /**
         * Azul — Zentia/Bioprotección (#1189BF) y Especialidades (#0E6E99)
         */
        azul: {
          100: '#e0f2fc',
          200: '#b9e5f8',
          300: '#7dd3f4',
          400: '#38b2e8',
          500: '#1189bf', // ← Zentia brand
          600: '#0e6e99', // ← Especialidades brand
          700: '#0a5578',
        },
        /**
         * Gris — Escala neutral para UI general
         */
        gris: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },

      // ─── Tipografía ───────────────────────────────────────────────────
      fontFamily: {
        sans:  ['var(--font-dm-sans)',   'DM Sans',          'sans-serif'],
        serif: ['var(--font-dm-serif)',  'DM Serif Display', 'serif'],
        mono:  ['JetBrains Mono',        'Fira Code',        'monospace'],
      },

      // ─── Breakpoints (default de Tailwind, explícitos aquí) ──────────
      // sm: 640px  md: 768px  lg: 1024px  xl: 1280px  2xl: 1536px

      // ─── Extras ───────────────────────────────────────────────────────
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'brand':    '0 4px 24px 0 rgba(34, 181, 115, 0.18)',
        'brand-lg': '0 8px 40px 0 rgba(34, 181, 115, 0.25)',
        'card':     '0 2px 16px 0 rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
}

export default config
