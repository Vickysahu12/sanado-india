import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion } from 'motion/react'
import { imageSet } from '../../data/media'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { cn } from '../../lib/cn'

const LENS = 180
const ZOOM = 2.4

/**
 * Product gallery.
 * Desktop: the main photo with a round magnifying lens that follows the cursor, and
 * thumbnails underneath. Phones: full-width swipe with a pill indicator.
 */
export function Gallery({ images, name }) {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [lens, setLens] = useState(false)
  const box = useRef(null)
  const lx = useMotionValue(0)
  const ly = useMotionValue(0)
  const bgPos = useMotionValue('50% 50%')

  const onMove = (e) => {
    const r = box.current.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    lx.set(x - LENS / 2)
    ly.set(y - LENS / 2)
    bgPos.set(`${(x / r.width) * 100}% ${(y / r.height) * 100}%`)
  }

  return (
    <div>
      {/* Phones */}
      <div className="relative -mx-4 sm:-mx-6 lg:hidden">
        <div
          className="no-scrollbar flex snap-x snap-mandatory scroll-px-4 gap-2 overflow-x-auto px-4 sm:scroll-px-6 sm:px-6"
          onScroll={(e) => setActive(Math.round(e.currentTarget.scrollLeft / (e.currentTarget.clientWidth * 0.86)))}
        >
          {images.map((id, i) => (
            <Img key={id} id={id} alt={`${name}, photo ${i + 1}`} sizes="90vw" priority={i === 0} className="aspect-[4/5] w-[86%] shrink-0 snap-center rounded-none" position="50% 25%" />
          ))}
        </div>
        <div className="mt-3 flex justify-center gap-1.5" aria-hidden="true">
          {images.map((id, i) => (
            <span key={id} className={cn('h-1.5 rounded-full transition-all duration-300', i === active ? 'w-6 bg-ink' : 'w-1.5 bg-sand')} />
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        <div
          ref={box}
          className="relative aspect-[4/5] cursor-zoom-in overflow-hidden rounded-none bg-paper"
          onMouseMove={onMove}
          onMouseEnter={() => setLens(true)}
          onMouseLeave={() => setLens(false)}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={images[active]}
              className="absolute inset-0"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              <Img id={images[active]} alt={`${name}, photo ${active + 1}`} sizes="(min-width: 1024px) 50vw, 100vw" priority={active === 0} className="h-full w-full" position="50% 25%" />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {lens && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 left-0 z-10 rounded-full border-4 border-paper bg-no-repeat shadow-lift"
                style={{
                  x: lx,
                  y: ly,
                  width: LENS,
                  height: LENS,
                  backgroundImage: `url(${imageSet(images[active]).src})`,
                  backgroundSize: `${ZOOM * 100}%`,
                  backgroundPosition: bgPos,
                }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ type: 'spring', duration: 0.3, bounce: 0.2 }}
              />
            )}
          </AnimatePresence>

          <span className={cn('pointer-events-none absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-paper/90 px-3 py-1.5 text-[13px] font-semibold backdrop-blur-sm transition-opacity duration-200', lens && 'opacity-0')}>
            <Icon name="zoom" size={15} weight="bold" /> Hover to zoom
          </span>
        </div>

        <ul className="mt-3 flex gap-2" aria-label="Choose photo">
          {images.map((id, i) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === active}
                className={cn(
                  'press block overflow-hidden rounded-none ring-offset-2 ring-offset-paper transition-[box-shadow,opacity] duration-200',
                  i === active ? 'ring-2 ring-ink' : 'opacity-60 hover:opacity-100',
                )}
              >
                <Img id={id} alt="" sizes="88px" className="aspect-[4/5] w-[88px]" position="50% 25%" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
