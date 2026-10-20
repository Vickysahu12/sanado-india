import { useLocation, useParams } from 'react-router'
import { getOrder } from '../services/orders'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatPrice } from '../lib/format'
import { Img } from '../components/ui/Img'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'
import { NotFoundPage } from './NotFoundPage'

const PAY_LABEL = { upi: 'UPI', card: 'Card', netbanking: 'Net banking', cod: 'Cash on delivery' }

export function OrderSuccessPage() {
  const { id } = useParams()
  const { state } = useLocation()
  const order = state?.order ?? getOrder(id)
  useDocumentTitle('Order confirmed')
  if (!order) return <NotFoundPage />

  const eta = new Date(new Date(order.placedAt).getTime() + 5 * 86400000).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <div className="shell max-w-[760px] py-12 lg:py-16">
      <div className="text-center">
        {/* Animated check: circle then tick draw in */}
        <svg viewBox="0 0 52 52" className="mx-auto size-16" aria-hidden="true">
          <circle cx="26" cy="26" r="24" fill="none" stroke="var(--color-ink)" strokeWidth="1.5" className="anim-draw" style={{ '--len': 151 }} />
          <path d="M16 27 l7 7 l14 -15" fill="none" stroke="var(--color-bronze)" strokeWidth="2.5" strokeLinecap="square" className="anim-draw" style={{ '--len': 36, animationDelay: '500ms' }} />
        </svg>
        <h1 className="anim-fade-up display mt-6 text-[40px] leading-tight text-ink sm:text-[52px]" style={{ '--delay': '300ms' }}>
          Thank you, {order.address.name.split(' ')[0]}.
        </h1>
        <p className="anim-fade-up mt-4 text-[15px] text-ink-soft" style={{ '--delay': '400ms' }}>
          Your order <strong className="font-medium text-ink">{order.id}</strong> is confirmed. We have sent the details to {order.address.email}.
        </p>
      </div>

      <div className="anim-fade-up mt-10 overflow-hidden rounded-none bg-paper" style={{ '--delay': '500ms' }}>
        <div className="grid gap-5 border-b border-line p-5 sm:grid-cols-3 sm:p-6">
          <div className="flex gap-3">
            <Icon name="truck" size={22} className="shrink-0 text-ink" />
            <div>
              <p className="text-[12px] text-ink-soft">Estimated delivery</p>
              <p className="text-[14px] font-medium">{eta}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Icon name="pin" size={22} className="shrink-0 text-ink" />
            <div>
              <p className="text-[12px] text-ink-soft">Shipping to</p>
              <p className="text-[14px] font-medium">
                {order.address.city}, {order.address.pincode}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Icon name={order.payment === 'cod' ? 'cash' : 'card'} size={22} className="shrink-0 text-ink" />
            <div>
              <p className="text-[12px] text-ink-soft">Payment</p>
              <p className="text-[14px] font-medium">{PAY_LABEL[order.payment]}</p>
            </div>
          </div>
        </div>

        <ul className="divide-y divide-line px-5 sm:px-6">
          {order.items.map((it) => (
            <li key={`${it.productId}-${it.variant}`} className="flex items-center gap-4 py-4">
              <Img id={it.image} alt="" sizes="64px" className="h-24 w-16 shrink-0" position="50% 20%" />
              <div className="min-w-0 flex-1">
                <p className="text-[14px]">{it.name}</p>
                <p className="text-[12px] text-ink-soft">
                  Size {it.variant}, qty {it.qty}
                </p>
              </div>
              <p className="text-[14px] font-medium tabular-nums">{formatPrice(it.total)}</p>
            </li>
          ))}
        </ul>

        <dl className="space-y-2 border-t border-line p-5 text-[14px] sm:p-6">
          {order.couponDiscount > 0 && (
            <div className="flex justify-between text-success">
              <dt>Coupon ({order.coupon})</dt>
              <dd className="tabular-nums">-{formatPrice(order.couponDiscount)}</dd>
            </div>
          )}
          <div className="flex justify-between text-ink-soft">
            <dt>Shipping</dt>
            <dd>{order.shipping ? formatPrice(order.shipping) : 'Free'}</dd>
          </div>
          {order.codFee > 0 && (
            <div className="flex justify-between text-ink-soft">
              <dt>COD fee</dt>
              <dd>{formatPrice(order.codFee)}</dd>
            </div>
          )}
          <div className="flex justify-between border-t border-line pt-3 text-[17px]">
            <dt>{order.payment === 'cod' ? 'To pay on delivery' : 'Amount paid'}</dt>
            <dd className="tabular-nums">{formatPrice(order.total)}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button to="/shop">Continue shopping</Button>
        <Button to="/account" variant="outline">
          Track this order
        </Button>
      </div>
    </div>
  )
}
