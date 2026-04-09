/**
 * /politica-privacidad — Política de Privacidad de Biotiza
 * Nota: el footer enlaza a /privacidad — ambas rutas renderizan este contenido
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import Container from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description:
    'Aviso de privacidad de Biotiza. Conoce cómo recopilamos, usamos y protegemos tu información personal.',
}

export default function PoliticaPrivacidadPage() {
  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gris-100 bg-gris-50">
        <Container className="py-3">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-gris-500"
          >
            <Link href="/" className="hover:text-verde-600 transition-colors">
              Inicio
            </Link>
            <ChevronRight size={12} />
            <span className="font-medium text-gris-800">
              Política de Privacidad
            </span>
          </nav>
        </Container>
      </div>

      <Container narrow className="py-12 lg:py-16">
        <p className="mb-8 text-xs text-gris-400 uppercase tracking-wider font-semibold">
          Última actualización: enero 2025
        </p>

        <h1 className="font-serif text-3xl text-gris-900 lg:text-4xl mb-6">
          Política de Privacidad
        </h1>

        <p className="text-sm text-gris-600 leading-relaxed mb-8">
          En Biotiza respetamos tu privacidad y nos comprometemos a proteger la
          información personal que compartes con nosotros. Este Aviso de
          Privacidad describe cómo recopilamos, usamos y resguardamos tus datos,
          conforme a la Ley Federal de Protección de Datos Personales en
          Posesión de los Particulares (LFPDPPP) y su Reglamento.
        </p>

        {/* 1. Responsable */}
        <h2 className="font-serif text-xl text-gris-900 mt-10 mb-3">
          1. Responsable del tratamiento de datos
        </h2>
        <p className="text-sm text-gris-600 leading-relaxed">
          <strong className="text-gris-800">Biotiza</strong>, con domicilio en
          Zapopan, Jalisco, México, es responsable del tratamiento de tus datos
          personales. Para cualquier consulta relacionada con este aviso, puedes
          escribirnos a{' '}
          <a href="mailto:ventas@biotiza.mx" className="text-verde-600 underline">
            ventas@biotiza.mx
          </a>
          .
        </p>

        {/* 2. Datos que recopilamos */}
        <h2 className="font-serif text-xl text-gris-900 mt-10 mb-3">
          2. Datos personales que recopilamos
        </h2>
        <p className="text-sm text-gris-600 leading-relaxed mb-3">
          Para ofrecerte nuestros servicios de asesoría agrícola, cotización de
          productos y atención al cliente, podemos recopilar los siguientes
          datos:
        </p>
        <ul className="list-disc list-inside text-sm text-gris-600 space-y-1 ml-2">
          <li>Nombre completo</li>
          <li>Correo electrónico</li>
          <li>Número de teléfono o WhatsApp</li>
          <li>Nombre de la empresa o razón social</li>
          <li>
            Información del cultivo: tipo de cultivo, superficie, ubicación
            geográfica
          </li>
          <li>Estado de la República donde se ubica tu operación</li>
        </ul>

        {/* 3. Finalidad */}
        <h2 className="font-serif text-xl text-gris-900 mt-10 mb-3">
          3. Finalidad del uso de datos
        </h2>
        <p className="text-sm text-gris-600 leading-relaxed mb-3">
          Utilizamos tu información personal para:
        </p>
        <ul className="list-disc list-inside text-sm text-gris-600 space-y-1 ml-2">
          <li>Responder a tus solicitudes de cotización e información</li>
          <li>Brindarte asesoría agronómica personalizada</li>
          <li>
            Enviarte información relevante sobre productos, promociones y
            novedades (solo si lo autorizas)
          </li>
          <li>Mejorar nuestros productos, servicios y experiencia web</li>
          <li>Cumplir con obligaciones legales y regulatorias</li>
        </ul>

        {/* 4. Compartición */}
        <h2 className="font-serif text-xl text-gris-900 mt-10 mb-3">
          4. Compartición de datos con terceros
        </h2>
        <p className="text-sm text-gris-600 leading-relaxed">
          Biotiza <strong className="text-gris-800">no comparte, vende ni transfiere</strong>{' '}
          tu información personal a terceros, salvo en los siguientes casos:
          cuando sea requerido por una autoridad competente en el marco de un
          procedimiento legal, o cuando sea necesario para la prestación de un
          servicio que hayas solicitado expresamente (por ejemplo, envío de
          producto).
        </p>

        {/* 5. Derechos ARCO */}
        <h2 className="font-serif text-xl text-gris-900 mt-10 mb-3">
          5. Derechos ARCO
        </h2>
        <p className="text-sm text-gris-600 leading-relaxed">
          Tienes derecho a <strong className="text-gris-800">Acceder</strong>,{' '}
          <strong className="text-gris-800">Rectificar</strong>,{' '}
          <strong className="text-gris-800">Cancelar</strong> u{' '}
          <strong className="text-gris-800">Oponerte</strong> al tratamiento de
          tus datos personales (derechos ARCO). Para ejercer cualquiera de estos
          derechos, envía un correo a{' '}
          <a
            href="mailto:privacidad@biotiza.mx"
            className="text-verde-600 underline"
          >
            privacidad@biotiza.mx
          </a>{' '}
          indicando tu nombre completo, la descripción de los datos sobre los
          que deseas ejercer algún derecho y los documentos que acrediten tu
          identidad. Responderemos en un plazo máximo de 20 días hábiles.
        </p>

        {/* 6. Cookies */}
        <h2 className="font-serif text-xl text-gris-900 mt-10 mb-3">
          6. Uso de cookies y tecnologías de rastreo
        </h2>
        <p className="text-sm text-gris-600 leading-relaxed">
          Nuestro sitio web utiliza cookies técnicas y de análisis para mejorar
          tu experiencia de navegación, analizar el tráfico y personalizar el
          contenido. Las cookies no recopilan información personal identificable
          directamente. Puedes desactivar las cookies en la configuración de tu
          navegador, aunque esto podría afectar la funcionalidad del sitio.
        </p>

        {/* 7. Cambios */}
        <h2 className="font-serif text-xl text-gris-900 mt-10 mb-3">
          7. Cambios a este aviso de privacidad
        </h2>
        <p className="text-sm text-gris-600 leading-relaxed">
          Biotiza se reserva el derecho de modificar este Aviso de Privacidad en
          cualquier momento. Cualquier cambio será publicado en esta misma
          página, y la fecha de última actualización se reflejará al inicio del
          documento. Te recomendamos consultar esta página periódicamente.
        </p>

        {/* 8. Contacto */}
        <h2 className="font-serif text-xl text-gris-900 mt-10 mb-3">
          8. Contacto
        </h2>
        <p className="text-sm text-gris-600 leading-relaxed">
          Si tienes preguntas o comentarios sobre este Aviso de Privacidad o
          sobre el manejo de tus datos personales, contáctanos:
        </p>
        <ul className="mt-3 text-sm text-gris-600 space-y-1">
          <li>
            Correo:{' '}
            <a
              href="mailto:ventas@biotiza.mx"
              className="text-verde-600 underline"
            >
              ventas@biotiza.mx
            </a>
          </li>
          <li>
            Privacidad:{' '}
            <a
              href="mailto:privacidad@biotiza.mx"
              className="text-verde-600 underline"
            >
              privacidad@biotiza.mx
            </a>
          </li>
          <li>Ubicación: Zapopan, Jalisco, México</li>
        </ul>

        {/* Navegación inferior */}
        <div className="mt-14 border-t border-gris-100 pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-gris-500 hover:text-verde-600 transition-colors"
          >
            <ArrowLeft size={14} />
            Volver al inicio
          </Link>
        </div>
      </Container>
    </div>
  )
}
