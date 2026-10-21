import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { perks, testimonials, journal } from '../../data/content'
import { getProductSync } from '../../services/catalog'
import { useReveal } from '../../hooks/useReveal'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { Title } from './Title'
import { cn } from '../../lib/cn'

/** The services row (ref: Free shipping / 30 days return / Secured payment / Special gifts / Support). */
export function Services() {
  return (
    <ul className="shell grid grid-cols-2 gap-x-4 gap-y-6 border-y border-line py-8 sm:grid-cols-3 lg:mt-0 lg:grid-cols-5">
      {perks.map((p) => (
        <li key={p.title} className="group flex items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line-strong text-ink transition-[background-color,color,border-color,rotate] duration-300 group-hover:-rotate-6 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
            <Icon name={p.icon} size={19} />
          </span>
          <span>
            <span className="block text-[13.5px] font-semibold text-ink">{p.title}</span>
            <span className="block text-[12.5px] text-ink-soft">{p.body}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}

/** "What people say": one centred quote at a time, dots underneath, on a timer that pauses on hover. */
export function Testimonials() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const t = testimonials[i]
  const product = getProductSync(t.productId)

  useEffect(() => {
    if (paused || reduce) return
    const id = setTimeout(() => setI((n) => (n + 1) % testimonials.length), 6000)
    return () => clearTimeout(id)
  }, [i, paused, reduce])

  return (
    <section className="shell pt-16 lg:pt-24" aria-labelledby="voices-title" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <Title id="voices-title">What people say</Title>
      <div className="mx-auto mt-8 max-w-[720px] text-center">
        <Icon name="quote" size={34} weight="fill" className="mx-auto text-tan" />
        <div className="relative mt-4 min-h-[170px] sm:min-h-[140px]" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}>
              <blockquote className="text-[17px] leading-relaxed text-ink sm:text-[19px]">{t.text}</blockquote>
              <figcaption className="mt-5 flex items-center justify-center gap-3">
                <Img id={product.images[0]} alt="" className="size-10 rounded-full" position="50% 25%" />
                <span className="text-left">
                  <span className="block text-[13.5px] font-semibold text-ink">
                    {t.name}, {t.city}
                  </span>
                  <Link to={`/product/${product.slug}`} className="link-line text-[12.5px] text-ink-soft hover:text-ink">
                    {product.name}
                  </Link>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-4 flex justify-center gap-1.5" role="group" aria-label="Choose a review">
          {testimonials.map((r, n) => (
            <button key={r.name} type="button" onClick={() => setI(n)} aria-label={`Review ${n + 1}`} aria-pressed={n === i} className="grid h-6 place-items-center px-0.5">
              <span className={cn('block h-1.5 rounded-full transition-[width,background-color] duration-300 ease-[var(--ease-out)]', n === i ? 'w-6 bg-ink' : 'w-1.5 bg-line-strong hover:bg-ink-soft')} />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

/** "From the journal" (ref: "From the blog"): three short notes that open real pages. */
export function Journal() {
  const ref = useReveal()
  return (
    <section ref={ref} className="shell pt-16 lg:pt-24" aria-labelledby="journal-title">
      <Title id="journal-title">From the comfort journal</Title>
      <ul className="mt-10 grid gap-8 md:grid-cols-3 md:gap-5">
        {journal.map((j, i) => (
          <li key={j.title} data-reveal style={{ '--reveal-delay': `${i * 80}ms` }}>
            <Link to={j.to} className="group block">
              <span className="block overflow-hidden rounded-[8px]">
                <Img id={j.image} alt="" className="aspect-[16/11]" position="50% 30%" imgClassName="transition-transform duration-[1200ms] ease-[var(--ease-out)] group-hover:scale-[1.05]" />
              </span>
              <span className="caps mt-4 block text-[9.5px] text-ink-soft">
                {j.date} · <span className="text-tan-deep">{j.tag}</span>
              </span>
              <span className="headline mt-2 block text-[19px] text-ink">{j.title}</span>
              <span className="mt-2 block text-[14px] leading-relaxed text-ink-soft">{j.body}</span>
              <span className="caps mt-3 inline-flex items-center gap-2 text-[10px] text-ink">
                <span className="link-line">Read more</span>
                <Icon name="arrow" size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
