import { useState } from 'react'
import { Icon } from '../../components/ui/Icon'
import { Button } from '../../components/ui/Button'
import { cn } from '../../lib/cn'

export const STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
  'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan',
  'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
]

// Demo pincode lookup by prefix, so city / state fill in as on real stores.
const PIN_PREFIX = {
  11: ['New Delhi', 'Delhi'], 40: ['Mumbai', 'Maharashtra'], 41: ['Pune', 'Maharashtra'], 56: ['Bengaluru', 'Karnataka'],
  60: ['Chennai', 'Tamil Nadu'], 50: ['Hyderabad', 'Telangana'], 70: ['Kolkata', 'West Bengal'], 30: ['Jaipur', 'Rajasthan'],
  38: ['Ahmedabad', 'Gujarat'], 22: ['Varanasi', 'Uttar Pradesh'], 68: ['Kochi', 'Kerala'], 45: ['Indore', 'Madhya Pradesh'],
}

const RULES = {
  name: (v) => (v.trim().length >= 2 ? '' : 'Please enter your full name.'),
  phone: (v) => (/^[6-9]\d{9}$/.test(v) ? '' : 'Enter a valid 10-digit mobile number.'),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter a valid email address.'),
  pincode: (v) => (/^[1-9]\d{5}$/.test(v) ? '' : 'Enter a valid 6-digit pincode.'),
  line1: (v) => (v.trim().length >= 5 ? '' : 'Enter your house number and street.'),
  city: (v) => (v.trim() ? '' : 'Enter your city.'),
  state: (v) => (v ? '' : 'Select your state.'),
}

function Field({ label, error, className, children, hint }) {
  return (
    <div className={className}>
      <label className="block">
        <span className="mb-1.5 block text-[13px] text-ink">{label}</span>
        {children}
      </label>
      <p role={error ? 'alert' : undefined} className={cn('mt-1 min-h-4 text-[12px]', error ? 'text-danger' : 'text-ink-soft')}>
        {error || hint}
      </p>
    </div>
  )
}

/** Contact + delivery address with inline validation. Calls onSubmit(address) when valid. */
export function AddressForm({ initial, onSubmit }) {
  const [v, setV] = useState(initial)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const set = (key, value) => {
    setV((prev) => {
      const next = { ...prev, [key]: value }
      // Fill city / state from the pincode when we recognise its prefix.
      if (key === 'pincode' && value.length === 6) {
        const hit = PIN_PREFIX[value.slice(0, 2)]
        if (hit) {
          next.city = prev.city || hit[0]
          next.state = prev.state || hit[1]
        }
      }
      return next
    })
    if (touched[key]) setErrors((e) => ({ ...e, [key]: RULES[key]?.(value) ?? '' }))
    // A recognised pincode fills city / state, so clear any errors waiting on them.
    if (key === 'pincode' && value.length === 6 && PIN_PREFIX[value.slice(0, 2)]) setErrors((e) => ({ ...e, city: '', state: '' }))
  }
  const blur = (key) => {
    setTouched((t) => ({ ...t, [key]: true }))
    setErrors((e) => ({ ...e, [key]: RULES[key]?.(v[key]) ?? '' }))
  }

  const submit = (e) => {
    e.preventDefault()
    const next = Object.fromEntries(Object.keys(RULES).map((k) => [k, RULES[k](v[k] ?? '')]))
    setErrors(next)
    setTouched(Object.fromEntries(Object.keys(RULES).map((k) => [k, true])))
    const firstBad = Object.keys(next).find((k) => next[k])
    if (firstBad) {
      document.getElementById(`addr-${firstBad}`)?.focus()
      return
    }
    onSubmit(v)
  }

  const input = (key, props = {}) => (
    <input
      id={`addr-${key}`}
      value={v[key] ?? ''}
      onChange={(e) => set(key, props.numeric ? e.target.value.replace(/\D/g, '').slice(0, props.maxLength) : e.target.value)}
      onBlur={() => blur(key)}
      aria-invalid={Boolean(errors[key])}
      className={cn('field', errors[key] && 'anim-shake')}
      {...props}
      numeric={undefined}
    />
  )

  return (
    <form onSubmit={submit} noValidate>
      <h2 className="display text-[30px] text-ink">Contact</h2>
      <div className="mt-4 grid gap-x-4 sm:grid-cols-2">
        <Field label="Full name" error={errors.name} className="sm:col-span-2">
          {input('name', { autoComplete: 'name', placeholder: 'As it should appear on the parcel' })}
        </Field>
        <Field label="Mobile number" error={errors.phone} hint="For delivery updates on WhatsApp">
          <div className="flex">
            <span className="grid h-12 place-items-center rounded-l-[2px] border border-r-0 border-line-strong bg-paper px-3 text-[14px] text-ink-soft">+91</span>
            {input('phone', { autoComplete: 'tel-national', inputMode: 'numeric', numeric: true, maxLength: 10, placeholder: '98765 43210', className: cn('field', errors.phone && 'anim-shake') })}
          </div>
        </Field>
        <Field label="Email" error={errors.email} hint="Order confirmation goes here">
          {input('email', { type: 'email', autoComplete: 'email', inputMode: 'email', placeholder: 'you@example.com' })}
        </Field>
      </div>

      <h2 className="display mt-6 text-[30px] text-ink">Delivery address</h2>
      <div className="mt-4 grid gap-x-4 sm:grid-cols-2">
        <Field label="Pincode" error={errors.pincode} hint="City and state fill in automatically">
          {input('pincode', { autoComplete: 'postal-code', inputMode: 'numeric', numeric: true, maxLength: 6, placeholder: '400001' })}
        </Field>
        <Field label="City" error={errors.city}>
          {input('city', { autoComplete: 'address-level2' })}
        </Field>
        <Field label="House no., building, street" error={errors.line1} className="sm:col-span-2">
          {input('line1', { autoComplete: 'address-line1' })}
        </Field>
        <Field label="Area, landmark (optional)" className="sm:col-span-2">
          {input('line2', { autoComplete: 'address-line2' })}
        </Field>
        <Field label="State" error={errors.state}>
          <div className="relative">
            <select
              id="addr-state"
              value={v.state ?? ''}
              onChange={(e) => set('state', e.target.value)}
              onBlur={() => blur('state')}
              aria-invalid={Boolean(errors.state)}
              className="field appearance-none pr-10"
            >
              <option value="">Select state</option>
              {STATES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <Icon name="caret-down" size={14} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2" />
          </div>
        </Field>
        <Field label="Address type">
          <div className="flex h-12 gap-2">
            {['Home', 'Work'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => set('type', t)}
                aria-pressed={(v.type ?? 'Home') === t}
                className={cn(
                  'press flex-1 border text-[14px] transition-colors',
                  (v.type ?? 'Home') === t ? 'border-ink bg-ink text-paper' : 'border-line-strong hover:border-ink',
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </Field>
      </div>

      <Button type="submit" size="lg" className="mt-4 w-full sm:w-auto">
        Continue to Payment <Icon name="arrow" size={17} />
      </Button>
    </form>
  )
}
