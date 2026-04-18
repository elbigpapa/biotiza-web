'use client'

/**
 * app/herramientas/diagnostico/page.tsx — Diagnóstico de Deficiencias
 * Wizard de 4 pasos para identificar deficiencias nutricionales.
 */

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ArrowUp, ArrowDown, Minus, Circle, GitBranch } from 'lucide-react'
import Container from '@/components/ui/Container'
import { PRODUCTS } from '@/data/products'
import { CROPS_DATA } from '@/data/constants'

// ─── Types ────────────────────────────────────────────────────────────────────

type WizardStep = 1 | 2 | 3 | 4

type Zone =
  | 'hojas-nuevas'
  | 'hojas-viejas'
  | 'tallos'
  | 'frutos'
  | 'raices'

type Symptom =
  | 'clorosis-generalizada'
  | 'clorosis-intervenal'
  | 'necrosis-bordes'
  | 'necrosis-puntas'
  | 'manchas'
  | 'enrollamiento-arriba'
  | 'color-purpura'
  | 'deformacion'
  | 'crecimiento-lento'
  | 'caida-prematura'

interface DiagnosisResult {
  title: string
  deficiency: string
  badge: string
  badgeColor: string
  explanation: string
  productIds: string[]
}

// ─── Zone config ──────────────────────────────────────────────────────────────

