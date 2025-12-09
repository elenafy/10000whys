
import React, { useState } from 'react';

export const Waitlist: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans text-slate-700">
      
      {/* 1. HERO SECTION */}
      <section className="bg-brand-cream pt-24 pb-24 rounded-b-[4rem] relative overflow-hidden">
        {/* Soft decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-blue/10 rounded-full blur-3xl -ml-16 -mb-16"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="inline-block py-2 px-6 rounded-full bg-brand-purple/10 text-brand-purple font-bold text-lg mb-8 uppercase tracking-wide">
            Coming Soon
          </span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-slate-800 mb-8 leading-tight">
            Weekly Curiosity Packs for <span className="text-brand-blue">Busy Parents</span>
          </h1>
          <p className="text-2xl md:text-3xl text-slate-500 mb-12 leading-relaxed max-w-3xl mx-auto">
            Simple, screen-smart science fun for ages 3–8. Hand-picked videos and easy activities delivered weekly.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4 mb-6">
              <input 
                type="email" 
                placeholder="Your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-8 py-5 rounded-full border-2 border-slate-200 text-xl focus:outline-none focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10"
                required
              />
              <button 
                type="submit" 
                className="bg-brand-purple text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-purple-800 hover:scale-105 transition-all shadow-md whitespace-nowrap"
              >
                Join the Waitlist
              </button>
            </form>
          ) : (
            <div className="bg-green-50 text-green-700 px-10 py-6 rounded-3xl text-xl font-bold inline-block border border-green-200 mb-6">
              Thanks! You're on the list. 🚀
            </div>
          )}
          
          <p className="text-slate-400 text-lg font-bold">
            Early packs will be free for testers. Cancel anytime.
          </p>
        </div>
      </section>

      {/* 2. WHY THIS EXISTS */}
      <section className="py-24 max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-display text-4xl font-bold text-slate-800 mb-8">
          Because Curiosity Shouldn't Be Hard Work
        </h2>
        <div className="prose prose-xl mx-auto text-slate-600 leading-relaxed">
          <p className="mb-6">
            We know you want to support your child's endless "Why?" questions. But finding safe, educational videos takes time you don't always have. And planning hands-on activities? That usually means scrolling Pinterest for hours and buying supplies you'll only use once.
          </p>
          <p>
            The Weekly Curiosity Pack solves this. We do the searching, vetting, and planning. You get a simple, ready-to-go plan that turns screen time into quality time—without the stress.
          </p>
        </div>
      </section>

      {/* 3. WHAT'S INSIDE */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-slate-800 mb-4">What's Inside a Pack?</h2>
            <p className="text-slate-500 text-xl font-bold">All delivered once a week. Use them anytime.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:-translate-y-2 transition-transform text-center">
              <div className="w-20 h-20 bg-brand-yellow/20 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto">🦖</div>
              <h3 className="font-bold text-2xl text-slate-800 mb-4">1 Weekly Theme</h3>
              <p className="text-lg text-slate-500">Exciting topics like Rainbows, Shadows, Volcanoes, or Animals to spark interest.</p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:-translate-y-2 transition-transform text-center">
              <div className="w-20 h-20 bg-brand-blue/20 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto">📺</div>
              <h3 className="font-bold text-2xl text-slate-800 mb-4">2–3 Curated Videos</h3>
              <p className="text-lg text-slate-500">Safe, checked videos from trusted channels. No ads, no scary surprises.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:-translate-y-2 transition-transform text-center">
              <div className="w-20 h-20 bg-brand-green/20 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto">✂️</div>
              <h3 className="font-bold text-2xl text-slate-800 mb-4">2–3 Simple Activities</h3>
              <p className="text-lg text-slate-500">Screen-free fun using simple items you already have at home.</p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:-translate-y-2 transition-transform text-center">
              <div className="w-20 h-20 bg-brand-pink/20 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto">🧠</div>
              <h3 className="font-bold text-2xl text-slate-800 mb-4">Mini Parent Guide</h3>
              <p className="text-lg text-slate-500">Cheat sheets explaining the science in simple words so you look like a genius.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHO IT'S FOR */}
      <section className="py-24 max-w-4xl mx-auto px-6">
        <div className="bg-brand-cream rounded-[3rem] p-12 md:p-16 border border-brand-yellow/20 text-center">
          <h2 className="font-display text-3xl font-bold text-slate-800 mb-10">Who is this for?</h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 text-left max-w-2xl mx-auto mb-10">
            <div className="flex items-start gap-4">
               <div className="mt-1 w-6 h-6 rounded-full bg-brand-green flex items-center justify-center text-white text-sm font-bold">✓</div>
               <span className="text-xl text-slate-700 font-bold">Parents of curious kids ages 3–8</span>
            </div>
            <div className="flex items-start gap-4">
               <div className="mt-1 w-6 h-6 rounded-full bg-brand-green flex items-center justify-center text-white text-sm font-bold">✓</div>
               <span className="text-xl text-slate-700 font-bold">Families wanting simple, no-prep ideas</span>
            </div>
            <div className="flex items-start gap-4">
               <div className="mt-1 w-6 h-6 rounded-full bg-brand-green flex items-center justify-center text-white text-sm font-bold">✓</div>
               <span className="text-xl text-slate-700 font-bold">Parents seeking screen-smart learning</span>
            </div>
            <div className="flex items-start gap-4">
               <div className="mt-1 w-6 h-6 rounded-full bg-brand-green flex items-center justify-center text-white text-sm font-bold">✓</div>
               <span className="text-xl text-slate-700 font-bold">Caregivers wanting light structure</span>
            </div>
          </div>
          <p className="text-slate-500 text-xl italic font-medium">
            "Not a curriculum. Not another app. Just a small spark of wonder each week."
          </p>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl font-bold text-slate-800 mb-16">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
             {/* Connecting Line (Desktop) */}
             <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-slate-100 -z-10"></div>

             <div className="relative">
                <div className="w-24 h-24 bg-white border-4 border-slate-100 rounded-full flex items-center justify-center text-3xl font-bold text-brand-purple mx-auto mb-6 shadow-sm z-10">1</div>
                <h3 className="font-bold text-2xl text-slate-800 mb-3">Join the Waitlist</h3>
                <p className="text-lg text-slate-500">Sign up below to secure your spot as an early tester.</p>
             </div>

             <div className="relative">
                <div className="w-24 h-24 bg-white border-4 border-slate-100 rounded-full flex items-center justify-center text-3xl font-bold text-brand-purple mx-auto mb-6 shadow-sm z-10">2</div>
                <h3 className="font-bold text-2xl text-slate-800 mb-3">Get Early Access</h3>
                <p className="text-lg text-slate-500">Receive free sample Curiosity Packs directly in your inbox.</p>
             </div>

             <div className="relative">
                <div className="w-24 h-24 bg-white border-4 border-slate-100 rounded-full flex items-center justify-center text-3xl font-bold text-brand-purple mx-auto mb-6 shadow-sm z-10">3</div>
                <h3 className="font-bold text-2xl text-slate-800 mb-3">Shape the Future</h3>
                <p className="text-lg text-slate-500">Share your feedback to help us build the perfect version.</p>
             </div>
          </div>

          <div className="mt-16">
             <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-brand-blue text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-sky-400 shadow-md transition-all"
             >
                Join the Waitlist
             </button>
          </div>
        </div>
      </section>

      {/* 6. WHAT THIS IS NOT */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
           <div className="bg-white rounded-[3rem] border border-slate-100 p-12 md:p-16 text-center shadow-sm">
               <h2 className="font-display text-3xl font-bold text-slate-800 mb-10">What This Is NOT</h2>
               <div className="flex flex-col gap-4 items-center mb-10">
                   <div className="flex items-center gap-4 text-xl text-slate-500">
                       <span className="text-red-400 font-bold text-2xl">×</span> Not a subscription box that clutters your house
                   </div>
                   <div className="flex items-center gap-4 text-xl text-slate-500">
                       <span className="text-red-400 font-bold text-2xl">×</span> Not an addictive app designed to hook kids
                   </div>
                   <div className="flex items-center gap-4 text-xl text-slate-500">
                       <span className="text-red-400 font-bold text-2xl">×</span> Not an overwhelming academic curriculum
                   </div>
                   <div className="flex items-center gap-4 text-xl text-slate-500">
                       <span className="text-red-400 font-bold text-2xl">×</span> No ads, no social media, no noise
                   </div>
               </div>
               <div className="inline-block px-8 py-4 bg-green-50 rounded-2xl text-green-800 text-xl font-bold">
                   What it IS: A simple weekly email with curated videos and activities.
               </div>
           </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-24 max-w-3xl mx-auto px-6">
        <h2 className="font-display text-4xl font-bold text-slate-800 mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-8">
            <div>
                <h3 className="font-bold text-2xl text-slate-800 mb-2">Is this free?</h3>
                <p className="text-xl text-slate-500 leading-relaxed">Yes! Early access packs will be completely free for our waitlist testers.</p>
            </div>
            <div>
                <h3 className="font-bold text-2xl text-slate-800 mb-2">What ages is it for?</h3>
                <p className="text-xl text-slate-500 leading-relaxed">Our content is optimized for curious kids ages 3–8. Younger kids might need more help, while older kids can lead the activities themselves.</p>
            </div>
            <div>
                <h3 className="font-bold text-2xl text-slate-800 mb-2">Do I need special materials?</h3>
                <p className="text-xl text-slate-500 leading-relaxed">Nope. We strictly choose activities that use common household items like cups, water, paper, tape, and cardboard.</p>
            </div>
            <div>
                <h3 className="font-bold text-2xl text-slate-800 mb-2">Will this increase screen time?</h3>
                <p className="text-xl text-slate-500 leading-relaxed">Our goal is "screen-smart" time. We use short videos (5–10 mins) as a hook to inspire 30+ minutes of off-screen play and discovery.</p>
            </div>
        </div>
      </section>

      {/* 8. FOOTER CTA */}
      <section className="bg-brand-purple py-24 text-center rounded-t-[4rem]">
          <div className="max-w-4xl mx-auto px-6">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Want early access?</h2>
              <p className="text-white/80 text-xl mb-8 font-medium">
                  Get the first Curiosity Packs free when we start testing.
              </p>
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4 mb-6">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow px-8 py-5 rounded-full border-none text-xl focus:outline-none focus:ring-4 focus:ring-white/30"
                    required
                  />
                  <button 
                    type="submit" 
                    className="bg-brand-pink text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-pink-600 transition-colors shadow-lg whitespace-nowrap"
                  >
                    Join the Waitlist
                  </button>
                </form>
              ) : (
                <div className="bg-white/10 text-white px-10 py-6 rounded-3xl text-xl font-bold inline-block border border-white/20 mb-6">
                  Thanks for joining! We'll be in touch.
                </div>
              )}

              <p className="text-white/60 text-lg font-bold">No spam. Opt out anytime.</p>
          </div>
      </section>

    </div>
  );
};
