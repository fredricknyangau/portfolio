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
      { name: 'FastAPI', note: 'primary framework' },
      { name: 'Python 3.12', note: 'async, type hints' },
      { name: 'PostgreSQL 16', note: 'rls & data integrity' },
      { name: 'SQLAlchemy + Alembic', note: 'orm & migrations' },
      { name: 'Redis', note: 'caching, rate limiting' },
      { name: 'pytest', note: 'unit + integration' },
      { name: 'Docker', note: 'containerization' },
      { name: 'Railway', note: 'paas deployment' },
    ],
  },
  {
    title: 'Mobile & Frontend',
    items: [
      { name: 'Flutter', note: 'primary mobile' },
      { name: 'Dart', note: 'typed development' },
      { name: 'Android (API 29+)', note: 'native targeting' },
      { name: 'React', note: 'spa web apps' },
      { name: 'TypeScript', note: 'type safety' },
      { name: 'JavaScript ES6+', note: 'modern logic' },
      { name: 'HTML / CSS', note: 'semantic layout' },
    ],
  },
  {
    title: 'Infrastructure & Integrations',
    items: [
      { name: 'M-Pesa Daraja API', note: 'payment gateway' },
      { name: 'JWT / bcrypt', note: 'security & auth' },
      { name: 'Nginx', note: 'reverse proxy' },
      { name: 'Git / GitHub', note: 'version control' },
      { name: 'Pydantic v2', note: 'data validation' },
      { name: 'Uvicorn / ASGI', note: 'high performance' },
    ],
  },
];
