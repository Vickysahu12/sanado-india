import { site } from '../config/site'
// Order placement (demo). Saves orders in the browser so the confirmation and
// "My orders" pages work end to end. Replace with a POST to the backend later.

const KEY = 'sanado.orders.v1'

const read = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? []
  } catch {
    return []
  }
}

export const listOrders = () => read()
export const getOrder = (id) => read().find((o) => o.id === id) ?? null

export async function placeOrder(order) {
  await new Promise((r) => setTimeout(r, 1200)) // simulate network + payment
  const id = `${site.orderPrefix}${Date.now().toString().slice(-8)}`
  const placed = { ...order, id, placedAt: new Date().toISOString(), status: 'Confirmed' }
  try {
    localStorage.setItem(KEY, JSON.stringify([placed, ...read()].slice(0, 20)))
  } catch {
    // Storage unavailable: the order still shows on the confirmation page via router state.
  }
  return placed
}

/** Delivery estimate for a pincode (demo): metros faster, everywhere else 4 to 7 days. */
export async function checkPincode(pin) {
  await new Promise((r) => setTimeout(r, 600))
  if (!/^[1-9]\d{5}$/.test(pin)) return { ok: false, error: 'Enter a valid 6-digit pincode.' }
  const metro = ['11', '40', '56', '60', '70', '50', '41', '38'].includes(pin.slice(0, 2))
  const days = metro ? 3 : 5
  const date = new Date(Date.now() + days * 86400000)
  return {
    ok: true,
    date: date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }),
    cod: true,
  }
}
