export interface StackItem {
  name: string;
  note?: string;
}

export interface StackColumn {
  title: string;
  items: StackItem[];
}

export const stackColumns: StackColumn[] = [
  {
    title: 'Backend',
    items: [
      { name: 'FastAPI', note: 'primary' },
      { name: 'Python 3.12', note: 'pyenv' },
      { name: 'PostgreSQL 16' },
      { name: 'SQLAlchemy + Alembic' },
      { name: 'Redis', note: 'caching, rate limiting' },
      { name: 'pytest', note: 'unit + integration' },
      { name: 'Docker' },
      { name: 'Railway', note: 'deployment' },
    ],
  },
  {
    title: 'Mobile & Frontend',
    items: [
      { name: 'Flutter', note: 'primary mobile' },
      { name: 'Dart' },
      { name: 'Android (API 29+)' },
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'JavaScript ES6+' },
      { name: 'HTML / CSS' },
    ],
  },
  {
    title: 'Infrastructure & Integrations',
    items: [
      { name: 'M-Pesa Daraja API', note: 'payments' },
      { name: 'JWT / bcrypt', note: 'auth' },
      { name: 'Nginx', note: 'reverse proxy' },
      { name: 'Git / GitHub' },
      { name: 'Pydantic v2' },
      { name: 'Uvicorn / ASGI' },
    ],
  },
];
