import { Icon } from '../../components/ui/Icon'
import { cn } from '../../lib/cn'

const STEPS = ['Bag', 'Address', 'Payment']

/** Bag → Address → Payment progress indicator. */
export function CheckoutSteps({ current }) {
  return (
    <ol className="flex items-center gap-2 text-[12px]" aria-label="Checkout progress">
      {STEPS.map((label, i) => {
        const done = i < current
        const active = i === current
        return (
          <li key={label} className="flex items-center gap-2" aria-current={active ? 'step' : undefined}>
            {i > 0 && <span className={cn('h-px w-6 transition-colors duration-500 sm:w-10', i <= current ? 'bg-ink' : 'bg-line-strong')} />}
            <span
              className={cn(
                'grid size-6 place-items-center rounded-full border text-[11px] transition-colors duration-300',
                done && 'border-ink bg-ink text-paper',
                active && 'border-ink bg-ink text-paper',
                !done && !active && 'border-line-strong text-ink-soft',
              )}
            >
              {done ? <Icon name="check" size={12} weight="bold" /> : i + 1}
            </span>
            <span className={cn('text-[13px] font-semibold', active || done ? 'text-ink' : 'text-ink-soft')}>{label}</span>
          </li>
        )
      })}
    </ol>
  )
}
