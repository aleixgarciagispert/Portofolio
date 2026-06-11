/**
 * Scraper para obtener artworks directamente de un perfil de ArtStation
 * Usa la API pública de ArtStation o scraping como fallback
 * Uso: npx tsx scripts/scrapeArtstationProfile.ts <username> [maxProjects]
 * Ej: npx tsx scripts/scrapeArtstationProfile.ts aleixgarciagispert 6
 */

import fs from 'fs';
import path from 'path';

interface ArtstationProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
}

interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  year: number;
  tags: string[];
  category: string;
  aspectRatio: string;
  featured?: boolean;
  coverLabel?: string;
  link?: string;
}

const USERNAME = process.argv[2];
const MAX_PROJECTS = parseInt(process.argv[3] || '6', 10);

if (!USERNAME) {
  console.error('❌ Error: Username is required');
  console.error('Usage: npx tsx scripts/scrapeArtstationProfile.ts <username> [maxProjects]');
  console.error('Example: npx tsx scripts/scrapeArtstationProfile.ts aleixgarciagispert 6');
  process.exit(1);
}

async function fetchArtistProjects(): Promise<ArtstationProject[]> {
  try {
    console.log(`📡 Fetching projects from ArtStation profile: ${USERNAME}...`);

    // Intentar varios endpoints
    const endpoints = [
      `https://www.artstation.com/api/v2/users/${USERNAME}/projects`,
      `https://www.artstation.com/api/v2/user/${USERNAME}/projects`,
      `https://www.artstation.com/api/v1/users/${USERNAME}/projects`,
    ];

    let data = null;

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          data = await response.json();
          console.log(`✅ Connected to ArtStation API`);
          break;
        }
      } catch (e) {
        // Continuar al siguiente endpoint
      }
    }

    if (!data) {
      throw new Error(
        'Could not connect to ArtStation API. Profile may be private or username may be incorrect.'
      );
    }

    // Procesar respuesta
    let projects: any[] = [];

    if (data.data && Array.isArray(data.data)) {
      projects = data.data;
    } else if (Array.isArray(data)) {
      projects = data;
    }

    if (projects.length === 0) {
      throw new Error(`No projects found for user ${USERNAME}`);
    }

    const mapped = projects.map((project: any) => ({
      id: project.id?.toString() || Math.random().toString(),
      title: project.title || 'Untitled',
      description:
        project.description?.replace(/<[^>]*>/g, '') || 'Amazing artwork',
      tags: extractTags(project),
      date: project.created_at || project.published_at || new Date().toISOString(),
    }));

    console.log(`✅ Fetched ${mapped.length} projects`);
    return mapped;
  } catch (error) {
    console.error('❌ Fetch failed:', error instanceof Error ? error.message : error);
    console.log(
      `\n💡 Alternative: Use the mock server:\n   npm run api:mock\n   npm run cgi:generate aleixgarcia 6`
    );
    process.exit(1);
  }
}

function extractTags(project: any): string[] {
  const tags: string[] = [];

  if (project.tags && Array.isArray(project.tags)) {
    tags.push(
      ...project.tags
        .map((t: any) => (typeof t === 'string' ? t : t.name))
        .filter(Boolean)
        .slice(0, 3)
    );
  }

  if (project.category) {
    const cat =
      typeof project.category === 'string'
        ? project.category
        : project.category.name;
    if (cat) tags.push(cat);
  }

  if (tags.length === 0) {
    tags.push('3D', 'RENDER', 'ART');
  }

  return Array.from(new Set(tags)).slice(0, 3);
}

function mapToProject(project: ArtstationProject, index: number): Project {
  const year = new Date(project.date).getFullYear();
  const categories = ['ENVIRONMENTS', 'LOOKDEV', 'LIGHTING', 'REAL-TIME'];
  const category = categories[index % categories.length];
  const aspectRatios = ['21 / 9', '16 / 9', '4 / 3'];
  const aspectRatio = aspectRatios[index % aspectRatios.length];

  return {
    id: `cgi-${String(index + 1).padStart(2, '0')}`,
    number: String(index + 1).padStart(2, '0'),
    title: project.title,
    description: project.description || 'Amazing 3D artwork.',
    year,
    tags: project.tags,
    category,
    aspectRatio,
    featured: index === 0,
    coverLabel: 'RENDER / STILL',
    link: `https://www.artstation.com/${USERNAME}`,
  };
}

async function generateProjectsFile() {
  try {
    const projects = await fetchArtistProjects();

    if (projects.length === 0) {
      console.error('❌ No projects to generate');
      process.exit(1);
    }

    const selectedProjects = projects.slice(0, MAX_PROJECTS);
    const mappedProjects = selectedProjects.map((p, i) => mapToProject(p, i));

    const fileContent = `import type { Project } from '../types';

export const cgiProjects: Project[] = [
${mappedProjects
  .map(
    (p) => `  {
    id: '${p.id}',
    number: '${p.number}',
    title: '${p.title.replace(/'/g, "\\'")}',
    description:
      '${p.description.replace(/'/g, "\\'")}',
    year: ${p.year},
    tags: [${p.tags.map((t) => `'${t}'`).join(', ')}],
    category: '${p.category}',
    aspectRatio: '${p.aspectRatio}',
    featured: ${p.featured ?? false},
    coverLabel: '${p.coverLabel}',
    link: '${p.link}',
  }`
  )
  .join(',\n')}
];
`;

    const outputPath = path.join(process.cwd(), 'src/data/cgiProjects.ts');
    fs.writeFileSync(outputPath, fileContent, 'utf-8');
    console.log(
      `✨ Generated ${mappedProjects.length} projects for @${USERNAME}`
    );
    console.log(`🔗 Linked to: https://www.artstation.com/${USERNAME}`);
  } catch (error) {
    console.error('❌ Generation failed:', error);
    process.exit(1);
  }
}

generateProjectsFile();
