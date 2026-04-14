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

  const title = `${project.name} — Case Study`;
  const desc = project.problem.replace(/"/g, '&quot;');

  let html = template
    .replace(/<title>.*?<\/title>/g, `<title>${title}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/g, `<meta name="description" content="${desc}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/g, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/g, `<meta property="og:description" content="${desc}" />`)
    .replace(/<meta name="twitter:title" content=".*?" \/>/g, `<meta name="twitter:title" content="${title}" />`)
    .replace(/<meta name="twitter:description" content=".*?" \/>/g, `<meta name="twitter:description" content="${desc}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/g, `<meta property="og:url" content="https://fredricknyangau.vercel.app/case-study/${project.id}" />`);

  fs.writeFileSync(path.resolve(projDir, 'index.html'), html, 'utf-8');
  console.log(`Prerendered: /case-study/${project.id}/index.html`);
}

console.log("Prerendering SEO headers complete.");
