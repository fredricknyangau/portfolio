import { useState, useEffect } from 'react';
import { ArrowDown, FileText, Briefcase, ArrowUpRight, Download } from 'lucide-react';
import { GitHubIcon } from '@/components/SocialIcons';

// --- VARIANT A (The original Terminal-based layout) ---
function HeroVariantA() {
  return (
    <>
      {/* Left — intro */}
      <div className="relative z-10 md:pr-[60px]">
        {/* Availability badge */}
        <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-[12px] text-text2 tracking-[0.08em] uppercase mb-5 sm:mb-7">
          <span
            className="w-[7px] h-[7px] rounded-full bg-amber animate-pulse-green"
            style={{ boxShadow: '0 0 6px var(--accent-primary)' }}
          />
          Available for Software Engineering roles · Kenya · Remote
        </div>

        {/* Name */}
        <h1
          className="font-serif font-light tracking-[-0.03em] leading-none text-text mb-2"
          style={{ fontSize: 'clamp(44px, 7vw, 80px)' }}
        >
          Fredrick
          <br />
          <em className="not-italic text-amber font-light">Nyangau</em>
        </h1>

        {/* Role */}
        <p className="font-mono text-[13px] sm:text-[15px] text-amber tracking-[0.12em] uppercase mb-5 sm:mb-7">
          Backend Engineer
        </p>

        {/* Description */}
        <p className="text-[15px] sm:text-[17px] text-text2 leading-[1.75] max-w-full md:max-w-[480px] mb-7 sm:mb-11">
          Building{' '}
          <strong className="text-text font-medium">production-grade APIs</strong>{' '}
          and data systems for East Africa's mobile-first economy — FastAPI backends,
          PostgreSQL databases, and the{' '}
          <strong className="text-text font-medium">real infrastructure</strong>{' '}
          that moves money across the region.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-5 mt-4">
          <a
            href="#projects"
            className={[
              'w-full sm:w-auto inline-flex items-center justify-center gap-2',
              'bg-amber text-bg font-sans text-sm font-semibold',
              'px-8 py-4 rounded-md shadow-lg shadow-amber/10',
              'transition-all duration-300 hover:bg-amber-glow hover:shadow-amber/20 hover:-translate-y-0.5',
              'no-underline',
            ].join(' ')}
          >
            <Briefcase size={18} />
            View my work
            <ArrowDown size={16} className="ml-0.5 opacity-70" />
          </a>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <a
              href="https://github.com/fredricknyangau"
              target="_blank"
              rel="noreferrer"
              className={[
                'flex-1 sm:flex-none inline-flex items-center justify-center gap-2',
                'text-text2 font-mono text-sm px-5 py-3.5 rounded-md',
                'bg-surface/30 backdrop-blur-md border border-border-dim',
                'transition-all duration-300 hover:text-text hover:border-text2 hover:bg-surface/50',
                'no-underline',
              ].join(' ')}
            >
              <GitHubIcon size={16} />
              GitHub
              <ArrowUpRight size={14} className="opacity-50" />
            </a>

            <a
              href="/docs/Fredrick_Nyangau_CV.pdf"
              target="_blank"
              rel="noreferrer"
              className={[
                'flex-1 sm:flex-none inline-flex items-center justify-center gap-2',
                'text-text2 font-mono text-sm px-5 py-3.5 rounded-md',
                'bg-surface/30 backdrop-blur-md border border-border-dim',
                'transition-all duration-300 hover:text-text hover:border-text2 hover:bg-surface/50',
                'no-underline',
              ].join(' ')}
            >
              <FileText size={16} />
              Resume
              <Download size={14} className="opacity-50" />
            </a>
          </div>
        </div>
      </div>

      {/* Right — Profile Image */}
      <div className="relative z-10 mt-8 md:mt-0 flex justify-center md:justify-end animate-in fade-in slide-in-from-right-8 duration-700">
        <div className="relative">
          <div className="w-40 h-40 sm:w-56 sm:h-56 lg:w-[380px] lg:h-[380px] xl:w-[440px] xl:h-[440px] rounded-full border-2 border-amber/20 p-2 sm:p-3 bg-surface/30 backdrop-blur-sm relative z-10 overflow-hidden shadow-2xl shadow-amber/5">
            <img
              src="/images/profile.png"
              alt="Fredrick Nyangau"
              className="w-full h-full rounded-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
            />
          </div>
          {/* Enhanced decorative back-glow */}
          <div className="absolute inset-0 rounded-full bg-amber/10 blur-[60px] -z-10 animate-pulse" />
          <div className="absolute -inset-4 rounded-full border border-amber/10 animate-spin-slow opacity-30" />
        </div>
      </div>
    </>
  );
}

