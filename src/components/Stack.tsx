import { useFadeUp } from '@/hooks/useFadeUp';
import { stackCategories } from '@/data/stack';

export default function Stack(): JSX.Element {
  const ref = useFadeUp<HTMLDivElement>();

  return (
    <section id="stack" className="bg-bg py-10 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12">
      <p className="font-mono text-[11px] text-amber tracking-[0.16em] uppercase mb-4">
        / technical skills
      </p>
      <h2
        className="font-serif font-light tracking-[-0.03em] leading-[1.1] mb-3"
        style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
      >
        Technical stack.
      </h2>
      <p className="text-[15px] text-text2 max-w-[560px] mb-10 sm:mb-16 leading-[1.75]">
        Technologies used in production deployments. No skill bars, no guesswork.
        The projects above are the proof.
      </p>

      <div
        ref={ref}
        className="fade-up grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-border-dim"
      >
        {stackCategories.map((cat) => (
          <div
            key={cat.title}
            className="bg-bg p-7 sm:p-9 hover:bg-surface transition-colors duration-200 group"
          >
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-border-dim">
              <span className="font-mono text-[11px] text-amber tracking-[0.12em] uppercase">
                {cat.title}
              </span>
              <span className="font-mono text-[10px] text-text3 border border-border-dim px-2 py-0.5 rounded">
                {cat.label}
              </span>
            </div>
            <ul className="flex flex-col gap-2.5">
              {cat.items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center gap-2.5 text-[13px] text-text2"
                >
                  <span className="text-amber/50 font-mono group-hover:text-amber transition-colors duration-200">→</span>
                  <span className="font-mono text-[12px] text-text">{item.name}</span>
                  {item.note && (
                    <small className="font-mono text-[10px] text-text3 ml-auto whitespace-nowrap">
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
