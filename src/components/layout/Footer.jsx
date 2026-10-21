import { useId, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { site } from '../../config/site'
import { perks } from '../../data/content'
import { subscribe } from '../../services/newsletter'
import { Icon } from '../ui/Icon'
import { Logo } from './Logo'

const YEAR = new Date().getFullYear()
const PAYMENTS = ['UPI', 'Visa', 'Mastercard', 'RuPay', 'COD']
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Newsletter as in the reference: one field joined to a Subscribe button. */
function Newsletter() {
  const id = useId()
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle') // idle | sending | done
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!EMAIL.test(email.trim())) return setError('Please enter a valid email.')
    setError('')
    setState('sending')
    await subscribe(email.trim())
    setState('done')
  }

  if (state === 'done') {
    return (
      <p role="status" className="anim-fade-up bubble flex items-center gap-2 bg-cream px-5 py-4 text-[15px] font-semibold text-ink">
        <Icon name="check-circle" size={20} weight="fill" />
        You are on the list. Your 10% code is on its way.
      </p>
    )
  }
  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <div className="flex overflow-hidden rounded-[6px] border border-cream/35 transition-[border-color,box-shadow] focus-within:border-cream focus-within:shadow-[0_0_0_4px_rgb(249_245_233/0.12)]">
        <input
          id={id}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          aria-invalid={Boolean(error)}
          className="h-12 min-w-0 flex-1 bg-transparent px-5 text-[15px] text-cream caret-cream outline-none placeholder:text-cream/60"
        />
        <button type="submit" disabled={state === 'sending'} className="btn m-1 h-10 px-5 text-[11.5px] [--btn-bg:var(--color-cream)] [--btn-fg:var(--color-ink)] [--btn-fill:var(--color-ink)]">
          {state === 'sending' ? 'Subscribing' : 'Subscribe'}
        </button>
      </div>
      <p role="alert" className="mt-2 min-h-5 text-[13px] text-cream">
        {error}
      </p>
    </form>
  )
}

export function Footer() {
  // The home page shows the perks right under the hero, so the footer skips them there.
  const { pathname } = useLocation()
  return (
    <footer className="mt-24 lg:mt-32">
      <ul hidden={pathname === '/'} className="shell grid grid-cols-2 gap-x-4 gap-y-8 border-y border-line py-10 lg:grid-cols-4">
        {perks.map((s) => (
          <li key={s.title} className="group flex flex-col items-center text-center">
            <span className="grid size-14 place-items-center text-ink transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-translate-y-1 group-hover:-rotate-6">
              <Icon name={s.icon} size={26} />
            </span>
            <span className="caps mt-2 text-[10.5px] text-ink">{s.title}</span>
            <span className="mt-0.5 text-[13px] text-ink-soft">{s.body}</span>
          </li>
        ))}
      </ul>

      <div className="mt-16 bg-ink text-cream">
        <div className="shell pt-14 lg:pt-20">
          <Logo full className="block w-full max-w-[560px]" />
        </div>
        <div className="shell grid gap-12 py-14 lg:grid-cols-[1.1fr_2fr_1.6fr] lg:gap-10 lg:py-16">
          <div>
            <p className="max-w-[32ch] text-[14.5px] leading-relaxed text-cream/80">{site.footer.blurb}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {site.footer.columns.map((col) => (
              <div key={col.title}>
                <h3 className="caps text-[10.5px] text-cream">{col.title}</h3>
                <ul className="mt-5 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to} className="link-line text-[14px] text-cream/80 transition-colors hover:text-cream">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h3 className="display text-[30px]">
              Join the <span className="hand text-tan">list</span>
            </h3>
            <p className="mt-3 mb-5 max-w-[40ch] text-[14px] text-cream/80">New drops every Friday, early access to sales and 10% off your first order.</p>
            <Newsletter />
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Payment methods">
              {PAYMENTS.map((p) => (
                <li key={p} className="rounded-[6px] border border-cream/25 px-2.5 py-1 text-[12px] font-semibold text-cream/80">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/15">
          <p className="shell py-5 text-center text-[12.5px] text-cream/70">
            © {YEAR} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
