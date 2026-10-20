import { useEffect, useRef } from 'react'

const KEYS = [
  ['[data-reveal]', 'reveal'],
  ['[data-reveal-frame]', 'revealFrame'],
]

/**
 * Scroll reveal for children marked [data-reveal] (text fades up) or
 * [data-reveal-frame] (photo frames wipe up). Content is visible by default: only
 * elements still below the fold are armed (hidden), and each plays once as it enters.
 * Styles live in styles/index.css and are skipped under prefers-reduced-motion.
 * Pass deps when the marked children render later.
 */
export function useReveal(deps = []) {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          for (const [, key] of KEYS) if (entry.target.dataset[key] === 'armed') entry.target.dataset[key] = 'in'
          io.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )

    for (const [selector, key] of KEYS) {
      const targets = root.matches(selector) ? [root] : [...root.querySelectorAll(selector)]
      for (const t of targets) {
        if (t.dataset[key] === 'in') continue
        if (t.getBoundingClientRect().top < window.innerHeight * 0.9) continue // already on screen
        t.dataset[key] = 'armed'
        io.observe(t)
      }
    }
    return () => io.disconnect()
    // Re-scan when content that renders later (async data, filters) changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}
