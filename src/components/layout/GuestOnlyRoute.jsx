import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { AuthLoadingScreen } from '../common/AuthLoadingScreen'
import { FirebaseUnavailable } from '../common/FirebaseUnavailable'
import { PATHS } from '../../routes/paths'

/**
 * Login / signup only: redirects signed-in users to the app (or prior protected route).
 */
export function GuestOnlyRoute() {
  const { user, loading, authConfigured } = useAuth()
  const location = useLocation()

  if (!authConfigured) {
    return <FirebaseUnavailable />
  }

  if (loading) {
    return <AuthLoadingScreen />
  }

  if (user) {
    const from = location.state?.from
    const target = from ? `${from.pathname}${from.search || ''}` : PATHS.home
    return <Navigate to={target} replace />
  }

  return <Outlet />
}
