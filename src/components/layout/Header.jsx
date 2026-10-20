import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { quickChips } from '../../config/navigation'
import { useCart } from '../../features/cart/CartContext'
import { useWishlist } from '../../features/wishlist/WishlistContext'
import { useSearch } from '../../features/search/SearchOverlay'
import { Icon } from '../ui/Icon'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { MegaNav, useIsActive } from './MegaNav'
import { cn } from '../../lib/cn'

/** A quiet icon button with a count that re-pops on change. */
function Utility({ icon, label, count, bumpKey, onClick, to, className, ...props }) {
  const Tag = to ? Link : 'button'
  return (
    <Tag
      {...(to ? { to } : { type: 'button', onClick })}
      aria-label={count ? `${label}, ${count} items` : label}
      className={cn('group press relative grid size-11 place-items-center text-ink transition-colors duration-200 hover:text-tan-deep', className)}
      {...props}
    >
      <Icon name={icon} size={21} className="transition-transform duration-300 ease-[var(--ease-spring)] group-hover:-translate-y-0.5" />
      {count > 0 && (
        <span
          key={bumpKey}
          className={cn(
            'absolute top-1 right-0.5 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-ink px-1 text-[9.5px] font-bold text-paper tabular-nums',
            bumpKey ? 'anim-bump' : '',
          )}
        >
          {count}
        </span>
      )}
    </Tag>
  )
}

/**
 * Header in the inspo's single row: the logo left, the menu centred, search / account / bag
 * right. It floats on a frosted sheet once the page scrolls and the logo tightens.
 */
export function Header() {
  const cart = useCart()
  const wishlist = useWishlist()
  const { openSearch } = useSearch()
  const isActive = useIsActive()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const sentinel = useRef(null)

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting))
    if (sentinel.current) io.observe(sentinel.current)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="h-px" />
      <header
        className={cn(
          'sticky top-0 z-40 border-b transition-[background-color,box-shadow,border-color] duration-300',
          scrolled ? 'border-transparent bg-paper/90 shadow-[0_14px_34px_-24px_rgb(16_24_52/0.35)] backdrop-blur-xl' : 'border-line bg-paper',
        )}
      >
        <div className="shell grid h-16 grid-cols-[1fr_auto_1fr] items-center lg:h-[78px] lg:grid-cols-[auto_1fr_auto]">
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu" className="press -ml-2 grid size-11 place-items-center text-ink lg:hidden">
              <Icon name="menu" size={24} />
            </button>
            <Logo size={scrolled ? 'sm' : 'md'} className="max-lg:hidden" />
          </div>

          <div className="flex justify-center">
            <Logo size="sm" className="lg:hidden" />
            <MegaNav />
          </div>

          <div className="flex items-center justify-end gap-0.5">
            <Utility icon="search" label="Search" onClick={openSearch} />
            <Utility icon="user" label="Profile" to="/account" className="hidden sm:grid" />
            <Utility icon="heart" label="Wishlist" to="/wishlist" count={wishlist.count} className="hidden sm:grid" />
            <Utility icon="bag" label="Bag" count={cart.count} bumpKey={cart.addedAt} onClick={() => cart.setOpen(true)} className="-mr-2" data-bag-target="" />
          </div>
        </div>

        {/* Phones: swipeable chips */}
        <nav aria-label="Categories" className="lg:hidden">
          <ul className="no-scrollbar flex snap-x scroll-px-4 gap-2 overflow-x-auto px-4 pb-3 sm:px-6">
            {quickChips.map((c) => {
              const active = isActive(c.to)
              return (
                <li key={c.label} className="shrink-0 snap-start">
                  <Link
                    to={c.to}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'caps press flex h-9 items-center rounded-[4px] border px-4 text-[10px] transition-colors duration-200',
                      active ? 'border-ink bg-ink text-paper' : c.accent ? 'border-sale/40 text-sale' : 'border-line-strong text-ink',
                    )}
                  >
                    {c.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
