import { useFadeUp } from '@/hooks/useFadeUp';
import { experienceItems } from '@/data/experience';
import { GitHubCalendar } from 'react-github-calendar';

const typeLabel: Record<string, string> = {
  work: 'Work',
  project: 'Project',
  education: 'Education',
};

export default function Experience(): JSX.Element {
  const timelineRef = useFadeUp<HTMLDivElement>();
  const calendarRef = useFadeUp<HTMLDivElement>();

  return (
    <section
      id="experience"
      className={[
        'bg-surface py-10 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12',
      ].join(' ')}
    >
      <p className="font-mono text-[11px] text-amber tracking-[0.16em] uppercase mb-4">
        / experience
      </p>
      <h2
        className="font-serif font-light tracking-[-0.03em] leading-[1.1] mb-3"
        style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
      >
        What I have built and where.
      </h2>
      <p className="text-[15px] text-text2 max-w-[540px] mb-10 sm:mb-16 leading-[1.75]">
        Production projects, internship, and academic work. Each entry reflects real engineering
        output, not just job titles.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
        {/* Timeline */}
        <div ref={timelineRef} className="fade-up">
          <ul className="flex flex-col">
            {experienceItems.map((item, i) => (
              <li key={item.id} className="flex gap-5 pb-10 relative">
                {/* Connector line */}
                {i < experienceItems.length - 1 && (
                  <div
                    aria-hidden
                    className="absolute left-[5px] top-6 bottom-0 w-px bg-border-dim"
                  />
                )}

                {/* Dot */}
                <div
                  className={[
                    'w-3 h-3 rounded-full border-2 bg-surface flex-shrink-0 mt-1',
                    item.active ? 'border-amber' : 'border-border-dim',
                  ].join(' ')}
                  style={item.active ? { boxShadow: '0 0 8px rgba(16,185,129,0.3)' } : undefined}
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
                    <div>
                      <div className="text-[15px] text-text font-medium">{item.role}</div>
                      <div className="text-[13px] text-text2">{item.org}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-mono text-[11px] text-text3 tracking-[0.04em]">
                        {item.period}
                      </div>
                      <div className="font-mono text-[10px] text-amber/60 tracking-[0.08em] uppercase mt-1">
                        {typeLabel[item.type]}
                      </div>
                    </div>
                  </div>

                  {item.bullets.length > 0 && (
                    <ul className="mt-3 flex flex-col gap-1.5">
                      {item.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5 text-[13px] text-text2 leading-[1.65]">
                          <span className="text-amber/50 font-mono shrink-0 mt-0.5">–</span>
                          <span>
                            {b.split(/(\*\*.*?\*\*)/g).map((part, i) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={i} className="font-semibold text-text">{part.slice(2, -2)}</strong>;
                              }
                              return <span key={i}>{part}</span>;
                            })}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* GitHub contribution calendar */}
        <div ref={calendarRef} className="fade-up">
          <div className="font-mono text-[11px] text-text3 uppercase tracking-[0.12em] mb-4">
            GitHub Activity
          </div>
          <div className="w-full bg-bg/50 border border-border-dim rounded-lg p-5 transition-colors hover:border-amber/30 overflow-x-auto custom-scrollbar">
            <div className="min-w-[750px]">
              <GitHubCalendar
                username="fredricknyangau"
                colorScheme="dark"
                blockSize={12}
                blockMargin={4}
                fontSize={12}
              />
            </div>
          </div>
          <p className="text-[12px] text-text3 font-mono mt-3">
            One commit every day, no exceptions.
          </p>
        </div>
      </div>
    </section>
  );
}
