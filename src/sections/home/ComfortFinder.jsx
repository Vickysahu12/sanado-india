import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { needs } from '../../data/content'
import { products } from '../../data/products'
import { ProductCard } from '../../features/product/ProductCard'
import { Icon } from '../../components/ui/Icon'
import { Title } from './Title'
import { cn } from '../../lib/cn'

/**
 * Find your comfort: two quick choices, who it is for and what the day needs, and the best
 * four matches appear underneath. Period days is offered only for her; switching to him
 * while it is picked falls back to Everyday.
 */
export function ComfortFinder() {
  const reduce = useReducedMotion()
  const [who, setWho] = useState('women')
  const [need, setNeed] = useState('everyday')

  const options = needs.filter((n) => !n.only || n.only === who)
  const matches = useMemo(
    () =>
      products
        .filter((p) => p.wear.includes(who) && p.need.includes(need))
        .sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
        .slice(0, 4),
    [who, need],
  )
  const total = products.filter((p) => p.wear.includes(who) && p.need.includes(need)).length

  const pickWho = (w) => {
    setWho(w)
    if (needs.find((n) => n.id === need)?.only && needs.find((n) => n.id === need).only !== w) setNeed('everyday')
  }

  return (
    <section id="comfort" className="shell scroll-mt-28 pt-16 lg:pt-24" aria-labelledby="comfort-title">
      <Title id="comfort-title" kicker="Two taps">
        Find your comfort
      </Title>

      <div className="mx-auto mt-8 max-w-[780px] rounded-[8px] bg-paper p-5 shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-7">
        <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8">
          <fieldset>
            <legend className="caps mb-3 text-[9.5px] text-ink-soft">1 · For</legend>
            <div className="flex gap-2">
              {[
                ['women', 'Her'],
                ['men', 'Him'],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={who === id}
                  onClick={() => pickWho(id)}
                  className={cn('caps press h-11 min-w-[78px] rounded-[4px] border px-4 text-[11px] transition-colors duration-200', who === id ? 'border-ink bg-ink text-paper' : 'border-line-strong text-ink hover:border-ink')}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="caps mb-3 text-[9.5px] text-ink-soft">2 · The day needs</legend>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence initial={false} mode="popLayout">
                {options.map((n) => (
                  <motion.button
                    key={n.id}
                    layout={!reduce}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    type="button"
                    aria-pressed={need === n.id}
                    onClick={() => setNeed(n.id)}
                    className={cn(
                      'press flex h-11 items-center gap-2 rounded-[4px] border px-3.5 text-[13px] font-medium transition-colors duration-200',
                      need === n.id ? 'border-tan-deep bg-tan/15 text-ink' : 'border-line-strong text-ink-soft hover:border-ink hover:text-ink',
                    )}
                  >
                    <Icon name={n.icon} size={16} className={need === n.id ? 'text-tan-deep' : ''} />
                    {n.label}
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </fieldset>
        </div>
      </div>

      <p className="mt-8 text-center text-[13.5px] text-ink-soft" aria-live="polite">
        {total} {total === 1 ? 'piece fits' : 'pieces fit'} · showing the top {matches.length}
      </p>
      <AnimatePresence mode="wait" initial={false}>
        <motion.ul
          key={`${who}-${need}`}
          className="mt-5 grid grid-cols-2 gap-x-3 gap-y-9 lg:grid-cols-4 lg:gap-x-5"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        >
          {matches.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
      <div className="mt-8 flex justify-center">
        <Link to={`/shop?occasion=${who}`} className="caps link-line text-[10.5px] text-ink">
          See everything for {who === 'women' ? 'her' : 'him'}
        </Link>
      </div>
    </section>
  )
}
