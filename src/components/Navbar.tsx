import React, { useState } from 'react';
import { Menu, X, Mail, Github, Linkedin, Briefcase, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { personalInfo } from '../data';

interface NavbarProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
  tabs: { id: string; label: string }[];
}

export default function Navbar({ activeTab, onTabClick, tabs }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleTabClick = (tabId: string) => {
    onTabClick(tabId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.25 } 
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2, delay: 0.1 } 
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: 'spring' as const, 
        stiffness: 350, 
        damping: 28
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: 15,
      transition: { 
        duration: 0.2 
      } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const staggerItem = {
    hidden: { x: -15, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { 
        type: 'spring' as const, 
        stiffness: 280, 
        damping: 24 
      } 
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-dark-border bg-dark-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Side: Burger Menu Button - only on mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group inline-flex h-10 items-center justify-center rounded-lg border border-gray-800 bg-[#12131A] px-3.5 text-gray-400 hover:bg-[#1C1E26] hover:text-white hover:border-gray-700 focus:outline-none focus:ring-1 focus:ring-brand-primary cursor-pointer transition-all lg:hidden"
          aria-expanded={isOpen}
          title="Toggle Navigation Menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="ml-2 text-xs font-mono font-bold tracking-wider uppercase text-gray-400 group-hover:text-white">
            MENU
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {tabs.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`text-sm font-semibold transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'text-brand-primary'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Right Side: Seeking Employment Badge */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Seeking Employment
          </div>
        </div>

      </div>
    </header>

    {/* Modern Mobile Full-Screen Menu Popup Modal using Framer Motion */}
    <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl"
          >
            {/* Modal Box */}
            <motion.div
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md max-h-[85vh] bg-[#090A0F] border border-gray-800 rounded-2xl shadow-[0_0_50px_-12px_rgba(255,107,0,0.15)] flex flex-col p-6 sm:p-8 overflow-hidden"
            >
              {/* Close Button top right */}
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 h-8 w-8 inline-flex items-center justify-center rounded-full bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-colors cursor-pointer z-10"
                title="Close menu"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Monogram indicator */}
              <div className="flex items-center gap-2 pb-5 border-b border-gray-900/60 mb-5 shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-primary font-display text-sm font-bold text-dark-bg">
                  FS
                </div>
                <div>
                  <div className="font-display text-sm font-black tracking-tight text-white">
                    Zekhaya Siximba
                  </div>
                  <div className="font-mono text-[8px] text-brand-primary font-semibold uppercase tracking-wider">
                    Menu Explorer
                  </div>
                </div>
              </div>
              
              {/* Scrollable Container */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-5 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
                {/* Navigation Links List */}
                <motion.div 
                  variants={staggerContainer}
                  className="space-y-3"
                >
                  {tabs.map((tab, idx) => (
                    <motion.div key={tab.id} variants={staggerItem}>
                      <button
                        onClick={() => handleTabClick(tab.id)}
                        className="group flex w-full items-center justify-between py-2.5 text-left font-display text-xl font-extrabold tracking-tight transition-all focus:outline-none cursor-pointer"
                      >
                        <span className="flex items-baseline gap-3">
                          <span className="font-mono text-[10px] font-bold text-brand-primary/60 select-none">
                            0{idx + 1}.
                          </span>
                          <span className={`transition-colors duration-200 ${
                            activeTab === tab.id
                              ? 'text-brand-primary'
                              : 'text-white hover:text-brand-primary'
                          }`}>
                            {tab.label}
                          </span>
                        </span>
                        <ArrowRight className="h-4 w-4 text-gray-600 transition-transform group-hover:translate-x-1 group-hover:text-brand-primary" />
                      </button>
                      {idx < tabs.length - 1 && (
                        <div className="h-px bg-gray-900/40 w-full mt-1.5" />
                      )}
                    </motion.div>
                  ))}
                </motion.div>

                {/* Footer Section within Modal */}
                <div className="space-y-4 pt-5 border-t border-gray-900/60">
                  
                  {/* Active Employment Status Badge */}
                  <div className="rounded-xl border border-gray-900 bg-[#06070B] p-3.5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[8px] font-bold text-gray-500 uppercase tracking-wider">
                        EMPLOYMENT STATUS
                      </span>
                      <span className="inline-flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded text-[8px] font-bold text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        SEEKING EMPLOYMENT
                      </span>
                    </div>
                    <div className="text-[11px] text-white font-medium">
                      YES Program Intern @ <span className="text-brand-primary">Capaciti</span>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex flex-col gap-3">
                    {/* Social Circles */}
                    <div className="flex items-center justify-center gap-2.5">
                      <a
                        href={personalInfo.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#11121A] border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-colors"
                        title="GitHub Profile"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                      <a
                        href={personalInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#11121A] border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-colors"
                        title="LinkedIn Profile"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#11121A] border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-colors"
                        title="Email Contact"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  {/* Micro-monogram indicator */}
                  <div className="text-center font-mono text-[8px] text-gray-600 pt-1">
                    © 2026 FZ SIXIMBA // CLOUD GATEWAY
                  </div>

                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

