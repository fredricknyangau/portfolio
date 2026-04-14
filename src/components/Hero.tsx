import { ArrowDown, FileText, Briefcase, ArrowUpRight, Download } from 'lucide-react';
import { GitHubIcon } from '@/components/SocialIcons';

export default function Hero(): JSX.Element {
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
          <em className="not-italic text-amber font-light">Nyang'au</em>
        </h1>

        {/* Role */}
        <div
          className="inline-flex items-center gap-3 mb-5 sm:mb-7 pl-3 pr-4 py-[7px] rounded-sm border border-amber/30 bg-amber/5"
          style={{ boxShadow: '0 0 16px rgba(var(--accent-rgb), 0.08), inset 0 0 12px rgba(var(--accent-rgb), 0.03)' }}
        >
          <span className="block w-[3px] h-[14px] rounded-full bg-amber shrink-0" />
          <span className="font-mono text-[13px] sm:text-[14px] text-amber tracking-[0.14em] uppercase">
            Backend Engineer
          </span>
        </div>

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
    </section>
  );
}
