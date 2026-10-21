import { offers } from '../../data/content'
import { useReveal } from '../../hooks/useReveal'
import { CopyCode } from '../../components/ui/CopyCode'
import { Title } from './Title'

/** The close: the coupon codes. */
export function Closing() {
  const ref = useReveal()
  return (
    <section ref={ref} className="pt-16 lg:pt-24" aria-labelledby="notes-title">
      <div className="shell">
        <Title id="notes-title">Codes for you</Title>
        <ul className="mt-8 grid gap-3 sm:grid-cols-3">
          {offers.map((o) => (
            <li key={o.code} className="flex items-center justify-between gap-3 rounded-[8px] border border-dashed border-line-strong bg-paper px-5 py-4">
              <p className="text-[14px] text-ink">{o.title}</p>
              <CopyCode code={o.code} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
