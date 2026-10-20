import { useRouteError } from 'react-router'

/**
 * Shown if a page crashes. Rendered outside the providers, so it uses plain links
 * and a full reload to recover cleanly.
 */
export function ErrorPage() {
  const error = useRouteError()
  if (import.meta.env.DEV) console.error(error)

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-paper px-6 text-center">
      <p className="display text-[36px] text-ink">sanado india</p>
      <h1 className="display mt-8 text-[40px] text-ink">Something went wrong</h1>
      <p className="mt-3 max-w-[40ch] text-[15px] text-ink-soft">
        Sorry, this page ran into a problem. Your bag and wishlist are safe. Please try again.
      </p>
      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="btn h-12 px-7 text-[14px]"
        >
          Try Again
        </button>
        <a href="/" className="grid h-12 place-items-center rounded-none bg-paper px-7 text-[14px] font-semibold text-ink">
          Go Home
        </a>
      </div>
    </div>
  )
}
