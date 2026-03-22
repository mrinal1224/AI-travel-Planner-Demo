import { Link, Outlet } from 'react-router-dom'
import { PATHS } from '../../routes/paths'

export function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-brand-50/80 via-slate-50 to-slate-50">
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 items-center justify-between px-4 sm:h-16 sm:px-6">
          <Link
            to={PATHS.home}
            className="flex items-center gap-2 font-semibold tracking-tight text-slate-900"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-sm font-bold text-white shadow-sm shadow-brand-500/25">
              AI
            </span>
            Travel Planner
          </Link>
          <Link
            to={PATHS.home}
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Back to app
          </Link>
        </div>
      </header>
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <Outlet />
      </div>
    </div>
  )
}
