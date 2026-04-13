import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Mermaid from '@/components/Mermaid';
import { projects } from '@/data/projects';

export default function CaseStudy(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (project) {
      document.title = `${project.name} — Case Study · Fredrick Nyangau`;
    }
    return () => {
      document.title = 'Fredrick Nyangau — Backend Engineer';
    };
  }, [id, project]);

  if (!project || !project.star) {
    return (
      <div className="min-h-screen pt-32 px-6 flex flex-col items-center">
        <h1 className="text-3xl text-err mb-4">Case Study Not Found</h1>
        <Link to="/" className="text-amber hover:underline font-mono text-[13px]">← Back to Portfolio</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-[120px] pb-24 px-6 md:px-12 max-w-5xl mx-auto">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-text2 hover:text-amber font-mono text-[13px] transition-colors mb-10 no-underline"
      >
        <ArrowLeft size={14} /> Back to Portfolio
      </Link>

      <header className="mb-14 fade-up visible">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(t => (
            <span key={t.label} className={`font-mono text-[11px] px-2.5 py-1 rounded-[3px] border tracking-[0.04em] ${t.variant === 'live' ? 'text-green-ok border-green-ok/30 bg-green-ok/8' : 'text-text2 border-border-dim bg-surface2'}`}>
              {t.label}
            </span>
          ))}
        </div>
        <h1 className="font-serif text-[42px] md:text-[56px] font-light tracking-[-0.03em] leading-[1.1] text-text mb-6">
          {project.name}
        </h1>
        <p className="text-[17px] text-text2 leading-[1.8] italic border-l-2 border-amber-dim pl-5 max-w-3xl">
          {project.problem}
        </p>
      </header>

      <article className="flex flex-col gap-12 sm:gap-16 fade-up visible">
        {project.c4Diagram && (
          <section>
            <div className="font-mono text-[12px] text-amber tracking-[0.1em] uppercase mb-5 border-b border-border-dim pb-3">01. C4 Architecture</div>
            <Mermaid chart={project.c4Diagram} />
          </section>
        )}
        {project.star.situation && (
          <section>
            <div className="font-mono text-[12px] text-amber tracking-[0.1em] uppercase mb-4 border-b border-border-dim pb-3">02. Situation</div>
            <p className="text-[16px] text-text2 leading-[1.8] max-w-4xl">{project.star.situation}</p>
          </section>
        )}
        {project.star.task && (
          <section>
            <div className="font-mono text-[12px] text-amber tracking-[0.1em] uppercase mb-4 border-b border-border-dim pb-3">03. Task</div>
            <p className="text-[16px] text-text2 leading-[1.8] max-w-4xl">{project.star.task}</p>
          </section>
        )}
        {project.star.action && (
          <section>
            <div className="font-mono text-[12px] text-amber tracking-[0.1em] uppercase mb-4 border-b border-border-dim pb-3">04. Action (Technical Implementation)</div>
            <p className="text-[16px] text-text2 leading-[1.8] max-w-4xl">{project.star.action}</p>
          </section>
        )}
        {project.star.result && (
          <section>
            <div className="font-mono text-[12px] text-amber tracking-[0.1em] uppercase mb-4 border-b border-border-dim pb-3">05. Business Result</div>
            <p className="text-[16px] text-text2 leading-[1.8] max-w-4xl">{project.star.result}</p>
          </section>
        )}
      </article>
    </main>
  );
}
