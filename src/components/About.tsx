import React from 'react';
import { Target, Compass, BookOpen, Layers, Milestone, Lightbulb, Heart } from 'lucide-react';
import { personalInfo } from '../data';

export default function About() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="mb-12 text-center lg:text-left">
          <span className="font-mono text-xs font-bold tracking-widest text-brand-primary uppercase">
            // OUR PATH & STORY
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            The Chronicle of <span className="text-brand-primary">Fika Zekhaya Siximba</span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-gray-400">
            Learn about what motivates me, my long-term career mission, and the technical standards I defend.
          </p>
        </div>

        {/* Bento Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Story & Bio (7 columns) */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
            
            {/* Personal & Professional Origins */}
            <div className="rounded-xl border border-gray-800 bg-dark-surface p-6 sm:p-8 space-y-5 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 h-24 w-24 ambient-glow-orange opacity-40 pointer-events-none" />
              
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 border border-brand-primary/30 text-brand-primary">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">My Journey & Background</h3>
              </div>
              
              <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed">
                <p>
                  {personalInfo.bio.background}
                </p>
                <p>
                  Specializing in front-end microservice clients and fast, responsive interfaces, I focus on constructing resilient components that thrive under heavy workloads. I actively support strict types, clean component separation, intuitive user paths, and rigorous performance profiling.
                </p>
              </div>
            </div>

            {/* Professional Interests List as Elegant Chips */}
            <div className="rounded-xl border border-gray-800 bg-dark-surface p-6 space-y-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 border border-brand-primary/30 text-brand-primary">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-white">Primary Tech Focus & Interests</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-400">
                These are the professional fields, domains, and frameworks that I focus on and continuously develop:
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {personalInfo.bio.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-md bg-[#191A23] border border-gray-800 px-3 py-1.5 text-xs font-medium text-gray-200 transition-colors duration-200 hover:border-brand-primary/40 hover:text-white"
                  >
                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-brand-primary" />
                    {interest}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Vision, Mission & Goals Hub (4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Vision Banner */}
            <div className="rounded-xl border border-brand-primary/20 bg-gradient-to-br from-dark-surface to-[#161821] p-6 shadow-lg space-y-3 relative overflow-hidden">
              <span className="absolute -top-3 -right-3 text-7xl font-bold text-brand-primary/5 select-none font-display">01</span>
              <div className="flex items-center gap-2 text-brand-primary">
                <Compass className="h-5 w-5" />
                <h4 className="font-display text-sm font-bold tracking-widest uppercase">My Vision</h4>
              </div>
              <p className="font-display text-lg font-semibold text-white leading-snug">
                &ldquo;Create beautiful, accessible interfaces that leave lasting impressions globally.&rdquo;
              </p>
              <p className="text-xs text-gray-400">
                {personalInfo.bio.vision}
              </p>
            </div>

            {/* Mission Statement */}
            <div className="rounded-xl border border-purple-500/10 bg-gradient-to-br from-dark-surface to-[#161821] p-6 shadow-lg space-y-3 relative overflow-hidden">
              <span className="absolute -top-3 -right-3 text-7xl font-bold text-purple-400/5 select-none font-display">02</span>
              <div className="flex items-center gap-2 text-purple-400">
                <Target className="h-5 w-5" />
                <h4 className="font-display text-sm font-bold tracking-widest uppercase">My Mission</h4>
              </div>
              <p className="font-display text-lg font-semibold text-white leading-snug">
                &ldquo;Engineering robust modularity and seamless interactive logic.&rdquo;
              </p>
              <p className="text-xs text-gray-400">
                {personalInfo.bio.mission}
              </p>
            </div>

            {/* Career Goals */}
            <div className="rounded-xl border border-gray-800 bg-dark-surface p-6 shadow-lg space-y-4 relative overflow-hidden">
              <span className="absolute -top-3 -right-3 text-7xl font-bold text-gray-500/5 select-none font-display">03</span>
              <div className="flex items-center gap-2.5 text-white relative z-10">
                <Milestone className="h-5 w-5 text-brand-primary" />
                <h4 className="font-display text-base font-bold">Career Milestones</h4>
              </div>
              <ul className="space-y-3.5 text-xs text-gray-300 relative z-10">
                {personalInfo.bio.careerGoals.map((goal, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-brand-primary/10 font-mono text-[10px] font-bold text-brand-primary border border-brand-primary/20">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
