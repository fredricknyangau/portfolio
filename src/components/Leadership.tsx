import { useFadeUp } from '@/hooks/useFadeUp';
import { GitHubIcon } from '@/components/SocialIcons';
import { ArrowUpRight } from 'lucide-react';

const communityDetails = [
  {
    label: 'Focus',
    value: 'Backend engineering fundamentals to production readiness',
  },
  {
    label: 'Structure',
    value: 'Weekly architecture discussions, code reviews, and project-based work',
  },
  {
    label: 'Practice',
    value: 'FastAPI, PostgreSQL, system design, and deployment workflows',
  },
  {
    label: 'Culture',
    value: 'Engineering accountability - ship working code, document decisions',
  },
];

export default function Leadership(): JSX.Element {
  const ref = useFadeUp<HTMLDivElement>();

  return (
    <section id="community" className="bg-bg py-10 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12">
      <p className="font-mono text-[11px] text-amber tracking-[0.16em] uppercase mb-4">
        / leadership & community
      </p>
      <h2
        className="font-serif font-light tracking-[-0.03em] leading-[1.1] mb-3"
        style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
      >
        Backend Engineers 2026.
      </h2>
      <p className="text-[15px] text-text2 max-w-[540px] mb-10 sm:mb-14 leading-[1.75]">
        A structured backend engineering study community I founded in January 2026.
        The goal: move a small group of engineers from tutorials to production systems.
      </p>

      <div
        ref={ref}
        className="fade-up grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-border-dim max-w-4xl"
      >
        {communityDetails.map((d) => (
          <div key={d.label} className="bg-bg p-7 hover:bg-surface transition-colors duration-200">
            <div className="font-mono text-[10px] text-amber/60 tracking-[0.12em] uppercase mb-2">
              {d.label}
            </div>
            <p className="text-[14px] text-text leading-[1.65]">{d.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-4 flex-wrap">
        <a
          href="https://github.com/backend-engineers-2026"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 font-mono text-[13px] text-text2 border border-border-dim px-5 py-2.5 rounded hover:text-text hover:border-text2 transition-all no-underline"
        >
          <GitHubIcon size={14} />
          GitHub
          <ArrowUpRight size={13} className="opacity-50" />
        </a>
        <span className="font-mono text-[12px] text-text3">
          Founder &amp; Team Lead · Jan 2026 - Present
        </span>
      </div>
    </section>
  );
}
