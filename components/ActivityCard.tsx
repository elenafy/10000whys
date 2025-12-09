
import React from 'react';
import { Link } from 'react-router-dom';
import { Activity } from '../types';

interface Props {
  activity: Activity;
  compact?: boolean;
}

export const ActivityCard: React.FC<Props> = ({ activity, compact = false }) => {
  // Link to the detailed activity page
  const activityUrl = `/activities/${activity.id}`;

  return (
    <Link 
      to={activityUrl}
      className={`group block bg-white rounded-3xl border border-slate-100 flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-brand-purple/20 overflow-hidden ${compact ? 'shadow-sm' : 'shadow-sm'}`}
    >
      
      {/* Banner Image */}
      <div className={`relative ${compact ? 'h-48' : 'h-52'} bg-slate-100 overflow-hidden`}>
          {activity.imageUrl ? (
              <img 
                src={activity.imageUrl} 
                alt={activity.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
          ) : (
              <div className="w-full h-full bg-gradient-to-br from-brand-blue/10 to-brand-purple/10"></div>
          )}
          
          {/* Topic Badge Overlay */}
          <div className="absolute top-4 left-4">
             <span className="text-sm font-bold uppercase tracking-wider text-slate-600 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm">
                {activity.category || activity.topic}
             </span>
          </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-grow">
         <div className="flex items-start justify-between mb-3">
            <h4 className="font-display font-bold text-2xl md:text-3xl text-slate-800 leading-tight group-hover:text-brand-purple transition-colors">
                {activity.title}
            </h4>
         </div>
         
         {!compact && activity.subtitle && (
            <p className="text-base font-bold text-brand-blue mb-4">
                {activity.subtitle}
            </p>
         )}
         
         <p className="text-slate-500 text-lg leading-relaxed mb-6 line-clamp-3 flex-grow">
            {activity.description}
         </p>

         <div className="pt-5 border-t border-slate-50 flex items-center justify-between text-base font-bold text-slate-400">
             <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {activity.timeEstimate}
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-brand-cream text-sm font-bold text-brand-purple uppercase tracking-wide">
                    Age {activity.ageRange}
                </span>
             </div>
             
             {/* CTA */}
             <span className="text-brand-purple hover:underline whitespace-nowrap ml-3 text-lg">
                Explore →
             </span>
         </div>
      </div>
    </Link>
  );
};
