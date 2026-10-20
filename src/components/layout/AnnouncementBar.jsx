import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { site } from '../../config/site'
import { Icon } from '../ui/Icon'

const INTERVAL = 4500

// Top strip in ink: socials left, one rotating message centre, help right.
export function AnnouncementBar() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  const items = site.announcements

  useEffect(() => {
    if (paused || items.length < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), INTERVAL)
    return () => clearInterval(id)
  }, [paused, items.length])

  return (
    <div className="bg-ink text-mist" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} aria-label="Store announcements">
      <div className="shell flex h-9 items-center justify-between gap-4 text-[12.5px] font-medium">
        <ul className="hidden items-center gap-3 lg:flex">
          {site.footer.social.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="block transition-[color,transform] duration-200 hover:-translate-y-0.5 hover:text-paper">
                <Icon name={s.icon} size={15} />
              </a>
            </li>
          ))}
        </ul>
        <div className="relative h-10 flex-1 overflow-hidden lg:max-w-[520px]">
          <AnimatePresence initial={false}>
            <motion.p
              key={index}
              className="absolute inset-0 flex items-center justify-center"
              initial={reduce ? { opacity: 0 } : { y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { y: '-100%', opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              {items[index]}
            </motion.p>
          </AnimatePresence>
        </div>
        <Link to="/help" className="hidden items-center gap-1.5 transition-colors hover:text-paper lg:flex">
          <Icon name="chat" size={15} /> Help & sizing
        </Link>
      </div>
    </div>
  )
}
