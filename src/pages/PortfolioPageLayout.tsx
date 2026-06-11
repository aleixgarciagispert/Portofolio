import { useMemo, useState } from 'react';
import type { PortfolioTheme, Project } from '../types';
import PortfolioHeader from '../components/PortfolioHeader';
import ProjectCard from '../components/ProjectCard';
import PortfolioFooter from '../components/PortfolioFooter';
import { portfolioSections } from '../data/portfolioSections';

interface PortfolioPageLayoutProps {
  theme: PortfolioTheme;
  projects: Project[];
}

export default function PortfolioPageLayout({ theme, projects }: PortfolioPageLayoutProps) {
  const section = portfolioSections[theme];
  const [activeFilter, setActiveFilter] = useState('ALL');

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
        className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] auto-rows-[280px] gap-5 mt-2"
        aria-label="Project gallery"
      >
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} theme={theme} />
        ))}
      </section>

      <PortfolioFooter theme={theme} contactCta={section.contactCta} />
    </div>
  );
}
