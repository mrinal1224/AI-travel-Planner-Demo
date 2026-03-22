import { PageContainer } from '../components/common/PageContainer'
import { PageHeader } from '../components/common/PageHeader'

export function ProfilePage() {
  return (
    <PageContainer>
      <PageHeader
        title="Profile"
        description="Travel preferences and profile fields will be editable here after Firebase Auth and Firestore profile sync."
      />
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm text-slate-600">Profile form placeholder.</p>
      </div>
    </PageContainer>
  )
}
