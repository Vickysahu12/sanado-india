import { site } from '../../config/site'
import { formatPrice } from '../../lib/format'
import { Icon } from '../../components/ui/Icon'

/** "You're ₹X away from free shipping" with a filling progress line. */
export function FreeShippingBar({ subtotal }) {
  const remaining = Math.max(0, site.freeShippingOver - subtotal)
  const progress = Math.min(1, subtotal / site.freeShippingOver)

  return (
    <div className="rounded-none bg-mist px-4 py-3">
      <p className="flex items-center gap-2 text-[13px]">
        <Icon name="truck" size={18} className="text-ink" />
        {remaining > 0 ? (
          <span>
            Add <strong className="font-medium text-ink">{formatPrice(remaining)}</strong> more for free shipping
          </span>
        ) : (
          <strong className="font-medium text-success">Your order ships free</strong>
        )}
      </p>
      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-paper">
        <div
          className="h-full origin-left rounded-full bg-ink transition-transform duration-700 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </div>
  )
}
