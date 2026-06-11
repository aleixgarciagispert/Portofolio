import type { PortfolioTheme, SocialLink } from '../../types';

interface SocialLinksProps {
  links: SocialLink[];
  theme?: PortfolioTheme | 'neutral';
}

export default function SocialLinks({ links, theme = 'neutral' }: SocialLinksProps) {
  const hoverColor = theme === 'cgi' ? 'hover:text-cgi' : 'hover:text-accent';

  return (
    <nav
      className="flex flex-wrap gap-[18px] font-mono text-[10px] tracking-[1.5px] max-sm:gap-3.5 max-sm:text-[9px]"
      aria-label="Social links"
    >
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className={`text-text-nav no-underline transition-colors duration-200 ${hoverColor}`}
          target={link.href.startsWith('http') ? '_blank' : undefined}
          rel={link.href.startsWith('http') ? 'noreferrer noopener' : undefined}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
