/**
 * Central route path constants — use in links and navigations.
 */
export const PATHS = {
  home: '/',
  login: '/login',
  signup: '/signup',
  profile: '/profile',
  tripNew: '/trips/new',
  tripDetail: (tripId) => `/trips/${tripId}`,
  sharedTrip: (shareId) => `/share/${shareId}`,
}
