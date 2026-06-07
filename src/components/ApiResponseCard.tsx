export default function ApiResponseCard(): JSX.Element {
  return (
    <div
      className={[
        'rounded-[10px] overflow-hidden border border-border-dim',
        'bg-surface font-mono text-[13px] leading-relaxed',
        'shadow-[0_0_0_1px_rgba(var(--accent-rgb),0.06),0_32px_80px_rgba(0,0,0,0.3)]',
      ].join(' ')}
    >
      {/* Request line */}
      <div className="flex items-center gap-3 px-5 py-3 bg-surface2 border-b border-border-dim">
        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber/15 text-amber border border-amber/20">
          GET
        </span>
        <span className="text-text2 text-[12px] truncate">
          /api/v1/engineer/profile
        </span>
        <span className="ml-auto text-[11px] text-text3 shrink-0">HTTP/1.1</span>
      </div>

      {/* Status line */}
      <div className="flex items-center gap-3 px-5 py-2.5 border-b border-border-dim bg-bg/40">
        <span className="flex items-center gap-1.5 text-[12px]">
          <span className="w-2 h-2 rounded-full bg-amber animate-pulse-green" />
          <span className="text-amber font-semibold">200 OK</span>
        </span>
        <span className="text-text3 text-[11px]">application/json</span>
      </div>

      {/* JSON body */}
      <div className="px-5 py-5 text-[12px] leading-[1.9]">
        <span className="text-text3">{'{'}</span>
        <br />
        <span className="pl-5">
          <span className="text-amber-dim">"name"</span>
          <span className="text-text3">: </span>
          <span className="text-green-ok">"Fredrick Nyang'au"</span>
          <span className="text-text3">,</span>
        </span>
        <br />
        <span className="pl-5">
          <span className="text-amber-dim">"role"</span>
          <span className="text-text3">: </span>
          <span className="text-green-ok">"Junior Backend Engineer"</span>
          <span className="text-text3">,</span>
        </span>
        <br />
        <span className="pl-5">
          <span className="text-amber-dim">"stack"</span>
          <span className="text-text3">: </span>
          <span className="text-text3">['</span>
          <span className="text-green-ok">FastAPI</span>
          <span className="text-text3">', '</span>
          <span className="text-green-ok">PostgreSQL</span>
          <span className="text-text3">', '</span>
          <span className="text-green-ok">Docker</span>
          <span className="text-text3">'],</span>
        </span>
        <br />
        <span className="pl-5">
          <span className="text-amber-dim">"location"</span>
          <span className="text-text3">: </span>
          <span className="text-green-ok">"Nairobi, Kenya"</span>
          <span className="text-text3">,</span>
        </span>
        <br />
        <span className="pl-5">
          <span className="text-amber-dim">"deployed"</span>
          <span className="text-text3">: </span>
          <span className="text-amber">3</span>
          <span className="text-text3">, </span>
          <span className="text-text3 text-[11px] italic">// systems in production</span>
        </span>
        <br />
        <span className="pl-5">
          <span className="text-amber-dim">"available"</span>
          <span className="text-text3">: </span>
          <span className="text-amber">true</span>
        </span>
        <br />
        <span className="text-text3">{'}'}</span>
      </div>

      {/* Footer status bar */}
      <div className="px-5 py-2.5 border-t border-border-dim bg-surface2 flex items-center gap-4 text-[11px] text-text3">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber" />
          Render · Online
        </span>
        <span className="ml-auto">latency: 28ms</span>
      </div>
    </div>
  );
}
