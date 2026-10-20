import { useState } from 'react'
import { Link } from 'react-router'
import { listOrders } from '../services/orders'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatPrice } from '../lib/format'
import { Img } from '../components/ui/Img'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'
import { PageTitle } from '../components/ui/SectionHeading'

const STAGES = ['Confirmed', 'Packed', 'Shipped', 'Delivered']

/** Demo order history: orders placed in this browser, with a simple tracking line. */
export function AccountPage() {
  const orders = listOrders()
  const [now] = useState(() => Date.now())
  useDocumentTitle('My Orders')

  return (
    <div className="shell max-w-[960px] py-10 lg:py-14">
      <PageTitle title="My orders" sub={orders.length ? `${orders.length} ${orders.length === 1 ? 'order' : 'orders'} placed on this device` : 'Track everything you have ordered here.'} />

      {orders.length === 0 ? (
        <div className="mt-14 flex flex-col items-center text-center">
          <span className="grid size-20 place-items-center rounded-full bg-paper text-ink"><Icon name="package" size={34} /></span>
          <p className="display mt-5 text-[30px] text-ink">No orders yet</p>
          <p className="mt-2 text-[14px] text-ink-soft">When you place an order it shows up here with its delivery status.</p>
          <Button to="/shop" className="mt-7">
            Start shopping
          </Button>
        </div>
      ) : (
        <ul className="mt-10 space-y-5">
          {orders.map((o) => {
            // Demo progress: one stage per day since the order was placed.
            const stage = Math.min(STAGES.length - 1, Math.floor((now - new Date(o.placedAt)) / 86400000))
            return (
              <li key={o.id} className="overflow-hidden rounded-none bg-paper">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
                  <div>
                    <p className="text-[16px] font-bold">Order {o.id}</p>
                    <p className="text-[12px] text-ink-soft">
                      Placed on {new Date(o.placedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <p className="text-[16px] tabular-nums">{formatPrice(o.total)}</p>
                </div>
                <div className="px-5 py-4">
                  <ol className="flex items-center" aria-label="Order status">
                    {STAGES.map((s, i) => (
                      <li key={s} className="flex flex-1 items-center last:flex-none">
                        <span className="flex flex-col items-center gap-1.5">
                          <span className={`grid size-6 place-items-center rounded-full ${i <= stage ? 'bg-ink text-paper' : 'border border-line-strong bg-paper'}`}>
                            {i <= stage && <Icon name="check" size={12} weight="bold" />}
                          </span>
                          <span className={`text-[11px] ${i <= stage ? 'text-ink' : 'text-ink-soft'}`}>{s}</span>
                        </span>
                        {i < STAGES.length - 1 && <span className={`mx-1 mb-5 h-px flex-1 ${i < stage ? 'bg-ink' : 'bg-line-strong'}`} />}
                      </li>
                    ))}
                  </ol>
                  <ul className="mt-4 flex gap-2">
                    {o.items.map((it) => (
                      <li key={`${it.productId}-${it.variant}`}>
                        <Img id={it.image} alt={it.name} sizes="56px" className="h-[84px] w-14" position="50% 20%" />
                      </li>
                    ))}
                  </ul>
                  <Link to={`/order/${o.id}`} className="link-under mt-4 inline-flex items-center gap-1.5 text-[13px] text-ink">
                    View details <Icon name="arrow" size={13} />
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
