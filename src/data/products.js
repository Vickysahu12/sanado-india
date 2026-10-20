// Demo catalogue built from the client's photos (public/media/products/mNN-* for men, wNN-* for
// women). `n` is the source photo number in src/assets/image/Man Inner Wear or Woman Inner Wear.
// Images are cropped to 4:5: the women's high-resolution shots at 720 x 900, the 360px shots at
// 360 x 450. View 2 is a closer crop, or a second photo (women 7 and 19).
// `wear` is who it is for (men / women); `need` drives the "Find your comfort" picker:
// everyday, workout, sleep, period, lounge.
// Shape mirrors what a products API would return, so services/catalog.js can switch to fetch() later.
// Prices sit between ₹249 and ₹1,499; ratings and copy are sample data.

const MEN = ['S', 'M', 'L', 'XL', 'XXL']
const WOMEN = ['XS', 'S', 'M', 'L', 'XL']
const BRA = ['30', '32', '34', '36', '38']
const FREE = ['Free size']

const SOFT_CARE = ['Machine wash cold, gentle', 'Dry in shade', 'Do not iron the elastic']

const CATEGORY = {
  'men-innerwear': { sizes: MEN, includes: 'One piece', care: SOFT_CARE, wear: ['men'] },
  'men-lounge': { sizes: MEN, includes: 'One piece', care: ['Machine wash cold', 'Hang to dry', 'Iron on medium'], wear: ['men'] },
  'men-shorts': { sizes: MEN, includes: 'One pair of shorts', care: ['Machine wash cold', 'Hang to dry', 'Iron on medium'], wear: ['men'] },
  bras: { sizes: BRA, includes: 'One bra', care: ['Hand wash or gentle machine wash in a bag', 'Dry flat in shade', 'Do not tumble dry'], wear: ['women'] },
  panties: { sizes: WOMEN, includes: 'One piece', care: SOFT_CARE, wear: ['women'] },
  leggings: { sizes: WOMEN, includes: 'One pair of leggings', care: SOFT_CARE, wear: ['women'] },
  camisoles: { sizes: WOMEN, includes: 'One piece', care: SOFT_CARE, wear: ['women'] },
  'women-lounge': { sizes: WOMEN, includes: 'One piece', care: SOFT_CARE, wear: ['women'] },
}

const item = (category, g) => (p) => {
  const base = { category, ...CATEGORY[category], ...p, g }
  return { ...base, occasions: base.wear }
}
const mInner = item('men-innerwear', 'm')
const mLounge = item('men-lounge', 'm')
const mShorts = item('men-shorts', 'm')
const bra = item('bras', 'w')
const panty = item('panties', 'w')
const legging = item('leggings', 'w')
const cami = item('camisoles', 'w')
const wLounge = item('women-lounge', 'w')

