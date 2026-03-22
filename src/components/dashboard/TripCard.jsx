import { Link } from 'react-router-dom'
import { formatTripDateRange } from '../../utils/dateDisplay'
import { formatTripBudget } from '../../utils/moneyDisplay'
import { PATHS } from '../../routes/paths'

/**
 * @param {{ trip: { id: string; title: string; destination: string; startDate?: unknown; endDate?: unknown; budget?: unknown } }} props
 */
export function TripCard({ trip }) {
  const to = PATHS.tripDetail(trip.id)
  const dateLabel = formatTripDateRange(trip.startDate, trip.endDate)
  const budgetLabel = formatTripBudget(trip.budget)
  const dest = trip.destination.trim() || 'Destination TBD'

  return (
    <Link
      to={to}
      className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-brand-200 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="line-clamp-2 text-base font-semibold text-slate-900 group-hover:text-brand-800">
          {trip.title}
        </h2>
        <span
          className="shrink-0 rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 group-hover:bg-brand-50 group-hover:text-brand-800"
          aria-hidden
        >
          →
        </span>
      </div>
      <p className="mt-2 line-clamp-2 text-sm text-slate-600">{dest}</p>
      <dl className="mt-4 grid gap-2 text-sm">
        <div className="flex justify-between gap-2 text-slate-500">
          <dt className="shrink-0 font-medium text-slate-500">Dates</dt>
          <dd className="min-w-0 text-right text-slate-700">{dateLabel}</dd>
        </div>
        <div className="flex justify-between gap-2 text-slate-500">
          <dt className="shrink-0 font-medium text-slate-500">Budget</dt>
          <dd className="min-w-0 text-right font-medium text-slate-800">{budgetLabel}</dd>
        </div>
      </dl>
    </Link>
  )
}
