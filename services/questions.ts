import { doc, getDoc, limit, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { QuestionData, Activity, VideoRecommendation } from '../types';
import { COLLECTIONS, fetchWithOptionalOrder } from './firestoreUtils';
import { getActivitiesByQuestion } from './activities';
import { getVideosByQuestion } from './videos';

// Normalize Firestore snake_case fields to the camelCase shape used in the UI.
const normalizeQuestion = (raw: any): QuestionData => ({
  id: raw.id,
  questionText: raw.questionText ?? raw.question_text ?? '',
  // Prefer full explanation, fall back to parent or kid-friendly copy if present
  explanation:
    raw.explanation ?? raw.explanation_text ?? raw.explanation_parent ?? raw.short_explanation_kid ?? '',
  shortExplanationKid: raw.shortExplanationKid ?? raw.short_explanation_kid ?? '',
  explanationParent: raw.explanationParent ?? raw.explanation_parent ?? raw.explanation ?? '',
  ageRange: raw.ageRange ?? raw.age_range ?? '',
  topic: raw.topic ?? raw.theme ?? '',
  takeaways: raw.takeaways ?? [],
  videos: raw.videos ?? [],
  activities: raw.activities ?? [],
  relatedQuestions: raw.relatedQuestions ?? raw.related_questions ?? [],
});

export const getApprovedQuestions = async (): Promise<QuestionData[]> => {
  const results = await fetchWithOptionalOrder<QuestionData>(
    COLLECTIONS.QUESTIONS,
    [where('status', '==', 'ready')], // use backend field
    'createdAt'
  );
  return results.map(normalizeQuestion);
};

export const getApprovedQuestionById = async (id: string): Promise<QuestionData | null> => {
  try {
    const ref = doc(db, COLLECTIONS.QUESTIONS, id);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const data = snap.data();
      if (data.status === 'ready') {
        return normalizeQuestion({ id: snap.id, ...data });
      }
    }
    return null;
  } catch (error) {
    console.error('Error fetching question by ID:', error);
    return null;
  }
};

export const searchApprovedQuestions = async (searchText: string): Promise<QuestionData[]> => {
  try {
    const all = await getApprovedQuestions();
    const needle = searchText.toLowerCase();
    return all.filter(
      (q) =>
        (q.questionText ?? '').toLowerCase().includes(needle) ||
        (q.topic ?? '').toLowerCase().includes(needle) ||
        (q.explanation ?? '').toLowerCase().includes(needle) ||
        (q.explanationParent ?? '').toLowerCase().includes(needle) ||
        (q.shortExplanationKid ?? '').toLowerCase().includes(needle)
    );
  } catch (error) {
    console.error('Error searching questions:', error);
    return [];
  }
};

export const getFeaturedQuestions = async (count: number = 4): Promise<QuestionData[]> => {
  try {
    const featured = await fetchWithOptionalOrder<QuestionData>(
      COLLECTIONS.QUESTIONS,
      [where('status', '==', 'ready'), where('featured', '==', true), limit(count)],
      'createdAt'
    );

    if (featured.length > 0) {
      return featured.slice(0, count).map(normalizeQuestion);
    }

    const recent = await getApprovedQuestions();
    return recent.slice(0, count);
  } catch (error) {
    console.error('Error fetching featured questions:', error);
    const recent = await getApprovedQuestions();
    return recent.slice(0, count);
  }
};

export const getQuestionsByTopic = async (topic: string): Promise<QuestionData[]> => {
  try {
    const results = await fetchWithOptionalOrder<QuestionData>(
      COLLECTIONS.QUESTIONS,
      [where('status', '==', 'ready'), where('topic', '==', topic)],
      'createdAt'
    );
    return results.map(normalizeQuestion);
  } catch (error) {
    console.error('Error fetching questions by topic:', error);
    return [];
  }
};

export const getQuestionsByTheme = getQuestionsByTopic;

export const getActivitiesForQuestion = async (questionId: string): Promise<Activity[]> => {
  try {
    return getActivitiesByQuestion(questionId);
  } catch (error) {
    console.error('Error fetching activities for question:', error);
    return [];
  }
};

export const getVideosForQuestion = async (questionId: string): Promise<VideoRecommendation[]> => {
  try {
    return getVideosByQuestion(questionId);
  } catch (error) {
    console.error('Error fetching videos for question:', error);
    return [];
  }
};

