export function TripCardSkeleton() {
  return (
    <div
      className="flex flex-col rounded-xl border border-slate-100 bg-white p-5 shadow-sm"
      aria-hidden
    >
      <div className="flex justify-between gap-3">
        <div className="h-5 max-w-[75%] flex-1 animate-pulse rounded bg-slate-200" />
        <div className="h-6 w-8 shrink-0 animate-pulse rounded bg-slate-200" />
      </div>
      <div className="mt-2 h-4 w-full animate-pulse rounded bg-slate-100" />
      <div className="mt-4 space-y-2">
        <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
      </div>
    </div>
  )
}
