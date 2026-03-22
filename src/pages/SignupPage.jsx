import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthDivider } from '../components/auth/AuthDivider'
import { AuthFormCard } from '../components/auth/AuthFormCard'
import { AuthFormField } from '../components/auth/AuthFormField'
import { AuthSubmitButton } from '../components/auth/AuthSubmitButton'
import { GoogleSignInButton } from '../components/auth/GoogleSignInButton'
import { PageHeader } from '../components/common/PageHeader'
import { useAuth } from '../hooks/useAuth'
import { PATHS } from '../routes/paths'
import { validateEmail, validatePassword, validatePasswordConfirm } from '../utils/validation'

export function SignupPage() {
  const { signUp, signInWithGoogle } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
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
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setFormError('')

    const nextErrors = {}
    const eErr = validateEmail(email)
    const pErr = validatePassword(password)
    const cErr = validatePasswordConfirm(password, confirmPassword)
    if (eErr) nextErrors.email = eErr
    if (pErr) nextErrors.password = pErr
    if (cErr) nextErrors.confirmPassword = cErr
    setFieldErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    const { error } = await signUp(email.trim(), password)
    setSubmitting(false)

    if (error) {
      setFormError(error)
    }
  }

  return (
    <AuthFormCard>
      <PageHeader
        title="Sign up"
        description="Create an account to save trips and itineraries to the cloud."
      />
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
          id="signup-email"
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
          id="signup-password"
          label="Password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          error={fieldErrors.password}
          disabled={busy}
          required
        />
        <AuthFormField
          id="signup-confirm"
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(ev) => setConfirmPassword(ev.target.value)}
          error={fieldErrors.confirmPassword}
          disabled={busy}
          required
        />
        <AuthSubmitButton loading={submitting} disabled={busy}>
          Create account
        </AuthSubmitButton>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link to={PATHS.login} className="font-semibold text-brand-700 hover:text-brand-800">
          Log in
        </Link>
      </p>
    </AuthFormCard>
  )
}
