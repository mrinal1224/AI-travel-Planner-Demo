import { useParams } from 'react-router-dom'
import { PageContainer } from '../components/common/PageContainer'
import { PageHeader } from '../components/common/PageHeader'

export function TripDetailsPage() {
  const { tripId } = useParams()

  return (
    <PageContainer>
      <PageHeader
        title="Trip details"
        description="Overview, itinerary, budget, and chat will live on this page in later features."
      />
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm text-slate-600">
          Trip ID from route:{' '}
          <code className="rounded bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-800">
            {tripId}
          </code>
        </p>
      </div>
    </PageContainer>
  )
}
