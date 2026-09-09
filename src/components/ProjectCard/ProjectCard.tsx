import PixelCard from '../PixelCard';
import type { PortfolioTheme, Project } from '../../types';
import { categoryAccent } from './categoryAccent';

interface ProjectCardProps {
  project: Project;
  theme: PortfolioTheme;
  onSelect?: (project: Project) => void;
}

export default function ProjectCard({ project, theme, onSelect }: ProjectCardProps) {
  if (theme === 'frontend') {
    return <ToolCard project={project} onSelect={onSelect} />;
  }

  const hoverBorder = 'hover:!border-cgi';
  const numberColor = 'text-cgi';
  const tagsColor = 'text-cgi';

  const cardProps = onSelect
    ? {
        as: 'button' as const,
        onClick: () => onSelect(project),
      }
    : {
        as: project.link ? ('a' as const) : ('article' as const),
        href: project.link,
        target: project.link ? '_blank' : undefined,
        rel: project.link ? 'noreferrer noopener' : undefined,
      };

  return (
    <PixelCard
      variant={theme}
      {...cardProps}
      className={`${project.featured ? 'col-span-2 max-md:col-span-1' : ''} ${hoverBorder}`}
    >
      {/* content sits above the pixel canvas via z-index */}
      <div className="absolute inset-0 z-[2] flex flex-col pointer-events-none">
        {/* cover area */}
        <div className="relative flex-1 border-b border-border overflow-hidden">
          {project.coverImage && (
            <img
              src={project.coverImage}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <span className={`absolute top-3 left-3.5 font-mono text-[10px] font-light tracking-[1.5px] ${numberColor} z-10`}>
            {project.number}
          </span>
          {!project.coverImage && (
            <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-light tracking-[2px] text-text-dim uppercase">
              {project.coverLabel ?? 'PROJECT COVER'}
            </span>
          )}
        </div>

        {/* text body */}
        <div className="px-4 pt-3 pb-4 bg-gradient-to-t from-bg-elevated/100 via-bg-elevated/90 to-transparent">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="m-0 text-[15px] font-normal tracking-[0.01em]">{project.title}</h3>
            <span className="font-mono text-[10px] font-light text-text-dim shrink-0">{project.year}</span>
          </div>
          <p className="mt-1.5 text-[13px] font-light leading-[1.55] text-text-subtle">{project.description}</p>
          <div className={`font-mono text-[9px] font-light tracking-[1px] mt-2.5 uppercase ${tagsColor}`}>
            {project.tags.join(' · ')}
          </div>
        </div>
      </div>
    </PixelCard>
  );
}

function ToolCard({ project, onSelect }: { project: Project; onSelect?: (project: Project) => void }) {
  const { gradient, glow } = categoryAccent(project.category);
  const monogram = project.title.trim().charAt(0).toUpperCase();
  const className = `group relative flex aspect-[4/3] w-full flex-col overflow-hidden rounded-[16px] border border-white/10 bg-gradient-to-br ${gradient} text-left transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-frontend [box-shadow:0_0_50px_-10px_var(--glow),0_0_100px_-20px_var(--glow),0_0_0_1px_rgba(255,255,255,0.04)_inset] hover:[box-shadow:0_0_65px_-8px_var(--glow),0_0_130px_-15px_var(--glow),0_0_0_1px_rgba(255,255,255,0.08)_inset]`;
  const style = { '--glow': glow } as React.CSSProperties;

  const content = (
    <>
      {/* soft ambient glow, sits behind everything */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 left-8 h-24 w-24 rounded-full opacity-70 blur-3xl"
        style={{ background: glow }}
      />

      <span
        aria-hidden="true"
        className="absolute top-4 right-4 z-20 flex h-6 w-6 items-center justify-center rounded-[4px] bg-black/30 font-mono text-[10px] font-medium text-white/70"
      >
        {project.number}
      </span>

      {/* title block, pinned to the top */}
      <div className="relative z-10 shrink-0 px-4 pt-4">
        <div className="flex items-start gap-2">
          <span
            aria-hidden="true"
            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-[6px] bg-white/10 font-mono text-[11px] font-semibold text-white"
          >
            {monogram}
          </span>
          <h3 className="m-0 text-[14px] font-medium leading-snug text-white">{project.title}</h3>
        </div>

        <p className="mt-1.5 text-[11px] font-light leading-[1.45] text-white/65 line-clamp-2">
          {project.description}
        </p>
      </div>

      {/* oversized visual, bleeding off the bottom edge */}
      <div className="relative flex-1 min-h-0">
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt=""
            aria-hidden="true"
            className="absolute -bottom-3 left-1/2 h-[112%] w-[112%] -translate-x-1/2 object-cover opacity-90 transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          />
        ) : (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-6 -right-2 select-none font-sans text-[100px] font-bold leading-none transition-transform duration-500 ease-out group-hover:scale-105"
            style={{ color: glow }}
          >
            {monogram}
          </span>
        )}
      </div>
    </>
  );

  if (onSelect) {
    return (
      <button type="button" className={className} style={style} onClick={() => onSelect(project)}>
        {content}
      </button>
    );
  }

  if (project.link && project.link !== '#') {
    return (
      <a href={project.link} target="_blank" rel="noreferrer noopener" className={className} style={style}>
        {content}
      </a>
    );
  }

  return (
    <article className={className} style={style}>
      {content}
    </article>
  );
}
