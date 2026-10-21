// Editorial content for the storefront. Kept out of components so the client
// (or a CMS later) can change copy and imagery in one place.
// Image ids refer to public/media/products (mNN-1 men, wNN-1 women; -2 a closer crop).
// Hero cut-outs (background removed) live in public/media/hero.

export const cutout = (name) => `/media/hero/${name}.webp`

// Hero: two panels side by side, for her and for him.
export const heroPanels = [
  {
    id: 'her',
    kicker: 'For her · Cotton Lycra',
    title: 'Leggings that stay where you put them',
    body: 'High-rise, four-way stretch and a gusset that never gives up. In eight colours.',
    cta: 'Shop women',
    to: '/shop?occasion=women',
    cut: 'w1',
    tone: 'bg-sand',
  },
  {
    id: 'him',
    kicker: 'For him · Combed cotton',
    title: 'Everyday basics, done properly',
    body: 'Vests that vanish, trunks that stay put, and lounge pants for the rest of the day.',
    cta: 'Shop men',
    to: '/shop?occasion=men',
    cut: 'm17',
    tone: 'bg-[#e9ecf1]',
  },
]

export const about = {
  body: 'Sanado India makes the things you wear closest to you: bras, briefs, vests, leggings and loungewear for women and men. Soft combed cotton, honest elastic, and fits tested on real bodies, so the comfort you feel inside shows up as confidence outside.',
  to: '/about',
}

// Two pairs of offer banners (ref: "Up to 20% off / Comfortz bra and panty set").
export const promos = [
  [
    { kicker: 'Up to 20% off', title: 'Ribbed vests that vanish under a shirt', to: '/shop/men-innerwear', cut: 'm13', tone: 'bg-[#e9ecf1]' },
    { kicker: 'Up to 25% off', title: 'Period briefs that simply work', to: '/shop/panties', image: 'w33-1', tone: 'bg-sand' },
  ],
  [
    { kicker: 'New in', title: 'Leggings in eight colours', to: '/shop/leggings', cut: 'w18', tone: 'bg-[#f3e9e7]' },
    { kicker: 'From ₹449', title: 'The tee he will wear every day', to: '/product/white-crew-neck-tee', cut: 'm6', tone: 'bg-[#eef0ea]' },
  ],
]

export const perks = [
  { icon: 'truck', title: 'Free shipping', body: 'On orders above ₹999' },
  { icon: 'returns', title: '7-day returns', body: 'Unworn, tags on' },
  { icon: 'shield', title: 'Secured payment', body: 'UPI, cards, COD' },
  { icon: 'gift', title: 'Discreet packing', body: 'Plain outer box, always' },
  { icon: 'chat', title: 'Support 7 days', body: 'WhatsApp us anytime' },
]

export const categoryLabels = {
  'men-innerwear': 'Innerwear for men',
  'men-lounge': 'Loungewear for men',
  'men-shorts': 'Shorts for men',
  bras: 'Bras',
  panties: 'Panties',
  leggings: 'Leggings',
  camisoles: 'Camisoles and slips',
  'women-lounge': 'Nightwear and undershorts',
}

export const categorySingular = {
  'men-innerwear': 'Innerwear',
  'men-lounge': 'Loungewear',
  'men-shorts': 'Shorts',
  bras: 'Bra',
  panties: 'Panty',
  leggings: 'Leggings',
  camisoles: 'Camisole',
  'women-lounge': 'Loungewear',
}

// Top categories, by who they are for.
export const categoryGroups = {
  women: [
    { id: 'bras', label: 'Bras', image: 'w26-1', to: '/shop/bras' },
    { id: 'panties', label: 'Panties', image: 'w12-1', to: '/shop/panties' },
    { id: 'leggings', label: 'Leggings', image: 'w07-1', to: '/shop/leggings' },
    { id: 'camisoles', label: 'Camisoles', image: 'w05-1', to: '/shop/camisoles' },
  ],
  men: [
    { id: 'men-innerwear', label: 'Vests and boxers', image: 'm08-1', to: '/shop/men-innerwear' },
    { id: 'men-lounge', label: 'Loungewear', image: 'm17-1', to: '/shop/men-lounge' },
    { id: 'men-shorts', label: 'Shorts', image: 'm22-1', to: '/shop/men-shorts' },
    { id: 'men-tee', label: 'The crew tee', image: 'm06-1', to: '/product/white-crew-neck-tee' },
  ],
}

