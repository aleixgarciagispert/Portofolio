import type { PortfolioTheme } from '../../types';
import styles from './FilterBar.module.css';

interface FilterBarProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  theme: PortfolioTheme;
}

export default function FilterBar({
  filters,
  activeFilter,
  onFilterChange,
  theme,
}: FilterBarProps) {
  const accentClass = theme === 'frontend' ? styles.frontend : styles.cgi;

  return (
    <div className={styles.bar} role="group" aria-label="Project filters">
      {filters.map((filter) => {
        const isActive = activeFilter === filter;
        return (
          <button
            key={filter}
            type="button"
            className={`${styles.button} ${accentClass} ${isActive ? styles.active : ''}`}
            aria-pressed={isActive}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}
