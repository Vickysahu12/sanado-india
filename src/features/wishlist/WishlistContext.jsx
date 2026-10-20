import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { getProductSync } from '../../services/catalog'

// Wishlist is a set of product ids, saved in the browser for now.
// When accounts exist, sync it to the user's profile instead.

const STORAGE_KEY = 'sanado.wishlist.v1'
const WishlistContext = createContext(null)

function loadIds() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(saved) ? saved.filter((id) => getProductSync(id)) : []
  } catch {
    return []
  }
}

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(loadIds)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      // Storage unavailable: keep the list for this session only.
    }
  }, [ids])

  // Mirror of ids so toggle can report whether it added or removed, synchronously.
  const idsRef = useRef(ids)
  useEffect(() => {
    idsRef.current = ids
  }, [ids])

  const toggle = useCallback((id) => {
    const added = !idsRef.current.includes(id)
    setIds((prev) => (added ? [id, ...prev.filter((x) => x !== id)] : prev.filter((x) => x !== id)))
    return added
  }, [])

  const add = useCallback((id) => setIds((prev) => (prev.includes(id) ? prev : [id, ...prev])), [])
  const remove = useCallback((id) => setIds((prev) => prev.filter((x) => x !== id)), [])

  const value = useMemo(
    () => ({
      ids,
      count: ids.length,
      has: (id) => ids.includes(id),
      items: ids.map(getProductSync).filter(Boolean),
      toggle,
      add,
      remove,
    }),
    [ids, toggle, add, remove],
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

// eslint-disable-next-line react/only-export-components
export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used inside <WishlistProvider>')
  return ctx
}
