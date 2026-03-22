/** Format trip budget for cards (defaults to USD; falls back to plain number/string). */
export function formatTripBudget(budget) {
  if (budget == null || budget === '') return '—'
  const n = Number(budget)
  if (!Number.isFinite(n)) {
    return String(budget)
  }
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(n)
  } catch {
    return `$${Math.round(n).toLocaleString()}`
  }
}
