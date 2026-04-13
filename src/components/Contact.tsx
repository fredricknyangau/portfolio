import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons';

export default function Contact(): JSX.Element {
  return (
    <section
      id="contact"
      className="bg-bg text-center py-[120px] px-6 md:px-12 relative overflow-hidden"
    >
      {/* Radial amber glow */}
      <div
        aria-hidden
        className="absolute w-[600px] h-[600px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,146,42,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10">
        <p className="font-mono text-[11px] text-amber tracking-[0.16em] uppercase mb-3">
          / contact
        </p>
        <p className="text-[15px] text-text2 mb-2">
          Open to backend engineering roles · Nairobi &amp; remote
        </p>

        <a
          href="mailto:fredrick@example.com"
          className={[
            'font-serif font-light tracking-[-0.03em] text-text',
            'inline-block my-6 mb-3 no-underline',
            'border-b border-border2 pb-1',
            'transition-colors duration-200 hover:text-amber hover:border-amber-dim',
          ].join(' ')}
          style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
        >
          fredrick@example.com
        </a>

        <p className="text-[15px] text-text2 mb-11">
          I read every message and reply within 24 hours.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="https://github.com/fredricknyangau"
            target="_blank"
            rel="noreferrer"
            className={[
              'inline-flex items-center gap-2',
              'border border-border2 text-text2',
              'font-mono text-[13px] px-5 py-2.5 rounded',
              'transition-all duration-200 hover:text-text hover:border-text3',
              'no-underline',
            ].join(' ')}
          >
            <GitHubIcon size={16} />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/fredricknyangau"
            target="_blank"
            rel="noreferrer"
            className={[
              'inline-flex items-center gap-2',
              'border border-border2 text-text2',
              'font-mono text-[13px] px-5 py-2.5 rounded',
              'transition-all duration-200 hover:text-text hover:border-text3',
              'no-underline',
            ].join(' ')}
          >
            <LinkedInIcon size={16} />
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
