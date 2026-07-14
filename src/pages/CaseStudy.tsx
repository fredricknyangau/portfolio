import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Lock } from 'lucide-react';
import Mermaid from '@/components/Mermaid';
import { projects } from '@/data/projects';
import { GitHubIcon } from '@/components/SocialIcons';
import SEO from '@/components/SEO';

export default function CaseStudy(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id, project]);

  if (!project || !project.star) {
    return (
      <div className="min-h-screen pt-32 px-6 flex flex-col items-center">
        <h1 className="text-3xl text-err mb-4">Case Study Not Found</h1>
        <Link to="/" className="text-amber hover:underline font-mono text-[13px]">
          Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-[120px] pb-24 px-4 sm:px-6 md:px-12 max-w-5xl mx-auto">
      <SEO
        title={`${project.name} - Case Study · Fredrick Nyang'au`}
        description={project.tagline || project.problem.slice(0, 160)}
        type="article"
        url={`https://fredricknyangau.vercel.app/case-study/${project.id}`}
      />
      <Link
        to="/#projects"
        className="inline-flex items-center gap-2 text-text2 hover:text-amber font-mono text-[13px] transition-colors mb-10 no-underline"
      >
        <ArrowLeft size={14} /> Back to Projects
      </Link>

      {/* Header */}
      <header className="mb-14 fade-up visible">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((t) => (
            <span
              key={t.label}
              className={`font-mono text-[11px] px-2.5 py-1 rounded-[3px] border tracking-[0.04em] ${
                t.variant === 'live'
                  ? 'text-green-ok border-green-ok/30 bg-green-ok/8'
                  : 'text-text2 border-border-dim bg-surface2'
              }`}
            >
              {t.label}
            </span>
          ))}
          <span className="font-mono text-[11px] px-2.5 py-1 rounded-[3px] border border-border-dim text-text3 tracking-[0.04em]">
            {project.deploymentTarget}
          </span>
        </div>

        <h1 className="font-serif text-[38px] md:text-[54px] font-light tracking-[-0.03em] leading-[1.1] text-text mb-3">
          {project.name}
        </h1>

        <p className="font-mono text-[14px] text-amber mb-6">{project.tagline}</p>

        <p className="text-[16px] text-text2 leading-[1.8] italic border-l-2 border-amber/30 pl-5 max-w-3xl">
          {project.problem}
        </p>
      </header>

      <article className="flex flex-col gap-12 sm:gap-16 fade-up visible">

        {/* Architecture Diagram */}
        {project.c4Diagram && (
          <section>
            <div className="font-mono text-[11px] text-amber tracking-[0.1em] uppercase mb-5 border-b border-border-dim pb-3">
              01. Architecture
            </div>
            {/* TODO: Add a screenshot or screen recording of the live app here.
                 Coordinate with Fredrick to supply the image asset, then replace
                 this comment with an <img> or embed below the diagram. */}
            <Mermaid chart={project.c4Diagram} />
          </section>
        )}

        {/* Architecture Overview */}
        <section>
          <div className="font-mono text-[11px] text-amber tracking-[0.1em] uppercase mb-4 border-b border-border-dim pb-3">
            02. Architecture Overview
          </div>
          <p className="text-[15px] text-text2 leading-[1.8] max-w-4xl">
            {project.architectureOverview}
          </p>
        </section>

        {/* Engineering Decisions */}
        {project.engineeringDecisions.length > 0 && (
          <section>
            <div className="font-mono text-[11px] text-amber tracking-[0.1em] uppercase mb-5 border-b border-border-dim pb-3">
              03. Engineering Decisions
            </div>
            <div className="flex flex-col gap-6">
              {project.engineeringDecisions.map((d, i) => (
                <div key={d.decision} className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-4 bg-surface border border-border-dim rounded-lg p-6">
                  <div>
                    <div className="font-mono text-[10px] text-text3 tracking-[0.1em] uppercase mb-2">
                      Decision {String(i + 1).padStart(2, '0')}
                    </div>
                    <p className="font-mono text-[13px] text-text font-medium leading-[1.5]">
                      {d.decision}
                    </p>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-text3 tracking-[0.1em] uppercase mb-2">
                      Rationale
                    </div>
                    <p className="text-[14px] text-text2 leading-[1.7]">{d.rationale}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Outcomes */}
        <section>
          <div className="font-mono text-[11px] text-amber tracking-[0.1em] uppercase mb-5 border-b border-border-dim pb-3">
            04. Outcomes
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.metrics.map((m) => (
              <div key={m.highlight} className="bg-surface border border-border-dim rounded-lg p-5">
                <div className="font-mono text-[20px] text-amber mb-1">{m.highlight}</div>
                <div className="text-[13px] text-text2">{m.description}</div>
              </div>
            ))}
          </div>
        </section>

        {/* STAR - Situation */}
        {project.star.situation && (
          <section>
            <div className="font-mono text-[11px] text-amber tracking-[0.1em] uppercase mb-4 border-b border-border-dim pb-3">
              05. Context
            </div>
            <p className="text-[15px] text-text2 leading-[1.8] max-w-4xl">{project.star.situation}</p>
          </section>
        )}

        {/* STAR - Task */}
        {project.star.task && (
          <section>
            <div className="font-mono text-[11px] text-amber tracking-[0.1em] uppercase mb-4 border-b border-border-dim pb-3">
              06. Objective
            </div>
            <p className="text-[15px] text-text2 leading-[1.8] max-w-4xl">{project.star.task}</p>
          </section>
        )}

        {/* STAR - Action */}
        {project.star.action && (
          <section>
            <div className="font-mono text-[11px] text-amber tracking-[0.1em] uppercase mb-4 border-b border-border-dim pb-3">
              07. Implementation
            </div>
            <p className="text-[15px] text-text2 leading-[1.8] max-w-4xl">{project.star.action}</p>
          </section>
        )}

        {/* STAR - Result */}
        {project.star.result && (
          <section>
            <div className="font-mono text-[11px] text-amber tracking-[0.1em] uppercase mb-4 border-b border-border-dim pb-3">
              08. Result
            </div>
            <p className="text-[15px] text-text2 leading-[1.8] max-w-4xl">{project.star.result}</p>
          </section>
        )}

        {/* Tech stack */}
        <section>
          <div className="font-mono text-[11px] text-amber tracking-[0.1em] uppercase mb-4 border-b border-border-dim pb-3">
            09. Stack
          </div>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[12px] px-3 py-1.5 bg-amber/8 text-amber border border-amber/20 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Links */}
        <div className="flex gap-3 flex-wrap pt-4 border-t border-border-dim">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 bg-amber text-bg font-sans text-[13px] font-semibold px-5 py-2.5 rounded transition-colors duration-200 hover:bg-amber-glow no-underline"
            >
              {project.liveLabel ?? 'Live App'}
              <ExternalLink size={13} />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-text3 font-mono text-[13px] border border-border-dim px-5 py-2.5 rounded cursor-default">
              <Lock size={13} />
              Private Deploy
            </span>
          )}
          {project.codeUrl ? (
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-text2 font-mono text-[13px] border border-border2 px-5 py-2.5 rounded transition-all duration-200 hover:text-text hover:border-text3 no-underline"
            >
              <GitHubIcon size={13} />
              View code
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-text3 font-mono text-[13px] border border-border-dim px-5 py-2.5 rounded cursor-default" title="Repository is private — available on request">
              <Lock size={13} />
              Private repository · available on request
            </span>
          )}
        </div>
      </article>
    </main>
  );
}
