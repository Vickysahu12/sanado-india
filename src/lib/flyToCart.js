// "Add to bag" feedback: a copy of the product photo arcs from where it was tapped into the
// bag icon in the header ([data-bag-target]). Pure Web Animations, so it runs off the
// React tree and cleans itself up. Skipped under reduced motion.

export function flyToCart(sourceEl, src) {
  if (typeof window === 'undefined' || !sourceEl) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const target = [...document.querySelectorAll('[data-bag-target]')].find((el) => el.getClientRects().length)
  if (!target) return

  const from = sourceEl.getBoundingClientRect()
  const to = target.getBoundingClientRect()
  const size = Math.min(from.width, from.height, 220)
  const startX = from.left + from.width / 2 - size / 2
  const startY = from.top + from.height / 2 - size / 2
  const dx = to.left + to.width / 2 - (startX + size / 2)
  const dy = to.top + to.height / 2 - (startY + size / 2)
  const end = 24 / size

  const ghost = document.createElement('img')
  ghost.src = src
  ghost.alt = ''
  Object.assign(ghost.style, {
    position: 'fixed',
    left: `${startX}px`,
    top: `${startY}px`,
    width: `${size}px`,
    height: `${size}px`,
    objectFit: 'cover',
    borderRadius: '50%',
    zIndex: 90,
    pointerEvents: 'none',
    boxShadow: '0 20px 40px -20px rgb(24 32 97 / 0.6)',
  })
  document.body.appendChild(ghost)

  const anim = ghost.animate(
    [
      { transform: 'translate(0, 0) scale(0.6)', opacity: 0 },
      { transform: 'translate(0, -20px) scale(0.75)', opacity: 1, offset: 0.15 },
      { transform: `translate(${dx * 0.55}px, ${dy * 0.55 - 70}px) scale(${0.45 + end})`, opacity: 1, offset: 0.6 },
      { transform: `translate(${dx}px, ${dy}px) scale(${end})`, opacity: 0.6 },
    ],
    { duration: 850, easing: 'cubic-bezier(0.5, 0, 0.2, 1)', fill: 'forwards' },
  )
  anim.onfinish = () => ghost.remove()
  anim.oncancel = () => ghost.remove()
}
