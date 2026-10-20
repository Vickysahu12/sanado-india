# Sanado India

A demo storefront for Sanado India, "Inner comfort. Outer confidence.":
- for women: bras, panties, period briefs, leggings, camisoles and nightwear
- for men: vests, boxers, trunks, socks, loungewear and shorts

57 pieces from ₹249 to ₹1,299.

## Run it

```bash
npm install
npm run dev
```

Build with `npm run build`, then preview with `npm run preview`.

## What works

- **Home:**
  - A split hero for her and for him; the panel you point at widens.
  - About us and offer banners.
  - Latest products with All / Women / Men tabs.
  - Top categories with a For her / For him switch.
  - **Find your comfort:** pick who it is for and what the day needs, and the best matches appear.
  - A services row and customer reviews.
  - Featured products, the comfort journal, coupon codes and an Instagram wall.
- **Shop:**
  - Women and Men menus.
  - Categories: Bras, Panties, Leggings, Camisoles, Nightwear, Innerwear for men, Loungewear for men, Shorts for men.
  - Filters in the URL: fabric, shop for, colour, price.
  - Sort, and search with suggestions.
- **Product page:**
  - Gallery with zoom and colour siblings.
  - Sizes: S to XXL for men, XS to XL for women, band sizes 30 to 38 for bras, and free size for socks.
  - Size guide, pincode check, reviews, related and recently viewed.
- **Bag:**
  - Drawer and full page, with free shipping over ₹999.
  - Coupons: `COMFORT10`, `SANADO150` (₹1,499+), `PACK3` (₹999+).
- **Checkout:**
  - Address with pincode autofill, then UPI, card, net banking or COD (₹39).
  - Order confirmation and order history on this device.
- **Also:** wishlist, account, help/FAQ, about us, a 404 page and an error page.

All data is local (`src/data`). The cart, wishlist and orders are saved in localStorage. No real payment is taken. Reviews and customer notes are sample content.

## Stack

- Vite, React 19, React Router 7 and Tailwind CSS v4.
- Motion, Lenis and Phosphor icons.
- Urbanist and Plus Jakarta Sans fonts.
