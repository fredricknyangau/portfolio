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
];
