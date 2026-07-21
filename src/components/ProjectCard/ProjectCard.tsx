import PixelCard from '../PixelCard';
import type { PortfolioTheme, Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  theme: PortfolioTheme;
}

export default function ProjectCard({ project, theme }: ProjectCardProps) {
  const isFrontend = theme === 'frontend';
  const hoverBorder = isFrontend ? 'hover:!border-frontend' : 'hover:!border-cgi';
  const numberColor = isFrontend ? 'text-frontend' : 'text-cgi';
  const tagsColor = isFrontend ? 'text-frontend' : 'text-cgi';

  return (
    <PixelCard
      variant={theme}
      as={project.link ? 'a' : 'article'}
      href={project.link}
      target={project.link ? '_blank' : undefined}
      rel={project.link ? 'noreferrer noopener' : undefined}
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
