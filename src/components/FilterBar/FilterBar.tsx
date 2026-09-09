import type { PortfolioTheme } from '../../types';

interface FilterBarProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  theme: PortfolioTheme;
}

export default function FilterBar({ filters, activeFilter, onFilterChange, theme }: FilterBarProps) {
  const isFrontend = theme === 'frontend';

  return (
    <div className="flex flex-wrap gap-2 mt-6" role="group" aria-label="Project filters">
      {filters.map((filter) => {
        const isActive = activeFilter === filter;
        const activeClass = isActive
          ? isFrontend
            ? 'bg-frontend text-black border-frontend'
            : 'bg-cgi text-cgi-text-on border-cgi'
          : 'text-text-muted hover:border-border-strong hover:text-text';

        return (
          <button
            key={filter}
            type="button"
            className={`border border-border cursor-pointer px-3.5 py-2 rounded-none font-mono text-[10px] tracking-[1px] uppercase bg-transparent transition-all duration-150 ${activeClass}`}
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
