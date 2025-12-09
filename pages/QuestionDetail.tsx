
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Activity, QuestionData, VideoRecommendation } from '../types';
import { ActivityCard } from '../components/ActivityCard';
import { VideoCard } from '../components/VideoCard';
import { NoCuratedResult } from '../components/search/NoCuratedResult';
import { logCurationRequest } from '../services/curationService';
import {
  getApprovedQuestionById,
  searchApprovedQuestions,
  getActivitiesForQuestion,
  getVideosForQuestion,
} from '../services/questions';

export const QuestionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');

  const chunkIntoParagraphs = (text: string, sentencesPerParagraph = 2) => {
    if (!text) return [];
    const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
    const paragraphs: string[] = [];
    for (let i = 0; i < sentences.length; i += sentencesPerParagraph) {
      paragraphs.push(sentences.slice(i, i + sentencesPerParagraph).join(' '));
    }
    return paragraphs;
  };

  const [data, setData] = useState<QuestionData | null>(null);
  const [videos, setVideos] = useState<VideoRecommendation[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMissing, setIsMissing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setIsMissing(false);
      setData(null);
      setVideos([]);
      setActivities([]);

      // 1. Search Logic
      if (searchQuery) {
        // Search approved questions from Firebase
        const searchResults = await searchApprovedQuestions(searchQuery);
        
        if (searchResults.length > 0) {
          // Use the first matching result
          const first = searchResults[0];
          setData(first);
          setVideos(first.videos ?? []);
          setActivities(first.activities ?? []);
        } else {
          // Log the missing query for curation
          await logCurationRequest(searchQuery);
          setIsMissing(true);
        }
        setLoading(false);
        return;
      }

      // 2. Direct ID Access Logic
      if (id) {
        const question = await getApprovedQuestionById(id);
        if (question) {
          setData(question);
          setVideos(question.videos ?? []);
          setActivities(question.activities ?? []);
        } else {
          setIsMissing(true);
        }
        setLoading(false);
        return;
      }

      // Fallback
      setLoading(false);
      setIsMissing(true);
    };

    fetchData();
  }, [id, searchQuery]);

  // Fetch linked videos and activities using question ID (covers question_id variants)
  useEffect(() => {
    if (!data?.id) return;
    let cancelled = false;
    const loadLinked = async () => {
      const [linkedVideos, linkedActivities] = await Promise.all([
        getVideosForQuestion(data.id),
        getActivitiesForQuestion(data.id),
      ]);
      if (cancelled) return;
      if (linkedVideos.length) setVideos(linkedVideos);
      if (linkedActivities.length) setActivities(linkedActivities);
    };
    loadLinked();
    return () => {
      cancelled = true;
    };
  }, [data?.id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 border-8 border-brand-blue border-t-transparent rounded-full animate-spin mb-10"></div>
        <h2 className="font-display text-4xl font-bold text-brand-purple animate-pulse">Checking our library...</h2>
      </div>
    );
  }

  // SHOW EMPTY STATE if no curated data found
  if (isMissing || !data) {
    return <NoCuratedResult />;
  }

  // RENDER CURATED CONTENT
  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 py-16 space-y-20">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-block py-2 px-5 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-bold mb-6 uppercase tracking-wide">
            {data.topic} • Ages {data.ageRange}
        </span>
        <h1 className="font-display text-3xl sm:text-4xl md:text-[34px] font-bold text-slate-800 mb-8 leading-[1.22] mx-auto max-w-[680px]">
          {data.questionText}
        </h1>
        <div className="max-w-[1100px] mx-auto bg-white rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 text-left relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-brand-yellow to-brand-pink"></div>

          <div className="flex flex-col gap-8">
            <div className="rounded-2xl bg-[#FFF6DD] p-6 sm:p-7 md:p-8 flex flex-col">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl leading-none" aria-hidden="true">🌈</span>
                <p className="text-[12px] sm:text-[13px] font-medium text-amber-900 uppercase tracking-[0.14em]">Explain it to your child</p>
              </div>
              <div className="space-y-3 text-[16px] md:text-[17px] text-slate-800 leading-[1.55] max-w-[60ch]">
                {chunkIntoParagraphs(data.shortExplanationKid || data.explanation).map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
              {data.takeaways && data.takeaways.length > 0 && (
                <ul className="mt-4 space-y-2 text-[14px] text-amber-900/90">
                  {data.takeaways.slice(0, 2).map((idea, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-amber-500 flex-shrink-0"></span>
                      <span>{idea}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-2xl bg-[#F4F7FF] p-6 sm:p-7 md:p-8 flex flex-col">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-3xl leading-none" aria-hidden="true">🧠</span>
                <div>
                  <p className="text-[12px] sm:text-[13px] font-medium text-slate-700 uppercase tracking-[0.14em]">Parent notes</p>
                  <p className="text-[11px] sm:text-[12px] text-slate-500">For your understanding</p>
                </div>
              </div>
              <div className="space-y-3 text-[16px] md:text-[17px] text-slate-700 leading-[1.55] max-w-[60ch]">
                {chunkIntoParagraphs(data.explanationParent || data.explanation, 2).map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Videos Section */}
      <section>
        <div className="flex items-center gap-5 mb-10">
            <div className="w-16 h-16 rounded-full bg-brand-pink text-white flex items-center justify-center font-bold text-3xl">
                ▶
            </div>
            <h2 className="font-display text-4xl font-bold text-slate-800">Watch & Learn</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {videos.map((video, idx) => (
                <VideoCard key={idx} video={video} fluid={true} />
            ))}
        </div>
        <p className="text-center text-lg text-slate-400 mt-8">Links open in YouTube. We only recommend trusted educational channels.</p>
      </section>

      {/* Activities Section */}
      <section>
        <div className="flex items-center gap-5 mb-10">
            <div className="w-16 h-16 rounded-full bg-brand-green text-white flex items-center justify-center font-bold text-3xl">
                ★
            </div>
            <h2 className="font-display text-4xl font-bold text-slate-800">Try This at Home!</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {activities.map((activity, idx) => (
                <ActivityCard key={idx} activity={activity} />
            ))}
        </div>
      </section>
    </div>
  );
};
