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
  codeUrl: string;
  /** Custom label for the live button. Defaults to "Live App". */
  liveLabel?: string;
  featured?: boolean;
  star?: STAR;
  c4Diagram?: string;
}

export const projects: Project[] = [
  {
    id: 'kukufiti',
    name: 'KukuFiti',
    tagline: 'Production FastAPI backend for Kenyan poultry farmers.',
    featured: true,
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
  {
    id: 'wifi-billing',
    name: 'Wi-Fi Billing System',
    tagline: 'Multi-tenant ISP billing backend with MikroTik RouterOS integration.',
    tags: [
      { label: 'Production', variant: 'live' },
      { label: 'Networking', variant: 'default' },
      { label: 'FastAPI', variant: 'default' },
    ],
    problem:
      'Small ISP operators were managing voucher lifecycles manually, with no automated session control tied directly to their MikroTik hardware.',
    architectureOverview:
      'FastAPI backend integrating with MikroTik RouterOS via its API protocol. Multi-tenant schema with per-tenant user isolation. OAuth2 for operator authentication with RBAC for admin vs. reseller roles. Automated voucher generation with cryptographic IDs. Dockerized with multi-stage builds.',
    engineeringDecisions: [
      {
        decision: 'State-machine voucher lifecycle in PostgreSQL',
        rationale:
          'Voucher transitions (created, activated, expired, revoked) are enforced at the database constraint level. Invalid transitions are rejected before reaching application logic.',
      },
      {
        decision: 'MikroTik API integration over SNMP',
        rationale:
          'RouterOS API provides session-level control (add/remove users, expire sessions) that SNMP monitoring alone cannot. Direct API integration enables real-time session provisioning.',
      },
      {
        decision: 'OAuth2 with RBAC for multi-tenant operators',
        rationale:
          'Different operators need different permission scopes. OAuth2 bearer tokens with role claims allow a single auth layer to serve admin, reseller, and end-user flows.',
      },
      {
        decision: 'Docker multi-stage build',
        rationale:
          'Keeps the production image lean. Build dependencies stay in the builder stage. Systemd manages the container lifecycle on the host.',
      },
    ],
    deploymentTarget: 'Private (Docker + Systemd)',
    metrics: [
      { highlight: '99.2% uptime', description: 'over 3 months in production' },
      { highlight: 'Cryptographic IDs', description: 'tamper-proof voucher generation' },
      { highlight: '8 tables', description: 'normalized multi-tenant ISP schema' },
      { highlight: 'OAuth2 + RBAC', description: 'role-based access control' },
    ],
    stack: ['FastAPI', 'PostgreSQL', 'OAuth2', 'RBAC', 'MikroTik API', 'Docker', 'Systemd'],
    liveUrl: null,
    codeUrl: 'https://github.com/fredricknyangau/wifi-billing',
    star: {
      situation:
        'Local ISP providers required a way to automate the lifecycle of Wi-Fi vouchers - creation, activation, and expiration - without manual intervention on the router level.',
      task: 'Bridge the gap between a billing web interface and MikroTik RouterOS hardware to manage user sessions dynamically and securely.',
      action:
        'I developed a RESTful API using FastAPI that integrates directly with MikroTik RouterOS for session control. I implemented a state-machine-based voucher lifecycle and used PostgreSQL constraints to prevent unauthorized state transitions. The deployment was hardened using Docker and systemd for process management.',
      result:
        'The system has maintained 99.2% uptime in a production environment, automating thousands of vouchers and providing a seamless self-service experience for end-users.',
    },
    c4Diagram: `flowchart TD
  %% Styles
  classDef user fill:#161B24,stroke:#10b981,stroke-width:1px,color:#10b981
  classDef sys fill:#10b981,stroke:#10b981,stroke-width:1px,color:#080A0D,font-weight:bold
  classDef db fill:#080A0D,stroke:#2C3444,stroke-width:1px,color:#9A9590
  classDef ext fill:#161B24,stroke:#2C3444,stroke-width:1px,stroke-dasharray: 5 5,color:#9A9590

  User((Wi-Fi User)):::user
  API["Billing API (FastAPI)"]:::sys
  DB[("PostgreSQL (Voucher State)")]:::db
  MikroTik[["MikroTik RouterOS"]]:::ext

  User -->|Purchases/activates voucher| API
  API -->|Validates/Updates| DB
  API -.->|Provisions session| MikroTik`,
  },
  {
    id: 'mmgateway',
    name: 'Mobile Money Gateway',
    tagline: 'Payment infrastructure with webhook reliability and tenant isolation.',
    tags: [
      { label: '● Live', variant: 'live' },
      { label: 'Fintech', variant: 'default' },
      { label: 'FastAPI', variant: 'default' },
    ],
    problem:
      'Small businesses integrating mobile money APIs face undocumented edge cases, webhook failures, and no unified retry logic - resulting in dropped transactions and inconsistent payment states.',
    architectureOverview:
      'FastAPI proxy layer sitting between merchant backends and Safaricom Daraja. Redis handles per-tenant rate limiting and idempotency key storage. PostgreSQL with Row-Level Security enforces tenant isolation at the data layer. Exponential backoff webhook retry queue ensures delivery guarantees.',
    engineeringDecisions: [
      {
        decision: 'Redis for rate limiting over database counters',
        rationale:
          'Redis atomic INCR + TTL operations handle 1,000 req/min/tenant with microsecond overhead. Database-backed counters would introduce lock contention at this throughput.',
      },
      {
        decision: 'PostgreSQL Row-Level Security for tenant isolation',
        rationale:
          'RLS policies enforce isolation at the database layer, not just application logic. Even if application code has a tenant-scoping bug, the database will reject cross-tenant queries.',
      },
      {
        decision: 'Exponential backoff with idempotency keys for webhooks',
        rationale:
          'Safaricom callbacks are not guaranteed to arrive once. Idempotency keys prevent double-processing; exponential backoff prevents hammering downstream systems during outages.',
      },
    ],
    deploymentTarget: 'Railway (Staging)',
    metrics: [
      { highlight: '99.2% retention', description: 'webhook delivery with exponential backoff' },
      { highlight: 'RLS isolation', description: 'per-tenant data scoping at DB layer' },
      { highlight: '1,000 req/min', description: 'per-tenant rate limiting via Redis' },
      { highlight: 'Full audit trail', description: 'transaction idempotency enforced' },
    ],
    stack: ['FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Nginx', 'M-Pesa Daraja'],
    liveUrl: null,
    codeUrl: 'https://github.com/fredricknyangau/mmgateway',
    star: {
      situation:
        'Integrating mobile money APIs like Safaricom Daraja is complex for local merchants, often leading to dropped webhooks and inconsistent terminal states.',
      task: 'Build a multi-tenant gateway that normalizes error codes, ensures webhook delivery, and protects backend infrastructure.',
      action:
        'I engineered the proxy layer using FastAPI and Redis for high-frequency rate-limiting. I implemented an exponential backoff retry mechanism for webhooks and strictly enforced tenant isolation using Postgres RLS.',
      result:
        'The system abstracts complex cryptographic requirements and guarantees transaction consistency, accelerating time-to-market for merchant integrations.',
    },
    c4Diagram: `flowchart TD
  %% Styles
  classDef user fill:#161B24,stroke:#10b981,stroke-width:1px,color:#10b981
  classDef sys fill:#10b981,stroke:#10b981,stroke-width:1px,color:#080A0D,font-weight:bold
  classDef cache fill:#080A0D,stroke:#2C3444,stroke-width:1px,color:#9A9590
  classDef db fill:#080A0D,stroke:#2C3444,stroke-width:1px,color:#9A9590
  classDef ext fill:#161B24,stroke:#2C3444,stroke-width:1px,stroke-dasharray: 5 5,color:#9A9590

  Merchant((Third-Party Merchant)):::user
  GW["API Gateway (FastAPI Proxy)"]:::sys
  Redis[("Redis (Rate Limits)")]:::cache
  DB[("PostgreSQL (RLS Tenant Data)")]:::db
  Safaricom[["Safaricom Daraja API"]]:::ext

  Merchant -->|Triggers payment| GW
  GW -->|Check limits| Redis
  GW -->|Check tenant| DB
  GW -.->|Signed payload| Safaricom
  Safaricom -.->|Async Webhook| GW
  GW -->|Normalized webhook| Merchant`,
  },
];
