import { useState } from 'react';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import Terminal from './Terminal';

export default function TerminalOverlay(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4 pointer-events-none">
      {/* Terminal Window */}
      {isOpen && (
        <div className="w-[320px] sm:w-[500px] h-[400px] pointer-events-auto animate-in fade-in slide-in-from-bottom-10 duration-300">
          <div className="relative h-full flex flex-col">
            {/* Close button for the window specifically in case someone wants to close it from the top */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 z-10 p-1 rounded-full bg-surface2/50 text-text3 hover:text-amber transition-colors"
              aria-label="Close terminal"
            >
              <X size={16} />
            </button>
            <Terminal />
          </div>
        </div>
      )}

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={[
          'pointer-events-auto',
          'w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300',
          'bg-amber text-bg hover:scale-110 active:scale-95',
          isOpen ? 'rotate-90' : 'rotate-0'
        ].join(' ')}
        aria-label="Launch Terminal"
      >
        {isOpen ? <X size={24} /> : <TerminalIcon size={24} />}
      </button>
    </div>
  );
}
