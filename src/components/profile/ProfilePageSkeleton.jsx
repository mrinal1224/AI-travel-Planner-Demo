export function ProfilePageSkeleton() {
  return (
    <div className="animate-pulse space-y-8" aria-hidden>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="h-20 w-20 rounded-full bg-slate-200" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-48 rounded bg-slate-200" />
          <div className="h-4 w-64 rounded bg-slate-200" />
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="h-12 rounded-lg bg-slate-200" />
        <div className="h-12 rounded-lg bg-slate-200" />
        <div className="h-12 rounded-lg bg-slate-200 sm:col-span-2" />
        <div className="h-28 rounded-lg bg-slate-200 sm:col-span-2" />
      </div>
      <div className="h-11 w-40 rounded-lg bg-slate-200" />
    </div>
  )
}
