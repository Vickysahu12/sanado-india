import { useState } from 'react'
import { Icon } from './Icon'
import { cn } from '../../lib/cn'

/** Ticket-style coupon chip: copies its code and flips to "Copied" for a moment. */
export function CopyCode({ code, light, className }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      // Clipboard can be blocked; the code is still visible to type in.
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? `${code} copied` : `Copy code ${code}`}
      className={cn(
        'press group inline-flex h-9 items-center gap-2 rounded-[6px] border-[1.5px] border-dashed px-3.5 text-[13px] font-bold tracking-[0.06em] transition-colors',
        light ? 'border-mist text-mist hover:bg-mist hover:text-plum' : 'border-ink text-ink hover:bg-ink hover:text-paper',
        copied && (light ? 'bg-mist text-plum' : 'bg-ink text-paper'),
        className,
      )}
    >
      {copied ? (
        <span key="ok" className="anim-fade-in flex items-center gap-1.5">
          <Icon name="check" size={14} weight="bold" /> Copied
        </span>
      ) : (
        <span key="code" className="anim-fade-in flex items-center gap-1.5">
          {code} <Icon name="tag" size={14} className="transition-transform duration-300 group-hover:-rotate-12" />
        </span>
      )}
    </button>
  )
}
