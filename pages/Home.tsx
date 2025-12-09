
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    POPULAR_QUESTION_PILLS,
    CATEGORIES
} from '../constants';
import { VideoCard } from '../components/VideoCard';
import { ActivityCard } from '../components/ActivityCard';
import { QuestionCard } from '../components/QuestionCard';
import { getFeaturedQuestions } from '../services/questions';
import { getApprovedVideos } from '../services/videos';
import { getApprovedActivities } from '../services/activities';
import { QuestionData, Activity, VideoRecommendation } from '../types';

export const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobilePills, setShowMobilePills] = useState(false);
  const navigate = useNavigate();
  
  const renderCategoryIcon = (cat: typeof CATEGORIES[number]) => {
    if (cat.icon) {
      return (
        <img 
          src={cat.icon} 
          alt={`${cat.name} icon`} 
          className="w-9 h-9 object-contain drop-shadow-sm"
        />
      );
    }
    return <span className="text-2xl">{cat.emoji}</span>;
  };

  // Firebase data state
  const [featuredQuestions, setFeaturedQuestions] = useState<QuestionData[]>([]);
  const [videos, setVideos] = useState<VideoRecommendation[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [questions, videosData, activitiesData] = await Promise.all([
          getFeaturedQuestions(4),
          getApprovedVideos(),
          getApprovedActivities()
        ]);
        setFeaturedQuestions(questions);
        setVideos(videosData.slice(0, 4)); // Show first 4 videos
        setActivities(activitiesData.slice(0, 4)); // Show first 4 activities
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="space-y-16 pb-32">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-brand-cream pt-20 pb-12 rounded-b-[4rem] shadow-sm overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-blue/10 rounded-full blur-3xl -ml-16 -mb-16"></div>

        <div className="max-w-[1800px] mx-auto px-6 text-center relative z-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
            Spark your child’s <span className="text-brand-pink">curiosity</span> — <span className="text-brand-blue">together</span>.
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Short videos and hands-on activities that help parents guide kids (ages 3–8) as they explore big ideas about the world.
          </p>

          <div className="mb-8">
             <button 
                onClick={() => navigate('/waitlist')}
                className="bg-brand-purple text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-800 hover:scale-105 transition-all shadow-md"
             >
                Join the Weekly Curiosity Packs Waitlist
             </button>
          </div>
          
          <p className="text-lg font-bold text-slate-500 mb-3">Search for a question or explore below:</p>

          <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative group mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Why is the sky blue?..."
              className="w-full h-20 pl-10 pr-40 rounded-full border-2 border-slate-200 bg-white shadow-sm text-2xl focus:outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 transition-all placeholder:text-slate-400"
            />
            <button 
              type="submit"
              className="absolute right-3 top-3 h-14 px-10 bg-brand-blue text-white font-bold rounded-full hover:bg-sky-400 hover:scale-105 active:scale-95 transition-all shadow-sm text-xl"
            >
              Ask!
            </button>
          </form>

          {/* Popular Question Pills */}
          <div className="mb-0">
            <button 
                onClick={() => setShowMobilePills(!showMobilePills)}
                className="sm:hidden text-brand-purple font-bold text-lg mb-4 underline decoration-brand-purple/30 underline-offset-4"
            >
                {showMobilePills ? 'Hide Ideas' : 'Show Question Ideas'}
            </button>
            <div className={`flex-wrap justify-center gap-4 ${showMobilePills ? 'flex' : 'hidden sm:flex'}`}>
                {POPULAR_QUESTION_PILLS.map((q, idx) => (
                    <button
                        key={idx}
                        onClick={() => navigate(`/search?q=${encodeURIComponent(q)}`)}
                        className="px-6 py-3 rounded-full bg-white border border-brand-blue/20 text-slate-600 text-lg font-bold hover:bg-brand-blue/5 hover:border-brand-blue/50 transition-colors shadow-sm"
                    >
                        {q}
                    </button>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. POPULAR QUESTIONS */}
      <section className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
             <h2 className="font-display text-3xl font-bold text-slate-800">
                 Popular Questions
             </h2>
             <button 
                  onClick={() => navigate('/questions')}
                  className="text-lg font-bold text-slate-500 hover:text-brand-purple transition-colors flex items-center gap-2"
              >
                  Browse All Questions →
              </button>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 bg-slate-100 rounded-3xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8">
              {featuredQuestions.map((q) => (
                <QuestionCard key={q.id} question={q} />
              ))}
            </div>
          )}
      </section>

      {/* 3. EXPLORE BY TOPIC */}
      <section className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="font-display text-3xl font-bold text-slate-500 mb-6 uppercase tracking-wide text-center">
              Explore by Topic
          </h2>
          <div className="flex flex-wrap justify-center gap-3 md:gap-5">
              {CATEGORIES.map((cat, idx) => (
                  <button 
                    key={idx}
                    onClick={() => navigate(`/category/${cat.id}`)}
                    className="px-6 py-3 md:px-8 md:py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 font-bold hover:bg-white hover:border-brand-purple hover:text-brand-purple hover:shadow-md transition-all active:scale-95 text-lg md:text-xl flex items-center gap-3"
                  >
                      {renderCategoryIcon(cat)}
                      <span>{cat.name}</span>
                  </button>
              ))}
          </div>
      </section>

      {/* 4. EXPLORE THROUGH VIDEOS */}
      <section className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12">
         <div className="mb-8 text-left w-full">
            <h2 className="font-display text-3xl font-bold text-slate-800 mb-4 flex items-center gap-3 justify-start">
                ⭐ Explore Through Videos
            </h2>
            <p className="text-xl text-slate-600 w-full text-left">
                Kids ask incredible questions — every day. These kid-friendly, parent-approved videos explain big ideas in simple, visual ways so you can watch together and keep their curiosity glowing.
            </p>
         </div>
         
         {loading ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
             {[1, 2, 3, 4].map((i) => (
               <div key={i} className="h-64 bg-slate-100 rounded-3xl animate-pulse"></div>
             ))}
           </div>
         ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
             {videos.map((video) => (
               <VideoCard key={video.id || video.youtubeQuery} video={video} fluid={true} />
             ))}
           </div>
         )}

         <div className="text-center">
            <button 
                onClick={() => navigate('/videos')}
                className="text-lg font-bold bg-white border-2 border-slate-200 px-8 py-3 rounded-full text-slate-700 hover:border-brand-blue hover:text-brand-blue transition-colors"
            >
                Browse Videos →
            </button>
         </div>
      </section>

      {/* 5. LEARN THROUGH ACTIVITIES */}
      <section className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mb-8 text-left w-full">
            <h2 className="font-display text-3xl font-bold text-slate-800 mb-4 flex items-center gap-3 justify-start">
               ⭐ Learn Through Activities
            </h2>
            <p className="text-xl text-slate-600 w-full text-left">
                Hands-on activities that turn curiosity into exploration. Each one is designed for parents and kids to try together — with simple steps and everyday materials.
            </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-slate-100 rounded-3xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8">
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} compact={true} />
            ))}
          </div>
        )}

        <div className="text-center">
            <button 
                onClick={() => navigate('/activities')}
                className="text-lg font-bold bg-white border-2 border-slate-200 px-8 py-3 rounded-full text-slate-700 hover:border-brand-blue hover:text-brand-blue transition-colors"
            >
                Explore Activities →
            </button>
         </div>
      </section>

      {/* 6. OUR MISSION */}
      <section className="max-w-4xl mx-auto px-6 text-center py-12">
          <h2 className="font-display text-3xl font-bold text-slate-800 mb-6">Our Mission</h2>
          <p className="text-2xl font-display text-slate-600 italic leading-relaxed">
             "To help parents raise curious, confident thinkers — one question, one activity, one shared moment at a time."
          </p>
      </section>

    </div>
  );
};
