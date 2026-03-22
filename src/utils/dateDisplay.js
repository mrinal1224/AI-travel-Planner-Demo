/** @param {unknown} value Firestore Timestamp, Date, ISO string, or null */
export function coerceDate(value) {
  if (value == null) return null
  if (typeof value.toDate === 'function') {
    const d = value.toDate()
    return d instanceof Date && !Number.isNaN(d.getTime()) ? d : null
  }
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value
  }
  if (typeof value === 'string' || typeof value === 'number') {
    const d = new Date(value)
    return Number.isNaN(d.getTime()) ? null : d
  }
  return null
}

/** @param {unknown} start @param {unknown} end */
export function formatTripDateRange(start, end) {
  const s = coerceDate(start)
  const e = coerceDate(end)
  const opts = { month: 'short', day: 'numeric', year: 'numeric' }
  if (s && e) {
    return `${s.toLocaleDateString(undefined, opts)} – ${e.toLocaleDateString(undefined, opts)}`
  }
  if (s) return `From ${s.toLocaleDateString(undefined, opts)}`
  if (e) return `Until ${e.toLocaleDateString(undefined, opts)}`
  return 'Dates TBD'
}
