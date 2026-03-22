import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { AuthLoadingScreen } from '../common/AuthLoadingScreen'
import { FirebaseUnavailable } from '../common/FirebaseUnavailable'
import { PATHS } from '../../routes/paths'

export function RequireAuth() {
  const { user, loading, authConfigured } = useAuth()
  const location = useLocation()

  if (!authConfigured) {
    return <FirebaseUnavailable />
  }

  if (loading) {
    return <AuthLoadingScreen />
  }

  if (!user) {
    return <Navigate to={PATHS.login} state={{ from: location }} replace />
  }

  return <Outlet />
}
