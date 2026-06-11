import { NavLink } from 'react-router-dom';
import type { NavLinkItem } from '../../types';
import styles from './SideNav.module.css';

interface SideNavProps {
  links: NavLinkItem[];
}

export default function SideNav({ links }: SideNavProps) {
  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link.label}>
            {link.external ? (
              <a
                href={link.to}
                className={styles.link}
                target={link.to.startsWith('mailto:') ? undefined : '_blank'}
                rel={link.to.startsWith('mailto:') ? undefined : 'noreferrer noopener'}
              >
                {link.label}
              </a>
            ) : (
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
                end={link.to === '/'}
              >
                {link.label}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
