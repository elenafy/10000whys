
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CATEGORIES, SAMPLE_ACTIVITIES, SAMPLE_VIDEOS, SAMPLE_QUESTIONS } from '../constants';
import { ActivityCard } from '../components/ActivityCard';
import { VideoCard } from '../components/VideoCard';
import { QuestionCard } from '../components/QuestionCard';

export const CategoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const category = CATEGORIES.find(c => c.id === id);
  
  // State for question pagination
  const [visibleQuestions, setVisibleQuestions] = useState(5);

  if (!category) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-4xl font-display font-bold text-slate-800 mb-4">Category Not Found</h1>
        <p className="text-xl text-slate-500 mb-8">We couldn't find the category you were looking for.</p>
        <button 
          onClick={() => navigate('/')}
          className="px-8 py-4 bg-brand-blue text-white rounded-full font-bold hover:bg-sky-400 transition-colors"
        >
          Go Home
        </button>
      </div>
    );
  }

  // Filter content based on category tags
  const videos = SAMPLE_VIDEOS.filter(v => v.topic && category.tags.includes(v.topic));
  const activities = SAMPLE_ACTIVITIES.filter(a => (a.topic && category.tags.includes(a.topic)) || (a.category && category.tags.includes(a.category)));
  
  // Filter questions based on category tags
  const questions = SAMPLE_QUESTIONS.filter(q => q.topic && category.tags.includes(q.topic));
  
  const otherCategories = CATEGORIES.filter(c => c.id !== id).slice(0, 4);

  const handleLoadMoreQuestions = () => {
    setVisibleQuestions(prev => prev + 5);
  };

  return (
    <div className="min-h-screen bg-white pb-32">
      
      {/* 1. Header */}
      <section className={`${category.color.split(' ')[0]} pt-16 pb-20`}>
        <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
           <Link to="/" className="inline-block mb-8 text-slate-500 font-bold hover:text-brand-purple">
             ← Back Home
           </Link>
           <div className="text-6xl mb-6">{category.emoji}</div>
           <h1 className={`font-display text-5xl md:text-6xl font-bold mb-6 ${category.color.split(' ')[1]}`}>
             {category.name}
           </h1>
           <p className="text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed opacity-90">
             {category.description}
           </p>
        </div>
      </section>

      <div className="py-16 space-y-20">

        {/* 2. Questions Section */}
        <section className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12">
             <div className="flex items-center gap-4 mb-10">
                <span className="text-3xl">❓</span>
                <h2 className="font-display text-3xl font-bold text-slate-800">Questions</h2>
             </div>

             {questions.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {questions.slice(0, visibleQuestions).map((q, idx) => (
                            <QuestionCard key={idx} question={q} />
                        ))}
                    </div>
                    
                    {visibleQuestions < questions.length && (
                        <div className="mt-10 text-center">
                            <button 
                                onClick={handleLoadMoreQuestions}
                                className="inline-block px-8 py-3 rounded-full border-2 border-slate-200 text-slate-600 font-bold hover:border-brand-purple hover:text-brand-purple transition-colors"
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </>
             ) : (
                <div className="bg-slate-50 rounded-3xl p-12 text-center border border-slate-100 border-dashed">
                    <p className="text-xl text-slate-500 font-bold">More questions coming soon!</p>
                </div>
             )}
        </section>

        {/* 3. Videos Section */}
        <section className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center gap-4 mb-10">
             <span className="text-3xl">📺</span>
             <h2 className="font-display text-3xl font-bold text-slate-800">Watch & Learn</h2>
          </div>
          
          {videos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
               {videos.map((video, idx) => (
                  <VideoCard key={idx} video={video} fluid={true} />
               ))}
            </div>
          ) : (
             <div className="bg-slate-50 rounded-3xl p-12 text-center border border-slate-100 border-dashed">
                <p className="text-xl text-slate-500 font-bold">More videos coming soon to this category!</p>
             </div>
          )}
          
          <div className="mt-10 text-center">
             <Link to="/videos" className="inline-block px-8 py-3 rounded-full border-2 border-slate-200 text-slate-600 font-bold hover:border-brand-purple hover:text-brand-purple transition-colors">
               View all videos →
             </Link>
          </div>
        </section>

        {/* 4. Activities Section */}
        <section className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center gap-4 mb-10">
             <span className="text-3xl">✂️</span>
             <h2 className="font-display text-3xl font-bold text-slate-800">Try It at Home</h2>
          </div>
          
          {activities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
               {activities.map((activity, idx) => (
                  <ActivityCard key={idx} activity={activity} />
               ))}
            </div>
          ) : (
             <div className="bg-slate-50 rounded-3xl p-12 text-center border border-slate-100 border-dashed">
                <p className="text-xl text-slate-500 font-bold">New activities are being added weekly!</p>
             </div>
          )}

          <div className="mt-10 text-center">
             <Link to="/activities" className="inline-block px-8 py-3 rounded-full border-2 border-slate-200 text-slate-600 font-bold hover:border-brand-purple hover:text-brand-purple transition-colors">
               View all activities →
             </Link>
          </div>
        </section>

        {/* 5. Explore More Topics */}
        <section className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12">
           <div className="pt-10 border-t border-slate-100">
               <h2 className="font-display text-2xl font-bold text-slate-400 mb-8 uppercase tracking-wide text-center">
                  Explore More Topics
               </h2>
               <div className="flex flex-wrap justify-center gap-6">
                  {otherCategories.map(cat => (
                     <Link 
                       key={cat.id} 
                       to={`/category/${cat.id}`}
                       className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-blue hover:-translate-y-1 transition-all"
                     >
                        <span className="text-2xl">{cat.emoji}</span>
                        <span className="font-bold text-slate-700 text-lg">{cat.name}</span>
                     </Link>
                  ))}
               </div>
           </div>
        </section>

      </div>
    </div>
  );
};