export const categories = [...categoryGroups.women, ...categoryGroups.men.slice(0, 3), { id: 'women-lounge', label: 'Nightwear', image: 'w20-1', to: '/shop/women-lounge' }]

// "Shop for" lives in each product's `occasions`.
export const occasionLabels = {
  women: 'Women',
  men: 'Men',
}

export const occasions = Object.entries(occasionLabels).map(([id, label]) => ({ id, label }))

// Find your comfort: who it is for, then what the day needs.
export const needs = [
  { id: 'everyday', label: 'Everyday', icon: 'sun' },
  { id: 'workout', label: 'Workout', icon: 'sneaker' },
  { id: 'sleep', label: 'Sleep', icon: 'moon' },
  { id: 'period', label: 'Period days', icon: 'drop', only: 'women' },
  { id: 'lounge', label: 'Lounge', icon: 'house' },
]

export const featured = { title: 'Featured products', ids: ['w17', 'm14', 'w26', 'm08', 'w13', 'm19', 'w33', 'm06'], to: '/shop?bestseller=1' }

// The comfort journal (ref: "From the blog"). Each note points to a page that exists.
export const journal = [
  { date: '12 Oct 2026', tag: 'Fit guide', title: 'Finding your bra size in five minutes', body: 'A soft tape, a mirror and two measurements. Our chart does the rest.', image: 'w04-1', to: '/help#sizing' },
  { date: '28 Sep 2026', tag: 'Period care', title: 'Why a period brief beats a pad on day one', body: 'Four layers, no rustle, and one less thing to carry.', image: 'w13-1', to: '/product/navy-period-brief' },
  { date: '9 Sep 2026', tag: 'For him', title: 'The vest that disappears under a white shirt', body: 'Ribbed, close and the right shade of navy. Here is why it works.', image: 'm08-1', to: '/product/navy-ribbed-vest' },
]

// Sample customer notes (demo content).
export const testimonials = [
  { name: 'Priya S.', city: 'Pune', rating: 5, productId: 'w17', text: 'These leggings do not roll down, do not go see-through and still look new after months of washing. I have bought four pairs.' },
  { name: 'Rahul M.', city: 'Mumbai', rating: 5, productId: 'm14', text: 'The boxer trunks are the most comfortable I have worn. The waistband does not dig in even after a full day.' },
  { name: 'Ananya K.', city: 'Bengaluru', rating: 5, productId: 'w13', text: 'The period briefs actually work. No leaks, no bulk. I wish I had found them years ago.' },
  { name: 'Vikram R.', city: 'Delhi', rating: 4, productId: 'm08', text: 'The navy vest is invisible under my office shirts. Good fabric, holds its shape.' },
]

export const offers = [
  { title: '10% off your first order', code: 'COMFORT10' },
  { title: '₹150 off orders above ₹1,499', code: 'SANADO150' },
  { title: 'Any 3 innerwear, ₹300 off above ₹999', code: 'PACK3' },
]

export const serviceRow = perks

// Review pool used to fill product pages (demo).
export const reviewPool = [
  { name: 'Kavya R.', rating: 5, title: 'So soft', text: 'The fabric is lovely against the skin and the stitching is neat.' },
  { name: 'Arjun P.', rating: 5, title: 'Bought another pack', text: 'Fit is true to size and the elastic is gentle. Ordered more.' },
  { name: 'Neha S.', rating: 4, title: 'Runs a little small', text: 'Lovely quality. I would go one size up if you are between sizes.' },
  { name: 'Siddharth M.', rating: 5, title: 'Fast and discreet', text: 'Arrived in three days in a plain box. Exactly as shown.' },
  { name: 'Ritu D.', rating: 4, title: 'Good value', text: 'Comfortable all day and holds colour after many washes.' },
]

export const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'new', label: 'New in' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' },
]

export const priceBands = [
  { id: 'u399', label: 'Under ₹400', min: 0, max: 399 },
  { id: '400-699', label: '₹400 to ₹699', min: 400, max: 699 },
  { id: '700-999', label: '₹700 to ₹999', min: 700, max: 999 },
  { id: '1000-1499', label: '₹1,000 and above', min: 1000, max: 1499 },
]

// Body measurements in inches: chest or bust, waist, hip.
export const sizeChart = [
  ['S', '34-36', '28-30', '35-37'],
  ['M', '36-38', '30-32', '37-39'],
  ['L', '38-40', '32-34', '39-41'],
  ['XL', '40-42', '34-36', '41-43'],
  ['XXL', '42-44', '36-38', '43-45'],
]
