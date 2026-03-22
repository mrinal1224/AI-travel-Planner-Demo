import { Link } from 'react-router-dom'
import { EmptyTripsState } from '../components/dashboard/EmptyTripsState'
import { TripCard } from '../components/dashboard/TripCard'
import { TripCardSkeleton } from '../components/dashboard/TripCardSkeleton'
import { InlineAlert } from '../components/common/InlineAlert'
import { PageContainer } from '../components/common/PageContainer'
import { PageHeader } from '../components/common/PageHeader'
import { useAuth } from '../hooks/useAuth'
import { useUserTrips } from '../hooks/useUserTrips'
import { PATHS } from '../routes/paths'

export function DashboardPage() {
  const { user } = useAuth()
  const { trips, loading, error, refetch } = useUserTrips(user?.uid)

  return (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        description="Your saved trips. Open a card for details, itinerary, and chat."
        action={
          <Link
            to={PATHS.tripNew}
            className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-600/25 hover:bg-brand-700"
          >
            Create new trip
          </Link>
        }
      />

      {error ? (
        <div className="mb-8 space-y-4">
          <InlineAlert variant="error" title="Could not load trips">
            {error}
          </InlineAlert>
          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            Try again
          </button>
        </div>
      ) : null}

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <TripCardSkeleton key={i} />
          ))}
        </div>
      ) : null}

      {!loading && !error && trips.length === 0 ? <EmptyTripsState /> : null}

      {!loading && !error && trips.length > 0 ? (
        <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <li key={trip.id}>
              <TripCard trip={trip} />
            </li>
          ))}
        </ul>
      ) : null}
    </PageContainer>
  )
}
