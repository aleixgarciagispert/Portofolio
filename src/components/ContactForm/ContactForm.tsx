import type { PortfolioTheme } from '../../types';
import styles from './ContactForm.module.css';

interface ContactFormProps {
  theme?: PortfolioTheme;
}

export default function ContactForm({ theme = 'frontend' }: ContactFormProps) {
  const accentClass = theme === 'frontend' ? styles.frontend : styles.cgi;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className={`${styles.form} ${accentClass}`} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="contact-name">Name</label>
        <input id="contact-name" name="name" type="text" required autoComplete="name" />
      </div>
      <div className={styles.field}>
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="contact-message">Message</label>
        <textarea id="contact-message" name="message" rows={5} required />
      </div>
      <button type="submit" className={styles.submit}>
        Send message →
      </button>
    </form>
  );
}
