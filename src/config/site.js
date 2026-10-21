// Brand-level settings. Change the name, offers, fees or contact details here, not in components.
export const site = {
  name: 'Sanado India',
  tagline: 'Inner comfort. Outer confidence.',
  currency: 'INR',
  locale: 'en-IN',
  freeShippingOver: 999,
  shippingFee: 59,
  codFee: 39,
  stitchFee: 0,
  orderPrefix: 'SI',
  instagram: '@sanadoindia',
  phone: '+91 98111 27460',
  email: 'care@sanadoindia.in',

  announcements: ['Free shipping on orders above ₹999', 'Discreet packing on every order', 'First order? Take 10% off with COMFORT10'],

  // Coupon codes accepted at bag / checkout (demo).
  coupons: {
    COMFORT10: { type: 'percent', value: 10, label: '10% off your first order' },
    SANADO150: { type: 'flat', value: 150, label: '₹150 off orders above ₹1,499', min: 1499 },
    PACK3: { type: 'flat', value: 300, label: '₹300 off orders above ₹999', min: 999 },
  },

  footer: {
    blurb: 'Bras, briefs, leggings and loungewear for her; vests, boxers and lounge pants for him. Inner comfort, outer confidence.',
    columns: [
      {
        title: 'Shop',
        links: [
          { label: 'Women', to: '/shop?occasion=women' },
          { label: 'Bras', to: '/shop/bras' },
          { label: 'Panties', to: '/shop/panties' },
          { label: 'Leggings', to: '/shop/leggings' },
          { label: 'Men', to: '/shop?occasion=men' },
          { label: 'Innerwear for men', to: '/shop/men-innerwear' },
          { label: 'Loungewear for men', to: '/shop/men-lounge' },
        ],
      },
      {
        title: 'Help',
        links: [
          { label: 'Size guide', to: '/help#sizing' },
          { label: 'Shipping', to: '/help#shipping' },
          { label: 'Returns', to: '/help#returns' },
          { label: 'Track order', to: '/account' },
          { label: 'Contact', to: '/help#contact' },
        ],
      },
      {
        title: 'Sanado India',
        links: [
          { label: 'About us', to: '/about' },
          { label: 'Find your comfort', to: '/#comfort' },
          { label: 'Wishlist', to: '/wishlist' },
          { label: 'Privacy', to: '/help#privacy' },
        ],
      },
    ],
  },
}
