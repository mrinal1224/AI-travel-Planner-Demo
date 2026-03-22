import { useEffect, useState } from 'react'
import {
  BUDGET_STYLE_OPTIONS,
  PACE_OPTIONS,
  TRANSPORT_OPTIONS,
  TRIP_TYPE_OPTIONS,
} from '../constants/travelPreferences'
import { FirebaseUnavailable } from '../components/common/FirebaseUnavailable'
import { FormInput } from '../components/common/FormInput'
import { FormSelect } from '../components/common/FormSelect'
import { FormTextarea } from '../components/common/FormTextarea'
import { InlineAlert } from '../components/common/InlineAlert'
import { PageContainer } from '../components/common/PageContainer'
import { PageHeader } from '../components/common/PageHeader'
import { ProfileAvatar } from '../components/profile/ProfileAvatar'
import { ProfilePageSkeleton } from '../components/profile/ProfilePageSkeleton'
import { useAuth } from '../hooks/useAuth'
import { isFirestoreAvailable } from '../services/firebase/config'
import {
  defaultPreferences,
  loadProfileDataForForm,
  saveUserProfile,
} from '../services/firestore/userProfile'

export function ProfilePage() {
  const { user } = useAuth()
  const [name, setName] = useState('')
  const [preferences, setPreferences] = useState(() => defaultPreferences())
  const [emailDisplay, setEmailDisplay] = useState('')

  const [loadState, setLoadState] = useState('loading')
  const [loadError, setLoadError] = useState(null)
  const [reloadToken, setReloadToken] = useState(0)

  const [nameError, setNameError] = useState(null)
  const [saveError, setSaveError] = useState(null)
  const [saving, setSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (!isFirestoreAvailable() || !user?.uid) {
      return undefined
    }
    let cancelled = false
    ;(async () => {
      await Promise.resolve()
      if (cancelled) return
      setLoadState('loading')
      setLoadError(null)
      const res = await loadProfileDataForForm(user)
      if (cancelled) return
      if (!res.ok) {
        setLoadError(res.error)
        setLoadState('error')
        return
      }
      setName(res.name)
      setPreferences(res.preferences)
      setEmailDisplay(res.emailDisplay)
      setLoadState('ready')
    })()
    return () => {
      cancelled = true
    }
  }, [user, reloadToken])

  useEffect(() => {
    if (!showSuccess) return undefined
    const t = window.setTimeout(() => setShowSuccess(false), 4000)
    return () => window.clearTimeout(t)
  }, [showSuccess])

  async function handleSubmit(e) {
    e.preventDefault()
    setSaveError(null)
    setNameError(null)

    const trimmed = name.trim()
    if (!trimmed) {
      setNameError('Please enter your name.')
      return
    }

    if (!user?.uid) return

    setSaving(true)
    const { error } = await saveUserProfile(user.uid, user, {
      name: trimmed,
      preferences,
    })
    setSaving(false)

    if (error) {
      setSaveError(error)
      return
    }

    setShowSuccess(true)
  }

  function updatePreference(key, value) {
    setPreferences((p) => ({ ...p, [key]: value }))
  }

  if (!isFirestoreAvailable()) {
    return (
      <PageContainer>
        <PageHeader
          title="Profile"
          description="Manage your account and default travel preferences for new trips."
        />
        <FirebaseUnavailable />
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <PageHeader
        title="Profile"
        description="Your name and preferences are saved to your account and can inform trip defaults later."
      />

      {loadState === 'loading' ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <ProfilePageSkeleton />
          <p className="sr-only">Loading profile</p>
        </div>
      ) : null}

      {loadState === 'error' ? (
        <div className="space-y-4">
          <InlineAlert variant="error" title="Could not load profile">
            {loadError}
          </InlineAlert>
          <button
            type="button"
            onClick={() => setReloadToken((t) => t + 1)}
            className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
          >
            Try again
          </button>
        </div>
      ) : null}

      {loadState === 'ready' ? (
        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          {showSuccess ? (
            <InlineAlert variant="success" title="Saved">
              Your profile and preferences were updated.
            </InlineAlert>
          ) : null}

          {saveError ? (
            <InlineAlert variant="error" title="Could not save">
              {saveError}
            </InlineAlert>
          ) : null}

          <section className="flex flex-col gap-6 border-b border-slate-100 pb-8 sm:flex-row sm:items-start">
            <ProfileAvatar user={user} name={name} />
            <div className="min-w-0 flex-1 space-y-5">
              <h2 className="text-base font-semibold text-slate-900">Account</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <FormInput
                  id="profile-name"
                  name="name"
                  label="Name"
                  autoComplete="name"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                  error={nameError}
                  disabled={saving}
                  required
                />
                <FormInput
                  id="profile-email"
                  name="email"
                  label="Email"
                  type="email"
                  value={emailDisplay}
                  onChange={() => {}}
                  readOnly
                  disabled
                  hint="Email comes from your sign-in method and cannot be changed here."
                />
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Travel preferences</h2>
              <p className="mt-1 text-sm text-slate-600">
                Defaults for planning—each trip can still override these later.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <FormSelect
                id="pref-budget"
                name="budgetStyle"
                label="Budget style"
                value={preferences.budgetStyle}
                onChange={(ev) => updatePreference('budgetStyle', ev.target.value)}
                options={BUDGET_STYLE_OPTIONS}
                disabled={saving}
              />
              <FormSelect
                id="pref-trip-type"
                name="tripType"
                label="Trip type"
                value={preferences.tripType}
                onChange={(ev) => updatePreference('tripType', ev.target.value)}
                options={TRIP_TYPE_OPTIONS}
                disabled={saving}
              />
              <FormSelect
                id="pref-pace"
                name="pace"
                label="Travel pace"
                value={preferences.pace}
                onChange={(ev) => updatePreference('pace', ev.target.value)}
                options={PACE_OPTIONS}
                disabled={saving}
              />
              <FormSelect
                id="pref-transport"
                name="transportPreference"
                label="Transport preference"
                value={preferences.transportPreference}
                onChange={(ev) => updatePreference('transportPreference', ev.target.value)}
                options={TRANSPORT_OPTIONS}
                disabled={saving}
                hint="Optional—how you usually like to get around on a trip."
              />
            </div>

            <FormTextarea
              id="pref-interests"
              name="interests"
              label="Interests"
              placeholder="e.g. museums, hiking, coffee shops, local food…"
              value={preferences.interests}
              onChange={(ev) => updatePreference('interests', ev.target.value)}
              disabled={saving}
              rows={4}
              hint="Free text; comma-separated ideas work well."
            />
          </section>

          <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500">Changes apply to your Firestore user document only.</p>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                    aria-hidden
                  />
                  Saving…
                </span>
              ) : (
                'Save changes'
              )}
            </button>
          </div>
        </form>
      ) : null}
    </PageContainer>
  )
}
