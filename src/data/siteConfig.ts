import type { SiteConfig } from '../types';

export const siteConfig: SiteConfig = {
  name: 'Aleix Garcia',
  firstName: 'ALEIX',
  lastName: 'GARCIA',
  title: 'Front-End Developer',
  subtitle: '& 3D Environment Generalist',
  location: 'FROM',
  locationCode: 'ES',
  email: 'aleix@example.com',
  availableForWork: true,
  year: 2026,
  brandLabel: 'ALEIX',
  socialLinks: [
    { label: 'GITHUB', href: 'https://github.com/aleixgarciagispert' },
    { label: 'LINKEDIN', href: '#' },
    { label: 'ARTSTATION', href: '#' },
    { label: 'EMAIL', href: 'mailto:aleix@example.com' },
  ],
  navLinks: [
    { label: 'INDEX', to: '/' },
    { label: 'FRONT-END', to: '/front-end' },
    { label: '3D / CGI', to: '/3d-environments' },
    { label: 'CONTACT', to: 'mailto:aleix@example.com', external: true },
  ],
};
