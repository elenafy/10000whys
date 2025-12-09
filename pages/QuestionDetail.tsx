
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { QuestionData } from '../types';
import { FEATURED_QUESTIONS } from '../constants';
import { ActivityCard } from '../components/ActivityCard';
import { VideoCard } from '../components/VideoCard';
import { NoCuratedResult } from '../components/search/NoCuratedResult';
import { logCurationRequest } from '../services/curationService';

export const QuestionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');

  const [data, setData] = useState<QuestionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMissing, setIsMissing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setIsMissing(false);
      setData(null);

      // 1. Search Logic
      if (searchQuery) {
        // Simple fuzzy search against static curated questions
        const normalizedQuery = searchQuery.toLowerCase();
        const found = FEATURED_QUESTIONS.find(q => 
            q.questionText.toLowerCase().includes(normalizedQuery) ||
            q.topic.toLowerCase().includes(normalizedQuery) ||
            q.id === normalizedQuery
        );

        if (found) {
            setData(found);
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
        const staticQ = FEATURED_QUESTIONS.find(q => q.id === id);
        if (staticQ) {
            setData(staticQ);
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
    <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-20 space-y-20">
      {/* Header Section */}
      <div className="text-center max-w-5xl mx-auto">
        <span className="inline-block py-2.5 px-6 rounded-full bg-brand-blue/10 text-brand-blue text-lg font-bold mb-8 uppercase tracking-wide">
            {data.topic} • Ages {data.ageRange}
        </span>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-slate-800 mb-12 leading-tight">
          {data.questionText}
        </h1>
        <div className="bg-white rounded-[3rem] p-12 md:p-16 shadow-sm border border-slate-100 text-left relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-brand-yellow to-brand-pink"></div>
           <p className="text-3xl md:text-4xl text-slate-700 leading-relaxed font-medium">
             {data.explanation}
           </p>
           
           <div className="mt-12 pt-10 border-t border-slate-100">
             <h3 className="font-bold text-slate-400 text-base uppercase tracking-wider mb-6">Key Takeaways</h3>
             <ul className="space-y-4">
               {data.takeaways.map((t, i) => (
                 <li key={i} className="flex items-start gap-5 text-slate-600 text-xl">
                   <span className="mt-2.5 w-3 h-3 rounded-full bg-brand-green flex-shrink-0"></span>
                   <span>{t}</span>
                 </li>
               ))}
             </ul>
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
            {data.videos.map((video, idx) => (
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
            {data.activities.map((activity, idx) => (
                <ActivityCard key={idx} activity={activity} />
            ))}
        </div>
      </section>
    </div>
  );
};
