/**
 * @param {unknown} error
 * @returns {string}
 */
export function mapFirestoreError(error) {
  const code =
    error && typeof error === 'object' && 'code' in error ? String(error.code) : ''

  if (code === 'permission-denied') {
    return 'You do not have permission to save this profile. Check Firestore security rules.'
  }
  if (code === 'unavailable') {
    return 'Firestore is temporarily unavailable. Try again in a moment.'
  }
  if (error instanceof Error && error.message) {
    return error.message
  }
  return 'Something went wrong while talking to the database.'
}
