import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore'
import { mapFirestoreError } from '../../utils/firestoreErrors'
import { coerceDate } from '../../utils/dateDisplay'
import { generateShareId } from '../../utils/shareId'
import { db } from '../firebase/config'

const TRIPS = 'trips'

function timestampToMillis(value) {
  const d = coerceDate(value)
  return d ? d.getTime() : 0
}

/**
 * Normalized trip for UI lists.
 * @param {string} id
 * @param {Record<string, unknown>} data
 */
export function tripFromFirestore(id, data) {
  return {
    id,
    userId: String(data.userId ?? ''),
    title: String(data.title ?? 'Untitled trip'),
    destination: String(data.destination ?? ''),
    startDate: data.startDate ?? null,
    endDate: data.endDate ?? null,
    budget: data.budget ?? null,
    travelers: data.travelers ?? null,
    interests: typeof data.interests === 'string' ? data.interests : '',
    pace: typeof data.pace === 'string' ? data.pace : '',
    notes: typeof data.notes === 'string' ? data.notes : '',
    shareId: typeof data.shareId === 'string' ? data.shareId : null,
    updatedAt: data.updatedAt ?? null,
    createdAt: data.createdAt ?? null,
  }
}

/**
 * @param {string} userId
 * @param {{
 *   title: string
 *   destination: string
 *   startDate: string
 *   endDate: string
 *   travelers: number
 *   budget: number
 *   interests: string
 *   pace: string
 *   notes: string
 * }} input — validated, trimmed strings for dates (YYYY-MM-DD)
 * @returns {Promise<{ tripId: string | null; error: string | null }>}
 */
export async function createTrip(userId, input) {
  if (!db) {
    return { tripId: null, error: 'Firestore is not configured.' }
  }
  try {
    const shareId = generateShareId()
    const ref = await addDoc(collection(db, TRIPS), {
      userId,
      title: input.title.trim(),
      destination: input.destination.trim(),
      startDate: input.startDate,
      endDate: input.endDate,
      travelers: input.travelers,
      budget: input.budget,
      interests: input.interests.trim(),
      pace: input.pace,
      notes: input.notes.trim(),
      shareId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    return { tripId: ref.id, error: null }
  } catch (e) {
    return { tripId: null, error: mapFirestoreError(e) }
  }
}

/**
 * All trips owned by the user (single-field query — no composite index).
 * Sorted by `updatedAt` descending in memory.
 * @param {string} uid
 * @returns {Promise<{ trips: ReturnType<typeof tripFromFirestore>[]; error: string | null }>}
 */
export async function listTripsForUser(uid) {
  if (!db) {
    return { trips: [], error: 'Firestore is not configured.' }
  }
  try {
    const q = query(collection(db, TRIPS), where('userId', '==', uid))
    const snap = await getDocs(q)
    const trips = snap.docs.map((d) => tripFromFirestore(d.id, d.data()))
    trips.sort((a, b) => timestampToMillis(b.updatedAt) - timestampToMillis(a.updatedAt))
    return { trips, error: null }
  } catch (e) {
    return { trips: [], error: mapFirestoreError(e) }
  }
}
