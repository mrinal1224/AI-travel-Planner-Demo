import { Link } from 'react-router-dom'
import { PageHeader } from '../components/common/PageHeader'
import { PATHS } from '../routes/paths'

export function SignupPage() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50">
      <PageHeader
        title="Sign up"
        description="Firebase Auth will be connected in Feature 2. For now, this page is a layout placeholder."
      />
      <p className="text-sm text-slate-600">
        Form and validation arrive with the authentication feature.
      </p>
      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link to={PATHS.login} className="font-semibold text-brand-700 hover:text-brand-800">
          Log in
        </Link>
      </p>
    </div>
  )
}
