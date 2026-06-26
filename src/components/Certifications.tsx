import React, { useState } from 'react';
import { Award, Eye, ExternalLink, Calendar, ShieldCheck, X, FileText, Fingerprint } from 'lucide-react';
import { certifications, personalInfo } from '../data';
import { CertificationItem } from '../types';

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [verifiedStatus, setVerifiedStatus] = useState(false);

  React.useEffect(() => {
    if (selectedCert) {
      window.scrollTo({ top: 0 });
      setTimeout(() => {
        const scrollContainers = document.querySelectorAll('.fixed.inset-0.overflow-y-auto');
        scrollContainers.forEach(el => {
          el.scrollTop = 0;
        });
      }, 0);
    }
  }, [selectedCert]);

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="mb-12 text-center lg:text-left">
          <span className="font-mono text-xs font-bold tracking-widest text-brand-primary uppercase">
            // ACCREDITATION KEYS & VERIFICATIONS
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Professional <span className="text-brand-primary">Certifications & Licenses</span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-gray-400">
            A verified vault of cloud certificates, AI prompt competencies, and state-certified professional driving credentials.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert) => (
            <div 
              key={cert.id}
              className="glowing-card rounded-2xl flex flex-col justify-between overflow-hidden shadow-xl"
            >
              
              {/* Card Header styling */}
              <div className="p-6 pb-4 space-y-4 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary/10 border border-brand-primary/25 text-brand-primary shrink-0">
                    <Award className="h-5.5 w-5.5" />
                  </div>
                  
                  {/* Verified badge */}
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                    <ShieldCheck className="h-3 w-3" />
                    <span>VERIFIED</span>
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display text-lg font-bold text-white tracking-tight leading-snug">
                    {cert.title}
                  </h3>
                  <p className="font-display text-sm font-semibold text-brand-primary">
                    {cert.issuer}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Issued: {cert.date}</span>
                </div>

                {/* Skill tags */}
                <div className="space-y-2 pt-2">
                  <span className="block font-mono text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                    VERIFIED FOCUS SKILLS:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {cert.skillsCode.map((skill, index) => (
                      <span 
                        key={index}
                        className="font-mono text-[10px] bg-[#161720] border border-gray-800 text-gray-300 px-2 py-0.5 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Buttons footer */}
              <div className="px-6 pb-6 pt-2 flex items-center gap-3">
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="flex-1 inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[#1F2232] border border-gray-800 text-xs font-semibold text-white transition-all duration-200 hover:bg-gray-800 focus:outline-none"
                >
                  <Eye className="h-3.5 w-3.5 animate-pulse text-brand-primary" />
                  <span>Inspect Document</span>
                </button>

                {cert.externalLink && cert.externalLink !== "#" ? (
                  <a
                    href={cert.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-transparent border border-brand-primary/25 text-brand-primary hover:bg-brand-primary/[0.03] hover:border-brand-primary transition-all duration-200"
                    title="Verify online"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-transparent border border-gray-800 text-gray-600 cursor-not-allowed">
                    <FileText className="h-3.5 w-3.5" />
                  </span>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* Certificate lightbox Viewer */}
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex justify-center items-start overflow-y-auto bg-black/90 backdrop-blur-sm p-2 sm:p-4 md:py-8">
            <div className="relative w-full max-w-4xl rounded-2xl border border-brand-primary/40 bg-[#0A0B10] p-4 sm:p-6 shadow-2xl space-y-6 print-container-active">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                  <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                    OFFICIAL STATE & ACADEMIC DOCUMENT VAULT // SECURED
                  </span>
                </div>
                
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-transparent border border-gray-800 text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Dynamic Document Renderer Frame */}
              <div className="relative rounded-xl border border-gray-800 bg-[#0E0F15] p-2 sm:p-4 overflow-hidden shadow-inner flex justify-center">
                
                {/* Mode 1: Google AI Essentials Specialization */}
                {selectedCert.id === "cert1" && (
                  <div className="relative w-full max-w-[760px] sm:aspect-[1.33] aspect-auto bg-white text-gray-900 rounded-lg p-4 sm:p-8 flex flex-col sm:flex-row shadow-xl select-none select-text overflow-hidden font-sans border-4 sm:border-8 border-slate-200">
                    
                    {/* Left Stripe: Coursera Blue Segment */}
                    <div className="w-full sm:w-[30%] bg-sky-950 text-white rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none p-4 flex flex-col justify-between relative overflow-hidden shrink-0 gap-4 sm:gap-0">
                      <div className="space-y-4 relative z-10">
                        <div className="font-sans font-bold text-lg tracking-tight text-sky-400">coursera</div>
                        <div className="h-px bg-white/20 w-full" />
                        <div className="space-y-2">
                          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Specialization</div>
                          <div className="text-xs font-extrabold text-white leading-normal">5 Courses Included:</div>
                        </div>
                        <ul className="text-[9px] text-gray-300 space-y-2 list-disc pl-4 font-medium leading-relaxed">
                          <li>Introduction to AI</li>
                          <li>Maximize Productivity With AI Tools</li>
                          <li>Discover the Art of Prompting</li>
                          <li>Use AI Responsibly</li>
                          <li>Stay Ahead of the AI Curve</li>
                        </ul>
                      </div>
                      
                      <div className="relative z-10 space-y-1">
                        <div className="text-[9px] font-bold text-gray-400">Google Career Certificates</div>
                        <div className="text-[8px] text-gray-500">CredRef: {selectedCert.credentialId}</div>
                      </div>

                      {/* Abstract Watermark background sphere */}
                      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-cyan-600/10 blur-xl" />
                    </div>

                    {/* Right Content Space */}
                    <div className="flex-1 p-4 sm:p-0 sm:pl-8 flex flex-col justify-between py-2 text-left gap-6 sm:gap-0">
                      
                      {/* Top Google Branding Block */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-sans font-black text-3xl tracking-tight text-gray-900 select-none">
                            <span className="text-blue-600">G</span>
                            <span className="text-red-500">o</span>
                            <span className="text-yellow-500">o</span>
                            <span className="text-blue-600">g</span>
                            <span className="text-green-500">l</span>
                            <span className="text-red-500">e</span>
                          </div>
                          <div className="text-[10px] text-gray-500 font-bold mt-1 uppercase tracking-wider">May 28, 2026</div>
                        </div>
                        
                        {/* Certificate Dotted Logo Emblem */}
                        <div className="h-14 w-14 rounded-full border-2 border-dashed border-sky-600/30 flex items-center justify-center p-1.5 opacity-80 shrink-0">
                          <Award className="h-7 w-7 text-sky-600" />
                        </div>
                      </div>

                      {/* Middle Certification Details */}
                      <div className="space-y-4 my-auto">
                        <div className="space-y-1">
                          <span className="text-[10px] text-sky-600 font-bold tracking-widest uppercase block">
                            Specialization Certificate Granted To
                          </span>
                          <h3 className="font-serif text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                            {personalInfo.fullName}
                          </h3>
                        </div>

                        <div className="h-0.5 bg-sky-600/10 w-full" />

                        <div className="space-y-2">
                          <p className="text-xs text-gray-500 leading-normal">
                            has successfully completed the online Specialization
                          </p>
                          <h4 className="font-sans text-xl sm:text-2xl font-black text-sky-950 tracking-tight">
                            Google AI Essentials
                          </h4>
                          <p className="text-[9px] text-gray-500 leading-normal font-medium max-w-[420px]">
                            Those who earn the Google AI Essentials Certificate have completed five courses, developed by Google, featuring hands-on practice designed to build AI skills. They are competent in using AI tools responsibly and improving productivity across their workflow.
                          </p>
                        </div>
                      </div>

                      {/* Bottom signatures and validations */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-t border-gray-100 pt-3 gap-4 sm:gap-0">
                        <div className="space-y-1">
                          <div className="font-serif text-sm italic font-bold text-gray-700">Amanda Brophy</div>
                          <div className="text-[8px] text-gray-400 font-semibold uppercase leading-tight">
                            Amanda Brophy <br />
                            <span className="text-gray-500 font-bold">Global Director of Google Career Certificates</span>
                          </div>
                        </div>

                        <div className="text-left sm:text-right space-y-1">
                          <a 
                            href={selectedCert.externalLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[9px] font-mono text-blue-600 font-semibold underline hover:text-blue-800"
                          >
                            Verify Credential
                          </a>
                          <div className="text-[8px] font-mono text-gray-400">
                            coursera.org/verify/specialization/{selectedCert.credentialId}
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                )}

                {/* Mode 2: IBM Generative AI Prompt Engineering Basics */}
                {selectedCert.id === "cert2" && (
                  <div className="relative w-full max-w-[760px] sm:aspect-[1.33] aspect-auto bg-[#FCFCFA] text-gray-900 rounded-lg p-4 sm:p-10 flex flex-col justify-between gap-6 sm:gap-4 shadow-xl select-none select-text overflow-hidden font-sans border-4 sm:border-8 border-stone-200">
                    
                    {/* Top Section: IBM Striped Branding and Certificate Class */}
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0">
                      <div className="space-y-2">
                        {/* Styled blue IBM Logo */}
                        <div className="font-sans font-black text-2xl tracking-tight text-blue-600 select-none flex flex-col leading-none">
                          <div className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">authorized by</div>
                          <span className="text-3xl text-[#006699] font-serif tracking-widest font-black uppercase">IBM</span>
                        </div>
                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">May 25, 2026</div>
                      </div>

                      <div className="text-left sm:text-right">
                        <div className="bg-[#1C3A62] text-white px-3 py-1 text-[10px] font-bold tracking-widest rounded-sm uppercase inline-block">
                          COURSE CERTIFICATE
                        </div>
                        <div className="text-[9px] text-[#006699] font-bold tracking-widest uppercase mt-2">
                          ibm skills network
                        </div>
                      </div>
                    </div>

                    {/* Middle Section: Recipient Details */}
                    <div className="space-y-4 my-auto">
                      <div className="space-y-1">
                        <div className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">
                          This is to certify that
                        </div>
                        <h3 className="font-serif text-3xl font-black text-gray-900 tracking-tight">
                          {personalInfo.fullName}
                        </h3>
                        <p className="text-xs text-gray-500 font-medium pb-2">
                          has successfully completed
                        </p>
                      </div>

                      <div className="h-0.5 bg-blue-600/10 w-full" />

                      <div className="space-y-2">
                        <h4 className="font-serif text-xl sm:text-2xl font-black text-[#1C3A62] tracking-tight">
                          Generative AI: Prompt Engineering Basics
                        </h4>
                        <p className="text-[9.5px] text-gray-500 leading-normal max-w-[540px]">
                          an online course authorized by IBM and offered through Coursera. Coursera has confirmed the identity of this individual and their participation in the course.
                        </p>
                      </div>
                    </div>

                    {/* Signatures & Online Verification Pin */}
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between border-t border-stone-100 pt-4 gap-6 sm:gap-0">
                      
                      {/* Signatories */}
                      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 text-left">
                        <div className="space-y-1">
                          <div className="font-serif text-sm italic font-semibold text-gray-700">Antonio Cangiano</div>
                          <div className="text-[8px] text-gray-400 leading-tight">
                            <strong className="text-gray-600">Antonio Cangiano</strong> <br />
                            Director, IBM Skills Network
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="font-serif text-sm italic font-semibold text-gray-700">Rav Ahuja</div>
                          <div className="text-[8px] text-gray-400 leading-tight">
                            <strong className="text-gray-600">Rav Ahuja</strong> <br />
                            Global Program Director, Skills Network
                          </div>
                        </div>
                      </div>

                      {/* Coursera Seal & QR Pin */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="text-left sm:text-right font-mono text-[8.5px] text-gray-400 space-y-0.5">
                          <div>Verify online at:</div>
                          <a 
                            href={selectedCert.externalLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 font-semibold underline"
                          >
                            coursera.org/verify/{selectedCert.credentialId}
                          </a>
                        </div>
                        
                        <div className="h-10 w-10 bg-stone-100 rounded-full border border-stone-200 flex items-center justify-center text-[8px] font-bold text-stone-600">
                          SEAL
                        </div>
                      </div>

                    </div>

                  </div>
                )}

                {/* Mode 3: South African Professional Code 14 Driver's Licence */}
                {selectedCert.id === "cert3" && (
                  <div className="relative w-full max-w-[760px] sm:aspect-[1.45] aspect-auto bg-gradient-to-tr from-[#EDEDDF] to-[#E3E4CC] text-gray-900 rounded-lg p-4 sm:p-6 flex flex-col justify-between gap-6 sm:gap-2 shadow-2xl relative select-none font-sans overflow-hidden border-4 sm:border-6 border-stone-300">
                    
                    {/* Embedded watermark grid pattern overlay */}
                    <div className="absolute inset-0 bg-radial-grid opacity-10 pointer-events-none" />
                    
                    {/* Heading header region */}
                    <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-stone-400 pb-2 relative z-10 gap-3 sm:gap-0">
                      <div>
                        <h4 className="font-mono text-[10px] sm:text-xs font-black uppercase tracking-wider text-green-950">
                          REPUBLIC OF SOUTH AFRICA // REPUBLIEK VAN SUID-AFRIKA
                        </h4>
                        <h3 className="font-sans text-xs sm:text-sm font-black tracking-tighter text-blue-900 leading-none mt-1">
                          TEMPORARY DRIVING LICENCE / PR. DRIVING PERMIT
                        </h3>
                        <p className="text-[8px] font-mono text-gray-500 font-bold uppercase mt-0.5">
                          National Road Traffic Act, 1996 // SEC ID: TDL(5)(2005/11)
                        </p>
                      </div>

                      <div className="text-right font-mono text-[8px] sm:text-[9px] text-amber-950 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/50 shrink-0 uppercase font-black">
                        No {selectedCert.credentialId.replace("Ref: ", "")}
                      </div>
                    </div>

                    {/* Middle details: Card Layout with photo and fingerprints */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center py-3 relative z-10">
                      
                      {/* Left: Driver Photo and Imprints (4 cols) */}
                      <div className="col-span-1 sm:col-span-4 flex flex-col items-center space-y-3 shrink-0">
                        
                        {/* Profile Photo frame on card */}
                        <div className="relative aspect-[3/4] w-24 sm:w-28 bg-stone-200 rounded border-2 border-dashed border-sky-950/20 shadow overflow-hidden">
                          <img
                            src={personalInfo.photoUrl}
                            alt="Fika portrait licence asset"
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover grayscale brightness-95 contrast-105"
                          />
                          <div className="absolute bottom-0 inset-x-0 bg-green-950/80 p-0.5 text-center">
                            <span className="block text-[7px] font-mono font-bold tracking-widest text-white uppercase">
                              F.Z. SIXIMBA
                            </span>
                          </div>
                        </div>

                        {/* Fingerprint stamp holder */}
                        <div className="flex items-center gap-1.5 bg-stone-300/40 p-1 rounded border border-stone-400/30 w-full max-w-[120px]">
                          <div className="h-6 w-6 shrink-0 bg-[#D4D6BF] rounded flex items-center justify-center text-stone-600 border border-stone-400">
                            <Fingerprint className="h-4.5 w-4.5 opacity-80" />
                          </div>
                          <div className="leading-tight font-mono text-[6.5px] text-gray-600 flex-1 uppercase">
                            Left Thumb Print <br />
                            <strong className="text-[7.5px] text-black">affixed</strong>
                          </div>
                        </div>

                      </div>

                      {/* Right: Technical specifications table and Stamps (8 cols) */}
                      <div className="col-span-1 sm:col-span-8 space-y-4">
                        
                        {/* Municipal blue ink administrative stamp overlap */}
                        <div className="sm:absolute sm:top-8 sm:right-6 static my-2 mx-auto transform sm:rotate-6 rotate-2 border-4 border-double border-blue-700/60 bg-blue-50/10 px-3 py-1.5 text-center text-blue-800 rounded font-black font-mono text-[9px] sm:text-[10px] space-y-0.5 tracking-tight pointer-events-none select-none">
                          <div className="uppercase">BUFFALO CITY</div>
                          <div className="text-[8px] tracking-normal uppercase">METROPOLITAN MUNICIPALITY</div>
                          <div className="text-[11px] text-blue-900">29 JAN 2026</div>
                          <div className="text-[7px] tracking-widest">TRAFFIC SERVICES</div>
                        </div>

                        {/* Grid details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 bg-[#E1E2C4]/40 border border-[#D4D6BF] p-3 rounded text-left">
                          
                          <div>
                            <span className="block text-[7px] font-mono font-bold text-gray-500 uppercase">IDENTIFICATION NO.</span>
                            <span className="block font-mono text-xs font-black text-black leading-tight tracking-wider">030124 ****** 3</span>
                          </div>

                          <div>
                            <span className="block text-[7px] font-mono font-bold text-gray-500 uppercase">INITIALS & SURNAME</span>
                            <span className="block font-sans text-xs font-black text-black leading-tight">F.Z. SIXIMBA</span>
                          </div>

                          <div className="h-px bg-stone-400/30 col-span-1 sm:col-span-2 my-1" />

                          <div>
                            <span className="block text-[7px] font-mono font-bold text-gray-500 uppercase select-none">DRIVING LICENCE CODE</span>
                            <span className="inline-flex items-center gap-1.5 text-xs font-black text-black mt-0.5 leading-none">
                              <span className="bg-sky-950 text-white font-mono px-1.5 py-0.5 text-[10px] rounded font-bold uppercase">EC</span>
                              <span className="text-[8.5px] font-mono text-gray-600 font-bold uppercase">(Code 14)</span>
                            </span>
                          </div>

                          <div>
                            <span className="block text-[7px] font-mono font-bold text-gray-500 uppercase select-none">PrDP CATEGORY / VALIDITY</span>
                            <span className="inline-flex items-center gap-1.5 text-xs font-black text-red-900 mt-0.5 leading-none">
                              <span className="bg-red-800 text-white font-mono px-1.5 py-0.5 text-[10px] rounded font-bold uppercase">GP</span>
                              <span className="text-[7.5px] text-gray-500 font-mono font-semibold uppercase">Exp: 2027-03-17</span>
                            </span>
                          </div>

                          <div className="h-px bg-stone-400/30 col-span-1 sm:col-span-2 my-1" />

                          <div>
                            <span className="block text-[7px] font-mono font-bold text-gray-500 uppercase">ISSUING AUTHORITY</span>
                            <span className="block font-mono text-[8.5px] font-extrabold text-blue-950 leading-tight uppercase">BUFFALO CITY TRAFFIC (BREIDBACH)</span>
                          </div>

                          <div>
                            <span className="block text-[7px] font-mono font-bold text-gray-500 uppercase">FIRST ACQUIRED DATE</span>
                            <span className="block font-mono text-[9px] font-semibold text-black leading-tight">2021-08-19</span>
                          </div>

                        </div>

                        {/* License compliance banner info */}
                        <div className="bg-green-100 text-green-950/80 p-2 border border-green-200 rounded text-[8px] sm:text-[9px] font-mono leading-tight">
                          <strong>VEHICLE CLEARANCE RANGE:</strong> Authorized to operate heavy transport combinations with gross combination mass greater than 16,000kg (GVM) and trailers exceeding 750kg. Holds active professional driving endorsements (PrDP).
                        </div>

                      </div>

                    </div>

                    {/* Bottom barcode decoration area */}
                    <div className="flex flex-col sm:flex-row items-center justify-between border-t-2 border-stone-400 pt-2 relative z-10 text-[7px] text-stone-600 font-mono gap-2 sm:gap-0">
                      <div>
                        BX CODE // VALID LICENSE RE-ISSUE REF 0018583
                      </div>
                      
                      {/* Fake barcode block */}
                      <div className="hidden sm:flex gap-0.5 items-center bg-transparent py-0.5 shrink-0 px-2 select-none pointer-events-none opacity-40">
                        <div className="h-4 w-0.5 bg-black" /><div className="h-4 w-1 bg-black" /><div className="h-4 w-0.5 bg-black" /><div className="h-4 w-0.25 bg-black" /><div className="h-4 w-1.5 bg-black" /><div className="h-4 w-0.5 bg-black" /><div className="h-4 w-1 bg-black" /><div className="h-4 w-0.75 bg-black" /><div className="h-4 w-0.25 bg-black" /><div className="h-4 w-1 bg-black" />
                      </div>

                      <div className="text-right">
                        FEE VERIFIED // RECEIVED: R96.00
                      </div>
                    </div>

                  </div>
                )}

              </div>

              {/* Action indicators */}
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-gray-400 pt-2">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span className="text-[10px] sm:text-xs">
                    {selectedCert.id === "cert3" 
                      ? "Official heavy driver endorsement validated" 
                      : "Credential verified with provider registries"
                    }
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-2">
                  {copiedId && (
                    <span className="text-emerald-400 text-[10px] animate-pulse px-1">
                      ✓ Serial Copied!
                    </span>
                  )}
                  {verifiedStatus && (
                    <span className="text-emerald-400 text-[10px] animate-pulse px-1">
                      ✓ Authenticity Verified!
                    </span>
                  )}
                  
                  <button
                    onClick={() => window.print()}
                    className="h-8 inline-flex items-center justify-center rounded bg-emerald-600 text-white font-bold px-3 hover:bg-emerald-500 transition-colors text-xs"
                    title="Print this document or export to PDF format instantly"
                  >
                    Save to PDF / Print
                  </button>

                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(selectedCert.credentialId || "");
                      setCopiedId(true);
                      setTimeout(() => setCopiedId(false), 3000);
                    }}
                    className="h-8 inline-flex items-center justify-center rounded px-3 border border-gray-800 text-gray-300 hover:text-white transition-colors text-xs"
                  >
                    {copiedId ? "Copied!" : "Copy Serial ID"}
                  </button>
                  
                  {selectedCert.externalLink && selectedCert.externalLink !== "#" ? (
                    <a
                      href={selectedCert.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-8 inline-flex items-center justify-center rounded bg-brand-primary text-dark-bg font-bold px-3 hover:bg-brand-hover text-xs"
                    >
                      Verify on Web Link
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        setVerifiedStatus(true);
                        setTimeout(() => setVerifiedStatus(false), 4000);
                      }}
                      className="h-8 inline-flex items-center justify-center rounded bg-gray-800 text-emerald-400 px-3 hover:bg-gray-700 transition-colors text-xs"
                    >
                      {verifiedStatus ? "Verified ✓" : "Verify Status"}
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
