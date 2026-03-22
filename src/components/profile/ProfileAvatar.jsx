import { getNavbarDisplayName } from '../../utils/userDisplay'

export function ProfileAvatar({ user, name }) {
  const display = (name ?? '').trim() || getNavbarDisplayName(user)
  const src = user?.photoURL || undefined
  const initial = display.charAt(0).toUpperCase() || '?'

  return (
    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100 shadow-sm">
      {src ? (
        <img src={src} alt="" className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-100 to-brand-200 text-2xl font-semibold text-brand-800">
          {initial}
        </div>
      )}
    </div>
  )
}
