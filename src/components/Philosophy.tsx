import { useFadeUp } from '@/hooks/useFadeUp';
import { philosophyPrinciples } from '@/data/philosophy';

export default function Philosophy(): JSX.Element {
  const ref = useFadeUp<HTMLDivElement>();

  return (
    <section id="philosophy" className="bg-bg py-10 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12">
      <p className="font-mono text-[11px] text-amber tracking-[0.16em] uppercase mb-4">
        / engineering philosophy
      </p>
      <h2
        className="font-serif font-light tracking-[-0.03em] leading-[1.1] mb-3"
        style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
      >
        How I build systems.
      </h2>
      <p className="text-[15px] text-text2 max-w-[540px] mb-10 sm:mb-16 leading-[1.75]">
        Five principles I apply to every backend project, from schema design to production deployment.
      </p>

      <div
        ref={ref}
        className="fade-up grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-border-dim"
      >
        {philosophyPrinciples.map((p) => (
          <div
            key={p.index}
            className="bg-bg p-7 sm:p-9 group hover:bg-surface transition-colors duration-200"
          >
            <div className="font-mono text-[11px] text-amber/50 tracking-[0.12em] mb-4 group-hover:text-amber transition-colors duration-200">
              {p.index}
            </div>
            <h3 className="font-mono text-[14px] text-text font-medium mb-3 leading-[1.4]">
              {p.title}
            </h3>
            <p className="text-[14px] text-text2 leading-[1.75]">{p.body}</p>
          </div>
        ))}

        {/* Sixth cell - filler for grid alignment */}
        <div className="bg-bg p-7 sm:p-9 flex items-center justify-center">
          <div className="font-mono text-[12px] text-text3 text-center leading-[1.9]">
            <div className="text-amber mb-2">→</div>
            Complexity should be earned.
            <br />
            Not assumed.
          </div>
        </div>
      </div>
    </section>
  );
}
