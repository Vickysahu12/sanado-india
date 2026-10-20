import { Link } from 'react-router'
import { site } from '../../config/site'
import { cn } from '../../lib/cn'

// The client's logo (public/brand), navy with the caramel wave, as drawn for a light ground.
// `full` shows the cream and caramel version with "Inner comfort. Outer confidence.", for
// the navy footer.
export function Logo({ className, full, size = 'md' }) {
  if (full) {
    return (
      <Link to="/" aria-label={`${site.name} home`} className={cn('press inline-block', className)}>
        <img src="/brand/logo-light.png" alt={site.name} width={572} height={174} draggable={false} className="h-auto w-full max-w-[300px]" />
      </Link>
    )
  }
  return (
    <Link to="/" aria-label={`${site.name} home`} className={cn('press group relative inline-flex items-center', className)}>
      <img
        src="/brand/wordmark.png"
        alt={site.name}
        width={572}
        height={147}
        draggable={false}
        className={cn('w-auto transition-[height] duration-300 ease-[var(--ease-out)]', size === 'sm' ? 'h-[36px]' : 'h-[40px] lg:h-[48px]')}
      />
    </Link>
  )
}
