/**
 * Full-page spinner while Firebase resolves the current session.
 */
export function AuthLoadingScreen({ message = 'Checking your session…' }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600"
        role="status"
        aria-label="Loading"
      />
      <p className="text-sm font-medium text-slate-600">{message}</p>
    </div>
  )
}
