import type { SiteConfig, PortfolioSection, Project } from '../types';

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

export const portfolioSections: Record<'frontend' | 'cgi', PortfolioSection> = {
  frontend: {
    theme: 'frontend',
    slug: 'front-end',
    label: 'Front-End Development',
    shortLabel: 'FRONT-END',
    sectionNumber: '01',
    heading: 'Front-End\nDevelopment',
    description:
      'Interfaces, interactive experiences and real-time graphics for the web. Building performant products where engineering meets design.',
    techStack: 'REACT · THREE.JS · TYPESCRIPT · WEBGL',
    filters: ['ALL', 'WEB APPS', 'INTERACTIVE', 'WEBGL', 'OPEN SOURCE'],
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

export const frontendProjects: Project[] = [
  {
    id: 'fe-01',
    number: '01',
    title: 'Immersive Web Experience',
    description:
      'Real-time 3D product configurator with custom shaders and post-processing pipeline.',
    year: 2026,
    tags: ['REACT', 'THREE.JS', 'GLSL'],
    category: 'WEBGL',
    aspectRatio: '21 / 9',
    featured: true,
    coverLabel: 'PROJECT COVER',
    link: '#',
  },
  {
    id: 'fe-02',
    number: '02',
    title: 'Design System Platform',
    description:
      'Component library and documentation site powering multiple client-facing products.',
    year: 2025,
    tags: ['NEXT.JS', 'TYPESCRIPT'],
    category: 'WEB APPS',
    aspectRatio: '4 / 3',
    coverLabel: 'PROJECT COVER',
    link: '#',
  },
  {
    id: 'fe-03',
    number: '03',
    title: 'Generative Art Canvas',
    description:
      'Interactive particle system driven by audio input with GPU-accelerated rendering.',
    year: 2025,
    tags: ['WEBGL', 'CANVAS'],
    category: 'INTERACTIVE',
    aspectRatio: '4 / 3',
    coverLabel: 'PROJECT COVER',
    link: '#',
  },
  {
    id: 'fe-04',
    number: '04',
    title: 'Analytics Dashboard',
    description:
      'Data visualization suite with real-time updates and custom charting components.',
    year: 2024,
    tags: ['VUE', 'NODE'],
    category: 'WEB APPS',
    aspectRatio: '4 / 3',
    coverLabel: 'PROJECT COVER',
    link: '#',
  },
  {
    id: 'fe-05',
    number: '05',
    title: 'WASM Image Processor',
    description:
      'High-performance image manipulation toolkit compiled to WebAssembly.',
    year: 2023,
    tags: ['SVELTE', 'WASM'],
    category: 'OPEN SOURCE',
    aspectRatio: '4 / 3',
    coverLabel: 'PROJECT COVER',
    link: '#',
  },
];

export const cgiProjects: Project[] = [
  {
    id: 'cgi-01',
    number: '01',
    title: 'Neon District',
    description:
      'Cyberpunk cityscape with volumetric fog, neon signage and rain-slicked streets.',
    year: 2026,
    tags: ['UE5', 'HOUDINI', 'MEGASCANS'],
    category: 'ENVIRONMENTS',
    aspectRatio: '21 / 9',
    featured: true,
    coverLabel: 'RENDER / STILL',
    link: '#',
  },
  {
    id: 'cgi-02',
    number: '02',
    title: 'Coastal Ruins',
    description:
      'Overgrown coastal fortress with procedural vegetation and ocean simulation.',
    year: 2025,
    tags: ['BLENDER', 'CYCLES'],
    category: 'ENVIRONMENTS',
    aspectRatio: '16 / 9',
    coverLabel: 'RENDER / STILL',
    link: '#',
  },
  {
    id: 'cgi-03',
    number: '03',
    title: 'Crystal Caverns',
    description:
      'Underground cave system with refractive crystal formations and caustic lighting.',
    year: 2025,
    tags: ['HOUDINI', 'KARMA'],
    category: 'LOOKDEV',
    aspectRatio: '16 / 9',
    coverLabel: 'RENDER / STILL',
    link: '#',
  },
  {
    id: 'cgi-04',
    number: '04',
    title: 'Storm Temple',
    description:
      'Ancient temple environment with dynamic weather, lightning and particle effects.',
    year: 2024,
    tags: ['UE5', 'NIAGARA'],
    category: 'LIGHTING',
    aspectRatio: '16 / 9',
    coverLabel: 'RENDER / STILL',
    link: '#',
  },
  {
    id: 'cgi-05',
    number: '05',
    title: 'Desert Outpost',
    description:
      'Sci-fi research station with modular architecture and atmospheric dust storms.',
    year: 2023,
    tags: ['SUBSTANCE', 'BLENDER'],
    category: 'REAL-TIME',
    aspectRatio: '16 / 9',
    coverLabel: 'RENDER / STILL',
    link: '#',
  },
];
