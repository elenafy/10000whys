
import React from 'react';
import { Link } from 'react-router-dom';
import { QuestionData } from '../types';

interface Props {
  question: QuestionData;
  featured?: boolean;
}

export const QuestionCard: React.FC<Props> = ({ question, featured = false }) => {
  return (
    <Link 
      to={`/q/${question.id}`} 
      state={{ questionData: question }} // Pass data to avoid re-fetch if possible
      className={`block group relative overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-slate-100 bg-white
        ${featured ? 'shadow-lg ring-4 ring-brand-yellow/20' : 'shadow-sm hover:shadow-md'}
      `}
    >
      <div className={`h-2 w-full ${featured ? 'bg-brand-pink' : 'bg-brand-blue'}`}></div>
      <div className="p-6">
        <div className="flex gap-2 mb-3">
            <span className="px-2 py-1 rounded-md bg-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wide">
                {question.topic}
            </span>
            <span className="px-2 py-1 rounded-md bg-brand-cream text-xs font-bold text-brand-purple uppercase tracking-wide">
                Age {question.ageRange}
            </span>
        </div>
        <h3 className="font-display text-xl md:text-2xl font-bold text-slate-800 leading-tight mb-6 group-hover:text-brand-purple transition-colors">
          {question.questionText}
        </h3>
        
        {/* Explanation removed to keep card concise */}

        <div className="mt-auto flex items-center justify-end text-brand-blue font-bold text-sm">
            <span>Discover Answer</span>
            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </div>
      </div>
    </Link>
  );
};
