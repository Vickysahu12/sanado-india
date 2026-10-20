import { Link } from 'react-router'

/** A centred section title in the inspo's manner: light spaced capitals, with the logo's wave under it. */
export function Title({ id, children, kicker, to, cta = 'View all' }) {
  return (
    <div className="flex flex-col items-center text-center">
      {kicker && <p className="caps mb-3 text-[10px] text-tan-deep">{kicker}</p>}
      <h2 id={id} className="display text-[28px] sm:text-[38px]">
        {children}
      </h2>
      <span aria-hidden="true" className="wave mt-3 h-3 text-tan" />
      {to && (
        <Link to={to} className="caps link-line mt-3 text-[10px] text-ink-soft transition-colors hover:text-ink">
          {cta}
        </Link>
      )}
    </div>
  )
}
