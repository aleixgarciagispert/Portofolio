import type { SiteConfig } from '../types';

export const gmailComposeUrl = (email: string) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

export const siteConfig: SiteConfig = {
  name: 'Aleix Garcia',
  firstName: 'ALEIX',
  lastName: 'GARCIA',
  title: '3D Environment Generalist',
  subtitle: 'and Developer',
  location: 'BARCELONA, SPAIN',
  locationCode: 'EU',
  email: 'aleixgarciagispert@gmail.com',
  availableForWork: true,
  year: 2026,
  brandLabel: 'ALEIX',
  socialLinks: [
    { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/aleixgarciagispert' },
    { label: 'ARTSTATION', href: 'https://www.artstation.com/aleixgarciagispert' },
    { label: 'INSTAGRAM', href: '#' },
  ],
  navLinks: [
    { label: 'INDEX', to: '/' },
    { label: '3D / CGI', to: '/3d-environments' },
    { label: 'DEVELOPER', to: '/front-end' },
    { label: 'CONTACT', to: '/contact' },
  ],
};
