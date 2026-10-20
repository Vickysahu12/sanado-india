import { useId, useState } from 'react'
import { Icon } from './Icon'
import { cn } from '../../lib/cn'

/** Disclosure row. Height animates via grid-template-rows so any content collapses smoothly. */
export function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  return (
    <div className="border-b border-line">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        className="group flex w-full items-center justify-between py-4 text-left text-[16px] font-semibold transition-colors hover:text-ink"
      >
        {title}
        <span className="relative grid size-8 place-items-center rounded-full bg-bone transition-colors group-hover:bg-ink" aria-hidden="true">
          <Icon name="plus" size={15} weight="bold" className={cn('transition-transform duration-300 ease-out', open && 'rotate-45')} />
        </span>
      </button>
      <div id={id} className={cn('grid transition-[grid-template-rows] duration-300 ease-out', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
        <div className="overflow-hidden">
          <div className="pb-5 text-[15px] leading-relaxed text-ink-soft">{children}</div>
        </div>
      </div>
    </div>
  )
}
