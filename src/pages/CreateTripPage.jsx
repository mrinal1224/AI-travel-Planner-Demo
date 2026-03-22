import { PageContainer } from '../components/common/PageContainer'
import { PageHeader } from '../components/common/PageHeader'

export function CreateTripPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Create trip"
        description="Trip form fields, validation, and Firestore save will ship in the Create Trip feature."
      />
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm text-slate-600">Form placeholder — no submission logic in Feature 1.</p>
      </div>
    </PageContainer>
  )
}
