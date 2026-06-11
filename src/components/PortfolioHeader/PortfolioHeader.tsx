import type { PortfolioTheme, PortfolioSection } from '../../types';
import FilterBar from '../FilterBar';

interface PortfolioHeaderProps {
  section: PortfolioSection;
  theme: PortfolioTheme;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function PortfolioHeader({ section, theme, activeFilter, onFilterChange }: PortfolioHeaderProps) {
  const isFrontend = theme === 'frontend';
  const accentText = isFrontend ? 'text-frontend' : 'text-cgi';
  const headingLines = section.heading.split('\n');

  return (
    <header className="mb-8">
      <div className={`font-mono text-[11px] tracking-[3px] uppercase ${accentText}`}>
        {section.sectionNumber} — SELECTED WORK
      </div>

      <div className="flex items-end justify-between gap-5 flex-wrap mt-3 max-sm:flex-col max-sm:items-start">
        <h1 className="m-0 text-[clamp(32px,5vw,52px)] font-bold leading-none tracking-[-0.5px]">
          {headingLines.map((line, i) => (
            <span key={line}>
              {line}
              {i < headingLines.length - 1 && <br />}
            </span>
          ))}
        </h1>
        <div className="font-mono text-[11px] tracking-[1.5px] text-text-subtle text-right leading-[1.8] max-sm:text-left">
          <div>{String(section.projectCount).padStart(2, '0')} PROJECTS</div>
          <div>{section.yearRange}</div>
        </div>
      </div>

      <p className="max-w-[520px] mt-4 text-[15px] leading-[1.55] text-text-muted">
        {section.description}
      </p>

      <FilterBar
        filters={section.filters}
        activeFilter={activeFilter}
        onFilterChange={onFilterChange}
        theme={theme}
      />
    </header>
  );
}
