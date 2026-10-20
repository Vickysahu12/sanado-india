import { useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { categoryGroups } from '../../data/content'
import { products } from '../../data/products'
import { Img } from '../../components/ui/Img'
import { Title } from './Title'
import { cn } from '../../lib/cn'

const count = (id) => products.filter((p) => p.category === id).length

/**
 * "Top categories" (ref: four photos, each with a white label at the foot), with a For her /
 * For him switch. The label lifts on hover; switching slides the set across.
 */
export function TopCategories() {
  const reduce = useReducedMotion()
  const [who, setWho] = useState('women')
  const list = categoryGroups[who]

  return (
    <section className="mt-16 bg-mist py-16 lg:mt-24 lg:py-24" aria-labelledby="cats-title">
      <div className="shell">
        <Title id="cats-title">Top categories</Title>
        <div className="mt-6 flex justify-center">
          <div role="radiogroup" aria-label="Categories for" className="relative grid grid-cols-2 rounded-[6px] bg-paper p-1 shadow-[inset_0_0_0_1px_var(--color-line)]">
            {[
              ['women', 'For her'],
              ['men', 'For him'],
            ].map(([id, label]) => (
              <button key={id} type="button" role="radio" aria-checked={who === id} onClick={() => setWho(id)} className={cn('caps relative h-10 px-6 text-[10.5px] transition-colors duration-300', who === id ? 'text-paper' : 'text-ink')}>
                {who === id && <motion.span layoutId="cats-pill" className="absolute inset-0 -z-0 rounded-[4px] bg-ink" transition={reduce ? { duration: 0 } : { type: 'spring', duration: 0.4, bounce: 0.15 }} />}
                <span className="relative">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={who}
            className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5"
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: who === 'men' ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: who === 'men' ? -40 : 40 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          >
            {list.map((c) => (
              <li key={c.id}>
                <Link to={c.to} className="group relative block overflow-hidden rounded-[8px] bg-sand">
                  <Img id={c.image} alt={c.label} className="aspect-[4/5]" position="50% 25%" imgClassName="transition-transform duration-[1200ms] ease-[var(--ease-out)] group-hover:scale-[1.06]" />
                  <span className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 rounded-[4px] bg-paper px-4 py-3 shadow-float transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-y-1.5">
                    <span className="caps text-[10.5px] text-ink">{c.label}</span>
                    {count(c.id) > 0 && <span className="text-[11.5px] text-ink-soft tabular-nums">{count(c.id)}</span>}
                  </span>
                </Link>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </section>
  )
}
