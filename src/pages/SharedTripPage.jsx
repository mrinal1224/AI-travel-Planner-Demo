import { useParams } from 'react-router-dom'
import { PageContainer } from '../components/common/PageContainer'
import { PageHeader } from '../components/common/PageHeader'

export function SharedTripPage() {
  const { shareId } = useParams()

  return (
    <PageContainer>
      <PageHeader
        title="Shared trip"
        description="Public read-only view. Loaded by shareId once security rules and queries exist."
      />
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm text-slate-600">
          Share ID:{' '}
          <code className="rounded bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-800">
            {shareId}
          </code>
        </p>
      </div>
    </PageContainer>
  )
}
