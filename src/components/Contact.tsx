import { useState } from 'react';
import { Mail, Send, CheckCircle2, MapPin } from 'lucide-react';
import { WhatsAppIcon } from '@/components/SocialIcons';
import { useFadeUp } from '@/hooks/useFadeUp';

export default function Contact(): JSX.Element {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fadeUpRef = useFadeUp<HTMLDivElement>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('sending');
    setErrorMsg(null);
    const formData = new FormData(e.currentTarget);
    const apiPayload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
      const res = await fetch(`${apiUrl}/api/v1/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiPayload),
      });

      if (res.ok) {
        setFormState('success');
      } else if (res.status === 429) {
        setFormState('idle');
        setErrorMsg('Rate limit exceeded. Please wait a minute and try again.');
      } else if (res.status === 422) {
        const data = await res.json();
        setFormState('idle');
        const validationMsg = Array.isArray(data.detail)
          ? data.detail.map((err: { loc: string[]; msg: string }) => `${err.loc[err.loc.length - 1]}: ${err.msg}`).join(' · ')
          : 'Invalid data submitted.';
        setErrorMsg(`Validation error: ${validationMsg}`);
      } else {
        const data = await res.json();
        setFormState('idle');
        setErrorMsg(data.detail || 'Failed to send message. Please reach out via email directly.');
      }
    } catch {
      setFormState('idle');
      setErrorMsg('Network error — could not reach the server. Please email me directly.');
    }
  };

  return (
    <section
      id="contact"
      className="relative py-10 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 overflow-hidden bg-bg"
    >
      <div ref={fadeUpRef} className="max-w-7xl mx-auto relative z-10 fade-up">
        <p className="font-mono text-[11px] text-amber tracking-[0.16em] uppercase mb-4">
          / contact
        </p>
        <h2
          className="font-serif font-light tracking-[-0.03em] leading-[1.1] mb-4"
          style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
        >
          Let's work together.
        </h2>
        <p className="text-[15px] text-text2 leading-[1.75] mb-10 sm:mb-14 max-w-lg">
          Open to remote work worldwide. Available for Junior Backend Engineering roles, backend internships, and production-focused freelance work.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">

          {/* Left - Contact info */}
          <div className="flex flex-col gap-4">
            <a
              href="mailto:nyangaufredrick443@gmail.com"
              className="flex items-center gap-4 p-4 rounded-lg border border-border-dim bg-surface/20 hover:border-amber/30 transition-all no-underline group"
            >
              <div className="w-9 h-9 rounded-md bg-amber/10 flex items-center justify-center text-amber shrink-0">
                <Mail size={17} />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-text3 mb-0.5">Email</div>
                <span className="text-[14px] text-text group-hover:text-amber transition-colors font-medium">
                  nyangaufredrick443@gmail.com
                </span>
              </div>
            </a>

            <a
              href="https://wa.me/254746730585?text=Hello%20Fredrick,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20backend%20project."
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 p-4 rounded-lg border border-border-dim bg-surface/20 hover:border-amber/30 transition-all no-underline group"
            >
              <div className="w-9 h-9 rounded-md bg-amber/10 flex items-center justify-center text-amber shrink-0">
                <WhatsAppIcon size={17} />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-text3 mb-0.5">WhatsApp</div>
                <span className="text-[14px] text-text group-hover:text-amber transition-colors font-medium">
                  +254 746 730 585
                </span>
              </div>
            </a>


            <div className="flex items-center gap-4 p-4 rounded-lg border border-border-dim bg-surface/20">
              <div className="w-9 h-9 rounded-md bg-amber/10 flex items-center justify-center text-amber shrink-0">
                <MapPin size={17} />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-text3 mb-0.5">Location</div>
                <p className="text-[14px] text-text font-medium">Nairobi, Kenya · Open to remote worldwide</p>
              </div>
            </div>
          </div>

          {/* Right - Contact form */}
          <div className="bg-surface/40 border border-border-dim rounded-xl p-6 sm:p-8 min-h-[400px] flex flex-col">
            {formState === 'success' ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-full bg-amber/10 flex items-center justify-center text-amber mb-5">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-[18px] font-medium text-text mb-2">Message sent.</h4>
                <p className="text-[14px] text-text2 max-w-xs mx-auto mb-7 leading-[1.7]">
                  I will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setFormState('idle'); setErrorMsg(null); }}
                  className="font-mono text-[12px] text-amber underline-offset-4 hover:underline transition-all"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-text3 mb-7">
                  Send a message
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1">
                  {errorMsg && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 text-[13px] text-err bg-err/8 border border-err/20 rounded-lg px-4 py-3 leading-[1.6]"
                    >
                      <span className="shrink-0 mt-0.5">⚠</span>
                      <span>{errorMsg}</span>
                    </div>
                  )}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-mono text-text2">Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="Your name"
                      className="w-full bg-bg/50 border border-border-dim rounded-lg px-4 py-3 text-text text-[14px] placeholder:text-text3/50 focus:border-amber focus:ring-1 focus:ring-amber/30 outline-none transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-mono text-text2">Email</label>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      className="w-full bg-bg/50 border border-border-dim rounded-lg px-4 py-3 text-text text-[14px] placeholder:text-text3/50 focus:border-amber focus:ring-1 focus:ring-amber/30 outline-none transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-[12px] font-mono text-text2">Message</label>
                    <textarea
                      required
                      rows={4}
                      name="message"
                      placeholder="What would you like to discuss?"
                      className="w-full bg-bg/50 border border-border-dim rounded-lg px-4 py-3 text-text text-[14px] placeholder:text-text3/50 focus:border-amber focus:ring-1 focus:ring-amber/30 outline-none transition-all resize-none flex-1"
                    />
                  </div>

                  <button
                    disabled={formState === 'sending'}
                    type="submit"
                    className="w-full bg-amber text-bg font-sans font-semibold text-[14px] py-3.5 rounded-lg flex items-center justify-center gap-2.5 hover:bg-amber-glow transition-all disabled:opacity-50 disabled:cursor-wait mt-1"
                  >
                    {formState === 'sending' ? (
                      <>Sending...</>
                    ) : (
                      <>
                        Send message
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
