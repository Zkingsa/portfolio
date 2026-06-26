import React, { useEffect, useRef, useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Play, 
  CheckCircle2, 
  Layers, 
  User, 
  X,
  Volume2, 
  VolumeX, 
  Plus, 
  Trash2,
  Tv, 
  Sparkles,
  BarChart3,
  Flame,
  Linkedin,
  Mail
} from 'lucide-react';
import projectVideo from '../assets/Videos/Video.mp4';
import { personalInfo, projects } from '../data';
import { ProjectItem } from '../types';

type NdaAcceptData = {
  name: string;
  email: string;
  company: string;
  timestamp: string;
};

export default function Projects({
  projectsNavKey,
  onNdaAccepted,
  onNdaDismissed,
}: {
  projectsNavKey: number;
  onNdaAccepted: () => void;
  onNdaDismissed: () => void;
}) {
  const [filterTech, setFilterTech] = useState<string>('All');
  const [selectedSimProject, setSelectedSimProject] = useState<ProjectItem | null>(null);
  const [ndaAccepted, setNdaAccepted] = useState<NdaAcceptData | null>(() => {
    try {
      const saved = localStorage.getItem('fika_portfolio_nda_accepted');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [showNdaPrompt, setShowNdaPrompt] = useState<boolean>(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('fika_portfolio_nda_accepted');
      if (saved) {
        setNdaAccepted(JSON.parse(saved));
        setShowNdaPrompt(false);
      } else {
        setShowNdaPrompt(true);
      }
    } catch {
      setShowNdaPrompt(true);
    }
  }, [projectsNavKey]);

  const stackCategories = ['All', 'AI Projects', 'Front end', 'Back-End', 'Full Stack'] as const;

  const filteredProjects = filterTech === 'All'
    ? projects
    : projects.filter(p => p.stackCategory === filterTech);

  const handleProjectAction = (project: ProjectItem) => {
    setSelectedSimProject(project);
  };

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {showNdaPrompt && !ndaAccepted && (
          <ProjectNdaModal
            onAccept={(acceptData) => {
              localStorage.setItem('fika_portfolio_nda_accepted', JSON.stringify(acceptData));
              setNdaAccepted(acceptData);
              setShowNdaPrompt(false);
              onNdaAccepted();
            }}
            onDismiss={() => {
              setShowNdaPrompt(false);
              onNdaDismissed();
            }}
          />
        )}

        {/* Header section */}
        <div className="mb-12 text-center lg:text-left">
          <span className="font-mono text-xs font-bold tracking-widest text-brand-primary uppercase">
            // MASTER COMMAND & REPOSITORIES
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Practical <span className="text-brand-primary">Project Showcase</span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-gray-400">
            A hand-picked selection of high-fidelity products, school capstones, and creative engineering sandboxes.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10 space-y-2">
          <span className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Filter by Technology Stack:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {stackCategories.map((tech) => (
              <button
                key={tech}
                type="button"
                onClick={() => setFilterTech(tech)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all duration-200 focus:outline-none ${
                  filterTech === tech
                    ? 'bg-brand-primary text-dark-bg font-bold'
                    : 'bg-[#12131A] border border-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-400 max-w-2xl">
            Watch the portfolio walkthrough, then explore the sandboxed projects below. The NDA will appear automatically when visiting this page until accepted.
          </p>
          <button
            type="button"
            onClick={() => setVideoModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-primary px-4 py-2 text-xs font-bold text-dark-bg transition-colors duration-200 hover:bg-brand-hover focus:outline-none"
          >
            <Tv className="h-4 w-4" />
            Video
          </button>
        </div>

        {/* Project Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              role="button"
              tabIndex={0}
              onClick={() => handleProjectAction(project)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleProjectAction(project);
                }
              }}
              className="glowing-card cursor-pointer rounded-2xl flex flex-col justify-between overflow-hidden shadow-xl"
            >
              
              {/* Photo Banner with Badges */}
              <div className="relative aspect-[16/10] overflow-hidden bg-dark-bg border-b border-gray-800 select-none">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                />
                
                {/* Visual Category Pill overlays */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="inline-flex items-center rounded-md bg-dark-bg/95 backdrop-blur px-2.5 py-0.5 text-[10px] font-bold text-brand-primary border border-brand-primary/20">
                    {project.category}
                  </span>
                </div>

                {project.featured && (
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 rounded bg-[#FFD700]/10 border border-[#FFD700]/20 px-2 py-0.5 text-[9px] font-mono font-bold text-[#FFD700]">
                      ★ FEATURED
                    </span>
                  </div>
                )}
                {!project.demoUrl && (
                  <div className="absolute bottom-3 left-3 rounded-full bg-orange-500/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-orange-200 border border-orange-500/20">
                    Coming Soon
                  </div>
                )}
              </div>

              {/* Product Info Block */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                
                <div className="space-y-2">
                  <h3 className="font-display text-xl font-bold text-white tracking-tight leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
                    {project.overview}
                  </p>
                </div>

                {/* Role specifications */}
                <div className="rounded-lg bg-[#1D1F2B]/60 p-3.5 space-y-1 text-xs border border-gray-800/40">
                  <div className="item flex gap-1.5 items-center font-semibold text-brand-primary font-display pb-1 border-b border-gray-800/20">
                    <User className="h-3.5 w-3.5" />
                    <span>Role Log: {project.role}</span>
                  </div>
                  <div className="pt-1.5 text-gray-300">
                    <span className="font-semibold text-gray-200">Outcome:</span> {project.outcomes[0]}
                  </div>
                </div>

                {/* Tech Chips */}
                <div className="space-y-1.5">
                  <span className="block font-mono text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                    SYSTEM TOOLING
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((t, idx) => (
                      <span 
                        key={idx}
                        className="font-mono text-[10px] bg-[#161720] border border-gray-800 px-2 py-0.5 rounded text-gray-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Buttons to trigger standard simulation */}
              <div className="px-6 pb-6 pt-2 flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProjectAction(project);
                  }}
                  className="flex-1 inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-brand-primary text-xs font-bold text-dark-bg transition-colors duration-200 hover:bg-brand-hover focus:outline-none"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Interactive Sandbox</span>
                </button>
                
                <a
                  href={`https://github.com/Zkingsa`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#1F2232] border border-gray-800 text-gray-400 hover:text-white transition-all duration-200"
                  title="View GitHub Repository"
                >
                  <Github className="h-4 w-4" />
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Simulator Workbench Modal Container */}
        {selectedSimProject && (
          <SimulatorWindow 
            project={selectedSimProject} 
            onClose={() => setSelectedSimProject(null)} 
          />
        )}

        {videoModalOpen && <VideoModal onClose={() => setVideoModalOpen(false)} />}

      </div>
    </section>
  );
}

function ProjectNdaModal({
  onAccept,
  onDismiss,
}: {
  onAccept: (acceptData: NdaAcceptData) => void;
  onDismiss: () => void;
}) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [signerName, setSignerName] = useState('');
  const [signerEmail, setSignerEmail] = useState('');
  const [signerCompany, setSignerCompany] = useState('');
  const [signerAgreement, setSignerAgreement] = useState(false);
  const [ndaError, setNdaError] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('fika_portfolio_nda_accepted');
      if (saved) {
        const parsed = JSON.parse(saved) as NdaAcceptData;
        setSignerName(parsed.name);
        setSignerEmail(parsed.email);
        setSignerCompany(parsed.company);
        setSignerAgreement(true);
      }
    } catch {
      // ignore if no saved NDA
    }
  }, []);

  useEffect(() => {
    modalRef.current?.focus();
    modalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  const handleNdaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signerName.trim()) {
      setNdaError('Please enter your full name.');
      return;
    }
    if (!signerEmail.trim() || !signerEmail.includes('@')) {
      setNdaError('Please enter a valid email address.');
      return;
    }
    if (!signerAgreement) {
      setNdaError('You must accept the terms of the Non-Disclosure Agreement.');
      return;
    }

    onAccept({
      name: signerName.trim(),
      email: signerEmail.trim(),
      company: signerCompany.trim(),
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 px-4 py-4 backdrop-blur-2xl">
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="nda-modal-title"
        className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-[32px] border border-orange-400/70 bg-[#070B10] shadow-[0_0_120px_rgba(255,98,20,0.16)] outline-none"
        aria-modal="true"
        aria-labelledby="nda-modal-title"
        className="relative w-full max-w-3xl overflow-hidden rounded-[32px] border border-orange-400/70 bg-[#070B10] shadow-[0_0_120px_rgba(255,98,20,0.16)] outline-none"
      >
        <div className="flex items-start justify-between gap-4 border-b border-orange-500/20 bg-[#0C0F16] px-6 py-5">
          <div className="max-w-[85%]">
            <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-orange-400">
              // CONFIDENTIALITY EVALUATION REQUIREMENT
            </p>
            <h2 id="nda-modal-title" className="mt-3 text-3xl font-black tracking-tight text-white">
              Non-Disclosure & <span className="text-orange-400">Proprietary Evaluation</span> Agreement
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-300">
              Before accessing the interactive codebases, operational sandboxes, or system-level modules of <span className="font-semibold text-white">AI Prompt Optimization Studio</span>, please review and accept the protective evaluation agreement below.
            </p>
          </div>
          <button
            onClick={onDismiss}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-800 bg-[#0B0F16] text-gray-400 transition-all hover:border-orange-400 hover:text-white"
            aria-label="Close NDA prompt"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleNdaSubmit} className="space-y-6 px-6 py-6">
          <div className="rounded-3xl border border-orange-500/20 bg-[#0B0E14] p-5 text-sm text-gray-300 shadow-[inset_0_0_0_1px_rgba(255,126,39,0.08)]">
            <div className="space-y-4 max-h-[270px] overflow-y-auto pr-3">
              <div>
                <p className="font-semibold text-sm uppercase tracking-[0.18em] text-orange-300">1. Purpose & Intent</p>
                <p className="mt-2 leading-7 text-gray-300">
                  This workspace contains proprietary designs, internal business-logic flows, custom database models, and intellectual property developed by Fika Zekhaya Siximba. Access is provided solely for peer assessment, recruitment evaluations, or academic review.
                </p>
              </div>

              <div>
                <p className="font-semibold text-sm uppercase tracking-[0.18em] text-orange-300">2. Covenant of Non-Use & Non-Disclosure</p>
                <p className="mt-2 leading-7 text-gray-300">
                  By completing this registration, you explicitly agree and covenant that you are viewing these projects strictly for personal evaluation. You are <span className="font-semibold text-white">STRICTLY FORBIDDEN</span> from reproducing, duplicating, copying, modifying, compiling, distributing, selling, or exploiting these works, concepts, or designs, in whole or in part, in any personal, academic, or commercial environment to gain competitive, financial, or academic advantage.
                </p>
              </div>

              <div>
                <p className="font-semibold text-sm uppercase tracking-[0.18em] text-orange-300">3. Proprietary and Moral Rights</p>
                <p className="mt-2 leading-7 text-gray-300">
                  All copyright, licensing ownership, design templates, and intellectual property remain the absolute and exclusive property of Fika Zekhaya Siximba. No implied licenses, rights, or transfers of copyright are extended hereunder.
                </p>
              </div>

              <div>
                <p className="font-semibold text-sm uppercase tracking-[0.18em] text-orange-300">4. Remedies</p>
                <p className="mt-2 leading-7 text-gray-300">
                  Any infringement or plagiarism of this property represents a direct breach of evaluation conditions. The author reserves all rights to initiate legal action, request copyright takedowns, or claim civil damages.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Full Name
              <input
                value={signerName}
                onChange={(e) => setSignerName(e.target.value)}
                className="w-full rounded-2xl border border-gray-800 bg-[#080A10] px-4 py-3 text-sm text-white outline-none transition focus:border-orange-400"
                placeholder="e.g. Jane Doe"
              />
            </label>
            <label className="space-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Email Address
              <input
                type="email"
                value={signerEmail}
                onChange={(e) => setSignerEmail(e.target.value)}
                className="w-full rounded-2xl border border-gray-800 bg-[#080A10] px-4 py-3 text-sm text-white outline-none transition focus:border-orange-400"
                placeholder="e.g. jane@company.com"
              />
            </label>
          </div>

          <label className="space-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 block">
            Company / Institution
            <input
              value={signerCompany}
              onChange={(e) => setSignerCompany(e.target.value)}
              className="w-full rounded-2xl border border-gray-800 bg-[#080A10] px-4 py-3 text-sm text-white outline-none transition focus:border-orange-400"
              placeholder="e.g. Walter Sisulu University / CAPACITI Evaluation"
            />
          </label>

          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-gray-800 bg-[#080A10] p-4 text-sm text-gray-300 transition hover:border-orange-400">
            <input
              type="checkbox"
              checked={signerAgreement}
              onChange={(e) => setSignerAgreement(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-700 bg-[#080A10] text-orange-400 focus:ring-orange-400"
            />
            <span>
              I accept and agree to all terms of this Non-Disclosure & Intellectual Property Agreement. I agree that I am viewing these projects for evaluation purposes and will not use them to gain advantage anywhere.
            </span>
          </label>

          {ndaError && <p className="text-sm text-red-500">{ndaError}</p>}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onDismiss}
              className="rounded-2xl border border-gray-800 bg-[#11151B] px-5 py-3 text-sm font-semibold text-gray-300 transition hover:border-orange-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-2xl bg-orange-500 px-5 py-3 text-sm font-bold text-[#070B10] transition hover:bg-orange-400"
            >
              Agree & Unlock Workspace
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function VideoModal({ onClose }: { onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    modalRef.current?.focus();
    modalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  return (
    <div className="fixed inset-0 z-60 grid min-h-screen place-items-center bg-black/95 p-4">
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-modal-title"
        className="relative w-full max-w-5xl overflow-hidden rounded-[28px] border border-brand-primary/40 bg-[#07090F] shadow-[0_0_80px_rgba(28,41,80,0.4)] outline-none"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-800 bg-[#0F172A] text-gray-300 transition hover:border-gray-700 hover:text-white"
          aria-label="Close video modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="aspect-video bg-black">
          <video
            className="h-full w-full object-cover"
            src={projectVideo}
            controls
            autoPlay
            playsInline
          />
        </div>

        <div className="space-y-2 border-t border-gray-800 px-6 py-5 text-sm text-gray-300">
          <p className="font-semibold text-white">Project video walkthrough</p>
          <p>
            This demo launches in an independent overlay, separate from the sandbox modal, so you can review the project video without affecting your sandbox session.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SIMULATOR WORKBENCH COMPONENT (Provides actual fun prototype utility)
   ========================================================================== */
interface SimulatorProps {
  project: ProjectItem;
  onClose: () => void;
}

function SimulatorWindow({ project, onClose }: SimulatorProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    modalRef.current?.focus();
    modalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  return (
    <div className="fixed inset-0 z-50 grid min-h-screen place-items-center bg-black/80 backdrop-blur-sm p-4 sm:p-6">
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sandbox-modal-title"
        className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-brand-primary/40 bg-[#090A0F] shadow-[0_0_100px_rgba(16,185,129,0.15)] outline-none"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#12131A]">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.32em] text-brand-primary">
              PROJECT SANDBOX
            </p>
            <h3 id="sandbox-modal-title" className="mt-2 text-lg font-bold text-white">{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-500/30 bg-[#0B0E14] text-gray-300 transition-colors hover:border-orange-400 hover:text-white"
            aria-label="Close sandbox modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {project.demoUrl ? (
          <div className="relative h-[68vh] min-h-[520px] bg-[#05070B]">
            <iframe
              src={project.demoUrl}
              title={project.title}
              className="h-full w-full border-0 bg-black"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              allowFullScreen
            />
            <div className="absolute left-0 right-0 top-0 flex items-center justify-between gap-4 border-b border-gray-800 bg-[#090B10]/90 px-6 py-3 backdrop-blur-sm text-xs text-gray-300">
              <span>Live portfolio preview</span>
              <span className="rounded-full bg-orange-500/10 px-3 py-1 text-orange-300">Running inside modal</span>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center space-y-6 bg-dark-bg">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-300">
              <Sparkles className="h-7 w-7" />
            </div>
            <p className="text-sm leading-relaxed text-gray-300">
              This project is currently under development. The interactive sandbox is coming soon once the workspace is completed.
            </p>
            <div className="rounded-2xl border border-gray-800 bg-[#080A0F] p-5 text-left text-xs text-gray-400">
              <p className="font-semibold text-white">Project Status</p>
              <p className="mt-2 font-semibold text-orange-300">Coming Soon</p>
              <p className="mt-4">Title: {project.title}</p>
              <p>Category: {project.category}</p>
              <p className="text-gray-500 mt-4">Please check back later for the full interactive preview.</p>
            </div>
          </div>
        )}

        <div className="border-t border-gray-800 bg-[#0B0E14] px-6 py-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="space-y-4">
              <div className="rounded-xl border border-gray-900 bg-[#06070B] p-4 text-[11px] text-gray-300">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-gray-500">
                    EMPLOYMENT STATUS
                  </span>
                  <span className="inline-flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded text-[8px] font-bold text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    SEEKING EMPLOYMENT
                  </span>
                </div>
                <div className="mt-2 text-[11px] text-white font-medium">
                  YES Program Intern @ <span className="text-brand-primary">CAPACITI</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#11121A] border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-colors"
                  title="GitHub Profile"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#11121A] border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-colors"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#11121A] border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-colors"
                  title="Email Contact"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <span className="rounded-full bg-gray-900 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-gray-500">
                © 2026 FZ SIXIMBA
              </span>
              <button
                onClick={onClose}
                className="rounded-full bg-brand-primary px-5 py-2 text-sm font-bold text-dark-bg transition hover:bg-brand-hover"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 1. MOCK ANIME VERSE CATALOUGE PROTOTYPE */
function AnimeVerseSimulator() {
  const [selectedSeason, setSelectedSeason] = useState<string>('All');
  const [playingEpisode, setPlayingEpisode] = useState<string | null>(null);

  const episodes = [
    { id: 'ep1', episode: 1, title: "Homecoming: The Ninja Returns", season: "Naruto Era", length: "24m", watchPercent: "100%", isShippuden: true },
    { id: 'ep2', episode: 2, title: "My Master Jiraiya's Secret Intel", season: "Shippuden", length: "24m", watchPercent: "85%", isShippuden: true },
    { id: 'ep3', episode: 3, title: "Unveiling the Nine-Tails Chakra", season: "Shippuden", length: "24m", watchPercent: "0%", isShippuden: true },
    { id: 'ep4', episode: 4, title: "A Sage's Resolving Decree", season: "Sages & Hokages", length: "25m", watchPercent: "20%", isShippuden: false },
    { id: 'ep5', episode: 5, title: "Battle of the Legendary Sannin", season: "Naruto Era", length: "23m", watchPercent: "0%", isShippuden: false }
  ];

  const seasonsList = ['All', 'Naruto Era', 'Shippuden', 'Sages & Hokages'];

  const filteredEps = selectedSeason === 'All' 
    ? episodes 
    : episodes.filter(e => e.season === selectedSeason);

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-[#090A0F] border border-brand-primary/20 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tv className="h-5 w-5 text-brand-primary" />
            <h4 className="font-display text-base font-bold text-white">Stream Deck Media Hub Prototype</h4>
          </div>
          <span className="font-mono text-[9px] bg-brand-primary/10 text-brand-primary border border-brand-primary/20 px-2 py-0.5 rounded">
            STYLE MATCH: ANIMEVERSE.TO
          </span>
        </div>

        {/* Real project video asset from the portfolio videos folder */}
        <div className="relative aspect-video w-full rounded-lg bg-black border border-gray-800 overflow-hidden">
          <video
            className="h-full w-full object-cover"
            controls
            src={projectVideo}
            preload="metadata"
            playsInline
            muted
          />

          {/* Bottom simulated navigation UI controls */}
          <div className="absolute bottom-0 inset-x-0 bg-dark-bg/85 backdrop-blur-sm border-t border-gray-800/80 px-4 py-2 flex items-center justify-between text-[11px] font-mono text-gray-400">
            <div className="flex gap-4">
              <span>VOL: 90%</span>
              <span>1080p SOURCE</span>
            </div>
            <span>SUB: ENG (ACTIVE)</span>
          </div>

        </div>

        {/* Season Toggles */}
        <div className="space-y-2">
          <span className="block font-mono text-[9px] text-gray-400 font-bold uppercase">
            Select Era Catalog Series:
          </span>
          <div className="flex flex-wrap gap-1">
            {seasonsList.map((szn) => (
              <button
                key={szn}
                onClick={() => setSelectedSeason(szn)}
                className={`px-3 py-1 text-xs rounded transition-all focus:outline-none ${
                  selectedSeason === szn
                    ? 'bg-brand-primary text-dark-bg font-bold'
                    : 'bg-dark-surface border border-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                {szn}
              </button>
            ))}
          </div>
        </div>

        {/* Episode selection cards list structure */}
        <div className="space-y-2">
          <span className="block font-mono text-[9px] text-gray-400 font-bold uppercase">
            Aired Chronicles ({filteredEps.length}):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[160px] overflow-y-auto pr-1">
            {filteredEps.map((ep) => (
              <button
                key={ep.id}
                onClick={() => setPlayingEpisode(`Episode ${ep.episode} - ${ep.title}`)}
                className="text-left rounded bg-dark-surface border border-gray-800/80 p-3 hover:border-brand-primary group transition-all"
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 pb-1">
                  <span>EP. {ep.episode}</span>
                  <span className="text-brand-primary">{ep.season}</span>
                </div>
                <h6 className="font-display text-xs font-bold text-gray-200 group-hover:text-brand-primary truncate">
                  {ep.title}
                </h6>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

/* 2. MOCK APEX WORKSAPCE DASHBOARD PROTOTYPE */
function ApexWorkspaceSimulator() {
  const [dataPoints, setDataPoints] = useState([
    { label: "Milestone A", count: 88, weight: "High" },
    { label: "Sprint Core", count: 95, weight: "Crit" },
    { label: "Beta Prep", count: 62, weight: "Low" },
    { label: "UI Polish", count: 77, weight: "Med" }
  ]);
  const [newLabel, setNewLabel] = useState('');
  const [newCount, setNewCount] = useState(80);

  const addNewMetric = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim()) return;
    setDataPoints([...dataPoints, { label: newLabel, count: Math.min(newCount, 100), weight: 'Med' }]);
    setNewLabel('');
  };

  const deleteMetric = (index: number) => {
    setDataPoints(dataPoints.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-800 bg-[#0C0D13] p-5 space-y-5">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            <h4 className="font-display text-base font-bold text-white">Dynamic KPI Workspace Terminal</h4>
          </div>
          <span className="font-mono text-xs font-semibold text-emerald-400">// INTEGRATED CRIT STATS</span>
        </div>

        {/* Live dynamic bars visualizer */}
        <div className="space-y-3.5">
          {dataPoints.map((dp, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-gray-300 font-semibold">{dp.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-[10px]">WEIGHT: {dp.weight}</span>
                  <span className="text-amber-500 font-bold">{dp.count}%</span>
                  <button onClick={() => deleteMetric(idx)} className="text-gray-500 hover:text-red-400 ml-1">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <div className="h-2 rounded-full bg-gray-800 overflow-hidden border border-gray-800/50">
                <div 
                  className="h-full bg-gradient-to-r from-amber-600 to-yellow-500 rounded-full transition-all duration-500"
                  style={{ width: `${dp.count}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Input form to add milestones */}
        <form onSubmit={addNewMetric} className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-3 border-t border-gray-800/60">
          <div className="sm:col-span-6">
            <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Milestone Name:</label>
            <input 
              type="text" 
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="e.g., API Deployment"
              className="w-full text-xs rounded bg-dark-bg border border-gray-800 text-white placeholder-gray-600 p-2 focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div className="sm:col-span-3">
            <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Percentage:</label>
            <input 
              type="number" 
              value={newCount}
              onChange={(e) => setNewCount(parseInt(e.target.value) || 0)}
              min="1" 
              max="100"
              className="w-full text-xs rounded bg-dark-bg border border-gray-800 text-white p-2 focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div className="sm:col-span-3 flex items-end">
            <button 
              type="submit"
              className="w-full h-8.5 inline-flex items-center justify-center gap-1.5 rounded bg-amber-500 hover:bg-amber-600 text-xs font-bold text-dark-bg transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add stat</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

/* 3. MOCK ZENDU FOCUS countdown timer with sounds */
function ZenduFocusSimulator() {
  const [secondsLeft, setSecondsLeft] = useState(1500); // 25:00
  const [isActive, setIsActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [soundChannel, setSoundChannel] = useState<'lofi' | 'ocean' | 'bamboo'>('lofi');

  React.useEffect(() => {
    let interval: any = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((s) => s - 1);
      }, 1000);
    } else {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setSecondsLeft(1500);
    setIsActive(false);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-800 bg-[#0C1210] p-6 text-center space-y-6">
        
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <div className="flex items-center gap-2 text-emerald-400">
            <Flame className="h-5 w-5" />
            <h4 className="font-display text-base font-bold text-white">Atmospheric Zen Countdown Deck</h4>
          </div>
          <span className="font-mono text-xs font-semibold text-emerald-400">// ISOMETRIC LOGOPS</span>
        </div>

        {/* Big circular design display */}
        <div className="mx-auto flex h-48 w-48 flex-col items-center justify-center rounded-full border-4 border-emerald-500 bg-emerald-500/5 relative overflow-hidden transition-all duration-500 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent pointer-events-none" />
          <span className="block font-mono text-3xl font-bold tracking-tight text-white mb-1">
            {formatTimer(secondsLeft)}
          </span>
          <span className="block font-mono text-[9px] text-emerald-400 tracking-widest font-bold uppercase animate-pulse">
            {isActive ? 'FLOW STATE OPEN' : 'RESERVED STALL'}
          </span>
        </div>

        {/* Playback triggers */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`px-6 py-2 rounded-lg font-display text-xs font-bold transition-all focus:outline-none ${
              isActive ? 'bg-[#FF5500] text-white' : 'bg-emerald-500 text-dark-bg'
            }`}
          >
            {isActive ? 'Halt Loop' : 'Initiate Cycle'}
          </button>
          
          <button
            onClick={resetTimer}
            className="px-4 py-2 rounded-lg bg-transparent border border-gray-800 hover:border-gray-700 font-display text-xs text-gray-300 transition-all focus:outline-none"
          >
            Reset Code
          </button>
        </div>

        {/* Ambient Sound Selection cards mockup */}
        <div className="space-y-2 text-left bg-dark-bg/40 p-4 rounded-lg border border-gray-800/50">
          <div className="flex items-center justify-between font-mono text-[10px] text-gray-400 mb-1.5 pb-1 border-b border-gray-800/40">
            <span>AMBIENT FIELD ACOUSTICS:</span>
            <button 
              onClick={() => setSoundEnabled(!soundEnabled)} 
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-500 focus:outline-none"
            >
              {soundEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5 text-gray-500" />}
              <span>{soundEnabled ? 'LIVE SOUND' : 'MUTED'}</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'lofi', label: "Lofi Library" },
              { id: 'ocean', label: "Ocean Waves" },
              { id: 'bamboo', label: "Zen Forests" }
            ].map((sound) => (
              <button
                key={sound.id}
                onClick={() => {
                  setSoundChannel(sound.id as any);
                  setSoundEnabled(true);
                }}
                className={`py-2 px-1 text-center font-mono text-[10px] rounded transition-all focus:outline-none cursor-pointer ${
                  soundChannel === sound.id && soundEnabled
                    ? 'bg-emerald-500/10 border border-emerald-500 text-emerald-400'
                    : 'bg-dark-surface border border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white'
                }`}
              >
                {sound.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
