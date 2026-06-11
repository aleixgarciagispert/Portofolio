import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/site';
import styles from './Logo.module.css';

export default function Logo() {
  return (
    <Link to="/" className={styles.logo} aria-label={`${siteConfig.name} — home`}>
      <span className={styles.mark} aria-hidden="true">
        A
      </span>
      <span className={styles.label}>{siteConfig.brandLabel}</span>
    </Link>
  );
}
