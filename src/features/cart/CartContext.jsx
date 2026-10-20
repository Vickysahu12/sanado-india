import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'
import { getProductSync } from '../../services/catalog'
import { site } from '../../config/site'

// Cart lines are { productId, variant, qty }. Product details and prices are looked up
// on read, so prices always come from the catalogue (later, the API), never from storage.
// `variant` is a label: a size like 'M', like 'M'.
// A variant suffix can add a flat fee (site.stitchFee); Sanado India does not use one (fee 0).

const STORAGE_KEY = 'sanado.cart.v1'
const CartContext = createContext(null)

export const lineKey = (l) => `${l.productId}|${l.variant}`
export const STITCH_SUFFIX = ', blouse stitched'
export const isStitched = (variant) => Boolean(variant?.endsWith(STITCH_SUFFIX))
export const unitPrice = (product, variant) => product.price + (isStitched(variant) ? site.stitchFee : 0)
const unitMrp = (product, variant) => (product.compareAt ?? product.price) + (isStitched(variant) ? site.stitchFee : 0)

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const key = lineKey(action)
      const existing = state.lines.find((l) => lineKey(l) === key)
      const lines = existing
        ? state.lines.map((l) => (l === existing ? { ...l, qty: Math.min(10, l.qty + action.qty) } : l))
        : [...state.lines, { productId: action.productId, variant: action.variant, qty: action.qty }]
      return { ...state, lines, addedAt: Date.now() }
    }
    case 'setQty':
      return {
        ...state,
        lines: state.lines
          .map((l) => (lineKey(l) === action.key ? { ...l, qty: Math.min(10, action.qty) } : l))
          .filter((l) => l.qty > 0),
      }
    case 'remove':
      return { ...state, lines: state.lines.filter((l) => lineKey(l) !== action.key) }
    case 'coupon':
      return { ...state, coupon: action.code }
    case 'clear':
      return { ...state, lines: [], coupon: null }
    case 'open':
      return { ...state, open: action.open }
    default:
      return state
  }
}

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return {
      lines: Array.isArray(saved?.lines) ? saved.lines.filter((l) => getProductSync(l.productId)) : [],
      coupon: saved?.coupon ?? null,
    }
  } catch {
    return { lines: [], coupon: null }
  }
}

/** Validate a coupon against a subtotal. Returns { ok, coupon?, error? }. */
export function checkCoupon(code, subtotal) {
  const key = code.trim().toUpperCase()
  const coupon = site.coupons[key]
  if (!coupon) return { ok: false, error: 'This code is not valid.' }
  if (coupon.min && subtotal < coupon.min) {
    return { ok: false, error: `Add items worth ₹${(coupon.min - subtotal).toLocaleString('en-IN')} more to use ${key}.` }
  }
  return { ok: true, code: key, coupon }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => ({ ...load(), open: false, addedAt: 0 }))

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ lines: state.lines, coupon: state.coupon }))
    } catch {
      // Storage unavailable (private mode). The cart still works for this session.
    }
  }, [state.lines, state.coupon])

  const add = useCallback((productId, variant, qty = 1) => dispatch({ type: 'add', productId, variant, qty }), [])
  const setQty = useCallback((key, qty) => dispatch({ type: 'setQty', key, qty }), [])
  const remove = useCallback((key) => dispatch({ type: 'remove', key }), [])
  const applyCoupon = useCallback((code) => dispatch({ type: 'coupon', code }), [])
  const clear = useCallback(() => dispatch({ type: 'clear' }), [])
  const setOpen = useCallback((open) => dispatch({ type: 'open', open }), [])

  const value = useMemo(() => {
    const items = state.lines.map((line) => {
      const product = getProductSync(line.productId)
      const unit = unitPrice(product, line.variant)
      const mrp = unitMrp(product, line.variant)
      return { ...line, key: lineKey(line), product, unit, lineTotal: unit * line.qty, lineMrp: mrp * line.qty }
    })
    const count = items.reduce((n, l) => n + l.qty, 0)
    const subtotal = items.reduce((s, l) => s + l.lineTotal, 0)
    const mrpTotal = items.reduce((s, l) => s + l.lineMrp, 0)

    // Re-check the coupon whenever the cart changes; drop it silently if it no longer applies.
    const check = state.coupon ? checkCoupon(state.coupon, subtotal) : null
    const coupon = check?.ok ? { code: check.code, ...check.coupon } : null
    const couponDiscount = coupon
      ? Math.round(coupon.type === 'percent' ? (subtotal * coupon.value) / 100 : coupon.value)
      : 0
    const shipping = count === 0 || subtotal >= site.freeShippingOver ? 0 : site.shippingFee
    const total = Math.max(0, subtotal - couponDiscount + shipping)

    return {
      items,
      count,
      subtotal,
      mrpTotal,
      savings: mrpTotal - subtotal,
      coupon,
      couponDiscount,
      shipping,
      total,
      open: state.open,
      addedAt: state.addedAt,
      add,
      setQty,
      remove,
      applyCoupon,
      clear,
      setOpen,
    }
  }, [state, add, setQty, remove, applyCoupon, clear, setOpen])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react/only-export-components
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
