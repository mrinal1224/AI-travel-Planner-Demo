import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { mapFirestoreError } from '../../utils/firestoreErrors'
import { db } from '../firebase/config'

const USERS = 'users'

function userRef(uid) {
  return doc(db, USERS, uid)
}

export function defaultPreferences() {
  return {
    budgetStyle: '',
    tripType: '',
    interests: '',
    pace: '',
    transportPreference: '',
  }
}

/**
 * @param {import('firebase/firestore').DocumentSnapshot} snap
 */
export function profileFromSnapshot(snap) {
  // Firebase v10+ uses exists() as a method, not an .exists property.
  if (!snap.exists()) return null
  const d = snap.data()
  if (!d || typeof d !== 'object') return null
  const raw = typeof d.preferences === 'object' && d.preferences !== null ? d.preferences : {}
  return {
    name: typeof d.name === 'string' ? d.name : '',
    email: typeof d.email === 'string' ? d.email : '',
    photoURL: typeof d.photoURL === 'string' ? d.photoURL : null,
    preferences: {
      budgetStyle: String(raw.budgetStyle ?? ''),
      tripType: String(raw.tripType ?? ''),
      interests: String(raw.interests ?? ''),
      pace: String(raw.pace ?? ''),
      transportPreference: String(raw.transportPreference ?? ''),
    },
    createdAt: d.createdAt ?? null,
    updatedAt: d.updatedAt ?? null,
  }
}

/**
 * Create `users/{uid}` on first sign-in if missing.
 * @param {import('firebase/auth').User} firebaseUser
 * @returns {Promise<{ error: string | null }>}
 */
export async function ensureUserProfile(firebaseUser) {
  if (!db) {
    return { error: null }
  }
  try {
    const ref = userRef(firebaseUser.uid)
    const snap = await getDoc(ref)
    if (snap.exists()) {
      return { error: null }
    }
    const email = firebaseUser.email ?? ''
    const localName = email.includes('@') ? email.split('@')[0].replace(/[._-]+/g, ' ') : ''
    const fallbackName =
      firebaseUser.displayName?.trim() ||
      localName
        .split(' ')
        .filter(Boolean)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ') ||
      ''

    await setDoc(ref, {
      name: fallbackName,
      email,
      photoURL: firebaseUser.photoURL ?? null,
      preferences: defaultPreferences(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    return { error: null }
  } catch (e) {
    return { error: mapFirestoreError(e) }
  }
}

/**
 * @param {string} uid
 * @returns {Promise<{ profile: ReturnType<typeof profileFromSnapshot>; error: string | null }>}
 */
export async function fetchUserProfile(uid) {
  if (!db) {
    return { profile: null, error: 'Firestore is not configured.' }
  }
  try {
    const snap = await getDoc(userRef(uid))
    const profile = profileFromSnapshot(snap)
    return { profile, error: null }
  } catch (e) {
    return { profile: null, error: mapFirestoreError(e) }
  }
}

/**
 * @param {string} uid
 * @param {import('firebase/auth').User | null} authUser
 * @param {{ name: string; preferences: Record<string, string> }} payload
 * @returns {Promise<{ error: string | null }>}
 */
/**
 * Bootstrap + read profile for UI forms (no React state).
 * @param {import('firebase/auth').User} user
 * @returns {Promise<
 *   | { ok: true; name: string; preferences: ReturnType<typeof defaultPreferences>; emailDisplay: string }
 *   | { ok: false; error: string }
 * >}
 */
export async function loadProfileDataForForm(user) {
  if (!db) {
    return { ok: false, error: 'Firestore is not configured.' }
  }
  const boot = await ensureUserProfile(user)
  if (boot.error) {
    return { ok: false, error: boot.error }
  }
  const { profile, error } = await fetchUserProfile(user.uid)
  if (error) {
    return { ok: false, error }
  }
  if (!profile) {
    return { ok: false, error: 'We could not load your profile. Try again.' }
  }
  return {
    ok: true,
    name: profile.name,
    preferences: profile.preferences,
    emailDisplay: user.email ?? profile.email ?? '',
  }
}

export async function saveUserProfile(uid, authUser, payload) {
  if (!db) {
    return { error: 'Firestore is not configured.' }
  }
  try {
    const ref = userRef(uid)
    const snap = await getDoc(ref)
    const email = authUser?.email ?? ''
    const photoURL = authUser?.photoURL ?? null

    if (!snap.exists()) {
      await setDoc(ref, {
        name: payload.name.trim(),
        email,
        photoURL,
        preferences: { ...defaultPreferences(), ...payload.preferences },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      return { error: null }
    }

    await updateDoc(ref, {
      name: payload.name.trim(),
      email,
      photoURL,
      preferences: { ...defaultPreferences(), ...payload.preferences },
      updatedAt: serverTimestamp(),
    })
    return { error: null }
  } catch (e) {
    return { error: mapFirestoreError(e) }
  }
}
