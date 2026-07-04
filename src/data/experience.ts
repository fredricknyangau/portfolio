export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  org: string;
  location: string;
  type: 'work' | 'project' | 'education';
  active?: boolean;
  bullets: string[];
}

export const experienceItems: ExperienceItem[] = [
  {
    id: 'kukufiti-project',
    period: '2025 - Present',
    role: 'Backend Engineer',
    org: 'KukuFiti (Self-directed)',
    location: 'Nairobi, Kenya',
    type: 'project',
    active: true,
    bullets: [
      'Built production FastAPI backend deployed on Render serving real agritech users.',
      'Designed **12-table PostgreSQL schema** with 18 foreign keys and **zero invalid states** enforced at the database layer.',
      'Implemented raw SQL analytics using CTEs and window functions achieving **sub-30ms aggregation latency**.',
      'Integrated M-Pesa finance tracking and disease warning workflow logic.',
      'Applied numbered migrations for reproducible schema versioning across environments.',
    ],
  },
  {
    id: 'zealsync-zealsync-wifi-billing',
    period: '2025',
    role: 'Backend Engineer',
    org: 'ZealSync — WiFi & Fiber ISP Billing Platform (Self-directed)',
    location: 'Nairobi, Kenya',
    type: 'project',
    bullets: [
      'Designed multi-tenant ISP billing backend with **MikroTik RouterOS integration** for real-time session control.',
      'Implemented **OAuth2 authentication with RBAC** covering admin, reseller, and end-user permission scopes.',
      'Built cryptographic voucher generation system; system maintained **99.2% uptime** over 3 months in production.',
      'Containerized with Docker multi-stage builds; process managed via systemd on the host.',
    ],
  },
  {
    id: 'huduma-centre',
    period: 'Jan 2025 - Apr 2025',
    role: 'ICT Intern',
    org: 'Huduma Centre Nakuru',
    location: 'Nakuru, Kenya',
    type: 'work',
    bullets: [
      'Supported digital service delivery operations at a **high-volume public sector office**.',
      'Maintained and troubleshot networked systems and ICT infrastructure.',
      'Gained direct exposure to government-grade data handling and record-keeping requirements.',
    ],
  },
  {
    id: 'kabarak',
    period: 'Sep 2021 - Dec 2025',
    role: 'BSc Information Technology',
    org: 'Kabarak University',
    location: 'Nakuru, Kenya',
    type: 'education',
    bullets: [
      'Practical focus: industrial attachment, capstone project, mobile development.',
      'Capstone project applied database design and API development skills in a real use case.',
    ],
  },
];
