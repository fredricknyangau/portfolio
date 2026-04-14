import { useState } from 'react';
import { Mail, Send, CheckCircle2, MapPin, MessageCircle } from 'lucide-react';
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from '@/components/SocialIcons';
import { useFadeUp } from '@/hooks/useFadeUp';

export default function Contact(): JSX.Element {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success'>('idle');
  const fadeUpRef = useFadeUp<HTMLDivElement>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('sending');
    
    // Web3Forms integration
    // Get access key from https://web3forms.com/ - no account required
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY || "");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });
      const data = await res.json();
      if (data.success) {
        setFormState('success');
      } else {
        setFormState('idle');
        alert("Failed to send message. Please reach out via email directly.");
      }
    } catch (err) {
      setFormState('idle');
      alert("Network error occurred. Please try again or reach out directly.");
    }
  };

  return (
    <section
      id="contact"
      className="relative py-10 sm:py-16 md:py-24 px-5 sm:px-6 md:px-12 overflow-hidden bg-bg"
    >
      {/* Dynamic background lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(var(--accent-rgb), 0.15) 0%, transparent 70%)',
        }}
      />

      <div ref={fadeUpRef} className="max-w-7xl mx-auto relative z-10 fade-up">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24">

          {/* Left Column: Context & Metadata */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-border2 rounded-full bg-surface/30 backdrop-blur-sm text-[10px] font-mono text-amber tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-amber" />
              Direct Communication Channel
            </div>

            <h2 className="font-serif text-3xl md:text-5xl font-light text-text tracking-tight mb-5 sm:mb-8">
              Let's build <em className="not-italic text-amber">resilient</em> <br className="hidden md:block" /> systems together.
            </h2>

            <p className="text-base sm:text-lg text-text2 leading-relaxed mb-6 sm:mb-12 max-w-lg">
              Currently available for backend engineering roles and specialized infrastructure consulting. I focus on high-load environments and mission-critical financial integrations.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-xl border border-border-dim bg-surface/20 backdrop-blur-md">
                <div className="w-10 h-10 rounded-lg bg-amber/10 flex items-center justify-center text-amber shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-text3 mb-1">Email Endpoint</h3>
                  <a href="mailto:nyangaufredrick443@gmail.com" className="text-text hover:text-amber transition-colors font-medium">
                    nyangaufredrick443@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl border border-border-dim bg-surface/20 backdrop-blur-md">
                <div className="w-10 h-10 rounded-lg bg-amber/10 flex items-center justify-center text-amber shrink-0">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-text3 mb-1">Direct Signal</h3>
                  <a href="https://wa.me/254746730585" target="_blank" rel="noreferrer" className="text-text hover:text-amber transition-colors font-medium">
                    +254 746 730 585
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl border border-border-dim bg-surface/20 backdrop-blur-md">
                <div className="w-10 h-10 rounded-lg bg-amber/10 flex items-center justify-center text-amber shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-text3 mb-1">Current Pivot</h3>
                  <p className="text-text font-medium">Kenya · Remote</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-6 sm:mt-10">
              <a
                href="https://github.com/fredricknyangau"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full border border-border2 text-text3 hover:text-amber hover:border-amber transition-all"
                title="GitHub"
              >
                <GitHubIcon size={20} />
              </a>
              <a
                href="https://linkedin.com/in/fredricknyangau"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full border border-border2 text-text3 hover:text-amber hover:border-amber transition-all"
                title="LinkedIn"
              >
                <LinkedInIcon size={20} />
              </a>
              <a
                href="https://wa.me/254746730585"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full border border-border2 text-text3 hover:text-amber hover:border-amber transition-all"
                title="WhatsApp"
              >
                <WhatsAppIcon size={20} />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber/10 to-transparent rounded-2xl blur-md transition duration-1000 group-hover:duration-200" />

            <div className="relative bg-surface/40 backdrop-blur-xl border border-border/50 rounded-2xl p-8 shadow-lg overflow-hidden min-h-[440px] flex flex-col">
              {formState === 'success' ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
                  <div className="w-20 h-20 rounded-full bg-amber/10 flex items-center justify-center text-amber mb-6">
                    <CheckCircle2 size={48} />
                  </div>
                  <h4 className="text-2xl font-serif text-text mb-4">Transmission Received</h4>
                  <p className="text-text2 max-w-xs mx-auto mb-8">
                    Your message has been routed to my primary inbox. I typically process requests within 24 standard hours.
                  </p>
                  <button
                    onClick={() => setFormState('idle')}
                    className="text-amber font-mono text-xs uppercase tracking-widest border-b border-amber/30 pb-1 hover:border-amber transition-all"
                  >
                    Send another signal
                  </button>
                </div>
              ) : (
                <>
                  <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-text3 mb-8">Secure Inbound Form</h4>
                  <form onSubmit={handleSubmit} className="space-y-6 flex-1">
                    <div className="space-y-2">
                      <label className="text-[11px] font-mono text-text3 uppercase tracking-widest ml-1">Identity</label>
                      <input
                        required
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="w-full bg-bg/50 border border-border-dim rounded-lg px-4 py-3 text-text placeholder:text-text3/50 focus:border-amber focus:ring-1 focus:ring-amber/30 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-mono text-text3 uppercase tracking-widest ml-1">Return Route</label>
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        className="w-full bg-bg/50 border border-border-dim rounded-lg px-4 py-3 text-text placeholder:text-text3/50 focus:border-amber focus:ring-1 focus:ring-amber/30 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-mono text-text3 uppercase tracking-widest ml-1">Payload</label>
                      <textarea
                        required
                        rows={4}
                        name="message"
                        placeholder="How can I help with your system architecture?"
                        className="w-full bg-bg/50 border border-border-dim rounded-lg px-4 py-3 text-text placeholder:text-text3/50 focus:border-amber focus:ring-1 focus:ring-amber/30 outline-none transition-all resize-none"
                      />
                    </div>

                    <button
                      disabled={formState === 'sending'}
                      type="submit"
                      className="w-full bg-amber text-bg font-sans font-bold py-4 rounded-lg flex items-center justify-center gap-3 hover:bg-amber-glow transition-all disabled:opacity-50 disabled:cursor-wait mt-4 group/btn"
                    >
                      {formState === 'sending' ? (
                        <>Encrypting & Sending...</>
                      ) : (
                        <>
                          Dispatch Message
                          <Send size={18} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
