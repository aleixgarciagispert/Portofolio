import type { Project } from '../types';

export const cgiProjects: Project[] = [
  {
    id: 'cgi-01',
    number: '01',
    title: 'Whispers from\nthe Abyss',
    description:
      'Environment inspired by Davy Jones\' quarters from Pirates of the Caribbean. Created during mentorship at Think Tank Center in Vancouver. Volumetrics built in Houdini with Axiom Solver, hero asset textured in Mari.',
    year: 2024,
    tags: ['MAYA', 'HOUDINI', 'ARNOLD', 'NUKE', 'MARI', 'ZBRUSH'],
    category: 'ENVIRONMENTS',
    aspectRatio: '16 / 9',
    featured: true,
    coverImage: 'https://cdna.artstation.com/p/assets/covers/images/075/175/518/medium/aleix-garcia-gispert-aleix-garcia-gispert-thumbnail01.jpg?1713927413',
    coverVideo: '/videos/davyJones.mp4',
    link: 'https://www.artstation.com/artwork/m8yyye',
    quotes: ['CINEMATIC\nLIGHTING', 'HERO ASSET\nTEXTURING', 'VOLUMETRIC\nFX'],
    badge: 'Think Tank · Vancouver',
    meta: 'MENTORSHIP: THINK TANK CENTER · MENTOR: JON CATAPIA',
  },
  {
    id: 'cgi-02',
    number: '02',
    title: 'Fading Light\nof Autumn',
    description:
      'Houdini-driven outdoor environment with procedural rock modeling, Megascans assets, and SpeedTree foliage converted to USD for colour variation. Lit in Solaris/Karma with noise-generated cloud shapes.',
    year: 2024,
    tags: ['HOUDINI', 'SPEEDTREE', 'KARMA', 'USD', 'MEGASCANS'],
    category: 'ENVIRONMENTS',
    aspectRatio: '16 / 9',
    coverImage: 'https://cdnb.artstation.com/p/assets/images/images/079/886/985/medium/aleix-garcia-gispert-022-dv.jpg?1726075674',
    coverVideo: '/videos/lightOfAutum.mp4',
    link: 'https://www.artstation.com/artwork/V2y6RN',
    quotes: ['USD\nWORKFLOW', 'PROCEDURAL\nMODELING', 'SOLARIS\nLIGHTING'],
    meta: 'WORKFLOW: HOUDINI · SOLARIS · KARMA',
  },
  {
    id: 'cgi-03',
    number: '03',
    title: 'Peaceful\nPort',
    description:
      'Final project for the advanced term at Think Tank Online Course. Full lookdev of a port environment with complex lighting, texturing in Mari and Substance, and compositing in Nuke.',
    year: 2022,
    tags: ['MAYA', 'VRAY', 'MARI', 'NUKE', 'SUBSTANCE', 'ZBRUSH'],
    category: 'LOOKDEV',
    aspectRatio: '16 / 9',
    coverImage: 'https://cdnb.artstation.com/p/assets/images/images/055/383/263/large/aleix-garcia-gispert-001-cc-blacklines.jpg?1666811298',
    link: 'https://www.artstation.com/artwork/wJkgr9',
    quotes: ['FULL\nLOOKDEV', 'MARI\nTEXTURING', 'NUKE\nCOMPOSITING'],
    badge: 'Think Tank · Online',
    meta: 'PROGRAM: THINK TANK ONLINE · ADVANCED TERM',
  },
];
