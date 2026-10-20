import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { featured } from '../data/content'
import { HeroSplit } from '../sections/home/HeroSplit'
import { AboutPromos, PromoPair } from '../sections/home/AboutPromos'
import { LatestProducts } from '../sections/home/LatestProducts'
import { TopCategories } from '../sections/home/TopCategories'
import { ComfortFinder } from '../sections/home/ComfortFinder'
import { Services, Testimonials, Journal } from '../sections/home/Voices'
import { Carousel } from '../sections/home/Carousel'
import { Closing } from '../sections/home/Closing'

// In the inspo's order: hero, about, offers, latest, top categories, services, voices,
// offers, featured, journal; with Find your comfort after the categories.
export function HomePage() {
  useDocumentTitle()
  return (
    <>
      <HeroSplit />
      <AboutPromos />
      <LatestProducts />
      <TopCategories />
      <ComfortFinder />
      <div className="pt-16 lg:pt-24">
        <Services />
      </div>
      <Testimonials />
      <PromoPair index={1} />
      <Carousel id="featured-title" {...featured} />
      <Journal />
      <Closing />
    </>
  )
}
