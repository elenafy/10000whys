
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NoCuratedResult: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-6 py-12">
      <div className="bg-brand-cream rounded-[3rem] p-12 md:p-16 max-w-3xl border border-brand-yellow/20 shadow-sm">
        <div className="text-7xl mb-8">🤔</div>
        
        <h1 className="font-display text-3xl md:text-4xl font-bold text-slate-800 mb-6 leading-tight">
          We’re still exploring this question!
        </h1>
        
        <p className="text-xl text-slate-600 mb-10 leading-relaxed font-medium">
          We don’t have our curated content for this yet — but your search helps us choose what to curate next. 💛
        </p>
        
        <button 
          onClick={() => navigate('/')}
          className="bg-brand-blue text-white px-10 py-4 rounded-full font-bold text-xl hover:bg-sky-400 hover:scale-105 transition-all shadow-md active:scale-95"
        >
          Explore related topics
        </button>
      </div>
    </div>
  );
};
