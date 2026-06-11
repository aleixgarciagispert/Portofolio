import fs from 'fs';
import path from 'path';

/**
 * Script para generar cgiProjects.ts desde la API de ArtStation
 * Uso: npx tsx scripts/generateCgiProjects.ts <apiUrl> <artistId> [maxProjects]
 * Ej: npx tsx scripts/generateCgiProjects.ts http://localhost:5000 aleixgarcia 6
 */

interface ArtstationArtwork {
  artwork_id: string;
  title: string;
  description?: string;
  tags?: string[];
  created_at?: string;
  [key: string]: any;
}

interface ArtstationArtist {
  base_info?: {
    artist_id: string;
    name: string;
  };
  artworks?: ArtstationArtwork[];
  [key: string]: any;
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

const API_URL = process.argv[2] || 'http://localhost:5000';
const ARTIST_ID = process.argv[3];
const MAX_PROJECTS = parseInt(process.argv[4] || '6', 10);

if (!ARTIST_ID) {
  console.error('❌ Error: Artist ID is required');
  console.error('Usage: npx tsx scripts/generateCgiProjects.ts <apiUrl> <artistId> [maxProjects]');
  console.error('Example: npx tsx scripts/generateCgiProjects.ts http://localhost:5000 aleixgarcia 6');
  process.exit(1);
}

async function fetchArtistArtworks(): Promise<ArtstationArtwork[]> {
  try {
    console.log(`📡 Fetching artworks for artist "${ARTIST_ID}" from ${API_URL}...`);

    // Intenta fetch de artista
    const response = await fetch(`${API_URL}/artist/${ARTIST_ID}`);
    if (!response.ok) {
      throw new Error(`Artist not found (${response.statusText})`);
    }

    const artistData: ArtstationArtist = await response.json();

    // Busca artworks en diferentes posibles estructuras
    let artworks: ArtstationArtwork[] = [];

    if (artistData.artworks && Array.isArray(artistData.artworks)) {
      artworks = artistData.artworks;
    } else if (artistData.artwork && Array.isArray(artistData.artwork)) {
      artworks = artistData.artwork;
    }

    if (artworks.length === 0) {
      console.warn(`⚠️  Artist "${ARTIST_ID}" found but has no artworks`);
      return [];
    }

    console.log(`✅ Fetched ${artworks.length} artworks for artist "${ARTIST_ID}"`);
    return artworks;
  } catch (error) {
    console.error(`❌ Failed to fetch artist artworks:`, error);
    process.exit(1);
  }
}

function mapArtstationToProject(artwork: ArtstationArtwork, index: number): Project {
  const year = artwork.created_at
    ? new Date(artwork.created_at).getFullYear()
    : new Date().getFullYear();

  const tags = Array.isArray(artwork.tags) && artwork.tags.length > 0
    ? artwork.tags.slice(0, 3)
    : ['3D', 'RENDER'];

  const categories = ['ENVIRONMENTS', 'LOOKDEV', 'LIGHTING', 'REAL-TIME'];
  const category = categories[index % categories.length];

  const aspectRatios = ['21 / 9', '16 / 9', '4 / 3'];
  const aspectRatio = aspectRatios[index % aspectRatios.length];

  return {
    id: `cgi-${String(index + 1).padStart(2, '0')}`,
    number: String(index + 1).padStart(2, '0'),
    title: artwork.title || `Artwork ${index + 1}`,
    description: artwork.description || 'High-quality 3D environment and rendering.',
    year,
    tags: tags.length > 0 ? tags : ['3D', 'RENDER', 'BLENDER'],
    category,
    aspectRatio,
    featured: index === 0,
    coverLabel: 'RENDER / STILL',
    link: '#',
  };
}

async function generateProjectsFile() {
  try {
    const artworks = await fetchArtistArtworks();

    if (artworks.length === 0) {
      console.error('❌ No artworks found to generate projects');
      process.exit(1);
    }

    const selectedArtworks = artworks.slice(0, MAX_PROJECTS);
    const projects = selectedArtworks.map((artwork, idx) => mapArtstationToProject(artwork, idx));

    const fileContent = `import type { Project } from '../types';

export const cgiProjects: Project[] = [
${projects
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
    console.log(`✨ Generated ${projects.length} projects for artist "${ARTIST_ID}" in ${outputPath}`);
  } catch (error) {
    console.error('❌ Generation failed:', error);
    process.exit(1);
  }
}

generateProjectsFile();
