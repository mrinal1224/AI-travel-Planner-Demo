import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  isAuthAvailable,
  loginWithEmail,
  logOut,
  mapAuthError,
  registerWithEmail,
  signInWithGoogle as firebaseSignInWithGoogle,
  subscribeToAuthState,
} from '../services/firebase/auth'
import { ensureUserProfile } from '../services/firestore/userProfile'
import { AuthContext } from './authContext'

export function AuthProvider({ children }) {
  const authConfigured = isAuthAvailable()
  const [user, setUser] = useState(null)
  const [initialized, setInitialized] = useState(!authConfigured)

  useEffect(() => {
    if (!authConfigured) {
      return undefined
    }
    const unsubscribe = subscribeToAuthState((nextUser) => {
      setUser(nextUser)
      setInitialized(true)
    })
    return unsubscribe
  }, [authConfigured])

  useEffect(() => {
    if (!authConfigured || !user) {
      return undefined
    }
    let cancelled = false
    ensureUserProfile(user).then(({ error }) => {
      if (!cancelled && error && import.meta.env.DEV) {
        console.warn('[ensureUserProfile]', error)
      }
    })
    return () => {
      cancelled = true
    }
  }, [authConfigured, user])

  const loading = authConfigured && !initialized

  const signIn = useCallback(async (email, password) => {
    try {
      await loginWithEmail(email, password)
      return { error: null }
    } catch (e) {
      return { error: mapAuthError(e) }
    }
  }, [])

  const signUp = useCallback(async (email, password) => {
    try {
      await registerWithEmail(email, password)
      return { error: null }
    } catch (e) {
      return { error: mapAuthError(e) }
    }
  }, [])

  const signInWithGoogle = useCallback(async () => {
    try {
      await firebaseSignInWithGoogle()
      return { error: null }
    } catch (e) {
      return { error: mapAuthError(e) }
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await logOut()
      return { error: null }
    } catch (e) {
      return { error: mapAuthError(e) }
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      authConfigured,
      signIn,
      signUp,
      signInWithGoogle,
      logout,
    }),
    [user, loading, authConfigured, signIn, signUp, signInWithGoogle, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
