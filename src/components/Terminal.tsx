import { useRef, useEffect } from 'react';
import { useTerminal, type RenderedLine } from '@/hooks/useTerminal';

/** Render "200 OK · application/json · 28ms" with status highlighted green */
function renderHttpLine(text: string): React.ReactNode {
  const parts = text.split(/\s*·\s*/);
  return (
    <span className="pl-4">
      <span className="inline-flex items-center gap-2 px-2 py-0.5 rounded text-[11px] font-bold bg-green-ok/15 text-green-ok border border-green-ok/20 mr-2">
        {parts[0]}
      </span>
      {parts.slice(1).map((p, i) => (
        <span key={i} className="text-text3 text-[12px]">
          {i > 0 && ' · '}{p}
        </span>
      ))}
    </span>
  );
}

/** Syntax-highlight a single JSON line: keys amber, strings green, primitives amber */
function renderJsonLine(text: string): React.ReactNode {
  // Bare brace / bracket
  if (/^\s*[{}[\]]\s*$/.test(text)) {
    return <span className="text-text3 pl-4">{text}</span>;
  }

  // "key": value,
  const m = text.match(/^(\s*)("[^"]+")(\s*:\s*)(.+?)(,?)$/);
  if (!m) return <span className="text-text2 pl-4">{text}</span>;
  const [, indent, key, colon, rawVal, comma] = m;

  let valNode: React.ReactNode;

  if (rawVal.startsWith('"') && rawVal.endsWith('"')) {
    // String value
    valNode = <span className="text-green-ok">{rawVal}</span>;
  } else if (rawVal.startsWith('[')) {
    // Array — extract quoted items
    const items = rawVal.slice(1, -1).match(/"[^"]+"/g) ?? [];
    valNode = (
      <>
        <span className="text-text3">{'['}</span>
        {items.map((item, i) => (
          <span key={i}>
            <span className="text-green-ok">{item}</span>
            {i < items.length - 1 && <span className="text-text3">, </span>}
          </span>
        ))}
        <span className="text-text3">{']'}</span>
      </>
    );
  } else {
    // Number / boolean / null
    valNode = <span className="text-amber">{rawVal}</span>;
  }

  return (
    <span className="pl-4">
      <span>{indent}</span>
      <span className="text-amber-dim">{key}</span>
      <span className="text-text3">{colon}</span>
      {valNode}
      {comma && <span className="text-text3">{comma}</span>}
    </span>
  );
}

function renderLineContent(line: RenderedLine): React.ReactNode {
  const display = line.type === 'cmd' ? (line.partial ?? '') : (line.text ?? '');

  switch (line.type) {
    case 'blank':
      return <span>&nbsp;</span>;

    case 'cmd':
      return (
        <>
          <span className="text-amber-dim select-none">❯</span>
          {' '}
          <span className="text-green-ok">~/kukufiti</span>
          {' '}
          <span className="text-text">{display}</span>
          {!line.done && (
            <span className="inline-block w-2 h-[15px] bg-amber align-middle ml-[2px] animate-blink" />
          )}
        </>
      );

    case 'ok':
      return <span className="text-green-ok">{display}</span>;

    case 'dim':
      return <span className="text-text3">{display}</span>;

    case 'err':
      return <span className="text-err">{display}</span>;

    case 'http':
      return renderHttpLine(display);

    case 'json':
      return renderJsonLine(display);

    case 'prompt':
      return (
        <>
          <span className="text-amber-dim select-none">❯</span>
          {' '}
          <span className="text-green-ok">~/kukufiti</span>
          {' '}
          <span className="inline-block w-2 h-[15px] bg-amber align-middle ml-[2px] animate-blink" />
        </>
      );

    default:
      return <span className="text-text2">{display}</span>;
  }
}

export default function Terminal(): JSX.Element {
  const lines = useTerminal();
  const bodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever a new line is added
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines.length]);

  return (
    <div
      className={[
        'rounded-[10px] overflow-hidden',
        'border border-border-dim',
        'bg-surface',
        'shadow-[0_0_0_1px_rgba(var(--accent-rgb),0.06),0_32px_80px_rgba(0,0,0,0.35),0_0_80px_rgba(var(--accent-rgb),0.06)]',
      ].join(' ')}
    >
      {/* Traffic lights bar */}
      <div className="flex items-center gap-2 px-[18px] py-[14px] bg-surface2 border-b border-border-dim">
        <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
        <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        <span className="font-mono text-[12px] text-text3 ml-2">
          portfolio@fredrick: ~/kukufiti
        </span>
      </div>

      {/* Scrollable body */}
      <div
        ref={bodyRef}
        className="p-6 font-mono text-[13px] leading-[1.9] min-h-[460px] max-h-[560px] overflow-y-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {lines.map((line, i) => (
          <div key={i} className="flex">
            {renderLineContent(line)}
          </div>
        ))}
      </div>
    </div>
  );
}
