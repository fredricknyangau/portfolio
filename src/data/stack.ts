export interface StackItem {
  name: string;
  note?: string;
}

export interface StackCategory {
  title: string;
  label: string;
  items: StackItem[];
}

export const stackCategories: StackCategory[] = [
  {
    title: 'Backend Engineering',
    label: 'core',
    items: [
      { name: 'Python 3.12', note: 'async, type hints' },
      { name: 'FastAPI', note: 'primary framework' },
      { name: 'Pydantic v2', note: 'data validation' },
      { name: 'asyncpg', note: 'async postgres driver' },
      { name: 'Uvicorn / ASGI', note: 'production server' },
    ],
  },
  {
    title: 'Database Systems',
    label: 'storage',
    items: [
      { name: 'PostgreSQL 16', note: 'primary database' },
      { name: 'Redis', note: 'caching, rate limiting' },
      { name: 'Raw SQL / CTEs', note: 'analytics queries' },
      { name: 'Numbered Migrations', note: 'schema versioning' },
      { name: 'Row-Level Security', note: 'tenant isolation' },
    ],
  },
  {
    title: 'Authentication & Security',
    label: 'auth',
    items: [
      { name: 'JWT', note: 'stateless auth' },
      { name: 'OAuth2', note: 'operator auth flows' },
      { name: 'bcrypt', note: 'password hashing' },
      { name: 'RBAC', note: 'role-based access' },
      { name: 'Tenant Isolation', note: 'multi-tenant patterns' },
    ],
  },
  {
    title: 'Infrastructure',
    label: 'infra',
    items: [
      { name: 'Docker', note: 'multi-stage builds' },
      { name: 'Linux / Systemd', note: 'process management' },
      { name: 'Render', note: 'paas deployment' },
      { name: 'Railway', note: 'paas deployment' },
      { name: 'Nginx', note: 'reverse proxy' },
      { name: 'Git / GitHub', note: 'version control' },
    ],
  },
  {
    title: 'Testing & Tooling',
    label: 'testing',
    items: [
      { name: 'pytest', note: 'unit + integration' },
      { name: 'httpx', note: 'async test client' },
      { name: 'Postman / curl', note: 'api testing' },
    ],
  },
  {
    title: 'Payment Integrations',
    label: 'payments',
    items: [
      { name: 'M-Pesa Daraja API', note: 'stk push' },
      { name: 'Webhook Retry Logic', note: 'exponential backoff' },
      { name: 'Idempotency Keys', note: 'duplicate prevention' },
      { name: 'Signature Verification', note: 'payload auth' },
    ],
  },
];
