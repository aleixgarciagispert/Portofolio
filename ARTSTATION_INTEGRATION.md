# ArtStation Integration Guide

Genera automáticamente los proyectos CGI desde un artista de ArtStation.

## 🚀 Quick Start (Con Mock Server)

### Terminal 1 — Inicia el mock server:
```bash
npm run api:mock
```

Output esperado:
```
🎨 Mock ArtStation API running on http://localhost:5000

👨‍🎨 Available artists:
   - aleixgarcia (6 artworks)
   - demo_artist (3 artworks)

💡 Test with: npx tsx scripts/generateCgiProjects.ts http://localhost:5000 aleixgarcia 6
```

### Terminal 2 — Genera los proyectos CGI:
```bash
# Genera 6 proyectos del artista "aleixgarcia"
npm run cgi:generate aleixgarcia 6

# O directamente:
npx tsx scripts/generateCgiProjects.ts http://localhost:5000 aleixgarcia 6
```

Verás:
```
📡 Fetching artworks for artist "aleixgarcia" from http://localhost:5000...
✅ Fetched 6 artworks for artist "aleixgarcia"
✨ Generated 6 projects for artist "aleixgarcia" in src/data/cgiProjects.ts
```

### Terminal 3 — Inicia el dev:
```bash
npm run dev
```

Abre http://localhost:5173 y verás los proyectos CGI cargados con las obras del artista. ✨

---

## 🎨 Usar con la API Real de ArtStation

Si tienes la API real de ArtStation corriendo (no el mock):

1. Clona el repo: `https://github.com/Hackandres99/Artstation-Api.git`
2. Configura MongoDB y carga datos
3. Inicia la API en el puerto que uses (ej: 3000, 5000, etc.)
4. Genera proyectos:
   ```bash
   npx tsx scripts/generateCgiProjects.ts http://localhost:5000 tu_artist_id 6
   ```

---

## 📋 Syntax

```bash
npx tsx scripts/generateCgiProjects.ts <apiUrl> <artistId> [maxProjects]

apiUrl      - URL de la API (ej: http://localhost:5000)
artistId    - ID del artista en ArtStation (ej: aleixgarcia)
maxProjects - Máximo de artworks a generar (default: 6)
```

### Ejemplos:
```bash
# 6 proyectos del artista "aleixgarcia"
npx tsx scripts/generateCgiProjects.ts http://localhost:5000 aleixgarcia 6

# 8 proyectos del artista "demo_artist"
npx tsx scripts/generateCgiProjects.ts http://localhost:5000 demo_artist 8

# API en puerto diferente
npx tsx scripts/generateCgiProjects.ts http://tu-api.com:3000 artista_name 5
```

---

## 🔄 Workflow

1. **Desarrollo:**
   ```bash
   # Terminal 1
   npm run api:mock

   # Terminal 2
   npm run cgi:generate aleixgarcia 6

   # Terminal 3
   npm run dev
   ```

2. **Cuando quieres cambiar de artista:**
   ```bash
   npm run cgi:generate otro_artista 8
   ```

3. **Build para deploy:**
   ```bash
   npm run build
   # Solo compila, no regenera los datos. Ejecuta cgi:generate antes si los quieres actualizar.
   ```

---

## 📊 Qué mapea el script

| ArtStation | → | cgiProjects |
|---|---|---|
| `artwork_id` | → | `id` |
| `title` | → | `title` |
| `description` | → | `description` |
| `created_at` | → | `year` |
| `tags` | → | `tags` (primeras 3) |
| - | → | `category` (rotado: ENVIRONMENTS, LOOKDEV, LIGHTING, REAL-TIME) |
| - | → | `aspectRatio` (21/9, 16/9, o 4/3) |
| Primera obra | → | `featured: true` |

---

## 🆘 Troubleshooting

### Error: "Artist not found"
- Verifica que el `artistId` es correcto
- El mock server tiene: `aleixgarcia` y `demo_artist`
- Con la API real, usa el nombre de usuario de ArtStation

### Error: "No artworks found"
- El artista existe pero no tiene obras
- Verifica que la estructura de datos en la API incluye `artworks` array

### Port 5000 ya está en uso
```bash
# Cambia el puerto del mock server (edita mockArtstationServer.ts, línea ~130)
# O mata el proceso que usa ese puerto
lsof -i :5000  # En Linux/Mac
netstat -ano | findstr :5000  # En Windows
```

---

## 📝 Nota

- El archivo generado `src/data/cgiProjects.ts` puede editarse manualmente después
- Cada vez que ejecutas `npm run cgi:generate` sobrescribe el archivo
- El mock server tiene artistas de ejemplo: `aleixgarcia`, `demo_artist`
