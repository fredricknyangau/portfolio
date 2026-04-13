import { ExternalLink, BookOpen, Lock } from 'lucide-react';
import { GitHubIcon } from '@/components/SocialIcons';
import { useFadeUp } from '@/hooks/useFadeUp';
import { Link } from 'react-router-dom';
import type { Project } from '@/data/projects';

interface Props {
  project: Project;
}

function tagClasses(variant: 'live' | 'wip' | 'default'): string {
  const base = 'font-mono text-[11px] px-2.5 py-1 rounded-[3px] border tracking-[0.04em]';
  if (variant === 'live')
    return `${base} text-green-ok border-green-ok/30 bg-green-ok/8`;
  if (variant === 'wip')
    return `${base} text-amber border-amber-dim bg-amber/8`;
  return `${base} text-text2 border-border-dim bg-surface2`;
}

export default function ProjectCard({ project }: Props): JSX.Element {
  const ref = useFadeUp<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={[
        'fade-up group bg-bg border border-border-dim relative overflow-hidden',
        'transition-colors duration-300 hover:border-amber-dim',
        'p-8 md:p-12',
      ].join(' ')}
    >
      {/* Amber top accent line */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      <div>
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span key={tag.label} className={tagClasses(tag.variant)}>
              {tag.label}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3 className="font-serif text-[28px] font-normal tracking-[-0.02em] leading-[1.2] mb-3">
          {project.name}
        </h3>

        {/* Problem statement */}
        <p className="text-[15px] text-text2 leading-[1.7] italic border-l-2 border-amber-dim pl-4 mb-7">
          {project.problem}
        </p>

        {/* Metrics box */}
        <div className="bg-surface2 border border-border-dim rounded-md p-5 mb-7">
          <div className="font-mono text-[10px] text-amber-dim tracking-[0.12em] uppercase mb-3.5">
            Results
          </div>
          <ul className="flex flex-col gap-2">
            {project.metrics.map((m) => (
              <li
                key={m.highlight}
                className="font-mono text-[13px] text-text2 flex items-baseline gap-2"
              >
                <span className="text-green-ok text-[12px] shrink-0">✓</span>
                <strong className="text-text">{m.highlight}</strong>
                {' '}{m.description}
              </li>
            ))}
          </ul>
        </div>

        {/* Stack pills */}
        <div className="flex flex-wrap gap-2 mb-7">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[12px] px-3 py-[5px] bg-amber/8 text-amber border border-amber/20 rounded-full"
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
              title="Private deployment — available on request"
            >
              <Lock size={13} />
              Private Deploy
            </span>
          )}

          <a
            href={project.codeUrl}
            target="_blank"
            rel="noreferrer"
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
              Read Case Study
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
