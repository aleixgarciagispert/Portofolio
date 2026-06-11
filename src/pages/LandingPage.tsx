import { siteConfig } from '../data/site';
import styles from './LandingPage.module.css';

export default function LandingPage() {
  return (
    <section className={styles.landing} aria-label="Home">
<div className={styles.hero}>
        <div className={styles.ring} aria-hidden="true" />
        <div className={styles.figure}>
          <img
            src="/images/hero-reference.png"
            alt=""
            className={styles.heroImage}
          />
        </div>
      </div>

      <p className={styles.nameRow} aria-label={siteConfig.name}>
        {siteConfig.firstName} <span className={styles.nameAccent}>{siteConfig.lastName}</span>
      </p>

      {siteConfig.availableForWork && (
        <p className={styles.status}>
          <span className={styles.statusDot} aria-hidden="true" />
          Available for work
        </p>
      )}
    </section>
  );
}
