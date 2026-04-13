import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
import Projects from '@/components/Projects';
import Stack from '@/components/Stack';
import About from '@/components/About';
import Contact from '@/components/Contact';

export default function Home(): JSX.Element {
  return (
    <main>
      <Hero />
      <StatsBar />
      <Projects />
      <Stack />
      <About />
      <Contact />
    </main>
  );
}
