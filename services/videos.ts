import { where } from 'firebase/firestore';
import { VideoRecommendation } from '../types';
import { COLLECTIONS, fetchWithOptionalOrder } from './firestoreUtils';

// Convert seconds to MM:SS string, tolerating preformatted values.
const formatDuration = (value: unknown): string | undefined => {
  if (value == null) return undefined;

  if (typeof value === 'string' && value.includes(':')) {
    return value;
  }

  const seconds = typeof value === 'number' ? value : Number(value);
  if (Number.isNaN(seconds) || seconds < 0) return undefined;

  const minutesPart = Math.floor(seconds / 60);
  const secondsPart = Math.floor(seconds % 60);

  return `${String(minutesPart).padStart(2, '0')}:${String(secondsPart).padStart(2, '0')}`;
};

// Normalize Firestore snake_case fields to the camelCase shape used in the UI.
const normalizeVideo = (raw: any): VideoRecommendation => ({
  id: raw.id,
  title: raw.title ?? raw.title_text,
  channelName: raw.channelName ?? raw.channel_name,
  youtubeQuery: raw.youtubeQuery ?? raw.youtube_query,
  thumbnailUrl: raw.thumbnailUrl ?? raw.thumbnail_url,
  duration: formatDuration(raw.duration_seconds ?? raw.durationSeconds ?? raw.duration),
  topic: raw.topic,
  ageRange: raw.ageRange ?? raw.age_range,
  questionId: raw.questionId ?? raw.question_id,
  relatedQuestionId: raw.relatedQuestionId ?? raw.related_question_id,
});

export const getApprovedVideos = async (): Promise<VideoRecommendation[]> => {
  const results = await fetchWithOptionalOrder<VideoRecommendation>(
    COLLECTIONS.VIDEOS,
    [where('is_approved', '==', true)],
    'createdAt'
  );
  return results.map(normalizeVideo);
};

export const getVideosByTopic = async (topic: string): Promise<VideoRecommendation[]> => {
  try {
    const results = await fetchWithOptionalOrder<VideoRecommendation>(
      COLLECTIONS.VIDEOS,
      [where('is_approved', '==', true), where('topic', '==', topic)],
      'createdAt'
    );
    return results.map(normalizeVideo);
  } catch (error) {
    console.error('Error fetching videos by topic:', error);
    return [];
  }
};

export const getVideosByQuestion = async (questionId: string): Promise<VideoRecommendation[]> => {
  try {
    const queries = [
      [where('is_approved', '==', true), where('questionId', '==', questionId)],
      [where('is_approved', '==', true), where('question_id', '==', questionId)],
      [where('is_approved', '==', true), where('relatedQuestionId', '==', questionId)],
      [where('is_approved', '==', true), where('related_question_id', '==', questionId)],
    ] as const;

    for (const conditions of queries) {
      const results = await fetchWithOptionalOrder<VideoRecommendation>(COLLECTIONS.VIDEOS, conditions, 'createdAt');
      if (results.length > 0) return results.map(normalizeVideo);
    }

    // Fallback: fetch approved and filter locally
    const all = await getApprovedVideos();
    return all.filter(
      (v) =>
        (v.questionId && v.questionId === questionId) ||
        (v.relatedQuestionId && v.relatedQuestionId === questionId)
    );
  } catch (error) {
    console.error('Error fetching videos for question:', error);
    return [];
  }
};

