import Lenis from 'lenis'

// One smooth-scroll instance for the whole app. Overlays stop it while open, and the
// route scroll manager jumps through it so its internal position never drifts.
let lenis = null

export function startLenis() {
  if (lenis || typeof window === 'undefined') return lenis
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null
  lenis = new Lenis({ duration: 1.05, easing: (t) => 1 - Math.pow(1 - t, 4), anchors: false })
  const raf = (time) => {
    lenis?.raf(time)
    if (lenis) requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
  return lenis
}

export function stopLenis() {
  lenis?.destroy()
  lenis = null
}

export const getLenis = () => lenis

/** Scrolls to a y position or element, through Lenis when it is running. */
export function scrollToTarget(target, { immediate = false, offset = 0 } = {}) {
  if (lenis) return lenis.scrollTo(target, { immediate, offset })
  if (typeof target === 'number') return window.scrollTo({ top: target, behavior: immediate ? 'instant' : 'smooth' })
  const top = target.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo({ top, behavior: immediate ? 'instant' : 'smooth' })
}
