
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    FILTER_AGES, 
    SAMPLE_VIDEOS 
} from '../constants';
import { VideoCard } from '../components/VideoCard';

// New Topic Groupings for the UI
const VIDEO_TOPIC_FILTERS = [
    "Nature & Animals",
    "Space & Weather",
    "Everyday Science",
    "Feelings & People",
    "The World Around Us"
];

export const Videos: React.FC = () => {
  const navigate = useNavigate();
  
  // State for the filters
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedAge, setSelectedAge] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const clearFilters = () => {
      setSelectedTopic('All');
      setSelectedAge('All');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const isFiltering = selectedTopic !== 'All' || selectedAge !== 'All';

  // Helper function to check age match
  const checkAgeMatch = (videoAge: string | undefined, filterAge: string) => {
      if (filterAge === 'All') return true;
      if (!videoAge) return true; // Show if unsure
      
      const [vStart, vEnd] = videoAge.split('-').map(Number);
      const [fStart, fEnd] = filterAge.split('-').map(Number);
      
      if (!vEnd) return videoAge === filterAge;
      
      const maxStart = Math.max(vStart, fStart);
      const minEnd = Math.min(vEnd || 99, fEnd || 99);
      
      return maxStart < minEnd;
  };

  // Helper to map the new UI topics to the underlying data tags
  const checkTopicMatch = (videoTopic: string | undefined, filterTopic: string) => {
      if (filterTopic === 'All') return true;
      if (!videoTopic) return false;

      switch (filterTopic) {
          case "Nature & Animals":
              return ["Nature", "Animals"].includes(videoTopic);
          case "Space & Weather":
              return ["Space", "Weather"].includes(videoTopic);
          case "Everyday Science":
              return ["Science", "Engineering", "How Things Work", "Food & Nutrition"].includes(videoTopic);
          case "Feelings & People":
              return ["Human Body", "History", "Social"].includes(videoTopic);
          case "The World Around Us":
              return ["Nature", "History", "Places"].includes(videoTopic);
          default:
              return videoTopic === filterTopic;
      }
  };

  const displayedVideos = SAMPLE_VIDEOS.filter(v => {
      const topicMatch = checkTopicMatch(v.topic, selectedTopic);
      const ageMatch = checkAgeMatch(v.ageRange, selectedAge);
      
      return topicMatch && ageMatch;
  });

  const featuredVideos = SAMPLE_VIDEOS.slice(0, 4);

  return (
    <div className="min-h-screen bg-white pb-32">
        
        {/* 1. HERO SECTION */}
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-8 text-center">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-slate-800 mb-8">
                Curiosity-Sparking Videos
            </h1>
            
            <div className="max-w-4xl mx-auto space-y-8">
                <p className="text-slate-500 text-2xl leading-relaxed">
                    Short, visual explanations selected to help parents guide kids’ natural curiosity.
                </p>
            </div>
        </div>

        {/* SEARCH BAR */}
        <div className="max-w-3xl mx-auto px-6 mb-12 relative z-20">
            <form onSubmit={handleSearch} className="relative group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Why do cats purr?..."
                  className="w-full h-20 pl-10 pr-40 rounded-full border-2 border-slate-200 bg-white shadow-sm text-2xl focus:outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 transition-all placeholder:text-slate-400"
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-3 h-14 px-10 bg-brand-blue text-white font-bold rounded-full hover:bg-sky-400 hover:scale-105 active:scale-95 transition-all shadow-sm text-xl"
                >
                  Ask!
                </button>
            </form>
        </div>

        {/* 2. FILTERS */}
        <div className="border-b border-slate-50 mb-12 bg-white/95 backdrop-blur-sm z-30 py-8">
            <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 space-y-6">
                
                {/* Topic Row */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                    <span className="text-base font-bold text-slate-900 w-full sm:w-24 text-left sm:text-right uppercase tracking-wide pt-3">Topics</span>
                    <div className="flex flex-wrap gap-3 flex-grow w-full">
                        <button 
                            onClick={() => setSelectedTopic('All')}
                            className={`px-6 py-2.5 rounded-full font-bold text-lg transition-all border ${selectedTopic === 'All' ? 'bg-brand-blue/10 text-brand-blue border-brand-blue/20' : 'bg-slate-50 text-slate-900 border-transparent hover:bg-slate-100'}`}
                        >
                            All
                        </button>
                        {VIDEO_TOPIC_FILTERS.map(t => (
                            <button 
                                key={t}
                                onClick={() => setSelectedTopic(t)}
                                className={`px-6 py-2.5 rounded-full font-bold text-lg transition-all border ${
                                    selectedTopic === t
                                    ? 'bg-brand-blue/10 text-brand-blue border-brand-blue/20' 
                                    : 'bg-slate-50 text-slate-900 border-transparent hover:bg-slate-100'
                                }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Age Row */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                    <span className="text-base font-bold text-slate-900 w-full sm:w-24 text-left sm:text-right uppercase tracking-wide pt-3">Age</span>
                    <div className="flex flex-wrap gap-3 flex-grow w-full">
                        {FILTER_AGES.map(age => (
                            <button 
                                key={age}
                                onClick={() => setSelectedAge(age)}
                                className={`px-6 py-2.5 rounded-full font-bold text-lg transition-all border ${
                                    selectedAge === age
                                    ? 'bg-brand-purple/10 text-brand-purple border-brand-purple/20' 
                                    : 'bg-slate-50 text-slate-900 border-transparent hover:bg-slate-100'
                                }`}
                            >
                                {age}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 space-y-20">

            {/* 3. FEATURED VIDEOS (Only when not filtering) */}
            {!isFiltering && (
                <section>
                    <div className="flex items-center gap-4 mb-10 opacity-90">
                        <span className="text-3xl">⭐</span>
                        <h2 className="font-display text-3xl font-bold text-slate-800">Featured Videos</h2>
                    </div>
                    {/* Max 4 columns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {featuredVideos.map((video, idx) => (
                            <VideoCard key={`featured-${idx}`} video={video} fluid={true} />
                        ))}
                    </div>
                </section>
            )}

            {/* 4. ALL VIDEOS GRID */}
            <section id="video-grid" className="pt-8">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-5">
                         <h2 className="font-display text-3xl font-bold text-slate-800">
                            {isFiltering ? 'Filtered Results' : 'All Videos'}
                         </h2>
                         {isFiltering && (
                             <span className="bg-brand-blue/10 text-slate-700 px-4 py-1.5 rounded-full text-base font-bold">
                                 {displayedVideos.length} found
                             </span>
                         )}
                    </div>
                        
                    {isFiltering && (
                        <button 
                            onClick={clearFilters}
                            className="text-base bg-slate-100 text-slate-500 px-6 py-3 rounded-full hover:bg-slate-200 font-bold"
                        >
                            Clear All Filters
                        </button>
                    )}
                </div>
                
                {/* Max 4 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {displayedVideos.length > 0 ? (
                        displayedVideos.map((v, i) => (
                            <VideoCard key={i} video={v} fluid={true} />
                        ))
                    ) : (
                        <div className="col-span-full py-32 text-center rounded-[4rem] bg-slate-50 border border-slate-100 border-dashed">
                            <div className="text-7xl mb-6">📹</div>
                            <h3 className="font-display text-3xl font-bold text-slate-600 mb-4">No videos found...</h3>
                            <p className="text-slate-400 text-xl">Try choosing a different topic or age range!</p>
                            <button 
                                onClick={clearFilters}
                                className="mt-8 px-8 py-4 bg-white border border-slate-200 rounded-full text-base font-bold text-slate-600 hover:text-brand-purple"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

        </div>

        {/* 5. FOOTER CTA */}
        <section className="max-w-6xl mx-auto px-6 mt-32 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-brand-cream px-10 py-8 sm:py-5 rounded-[2rem] sm:rounded-full border border-brand-yellow/30 shadow-sm sm:whitespace-nowrap">
                <span className="text-brand-purple font-display font-bold text-xl">🎬 Want to do something instead?</span>
                <span className="text-slate-500 text-lg">Check out our off-screen activities!</span>
                <button 
                    onClick={() => navigate('/activities')} 
                    className="mt-2 sm:mt-0 sm:ml-6 text-base font-bold bg-white px-6 py-3 rounded-full text-brand-blue shadow-sm hover:scale-105 transition-transform"
                >
                    Activities →
                </button>
            </div>
        </section>

    </div>
  );
};
