import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { queryProducts } from '../../services/catalog'
import { ProductCard } from '../../features/product/ProductCard'
import { Title } from './Title'
import { cn } from '../../lib/cn'

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'women', label: 'Women' },
  { id: 'men', label: 'Men' },
]

/**
 * "Latest products" (ref: the inspo's five across), with tabs for All / Women / Men. The
 * underline glides between tabs and the cards swap in with a short stagger.
 */
export function LatestProducts() {
  const reduce = useReducedMotion()
  const [tab, setTab] = useState('all')
  const items = useMemo(() => {
    const q = { sort: 'new', limit: 10 }
    if (tab !== 'all') q.occasion = [tab]
    return queryProducts(q)
  }, [tab])

  return (
    <section className="shell pt-16 lg:pt-24" aria-labelledby="latest-title">
      <Title id="latest-title" to={`/shop?sort=new${tab === 'all' ? '' : `&occasion=${tab}`}`}>
        Latest products
      </Title>
      <div role="tablist" aria-label="Show products for" className="mt-6 flex justify-center gap-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cn('caps relative h-10 px-5 text-[10.5px] transition-colors duration-200', tab === t.id ? 'text-ink' : 'text-ink-soft hover:text-ink')}
          >
            {t.label}
            {tab === t.id && (
              <motion.span layoutId="latest-tab" className="absolute inset-x-4 bottom-1 h-[2px] bg-tan" transition={reduce ? { duration: 0 } : { type: 'spring', duration: 0.4, bounce: 0.15 }} />
            )}
          </button>
        ))}
      </div>
      <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-9 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((p, i) => (
            <motion.li
              key={`${tab}-${p.id}`}
              layout={!reduce}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.035, ease: [0.23, 1, 0.32, 1] } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <ProductCard product={p} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </section>
  )
}
