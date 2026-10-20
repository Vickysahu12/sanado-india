import { useEffect, useState } from 'react'
import { getProductSync } from '../services/catalog'

const KEY = 'sanado.recent.v1'

const read = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? []
  } catch {
    return []
  }
}

/** Records `currentId` as viewed and returns the other recently viewed products. */
export function useRecentlyViewed(currentId) {
  const [ids] = useState(read)

  useEffect(() => {
    if (!currentId) return
    try {
      localStorage.setItem(KEY, JSON.stringify([currentId, ...read().filter((id) => id !== currentId)].slice(0, 12)))
    } catch {
      // not critical
    }
  }, [currentId])

  return ids.filter((id) => id !== currentId).map(getProductSync).filter(Boolean)
}
