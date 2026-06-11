import type { PortfolioTheme } from '../../types';
import { siteConfig } from '../../data/site';
import styles from './PortfolioFooter.module.css';

interface PortfolioFooterProps {
  theme: PortfolioTheme;
  contactCta: string;
}

export default function PortfolioFooter({ theme, contactCta }: PortfolioFooterProps) {
  const accentClass = theme === 'frontend' ? styles.frontend : styles.cgi;

  return (
    <footer className={`${styles.footer} ${accentClass}`}>
      <div className={styles.label}>Get in touch</div>
      <a href={`mailto:${siteConfig.email}`} className={styles.cta}>
        {contactCta}
      </a>
    </footer>
  );
}
