import type { PortfolioTheme } from '../../types';
import { siteConfig, gmailComposeUrl } from '../../data/siteConfig';

interface PortfolioFooterProps {
  theme: PortfolioTheme;
  contactCta: string;
}

export default function PortfolioFooter({ theme, contactCta }: PortfolioFooterProps) {
  const isFrontend = theme === 'frontend';
  const labelColor = isFrontend ? 'text-frontend' : 'text-cgi';
  const ctaHover = isFrontend ? 'hover:text-frontend' : 'hover:text-cgi';

  return (
    <footer className="mt-12 pt-8 border-t border-border">
      <div className={`font-mono text-[11px] tracking-[2px] uppercase ${labelColor}`}>
        Get in touch
      </div>
      <a
        href={gmailComposeUrl(siteConfig.email)}
        target="_blank"
        rel="noreferrer noopener"
        className={`inline-block mt-3 text-[clamp(22px,3.5vw,32px)] font-semibold text-text no-underline transition-colors duration-200 ${ctaHover}`}
      >
        {contactCta}
      </a>
    </footer>
  );
}
