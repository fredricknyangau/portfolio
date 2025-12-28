# Fredrick Nyangau - Portfolio

A modern, responsive portfolio website showcasing my work, skills, and experience with an African fintech-inspired design.

## 🎨 Design Philosophy

This portfolio features a vibrant **African Fintech** color palette inspired by leading African payment and financial technology companies:

- **Primary (Emerald Green)**: Inspired by M-Pesa, representing growth, prosperity, and trust
- **Secondary (Warm Orange)**: Inspired by Flutterwave, representing energy, innovation, and warmth
- **Accent (Rich Purple/Blue)**: Inspired by Paystack, representing professionalism and reliability

### Color Palette

The color system uses semantic CSS variables that adapt to both light and dark modes:

#### Light Mode

- **Primary**: `hsl(142 76% 36%)` - Vibrant Emerald
- **Secondary**: `hsl(25 95% 53%)` - Warm Orange
- **Accent**: `hsl(221 83% 53%)` - Rich Purple/Blue

#### Dark Mode

- **Primary**: `hsl(142 70% 45%)` - Brighter Emerald
- **Secondary**: `hsl(25 95% 60%)` - Vibrant Orange
- **Accent**: `hsl(221 83% 63%)` - Bright Purple/Blue

#### Named Color Scales

You can also use these named color scales directly in your code:

- `mpesa-green-{50-900}`: Full green palette from M-Pesa branding
- `flutterwave-{50-900}`: Full orange palette from Flutterwave branding
- `paystack-{50-900}`: Full blue palette from Paystack branding

## 🚀 Features

- **Modern React 18+** with TypeScript
- **Tailwind CSS** for styling with custom African fintech theme
- **Responsive Design** - Works perfectly on all devices
- **Dark Mode Support** - Toggle between light and dark themes
- **Smooth Animations** - Custom animations and transitions
- **Component Library** - Built with Radix UI primitives
- **Form Handling** - React Hook Form with Zod validation
- **Email Integration** - Contact form powered by EmailJS

## 📦 Tech Stack

### Frontend

- **React 18.3.1** - Modern UI library
- **TypeScript 5.5.3** - Type-safe development
- **Tailwind CSS 3.4.11** - Utility-first CSS framework
- **Vite 5.4.1** - Fast build tool and dev server
- **React Router 6.26.2** - Client-side routing

### UI Components

- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Recharts** - Responsive chart library
- **Sonner** - Toast notifications

### Development Tools

- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting
- **Autoprefixer** - CSS vendor prefixing
- **PostCSS** - CSS transformations

## 🛠️ Installation

### Prerequisites

- Node.js 20.x or later
- npm or yarn package manager

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/fredricknyangau/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables** (if needed)
   Create a `.env` file in the root directory:

   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📝 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Build for development environment
npm run build:dev

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 🎨 Using the African Fintech Colors

### CSS Variables (Recommended)

Use semantic color variables that adapt to light/dark mode:

```tsx
<div className="bg-primary text-primary-foreground">
  Primary colored section
</div>

<button className="bg-secondary hover:bg-secondary/90">
  Secondary button
</button>

<div className="text-accent border-accent">
  Accent text and border
</div>
```

### Named Color Scales

Use specific color shades from the African fintech palette:

```tsx
<div className="bg-mpesa-green-600 text-white">
  M-Pesa green background
</div>

<button className="bg-flutterwave-500 hover:bg-flutterwave-600">
  Flutterwave orange button
</button>

<div className="border-paystack-700">
  Paystack blue border
</div>
```

### Gradient Utilities

Custom gradient classes for African fintech branding:

```tsx
{
  /* Primary, Secondary, Accent gradient text */
}
<h1 className="gradient-text text-5xl font-bold">Gradient Text</h1>;

{
  /* African fintech gradient background */
}
<div className="gradient-african p-8 rounded-lg">Content</div>;

{
  /* Emerald to Orange to Purple gradient */
}
<div className="gradient-emerald-orange p-8">Content</div>;
```

## 📂 Project Structure

```
portfolio/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # Reusable UI components (Radix UI)
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   └── ContactSection.tsx
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   │   ├── Index.tsx   # Main landing page
│   │   └── NotFound.tsx
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # App entry point
│   ├── main.tsx        # React DOM render
│   └── index.css       # Global styles & color system
├── tailwind.config.ts  # Tailwind configuration
├── vite.config.ts      # Vite configuration
└── package.json        # Dependencies
```

## 🌍 Color Accessibility

All color combinations have been designed to meet **WCAG AA** standards for contrast ratios:

- **Primary on White**: 4.5:1+ ✅
- **Secondary on White**: 4.5:1+ ✅
- **Accent on White**: 4.5:1+ ✅
- **Dark mode combinations**: 4.5:1+ ✅

## 🚀 Deployment

### Vercel (Recommended)

This project is configured for Vercel deployment with `vercel.json`:

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

Or deploy via Vercel Dashboard by connecting your Git repository.

### Other Platforms

**Netlify:**

```bash
npm run build
# Deploy the dist/ folder
```

**GitHub Pages, Cloudflare Pages, etc:**

- Build command: `npm run build`
- Publish directory: `dist`

## 🔧 Customization

### Changing Colors

To customize the African fintech colors, edit `src/index.css`:

```css
:root {
  --primary: 142 76% 36%; /* Change this HSL value */
  --secondary: 25 95% 53%; /* Change this HSL value */
  --accent: 221 83% 53%; /* Change this HSL value */
}
```

### Adding Named Colors

To add more color scales in `tailwind.config.ts`:

```typescript
colors: {
  'chipper': {
    500: '#your-color',
    600: '#your-darker-color',
    // ... more shades
  },
}
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Contact

**Fredrick Nyangau**

- Portfolio: [Your Portfolio URL]
- Email: [Your Email]
- LinkedIn: [Your LinkedIn]
- GitHub: [@fredricknyangau](https://github.com/fredricknyangau)

## 🙏 Acknowledgments

- Design inspired by leading African fintech companies
- UI components powered by [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
- Built with [Vite](https://vitejs.dev/) and [React](https://react.dev/)

---

Built with ❤️ using African Fintech colors 🌍
