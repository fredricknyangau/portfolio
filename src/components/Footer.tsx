import { ArrowUpRight } from 'lucide-react';

export default function Footer(): JSX.Element {
  // Only show the API docs link when the backend URL is explicitly configured
  const apiUrl = import.meta.env.VITE_API_URL;

  return (
    <footer className="border-t border-border-dim px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-center">
      <span className="font-mono text-[12px] text-text3 flex items-center gap-4">
        © 2026 Fredrick Nyang'au · Nairobi, Kenya
        {apiUrl && (
          <a
            href={`${apiUrl}/docs`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-amber hover:text-amber-glow transition-colors font-medium border-l border-border-dim pl-4"
          >
            API Docs <ArrowUpRight size={14} />
          </a>
        )}
      </span>
      <span className="font-mono text-[12px] text-text3">
        Built with FastAPI + React + PostgreSQL
      </span>
    </footer>
  );
}
