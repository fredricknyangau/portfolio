import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';

export default function Projects(): JSX.Element {
  return (
    <section id="projects" className="bg-surface py-10 sm:py-16 md:py-24 px-5 sm:px-6 md:px-12">
      <p className="font-mono text-[11px] text-amber tracking-[0.16em] uppercase mb-4">
        / selected work
      </p>
      <h2
        className="font-serif font-light tracking-[-0.03em] leading-[1.1] mb-3"
        style={{ fontSize: 'clamp(36px, 4vw, 50px)' }}
      >
        Projects that solve
        <br />
        <em className="italic">real problems</em>
      </h2>
      <p className="text-[16px] text-text2 max-w-[560px] mb-8 sm:mb-16">
        Built to production standards — deployed, documented, and tested. Each project
        targets a real gap in the East African market.
      </p>

      {/* Grid: featured spans full width, rest are 2-col on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
