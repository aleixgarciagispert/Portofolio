import type { PortfolioTheme, SocialLink } from '../../types';
import styles from './SocialLinks.module.css';

interface SocialLinksProps {
  links: SocialLink[];
  theme?: PortfolioTheme | 'neutral';
}

export default function SocialLinks({ links, theme = 'neutral' }: SocialLinksProps) {
  return (
    <nav className={styles.links} aria-label="Social links">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className={`${styles.link} ${styles[theme]}`}
          target={link.href.startsWith('http') ? '_blank' : undefined}
          rel={link.href.startsWith('http') ? 'noreferrer noopener' : undefined}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
