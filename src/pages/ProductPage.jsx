import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { motion, useReducedMotion } from 'motion/react'
import { getProductBySlug, getRelated, getSiblings } from '../services/catalog'
import { categoryLabels, categorySingular, occasionLabels, sizeChart } from '../data/content'
import { imageSet } from '../data/media'
import { site } from '../config/site'
import { useCart, unitPrice, STITCH_SUFFIX } from '../features/cart/CartContext'
import { useToast } from '../features/toast/Toast'
import { HeartButton } from '../features/wishlist/HeartButton'
import { Gallery } from '../features/product/Gallery'
import { PincodeCheck } from '../features/product/PincodeCheck'
import { ProductReviews } from '../features/product/ProductReviews'
import { ProductRail } from '../features/product/ProductRail'
import { QtyStepper } from '../features/cart/QtyStepper'
import { useRecentlyViewed } from '../hooks/useRecentlyViewed'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { flyToCart } from '../lib/flyToCart'
import { formatPrice, discountOf } from '../lib/format'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { Accordion } from '../components/ui/Accordion'
import { Modal } from '../components/ui/Modal'
import { Img } from '../components/ui/Img'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'
import { CopyCode } from '../components/ui/CopyCode'
import { NotFoundPage } from './NotFoundPage'
import { cn } from '../lib/cn'

/** A switch whose knob springs across. */
function Toggle({ on, onChange, label, children }) {
  const reduce = useReducedMotion()
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={cn('group flex w-full items-center gap-4 border p-4 text-left transition-colors duration-300', on ? 'border-ink/50 bg-mist' : 'border-line bg-paper hover:border-line-strong')}
    >
      <span className={cn('relative flex h-7 w-12 shrink-0 items-center rounded-full p-1 transition-colors duration-300', on ? 'justify-end bg-ink' : 'justify-start bg-sand')}>
        <motion.span layout transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 600, damping: 32 }} className="size-5 rounded-full bg-paper shadow" />
      </span>
      <span className="flex-1">{children}</span>
    </button>
  )
}

export function ProductPage() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)
  if (!product) return <NotFoundPage />
  return <ProductView key={product.id} product={product} />
}

