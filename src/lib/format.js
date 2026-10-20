import { site } from '../config/site'

const money = new Intl.NumberFormat(site.locale, {
  style: 'currency',
  currency: site.currency,
  maximumFractionDigits: 0,
})

export const formatPrice = (value) => money.format(value)

/** Whole-number discount percentage, or 0 when the product isn't on sale. */
export const discountOf = (p) => (p.compareAt ? Math.round((1 - p.price / p.compareAt) * 100) : 0)