const ZONES: Array<{ id: Zone; label: string; sublabel: string; Icon: React.ElementType; color: string; bg: string; border: string }> = [
  { id: 'hojas-nuevas', label: 'Hojas nuevas', sublabel: '(ápice / brotes)',       Icon: ArrowUp,    color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-300' },
  { id: 'hojas-viejas', label: 'Hojas viejas', sublabel: '(parte baja / base)',     Icon: ArrowDown,  color: 'text-yellow-600',  bg: 'bg-yellow-50',  border: 'border-yellow-300' },
  { id: 'tallos',       label: 'Tallos y ramas', sublabel: '',                       Icon: Minus,      color: 'text-amber-700',   bg: 'bg-amber-50',   border: 'border-amber-300'  },
  { id: 'frutos',       label: 'Frutos',        sublabel: '',                       Icon: Circle,     color: 'text-orange-500',  bg: 'bg-orange-50',  border: 'border-orange-300' },
  { id: 'raices',       label: 'Raíces',        sublabel: '',                       Icon: GitBranch,  color: 'text-purple-600',  bg: 'bg-purple-50',  border: 'border-purple-300' },
]

// ─── Symptom config ───────────────────────────────────────────────────────────

const SYMPTOMS: Array<{ id: Symptom; label: string; emoji: string }> = [
  { id: 'clorosis-generalizada', label: 'Clorosis generalizada (todo amarillo)',             emoji: '☀️'  },
  { id: 'clorosis-intervenal',   label: 'Clorosis intervenal (venas verdes, entre-venas amarillas)', emoji: '🍂' },
  { id: 'necrosis-bordes',       label: 'Necrosis en bordes',                               emoji: '🔥'  },
  { id: 'necrosis-puntas',       label: 'Necrosis en puntas',                               emoji: '📍'  },
  { id: 'manchas',               label: 'Manchas (café / negras)',                           emoji: '🟤'  },
  { id: 'enrollamiento-arriba',  label: 'Enrollamiento hacia arriba',                        emoji: '🌀'  },
  { id: 'color-purpura',         label: 'Color púrpura / rojizo',                           emoji: '🟣'  },
  { id: 'deformacion',           label: 'Deformación (hojas arrugadas)',                     emoji: '🌊'  },
  { id: 'crecimiento-lento',     label: 'Crecimiento lento',                                emoji: '🐢'  },
  { id: 'caida-prematura',       label: 'Caída prematura de hojas / frutos',                emoji: '🍃'  },
]

// ─── Diagnosis engine ─────────────────────────────────────────────────────────

function getDiagnosis(zone: Zone, symptoms: Symptom[]): DiagnosisResult {
  const has = (s: Symptom) => symptoms.includes(s)

  // hojas nuevas
  if (zone === 'hojas-nuevas') {
    if (has('clorosis-generalizada'))
      return {
        title: 'Deficiencia de Hierro (Fe)',
        deficiency: 'Hierro',
        badge: 'Deficiencia móvil',
        badgeColor: 'bg-yellow-100 text-yellow-700',
        explanation:
          'La clorosis generalizada en hojas jóvenes es el síntoma clásico de la deficiencia de hierro. El Fe es poco móvil en la planta y se acumula en las hojas viejas, dejando a los brotes sin suministro. Ocurre frecuentemente en suelos alcalinos o con exceso de calcio.',
        productIds: ['bp-ferrum'],
      }
    if (has('clorosis-intervenal'))
      return {
        title: 'Deficiencia de Manganeso (Mn) o Zinc (Zn)',
        deficiency: 'Manganeso / Zinc',
        badge: 'Micronutriente',
        badgeColor: 'bg-orange-100 text-orange-700',
        explanation:
          'La clorosis intervenal en hojas nuevas indica deficiencia de manganeso, zinc o ambos. Las venas permanecen verdes porque el clorofilo foliar es el último en descomponerse. El Mn activa enzimas clave de la fotosíntesis; el Zn regula la síntesis de auxinas.',
        productIds: ['bp-mix', 'bp-zinc'],
      }
    if (has('deformacion'))
      return {
        title: 'Deficiencia de Calcio (Ca)',
        deficiency: 'Calcio',
        badge: 'Macronutriente',
        badgeColor: 'bg-blue-100 text-blue-700',
        explanation:
          'El calcio es estructural en la pared celular y regula la división y elongación celular. Su deficiencia produce deformación de hojas jóvenes, puntas rizadas y en casos severos, muerte apical. Es común en condiciones de estrés hídrico o exceso de potasio.',
        productIds: ['ae-calcium'],
      }
    if (has('color-purpura'))
      return {
        title: 'Deficiencia de Fósforo (P)',
        deficiency: 'Fósforo',
        badge: 'Macronutriente',
        badgeColor: 'bg-purple-100 text-purple-700',
        explanation:
          'El coloramiento púrpura en hojas jóvenes indica acumulación de antocianinas, un mecanismo de defensa ante la deficiencia de fósforo. El P participa en la transferencia de energía (ATP), síntesis de ácidos nucleicos y desarrollo radicular.',
        productIds: ['p-ultra'],
      }
  }

  // hojas viejas
  if (zone === 'hojas-viejas') {
    if (has('clorosis-generalizada'))
      return {
        title: 'Deficiencia de Nitrógeno (N)',
        deficiency: 'Nitrógeno',
        badge: 'Macronutriente esencial',
        badgeColor: 'bg-green-100 text-green-700',
        explanation:
          'El nitrógeno es el nutriente más demandado por la planta y es altamente móvil. Cuando escasea, se redistribuye desde las hojas viejas hacia los tejidos jóvenes, produciendo clorosis generalizada de abajo hacia arriba. El crecimiento se detiene y la producción cae.',
        productIds: ['n-ultra'],
      }
    if (has('clorosis-intervenal'))
      return {
        title: 'Deficiencia de Magnesio (Mg)',
        deficiency: 'Magnesio',
        badge: 'Macronutriente',
        badgeColor: 'bg-lime-100 text-lime-700',
        explanation:
          'El magnesio es el átomo central de la molécula de clorofila y es móvil en la planta. Su deficiencia produce clorosis intervenal clásica en hojas basales (las venas permanecen verdes). Es frecuente en suelos ácidos arenosos o con exceso de potasio o calcio.',
        productIds: ['mg-ultra'],
      }
    if (has('necrosis-bordes'))
      return {
        title: 'Deficiencia de Potasio (K)',
        deficiency: 'Potasio',
        badge: 'Macronutriente',
        badgeColor: 'bg-orange-100 text-orange-700',
        explanation:
          'El potasio regula la apertura estomática, el transporte de azúcares y la turgencia celular. Su deficiencia produce necrosis marginal (bordes quemados) en hojas viejas porque el K se moviliza hacia tejidos jóvenes. Reduce Brix, firmeza y vida de anaquel del fruto.',
        productIds: ['k-ultra', 'bp-potasio'],
      }
    if (has('necrosis-puntas'))
      return {
        title: 'Deficiencia de Potasio (K) o estrés salino',
        deficiency: 'Potasio / Salinidad',
        badge: 'Potasio / Sal',
        badgeColor: 'bg-orange-100 text-orange-700',
        explanation:
          'La necrosis en puntas de hojas viejas puede indicar deficiencia de potasio o toxicidad por sales (Na, Cl). Revisar conductividad eléctrica del agua de riego y del suelo. Si EC < 2 dS/m y no hay exceso de sal, corregir con potasio quelatado.',
        productIds: ['k-ultra'],
      }
  }

  // tallos
  if (zone === 'tallos') {
    if (has('crecimiento-lento'))
      return {
        title: 'Deficiencia de Boro (B)',
        deficiency: 'Boro',
        badge: 'Micronutriente',
        badgeColor: 'bg-indigo-100 text-indigo-700',
        explanation:
          'El boro es fundamental para la integridad de la pared celular y el transporte de azúcares a través del floema. Su deficiencia produce elongación anormal de entrenudos, tallos cortos y engrosados, y muerte del ápice. También afecta el cuajado de frutos.',
        productIds: ['bp-boro'],
      }
  }

  // frutos
  if (zone === 'frutos') {
    if (has('manchas'))
      return {
        title: 'Deficiencia de Calcio (Ca)',
        deficiency: 'Calcio',
        badge: 'Macronutriente',
        badgeColor: 'bg-blue-100 text-blue-700',
        explanation:
          'Las manchas necróticas en frutos (blossom end rot en tomate, bitter pit en manzana) son el síntoma más conocido de la deficiencia de calcio. El Ca no es móvil en el fruto; llega exclusivamente por transpiración. Se agrava con estrés hídrico o fertilización excesiva con N y K.',
        productIds: ['bp-calcio', 'ae-calcium'],
      }
    if (has('deformacion'))
      return {
        title: 'Deficiencia de Boro (B)',
        deficiency: 'Boro',
        badge: 'Micronutriente',
        badgeColor: 'bg-indigo-100 text-indigo-700',
        explanation:
          'El boro es esencial para la polinización y el desarrollo del tubo polínico. Su deficiencia produce frutos deformados, corchosos por dentro, con piel rugosa o con zonas secas. En fresa produce frutos abotonados; en aguacate, frutos con pulpa negra.',
        productIds: ['bp-boro'],
      }
  }

  // raices
  if (zone === 'raices') {
    if (has('crecimiento-lento') || symptoms.length > 0)
      return {
        title: 'Daño radicular / Pythium / Phytophthora',
        deficiency: 'Daño radicular',
        badge: 'Bioprotección',
        badgeColor: 'bg-purple-100 text-purple-700',
        explanation:
          'El daño radicular con síntomas en raíces puede ser causado por oomycetes (Pythium, Phytophthora) u hongos del suelo. Las raíces presentan color café o negro, consistencia blanda y olor fétido. Es crítico actuar rápido: aplicar oxidante + estimulador radicular.',
        productIds: ['bp-oxyagro', 'bp-moots'],
      }
  }

  // Default — multiple deficiencies
  return {
    title: 'Deficiencia Múltiple',
    deficiency: 'Múltiple / Desconocido',
    badge: 'Multinutriente',
    badgeColor: 'bg-gris-100 text-gris-600',
    explanation:
      'Los síntomas presentados sugieren una deficiencia múltiple o un problema sistémico (pH fuera de rango, compactación, exceso de sales). Se recomienda realizar un análisis foliar y de suelo para confirmar el diagnóstico antes de iniciar correcciones específicas.',
    productIds: ['bp-nutri'],
  }
}

// ─── Step Indicator ───────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: WizardStep }) {
  const steps = [
    { n: 1, label: 'Cultivo'   },
    { n: 2, label: 'Zona'      },
    { n: 3, label: 'Síntomas'  },
    { n: 4, label: 'Diagnóstico' },
  ]
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((s, idx) => (
        <div key={s.n} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors
              ${current === s.n ? 'bg-naranja-500 text-white ring-4 ring-naranja-100' :
                current > s.n  ? 'bg-naranja-300 text-white' :
                'bg-gris-200 text-gris-400'}`}>
              {current > s.n ? '✓' : s.n}
            </div>
            <span className={`mt-1 hidden sm:block text-[10px] font-medium
              ${current === s.n ? 'text-naranja-600' : current > s.n ? 'text-naranja-300' : 'text-gris-400'}`}>
              {s.label}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div className={`h-0.5 w-12 sm:w-20 mx-1 transition-colors
              ${current > s.n ? 'bg-naranja-300' : 'bg-gris-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DiagnosticoPage() {
  const [step, setStep] = useState<WizardStep>(1)
  const [selectedCrop, setSelectedCrop] = useState<string>('')
  const [selectedZone, setSelectedZone] = useState<Zone | ''>('')
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([])

  const diagnosis =
    step === 4 && selectedZone
      ? getDiagnosis(selectedZone as Zone, selectedSymptoms)
      : null

  const recommendedProducts =
    diagnosis?.productIds.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean) ?? []

  function toggleSymptom(s: Symptom) {
    setSelectedSymptoms((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    )
  }

  function restart() {
    setStep(1)
    setSelectedCrop('')
    setSelectedZone('')
    setSelectedSymptoms([])
  }

  const waText = diagnosis
    ? encodeURIComponent(
        `Hola, usé la herramienta de diagnóstico Biotiza.\n` +
        `Cultivo: ${selectedCrop}\n` +
        `Diagnóstico probable: ${diagnosis.title}\n` +
        `¿Pueden asesorarme?`,
      )
    : ''

  return (
    <div className="min-h-screen bg-gris-50">
      {/* Hero strip */}
      <div className="bg-gradient-to-r from-naranja-600 to-naranja-500 py-8">
        <Container narrow>
          <div className="flex items-center gap-3">
            <Link href="/herramientas" className="flex items-center gap-1 text-sm text-naranja-100 hover:text-white transition-colors">
              <ChevronLeft className="h-4 w-4" /> Herramientas
            </Link>
            <span className="text-naranja-300">/</span>
            <span className="text-sm text-white font-medium">Diagnóstico de Deficiencias</span>
          </div>
          <h1 className="mt-3 font-serif text-3xl font-normal text-white lg:text-4xl">
            Diagnóstico de Deficiencias
          </h1>
          <p className="mt-2 text-naranja-100 text-sm">
            Responde 3 preguntas y te diremos qué le pasa a tu cultivo.
          </p>
        </Container>
      </div>

      <Container narrow className="py-12">
        <StepIndicator current={step} />

        {/* ── Step 1: Cultivo ── */}
        {step === 1 && (
          <div>
            <h2 className="text-center font-serif text-2xl text-gris-900 mb-8">
              ¿En qué cultivo ves el problema?
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CROPS_DATA.map((crop) => (
                <button
                  key={crop.id}
                  onClick={() => {
                    setSelectedCrop(crop.name)
                    setStep(2)
                  }}
                  className="flex flex-col items-center rounded-2xl border border-gris-200 bg-white py-5 px-3 text-center transition-all hover:border-naranja-300 hover:shadow-md hover:-translate-y-0.5"
                >
                  <span className="text-3xl mb-2">{crop.emoji}</span>
                  <span className="text-sm font-semibold text-gris-800">{crop.name}</span>
                  <span className="text-[10px] text-gris-400 mt-0.5 italic">{crop.description}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 2: Zona ── */}
        {step === 2 && (
          <div>
            <button
              onClick={() => setStep(1)}
              className="mb-6 flex items-center gap-1 text-sm text-gris-400 hover:text-gris-700 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" /> Cambiar cultivo
            </button>

            <div className="mb-4 rounded-xl bg-naranja-50 border border-naranja-100 px-4 py-2.5 inline-block text-sm font-semibold text-naranja-700">
              Cultivo: {selectedCrop}
            </div>

            <h2 className="font-serif text-2xl text-gris-900 mb-6">
              ¿Dónde están los síntomas?
            </h2>
            <div className="space-y-3">
              {ZONES.map(({ id, label, sublabel, Icon, color, bg, border }) => (
                <button
                  key={id}
                  onClick={() => {
                    setSelectedZone(id)
                    setSelectedSymptoms([])
                    setStep(3)
                  }}
                  className={`flex w-full items-center gap-4 rounded-xl border px-5 py-4 text-left transition-all hover:shadow-sm ${bg} ${border} hover:opacity-90`}
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/80 ${color}`}>
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="font-semibold text-gris-800">{label}</p>
                    {sublabel && <p className="text-xs text-gris-500">{sublabel}</p>}
                  </div>
                  <ChevronLeft className="ml-auto h-4 w-4 rotate-180 text-gris-300" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 3: Síntomas ── */}
        {step === 3 && (
          <div>
            <button
              onClick={() => setStep(2)}
              className="mb-6 flex items-center gap-1 text-sm text-gris-400 hover:text-gris-700 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" /> Cambiar zona
            </button>

            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-xl bg-naranja-50 border border-naranja-100 px-3 py-1.5 text-xs font-semibold text-naranja-700">
                {selectedCrop}
              </span>
              <span className="rounded-xl bg-gris-100 border border-gris-200 px-3 py-1.5 text-xs font-semibold text-gris-600">
                {ZONES.find((z) => z.id === selectedZone)?.label}
              </span>
            </div>

            <h2 className="font-serif text-2xl text-gris-900 mb-2">
              ¿Qué síntomas ves?
            </h2>
            <p className="text-sm text-gris-400 mb-6">Puedes seleccionar varios.</p>

            <div className="space-y-2 mb-8">
              {SYMPTOMS.map(({ id, label, emoji }) => {
                const checked = selectedSymptoms.includes(id)
                return (
                  <button
                    key={id}
                    onClick={() => toggleSymptom(id)}
                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all
                      ${checked
                        ? 'border-naranja-400 bg-naranja-50 ring-1 ring-naranja-200'
                        : 'border-gris-200 bg-white hover:border-naranja-200'}`}
                  >
                    <span className="text-xl">{emoji}</span>
                    <span className="flex-1 text-sm text-gris-700">{label}</span>
                    <div className={`h-5 w-5 rounded border-2 flex items-center justify-center transition-colors
                      ${checked ? 'border-naranja-500 bg-naranja-500' : 'border-gris-300'}`}>
                      {checked && <span className="text-[10px] font-bold text-white">✓</span>}
                    </div>
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => setStep(4)}
              disabled={selectedSymptoms.length === 0}
              className="inline-flex items-center gap-2 rounded-full bg-naranja-500 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-naranja-600 disabled:opacity-40"
            >
              Ver diagnóstico →
            </button>
          </div>
        )}

        {/* ── Step 4: Diagnóstico ── */}
        {step === 4 && diagnosis && (
          <div>
            <button
              onClick={() => setStep(3)}
              className="mb-6 flex items-center gap-1 text-sm text-gris-400 hover:text-gris-700 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" /> Cambiar síntomas
            </button>

            {/* Result card */}
            <div className="rounded-2xl border border-gris-200 bg-white shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-naranja-500 to-naranja-400 px-6 py-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-naranja-100 mb-2">
                  Diagnóstico probable
                </p>
                <h2 className="font-serif text-2xl text-white">{diagnosis.title}</h2>
                <div className="mt-3">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${diagnosis.badgeColor}`}>
                    {diagnosis.badge}
                  </span>
                </div>
              </div>

              <div className="px-6 py-6">
                <p className="text-sm leading-relaxed text-gris-600 mb-6">
                  {diagnosis.explanation}
                </p>

                {/* Recommended products */}
                {recommendedProducts.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-gris-400 mb-3">
                      Productos recomendados
                    </h3>
                    <div className="space-y-3">
                      {recommendedProducts.map((product) => {
                        if (!product) return null
                        return (
                          <Link
                            key={product.id}
                            href={`/soluciones/${product.line}/${product.slug}`}
                            className="flex items-center gap-4 rounded-xl border border-gris-200 bg-gris-50 px-4 py-3 transition-all hover:border-naranja-200 hover:bg-naranja-50"
                          >
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-gris-800">{product.name}</p>
                              <p className="text-xs text-gris-400 mt-0.5 line-clamp-2">{product.description}</p>
                            </div>
                            <ChevronLeft className="h-4 w-4 rotate-180 text-gris-300 shrink-0" />
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Disclaimer */}
                <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-700">
                  ⚠️ Este diagnóstico es orientativo. Para confirmación, realiza análisis foliar y consulta con nuestro equipo técnico.
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/523316022708?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-verde-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-verde-600"
              >
                💬 Hablar con agrónomo
              </a>
              <button
                onClick={restart}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-gris-200 bg-white px-6 py-3 text-sm font-semibold text-gris-700 transition-colors hover:bg-gris-50"
              >
                🔄 Reiniciar diagnóstico
              </button>
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}
