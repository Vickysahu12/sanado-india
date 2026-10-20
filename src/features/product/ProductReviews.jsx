import { reviewPool } from '../../data/content'
import { Icon } from '../../components/ui/Icon'

// Rating summary with a distribution, plus a few reviews (demo data, rotated per product).
export function ProductReviews({ product }) {
  const offset = Number(product.id.slice(1)) % reviewPool.length
  const reviews = [...reviewPool.slice(offset), ...reviewPool.slice(0, offset)].slice(0, 3)
  // Plausible distribution that matches the average rating.
  const five = Math.round(product.reviews * Math.min(0.92, (product.rating - 3.6) / 1.5))
  const four = Math.round((product.reviews - five) * 0.7)
  const three = product.reviews - five - four
  const rows = [
    [5, five],
    [4, four],
    [3, three],
    [2, 0],
    [1, 0],
  ]

  return (
    <section id="reviews" className="scroll-mt-32 rounded-none bg-paper p-6 sm:p-10" aria-labelledby="reviews-title">
      <h2 id="reviews-title" className="display text-[34px] text-ink sm:text-[44px]">
        Ratings & Reviews
      </h2>
      <div className="mt-6 grid gap-10 lg:grid-cols-[300px_1fr]">
        <div>
          <p className="flex items-end gap-3">
            <span className="display text-[64px] leading-none">{product.rating.toFixed(1)}</span>
            <span className="pb-2 text-[13px] text-ink-soft">out of 5</span>
          </p>
          <span className="mt-2 flex gap-0.5 text-ink" aria-hidden="true">
            {Array.from({ length: 5 }, (_, i) => (
              <Icon key={i} name="star" size={16} weight={i < Math.round(product.rating) ? 'fill' : 'light'} />
            ))}
          </span>
          <p className="mt-1 text-[13px] text-ink-soft">Based on {product.reviews} reviews (sample data)</p>
          <ul className="mt-5 space-y-2">
            {rows.map(([stars, n]) => (
              <li key={stars} className="flex items-center gap-3 text-[12px]">
                <span className="flex w-7 items-center gap-0.5 tabular-nums">{stars} <Icon name="star" size={10} weight="fill" className="text-ink" /></span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-sand">
                  <span className="block h-full rounded-full bg-ink" style={{ width: `${(n / product.reviews) * 100}%` }} />
                </span>
                <span className="w-8 text-right text-ink-soft tabular-nums">{n}</span>
              </li>
            ))}
          </ul>
        </div>
        <ul className="space-y-3">
          {reviews.map((r) => (
            <li key={r.name} className="rounded-none bg-bone p-5">
              <div className="flex items-center gap-2">
                <span className="flex gap-0.5 text-ink" aria-label={`${r.rating} out of 5`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Icon key={i} name="star" size={12} weight={i < r.rating ? 'fill' : 'light'} />
                  ))}
                </span>
                <p className="text-[15px] font-medium">{r.title}</p>
              </div>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{r.text}</p>
              <p className="mt-2 flex items-center gap-1.5 text-[12px] text-ink-soft">
                {r.name}
                <Icon name="seal" size={13} weight="fill" className="text-success" /> Verified buyer
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
