'use client'

/**
 * useQuotationCart.tsx — Carrito de cotización global con Context + localStorage
 *
 * Uso:
 *   // En layout o página raíz:
 *   <QuotationCartProvider>{children}</QuotationCartProvider>
 *
 *   // En cualquier componente hijo:
 *   const { items, addItem, removeItem, totalItems } = useQuotationCart()
 *
 * Nota: si el hook se usa fuera de un Provider, devuelve un estado vacío no-op
 * en lugar de lanzar un error, para que páginas standalone funcionen sin problemas.
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import type { ProductLine } from '@/types'

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface CartItem {
  productId:   string
  productName: string
  /** Línea de producto: 'organicos' | 'especialidades' | 'bioestimulantes' | 'nutricion' | 'zentia' */
  productLine: ProductLine
  productSlug: string
  /** Cantidad en litros o kg */
  quantity: number
  /** Unidad normalizada: 'L' | 'kg' */
  unit: string
  notes?: string
}

export interface QuotationCartContextValue {
  items:          CartItem[]
  addItem:        (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeItem:     (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart:      () => void
  totalItems:     number
  isInCart:       (productId: string) => boolean
}

// ─── Constantes ───────────────────────────────────────────────────────────────

const STORAGE_KEY = 'biotiza-quotation-cart'

// ─── Contexto ─────────────────────────────────────────────────────────────────

const QuotationCartContext = createContext<QuotationCartContextValue | null>(null)

// ─── Valor por defecto (fallback cuando no hay Provider) ─────────────────────

const DEFAULT_NO_OP_VALUE: QuotationCartContextValue = {
  items:          [],
  addItem:        () => {},
  removeItem:     () => {},
  updateQuantity: () => {},
  clearCart:      () => {},
  totalItems:     0,
  isInCart:       () => false,
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function QuotationCartProvider({ children }: { children: ReactNode }) {
  // Inicializar vacío para evitar mismatch de hidratación SSR/CSR
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  // Cargar desde localStorage solo en el cliente
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[]
        if (Array.isArray(parsed)) {
          setItems(parsed)
        }
      }
    } catch {
      // Si el JSON está corrupto, empezar limpio
      localStorage.removeItem(STORAGE_KEY)
    } finally {
      setHydrated(true)
    }
  }, [])

  // Persistir en localStorage cada vez que items cambia (después de hidratar)
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // localStorage podría estar lleno o bloqueado (modo privado)
    }
  }, [items, hydrated])

  // ── Acciones ──────────────────────────────────────────────────────────────

  const addItem = useCallback(
    (itemWithoutQty: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === itemWithoutQty.productId)
        if (existing) {
          // Si ya existe, incrementar la cantidad
          return prev.map((i) =>
            i.productId === itemWithoutQty.productId
              ? { ...i, quantity: i.quantity + quantity }
              : i,
          )
        }
        // Si no existe, agregar nuevo ítem
        return [...prev, { ...itemWithoutQty, quantity }]
      })
    },
    [],
  )

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId))
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      // Si la cantidad es 0 o negativa, eliminar el ítem
      setItems((prev) => prev.filter((i) => i.productId !== productId))
    } else {
      setItems((prev) =>
        prev.map((i) =>
          i.productId === productId ? { ...i, quantity } : i,
        ),
      )
    }
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const isInCart = useCallback(
    (productId: string) => items.some((i) => i.productId === productId),
    [items],
  )

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)

  const value: QuotationCartContextValue = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    isInCart,
  }

  return (
    <QuotationCartContext.Provider value={value}>
      {children}
    </QuotationCartContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Hook para acceder al carrito de cotización.
 * Si se usa fuera de un `<QuotationCartProvider>`, devuelve un estado vacío
 * no-op en lugar de lanzar un error.
 */
export function useQuotationCart(): QuotationCartContextValue {
  const context = useContext(QuotationCartContext)
  if (context === null) {
    // Fallback seguro: permite usar el hook sin Provider en páginas standalone
    return DEFAULT_NO_OP_VALUE
  }
  return context
}
