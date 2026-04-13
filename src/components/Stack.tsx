import { useFadeUp } from '@/hooks/useFadeUp';
import { stackColumns } from '@/data/stack';

export default function Stack(): JSX.Element {
  const ref = useFadeUp<HTMLDivElement>();

  return (
    <section id="stack" className="bg-bg py-10 sm:py-16 md:py-24 px-5 sm:px-6 md:px-12">
      <p className="font-mono text-[11px] text-amber tracking-[0.16em] uppercase mb-4">
        / technology
      </p>
      <h2
        className="font-serif font-light tracking-[-0.03em] leading-[1.1] mb-3"
        style={{ fontSize: 'clamp(36px, 4vw, 50px)' }}
      >
        The stack
      </h2>
      <p className="text-[16px] text-text2 max-w-[560px] mb-8 sm:mb-16">
        Technologies I've used in production deployments — no skill bars, no guesswork.
        The projects above are the proof.
      </p>

      <div
        ref={ref}
        className="fade-up grid grid-cols-1 md:grid-cols-3 gap-[2px]"
      >
        {stackColumns.map((col) => (
          <div
            key={col.title}
            className="bg-surface border border-border-dim p-9"
          >
            <div className="font-mono text-[11px] text-amber tracking-[0.12em] uppercase mb-6 pb-4 border-b border-border-dim">
              {col.title}
            </div>
            <ul className="flex flex-col gap-2.5">
              {col.items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center gap-2.5 text-[14px] text-text2"
                >
                  <span className="text-amber-dim font-mono">→</span>
                  <span className="font-mono text-[13px] text-text">{item.name}</span>
                  {item.note && (
                    <small className="font-mono text-[11px] text-text3 ml-auto">
                      {item.note}
                    </small>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
