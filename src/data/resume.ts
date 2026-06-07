import { projects } from './projects';
import { experienceItems } from './experience';

export const resumeData = {
  header: {
    name: "FREDRICK NYANG'AU",
    title: "Junior Backend Engineer | Python · FastAPI · PostgreSQL · Docker | Fintech and Agritech APIs",
    location: "Nairobi, Kenya",
    phone: "+254 746 730 585",
    email: "nyangaufredrick443@gmail.com",
    website: "fredricknyangau.vercel.app",
    github: "github.com/fredricknyangau",
    linkedin: "linkedin.com/in/fredricknyangau"
  },
  profile: "Junior Backend Engineer with a BSc in Information Technology (Kabarak University, Dec 2025), building production-deployed REST APIs for the East African market. KukuFiti, my flagship agritech project, is live on Render with three production modules and full Swagger documentation. I focus on the backend layer: PostgreSQL schema design, raw SQL via asyncpg, JWT and OAuth2 authentication, and modular FastAPI architecture. My work targets the problems that matter in Kenya: M-Pesa payment flows, ISP billing automation, and farm management systems built for real production conditions. Open to Junior Backend Engineering roles in Nairobi, remote-first teams, and freelance backend contracts in Fintech and Agritech.",
  skills: [
    { category: "Languages", items: "Python 3.12 (primary), SQL, JavaScript" },
    { category: "Frameworks", items: "FastAPI (async-first, high-performance REST APIs)" },
    { category: "Databases", items: "PostgreSQL 16, asyncpg, raw SQL, schema design, indexing, query optimization" },
    { category: "Auth", items: "JWT, OAuth2 scopes, RBAC, bcrypt, REST API security patterns" },
    { category: "Caching", items: "Redis: rate limiting, per-tenant isolation, session management" },
    { category: "Infrastructure", items: "Docker, Nginx, Ubuntu 24.04 LTS, systemd, SSH, UFW" },
    { category: "DevOps", items: "Git, GitHub, Render deployments, environment-based configuration" },
    { category: "API & Testing", items: "Pydantic, pytest, Postman, OpenAPI, Swagger" },
    { category: "Integrations", items: "M-Pesa Daraja API (STK push, C2B, webhooks), Africa's Talking SMS" },
    { category: "Mobile", items: "Flutter, Dart, Android app development (secondary)" }
  ],
  education: {
    degree: "BSc Information Technology",
    institution: "Kabarak University",
    date: "Sep 2021 \u2013 Dec 2025",
    location: "Nakuru, Kenya",
    honors: "Second Class Honours (Lower Division) | Certificate No: BScIT 2025/0000070",
    coursework: "Relevant coursework: Distributed Systems, Data Structures and Algorithms, Software Engineering, Database Management Systems, Computer Networks, Mobile Applications Programming"
  },
  references: "Available on request. Professional: Huduma Kenya, Nakuru Supervisor. Academic: Kabarak University Lecturer.",
  projects: projects,
  experience: experienceItems
};
