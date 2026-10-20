import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'

export function NotFoundPage() {
  useDocumentTitle('Page not found')
  return (
    <div className="shell flex flex-col items-center py-24 text-center">
      <span className="grid size-20 place-items-center rounded-full bg-mist text-ink">
        <Icon name="sun" size={40} weight="fill" className="spin-slow" />
      </span>
      <h1 className="display mt-6 text-[44px] text-ink sm:text-[60px]">This page wandered off</h1>
      <p className="mt-4 max-w-[40ch] text-[16px] text-ink-soft">The link may be old, or the piece may have sold out. Everything else is right where we left it.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button to="/" arrow>
          Go home
        </Button>
        <Button to="/shop" variant="outline">
          Shop all
        </Button>
      </div>
    </div>
  )
}