// --- VARIANT B (Enterprise/Agentic Layout Focus) ---
function HeroVariantB() {
  return (
    <>
      <div className="relative z-10 col-span-1 md:col-span-2 text-center flex flex-col items-center max-w-[800px] mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
        {/* Profile Image (Variant B) */}
        <div className="relative mb-8">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-amber/20 p-2 bg-surface/30 backdrop-blur-sm relative z-10 overflow-hidden">
            <img
              src="/images/profile.png"
              alt="Fredrick Nyangau"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="absolute inset-0 rounded-full bg-amber/10 blur-[40px] -z-10 animate-pulse" />
        </div>

        <div className="inline-flex items-center justify-center gap-2 px-3 py-1 mb-6 border border-border2 rounded-full bg-surface/30 backdrop-blur-sm text-xs font-mono text-text2 tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
          System Architect & Backend Engineer
        </div>

        <h1 className="font-serif font-light tracking-tight leading-tight text-text mb-6 mx-auto" style={{ fontSize: 'clamp(48px, 6vw, 72px)' }}>
          Engineering <em className="not-italic text-amber font-light">Autonomous</em> Systems & Resilient APIs
        </h1>

        <p className="text-[18px] text-text2 leading-relaxed max-w-[650px] mb-10 mx-auto">
          Delivering <strong className="text-text font-medium">enterprise-grade microservices</strong> across East Africa. Specializing in Python FastAPI, PostgreSQL architectures, and LangChain AI orchestrations.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 justify-center w-full">
           <a
            href="#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-text text-bg font-sans text-sm font-semibold px-8 py-4 rounded-md transition-all hover:scale-105"
          >
            <Briefcase size={18} />
            Explore Case Studies
            <ArrowDown size={16} className="opacity-70" />
          </a>
          <a
            href="https://github.com/fredricknyangau"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-text3 text-text px-8 py-4 rounded-md hover:border-amber hover:text-amber transition-colors font-mono tracking-wide text-sm bg-bg2/50"
          >
            <GitHubIcon size={16} />
            GitHub Profile
            <ArrowUpRight size={14} className="opacity-50" />
          </a>
          <a
            href="/docs/Fredrick_Nyangau_CV.pdf"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-text3 text-text px-8 py-4 rounded-md hover:border-amber hover:text-amber transition-colors font-mono tracking-wide text-sm bg-bg2/50"
          >
            <FileText size={16} />
            Resume
            <Download size={14} className="opacity-50" />
          </a>
        </div>

      </div>
    </>
  );
}

// --- MAIN DEFAULT RENDERER ---
export default function Hero(): JSX.Element {
  const [variant, setVariant] = useState<'A' | 'B'>('A');

  useEffect(() => {
    // Basic A/B test logic - randomly pick A or B for demonstration
    // In a real scenario, this would be persisted in local storage or controlled by a feature flag system / analytics engine
    const storedVariant = localStorage.getItem('hero_ab_variant');

    if (storedVariant === 'A' || storedVariant === 'B') {
      setVariant(storedVariant);
    } else {
      const chosen = Math.random() > 0.5 ? 'A' : 'B';
      setVariant(chosen);
      localStorage.setItem('hero_ab_variant', chosen);
    }
  }, []);

  return (
    <section
      id="hero"
      className={[
        'min-h-[100dvh] md:min-h-[90vh] relative overflow-hidden',
        'grid grid-cols-1 md:grid-cols-2 gap-0',
        'pt-24 pb-12 px-5 sm:pt-28 sm:pb-16 md:pt-[120px] md:pb-20 md:px-12',
        'items-center',
      ].join(' ')}
    >
      {/* Decorative grid background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(var(--accent-rgb),0.03) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(var(--accent-rgb),0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at 60% 40%, rgba(0,0,0,0.4) 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 60% 40%, rgba(0,0,0,0.4) 0%, transparent 70%)',
        }}
      />

      {/* Render Variant */}
      {variant === 'A' ? <HeroVariantA /> : <HeroVariantB />}

      {/* A/B Test Active Indicator — dev only */}
      {import.meta.env.DEV && (
        <div
          className="absolute bottom-4 right-4 z-50 text-[10px] font-mono border border-amber/30 bg-amber/5 text-amber px-2 py-1 rounded cursor-pointer hover:bg-amber/20 transition-colors"
          onClick={() => {
            const toggled = variant === 'A' ? 'B' : 'A';
            setVariant(toggled);
            localStorage.setItem('hero_ab_variant', toggled);
          }}
          title="Click to toggle variant"
        >
          A/B TEST ACTIVE : VARIANT {variant}
        </div>
      )}
    </section>
  );
}
