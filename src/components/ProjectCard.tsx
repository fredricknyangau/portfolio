import { ExternalLink, Lock, BookOpen } from 'lucide-react';
import { GitHubIcon } from '@/components/SocialIcons';
import { useFadeUp } from '@/hooks/useFadeUp';
import { Link } from 'react-router-dom';
import type { Project } from '@/data/projects';

interface Props {
  project: Project;
  featured?: boolean;
}

function tagClasses(variant: 'live' | 'wip' | 'default'): string {
  const base = 'font-mono text-[11px] px-2.5 py-1 rounded-[3px] border tracking-[0.04em]';
  if (variant === 'live')
    return `${base} text-green-ok border-green-ok/30 bg-green-ok/8`;
  if (variant === 'wip')
    return `${base} text-amber border-amber-dim bg-amber/8`;
  return `${base} text-text2 border-border-dim bg-surface2`;
}

export default function ProjectCard({ project, featured = false }: Props): JSX.Element {
  const ref = useFadeUp<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={[
        'fade-up group bg-bg border border-border-dim relative overflow-hidden',
        'transition-colors duration-300 hover:border-amber/40',
        featured ? 'p-8 md:p-14' : 'p-8 md:p-10',
      ].join(' ')}
    >
      {/* Top accent line on hover */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Deployment target badge */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag.label} className={tagClasses(tag.variant)}>
              {tag.label}
            </span>
          ))}
        </div>
        <span className="font-mono text-[11px] text-text3 border border-border-dim px-2.5 py-1 rounded-[3px] tracking-[0.04em]">
          {project.deploymentTarget}
        </span>
      </div>

      {/* Name */}
      <h3
        className={[
          'font-serif font-normal tracking-[-0.02em] leading-[1.2] mb-1',
          featured ? 'text-[32px] md:text-[38px]' : 'text-[26px]',
        ].join(' ')}
      >
        {project.name}
      </h3>

      {/* Tagline */}
      <p className="font-mono text-[12px] text-amber mb-5 tracking-[0.02em]">
        {project.tagline}
      </p>

      {/* Architecture overview */}
      <div className="mb-6">
        <div className="font-mono text-[10px] text-text3 tracking-[0.12em] uppercase mb-2">
          Architecture
        </div>
        <p className="text-[14px] text-text2 leading-[1.7] border-l-2 border-amber/30 pl-4">
          {project.architectureOverview}
        </p>
      </div>

      {/* Engineering decisions */}
      <div className="mb-6">
        <div className="font-mono text-[10px] text-text3 tracking-[0.12em] uppercase mb-3">
          Key decisions
        </div>
        <ul className="flex flex-col gap-2.5">
          {project.engineeringDecisions.slice(0, featured ? 4 : 2).map((d) => (
            <li key={d.decision} className="flex gap-3 text-[13px]">
              <span className="text-amber font-mono shrink-0 mt-0.5">→</span>
              <span>
                <strong className="text-text font-medium">{d.decision}.</strong>{' '}
                <span className="text-text2">{d.rationale}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Metrics */}
      <div className="bg-surface border border-border-dim rounded-md p-5 mb-6">
        <div className="font-mono text-[10px] text-amber-dim tracking-[0.12em] uppercase mb-3.5">
          Outcomes
        </div>
        <ul className={['grid gap-2', featured ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'].join(' ')}>
          {project.metrics.map((m) => (
            <li
              key={m.highlight}
              className="font-mono text-[12px] text-text2 flex items-baseline gap-2"
            >
              <span className="text-green-ok text-[11px] shrink-0">✓</span>
              <span className="flex-1">
                <strong className="text-text">{m.highlight}</strong>
                {' '}{m.description}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Stack pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="font-mono text-[11px] px-3 py-[5px] bg-amber/8 text-amber border border-amber/20 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-3 flex-wrap">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className={[
              'inline-flex items-center gap-1.5 bg-amber text-bg',
              'font-sans text-[13px] font-semibold',
              'px-5 py-2.5 rounded transition-colors duration-200 hover:bg-amber-glow',
              'no-underline',
            ].join(' ')}
          >
            {project.liveLabel ?? 'Live App'}
            <ExternalLink size={13} />
          </a>
        ) : (
          <span
            className={[
              'inline-flex items-center gap-1.5 text-text3',
              'font-mono text-[13px]',
              'border border-border-dim px-5 py-2.5 rounded',
              'cursor-default select-none',
            ].join(' ')}
            title="Private deployment - available on request"
          >
            <Lock size={13} />
            Private Deploy
          </span>
        )}

        {project.codeUrl && (
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              'inline-flex items-center gap-1.5 text-text2',
              'font-mono text-[13px]',
              'border border-border2 px-5 py-2.5 rounded',
              'transition-all duration-200 hover:text-text hover:border-text3',
              'no-underline',
            ].join(' ')}
          >
            <GitHubIcon size={13} />
            View code
          </a>
        )}

        {project.star && (
          <Link
            to={`/case-study/${project.id}`}
            className={[
              'inline-flex items-center gap-1.5 text-text2',
              'font-mono text-[13px]',
              'border border-border2 px-5 py-2.5 rounded',
              'transition-all duration-200 hover:text-text hover:border-text3 cursor-pointer bg-transparent',
              'no-underline',
            ].join(' ')}
          >
            <BookOpen size={13} />
            Case Study
          </Link>
        )}
      </div>
    </div>
  );
}
