const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(value) {
  const v = (value ?? '').trim()
  if (!v) return 'Email is required.'
  if (!EMAIL_RE.test(v)) return 'Enter a valid email address.'
  return null
}

const MIN_PASSWORD = 6

export function validatePassword(value) {
  const v = value ?? ''
  if (!v) return 'Password is required.'
  if (v.length < MIN_PASSWORD) return `Password must be at least ${MIN_PASSWORD} characters.`
  return null
}

export function validatePasswordConfirm(password, confirm) {
  if ((confirm ?? '') !== (password ?? '')) return 'Passwords do not match.'
  return null
}
