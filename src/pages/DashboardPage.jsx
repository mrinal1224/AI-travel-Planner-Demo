import { Link } from 'react-router-dom'
import { PageContainer } from '../components/common/PageContainer'
import { PageHeader } from '../components/common/PageHeader'
import { PATHS } from '../routes/paths'

export function DashboardPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        description="Your trips will appear here once Firestore integration is in place."
        action={
          <Link
            to={PATHS.tripNew}
            className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-600/25 hover:bg-brand-700"
          >
            Create trip
          </Link>
        }
      />
      <div className="rounded-xl border border-dashed border-slate-300 bg-white/60 p-10 text-center">
        <p className="text-sm font-medium text-slate-700">No trips yet</p>
        <p className="mt-2 text-sm text-slate-500">
          Empty state UI will be finalized when listing trips from Firebase.
        </p>
      </div>
    </PageContainer>
  )
}
