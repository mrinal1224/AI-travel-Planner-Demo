/**
 * Shown when Firebase env vars are missing so Auth cannot run.
 */
export function FirebaseUnavailable() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="rounded-full bg-amber-100 p-3 text-amber-800">
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
      </div>
      <div className="max-w-md space-y-2">
        <h1 className="text-lg font-semibold text-slate-900">Firebase is not configured</h1>
        <p className="text-sm text-slate-600">
          Copy <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">.env.example</code> to{' '}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">.env</code> and add your Firebase
          web app keys from the Firebase console. Then restart the dev server.
        </p>
      </div>
    </div>
  )
}
