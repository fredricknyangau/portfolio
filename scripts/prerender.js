import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projects = [
  {
    id: 'kukufiti',
    name: 'Kukufiti Broiler Management',
    problem: 'Broiler farmers lacked data-driven tools to track Feed Conversion Ratio (FCR) and mortality rates, leading to inefficient resource allocation and undetected disease vectors.'
  },
  {
    id: 'wifi-billing',
    name: 'Wi-Fi Billing & MikroTik Integration',
    problem: 'Small ISP operators struggle with manual voucher management and lack automated session control integrated directly with their MikroTik hardware.'
  },
  {
    id: 'mmgateway',
    name: 'Mobile Money Gateway',
    problem: 'Small businesses integrating mobile money APIs face undocumented edge cases, webhook failures, and no unified retry logic.'
  }
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

for (const project of projects) {
  const projDir = path.resolve(caseStudyDir, project.id);
  if (!fs.existsSync(projDir)) {
    fs.mkdirSync(projDir, { recursive: true });
  }

  const title = `${project.name} - Case Study`;
  const desc = project.problem.replace(/"/g, '&quot;');

  const projectFallback = `
      <!-- SEO Fallback Start -->
      <div class="seo-fallback" style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0;">
        <h1>${project.name} - Engineering Case Study</h1>
        <p><strong>Problem Statement:</strong> ${project.problem}</p>
        <h2>Project Overview</h2>
        <p>This page features a detailed engineering case study for ${project.name}, a backend application developed by Fredrick Nyang'au. Fredrick is a Junior Backend Engineer based in Nairobi, Kenya, specializing in FastAPI, Python, and PostgreSQL systems for Fintech and Agritech industries.</p>
        <h3>Engineering Decisions & Highlights</h3>
        <ul>
          <li>High performance database schema design and constraints.</li>
          <li>Optimized APIs built with FastAPI, verified by automated testing.</li>
          <li>Robust containerized deployment configurations with Docker.</li>
        </ul>
        <nav>
          <p>Explore other projects: 
            <a href="/case-study/kukufiti">KukuFiti poultry analytics backend</a>, 
            <a href="/case-study/wifi-billing">Wi-Fi Billing RouterOS backend</a>, 
            <a href="/case-study/mmgateway">Mobile Money Gateway proxy</a>.
          </p>
          <p>Or return to the main portfolio of <a href="/">Fredrick Nyang'au</a>.</p>
        </nav>
      </div>
      <!-- SEO Fallback End -->`;

  let html = template
    .replace(/<!-- SEO Fallback Start -->[\s\S]*?<!-- SEO Fallback End -->/g, projectFallback)
    .replace(/<title>[\s\S]*?<\/title>/gi, `<title>${title}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/gi, `<meta name="description" content="${desc}" />`)
    .replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/gi, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/gi, `<meta property="og:description" content="${desc}" />`)
    .replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/gi, `<meta name="twitter:title" content="${title}" />`)
    .replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/gi, `<meta name="twitter:description" content="${desc}" />`)
    .replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/gi, `<meta property="og:url" content="https://fredricknyangau.vercel.app/case-study/${project.id}" />`)
    .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/gi, `<link rel="canonical" href="https://fredricknyangau.vercel.app/case-study/${project.id}" />`);

  fs.writeFileSync(path.resolve(projDir, 'index.html'), html, 'utf-8');
  console.log(`Prerendered: /case-study/${project.id}/index.html`);
}

console.log("Prerendering SEO headers complete.");
