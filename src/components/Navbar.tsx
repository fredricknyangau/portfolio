import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons';
import ThemeToggle from '@/components/ThemeToggle';

const navLinks = [
  { href: '/#projects', label: 'Work' },
  { href: '/#stack',    label: 'Stack' },
  { href: '/#about',    label: 'About' },
];

export default function Navbar(): JSX.Element {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 900) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <nav
      id="navbar"
      className={[
        'fixed top-0 left-0 right-0 z-50',
        'flex items-center justify-between',
        'px-4 sm:px-8 md:px-12 py-3 sm:py-5',
        'bg-bg/85 backdrop-blur-[12px]',
        'border-b transition-colors duration-300',
        scrolled ? 'border-border-dim' : 'border-transparent',
      ].join(' ')}
    >
      {/* Logo */}
      <a
        href="/#hero"
        className="font-serif text-[22px] font-normal tracking-[-0.02em] text-text no-underline"
      >
        fredrick<span className="text-amber">.</span>nyang'au
      </a>

      {/* Desktop right side */}
      <div className="hidden sm:flex items-center gap-6">
        {navLinks.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-text2 no-underline text-sm transition-colors duration-200 hover:text-text"
          >
            {l.label}
          </a>
        ))}

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/fredricknyangau"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-text3 transition-colors duration-200 hover:text-amber flex items-center"
          >
            <GitHubIcon size={20} />
          </a>
          <a
            href="https://linkedin.com/in/fredricknyangau"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-text3 transition-colors duration-200 hover:text-amber flex items-center"
          >
            <LinkedInIcon size={20} />
          </a>
          <ThemeToggle />
        </div>

        <a
          href="/#contact"
          className={[
            'font-mono text-[13px] tracking-[0.02em]',
            'px-[18px] py-2',
            'border border-amber-dim text-amber no-underline',
            'transition-all duration-200',
            'hover:bg-amber hover:text-bg',
          ].join(' ')}
        >
          Get in touch →
        </a>
      </div>

      {/* Mobile hamburger */}
      <button
        className="sm:hidden text-text2 p-1"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((v) => !v)}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className={[
            'absolute top-full left-0 right-0',
            'bg-surface border-b border-border-dim',
            'flex flex-col gap-0 py-2',
            'sm:hidden',
          ].join(' ')}
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-text2 text-sm px-6 py-4 hover:text-text hover:bg-surface2 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="flex items-center gap-4 px-6 py-3 border-t border-border-dim">
            <a
              href="https://github.com/fredricknyangau"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-text3 hover:text-amber transition-colors"
            >
              <GitHubIcon size={18} />
            </a>
            <a
              href="https://linkedin.com/in/fredricknyangau"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-text3 hover:text-amber transition-colors"
            >
            <LinkedInIcon size={18} />
            </a>
            <ThemeToggle />
            <a
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="ml-auto font-mono text-[13px] px-4 py-1.5 rounded border border-amber-dim text-amber hover:bg-amber hover:text-bg transition-all"
            >
              Get in touch →
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
