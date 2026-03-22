import { Link } from 'react-router-dom'
import { PATHS } from '../../routes/paths'

export function EmptyTripsState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-gradient-to-b from-white to-slate-50/80 px-6 py-14 text-center sm:py-16">
      <div className="rounded-full bg-brand-50 p-4 text-brand-600">
        <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
          />
        </svg>
      </div>
      <h2 className="mt-6 text-lg font-semibold text-slate-900">No trips yet</h2>
      <p className="mt-2 max-w-sm text-sm text-slate-600">
        Create your first trip to start planning destinations, dates, and an AI-assisted itinerary.
      </p>
      <Link
        to={PATHS.tripNew}
        className="mt-8 inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-600/25 hover:bg-brand-700"
      >
        Create your first trip
      </Link>
    </div>
  )
}
