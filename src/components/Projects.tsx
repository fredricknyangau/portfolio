import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';

export default function Projects(): JSX.Element {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="bg-surface py-10 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12">
      <p className="font-mono text-[11px] text-amber tracking-[0.16em] uppercase mb-4">
        / featured projects
      </p>
      <h2
        className="font-serif font-light tracking-[-0.03em] leading-[1.1] mb-3"
        style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
      >
        Backend systems in production.
      </h2>
      <p className="text-[15px] text-text2 max-w-[560px] mb-8 sm:mb-14 leading-[1.75]">
        Built to production standards. Each project targets a concrete engineering problem — designed, implemented, and documented to the same bar I'd hold production code to.
      </p>

      <div className="flex flex-col gap-[1px]">
        {/* Featured project - full width */}
        {featured && (
          <ProjectCard project={featured} featured />
        )}

        {/* Remaining projects - 2-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px]">
          {rest.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
