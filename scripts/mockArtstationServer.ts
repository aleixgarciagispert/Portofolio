/**
 * Mock ArtStation API Server
 * Simula la API de ArtStation localmente para testing
 * Uso: npx tsx scripts/mockArtstationServer.ts
 */

import http from 'http';

const MOCK_ARTISTS: Record<string, any> = {
  aleixgarcia: {
    base_info: {
      artist_id: 'aleixgarcia',
      name: 'Aleix Garcia',
      country: 'Spain',
    },
    artworks: [
      {
        artwork_id: '1',
        title: 'Neon District',
        description:
          'Cyberpunk cityscape with volumetric fog, neon signage and rain-slicked streets.',
        tags: ['UE5', 'HOUDINI', 'MEGASCANS'],
        created_at: '2026-01-15',
      },
      {
        artwork_id: '2',
        title: 'Coastal Ruins',
        description:
          'Overgrown coastal fortress with procedural vegetation and ocean simulation.',
        tags: ['BLENDER', 'CYCLES', 'PROCEDURAL'],
        created_at: '2025-08-22',
      },
      {
        artwork_id: '3',
        title: 'Crystal Caverns',
        description:
          'Underground cave system with refractive crystal formations and caustic lighting.',
        tags: ['HOUDINI', 'KARMA', 'RENDERING'],
        created_at: '2025-06-10',
      },
      {
        artwork_id: '4',
        title: 'Storm Temple',
        description:
          'Ancient temple environment with dynamic weather, lightning and particle effects.',
        tags: ['UE5', 'NIAGARA', 'LIGHTING'],
        created_at: '2024-11-03',
      },
      {
        artwork_id: '5',
        title: 'Desert Outpost',
        description:
          'Sci-fi research station with modular architecture and atmospheric dust storms.',
        tags: ['SUBSTANCE', 'BLENDER', 'MODELING'],
        created_at: '2023-09-27',
      },
      {
        artwork_id: '6',
        title: 'Ethereal Forest',
        description:
          'Magical forest with bioluminescent flora and volumetric light rays.',
        tags: ['UNREAL', 'VEGETATION', 'VFX'],
        created_at: '2026-03-05',
      },
    ],
  },
  demo_artist: {
    base_info: {
      artist_id: 'demo_artist',
      name: 'Demo Artist',
      country: 'USA',
    },
    artworks: [
      {
        artwork_id: 'd1',
        title: 'Futuristic City',
        description: 'Advanced sci-fi metropolitan environment with flying vehicles.',
        tags: ['CINEMA4D', 'OCTANE', 'ARCHITECTURE'],
        created_at: '2026-02-10',
      },
      {
        artwork_id: 'd2',
        title: 'Organic Sculpture',
        description: 'Abstract organic forms with intricate surface details.',
        tags: ['ZBrush', 'SUBSTANCE', 'SCULPTING'],
        created_at: '2025-12-01',
      },
      {
        artwork_id: 'd3',
        title: 'Nature Study',
        description: 'Realistic natural landscape with atmospheric effects.',
        tags: ['BLENDER', 'EEVEE', 'NATURE'],
        created_at: '2025-10-15',
      },
    ],
  },
};

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const url = new URL(req.url || '', `http://${req.headers.host}`);
  const pathname = url.pathname;

  if (pathname === '/artworks') {
    // Get all artworks from all artists
    const allArtworks = Object.values(MOCK_ARTISTS).flatMap((a) => a.artworks || []);
    res.writeHead(200);
    res.end(JSON.stringify(allArtworks));
  } else if (pathname.startsWith('/artist/')) {
    // Get artist + their artworks
    const artistId = pathname.split('/')[2];
    const artist = MOCK_ARTISTS[artistId];

    if (artist) {
      res.writeHead(200);
      res.end(JSON.stringify(artist));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Artist not found' }));
    }
  } else if (pathname.startsWith('/artwork/')) {
    // Get specific artwork
    const artworkId = pathname.split('/')[2];
    let artwork = null;

    for (const artist of Object.values(MOCK_ARTISTS)) {
      const found = (artist.artworks || []).find((a: any) => a.artwork_id === artworkId);
      if (found) {
        artwork = found;
        break;
      }
    }

    if (artwork) {
      res.writeHead(200);
      res.end(JSON.stringify(artwork));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Artwork not found' }));
    }
  } else if (pathname === '/previews') {
    const allArtworks = Object.values(MOCK_ARTISTS).flatMap((a) => a.artworks || []);
    res.writeHead(200);
    res.end(JSON.stringify(allArtworks.map((a) => ({ ...a, preview: null }))));
  } else if (pathname === '/health' || pathname === '/') {
    res.writeHead(200);
    res.end(
      JSON.stringify({
        status: 'ok',
        artists: Object.keys(MOCK_ARTISTS),
      })
    );
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
  }
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`\n🎨 Mock ArtStation API running on http://localhost:${PORT}\n`);
  console.log(`📍 Endpoints:`);
  console.log(`   GET /              - Health check & list artists`);
  console.log(`   GET /artworks      - Get all artworks from all artists`);
  console.log(`   GET /artist/{id}   - Get artist + their artworks`);
  console.log(`   GET /artwork/{id}  - Get specific artwork`);
  console.log(`   GET /previews      - Get all previews\n`);
  console.log(`👨‍🎨 Available artists:`);
  Object.keys(MOCK_ARTISTS).forEach((id) => {
    const count = MOCK_ARTISTS[id].artworks?.length || 0;
    console.log(`   - ${id} (${count} artworks)`);
  });
  console.log(`\n💡 Test with: npx tsx scripts/generateCgiProjects.ts http://localhost:5000 aleixgarcia 6\n`);
  console.log(`⚡ Press Ctrl+C to stop\n`);
});
