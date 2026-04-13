import { useEffect, useState } from 'react';
import { type TerminalLine, terminalLines } from '@/data/terminal';

export interface RenderedLine {
  type: TerminalLine['type'];
  text?: string;
  /** For 'cmd' lines, the text is revealed character-by-character */
  partial?: string;
  done: boolean;
}

const TYPING_BASE_MS  = 28;
const TYPING_JITTER   = 20;
const DELAY_CMD_MS    = 400;
const DELAY_BLANK_MS  = 100;
const DELAY_OUTPUT_MS = 60;

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Drives the typewriter terminal animation.
 * Returns the list of `RenderedLine` objects the Terminal component renders.
 * Starts after an initial 600 ms delay (matching the original HTML script).
 */
export function useTerminal(): RenderedLine[] {
  const [lines, setLines] = useState<RenderedLine[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      await sleep(600);

      for (const rawLine of terminalLines) {
        if (cancelled) break;

        const delay =
          rawLine.type === 'cmd'   ? DELAY_CMD_MS    :
          rawLine.type === 'blank' ? DELAY_BLANK_MS  :
          DELAY_OUTPUT_MS;

        await sleep(delay);
        if (cancelled) break;

        if (rawLine.type === 'cmd' && rawLine.text) {
          // Push an empty cmd line first
          setLines((prev) => [...prev, { type: 'cmd', text: rawLine.text, partial: '', done: false }]);

          // Type character by character
          for (let i = 0; i <= rawLine.text.length; i++) {
            if (cancelled) break;
            await sleep(TYPING_BASE_MS + Math.random() * TYPING_JITTER);
            const partial = rawLine.text.slice(0, i);
            setLines((prev) => {
              const next = [...prev];
              next[next.length - 1] = { type: 'cmd', text: rawLine.text, partial, done: i === rawLine.text!.length };
              return next;
            });
          }
        } else {
          setLines((prev) => [...prev, { type: rawLine.type, text: rawLine.text, done: true }]);
        }
      }
    }

    run();
    return () => { cancelled = true; };
  }, []);

  return lines;
}
