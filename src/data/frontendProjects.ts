import type { Project } from '../types';

export const frontendProjects: Project[] = [
  {
    id: 'fe-01',
    number: '01',
    title: 'Restaurant Administration WebApp',
    description:
      'Full-stack management platform for restaurants: menu, orders and staff handled in one place.',
    year: 2026,
    tags: ['REACT', 'NODE.JS', 'FULL-STACK'],
    category: 'WEB APPS',
    aspectRatio: '21 / 9',
    featured: true,
    coverLabel: 'PROJECT COVER',
    link: 'https://github.com/aleixgarciagispert/Full-stack-restaurant.git',
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
