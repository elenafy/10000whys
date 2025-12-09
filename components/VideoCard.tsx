
import React from 'react';
import { VideoRecommendation } from '../types';

interface Props {
  video: VideoRecommendation;
  fluid?: boolean;
}

export const VideoCard: React.FC<Props> = ({ video, fluid = false }) => {
  return (
    <a 
      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(video.youtubeQuery)}`}
      target="_blank" 
      rel="noopener noreferrer"
      className={`block group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 flex flex-col ${fluid ? 'w-full' : 'min-w-[400px] w-[400px] snap-start'}`}
    >
      <div className={`relative ${fluid ? 'aspect-video' : 'h-48'} bg-slate-200 overflow-hidden shrink-0`}>
        {video.thumbnailUrl ? (
          <img 
            src={video.thumbnailUrl} 
            alt={video.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 group-hover:from-brand-blue/20 group-hover:to-brand-purple/20 transition-colors"></div>
        )}
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
             <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center text-brand-pink shadow-md group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
        </div>
        
        {video.duration && (
            <span className="absolute bottom-3 right-3 bg-black/70 text-white text-sm font-bold px-3 py-1.5 rounded-lg backdrop-blur-sm">
                {video.duration}
            </span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h5 className="font-display font-bold text-slate-800 text-xl leading-tight mb-2 line-clamp-2 group-hover:text-brand-blue">{video.title}</h5>
        <p className="text-base text-slate-500 font-bold mb-4">{video.channelName}</p>
        
        {/* Badges for grid view */}
        {(video.topic || video.ageRange) && (
            <div className="mt-auto flex flex-wrap gap-2">
                {video.topic && (
                    <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-sm font-bold text-slate-600 uppercase tracking-wide">
                        {video.topic}
                    </span>
                )}
                {video.ageRange && (
                    <span className="px-3 py-1.5 rounded-lg bg-brand-cream text-sm font-bold text-brand-purple uppercase tracking-wide">
                        Age {video.ageRange}
                    </span>
                )}
            </div>
        )}
      </div>
    </a>
  );
};
