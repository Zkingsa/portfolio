import React from 'react';
import { ArrowRight, Sparkles, FileDown } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { personalInfo } from '../data';
import FikaPhoto from '../assets/images/Fika.jpeg';

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

export default function Home({ setActiveTab }: HomeProps) {
  const downloadPDFCV = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const primaryColor = [15, 23, 42]; // Slate 900
    const secondaryColor = [37, 99, 235]; // Blue 600
    const textColor = [51, 65, 85]; // Slate 700
    const headingColor = [15, 23, 42]; 
    
    let y = 15;
    const marginX = 15;
    const pageWidth = 210;
    const pageHeight = 297;
    const contentWidth = pageWidth - (marginX * 2);

    const checkPageBreak = (neededHeight: number) => {
      if (y + neededHeight > pageHeight - 15) {
        doc.addPage();
        y = 15;
        return true;
      }
      return false;
    };

    const drawHeader = () => {
      // Top bar accent
      doc.setFillColor(15, 23, 42);
      doc.rect(marginX, y, contentWidth, 1.5, 'F');
      y += 6;

      // Name
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('FIKA ZEKHAYA SIXIMBA', marginX, y);
      y += 6;

      // Subtitle
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.text('AI ENGINEER & FULL-STACK DEVELOPER', marginX, y);
      y += 5;

      // Contact Details
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      
      // Col 1
      doc.text('Mobile: 072 974 1393', marginX, y);
      doc.text('Email: siximbazekhaya@gmail.com', marginX, y + 4);
      doc.text('Location: Gqeberha, Eastern Cape, South Africa', marginX, y + 8);

      // Col 2
      doc.text('GitHub: github.com/Zkingsa', marginX + contentWidth / 2 + 10, y);
      doc.text('LinkedIn: linkedin.com/in/fika-zekhaya-siximba-332859312', marginX + contentWidth / 2 + 10, y + 4);
      y += 13;

      // Divider line
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.4);
      doc.line(marginX, y, marginX + contentWidth, y);
      y += 6;
    };

    const drawSectionHeader = (title: string) => {
      checkPageBreak(12);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(title.toUpperCase(), marginX, y);
      y += 2;
      
      doc.setDrawColor(37, 99, 235); // Blue
      doc.setLineWidth(0.5);
      doc.line(marginX, y, marginX + 18, y);
      
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.2);
      doc.line(marginX + 18, y, marginX + contentWidth, y);
      y += 5;
    };

    const drawParagraph = (text: string) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      const lines = doc.splitTextToSize(text, contentWidth);
      const neededHeight = lines.length * 4.2;
      checkPageBreak(neededHeight + 2);
      doc.text(lines, marginX, y, { align: 'justify', lineHeightFactor: 1.2 });
      y += neededHeight + 3.5;
    };

    // Run header
    drawHeader();

    // 1. Professional Summary
    drawSectionHeader('Professional Summary');
    drawParagraph('A highly versatile AI Engineer and Full-Stack Developer interning under the YES Youth Program at Capaciti. Currently based in Gqeberha, South Africa, and actively available for full-stack system building, prompt design, and AI development opportunities. Deeply competent in modern web development ecosystem tools (React, Vite, Tailwind CSS), server-side configurations, and deploying advanced generative workflows. Proud holder of a South African Code 14 (EC) Professional Driving Licence with PrDP.');

    // 2. Work Experience
    drawSectionHeader('Work Experience');

    const jobs = [
      {
        role: 'AI Engineer & Full-Stack Developer (Internship)',
        company: 'Capaciti (YES Youth Program)',
        date: 'Jan 2026 - Present',
        bullets: [
          'Engineering innovative prompt structures and implementing AI pipelines with Google AI Essentials methodologies.',
          'Developing robust responsive user dashboards using React, Vite, and Tailwind CSS.',
          'Creating modular layouts and type-safe front-ends optimized for performance and fluid UX.'
        ]
      },
      {
        role: 'Stock Inventory Specialist',
        company: 'Makro EL (Retail Solutions)',
        date: 'Jul 2025 - Dec 2025',
        bullets: [
          'Supervised bulk stock verification processes, verified inventory barcodes, and troubleshot warehouse terminal hardware.',
          'Managed database updates for overnight audits and communicated logistics status to management.',
          'Maintained 100% item audit accuracy over major quarterly stock audits.'
        ]
      },
      {
        role: 'IT Technician',
        company: 'Game Stores',
        date: 'Dec 2024 - Jun 2025',
        bullets: [
          'Diagnostics and repair of point-of-sale (POS) terminal hardware, local network routing, and software installations.',
          'Replaced components, assembled hardware accessories, and guaranteed minimal operations downtime.',
          'Reduced overall hardware troubleshooting response times by 35%.'
        ]
      },
      {
        role: 'FASSET Tutor',
        company: 'Walter Sisulu University',
        date: 'May 2024 - Nov 2024',
        bullets: [
          'Formulated custom coding lessons and delivered lectures to FASSET scholarship IT students.',
          'Facilitated hands-on compiler diagnostics tutorials, database query guidelines, and version control structures.',
          'Supported 90%+ participating students to successfully pass their software development curriculum modules.'
        ]
      },
      {
        role: 'Peer Assistant Learner',
        company: 'Walter Sisulu University',
        date: 'May 2023 - Nov 2023',
        bullets: [
          'Coached student cohorts in relational database schemas, query analysis, and object-oriented programming foundations.',
          'Maintained lab machinery availability and helped freshmen students setup development compilers.'
        ]
      }
    ];

    jobs.forEach(job => {
      checkPageBreak(18);
      
      // Role & Date
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(headingColor[0], headingColor[1], headingColor[2]);
      doc.text(job.role, marginX, y);
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      const dateWidth = doc.getTextWidth(job.date);
      doc.text(job.date, marginX + contentWidth - dateWidth, y);
      y += 4;

      // Company
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8.5);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.text(job.company, marginX, y);
      y += 4.5;

      // Bullets
      job.bullets.forEach(bullet => {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        const bulletText = doc.splitTextToSize(bullet, contentWidth - 5);
        const neededHeight = bulletText.length * 3.8;
        checkPageBreak(neededHeight + 1.5);
        
        doc.text('•', marginX + 1.5, y);
        doc.text(bulletText, marginX + 4.5, y, { lineHeightFactor: 1.15 });
        y += neededHeight + 1.2;
      });
      y += 2.2;
    });

    // 3. Education
    drawSectionHeader('Education');
    
    const eduItems = [
      {
        degree: 'Diploma in Information and Communications Technology in Applications Development',
        inst: 'Walter Sisulu University (Potsdam Campus)',
        date: '2022 - 2025 (Graduated May 2025)',
        desc: 'Specialized in database systems, systems analysis, object-oriented applications, and internet technologies.'
      },
      {
        degree: 'National Senior Certificate (Matriculated)',
        inst: 'Milton Mbekela Senior Secondary School (Umtata, Qunu)',
        date: '2018 - 2020',
        desc: 'Passed with university entrance admission. Outstanding competency in logical reasoning and analytical problem solving.'
      }
    ];

    eduItems.forEach(edu => {
      checkPageBreak(15);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(headingColor[0], headingColor[1], headingColor[2]);
      
      const degLines = doc.splitTextToSize(edu.degree, contentWidth - 45);
      doc.text(degLines, marginX, y);
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      const dateWidth = doc.getTextWidth(edu.date);
      doc.text(edu.date, marginX + contentWidth - dateWidth, y);
      y += (degLines.length * 4) + 0.5;

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8.5);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.text(edu.inst, marginX, y);
      y += 4;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      const descLines = doc.splitTextToSize(edu.desc, contentWidth);
      doc.text(descLines, marginX, y);
      y += (descLines.length * 3.8) + 3.5;
    });

    // 4. Certifications & Licences
    drawSectionHeader('Certifications & Professional Licences');
    const certs = [
      'Google AI Essentials Specialization (Coursera / Google Career Certificates) - May 2026',
      'Generative AI: Prompt Engineering Basics (Coursera / IBM Skills Network) - May 2026',
      'South African Code 14 (EC) Professional Driving Licence & PrDP (Heavy Vehicles > 16,000kg) - Expires Mar 2027'
    ];
    certs.forEach(cert => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      const lines = doc.splitTextToSize(cert, contentWidth - 5);
      const neededHeight = lines.length * 3.8;
      checkPageBreak(neededHeight + 1.5);
      
      doc.text('•', marginX + 1.5, y);
      doc.text(lines, marginX + 4.5, y);
      y += neededHeight + 1.5;
    });
    y += 2.5;

    // 5. Academic Excellence & Wins
    drawSectionHeader('Academic Excellence & Achievements');
    const achievements = [
      'Top Performing Coordinator, Walter Sisulu University Peer Tutorial teams (2024).',
      'Selected as YES Youth Program Delegate at Capaciti based on advanced developer credentials (2026).',
      'Active IT Youth Ambassador with heavy logistic capability.'
    ];
    achievements.forEach(ach => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      const lines = doc.splitTextToSize(ach, contentWidth - 5);
      const neededHeight = lines.length * 3.8;
      checkPageBreak(neededHeight + 1.5);
      
      doc.text('•', marginX + 1.5, y);
      doc.text(lines, marginX + 4.5, y);
      y += neededHeight + 1.5;
    });
    y += 2.5;

    // 6. References
    drawSectionHeader('Professional References');
    const refs = [
      { name: 'Mr. Mbodila', role: 'HOD in ICT WSU', contact: '072 672 1466' },
      { name: 'Miss N. Mzileni', role: 'PALL Coordinator WSU', contact: '078 634 8731' },
      { name: 'Miss Nombola', role: 'High School Teacher', contact: '064 061 0228' },
      { name: 'Miss Lukho Mazwi', role: 'FASSET Facilitator', contact: 'lmazwi@wsu.ac.za' },
      { name: 'Mr. Colin', role: 'Makro EL Manager', contact: '074 763 1656' },
      { name: 'Mr. M.G Mntukatandwa', role: 'Game Store Manager', contact: '073 317 1047' }
    ];

    const chunkedRefs = [];
    for (let i = 0; i < refs.length; i += 3) {
      chunkedRefs.push(refs.slice(i, i + 3));
    }

    chunkedRefs.forEach(row => {
      checkPageBreak(12);
      row.forEach((ref, index) => {
        const colX = marginX + (index * (contentWidth / 3));
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text(ref.name, colX, y);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        doc.text(ref.role, colX, y + 3);
        doc.text(`Contact: ${ref.contact}`, colX, y + 6);
      });
      y += 9.5;
    });

    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7.5);
      doc.setTextColor(150, 150, 150);
      doc.text(`Fika Zekhaya Siximba — Resume PDF — Page ${i} of ${pageCount}`, marginX, pageHeight - 8);
      doc.text('Generated via Accredited Developer System', marginX + contentWidth - 55, pageHeight - 8);
    }

    doc.save('Fika_Zekhaya_Siximba_CV.pdf');
  };

  return (
    <section className="relative overflow-hidden py-12 md:py-20 lg:py-24">
      {/* Absolute Ambient Background Orbs */}
      <div className="absolute top-10 left-1/4 h-[500px] w-[500px] rounded-full ambient-glow-orange -translate-y-1/2 pointer-events-none opacity-40 animate-pulse" />
      <div className="absolute bottom-10 right-1/4 h-[400px] w-[400px] rounded-full ambient-glow-purple translate-y-1/2 pointer-events-none opacity-40" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text content (7 columns) */}
          <div className="col-span-1 lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="flex flex-wrap gap-2 items-center justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-4 py-1.5 text-xs font-semibold text-brand-primary border border-brand-primary/20">
                <Sparkles className="h-3.5 w-3.5" />
                <span>YES Youth Program Intern @ Capaciti</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Actively Available for Roles</span>
              </div>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Meet <span className="text-brand-primary">{personalInfo.fullName}</span>
            </h1>
            
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-gray-200 tracking-wide">
              {personalInfo.title}
            </h2>

            <p className="font-display text-lg italic text-brand-primary/95 font-medium">
              &ldquo;{personalInfo.tagline}&rdquo;
            </p>

            <p className="mx-auto lg:mx-0 max-w-2xl text-base sm:text-lg text-gray-300 leading-relaxed">
              {personalInfo.summary}
            </p>

            {/* Quick Hero Actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => setActiveTab('projects')}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brand-primary px-6 text-sm font-bold text-dark-bg transition-all duration-300 hover:bg-brand-hover hover:scale-[1.02] focus:outline-none"
                id="view-work-btn"
              >
                <span>View My Work</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={downloadPDFCV}
                className="inline-flex h-12 items-center gap-2 rounded-lg bg-transparent border border-brand-primary/30 px-5 text-sm font-semibold text-brand-primary transition-all duration-200 hover:bg-brand-primary/5 hover:border-brand-primary h-12 cursor-pointer"
                title="Download verified professional PDF resume/CV"
                id="download-cv-btn"
              >
                <FileDown className="h-4 w-4" />
                <span>Download CV</span>
              </button>
            </div>

            {/* Micro-Overview Panels (factual attributes only, no scifi larping) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 border-t border-gray-800 max-w-lg mx-auto lg:mx-0">
              <div className="space-y-1 text-center lg:text-left">
                <span className="block font-mono text-xs text-gray-500 uppercase tracking-wider">EMPLOYMENT STATUS</span>
                <span className="block font-display text-sm font-semibold text-emerald-400">Available / Interning</span>
              </div>
              <div className="space-y-1 text-center lg:text-left">
                <span className="block font-mono text-xs text-gray-500 uppercase tracking-wider">LOCATION</span>
                <span className="block font-display text-sm font-semibold text-white">Gqeberha, SA</span>
              </div>
              <div className="col-span-2 sm:col-span-1 space-y-1 text-center lg:text-left">
                <span className="block font-mono text-xs text-gray-500 uppercase tracking-wider">EDUCATION</span>
                <span className="block font-display text-sm font-semibold text-white">Dip. ICT (App Dev)</span>
              </div>
            </div>

          </div>

          {/* Photo frame element with genuine layout parameters */}
          <div className="col-span-1 lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
              
              {/* Outer decorative media border */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-brand-primary via-orange-500 to-indigo-600 opacity-20 blur-sm" />
              
              <div className="relative rounded-2xl border border-gray-800 bg-dark-surface p-4 overflow-hidden shadow-2xl">
                
                {/* Photo frame */}
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#111827] via-[#1F2937] to-[#111827] border border-gray-800">
                  <img
                    src={FikaPhoto}
                    alt="Fika Zekhaya Siximba"
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-4 pt-14 flex items-end justify-between">
                    <div>
                      <span className="block font-display text-xs font-bold text-white tracking-wide uppercase">
                        FIKA Z. SIXIMBA
                      </span>
                      <span className="block font-mono text-[9px] text-emerald-400 font-bold uppercase mt-0.5">
                        Seeking Employment
                      </span>
                    </div>
                    <span className="text-[10px] bg-brand-primary/10 border border-brand-primary/20 px-2.5 py-0.5 rounded text-brand-primary font-mono font-bold tracking-tight">
                      EC LICENSED
                    </span>
                  </div>
                </div>

                {/* Micro details panel showing genuine, truthful, non-larp metadata */}
                <div className="mt-4 pt-4 border-t border-gray-800/80 space-y-3 font-mono text-xs text-gray-400">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Contact Status:</span>
                    <span className="text-emerald-400 font-bold uppercase tracking-wider animate-pulse">Open for Roles</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Current Role:</span>
                    <span className="text-white font-semibold">YES Program Intern @ Capaciti</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Core Specialty:</span>
                    <span className="text-white font-semibold">AI Prompt Mastery & Full-Stack</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Licence Status:</span>
                    <span className="text-brand-primary font-bold">Code 14 Driving Permit</span>
                  </div>
                </div>

              </div>
            </div>
            
            {/* Quick caption */}
            <p className="mt-3 text-center text-[10px] font-mono text-gray-500">
              *Profile photo in elegant traditional Xhosa attire.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
