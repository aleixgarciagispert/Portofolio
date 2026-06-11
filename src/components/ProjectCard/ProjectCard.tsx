import PixelCard from '../PixelCard';
import type { PortfolioTheme, Project } from '../../types';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  theme: PortfolioTheme;
}

export default function ProjectCard({ project, theme }: ProjectCardProps) {
  const accentClass = theme === 'frontend' ? styles.frontend : styles.cgi;

  return (
    <PixelCard
      variant={theme}
      as={project.link ? 'a' : 'article'}
      href={project.link}
      target={project.link ? '_blank' : undefined}
      rel={project.link ? 'noreferrer noopener' : undefined}
      className={`${accentClass} ${project.featured ? styles.featured : ''}`}
    >
      <div className={styles.inner}>
        <div className={styles.cover}>
          <span className={styles.number}>{project.number}</span>
          <span className={styles.coverLabel}>{project.coverLabel ?? 'PROJECT COVER'}</span>
        </div>
        <div className={styles.body}>
          <div className={styles.titleRow}>
            <h3 className={styles.title}>{project.title}</h3>
            <span className={styles.year}>{project.year}</span>
          </div>
          <p className={styles.description}>{project.description}</p>
          <div className={styles.tags}>{project.tags.join(' · ')}</div>
        </div>
      </div>
    </PixelCard>
  );
}
