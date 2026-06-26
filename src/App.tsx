import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

const TABS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Timeline' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [projectsNavKey, setProjectsNavKey] = useState(0);
  const [ndaAccepted, setNdaAccepted] = useState<boolean>(() => {
    try {
      return Boolean(localStorage.getItem('fika_portfolio_nda_accepted'));
    } catch {
      return false;
    }
  });

  const handleTabClick = (tabId: string) => {
    if (tabId === 'projects') {
      setProjectsNavKey((prev) => prev + 1);
    }
    setActiveTab(tabId);
  };

  return (
    <div className="flex min-h-screen flex-col bg-dark-bg text-gray-200 antialiased selection:bg-brand-primary/30 selection:text-white">
      {/* Dynamic ambient particles or ambient layout orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[8%] h-[350px] w-[350px] rounded-full ambient-glow-orange opacity-40 blur-3xl" />
        <div className="absolute bottom-[13%] right-[12%] h-[400px] w-[350px] rounded-full ambient-glow-purple opacity-30 blur-3xl" />
      </div>

      {/* Primary Shared Navigation Header */}
      <Navbar activeTab={activeTab} onTabClick={handleTabClick} tabs={TABS} />
      
      {/* Sweeping orange light overlay */}
      <div className="relative w-full overflow-hidden border-b border-orange-500/10 z-20">
        <div className="absolute inset-x-0 top-0 h-[180px] bg-gradient-to-r from-transparent via-orange-400/35 to-transparent blur-[30px] animate-sweep-light" />
      </div>

      {/* Content Canvas */}
      <main className="flex-grow relative z-10 transition-all duration-300">
        <div className="animate-page-enter">
          {activeTab === 'home' && <Home setActiveTab={setActiveTab} />}
          {activeTab === 'about' && <About />}
          {activeTab === 'education' && <Education />}
          {activeTab === 'experience' && <Experience />}
          {activeTab === 'projects' && (
            <Projects
              projectsNavKey={projectsNavKey}
              onNdaAccepted={() => setNdaAccepted(true)}
              onNdaDismissed={() => setActiveTab('home')}
            />
          )}
          {activeTab === 'certifications' && <Certifications />}
          {activeTab === 'contact' && <Contact />}
        </div>
      </main>

      {/* Shared Footer coordinates */}
      <Footer activeTab={activeTab} setActiveTab={setActiveTab} tabs={TABS} />
    </div>
  );
}

