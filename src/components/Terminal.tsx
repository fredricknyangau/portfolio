import { useTerminal, type RenderedLine } from '@/hooks/useTerminal';

function renderLineContent(line: RenderedLine): React.ReactNode {
  const display = line.type === 'cmd' ? line.partial ?? '' : line.text ?? '';

  switch (line.type) {
    case 'blank':
      return <span>&nbsp;</span>;

    case 'cmd':
      return (
        <>
          <span className="text-amber-dim select-none">❯</span>
          {' '}
          <span className="text-green-ok">~/backend</span>
          {' '}
          <span className="text-text">{display}</span>
          {!line.done && (
            <span
              className="inline-block w-2 h-[15px] bg-amber align-middle ml-[2px] animate-blink"
            />
          )}
        </>
      );

    case 'ok':
      return <span className="text-green-ok">{display}</span>;

    case 'dim':
      return <span className="text-text3">{display}</span>;

    case 'err':
      return <span className="text-err">{display}</span>;

    case 'prompt':
      return (
        <>
          <span className="text-amber-dim select-none">❯</span>
          {' '}
          <span className="text-green-ok">~/backend</span>
          {' '}
          <span
            className="inline-block w-2 h-[15px] bg-amber align-middle ml-[2px] animate-blink"
          />
        </>
      );

    default:
      return <span className="text-text2">{display}</span>;
  }
}

export default function Terminal(): JSX.Element {
  const lines = useTerminal();

  return (
    <div
      className={[
        'rounded-[10px] overflow-hidden',
        'border border-border-dim',
        'bg-surface',
        'shadow-[0_0_0_1px_rgba(var(--accent-rgb),0.06),0_32px_80px_rgba(0,0,0,0.3),0_0_60px_rgba(var(--accent-rgb),0.04)]',
      ].join(' ')}
    >
      {/* Traffic lights bar */}
      <div className="flex items-center gap-2 px-[18px] py-[14px] bg-surface2 border-b border-border-dim">
        <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
        <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        <span className="font-mono text-[12px] text-text3 ml-2">
          ~/dev/zealsync/backend
        </span>
      </div>

      {/* Body */}
      <div className="p-6 font-mono text-[13px] leading-[1.9] min-h-[300px]">
        {lines.map((line, i) => (
          <div key={i} className="flex">
            {renderLineContent(line)}
          </div>
        ))}
      </div>
    </div>
  );
}
