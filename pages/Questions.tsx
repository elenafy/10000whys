
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TOPICS, FILTER_AGES } from '../constants';
import { QuestionCard } from '../components/QuestionCard';
import { getApprovedQuestions } from '../services/questions';
import { QuestionData } from '../types';

export const Questions: React.FC = () => {
  const navigate = useNavigate();

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedAge, setSelectedAge] = useState('All');
  const [visibleCount, setVisibleCount] = useState(12);
  
  // Firebase data state
  const [allQuestions, setAllQuestions] = useState<QuestionData[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch questions from Firebase
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const questions = await getApprovedQuestions();
        setAllQuestions(questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Search Handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Filter Logic
  const checkAgeMatch = (qAge: string, filterAge: string) => {
      if (filterAge === 'All') return true;
      // Simple string match for MVP, can be expanded to range logic later
      return qAge.includes(filterAge) || qAge === filterAge;
  };

  const filteredQuestions = allQuestions.filter((q) => {
    if (!q) return false;
    const questionText = q.questionText ?? '';
    const topic = q.topic ?? '';
    const ageRange = q.ageRange ?? '';

    const matchesSearch = questionText.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = selectedTopic === 'All' || topic === selectedTopic;
    const matchesAge = checkAgeMatch(ageRange, selectedAge);
    return matchesSearch && matchesTopic && matchesAge;
  });

  // Pagination Handler
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  const isFiltering = searchQuery !== '' || selectedTopic !== 'All' || selectedAge !== 'All';

  return (
    <div className="min-h-screen bg-white pb-32">
        
        {/* 1. HEADER & SEARCH */}
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-12 text-center">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-slate-800 mb-8">
                All Curiosity Questions
            </h1>
            
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative group z-20">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for a question..."
                  className="w-full h-20 pl-10 pr-40 rounded-full border-2 border-slate-200 bg-white shadow-sm text-2xl focus:outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 transition-all placeholder:text-slate-400"
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-3 h-14 px-10 bg-brand-blue text-white font-bold rounded-full hover:bg-sky-400 hover:scale-105 active:scale-95 transition-all shadow-sm text-xl"
                >
                  Search
                </button>
            </form>
        </div>

        {/* 2. FILTERS */}
        <div className="border-b border-slate-50 mb-12 bg-white/95 backdrop-blur-sm sticky top-20 z-40 py-6">
            <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 space-y-6">
                
                {/* Topic Filter */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                    <span className="text-base font-bold text-slate-900 w-full sm:w-24 text-left sm:text-right uppercase tracking-wide pt-3">Topics</span>
                    <div className="flex flex-wrap gap-3 flex-grow w-full">
                        <button 
                            onClick={() => setSelectedTopic('All')}
                            className={`px-6 py-2.5 rounded-full font-bold text-lg transition-all border ${selectedTopic === 'All' ? 'bg-brand-blue/10 text-brand-blue border-brand-blue/20' : 'bg-slate-50 text-slate-900 border-transparent hover:bg-slate-100'}`}
                        >
                            All
                        </button>
                        {TOPICS.map(t => (
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

                {/* Age Filter */}
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

                {/* Sort (Visual Only for MVP) */}
                 <div className="flex justify-end pt-2">
                    <div className="flex items-center gap-2 text-slate-500 font-bold">
                        <span>Sort by:</span>
                        <select className="bg-transparent font-bold text-brand-purple border-none focus:ring-0 cursor-pointer">
                            <option>Popular ↓</option>
                            <option>Newest</option>
                            <option>A-Z</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 space-y-20">

            {/* 3. ALL QUESTIONS GRID */}
            <section id="all-questions" className="pt-4">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-5">
                         <h2 className="font-display text-3xl font-bold text-slate-800">
                            {isFiltering ? 'Filtered Results' : 'All Questions'}
                         </h2>
                         {isFiltering && (
                             <span className="bg-brand-blue/10 text-slate-700 px-4 py-1.5 rounded-full text-base font-bold">
                                 {filteredQuestions.length} found
                             </span>
                         )}
                    </div>
                </div>

                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div key={i} className="h-64 bg-slate-100 rounded-3xl animate-pulse"></div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8">
                    {filteredQuestions.slice(0, visibleCount).map((q) => (
                      <QuestionCard key={q.id} question={q} />
                    ))}
                  </div>
                )}

                {filteredQuestions.length === 0 && (
                     <div className="bg-slate-50 rounded-3xl p-16 text-center border border-slate-100 border-dashed">
                        <div className="text-6xl mb-6">🤔</div>
                        <p className="text-xl text-slate-500 font-bold mb-2">No questions found.</p>
                        <p className="text-lg text-slate-400">Try adjusting your filters or search terms.</p>
                    </div>
                )}

                {/* Load More Button */}
                {visibleCount < filteredQuestions.length && (
                    <div className="text-center mt-12">
                        <button 
                            onClick={handleLoadMore}
                            className="bg-white border-2 border-slate-200 text-slate-600 px-8 py-4 rounded-full font-bold text-lg hover:border-brand-purple hover:text-brand-purple transition-colors"
                        >
                            Load More Questions
                        </button>
                    </div>
                )}
            </section>
        </div>
    </div>
  );
};
