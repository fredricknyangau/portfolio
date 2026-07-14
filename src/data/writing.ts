export interface WritingEntry {
  id: string;
  title: string;
  description: string;
  tags: string[];
  url: string | null;
  status: 'published' | 'draft' | 'planned';
  publishedAt?: string;
}

export const writingEntries: WritingEntry[] = [
  {
    id: 'modular-monolith',
    title: 'Modular Monolith Backend Systems',
    description:
      'How I structure FastAPI projects into domain modules with a shared database, clean internal boundaries, and numbered migrations - without prematurely reaching for microservices.',
    tags: ['FastAPI', 'Architecture', 'PostgreSQL', 'Python'],
    url: "https://dev.to/fredricknyangau/modular-monolith-backend-systems-479l",
    status: 'published',
    publishedAt: '2026-05-12',
  },
  {
    id: 'modular-monolith-coderlegion',
    title: 'Modular Monolith System Architecture Paradigm',
    description:
      'Cross-posted on CoderLegion. Covers the same core pattern — domain-bounded modules, a shared PostgreSQL database, and numbered migrations — with additional discussion on when a modular monolith is the right call versus microservices.',
    tags: ['FastAPI', 'Architecture', 'PostgreSQL', 'Python'],
    url: "https://coderlegion.com/20040/modular-monolith-system-architecture-paradigm",
    status: 'published',
    publishedAt: '2026-05-12',
  },
];
