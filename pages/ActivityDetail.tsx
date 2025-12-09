
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SAMPLE_ACTIVITIES } from '../constants';

export const ActivityDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const activity = SAMPLE_ACTIVITIES.find(a => a.id === id);

  if (!activity) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-4xl font-display font-bold text-slate-800 mb-4">Activity Not Found</h1>
        <p className="text-xl text-slate-500 mb-8">We couldn't find the activity you were looking for.</p>
        <button 
          onClick={() => navigate('/activities')}
          className="px-8 py-4 bg-brand-blue text-white rounded-full font-bold hover:bg-sky-400 transition-colors"
        >
          Back to Activities
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-32">
      
      {/* A. HERO SECTION */}
      <section className="bg-brand-cream border-b border-brand-yellow/10 pt-16 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
           <Link to="/activities" className="inline-flex items-center text-brand-purple font-bold mb-8 hover:underline">
              ← Back to Activities
           </Link>

           <div className="flex flex-col md:flex-row gap-10 items-start">
             <div className="flex-1">
                <div className="flex flex-wrap gap-3 mb-6">
                    <span className="px-3 py-1.5 rounded-lg bg-brand-blue/10 text-brand-blue text-sm font-bold uppercase tracking-wide">
                        {activity.category || activity.topic}
                    </span>
                    {activity.skills?.map(skill => (
                        <span key={skill} className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 text-sm font-bold uppercase tracking-wide">
                            {skill}
                        </span>
                    ))}
                </div>
                
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-slate-800 mb-6 leading-tight">
                    {activity.title}
                </h1>
                <p className="text-2xl md:text-3xl text-slate-600 leading-relaxed max-w-3xl">
                    {activity.description}
                </p>
             </div>
             
             {/* Hero Image */}
             {activity.imageUrl && (
                 <div className="w-full md:w-1/3 aspect-video md:aspect-square rounded-3xl overflow-hidden shadow-lg border-4 border-white rotate-2 hover:rotate-0 transition-transform duration-500">
                     <img src={activity.imageUrl} alt={activity.title} className="w-full h-full object-cover" />
                 </div>
             )}
           </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
            
            {/* LEFT COLUMN (Main Content) */}
            <div className="lg:col-span-2 space-y-16">
                
                {/* B. CURIOSITY SPARK */}
                {activity.curiositySpark && (
                    <section className="bg-brand-yellow/10 rounded-3xl p-8 border border-brand-yellow/20">
                        <h2 className="font-display text-2xl font-bold text-slate-800 mb-2 flex items-center gap-3">
                            ✨ Curiosity Spark
                        </h2>
                        <p className="text-xl text-slate-700 italic font-medium">
                            "{activity.curiositySpark}"
                        </p>
                    </section>
                )}

                {/* D. MATERIALS LIST */}
                <section>
                    <h2 className="font-display text-3xl font-bold text-slate-800 mb-8 border-b border-slate-100 pb-4">
                        What You’ll Need
                    </h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {activity.materials.map((item, i) => (
                            <li key={i} className="flex items-center gap-4 text-lg text-slate-600 bg-slate-50 p-4 rounded-xl">
                                <span className="w-8 h-8 rounded-full bg-brand-blue/20 text-brand-blue flex items-center justify-center font-bold">✓</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* E. STEPS */}
                {activity.steps && (
                    <section>
                        <h2 className="font-display text-3xl font-bold text-slate-800 mb-8 border-b border-slate-100 pb-4">
                            How to Do It
                        </h2>
                        <div className="space-y-8">
                            {activity.steps.map((step, i) => (
                                <div key={i} className="flex gap-6">
                                    <div className="flex-shrink-0 w-12 h-12 bg-brand-purple text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-sm">
                                        {i + 1}
                                    </div>
                                    <p className="text-xl text-slate-700 leading-relaxed pt-2">
                                        {step}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* F. TALK WHILE YOU EXPLORE */}
                {activity.prompts && (
                    <section className="bg-brand-blue/5 rounded-[2.5rem] p-10 border border-brand-blue/10">
                        <h2 className="font-display text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                            💬 Talk While You Explore
                        </h2>
                        <ul className="space-y-4">
                            {activity.prompts.map((prompt, i) => (
                                <li key={i} className="flex items-start gap-4 text-xl text-slate-600">
                                    <span className="text-brand-blue mt-1 text-2xl">•</span>
                                    {prompt}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* I. PARENT CONTEXT */}
                {activity.parentContext && (
                    <section className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100">
                        <div className="flex items-center gap-4 mb-4">
                             <span className="text-3xl">🧠</span>
                             <h2 className="font-display text-3xl font-bold text-slate-800">For You as a Parent</h2>
                        </div>
                        <p className="text-xl text-slate-600 leading-relaxed">
                            {activity.parentContext}
                        </p>
                    </section>
                )}

                 {/* H. EXTENSIONS */}
                {activity.extensions && (
                    <section>
                        <h2 className="font-display text-3xl font-bold text-slate-800 mb-6">
                            Try Next Time
                        </h2>
                        <ul className="space-y-4">
                            {activity.extensions.map((ext, i) => (
                                <li key={i} className="flex items-start gap-4 text-xl text-slate-600">
                                    <span className="text-brand-green mt-1 text-2xl">➜</span>
                                    {ext}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>

            {/* RIGHT COLUMN (Sidebar) */}
            <div className="lg:col-span-1 space-y-8">
                
                {/* C. QUICK DETAILS BOX */}
                <div className="bg-white border border-slate-100 shadow-lg rounded-[2.5rem] p-8 sticky top-24">
                    <h3 className="font-display text-2xl font-bold text-slate-800 mb-6">Quick Details</h3>
                    
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-brand-cream flex items-center justify-center text-2xl">👶</div>
                            <div>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Ages</p>
                                <p className="text-xl font-bold text-slate-700">{activity.ageRange} Years</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-brand-cream flex items-center justify-center text-2xl">⏱️</div>
                            <div>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Time</p>
                                <p className="text-xl font-bold text-slate-700">{activity.timeEstimate}</p>
                            </div>
                        </div>

                        {activity.messLevel && (
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-brand-cream flex items-center justify-center text-2xl">🧹</div>
                                <div>
                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Mess Level</p>
                                    <p className="text-xl font-bold text-slate-700">{activity.messLevel}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <hr className="my-8 border-slate-100" />
                    
                    <button 
                         onClick={() => window.print()}
                         className="w-full py-4 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:border-brand-blue hover:text-brand-blue transition-colors flex items-center justify-center gap-2"
                    >
                        🖨️ Print Activity
                    </button>
                </div>
            </div>
        </div>

        {/* J. BOTTOM NAV */}
        <div className="mt-24 pt-12 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-6">
             <Link to="/activities" className="text-xl font-bold text-slate-500 hover:text-brand-purple transition-colors">
                ← Back to All Activities
             </Link>
             
             {activity.relatedQuestionId && (
                 <Link 
                    to={`/q/${activity.relatedQuestionId}`}
                    className="px-8 py-4 bg-brand-blue text-white rounded-full font-bold text-xl hover:bg-sky-400 shadow-md hover:scale-105 transition-all"
                 >
                    See the "Why" Behind This →
                 </Link>
             )}
        </div>

      </div>
    </div>
  );
};
