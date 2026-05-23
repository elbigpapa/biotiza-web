'use client'

import { useEffect } from 'react'
import { track } from '@vercel/analytics'

interface Props {
  productId: string
  line: string
  name: string
}

export default function TrackProductView({ productId, line, name }: Props) {
  useEffect(() => {
    track('product_viewed', { productId, line, name })
  }, [productId, line, name])
  return null
}
