import { useEffect, useRef } from 'react'
import { getLenis } from '../lib/lenis'

let locks = 0

/**
 * Shared behaviour for drawers, sheets and modals while open:
 * Escape closes, page scroll is locked (ref-counted so overlays can stack),
 * focus moves into the overlay and returns to the trigger on close.
 * Returns a ref for the element that should receive focus first.
 */
export function useOverlay(open, onClose) {
  const focusRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    if (locks++ === 0) {
      document.documentElement.style.overflow = 'hidden'
      getLenis()?.stop()
    }
    focusRef.current?.focus({ preventScroll: true })
    return () => {
      document.removeEventListener('keydown', onKey)
      if (--locks === 0) {
        document.documentElement.style.overflow = ''
        getLenis()?.start()
      }
      previous?.focus?.({ preventScroll: true })
    }
  }, [open, onClose])

  return focusRef
}
