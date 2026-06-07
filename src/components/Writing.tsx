import { useFadeUp } from '@/hooks/useFadeUp';
import { writingEntries } from '@/data/writing';
import { ArrowUpRight, Clock } from 'lucide-react';

export default function Writing(): JSX.Element {
  const ref = useFadeUp<HTMLDivElement>();

  return (
    <section id="writing" className="bg-surface py-10 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12">
      <p className="font-mono text-[11px] text-amber tracking-[0.16em] uppercase mb-4">
        / technical writing
      </p>
      <h2
        className="font-serif font-light tracking-[-0.03em] leading-[1.1] mb-3"
        style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
      >
        Writing from the build process.
      </h2>
      <p className="text-[15px] text-text2 max-w-[540px] mb-10 sm:mb-14 leading-[1.75]">
        Architecture decisions, tradeoffs, and lessons from shipping FastAPI and PostgreSQL
        systems into production.
      </p>

      <div ref={ref} className="fade-up flex flex-col gap-[1px] max-w-3xl bg-border-dim">
        {writingEntries.map((entry) => (
          <div
            key={entry.id}
            className="bg-surface group p-7 sm:p-9 hover:bg-bg transition-colors duration-200 relative"
          >
            {/* Status badge */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-2.5 py-1 rounded-[3px] border border-border-dim text-text2 tracking-[0.04em]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {entry.status === 'planned' && (
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-text3 border border-border-dim px-2.5 py-1 rounded-[3px] tracking-[0.04em]">
                  <Clock size={10} />
                  Coming soon
                </span>
              )}
              {entry.status === 'published' && entry.publishedAt && (
                <span className="font-mono text-[10px] text-text3 tracking-[0.04em]">
                  {entry.publishedAt}
                </span>
              )}
            </div>

            <h3 className="font-mono text-[16px] text-text font-medium mb-3 leading-[1.4]">
              {entry.title}
            </h3>
            <p className="text-[14px] text-text2 leading-[1.75] mb-5">{entry.description}</p>

            {entry.url ? (
              <a
                href={entry.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[12px] text-amber hover:text-amber-glow transition-colors no-underline"
              >
                Read article
                <ArrowUpRight size={13} />
              </a>
            ) : (
              <span className="font-mono text-[12px] text-text3">
                In progress
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
