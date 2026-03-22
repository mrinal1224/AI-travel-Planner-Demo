import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthDivider } from '../components/auth/AuthDivider'
import { AuthFormCard } from '../components/auth/AuthFormCard'
import { AuthFormField } from '../components/auth/AuthFormField'
import { AuthSubmitButton } from '../components/auth/AuthSubmitButton'
import { GoogleSignInButton } from '../components/auth/GoogleSignInButton'
import { PageHeader } from '../components/common/PageHeader'
import { useAuth } from '../hooks/useAuth'
import { PATHS } from '../routes/paths'
import { validateEmail, validatePassword } from '../utils/validation'

export function LoginPage() {
  const { signIn, signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const busy = submitting || googleLoading

  async function handleGoogleSignIn() {
    setFormError('')
    setGoogleLoading(true)
    const { error } = await signInWithGoogle()
    setGoogleLoading(false)
    if (error) {
      setFormError(error)
      return
    }
    const from = location.state?.from
    const target = from ? `${from.pathname}${from.search || ''}` : PATHS.home
    navigate(target, { replace: true })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setFormError('')

    const nextErrors = {}
    const eErr = validateEmail(email)
    const pErr = validatePassword(password)
    if (eErr) nextErrors.email = eErr
    if (pErr) nextErrors.password = pErr
    setFieldErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    const { error } = await signIn(email.trim(), password)
    setSubmitting(false)

    if (error) {
      setFormError(error)
      return
    }

    const from = location.state?.from
    const target = from ? `${from.pathname}${from.search || ''}` : PATHS.home
    navigate(target, { replace: true })
  }

  return (
    <AuthFormCard>
      <PageHeader title="Log in" description="Welcome back. Sign in to plan your next trip." />
      <div className="mt-6 space-y-4">
        {formError ? (
          <div
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
            role="alert"
          >
            {formError}
          </div>
        ) : null}
        <GoogleSignInButton
          onClick={handleGoogleSignIn}
          loading={googleLoading}
          disabled={busy}
        />
        <AuthDivider />
      </div>
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <AuthFormField
          id="login-email"
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          error={fieldErrors.email}
          disabled={busy}
          required
        />
        <AuthFormField
          id="login-password"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          error={fieldErrors.password}
          disabled={busy}
          required
        />
        <AuthSubmitButton loading={submitting} disabled={busy}>
          Log in
        </AuthSubmitButton>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        New here?{' '}
        <Link to={PATHS.signup} className="font-semibold text-brand-700 hover:text-brand-800">
          Create an account
        </Link>
      </p>
    </AuthFormCard>
  )
}
