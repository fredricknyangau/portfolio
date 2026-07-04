import React, { Suspense } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Philosophy from '@/components/Philosophy';
import Projects from '@/components/Projects';
import Stack from '@/components/Stack';
import SEO from '@/components/SEO';

// Lazy load below-the-fold components to improve Lighthouse performance
const Experience = React.lazy(() => import('@/components/Experience'));
const Leadership = React.lazy(() => import('@/components/Leadership'));
const Writing = React.lazy(() => import('@/components/Writing'));
const Contact = React.lazy(() => import('@/components/Contact'));

// A minimal fallback to prevent layout shift during loading
const SectionFallback = () => <div className="min-h-[200px] w-full animate-pulse bg-surface/5" />;

export default function Home(): JSX.Element {
  return (
    <main>
      <SEO />
      <Hero />
      <About />
      <Philosophy />
      <Projects />
      <Stack />
      <Suspense fallback={<SectionFallback />}>
        <Experience />
        <Leadership />
        <Writing />
        <Contact />
      </Suspense>
    </main>
  );
}
