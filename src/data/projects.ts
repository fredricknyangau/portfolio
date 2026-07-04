export interface STAR {
  situation: string;
  task: string;
  action: string;
  result: string;
}

export interface Metric {
  highlight: string;
  description: string;
}

export interface EngineeringDecision {
  decision: string;
  rationale: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  tags: { label: string; variant: 'live' | 'wip' | 'default' }[];
  problem: string;
  architectureOverview: string;
  engineeringDecisions: EngineeringDecision[];
  deploymentTarget: string;
  metrics: Metric[];
  stack: string[];
  /** null = no live demo available - hides the live button */
  liveUrl: string | null;
  codeUrl: string | null;
  /** Custom label for the live button. Defaults to "Live App". */
  liveLabel?: string;
  featured?: boolean;
  star?: STAR;
  c4Diagram?: string;
}

export const projects: Project[] = [
  {
    id: 'zealsync-zealsync-wifi-billing',
    name: 'ZealSync — WiFi & Fiber ISP Billing Platform',
    tagline:
      'Multi-tenant SaaS billing platform for Kenyan ISPs. M-Pesa Daraja payment pipeline, MikroTik RouterOS auto-provisioning, and a React frontend — hotspot vouchers and PPPoE subscriptions in one system.',
    featured: true,
    tags: [
      { label: 'Full-Stack', variant: 'live' },
      { label: 'SaaS', variant: 'default' },
      { label: 'FastAPI', variant: 'default' },
      { label: 'React', variant: 'default' },
      { label: 'M-Pesa', variant: 'default' },
      { label: 'MikroTik', variant: 'default' },
    ],

    problem:
      'Small ISP operators in Kenya manage WiFi billing entirely by hand: ' +
      'reconciling M-Pesa SMS alerts against an Excel sheet, manually enabling ' +
      'PPPoE secrets and hotspot accounts in Winbox, and physically collecting ' +
      'cash from resellers. This consumes 3–4 hours per day per operator and ' +
      'causes revenue leakage, delayed activations, and reseller disputes. ' +
      'No affordable local tool provided end-to-end automation — existing ' +
      'platforms either charge a percentage of revenue (resented by operators) ' +
      'or require a dedicated sysadmin to run.',

    architectureOverview:
      'ZealSync is a multi-tenant SaaS platform serving many ISP businesses ' +
      '(tenants) on one deployment. The backend is a FastAPI modular monolith ' +
      'with hard module boundaries — each domain (auth, payments, vouchers, ' +
      'subscriptions, wallets, routers) owns its own router, schemas, and ' +
      'service layer. Raw SQL via asyncpg with no ORM; every financial query ' +
      'is explicit and auditable. ' +
      'The core payment pipeline: customer initiates M-Pesa STK Push → Daraja ' +
      'webhook arrives → idempotency check via UNIQUE constraint on ' +
      'mpesa_receipt_number → payment confirmed in PostgreSQL → arq background ' +
      'job provisions a MikroTik hotspot user or PPPoE secret via the RouterOS ' +
      'REST API → Africa\'s Talking SMS delivers the voucher code. ' +
      'MikroTik routers are reached through a WireGuard VPN tunnel (never ' +
      'exposed to the internet). A magic-command onboarding system generates ' +
      'a unique RouterOS .rsc script per router — one paste in the MikroTik ' +
      'terminal configures WireGuard, the API user, speed profiles, and firewall ' +
      'rules in under 60 seconds. FreeRADIUS with rlm_sql handles hotspot AAA ' +
      'authentication, scoped per tenant via NAS-Identifier. ' +
      'The React 19 frontend serves four interfaces: a public SEO-optimised ' +
      'landing page, an ISP admin portal, a reseller self-service portal, and ' +
      'a customer captive-portal flow. A super admin portal (separate auth ' +
      'context, mandatory TOTP) manages all tenants with impersonation tokens ' +
      'for support access.',

    engineeringDecisions: [
      {
        decision: 'UNIQUE constraint on mpesa_receipt_number as idempotency key',
        rationale:
          'Safaricom Daraja retries webhooks when the server does not respond ' +
          'within the timeout window. Application-level duplicate checks using ' +
          'SELECT-then-INSERT are vulnerable to race conditions under concurrent ' +
          'delivery — two simultaneous webhook deliveries can both pass the ' +
          'check and both insert. Enforcing UNIQUE at the database layer means ' +
          'the second INSERT fails atomically regardless of concurrency. The ' +
          'webhook handler always returns 200 to Daraja (preventing retry storms) ' +
          'and handles the constraint violation silently.',
      },
      {
        decision: 'arq (asyncio-native) over Celery for background job queue',
        rationale:
          'FastAPI BackgroundTasks runs in-process — a container restart during ' +
          'a MikroTik outage silently drops the provisioning job with no recovery ' +
          'path. Celery is sync-first and requires blocking glue code to run ' +
          'async database calls. arq is asyncio-native, integrates cleanly with ' +
          'asyncpg, and persists jobs in Redis so they survive process restarts. ' +
          'A reconciliation cron runs every 5 minutes to catch any payments ' +
          'confirmed without a corresponding voucher — the actual safety net that ' +
          'makes "payment always results in a voucher" a durable guarantee.',
      },
      {
        decision: 'WireGuard VPN tunnel for all MikroTik REST API access',
        rationale:
          'Exposing the MikroTik REST API on a public port makes the router\'s ' +
          'admin interface internet-accessible. WireGuard runs natively in ' +
          'RouterOS v7 — the magic-command onboarding script creates the ' +
          'interface, registers the peer, and adds a firewall rule that accepts ' +
          'port 80 only from the ZealSync VPN IP. The router is completely ' +
          'dark to the internet. The server pre-generates the WireGuard keypair ' +
          'and embeds the private key in the setup script (served over HTTPS, ' +
          'single-use token, NULLed from the database on confirmation) to ' +
          'achieve one-command setup without manual key exchange.',
      },
      {
        decision: 'Append-only ledger for reseller wallet balances',
        rationale:
          'A mutable wallet_balance column on the users table creates a race ' +
          'condition: two concurrent debits both read the same stale balance ' +
          'and both succeed when only one should. An append-only ' +
          'wallet_transactions table stores every credit and debit with a ' +
          'balance_after column. The current balance is always the balance_after ' +
          'of the most recent row. Concurrent debits are serialised with ' +
          'SELECT ... FOR UPDATE on the latest ledger row — one transaction ' +
          'blocks until the other commits, then reads the updated balance.',
      },
      {
        decision: 'Raw SQL via asyncpg — no ORM',
        rationale:
          'Every query in a financial system must be explicit and auditable. ' +
          'ORMs abstract query behaviour in ways that hide N+1 patterns, ' +
          'unexpected JOINs, and lazy-loading traps. asyncpg with parameterised ' +
          'SQL ($1, $2) gives full query control and direct access to ' +
          'PostgreSQL features (UNIQUE constraints, FOR UPDATE locks, ' +
          'TIMESTAMPTZ, INET, NUMERIC(10,2)) without translation layers.',
      },
      {
        decision: '404 (not 403) for cross-tenant resource access',
        rationale:
          'Every protected endpoint queries with WHERE id = $1 AND tenant_id = $2. ' +
          'If a resource exists but belongs to another tenant, the query returns ' +
          'no rows and the handler raises 404. Returning 403 would confirm the ' +
          'resource exists — enabling UUID enumeration across tenants. ' +
          'Returning 404 leaks nothing: the attacker cannot distinguish ' +
          '"this UUID doesn\'t exist" from "this UUID belongs to someone else."',
      },
      {
        decision: 'Separate super_admins table with mandatory TOTP MFA',
        rationale:
          'Placing a super admin role in the tenant users table requires ' +
          'carve-outs in every tenant-scoped service function. A separate table ' +
          'with no tenant_id column eliminates that complexity entirely. ' +
          'Login is a two-step flow: password check issues a short-lived ' +
          'pre-auth token (5 minutes, single-use); TOTP verification consumes ' +
          'that token and issues a 15-minute access token with no refresh. ' +
          'Impersonation tokens are tenant-scoped JWTs stored in sessionStorage ' +
          '(per-tab, not shared via localStorage) — every API call made under ' +
          'impersonation is audit-logged against the super admin\'s identity.',
      },
      {
        decision: 'TanStack Query keys include tenant_id as explicit dimension',
        rationale:
          'TanStack Query\'s in-memory cache is global within a browser session. ' +
          'Without tenant-scoped cache keys, a super admin impersonation session ' +
          'and the main session share cache entries keyed by [\'payments\', \'list\']. ' +
          'Including tenant_id in every query key (e.g. [\'payments\', \'list\', tenantId]) ' +
          'ensures data from different tenants is never served from the same ' +
          'cache entry. queryClient.clear() on login and logout eliminates ' +
          'residual cache from a previous session.',
      },
    ],

    deploymentTarget: 'Pre-deployment (Oracle Cloud Always Free — ARM VM, Docker Compose)',

    metrics: [
      {
        highlight: '15 PostgreSQL tables',
        description:
          'normalised multi-tenant schema: tenants, users, packages, payments, ' +
          'vouchers, sessions, routers, wallet_transactions, subscriptions, ' +
          'invoices, audit_log, refresh_tokens, radcheck, radreply, radacct',
      },
      {
        highlight: '8 isolation threats closed',
        description:
          'systematic cross-tenant penetration test suite: UUID enumeration, ' +
          'webhook replay, arq job contamination, RADIUS pollution, ' +
          'cache leak, localStorage confusion, error oracle, rate limit bypass',
      },
      {
        highlight: '9-section RouterOS script',
        description:
          'auto-configures WireGuard VPN, API user with least-privilege policy, ' +
          'REST API service, hotspot speed profiles, firewall rules, router ' +
          'identity, confirmation callback, and self-deletion in under 60 seconds',
      },
      {
        highlight: '4 user-facing interfaces',
        description:
          'public SEO-optimised landing page (hotspot + fiber dual positioning), ' +
          'ISP admin portal, reseller self-service portal, customer captive portal ' +
          '— all built on the same React 19 + Tailwind v4 + shadcn/ui stack',
      },
    ],

    stack: [
      'FastAPI',
      'Python 3.12',
      'PostgreSQL 16',
      'asyncpg',
      'arq',
      'Redis',
      'React 19',
      'TypeScript',
      'Tailwind CSS v4',
      'shadcn/ui',
      'TanStack Query',
      'M-Pesa Daraja',
      'Africa\'s Talking',
      'MikroTik RouterOS REST API',
      'WireGuard',
      'FreeRADIUS',
      'KRA eTIMS',
      'Docker',
      'Nginx',
    ],

    liveUrl: 'https://zealsync-isp-billing-system.vercel.app',
    liveLabel: 'Demo',
    codeUrl: null,

    star: {
      situation:
        'Small ISP operators in Nairobi spend 3–4 hours daily reconciling ' +
        'M-Pesa payment alerts against router configurations in Winbox. ' +
        'Resellers — agents who sell WiFi access in shops and cyber cafés — ' +
        'cannot operate without calling the ISP admin for every voucher batch. ' +
        'No affordable local tool provided end-to-end automation without taking ' +
        'a percentage cut of voucher revenue, which operators resented as a tax ' +
        'on their own growth.',

      task:
        'Design and build a production-grade multi-tenant SaaS platform that ' +
        'automates the complete ISP billing lifecycle — from M-Pesa payment ' +
        'collection through MikroTik hotspot and PPPoE provisioning to reseller ' +
        'self-service — while maintaining hard data isolation between ISP tenants ' +
        'and requiring zero manual router configuration from the ISP owner.',

      action:
        'I built the FastAPI modular monolith backend with raw SQL via asyncpg, ' +
        'integrating M-Pesa Daraja STK Push and C2B webhooks with idempotency ' +
        'enforced at the database level via a UNIQUE constraint on the M-Pesa ' +
        'receipt number. MikroTik router provisioning runs in arq background jobs ' +
        '(Redis-backed, durable across restarts) so Daraja webhooks return 200 ' +
        'within the timeout window and provisioning retries automatically if the ' +
        'router is briefly offline. I designed a magic-command onboarding system ' +
        'that generates a per-router RouterOS .rsc script — one paste in the ' +
        'MikroTik terminal configures WireGuard VPN, the API user, speed profiles, ' +
        'and firewall rules in under 60 seconds with no manual steps. ' +
        'Multi-tenancy is enforced at four layers: every SQL query includes ' +
        'tenant_id, every background job carries tenant_id as an explicit ' +
        'parameter, FreeRADIUS authenticates vouchers scoped by NAS-Identifier, ' +
        'and a penetration test suite asserts 404 (never 403) on all ' +
        'cross-tenant UUID access attempts. The React 19 frontend serves a ' +
        'dual-service landing page (hotspot and fiber PPPoE), an ISP admin ' +
        'portal, a reseller wallet and voucher generation portal, and a customer ' +
        'captive portal with real-time payment status polling.',

      result:
        'ZealSync is pre-deployment stage — the complete backend and frontend ' +
        'are built, the multi-tenancy penetration test suite passes, and the ' +
        'full M-Pesa → MikroTik pipeline has been verified end-to-end using ' +
        'Daraja sandbox and MikroTik CHR on VirtualBox. The system supports ' +
        'both hotspot (session vouchers) and PPPoE (monthly subscriptions) — ' +
        'the only locally-built ISP billing tool in the Kenyan market to ' +
        'support both service types on one platform at a flat KES rate with ' +
        'no percentage cut of operator revenue.',
    },

    c4Diagram: `flowchart TD
    %% ── Styles ────────────────────────────────────────────
    classDef user   fill:#161B24,stroke:#00c4b4,stroke-width:1px,color:#00c4b4
    classDef web    fill:#0e0f1f,stroke:#00c4b4,stroke-width:1px,color:#e0e8ff
    classDef api    fill:#00c4b4,stroke:#00c4b4,stroke-width:1px,color:#080912,font-weight:bold
    classDef worker fill:#1a2a2a,stroke:#00c4b4,stroke-width:1px,color:#00c4b4
    classDef db     fill:#080912,stroke:#2C3444,stroke-width:1px,color:#a0a8c0
    classDef ext    fill:#161B24,stroke:#2C3444,stroke-width:1px,stroke-dasharray:5 5,color:#a0a8c0
    classDef infra  fill:#101828,stroke:#2C3444,stroke-width:1px,color:#a0a8c0

    %% ── Actors ────────────────────────────────────────────
    ISP((ISP Admin)):::user
    Customer((Customer)):::user
    SA((Super Admin)):::user

    %% ── Frontend ──────────────────────────────────────────
    FE["React 19 Frontend
    Admin · Reseller · Customer · SA Portals"]:::web

    %% ── Backend ───────────────────────────────────────────
    API["FastAPI — Modular Monolith
    auth · packages · payments · vouchers
    wallets · subscriptions · routers · setup"]:::api

    Worker["arq Worker
    Voucher provisioning
    Subscription renewal · Reconciliation cron"]:::worker

    %% ── Data layer ────────────────────────────────────────
    PG[("PostgreSQL 16
    15 tables · tenant-scoped")]:::db
    Redis[("Redis
    arq job queue · Rate limiting")]:::db
    RADIUS[("FreeRADIUS
    rlm_sql · NAS-ID tenant scope")]:::db

    %% ── External services ─────────────────────────────────
    Daraja["Safaricom Daraja API
    STK Push · C2B Webhooks"]:::ext
    AT["Africa's Talking
    SMS — vouchers + dunning"]:::ext
    eTIMS["KRA eTIMS API
    Tax invoice compliance"]:::ext

    %% ── Network infra ─────────────────────────────────────
    WG["WireGuard VPN
    wg0 — 10.8.0.0/24"]:::infra
    MT["MikroTik RouterOS v7
    Hotspot · PPPoE · REST API"]:::infra

    %% ── Flows ─────────────────────────────────────────────
    ISP -->|Manage packages, customers, routers| FE
    Customer -->|Buy WiFi · View vouchers| FE
    SA -->|TOTP MFA · Impersonate tenant| FE
    FE -->|HTTPS + JWT| API

    API -->|Read / Write| PG
    API -->|Enqueue jobs| Redis
    API -->|STK Push initiation| Daraja
    Daraja -->|Webhook callback| API
    API -->|Trigger SMS| AT
    API -->|Submit invoice| eTIMS

    Worker -->|Consume jobs| Redis
    Worker -->|Read / Write| PG
    Worker -->|Hotspot user · PPPoE secret| WG
    WG -->|Encrypted REST API| MT
    MT -->|RADIUS auth| RADIUS
    RADIUS -->|Tenant-scoped lookup| PG`,
  },
  {
    id: 'kukufiti',
    name: 'KukuFiti',
    tagline: 'Production FastAPI backend for Kenyan poultry farmers.',
    tags: [
      { label: '● Live', variant: 'live' },
      { label: 'Agritech', variant: 'default' },
      { label: 'FastAPI', variant: 'default' },
      { label: 'PostgreSQL', variant: 'default' },
    ],
    problem:
      'Broiler farmers lacked data-driven tools to track Feed Conversion Ratio (FCR) and mortality rates, leading to inefficient resource allocation and undetected disease vectors.',
    architectureOverview:
      'Modular monolith built with FastAPI and PostgreSQL. Business logic is organized into domain modules (flock, health, finance) sharing a single database. Raw SQL via asyncpg for performance-critical aggregations. Numbered migrations for schema versioning. Deployed on Render.',
    engineeringDecisions: [
      {
        decision: 'Raw SQL over ORM for analytics queries',
        rationale:
          'CTEs and window functions for FCR aggregation are cleaner and measurably faster than ORM-generated SQL. asyncpg handles connection pooling.',
      },
      {
        decision: 'Modular monolith over microservices',
        rationale:
          'Single deployment target, shared database transactions, and simpler local development. The domain is well-understood enough to draw clean module boundaries without needing inter-service coordination.',
      },
      {
        decision: 'Database-level constraints for business rules',
        rationale:
          'Mortality percentages, FCR values, and flock state transitions are enforced via PostgreSQL CHECK constraints and triggers, not just application-layer validation.',
      },
      {
        decision: 'Numbered SQL migrations (not Alembic)',
        rationale:
          'Explicit, reviewable migration files with clear ordering. No ORM abstraction over schema changes means no surprise diffs.',
      },
    ],
    deploymentTarget: 'Render (PaaS)',
    metrics: [
      { highlight: 'Zero invalid states', description: 'enforced via DB constraints' },
      { highlight: '<30ms', description: 'aggregation query latency' },
      { highlight: '12 tables', description: 'fully normalized architecture' },
      { highlight: '18 foreign keys', description: 'strict referential integrity' },
    ],
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'asyncpg', 'Raw SQL', 'Docker', 'Render'],
    liveUrl: 'https://kukufiti.vercel.app/',
    liveLabel: 'Live App',
    codeUrl: 'https://github.com/fredricknyangau/broiler_management_app_backend',
    star: {
      situation:
        'Broiler farmers in Kenya were relying on manual notebook tracking for critical metrics. This lack of digitization made it impossible to calculate FCR in real-time or detect disease patterns early enough to take action.',
      task: 'Engineer a robust backend system capable of maintaining absolute data integrity for thousands of records while providing real-time analytics on flock performance.',
      action:
        'I architected the system using Python and FastAPI. I implemented complex SQL reporting using CTEs and window functions in PostgreSQL. To ensure data reliability, I utilized triggers for automatic FCR calculation and enforced strict business logic at the database level with constraints.',
      result:
        'The platform eliminates invalid mortality states and provides sub-30ms performance on complex aggregations, enabling farmers to make faster, data-backed decisions for their flocks.',
    },
    c4Diagram: `flowchart TD
  %% Styles
  classDef user fill:#161B24,stroke:#10b981,stroke-width:1px,color:#10b981
  classDef sys fill:#10b981,stroke:#10b981,stroke-width:1px,color:#080A0D,font-weight:bold
  classDef db fill:#080A0D,stroke:#2C3444,stroke-width:1px,color:#9A9590

  Farmer((Farmer)):::user
  API["Kukufiti API (FastAPI)"]:::sys
  DB[("PostgreSQL (Flock Records)")]:::db

  Farmer -->|Submits flock data| API
  API -->|Analytics & FCR| DB
  DB --> API`,
  },
];
