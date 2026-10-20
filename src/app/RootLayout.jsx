import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Providers } from './Providers'
import { AnnouncementBar } from '../components/layout/AnnouncementBar'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { CartDrawer } from '../features/cart/CartDrawer'
import { scrollToTarget, startLenis, stopLenis } from '../lib/lenis'

/**
 * Scroll to the top on page change, or to #hash targets when present.
 * Query-string changes (shop filters) are left to the page, so filtering doesn't jump.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        // Don't return this: newer browsers return a Promise, and React would call it as a cleanup.
        // Wait a frame so the new page has laid out before measuring.
        requestAnimationFrame(() => scrollToTarget(el, { offset: -140 }))
        return
      }
    }
    scrollToTarget(0, { immediate: true })
  }, [pathname, hash])
  return null
}

export function RootLayout() {
  const { pathname } = useLocation()
  const minimal = pathname === '/checkout'

  useEffect(() => {
    startLenis()
    return stopLenis
  }, [])

  return (
    <Providers>
      <ScrollManager />
      <a
        href="#main"
        className="sr-only z-[70] bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to content
      </a>
      {!minimal && <AnnouncementBar />}
      <Header />
      <main id="main" key={pathname} className="page-enter min-h-[60vh]">
        <Outlet />
      </main>
      {!minimal && <Footer />}
      <CartDrawer />
    </Providers>
  )
}
