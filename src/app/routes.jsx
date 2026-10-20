import { createBrowserRouter } from 'react-router'
import { RootLayout } from './RootLayout'
import { HomePage } from '../pages/HomePage'
import { ShopPage } from '../pages/ShopPage'
import { ProductPage } from '../pages/ProductPage'
import { CartPage } from '../pages/CartPage'
import { CheckoutPage } from '../pages/CheckoutPage'
import { OrderSuccessPage } from '../pages/OrderSuccessPage'
import { WishlistPage } from '../pages/WishlistPage'
import { AccountPage } from '../pages/AccountPage'
import { AboutPage } from '../pages/AboutPage'
import { HelpPage } from '../pages/HelpPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ErrorPage } from '../pages/ErrorPage'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/shop', element: <ShopPage /> },
      { path: '/shop/:category', element: <ShopPage /> },
      { path: '/product/:slug', element: <ProductPage /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/checkout', element: <CheckoutPage /> },
      { path: '/order/:id', element: <OrderSuccessPage /> },
      { path: '/wishlist', element: <WishlistPage /> },
      { path: '/account', element: <AccountPage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/help', element: <HelpPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
