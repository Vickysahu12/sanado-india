import { site } from '../../config/site'
import { formatPrice } from '../../lib/format'
import { Icon } from '../../components/ui/Icon'
import { cn } from '../../lib/cn'

const METHODS = [
  { id: 'upi', icon: 'qr', label: 'UPI', sub: 'Google Pay, PhonePe, Paytm' },
  { id: 'card', icon: 'card', label: 'Credit / Debit card', sub: 'Visa, Mastercard, RuPay' },
  { id: 'netbanking', icon: 'bank', label: 'Net banking', sub: 'All major banks' },
  { id: 'cod', icon: 'cash', label: 'Cash on delivery', sub: `${formatPrice(site.codFee)} handling fee` },
]
const BANKS = ['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra Bank']

const fmtCard = (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ')
const fmtExpiry = (v) => {
  const d = v.replace(/\D/g, '').slice(0, 4)
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
}

/** Validates the chosen method's fields. Returns an error string or ''. */
export function validatePayment(method, f) {
  if (method === 'upi' && !/^[\w.-]{2,}@[a-z]{2,}$/i.test(f.upi ?? '')) return 'Enter a valid UPI ID, like name@okaxis.'
  if (method === 'card') {
    if ((f.card ?? '').replace(/\s/g, '').length !== 16) return 'Enter the 16-digit card number.'
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(f.expiry ?? '')) return 'Enter expiry as MM/YY.'
    if (!/^\d{3}$/.test(f.cvv ?? '')) return 'Enter the 3-digit CVV.'
    if ((f.cardName ?? '').trim().length < 2) return 'Enter the name on the card.'
  }
  if (method === 'netbanking' && !f.bank) return 'Choose your bank.'
  return ''
}

/** Payment method radio cards; the selected card expands to show its fields. */
export function PaymentForm({ method, setMethod, fields, setFields, error }) {
  const set = (k, val) => setFields((f) => ({ ...f, [k]: val }))

  return (
    <div role="radiogroup" aria-label="Payment method" className="space-y-2.5">
      {METHODS.map((m) => {
        const on = method === m.id
        return (
          <div key={m.id} className={cn('rounded-none border-2 transition-[border-color,background-color] duration-200', on ? 'border-ink bg-paper' : 'border-transparent bg-paper hover:border-mist50')}>
            <button type="button" role="radio" aria-checked={on} onClick={() => setMethod(m.id)} className="flex w-full items-center gap-4 p-4 text-left">
              <span className={cn('grid size-5 shrink-0 place-items-center rounded-full border-2 transition-colors', on ? 'border-ink' : 'border-line-strong')}>
                <span className={cn('size-2.5 rounded-full bg-ink transition-transform duration-200', on ? 'scale-100' : 'scale-0')} />
              </span>
              <Icon name={m.icon} size={24} className={on ? 'text-ink' : 'text-ink-soft'} />
              <span className="flex-1">
                <span className="block text-[15px]">{m.label}</span>
                <span className="block text-[12px] text-ink-soft">{m.sub}</span>
              </span>
            </button>

            <div className={cn('grid transition-[grid-template-rows] duration-300 ease-out', on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
              <div className="overflow-hidden">
                <div className="px-4 pb-5 pl-[52px] sm:pl-[85px]" inert={!on}>
                  {m.id === 'upi' && (
                    <label className="block">
                      <span className="mb-1.5 block text-[13px]">UPI ID</span>
                      <input value={fields.upi ?? ''} onChange={(e) => set('upi', e.target.value.trim())} placeholder="yourname@okaxis" className="field" autoComplete="off" />
                      <span className="mt-1.5 block text-[12px] text-ink-soft">You will get a payment request in your UPI app.</span>
                    </label>
                  )}
                  {m.id === 'card' && (
                    <div className="grid grid-cols-2 gap-3">
                      <label className="col-span-2 block">
                        <span className="mb-1.5 block text-[13px]">Card number</span>
                        <input value={fields.card ?? ''} onChange={(e) => set('card', fmtCard(e.target.value))} inputMode="numeric" autoComplete="cc-number" placeholder="1234 5678 9012 3456" className="field tracking-wider tabular-nums" />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-[13px]">Expiry</span>
                        <input value={fields.expiry ?? ''} onChange={(e) => set('expiry', fmtExpiry(e.target.value))} inputMode="numeric" autoComplete="cc-exp" placeholder="MM/YY" className="field tabular-nums" />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-[13px]">CVV</span>
                        <input value={fields.cvv ?? ''} onChange={(e) => set('cvv', e.target.value.replace(/\D/g, '').slice(0, 3))} inputMode="numeric" autoComplete="cc-csc" type="password" placeholder="•••" className="field tabular-nums" />
                      </label>
                      <label className="col-span-2 block">
                        <span className="mb-1.5 block text-[13px]">Name on card</span>
                        <input value={fields.cardName ?? ''} onChange={(e) => set('cardName', e.target.value)} autoComplete="cc-name" className="field" />
                      </label>
                    </div>
                  )}
                  {m.id === 'netbanking' && (
                    <div className="grid grid-cols-2 gap-2">
                      {BANKS.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => set('bank', b)}
                          aria-pressed={fields.bank === b}
                          className={cn(
                            'press border px-3 py-2.5 text-left text-[13px] transition-colors',
                            fields.bank === b ? 'border-ink bg-ink text-paper' : 'border-line-strong hover:border-ink',
                          )}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  )}
                  {m.id === 'cod' && <p className="text-[13px] text-ink-soft">Pay in cash or UPI when your order arrives. A {formatPrice(site.codFee)} handling fee applies.</p>}
                </div>
              </div>
            </div>
          </div>
        )
      })}
      <p role="alert" className={cn('min-h-5 text-[13px] text-danger', error && 'anim-shake')}>
        {error}
      </p>
    </div>
  )
}
