import { Link, Outlet } from 'react-router-dom'
import { PATHS } from '../../routes/paths'

/**
 * Minimal chrome for public shared trips (read-only).
 */
export function SharedTripLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
          <span className="text-sm font-medium text-slate-500">Shared trip</span>
          <Link
            to={PATHS.home}
            className="text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            Plan your own
          </Link>
        </div>
      </header>
      <Outlet />
    </div>
  )
}
