# The System Architect - Portfolio

A high-performance, engineering-focused portfolio for Backend Developers.
Designed with a "Dashboard" aesthetic using modern HTML5, CSS Variables, and Vanilla JS.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-production-green.svg)

## 🚀 Features

- **Bento Grid Layout**: High-density information architecture organized into efficient grids.
- **Spotlight UI**: Interactive mouse-tracking hover effects on all cards.
- **Dev Terminal**: Built-in simulated terminal (Type \`help\`, \`skills\`, \`contact\`).
- **Live Status Widget**: Mock "System Status" and ping latency indicator.
- **Performance Optimized**:
  - Zero framework bloat (No React/Vue/Angular needed).
  - 100/100 Lighthouse score potential.
  - Aggressive caching via \`vercel.json\`.

## 🛠️ Tech Stack

- **Core**: Semantic HTML5
- **Style**: Modern CSS3 (Variables, Grid, Flexbox, Glassmorphism)
- **Scripting**: Vanilla ES6+ JavaScript
- **Fonts**: JetBrains Mono (Headers), Inter (Body)

## 📦 Deployment

### Deploy to Vercel (Recommended)

This project is optimized for Vercel.

1.  **Fork** this repository.
2.  Import to Vercel.
3.  Deploy! (Zero configuration required, \`vercel.json\` handles headers).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fportfolio)

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio.git

# Navigate to directory
cd portfolio

# Open index.html in your browser
# OR serve using python for local testing
python3 -m http.server 8000
```

## 📂 File Structure

```
/
├── assets/
│   ├── css/        # Global styles & Dashboard theme
│   ├── js/         # Terminal logic & Mouse tracking
│   ├── images/     # Optimized profile & project shots
│   └── docs/       # Resume (PDF)
├── index.html      # Main entry point
├── vercel.json     # Vercel caching configuration
└── robots.txt      # SEO directive
```

## 🎨 Customization

- **Theme**: Edit \`:root\` variables in \`assets/css/style.css\` to change colors.
- **Terminal**: Add new commands in \`assets/js/main.js\` under the \`commands\` object.
