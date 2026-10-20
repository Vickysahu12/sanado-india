import { useCallback, useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router'

const MULTI = ['occasion', 'fabric', 'color', 'price']

/**
 * Reads and writes the shop filters from the URL, so filtered pages can be
 * shared, refreshed and navigated with the back button.
 * Multi-value filters are comma separated: ?fabric=Silk,Banarasi
 */
export function useShopQuery() {
  const { category } = useParams()
  const [params, setParams] = useSearchParams()

  const query = useMemo(() => {
    const q = { category, sort: params.get('sort') ?? 'featured', q: params.get('q') ?? '', sale: params.get('sale') === '1' }
    for (const key of MULTI) q[key] = params.get(key)?.split(',').filter(Boolean) ?? []
    return q
  }, [category, params])

  const update = useCallback(
    (mutate) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          mutate(next)
          return next
        },
        { preventScrollReset: true },
      )
    },
    [setParams],
  )

  const toggle = useCallback(
    (key, value) =>
      update((next) => {
        const current = next.get(key)?.split(',').filter(Boolean) ?? []
        const values = current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
        if (values.length) next.set(key, values.join(','))
        else next.delete(key)
      }),
    [update],
  )

  const setSort = useCallback((sort) => update((next) => (sort === 'featured' ? next.delete('sort') : next.set('sort', sort))), [update])
  const setSale = useCallback((on) => update((next) => (on ? next.set('sale', '1') : next.delete('sale'))), [update])
  const clearAll = useCallback(
    () =>
      update((next) => {
        for (const key of [...MULTI, 'sale', 'q']) next.delete(key)
      }),
    [update],
  )

  const activeCount = MULTI.reduce((n, k) => n + query[k].length, 0) + (query.sale ? 1 : 0) + (query.q ? 1 : 0)

  return { query, toggle, setSort, setSale, clearAll, activeCount, update }
}
