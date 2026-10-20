import { Icon } from '../../components/ui/Icon'
import { cn } from '../../lib/cn'

/** − qty + control. Going below 1 is left to the caller (it removes the line in the cart). */
export function QtyStepper({ value, onChange, label, min = 0, max = 10, small }) {
  const btn = cn('press grid place-items-center rounded-full transition-colors hover:bg-paper disabled:opacity-35', small ? 'size-7' : 'size-10')
  return (
    <div className={cn('inline-flex items-center rounded-none bg-paper p-1 ring-1 ring-line', small ? 'h-9' : 'h-12')}>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={`Decrease quantity of ${label}`}
      >
        <Icon name="minus" size={small ? 13 : 15} weight="bold" />
      </button>
      <span key={value} className={cn('anim-fade-in text-center font-medium tabular-nums', small ? 'w-6 text-[13px]' : 'w-8 text-[15px]')} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label={`Increase quantity of ${label}`}
      >
        <Icon name="plus" size={small ? 13 : 15} weight="bold" />
      </button>
    </div>
  )
}
