import { doc, getDoc, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Activity } from '../types';
import { COLLECTIONS, fetchWithOptionalOrder } from './firestoreUtils';

// Normalize Firestore activity docs (which may use snake_case or strings)
// into the camelCase/array shape expected by the UI.
const normalizeActivity = (raw: any): Activity => {
  const toList = (value: any, splitter: RegExp = /[,\n;]+/) => {
    if (Array.isArray(value)) {
      return value.map((v) => String(v).trim()).filter(Boolean);
    }
    if (typeof value === 'string') {
      return value
        .split(splitter)
        .map((v) => v.trim())
        .filter(Boolean);
    }
    return [];
  };

  // Steps often arrive as a single numbered string like "1. Do X 2. Do Y"
  const toSteps = (value: any) => {
    if (Array.isArray(value)) {
      return value.map((v) => String(v).trim()).filter(Boolean);
    }
    if (typeof value === 'string') {
      const numbered = value
        .split(/\s*\d+\.\s*/)
        .map((v) => v.trim())
        .filter(Boolean);
      if (numbered.length > 1) return numbered;
      return value
        .split(/\r?\n|;|\||•/)
        .map((v) => v.trim())
        .filter(Boolean);
    }
    return [];
  };

  const materials = toList(raw.materials ?? raw.material_list);
  const steps = toSteps(raw.steps ?? raw.instructions);
  const prompts = toList(raw.prompts ?? raw.prompts_parent);
  const skills = toList(raw.skills);
  const extensions = toList(raw.extensions ?? raw.extensionIdeas);

  const firstString = (...values: any[]): string | undefined => {
    for (const v of values) {
      if (typeof v === 'string' && v.trim()) return v.trim();
    }
    return undefined;
  };

  const imageUrl = firstString(
    raw.imageUrl,
    raw.image_url,
    raw.thumbnailUrl,
    raw.thumbnail_url,
    raw.hero_image,
    raw.banner_image,
    raw.image, // common generic field
    raw.photo,
    raw.picture,
    raw.coverImage,
    raw.cover_image,
    raw.featured_image,
    raw.featuredImage,
    raw.source_image,
    raw.source_image_url,
    raw.og_image
  );

  return {
    id: raw.id,
    title: raw.title ?? raw.source_title ?? raw.short_summary ?? 'Activity',
    subtitle: raw.subtitle ?? raw.short_summary,
    description: raw.description ?? raw.short_summary ?? '',
    materials,
    timeEstimate: raw.timeEstimate ?? raw.time_estimate ?? raw.time ?? raw.duration ?? '10-20 min',
    ageRange: raw.ageRange ?? raw.age_range ?? raw.age ?? '4-12',
    topic: raw.topic ?? raw.theme ?? raw.tags?.[0] ?? '',
    category: raw.category ?? raw.theme ?? raw.topic ?? raw.tags?.[0] ?? '',
    relatedQuestionId:
      raw.relatedQuestionId ?? raw.related_question_id ?? raw.questionId ?? raw.question_id,
    icon: raw.icon,
    imageUrl,
    thumbnailUrl: firstString(raw.thumbnailUrl, raw.thumbnail_url, imageUrl),
    curiositySpark: raw.curiositySpark ?? raw.curiosity_spark ?? raw.origin,
    steps: steps.length ? steps : undefined,
    prompts: prompts.length ? prompts : undefined,
    messLevel: raw.messLevel ?? raw.mess_level,
    skills: skills.length ? skills : undefined,
    parentContext: raw.parentContext ?? raw.parent_context ?? raw.safety_notes,
    extensions: extensions.length ? extensions : undefined,
    videoUrl: raw.videoUrl ?? raw.video_url,
  };
};

export const getApprovedActivities = async (): Promise<Activity[]> => {
  const rawActivities = await fetchWithOptionalOrder<any>(
    COLLECTIONS.ACTIVITIES,
    [where('status', '==', 'approved')], // backend field
    'createdAt'
  );

  return rawActivities.map((a) => normalizeActivity(a));
};

export const getApprovedActivityById = async (id: string): Promise<Activity | null> => {
  try {
    const ref = doc(db, COLLECTIONS.ACTIVITIES, id);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const data = snap.data();
      if (data.status === 'approved') {
        return normalizeActivity({ id: snap.id, ...data });
      }
    }
    return null;
  } catch (error) {
    console.error('Error fetching activity by ID:', error);
    return null;
  }
};

export const getActivitiesByCategory = async (category: string): Promise<Activity[]> => {
  try {
    const rawActivities = await fetchWithOptionalOrder<any>(
      COLLECTIONS.ACTIVITIES,
      [where('status', '==', 'approved'), where('category', '==', category)],
      'createdAt'
    );

    return rawActivities.map((a) => normalizeActivity(a));
  } catch (error) {
    console.error('Error fetching activities by category:', error);
    return [];
  }
};

export const getActivitiesByQuestion = async (questionId: string): Promise<Activity[]> => {
  try {
    const queries = [
      [where('status', '==', 'approved'), where('relatedQuestionId', '==', questionId)],
      [where('status', '==', 'approved'), where('related_question_id', '==', questionId)],
      [where('status', '==', 'approved'), where('questionId', '==', questionId)],
      [where('status', '==', 'approved'), where('question_id', '==', questionId)],
    ] as const;

    for (const conditions of queries) {
      const rawActivities = await fetchWithOptionalOrder<any>(COLLECTIONS.ACTIVITIES, conditions, 'createdAt');
      if (rawActivities.length > 0) {
        return rawActivities.map((a) => normalizeActivity(a));
      }
    }

    // Fallback: fetch all approved and filter locally
    const all = await getApprovedActivities();
    return all.filter(
      (a) =>
        a.relatedQuestionId === questionId ||
        (a as any).questionId === questionId ||
        (a as any).question_id === questionId
    );
  } catch (error) {
    console.error('Error fetching activities for question:', error);
    return [];
  }
};

