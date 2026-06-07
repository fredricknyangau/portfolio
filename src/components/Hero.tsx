import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons';
import Terminal from '@/components/Terminal';
import ApiResponseCard from '@/components/ApiResponseCard';

import ResumeDownload from '@/components/ResumeDownload';

export default function Hero(): JSX.Element {
  return (
    <section
      id="hero"
      className={[
        'min-h-[auto] md:min-h-[90vh] relative overflow-hidden',
        'grid grid-cols-1 md:grid-cols-2 gap-0',
        'pt-20 pb-8 px-4 sm:pt-28 sm:pb-16 md:pt-[120px] md:pb-20 md:px-12',
        'items-center md:items-start',
      ].join(' ')}
    >
      {/* Subtle grid background */}
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

      {/* Left - intro */}
      <div className="relative z-10 md:pr-[60px]">
        {/* Availability badge */}
        <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-[12px] text-text2 tracking-[0.08em] uppercase mb-5 sm:mb-7">
          <span
            className="w-[7px] h-[7px] rounded-full bg-amber animate-pulse-green"
            style={{ boxShadow: '0 0 6px var(--accent-primary)' }}
          />
          Open to opportunities · Nairobi, Kenya · Remote
        </div>

        {/* Name */}
        <h1
          className="font-serif font-light tracking-[-0.03em] leading-none text-text mb-4 sm:mb-5"
          style={{ fontSize: 'clamp(44px, 7vw, 80px)' }}
        >
          Fredrick
          <br />
          <em className="not-italic text-amber font-light">Nyang'au</em>
        </h1>

        {/* Role badge */}
        <div className="inline-flex items-center gap-3 mb-6 sm:mb-8 pl-4 pr-5 py-1.5 rounded-md border border-amber/30 bg-amber/[0.03]">
          <span className="block w-1 h-[18px] rounded-full bg-amber shrink-0" />
          <span className="font-mono text-[13px] text-text">Junior Backend Engineer</span>
        </div>

        {/* Headline */}
        <p className="text-[17px] sm:text-[19px] font-light text-text leading-[1.5] max-w-full md:max-w-[480px] mb-3 sm:mb-4 tracking-[-0.01em]">
          Building production-ready APIs for Fintech and Agritech.
        </p>

        {/* Subheadline */}
        <p className="text-[14px] sm:text-[15px] text-text2 leading-[1.75] max-w-full md:max-w-[480px] mb-8 sm:mb-10">
          Deployed FastAPI systems on PostgreSQL and Docker. Backend architecture,
          schema design, and payment integrations for real users in East Africa.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
          <a
            href="#projects"
            className={[
              'w-full sm:w-auto inline-flex items-center justify-center gap-2',
              'bg-amber text-bg font-sans text-sm font-semibold',
              'px-7 py-3.5 rounded-md',
              'transition-all duration-200 hover:bg-amber-glow hover:-translate-y-px',
              'no-underline',
            ].join(' ')}
          >
            View Projects
            <ArrowDown size={15} className="opacity-80" />
          </a>

          <div className="flex items-center flex-wrap gap-3 w-full sm:w-auto">
            <a
              href="https://github.com/fredricknyangau"
              target="_blank"
              rel="noreferrer"
              className={[
                'inline-flex items-center justify-center gap-2',
                'text-text2 font-mono text-[13px] px-4 py-3 rounded-md',
                'bg-surface/30 backdrop-blur-md border border-border-dim',
                'transition-all duration-200 hover:text-text hover:border-text2',
                'no-underline',
              ].join(' ')}
              aria-label="GitHub profile"
            >
              <GitHubIcon size={15} />
              GitHub
              <ArrowUpRight size={13} className="opacity-50" />
            </a>

            <a
              href="https://linkedin.com/in/fredricknyangau"
              target="_blank"
              rel="noreferrer"
              className={[
                'inline-flex items-center justify-center gap-2',
                'text-text2 font-mono text-[13px] px-4 py-3 rounded-md',
                'bg-surface/30 backdrop-blur-md border border-border-dim',
                'transition-all duration-200 hover:text-text hover:border-text2',
                'no-underline',
              ].join(' ')}
              aria-label="LinkedIn profile"
            >
              <LinkedInIcon size={15} />
              LinkedIn
              <ArrowUpRight size={13} className="opacity-50" />
            </a>

            <ResumeDownload />
          </div>
        </div>
      </div>

      {/* Right - Backend UI elements */}
      <div className="relative z-10 mt-12 md:mt-0 flex flex-col gap-4">
        <Terminal />
        <ApiResponseCard />
      </div>
    </section>
  );
}
