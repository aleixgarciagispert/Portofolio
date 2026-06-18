# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start Vite dev server
npm run build        # Type-check with tsc then Vite build
npm run preview      # Preview production build
npm run lint         # ESLint

# Data scripts (require tsx)
npm run api:mock     # Start mock ArtStation server on :5000
npm run cgi:generate # Generate CGI project data from mock server
npm run cgi:scrape   # Scrape live ArtStation profile
```

## Architecture

**Stack:** React 19, React Router v7, Tailwind CSS v4, Vite, TypeScript. Animation via GSAP; 3D via OGL (WebGL).

**Routing (src/App.tsx):**
- `/` → `LandingPage` (wrapped in `SiteLayout`)
- `/front-end` → `FrontendPortfolioPage` (wrapped in `SiteLayout`)
- `/3d-environments` → `CgiReelPage` (no shared layout — standalone full-screen experience)

**Data layer (`src/data/`):** All content is static TypeScript files — no API calls at runtime.
- `siteConfig.ts` — single source of truth for name, email, nav links, social links
- `portfolioSections.ts` — metadata (theme, filters, headings) for each portfolio section
- `frontendProjects.ts` / `cgiProjects.ts` — project arrays typed against `Project` from `src/types/index.ts`
- `Artwork/*.json` — raw ArtStation JSON snapshots used by the CGI section

**Component conventions:** Each component lives in its own folder (`src/components/ComponentName/`) with a barrel `index.ts`. Co-located `.css` files exist on some components; most styling uses Tailwind utility classes.

**Themes:** `PortfolioTheme = 'frontend' | 'cgi'` drives visual variants. `PortfolioSection` carries the theme and is consumed by `PortfolioPageLayout`.

**Scripts (`scripts/`):** Node/tsx utilities for scraping ArtStation and generating `cgiProjects.ts` — not part of the runtime bundle.


# Misión: Portafolio Web 3D con React + TypeScript + Three.js

## Objetivo General
Desarrollar un portafolio web interactivo y moderno que integre visualizaciones 3D usando Three.js, mostrando proyectos de VFX, 3D y desarrollo frontend con animations y experiencia visual premium.

## Especificaciones Técnicas

### Stack
- **Framework**: React 18+ con Vite
- **Lenguaje**: TypeScript (strict mode)
- **3D**: Three.js + React Three Fiber
- **Styling**: Tailwind CSS + CSS Modules
- **Animaciones**: Framer Motion + GSAP

### Estructura de Secciones

1. **Hero 3D** (Above Fold)
   - Fondo 3D procedural con Three.js
   - Navegación sticky
   - CTA principal (Projects, Contact)

2. **Sobre Mí**
   - Descripción profesional
   - Stack: React, Next.js, TypeScript, THREE.js, Houdini, Blender, Gaffer
   - Links a GitHub/LinkedIn

3. **Proyectos** (Grid interactivo)
   - Cards con hover 3D
   - Categorías: VFX, 3D, Frontend, Procedural
   - Proyecto destacado con vista 3D integrada

4. **Skills Visualization**
   - Visualización 3D de competencias
   - Interactivas y animadas

5. **Contacto**
   - Formulario
   - Links sociales

## Requisitos Técnicos

- ✅ TypeScript strict mode en toda la app
- ✅ Componentes reutilizables y bien tipados
- ✅ Three.js instances optimizadas (no re-renders innecesarios)
- ✅ Responsive design (mobile-first)
- ✅ Performance optimizado (lazy loading, suspense)
- ✅ Accesibilidad WCAG 2.1 AA
- ✅ SEO meta tags y Open Graph

## Deliverables

1. **Estructura base**: Proyecto Vite + configuración TypeScript
2. **Componentes**: Hero, Projects, About, Skills, Contact
3. **3D Assets**: Escenas Three.js configuradas
4. **Estilos**: Tailwind + CSS Modules
5. **Scripts**: Build, dev, deploy
6. **Documentación**: README con setup e instrucciones