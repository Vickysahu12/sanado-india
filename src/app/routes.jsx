import { createBrowserRouter } from 'react-router'
import { RootLayout } from './RootLayout'
import { HomePage } from '../pages/HomePage'
import { ErrorPage } from '../pages/ErrorPage'

// The home page ships in the main bundle; every other page is its own small file, fetched
// the first time someone goes there (the current page stays on screen until it is ready).
const page = (load, name) => () => load().then((m) => ({ Component: m[name] }))

// Once the home page has settled, fetch the pages people open next in the background, so the
// first click on a product or a category is instant.
if (typeof window !== 'undefined') {
  const warm = () => {
    import('../pages/ShopPage')
    import('../pages/ProductPage')
  }
  window.addEventListener('load', () => ('requestIdleCallback' in window ? requestIdleCallback(warm, { timeout: 3000 }) : setTimeout(warm, 1500)), { once: true })
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/shop', lazy: page(() => import('../pages/ShopPage'), 'ShopPage') },
      { path: '/shop/:category', lazy: page(() => import('../pages/ShopPage'), 'ShopPage') },
      { path: '/product/:slug', lazy: page(() => import('../pages/ProductPage'), 'ProductPage') },
      { path: '/cart', lazy: page(() => import('../pages/CartPage'), 'CartPage') },
      { path: '/checkout', lazy: page(() => import('../pages/CheckoutPage'), 'CheckoutPage') },
      { path: '/order/:id', lazy: page(() => import('../pages/OrderSuccessPage'), 'OrderSuccessPage') },
      { path: '/wishlist', lazy: page(() => import('../pages/WishlistPage'), 'WishlistPage') },
      { path: '/account', lazy: page(() => import('../pages/AccountPage'), 'AccountPage') },
      { path: '/about', lazy: page(() => import('../pages/AboutPage'), 'AboutPage') },
      { path: '/help', lazy: page(() => import('../pages/HelpPage'), 'HelpPage') },
      { path: '*', lazy: page(() => import('../pages/NotFoundPage'), 'NotFoundPage') },
    ],
  },
])
