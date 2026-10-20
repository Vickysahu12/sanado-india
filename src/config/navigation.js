// Navigation content: the mega-menu panels (desktop), menu tabs (phone) and quick chips.

export const megaMenus = [
  {
    id: 'women',
    label: 'Women',
    to: '/shop?occasion=women',
    columns: [
      {
        title: 'For her',
        items: [
          { label: 'Bras', desc: 'Sports, sleep, plunge, tube', image: 'w26-1', to: '/shop/bras' },
          { label: 'Panties', desc: 'Everyday, period, boyshorts', image: 'w12-1', to: '/shop/panties' },
          { label: 'Leggings', desc: 'Ankle and capri', image: 'w07-1', to: '/shop/leggings' },
          { label: 'Camisoles', desc: 'Slips and tube tops', image: 'w05-1', to: '/shop/camisoles' },
          { label: 'Nightwear', desc: 'And undershorts', image: 'w20-1', to: '/shop/women-lounge' },
        ],
      },
    ],
    feature: { image: 'w17-1', title: 'The Black Shaping Leggings', to: '/product/black-shaping-leggings' },
  },
  {
    id: 'men',
    label: 'Men',
    to: '/shop?occasion=men',
    columns: [
      {
        title: 'For him',
        items: [
          { label: 'Vests', desc: 'Ribbed and gym', image: 'm08-1', to: '/shop/men-innerwear' },
          { label: 'Boxers and trunks', desc: 'Printed and modal', image: 'm14-1', to: '/shop/men-innerwear' },
          { label: 'Loungewear', desc: 'Joggers, linen, cargos', image: 'm19-1', to: '/shop/men-lounge' },
          { label: 'Shorts', desc: 'Cargo, swim, lounge', image: 'm22-1', to: '/shop/men-shorts' },
          { label: 'Socks', desc: 'Cushioned crew', image: 'm07-1', to: '/product/navy-cotton-socks' },
        ],
      },
    ],
    feature: { image: 'm17-1', title: 'The Khaki Cargo Pants', to: '/product/khaki-cargo-pants' },
  },
]

export const navLinks = [
  { label: 'New in', to: '/shop?sort=new', badge: 'New' },
  { label: 'Find your comfort', to: '/#comfort' },
  { label: 'Sale', to: '/shop?sale=1', accent: true, badge: 'Hot' },
]

export const genderPills = [
  { label: 'Women', to: '/shop?occasion=women' },
  { label: 'Men', to: '/shop?occasion=men' },
]

export const quickChips = [
  { label: 'Women', to: '/shop?occasion=women' },
  { label: 'Men', to: '/shop?occasion=men' },
  { label: 'Bras', to: '/shop/bras' },
  { label: 'Panties', to: '/shop/panties' },
  { label: 'Leggings', to: '/shop/leggings' },
  { label: 'Vests and boxers', to: '/shop/men-innerwear' },
  { label: 'Loungewear', to: '/shop/men-lounge' },
  { label: 'Sale', to: '/shop?sale=1', accent: true },
]
