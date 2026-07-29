import type { PortfolioSection } from '../types';

export const portfolioSections: Record<'frontend' | 'cgi', PortfolioSection> = {
  frontend: {
    theme: 'frontend',
    slug: 'front-end',
    label: 'Front-End Development',
    shortLabel: 'FRONT-END',
    sectionNumber: '01',
    heading: 'Development\nRepositories',
    description:
      'Interfaces, interactive experiences and real-time graphics for the web. Building performant products where engineering meets design.',
    techStack: 'REACT · THREE.JS · TYPESCRIPT · WEBGL',
    filters: ['ALL', 'WEB APPS', 'Houdini Tools', 'OPEN SOURCE'],
    contactCta: "Let's build something →",
    projectCount: 6,
    yearRange: '2021 — 2026',
  },
  cgi: {
    theme: 'cgi',
    slug: '3d-environments',
    label: '3D / CGI Environments',
    shortLabel: '3D / CGI',
    sectionNumber: '02',
    heading: '3D / CGI\nEnvironments',
    description:
      'Real-time and rendered environments — worldbuilding, lookdev, lighting and atmosphere for games, film and immersive experiences.',
    techStack: 'BLENDER · HOUDINI · UNREAL ENGINE 5',
    filters: ['ALL', 'ENVIRONMENTS', 'LOOKDEV', 'LIGHTING', 'REAL-TIME'],
    contactCta: "Let's build worlds →",
    projectCount: 6,
    yearRange: '2021 — 2026',
  },
};
