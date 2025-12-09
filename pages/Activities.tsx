
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACTIVITY_CATEGORIES, FILTER_AGES, FILTER_TIMES } from '../constants';
import { ActivityCard } from '../components/ActivityCard';
import { Activity } from '../types';
import { getApprovedActivities } from '../services/activities';

export const Activities: React.FC = () => {
  const navigate = useNavigate();
  
  // State for the 3 main filters
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedAge, setSelectedAge] = useState('All');
  const [selectedTime, setSelectedTime] = useState('All');
  
  // Firebase data state
  const [allActivities, setAllActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch activities from Firebase
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const activities = await getApprovedActivities();
        setAllActivities(activities);
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Quick collections configuration (shortcuts that set specific filters)
  const quickCollections = [
      { 
          id: 'quick', 
          label: '⚡️ Quick 5-Min', 
          action: () => { setSelectedTime('5-10 min'); setSelectedAge('All'); setSelectedTopic('All'); }
      },
      { 
          id: 'weekend', 
          label: '🛠️ Weekend Projects', 
          action: () => { setSelectedTime('20+ min'); setSelectedAge('All'); setSelectedTopic('All'); }
      },
      { 
          id: 'outdoor', 
          label: '🌳 Outdoor Fun', 
          action: () => { setSelectedTopic('Outdoor'); setSelectedAge('All'); setSelectedTime('All'); }
      },
      { 
          id: 'preschool', 
          label: '👶 Ages 3-5', 
          action: () => { setSelectedAge('3-5'); setSelectedTopic('All'); setSelectedTime('All'); }
      },
  ];

  // Helper function to check if an activity matches the selected time filter
  const checkTimeMatch = (activityTime: string, filterTime: string) => {
      if (filterTime === 'All') return true;
      
      // Simple string matching logic for MVP
      if (filterTime === '5-10 min') return activityTime.includes('5-10');
      if (filterTime === '10-20 min') return activityTime.includes('15-30') || activityTime.includes('10'); 
      if (filterTime === '20+ min') return activityTime.includes('30') || activityTime.includes('+');
      return false;
  };

  // Helper function to check if an activity matches the selected age filter
  const checkAgeMatch = (activityAge: string, filterAge: string) => {
      if (filterAge === 'All') return true;
      
      const [actStart, actEnd] = activityAge.split('-').map(Number);
      const [filtStart, filtEnd] = filterAge.split('-').map(Number);
      
      if (!actEnd) return activityAge === filterAge; 
      
      const maxStart = Math.max(actStart, filtStart);
      const minEnd = Math.min(actEnd || 99, filtEnd || 99);
      
      return maxStart < minEnd;
  };

  // Compute displayed activities based on ALL selected filters
  const displayedActivities = allActivities.filter(a => {
      const topicMatch = selectedTopic === 'All' || a.category === selectedTopic || a.topic === selectedTopic;
      const ageMatch = checkAgeMatch(a.ageRange, selectedAge);
      const timeMatch = checkTimeMatch(a.timeEstimate, selectedTime);
      
      return topicMatch && ageMatch && timeMatch;
  });

  const isFiltering = selectedTopic !== 'All' || selectedAge !== 'All' || selectedTime !== 'All';

  const clearFilters = () => {
      setSelectedTopic('All');
      setSelectedAge('All');
      setSelectedTime('All');
  };

  // Recommended activities (Featured Today)
  const recommendedActivities = allActivities.slice(0, 4);

  return (
    <div className="min-h-screen bg-white pb-32">
        
        {/* 1. HERO SECTION (Calm) */}
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-12 text-center">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-slate-800 mb-6">
                Activities to Explore Together
            </h1>
            <p className="text-slate-500 text-2xl max-w-4xl mx-auto leading-relaxed">
                Hands-on activities designed for parents and kids to explore big ideas together — with simple steps, everyday materials, and opportunities to spark deeper curiosity.
            </p>
        </div>

        {/* 2. MULTI-ROW FILTERS */}
        <div className="border-b border-slate-50 mb-12 bg-white/95 backdrop-blur-sm z-30 py-8">
            <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 space-y-6">
                
                {/* Topic Row */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                    <span className="text-base font-bold text-slate-900 w-full sm:w-24 text-left sm:text-right uppercase tracking-wide pt-3">Topic</span>
                    <div className="flex flex-wrap gap-3 flex-grow w-full">
                        {ACTIVITY_CATEGORIES.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setSelectedTopic(cat)}
                                className={`px-6 py-2.5 rounded-full font-bold text-lg transition-all border ${
                                    selectedTopic === cat
                                    ? 'bg-brand-blue/10 text-brand-blue border-brand-blue/20' 
                                    : 'bg-slate-50 text-slate-900 border-transparent hover:bg-slate-100'
                                }`}
                            >
                                {cat}
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

                {/* Time Row */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                    <span className="text-base font-bold text-slate-900 w-full sm:w-24 text-left sm:text-right uppercase tracking-wide pt-3">Time</span>
                    <div className="flex flex-wrap gap-3 flex-grow w-full">
                        {FILTER_TIMES.map(time => (
                            <button 
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`px-6 py-2.5 rounded-full font-bold text-lg transition-all border ${
                                    selectedTime === time
                                    ? 'bg-brand-green/10 text-brand-green border-brand-green/20' 
                                    : 'bg-slate-50 text-slate-900 border-transparent hover:bg-slate-100'
                                }`}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>

        <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 space-y-20">

            {/* 3. FEATURED TODAY (Only show when no filters are active) */}
            {!isFiltering && (
                <section>
                    <div className="flex items-center gap-4 mb-10 opacity-90">
                        <span className="text-3xl">🌟</span>
                        <h2 className="font-display text-3xl font-bold text-slate-800">Recommended for Today</h2>
                    </div>
                    {loading ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="h-64 bg-slate-100 rounded-3xl animate-pulse"></div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {recommendedActivities.map((activity) => (
                          <ActivityCard key={activity.id} activity={activity} />
                        ))}
                      </div>
                    )}
                </section>
            )}

            {/* 4. QUICK COLLECTIONS (Only show when no filters are active) */}
            {!isFiltering && (
                <section>
                    <h2 className="font-display text-3xl font-bold text-slate-800 mb-10 opacity-90">
                        Try These Quick Collections
                    </h2>
                    {/* Adjusted column count for better sizing */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                        {quickCollections.map((col) => (
                            <button
                                key={col.id}
                                onClick={() => { col.action(); document.getElementById('activity-grid')?.scrollIntoView({ behavior: 'smooth' }); }}
                                className="group relative overflow-hidden bg-white border border-slate-200 rounded-3xl p-8 text-left hover:border-brand-purple/50 hover:shadow-lg transition-all"
                            >
                                <span className="block font-bold text-xl text-slate-700 group-hover:text-brand-purple transition-colors">
                                    {col.label}
                                </span>
                                <span className="text-base text-slate-400 font-bold mt-3 inline-block">View Activities →</span>
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {/* 5. ALL ACTIVITIES (Main Grid) */}
            <section id="activity-grid" className="pt-8">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-5">
                         <h2 className="font-display text-3xl font-bold text-slate-800">
                            {isFiltering ? 'Filtered Results' : 'All Activities'}
                         </h2>
                         {isFiltering && (
                             <span className="bg-brand-yellow/20 text-slate-700 px-4 py-1.5 rounded-full text-base font-bold">
                                 {displayedActivities.length} found
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
                
                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div key={i} className="h-64 bg-slate-100 rounded-3xl animate-pulse"></div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {displayedActivities.length > 0 ? (
                        displayedActivities.map((act) => (
                            <ActivityCard key={act.id} activity={act} />
                        ))
                    ) : (
                        <div className="col-span-full py-32 text-center rounded-[4rem] bg-slate-50 border border-slate-100 border-dashed">
                            <div className="text-7xl mb-6">🍃</div>
                            <h3 className="font-display text-3xl font-bold text-slate-600 mb-4">Quiet in here...</h3>
                            <p className="text-slate-500 text-xl">No activities match these filters. Try adjusting them!</p>
                            <button 
                                onClick={clearFilters}
                                className="mt-8 px-8 py-4 bg-white border border-slate-200 rounded-full text-base font-bold text-slate-600 hover:text-brand-purple"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                  </div>
                )}
            </section>

        </div>

        {/* 6. FOOTER CTA */}
        <section className="max-w-6xl mx-auto px-6 mt-32 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-brand-cream px-10 py-8 sm:py-5 rounded-[2rem] sm:rounded-full border border-brand-yellow/30 shadow-sm sm:whitespace-nowrap">
                <span className="text-brand-purple font-display font-bold text-xl">🌟 Looking for more?</span>
                <span className="text-slate-500 text-lg">Discover a new "Why?" question today!</span>
                <button 
                    onClick={() => navigate('/')} 
                    className="mt-2 sm:mt-0 sm:ml-6 text-base font-bold bg-white px-6 py-3 rounded-full text-brand-blue shadow-sm hover:scale-105 transition-transform"
                >
                    Go Home →
                </button>
            </div>
        </section>

    </div>
  );
};
