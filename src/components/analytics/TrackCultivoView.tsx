'use client'

import { useEffect } from 'react'
import { track } from '@vercel/analytics'

interface Props {
  slug: string
  name: string
  hasProtocol: boolean
}

export default function TrackCultivoView({ slug, name, hasProtocol }: Props) {
  useEffect(() => {
    track('cultivo_viewed', { slug, name, hasProtocol })
  }, [slug, name, hasProtocol])
  return null
}
