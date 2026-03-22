/**
 * Label for the navbar: prefer Firebase displayName (e.g. Google), else a readable name from email.
 */
export function getNavbarDisplayName(user) {
  if (!user) return 'Account'
  const name = user.displayName?.trim()
  if (name) return name

  const email = user.email?.trim()
  if (!email) return 'Account'

  const local = email.split('@')[0]
  if (!local) return email

  const formatted = local
    .replace(/[._-]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')

  return formatted || email
}

/** Tooltip for the navbar label (email is the stable account identifier). */
export function getNavbarTitle(user) {
  return user?.email ?? ''
}
