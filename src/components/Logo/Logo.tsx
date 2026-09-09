import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';

export default function Logo() {
  return (
    <Link
      to="/"
      className="group inline-flex items-center gap-3 no-underline text-inherit"
      aria-label={`${siteConfig.name} — home`}
    >
      <span
        className="flex items-center justify-center w-9 h-9 border border-white/85 rounded-[6px] text-sm font-semibold text-text transition-colors duration-200 group-hover:border-accent"
        aria-hidden="true"
      >
        A
      </span>
      <span className="font-mono text-xs font-semibold tracking-[3px] text-accent">
        {siteConfig.brandLabel}
      </span>
    </Link>
  );
}
