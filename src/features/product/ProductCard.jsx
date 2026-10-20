import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { useCart } from '../cart/CartContext'
import { useToast } from '../toast/Toast'
import { getSiblings } from '../../services/catalog'
import { imageSet } from '../../data/media'
import { flyToCart } from '../../lib/flyToCart'
import { formatPrice, discountOf } from '../../lib/format'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { HeartButton } from '../wishlist/HeartButton'
import { cn } from '../../lib/cn'

/** A small ink "Added" stamp that lands on the photo when a piece goes into the bag. */
export function StampMark({ className }) {
  return (
    <span aria-hidden="true" className={cn('caps anim-stamp pointer-events-none absolute flex items-center gap-1.5 bg-ink px-3 py-2 text-[10px] whitespace-nowrap text-cream', className)}>
      <Icon name="check" size={13} weight="bold" /> Added
    </span>
  )
}

/**
 * Product tile in the inspo's manner: the photo, then the name, the stars and the price
 * centred under it, then the colours. Hovering a colour dot
 * changes the photo to that shade; hovering the photo shows a second view and a
 * "Quick add" pill that opens the sizes. Adding pops a tick and flies the photo into the bag.
 */
export function ProductCard({ product, sizes = '(min-width: 1024px) 23vw, 50vw', priority, className }) {
  const { add, setOpen } = useCart()
  const { show } = useToast()
  const [preview, setPreview] = useState(null) // sibling product shown on swatch hover
  const [picking, setPicking] = useState(false)
  const [stamp, setStamp] = useState(0)
  const frame = useRef(null)
  const discount = discountOf(product)
  const siblings = getSiblings(product)
  const shown = preview ?? product
  const MAX_DOTS = 7
  const extra = Math.max(0, siblings.length - MAX_DOTS)

  const quickAdd = (size) => {
    add(shown.id, size)
    setPicking(false)
    setStamp((k) => k + 1)
    flyToCart(frame.current, imageSet(shown.images[0]).srcSm)
    show({
      title: 'Added to bag',
      body: `${shown.name}, size ${size}`,
      image: shown.images[0],
      action: { label: 'View bag', onClick: () => setOpen(true) },
    })
  }

  return (
    <article className={cn('group relative', className)} onMouseLeave={() => setPicking(false)}>
      <div ref={frame} className="relative overflow-hidden rounded-[6px] bg-sand">
        <Link to={`/product/${shown.slug}`} className="block" aria-label={shown.name}>
          <Img
            key={shown.id}
            id={shown.images[0]}
            alt={`${shown.name}`}
            sizes={sizes}
            priority={priority}
            className="aspect-[4/5]"
            position="50% 20%"
            imgClassName="transition-transform duration-[1200ms] ease-[var(--ease-out)] hover-device:group-hover:scale-[1.035]"
          />
          {!preview && (
            <Img
              id={product.images[1]}
              alt=""
              sizes={sizes}
              className="absolute! inset-0 opacity-0 transition-opacity duration-500 ease-[var(--ease-out)] hover-device:group-hover:opacity-100"
              position="50% 20%"
            />
          )}
        </Link>

        {(product.badge || discount > 0 || product.isNew) && (
          <span
            className={cn(
              'caps pointer-events-none absolute top-2.5 left-2.5 rounded-[3px] px-2 py-1 text-[9px]',
              discount > 0 ? 'bg-sale text-cream' : 'bg-bone/85 text-ink backdrop-blur-sm',
            )}
          >
            {discount > 0 ? `${discount}% off` : product.badge ?? 'New'}
          </span>
        )}

        <HeartButton product={shown} className="absolute top-2 right-2 transition-[opacity,transform] duration-300 hover-device:translate-y-1 hover-device:opacity-0 hover-device:group-hover:translate-y-0 hover-device:group-hover:opacity-100 has-[[aria-pressed=true]]:opacity-100" />

        {stamp > 0 && <StampMark key={stamp} className="top-1/2 left-1/2" />}

        {/* Quick add: a pill that opens into sizes */}
        <div
          className={cn(
            'absolute inset-x-3 bottom-3 transition-[opacity,transform] duration-300 ease-[var(--ease-out)]',
            picking ? 'translate-y-0 opacity-100' : 'translate-y-[130%] opacity-0 hover-device:group-hover:translate-y-0 hover-device:group-hover:opacity-100',
          )}
        >
          {picking ? (
            <div className="grid grid-cols-5 overflow-hidden rounded-[4px] bg-paper/97 shadow-float backdrop-blur-md" role="group" aria-label={`Sizes for ${shown.name}`}>
              {shown.sizes.map((s, i) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => quickAdd(s)}
                  className="anim-fade-up h-10 text-[12px] font-semibold text-ink transition-colors hover:bg-ink hover:text-cream"
                  style={{ '--delay': `${i * 28}ms` }}
                  aria-label={`Add ${shown.name}, size ${s}, to bag`}
                >
                  {s}
                </button>
              ))}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => (shown.sizes.length === 1 ? quickAdd(shown.sizes[0]) : setPicking(true))}
              className="caps press flex h-10 w-full items-center justify-center gap-2 rounded-[4px] bg-paper/97 text-[10.5px] text-ink shadow-float backdrop-blur-md transition-colors hover:bg-ink hover:text-cream"
              aria-label={`Quick add ${shown.name}`}
            >
              <Icon name="plus" size={14} weight="bold" /> {shown.sizes.length === 1 ? 'Add to bag' : 'Quick add'}
            </button>
          )}
        </div>

        {/* Touch devices: a button opens the sizes */}
        <button
          type="button"
          onClick={() => setPicking((p) => !p)}
          aria-label={`Choose a size for ${shown.name}`}
          aria-expanded={picking}
          className={cn('press absolute right-2 bottom-2 grid size-10 place-items-center rounded-full bg-paper/95 text-ink shadow-float hover-device:hidden', picking && 'hidden')}
        >
          <Icon name="plus" size={18} weight="bold" />
        </button>
      </div>

      <div className="px-0.5 pt-3 text-center">
        <Link to={`/product/${shown.slug}`} className="block">
          <h3 className="line-clamp-1 text-[13.5px] font-medium text-ink">
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-[var(--ease-out)] group-hover:bg-[length:100%_1px]">{shown.name}</span>
          </h3>
        </Link>
        <span className="mt-1.5 flex items-center justify-center gap-px text-tan" aria-label={`Rated ${shown.rating} out of 5`}>
          {Array.from({ length: 5 }, (_, k) => (
            <Icon key={k} name="star" size={11} weight={k < Math.round(shown.rating) ? 'fill' : 'regular'} />
          ))}
          <span className="ml-1.5 text-[11px] text-ink-soft tabular-nums">({shown.reviews})</span>
        </span>
        <p className="mt-1 flex items-baseline justify-center gap-x-2 text-[14px]">
          <span className="font-semibold tabular-nums text-ink">{formatPrice(shown.price)}</span>
          {shown.compareAt && <span className="text-[12.5px] text-ink-soft tabular-nums line-through">{formatPrice(shown.compareAt)}</span>}
        </p>
        {siblings.length > 1 && (
          <ul className="mt-2.5 flex items-center justify-center gap-1.5" aria-label={`${siblings.length} colours`} onMouseLeave={() => setPreview(null)}>
            {siblings.slice(0, MAX_DOTS).map((s) => (
              <li key={s.id}>
                <Link
                  to={`/product/${s.slug}`}
                  aria-label={s.color}
                  title={s.color}
                  onMouseEnter={() => setPreview(s.id === product.id ? null : s)}
                  onFocus={() => setPreview(s.id === product.id ? null : s)}
                  className={cn(
                    'block size-[15px] rounded-full ring-offset-2 ring-offset-bone transition-[box-shadow,transform] duration-200 hover:scale-125',
                    s.id === shown.id ? 'ring-[1.5px] ring-ink' : 'ring-1 ring-line-strong',
                  )}
                  style={{ backgroundColor: s.hex }}
                />
              </li>
            ))}
            {extra > 0 && (
              <li>
                <Link to={`/product/${product.slug}`} className="text-[12px] font-medium text-ink-soft hover:text-ink">
                  +{extra}
                </Link>
              </li>
            )}
          </ul>
        )}
      </div>
    </article>
  )
}

export function ProductCardSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="aspect-[4/5] animate-pulse rounded-[6px] bg-sand" />
      <div className="mx-auto mt-3.5 h-2.5 w-1/3 rounded-full bg-sand" />
      <div className="mx-auto mt-2 h-3.5 w-3/4 rounded-full bg-sand" />
      <div className="mx-auto mt-2 h-3.5 w-1/3 rounded-full bg-sand" />
    </div>
  )
}
