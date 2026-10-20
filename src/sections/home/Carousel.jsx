import { useEffect, useMemo, useRef, useState } from 'react'
import { getProductSync } from '../../services/catalog'
import { ProductCard } from '../../features/product/ProductCard'
import { Icon } from '../../components/ui/Icon'
import { Title } from './Title'

/**
 * "New in" as in the inspo: heavy caps title with a count and "View all", then four cards
 * across. More wait off to the right: the row scrolls, square arrows appear on hover, and a
 * thin bar under it tracks how far it has gone (click it to jump).
 */
export function Carousel({ title, ids, to, id }) {
  const items = useMemo(() => ids.map(getProductSync).filter(Boolean), [ids])
  const rail = useRef(null)
  const [progress, setProgress] = useState({ start: 0, size: 0.3 })

  useEffect(() => {
    const el = rail.current
    if (!el) return
    const update = () => {
      const max = el.scrollWidth - el.clientWidth
      setProgress({ size: el.clientWidth / el.scrollWidth, start: max > 0 ? (el.scrollLeft / max) * (1 - el.clientWidth / el.scrollWidth) : 0 })
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [items])

  const scroll = (dir) => {
    const el = rail.current
    const card = el?.querySelector('li')
    if (card) el.scrollBy({ left: dir * (card.offsetWidth + 16) * 2, behavior: 'smooth' })
  }
  const jump = (e) => {
    const el = rail.current
    const r = e.currentTarget.getBoundingClientRect()
    el.scrollTo({ left: ((e.clientX - r.left) / r.width) * (el.scrollWidth - el.clientWidth), behavior: 'smooth' })
  }

  return (
    <section className="pt-16 lg:pt-24" aria-labelledby={id}>
      <div className="shell">
        <Title id={id} to={to}>
          {title}
        </Title>
      </div>
      <div className="group/rail relative mx-auto mt-7 max-w-[1440px] lg:mt-9">
        <ul ref={rail} className="no-scrollbar flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 sm:scroll-px-6 sm:gap-4 sm:px-6 lg:gap-4 lg:scroll-px-10 lg:px-10">
          {items.map((p) => (
            <li key={p.id} className="w-[58vw] shrink-0 snap-start sm:w-[34vw] lg:w-[calc((100%-144px)/5)]">
              <ProductCard product={p} sizes="(min-width: 1024px) 22vw, 58vw" />
            </li>
          ))}
        </ul>
        {[
          [-1, 'caret-left', 'Previous', 'left-3 lg:left-6'],
          [1, 'caret-right', 'Next', 'right-3 lg:right-6'],
        ].map(([d, icon, label, pos]) => (
          <button
            key={d}
            type="button"
            onClick={() => scroll(d)}
            aria-label={`${label} products`}
            className={`press absolute top-[38%] hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-ink text-cream opacity-0 shadow-float transition-[opacity,background-color] duration-300 group-hover/rail:opacity-100 hover:bg-gold hover:text-ink lg:grid ${pos}`}
          >
            <Icon name={icon} size={16} weight="bold" />
          </button>
        ))}
      </div>
      <div className="shell mt-8 flex justify-center">
        <button type="button" onClick={jump} aria-label="Scroll position" className="group/bar relative h-4 w-full max-w-[280px]">
          <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line-strong" />
          <span className="absolute top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-ink transition-[left] duration-150 ease-out group-hover/bar:bg-gold-deep" style={{ left: `${progress.start * 100}%`, width: `${progress.size * 100}%` }} />
        </button>
      </div>
    </section>
  )
}
