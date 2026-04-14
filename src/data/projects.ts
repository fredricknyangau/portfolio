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

export interface Project {
  id: string;
  name: string;
  tags: { label: string; variant: 'live' | 'wip' | 'default' }[];
  problem: string;
  metrics: Metric[];
  stack: string[];
  /** null = no live demo available — hides the live button */
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
    name: 'Kukufiti Broiler Management',
    featured: true,
    tags: [
      { label: '● Live', variant: 'live' },
      { label: 'Agritech', variant: 'default' },
      { label: 'FastAPI', variant: 'default' },
      { label: 'PostgreSQL', variant: 'default' },
    ],
    problem:
      'Broiler farmers lacked data-driven tools to track Feed Conversion Ratio (FCR) and mortality rates, leading to inefficient resource allocation and undetected disease vectors.',
    metrics: [
      { highlight: 'Zero invalid states', description: 'enforced via DB constraints' },
      { highlight: '<30ms', description: 'aggregation query latency' },
      { highlight: '12 tables', description: 'fully normalized architecture' },
      { highlight: '18 foreign keys', description: 'strict data integrity' },
    ],
    stack: ['Python', 'PostgreSQL', 'FastAPI', 'Advanced SQL', 'Data Modeling'],
    liveUrl: 'https://kukufiti.vercel.app/',
    liveLabel: 'Live App',
    codeUrl: 'https://github.com/fredricknyangau/broiler_management_app_backend',
    star: {
      situation: 'Broiler farmers in Kenya were relying on manual notebook tracking for critical metrics. This lack of digitization made it impossible to calculate FCR in real-time or detect disease patterns early enough to take action.',
      task: 'Engineer a robust backend system capable of maintaining absolute data integrity for thousands of records while providing real-time analytics on flock performance.',
      action: 'I architected the system using Python and FastAPI. I implemented complex SQL reporting using CTEs and window functions in PostgreSQL. To ensure data reliability, I utilized triggers for automatic FCR calculation and enforced strict business logic at the database level with constraints.',
      result: 'The platform successfully eliminates invalid mortality states and provides sub-30ms performance on complex aggregations, enabling farmers to make faster, data-backed decisions for their flocks.',
    },
    c4Diagram: `C4Context
  title System Context - Kukufiti Broiler Management
  Person(farmer, "Farmer", "A broiler farmer who tracks flock metrics")
  System(kukufiti, "Kukufiti API", "FastAPI backend managing flock records, calculating FCR")
  SystemDb(db, "PostgreSQL", "Stores highly normalized flock data and aggregations")
  
  Rel(farmer, kukufiti, "Submits daily mortality & feed data")
  Rel(kukufiti, db, "Reads/Writes records, runs analytics")`,
  },
  {
    id: 'wifi-billing',
    name: 'Wi-Fi Billing & MikroTik Integration',
    tags: [
      { label: 'Production', variant: 'live' },
      { label: 'ISP', variant: 'default' },
      { label: 'Networking', variant: 'default' },
    ],
    problem:
      'Small ISP operators struggle with manual voucher management and lack automated session control integrated directly with their MikroTik hardware.',
    metrics: [
      { highlight: '99.2% uptime', description: 'over 3 months of production' },
      { highlight: 'Secure generation', description: 'cryptographic voucher IDs' },
      { highlight: '8 tables', description: 'normalized ISP schema' },
      { highlight: 'Dockerized', description: 'multi-stage production builds' },
    ],
    stack: ['FastAPI', 'PostgreSQL', 'MikroTik API', 'Docker', 'Systemd'],
    liveUrl: null, // Private deployment — no public demo
    codeUrl: 'https://github.com/fredricknyangau/wifi-billing',
    star: {
      situation: 'Local ISP providers required a way to automate the lifecycle of Wi-Fi vouchers—creation, activation, and expiration—without manual intervention on the router level.',
      task: 'Bridge the gap between a billing web interface and MikroTik RouterOS hardware to manage user sessions dynamically and securely.',
      action: 'I developed a RESTful API using FastAPI that integrates directly with MikroTik RouterOS for session control. I implemented a state-machine based voucher lifecycle and used PostgreSQL constraints to prevent unauthorized state transitions. The deployment was hardened using Docker and systemd for process management.',
      result: 'The system has maintained a 99.2% uptime in a production environment, automating thousands of vouchers and providing a seamless self-service experience for end-users.',
    },
    c4Diagram: `C4Context
  title System Context - Wi-Fi Billing & Session Control
  Person(customer, "Wi-Fi User", "A user purchasing internet access")
  System(billing, "Billing API", "FastAPI app managing vouchers & plans")
  SystemDb(db, "PostgreSQL", "Stores vouchers & session state")
  System_Ext(mikrotik, "MikroTik RouterOS", "Hardware executing firewall & session rules")
  
  Rel(customer, billing, "Purchases/activates voucher")
  Rel(billing, db, "Validates and updates voucher state")
  Rel(billing, mikrotik, "Provisions dynamic session limits via API")`,
  },
  {
    id: 'mmgateway',
    name: 'Mobile Money Gateway',
    tags: [
      { label: '● Live', variant: 'live' },
      { label: 'Fintech', variant: 'default' },
      { label: 'API Gateway', variant: 'default' },
    ],
    problem:
      'Small businesses integrating mobile money APIs face undocumented edge cases, webhook failures, and no unified retry logic.',
    metrics: [
      { highlight: '99.2% retention', description: 'with exponential backoff' },
      { highlight: 'Multi-tenant', description: 'isolated per-client scoping' },
      { highlight: 'Rate limiting', description: '1000 req/min/tenant' },
      { highlight: 'Audit trail', description: 'full transaction idempotency' },
    ],
    stack: ['FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Nginx'],
    liveUrl: null, // Staging environment — available on request
    codeUrl: 'https://github.com/fredricknyangau/mmgateway',
    star: {
      situation: 'Integrating mobile money APIs like Safaricom Daraja is complex for local merchants, often leading to dropped webhooks and inconsistent terminal states.',
      task: 'Build a multi-tenant gateway that normalizes error codes, ensures webhook delivery, and protects backend infrastructure.',
      action: 'I engineered the proxy layer using FastAPI and Redis for high-frequency rate-limiting. I implemented an exponential backoff retry mechanism for webhooks and strictly enforced tenant isolation using Postgres RLS.',
      result: 'The system successfully abstracts complex cryptographic requirements and guarantees transaction consistency, significantly accelerating time-to-market for merchant integrations.',
    },
    c4Diagram: `C4Context
  title System Context - Mobile Money Gateway
  Person(merchant, "Merchant System", "Third-party system requiring payment processing")
  System(gateway, "API Gateway", "FastAPI proxy normalizing errors & scoping tenants")
  SystemDb(redis, "Redis", "High-frequency rate-limiting")
  SystemDb(db, "PostgreSQL", "Stores tenant routes & idempotency keys")
  System_Ext(safaricom, "Safaricom Daraja", "External API for mobile payments")
  
  Rel(merchant, gateway, "Initiates payment")
  Rel(gateway, redis, "Checks rate limits")
  Rel(gateway, db, "Verifies tenant context")
  Rel(gateway, safaricom, "Proxies signed payload")
  Rel(safaricom, gateway, "Async Webhook Delivery")
  Rel(gateway, merchant, "Forwards normalized webhook")`,
  },
];
