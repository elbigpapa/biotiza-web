'use client'

/**
 * MapSection.tsx — Mapa México · Sub-fase 3.3c · NUEVO
 * Ubicación: biotiza-web/src/components/sections/MapSection.tsx
 *
 * 9 zonas con asesoría técnica. SVG silhouette + pins interactivos.
 */

import { useState } from 'react'
import Container from '@/components/ui/Container'

const PINS = [
  { x:26, y:22, region:'Sonora',          city:'Hermosillo',  focus:'Hortalizas · espárrago · cítricos',  type:'Asesoría' },
  { x:31, y:33, region:'Sinaloa',         city:'Culiacán',    focus:'Tomate · chile · pepino',            type:'Asesoría' },
  { x:18, y:50, region:'Baja California', city:'San Quintín', focus:'Berries · fresa · hortalizas',       type:'Asesoría' },
  { x:41, y:56, region:'Jalisco',         city:'Zapotiltic',     focus:'Sede · I+D · todos los cultivos',    type:'Sede + asesores' },
  { x:48, y:58, region:'Michoacán',       city:'Uruapan',     focus:'Aguacate · zarzamora',                type:'Asesoría' },
  { x:43, y:60, region:'Colima',          city:'Tecomán',     focus:'Cítricos · limón',                    type:'Asesoría' },
  { x:56, y:50, region:'Guanajuato',      city:'Irapuato',    focus:'Lechuga · brócoli · papa · cebolla',  type:'Asesoría' },
  { x:60, y:60, region:'Veracruz',        city:'Veracruz',    focus:'Cítricos · piña · caña',              type:'Asesoría' },
  { x:80, y:50, region:'Yucatán',         city:'Mérida',      focus:'Cítricos · hortalizas',               type:'Asesoría' },
]

export default function MapSection() {
  const [active, setActive] = useState<number | null>(null)
  return (
    <section className="bg-white py-24 lg:py-32 border-b border-rule">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-10 lg:gap-20 items-end mb-12 lg:mb-16">
          <div>
            <p className="eyebrow-edit mb-6">— 11 · Cobertura técnica</p>
            <h2 className="title-display max-w-[16ch] mb-7">
              Asesoría en <em>todo</em> México.
            </h2>
            <p className="dek-edit text-ink-2 max-w-[60ch]">
              Agrónomos especializados disponibles en nueve zonas estratégicas.
              Si tu región aún no está marcada, agendamos una visita técnica.
            </p>
          </div>
          <div className="self-end">
            <div className="font-serif text-[clamp(60px,8vw,120px)] leading-[0.85] tracking-[-0.04em] text-ink">
              09
              <em className="font-serif italic text-verde-700 text-[0.4em] align-[12%] ml-1" style={{ fontFamily: 'var(--serif-it)' }}>
                {' '}zonas
              </em>
            </div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-3 mt-2 max-w-[30ch] leading-relaxed">
              con agrónomo asignado · cobertura nacional vía visitas técnicas
            </p>
          </div>
        </div>

        {/* Mapa SVG · México */}
        <div className="relative aspect-[16/10] bg-paper border border-rule overflow-hidden">
          <svg
            viewBox="0 0 1000 500"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 w-full h-full"
          >
            <defs>
              <pattern id="dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="0.9" fill="rgba(20,122,87,0.22)" />
              </pattern>
              <linearGradient id="mxgrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="rgba(20,122,87,0.10)" />
                <stop offset="100%" stopColor="rgba(232,105,15,0.10)" />
              </linearGradient>
            </defs>
            {/* Baja California */}
            <path
              d="M 85,110 Q 78,140 88,170 Q 110,210 145,255 Q 195,310 225,330 Q 248,335 240,308 Q 220,260 200,222 Q 178,180 168,140 L 178,115 L 180,115 Z"
              fill="url(#dots)"
              stroke="rgba(20,122,87,0.55)"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            {/* Mainland */}
            <path
              d="M 200,118 L 240,115 L 280,108 L 325,98 L 380,90 L 440,86 L 500,85 L 550,86 L 595,92 L 632,105 L 650,128 Q 668,160 660,200 Q 655,235 668,265 Q 685,300 720,318 Q 750,330 778,328 L 805,318 L 820,302 L 830,288 Q 840,272 838,258 L 848,250 L 866,238 L 882,230 L 895,232 Q 905,250 895,272 Q 880,298 855,318 Q 830,338 800,348 Q 770,355 740,348 L 715,340 Q 698,332 685,322 L 670,318 Q 658,322 645,332 L 628,348 L 612,360 L 588,362 L 560,360 L 528,355 L 498,348 L 470,340 L 440,335 L 410,332 L 380,325 L 350,315 L 322,302 L 295,288 L 268,270 L 245,250 L 225,225 L 210,200 L 200,170 Z"
              fill="url(#mxgrad)"
              stroke="rgba(20,122,87,0.55)"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            {/* Yucatán */}
            <path
              d="M 770,238 Q 790,228 808,220 L 830,218 L 848,220 L 858,232 Q 862,255 852,278 Q 840,300 820,310 L 800,308 L 780,295 L 768,278 Q 762,258 770,238 Z"
              fill="url(#dots)"
              stroke="rgba(20,122,87,0.55)"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>

          {/* Pins */}
          {PINS.map((p, i) => (
            <button
              key={i}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-[14px] h-[14px] bg-naranja-500 rounded-full z-10 motion-safe:animate-[pulse_2.6s_ease-out_infinite] cursor-pointer hover:scale-125 transition-transform"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                boxShadow: active === i ? '0 0 0 12px rgba(232,105,15,0.18)' : '0 0 0 0 rgba(232,105,15,0)',
              }}
              aria-label={`${p.region} · ${p.city}`}
            />
          ))}

          {/* Tooltip flotante */}
          {active !== null && (
            <div
              className="absolute z-20 bg-ink text-white p-3.5 min-w-[200px] pointer-events-none"
              style={{
                left: `${PINS[active].x}%`,
                top: `${PINS[active].y}%`,
                transform: 'translate(-50%, calc(-100% - 18px))',
              }}
            >
              <div className="font-serif text-lg leading-none text-verde-300 mb-1">{PINS[active].region}</div>
              <div className="text-xs text-white/85 mb-1">{PINS[active].city}</div>
              <div className="font-mono text-[10px] tracking-[0.1em] text-white/65">{PINS[active].focus}</div>
              <div className="font-mono text-[9px] mt-2 pt-1.5 border-t border-white/15 text-naranja-400 uppercase tracking-[0.14em]">{PINS[active].type}</div>
            </div>
          )}

          {/* Leyenda */}
          <div className="absolute bottom-5 left-5 flex items-center gap-5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-3">
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-naranja-500" />
              Zona con agrónomo asignado
            </span>
            <span className="text-ink-4">{PINS.length} zonas · 9 estados</span>
          </div>
          <div className="absolute top-5 right-5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-4">
            Biotiza · Cobertura técnica · MMXXVI
          </div>
        </div>
      </Container>
      <style jsx>{`
        @keyframes pulse {
          0%   { box-shadow: 0 0 0 0 rgba(232,105,15,0.55); }
          70%  { box-shadow: 0 0 0 18px rgba(232,105,15,0); }
          100% { box-shadow: 0 0 0 0 rgba(232,105,15,0); }
        }
      `}</style>
    </section>
  )
}
