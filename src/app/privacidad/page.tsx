/**
 * /privacidad — Redirige a /politica-privacidad
 * El Footer enlaza a /privacidad.
 */

import { redirect } from 'next/navigation'

export default function PrivacidadRedirect() {
  redirect('/politica-privacidad')
}
