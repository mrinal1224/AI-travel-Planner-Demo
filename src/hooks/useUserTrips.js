import { useEffect, useState } from 'react'
import { listTripsForUser } from '../services/firestore/trips'

/**
 * Loads trips for the signed-in user from Firestore.
 * @param {string | undefined} userId
 */
export function useUserTrips(userId) {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(Boolean(userId))
  const [error, setError] = useState(null)
  const [reloadToken, setReloadToken] = useState(0)

  useEffect(() => {
    if (!userId) {
      return undefined
    }

    let cancelled = false
    ;(async () => {
      await Promise.resolve()
      if (cancelled) return
      setLoading(true)
      setError(null)
      const { trips: next, error: err } = await listTripsForUser(userId)
      if (cancelled) return
      if (err) {
        setError(err)
        setTrips([])
      } else {
        setTrips(next)
      }
      setLoading(false)
    })()

    return () => {
      cancelled = true
    }
  }, [userId, reloadToken])

  const refetch = () => {
    if (userId) {
      setReloadToken((n) => n + 1)
    }
  }

  return {
    trips: userId ? trips : [],
    loading: Boolean(userId) && loading,
    error: userId ? error : null,
    refetch,
  }
}
