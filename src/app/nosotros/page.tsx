/**
 * nosotros/page.tsx — Spreads editoriales · Sub-fase 3.6a
 * Reemplaza biotiza-web/src/app/nosotros/page.tsx
 */

import type { Metadata } from 'next'
import Container from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Nosotros · Servicio que nos diferencia | Biotiza',
  description: 'Veinticinco años trabajando con productores mexicanos. Servicio técnico con agrónomo asignado por zona.',
}

export default function NosotrosPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section
        className="relative min-h-[70vh] flex flex-col justify-end text-white overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(8,46,33,0.30) 0%, rgba(8,46,33,0.55) 55%, rgba(8,46,33,0.95) 100%), url('https://images.unsplash.com/photo-1500076656116-558758c991c1?w=2400&q=85&auto=format&fit=crop')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }}
      >
        <Container className="py-[110px_60px]">
          <div className="flex justify-between items-baseline font-mono text-[11px] tracking-[0.18em] uppercase text-white/70 mb-7 pb-4 border-b border-white/20">
            <span><span className="text-verde-300 font-semibold">Biotiza</span> · empresa · Zapopan, MX</span>
            <span>25 años de I+D</span>
          </div>
          <h1 className="title-hero text-white max-w-[14ch]">
            <em style={{ fontFamily: 'var(--serif-it)' }} className="text-verde-300">Generamos</em><br />
            vida y valor<br />al campo.
          </h1>
          <p className="mt-7 max-w-[40ch] text-[clamp(16px,1.5vw,22px)] leading-[1.5] text-white/88">
            Veinticinco años trabajando con productores mexicanos, con un servicio
            que combina los mejores productos del mercado y la mejor asesoría técnica.
          </p>
        </Container>
      </section>

      {/* Spread 1 · Origen */}
      <section className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
        <div
          className="min-h-[70vh] relative"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1600&q=80&auto=format&fit=crop')`,
            backgroundSize: 'cover', backgroundPosition: 'center',
          }}
        >
          <div className="absolute bottom-5 left-5 right-5 font-mono text-[10px] tracking-[0.16em] uppercase text-white/85 bg-black/45 backdrop-blur-sm px-3 py-2">
            N° 01 · Laboratorio · Zapopan, Jalisco
          </div>
        </div>
        <div className="p-12 lg:p-20 flex flex-col justify-center bg-paper">
          <p className="eyebrow-edit eyebrow-muted mb-5">— Capítulo 01 · Origen</p>
          <h3 className="font-serif text-[clamp(40px,5vw,72px)] leading-[0.98] tracking-[-0.035em] mb-7 max-w-[14ch]">
            Empezamos por <em style={{ fontFamily: 'var(--serif-it)' }} className="text-verde-700">servicio</em>, no por catálogo.
          </h3>
          <p className="text-[17px] leading-[1.7] text-ink-2 max-w-[50ch] mb-4">
            <span className="font-serif text-[5em] leading-[0.8] float-left mr-3 -mt-1 text-verde-700">B</span>
            iotiza nació hace 25 años con una idea sencilla: el productor mexicano
            merece la mejor agronomía disponible — no necesariamente la marca de moda,
            sino la combinación correcta de producto y acompañamiento técnico.
          </p>
          <p className="text-[17px] leading-[1.7] text-ink-2 max-w-[50ch]">
            Trabajamos con varios laboratorios y formuladores líderes — algunos los
            fabricamos nosotros, otros los seleccionamos del mercado nacional e
            internacional — y los entregamos directamente al campo con asesoría incluida.
          </p>
        </div>
      </section>

      {/* Spread 2 · Método (invertido) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
        <div className="p-12 lg:p-20 flex flex-col justify-center bg-paper-2 order-2 lg:order-1">
          <p className="eyebrow-edit eyebrow-muted mb-5">— Capítulo 02 · Método</p>
          <h3 className="font-serif text-[clamp(40px,5vw,72px)] leading-[0.98] tracking-[-0.035em] mb-7 max-w-[14ch]">
            El producto correcto, <em style={{ fontFamily: 'var(--serif-it)' }} className="text-verde-700">en el momento correcto</em>.
          </h3>
          <p className="text-[17px] leading-[1.7] text-ink-2 max-w-[50ch] mb-4">
            <span className="font-serif text-[5em] leading-[0.8] float-left mr-3 -mt-1 text-verde-700">N</span>
            o vendemos catálogo en frasco. Vendemos protocolos: secuencias de productos
            y aplicaciones diseñadas por nuestros agrónomos, basadas en lo que el cultivo
            y la zona necesitan en cada etapa.
          </p>
          <p className="text-[17px] leading-[1.7] text-ink-2 max-w-[50ch]">
            Si la solución correcta es un producto nuestro, lo recomendamos. Si es de otro
            fabricante con respaldo serio, lo decimos también. La honestidad técnica es lo
            que sostiene la relación con cada productor a lo largo de los años.
          </p>
        </div>
        <div
          className="min-h-[70vh] relative order-1 lg:order-2"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=80&auto=format&fit=crop')`,
            backgroundSize: 'cover', backgroundPosition: 'center',
          }}
        >
          <div className="absolute bottom-5 left-5 right-5 font-mono text-[10px] tracking-[0.16em] uppercase text-white/85 bg-black/45 backdrop-blur-sm px-3 py-2">
            N° 02 · Visita técnica · ajuste de protocolo en campo
          </div>
        </div>
      </section>

      {/* Categorías que manejamos · sin marcas */}
      <section className="bg-paper py-24 lg:py-32 border-y border-rule">
        <Container>
          <p className="eyebrow-edit eyebrow-green mb-5">— Categorías que manejamos</p>
          <h2 className="title-display mb-7" style={{ fontSize: 'clamp(36px,5vw,72px)' }}>
            Cinco familias.<br />Un solo <em>criterio de calidad</em>.
          </h2>
          <p className="dek-edit text-ink-2 max-w-[60ch] mb-12">
            Cada producto pasa por el mismo filtro: respaldo científico, ficha técnica,
            certificación sanitaria mexicana, y validación en cultivos comparables al tuyo.
          </p>
          <div className="border-t border-ink">
            {[
              { num:'01', name:'Fertilización', em:'orgánica',  meta:'Quelatos y enraizadores con cert. OMRI · base de programas limpios', count:'10', color:'text-verde-700' },
              { num:'02', name:'Especialidades', em:null,        meta:'Correctores de deficiencias e inoculantes microbianos puntuales',     count:'06', color:'text-azul-600' },
              { num:'03', name:'Bioestimulación',em:null,        meta:'Aminoácidos, citoquininas, promotores de floración y cuajado',         count:'06', color:'text-naranja-500' },
              { num:'04', name:'Nutrición',     em:'líquida',    meta:'Fertilizantes de alta concentración para fertirrigación de precisión', count:'10', color:'text-naranja-400' },
              { num:'05', name:'Bioprotección', em:'natural',    meta:'Bioinsecticidas, biofungicidas y bactericidas naturales',              count:'17', color:'text-azul-500' },
            ].map(l => (
              <div key={l.num} className="grid grid-cols-[80px_1fr_140px_50px] items-center gap-[clamp(20px,4vw,50px)] py-[clamp(20px,3vw,32px)] border-b border-rule">
                <span className={`font-serif text-[clamp(36px,4vw,56px)] leading-none tracking-[-0.04em] ${l.color}`}>{l.num}</span>
                <div>
                  <div className="font-serif text-[clamp(28px,3.5vw,48px)] leading-[1.05] tracking-[-0.03em]">
                    {l.name}{' '}
                    {l.em && <em style={{ fontFamily: 'var(--serif-it)' }} className={l.color}>{l.em}</em>}
                  </div>
                  <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-4 mt-1.5 font-semibold">{l.meta}</div>
                </div>
                <span className="font-mono text-[13px] text-ink-3 text-right font-medium">
                  <span className={`font-serif text-[32px] leading-none ${l.color} tracking-[-0.03em] mr-1`}>{l.count}</span>
                  productos
                </span>
                <span className="font-serif text-2xl text-ink-3">›</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Compromiso · "Lo que NO vamos a hacer" */}
      <section className="bg-white py-24 lg:py-32 border-b border-rule">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-20 items-center">
            <div>
              <p className="eyebrow-edit eyebrow-orange mb-5">— Compromiso</p>
              <h2 className="title-display max-w-[14ch]" style={{ fontSize: 'clamp(36px,5vw,72px)' }}>
                Lo que <em>no</em><br />vamos a hacer.
              </h2>
            </div>
            <div className="space-y-5">
              {[
                ['No prometemos números mágicos.','Cada cifra que publicamos proviene de ficha técnica o certificado verificable.'],
                ['No vendemos en caja sin acompañamiento.','Cada compra incluye al agrónomo asignado a tu zona.'],
                ['No recomendamos lo que no usaríamos.','Si el problema requiere un producto de otro fabricante, lo decimos.'],
                ['No desaparecemos después de la venta.','Estamos en WhatsApp cuando algo cambia en campo.'],
              ].map(([h, b]) => (
                <p key={h} className="text-[17px] leading-[1.65] text-ink-2 max-w-[54ch]">
                  <strong className="font-semibold text-ink">{h}</strong> {b}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA · "Trabajamos contigo" */}
      <section className="relative overflow-hidden bg-verde-950 text-white py-24 lg:py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 80% at 90% 20%, rgba(34,181,115,0.22), transparent 60%), radial-gradient(ellipse 50% 50% at 10% 80%, rgba(232,105,15,0.16), transparent 60%)',
          }}
          aria-hidden="true"
        />
        <Container className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-20 items-center">
            <div>
              <p className="eyebrow-edit eyebrow-light no-line mb-5">Compromiso</p>
              <h2 className="title-display text-white max-w-[14ch]">
                Trabajamos<br /><em style={{ fontFamily: 'var(--serif-it)' }} className="text-verde-300">contigo</em>,<br />
                no para ti.
              </h2>
            </div>
            <div>
              <p className="text-lg leading-[1.55] text-white/88 max-w-[54ch] mb-6">
                Cada productor Biotiza tiene un agrónomo asignado que conoce tu cultivo,
                tu zona, tu agua, tus objetivos y los retos específicos del ciclo.
              </p>
              <p className="text-base leading-[1.55] text-white/78 max-w-[54ch] mb-9">
                Ese acompañamiento, junto con los mejores productos disponibles del mercado,
                es lo que nos diferencia.
              </p>
              <div className="flex items-center gap-5 flex-wrap mb-7">
                <a
                  href="https://wa.me/523316022708?text=Hola%20Biotiza%2C%20quiero%20conocer%20su%20servicio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-naranja-500 text-white font-mono text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-naranja-600 hover:-translate-y-0.5 transition-all"
                >
                  Hablar con un asesor →
                </a>
                <a href="/cultivos" className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white/85 border-b border-current pb-0.5 hover:text-verde-300">
                  o explorar los expedientes
                </a>
              </div>
              <div className="pt-6 border-t border-white/15 flex flex-wrap gap-7 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                <span>+52 33 1602 2708</span>
                <span>ventas@biotiza.mx</span>
                <a
                  href="https://www.instagram.com/biotiza.mx/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-verde-300 transition-colors"
                >
                  @biotiza.mx
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
