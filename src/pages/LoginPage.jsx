import { Link } from 'react-router-dom'
import { PageHeader } from '../components/common/PageHeader'
import { PATHS } from '../routes/paths'

export function LoginPage() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50">
      <PageHeader
        title="Log in"
        description="Authentication will be wired in the next feature. This is a placeholder screen."
      />
      <p className="text-sm text-slate-600">
        No form yet — use the navigation to explore the app shell.
      </p>
      <p className="mt-6 text-center text-sm text-slate-500">
        New here?{' '}
        <Link to={PATHS.signup} className="font-semibold text-brand-700 hover:text-brand-800">
          Create an account
        </Link>
      </p>
    </div>
  )
}
