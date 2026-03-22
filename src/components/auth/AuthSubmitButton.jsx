export function AuthSubmitButton({ children, loading, disabled, className = 'w-full' }) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className={`flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-600/25 transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {loading ? (
        <>
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
            aria-hidden
          />
          Please wait…
        </>
      ) : (
        children
      )}
    </button>
  )
}
