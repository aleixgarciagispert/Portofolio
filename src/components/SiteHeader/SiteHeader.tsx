import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './SiteHeader.css';

export interface SiteHeaderItem {
  label: string;
  href: string;
}

interface SiteHeaderProps {
  name: string;
  tagline: string;
  items: SiteHeaderItem[];
  activeHref?: string;
}

function RollText({ text }: { text: string }) {
  return (
    <span className="sh-roll" aria-hidden="true">
      <span className="sh-roll-line">{text}</span>
      <span className="sh-roll-line">{text}</span>
    </span>
  );
}

export default function SiteHeader({ name, tagline, items, activeHref }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [activeHref]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sh">
      <div className="sh-inner">
        <Link to="/" className="sh-logo" aria-label={`${name} — home`}>
          <span className="sh-logo-name">{name}</span>
          <span className="sh-logo-tag">
            <span className="sh-dot" aria-hidden="true" />
            {tagline}
          </span>
        </Link>

        <button
          type="button"
          className="sh-menu-btn"
          aria-expanded={open}
          aria-controls="sh-menu"
          onClick={() => setOpen(o => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>

        <nav id="sh-menu" className={`sh-menu${open ? ' is-open' : ''}`} aria-label="Primary">
          <ul className="sh-grid">
            {items.map((item, i) => {
              const active = activeHref === item.href;
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={`sh-link${active ? ' is-active' : ''}`}
                    aria-label={item.label}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span className="sh-dot" aria-hidden="true" />
                    <span className="sh-num" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}.
                    </span>
                    <RollText text={item.label} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
