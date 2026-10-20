// Data access layer. Components only talk to these functions.
// Today they read local data; later, point them at the backend, e.g.
//   export const listProducts = (query) => api.get('/products', { params: query })
import { products, getProduct as findProduct, getProductBySlug as findBySlug } from '../data/products'
import { priceBands } from '../data/content'

const asArray = (v) => (v == null || v === '' ? [] : Array.isArray(v) ? v : [v])

/**
 * Filter + sort the catalogue.
 * query: { category, occasion[], fabric[], color[], price[] (band ids), sale, bestseller, q, sort, limit }
 */
export function queryProducts(query = {}) {
  const occasions = asArray(query.occasion)
  const fabrics = asArray(query.fabric)
  const colors = asArray(query.color)
  const bands = priceBands.filter((b) => asArray(query.price).includes(b.id))
  const q = (query.q ?? '').trim().toLowerCase()

  let items = products.filter((p) => {
    if (query.category && p.category !== query.category) return false
    if (occasions.length && !occasions.some((o) => p.occasions.includes(o))) return false
    if (fabrics.length && !fabrics.includes(p.fabric)) return false
    if (colors.length && !colors.includes(p.color)) return false
    if (bands.length && !bands.some((b) => p.price >= b.min && p.price <= b.max)) return false
    if (query.sale && !p.compareAt) return false
    if (query.bestseller && !p.bestseller) return false
    if (q && !`${p.name} ${p.fabric} ${p.color} ${p.category} ${p.occasions.join(' ')}`.toLowerCase().includes(q)) return false
    return true
  })

  const sorters = {
    new: (a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)) || b.id.localeCompare(a.id),
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
  }
  if (sorters[query.sort]) items = [...items].sort(sorters[query.sort])
  if (query.limit) items = items.slice(0, query.limit)
  return items
}

export const listProducts = async (query) => queryProducts(query)

export const getProductSync = (id) => findProduct(id) ?? null
export const getProductBySlug = (slug) => findBySlug(slug) ?? null

/** Same design in other colours. */
export const getSiblings = (product) =>
  product.family ? products.filter((p) => p.family === product.family) : [product]

/** Similar pieces: same category and fabric or occasion first. */
export function getRelated(product, limit = 8) {
  const score = (p) =>
    (p.category === product.category ? 2 : 0) +
    (p.fabric === product.fabric ? 2 : 0) +
    p.occasions.filter((o) => product.occasions.includes(o)).length
  return products
    .filter((p) => p.id !== product.id && p.family !== product.family)
    .map((p) => [p, score(p)])
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([p]) => p)
}

/** Facet values with counts, for the filter sidebar. */
export function getFacets(base = {}) {
  const pool = queryProducts({ category: base.category })
  const count = (key) => {
    const map = new Map()
    for (const p of pool) for (const v of asArray(p[key])) map.set(v, (map.get(v) ?? 0) + 1)
    return [...map.entries()].sort((a, b) => b[1] - a[1])
  }
  const colorHex = Object.fromEntries(pool.map((p) => [p.color, p.hex]))
  return { fabric: count('fabric'), occasion: count('occasions'), color: count('color'), colorHex }
}

export const searchProducts = async (q, { limit = 6 } = {}) => (q.trim() ? queryProducts({ q, limit }) : [])
