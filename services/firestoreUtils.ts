import { collection, getDocs, orderBy, query, QueryConstraint } from 'firebase/firestore';
import { db } from '../config/firebase';

export const COLLECTIONS = {
  QUESTIONS: 'questions',
  ACTIVITIES: 'activities',
  VIDEOS: 'videos',
  THEMES: 'themes', // renamed from categories to match backend
} as const;

const getCreatedAtTime = (item: any): number => {
  return item?.createdAt?.toMillis?.() ?? item?.createdAt?.seconds ?? 0;
};

const warnedEmpty = new Set<string>();

/**
 * Runs a query with an optional orderBy on createdAt.
 * If orderBy fails (missing field/index), falls back to the base query.
 * Always returns client-sorted results when orderBy is unavailable.
 */
export const fetchWithOptionalOrder = async <T>(
  collectionName: string,
  constraints: QueryConstraint[],
  orderByField: string | null = 'createdAt'
): Promise<(T & { id: string })[]> => {
  let snapshot;

  if (orderByField) {
    try {
      snapshot = await getDocs(
        query(collection(db, collectionName), ...constraints, orderBy(orderByField, 'desc'))
      );
    } catch {
      snapshot = await getDocs(query(collection(db, collectionName), ...constraints));
    }
  } else {
    snapshot = await getDocs(query(collection(db, collectionName), ...constraints));
  }

  const items: (T & { id: string })[] = [];
  snapshot.forEach((docSnapshot) => {
    items.push({
      id: docSnapshot.id,
      ...docSnapshot.data(),
    } as T & { id: string });
  });

  if (items.length === 0 && !warnedEmpty.has(collectionName)) {
    warnedEmpty.add(collectionName);
    // eslint-disable-next-line no-console
    console.warn(
      `[firestore] No documents found in "${collectionName}". If this is unexpected, ensure data exists and security rules allow reads.`
    );
  }

  // If we couldn't order server-side, ensure a deterministic client order.
  if (orderByField) {
    return items.sort((a, b) => getCreatedAtTime(b) - getCreatedAtTime(a));
  }

  return items;
};

