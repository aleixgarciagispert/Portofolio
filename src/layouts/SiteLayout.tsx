import { Outlet } from 'react-router-dom';
import { siteConfig } from '../data/site';
import Logo from '../components/Logo';
import StaggeredMenu from '../components/StaggeredMenu';
import SocialLinks from '../components/SocialLinks';
import styles from './SiteLayout.module.css';

export default function SiteLayout() {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Logo />
      </header>

      <StaggeredMenu items={siteConfig.navLinks} socialItems={siteConfig.socialLinks} />

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInfo}>
          <p className={styles.role}>{siteConfig.title}</p>
          <p className={styles.subrole}>{siteConfig.subtitle}</p>
          <p className={styles.location}>
            {siteConfig.location}{' '}
            <span className={styles.locationCode}>{siteConfig.locationCode}</span>
          </p>
        </div>
        <SocialLinks links={siteConfig.socialLinks} />
      </footer>
    </div>
  );
}
