import React, { useState } from 'react';
import { Mail, Phone, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IconLinkedinSocial } from './Navbar';

export function Contact() {
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setSubmitState('submitting');
    setSubmitMessage('');

    try {
      const response = await fetch('https://formspree.io/f/xlgpyeyo', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        form.reset();
        setSubmitState('success');
        setSubmitMessage('Thank you! Your message has been sent successfully. I will get back to you shortly.');
        return;
      }

      let payload: any = null;
      try {
        payload = await response.json();
      } catch {
        payload = null;
      }

      const fallbackError = 'Message could not be sent right now. Please try again in a moment.';
      const apiError = payload?.errors?.[0]?.message;
      setSubmitState('error');
      setSubmitMessage(apiError || fallbackError);
    } catch {
      setSubmitState('error');
      setSubmitMessage('Network connection error while sending message. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-muted/20 border-t border-border/40">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12">

          <div className="md:col-span-5 space-y-6">
            <span className="text-xs font-mono font-semibold text-foreground/80 uppercase tracking-widest">Get In Touch</span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">Interested in collaborating or hiring?</h2>
            <p className="text-muted-foreground text-base leading-relaxed font-sans">
              I am open to full-time AI/ML engineering roles, software development opportunities, and collaborative research projects.
            </p>

            <div className="space-y-4 pt-4">
              <a href="mailto:markprotik12@gmail.com" className="glass-panel p-4 rounded-2xl flex items-center gap-4 hover:border-white/30 transition-all duration-300 bg-card/60">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-foreground flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium font-mono">Email Me</p>
                  <p className="text-sm font-semibold text-foreground font-sans">markprotik12@gmail.com</p>
                </div>
              </a>

              <a href="tel:+8801759897069" className="glass-panel p-4 rounded-2xl flex items-center gap-4 hover:border-white/30 transition-all duration-300 bg-card/60">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-foreground flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium font-mono">Call Me</p>
                  <p className="text-sm font-semibold text-foreground font-sans">+880-1759897069</p>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/mark-protik-mondol" target="_blank" rel="noopener noreferrer" className="glass-panel p-4 rounded-2xl flex items-center gap-4 hover:border-white/30 transition-all duration-300 bg-card/60">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-foreground flex items-center justify-center shrink-0">
                  <IconLinkedinSocial className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium font-mono">LinkedIn</p>
                  <p className="text-sm font-semibold text-foreground font-sans">Mark Protik Mondol</p>
                </div>
              </a>
            </div>
          </div>

          {/* Hiring Form connecting to Formspree API */}
          <div className="md:col-span-7">
            <form onSubmit={handleContactSubmit} className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6 bg-card/60">
              <h3 className="font-display text-xl font-bold">Send a Message</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-mono font-semibold text-muted-foreground uppercase">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-background border border-white/15 focus:border-white/50 focus:outline-none text-sm transition-all duration-300 font-sans cursor-text"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-mono font-semibold text-muted-foreground uppercase">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-background border border-white/15 focus:border-white/50 focus:outline-none text-sm transition-all duration-300 font-sans cursor-text"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-mono font-semibold text-muted-foreground uppercase">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  placeholder="Role Opportunity / Collaboration / Inquiry"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-white/15 focus:border-white/50 focus:outline-none text-sm transition-all duration-300 font-sans cursor-text"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-mono font-semibold text-muted-foreground uppercase">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Write your message or project details here..."
                  className="w-full px-4 py-3 rounded-xl bg-background border border-white/15 focus:border-white/50 focus:outline-none text-sm transition-all duration-300 resize-none font-sans cursor-text"
                />
              </div>

              <Button
                type="submit"
                disabled={submitState === 'submitting'}
                className="w-full py-6 text-base font-bold bg-foreground hover:bg-foreground/90 text-background shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-xl font-display"
              >
                {submitState === 'submitting' ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Sending Message...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Send Message
                  </span>
                )}
              </Button>

              {submitMessage && (
                <div className={`p-4 rounded-xl text-sm flex items-center gap-3 ${submitState === 'error' ? 'bg-destructive/10 text-destructive border border-destructive/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'}`}>
                  {submitState === 'error' ? <AlertCircle className="w-5 h-5 shrink-0" /> : <CheckCircle2 className="w-5 h-5 shrink-0" />}
                  <span className="font-sans">{submitMessage}</span>
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
