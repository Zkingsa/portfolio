import React, { useState } from 'react';
import { Briefcase, Calendar, CheckCircle2, ChevronDown, ChevronUp, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { workExperience } from '../data';

export default function Experience() {
  const [filter, setFilter] = useState<'All' | 'Full-time' | 'Internship' | 'Volunteer'>('All');
  const [expandedId, setExpandedId] = useState<string | null>('work1'); // default expand first job

  const filteredExperience = filter === 'All'
    ? workExperience
    : workExperience.filter((exp) => exp.type === filter);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        
        {/* Header section */}
        <div className="mb-12 text-center">
          <span className="font-mono text-xs font-bold tracking-widest text-brand-primary uppercase">
            // FIELD LOG & ENGAGEMENTS
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Professional <span className="text-brand-primary">Work Experience</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-gray-400">
            An interactive tree-like timeline of my active commercial duties, internships, and educational volunteer roles. Click on any experience to view details.
          </p>
        </div>

        {/* Experience filters */}
        <div className="mb-10 flex flex-wrap gap-2 justify-center">
          {(['All', 'Full-time', 'Internship', 'Volunteer'] as const).map((type) => (
            <button
              key={type}
              onClick={() => {
                setFilter(type);
                // Auto-expand first item of filtered list
                const matched = type === 'All' ? workExperience : workExperience.filter(x => x.type === type);
                if (matched.length > 0) {
                  setExpandedId(matched[0].id);
                } else {
                  setExpandedId(null);
                }
              }}
              className={`inline-flex px-4 py-1.5 rounded-lg font-display text-xs font-bold border transition-all duration-300 focus:outline-none cursor-pointer ${
                filter === type
                  ? 'bg-brand-primary border-brand-primary text-dark-bg font-bold shadow-[0_0_12px_rgba(255,107,0,0.2)]'
                  : 'bg-[#12131A] border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
              }`}
            >
              {type} Roles
            </button>
          ))}
        </div>

        {/* Tree Timeline Container */}
        <div className="relative border-l-2 border-dashed border-gray-800 ml-4 sm:ml-6 pl-6 sm:pl-10 space-y-8 py-2">
          
          {/* Timeline Trunk Glow Line */}
          <div className="absolute left-[-2px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand-primary via-emerald-500/50 to-gray-800/20 pointer-events-none" />

          {filteredExperience.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-800 p-8 text-center text-gray-400">
              No roles matched the selected filter.
            </div>
          ) : (
            filteredExperience.map((exp) => {
              const isSelected = expandedId === exp.id;
              return (
                <div key={exp.id} className="relative group">
                  
                  {/* Timeline Tree Branch Connection Node */}
                  <div 
                    onClick={() => toggleExpand(exp.id)}
                    className={`absolute left-[-35px] sm:left-[-51px] top-6 h-6 w-6 sm:h-8 sm:w-8 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-300 z-10 ${
                      isSelected 
                        ? 'bg-brand-primary border-brand-primary text-dark-bg shadow-[0_0_15px_rgba(255,107,0,0.4)] scale-110' 
                        : 'bg-[#12131A] border-gray-800 text-gray-400 group-hover:border-brand-primary/50 group-hover:text-white'
                    }`}
                  >
                    <Briefcase className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>

                  {/* Main Timeline Card Container */}
                  <div 
                    className={`rounded-xl border transition-all duration-300 overflow-hidden bg-dark-surface/60 hover:bg-dark-surface/90 ${
                      isSelected 
                        ? 'border-brand-primary shadow-[0_0_20px_rgba(255,107,0,0.05)] bg-[#12131A]/90' 
                        : 'border-gray-800/80 hover:border-gray-700'
                    }`}
                  >
                    {/* Expandable/Interactive Header Banner */}
                    <button
                      onClick={() => toggleExpand(exp.id)}
                      className="w-full text-left p-5 sm:p-6 focus:outline-none flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none cursor-pointer"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-tight uppercase ${
                            exp.type === 'Full-time' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            exp.type === 'Internship' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                            'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                          }`}>
                            {exp.type}
                          </span>
                          <span className="font-mono text-[10px] text-gray-500 font-semibold flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {exp.period}
                          </span>
                        </div>

                        <h3 className={`font-display text-lg sm:text-xl font-bold transition-colors duration-200 ${
                          isSelected ? 'text-brand-primary' : 'text-white group-hover:text-brand-primary'
                        }`}>
                          {exp.role}
                        </h3>

                        <p className="font-display text-sm font-semibold text-gray-400">
                          {exp.company}
                        </p>
                      </div>

                      {/* Accordion Arrow Indicator */}
                      <div className={`h-8 w-8 shrink-0 flex items-center justify-center rounded-lg border text-gray-400 transition-all duration-200 ${
                        isSelected 
                          ? 'bg-brand-primary/10 border-brand-primary/30 text-brand-primary' 
                          : 'bg-[#191A23] border-gray-800'
                      }`}>
                        {isSelected ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </div>
                    </button>

                    {/* Expandable Panel Contents with height and opacity transition */}
                    <AnimatePresence initial={false}>
                      {isSelected && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          <div className="px-5 pb-6 sm:px-6 sm:pb-8 border-t border-gray-800/50 pt-5 space-y-6">
                            
                            {/* Duties */}
                            <div className="space-y-2.5">
                              <h4 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
                                Duties & Core Responsibilities
                              </h4>
                              <ul className="space-y-2.5 pl-1">
                                {exp.responsibilities.map((resp, i) => (
                                  <li key={i} className="flex gap-2.5 items-start text-sm text-gray-300">
                                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-brand-primary/60" />
                                    <span className="leading-relaxed">{resp}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Outcomes */}
                            <div className="space-y-2.5">
                              <h4 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <Award className="h-4 w-4 text-[#FF9D00]" />
                                Key Deliverables & Outcomes
                              </h4>
                              <ul className="space-y-2.5 pl-1">
                                {exp.outcomes.map((out, i) => (
                                  <li key={i} className="flex gap-2.5 items-start text-sm text-gray-300">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF9D00]" />
                                    <span className="leading-relaxed font-medium text-gray-200">{out}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Technologies */}
                            <div className="pt-4 border-t border-gray-800/40 space-y-2">
                              <span className="block font-mono text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                                TECHNOLOGY ENSTATED
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {exp.skills.map((skill, i) => (
                                  <span
                                    key={i}
                                    className="font-mono text-[10px] bg-dark-bg/80 border border-gray-800 text-gray-300 px-2.5 py-1 rounded"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </div>
              );
            })
          )}

        </div>

      </div>
    </section>
  );
}
