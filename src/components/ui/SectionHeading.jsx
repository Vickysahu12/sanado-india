import { Link } from 'react-router'
import { Icon } from './Icon'
import { cn } from '../../lib/cn'

/**
 * Section title in the flared serif, with an optional word in coral red
 * (`italic`), a short line under it and an optional link. Centred by default.
 */
export function SectionHeading({ title, italic, sub, link, id, className, align = 'center', light }) {
  const center = align === 'center'
  return (
    <div className={cn('flex flex-col gap-3', center ? 'items-center text-center' : 'items-start', className)}>
      <h2 id={id} className={cn('display text-[32px] sm:text-[40px] lg:text-[48px]', light ? 'text-paper' : 'text-ink')}>
        {title}
        {italic && (
          <>
            {' '}
            <span className={cn('hand', light ? 'text-mist' : 'text-ink')}>{italic}</span>
          </>
        )}
      </h2>
      {sub && <p className={cn('max-w-[52ch] text-[16px] leading-relaxed', light ? 'text-paper/80' : 'text-ink-soft')}>{sub}</p>}
      {link && (
        <Link to={link.to} className={cn('group mt-1 inline-flex items-center gap-2 text-[15px] font-semibold', light ? 'text-paper' : 'text-ink')}>
          <span className="link-under">{link.label}</span>
          <Icon name="arrow" size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  )
}

/** Page title for inner pages. */
export function PageTitle({ title, sub, className, children }) {
  return (
    <div className={cn('pb-6', className)}>
      <h1 className="display text-[38px] text-ink sm:text-[52px]">{title}</h1>
      {sub && <p className="mt-2 text-[15.5px] text-ink-soft">{sub}</p>}
      {children}
    </div>
  )
}
