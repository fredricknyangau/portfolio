import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface Props {
  chart: string;
}

export default function Mermaid({ chart }: Props): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      securityLevel: 'loose',
      fontFamily: 'JetBrains Mono, monospace',
    });

    if (ref.current && chart) {
      const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
      mermaid.render(id, chart).then((result) => {
        if (ref.current) {
          ref.current.innerHTML = result.svg;
        }
      }).catch((e) => {
        console.error('Mermaid render error:', e);
      });
    }
  }, [chart]);

  return (
    <div 
      ref={ref} 
      className="mermaid-container my-6 overflow-x-auto rounded-md border border-border-dim bg-surface2 p-6 flex justify-center" 
    />
  );
}
