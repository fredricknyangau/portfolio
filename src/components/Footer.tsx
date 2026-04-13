export default function Footer(): JSX.Element {
  return (
    <footer className="border-t border-border-dim px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-center">
      <span className="font-mono text-[12px] text-text3">
        © 2026 Fredrick Nyangau · Nairobi, Kenya
      </span>
      <span className="font-mono text-[12px] text-text3">
        Built with React, TypeScript & Tailwind · Hosted on Vercel
      </span>
    </footer>
  );
}
