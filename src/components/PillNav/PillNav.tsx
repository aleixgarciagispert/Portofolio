import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import './PillNav.css';

export interface PillNavItem {
  label: string;
  href: string;
  ariaLabel?: string;
}

interface PillNavProps {
  logo: string;
  logoAlt?: string;
  brandLabel?: string;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
}

const PillNav = ({
  logo,
  logoAlt = 'Logo',
  brandLabel,
  items,
  activeHref,
  className = '',
  ease = 'power3.out',
  onMobileMenuClick,
  initialLoadAnimation = true,
}: PillNavProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const homeItem = items[0];
  const linkItems = items.slice(1, -1);
  const ctaItem = items.length > 1 ? items[items.length - 1] : undefined;

  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: 'hidden', opacity: 0, y: -8 });
    }

    if (initialLoadAnimation && navRef.current) {
      gsap.set(navRef.current, { y: -16, opacity: 0 });
      gsap.to(navRef.current, { y: 0, opacity: 1, duration: 0.6, ease });
    }
  }, [initialLoadAnimation, ease]);

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, { rotate: 360, duration: 0.5, ease });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll<HTMLElement>('.hamburger-line');
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.25, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.25, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.25, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.25, ease });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(menu, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.25, ease });
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: -8,
          duration: 0.2,
          ease,
          onComplete: () => {
            gsap.set(menu, { visibility: 'hidden' });
          },
        });
      }
    }

    onMobileMenuClick?.();
  };

  const isExternalLink = (href: string) =>
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#');

  const isRouterLink = (href?: string) => !!href && !isExternalLink(href);

  const renderLink = (item: PillNavItem, variant: 'link' | 'cta', onClick?: () => void) => {
    const isActive = activeHref === item.href;
    const linkClassName =
      variant === 'cta' ? `nav-cta${isActive ? ' is-active' : ''}` : `nav-link${isActive ? ' is-active' : ''}`;

    if (isRouterLink(item.href)) {
      return (
        <Link
          role="menuitem"
          to={item.href}
          className={linkClassName}
          aria-label={item.ariaLabel || item.label}
          onClick={onClick}
        >
          {item.label}
        </Link>
      );
    }

    return (
      <a
        role="menuitem"
        href={item.href}
        className={linkClassName}
        aria-label={item.ariaLabel || item.label}
        target={item.href.startsWith('mailto:') ? undefined : '_blank'}
        rel={item.href.startsWith('mailto:') ? undefined : 'noreferrer noopener'}
        onClick={onClick}
      >
        {item.label}
      </a>
    );
  };

  return (
    <div className="site-nav-container">
      <nav className={`site-nav ${className}`} aria-label="Primary" ref={navRef}>
        {homeItem && isRouterLink(homeItem.href) ? (
          <Link
            className="site-nav-brand"
            to={homeItem.href}
            aria-label="Home"
            onMouseEnter={handleLogoEnter}
            role="menuitem"
          >
            <span className="site-nav-mark">
              <img src={logo} alt={logoAlt} ref={logoImgRef} />
            </span>
            {brandLabel && <span className="site-nav-brand-label">{brandLabel}</span>}
          </Link>
        ) : (
          <a
            className="site-nav-brand"
            href={homeItem?.href || '#'}
            aria-label="Home"
            onMouseEnter={handleLogoEnter}
          >
            <span className="site-nav-mark">
              <img src={logo} alt={logoAlt} ref={logoImgRef} />
            </span>
            {brandLabel && <span className="site-nav-brand-label">{brandLabel}</span>}
          </a>
        )}

        <ul className="site-nav-links desktop-only" role="menubar">
          {linkItems.map((item, i) => (
            <li key={item.href || `item-${i}`} role="none">
              {renderLink(item, 'link')}
            </li>
          ))}
        </ul>

        {ctaItem && <span className="site-nav-cta-slot desktop-only">{renderLink(ctaItem, 'cta')}</span>}

        <button
          className="mobile-menu-button mobile-only"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          ref={hamburgerRef}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      <div className="mobile-menu-popover mobile-only" ref={mobileMenuRef}>
        <ul className="mobile-menu-list">
          {items.map((item, i) => (
            <li key={item.href || `mobile-item-${i}`}>
              {renderLink(item, i === items.length - 1 && items.length > 1 ? 'cta' : 'link', () =>
                setIsMobileMenuOpen(false)
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PillNav;
