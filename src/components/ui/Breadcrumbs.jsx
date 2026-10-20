import { Link } from 'react-router'
import { Icon } from './Icon'

/** items: [{ label, to? }]. The last item is the current page. */
export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[13px] text-ink-soft">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <Icon name="caret-right" size={11} />}
            {item.to && i < items.length - 1 ? (
              <Link to={item.to} className="link-line hover:text-ink">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