function ProductView({ product }) {
  const navigate = useNavigate()
  const cart = useCart()
  const { show } = useToast()
  useDocumentTitle(product.name)

  const freeSize = product.sizes.length === 1
  const [stitch, setStitch] = useState(false)
  const [size, setSize] = useState(freeSize ? product.sizes[0] : null)
  const [qty, setQty] = useState(1)
  const [error, setError] = useState('')
  const [addState, setAddState] = useState('idle') // idle | adding | added
  const [chartOpen, setChartOpen] = useState(false)
  const buyRef = useRef(null)
  const addBtn = useRef(null)
  const [showSticky, setShowSticky] = useState(false)

  const siblings = getSiblings(product)
  const related = getRelated(product)
  const recent = useRecentlyViewed(product.id)
  const discount = discountOf(product)

  const withStitch = freeSize && stitch
  const variant = size ? `${size}${withStitch ? STITCH_SUFFIX : ''}` : null
  const price = unitPrice(product, withStitch ? `x${STITCH_SUFFIX}` : '')
  const mrp = product.compareAt ? product.compareAt + (withStitch ? site.stitchFee : 0) : null

  // Sticky phone bar appears once the main buttons scroll out of view.
  useEffect(() => {
    const el = buyRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setShowSticky(!e.isIntersecting && e.boundingClientRect.top < 0))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const needsChoice = () => {
    if (variant) return false
    setError('Please pick a size.')
    buyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    return true
  }

  const addToBag = async (source) => {
    if (needsChoice() || addState !== 'idle') return
    setAddState('adding')
    flyToCart(source ?? addBtn.current, imageSet(product.images[0]).srcSm)
    await new Promise((r) => setTimeout(r, 650))
    cart.add(product.id, variant, qty)
    setAddState('added')
    cart.setOpen(true)
    setTimeout(() => setAddState('idle'), 1800)
  }

  const buyNow = () => {
    if (needsChoice()) return
    cart.add(product.id, variant, qty)
    navigate('/checkout')
  }

  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) await navigator.share({ title: product.name, url })
      else {
        await navigator.clipboard.writeText(url)
        show({ title: 'Link copied', body: 'Send it to your best friend for a second opinion' })
      }
    } catch {
      // share sheet dismissed
    }
  }

  return (
    <>
      <div className="shell pt-4 lg:pt-6">
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: categoryLabels[product.category], to: `/shop/${product.category}` },
            { label: product.name },
          ]}
        />
      </div>

      <div className="shell mt-4 grid gap-8 lg:mt-6 lg:grid-cols-[minmax(0,480px)_minmax(0,1fr)] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Gallery images={product.images} name={product.name} />
        </div>

        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] text-ink-soft">
                <span className="rounded-[6px] bg-mist px-2.5 py-0.5 font-semibold text-night">{categorySingular[product.category]}</span>
                <span aria-hidden="true">·</span>
                {product.fabric}
                <span aria-hidden="true">·</span>
                {product.cut}
              </p>
              <h1 className="display mt-3 text-[34px] leading-[1.05] text-ink sm:text-[38px]">{product.name}</h1>
            </div>
            <button type="button" onClick={share} aria-label="Share" className="press group mt-1 grid size-11 shrink-0 place-items-center rounded-full bg-paper transition-colors hover:bg-sand">
              <Icon name="share" size={19} className="transition-transform duration-300 group-hover:rotate-12" />
            </button>
          </div>

          <a href="#reviews" className="mt-3 inline-flex items-center gap-2 text-[14px]">
            <span className="flex gap-0.5 text-ink" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <Icon key={i} name="star" size={15} weight={i < Math.round(product.rating) ? 'fill' : 'regular'} />
              ))}
            </span>
            <span className="link-under text-ink-soft">
              {product.rating.toFixed(1)} from {product.reviews} reviews
            </span>
          </a>

          <div className="mt-6">
            <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span key={price} className="anim-fade-in text-[28px] font-medium tabular-nums">
                {formatPrice(price)}
              </span>
              {mrp && (
                <>
                  <span className="text-[17px] text-ink-soft tabular-nums line-through">{formatPrice(mrp)}</span>
                  <span className="rounded-[6px] bg-ink px-2.5 py-1 text-[12px] font-semibold text-paper">{discount}% off</span>
                </>
              )}
            </p>
            <p className="mt-1 text-[13px] text-ink-soft">Inclusive of all taxes. Free shipping above {formatPrice(site.freeShippingOver)}.</p>
            <div className="mt-5 flex flex-wrap items-center gap-3 rounded-[6px] border border-dashed border-ink/40 bg-paper py-2 pr-2 pl-4 text-[14px]">
              <Icon name="tag" size={18} className="text-ink" />
              <span className="flex-1 text-[14.5px] font-medium text-ink">First order? 10% off with</span>
              <CopyCode code="COMFORT10" />
            </div>
          </div>

          {siblings.length > 1 && (
            <div className="mt-7">
              <p className="text-[15px]">
                Colour: <span className="font-semibold">{product.color}</span>
              </p>
              <ul className="mt-3 flex flex-wrap gap-2.5">
                {siblings.map((s) => (
                  <li key={s.id}>
                    <Link
                      to={`/product/${s.slug}`}
                      replace
                      aria-label={`${s.color}${s.id === product.id ? ', selected' : ''}`}
                      aria-current={s.id === product.id}
                      className={cn(
                        'press block overflow-hidden rounded-none ring-offset-2 ring-offset-paper transition-[box-shadow] duration-200',
                        s.id === product.id ? 'ring-2 ring-ink' : 'hover:ring-2 hover:ring-sand',
                      )}
                    >
                      <Img id={s.images[0]} alt="" sizes="64px" className="h-20 w-16" position="50% 25%" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div ref={buyRef} className="mt-7 scroll-mt-40">
            <fieldset>
              <div className="flex items-center justify-between">
                <legend className="caps text-[10px] text-ink-soft">
                  Size{size && <span className="ml-2 text-ink">{size}</span>}
                </legend>
                {!freeSize && (
                  <button type="button" onClick={() => setChartOpen(true)} className="caps link-under flex items-center gap-1.5 text-[10px] text-ink">
                    <Icon name="ruler" size={16} /> Size guide
                  </button>
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={size === s}
                    onClick={() => {
                      setSize(s)
                      setError('')
                    }}
                    className={cn(
                      'press h-12 min-w-14 px-4 ring-1 text-[14px] font-medium transition-[background-color,color,box-shadow] duration-200',
                      size === s ? 'bg-ink text-paper ring-ink shadow-float' : 'bg-paper text-ink ring-line hover:ring-ink',
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>
            <p role="alert" className={cn('mt-2 min-h-5 text-[14px] text-danger', error && 'anim-shake')}>
              {error}
            </p>

            {freeSize && site.stitchFee > 0 && (
              <Toggle on={stitch} onChange={setStitch} label="Blouse stitching">
                <span className="flex items-center gap-1.5 text-[15px] font-medium">
                  <Icon name="scissors" size={18} className="text-ink" /> Get the blouse stitched, +{formatPrice(site.stitchFee)}
                </span>
                <span className="block text-[13px] text-ink-soft">We will WhatsApp you for measurements after you order. Fall and pico are always free.</span>
              </Toggle>
            )}

            <div className="mt-5 flex items-center gap-2">
              <QtyStepper value={qty} onChange={(q) => setQty(Math.max(1, q))} min={1} max={5} label={product.name} />
              <button
                ref={addBtn}
                type="button"
                onClick={() => addToBag()}
                className={cn('btn h-12 flex-1 text-[11px]', addState === 'added' && '[--btn-bg:var(--color-success)]')}
              >
                {addState === 'adding' && <span className="anim-fade-in size-4 animate-spin rounded-full border-2 border-paper/30 border-t-paper" aria-hidden="true" />}
                {addState === 'added' && <Icon name="check" size={18} weight="bold" className="anim-pop" />}
                {addState === 'idle' && <Icon name="bag" size={19} />}
                <span aria-live="polite">{addState === 'adding' ? 'Adding' : addState === 'added' ? 'Added to bag' : 'Add to bag'}</span>
              </button>
              <HeartButton product={product} size="lg" />
            </div>
            <Button variant="outline" size="lg" onClick={buyNow} className="mt-2.5 w-full" arrow>
              Buy now
            </Button>
          </div>

          <ul className="mt-6 grid grid-cols-3 gap-2 text-center text-[13px]">
            {[
              ['returns', '7-day returns'],
              ['cash', 'Cash on delivery'],
              ['truck', 'Ships in 48 hrs'],
            ].map(([icon, label]) => (
              <li key={label} className="group border border-line bg-paper px-2 py-4">
                <Icon name={icon} size={24} className="mx-auto text-ink transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-rotate-12 group-hover:scale-110" />
                <span className="mt-1.5 block leading-tight font-medium">{label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-none border border-line p-5">
            <PincodeCheck />
          </div>

          <div className="mt-4">
            <Accordion title="Product details" defaultOpen>
              <p>{product.blurb}</p>
              <dl className="mt-4 grid grid-cols-[120px_1fr] gap-y-2 text-[14px]">
                <dt>Fabric</dt>
                <dd className="text-ink">{product.fabric}</dd>
                <dt>Colour</dt>
                <dd className="text-ink">{product.color}</dd>
                <dt>In the box</dt>
                <dd className="text-ink">{product.includes}</dd>
                <dt>Cut</dt>
                <dd className="text-ink">{product.cut}</dd>
                <dt>Occasion</dt>
                <dd className="text-ink">{product.occasions.map((o) => occasionLabels[o]).join(', ')}</dd>
                <dt>Product code</dt>
                <dd className="text-ink uppercase">JE-{product.id}</dd>
              </dl>
            </Accordion>
            <Accordion title="Fit & care">
              <p>{product.cut}. Model is 6 feet and wears {product.model}. Between sizes? Take the larger one for a relaxed look.</p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                {product.care.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </Accordion>
            <Accordion title="Shipping & returns">
              <p>
                Ships within 48 hours and arrives in 2 to 7 days across India. Free shipping above {formatPrice(site.freeShippingOver)}, otherwise{' '}
                {formatPrice(site.shippingFee)}.
              </p>
              <p className="mt-2">Free returns and exchanges within 7 days of delivery, with tags on. We pick up from your door.</p>
            </Accordion>
          </div>
        </div>
      </div>

      <div className="shell mt-20">
        <ProductReviews product={product} />
      </div>

      <ProductRail id="related-title" title="You may also like" products={related} />
      {recent.length > 0 && <ProductRail id="recent-title" title="Recently viewed" products={recent} />}

      {/* Phone sticky buy bar */}
      <div
        className={cn(
          'fixed inset-x-2 bottom-2 z-30 flex items-center gap-3 rounded-none bg-paper/95 p-2 pb-[max(8px,env(safe-area-inset-bottom))] shadow-lift backdrop-blur-lg transition-transform duration-300 ease-out lg:hidden',
          showSticky ? 'translate-y-0' : 'translate-y-[130%]',
        )}
        aria-hidden={!showSticky}
        inert={!showSticky}
      >
        <Img id={product.images[0]} alt="" sizes="48px" className="h-14 w-11 shrink-0 rounded-none" position="50% 25%" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold">{product.name}</p>
          <p className="text-[15px] font-bold tabular-nums">
            {formatPrice(price)} {size && <span className="text-[12px] font-normal text-ink-soft">, size {size}</span>}
          </p>
        </div>
        <Button onClick={(e) => addToBag(e.currentTarget)}>{addState === 'added' ? 'Added' : 'Add to bag'}</Button>
      </div>

      <Modal open={chartOpen} onClose={() => setChartOpen(false)} title="Size guide">
        <p className="text-[15px] text-ink-soft">Body measurements in inches. Tops in inches. Trousers are sold by waist (28 to 38).</p>
        <div className="mt-4 overflow-hidden rounded-none bg-paper">
          <table className="w-full text-left text-[15px]">
            <thead>
              <tr className="text-[13px] text-ink-soft">
                {['Size', 'Chest or bust', 'Waist', 'Hip'].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizeChart.map(([s, ...m]) => (
                <tr key={s} className={cn('border-t border-paper', size === s && 'bg-mist')}>
                  <td className="px-4 py-2.5 font-bold">{s}</td>
                  {m.map((v, i) => (
                    <td key={i} className="px-4 py-2.5 tabular-nums">
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[14px] text-ink-soft">Still unsure? WhatsApp us at {site.phone} and we will help you choose.</p>
      </Modal>
    </>
  )
}
