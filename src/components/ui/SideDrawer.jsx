import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useOverlay } from '../../hooks/useOverlay'
import { Icon } from './Icon'
import { cn } from '../../lib/cn'

/** Panel that slides in from the right (or left). Used by the mini bag, filters and mobile menu. */
export function SideDrawer({ open, onClose, title, count, side = 'right', children, footer, width = 'max-w-[420px]' }) {
  const reduce = useReducedMotion()
  const focusRef = useOverlay(open, onClose)
  const off = side === 'right' ? '105%' : '-105%'

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={title} data-lenis-prevent>
          <motion.button
            type="button"
            tabIndex={-1}
            aria-label={`Close ${title.toLowerCase()}`}
            className="absolute inset-0 h-full w-full cursor-default bg-night/40 backdrop-blur-[3px]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.aside
            className={cn('absolute inset-y-0 flex w-[92%] flex-col overflow-hidden bg-paper shadow-lift', width, side === 'right' ? 'right-0 rounded-l-[2px]' : 'left-0 rounded-r-[2px]')}
            initial={reduce ? { opacity: 0 } : { transform: `translateX(${off})` }}
            animate={reduce ? { opacity: 1 } : { transform: 'translateX(0%)' }}
            exit={reduce ? { opacity: 0 } : { transform: `translateX(${off})` }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          >
            <header className="flex items-center justify-between px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-3">
              <p className="display text-[26px] text-ink">
                {title}
                {count !== undefined && <span className="ml-1.5 font-sans text-[14px] text-ink-soft">({count})</span>}
              </p>
              <button
                ref={focusRef}
                type="button"
                onClick={onClose}
                className="press grid size-11 place-items-center rounded-full bg-bone transition-colors hover:bg-sand"
                aria-label={`Close ${title.toLowerCase()}`}
              >
                <Icon name="close" size={20} />
              </button>
            </header>
            <div className="flex min-h-0 flex-1 flex-col">{children}</div>
            {footer}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
