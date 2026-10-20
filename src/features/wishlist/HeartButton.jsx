import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useWishlist } from './WishlistContext'
import { useToast } from '../toast/Toast'
import { Icon } from '../../components/ui/Icon'
import { cn } from '../../lib/cn'

const DOTS = [0, 60, 120, 180, 240, 300]

/** Wishlist toggle. Saving fills it, pops it and throws a small ring of ink sparks. */
export function HeartButton({ product, className, size = 'md' }) {
  const wishlist = useWishlist()
  const { show } = useToast()
  const navigate = useNavigate()
  const saved = wishlist.has(product.id)
  const [popKey, setPopKey] = useState(0)

  const onClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const added = wishlist.toggle(product.id)
    if (added) {
      setPopKey((k) => k + 1)
      show({
        title: 'Saved to wishlist',
        body: product.name,
        image: product.images[0],
        action: { label: 'View', onClick: () => navigate('/wishlist') },
      })
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
      className={cn(
        'press group/heart grid place-items-center rounded-full transition-colors duration-200',
        size === 'md' ? 'size-10 bg-paper/90 shadow-float backdrop-blur-sm hover:bg-paper' : 'relative size-14 bg-paper hover:bg-sand',
        className,
      )}
    >
      <Icon
        key={popKey}
        name="heart"
        size={size === 'md' ? 19 : 23}
        weight={saved ? 'fill' : 'bold'}
        className={cn(
          'transition-transform duration-300 ease-[var(--ease-spring)] group-hover/heart:scale-110',
          saved ? 'text-danger' : 'text-ink',
          popKey > 0 && 'anim-pop',
        )}
      />
      {popKey > 0 && (
        <span key={`b${popKey}`} aria-hidden="true">
          {DOTS.map((a) => (
            <span key={a} className="burst-dot absolute top-1/2 left-1/2 size-1.5 rounded-full bg-ink" style={{ '--a': `${a}deg` }} />
          ))}
        </span>
      )}
    </button>
  )
}
