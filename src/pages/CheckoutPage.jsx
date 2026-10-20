import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useCart } from '../features/cart/CartContext'
import { OrderSummary } from '../features/cart/OrderSummary'
import { CheckoutSteps } from '../features/checkout/CheckoutSteps'
import { AddressForm } from '../features/checkout/AddressForm'
import { PaymentForm, validatePayment } from '../features/checkout/PaymentForm'
import { placeOrder } from '../services/orders'
import { site } from '../config/site'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatPrice } from '../lib/format'
import { Img } from '../components/ui/Img'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'
import { cn } from '../lib/cn'

const ADDRESS_KEY = 'sanado.address.v1'
const loadAddress = () => {
  try {
    return JSON.parse(localStorage.getItem(ADDRESS_KEY)) ?? { type: 'Home' }
  } catch {
    return { type: 'Home' }
  }
}

function ItemsList({ items }) {
  return (
    <ul className="divide-y divide-line">
      {items.map((l) => (
        <li key={l.key} className="flex gap-3 py-3">
          <span className="relative shrink-0">
            <Img id={l.product.images[0]} alt="" sizes="56px" className="h-[84px] w-14" position="50% 20%" />
            <span className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-ink text-[11px] text-cream">{l.qty}</span>
          </span>
          <span className="min-w-0 flex-1">
            <span className="line-clamp-1 block text-[13px]">{l.product.name}</span>
            <span className="block text-[12px] text-ink-soft">Size {l.variant}</span>
          </span>
          <span className="text-[13px] font-medium tabular-nums">{formatPrice(l.lineTotal)}</span>
        </li>
      ))}
    </ul>
  )
}

export function CheckoutPage() {
  const cart = useCart()
  const navigate = useNavigate()
  useDocumentTitle('Checkout')
  const [step, setStep] = useState(1) // 1 address, 2 payment
  const [address, setAddress] = useState(loadAddress)
  const [method, setMethod] = useState('upi')
  const [fields, setFields] = useState({})
  const [payError, setPayError] = useState('')
  const [placing, setPlacing] = useState(false)
  const [summaryOpen, setSummaryOpen] = useState(false)
  const codFee = method === 'cod' ? site.codFee : 0

  if (cart.items.length === 0 && !placing) {
    return (
      <div className="shell flex flex-col items-center py-24 text-center">
        <h1 className="display text-[40px] text-ink">Nothing to check out yet</h1>
        <p className="mt-2 text-ink-soft">Your bag is empty. Add a piece first.</p>
        <Button to="/shop" className="mt-7">
          Shop the collection
        </Button>
      </div>
    )
  }

  const saveAddress = (a) => {
    setAddress(a)
    try {
      localStorage.setItem(ADDRESS_KEY, JSON.stringify(a))
    } catch {
      // not critical
    }
    setStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const pay = async () => {
    const err = validatePayment(method, fields)
    setPayError(err)
    if (err) return
    setPlacing(true)
    const order = await placeOrder({
      items: cart.items.map((l) => ({ productId: l.productId, name: l.product.name, image: l.product.images[0], variant: l.variant, qty: l.qty, total: l.lineTotal })),
      address,
      payment: method,
      subtotal: cart.subtotal,
      savings: cart.savings,
      coupon: cart.coupon?.code ?? null,
      couponDiscount: cart.couponDiscount,
      shipping: cart.shipping,
      codFee,
      total: cart.total + codFee,
    })
    cart.clear()
    navigate(`/order/${order.id}`, { replace: true, state: { order } })
  }

  return (
    <div className="shell pt-6 pb-10 lg:pt-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/cart" className="link-under inline-flex items-center gap-2 self-start text-[13px] text-ink">
          <Icon name="arrow-left" size={15} /> Back to bag
        </Link>
        <CheckoutSteps current={step} />
        <p className="hidden items-center gap-1.5 text-[12px] text-ink-soft sm:flex">
          <Icon name="lock" size={15} /> Secure checkout
        </p>
      </div>

      {/* Phones: collapsible summary */}
      <div className="mt-6 overflow-hidden rounded-none bg-paper lg:hidden">
        <button type="button" onClick={() => setSummaryOpen((o) => !o)} aria-expanded={summaryOpen} className="flex w-full items-center justify-between px-4 py-3.5 text-[14px]">
          <span className="flex items-center gap-2 text-ink">
            <Icon name="bag" size={18} /> {summaryOpen ? 'Hide' : 'Show'} order summary
            <Icon name="caret-down" size={13} className={cn('transition-transform duration-300', summaryOpen && 'rotate-180')} />
          </span>
          <span className="tabular-nums">{formatPrice(cart.total + codFee)}</span>
        </button>
        <div className={cn('grid transition-[grid-template-rows] duration-300 ease-out', summaryOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
          <div className="overflow-hidden">
            <div className="px-4 pb-4">
              <ItemsList items={cart.items} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-14">
        <div>
          {step === 1 && (
            <div className="anim-fade-up">
              <AddressForm initial={address} onSubmit={saveAddress} />
            </div>
          )}

          {step === 2 && (
            <div className="anim-fade-up">
              <div className="flex items-start justify-between gap-4 rounded-none bg-paper p-4">
                <div className="flex gap-3">
                  <Icon name="pin" size={20} className="mt-0.5 shrink-0 text-ink" />
                  <div className="text-[14px]">
                    <p className="font-medium">
                      Delivering to {address.name} <span className="ml-1 rounded-[6px] bg-paper px-2 py-0.5 text-[12px] font-semibold">{address.type}</span>
                    </p>
                    <p className="mt-1 text-ink-soft">
                      {[address.line1, address.line2, address.city, address.state].filter(Boolean).join(', ')} {address.pincode}
                    </p>
                    <p className="text-ink-soft">+91 {address.phone}</p>
                  </div>
                </div>
                <button type="button" onClick={() => setStep(1)} className="link-under shrink-0 text-[14px] font-semibold text-ink">
                  Change
                </button>
              </div>

              <h2 className="display mt-8 text-[30px] text-ink">Payment</h2>
              <p className="mt-1 text-[13px] text-ink-soft">This is a demo store. No real payment is taken.</p>
              <div className="mt-5">
                <PaymentForm
                  method={method}
                  setMethod={(m) => {
                    setMethod(m)
                    setPayError('')
                  }}
                  fields={fields}
                  setFields={setFields}
                  error={payError}
                />
              </div>
              <Button size="lg" onClick={pay} disabled={placing} className="mt-2 w-full">
                {placing ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-paper/30 border-t-paper" aria-hidden="true" /> Placing your order
                  </>
                ) : (
                  <>
                    <Icon name="lock" size={17} />
                    {method === 'cod' ? 'Place Order' : 'Pay'} {formatPrice(cart.total + codFee)}
                  </>
                )}
              </Button>
              <p className="mt-3 text-center text-[12px] text-ink-soft">By placing this order you agree to our terms and return policy.</p>
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="mb-4 hidden rounded-none bg-paper px-5 py-2 lg:block">
            <ItemsList items={cart.items} />
          </div>
          <OrderSummary codFee={codFee} withCoupon />
        </aside>
      </div>
    </div>
  )
}
