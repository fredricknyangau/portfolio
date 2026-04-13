import { useEffect, useState } from 'react';

const SECTION_IDS = ['hero', 'projects', 'stack', 'about', 'contact'] as const;
export type SectionId = (typeof SECTION_IDS)[number];

/**
 * Returns the id of the section currently most visible in the viewport.
 * Used for active nav-link highlighting.
 */
export function useScrollSpy(): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id as SectionId);
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );

    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return active;
}
