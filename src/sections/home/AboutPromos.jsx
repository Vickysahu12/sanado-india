import { Link } from 'react-router'
import { about, promos, cutout } from '../../data/content'
import { useReveal } from '../../hooks/useReveal'
import { Img } from '../../components/ui/Img'
import { Icon } from '../../components/ui/Icon'
import { Button } from '../../components/ui/Button'
import { Title } from './Title'
import { cn } from '../../lib/cn'

/** One offer banner: copy on the left, the piece on the right, on a soft ground. */
function Promo({ p, i }) {
  return (
    <Link to={p.to} className={cn('group relative flex min-h-[220px] overflow-hidden rounded-[8px] sm:min-h-[250px]', p.tone)} data-reveal style={{ '--reveal-delay': `${i * 90}ms` }}>
      <div className="relative z-10 flex w-[58%] flex-col justify-center p-6 sm:p-8">
        <p className="caps text-[9.5px] text-tan-deep">{p.kicker}</p>
        <h3 className="headline mt-3 text-[22px] text-ink sm:text-[26px]">{p.title}</h3>
        <span className="caps mt-5 inline-flex items-center gap-2 text-[10px] text-ink">
          <span className="link-line">Shop now</span>
          <Icon name="arrow" size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
      {p.cut ? (
        <img
          src={cutout(p.cut)}
          alt=""
          loading="lazy"
          draggable={false}
          className="pointer-events-none absolute right-[4%] bottom-0 h-[96%] w-auto max-w-[44%] object-contain object-bottom transition-transform duration-700 ease-[var(--ease-out)] group-hover:-translate-y-1.5 group-hover:scale-[1.03]"
          style={{ transformOrigin: 'bottom center' }}
        />
      ) : (
        <Img id={p.image} alt="" className="absolute! inset-y-0 right-0 w-[42%]" position="30% 30%" imgClassName="transition-transform duration-[1200ms] ease-[var(--ease-out)] group-hover:scale-[1.05]" />
      )}
    </Link>
  )
}

export function PromoPair({ index }) {
  const ref = useReveal()
  return (
    <div ref={ref} className="shell grid gap-4 pt-14 sm:grid-cols-2 lg:pt-20">
      {promos[index].map((p, i) => (
        <Promo key={p.title} p={p} i={i} />
      ))}
    </div>
  )
}

/** "About us" (ref: the inspo's centred block) followed by the first pair of offers. */
export function AboutPromos() {
  return (
    <>
      <section className="shell pt-16 lg:pt-24" aria-labelledby="about-title">
        <Title id="about-title">About us</Title>
        <p className="mx-auto mt-6 max-w-[64ch] text-center text-[15px] leading-relaxed text-ink-soft">{about.body}</p>
        <div className="mt-7 flex justify-center">
          <Button to={about.to} size="sm">
            Read more
          </Button>
        </div>
      </section>
      <PromoPair index={0} />
    </>
  )
}
