import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { heroPanels, cutout } from '../../data/content'
import { Button } from '../../components/ui/Button'
import { cn } from '../../lib/cn'

/**
 * Hero after the inspo's wide banner (text left, model right on a soft ground), split in two:
 * one panel for her, one for him. On a desktop the panel under the pointer widens and its
 * model steps forward; on phones the panels stack. The copy and models rise in on load.
 */
export function HeroSplit() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(null)

  return (
    <section aria-labelledby="hero-title" className="shell pt-4 lg:pt-6">
      <h1 id="hero-title" className="sr-only">
        Sanado India: innerwear and loungewear for women and men
      </h1>
      <div className="flex flex-col gap-3 lg:h-[min(620px,calc(100dvh-140px))] lg:min-h-[520px] lg:flex-row" onMouseLeave={() => setActive(null)}>
        {heroPanels.map((p, i) => {
          const grow = active == null ? 1 : active === p.id ? 1.45 : 0.75
          return (
            <motion.article
              key={p.id}
              onMouseEnter={() => setActive(p.id)}
              animate={{ flexGrow: grow }}
              transition={{ type: 'spring', duration: 0.7, bounce: 0.12 }}
              className={cn('relative isolate flex min-h-[440px] basis-0 overflow-hidden rounded-[8px] sm:min-h-[480px] lg:min-h-0', p.tone)}
            >
              {/* The wave, large and faint, behind the model */}
              <span aria-hidden="true" className="wave absolute right-[-12%] bottom-[18%] -z-10 h-[16%] text-tan/25" />

              <div className="relative z-10 flex w-[62%] max-w-[360px] flex-col justify-center p-6 sm:p-9 lg:p-12">
                <motion.p
                  className="caps text-[10px] text-tan-deep"
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: [0.23, 1, 0.32, 1] }}
                >
                  {p.kicker}
                </motion.p>
                <motion.h2
                  className="headline mt-4 text-[30px] text-ink sm:text-[40px] lg:text-[44px]"
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.25 + i * 0.12, ease: [0.23, 1, 0.32, 1] }}
                >
                  {p.title}
                </motion.h2>
                <motion.p
                  className="mt-4 max-w-[34ch] text-[14.5px] leading-relaxed text-ink-soft"
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.35 + i * 0.12, ease: [0.23, 1, 0.32, 1] }}
                >
                  {p.body}
                </motion.p>
                <motion.div
                  className="mt-7"
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.45 + i * 0.12, ease: [0.23, 1, 0.32, 1] }}
                >
                  <Button to={p.to} size="sm" arrow>
                    {p.cta}
                  </Button>
                </motion.div>
              </div>

              <motion.img
                src={cutout(p.cut)}
                alt=""
                draggable={false}
                fetchPriority={i === 0 ? 'high' : undefined}
                className={cn(
                  'pointer-events-none absolute bottom-0 h-[92%] w-auto max-w-none object-contain drop-shadow-[0_24px_30px_rgb(16_24_52/0.14)] transition-transform duration-700 ease-[var(--ease-out)]',
                  p.id === 'her' ? 'right-[2%] sm:right-[6%]' : 'right-[6%] h-[86%] sm:right-[10%]',
                  active === p.id && 'scale-[1.03]',
                )}
                style={{ transformOrigin: 'bottom center' }}
                initial={reduce ? false : { opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.15, ease: [0.23, 1, 0.32, 1] }}
              />
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
