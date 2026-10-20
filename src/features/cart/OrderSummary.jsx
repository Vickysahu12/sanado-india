import { useState } from 'react'
import { useCart, checkCoupon } from './CartContext'
import { site } from '../../config/site'
import { formatPrice } from '../../lib/format'
import { Icon } from '../../components/ui/Icon'
import { cn } from '../../lib/cn'

function CouponBox() {
  const { coupon, applyCoupon, subtotal } = useCart()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [shakeKey, setShakeKey] = useState(0)

  const apply = (e) => {
    e?.preventDefault()
    const res = checkCoupon(code || '', subtotal)
    if (!res.ok) {
      setError(res.error)
      setShakeKey((k) => k + 1)
      return
    }
    setError('')
    setCode('')
    applyCoupon(res.code)
  }

  if (coupon) {
    return (
      <div className="anim-fade-up flex items-center justify-between gap-3 rounded-none border border-dashed border-success bg-success/5 px-4 py-3">
        <p className="flex items-center gap-2 text-[13px]">
          <Icon name="check-circle" size={18} weight="fill" className="text-success" />
          <span>
            <strong className="font-medium tracking-wider">{coupon.code}</strong> applied. {coupon.label}.
          </span>
        </p>
        <button type="button" onClick={() => applyCoupon(null)} aria-label={`Remove coupon ${coupon.code}`} className="link-under shrink-0 text-[12px] text-ink">
          Remove
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={apply}>
      <label htmlFor="coupon" className="flex items-center gap-2 text-[14px]">
        <Icon name="tag" size={17} className="text-ink" /> Apply coupon
      </label>
      <div key={shakeKey} className={cn('mt-2.5 flex gap-2', shakeKey > 0 && 'anim-shake')}>
        <input
          id="coupon"
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase())
            setError('')
          }}
          placeholder="Enter code"
          aria-invalid={Boolean(error)}
          className="field h-11 flex-1 tracking-wider uppercase"
        />
        <button
          type="submit"
          disabled={!code}
          className="btn h-11 px-5 text-[14px]"
        >
          Apply
        </button>
      </div>
      <p role="alert" className="mt-1.5 min-h-5 text-[12px] text-danger">
        {error}
      </p>
      <p className="text-[12px] text-ink-soft">
        Try{' '}
        {Object.keys(site.coupons).map((c, i) => (
          <span key={c}>
            {i > 0 && ', '}
            <button type="button" onClick={() => setCode(c)} className="font-medium text-ink underline-offset-2 hover:underline">
              {c}
            </button>
          </span>
        ))}
      </p>
    </form>
  )
}

function Row({ label, value, tone, strong }) {
  return (
    <div className={cn('flex items-baseline justify-between gap-4', strong ? 'text-[17px] font-medium' : 'text-[14px]')}>
      <dt className={strong ? '' : 'text-ink-soft'}>{label}</dt>
      <dd className={cn('tabular-nums', tone === 'good' && 'text-success')}>{value}</dd>
    </div>
  )
}

/** Price breakdown. `withCoupon` shows the coupon box above it. `cod` adds the COD fee. */
export function OrderSummary({ withCoupon = true, codFee = 0, children }) {
  const { count, mrpTotal, savings, coupon, couponDiscount, shipping, total } = useCart()
  const grand = total + codFee

  return (
    <div className="rounded-none bg-paper p-5 sm:p-6">
      {withCoupon && (
        <div className="border-b border-line pb-5">
          <CouponBox />
        </div>
      )}
      <p className="mt-5 text-[13px] font-semibold text-ink-soft">Price details ({count} {count === 1 ? 'item' : 'items'})</p>
      <dl className="mt-4 space-y-2.5">
        <Row label="Total MRP" value={formatPrice(mrpTotal)} />
        {savings > 0 && <Row label="Discount on MRP" value={`− ${formatPrice(savings)}`} tone="good" />}
        {coupon && <Row label={`Coupon (${coupon.code})`} value={`− ${formatPrice(couponDiscount)}`} tone="good" />}
        <Row label="Shipping" value={shipping ? formatPrice(shipping) : 'FREE'} tone={shipping ? undefined : 'good'} />
        {codFee > 0 && <Row label="Cash on delivery fee" value={formatPrice(codFee)} />}
        <div className="border-t border-line pt-3">
          <Row label="Total amount" value={formatPrice(grand)} strong />
        </div>
      </dl>
      {savings + couponDiscount > 0 && (
        <p className="anim-fade-in mt-4 bg-success/10 px-3 py-2 text-center text-[13px] font-medium text-success">
          You save {formatPrice(savings + couponDiscount)} on this order
        </p>
      )}
      {children}
    </div>
  )
}
