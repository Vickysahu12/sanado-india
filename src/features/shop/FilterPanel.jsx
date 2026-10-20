import { useState } from 'react'
import { occasionLabels, priceBands } from '../../data/content'
import { Icon } from '../../components/ui/Icon'
import { cn } from '../../lib/cn'

function Group({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-line py-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-[15px] font-bold text-ink"
      >
        {title}
        <Icon name="caret-down" size={14} className={cn('transition-transform duration-300', open && 'rotate-180')} />
      </button>
      {/* Height animates via grid-template-rows so content of any size collapses smoothly. */}
      <div className={cn('grid transition-[grid-template-rows] duration-300 ease-out', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
        <div className="overflow-hidden">
          <div className="pt-3.5">{children}</div>
        </div>
      </div>
    </div>
  )
}

function Check({ checked, onChange, label, count, swatch }) {
  return (
    <label className="group flex items-center gap-3 py-1.5 text-[14px]">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        className={cn(
          'grid size-[18px] shrink-0 place-items-center border transition-colors duration-150 peer-focus-visible:ring-2 peer-focus-visible:ring-bronze',
          checked ? 'border-ink bg-ink text-paper' : 'border-line-strong text-transparent group-hover:border-ink',
        )}
        aria-hidden="true"
      >
        <Icon name="check" size={12} weight="bold" />
      </span>
      {swatch && <span className="size-4 shrink-0 rounded-full border border-line" style={{ backgroundColor: swatch }} aria-hidden="true" />}
      <span className={cn('flex-1', checked && 'text-ink')}>{label}</span>
      {count !== undefined && <span className="text-[12px] text-ink-soft tabular-nums">{count}</span>}
    </label>
  )
}

/** Filter groups. Used in the desktop sidebar and inside the mobile filter drawer. */
export function FilterPanel({ facets, shop }) {
  const { query, toggle, setSale } = shop
  return (
    <div>
      <Group title="Fabric">
        {facets.fabric.map(([v, n]) => (
          <Check key={v} label={v} count={n} checked={query.fabric.includes(v)} onChange={() => toggle('fabric', v)} />
        ))}
      </Group>
      <Group title="Shop for">
        {facets.occasion.map(([v, n]) => (
          <Check key={v} label={occasionLabels[v] ?? v} count={n} checked={query.occasion.includes(v)} onChange={() => toggle('occasion', v)} />
        ))}
      </Group>
      <Group title="Colour">
        <div className="grid grid-cols-2 gap-x-3">
          {facets.color.map(([v, n]) => (
            <Check key={v} label={v} count={n} swatch={facets.colorHex[v]} checked={query.color.includes(v)} onChange={() => toggle('color', v)} />
          ))}
        </div>
      </Group>
      <Group title="Price">
        {priceBands.map((b) => (
          <Check key={b.id} label={b.label} checked={query.price.includes(b.id)} onChange={() => toggle('price', b.id)} />
        ))}
      </Group>
      <Group title="Offers">
        <Check label="On sale" checked={query.sale} onChange={() => setSale(!query.sale)} />
      </Group>
    </div>
  )
}
