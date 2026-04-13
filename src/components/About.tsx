import { useFadeUp } from '@/hooks/useFadeUp';

interface TimelineItem {
  date: string;
  role: string;
  org: string;
  active?: boolean;
}

const timelineItems: TimelineItem[] = [
  {
    date: 'Jan 2026 – present',
    role: 'Founder & Team Lead',
    org: 'Backend Engineers 2026 Community',
    active: true,
  },
  {
    date: 'Jan 2025 – Apr 2025',
    role: 'ICT Intern',
    org: 'Public Service Office, Kenya',
  },
  {
    date: 'Sep 2021 – Dec 2025',
    role: 'BSc Information Technology',
    org: 'Kabarak University, Nakuru',
  },
];

export default function About(): JSX.Element {
  const textRef = useFadeUp<HTMLDivElement>();
  const cardRef = useFadeUp<HTMLDivElement>();

  return (
    <section
      id="about"
      className={[
        'bg-surface py-24 px-6 md:px-12',
        'grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center',
      ].join(' ')}
    >
      {/* Left — bio text */}
      <div ref={textRef} className="fade-up">
        <p className="font-mono text-[11px] text-amber tracking-[0.16em] uppercase mb-4">
          / about
        </p>
        <h2
          className="font-serif font-light tracking-[-0.03em] leading-[1.1] mb-7"
          style={{ fontSize: 'clamp(36px, 4vw, 50px)' }}
        >
          Built for this
          <br />
          <em className="italic">market</em>
        </h2>

        <p className="text-[16px] text-text2 leading-[1.8] mb-5">
          I'm a backend engineer based in{' '}
          <strong className="text-text font-medium">Nairobi, Kenya</strong>, focused on
          the infrastructure layer that makes East Africa's mobile economy work —
          payments, data, APIs that handle real-world conditions like unreliable
          connections and M-Pesa callbacks.
        </p>
        <p className="text-[16px] text-text2 leading-[1.8] mb-5">
          BSc in Information Technology from{' '}
          <strong className="text-text font-medium">Kabarak University</strong>. My
          academic performance on practical and project-based work — industrial
          attachment, capstone, mobile development — showed me where I'm most effective:
          building things, not memorising theory.
        </p>
        <p className="text-[16px] text-text2 leading-[1.8]">
          I lead a small engineering team through a structured backend roadmap: FastAPI,
          PostgreSQL, system design. I write about what I build and review what I commit.{' '}
          <strong className="text-text font-medium">
            One commit every day, no exceptions.
          </strong>
        </p>
      </div>

      {/* Right — Profile Image & Timeline card */}
      <div className="flex flex-col gap-6 w-full">
        {/* Profile Image Card */}
        <div className="fade-up bg-bg border border-border-dim rounded-lg flex flex-col sm:flex-row items-center p-6 gap-6 relative overflow-hidden">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-amber/30 flex-shrink-0 p-1 relative z-10 bg-bg">
            <img
              src="/images/profile.png"
              alt="Fredrick Nyangau"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="text-center sm:text-left relative z-10 w-full">
            <h3 className="font-serif text-xl sm:text-2xl text-text mb-2">Ready to ship</h3>
            <p className="text-text2 text-sm leading-relaxed mb-4">
              I'm actively seeking roles where I can architect backend systems and drive product development forward.
            </p>
            <a
              href="/docs/Fredrick_Nyangau_CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-amber text-sm font-mono border-b border-amber/30 hover:border-amber pb-1 transition-colors"
            >
              Download CV ↓
            </a>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-amber/5 to-transparent pointer-events-none" />
        </div>

        {/* Existing Timeline */}
        <div
          ref={cardRef}
          className="fade-up bg-bg border border-border-dim rounded-lg p-9 w-full"
        >
        <div className="font-mono text-[11px] text-amber tracking-[0.12em] uppercase mb-5">
          Career timeline
        </div>

        <ul className="flex flex-col">
          {timelineItems.map((item, i) => (
            <li key={item.date} className="flex gap-4 pb-6 relative">
              {/* Vertical connector line */}
              {i < timelineItems.length - 1 && (
                <div
                  aria-hidden
                  className="absolute left-[5px] top-6 bottom-0 w-px bg-border-dim"
                />
              )}

              {/* Dot */}
              <div
                className={[
                  'w-3 h-3 rounded-full border-2 bg-bg flex-shrink-0 mt-1',
                  item.active
                    ? 'border-amber'
                    : 'border-amber-dim',
                ].join(' ')}
                style={item.active ? { boxShadow: '0 0 8px rgba(212,146,42,0.3)' } : undefined}
              />

              {/* Content */}
              <div>
                <div className="font-mono text-[11px] text-text3 tracking-[0.06em]">
                  {item.date}
                </div>
                <div className="text-[14px] text-text font-medium my-0.5">
                  {item.role}
                </div>
                <div className="text-[13px] text-text2">{item.org}</div>
              </div>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </section>
  );
}
