import { useState } from 'react'
import { checkPincode } from '../../services/orders'
import { Icon } from '../../components/ui/Icon'
import { cn } from '../../lib/cn'

/** "Check delivery": pincode in, estimated date and COD availability out. */
export function PincodeCheck() {
  const [pin, setPin] = useState(() => {
    try {
      return localStorage.getItem('sanado.pin') ?? ''
    } catch {
      return ''
    }
  })
  const [state, setState] = useState({ status: 'idle' })

  const onSubmit = async (e) => {
    e.preventDefault()
    setState({ status: 'loading' })
    const res = await checkPincode(pin)
    if (res.ok) {
      try {
        localStorage.setItem('sanado.pin', pin)
      } catch {
        // not critical
      }
    }
    setState({ status: res.ok ? 'ok' : 'error', ...res })
  }

  return (
    <div>
      <p className="flex items-center gap-2 text-[15px] font-semibold">
        <Icon name="pin" size={18} weight="fill" className="text-ink" /> Check delivery
      </p>
      <form onSubmit={onSubmit} className="mt-2.5 flex gap-2">
        <label className="sr-only" htmlFor="pincode">
          Pincode
        </label>
        <input
          id="pincode"
          inputMode="numeric"
          maxLength={6}
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
          placeholder="Enter 6-digit pincode"
          aria-invalid={state.status === 'error'}
          className={cn('field h-12 flex-1 rounded-[6px]', state.status === 'error' && 'anim-shake')}
        />
        <button
          type="submit"
          disabled={pin.length !== 6 || state.status === 'loading'}
          className="btn h-12 px-6 text-[14px]"
        >
          {state.status === 'loading' ? 'Checking' : 'Check'}
        </button>
      </form>
      <div aria-live="polite" className="min-h-6">
        {state.status === 'ok' && (
          <ul className="anim-fade-up mt-3 space-y-1.5 text-[13px]">
            <li className="flex items-center gap-2">
              <Icon name="truck" size={16} className="text-success" />
              Delivery by <strong className="font-medium">{state.date}</strong>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="cash" size={16} className="text-success" /> Cash on delivery available
            </li>
          </ul>
        )}
        {state.status === 'error' && <p className="anim-fade-in mt-2 text-[13px] text-danger">{state.error}</p>}
      </div>
    </div>
  )
}
