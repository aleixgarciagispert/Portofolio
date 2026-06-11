import type { PortfolioTheme, PortfolioSection } from '../../types';
import FilterBar from '../FilterBar';
import styles from './PortfolioHeader.module.css';

interface PortfolioHeaderProps {
  section: PortfolioSection;
  theme: PortfolioTheme;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function PortfolioHeader({
  section,
  theme,
  activeFilter,
  onFilterChange,
}: PortfolioHeaderProps) {
  const accentClass = theme === 'frontend' ? styles.frontend : styles.cgi;
  const headingLines = section.heading.split('\n');

  return (
    <header className={`${styles.header} ${accentClass}`}>
      <div className={styles.eyebrow}>
        {section.sectionNumber} — SELECTED WORK
      </div>

      <div className={styles.titleRow}>
        <h1 className={styles.title}>
          {headingLines.map((line, index) => (
            <span key={line}>
              {line}
              {index < headingLines.length - 1 && <br />}
            </span>
          ))}
        </h1>
        <div className={styles.meta}>
          <div>{String(section.projectCount).padStart(2, '0')} PROJECTS</div>
          <div>{section.yearRange}</div>
        </div>
      </div>

      <p className={styles.description}>{section.description}</p>

      <FilterBar
        filters={section.filters}
        activeFilter={activeFilter}
        onFilterChange={onFilterChange}
        theme={theme}
      />
    </header>
  );
}
