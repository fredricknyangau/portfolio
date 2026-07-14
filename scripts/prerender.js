import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Keep in sync with src/data/projects.ts — only projects that have a `star` field
// (and therefore a real case study page) should be listed here.
const projects = [
  {
    id: 'kukufiti',
    name: 'KukuFiti',
    tagline: 'Production FastAPI backend for Kenyan poultry farmers.',
    problem:
      'Broiler farmers lacked data-driven tools to track Feed Conversion Ratio (FCR) and mortality rates, leading to inefficient resource allocation and undetected disease vectors.',
    decisions: [
      'Raw SQL via asyncpg for sub-30ms FCR aggregation using CTEs and window functions.',
      'Database-level CHECK constraints and triggers enforce zero invalid mortality states.',
      'Numbered SQL migrations for explicit, reviewable schema versioning.',
      'Modular monolith with clean domain boundaries (flock, health, finance).',
    ],
  },
  {
    id: 'zealsync-zealsync-wifi-billing',
    name: 'ZealSync — WiFi & Fiber ISP Billing Platform',
    tagline: 'Multi-tenant SaaS billing platform for Kenyan ISPs.',
    problem:
      'Small ISP operators in Kenya manage WiFi billing entirely by hand: reconciling M-Pesa SMS alerts against an Excel sheet, manually enabling PPPoE secrets and hotspot accounts in Winbox, and physically collecting cash from resellers. This consumes 3-4 hours per day per operator and causes revenue leakage, delayed activations, and reseller disputes.',
    decisions: [
      'UNIQUE constraint on mpesa_receipt_number enforces idempotency at the database layer, preventing double-provisioning under concurrent webhook delivery.',
      'arq background jobs (Redis-backed) decouple Daraja webhook acknowledgement from MikroTik provisioning — the webhook always returns 200 within the timeout window.',
      'WireGuard VPN tunnel keeps the MikroTik REST API completely off the public internet.',
      'Append-only wallet_transactions ledger with SELECT FOR UPDATE serialises concurrent reseller debits.',
    ],
  },
];

const distDir = path.resolve(__dirname, '../dist');
const caseStudyDir = path.resolve(distDir, 'case-study');

// Only run if dist/index.html exists
const indexPath = path.resolve(distDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error("No dist/index.html found. Run 'npm run build' first.");
  process.exit(1);
}

const template = fs.readFileSync(indexPath, 'utf-8');

if (!fs.existsSync(caseStudyDir)) {
  fs.mkdirSync(caseStudyDir, { recursive: true });
}

const allProjectLinks = projects
  .map((p) => `<a href="/case-study/${p.id}">${p.name}</a>`)
  .join(', ');

for (const project of projects) {
  const projDir = path.resolve(caseStudyDir, project.id);
  if (!fs.existsSync(projDir)) {
    fs.mkdirSync(projDir, { recursive: true });
  }

  const title = `${project.name} - Case Study · Fredrick Nyang'au`;
  const desc = project.problem.replace(/"/g, '&quot;').slice(0, 160);

  const decisionItems = project.decisions
    .map((d) => `<li>${d}</li>`)
    .join('\n          ');

  const projectFallback = `
      <!-- SEO Fallback Start -->
      <div class="seo-fallback" style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0;">
        <h1>${project.name} - Engineering Case Study</h1>
        <p><strong>Tagline:</strong> ${project.tagline}</p>
        <p><strong>Problem:</strong> ${project.problem}</p>
        <h2>Key Engineering Decisions</h2>
        <ul>
          ${decisionItems}
        </ul>
        <p>Case study by Fredrick Nyang'au — Backend Engineer based in Nairobi, Kenya, open to remote roles worldwide. Specialises in FastAPI, PostgreSQL, and M-Pesa Daraja integrations.</p>
        <nav>
          <p>Other case studies: ${allProjectLinks}</p>
          <p>Return to <a href="/">Fredrick Nyang'au's portfolio</a>.</p>
        </nav>
      </div>
      <!-- SEO Fallback End -->`;

  let html = template
    .replace(/<!-- SEO Fallback Start -->[\s\S]*?<!-- SEO Fallback End -->/g, projectFallback)
    .replace(/<title>[\s\S]*?<\/title>/gi, `<title>${title}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/gi,
      `<meta name="description" content="${desc}" />`
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/gi,
      `<meta property="og:title" content="${title}" />`
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/gi,
      `<meta property="og:description" content="${desc}" />`
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/gi,
      `<meta name="twitter:title" content="${title}" />`
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/gi,
      `<meta name="twitter:description" content="${desc}" />`
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/gi,
      `<meta property="og:url" content="https://fredricknyangau.vercel.app/case-study/${project.id}" />`
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/gi,
      `<link rel="canonical" href="https://fredricknyangau.vercel.app/case-study/${project.id}" />`
    );

  fs.writeFileSync(path.resolve(projDir, 'index.html'), html, 'utf-8');
  console.log(`Prerendered: /case-study/${project.id}/index.html`);
}

console.log('Prerendering SEO headers complete.');
