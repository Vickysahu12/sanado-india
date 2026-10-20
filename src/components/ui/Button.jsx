import { Link } from 'react-router'
import { Icon } from './Icon'
import { cn } from '../../lib/cn'

// Each variant sets its resting colours and the colour that sweeps in from the left on hover.
const variants = {
  primary: '',
  ink: '[--btn-bg:var(--color-ink)] [--btn-fg:var(--color-cream)] [--btn-fill:var(--color-gold)] [--btn-fill-fg:var(--color-ink)]',
  light: '[--btn-bg:var(--color-cream)] [--btn-fg:var(--color-ink)] [--btn-fill:var(--color-ink)] [--btn-fill-fg:var(--color-cream)]',
  outline: '[--btn-bg:transparent] [--btn-fg:var(--color-ink)] [--btn-ring:var(--color-line-strong)] [--btn-fill:var(--color-ink)] [--btn-fill-fg:var(--color-cream)]',
  'outline-light': '[--btn-bg:transparent] [--btn-fg:var(--color-cream)] [--btn-ring:rgb(249_245_233/0.8)] [--btn-fill:var(--color-cream)] [--btn-fill-fg:var(--color-ink)]',
  ghost: '[--btn-bg:var(--color-paper)] [--btn-fg:var(--color-ink)] [--btn-ring:var(--color-line)] [--btn-fill:var(--color-mist)] [--btn-fill-fg:var(--color-night)]',
}

const sizes = {
  sm: 'h-10 px-5 text-[11px]',
  md: 'h-12 px-7 text-[12px]',
  lg: 'h-14 px-9 text-[13px]',
}

/**
 * Button. On hover a second colour rolls in from the left and the arrow (when `arrow`)
 * nudges right. Renders a router <Link> for `to`, an <a> for `href`, else a <button>.
 */
export function Button({ to, href, variant = 'primary', size = 'md', arrow, className, children, ...props }) {
  const classes = cn('btn', variants[variant], sizes[size], className)
  const content = (
    <>
      {children}
      {arrow && <Icon name="arrow" size={15} weight="regular" className="btn-arrow" />}
    </>
  )
  if (to) return <Link to={to} className={classes} {...props}>{content}</Link>
  if (href) return <a href={href} className={classes} {...props}>{content}</a>
  return <button type="button" className={classes} {...props}>{content}</button>
}
