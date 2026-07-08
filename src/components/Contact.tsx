import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send, CheckCircle2, ShieldAlert } from 'lucide-react';
import { personalInfo } from '../data';

const FORM_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/xykqaqgp';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [serverFeedback, setServerFeedback] = useState('');

  const submitContactMessage = async (payload: { name: string; email: string; subject: string; message: string }) => {
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || data.message || 'Failed to send your message. Please try again later.');
    }

    return data;
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');
    setServerFeedback('');

    // Quick client-side validations
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setErrorText('Operational check failed: All form fields are required.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErrorText('Operational check failed: Please input a functional email address.');
      return;
    }

    setIsSending(true);

    try {
      const data = await submitContactMessage({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
      });

      setServerFeedback(data.message || 'Your message was delivered successfully.');

      setSendSuccess(true);
      
      // Clean inputs
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      console.error('Error submitting contact form:', err);
      setErrorText(err.message || 'Failed to dispatch transmission signal.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="mb-12 text-center lg:text-left">
          <span className="font-mono text-xs font-bold tracking-widest text-brand-primary uppercase">
            // COMMUNICATIONS CONTROL
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Secure <span className="text-brand-primary">Contact Channel</span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-gray-400">
            Submit an opportunity proposal, request design consultation, or sync up with my social channels.
          </p>
        </div>

        {/* Form and info grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Coordinate Cards (5 columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Profile Bio info */}
            <div className="rounded-xl border border-gray-800 bg-dark-surface p-6 shadow-md space-y-4">
              <h3 className="font-display text-base font-bold text-white">Direct Coordinates</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Need answers right away? Use my active direct communication targets to connect immediately.
              </p>

              <div className="space-y-3.5 pt-2">
                <a 
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#14151F] border border-gray-800 hover:border-brand-primary/40 group transition-all duration-200"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-dark-bg transition-colors duration-200">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="block font-mono text-[9px] text-gray-500 font-bold uppercase tracking-widest">SEND DIRECT MAIL:</span>
                    <span className="block text-xs font-medium text-white group-hover:text-brand-primary duration-200 truncate pr-2">
                      {personalInfo.email}
                    </span>
                  </div>
                </a>

                <a 
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#14151F] border border-gray-800 hover:border-brand-primary/40 group transition-all duration-200"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-200">
                    <Linkedin className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] text-gray-500 font-bold uppercase tracking-widest">CONNECT ON LINKEDIN:</span>
                    <span className="block text-xs font-medium text-white group-hover:text-blue-400 duration-200">
                      fika-zekhaya-siximba
                    </span>
                  </div>
                </a>

                <a 
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#14151F] border border-gray-800 hover:border-brand-primary/40 group transition-all duration-200"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-500/10 text-gray-400 group-hover:bg-white group-hover:text-dark-bg transition-colors duration-200">
                    <Github className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] text-gray-500 font-bold uppercase tracking-widest">INSPECT RAW INDEXES:</span>
                    <span className="block text-xs font-medium text-white group-hover:text-white duration-200">
                      @Zkingsa
                    </span>
                  </div>
                </a>
              </div>
            </div>


          </div>

          {/* Column 2: Form & Outbox Logs (8 columns) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Main Email form */}
            <div className="rounded-xl border border-gray-800 bg-dark-surface p-6 sm:p-8 space-y-5 shadow-lg relative">
              
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <Send className="h-4.5 w-4.5 text-brand-primary" />
                <span>Transmit Opportunity Proposal</span>
              </h3>

              {sendSuccess ? (
                <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/30 p-6 text-center space-y-4">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-display text-base font-bold text-white">Transmission Successful!</h4>
                    <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
                      {serverFeedback}
                    </p>
                    <p className="text-[10px] text-gray-500 max-w-md mx-auto font-mono uppercase">
                      // PRIVATE DELIVERY CHANNEL
                    </p>
                  </div>
                  <button
                    onClick={() => setSendSuccess(false)}
                    className="inline-flex h-8 items-center justify-center rounded bg-emerald-500 text-dark-bg font-bold text-xs px-4 hover:bg-emerald-600 focus:outline-none cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="space-y-4">
                  
                  {/* Row 1: Name and email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name:</label>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => { setName(e.target.value); setErrorText(''); }}
                        placeholder="e.g. Rachel Mercer"
                        className="w-full text-sm rounded-lg bg-dark-bg border border-gray-800 text-white placeholder-gray-600 p-2.5 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address:</label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setErrorText(''); }}
                        placeholder="e.g. recruiter@apex.com"
                        className="w-full text-sm rounded-lg bg-dark-bg border border-gray-800 text-white placeholder-gray-600 p-2.5 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1">
                    <label className="block font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">Proposal Subject:</label>
                    <input 
                      type="text" 
                      required
                      value={subject}
                      onChange={(e) => { setSubject(e.target.value); setErrorText(''); }}
                      placeholder="e.g. Front-End Architect Opportunity (Full-time)"
                      className="w-full text-sm rounded-lg bg-dark-bg border border-gray-800 text-white placeholder-gray-600 p-2.5 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                    />
                  </div>

                  {/* Message body */}
                  <div className="space-y-1">
                    <label className="block font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">Transmission payload:</label>
                    <textarea 
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => { setMessage(e.target.value); setErrorText(''); }}
                      placeholder="Hi Fika, we reviewed your professional projects portfolio..."
                      className="w-full text-sm rounded-lg bg-dark-bg border border-gray-800 text-white placeholder-gray-600 p-2.5 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                    />
                  </div>

                  {/* Errors display */}
                  {errorText && (
                    <p className="font-mono text-xs text-red-400 font-bold bg-red-400/5 border border-red-400/20 rounded p-2 text-center">
                      {errorText}
                    </p>
                  )}

                  {/* Submit buttons */}
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand-primary hover:bg-brand-hover text-sm font-bold text-dark-bg transition-colors duration-200 focus:outline-none disabled:opacity-50"
                  >
                    {isSending ? (
                      <span className="flex items-center gap-1.5 font-mono text-xs uppercase">
                        <svg className="animate-spin h-4 w-4 text-dark-bg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Transmitting Node Signals...
                      </span>
                    ) : (
                      <>
                        <span>Submit Communications Signal</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>

            <div className="rounded-xl border border-gray-800 bg-[#12131A] p-4">
              <div className="flex items-start gap-3">
                <ShieldAlert className="mt-0.5 h-4.5 w-4.5 text-brand-primary" />
                <div className="space-y-1">
                  <h4 className="font-display text-sm font-bold text-white">Private delivery</h4>
                  <p className="text-[11px] leading-relaxed text-gray-400">
                    Messages sent here go directly to this individual&apos;s email.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
