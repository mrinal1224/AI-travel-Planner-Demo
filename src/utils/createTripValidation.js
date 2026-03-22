/**
 * Client-side validation for the create-trip form.
 * @param {{
 *   title: string
 *   destination: string
 *   startDate: string
 *   endDate: string
 *   travelers: string
 *   budget: string
 *   pace: string
 * }} values — raw string state from inputs
 * @returns {{ fieldErrors: Record<string, string>, isValid: boolean }}
 */
export function validateCreateTripForm(values) {
  const fieldErrors = {}

  if (!values.title?.trim()) {
    fieldErrors.title = 'Trip title is required.'
  }

  if (!values.destination?.trim()) {
    fieldErrors.destination = 'Destination is required.'
  }

  if (!values.startDate) {
    fieldErrors.startDate = 'Start date is required.'
  }

  if (!values.endDate) {
    fieldErrors.endDate = 'End date is required.'
  }

  if (values.startDate && values.endDate && values.endDate < values.startDate) {
    fieldErrors.endDate = 'End date must be on or after the start date.'
  }

  const travelers = Number.parseInt(values.travelers, 10)
  if (values.travelers === '' || Number.isNaN(travelers) || travelers < 1) {
    fieldErrors.travelers = 'Enter at least one traveler.'
  }

  const budget = Number(values.budget)
  if (values.budget === '' || Number.isNaN(budget) || budget < 0) {
    fieldErrors.budget = 'Enter a budget of 0 or more.'
  }

  if (!values.pace?.trim()) {
    fieldErrors.pace = 'Select a travel pace.'
  }

  return {
    fieldErrors,
    isValid: Object.keys(fieldErrors).length === 0,
  }
}
