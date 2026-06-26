import React, { useState } from 'react';
import { GraduationCap, Award, Trophy, Users, Sparkles, Star, Eye, X, ShieldCheck } from 'lucide-react';
import { educationHistory, achievementsHistory, personalInfo } from '../data';

export default function Education() {
  const [filter, setFilter] = useState<'All' | 'Competition' | 'Award' | 'Hackathon' | 'Leadership'>('All');
  const [showWSUDiploma, setShowWSUDiploma] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [verifiedStatus, setVerifiedStatus] = useState(false);
  const [showMatricCertificate, setShowMatricCertificate] = useState(false);
  const [copiedMatricCode, setCopiedMatricCode] = useState(false);
  const [verifiedMatricStatus, setVerifiedMatricStatus] = useState(false);

  React.useEffect(() => {
    if (showWSUDiploma || showMatricCertificate) {
      window.scrollTo({ top: 0 });
      // Find all fixed modal overlay containers and reset their scrollTop to 0
      setTimeout(() => {
        const scrollContainers = document.querySelectorAll('.fixed.inset-0.overflow-y-auto');
        scrollContainers.forEach(el => {
          el.scrollTop = 0;
        });
      }, 0);
    }
  }, [showWSUDiploma, showMatricCertificate]);

  const filteredAchievements = filter === 'All' 
    ? achievementsHistory 
    : achievementsHistory.filter(item => item.category === filter);

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="mb-12 text-center lg:text-left">
          <span className="font-mono text-xs font-bold tracking-widest text-brand-primary uppercase">
            // PERSISTENCE & TIMELINE
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Academic & <span className="text-brand-primary">Chronological Timeline</span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-gray-400">
            A verified timeline of my scholastic accomplishments, degrees, state driving credentials, and leadership awards.
          </p>
        </div>

        {/* Dual timeline grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Education Path */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 border border-brand-primary/20 text-brand-primary">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white">Academic Chronology</h3>
                <p className="font-mono text-[10px] text-gray-400 uppercase">Diplomas & Secondary Schooling</p>
              </div>
            </div>

            {/* Timelines list */}
            <div className="relative border-l border-gray-800 pl-6 space-y-10 py-2">
              {educationHistory.map((edu) => (
                <div key={edu.id} className="relative group">
                  {/* Timeline bullet dot */}
                  <div className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-dark-bg border-2 border-brand-primary group-hover:bg-brand-primary transition-colors duration-200" />
                  
                  {/* Content */}
                  <div className="space-y-2">
                    <span className="inline-flex items-center rounded-md bg-[#1C1D2A] px-2.5 py-0.5 text-xs font-medium text-brand-primary border border-brand-primary/10">
                      {edu.period}
                    </span>
                    <h4 className="font-display text-lg font-bold text-white leading-snug group-hover:text-brand-primary transition-colors duration-200">
                      {edu.degree}
                    </h4>
                    <p className="text-sm text-gray-400 font-medium">
                      {edu.institution}
                    </p>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {edu.description}
                    </p>

                    {/* Integrated Diploma Viewer Widget if WSU */}
                    {edu.id === 'edu1' && (
                      <div className="pt-1.5">
                        <button
                          onClick={() => setShowWSUDiploma(true)}
                          className="inline-flex items-center gap-2 rounded-lg bg-brand-primary/10 border border-brand-primary/30 text-brand-primary px-3 py-1.5 text-xs font-bold hover:bg-brand-primary/20 hover:text-white transition-all duration-200 focus:outline-none cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5 animate-pulse" />
                          <span>Inspect WSU Graduate Diploma</span>
                        </button>
                      </div>
                    )}

                    {/* Integrated Matric Certificate Viewer Widget */}
                    {edu.id === 'edu2' && (
                      <div className="pt-1.5">
                        <button
                          onClick={() => setShowMatricCertificate(true)}
                          className="inline-flex items-center gap-2 rounded-lg bg-brand-primary/10 border border-brand-primary/30 text-brand-primary px-3 py-1.5 text-xs font-bold hover:bg-brand-primary/20 hover:text-white transition-all duration-200 focus:outline-none cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5 animate-pulse" />
                          <span>Inspect Matric Certificate</span>
                        </button>
                      </div>
                    )}

                    {/* Skills acquired pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {edu.skills.map((skill, i) => (
                        <span key={i} className="font-mono text-[10px] bg-dark-surface border border-gray-800 text-gray-400 px-2 py-0.5 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Achievements & Ribbons */}
          <div className="space-y-8">
            
            {/* Header controls for filtering */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 border border-brand-primary/20 text-brand-primary">
                  <Trophy className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">Achievements & Wins</h3>
                  <p className="font-mono text-[10px] text-gray-400 uppercase">Competitive Laurels & Certifications</p>
                </div>
              </div>
              
              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1 bg-dark-bg border border-gray-800 rounded-lg p-1">
                {(['All', 'Competition', 'Award', 'Hackathon', 'Leadership'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-2.5 py-1 text-[10px] font-bold rounded transition-all duration-200 focus:outline-none ${
                      filter === cat
                        ? 'bg-brand-primary text-dark-bg'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

            </div>

            {/* Achievements list */}
            <div className="space-y-5">
              {filteredAchievements.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-800 p-8 text-center text-gray-400">
                  <p className="text-sm">No accomplishments found for selected filter category.</p>
                </div>
              ) : (
                filteredAchievements.map((ach) => (
                  <div 
                    key={ach.id}
                    className="relative rounded-xl border border-gray-800 bg-dark-surface p-5 transition-all duration-300 hover:border-brand-primary/30 group shadow-md"
                  >
                    <div className="flex items-start gap-3.5">
                      
                      {/* Icon selector for category */}
                      <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary/5 border border-brand-primary/20 text-brand-primary">
                        {ach.category === 'Hackathon' ? (
                          <Sparkles className="h-4.5 w-4.5" />
                        ) : ach.category === 'Leadership' ? (
                          <Users className="h-4.5 w-4.5" />
                        ) : (
                          <Star className="h-4.5 w-4.5" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="space-y-1 w-full">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[10px] font-semibold text-brand-primary uppercase">
                            {ach.category} // {ach.year}
                          </span>
                          <span className="font-mono text-[9px] text-gray-500 font-semibold uppercase">
                            {ach.issuer}
                          </span>
                        </div>
                        
                        <h4 className="font-display text-base font-bold text-white leading-snug group-hover:text-brand-primary transition-colors duration-200">
                          {ach.title}
                        </h4>
                        
                        <p className="text-xs text-gray-400 leading-relaxed pt-1">
                          {ach.description}
                        </p>
                      </div>

                    </div>
                  </div>
                ))
              )}
            </div>

          </div>

        </div>

        {/* WSU Diploma certificate lightbox viewer */}
        {showWSUDiploma && (
          <div className="fixed inset-0 z-50 flex justify-center items-start overflow-y-auto bg-black/90 backdrop-blur-sm p-2 sm:p-4 md:py-8">
            <div className="relative w-full max-w-4xl rounded-2xl border border-brand-primary/40 bg-[#0A0B10] p-4 sm:p-6 shadow-2xl space-y-6">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                    ACADEMIC ACCREDITATION VIEWER // VERIFIED
                  </span>
                </div>
                
                <button 
                  onClick={() => setShowWSUDiploma(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-transparent border border-gray-800 text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Walter Sisulu University Diploma Container */}
              <div className="relative rounded-xl border border-gray-800 bg-[#0E0F15] p-2 sm:p-4 overflow-hidden shadow-inner flex justify-center">
                
                <div className="relative w-full max-w-[760px] sm:aspect-[1.41] aspect-auto bg-[#FAF8F5] text-stone-900 rounded-lg p-4 sm:p-12 flex flex-col justify-between gap-6 sm:gap-4 shadow-2xl overflow-hidden border-4 sm:border-8 border-stone-200 select-text select-none text-center">
                  
                  {/* Subtle decorative security line watermark */}
                  <div className="absolute inset-0 bg-radial-grid opacity-5 pointer-events-none" />

                  {/* Top: University Brand Heading */}
                  <div className="space-y-4">
                    <h3 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-950 uppercase">
                      Walter Sisulu University
                    </h3>
                    <div className="h-0.5 bg-stone-900/10 w-32 mx-auto" />
                    <p className="text-[10px] font-semibold text-stone-500 uppercase tracking-widest">
                      This is to certify that
                    </p>
                  </div>

                  {/* Middle: Graduate & Award Detail */}
                  <div className="space-y-4 my-4">
                    <h4 className="font-serif text-2xl sm:text-3xl font-black tracking-normal text-stone-950">
                      FIKA ZEKHAYA SIXIMBA
                    </h4>
                    
                    <span className="block font-mono text-[10px] sm:text-xs text-stone-600 font-bold tracking-wider">
                      ID: 030124 ****** 3
                    </span>
                    
                    <p className="text-xs font-serif text-stone-600 italic max-w-lg mx-auto">
                      having complied with the requirements of the Act and Statute was awarded the
                    </p>

                    <h5 className="font-sans text-lg sm:text-xl font-extrabold text-blue-950 tracking-tight leading-snug px-4">
                      DIPLOMA IN INFORMATION AND COMMUNICATIONS TECHNOLOGY <br />
                      IN APPLICATIONS DEVELOPMENT
                    </h5>

                    <p className="text-xs font-serif text-stone-600 italic">
                      with effect from <strong className="text-stone-900 not-italic font-bold">12 May 2025</strong>
                    </p>
                  </div>

                  {/* Bottom: Registrar Stamp, Signatures & Serial */}
                  <div className="flex flex-col sm:flex-row sm:justify-between items-center sm:items-end gap-6 sm:gap-0 pt-4 border-t border-stone-400/30">
                    
                    {/* Left: Registrar */}
                    <div className="space-y-1 text-center sm:text-left flex flex-col items-center sm:items-start">
                      <div className="font-serif text-xs italic font-bold text-stone-700">A. H. Konzama</div>
                      <div className="h-px bg-stone-400 w-20" />
                      <span className="block text-[8px] font-mono text-stone-500 uppercase font-black">Registrar</span>
                    </div>

                    {/* Middle: Official University Seal */}
                    <div className="flex flex-col items-center select-none py-2 sm:py-0">
                      <div className="h-16 w-16 rounded-full border-2 border-stone-800 bg-transparent flex flex-col items-center justify-center p-1 font-serif text-[7px] text-stone-800 font-black tracking-normal leading-none uppercase shrink-0">
                        <div className="text-[5.5px] text-stone-500">EXCELLENCE</div>
                        <div className="h-px bg-stone-800/25 w-8 my-0.5" />
                        <div>WALTER</div>
                        <div>SISULU</div>
                        <div className="text-[5.5px] mt-0.5 text-stone-500">UNIVERSITY</div>
                        <div className="h-px bg-stone-800/25 w-8 my-0.5" />
                        <div className="text-[5px] text-stone-500">INTEGRITY</div>
                      </div>
                      <span className="text-[5px] font-mono font-bold tracking-widest text-stone-400 uppercase mt-2 select-none">
                        FOUNDED WATERMARK
                      </span>
                    </div>

                    {/* Right: Chancellor */}
                    <div className="space-y-1 text-center sm:text-right flex flex-col items-center sm:items-end">
                      <div className="font-serif text-xs italic font-bold text-stone-700">R. Nxopo Ca</div>
                      <div className="h-px bg-stone-400 w-20" />
                      <span className="block text-[8px] font-mono text-stone-500 uppercase font-black">Vice Chancellor</span>
                    </div>

                  </div>

                  {/* Absolute Serial Number Code */}
                  <div className="flex flex-col sm:flex-row justify-between text-stone-400 font-mono text-[7.5px] uppercase font-bold tracking-wider pt-2 gap-1 sm:gap-0">
                    <div>CERTIFICATE REGISTER NO. // WSU10742</div>
                    <div>SECURE SCAN CODE WSU10742</div>
                  </div>

                </div>

              </div>

              {/* Action indicators */}
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-gray-400 pt-2">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span>Credential Status: Authenticity audit matches WSU academic register records</span>
                </div>
                
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  {copiedCode && (
                    <span className="text-emerald-400 text-[10px] animate-pulse py-1 self-center">
                      ✓ Serial 'WSU10742' Copied!
                    </span>
                  )}
                  {verifiedStatus && (
                    <span className="text-emerald-400 text-[10px] animate-pulse py-1 self-center">
                      ✓ Verification Logged!
                    </span>
                  )}
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText("WSU10742");
                      setCopiedCode(true);
                      setTimeout(() => setCopiedCode(false), 3000);
                    }}
                    className="h-8 inline-flex items-center justify-center rounded px-3 border border-gray-800 text-gray-300 hover:text-white transition-colors text-xs"
                  >
                    {copiedCode ? "Copied!" : "Copy Diploma Serial Code"}
                  </button>
                  <button
                    onClick={() => {
                      setVerifiedStatus(true);
                      setTimeout(() => setVerifiedStatus(false), 4000);
                    }}
                    className="h-8 inline-flex items-center justify-center rounded bg-gray-800 text-emerald-400 px-3 hover:bg-gray-700 transition-colors text-xs"
                  >
                    {verifiedStatus ? "Audited & Verified ✓" : "Verify Status"}
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Matric Certificate Lightbox Viewer */}
        {showMatricCertificate && (
          <div className="fixed inset-0 z-50 flex justify-center items-start overflow-y-auto bg-black/90 backdrop-blur-sm p-2 sm:p-4 md:py-8">
            <div className="relative w-full max-w-4xl rounded-2xl border border-brand-primary/40 bg-[#0A0B10] p-4 sm:p-6 shadow-2xl space-y-6">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                    NATIONAL SENIOR CERTIFICATE VIEWER // VERIFIED
                  </span>
                </div>
                
                <button 
                  onClick={() => setShowMatricCertificate(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-transparent border border-gray-800 text-gray-400 hover:text-white cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Certificate Container */}
              <div className="relative rounded-xl border border-gray-800 bg-[#0E0F15] p-2 sm:p-4 overflow-hidden shadow-inner flex justify-center">
                
                <div className="relative w-full max-w-[760px] sm:aspect-[1.41] aspect-auto bg-[#FAF8F5] text-stone-900 rounded-lg p-4 sm:p-10 flex flex-col justify-between gap-6 sm:gap-2 shadow-2xl overflow-hidden border-4 sm:border-8 border-amber-950/15 select-text select-none text-center">
                  
                  {/* Watermark */}
                  <div className="absolute inset-0 bg-radial-grid opacity-5 pointer-events-none" />

                  {/* Top: Republic of South Africa and National Coat of Arms styling */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-extrabold tracking-widest text-stone-950 uppercase">
                      Republic of South Africa
                    </h3>
                    <p className="text-[9px] font-bold text-stone-500 uppercase tracking-widest">
                      Department of Basic Education
                    </p>
                    <div className="h-0.5 bg-amber-900/20 w-40 mx-auto" />
                    <h4 className="font-serif text-md sm:text-lg font-bold text-stone-800 uppercase tracking-wide mt-1">
                      National Senior Certificate
                    </h4>
                    <p className="text-[8px] font-semibold text-stone-400 uppercase tracking-wider">
                      Awarded to
                    </p>
                  </div>

                  {/* Middle: Recipient & School */}
                  <div className="space-y-3 my-2">
                    <h4 className="font-serif text-xl sm:text-2xl font-black text-stone-950">
                      FIKA ZEKHAYA SIXIMBA
                    </h4>

                    {/* Masked ID and Exam Number to match document */}
                    <div className="flex flex-col sm:flex-row justify-between items-center text-[8px] sm:text-[9.5px] font-mono text-stone-600 max-w-lg mx-auto w-full px-2 py-1 bg-stone-100/55 rounded border border-stone-200/50">
                      <div>Identity number: <span className="font-bold text-stone-900">030124 ****** 3</span></div>
                      <div className="hidden sm:block h-3 w-px bg-stone-300" />
                      <div>Exam number: <span className="font-bold text-stone-900">4202910500170</span></div>
                    </div>
                    
                    <p className="text-[10px] font-serif text-stone-600 max-w-lg mx-auto leading-relaxed">
                      who has complied with all requirements of the National Senior Certificate and has been endorsed with:
                    </p>

                    <h5 className="font-sans text-xs sm:text-sm font-extrabold text-amber-900 tracking-wide uppercase px-4 py-1 bg-amber-900/5 rounded border border-amber-900/10 inline-block">
                      Bachelor's Degree Admission Endorsement
                    </h5>

                    <p className="text-[9px] text-stone-600 font-medium">
                      School: <strong className="text-stone-900 font-bold">MILTON MBEKELA SENIOR SECONDARY SCHOOL</strong>
                    </p>
                  </div>

                  {/* Subjects Grid Table */}
                  <div className="max-w-xl mx-auto w-full my-1 border border-stone-300 rounded overflow-hidden text-left bg-stone-50/50">
                    <div className="grid grid-cols-12 bg-stone-200/60 font-mono text-[8px] sm:text-[9px] font-bold text-stone-800 border-b border-stone-300 p-1 px-3">
                      <div className="col-span-8">Subject Description</div>
                      <div className="col-span-2 text-center">Level</div>
                      <div className="col-span-2 text-right">Percentage</div>
                    </div>
                    <div className="divide-y divide-stone-200 font-serif text-[8px] sm:text-[9px] text-stone-800 p-1 px-3 space-y-0.5">
                      <div className="grid grid-cols-12 py-0.5">
                        <div className="col-span-8">IsiXhosa Home Language</div>
                        <div className="col-span-2 text-center font-mono">6</div>
                        <div className="col-span-2 text-right font-mono">74%</div>
                      </div>
                      <div className="grid grid-cols-12 py-0.5">
                        <div className="col-span-8">English First Additional Language</div>
                        <div className="col-span-2 text-center font-mono">5</div>
                        <div className="col-span-2 text-right font-mono">65%</div>
                      </div>
                      <div className="grid grid-cols-12 py-0.5">
                        <div className="col-span-8">Mathematics</div>
                        <div className="col-span-2 text-center font-mono">3</div>
                        <div className="col-span-2 text-right font-mono">42%</div>
                      </div>
                      <div className="grid grid-cols-12 py-0.5">
                        <div className="col-span-8">Life Orientation</div>
                        <div className="col-span-2 text-center font-mono">7</div>
                        <div className="col-span-2 text-right font-mono">91%</div>
                      </div>
                      <div className="grid grid-cols-12 py-0.5">
                        <div className="col-span-8">Geography</div>
                        <div className="col-span-2 text-center font-mono">4</div>
                        <div className="col-span-2 text-right font-mono">56%</div>
                      </div>
                      <div className="grid grid-cols-12 py-0.5">
                        <div className="col-span-8">Life Sciences</div>
                        <div className="col-span-2 text-center font-mono">3</div>
                        <div className="col-span-2 text-right font-mono">49%</div>
                      </div>
                      <div className="grid grid-cols-12 py-0.5">
                        <div className="col-span-8">Physical Sciences</div>
                        <div className="col-span-2 text-center font-mono">3</div>
                        <div className="col-span-2 text-right font-mono">42%</div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Registrar Stamp, Signatures & Serial */}
                  <div className="flex flex-col sm:flex-row sm:justify-between items-center sm:items-end gap-6 sm:gap-0 pt-3 border-t border-stone-300">
                    
                    {/* Left: General Signature */}
                    <div className="space-y-0.5 text-center sm:text-left flex flex-col items-center sm:items-start">
                      <div className="font-serif text-[9px] italic font-bold text-stone-700">H. M. Mweli</div>
                      <div className="h-px bg-stone-400 w-16" />
                      <span className="block text-[7px] font-mono text-stone-500 uppercase font-bold leading-tight">Director-General</span>
                    </div>

                    {/* Middle: Umalusi logo emblem */}
                    <div className="flex flex-col items-center select-none py-2 sm:py-0">
                      <div className="h-12 w-12 rounded-full border-2 border-stone-800 bg-transparent flex flex-col items-center justify-center p-0.5 font-serif text-[5.5px] text-stone-800 font-bold tracking-tight leading-none uppercase shrink-0">
                        <div className="text-[4px] text-stone-500">UMALUSI</div>
                        <div className="h-px bg-stone-800/20 w-6 my-0.5" />
                        <div>COUNCIL</div>
                        <div className="text-[4px] mt-0.5 text-stone-500">QUALITY</div>
                      </div>
                      <span className="text-[5px] font-mono font-bold tracking-widest text-stone-400 uppercase mt-1">
                        BASIC EDUCATION SEAL
                      </span>
                    </div>

                    {/* Right: Umalusi Chief CEO */}
                    <div className="space-y-0.5 text-center sm:text-right flex flex-col items-center sm:items-end">
                      <div className="font-serif text-[9px] italic font-bold text-stone-700">M. S. Rakometsi</div>
                      <div className="h-px bg-stone-400 w-16" />
                      <span className="block text-[7px] font-mono text-stone-500 uppercase font-bold leading-tight">CEO Umalusi</span>
                    </div>

                  </div>

                  {/* Absolute Serial Number Code */}
                  <div className="flex flex-col sm:flex-row justify-between text-stone-400 font-mono text-[7px] uppercase font-bold tracking-wider pt-2 gap-1 sm:gap-0">
                    <div>SERIAL NO. // 21080029961L</div>
                    <div>VERIFIED REGISTRATION 21080029961L</div>
                  </div>

                </div>

              </div>

              {/* Action indicators */}
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-gray-400 pt-1">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span>Credential Status: Authenticity audit matches Basic Education matric archives</span>
                </div>
                
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  {copiedMatricCode && (
                    <span className="text-emerald-400 text-[10px] animate-pulse py-1 self-center">
                      ✓ Serial '21080029961L' Copied!
                    </span>
                  )}
                  {verifiedMatricStatus && (
                    <span className="text-emerald-400 text-[10px] animate-pulse py-1 self-center">
                      ✓ Verification Logged!
                    </span>
                  )}
                  <button 
                     onClick={() => {
                      navigator.clipboard.writeText("21080029961L");
                      setCopiedMatricCode(true);
                      setTimeout(() => setCopiedMatricCode(false), 3000);
                    }}
                    className="h-8 inline-flex items-center justify-center rounded px-3 border border-gray-800 text-gray-300 hover:text-white transition-colors text-xs cursor-pointer"
                  >
                    {copiedMatricCode ? "Copied!" : "Copy Matric Serial Code"}
                  </button>
                  <button
                    onClick={() => {
                      setVerifiedMatricStatus(true);
                      setTimeout(() => setVerifiedMatricStatus(false), 4000);
                    }}
                    className="h-8 inline-flex items-center justify-center rounded bg-gray-800 text-emerald-400 px-3 hover:bg-gray-700 transition-colors text-xs cursor-pointer"
                  >
                    {verifiedMatricStatus ? "Audited & Verified ✓" : "Verify Status"}
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
