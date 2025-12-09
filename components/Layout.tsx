import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;
  const isWaitlist = location.pathname === '/waitlist';

  const handleSubscribe = (e: React.FormEvent) => {
      e.preventDefault();
      if(email) {
          setSubscribed(true);
          setEmail('');
      }
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-700 text-lg">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 shadow-sm">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-brand-yellow flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
              ?
            </div>
            <span className="font-display font-bold text-3xl tracking-tight text-brand-purple">
              10,000 <span className="text-brand-pink">Whys</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-10 font-bold text-lg">
            <Link 
              to="/" 
              className={`${isActive('/') ? 'text-brand-purple' : 'text-slate-500 hover:text-brand-purple'} transition-colors`}
            >
              Home
            </Link>
            <Link 
              to="/questions" 
              className={`${isActive('/questions') ? 'text-brand-purple' : 'text-slate-500 hover:text-brand-purple'} transition-colors`}
            >
              Questions
            </Link>
            <Link 
              to="/videos" 
              className={`${isActive('/videos') ? 'text-brand-purple' : 'text-slate-500 hover:text-brand-purple'} transition-colors`}
            >
              Videos
            </Link>
            <Link 
              to="/activities" 
              className={`${isActive('/activities') ? 'text-brand-purple' : 'text-slate-500 hover:text-brand-purple'} transition-colors`}
            >
              Activities
            </Link>
            <Link 
              to="/waitlist" 
              className={`${isActive('/waitlist') ? 'text-brand-purple' : 'text-slate-500 hover:text-brand-purple'} transition-colors`}
            >
              Weekly Packs
            </Link>
            <Link 
              to="/about" 
              className={`${isActive('/about') ? 'text-brand-purple' : 'text-slate-500 hover:text-brand-purple'} transition-colors`}
            >
              About
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          
          {/* Drawer */}
          <div className="absolute top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex justify-end mb-8">
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 font-display font-bold text-2xl">
              <Link to="/" className="text-slate-700 hover:text-brand-purple">Home</Link>
              <Link to="/questions" className="text-slate-700 hover:text-brand-purple">Questions</Link>
              <Link to="/videos" className="text-slate-700 hover:text-brand-purple">Videos</Link>
              <Link to="/activities" className="text-slate-700 hover:text-brand-purple">Activities</Link>
              <Link to="/waitlist" className="text-slate-700 hover:text-brand-purple">Weekly Packs</Link>
              <Link to="/about" className="text-slate-700 hover:text-brand-purple">About</Link>
            </nav>

            <div className="mt-auto pt-8 border-t border-slate-100">
              <button 
                  onClick={() => {
                      navigate('/');
                      setMobileMenuOpen(false);
                      setTimeout(() => document.querySelector('input')?.focus(), 100);
                  }}
                  className="w-full py-4 rounded-full bg-brand-blue text-white font-bold text-xl shadow-md active:scale-95 transition-transform"
              >
                  Ask a Question
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 mt-0 py-16">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12">
            
            <div className="flex flex-col items-center gap-16 mb-16">
                
                {/* Purple Waitlist Section (Hidden on Waitlist Page) */}
                {!isWaitlist && (
                    <div className="bg-brand-purple w-full max-w-4xl rounded-[3rem] p-12 text-center text-white shadow-sm">
                        <h3 className="font-display text-4xl font-bold mb-4">Want early access?</h3>
                        <p className="text-white/80 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                            Weekly Curiosity Packs are coming soon. Get simple activities and trusted videos delivered each week — free for early testers.
                        </p>
                        
                        {!subscribed ? (
                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4">
                                <input 
                                    type="email" 
                                    placeholder="Parent's email address" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-grow px-8 py-4 rounded-full border-none focus:outline-none focus:ring-4 focus:ring-white/30 text-slate-800 text-lg"
                                    required
                                />
                                <button 
                                    type="submit" 
                                    className="bg-brand-pink text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-pink-600 transition-colors whitespace-nowrap shadow-md"
                                >
                                    Join the Waitlist
                                </button>
                            </form>
                        ) : (
                            <div className="bg-white/10 text-white px-8 py-4 rounded-xl text-lg font-bold inline-block border border-white/20">
                                Thanks! You're on the list. 🚀
                            </div>
                        )}
                        <p className="text-white/60 text-sm font-bold mt-4">No spam. Opt out anytime.</p>
                    </div>
                )}

                {/* Primary CTAs (Hidden on Waitlist Page) */}
                {!isWaitlist && (
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button 
                            onClick={() => navigate('/activities')}
                            className="px-8 py-4 rounded-full border-2 border-slate-200 text-slate-600 font-bold hover:border-brand-purple hover:text-brand-purple transition-all text-lg"
                        >
                            Browse Activities
                        </button>
                        <button 
                            onClick={() => {
                                navigate('/');
                                setTimeout(() => document.querySelector('input')?.focus(), 100);
                            }}
                            className="px-8 py-4 rounded-full bg-brand-blue text-white font-bold hover:bg-sky-400 shadow-sm transition-all text-lg"
                        >
                            Ask a Question
                        </button>
                    </div>
                )}
            </div>

            <hr className="border-slate-100 mb-10" />

            <div className="flex flex-col items-center gap-8">
                <div className="flex flex-wrap justify-center gap-8 text-base font-bold text-slate-500">
                    <Link to="/" className="hover:text-brand-purple">Home</Link>
                    <Link to="/questions" className="hover:text-brand-purple">Questions</Link>
                    <Link to="/videos" className="hover:text-brand-purple">Videos</Link>
                    <Link to="/activities" className="hover:text-brand-purple">Activities</Link>
                    <Link to="/waitlist" className="hover:text-brand-purple">Weekly Packs</Link>
                    <Link to="/about" className="hover:text-brand-purple">About</Link>
                </div>
                
                <div className="text-center">
                    <p className="font-display font-bold text-xl text-slate-700">10,000 Whys</p>
                    <p className="text-sm text-slate-400 mt-1">
                        © 2026. Made for parents. Inspiring curious kids.
                    </p>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};