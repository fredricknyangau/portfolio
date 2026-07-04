import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle(): JSX.Element {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return true;
    // localStorage preference overrides the HTML default when set
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    // Fall back to what the HTML class actually says (class="dark" in index.html)
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-text2 hover:text-amber transition-colors duration-200 focus:outline-none"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
