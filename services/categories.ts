import { CategoryDefinition } from '../types';
import { COLLECTIONS, fetchWithOptionalOrder } from './firestoreUtils';

export const getCategories = async (): Promise<CategoryDefinition[]> => {
  try {
    // Use server-side order by name when available
    return fetchWithOptionalOrder<CategoryDefinition>(
      COLLECTIONS.THEMES,
      [],
      'name'
    );
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

