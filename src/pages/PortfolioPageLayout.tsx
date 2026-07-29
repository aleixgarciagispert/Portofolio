import { useMemo, useState } from 'react';
import type { PortfolioTheme, Project } from '../types';
import PortfolioHeader from '../components/PortfolioHeader';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import PortfolioFooter from '../components/PortfolioFooter';
import { portfolioSections } from '../data/portfolioSections';

interface PortfolioPageLayoutProps {
  theme: PortfolioTheme;
  projects: Project[];
}

export default function PortfolioPageLayout({ theme, projects }: PortfolioPageLayoutProps) {
  const section = portfolioSections[theme];
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'ALL') return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [projects, activeFilter]);

  return (
    <div className={`w-full max-w-[var(--max-width)] mx-auto pb-6 theme-${theme}`}>
      <PortfolioHeader
        section={section}
        theme={theme}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <section
        className={
          theme === 'frontend'
            ? 'grid grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto gap-x-10 gap-y-20 mt-2'
            : 'grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] auto-rows-[280px] gap-5 mt-2'
        }
        aria-label="Project gallery"
      >
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            theme={theme}
            onSelect={theme === 'frontend' ? setSelectedProject : undefined}
          />
        ))}
      </section>

      <PortfolioFooter theme={theme} contactCta={section.contactCta} />

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
}
