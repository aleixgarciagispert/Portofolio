import { useMemo, useState } from 'react';
import type { PortfolioTheme, Project } from '../types';
import PortfolioHeader from '../components/PortfolioHeader';
import ProjectCard from '../components/ProjectCard';
import PortfolioFooter from '../components/PortfolioFooter';
import { portfolioSections } from '../data/site';
import styles from './PortfolioPageLayout.module.css';

interface PortfolioPageLayoutProps {
  theme: PortfolioTheme;
  projects: Project[];
}

export default function PortfolioPageLayout({ theme, projects }: PortfolioPageLayoutProps) {
  const section = portfolioSections[theme];
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'ALL') return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [projects, activeFilter]);

  const accentClass = theme === 'frontend' ? styles.frontend : styles.cgi;

  return (
    <div className={`${styles.page} ${accentClass} theme-${theme}`}>
      <PortfolioHeader
        section={section}
        theme={theme}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <section className={styles.grid} aria-label="Project gallery">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} theme={theme} />
        ))}
      </section>

      <PortfolioFooter theme={theme} contactCta={section.contactCta} />
    </div>
  );
}
