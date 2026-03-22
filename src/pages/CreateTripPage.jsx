import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthSubmitButton } from '../components/auth/AuthSubmitButton'
import { FirebaseUnavailable } from '../components/common/FirebaseUnavailable'
import { FormInput } from '../components/common/FormInput'
import { FormSelect } from '../components/common/FormSelect'
import { FormTextarea } from '../components/common/FormTextarea'
import { InlineAlert } from '../components/common/InlineAlert'
import { PageContainer } from '../components/common/PageContainer'
import { PageHeader } from '../components/common/PageHeader'
import { PACE_OPTIONS } from '../constants/travelPreferences'
import { useAuth } from '../hooks/useAuth'
import { PATHS } from '../routes/paths'
import { isFirestoreAvailable } from '../services/firebase/config'
import { createTrip } from '../services/firestore/trips'
import { validateCreateTripForm } from '../utils/createTripValidation'

const initialForm = () => ({
  title: '',
  destination: '',
  startDate: '',
  endDate: '',
  travelers: '1',
  budget: '',
  interests: '',
  pace: '',
  notes: '',
})

export function CreateTripPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [fieldErrors, setFieldErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function updateField(name, value) {
    setForm((f) => ({ ...f, [name]: value }))
    setFieldErrors((e) => {
      if (!e[name]) return e
      const next = { ...e }
      delete next[name]
      return next
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setFormError('')

    const { fieldErrors: next, isValid } = validateCreateTripForm(form)
    setFieldErrors(next)
    if (!isValid) return

    if (!user?.uid) {
      setFormError('You must be signed in to create a trip.')
      return
    }

    setSubmitting(true)
    const { tripId, error } = await createTrip(user.uid, {
      title: form.title,
      destination: form.destination,
      startDate: form.startDate,
      endDate: form.endDate,
      travelers: Number.parseInt(form.travelers, 10),
      budget: Number(form.budget),
      interests: form.interests,
      pace: form.pace,
      notes: form.notes,
    })
    setSubmitting(false)

    if (error || !tripId) {
      setFormError(error || 'Could not create trip.')
      return
    }

    navigate(PATHS.tripDetail(tripId), { replace: true })
  }

  if (!isFirestoreAvailable()) {
    return (
      <PageContainer>
        <PageHeader
          title="Create trip"
          description="Add a new trip to your dashboard."
          action={
            <Link
              to={PATHS.home}
              className="text-sm font-medium text-brand-700 hover:text-brand-800"
            >
              ← Back to dashboard
            </Link>
          }
        />
        <FirebaseUnavailable />
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <PageHeader
        title="Create trip"
        description="Tell us the basics. You can refine the itinerary and budget later on the trip page."
        action={
          <Link
            to={PATHS.home}
            className="text-sm font-medium text-brand-700 hover:text-brand-800"
          >
            Cancel
          </Link>
        }
      />

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-3xl space-y-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        noValidate
      >
        {formError ? (
          <InlineAlert variant="error" title="Something went wrong">
            {formError}
          </InlineAlert>
        ) : null}

        <section className="space-y-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Trip overview</h2>
          <FormInput
            id="trip-title"
            name="title"
            label="Trip title"
            placeholder="e.g. Spring week in Lisbon"
            value={form.title}
            onChange={(ev) => updateField('title', ev.target.value)}
            error={fieldErrors.title}
            disabled={submitting}
            required
          />
          <FormInput
            id="trip-destination"
            name="destination"
            label="Destination"
            placeholder="City, region, or country"
            value={form.destination}
            onChange={(ev) => updateField('destination', ev.target.value)}
            error={fieldErrors.destination}
            disabled={submitting}
            required
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <FormInput
              id="trip-start"
              name="startDate"
              label="Start date"
              type="date"
              value={form.startDate}
              onChange={(ev) => updateField('startDate', ev.target.value)}
              error={fieldErrors.startDate}
              disabled={submitting}
              required
            />
            <FormInput
              id="trip-end"
              name="endDate"
              label="End date"
              type="date"
              value={form.endDate}
              min={form.startDate || undefined}
              onChange={(ev) => updateField('endDate', ev.target.value)}
              error={fieldErrors.endDate}
              disabled={submitting}
              required
            />
          </div>
        </section>

        <section className="space-y-5 border-t border-slate-100 pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Travel party & budget</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormInput
              id="trip-travelers"
              name="travelers"
              label="Number of travelers"
              type="number"
              min={1}
              step={1}
              value={form.travelers}
              onChange={(ev) => updateField('travelers', ev.target.value)}
              error={fieldErrors.travelers}
              disabled={submitting}
              required
            />
            <FormInput
              id="trip-budget"
              name="budget"
              label="Total budget (USD)"
              type="number"
              min={0}
              step={1}
              placeholder="0"
              value={form.budget}
              onChange={(ev) => updateField('budget', ev.target.value)}
              error={fieldErrors.budget}
              disabled={submitting}
              required
              hint="Whole dollars; you can refine later."
            />
          </div>
        </section>

        <section className="space-y-5 border-t border-slate-100 pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Style & notes</h2>
          <FormSelect
            id="trip-pace"
            name="pace"
            label="Pace"
            value={form.pace}
            onChange={(ev) => updateField('pace', ev.target.value)}
            options={PACE_OPTIONS}
            error={fieldErrors.pace}
            disabled={submitting}
            required
          />
          <FormTextarea
            id="trip-interests"
            name="interests"
            label="Interests"
            placeholder="Museums, food, nightlife, nature…"
            value={form.interests}
            onChange={(ev) => updateField('interests', ev.target.value)}
            disabled={submitting}
            rows={3}
            hint="Optional — helps when generating an itinerary later."
          />
          <FormTextarea
            id="trip-notes"
            name="notes"
            label="Notes"
            placeholder="Flights booked, must-see spots, accessibility…"
            value={form.notes}
            onChange={(ev) => updateField('notes', ev.target.value)}
            disabled={submitting}
            rows={3}
            hint="Optional."
          />
        </section>

        <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
          <AuthSubmitButton
            loading={submitting}
            disabled={submitting}
            className="w-full min-h-[2.75rem] sm:w-auto sm:min-w-[12rem]"
          >
            Create trip
          </AuthSubmitButton>
        </div>
      </form>
    </PageContainer>
  )
}
