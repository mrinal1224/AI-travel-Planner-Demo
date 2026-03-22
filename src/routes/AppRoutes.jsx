import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthLayout } from '../components/layout/AuthLayout'
import { GuestOnlyRoute } from '../components/layout/GuestOnlyRoute'
import { MainLayout } from '../components/layout/MainLayout'
import { RequireAuth } from '../components/layout/RequireAuth'
import { SharedTripLayout } from '../components/layout/SharedTripLayout'
import { CreateTripPage } from '../pages/CreateTripPage'
import { DashboardPage } from '../pages/DashboardPage'
import { LoginPage } from '../pages/LoginPage'
import { ProfilePage } from '../pages/ProfilePage'
import { SharedTripPage } from '../pages/SharedTripPage'
import { SignupPage } from '../pages/SignupPage'
import { TripDetailsPage } from '../pages/TripDetailsPage'
import { PATHS } from './paths'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route element={<GuestOnlyRoute />}>
          <Route path={PATHS.login} element={<LoginPage />} />
          <Route path={PATHS.signup} element={<SignupPage />} />
        </Route>
      </Route>

      <Route element={<SharedTripLayout />}>
        <Route path="/share/:shareId" element={<SharedTripPage />} />
      </Route>

      <Route element={<RequireAuth />}>
        <Route element={<MainLayout />}>
          <Route path={PATHS.home} element={<DashboardPage />} />
          <Route path={PATHS.tripNew} element={<CreateTripPage />} />
          <Route path="/trips/:tripId" element={<TripDetailsPage />} />
          <Route path={PATHS.profile} element={<ProfilePage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={PATHS.home} replace />} />
    </Routes>
  )
}