const raw = [
  // Men
  mLounge({ n: 1, name: 'Grey Cargo Joggers', fabric: 'Cotton Fleece', fit: 'Relaxed', color: 'Grey', hex: '#9a9c9e', need: ['lounge', 'workout'], price: 1199, rating: 4.6, reviews: 84, blurb: 'Soft grey joggers with cargo pockets and a cuffed ankle.' }),
  mLounge({ n: 2, name: 'Olive Lounge Pants', fabric: 'Cotton Twill', fit: 'Straight', color: 'Olive', hex: '#4c4b3c', need: ['lounge'], price: 999, rating: 4.5, reviews: 52, family: 'lounge-pant', blurb: 'Straight olive lounge pants with an easy drawcord waist.' }),
  mLounge({ n: 3, name: 'Grey Lounge Pants', fabric: 'Cotton Twill', fit: 'Straight', color: 'Grey', hex: '#8e8f8f', need: ['lounge'], price: 999, rating: 4.6, reviews: 61, family: 'lounge-pant', blurb: 'The lounge pant in a calm mid grey.' }),
  mShorts({ n: 4, name: 'Green Swim Shorts', fabric: 'Quick-dry Polyester', fit: 'Regular', color: 'Green', hex: '#5fb04c', need: ['lounge', 'workout'], price: 699, rating: 4.5, reviews: 38, family: 'swim', blurb: 'Bright green swim shorts with a mesh lining. Dries in minutes.' }),
  mShorts({ n: 5, name: 'Yellow Leaf Swim Shorts', fabric: 'Quick-dry Polyester', fit: 'Regular', color: 'Yellow', hex: '#e2bd3c', need: ['lounge'], price: 749, rating: 4.6, reviews: 29, family: 'swim', isNew: true, badge: 'New', blurb: 'Yellow swim shorts with a pale leaf print.' }),
  mLounge({ n: 6, name: 'White Crew Neck Tee', fabric: 'Combed Cotton', fit: 'Regular', color: 'White', hex: '#f1f1f0', need: ['everyday', 'lounge'], price: 449, rating: 4.7, reviews: 213, bestseller: true, badge: 'Bestseller', blurb: 'A soft white tee in combed cotton. Under a shirt or on its own.' }),
  mInner({ n: 7, name: 'Navy Cotton Socks', fabric: 'Combed Cotton', fit: 'Crew', color: 'Navy', hex: '#24324f', need: ['everyday'], price: 249, rating: 4.6, reviews: 147, sizes: FREE, includes: 'One pair', blurb: 'Cushioned navy crew socks with a ribbed cuff that stays up.' }),
  mInner({ n: 8, name: 'Navy Ribbed Vest', fabric: 'Cotton Rib', fit: 'Regular', color: 'Navy', hex: '#28385c', need: ['everyday', 'workout'], price: 349, rating: 4.7, reviews: 168, family: 'ribbed-vest', bestseller: true, blurb: 'A close-fitting ribbed vest that stays invisible under a shirt.' }),
  mInner({ n: 9, name: 'Sage Ribbed Vest', fabric: 'Cotton Rib', fit: 'Regular', color: 'Sage', hex: '#5f7a5f', need: ['everyday', 'workout'], price: 349, rating: 4.6, reviews: 74, family: 'ribbed-vest', blurb: 'The ribbed vest in a muted sage green.' }),
  mInner({ n: 10, name: 'Black Dot Boxers', fabric: 'Cotton Poplin', fit: 'Relaxed', color: 'Black', hex: '#24262a', need: ['sleep', 'lounge'], price: 399, rating: 4.6, reviews: 91, family: 'print-boxer', blurb: 'Woven cotton boxers with a tiny white dot, elastic waist.' }),
  mInner({ n: 11, name: 'Black Mango Boxers', fabric: 'Cotton Poplin', fit: 'Relaxed', color: 'Mango Print', hex: '#3a3020', need: ['sleep', 'lounge'], price: 399, rating: 4.5, reviews: 48, family: 'print-boxer', blurb: 'Black boxers scattered with small mustard mangoes.' }),
  mInner({ n: 12, name: 'Navy Pattern Boxers', fabric: 'Cotton Poplin', fit: 'Relaxed', color: 'Navy Print', hex: '#1e2a4a', need: ['sleep', 'lounge'], price: 399, rating: 4.6, reviews: 57, family: 'print-boxer', blurb: 'Navy boxers with a small playful print.' }),
  mInner({ n: 13, name: 'Navy Gym Vest', fabric: 'Cotton Stretch', fit: 'Athletic', color: 'Navy', hex: '#26365a', need: ['workout'], price: 399, rating: 4.7, reviews: 66, blurb: 'A deep-cut athletic vest with a little stretch.' }),
  mInner({ n: 14, name: 'Grey Boxer Trunks', fabric: 'Cotton Modal', fit: 'Regular', color: 'Grey', hex: '#7d7e80', need: ['everyday', 'workout'], price: 449, rating: 4.7, reviews: 122, bestseller: true, blurb: 'Longer-leg trunks in soft modal with a branded waistband.' }),
  mInner({ n: 15, name: 'Charcoal Print Boxers', fabric: 'Cotton Poplin', fit: 'Relaxed', color: 'Charcoal', hex: '#3d3634', need: ['sleep', 'lounge'], price: 399, compareAt: 499, rating: 4.5, reviews: 33, family: 'print-boxer', badge: 'Sale', blurb: 'Charcoal boxers with a small red print.' }),
  mLounge({ n: 16, name: 'Navy Cargo Pants', fabric: 'Cotton Twill', fit: 'Relaxed', color: 'Navy', hex: '#26334f', need: ['lounge'], price: 1299, rating: 4.6, reviews: 45, family: 'cargo-pant', blurb: 'Relaxed navy cargo pants with deep side pockets.' }),
  mLounge({ n: 17, name: 'Khaki Cargo Pants', fabric: 'Cotton Twill', fit: 'Relaxed', color: 'Khaki', hex: '#c9b48e', need: ['lounge'], price: 1299, rating: 4.7, reviews: 63, family: 'cargo-pant', isNew: true, badge: 'New', blurb: 'Khaki cargos for the airport and everything after.' }),
  mLounge({ n: 18, name: 'Brown Linen Lounge Pants', fabric: 'Linen Blend', fit: 'Straight', color: 'Brown', hex: '#4c3428', need: ['lounge'], price: 1099, rating: 4.6, reviews: 39, family: 'linen-pant', blurb: 'Breathable brown linen pants with a drawcord.' }),
  mLounge({ n: 19, name: 'Beige Linen Lounge Pants', fabric: 'Linen Blend', fit: 'Straight', color: 'Beige', hex: '#d8c6a0', need: ['lounge', 'sleep'], price: 1099, rating: 4.7, reviews: 58, family: 'linen-pant', blurb: 'Beige linen pants for slow mornings at home.' }),
  mLounge({ n: 20, name: 'Navy Linen Lounge Pants', fabric: 'Linen Blend', fit: 'Straight', color: 'Navy', hex: '#273b6b', need: ['lounge', 'sleep'], price: 1099, rating: 4.6, reviews: 41, family: 'linen-pant', blurb: 'The linen lounge pant in deep navy.' }),
  mShorts({ n: 21, name: 'Olive Cargo Shorts', fabric: 'Cotton Twill', fit: 'Regular', color: 'Olive', hex: '#5b5d3a', need: ['lounge'], price: 899, rating: 4.6, reviews: 49, family: 'cargo-short', blurb: 'Olive cargo shorts with flap pockets.' }),
  mShorts({ n: 22, name: 'Khaki Cargo Shorts', fabric: 'Cotton Twill', fit: 'Regular', color: 'Khaki', hex: '#c7b089', need: ['lounge'], price: 899, rating: 4.7, reviews: 64, family: 'cargo-short', blurb: 'Khaki cargo shorts that go with every tee.' }),
  mShorts({ n: 23, name: 'Black Cargo Shorts', fabric: 'Cotton Twill', fit: 'Regular', color: 'Black', hex: '#1e1f21', need: ['lounge'], price: 899, compareAt: 1099, rating: 4.6, reviews: 37, family: 'cargo-short', badge: 'Sale', blurb: 'Black cargo shorts with a clean finish.' }),
  mShorts({ n: 24, name: 'Mint Lounge Shorts', fabric: 'Cotton Terry', fit: 'Regular', color: 'Mint', hex: '#c9d6c8', need: ['lounge', 'sleep'], price: 649, rating: 4.5, reviews: 28, family: 'lounge-short', blurb: 'Soft mint terry shorts for home and weekends.' }),
  mShorts({ n: 25, name: 'Navy Lounge Shorts', fabric: 'Cotton Terry', fit: 'Regular', color: 'Navy', hex: '#24365e', need: ['lounge', 'sleep'], price: 649, rating: 4.6, reviews: 44, family: 'lounge-short', blurb: 'The lounge short in navy.' }),

  // Women
  legging({ n: 1, name: 'Wine Capri Leggings', fabric: 'Cotton Lycra', fit: 'High Rise', color: 'Wine', hex: '#4a1d22', need: ['workout', 'everyday'], price: 649, rating: 4.7, reviews: 96, isNew: true, badge: 'New', blurb: 'Three-quarter leggings in a deep wine, with a high waist that stays put.' }),
  cami({ n: 2, name: 'White Slip Camisole', fabric: 'Cotton Modal', fit: 'Regular', color: 'White', hex: '#f3f2f0', need: ['everyday', 'sleep'], price: 599, rating: 4.6, reviews: 58, family: 'slip', blurb: 'A long white slip with adjustable straps and side slits.' }),
  cami({ n: 3, name: 'Black Slip Camisole', fabric: 'Cotton Modal', fit: 'Regular', color: 'Black', hex: '#1c1c1d', need: ['everyday', 'sleep'], price: 599, rating: 4.7, reviews: 71, family: 'slip', blurb: 'The long slip in black, smooth under dresses.' }),
  bra({ n: 4, name: 'Tube Bra Pack of 2', fabric: 'Cotton Spandex', fit: 'Bandeau', color: 'Pink & Blue', hex: '#e8456a', need: ['everyday'], price: 549, rating: 4.5, reviews: 63, sizes: WOMEN, includes: 'Two tube bras', blurb: 'Two seamless tube bras, hot pink and royal blue.' }),
  cami({ n: 5, name: 'Grey Cotton Camisole', fabric: 'Cotton Rib', fit: 'Regular', color: 'Grey', hex: '#a6a6a8', need: ['everyday', 'sleep'], price: 399, rating: 4.6, reviews: 84, blurb: 'A ribbed grey camisole with thin straps.' }),
  legging({ n: 6, name: 'Navy Ankle Leggings', fabric: 'Cotton Lycra', fit: 'High Rise', color: 'Navy', hex: '#1d2b6b', need: ['workout', 'everyday'], price: 599, rating: 4.7, reviews: 133, family: 'ankle-legging', blurb: 'Ankle-length leggings in deep navy with four-way stretch.' }),
  legging({ n: 7, name: 'Olive Ankle Leggings', fabric: 'Cotton Lycra', fit: 'High Rise', color: 'Olive', hex: '#4a5a23', need: ['workout', 'everyday'], price: 599, rating: 4.8, reviews: 158, family: 'ankle-legging', bestseller: true, badge: 'Bestseller', blurb: 'The ankle legging in olive, shown from the back and the front.' }),
  legging({ n: 8, name: 'Royal Blue Ankle Leggings', fabric: 'Cotton Lycra', fit: 'High Rise', color: 'Royal Blue', hex: '#1f46b8', need: ['workout'], price: 599, rating: 4.6, reviews: 67, family: 'ankle-legging', blurb: 'Bright royal blue leggings for the studio.' }),
  bra({ n: 9, name: 'Grey Lace Trim Bralette', fabric: 'Cotton Spandex', fit: 'Wire-free', color: 'Grey', hex: '#8f8f93', need: ['everyday', 'sleep'], price: 699, rating: 4.6, reviews: 52, blurb: 'A soft wire-free bralette with a lace edge at the neckline.' }),
  wLounge({ n: 10, name: 'Grey Cycling Undershorts', fabric: 'Cotton Lycra', fit: 'Second Skin', color: 'Grey', hex: '#b9b9bb', need: ['everyday', 'workout'], price: 449, rating: 4.6, reviews: 77, family: 'undershort', blurb: 'Smooth thigh-length undershorts that stop chafing under dresses.' }),
  panty({ n: 11, name: 'Boyshorts Pack of 3', fabric: 'Cotton Spandex', fit: 'Boyshort', color: 'Pink, Purple, Wine', hex: '#c03266', need: ['everyday'], price: 699, rating: 4.7, reviews: 109, includes: 'Three boyshorts', blurb: 'Three full-coverage boyshorts in pink, purple and wine.' }),
  panty({ n: 12, name: 'Navy Everyday Brief', fabric: 'Cotton Spandex', fit: 'Mid Rise', color: 'Navy', hex: '#1f2847', need: ['everyday'], price: 249, rating: 4.6, reviews: 186, bestseller: true, blurb: 'The everyday brief: soft, breathable, no digging at the waist.' }),
  panty({ n: 13, name: 'Navy Period Brief', fabric: 'Cotton, 4-layer gusset', fit: 'High Rise', color: 'Navy', hex: '#1d2340', need: ['period'], price: 449, rating: 4.7, reviews: 142, family: 'period-brief', blurb: 'Leak-proof period brief with a four-layer gusset and a soft brushed waist.' }),
  panty({ n: 14, name: 'Purple Period Brief', fabric: 'Cotton, 4-layer gusset', fit: 'High Rise', color: 'Purple', hex: '#5a2b8c', need: ['period'], price: 449, rating: 4.7, reviews: 88, family: 'period-brief', blurb: 'The leak-proof period brief in purple.' }),
  panty({ n: 15, name: 'Maroon Period Brief', fabric: 'Cotton, 4-layer gusset', fit: 'High Rise', color: 'Maroon', hex: '#7d1f2b', need: ['period'], price: 449, rating: 4.6, reviews: 64, family: 'period-brief', blurb: 'The leak-proof period brief in maroon.' }),
  bra({ n: 16, name: 'Black Front Open Bra', fabric: 'Cotton Spandex', fit: 'Front Zip', color: 'Black', hex: '#151517', need: ['everyday', 'sleep'], price: 749, rating: 4.7, reviews: 71, blurb: 'A front-opening bra with a hook panel. Easy on, easy off.' }),
  legging({ n: 17, name: 'Black Shaping Leggings', fabric: 'Cotton Lycra', fit: 'High Rise', color: 'Black', hex: '#141416', need: ['workout', 'everyday'], price: 699, rating: 4.8, reviews: 174, bestseller: true, badge: 'Bestseller', blurb: 'Mid-waist tummy control, ankle length, a gusset that never rips.' }),
  legging({ n: 18, name: 'Red Ankle Leggings', fabric: 'Cotton Lycra', fit: 'High Rise', color: 'Red', hex: '#a3242d', need: ['everyday'], price: 599, rating: 4.6, reviews: 49, family: 'ankle-legging', blurb: 'The ankle legging in a bold red.' }),
  wLounge({ n: 20, name: 'Blue Print Nightshirt', fabric: 'Cotton Jersey', fit: 'Oversized', color: 'Blue Print', hex: '#5c86c9', need: ['sleep', 'lounge'], price: 799, rating: 4.6, reviews: 56, isNew: true, badge: 'New', blurb: 'An oversized cotton nightshirt with a soft blue print.' }),
  panty({ n: 21, name: 'Navy Boyshorts Pack of 2', fabric: 'Cotton Spandex', fit: 'Boyshort', color: 'Navy', hex: '#1e2648', need: ['everyday', 'period'], price: 499, rating: 4.6, reviews: 61, includes: 'Two boyshorts', blurb: 'Two navy boyshorts with a wide, soft waistband.' }),
  panty({ n: 22, name: 'Wine Period Brief', fabric: 'Cotton, 4-layer gusset', fit: 'Full Brief', color: 'Wine', hex: '#7a1e2a', need: ['period'], price: 449, compareAt: 549, rating: 4.7, reviews: 93, family: 'period-brief', badge: 'Sale', blurb: 'A full-coverage period brief in wine.' }),
  bra({ n: 23, name: 'Grey Plunge Bra', fabric: 'Cotton Spandex', fit: 'Plunge', color: 'Grey', hex: '#8a8a90', need: ['everyday'], price: 799, rating: 4.6, reviews: 47, blurb: 'A wire-free plunge bra with a deep V for low necklines.' }),
  bra({ n: 24, name: 'Royal Blue Sports Bra', fabric: 'Dri-fit Spandex', fit: 'Medium Support', color: 'Royal Blue', hex: '#2443a8', need: ['workout'], price: 699, rating: 4.7, reviews: 82, family: 'sports-bra', blurb: 'Medium-support sports bra with removable pads.' }),
  wLounge({ n: 25, name: 'White Undershorts Pack of 3', fabric: 'Cotton Lycra', fit: 'Second Skin', color: 'White', hex: '#f0f0f0', need: ['everyday'], price: 799, rating: 4.6, reviews: 58, includes: 'Three undershorts', blurb: 'Three white undershorts for under skirts and dresses.' }),
  bra({ n: 26, name: 'Nude Sleep Bra', fabric: 'Cotton Modal', fit: 'Wire-free', color: 'Nude', hex: '#e9cdb6', need: ['sleep', 'lounge'], price: 599, rating: 4.7, reviews: 101, bestseller: true, blurb: 'The softest bra we make, for sleep and slow days.' }),
  bra({ n: 27, name: 'Wine Sports Bra', fabric: 'Dri-fit Spandex', fit: 'Medium Support', color: 'Wine', hex: '#7c3c3f', need: ['workout'], price: 699, rating: 4.6, reviews: 44, family: 'sports-bra', blurb: 'The sports bra in wine.' }),
  panty({ n: 28, name: 'Black Yoga Panty', fabric: 'Dri-fit Spandex', fit: 'Mid Rise', color: 'Black', hex: '#18181a', need: ['workout'], price: 349, rating: 4.6, reviews: 52, blurb: 'A seamless sports panty that dries fast and never shows.' }),
  bra({ n: 29, name: 'Grey Sports Bra', fabric: 'Dri-fit Spandex', fit: 'Medium Support', color: 'Grey', hex: '#96969b', need: ['workout', 'everyday'], price: 649, rating: 4.6, reviews: 69, family: 'sports-bra', blurb: 'The sports bra in a soft heather grey.' }),
  bra({ n: 30, name: 'Royal Blue Tube Bra', fabric: 'Cotton Spandex', fit: 'Bandeau', color: 'Royal Blue', hex: '#2341b0', need: ['everyday'], price: 299, rating: 4.5, reviews: 47, sizes: WOMEN, blurb: 'A seamless bandeau for off-shoulder tops.' }),
  cami({ n: 31, name: 'Grey Tube Top', fabric: 'Cotton Rib', fit: 'Bodycon', color: 'Grey', hex: '#7d7e82', need: ['everyday', 'lounge'], price: 449, rating: 4.5, reviews: 31, blurb: 'A long ribbed tube top to layer or wear alone.' }),
  wLounge({ n: 32, name: 'Grey Undershorts', fabric: 'Cotton Lycra', fit: 'Second Skin', color: 'Grey', hex: '#bfc0c4', need: ['everyday', 'lounge'], price: 399, compareAt: 499, rating: 4.6, reviews: 66, family: 'undershort', badge: 'Sale', blurb: 'Grey undershorts with a flat, invisible waistband.' }),
  panty({ n: 33, name: 'Everyday Brief Pack of 3', fabric: 'Cotton Spandex', fit: 'Mid Rise', color: 'Navy, Pink, Purple', hex: '#d0296e', need: ['everyday'], price: 649, rating: 4.7, reviews: 121, includes: 'Three briefs', isNew: true, badge: 'New', blurb: 'Three everyday briefs in navy, pink and purple.' }),
]

const VIEWS = { 'w-7': 2 }
const slugify = (s) => s.toLowerCase().replace(/[’']/g, '').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const id = (g, n) => `${g}${String(n).padStart(2, '0')}`

export const products = raw.map(({ n, g, ...p }) => ({
  id: id(g, n),
  slug: slugify(p.name),
  images: Array.from({ length: VIEWS[`${g}-${n}`] ?? 2 }, (_, i) => `${id(g, n)}-${i + 1}`),
  cut: p.fit,
  model: p.wear[0] === 'women' ? (p.sizes === BRA ? '34' : 'S') : 'M',
  ...p,
}))

export const getProduct = (pid) => products.find((p) => p.id === pid)
export const getProductBySlug = (slug) => products.find((p) => p.slug === slug)
