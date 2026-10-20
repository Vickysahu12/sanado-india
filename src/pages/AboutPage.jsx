import { Link } from 'react-router'
import { categories, perks } from '../data/content'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useReveal } from '../hooks/useReveal'
import { Img } from '../components/ui/Img'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'

const CHAPTERS = [
  { title: 'Inner', hand: 'comfort', body: 'Combed cotton, modal and cotton Lycra, chosen for how they feel after twelve hours, not how they look on a hanger. Elastic that holds without digging, seams that lie flat.', image: 'w26-1' },
  { title: 'Outer', hand: 'confidence', body: 'A vest that vanishes under a white shirt. Leggings that do not go sheer. A period brief that means one less thing to think about. Comfort you do not notice is confidence you do.', image: 'm08-1' },
  { title: 'For her and', hand: 'for him', body: 'Bras, briefs, leggings and camisoles for women; vests, trunks, boxers and loungewear for men. Every piece is packed discreetly and can be returned unworn within seven days.', image: 'w07-1' },
]

export function AboutPage() {
  useDocumentTitle('About us')
  const ref = useReveal()

  return (
    <div ref={ref}>
      <section className="shell grid items-center gap-12 pt-12 lg:grid-cols-[1.15fr_1fr] lg:pt-20">
        <div>
          <p className="caps ruled-label max-w-[280px] text-[10px] text-ink-soft">About us</p>
          <h1 className="display mt-6 text-[40px] sm:text-[72px]">
            Inner comfort, <span className="hand">outer confidence</span>
          </h1>
          <p className="mt-6 max-w-[48ch] text-[17px] leading-relaxed text-ink-soft">
            Sanado India began with a simple idea: the clothes nobody sees should be the ones made with the most care. We make innerwear and loungewear for women and men in India, in soft cottons and honest fits, at prices that make a drawer full of them easy.
          </p>
          <Button to="/shop" size="lg" className="mt-8" arrow>
            Shop the collection
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Img id="w01-1" alt="A woman in wine capri leggings and a black sports bra" sizes="(min-width: 1024px) 20vw, 50vw" className="aspect-[4/5] rounded-[8px]" position="50% 20%" />
          <Img id="m13-1" alt="A man in a navy gym vest" sizes="(min-width: 1024px) 20vw, 50vw" className="mt-14 aspect-[4/5] rounded-[8px]" position="50% 20%" />
        </div>
      </section>

      <section className="shell pt-24 lg:pt-32">
        <ul className="space-y-16 lg:space-y-24">
          {CHAPTERS.map((c, i) => (
            <li key={c.title} className="grid items-center gap-8 lg:grid-cols-[360px_1fr] lg:gap-20">
              <div className={i % 2 ? 'lg:order-2 lg:justify-self-end' : ''} data-reveal-frame>
                <Img id={c.image} alt="" sizes="360px" className="aspect-[4/5] w-full max-w-[360px] rounded-[8px]" position="50% 20%" />
              </div>
              <div data-reveal>
                <h2 className="display text-[26px] sm:text-[38px]">
                  {c.title} <span className="hand">{c.hand}</span>
                </h2>
                <p className="mt-5 max-w-[48ch] text-[16.5px] leading-relaxed text-ink-soft">{c.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="shell pt-24 lg:pt-32">
        <ul className="grid gap-6 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((p) => (
            <li key={p.title} className="flex gap-4">
              <Icon name={p.icon} size={26} className="shrink-0 text-gold-deep" />
              <span>
                <span className="caps block text-[10px] text-ink">{p.title}</span>
                <span className="mt-1 block text-[14px] leading-relaxed text-ink-soft">{p.body}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="shell pt-20 lg:pt-28">
        <h2 className="display text-[22px] sm:text-[28px]">Where to begin</h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {categories.map((c) => (
            <li key={c.id}>
              <Link to={c.to} className="caps press group inline-flex h-12 items-center gap-3 rounded-[8px] border border-line-strong bg-paper px-5 text-[10.5px] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream">
                {c.label}
                <Icon name="arrow" size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
