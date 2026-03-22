import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { auth } from './config'

export function isAuthAvailable() {
  return auth != null
}

/** @param {(user: import('firebase/auth').User | null) => void} callback */
export function subscribeToAuthState(callback) {
  if (!auth) {
    callback(null)
    return () => {}
  }
  return onAuthStateChanged(auth, callback)
}

export async function registerWithEmail(email, password) {
  if (!auth) {
    const err = new Error('AUTH_UNAVAILABLE')
    err.code = 'auth/unavailable'
    throw err
  }
  await createUserWithEmailAndPassword(auth, email, password)
}

export async function loginWithEmail(email, password) {
  if (!auth) {
    const err = new Error('AUTH_UNAVAILABLE')
    err.code = 'auth/unavailable'
    throw err
  }
  await signInWithEmailAndPassword(auth, email, password)
}

export async function logOut() {
  if (!auth) {
    const err = new Error('AUTH_UNAVAILABLE')
    err.code = 'auth/unavailable'
    throw err
  }
  await signOut(auth)
}

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })

export async function signInWithGoogle() {
  if (!auth) {
    const err = new Error('AUTH_UNAVAILABLE')
    err.code = 'auth/unavailable'
    throw err
  }
  await signInWithPopup(auth, googleProvider)
}

/**
 * Maps Firebase Auth (and app) errors to short UI copy.
 * @param {unknown} error
 * @returns {string}
 */
export function mapAuthError(error) {
  const code = error && typeof error === 'object' && 'code' in error ? error.code : null

  switch (code) {
    case 'auth/unavailable':
      return 'Firebase is not configured. Add your web app keys to the .env file (see .env.example).'
    case 'auth/email-already-in-use':
      return 'That email is already registered. Try logging in instead.'
    case 'auth/invalid-email':
      return 'Please enter a valid email address.'
    case 'auth/weak-password':
      return 'Use at least 6 characters for your password.'
    case 'auth/user-disabled':
      return 'This account has been disabled.'
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect email or password.'
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a moment and try again.'
    case 'auth/network-request-failed':
      return 'Network error. Check your connection and try again.'
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return 'Sign-in was cancelled. Try again when you’re ready.'
    case 'auth/popup-blocked':
      return 'Your browser blocked the sign-in popup. Allow popups for this site and try again.'
    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with this email using a different sign-in method. Try email/password or link accounts in Firebase.'
    default:
      if (error instanceof Error && error.message) {
        return error.message
      }
      return 'Something went wrong. Please try again.'
  }
}
