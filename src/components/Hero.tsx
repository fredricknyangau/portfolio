import { useState } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { GitHubIcon, LinkedInIcon, XIcon, DevToIcon } from '@/components/SocialIcons';
import Terminal from '@/components/Terminal';
import ResumeDownload from '@/components/ResumeDownload';
import type { ComponentType } from 'react';

interface SocialLinkDef {
  href: string;
  label: string;
  Icon: ComponentType<{ size?: number }>;
}

const socialLinks: SocialLinkDef[] = [
  { href: 'https://github.com/fredricknyangau',     label: 'GitHub profile',               Icon: GitHubIcon   },
  { href: 'https://linkedin.com/in/fredricknyangau', label: 'LinkedIn profile',             Icon: LinkedInIcon },
  { href: 'https://x.com/dev_fred_',                label: 'X (formerly Twitter) profile', Icon: XIcon        },
  { href: 'https://dev.to/fredricknyangau',          label: 'Dev.to profile',               Icon: DevToIcon    },
];

export default function Hero(): JSX.Element {
  const [showTerminal, setShowTerminal] = useState(false);

  return (
    <section
      id="hero"
      className={[
        'relative overflow-hidden',
        'grid grid-cols-1 lg:grid-cols-[1fr_1.25fr]',
        'min-h-[auto] lg:min-h-screen',
        'pt-24 pb-16 px-4 sm:px-6 md:px-12',
        'gap-12 lg:gap-10',
        'items-center',
      ].join(' ')}
    >
      {/* ── Background grid ── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(var(--accent-rgb),0.04) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(var(--accent-rgb),0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at 65% 40%, rgba(0,0,0,0.5) 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 65% 40%, rgba(0,0,0,0.5) 0%, transparent 70%)',
        }}
      />

      {/* ══════════════════════════════
          Left column — Identity
      ══════════════════════════════ */}
      <div className="relative z-10 lg:pr-8 flex flex-col">

        {/* Availability badge */}
        <div className="inline-flex items-center gap-2.5 font-mono text-[11px] text-text2 tracking-[0.08em] uppercase mb-9 w-fit">
          <span
            className="w-2 h-2 rounded-full bg-amber animate-pulse-green shrink-0"
            style={{ boxShadow: '0 0 8px var(--accent-primary)' }}
          />
          Open to opportunities · Nairobi, Kenya · Remote
        </div>

        {/* Name ── large serif */}
        <h1
          className="font-serif font-light tracking-[-0.04em] leading-[0.9] text-text mb-7"
          style={{ fontSize: 'clamp(54px, 8vw, 96px)' }}
        >
          Fredrick
          <br />
          <em className="not-italic text-amber">Nyang'au</em>
        </h1>

        {/* Role line with extending gradient divider */}
        <div className="flex items-center gap-4 mb-7">
          <span className="block w-[3px] h-6 rounded-full bg-amber shrink-0" />
          <span className="font-mono text-[13px] text-text tracking-[0.02em]">
            Junior Backend Engineer
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-amber/40 to-transparent" />
        </div>

        {/* Headline */}
        <p className="text-[18px] sm:text-[20px] font-light text-text leading-[1.45] max-w-[460px] mb-3 tracking-[-0.01em]">
          Building production-ready APIs.
        </p>

        {/* Stack strip */}
        <p className="font-mono text-[11px] text-text3 tracking-[0.1em] max-w-[440px] mb-10 leading-[1.8]">
          FASTAPI · POSTGRESQL · DOCKER · PAYMENT INTEGRATIONS · M-PESA DARAJA
        </p>

        {/* ── Primary CTAs ── */}
        <div className="flex flex-wrap gap-3 mb-9">
          <a
            href="#projects"
            className={[
              'inline-flex items-center gap-2',
              'bg-amber text-bg font-sans text-sm font-semibold',
              'px-7 py-3.5 rounded-md',
              'transition-all duration-200 hover:bg-amber-glow hover:-translate-y-px',
              'no-underline',
            ].join(' ')}
          >
            View Projects
            <ArrowDown size={14} className="opacity-80" />
          </a>
          <a
            href="#contact"
            className={[
              'inline-flex items-center gap-2',
              'text-text font-sans text-sm font-medium',
              'px-7 py-3.5 rounded-md',
              'border border-border2',
              'transition-all duration-200 hover:border-amber/50 hover:text-amber',
              'no-underline',
            ].join(' ')}
          >
            Get in Touch
            <ArrowRight size={14} className="opacity-60" />
          </a>
        </div>

        {/* ── Icon-only social row + divider + Resume ── */}
        <div className="flex items-center gap-2 flex-wrap">
          {socialLinks.map(({ href, label, Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={[
                'p-2.5 rounded-lg border border-border-dim',
                'text-text3 hover:text-amber hover:border-amber/40',
                'transition-all duration-200',
              ].join(' ')}
            >
              <Icon size={17} />
            </a>
          ))}
          <div className="w-px h-5 bg-border-dim mx-1" aria-hidden />
          <ResumeDownload />
        </div>

        {/* ── Mobile terminal toggle ── */}
        <div className="mt-8 lg:hidden">
          <button
            onClick={() => setShowTerminal((v) => !v)}
            className={[
              'w-full inline-flex items-center justify-center gap-2.5',
              'bg-surface/40 backdrop-blur-md border border-border-dim',
              'hover:border-amber/40 hover:text-text',
              'text-text2 font-mono text-[12px] font-medium',
              'px-5 py-3.5 rounded-md transition-all duration-200',
            ].join(' ')}
          >
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${showTerminal ? 'bg-amber animate-pulse-green' : 'bg-amber'}`}
            />
            {showTerminal ? 'Hide terminal' : 'View terminal →'}
          </button>
        </div>
      </div>

      {/* ══════════════════════════════
          Right column — Merged Terminal
      ══════════════════════════════ */}
      <div
        className={[
          'relative z-10 flex flex-col justify-center',
          showTerminal ? 'flex' : 'hidden lg:flex',
          'mt-4 lg:mt-0',
        ].join(' ')}
      >
        {/* Ambient glow behind terminal */}
        <div
          aria-hidden
          className="absolute -inset-10 pointer-events-none rounded-[40px]"
          style={{
            background: 'radial-gradient(ellipse at 50% 45%, rgba(var(--accent-rgb),0.13) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
        <Terminal />
      </div>
    </section>
  );
}
