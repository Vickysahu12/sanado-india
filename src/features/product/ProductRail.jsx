import { useRef } from 'react'
import { ProductCard } from './ProductCard'
import { Icon } from '../../components/ui/Icon'
import { SectionHeading } from '../../components/ui/SectionHeading'

/** Horizontal product row with arrow buttons on desktop, swipe on touch. */
export function ProductRail({ title, products, id }) {
  const rail = useRef(null)
  if (!products.length) return null

  const scroll = (dir) => {
    const el = rail.current
    const card = el?.querySelector('li')
    if (card) el.scrollBy({ left: dir * (card.offsetWidth + 16) * 2, behavior: 'smooth' })
  }

  return (
    <section className="pt-24" aria-labelledby={id}>
      <div className="shell flex items-end justify-between gap-4">
        <SectionHeading id={id} title={title} align="left" />
        <div className="hidden gap-2 lg:flex">
          {[
            [-1, 'caret-left', 'Previous'],
            [1, 'caret-right', 'Next'],
          ].map(([d, icon, label]) => (
            <button
              key={d}
              type="button"
              onClick={() => scroll(d)}
              aria-label={label}
              className="press grid size-12 place-items-center rounded-full bg-paper text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              <Icon name={icon} size={16} />
            </button>
          ))}
        </div>
      </div>
      <ul
        ref={rail}
        className="no-scrollbar mx-auto mt-7 flex max-w-[1400px] snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 sm:scroll-px-6 sm:gap-4 sm:px-6 lg:scroll-px-10 lg:px-10"
      >
        {products.map((p) => (
          <li key={p.id} className="w-[46vw] shrink-0 snap-start sm:w-[30vw] lg:w-[calc((100%-48px)/4)]">
            <ProductCard product={p} sizes="(min-width: 1024px) 23vw, 46vw" />
          </li>
        ))}
      </ul>
    </section>
  )
}
