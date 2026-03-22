import { NavLink } from 'react-router-dom'
import { PATHS } from '../../routes/paths'

const linkClass = ({ isActive }) =>
  [
    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
    isActive
      ? 'bg-brand-50 text-brand-800 ring-1 ring-brand-200/60'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  ].join(' ')

const items = [
  { to: PATHS.home, label: 'Dashboard', icon: HomeIcon },
  { to: PATHS.tripNew, label: 'Create trip', icon: PlusIcon },
  { to: PATHS.profile, label: 'Profile', icon: UserIcon },
]

export function Sidebar({ mobileOpen, onMobileClose }) {
  return (
    <>
      {/* Mobile overlay */}
      <button
        type="button"
        aria-label="Close menu"
        className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[2px] transition-opacity lg:hidden ${
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onMobileClose}
      />

      <aside
        className={[
          'fixed bottom-0 left-0 top-14 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 ease-out sm:top-16 lg:static lg:top-auto lg:z-0 lg:h-auto lg:min-h-0 lg:translate-x-0 lg:self-stretch lg:border-slate-200 lg:shadow-none',
          mobileOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full lg:translate-x-0',
        ].join(' ')}
      >
        <div className="flex flex-1 flex-col gap-1 p-4">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Plan
          </p>
          {items.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={linkClass}
                onClick={onMobileClose}
                end={item.to === PATHS.home}
              >
                <Icon className="h-5 w-5 shrink-0 text-current opacity-80" />
                {item.label}
              </NavLink>
            )
          })}
        </div>

        <div className="border-t border-slate-100 p-4 text-xs text-slate-500">
          MVP shell — auth & data in upcoming features.
        </div>
      </aside>
    </>
  )
}

function HomeIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  )
}

function PlusIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  )
}

function UserIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </svg>
  )
}
