import React from 'react';
import { Mail, Github, Linkedin, ArrowUp } from 'lucide-react';
import { personalInfo } from '../data';

interface FooterProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: { id: string; label: string }[];
}

export default function Footer({ activeTab, setActiveTab, tabs }: FooterProps) {
  
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800 bg-[#090A0E] text-gray-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-gray-800/60 pb-10">
          
          {/* Logo / Tagline (5 columns) */}
          <div className="md:col-span-5 space-y-4">
            <button 
              onClick={() => handleTabClick('home')}
              className="flex items-center gap-2.5 text-left focus:outline-none"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded bg-brand-primary font-display text-lg font-black text-dark-bg">
                FS
              </div>
              <div>
                <span className="block font-display text-base font-bold text-white">
                  Fika Zekhaya Siximba
                </span>
                <span className="block font-mono text-[9px] text-[#FF6B00]">
                  SOFTWARE ENGINEER & DESIGN ARCHITECT
                </span>
              </div>
            </button>
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              Engineering high-res interactive systems, blending strict architectural logic with flawless user journeys. Ready for high-impact web deployments.
            </p>
          </div>

          {/* Quick Nav (4 columns) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest">Quick Navigation</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`text-left transition-colors duration-200 focus:outline-none ${
                    activeTab === tab.id 
                      ? 'text-brand-primary font-semibold' 
                      : 'hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Details & Links (3 columns) */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest">Connect Pins</h4>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <span className="font-semibold text-gray-300">Base:</span>
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=Gqeberha,+South+Africa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary hover:underline hover:text-brand-hover transition-colors font-medium"
                >
                  Gqeberha, South Africa
                </a>
              </p>
              <p className="flex items-center gap-2 overflow-hidden truncate">
                <span className="font-semibold text-gray-300">Email:</span> 
                <a href={`mailto:${personalInfo.email}`} className="hover:text-white hover:underline truncate">
                  {personalInfo.email}
                </a>
              </p>
              
              {/* Raw link connectors icons */}
              <div className="flex gap-2.5 pt-1">
                <a 
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#14151F] border border-gray-800 text-gray-400 hover:text-white transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>

                <a 
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#14151F] border border-gray-800 text-gray-400 hover:text-white transition-colors"
                  title="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line with a smooth "Scroll To Top" anchor */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[11px] font-mono text-gray-500">
          <p>© {currentYear} Fika Zekhaya Siximba. All rights reserved. Created with high-res dark mode standards.</p>
          
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors text-[10px] focus:outline-none"
            title="Shatter gravity scroll, rise to high altitude"
          >
            <span>SCROLL TO ASCENT</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
