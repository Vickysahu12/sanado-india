import { CartProvider } from '../features/cart/CartContext'
import { WishlistProvider } from '../features/wishlist/WishlistContext'
import { ToastProvider } from '../features/toast/Toast'
import { SearchProvider } from '../features/search/SearchOverlay'

// Rendered inside the router (see RootLayout), so any provider can navigate.
export function Providers({ children }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <ToastProvider>
          <SearchProvider>{children}</SearchProvider>
        </ToastProvider>
      </WishlistProvider>
    </CartProvider>
  )
}
